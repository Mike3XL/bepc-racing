# BEPC Racing Analytics — Spec

## Overview

A Python CLI + static website for Ballard Elks Paddle Club (BEPC) race series analytics.
Processes WebScorer race results, computes dynamic handicaps, and publishes a static site to GitHub Pages.

## Architecture

```
WebScorer API
      │
      ▼
cli.py fetch              → data/bepc/<year>/common/*.common.json  ← source of truth
      │
cli.py process            → site/data.json + site/*-data.json
cli.py generate           → site/*.html + site/racer/*.html
cli.py publish            → gh-pages branch → GitHub Pages
```

## CLI Commands

| Command                                       | Description                                                    |
| --------------------------------------------- | -------------------------------------------------------------- |
| `python3 cli.py fetch --year YYYY <race_ids>` | Fetch races from WebScorer API → common.json                   |
| `python3 cli.py process`                      | Load common JSON → compute handicaps/points → `site/data.json` |
| `python3 cli.py generate`                     | Render all HTML + JSON data files from `site/data.json`        |
| `python3 cli.py publish`                      | Push `site/` to `gh-pages` branch                              |

## Site Pages

| Page                | Description                                                                    |
| ------------------- | ------------------------------------------------------------------------------ |
| `index.html`        | Race results — default landing page, prev/next nav, Handicap Order tab default |
| `events.html`       | Season race list with starters count                                           |
| `standings.html`    | Overall and handicap points standings (DataTables)                            |
| `trajectories.html` | Points and handicap charts (Chart.js, 3 tabs)                                  |
| `racer/<name>.html` | Per-racer page: trophy highlights, stats, charts, race history                 |
| `about.html`        | Handicap system explanation                                                    |

Nav order: Results → Events → Standings → Trajectories → Racers → About

## Data Files

HTML pages are thin shells that fetch JSON data on load. No inline data blobs.

| File                          | Used by                                          |
| ----------------------------- | ------------------------------------------------ |
| `site/data.json`              | Full processed season data (source for generate) |
| `site/races-data.json`        | Results page                                     |
| `site/standings-data.json`    | Standings page                                   |
| `site/index-data.json`        | Events page                                      |
| `site/trajectories-data.json` | Trajectories page                                |

## Handicap Algorithm (BEPC #1)

1. Sort racers by finish time
2. Par racer = finisher at 33rd percentile by adjusted time (min 10 racers; ⛳ trophy)
3. `adjusted_time = finish_time / handicap`
4. `time_vs_par = finish_time / par_adjusted_time`
5. Update handicap:
   - Race 1: `new_hcap = time_vs_par` (fresh racer)
   - Race 2: `new_hcap = 0.5 × old + 0.5 × time_vs_par` (fresh racer)
   - Faster than par: `new_hcap = 0.7 × old + 0.3 × time_vs_par`
   - Slower than par: `new_hcap = 0.85 × old + 0.15 × time_vs_par`
   - Outlier (>10% off): no change
6. Points: top 10 by finish place (10→1 pts, scaled by group weight); handicap points by adjusted place (not awarded to fresh racers)
7. Small group (<10 racers): no handicap update, no handicap points

## Trophies

Computed per race in `processor.py`, stored in `RacerResult.trophies` as a list of codes.

| Code       | Icon              | Tooltip         | Eligibility                 |
| ---------- | ----------------- | --------------- | --------------------------- |
| `finish_1` | 🥇 (plain)        | Overall 1st     | original_place == 1         |
| `finish_2` | 🥈 (plain)        | Overall 2nd     | original_place == 2         |
| `finish_3` | 🥉 (plain)        | Overall 3rd     | original_place == 3         |
| `hcap_1`   | 🥇 (gold badge)   | Handicap winner | top eligible adjusted place |
| `hcap_2`   | 🥈 (silver badge) | Handicap 2nd    | top eligible adjusted place |
| `hcap_3`   | 🥉 (bronze badge) | Handicap 3rd    | top eligible adjusted place |
| `par`      | ⛳ (plain)        | Par racer       | is_par_racer                |

Handicap trophies skip fresh racers (first 2 races) — awarded to top 3 eligible by adjusted place.
Finish trophies are always awarded regardless of fresh status.

Trophy display: leftmost column in results tables (both tabs show all trophies).
Racer pages: aggregate trophy counts per year/craft shown as highlights above charts.

## Name Aliases

`data/bepc/aliases.json` maps variant names → canonical names, applied at load time in `loader.py`.
Canonical name is the key used for all processing, standings, and racer pages.

## UI Conventions

- Handicap result is the primary competition — Handicap Order is the default/left tab
- Highlighted column: Adj Time on Handicap tab, Time on Finish tab (bold)
- Season selector persists across pages via localStorage (`bepc_season`)
- Result tab (Handicap/Finish) persists via localStorage (`bepc_result_tab`)
- Course/distance tab persists via localStorage (`bepc_distance`)
- Consistency in naming: "Overall 1st/2nd/3rd", "Handicap winner/2nd/3rd", "Par racer"
- All icons use Bootstrap tooltips (initialized after dynamic DOM injection)

## Data Model

### RacerResult fields (key computed fields)

```
handicap          float   handicap entering this race
handicap_post     float   handicap after this race
adjusted_place    int     place by adjusted time
time_versus_par   float   finish_time / par_adjusted_time
is_fresh_racer    bool    first or second race
is_outlier        bool    adjusted_time_vs_par > 1.1
is_par_racer      bool    finisher at 33rd percentile
trophies          list    e.g. ["finish_1", "hcap_2", "par"]
race_points       int     official points this race
handicap_points   int     handicap points this race
season_points     int     cumulative official points
season_handicap_points int cumulative handicap points
```

## Libraries

- **Bootstrap 5** — layout, components, tooltips
- **DataTables** — sortable/filterable tables
- **Chart.js** — line charts for trajectories and racer pages

## Hosting

GitHub Pages from `gh-pages` branch. URL: https://mike3xl.github.io/bepc-racing/
WebScorer API key stored in `.env` (gitignored), not committed.
