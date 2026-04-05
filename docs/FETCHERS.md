# Data Fetchers

This document describes the data fetchers used to import race results into the BEPC Racing system.

## Overview

All fetchers follow the same contract:
- Accept event metadata + output directory
- Save **raw source data** to `out_dir/raw/` (JSON, HTML, or PDF)
- Write **common format** `.common.json` files to `out_dir/`
- Append a **provenance record** to `out_dir/provenance.jsonl`

Common format spec: see `bepc/loader.py` → `load_common_json()`

---

## Fetchers

### 1. WebScorer (`bepc/fetcher.py`)

**Source:** WebScorer API (`www.webscorer.com/json/race`)  
**Auth:** API ID required — stored in `.env` as `WEBSCORER_API_ID` (never commit this file)  
**Raw format:** JSON  
**Used for:** BEPC weekly races, Sound Rowers events

**Setup:**
```bash
echo "WEBSCORER_API_ID=your_id_here" >> .env
```

**Usage (via CLI):**
```bash
python3 cli.py fetch --club bepc --year 2026 <race_id1> <race_id2> ...
```

**Finding race IDs:** WebScorer race URLs contain the ID: `webscorer.com/race?raceid=XXXXX`

---

### 2. Jericho HTML (`bepc/fetcher_jericho.py`)

**Source:** Jericho Sailing Centre results pages (`jerichooutrigger.com/racesYYYY/`)  
**Auth:** None  
**Raw format:** HTML  
**Used for:** PNW Regional events (PNWORCA winter series, Gorge Downwind, Keats Chop, etc.)

**Usage (via CLI):**
```bash
python3 cli.py fetch-jericho 2025   # fetches all known 2025 Jericho races
```

**Limitations:** Only covers events listed in the Jericho race calendar. Coverage is inconsistent before 2024.

---

### 3. PDF Import (`bepc/fetcher_pdf.py`)

**Source:** PDF result files (manually downloaded)  
**Auth:** None  
**Raw format:** PDF  
**Used for:** Events where only PDF results are available

**Usage (via CLI):**
```bash
python3 cli.py import-pdf <file.pdf> --club pnw-regional --year 2024 \
    --race-id 99001 --name "Event Name" --date "Mar 1, 2024"
```

---

### 4. Race Result API (`bepc/fetcher_raceresult.py`)

**Source:** `my.raceresult.com` — used by Pacific Multisports (`gbrc.pacificmultisports.com`)  
**Auth:** None — per-event key is fetched dynamically from the public config endpoint. No stored secrets.  
**Raw format:** JSON (config + results)  
**Used for:** Pacific Multisports paddling events (Peter Marcus, Gorge Downwind, Narrows Challenge, etc.)

**How it works:**
1. Fetches `https://my.raceresult.com/{rr_id}/results/config` → gets dynamic key + contest list
2. Fetches `https://my-us-1.raceresult.com/{rr_id}/results/list?key=...` → gets results data
3. Parses grouped results (one group per course/distance)

**Event catalog:** `data/sources/pacificmultisports_events.json`  
Contains all known Pacific Multisports paddling events with their `gbrc_id` and `rr_id`.

**Usage (programmatic):**
```python
from bepc.fetcher_raceresult import fetch_event
from pathlib import Path

fetch_event(
    rr_id=281775,
    name="2024 Peter Marcus Rough Water Race",
    date="Mar 16, 2024",
    out_dir=Path("data/pnw-regional/2024/common")
)
```

**Usage (via CLI — to be added):**
```bash
python3 cli.py fetch-raceresult --club pnw-regional 281775 299092 313433
```

---

## API Keys & Secrets

| Fetcher | Secret | Storage |
|---------|--------|---------|
| WebScorer | `WEBSCORER_API_ID` | `.env` file (gitignored) |
| Jericho | None | — |
| PDF | None | — |
| Race Result | None (dynamic per-event key) | — |

**`.env` is in `.gitignore` — never commit it.**

If you need to set up a new environment:
```bash
cp .env.example .env
# Edit .env and add your WEBSCORER_API_ID
```

---

## Provenance Log

Each fetch appends a record to `data/{club}/{year}/common/provenance.jsonl`:

```json
{
  "race_id": 281775,
  "name": "2024 Peter Marcus Rough Water Race",
  "date": "Mar 16, 2024",
  "source": "raceresult",
  "method": "api",
  "url": "https://gbrc.pacificmultisports.com/Events/Results/1190",
  "raw_files": ["2024-03-16__281775__2024_Peter_Marcus_Rough_Water_Race.config.json", "...results.json"],
  "common_files": ["2024-03-16__281775__2024_Peter_Marcus_Rough_Water_Race__Long_Course.common.json"],
  "fetched_at": "2026-04-05T23:45:00+00:00"
}
```

---

## Adding a New Fetcher

1. Create `bepc/fetcher_{source}.py`
2. Implement `fetch_event(...)` with the standard contract (raw save + common write + provenance)
3. Import `log_provenance` and `save_raw` from `bepc.provenance`
4. Add CLI command in `cli.py`
5. Document here in `docs/FETCHERS.md`
6. Add event catalog to `data/sources/` if applicable
