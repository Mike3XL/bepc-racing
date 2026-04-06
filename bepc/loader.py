import json
import re
from pathlib import Path
from .models import RaceInfo, RacerResult, RaceResult
from .craft import normalize_craft


def _load_aliases(folder: Path) -> dict:
    """Load aliases.json from the club directory (parent of year dirs)."""
    aliases_path = folder.parent.parent / "aliases.json"
    if aliases_path.exists():
        return json.loads(aliases_path.read_text())
    return {}


def _normalize_craft(craft: str) -> tuple[str, str]:
    """Returns (category, specific) using the craft.py scheme."""
    return normalize_craft(craft)


def load_common_json(path: Path, aliases: dict | None = None) -> RaceResult:
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
    racers = []
    for r in data["racerResults"]:
        cat, specific = _normalize_craft(r["craftCategory"])
        racers.append(RacerResult(
            original_place=r["originalPlace"],
            canonical_name=(aliases or {}).get(r["canonicalName"], r["canonicalName"]),
            craft_category=cat,
            craft_specific=specific,
            gender=r["gender"],
            time_seconds=r["timeSeconds"],
        ))
    return RaceResult(race_info=race_info, racer_results=racers)


def load_all_common(folder: Path) -> list[RaceResult]:
    aliases = _load_aliases(folder)
    manifest_path = folder / "manifest.json"

    if manifest_path.exists():
        # Use manifest — only load explicitly included files
        manifest = json.loads(manifest_path.read_text())
        files = [folder / f for f in manifest.get("include", []) if (folder / f).exists()]
    else:
        # No manifest — load all, deduplicate by (date, name)
        files = sorted(folder.glob("*.common.json"))

    races = [load_common_json(f, aliases) for f in files]

    if not manifest_path.exists():
        # Deduplicate by (date, name) — keep first occurrence (lowest race_id)
        seen: set = set()
        deduped = []
        for r in races:
            key = (r.race_info.date, r.race_info.name)
            if key not in seen:
                seen.add(key)
                deduped.append(r)
        races = deduped

    return races
