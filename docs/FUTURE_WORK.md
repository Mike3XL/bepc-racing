# Future Work

## High Priority

### Multiple Seasons
- `data.json` restructured as `{ "seasons": [...], "current_season": 2026 }`
- Season selector on standings, trajectories, races pages
- Racer pages show career stats across seasons
- Current season defaults everywhere

### Fetch Command (`bepc fetch`)
- Download race results directly from WebScorer API
- `bepc fetch <race-id>` → saves to `data/raw/` and converts to `data/common/`
- Needs WebScorer API key (or scraping the public results page)
- Replaces manual download workflow

### Update Command (`bepc update`)
- Chains: `fetch` → `process` → `generate` → `publish`
- Run after each race night

## Medium Priority

### Corrections System
- `data/corrections.json` — field-level overrides (name normalization, time corrections)
- Applied during `process` step before handicap calculation
- CLI: `bepc correct <race-id> <racer> <field> <value>`

### Racer Name Normalization
- WebScorer sometimes records same person with slightly different names
- Need a canonical name mapping file
- Affects handicap continuity across seasons

### Per-Race Handicap Notes on Racer Page
- Show handicap note (e.g. "Outlier — no change", "First race") in race history table

### Search / Filter on Standings
- DataTables search already works; consider adding craft category filter buttons

## Lower Priority

### Custom Domain
- Register `bepcracing.com` or similar (~$12/yr)
- Add CNAME to GitHub Pages settings

### 2024 and Earlier Season Data
- Backfill historical data if available from WebScorer
- Would populate career stats on racer pages

### Email/Notification
- Notify members when new race results are posted
- Could be a simple GitHub Actions workflow

### Mobile App
- Out of scope for now; responsive site covers mobile use case

### Multiple Clubs (Sound Rowers, SCKC, etc.)
- Sound Rowers organizes many regional events per year — large fields, multiple series
- Racer pages should show separate sections per club, tabs per season within each club
- Each club/season has independent handicap history and points
- Cross-club handicap carry-over is possible if courses are comparable (future consideration)
- Course normalization may be needed if clubs race different distances



The current static-site approach is intentionally simple and sufficient for v1.
If BEPC grows or needs member accounts, the next step would be:
- AWS S3 + CloudFront for hosting (already designed in original SPEC)
- Cognito for member authentication
- Lambda API for dynamic queries

For now, static + GitHub Pages is the right call.
