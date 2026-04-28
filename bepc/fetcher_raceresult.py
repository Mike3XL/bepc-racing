"""
Fetcher for my.raceresult.com — used by Pacific Multisports (register.pacificmultisports.com).

No API key required. The per-event key is fetched dynamically from the public config endpoint.

Usage:
    from bepc.fetcher_raceresult import fetch_event
    from pathlib import Path
    fetch_event(rr_id=281775, name="2024 Peter Marcus Rough Water Race",
                date="Mar 16, 2024", out_dir=Path("data/pnw-regional/2024/common"))

Event catalog: data/sources/pacificmultisports_events.json
"""
import json
import re
import urllib.request
from pathlib import Path


RR_BASE = "https://my.raceresult.com"


def _get(url: str) -> dict:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read())


def _date_slug(date_str: str) -> str:
    """Convert 'Mar 16, 2024' → '2024-03-16'."""
    import datetime
    for fmt in ("%b %d, %Y", "%B %d, %Y", "%Y-%m-%d"):
        try:
            return datetime.datetime.strptime(date_str.strip(), fmt).strftime("%Y-%m-%d")
        except ValueError:
            pass
    return re.sub(r"[^0-9-]", "-", date_str)


def _name_slug(name: str) -> str:
    return re.sub(r"[^a-zA-Z0-9]+", "_", name).strip("_")


def _parse_time(t: str) -> float | None:
    """Parse 'H:MM:SS' or 'M:SS' to seconds."""
    t = t.strip()
    if not t or t in ("DNS", "DNF", "DSQ", ""):
        return None
    parts = t.split(":")
    try:
        if len(parts) == 3:
            return int(parts[0]) * 3600 + int(parts[1]) * 60 + float(parts[2])
        if len(parts) == 2:
            return int(parts[0]) * 60 + float(parts[1])
    except (ValueError, IndexError):
        pass
    return None


