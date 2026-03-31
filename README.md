# BEPC Racing Analytics

Race results, standings, and handicap tracking for the [Ballard Elks Paddle Club](https://www.ballardelks.org/) annual race series.

**Live site:** https://mike3xl.github.io/bepc-racing/

## Quick Start

```bash
# Fetch new race data from WebScorer
python3 cli.py fetch --year 2025 <race_id> [race_id ...]

# Process race data → site/data.json
python3 cli.py process

# Generate HTML pages
python3 cli.py generate

# Publish to GitHub Pages
python3 cli.py publish
```

## Setup

Requires Python 3.13. No external dependencies.

Create a `.env` file in the project root with your WebScorer API ID:

```
WEBSCORER_API_ID=your_api_id_here
```

This file is gitignored. Alternatively set the `WEBSCORER_API_ID` environment variable.

## Project Structure

```
bepc-racing/
├── cli.py                      # Entry point: fetch / process / generate / publish
├── .env                        # WebScorer API key (gitignored)
├── bepc/
│   ├── models.py               # Dataclasses: RaceInfo, RacerResult, RunningRecord
│   ├── loader.py               # Load common.json files, apply name aliases
│   ├── fetcher.py              # Fetch races from WebScorer API
│   ├── handicap.py             # Handicap engine (par racer, BCH calculation)
│   ├── points.py               # Points calculation
│   ├── processor.py            # Season processing pipeline
│   └── generator.py            # HTML + JSON data file generation
├── data/
│   └── bepc/
│       ├── aliases.json        # Name alias mappings (variant → canonical)
│       └── <year>/common/      # Normalized per-race JSON (source of truth)
├── site/                       # Generated static site (gitignored)
└── SPEC.md                     # Architecture and design spec
```

## Site Pages

| Page                | Description                                                   |
| ------------------- | ------------------------------------------------------------- |
| `index.html`        | Race results with prev/next nav, finish + handicap order tabs |
| `events.html`       | Season race list                                              |
| `standings.html`    | Official and handicap points standings                        |
| `trajectories.html` | Points and handicap charts                                    |
| `racer/<name>.html` | Per-racer stats, charts, race history                         |
| `about.html`        | Handicap system explanation                                   |

## Handicap System

BEPC uses a dynamic multiplicative handicap (Time Correction Factor):

- **Adjusted time** = finish time ÷ handicap
- **Par racer** = finisher at ~33rd percentile
- Handicap updates asymmetrically: faster results shift 30%, slower shift 15%
- Outliers (>10% from prediction) are ignored

See [About page](https://mike3xl.github.io/bepc-racing/about.html) for full explanation.

## Data Format

Race data lives in `data/bepc/<year>/common/` as `YYYY-MM-DD__RACEID__NAME.common.json`.
Fetched from WebScorer via `cli.py fetch` or downloaded manually.

Name aliases are defined in `data/bepc/aliases.json` and applied at load time.

## Status

✅ 2025 season — 18 races, fully processed
🚧 2026 season — pending (season starts April 2026)
