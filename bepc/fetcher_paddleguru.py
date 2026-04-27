"""PaddleGuru fetcher.

Fetches a race results page from paddleguru.com, saves the raw HTML alongside
the common.json, and parses the embedded EDN data into per-course common.json
files. Keeps raw division strings (e.g. "K1 sprint hull") so craft.py can
normalize them uniformly with other sources.

Usage:
    from bepc.fetcher_paddleguru import fetch_paddleguru_race
    fetch_paddleguru_race(
        race_url="https://paddleguru.com/races/GigHarborPaddlersCup2026/results",
        race_id="paddlerscup2026",
        date_iso="2026-04-25",
        base_name="Gig Harbor Paddlers Cup 2026",
        out_dir=Path("data/pnw/2026/common"),
    )
"""
from __future__ import annotations

import json
import re
import urllib.request
from pathlib import Path


def _fetch_html(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=30) as resp:
        return resp.read().decode("utf-8", errors="replace")


_ATHLETE_RE = re.compile(r':full-name\s+"([^"]*)"')
_CATEGORY_NAME_RE = re.compile(r':category\s+\{[^}]*?:name\s+"([^"]+)"|:category\s+\{[^}]*?:num-athletes\s+\d+[^}]*?:name\s+"([^"]+)"')
_GENDER_RE = re.compile(r':gender\s+"([^"]*)"')
_TIME_RE = re.compile(r':time\s+(\d+)')
_OVERALL_RE = re.compile(r':overall\s+(\d+)')
_STATUS_RE = re.compile(r':status\s+"([^"]*)"')


def _find_startlist(html: str) -> str:
    """Extract the :startlist {... } block (balanced braces)."""
    i = html.find(':startlist')
    if i < 0:
        return ""
    # find opening { after :startlist
    j = html.find('{', i)
    if j < 0:
        return ""
    depth = 0
    k = j
    while k < len(html):
        c = html[k]
        if c == '{':
            depth += 1
        elif c == '}':
            depth -= 1
            if depth == 0:
                return html[j:k+1]
        k += 1
    return ""


def _iter_events(startlist_block: str):
    """Yield (event_name, entries_block_text) pairs from the startlist block."""
    # Pattern: "Event Name" {:entries (...}
    # Find each top-level event key. Since events are at top-level of startlist,
    # and each value starts with `{:entries (`, we can split on that marker.
    # Work with the inner content (strip outer {}).
    inner = startlist_block.strip()
    if inner.startswith('{'):
        inner = inner[1:]
    if inner.endswith('}'):
        inner = inner[:-1]
    # Iteratively find `"Event" {:entries`
    pos = 0
    while pos < len(inner):
        m = re.search(r'"([^"]+)"\s*\{:entries\s*\(', inner[pos:])
        if not m:
            return
        event_name = m.group(1)
        entries_start = pos + m.end()  # position just after the opening `(`
        # Walk to find balanced `)` then `}`
        depth_paren = 1
        k = entries_start
        while k < len(inner) and depth_paren > 0:
            c = inner[k]
            if c == '(':
                depth_paren += 1
            elif c == ')':
                depth_paren -= 1
            elif c == '"':
                # skip string
                end = inner.find('"', k + 1)
                if end < 0:
                    return
                k = end
            k += 1
        entries_block = inner[entries_start:k-1]
        yield event_name, entries_block
        # Continue after the closing `}` of this event's value
        # Skip past remaining fields of the map value
        depth_brace = 1
        while k < len(inner) and depth_brace > 0:
            c = inner[k]
            if c == '{':
                depth_brace += 1
            elif c == '}':
                depth_brace -= 1
            elif c == '"':
                end = inner.find('"', k + 1)
                if end < 0:
                    return
                k = end
            k += 1
        pos = k


def _iter_entry_blocks(entries_block: str):
    """Yield each entry's text — entries are `{...}` items separated by spaces inside the list."""
    # Top-level: find each `{` ... matching `}` span
    depth = 0
    start = None
    i = 0
    while i < len(entries_block):
        c = entries_block[i]
        if c == '{':
            if depth == 0:
                start = i
            depth += 1
        elif c == '}':
            depth -= 1
            if depth == 0 and start is not None:
                yield entries_block[start:i+1]
                start = None
        elif c == '"':
            end = entries_block.find('"', i + 1)
            if end < 0:
                return
            i = end
        i += 1


def _parse_edn_results(html: str) -> list[dict]:
    """Return [{event, overall, time_ms, category, gender, athletes:[name]}] for timed finishers."""
    startlist = _find_startlist(html)
    if not startlist:
        return []
    out = []
    for event_name, entries_block in _iter_events(startlist):
        for entry in _iter_entry_blocks(entries_block):
            status_m = _STATUS_RE.search(entry)
            status = status_m.group(1) if status_m else ""
            if status != "timed":
                continue
            time_m = _TIME_RE.search(entry)
            overall_m = _OVERALL_RE.search(entry)
            if not time_m or not overall_m:
                continue
            # category.name — may appear as {:name ...} or {:num-athletes N, :name ...}
            cat_m = re.search(r':category\s+\{([^{}]*)\}', entry)
            cat_name = ""
            if cat_m:
                nm = re.search(r':name\s+"([^"]+)"', cat_m.group(1))
                if nm:
                    cat_name = nm.group(1)
            gender_m = _GENDER_RE.search(entry)
            gender = gender_m.group(1) if gender_m else ""
            athletes = _ATHLETE_RE.findall(entry)
            out.append({
                "event": event_name,
                "overall": int(overall_m.group(1)),
                "time_ms": int(time_m.group(1)),
                "category": cat_name,
                "gender": gender,
                "athletes": athletes,
            })
    return out