def fetch_event(rr_id: int, name: str, date: str, out_dir: Path,
                page: str = "results", pms_id: int | None = None) -> list[str]:
    """
    Fetch results for a raceresult.com event and write common JSON files.

    Args:
        rr_id:   raceresult event ID (e.g. 281775)
        name:    display name for the event
        date:    date string (e.g. "Mar 16, 2024")
        out_dir: directory to write .common.json files
        page:    raceresult page name (default: "results")
        pms_id:  Pacific Multisports event ID for building a working displayURL.
                 If omitted, falls back to data/sources/pms_rr_mapping.json or
                 a direct raceresult URL.

    Returns:
        List of written filenames.
    """
    from bepc.provenance import log_provenance, save_raw

    # Resolve pms_id from mapping if not given
    if pms_id is None:
        mapping_path = Path(__file__).parent.parent / "data" / "sources" / "pms_rr_mapping.json"
        if mapping_path.exists():
            try:
                mapping = json.loads(mapping_path.read_text())
                pms_id = mapping.get(str(rr_id))
            except Exception:
                pass
    # Build the displayURL: prefer the PMS redirect, else the raceresult page
    if pms_id:
        display_url = f"https://register.pacificmultisports.com/Events/Results/{pms_id}"
    else:
        display_url = f"https://my.raceresult.com/{rr_id}/results"

    out_dir.mkdir(parents=True, exist_ok=True)

    # 1. Fetch config (includes dynamic key + contest list)
    config_url = f"{RR_BASE}/{rr_id}/{page}/config?lang=en"
    config = _get(config_url)
    server = config.get("server", "my.raceresult.com")
    key = config.get("key", "")
    contests = config.get("contests", {})  # {id: label}
    event_name = config.get("eventname", name)
    event_date = config.get("Time") and date or date  # use provided date

    # Save raw config
    date_slug = _date_slug(date)
    name_slug = _name_slug(name)
    raw_config_fname = f"{date_slug}__{rr_id}__{name_slug}.config.json"
    save_raw(out_dir, raw_config_fname, json.dumps(config, indent=2))

    # 2. Find the "Overall Results" list name from TabConfig
    list_name = "Result Lists|Overall Results"
    tab_lists = config.get("TabConfig", {}).get("Lists", [])
    for lst in tab_lists:
        if "overall" in lst.get("Name", "").lower():
            list_name = lst["Name"]
            break

    # 3. Fetch all results in one call (contest=0 returns all grouped by course)
    data_url = (f"https://{server}/{rr_id}/{page}/list"
                f"?key={key}&listname={urllib.parse.quote(list_name)}"
                f"&contest=0&page=1&pageSize=2000&lang=en&r=all")
    try:
        result = _get(data_url)
    except Exception as e:
        print(f"    FAILED: {e}")
        return []

    data = result.get("data", {})
    fields = result.get("DataFields", [])

    all_data: dict[str, list] = {}
    if isinstance(data, dict):
        for group_name, rows in data.items():
            # group_name format: "#1_Long Course - 10 miles" or "#1_Short Course"
            label = group_name.split("_", 1)[-1] if "_" in group_name else group_name
            parsed = [_parse_row(row, fields) for row in rows]
            parsed = [r for r in parsed if r]
            if parsed:
                all_data[label] = parsed
    elif isinstance(data, list):
        parsed = [_parse_row(row, fields) for row in data]
        parsed = [r for r in parsed if r]
        if parsed:
            all_data["Overall"] = parsed

    if not all_data:
        print(f"    SKIP: no results for {name}")
        return []

    # Save raw results
    raw_results_fname = f"{date_slug}__{rr_id}__{name_slug}.results.json"
    save_raw(out_dir, raw_results_fname, json.dumps(all_data, indent=2))

    # 4. Apply corrections from meta.yaml (if present)
    from bepc.corrections import apply_corrections, load_meta_corrections
    courses_for_correction: dict[str, list[dict]] = {
        (label if len(all_data) > 1 else ""): racers
        for label, racers in all_data.items()
    }
    meta_path = out_dir.parent / "meta" / f"{date_slug}__{rr_id}.meta.yaml"
    corrections = load_meta_corrections(meta_path)
    if corrections:
        print(f"    Applying {len(corrections)} correction(s) from {meta_path.name}")
        apply_corrections(courses_for_correction, corrections)
        # Map back
        single = len(all_data) == 1
        for label in list(all_data):
            key = "" if single else label
            all_data[label] = courses_for_correction.get(key, all_data[label])

    # 5. Write common JSON per course
    written = []
    total = sum(len(v) for v in all_data.values())
    multi = len(all_data) > 1

    for course_label, racers in all_data.items():
        if not racers:
            continue
        weight = round(len(racers) / total, 6)
        suffix = f" — {course_label}" if multi else ""
        dist_slug = f"__{_name_slug(course_label)}" if multi else ""
        fname = f"{date_slug}__{rr_id}__{name_slug}{dist_slug}.common.json"
        common = {
            "raceInfo": {
                "raceId": rr_id,
                "name": f"{event_name}{suffix}",
                "date": date,
                "displayURL": display_url,
                "distance": course_label if multi else "",
                "pointsWeight": weight,
                "sport": "Paddling",
            },
            "racerResults": racers,
        }
        (out_dir / fname).write_text(json.dumps(common, indent=2))
        print(f"    Written: {fname} ({len(racers)} racers, weight={weight})")
        written.append(fname)

    log_provenance(out_dir, {
        "race_id": rr_id,
        "name": event_name,
        "date": date,
        "source": "raceresult",
        "method": "api",
        "url": display_url,
        "raw_files": [raw_config_fname, raw_results_fname],
        "common_files": written,
    })

    return written


def _parse_row(row: list, fields: list) -> dict | None:
    """Convert a raceresult data row to common racer format."""
    if not row or not fields:
        return None

    def get(field_name: str) -> str:
        for i, f in enumerate(fields):
            if field_name.lower() in f.lower() and i < len(row):
                return str(row[i]).strip()
        return ""

    # Try to find place, name, time
    place_str = get("rank") or get("place") or (str(row[0]) if row else "")
    place_str = re.sub(r"\.$", "", place_str.strip())
    if not re.match(r"^\d+$", place_str):
        return None

    name = get("name") or get("displayname") or (str(row[2]) if len(row) > 2 else "")
    name = name.strip()
    if not name:
        return None

    # Reverse "LastName, FirstName" if needed
    if "," in name and "/" not in name:
        parts = name.split(",", 1)
        name = f"{parts[1].strip()} {parts[0].strip()}"

    time_str = get("finish") or get("gun") or get("time") or (str(row[-1]) if row else "")
    time_sec = _parse_time(time_str)
    if time_sec is None:
        return None

    craft = get("boatclass") or get("class") or get("division") or get("category") or ""
    gender = get("gender") or get("gendercategory") or ""
    gender = "Male" if gender.lower() in ("m", "male", "men") else "Female" if gender.lower() in ("f", "female", "women") else gender

    return {
        "originalPlace": int(place_str),
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
    }


# Fix missing import
import urllib.parse
