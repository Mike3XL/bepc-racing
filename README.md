# PaddleClub

Race results, standings, and handicap tracking for open-water paddling clubs and regional leagues.

**Live site:** https://mike3xl.github.io/bepc-racing/

Clubs currently tracked: BEPC, Sound Rowers, SCKC, PNW Regional (league).

## Quick Start

```bash
# Fetch new race data from WebScorer
python3 cli.py fetch --club bepc --year 2026 <race_id> [race_id ...]

# Process all clubs → site/data.json
python3 cli.py process

# Generate HTML for one club (or all)
python3 cli.py generate --club bepc
python3 cli.py generate          # all clubs

# Serve locally
python3 cli.py serve             # http://localhost:8080

# Publish to GitHub Pages
python3 cli.py publish --club bepc
```

## Setup

Requires Python 3.13. No external dependencies beyond the standard library.

Create a `.env` file in the project root with your WebScorer API ID:

```
WEBSCORER_API_ID=your_api_id_here
```

This file is gitignored. Alternatively set the `WEBSCORER_API_ID` environment variable.

## Data Sources

| Source | Fetch command | Used by |
|---|---|---|
| WebScorer API | `cli.py fetch` | BEPC, Sound Rowers, SCKC, many PNW Regional events |
| Jericho HTML | `cli.py fetch-jericho YYYY` | PNWORCA races |
| Pacific Multisports PDF | `cli.py import-pdf <file> ...` | Peter Marcus, Narrows Challenge |
| Race Result API | manual fetch | Gorge Downwind Champs |

## Project Structure

```
bepc-racing/
├── cli.py                      # Entry point: fetch / process / generate / publish / serve
├── .env                        # WebScorer API key (gitignored)
├── bepc/
│   ├── models.py               # Dataclasses: RaceInfo, RacerResult, RunningRecord
│   ├── loader.py               # Load common.json files, apply name aliases
│   ├── fetcher.py              # Fetch races from WebScorer API
│   ├── fetcher_jericho.py      # Fetch PNWORCA races from Jericho HTML
│   ├── handicap.py             # Handicap engine (par racer, BCH calculation)
│   ├── points.py               # Points calculation
│   ├── craft.py                # Craft category normalization
│   ├── processor.py            # Season processing pipeline
│   └── generator.py            # HTML + JSON data file generation
├── data/
│   ├── clubs.yaml              # Club configuration (name, type, short_name, etc.)
│   ├── upcoming.yaml           # Upcoming races for home page
│   ├── sources/                # External source metadata (WebScorer event lists, etc.)
│   ├── bepc/<year>/common/     # Normalized per-race JSON (source of truth)
│   ├── sound-rowers/<year>/common/
│   ├── sckc/<year>/common/
│   └── pnw-regional/<year>/common/
├── site/                       # Generated static site (gitignored)
│   ├── index.html              # Home page
│   ├── about.html
│   ├── clubs.html
│   ├── bepc/                   # Per-club pages
│   ├── sound-rowers/
│   ├── sckc/
│   └── pnw-regional/
└── SPEC.md                     # Architecture and design spec
```

## Site Pages

| Page | Description |
|---|---|
| `index.html` | Home — recent races with full podiums, upcoming races, club list |
| `clubs.html` | All clubs overview |
| `about.html` | Handicap system explanation and data sources |
| `<club>/races.html` | Season race list |
| `<club>/standings.html` | Overall and handicap points standings |
| `<club>/trajectories.html` | Points and handicap charts |
| `<club>/racer/<name>.html` | Per-racer stats, charts, race history |

## Handicap System

Uses a dynamic multiplicative handicap (Time Correction Factor):

- **Adjusted time** = finish time ÷ handicap
- **Par racer** = finisher at ~33rd percentile
- Handicap updates asymmetrically: faster results shift 30%, slower shift 15%
- Outliers (>10% from prediction) are ignored

See [About page](https://mike3xl.github.io/bepc-racing/about.html) for full explanation.

## Status

| Club | Years | Status |
|---|---|---|
| BEPC | 2020–2026 | ✅ Active |
| Sound Rowers | 2022–2025 | ✅ Imported |
| SCKC | 2024–2025 | ✅ Imported |
| PNW Regional | 2019–2026 | ✅ Active |
