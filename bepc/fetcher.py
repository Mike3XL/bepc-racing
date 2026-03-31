import json
import os
import re
import urllib.request
from pathlib import Path

def _load_api_id() -> str:
    """Load WebScorer API ID from .env file or environment variable."""
    env_file = Path(__file__).parent.parent / ".env"
    if env_file.exists():
        for line in env_file.read_text().splitlines():
            if line.startswith("WEBSCORER_API_ID="):
                return line.split("=", 1)[1].strip()
    val = os.environ.get("WEBSCORER_API_ID", "")
    if not val:
        raise RuntimeError("WEBSCORER_API_ID not set. Add it to .env or set the environment variable.")
    return val

API_URL = "https://www.webscorer.com/json/race?raceid={race_id}&apiid={api_id}"


def fetch_raw(race_id: int) -> dict:
    url = API_URL.format(race_id=race_id, api_id=_load_api_id())
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.loads(resp.read())


def _get_overall_groups(raw: dict) -> list[dict]:
    """Return all Overall=True groups from a race result."""
    return [g for g in raw.get("Results", []) if g.get("Grouping", {}).get("Overall") is True]


def _valid_racers(group: dict) -> list[dict]:
    """Return racers with valid finish times and numeric places."""
    racers = []
    for r in group.get("Racers", []):
        time_sec = _parse_time(r.get("Time", ""))
        if time_sec is None:
            continue
        try:
            int(r.get("Place", "-"))
        except (ValueError, TypeError):
            continue
        racers.append(r)
    return racers


def _make_common(info: dict, racers_raw: list[dict], points_weight: float, name_suffix: str = "") -> dict:
    racers = []
    for r in racers_raw:
        racers.append({
            "originalPlace": int(r["Place"]),
            "canonicalName": r.get("Name", "Unknown"),
            "craftCategory": r.get("Category", "Unknown"),
            "gender": r.get("Gender", "Unknown"),
            "handicap": 1.0,
            "timeSeconds": _parse_time(r["Time"]),
            "timeVersusPar": 0.0,
            "adjustedTimeSeconds": _parse_time(r["Time"]),
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
    racers.sort(key=lambda r: r["originalPlace"])
    race_id = info.get("RaceId", 0)
    name = info.get("Name", "")
    if name_suffix:
        name = f"{name} — {name_suffix}"
    return {
        "raceInfo": {
            "raceId": race_id,
            "distance": name_suffix or info.get("Distance", ""),
            "name": name,
            "displayURL": f"https://www.webscorer.com/race?raceid={race_id}",
            "date": info.get("Date", ""),
            "sport": info.get("Sport", ""),
            "startTime": info.get("StartTime", ""),
            "country": info.get("Country", ""),
            "city": info.get("City", ""),
            "pointsWeight": round(points_weight, 6),
        },
        "racerResults": racers,
    }


def _parse_time(s: str) -> float | None:
    """Parse 'H:MM:SS', 'M:SS', 'M:SS.f' → seconds."""
    if not s:
        return None
    s = s.strip()
    m = re.match(r'^(\d+):(\d+):(\d+(?:\.\d+)?)$', s)
    if m:
        return int(m.group(1)) * 3600 + int(m.group(2)) * 60 + float(m.group(3))
    m = re.match(r'^(\d+):(\d+(?:\.\d+)?)$', s)
    if m:
        return int(m.group(1)) * 60 + float(m.group(2))
    return None


def _date_slug(date_str: str) -> str:
    """Convert 'May 6, 2024' or 'Jul 1, 2024' → '2024-05-06'."""
    months = {
        "Jan":"01","Feb":"02","Mar":"03","Apr":"04","May":"05","Jun":"06",
        "Jul":"07","Aug":"08","Sep":"09","Oct":"10","Nov":"11","Dec":"12",
        "January":"01","February":"02","March":"03","April":"04","June":"06",
        "July":"07","August":"08","September":"09","October":"10","November":"11","December":"12",
    }
    m = re.match(r'(\w+)\s+(\d+),\s+(\d{4})', date_str)
    if m:
        mon = months.get(m.group(1), "00")
        return f"{m.group(3)}-{mon}-{int(m.group(2)):02d}"
    return date_str


def fetch_season(race_ids: list[int], out_dir: Path) -> None:
    out_dir.mkdir(parents=True, exist_ok=True)
    for race_id in race_ids:
        print(f"  Fetching {race_id}...", end=" ", flush=True)
        try:
            raw = fetch_raw(race_id)
            info = raw.get("RaceInfo", {})
            groups = _get_overall_groups(raw)

            # Get valid racers per group
            group_racers = [(g, _valid_racers(g)) for g in groups]
            group_racers = [(g, r) for g, r in group_racers if r]  # drop empty

            if not group_racers:
                print("SKIP (no valid racers)")
                continue

            total = sum(len(r) for _, r in group_racers)
            date_slug = _date_slug(info.get("Date", ""))
            name_slug = re.sub(r'[^a-zA-Z0-9]+', '_', info.get("Name", "")).strip('_')
            multi = len(group_racers) > 1

            for group, racers in group_racers:
                distance = group.get("Grouping", {}).get("Distance", "")
                weight = len(racers) / total
                common = _make_common(info, racers, weight, distance if multi else "")
                dist_slug = re.sub(r'[^a-zA-Z0-9]+', '_', distance).strip('_') if multi else ""
                suffix = f"__{dist_slug}" if dist_slug else ""
                fname = f"{date_slug}__{race_id}__{name_slug}{suffix}.common.json"
                (out_dir / fname).write_text(json.dumps(common, indent=2))

            groups_str = f"{len(group_racers)} groups, {total} total" if multi else f"{total} racers"
            print(f"OK ({groups_str})")
        except Exception as e:
            print(f"FAILED: {e}")
