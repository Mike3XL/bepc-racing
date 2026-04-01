# Future Work

## High Priority

### 2026 Season

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
