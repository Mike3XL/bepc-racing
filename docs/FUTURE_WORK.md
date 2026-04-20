# Future Work

## High Priority

## Past Races — Meaningful "Completed" Entries
Currently past races are silently pruned from `upcoming.yaml`. Some events without WebScorer results still have web pages/results worth linking to (e.g. Seventy48, Ski to Sea, unofficial Facebook-organised races). Consider a "Recently Completed" section on the home page that:
- Keeps pruned entries with a `completed: true` flag (or separate `completed.yaml`)
- Shows them on the home page under recent races with a link to results/recap
- Expires after N weeks
- Allows manual entry of result links for non-WebScorer events

## Performance
- **Generation/publish is slow — possible 4x redundant work.** When running `cli.py generate --club X` for each of 4 clubs, the output log shows all 4 clubs being regenerated each time (not just the specified club). Investigate whether `generate` ignores the `--club` flag and always regenerates everything, and whether `publish` also re-runs generation. Fix so each `generate --club X` only generates that club, and `publish` only generates once.

## Alias Transparency
When a racer's name is corrected via aliases.json, the original source name is lost. Add transparency so viewers can see when a result was listed under a different name in the source data.
- Store `original_name` in race result data when an alias is applied
- Option A: footnote on result page (e.g. "Listed as Ahmed Salem in source data")
- Option B: note on racer page listing all name variants seen
- Option C: both
Requires storing original name through the loader → processor → generator pipeline.

## Streak Trophy Definition (decided 2026-04-17)
**Definition:** N consecutive races beating par (adjusted_time_versus_par < 1.0). Trophy awarded at N≥3.
- Analysed B (decreasing atvp) vs C (beating par): C gives 425 instances max streak 9; B-fixed gives 51 instances max streak 4.
- C chosen: more achievable, longer streaks, clearly meaningful ("beat my predicted performance N races in a row").
- Note: beating par means beating *your own* predicted performance, not being the fastest racer.

## Small Field Race Presentation
Small group races (< threshold racers) have no par time, so "% from par" shows -100% which is misleading. Tidy up the result page display for small field races:
- Hide or replace the vs. Par column (show "—" or "n/a")
- Consider suppressing the par racer row
- May also want a visual indicator that this was a small field race (no handicap update)

## Coast Outdoors / Thursday Night Races
Add a club page for Coast Outdoors (Deep Cove Kayak) tracking their Thursday Night Race (TNR) series. Organizer ID: `deepcovekayak` on WebScorer. 2026 TNR races already posted (IDs 417450–423965). Also tracks Board the Fjord, Jericho Wavechaser, and other BC paddling events.

## Racer History: Multi-Course Race Entries
When a racer enters multiple courses of the same race (e.g. SUP Challenge 2km + 5km on the same day), the racer history table shows two rows with the same race name. The course suffix (e.g. "— 2 KM SUP") is stripped. Fix: show the course suffix in the Race column when the racer has multiple entries for the same race_id. Low priority — rare edge case.

## Cross-Club Racer Links on Result Pages
Currently `racerLink()` on result pages only links to racers who have a page in the **current club**. Racers who meet the page threshold in another club (e.g. sound-rowers) but not the current club (e.g. pnw-regional, threshold=3) show as plain text.

Since a racer page is a cross-club concept, result pages should link to the racer's page in whichever club has it. Requires:
- `RACER_SLUGS` to include slugs from all clubs (already explored)
- `racerLink()` to know which club has the page for a given slug, and build the correct relative URL (e.g. `../../sound-rowers/racer/david-halpern.html` from `pnw-regional/results/`)
- Could use a `RACER_CLUB` map: `{slug: club_id}` embedded in each result page

## Multi-Person Name Canonicalization
Many Sound Rowers and PNW Regional entries use inconsistent formats for multi-person teams:
- `Last, First` format mixed with `First Last` (e.g. `Brown, Steve` → `Steve Brown`, `Moses, Dale`, `Kanieski, Charley`)
- Trailing spaces on solo names: `David Scherrer `, `Kirk Christensen `, `Peter Hirtle `, `Dean Bumstead `, `Glenn Biernacki ` (sound-rowers); ` Team 1/5/8/11/13` (pnw-regional)
- Team entries with comma-separated names (e.g. `Silver, Bernard, A.Storb, Chapin`) — these are fine as-is, skip
- Run `cli.py audit-names` (future) to surface these systematically

