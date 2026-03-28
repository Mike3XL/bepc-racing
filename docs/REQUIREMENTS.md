# BEPC Racing Analytics — Requirements

*Working document. Updated as requirements are discussed and decided.*

---

## Decided

- **Target date:** Early April 2026 (season starts first Monday in April)
- **Language:** Python (not Java) — faster iteration, no build step
- **v1 architecture:** Static site — CLI generates `data.json`, static HTML reads it
- **v1 workflow:** Run CLI after each race → generates data.json → push to hosting
- **No auth in v1** — all data public (non-sensitive, mirrors WebScorer public data)
- **No Lambda/API in v1** — static only, dynamic API comes later
- **Users:** BEPC members (read-only viewers). No admin UI.
- **Corrections workflow:** CLI only (offline process). Feedback form possible later, not v1.
- **Hosting:** GitHub Pages. Test early once basic HTML is available.
- **No Lambda/API in v1** — static only

## Views (v1)

Three views, with linking between them (e.g. name in standings → racer page):

1. **Standings** — current season standings table
2. **Trajectories** — points-over-time chart, selectable racers
3. **Racer page** — per-individual detail (race history, stats)

Views are developed independently but designed to link together.

---

## Context: What Already Exists

The `racingAnalytics` prototype (in mliddellGenAI workspace, NOT this repo) has:
- WebScorer download + raw→common JSON conversion
- Full handicap engine (BEPC #1 algorithm)
- Points calculation + CSV/standings output to stdout
- All 18 races of 2025 data

Command to run 2025 analysis:
```bash
cd ~/workplace/mliddellGenAI/src/MliddellGenAI/racingAnalytics
java -jar racingAnalytics.jar --analyze results/common/
```
