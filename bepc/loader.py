import json
import re
from pathlib import Path
from urllib.parse import urlparse
from .models import RaceInfo, RacerResult, RaceResult
from .craft import normalize_craft

try:
    import yaml
except ImportError:
    yaml = None


def _source_prefix(display_url: str) -> str:
    """Return a short source prefix based on the displayURL domain."""
    host = urlparse(display_url).netloc
    if "webscorer" in host:
        return "ws"
    if "jericho" in host:
        return "jericho"
    if "pacificmultisports" in host:
        return "pm"
    if "paddleguru" in host:
        return "pg"
    return "race"


def _namespaced_id(raw_id: int, display_url: str) -> str:
    return f"{_source_prefix(display_url)}-{raw_id}"


def _load_global_aliases(data_root: Path) -> dict:
    """Load global data/aliases.json (merged across all series)."""
    aliases_path = data_root / "aliases.json"
    if aliases_path.exists():
        return json.loads(aliases_path.read_text())
    return {}


def _load_race_names(data_root: Path, series: str) -> dict:
    """Load race_names.json from the series directory (e.g. data/pnw/race_names.json)."""
    p = data_root / series / "race_names.json"
    if p.exists():
        return json.loads(p.read_text())
    return {}


def _load_meta(meta_dir: Path) -> dict:
    """Load all .meta.yaml files in a directory → {race_id_base: meta_dict}.
    race_id_base is "YYYY-MM-DD__raceId" (matches prefix of common.json filenames)."""
    if yaml is None or not meta_dir.exists():
        return {}
    out = {}
    for f in meta_dir.glob("*.meta.yaml"):
        try:
            m = yaml.safe_load(f.read_text())
            key = m.get("race_id", f.stem.replace(".meta", ""))
            out[key] = m
        except Exception:
            pass
    return out


def _race_id_base(filename: str) -> str:
    """Extract 'YYYY-MM-DD__raceId' from 'YYYY-MM-DD__raceId__...common.json'."""
    m = re.match(r"(\d{4}-\d{2}-\d{2})__([^_]+)__", filename)
    return f"{m.group(1)}__{m.group(2)}" if m else ""


def _course_label_from_filename(filename: str) -> str:
    """Extract course suffix from filename, or '' if single-course."""
    m = re.match(r"\d{4}-\d{2}-\d{2}__[^_]+__.+?(?:__([^_].*?))?\.common\.json$", filename)
    return (m.group(1) or "").replace("_", " ") if m else ""


def _normalize_craft(craft: str) -> tuple[str, str]:
    """Returns (category, specific) using the craft.py scheme."""
    return normalize_craft(craft)


def load_common_json(path: Path, aliases: dict | None = None,
                     race_names: dict | None = None,
                     series: str = "", meta: dict | None = None) -> RaceResult:
    data = json.loads(path.read_text())
    info = data["raceInfo"]
    raw_name = info["name"]
    # Apply race name override: match on base name (before " — ")
    base = raw_name.split(" — ")[0]
    suffix = raw_name[len(base):]
    display_name = (race_names or {}).get(base, base) + suffix

    # Determine is_primary for this course from meta
    is_primary = True
    course_label = _course_label_from_filename(path.name)
    if meta:
        courses = meta.get("courses", {}) or {}
        # Try exact label match, then empty-string (single-course)
        c = courses.get(course_label) or courses.get("") or {}
        if c:
            is_primary = bool(c.get("is_primary", True))

    race_info = RaceInfo(
        race_id=_namespaced_id(info["raceId"], info["displayURL"]),
        name=display_name,
        date=info["date"],
        display_url=info["displayURL"],
        points_weight=info.get("pointsWeight", 1.0),
        distance=info.get("distance", ""),
        series=series,
        organizer=(meta or {}).get("organizer", ""),
        results_platform=(meta or {}).get("results_platform", ""),
        tags=list((meta or {}).get("tags", []) or []),
        is_primary=is_primary,
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


def load_series_season(data_root: Path, series: str, year: str) -> list[RaceResult]:
    """Load all races in data/<series>/<year>/common/, attaching meta for each."""
    common_dir = data_root / series / year / "common"
    meta_dir = data_root / series / year / "meta"
    if not common_dir.exists():
        return []
    aliases = _load_global_aliases(data_root)
    race_names = _load_race_names(data_root, series)
    metas = _load_meta(meta_dir)
    races = []
    for f in sorted(common_dir.glob("*.common.json")):
        meta = metas.get(_race_id_base(f.name))
        races.append(load_common_json(f, aliases, race_names, series=series, meta=meta))
    # Deduplicate by (date, name) — first occurrence wins
    seen = set()
    deduped = []
    for r in races:
        key = (r.race_info.date, r.race_info.name)
        if key not in seen:
            seen.add(key)
            deduped.append(r)
    return deduped


def load_all_common(folder: Path) -> list[RaceResult]:
    """Legacy compatibility: load a single year directory's common.json files.
    Kept for scripts that still use the old API (audit-crafts etc.).
    For new code, use load_series_season()."""
    aliases = {}
    race_names = {}
    # Try legacy aliases at folder.parent.parent (club dir)
    legacy_aliases = folder.parent.parent / "aliases.json"
    if legacy_aliases.exists():
        aliases = json.loads(legacy_aliases.read_text())
    else:
        # Fall back to global
        data_root = folder
        while data_root.name != "data" and data_root.parent != data_root:
            data_root = data_root.parent
        if data_root.name == "data":
            aliases = _load_global_aliases(data_root)

    files = sorted(folder.glob("*.common.json"))
    races = [load_common_json(f, aliases, race_names) for f in files]

    seen = set()
    deduped = []
    for r in races:
        key = (r.race_info.date, r.race_info.name)
        if key not in seen:
            seen.add(key)
            deduped.append(r)
    return deduped
