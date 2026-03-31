Follow the architecture and conventions described in #[[file:SPEC.md]]

- Python 3.13 (Homebrew: /opt/homebrew/bin/python3.13)
- No external Python dependencies — stdlib only
- Ask before making assumptions; don't fabricate technical facts
- Mike is a BEPC member and surfski racer — this is his club's race analytics site
- Chicago 17th edition for any document citations

## Conventions

- Handicap result is the primary competition — always default to handicap view
- Consistency in naming matters: use exact trophy tooltip strings from SPEC.md
- HTML pages fetch JSON data files — no inline data blobs in HTML
- All dynamic DOM injection must be followed by Bootstrap tooltip initialization
- localStorage keys: bepc_season, bepc_result_tab, bepc_distance
- Fresh racers (first 2 races) are ineligible for handicap trophies and handicap points
- process → generate → publish is always manual, never automatic
