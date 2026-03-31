# Changes

## 2026-03-30

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
