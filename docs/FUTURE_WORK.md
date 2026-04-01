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
