"""Parse Jericho Outrigger Club HTML results into common.json format."""
import json
import re
import urllib.request
from pathlib import Path


def _parse_time(s: str) -> float | None:
    s = s.strip().rstrip('.')
    m = re.match(r'^(\d+):(\d+):(\d+(?:\.\d+)?)$', s)
    if m:
        h, mn, sec = int(m.group(1)), int(m.group(2)), float(m.group(3))
        # Detect MM:SS:00 format (hours > 10 and seconds == 0 → likely M:SS:hundredths)
        if h > 10 and sec == 0:
            return h * 60 + mn
        return h * 3600 + mn * 60 + sec
    m = re.match(r'^(\d+):(\d+(?:\.\d+)?)$', s)
    if m:
        return int(m.group(1)) * 60 + float(m.group(2))
    return None


def _craft_from_division(div: str) -> str:
    """'HPK1-M Master 40+' → 'HPK1', 'Surfski Men Open' → 'Surfski'"""
    div = div.strip()
    m = re.match(r'^([A-Z][A-Za-z0-9]+)-', div)
    if m:
        return m.group(1)
    # Space-separated: first word is craft
    return div.split()[0] if div else div


def _gender_from_division(div: str) -> str:
    div = div.strip()
    # Dash format: HPK1-M, OC1-W, OC2-Mx
    m = re.match(r'^[A-Z0-9]+-([MWFmwf]|Mx)', div)
    if m:
        g = m.group(1).upper()
        if g == "M": return "Male"
        if g in ("W", "F"): return "Female"
        return "Mixed"
    # Space format: "Surfski Men Open", "OC1 Women 40+"
    low = div.lower()
    if 'women' in low or ' w ' in low: return "Female"
    if 'men' in low: return "Male"
    if 'mixed' in low or 'mx' in low: return "Mixed"
    return "Unknown"


def parse_jericho_html(html: str) -> dict[str, list]:
    """Parse Jericho-format HTML table. Returns {course_name: [racer_dicts]}."""
    courses: dict[str, list] = {}
    current_course = None

    for line in html.splitlines():
        line = line.strip()
        # Course header: bold text like **Long Course** or **Short Course**
        m = re.match(r'^\*\*([A-Za-z]+ Course)\*\*', line)
        if m:
            current_course = m.group(1)
            courses[current_course] = []
            continue
        if current_course is None:
            continue
        # Result row: starts with a number, has pipe-separated columns
        # Format: "1  │  Name  │  Division  │  Div.Place  │  Time"
        # After markdown rendering it's tab/space separated
        # Try to match: number | name | division | div_place | time
        parts = [p.strip() for p in line.split('│') if p.strip()]
        if len(parts) >= 5:
            place_str = parts[0].rstrip('.')
            if not re.match(r'^\d+$', place_str):
                continue
            place = int(place_str)
            name = parts[1].strip()
            division = parts[2].strip()
            time_str = parts[4].strip()
            if time_str in ('DNS', 'DNF', 'DSQ', ''):
                continue
            time_sec = _parse_time(time_str)
            if time_sec is None:
                continue
            craft = _craft_from_division(division)
            gender = _gender_from_division(division)
            courses[current_course].append({
                "originalPlace": place,
                "canonicalName": name,
                "craftCategory": craft,
                "gender": gender,
                "handicap": 1.0,
                "timeSeconds": time_sec,
                "timeVersusPar": 0.0,
                "adjustedTimeSeconds": time_sec,
                "adjustedTimeVersusPar": 0.0,
                "adjustedPlace": 0,
                "handicapPost": 1.0,
                "numRaces": 0,
                "handicapSequence": None,
                "handicapPointsSequence": None,
                "handicapStdDev": 0.0,
                "absoluteImprovement": 0.0,
                "parRacer": False,
            })
    return courses


def _date_slug(date_str: str) -> str:
    months = {
        "Jan":"01","Feb":"02","Mar":"03","Apr":"04","May":"05","Jun":"06",
        "Jul":"07","Aug":"08","Sep":"09","Oct":"10","Nov":"11","Dec":"12",
    }
    m = re.match(r'(\w+)\s+(\d+),\s+(\d{4})', date_str)
    if m:
        return f"{m.group(3)}-{months.get(m.group(1),'00')}-{int(m.group(2)):02d}"
    return date_str


