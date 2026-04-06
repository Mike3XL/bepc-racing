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

## Handicap Normalization (Per-Race Rescaling)
**Date:** 2026-04-05  
**Context:** `bepc/processor.py`, `bepc/handicap.py`

**Problem:** Without normalization, handicap values drift upward over time as the fleet composition changes. With carry-over enabled, inflated values from early seasons propagate forward — resulting in all racers having hcap>1.0 even after years of racing.

**Decision:** After each race's handicap updates, rescale all `handicap_post` values so the par racer = 1.0. Divide every racer's new handicap by the par racer's new handicap.

**Properties:**
- Preserves relative ordering perfectly (ratios unchanged)
- Par racer always has hcap=1.0 after each race
- System cannot drift — self-correcting every race
- hcap=1.0 has a stable, intuitive meaning: "you perform at the par level (33rd percentile)"
- hcap<1.0 means faster than par; hcap>1.0 means slower

**Rejected alternatives:**
- End-of-season rescaling only — corrects drift but allows within-season drift
- "Pushed towards 1.0" (partial rescaling) — adds complexity without clear benefit
- No rescaling — causes long-term drift as shown in BEPC 2024 data

**Config:** Applied per-club. BEPC: carry_over=true + rescaling. PNW League: TBD.
**Date:** 2026-04-05  
**Context:** `bepc/handicap.py compute_new_handicap`, `data/clubs.yaml`

**Problem:** PNW League racers do few events/year — requiring 2 establishment races means most racers are always "EST". BEPC racers race weekly so 2 races is fine.

**Decision:** `establishment_races` configurable per club in `clubs.yaml`. PNW = 1, BEPC/Sound Rowers = 2. Passed through `process_season()` → `compute_new_handicap()`.

---

## Data Fetch Architecture
**Date:** 2026-04-05  
**Context:** `cli.py`, `data/clubs.yaml`, `bepc/fetcher*.py`

**Problem:** Race results exist in scoring systems (WebScorer, raceresult, Jericho). Multiple clubs may want the same race. How to organize fetching and storage?

**Decision: Club-first fetch, optionally shared storage**

- **Club is the primary unit** — `clubs.yaml` defines what races belong to each club (organizer IDs, URL patterns, specific events)
- **Fetch operates per-club** — "fetch BEPC races" pulls from BEPC's configured organizers
- **Storage is an implementation detail** — `data/raw/` and `data/common/` can be shared or per-club; the **manifest** is the authoritative include list for each club
- **Fix-up logic** (raw → common conversion, aliases, craft normalization) is per-club — each club needs its own `common/` files. Raw files may be shared.
- **Cross-club sharing** — if a Sound Rowers race also belongs to PNW League, the common file can be symlinked or copied; manifests handle inclusion independently

**Key tenet:** Clubs must be separable — different clubs can be hosted on different sites or maintained by different people. Club config is self-contained.

**Implication:** WebScorer organizer IDs stored in `clubs.yaml` under `race_inclusion.include_organizers` per club. `fetch` command reads the club's organizer list. Already in spec — needs wiring.

**Rejected alternative:** Source-first (fetch by scoring system, distribute to clubs) — violates club separability tenet; clubs become dependent on a shared fetch layer.

**Note (2026-04-05):** In practice, some "clubs" in the system are actually race series organized by a club (e.g. Coast Outdoors runs both TNR weekly series and larger open events like Whipper/Board the Fjord). The manifest system handles this naturally — a club's manifest includes whichever series races are relevant, regardless of organizer. No structural change needed yet.
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

---

## Handicap Establishment vs Eligibility
**Date:** 2026-04-05  
**Context:** `bepc/handicap.py`, `bepc/processor.py`, `bepc/models.py`

**Two distinct concepts:**

- **Established** — handicap has converged. `num_races >= establishment_races`. Gets slow updates (0.30 faster / 0.15 slower), outlier detection active.
- **Eligible** — can win handicap awards. Requires `carried_over=True` OR `established`. EST badge shown when NOT eligible.

**Season start with carry-over:**
- Carried-over racers: `num_races=0`, `carried_over=True`
- They are **eligible** (no EST badge) but **not yet established**
- First `establishment_races` of new season: fast 50/50 updates, no outlier detection
- After that: normal slow updates resume

**New racers (no carry-over):**
- `num_races=0`, `carried_over=False`
- Not eligible (EST badge shown)
- Same fast 50/50 updates for first `establishment_races`
- Become eligible + established after `establishment_races`

**Rationale:** Establishment is about convergence speed, not eligibility. Carried-over racers have a known starting point but may need fast correction after a season gap.
**Date:** 2026-04-05  
**Context:** `cli.py`, `bepc/generator.py`, `data/clubs.yaml`

**Current state:** "Season" and "year" are used interchangeably. Season keys in the data model are 4-digit year strings ("2024", "2025"). All current clubs run one season per calendar year.

**JS dependency on year-as-number:** The racer page JS does `parseInt(a.split('-').pop())` to extract a numeric year from tab IDs like `s-bepc-2024`. This assumes the season key is a sortable integer. Season keys like "2024-Summer" would break this.

**To support non-year seasons in future** (e.g. "2024-Summer", "2024-Winter"):
- Change tab ID format to avoid relying on `parseInt` of the season key
- Update `sorted(years.keys())` to use explicit sort order rather than string sort
- Update `getSeason()`/`setSeason()` localStorage to handle non-numeric keys
- Update `current_season` logic in `build_data_json`

**Decision:** No change now. Season = year for all current clubs. Note as technical debt if non-annual seasons are ever needed.
