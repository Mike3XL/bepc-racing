# PaddleClub — Spec

## Overview

A Python CLI + static website for open-water paddling club race analytics.
Supports multiple clubs and regional leagues. Processes race results from multiple sources,
computes dynamic handicaps, and publishes a static site to GitHub Pages.

## Architecture

```
Data Sources (WebScorer API, Jericho HTML, PDF, Race Result)
      │
      ▼
cli.py fetch / fetch-jericho / import-pdf
      │
      ▼
data/<club>/<year>/common/*.common.json     ← source of truth
      │
cli.py process    → site/data.json
cli.py generate   → site/*.html + site/<club>/*.html + site/<club>/racer/*.html
cli.py publish    → gh-pages branch → GitHub Pages
```

## CLI Commands

| Command | Description |
|---|---|
| `cli.py fetch --club CLUB --year YYYY <ids>` | Fetch from WebScorer API → common.json |
| `cli.py fetch-jericho YYYY` | Fetch PNWORCA races from Jericho HTML |
| `cli.py import-pdf <file> --club CLUB --year YYYY --race-id N --name NAME --date DATE` | Import PDF results |
| `cli.py process` | Load all common JSON → compute handicaps/points → `site/data.json` |
| `cli.py generate [--club CLUB]` | Render all HTML + JSON data files |
| `cli.py publish [--club CLUB]` | Push `site/` to `gh-pages` branch |
| `cli.py serve` | Local HTTP server on port 8080 |
| `cli.py audit-crafts` | Check for Unknown/multi-match craft values |

## Club Configuration

Clubs are defined in `data/clubs.yaml`. Each club has:
- `id` — directory name and URL slug
- `name`, `short_name` — display names
- `type` — `org` (real club) or `league` (virtual, curated)
- `seasons` — populated by processor from common.json files

Leagues (e.g. PNW Regional) aggregate races from multiple organizers that share a common field of competitors. A race may appear under both its organizing club and a league.

## Site Pages

| Page | Description |
|---|---|
| `index.html` | Home — recent races (full podiums by course), upcoming races, club list |
| `clubs.html` | All clubs with race counts and year ranges |
| `about.html` | Handicap system explanation, data sources, references |
| `<club>/races.html` | Season race list with starters count |
| `<club>/standings.html` | Overall and handicap points standings |
| `<club>/trajectories.html` | Points and handicap charts (Chart.js) |
| `<club>/racer/<name>.html` | Per-racer: stats inline with name, charts, race history by season |

Nav: Home → Clubs → Races → Standings → Trajectories → Racers → About
Club and season selectors persist via localStorage. Racer search in navbar on all pages.

## Data Files

| File | Used by |
|---|---|
| `site/data.json` | Full processed data (source for generate) |
| `site/<club>/races-data.json` | Races page |
| `site/<club>/standings-data.json` | Standings page |
| `site/<club>/trajectories-data.json` | Trajectories page |
| `site/<club>/racer/<name>.html` | Inline data (generated per racer) |

## Handicap Algorithm

1. Sort racers by finish time
2. Par racer = finisher at 33rd percentile by adjusted time (min 10 racers)
3. `adjusted_time = finish_time / handicap`
4. `time_vs_par = finish_time / par_adjusted_time`
5. Update handicap:
   - Race 1: `new_hcap = time_vs_par`
   - Race 2: `new_hcap = 0.5 × old + 0.5 × time_vs_par`
   - Faster than par: `new_hcap = 0.7 × old + 0.3 × time_vs_par`
   - Slower than par: `new_hcap = 0.85 × old + 0.15 × time_vs_par`
   - Outlier (>10% off): no change
6. Points: top 10 by finish place (10→1 pts), scaled by group weight when multiple courses
7. Small group (<10 racers): no handicap update, no handicap points
8. Season carry-over: handicaps rescaled so par racer = 1.0 at season start

## Trophies

| Code | Icon | Tooltip | Eligibility |
|---|---|---|---|
| `finish_1/2/3` | pennant flag | Overall 1st/2nd/3rd | original_place |
| `hcap_1/2/3` | trophy cup | Handicap winner/2nd/3rd | adjusted place, excludes fresh racers |
| `par` | tide marker | Par racer | is_par_racer |
| `consistent_1/2/3` | heartbeat | Consistent performer | closest adj_time_vs_par to 1.0 |
| `streak_N` | lightning bolt | Improving streak | N consecutive improvements |
| `fresh` | EST badge | Establishing handicap | first 2 races |

## Craft Normalization

`bepc/craft.py` maps raw craft strings to normalized categories using a table-driven pattern matcher.
Categories: Kayak-1, Kayak-2, OC1, OC2, OC6, SUP, SUP-UL, HPK, SS, Unknown.
`cli.py audit-crafts` reports zero-match and multi-match cases.

## Name Aliases

`data/<club>/aliases.json` maps variant names → canonical names, applied at load time.
Canonical name is used for all processing, standings, and racer page slugs.

## Racer Pages

- Stats bar inline with name: `[year] season: N races, N wins, N podiums` — updates with year selector
- Year selector filters race history; stats update dynamically via `racerSeasonStats` JS object
- Charts: handicap trajectory, points trajectory

## Home Page Feed

Recent races show full podiums (🥇🥈🥉) organized by course then club:
- Multi-course: course label as header, podium below (or inline if single club)
- Single-course: podium inline, no header

## Libraries

- **Bootstrap 5** — layout, components, tooltips
- **DataTables** — sortable/filterable standings tables
- **Chart.js** — line charts for trajectories and racer pages

## Hosting

GitHub Pages from `gh-pages` branch. URL: https://mike3xl.github.io/bepc-racing/
WebScorer API key stored in `.env` (gitignored).