def _course_slug(event_name: str) -> str:
    """Convert event name like '10K' / '5K' / '2.5K' to a filename-safe suffix."""
    return event_name.replace(".", "_").replace(" ", "_")


# Map verbose PaddleGuru event names → short course labels (optional customization).
# Callers can pass their own via the `course_name_map` arg to fetch_paddleguru_race.
# Keys are case-insensitive substring matches.
_DEFAULT_COURSE_NAME_RULES = [
    (re.compile(r"10\s*K\b", re.I),        "10K"),
    (re.compile(r"2\.5\s*K\b", re.I),      "2.5K"),
    (re.compile(r"\b5\s*K\b", re.I),       "5K"),
    (re.compile(r"SUP.*Tech", re.I),       "SUP Technical"),
]


def _normalize_course_name(event_name: str, rules=None) -> str:
    """Map verbose event name to a short course label if a rule matches."""
    for pat, short in (rules or _DEFAULT_COURSE_NAME_RULES):
        if pat.search(event_name):
            return short
    return event_name


def _race_filename(date_iso: str, race_id: str, base_name: str, course: str) -> str:
    safe_base = re.sub(r"[^A-Za-z0-9]+", "_", base_name).strip("_")
    return f"{date_iso}__{race_id}__{safe_base}__{_course_slug(course)}.common.json"


def _ms_to_seconds(ms: int) -> float:
    return round(ms / 1000.0, 2)


def fetch_paddleguru_race(
    race_url: str,
    race_id: str,
    date_iso: str,
    base_name: str,
    out_dir: Path,
    display_date: str | None = None,
) -> list[Path]:
    """Fetch a PaddleGuru race. Saves raw HTML alongside common.json files.

    Returns list of common.json paths written.
    """
    out_dir = Path(out_dir)
    raw_dir = out_dir / "raw"
    out_dir.mkdir(parents=True, exist_ok=True)
    raw_dir.mkdir(parents=True, exist_ok=True)

    print(f"Fetching {race_url}…")
    html = _fetch_html(race_url)

    # Save raw HTML alongside common.json files
    raw_path = raw_dir / f"{date_iso}__{race_id}__{re.sub(r'[^A-Za-z0-9]+', '_', base_name).strip('_')}.raw.html"
    raw_path.write_text(html)
    print(f"Saved raw: {raw_path}")

    # Parse EDN results
    results = _parse_edn_results(html)
    if not results:
        print("WARN: no results parsed")
        return []

    # Group by event (course) — apply course-name normalization, merging heats
    by_event: dict[str, list[dict]] = {}
    for r in results:
        short = _normalize_course_name(r["event"])
        by_event.setdefault(short, []).append(r)

    # For each course, write a common.json
    written = []
    display_date = display_date or date_iso
    for course, entries in by_event.items():
        # Sort by overall rank
        entries.sort(key=lambda e: e["overall"])
        racer_results = []
        for e in entries:
            # athletes is a list of full-name strings
            names = [n.strip() for n in e["athletes"] if n.strip()]
            canonical = " & ".join(names)
            canonical = re.sub(r"\s+", " ", canonical).strip()
            gender = {"male": "Male", "female": "Female", "mixed": "Female/Male"}.get(e.get("gender", "").lower(), "")
            if not canonical:
                continue
            racer_results.append({
                "originalPlace": e["overall"],
                "canonicalName": canonical,
                "craftCategory": e["category"],  # raw string — craft.py normalizes
                "gender": gender,
                "handicap": 1.0,
                "timeSeconds": _ms_to_seconds(e["time_ms"]),
                "timeVersusPar": 0.0,
                "adjustedTimeSeconds": _ms_to_seconds(e["time_ms"]),
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
        # Re-number originalPlace within the course
        for i, r in enumerate(sorted(racer_results, key=lambda x: x["timeSeconds"]), 1):
            r["originalPlace"] = i
        racer_results.sort(key=lambda x: x["originalPlace"])

        common = {
            "raceInfo": {
                "raceId": race_id,
                "name": f"{base_name} — {course}",
                "date": display_date,
                "displayURL": race_url,
                "distance": course,
                "sport": "Paddling",
                "pointsWeight": 1.0,
                "startTime": "",
                "country": "",
                "city": "",
            },
            "racerResults": racer_results,
        }
        out_path = out_dir / _race_filename(date_iso, race_id, base_name, course)
        out_path.write_text(json.dumps(common, indent=2))
        written.append(out_path)
        print(f"  {course}: {len(racer_results)} racers → {out_path.name}")

    return written
