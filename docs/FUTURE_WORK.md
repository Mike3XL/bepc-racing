# Future Work

## High Priority

### Past Races — Meaningful "Completed" Entries
Currently past races are silently pruned from `upcoming.yaml`. Some events without WebScorer results still have web pages/results worth linking to (e.g. Seventy48, Ski to Sea, unofficial Facebook-organised races). Consider a "Recently Completed" section on the home page that:
- Keeps pruned entries with a `completed: true` flag (or separate `completed.yaml`)
- Shows them on the home page under recent races with a link to results/recap
- Expires after N weeks
- Allows manual entry of result links for non-WebScorer events

### Performance
- **Generation/publish is slow — possible 4x redundant work.** When running `cli.py generate --club X` for each of 4 clubs, the output log shows all 4 clubs being regenerated each time (not just the specified club). Investigate whether `generate` ignores the `--club` flag and always regenerates everything, and whether `publish` also re-runs generation. Fix so each `generate --club X` only generates that club, and `publish` only generates once.

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

### Coast Outdoors / Thursday Night Races
Add a club page for Coast Outdoors (Deep Cove Kayak) tracking their Thursday Night Race (TNR) series. Organizer ID: `deepcovekayak` on WebScorer. 2026 TNR races already posted (IDs 417450–423965). Also tracks Board the Fjord, Jericho Wavechaser, and other BC paddling events.

### Cross-Club Racer Links on Result Pages
Currently `racerLink()` on result pages only links to racers who have a page in the **current club**. Racers who meet the page threshold in another club (e.g. PNW but not the current club) show as plain text.

Since a racer page is a cross-club concept, result pages should link to the racer's page in whichever club has it. Requires:
- `RACER_SLUGS` to include slugs from all clubs (already explored)
- `racerLink()` to know which club has the page for a given slug, and build the correct relative URL (e.g. `../../pnw/racer/david-halpern.html` from `bepc-summer/results/`)
- Could use a `RACER_CLUB` map: `{slug: club_id}` embedded in each result page

### Multi-Person Name Canonicalization
Many team entries use inconsistent formats:
- `Last, First` format mixed with `First Last` (e.g. `Brown, Steve` → `Steve Brown`, `Moses, Dale`, `Kanieski, Charley`)
- Trailing spaces on solo names
- Team entries with comma-separated names (e.g. `Silver, Bernard, A.Storb, Chapin`) — these are fine as-is, skip
- Run `cli.py audit-names` to surface these systematically (command already exists)

### Short Label Configuration
Short race labels (used in charts and race dropdowns) are currently hardcoded in `generator.py` (`_SHORT_MAP`, `_SHORT_LABELS`). This makes them hard to review and update without touching Python code.

**Options:**
- **A** — `short_labels.json` per club (same pattern as `race_names.json`) — per-club control, easy to review
- **B** — Single global `data/short_labels.json` — one place for all clubs
- **C** — Extend `race_names.json` to include `short` field alongside `display` — one file per club, but breaking change
- **D** — Move `_SHORT_MAP` dict to `data/short_labels.json`, load at startup — minimal code change, easy migration

Recommendation: Option D short-term, Option A for per-club overrides later. Algorithmic patterns (`#N`, PNWORCA, BEPC series) stay in code.

### Racer History: Multi-Course Race Entries
When a racer enters multiple courses of the same race (e.g. SUP Challenge 2km + 5km on the same day), the racer history table shows two rows with the same race name. The course suffix (e.g. "— 2 KM SUP") is stripped. Fix: show the course suffix in the Race column when the racer has multiple entries for the same race_id. Low priority — rare edge case.

### Trending Faster Award
- Award for 3+ consecutive races of improving adjusted_time_vs_par (streak award already implemented — this is a variant)
- Consider: award on the race where streak _starts_ rather than each continuation

### Participation Awards
- Full season: completed every race in a season
- Debut: first ever race in the series

### Results Table — "vs. Last Year" Column
Show each racer's time delta vs their time at the same race the prior year (raw time, e.g. `-1:23` faster or `+0:45` slower).

**Coverage analysis (as of 2026-04-12):**
- 18 race/distance combos currently have prior-year data — all in PNW
- BEPC Monday races have unique names per week (no cross-year match)
- Sound Rowers races embed the year in the name (e.g. "Squaxin Island 2025" vs "Squaxin Island 2026") — won't match without year-stripping

**Implementation notes:**
- Column only shown when prior-year data exists for that race+distance
- Cross-year name matching requires stripping 4-digit years from base names before comparing (e.g. "Sound Rowers: Squaxin Island" as canonical key)
- With year-stripping, Sound Rowers recurring races (Squaxin, Lake Whatcom, etc.) would qualify — ~14 additional race/distance combos
- Only show for racers who have a time in both years; blank otherwise

## Medium Priority

### Cross-Distance Handicap
- Currently handicap keyed by `(name, craft)` — racer switching between Long/Short course shares one handicap
- Low risk in practice; fix if drift observed: key by `(name, craft, distance)`

### Per-Race Handicap Notes on Racer Page
- Show handicap note (e.g. "Outlier — no change", "First race") in race history table. Currently visible via trophy badges but not as an explicit note column.

### Racer Page Improvements
- Career stats across all seasons (total races, total trophies)
- Best season summary

### Additional PNW events
- **Gorge Challenge** (Hood River) — separate organizer from Jericho/PNWORCA. Find their results source and add to fetcher.
- **Gorge Vortex** — Annual Hood River race. Find results source (likely WebScorer or their own site).
- **Jericho 2023 / 2024 backfill** — `cli.py fetch-jericho 2023` and `2024` for historical PNW data.
- **Pacific Multisports PDFs** — Peter Marcus 2022-2025, Narrows Challenge 2022-2025 (manual download + `cli.py import-pdf`).

### % Performance Columns
Ideas discussed 2026-04-05. Implement incrementally.

**Candidate columns:**
- **% vs handicap** — `(1 - adj_time_vs_par) × 100` — did you beat your expected time? Positive = good. ✅ Implement first.
- **% back from winner** — `(adj_time - winner_adj_time) / winner_adj_time × 100` — gap to handicap winner
- **% back from raw winner** — gap to overall finish winner

**Design notes:**
- % vs hcap is currently shown as "vs Projected" column (implemented)
- Show on Handicap Order tab primarily
- Colour-code: green for positive (beat handicap), red for negative
- Future: column selector (gear icon or "Columns" button) to show/hide optional columns
- Future: use % vs hcap variance for "consistent" award (low variance = truly consistent)

## Lower Priority

### Update Command
- `cli.py update` chains: fetch → process → generate → publish
- Convenience for race night workflow

### Email/Notification
- Notify members when new race results are posted
- Simple GitHub Actions workflow triggered on publish

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