## Short Label Configuration
Short race labels (used in charts and race dropdowns) are currently hardcoded in `generator.py` (`_SHORT_MAP`, `_SHORT_LABELS`). This makes them hard to review and update without touching Python code.

**Options:**
- **A** — `short_labels.json` per club (same pattern as `race_names.json`) — per-club control, easy to review
- **B** — Single global `data/short_labels.json` — one place for all clubs
- **C** — Extend `race_names.json` to include `short` field alongside `display` — one file per club, but breaking change
- **D** — Move `_SHORT_MAP` dict to `data/short_labels.json`, load at startup — minimal code change, easy migration

Recommendation: Option D short-term, Option A for per-club overrides later. Algorithmic patterns (`#N`, PNWORCA, BEPC series) stay in code.


- **Backfill missing races for years already tracked (2012–2019, 2022–2023).** 88 races identified on webscorer.com/soundrowers not yet fetched. Run `cli.py fetch webscorer --club sound-rowers --year YYYY <race_ids>` for each year. Race IDs documented in session 2026-04-16.
- **Add 2021 season** (4 races: 245217, 248722, 251152, 253391) — currently no 2021 folder.
- **Note:** Bainbridge Island Marathon IS a paddling event (open water kayak/canoe marathon). Include it. Short label: "Bainbridge".

## Next Steps (as of 2026-03-31)

### Immediate (before 2026 season starts ~April 6)
1. **Fetch 2026 BEPC races** as they happen each Monday — `cli.py fetch --club bepc --year 2026 <race_id>`
2. **Publish BEPC** after each race — `cli.py publish --club bepc`

### PNW Regional — data completion
3. **Fetch 2024 Jericho data** — `cli.py fetch-jericho 2024` (same races as 2025)
4. **Fetch 2023 Jericho data** — `cli.py fetch-jericho 2023`
5. **Pacific Multisports PDFs** — Peter Marcus 2022-2025, Narrows Challenge 2022-2025 (manual download + `cli.py import-pdf`) — note: Narrows Challenge is organized by GHCKC (same team as Paddlers Cup)
6. **Gorge Challenge** — find results source (separate organizer from Gorge Downwind)
7. **audit-names** — build name canonicalization audit for PNW Regional (many new racers, likely variants). Similar to `audit-crafts` — detect names appearing only once (possible typos), names with high similarity to others (possible duplicates). See normalization-principles.md for design guidance.

### PNW Regional — UX
8. **Season selector** on trajectories/standings for PNW Regional (already works for BEPC)
9. **Craft filter** on trajectories — filter by category (HPK, OC1, SUP, etc.)
10. **Race name cleanup** — Jericho slugs like "Pnworca1" should display as proper names

### UX polish
15. **Craft display cleanup** — two separate columns in results tables: "Category" (e.g. "Kayak") and "Craft" (e.g. "HPK", "SS"). Strip `-1` suffix from category in UX. Keep full category name in data.
16. **Outlier indicator** — when a result is flagged as an outlier (handicap not updated), show a `*` or `~` on the handicap value in the racer page with a tooltip: "Result excluded from handicap update (outlier)".
11. **Club selector UI** — once PNW Regional is stable, add club selector to site
12. **Sound Rowers 2023 data** — fetch remaining years from Jericho

### Future clubs
13. **Wavechaser Paddle Series** — weekly Vancouver BC series, own club entry
14. **SCKC Friday Night Races** — Seattle club series



- Fetch races as they happen each Monday night
- Run `cli.py fetch --year 2026 <race_id>` after each race, then process/generate/publish

### PNW Regional Virtual Club

A curated virtual club aggregating distance events from regional organizers:

