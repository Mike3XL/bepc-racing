# Data Sources Registry

## Purpose

Tracks the authoritative data source for each race series/organizer. Ensures we use the best available source and avoid duplicate datasets.

## Source Priority (best to worst)

1. **WebScorer API** — structured JSON, proper craft categories, race IDs, direct fetch via `cli.py fetch`
2. **Pacific Multisports PDF** — structured PDF, good craft categories, manual download + `cli.py import-pdf`
3. **Jericho HTML** — HTML table, craft from division string (often verbose), `cli.py import-url` or `cli.py fetch-jericho`
4. **Custom HTML** — varies by organizer, manual parsing

## Rule: One Dataset Per Race

Each race must appear in exactly one `data/<club>/<year>/common/*.common.json` file set. If a race is available from multiple sources, use the highest-priority source and delete/exclude the others.

---

## Organizer → Source Mapping

### BEPC (Ballard Elks Paddle Club)
- **Source:** WebScorer
- **Organizer page:** https://www.webscorer.com/bepc827
- **Fetch:** `cli.py fetch --club bepc --year YYYY <race_ids...>`
- **Notes:** All races 2020-2025 fetched. Monday night series.

### Sound Rowers
- **Source:** WebScorer (most races), Pacific Multisports (La Conner 2024+, Peter Marcus 2024+)
- **WebScorer organizer:** https://www.webscorer.com/bepc827 (some races)
- **Results page:** https://www.soundrowers.org/race-results/
- **Fetch:** `cli.py fetch --club sound-rowers --year YYYY <race_ids...>`
- **Notes:** La Conner and Peter Marcus moved to Pacific Multisports ~2024. Rat Island, Commencement, Squaxin, Budd Inlet, Round Shaw, Bainbridge, Sausage Pull on WebScorer.

### PNWORCA Winter Series
- **Source:** WebScorer (preferred) OR Jericho HTML
- **WebScorer:** Race IDs vary by year/host club. Check Jericho index for links.
- **Jericho:** `https://www.jerichooutrigger.com/races{YEAR}/pnworca{N}.html`
- **Fetch:** `cli.py fetch --club pnw-regional --year YYYY <race_id>` (WebScorer preferred)
- **Notes:** Race #7 2025 = WebScorer 384862. Race #7 2026 = WebScorer 426134. Other races may be Jericho-only.
- **Known WebScorer IDs:**
  - 2025 #7: 384862
  - 2026 #7: 426134

### Peter Marcus Rough Water Race (Bellingham)
- **Source:** Pacific Multisports PDF (2026), WebScorer (earlier years)
- **Pacific Multisports IDs:** 2022=1007, 2023=1094, 2024=1190, 2025=1287, 2026=1363
- **Fetch:** `cli.py import-pdf ~/Downloads/ResultListsOverallResults.pdf --club pnw-regional --year YYYY --race-id NNNN --name "..." --date "..."`
- **Notes:** 2026 PDF imported. Earlier years may be on WebScorer — check Sound Rowers results page.

### Board the Fjord (Deep Cove Kayak, Vancouver BC)
- **Source:** WebScorer (preferred over Jericho HTML)
- **Known WebScorer IDs:**
  - 2025: 389408
- **Fetch:** `cli.py fetch --club pnw-regional --year YYYY <race_id>`
- **Notes:** Jericho HTML version uses distance-based divisions (craft=Unknown). WebScorer has proper craft categories. Always prefer WebScorer.

### Gorge Downwind Champs (Hood River, OR)
- **Source:** Jericho HTML
- **URL pattern:** `https://www.jerichooutrigger.com/races{YEAR}/gorgedownwind.html`
- **Fetch:** `cli.py import-url <url> --club pnw-regional --year YYYY --race-id NNNN --name "..." --date "..."`
- **Notes:** Large international event (600+ racers). Uses "Surfski Men Open" division format → normalizes to Kayak-1.

### Gorge Challenge
- **Source:** Unknown — separate organizer from Gorge Downwind Champs
- **TODO:** Find results source. Search "Gorge Challenge paddle race Hood River".

### Keats Chop (Gibsons Paddle Club, BC)
- **Source:** Jericho HTML
- **URL pattern:** `https://www.jerichooutrigger.com/races{YEAR}/keatschop.html`

### Whey-Ah-Wichen Whipper (North Vancouver, BC)
- **Source:** Jericho HTML
- **URL pattern:** `https://www.jerichooutrigger.com/races{YEAR}/whipper.html`

### Lake Samish Salmon Row (Sound Rowers)
- **Source:** Pacific Multisports (2022+) OR Jericho HTML
- **Pacific Multisports IDs:** 2022=1063, 2023=1161, 2024=1198, 2025=1303
- **Notes:** Already in Sound Rowers data from WebScorer for some years. Check for duplicates.

### Narrows Challenge (Gig Harbor area)
- **Source:** Pacific Multisports
- **IDs:** 2022=1027, 2023=1129, 2024=1216, 2025=1304

### Gorge Downwind Champs
- **Source:** Jericho HTML (see above)
- **Pacific Multisports IDs (alternate):** 2022=1004, 2023=1088, 2024=1173, 2025=1270
- **Notes:** Pacific Multisports may have better data — check if available.

### Wavechaser Paddle Series (Jericho Sailing Centre, Vancouver BC)
- **Source:** Jericho HTML
- **Status:** Excluded from PNW Regional — treated as a weekly club series (future: own club entry)

### SCKC Friday Night Races
- **Source:** Unknown
- **Status:** Excluded from PNW Regional — weekly club series (future: own club entry)

---

## Exclusion List (races NOT to import)

| Race | Reason |
|---|---|
| La Conner | Already in Sound Rowers data |
| PNWORCA #7 (Jericho) | Replaced by WebScorer version |
| Wavechaser series | Weekly club series, not regional |
| SCKC Friday nights | Weekly club series |
| OC6-only races | Out of scope |
| Sprint events (<1 mile) | Out of scope |
| Hawaii/California events | Out of scope |
