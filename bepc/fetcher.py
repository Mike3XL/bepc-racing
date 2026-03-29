"""Fetch race results from WebScorer API and convert to common.json format."""
import json
import re
import urllib.request
from pathlib import Path

WEBSCORER_API_ID = "16984"
API_URL = "https://www.webscorer.com/json/race?raceid={race_id}&apiid=" + WEBSCORER_API_ID


def fetch_raw(race_id: int) -> dict:
    url = API_URL.format(race_id=race_id)
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.loads(resp.read())


def raw_to_common(raw: dict) -> dict:
    info = raw.get("RaceInfo", {})
    # Results is a list of groupings, each with a Racers list
    # Collect all racers across groupings, deduplicate by name+category
    seen = set()
    racers = []
    for group in raw.get("Results", []):
        for r in group.get("Racers", []):
            time_str = r.get("Time", "")
            time_sec = _parse_time(time_str)
            if time_sec is None:
                continue  # skip DNS/DNF
            place_raw = r.get("Place", "-")
            try:
                place = int(place_raw)
            except (ValueError, TypeError):
                continue  # skip non-numeric places
            key = (r.get("Name", ""), r.get("Category", ""))
            if key in seen:
                continue
            seen.add(key)
            racers.append({
                "originalPlace": place,
                "canonicalName": r.get("Name", "Unknown"),
                "craftCategory": r.get("Category", "Unknown"),
                "gender": r.get("Gender", "Unknown"),
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
    # Sort by original place
    racers.sort(key=lambda r: r["originalPlace"])
    return {
        "raceInfo": {
            "raceId": info.get("RaceId", 0),
            "distance": info.get("Distance", ""),
            "name": info.get("Name", ""),
            "displayURL": f"https://www.webscorer.com/race?raceid={info.get('RaceId', 0)}",
            "date": info.get("Date", ""),
            "sport": info.get("Sport", ""),
            "startTime": info.get("StartTime", ""),
            "country": info.get("Country", ""),
            "city": info.get("City", ""),
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


def fetch_season(race_ids: list[int], out_dir: Path) -> None:
    out_dir.mkdir(parents=True, exist_ok=True)
    for race_id in race_ids:
        print(f"  Fetching {race_id}...", end=" ", flush=True)
        try:
            raw = fetch_raw(race_id)
            common = raw_to_common(raw)
            info = common["raceInfo"]
            # filename: YYYY-MM-DD__RACEID__NAME__N.common.json
            date_slug = _date_slug(info["date"])
            name_slug = re.sub(r'[^a-zA-Z0-9]+', '_', info["name"]).strip('_')
            fname = f"{date_slug}__{race_id}__{name_slug}.common.json"
            (out_dir / fname).write_text(json.dumps(common, indent=2))
            print(f"OK ({len(common['racerResults'])} racers)")
        except Exception as e:
            print(f"FAILED: {e}")


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
