# Future Work

## High Priority

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
