import json
import re
from pathlib import Path
from urllib.parse import urlparse
from .models import RaceInfo, RacerResult, RaceResult
from .craft import normalize_craft


def _source_prefix(display_url: str) -> str:
    """Return a short source prefix based on the displayURL domain."""
    host = urlparse(display_url).netloc
    if "webscorer" in host:
        return "ws"
    if "jericho" in host:
        return "jericho"
    if "pacificmultisports" in host:
        return "pm"
    return "race"


def _namespaced_id(raw_id: int, display_url: str) -> str:
    return f"{_source_prefix(display_url)}-{raw_id}"


def _load_aliases(folder: Path) -> dict:
    """Load aliases.json from the club directory (parent of year dirs)."""
    aliases_path = folder.parent.parent / "aliases.json"
    if aliases_path.exists():
        return json.loads(aliases_path.read_text())
    return {}


def _load_race_names(folder: Path) -> dict:
    """Load race_names.json from the club directory for display name overrides."""
    p = folder.parent.parent / "race_names.json"
    if p.exists():
        return json.loads(p.read_text())
    return {}


def _normalize_craft(craft: str) -> tuple[str, str]:
    """Returns (category, specific) using the craft.py scheme."""
    return normalize_craft(craft)


def load_common_json(path: Path, aliases: dict | None = None, race_names: dict | None = None) -> RaceResult:
    data = json.loads(path.read_text())
    info = data["raceInfo"]
    raw_name = info["name"]
    # Apply race name override: match on base name (before " — ")
    base = raw_name.split(" — ")[0]
    suffix = raw_name[len(base):]  # " — Course" or ""
    display_name = (race_names or {}).get(base, base) + suffix
    race_info = RaceInfo(
        race_id=_namespaced_id(info["raceId"], info["displayURL"]),
        name=display_name,
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
    race_names = _load_race_names(folder)
    manifest_path = folder / "manifest.json"

    if manifest_path.exists():
        # Use manifest — only load explicitly included files
        manifest = json.loads(manifest_path.read_text())
        files = [folder / f for f in manifest.get("include", []) if (folder / f).exists()]
    else:
        # No manifest — load all, deduplicate by (date, name)
        files = sorted(folder.glob("*.common.json"))

    races = [load_common_json(f, aliases, race_names) for f in files]

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
