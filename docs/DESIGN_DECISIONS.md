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

---

## Known Data Quality Issues (to fix)

- ~~**Race ID collisions in PNW Regional**~~ ✅ Fixed 2026-04-06 — `race_id` is now a namespaced string (`ws-{id}`, `jericho-{id}`, `pm-{id}`) derived from displayURL in `loader.py`. `RaceInfo.race_id` changed from `int` to `str`.
- **audit-sources cross-source matching** — "Gorgedownwind" vs "2025 Gorge Downwind Champs" similarity 0.67 < 0.70 threshold, not auto-detected. Consider lowering threshold or adding alias mapping.
- **Racer name canonicalization** — many duplicate/variant names across sources (e.g. "Mick Liddell" vs "Mike Liddell"). aliases.json handles some but not all.

---

## Outlier detection: faster results (2026-04-06)

**Problem:** Outlier suppression was firing for both fast and slow results (>10% from prediction in either direction), blocking genuine improvement jumps from updating the handicap.

**Decision:** Outlier detection only fires for results >10% **slower** than predicted. Faster results — including large improvement jumps — always get the normal 30% update. Rationale: a racer genuinely improving should have their handicap reflect that immediately; the risk of false positives (e.g. wind-assisted) is acceptable.

**Status:** Implemented 2026-04-06.

---

## Slow outlier / sandbagging (2026-04-06) — TABLED

**Problem:** When a racer is >10% slower than predicted, the handicap is frozen. This prevents sandbagging but also means a racer who has genuinely declined (injury, age, equipment change) can be stuck with an unachievable handicap indefinitely.

**Options considered:**
- Partial update on slow outlier (e.g. 5% toward result) — allows slow drift but opens sandbagging
- Consecutive slow outlier rule — update only after N consecutive outlier races
- Time-based decay — handicap drifts toward 1.0 if racer is consistently slow

**Decision:** Tabled. No change to slow outlier behavior for now. Revisit when we have more data on how often racers are genuinely stuck.

---

## URL Structure and Club/Year Navigation (2026-04-07)

**Problem:** Standings, races, and trajectories pages embed all clubs' data in one file with JS show/hide, inconsistent with racer pages (per-club files). Caused season selector bugs and stale localStorage state.

**Decision:** Option B — per-club files, year in URL hash.

**URL pattern:** `/standings-bepc.html#2025`, `/index-bepc.html#2024`, `/trajectories-pnw-regional.html#2025`, `/racer/bepc/mike-liddell.html#2025`

**Rules:**
- Club selector → `<a>` navigation to different file (real page load)
- Year selector → hash change only (no page reload, instant, bookmarkable)
- `pc_club` localStorage — remembers club when navigating to a new page type
- `pc_year` localStorage — remembers year across ALL navigation (club switches AND page type switches)
- On page load: read hash first, fall back to `pc_year`, fall back to club's current season
- `home.html` and `about.html` — global/cross-club, no per-club versions

**Rejected alternatives:**
- Option A (year in filename): file explosion (4 clubs × 7 years × 3 types = 84 files)
- Option C (localStorage only): year not bookmarkable, root cause of bugs we've been fixing
- Option D (keep single files): inconsistent with racer pages, all-clubs data bloat

---

## Per-race result pages + URL/state design (2026-04-07)

**Problem:** `results.html` used `location.hash` for race ID navigation, conflicting with year-in-hash on other pages. Also mixed "browse races" and "view race" concerns in one page.

**Decision:** Per-race HTML files with human-readable slugs.

**URL patterns:**
- `/index.html` — home (global)
- `/about.html` — about (global)
- `/{club}/races.html` — race list
- `/{club}/results/{date}-{short-name}.html` — individual race result (e.g. `2025-04-06-monday-18.html`)
- `/{club}/standings.html` — standings
- `/{club}/trajectories.html` — trajectories
- `/{club}/racer/{slug}.html` — racer page
- `/{club}/racer/index.html` — racer index

**Slug generation:** date + short label slugified. Collision check at generation time — warn and fall back to race ID suffix if collision detected.

**Hash usage:** Year only, on races/standings/trajectories pages (`#2025`). No hash on result pages or racer pages.

**localStorage:**
- `pc_club` — last visited club (used by global pages to resolve nav links)
- `pc_year` — last selected year (carried across page-type and club switches)
- `pc_distance` — last selected course tab (race-specific UI preference, persists naturally)
- `pc_result_tab` — last selected Handicap/Finish tab (UI preference)

**Why both hash and pc_year for year:**
- Hash = URL state (bookmarkable, back button works within page)
- pc_year = session context (carries year when navigating away to a different page)
- They are kept in sync: pc_year is written whenever hash changes

**`results.html` removed** — replaced entirely by per-race files.

---

## PNW League includes Sound Rowers races (2026-04-08)

**Decision:** All Sound Rowers races are included in the PNW Regional league.

**Implementation:** `include_clubs: [sound-rowers]` in clubs.yaml for pnw-regional. `build_data_json` merges included club races into the host club's seasons before processing.

**Handicap:** PNW uses its own independent handicap system — separate from Sound Rowers. PNW is treated as an independent club of racers who happen to attend Sound Rowers and other events. Handicap state is not shared between clubs.

**Ordering:** Races are merged by date across all included clubs before handicap processing, so the handicap progression reflects the actual chronological order racers competed.


---

## Series + Organizer + Tags (replacing Clubs)
**Date:** 2026-04-26
**Context:** `docs/SERIES_SYSTEM.md`, full data model rework

**Problem:** The club-based model conflated "who organized the race" with "what competitive field does this race belong to". This caused:
- Races shared across clubs (Sound Rowers' La Conner also in PNW Regional) were duplicated, with independent index computations and inconsistent eligibility verdicts for the same race.
- Fragmented indexes — a racer had a separate "Sound Rowers index" and "PNW index" from overlapping data.
- Casual races and serious races mixed in the same standings.

**Decision:** Replace the `club` concept with three separate dimensions:

1. **Series** — analytical grouping at a consistent competitive level. Fixed enum: `bepc-summer`, `sckc-duck-island`, `pnw`, `none`. Each race has exactly one series. Indexes are per-(racer, series).
2. **Organizer** — single ID identifying who ran the event. Filter-only.
3. **Tags** — free-form multi-valued labels. Filter-only.

**Eligibility rule** (replaces the earlier ">5 established" rule from 2026-04-26 afternoon):
- **Primary course:** eligible if `>5 established` racers OR `>10 total` starters.
- **Secondary course:** eligible if `>5 established` racers.
- "Established" means the racer has an index in *this series*.
- Only eligible races contribute to index updates.
- The total-starters rule for primary courses exists to seed a series when no racers are established yet.

**Rationale:**
- Separating organizer from series matches reality — a race has one organizer but its *competitive level* is an analytical choice.
- Per-series indexes prevent cross-field pollution (BEPC Monday casual field is different from PNW regional field).
- Primary-course seeding rule ensures new series can bootstrap indexes.
- Fixed series enum (not free-form) prevents proliferation and maintains meaningful bragging rights.

**Rejected alternatives:**
- Keep clubs but dedupe races across clubs — still conflates the two concerns.
- Free-form series tags — fragments the index and dilutes bragging rights.
- One global index per racer — ignores that different fields have different competitive density.

**Migration:** Complete rebuild. Old club URLs break. See `SERIES_SYSTEM.md` for plan.
