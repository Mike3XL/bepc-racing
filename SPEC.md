# BEPC Racing Analytics — Spec

## Overview

A Python CLI + static website for Ballard Elks Paddle Club (BEPC) race series analytics.
Processes WebScorer race results, computes dynamic handicaps, and publishes a static site to GitHub Pages.

## Architecture

```
WebScorer (manual download)
        │
        ▼
data/common/*.common.json   ← source of truth
        │
   cli.py process           → site/data.json
   cli.py generate          → site/*.html + site/racer/*.html
   cli.py publish           → gh-pages branch → GitHub Pages
```

## CLI Commands

| Command | Description |
|---|---|
| `python3 cli.py process` | Load common JSON → compute handicaps/points → `site/data.json` |
| `python3 cli.py generate` | Render all HTML pages from `site/data.json` |
| `python3 cli.py publish` | Push `site/` to `gh-pages` branch |

## Site Pages

| Page | Description |
|---|---|
| `index.html` | Season hub, race list |
| `standings.html` | Official points standings (DataTables, sortable) |
| `handicap.html` | Handicap points standings |
| `races.html` | Per-race results with prev/next nav, finish + handicap order tabs |
| `trajectories.html` | Points and handicap charts (Chart.js, 3 tabs) |
| `racer/<name>.html` | Per-racer page: stats, charts, race history |
| `about.html` | Handicap system explanation |

## Handicap Algorithm (BEPC #1)

1. Sort racers by finish time
2. Par racer = finisher at 33rd percentile
3. `adjusted_time = finish_time / handicap`
4. `time_vs_par = finish_time / par_adjusted_time`
5. Update handicap:
   - Race 1: `new_hcap = time_vs_par`
   - Race 2: `new_hcap = 0.5 × old + 0.5 × time_vs_par`
   - Faster than par: `new_hcap = 0.7 × old + 0.3 × time_vs_par`
   - Slower than par: `new_hcap = 0.85 × old + 0.15 × time_vs_par`
   - Outlier (>10% off): no change
6. Points: top 10 finishers by original place (10 pts → 1 pt); handicap points by adjusted place (not awarded in first 2 races)

## Data Model

### common.json (per race)
```json
{
  "raceInfo": { "raceId", "name", "date", "displayURL", ... },
  "racerResults": [
    { "originalPlace", "canonicalName", "craftCategory", "gender", "timeSeconds", ... }
  ]
}
```

### data.json (season)
```json
{
  "races": [
    {
      "race_id", "name", "date", "display_url",
      "results": [ { all RacerResult fields } ]
    }
  ]
}
```

## Libraries

- **Bootstrap 5** — responsive layout and components
- **DataTables** — sortable/filterable tables
- **Chart.js** — line charts for trajectories

## Hosting

GitHub Pages from `gh-pages` branch. URL: https://mike3xl.github.io/bepc-racing/
