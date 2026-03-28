# BEPC Racing Analytics

Race results, standings, and handicap tracking for the [Ballard Elks Paddle Club](https://www.ballardelks.org/) annual race series.

**Live site:** https://mike3xl.github.io/bepc-racing/

## Quick Start

```bash
# Process race data → site/data.json
python3 cli.py process

# Generate HTML pages
python3 cli.py generate

# Publish to GitHub Pages
python3 cli.py publish
```

## Project Structure

```
bepc-racing/
├── cli.py              # Entry point: process / generate / publish
├── bepc/
│   ├── models.py       # Dataclasses: RaceInfo, RacerResult, RunningRecord
│   ├── loader.py       # Load common.json files
│   ├── handicap.py     # Handicap engine (par racer, BCH calculation)
│   ├── points.py       # Points calculation
│   ├── processor.py    # Season processing pipeline
│   └── generator.py    # HTML page generation
├── data/
│   ├── common/         # Normalized per-race JSON (source of truth)
│   └── raw/            # Raw WebScorer downloads (not committed)
├── site/               # Generated static site (gitignored)
└── docs/               # Reference documents and specs
```

## Handicap System

BEPC uses a dynamic multiplicative handicap (Time Correction Factor):

- **Adjusted time** = finish time ÷ handicap
- **Par racer** = finisher at ~33rd percentile
- Handicap updates asymmetrically: faster results shift 30%, slower shift 15%
- Outliers (>10% from prediction) are ignored

See [About page](https://mike3xl.github.io/bepc-racing/about.html) for full explanation.

## Data Format

Race data lives in `data/common/` as `YYYY-MM-DD__RACEID__NAME__N.common.json`.
These are normalized from WebScorer raw JSON.

## Status

✅ 2025 season — 18 races, fully processed  
🚧 2026 season — pending (season starts April 2026)

See [docs/FUTURE_WORK.md](docs/FUTURE_WORK.md) for planned features.
