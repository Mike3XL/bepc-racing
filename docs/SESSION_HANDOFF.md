# Session Handoff — PNW Regional & Rough Water Import

## What we were doing

We are building a "PNW Regional" virtual club that aggregates distance paddle racing events
from multiple PNW organizers. This is separate from BEPC (weekly club series) and Sound Rowers
(already imported via WebScorer).

## Current state

- `data/sound-rowers/` — 2022-2025 data, fetched via WebScorer API (same as BEPC)
- `data/bepc/` — 2020-2025 data, fully working
- Multi-club CLI: `cli.py generate --club sound-rowers`, `cli.py publish --club <name>`
- `cli.py serve` — starts local HTTP server on port 8080

## Immediate task: Import 2026 Peter Marcus Rough Water Race

A PDF of results was manually downloaded to `~/Downloads/ResultListsOverallResults.pdf`.

This is the **2026 Peter Marcus Rough Water Race** (Bellingham, WA).

- Two courses: Short Course and Downwind Course
- Craft categories: HPK (High Performance Kayak = surfski), OC-1, OC-6, FSK, SK, etc.
- Pacific Multisports event ID: 1363 (from `register.pacificmultisports.com/Events/Results`)

### What needs to happen

1. Parse the PDF and convert to `common.json` format
2. Save to `data/pnw-regional/2026/common/` (create the directory)
3. Add `pnw-regional` to `CLUB_META` in `cli.py` if not already there
4. Run `cli.py process` and `cli.py generate --club pnw-regional` to verify

### PDF structure (from pdftotext -layout)

```
2026 Peter Marcus Rough Water Race  Overall Results
Place  Bib  Name                  Boat Class                    Gender  FinishTime

Short Course
1.  4   Swetish, Ana          HPK (High Performance Kayak)  Female  33:07
2.  91  Nelson, Heather       HPK (High Performance Kayak)  Female  36:02
...

Downwind Course
1.  84  Sawyer, Ian           HPK (High Performance Kayak)  Male    43:01
...
```

Name format: `LastName, FirstName` (need to reverse to `FirstName LastName`)
Time format: `MM:SS` or `H:MM:SS`
DNF entries exist — skip them

### common.json format to produce

```json
{
  "raceInfo": {
    "raceId": 1363,
    "name": "2026 Peter Marcus Rough Water Race — Short Course",
    "date": "Mar 14, 2026",
    "displayURL": "https://register.pacificmultisports.com/Events/Results/1363",
    "distance": "Short Course",
    "pointsWeight": 0.5,
    "sport": "Paddling"
  },
  "racerResults": [
    {
      "originalPlace": 1,
      "canonicalName": "Ana Swetish",
      "craftCategory": "HPK",
      "gender": "Female",
      "timeSeconds": 1987.0
    }
  ]
}
```

Notes:

- Two files: one per course (Short Course, Downwind Course)
- `pointsWeight` = racers_in_course / total_racers (proportional weighting)
- `craftCategory` = short code only (e.g. "HPK", "OC-1", "SK")
- Skip DNF entries
- Reverse name format: "Swetish, Ana" → "Ana Swetish"
- Team entries like "Elrif / Zikan" → keep as-is for now (tandem)

## Pacific Multisports event IDs (for future fetching)

These are the paddle events we identified on `register.pacificmultisports.com/Events/Results`:

### Peter Marcus Rough Water Race (Bellingham)

- 2022: ID 1007 (named "2022 Bellingham Bay Rough Water Race")
- 2023: ID 1094
- 2024: ID 1190
- 2025: ID 1287
- 2026: ID 1363

### Gorge Downwind Champs (13.5 miles, Hood River)

- 2022: ID 1004
- 2023: ID 1088
- 2024: ID 1173
- 2025: ID 1270

### Gorge Vortex

- 2022: ID 1049 (only one found — others may be on WebScorer)

### Narrows Challenge (Gig Harbor area)

- 2022: ID 1027
- 2023: ID 1129
- 2024: ID 1216
- 2025: ID 1304

### La Conner Race (Sound Rowers — also on WebScorer)

- 2023: ID 1075
- 2024: ID 1189
- 2025: ID 1285
- 2026: ID 1362

### BBOP / PNWORCA events (outrigger — may include HPK)

- 2023 BBOP PNWORCA Winter Series #4: ID 1092
- 2023 BBOP Bellingham Bay Classic: ID 1152
- 2024 BBOP PNWORCA Winter Series #4: ID 1214
- 2024 BBOP Challenge: ID 1246
- 2026 BBOP PNWORCA Winter Series #4: ID 1368

### Other paddle events

- 2022 Rat Island Regatta: ID 1047 (Sound Rowers also has this on WebScorer)
- 2023 Alderbrook St. Paddles Day Race: ID 1116
- 2022/2023/2024/2025 Lake Samish Salmon Row: IDs 1063, 1161, 1198, 1303
- 2022/2023/2024/2025 Peter Marcus Paddle 4 Food: IDs 1065, 1159, 1192, 1250, 1332
- 2025 Noisy Waters 9-Man Outrigger: ID 1325
- 2025 Gorge Outrigger Canoe Race: ID 1300

## Pacific Multisports data format

Results are NOT available via API — they are:

1. PDF download (what we have for 2026 Peter Marcus)
2. HTML results page (JS-rendered, hard to scrape)

For now: manual PDF download → parse → common.json

A `fetcher_pacificmultisports.py` module should be written to:

- Accept a PDF file path
- Parse the layout-formatted text (pdftotext -layout)
- Detect course sections
- Extract place, name, craft, gender, time
- Output common.json files

## Sound Rowers notes

- La Conner Race is a Sound Rowers event (already in `data/sound-rowers/`)
- Rat Island Regatta is also Sound Rowers (already fetched via WebScorer)
- For PNW Regional, we may want to include these from Sound Rowers data rather than re-importing

## Key files to read

- `bepc/fetcher.py` — WebScorer fetcher (reference for common.json format)
- `bepc/loader.py` — how common.json is loaded
- `bepc/models.py` — RacerResult dataclass
- `cli.py` — CLUB_META, multi-club support
- `data/bepc/aliases.json` — name normalization (will need pnw-regional version)
- `SPEC.md` — full architecture
- `.kiro/steering/project.md` — conventions and cleanup checklist
