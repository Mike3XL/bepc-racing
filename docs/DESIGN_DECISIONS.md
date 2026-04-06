# Design Decisions

Key architectural and algorithmic decisions made during development.
Each entry records the problem, decision, rationale, and rejected alternatives.

---

## Duplicate Race Source Detection
**Date:** 2026-04-05  
**Context:** `cli.py audit-sources`, `bepc/loader.py`

**Problem:** Two `.common.json` files may represent the same race fetched from different sources (e.g. Jericho + raceresult). Course names differ across sources ("Downwind Course" vs "Long Course - 10 miles").

**Decision:** Three-stage algorithm:
1. **Racer count** — if counts differ by >10%, not duplicates (fast reject)
2. **Finish time comparison** — sort all times, compare top-N. If ≥80% match within 2s tolerance, they're duplicates. Handles HH:MM vs HH:MM:SS, sub-second truncation.
3. **Detail diff** — if confirmed duplicate, diff racer names and craft values to surface canonicalization opportunities

**Key assumption:** Same official timer → same finish times. Minor format differences only.

**Rejected alternatives:**
- Course label normalization — fails cross-source naming differences
- Name matching — unreliable due to unicode/middle-name munging  
- Explicit source priority rules — requires manual maintenance per event type

---

## Club Carry-Over Handicap
**Date:** 2026-04-05  
**Context:** `cli.py build_data_json`, `bepc/processor.py`, `bepc/handicap.py`

**Problem:** PNW League racers do 1-3 events/year across seasons. Without carry-over, every season starts fresh and handicap never establishes.

**Decision:** Per-club `carry_over` flag in `data/clubs.yaml`. When true, final `handicap_post` from each season seeds the next season's starting handicap. Carried-over racers bypass the establishment check (`is_fresh_racer = False`).

**Key rule:** A carried-over handicap counts as already established — racer is immediately eligible for handicap awards.

**Rejected alternatives:**
- Global carry-over for all clubs — BEPC intentionally resets each season
- Rolling window (last N races across seasons) — more complex, harder to explain to racers

---

## Manifest-Based Source Selection
**Date:** 2026-04-05  
**Context:** `bepc/loader.py`, `data/{club}/{year}/common/manifest.json`

**Problem:** Multiple raw source files may exist for the same race. Need explicit control over which files are included in club history computation.

**Decision:** Optional `manifest.json` per `common/` folder. When present, only files in `include` list are loaded. When absent, all files loaded with time-based deduplication. `audit-sources` command generates manifests automatically.

**Manifest format:**
```json
{
  "include": ["file1.common.json", "file2.common.json"],
  "exclude": [{"file": "dup.common.json", "reason": "...", "preferred": "file1.common.json"}]
}
```

**Rejected alternatives:**
- Always deduplicate at load time — loses explicit human control, harder to audit
- Single global manifest — per-year is more manageable and git-diffable

---

## Establishment Races Per Club
**Date:** 2026-04-05  
**Context:** `bepc/handicap.py compute_new_handicap`, `data/clubs.yaml`

**Problem:** PNW League racers do few events/year — requiring 2 establishment races means most racers are always "EST". BEPC racers race weekly so 2 races is fine.

**Decision:** `establishment_races` configurable per club in `clubs.yaml`. PNW = 1, BEPC/Sound Rowers = 2. Passed through `process_season()` → `compute_new_handicap()`.

---

## Platform Multi-Club Architecture
**Date:** 2026-04-04  
**Context:** `bepc/generator.py`, `cli.py`, `data/clubs.yaml`

**Problem:** Site started as BEPC-only. Need to support multiple clubs (org clubs + community leagues) with per-club branding and shared racer pages.

**Decision:**
- All clubs processed into single `site/data.json`
- Per-club data files: `races-data-{club}.json`, `standings-data-{club}.json`, etc.
- Club selector (pill buttons) in selector bar, persisted via `localStorage`
- Racer pages are global (show all clubs)
- `data/clubs.yaml` is the authoritative club configuration

**Rejected alternatives:**
- Separate repos per club — too much duplication
- Separate generated sites — can't share racer pages across clubs
- URL-based club routing — requires server-side routing, incompatible with GitHub Pages static hosting
