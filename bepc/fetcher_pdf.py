"""Parse Pacific Multisports PDF results into common.json format."""
import json
import re
import shutil
import subprocess
from pathlib import Path


def _parse_name(raw: str) -> str:
    """'LastName, FirstName' → 'FirstName LastName'. Tandems kept as-is."""
    raw = raw.strip()
    if "," in raw and "/" not in raw:
        parts = raw.split(",", 1)
        return f"{parts[1].strip()} {parts[0].strip()}"
    return raw


def _parse_time(s: str) -> float | None:
    s = s.strip()
    m = re.match(r'^(\d+):(\d+):(\d+)$', s)
    if m:
        return int(m.group(1)) * 3600 + int(m.group(2)) * 60 + int(m.group(3))
    m = re.match(r'^(\d+):(\d+)$', s)
    if m:
        return int(m.group(1)) * 60 + int(m.group(2))
    return None


def parse_pdf(pdf_path: Path, race_id: int, race_name: str, race_date: str,
              display_url: str) -> list[dict]:
    """Parse a Pacific Multisports PDF and return list of common.json dicts (one per course)."""
    text = subprocess.check_output(
        ["pdftotext", "-layout", str(pdf_path), "-"],
        text=True
    )

    # Split into course sections
    courses: dict[str, list] = {}
    current_course = None

    for line in text.splitlines():
        line = line.strip()
        if not line:
            continue
        # Course header: a line that's just a course name (no numbers)
        if re.match(r'^[A-Za-z][A-Za-z\s]+Course$', line) or \
           re.match(r'^[A-Za-z][A-Za-z\s]+ Course$', line):
            current_course = line
            courses[current_course] = []
            continue
        # Result line: starts with a number followed by a dot
        m = re.match(r'^(\d+)\.\s+\d+\s+(.+?)\s{2,}(.+?)\s{2,}(Male|Female|Mixed)\s+(\d+:\d+(?::\d+)?)$', line)
        if m and current_course is not None:
            place = int(m.group(1))
            name = _parse_name(m.group(2))
            craft = m.group(3).strip()  # raw — craft.py will normalize on load
            gender = m.group(4)
            time_sec = _parse_time(m.group(5))
            if time_sec is None:
                continue
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

    if not courses:
        raise ValueError(f"No course sections found in {pdf_path}")

    total = sum(len(r) for r in courses.values())
    results = []
    for course_name, racers in courses.items():
        if not racers:
            continue
        weight = round(len(racers) / total, 6)
        suffix = f" — {course_name}" if len(courses) > 1 else ""
        results.append({
            "raceInfo": {
                "raceId": race_id,
                "name": f"{race_name}{suffix}",
                "date": race_date,
                "displayURL": display_url,
                "distance": course_name if len(courses) > 1 else "",
                "pointsWeight": weight,
                "sport": "Paddling",
            },
            "racerResults": racers,
        })
    return results


def _date_slug(date_str: str) -> str:
    months = {
        "Jan":"01","Feb":"02","Mar":"03","Apr":"04","May":"05","Jun":"06",
        "Jul":"07","Aug":"08","Sep":"09","Oct":"10","Nov":"11","Dec":"12",
    }
    m = re.match(r'(\w+)\s+(\d+),\s+(\d{4})', date_str)
    if m:
        return f"{m.group(3)}-{months.get(m.group(1),'00')}-{int(m.group(2)):02d}"
    return date_str


def import_pdf(pdf_path: Path, out_dir: Path, race_id: int, race_name: str,
               race_date: str, display_url: str) -> None:
    out_dir.mkdir(parents=True, exist_ok=True)
    raw_dir = out_dir / "raw"
    raw_dir.mkdir(parents=True, exist_ok=True)
    date_slug = _date_slug(race_date)
    name_slug = re.sub(r'[^a-zA-Z0-9]+', '_', race_name).strip('_')

    # Save raw PDF alongside common.json
    raw_pdf = raw_dir / f"{date_slug}__{race_id}__{name_slug}.raw.pdf"
    shutil.copy2(pdf_path, raw_pdf)

    commons = parse_pdf(pdf_path, race_id, race_name, race_date, display_url)

    # Build courses dict for correction application
    courses: dict[str, list[dict]] = {}
    for common in commons:
        label = common["raceInfo"].get("distance", "") or ""
        courses[label] = common["racerResults"]

    # Apply corrections from meta.yaml (if present)
    from bepc.corrections import apply_corrections, load_meta_corrections
    iso_date = date_slug  # already ISO
    meta_path = out_dir.parent / "meta" / f"{iso_date}__{race_id}.meta.yaml"
    corrections = load_meta_corrections(meta_path)
    if corrections:
        print(f"Applying {len(corrections)} correction(s) from {meta_path.name}")
        apply_corrections(courses, corrections)
        # Push corrected results back into the common records
        for common in commons:
            label = common["raceInfo"].get("distance", "") or ""
            common["racerResults"] = courses.get(label, common["racerResults"])

    for common in commons:
        dist = common["raceInfo"].get("distance", "")
        dist_slug = f"__{re.sub(r'[^a-zA-Z0-9]+', '_', dist).strip('_')}" if dist else ""
        fname = f"{date_slug}__{race_id}__{name_slug}{dist_slug}.common.json"
        (out_dir / fname).write_text(json.dumps(common, indent=2))
        n = len(common["racerResults"])
        print(f"  Written: {fname} ({n} racers, weight={common['raceInfo']['pointsWeight']})")
