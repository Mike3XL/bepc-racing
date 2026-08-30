# Future Work

## High Priority

### Correction Transparency UI (marker + tooltip for manual corrections)
Add a visual marker (e.g. `*`) next to manually-corrected values, with a tooltip showing the source value and what was corrected. Raised 2026-08-30 after fixing Lambert Wixson's Da Grind 2026 time (1:08:13 in source PDF -> actual 1:00:13).

**Two distinct correction types, very different scale:**
- **Time/result corrections** — rare (2 total as of 2026-08-30: a `move` correction for Lisi Cole at Paddlers Cup 2026, and a note-only entry for Lambert Wixson's Da Grind time). High-stakes — changes a race outcome. Uses `meta.yaml`'s `corrections:` mechanism (`bepc/corrections.py`).
- **Name canonicalization** — routine, huge population (992 entries in `data/aliases.json` as of 2026-08-30). Ranges from simple typos to club-suffix stripping to genuine multi-person disambiguation.

**Open design questions (discussed 2026-08-30, not yet decided):**
- Scope the trial to time corrections only first (rarer, higher-value, easier to scope), or build both marker types together?
- Placement: time corrections obviously go on the result row. For name corrections — every occurrence of a corrected name across all race tables, or just once on the racer's own page (e.g. "also raced as: ...")?
- **Data plumbing gap:** once a correction/alias is applied, the original raw value doesn't survive into the built site's data model today. Time corrections: the pre-correction value only lives in a `meta.yaml` note (not machine-readable) or the original raw source file. Name corrections: the raw pre-alias name only lives in `raw/*.raw.json`/`raw/*.raw.html`, never propagated to `common.json` or beyond. Showing "original value" in a tooltip requires carrying that value forward through the load/build pipeline — a real pipeline change, not just a template tweak. See also "Alias Transparency" future-work item above, which covers the name-correction half of this same gap.

### Past Races — Meaningful "Completed" Entries
Currently past races are silently pruned from `upcoming.yaml`. Some events without WebScorer results still have web pages/results worth linking to (e.g. Seventy48, Ski to Sea, unofficial Facebook-organised races). Consider a "Recently Completed" section on the home page that:
- Keeps pruned entries with a `completed: true` flag (or separate `completed.yaml`)
- Shows them on the home page under recent races with a link to results/recap
- Expires after N weeks
- Allows manual entry of result links for non-WebScorer events

### Alias Decision Audit Trail
`name-decisions.json` records alias decisions (e.g. "Robert Schroeter" → "Robert Schade") but stores no context about *why* the decision was made, who made it, or what evidence supported it. Wrong decisions are hard to diagnose later.

Add to each alias entry:
- `reason`: brief human-readable explanation (e.g. "same person, different spelling" vs "same first name, different person — see Gorge 2024")
- `date`: ISO date when decision was recorded
- `source_races`: list of race IDs/names where the alias variant was first seen
- `confidence`: `high` / `medium` / `uncertain`
- `split_from`: for splits (one person → two canonical names), record the original merged name

Update `audit_names.py` to display this context when reviewing pending decisions, and to warn when `confidence` is `uncertain`.

Known bad decisions to fix: `"Robert Schroeter" → "Robert Schade"` and `"Robert Laubscher" → "Robert Schade"` (both wrong — different people; caused spurious results on Robert Schade's racer page).

### Remove Auto-Accept from audit-names, Add Confidence-Based Batching (2026-07-20)
`audit_names.py` used to auto-accept high-confidence fuzzy matches (`_AUTO_ACCEPT = 0.97`, plus low-volume and count-ratio heuristics) without human review. This caused numerous false merges of distinct people who happen to share a last name and race together (often families: Wyse, Probasco, Grocholski Jr./Sr., Denny, etc.) or have similar-looking names (Peter Hornsby/Peter Carlson → Peter Conmy at confidence 0.902). Found and fixed 2026-07-20 while investigating duplicate racer entries on the 2026 Gorge Downwind Champs page — see `data/name-decisions.json`'s `rejected`/removed entries and the corresponding cleanup in `data/aliases.json`.

Auto-accept has been removed entirely — **every** candidate now requires manual y/n/r/u/s/q review, and the confidence score is shown first at each prompt.

Also fixed as part of this: the site build (`build-site`/`build-club`) previously read `name-decisions.json`'s `aliases` section directly (`bepc/loader.py: _load_global_aliases`), which meant accepted-but-unmerged decisions could silently affect the live site without a deliberate merge step. The build now reads **only** `data/aliases.json`. `name-decisions.json` remains the working/reference file for the `audit-names` review process (pending/rejected/uniques), but its `aliases` section must be manually merged into `data/aliases.json` to take effect.

Future improvement — instead of auto-accepting, use the confidence score (and existing heuristics like `_is_club_suffix`, `_is_low_volume`, `_is_count_ratio_match` in `audit_names.py`, currently unused but left in place) to make the *review* more efficient without skipping it:
- Sort/group candidates by confidence so the highest-confidence (likely-correct) ones are reviewed first
- Batch visually similar candidates together for faster y/n scanning
- Surface a red flag when the raw/suggested pair's typical race placement differs wildly (see: Jonas Decker at 230th vs Jonas Ecker's 7th place finish — a large performance gap is a strong signal they are different people)
- Still require an explicit decision per name; never apply a merge without one

### Alias Transparency
When a racer's name is corrected via aliases.json, the original source name is lost. Add transparency so viewers can see when a result was listed under a different name in the source data.
- Store `original_name` in race result data when an alias is applied
- Option A: footnote on result page (e.g. "Listed as Ahmed Salem in source data")
- Option B: note on racer page listing all name variants seen
- Option C: both
Requires storing original name through the loader → processor → generator pipeline.

### Small Field Race Presentation
Small group races (< threshold racers) have no par time, so "vs Projected" shows -100% which is misleading. Tidy up the result page display for small field races:
- Hide or replace the vs Projected column (show "—" or "n/a")
- Consider suppressing the par racer row
- May also want a visual indicator that this was a small field race (no handicap update)

### Cross-Club Racer Links on Result Pages
Currently `racerLink()` on result pages only links to racers who have a page in the **current club**. Racers who meet the page threshold in another club (e.g. PNW but not the current club) show as plain text.

Since a racer page is a cross-club concept, result pages should link to the racer's page in whichever club has it. Requires:
- `RACER_SLUGS` to include slugs from all clubs (already explored)
- `racerLink()` to know which club has the page for a given slug, and build the correct relative URL (e.g. `../../pnw/racer/david-halpern.html` from `bepc-summer/results/`)
- Could use a `RACER_CLUB` map: `{slug: club_id}` embedded in each result page

### Short Label Configuration
Short race labels (used in charts and race dropdowns) are currently hardcoded in `generator.py` (`_SHORT_MAP`, `_SHORT_LABELS`). This makes them hard to review and update without touching Python code.

**Options:**
- **A** — `short_labels.json` per club (same pattern as `race_names.json`) — per-club control, easy to review
- **B** — Single global `data/short_labels.json` — one place for all clubs
- **C** — Extend `race_names.json` to include `short` field alongside `display` — one file per club, but breaking change
- **D** — Move `_SHORT_MAP` dict to `data/short_labels.json`, load at startup — minimal code change, easy migration

Recommendation: Option D short-term, Option A for per-club overrides later. Algorithmic patterns (`#N`, PNWORCA, BEPC series) stay in code.

### Results Table — "vs. Last Year" Column
Show each racer's time delta vs their time at the same race the prior year (raw time, e.g. `-1:23` faster or `+0:45` slower).

**Coverage analysis (as of 2026-04-12 — re-check before implementing):**
- 18 race/distance combos had prior-year data — all in PNW
- BEPC Monday races have unique names per week (no cross-year match)
- Sound Rowers races embed the year in the name (e.g. "Squaxin Island 2025" vs "Squaxin Island 2026") — won't match without year-stripping

**Implementation notes:**
- Column only shown when prior-year data exists for that race+distance
- Cross-year name matching requires stripping 4-digit years from base names before comparing (e.g. "Sound Rowers: Squaxin Island" as canonical key)
- With year-stripping, Sound Rowers recurring races (Squaxin, Lake Whatcom, etc.) would qualify — ~14 additional race/distance combos
- Only show for racers who have a time in both years; blank otherwise

## Medium Priority

### AI Agent Support
The site now generates `racer-data/{year}.json` files (slim, per-year, per-series) suitable for AI analysis. Next steps to enable agent-driven Q&A for users:

**Data infrastructure (done):**
- `racer-data/{year}.json` — slim per-year files (~50–750KB, ~12–190K tokens each)
- `racers.yaml` — age observations per racer for age-bracket queries

**Use cases to design for:**
- "Analyse my season" → single racer + one year (~2-5K tokens)
- "Compare me to [name]" → two racers, all years (~10K tokens)
- "Who is fastest in my age bracket?" → pre-filter by age in code, send top N to LLM
- "How have I improved over time?" → single racer, all years
- "Who should I be racing against?" → similar index, same craft, same series

**Architecture decision needed:**
- Option A: Fixed UI buttons (3-4 specific prompts, known data slices) — simplest, no backend
- Option B: Routing layer classifies question → fetches right data slice → calls LLM
- Option C: Agentic (LLM calls tools: `get_racer`, `get_year`, `get_age_bracket`) — most flexible, requires MCP server or function-calling backend

**Token budget (Gemini free tier: 1M tokens/day):**
- With smart pre-filtering: hundreds of queries/day
- Full-year files only needed for open-ended "tell me anything interesting" queries
- Per-racer queries are tiny — viable at scale

**Recommended first step:** Option A — add 2-3 specific "Analyse with AI" buttons to racer pages, each with a known data fetch and pre-built prompt. No backend needed, uses user's own Gemini/Claude account.

### Per-Race Handicap Notes on Racer Page
- Show handicap note (e.g. "Outlier — no change", "First race") in race history table. Currently visible via trophy badges but not as an explicit note column.

### Additional PNW events
- **Gorge Challenge** (Hood River) — separate organizer from Jericho/PNWORCA. Find their results source and add to fetcher.
- **Gorge Vortex** — Annual Hood River race. Find results source (likely WebScorer or their own site).
- **Jericho 2023 / 2024 backfill** — `cli.py fetch-jericho 2023` and `2024` for historical PNW data.
- **Pacific Multisports PDFs** — Peter Marcus 2022-2025, Narrows Challenge 2022-2025 (manual download + `cli.py import-pdf`).

### Multi-Person Name Canonicalization (ongoing)
Many team entries use inconsistent formats:
- `Last, First` format mixed with `First Last` (e.g. `Brown, Steve` → `Steve Brown`, `Moses, Dale`, `Kanieski, Charley`)
- Trailing spaces on solo names
- Team entries with comma-separated names (e.g. `Silver, Bernard, A.Storb, Chapin`) — these are fine as-is, skip
- Run `cli.py audit-names` to surface these systematically (command already exists)
- Ongoing: periodically run audit + add aliases

### % Performance Columns (additional ideas)
The primary "% vs hcap" column is implemented as **vs Projected**. Remaining ideas, lower priority:
- **% back from winner** — `(adj_time - winner_adj_time) / winner_adj_time × 100` — gap to handicap winner
- **% back from raw winner** — gap to overall finish winner
- Column selector (gear icon or "Columns" button) to show/hide optional columns
- Use % vs hcap variance for "consistent" award (low variance = truly consistent)

## Lower Priority

### Name Collision Detection and Splitting
When two different people share the same canonical name (e.g. a BC HPK paddler and a Seattle SUP paddler both named "Jonathan Foley"), the system merges their results and index incorrectly. Need a mechanism to:
- Detect suspicious collisions (same name, very different craft categories or geographically impossible same-day results)
- Split into distinct canonical names (e.g. suffix with location or club)
- Store the split in corrections/aliases so it persists across re-fetches

Known cases to investigate: Jonathan Foley (BEPC SUP 2017-2019 vs BC HPK at Board the Fjord 2026).

### GitHub Actions Publish
Move `cli.py publish` to a GitHub Actions workflow triggered on push to `main`. The action would run `bepc generate` then push the result to `gh-pages`, so publishing is fire-and-forget with no local wait. Requires all data files needed by `generate` to be committed to the repo (or fetched as part of the action).



### Future clubs
- **Wavechaser Paddle Series** — weekly Vancouver BC series, own club entry (Jericho Sailing Centre, 18 races/year May-Aug)
- **SCKC Friday Night Races** — already tracked as `sckc-duck-island`
- **PNW Canoe Sprint** — separate virtual club for sprint results (200m, 500m, 1000m, 1500m) — currently excluded from PNW

### Trajectory Page Filters
As more years are added, the trajectories page will have many racers. Consider adding:
- Filter by craft category (HPK, OC1, SUP, etc.)
- Filter by minimum races (e.g. show only racers with 5+ appearances)
- "Local regulars" toggle — hide racers who only appear in one large international event (e.g. Gorge Downwind)

### Terminology Consistency
Audit and standardize all user-facing labels for the indexed scoring system. Currently inconsistent across tooltips, column headers, podium labels, standings, trajectories, and racer pages. Candidate canonical vocabulary:
- **Index** — racer's pace multiplier
- **Par** — predicted time for a race (RacePar × Index)
- **vs Par** — % faster/slower than par (currently also "Improvement vs Par", "vs Projected")
- **Index Points** — points by par result (currently "Par Points", "Index Pts.", "Corrected Points", "Indexed Points")
- **Place vs Par** — ranking by par result (currently "Place (Indexed)", "Corrected time")
- All UI text strings live in `bepc/ui_text.py` — centralized, one build propagates everywhere.

## Done (removed from backlog)

- ✅ Generate/publish performance — `--club` flag now respected, no 4x redundant work (2026-05-05)
- ✅ `cli.py update` convenience command — chains fetch → process → generate → publish
- ✅ Email notifications on new race results via GitHub Actions process-results workflow
- ✅ Multiple seasons (2012-2026 live)
- ✅ Fetch command (`cli.py fetch`)
- ✅ Racer name normalization (aliases.json)
- ✅ Season selector on all pages
- ✅ Racer pages with career stats per season/craft
- ✅ Handicap points standings
- ✅ Trajectories page
- ✅ Trophy system (finish, handicap, consistent, par, streak, auto_reset)
- ✅ Data files (JSON) separate from HTML
- ✅ Mobile-friendly responsive layout
- ✅ 3-race establishment + auto-reset outlier lockout (2026-05-05)
- ✅ Responsive column headers on race results tables (2026-05-05)
- ✅ Streak trophy: consecutive races beating par, N≥3 (2026-04-17)
- ✅ Automated process-results GitHub Actions workflow (2026-04)
- ✅ Name canonicalization audit tool (`cli.py audit-names`) (2026-04)
- ✅ Multi-club data.json architecture (bepc-summer, pnw, sckc-duck-island, none)
- ✅ Sound Rowers + PNWORCA + Gorge etc. consolidated into PNW series
- ✅ Raw source data saved for every race + meta-yaml corrections (2026-04-27)
- ✅ Craft categorization including Sprint-C1/C2/C4 (2026-04)
- ✅ Club selector UI / Series page
- ✅ Results page column redesign: "Result vs Projected", "Overall Time" (2026-04)
- ✅ Custom domain pnw.paddlerace.org live
