# PaddleClub

Race results, standings, and performance tracking for open-water paddling clubs and regional leagues in the Pacific Northwest. Built for the data-curious paddlers who love stats, trends, and friendly competition.

**Live site:** https://pnw.paddlerace.org/

**Clubs tracked:** BEPC (2015–2026), Sound Rowers (2012–2026), SCKC (2015–2026), PNW Regional league (2017–2026) — 960+ races across 4 clubs.

## Quick Start

```bash
# Check for new races and publish (does everything)
python3.13 cli.py update-site pnw

# After a BEPC Monday race (manual fetch needed — no auto-discovery)
python3.13 cli.py fetch webscorer --club bepc --year 2026 <race_id>
python3.13 cli.py build-site pnw
python3.13 cli.py publish-site pnw

# Fast single-club build for local testing (~3s vs ~30s for full site)
python3.13 cli.py build-club bepc
python3.13 cli.py serve          # http://localhost:8080

# Full site build + publish
python3.13 cli.py build-site pnw
python3.13 cli.py publish-site pnw
```

## CLI Commands

```
# Data refresh
update-club <club> [--dry-run] [--year Y]   # auto-discover + fetch new races
update-site <site> [--dry-run]              # update all clubs in site

# Manual fetch
fetch webscorer --club X --year Y <ids>
fetch jericho --club X --year Y
fetch jericho-url --club X <url> --year Y --race-id N --name "..." --date "..."
fetch raceresult --club X --year Y <event_ids>
fetch pdf <file> --club X --year Y --race-id N --name "..." --date "..."

# Build
build-club <club>        # fast single-club build (~3s)
build-site <site>        # full site build (~30s)

# Publish
publish-site <site>      # push to GitHub Pages

# Diagnostics
audit-crafts
audit-sources --club X
serve [--port N]
```

## Site Config

Sites are defined in `data/clubs.yaml`:
```yaml
sites:
  pnw:
    domain: pnw.paddlerace.org
    clubs: [bepc, sound-rowers, pnw-regional, sckc]
    gh_branch: gh-pages
    gh_url: https://pnw.paddlerace.org/
```

## Setup

Requires Python 3.13. Install dependencies:
```bash
pip3.13 install pyyaml
```

## Data Sources

| Source | Fetch command | Used by |
|---|---|---|
| WebScorer API | `fetch webscorer` | BEPC, Sound Rowers, SCKC, many PNW Regional events |
| Jericho HTML | `fetch jericho YYYY` | PNWORCA races |
| Pacific Multisports PDF | `fetch pdf <file> ...` | Peter Marcus, Narrows Challenge |
| Race Result API | `fetch raceresult` | Gorge Downwind Champs |

## Key Files

| File | Purpose |
|---|---|
| `data/clubs.yaml` | Club config, handicap settings, site definitions |
| `data/<club>/aliases.json` | Racer name aliases (variant → canonical) |
| `data/<club>/race_names.json` | Race display name overrides |
| `data/upcoming.yaml` | Upcoming races (auto-synced + manual entries) |
| `docs/FUTURE_WORK.md` | Backlog and design notes |

## Par Racer
The par racer is the finisher at ~33rd percentile by **adjusted time** (not finish time). Adjusted time = finish time ÷ handicap.

## Project Structure

```
bepc-racing/
├── cli.py                      # Entry point: fetch / process / generate / publish / serve
├── .env                        # WebScorer API key (gitignored)
├── bepc/
│   ├── models.py               # Dataclasses: RaceInfo, RacerResult, RunningRecord
│   ├── loader.py               # Load common.json files, apply name aliases
│   ├── fetcher.py              # Fetch races from WebScorer API
│   ├── fetcher_jericho.py      # Fetch PNWORCA races from Jericho HTML
│   ├── handicap.py             # Handicap engine (par racer, BCH calculation)
│   ├── points.py               # Points calculation
│   ├── craft.py                # Craft category normalization
│   ├── processor.py            # Season processing pipeline
│   └── generator.py            # HTML + JSON data file generation
├── data/
│   ├── clubs.yaml              # Club configuration (name, type, short_name, etc.)
│   ├── upcoming.yaml           # Upcoming races for home page
│   ├── sources/                # External source metadata (WebScorer event lists, etc.)
│   ├── bepc/<year>/common/     # Normalized per-race JSON (source of truth)
│   ├── sound-rowers/<year>/common/
│   ├── sckc/<year>/common/
│   └── pnw-regional/<year>/common/
├── site/                       # Generated static site (gitignored)
│   ├── index.html              # Home page
│   ├── about.html
│   ├── clubs.html
│   ├── bepc/                   # Per-club pages
│   ├── sound-rowers/
│   ├── sckc/
│   └── pnw-regional/
└── SPEC.md                     # Architecture and design spec
```

## Site Pages

| Page | Description |
|---|---|
| `index.html` | Home — recent races with full podiums, upcoming races, club list |
| `clubs.html` | All clubs overview |
| `about.html` | Handicap system explanation and data sources |
| `<club>/races.html` | Season race list |
| `<club>/standings.html` | Overall and handicap points standings |
| `<club>/trajectories.html` | Points and handicap charts |
| `<club>/racer/<name>.html` | Per-racer stats, charts, race history |

## Handicap System

Uses a dynamic multiplicative handicap (Time Correction Factor):

- **Adjusted time** = finish time ÷ handicap
- **Par racer** = finisher at ~33rd percentile by adjusted time
- Handicap updates asymmetrically: faster results shift 30%, slower shift 15%
- Outliers (>10% from prediction) are ignored

See [About page](https://mike3xl.github.io/bepc-racing/about.html) for full explanation.

## Status

| Club | Years | Status |
|---|---|---|
| BEPC | 2020–2026 | ✅ Active |
| Sound Rowers | 2022–2025 | ✅ Imported |
| SCKC | 2024–2025 | ✅ Imported |
| PNW Regional | 2019–2026 | ✅ Active |