- **Scope**: Sound Rowers, PNWORCA, Gorge Downwind Champs, Vortex, and similar
- **Curation**: hand-picked events meeting a quality/consistency bar — not every event qualifies, BEPC weekly races excluded
- **Typical format**: 1-2 courses per event, 3-15 miles; occasional ultra (26.2+) flagged separately
- **Cross-season handicap carry-over**: essential — most racers do 1-3 events/year so carry-over prevents permanent fresh status
- **Data sources**: WebScorer (already works), PaddleGuru (needs CSV import or scraping)
- **Architecture**: new `data/pnw-regional/` club directory, curated `common.json` files per event
- **Key challenge**: PaddleGuru is JS-rendered — need manual CSV export from organizers or browser automation

### Trending Faster Award

- Award for 3+ consecutive races of improving adjusted_time_vs_par (streak award implemented)
- Consider: award on the race where streak _starts_ rather than each continuation

### Participation Awards

- Full season: completed every race in a season
- Debut: first ever race in the series

### % Performance Columns (race results table)

Ideas discussed 2026-04-05. Implement incrementally.

**Candidate columns:**
- **% vs handicap** — `(1 - adj_time_vs_par) × 100` — did you beat your expected time? Positive = good. ✅ Implement first.
- **% from par** — same number, opposite sign framing (alternative to above, not both)
- **% back from winner** — `(adj_time - winner_adj_time) / winner_adj_time × 100` — gap to handicap winner
- **% back from raw winner** — gap to overall finish winner

**Design notes:**
- % vs hcap and % from par are the same data, different framing — pick one
- % vs hcap (positive = good) is more racer-friendly
- Show on Handicap Order tab primarily
- Colour-code: green for positive (beat handicap), red for negative
- Future: column selector (gear icon or "Columns" button) to show/hide optional columns
- Future: use % vs hcap variance for "consistent" award (low variance = truly consistent)

**Award criteria review (2026-04-05):**
- Par + streak coexistence is valid: par racer performed exactly at handicap, streak means they've been improving toward it
- Consistent = "closest to adj_time_vs_par = 1.0 this race" — this is correct; racing at your handicap puts you at par by definition
- Streak uses `adjusted_time_vs_par` improvement — note: this is partly affected by par racer's time varying race to race. Future: consider using absolute time improvement instead.

## Medium Priority

### Multi-Club Support

- Architecture already supports multiple clubs in data.json
- Need club selector UI on all pages
- Racer pages already show per-club sections
- Aliases and data live under `data/<club>/`

### Cross-Distance Handicap

- Currently handicap keyed by `(name, craft)` — racer switching between Long/Short course shares one handicap
- Low risk in practice; fix if drift observed: key by `(name, craft, distance)`

### Per-Race Handicap Notes on Racer Page

- Show handicap note (e.g. "Outlier — no change", "First race") in race history table

### Racer Page Improvements

- Career stats across all seasons (total races, total trophies)
- Best season summary

### Custom Domain

- Register `bepcracing.com` or similar (~$12/yr)
- Add CNAME to GitHub Pages settings

## Lower Priority

### Update Command

- `cli.py update` chains: fetch → process → generate → publish
- Convenience for race night workflow

### Email/Notification

- Notify members when new race results are posted
- Simple GitHub Actions workflow triggered on publish

### Sound Rowers Integration

- Sound Rowers organizes many regional events — large fields, multiple series
- Would use multi-club architecture already in place

### Trajectory Page Filters (PNW Regional)

As more years are added, the trajectories page will have many racers. Consider adding:
- Filter by craft category (HPK, OC1, SUP, etc.)
- Filter by minimum races (e.g. show only racers with 5+ appearances)
- "Local regulars" toggle — hide racers who only appear in one large international event (e.g. Gorge Downwind)

This is especially relevant for PNW Regional where events like Gorge Downwind draw 600+ international racers who never appear elsewhere.

### Club vs Regional Event Distinction

Two types of organizations to track separately:

**Weekly club series** (each gets its own club entry, like BEPC):
- BEPC — Monday nights, Seattle
- Wavechaser Paddle Series — weekly May-Aug, Jericho Sailing Centre, Vancouver BC (18 races/year)
- SCKC Friday Night Races — Seattle Canoe and Kayak Club

