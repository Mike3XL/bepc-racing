import json
from pathlib import Path
from .models import RaceInfo, RacerResult, RaceResult


def load_common_json(path: Path) -> RaceResult:
    data = json.loads(path.read_text())
    info = data["raceInfo"]
    race_info = RaceInfo(
        race_id=info["raceId"],
        name=info["name"],
        date=info["date"],
        display_url=info["displayURL"],
        points_weight=info.get("pointsWeight", 1.0),
        distance=info.get("distance", ""),
    )
    racers = [
        RacerResult(
            original_place=r["originalPlace"],
            canonical_name=r["canonicalName"],
            craft_category=r["craftCategory"],
            gender=r["gender"],
            time_seconds=r["timeSeconds"],
        )
        for r in data["racerResults"]
    ]
    return RaceResult(race_info=race_info, racer_results=racers)


def load_all_common(folder: Path) -> list[RaceResult]:
    files = sorted(folder.glob("*.common.json"))
    return [load_common_json(f) for f in files]
