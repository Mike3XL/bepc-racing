# Future Work

## High Priority

### Past Races — Meaningful "Completed" Entries
Currently past races are silently pruned from `upcoming.yaml`. Some events without WebScorer results still have web pages/results worth linking to (e.g. Seventy48, Ski to Sea, unofficial Facebook-organised races). Consider a "Recently Completed" section on the home page that:
- Keeps pruned entries with a `completed: true` flag (or separate `completed.yaml`)
- Shows them on the home page under recent races with a link to results/recap
- Expires after N weeks
- Allows manual entry of result links for non-WebScorer events

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