**Regional open-water events** → PNW Regional virtual club:
- PNWORCA Winter Series (#1-7, Jan-Mar, various PNW locations)
- Peter Marcus Rough Water Race (Bellingham, March)
- Gorge Downwind Champs (Hood River, July)
- Sound Rowers events (La Conner, Rat Island, Commencement Bay, etc.)
- Narrows Challenge, Keats Chop, Board the Fjord, etc.

**Exclude from PNW Regional:** OC6-only races, Hawaii/California events, weekly club series, team relays.

**PNW Regional craft scope:** Primarily single and double craft (HPK, OC1, OC2, V1, FSK, SK, SUP) — not exclusive, but that's the focus. OC6 and larger team boats are generally excluded unless they appear alongside smallboat divisions in the same event.

**Minimum distance: ~1 mile.** Sprint events (200m, 500m, 1000m, 1500m) are excluded — they are a separate discipline. Future work: PNW Canoe Sprint virtual club for sprint results.

**TODO - Gorge Challenge:** Separate organizer from Jericho/PNWORCA. Need to find their results source and add to fetch-jericho or a new fetcher. Search for "Gorge Challenge paddle race Hood River" to find their site.

**TODO - Gig Harbor (GHCKC) Paddlers Cup:** Organized by Gig Harbor Canoe & Kayak Club. Same team also runs the Narrows Challenge. Need to find their results source (WebScorer, PaddleGuru, or own site). Search "GHCKC Paddlers Cup" and "Gig Harbor Canoe Kayak Club" to find results.

## Done (removed from backlog)

- ✅ Multiple seasons (2020-2025 live)
- ✅ Fetch command (`cli.py fetch`)
- ✅ Racer name normalization (aliases.json)
- ✅ Season selector on all pages
- ✅ Racer pages with career stats per season/craft
- ✅ Handicap points standings
- ✅ Trajectories page
- ✅ Trophy system (finish, handicap, consistent, par, streak)
- ✅ Data files (JSON) separate from HTML
- ✅ Mobile-friendly responsive layout

## Results Table — "vs. Last Year" Column

Show each racer's time delta vs their time at the same race the prior year (raw time, e.g. `-1:23` faster or `+0:45` slower).

**Coverage analysis (as of 2026-04-12):**
- 18 race/distance combos currently have prior-year data — all in PNW Regional
- BEPC Monday races have unique names per week (no cross-year match)
- Sound Rowers races embed the year in the name (e.g. "Squaxin Island 2025" vs "Squaxin Island 2026") — won't match without year-stripping

**Implementation notes:**
- Column only shown when prior-year data exists for that race+distance
- Cross-year name matching requires stripping 4-digit years from base names before comparing (e.g. "Sound Rowers: Squaxin Island" as canonical key)
- With year-stripping, Sound Rowers recurring races (Squaxin, Lake Whatcom, etc.) would qualify — ~14 additional race/distance combos
- Only show for racers who have a time in both years; blank otherwise

## Custom Domain — paddlerace.org

**Plan:**
- Buy `paddlerace.org` via **Cloudflare Registrar** (~$9.77/yr, no markup, best DNS)
- `paddlerace.org` and `www.paddlerace.org` → redirect to `pnw.paddlerace.org`
- `pnw.paddlerace.org` → the actual site (GitHub Pages custom domain)

**Setup steps:**
1. Register `paddlerace.org` at cloudflare.com/products/registrar
2. In GitHub repo Settings → Pages → Custom domain: set `pnw.paddlerace.org`
3. In Cloudflare DNS: add CNAME `pnw` → `mike3xl.github.io`
4. In Cloudflare: add redirect rules for `paddlerace.org` and `www.paddlerace.org` → `https://pnw.paddlerace.org`
5. GitHub Pages will auto-provision SSL for `pnw.paddlerace.org`

**URL structure:** `pnw.paddlerace.org/<club>` (e.g. `pnw.paddlerace.org/bepc`)
- Requires adding `/pnw/` prefix to generated paths (one-time refactor, do before external links exist)
- Or keep current flat paths and just point the subdomain at the existing site — simpler, defers the refactor

**Multi-region expansion path:**
- Each region gets its own subdomain (`ca.paddlerace.org`, `aus.paddlerace.org`)
- Independent organizers run their own repos/sites per subdomain — no coordination needed
- `paddlerace.org` becomes a real landing/directory page when 2+ regions exist
- Owning the apex domain gives free control over all subdomains — no extra cost per region
