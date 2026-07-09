# Changes

## 2026-07-09

### New: Best-10-results annual points rule (BEPC Summer)

- Added `annualPointsRule` / `annualPointsRuleDescription` config per series in `data/clubs.yaml`. Default `countAll` (unchanged behavior); BEPC Summer set to `top10results`.
- Under `top10results`, a racer's season Finish Pts and Index Pts are each the sum of their best 10 per-race point values (independent per metric) — racing more than 10 times never lowers a racer's total.
- Standings page shows a banner with the rule description when the club's rule isn't `countAll`.
- Racer detail page's per-race table now mutes (greys out, with tooltip) points from races that didn't make a racer's top-10 set for that metric.
- Regression-tested: for every racer-season with ≤10 races, the new computation matches the old raw cumulative sum exactly (1065 bepc-summer records checked).

### New upcoming races

- The Westerly Relay (PNW, 7/12) — Gorge, WA
- Gorge Ultra Distance (PNW, 7/12) — SUP downwind race, same weekend
- Duck Island Race #1–7 (SCKC, weekly Fridays 7/10–8/21)

## 2026-06-01

### New: Urban Surf series

- Added `urban-surf` as a new club/series in the PNW site
- Fetched 59 races across 9 years: 2016, 2017, 2018, 2019, 2021, 2022, 2023, 2024, 2025 (2020 missing — no records)
- Data sources: organizer 60473 (primary, 2018+), 135348 (2021), 13754/Rob Casey (2016–2017)
- Added `race_names.json` for urban-surf: all races display as "Urban Surf #N"
- Added 7 upcoming 2026 races (Wednesdays, June 3 – July 22, Gasworks Park, 7 PM start)
- Added 11 name aliases for urban-surf racer variants
- Known data issue: craft is Unknown for 2018–2025 (blank at source) — to be resolved later

### Bug fixes

- **Fetcher: `AllRacers=True` grouping** — `_get_overall_groups()` now accepts both `Overall=True` and `AllRacers=True` WebScorer result groups. Previously, races using `AllRacers` (e.g. Urban Surf) were silently skipped.
- **Carry-over gap-year bug** — When a racer skips a season, their handicap and ranked-race count are now preserved into the next season. Previously, `carry_over` was rebuilt from scratch each season, dropping absent racers and resetting their establishment counter.
- **Upcoming races: show today** — Changed `race_date <= today` to `race_date < today` so races scheduled for today appear in the upcoming list until results are fetched.

### Data

- Fetched Guano Rocks 2026 (Sound Rowers, WebScorer 434155, 18 racers) — added `results_source` to upcoming.yaml
- Removed 2016/2017 Urban Surf races from `none/` (now in `urban-surf/`)



### Data

- Added 2020, 2021, 2022 seasons (50 races)
- Added name aliases for 2020-2021 variants (40+ merges)
- Fixed par racer selection: now uses adjusted time (not raw finish time)
- Fixed multi-group fetcher: unlabeled Overall groups now use largest group only

### Features

- Trophy system: finish podium (🥇🥈🥉), handicap podium (badged medals), consistent performer (🎯), par racer (⛳), streak awards (☄️ with streak length)
- Streak tracking: 3+ consecutive races of improving adjusted_time_vs_par
- Consistent performer: top 3 eligible racers closest to adjusted_time_vs_par = 1.0
- Trophy column in standings; trophy badges in results and racer pages

### UI

- Results page is now the landing page (index.html)
- Events page removed (redundant with Results race selector)
- Handicap Order is default/left tab on Results and Standings
- Standings: unified columns across both tabs, Handicap Points tab default
- Date added to race dropdown selector
- Season selector consistent (form-select-sm) across all pages
- "Official Points" renamed to "Overall Points" throughout
- Gender: Female/Male displayed as "Mixed"
- Removed duplicate trophy highlights bar from racer pages

### Architecture

- HTML pages now fetch separate JSON data files (no inline data blobs)
- WebScorer API key moved to .env (gitignored)
- Kiro steering file added (.kiro/steering/project.md)
- SPEC.md and README.md updated

### Code quality

- Removed unused imports (Optional, math)
- Fixed abs() on always-positive value in handicap.py
- Replaced fragile temp attributes with local dict for streak state
- Removed dead generate_index/events.html code
- Extracted \_season_opts() helper