def _extract_date_from_html(html: str, year: str) -> str:
    """Try to extract race date from page title/header."""
    months = r'(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)'
    # Pattern: "Month DD, YYYY" or "Month DD YYYY"
    m = re.search(rf'({months}\.?\s+\d{{1,2}}(?:,\s*|\s+){year})', html, re.I)
    if m:
        raw = m.group(1).strip().rstrip(',')
        # Normalize to "Mon DD, YYYY"
        m2 = re.match(rf'({months})\.?\s+(\d{{1,2}})(?:,\s*|\s+)({year})', raw, re.I)
        if m2:
            mon = m2.group(1)[:3].capitalize()
            day = int(m2.group(2))
            return f"{mon} {day}, {year}"
    return f"Jan 1, {year}"
    months = {
        "Jan":"01","Feb":"02","Mar":"03","Apr":"04","May":"05","Jun":"06",
        "Jul":"07","Aug":"08","Sep":"09","Oct":"10","Nov":"11","Dec":"12",
    }
    m = re.match(r'(\w+)\s+(\d+),\s+(\d{4})', date_str)
    if m:
        return f"{m.group(3)}-{months.get(m.group(1),'00')}-{int(m.group(2)):02d}"
    return date_str


def import_jericho_url(url: str, out_dir: Path, race_id: int, race_name: str,
                       race_date: str) -> None:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=30) as resp:
        html = resp.read().decode("utf-8", errors="replace")

    # Extract date from page before stripping HTML
    year = re.search(r'/races(\d{4})/', url)
    year_str = year.group(1) if year else "2025"
    if race_date.startswith("Jan 1,"):
        race_date = _extract_date_from_html(html, year_str)

    # Convert HTML table to tab-separated text
    html = re.sub(r'<br\s*/?>', '\n', html, flags=re.I)
    html = re.sub(r'<tr[^>]*>', '\n', html, flags=re.I)
    html = re.sub(r'<td[^>]*>', '\t', html, flags=re.I)
    html = re.sub(r'<[^>]+>', '', html)

    courses: dict[str, list] = {}
    current_course = None

    for line in html.splitlines():
        line = line.strip()
        if not line:
            continue
        parts = [p.strip() for p in line.split('\t')]
        # Course header: ends with "Course", is "Overall", or is a distance (e.g. "7 KM", "2 KM.")
        if len(parts) >= 1 and (
            re.search(r'Course$', parts[0]) or
            parts[0] == 'Overall' or
            re.match(r'^\d+[\.\d]*\s*(KM|km|Mile|mile|NM|nm)', parts[0])
        ) and not re.match(r'^\d+\.', parts[0]):
            current_course = parts[0]
            courses[current_course] = []
            continue
        if current_course is None or len(parts) < 5:
            continue
        place_str = parts[0].rstrip('.')
        if not re.match(r'^\d+$', place_str):
            continue
        place = int(place_str)
        name = parts[1].strip()
        # Reverse "LastName, FirstName" → "FirstName LastName" (single person only)
        if ',' in name and '/' not in name:
            p = name.split(',', 1)
            name = f"{p[1].strip()} {p[0].strip()}"
        division = parts[2].strip()
        time_str = parts[4].strip()
        if time_str in ('DNS', 'DNF', 'DSQ', ''):
            continue
        time_sec = _parse_time(time_str)
        if time_sec is None:
            continue
        craft = _craft_from_division(division)
        gender = _gender_from_division(division)
        courses[current_course].append({
            "originalPlace": place,
            "canonicalName": name,
            "craftCategory": craft,
            "gender": gender,
            "handicap": 1.0,
            "timeSeconds": time_sec,
            "timeVersusPar": 0.0,
            "adjustedTimeSeconds": time_sec,
            "adjustedTimeVersusPar": 0.0,
            "adjustedPlace": 0,
            "handicapPost": 1.0,
            "numRaces": 0,
            "handicapSequence": None,
            "handicapPointsSequence": None,
            "handicapStdDev": 0.0,
            "absoluteImprovement": 0.0,
            "parRacer": False,
        })

    if not courses or all(len(v) == 0 for v in courses.values()):
        raise ValueError(f"No course data found at {url}")

    out_dir.mkdir(parents=True, exist_ok=True)
    total = sum(len(r) for r in courses.values())
    date_slug = _date_slug(race_date)
    name_slug = re.sub(r'[^a-zA-Z0-9]+', '_', race_name).strip('_')

    for course_name, racers in courses.items():
        if not racers:
            continue
        weight = round(len(racers) / total, 6)
        suffix = f" — {course_name}" if len(courses) > 1 else ""
        dist_slug = f"__{re.sub(r'[^a-zA-Z0-9]+', '_', course_name).strip('_')}" if len(courses) > 1 else ""
        fname = f"{date_slug}__{race_id}__{name_slug}{dist_slug}.common.json"
        common = {
            "raceInfo": {
                "raceId": race_id,
                "name": f"{race_name}{suffix}",
                "date": race_date,
                "displayURL": url,
                "distance": course_name if len(courses) > 1 else "",
                "pointsWeight": weight,
                "sport": "Paddling",
            },
            "racerResults": racers,
        }
        (out_dir / fname).write_text(json.dumps(common, indent=2))
        print(f"  Written: {fname} ({len(racers)} racers, weight={weight})")
