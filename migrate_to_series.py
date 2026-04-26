"""Migration script: reorganize data/ by series, add per-race .meta.yaml sidecars.

Dry-run by default. Pass --apply to actually move files and write metadata.

Usage:
    python3.13 migrate_to_series.py              # report only
    python3.13 migrate_to_series.py --apply      # perform migration
"""
import argparse
import json
import re
import shutil
import sys
import yaml
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent
DATA = ROOT / "data"

# Current club → (series, default organizer)
CLUB_MAP = {
    "bepc":         ("bepc-summer",      "bepc"),
    "sckc":         ("sckc-duck-island", "sckc"),
    "sound-rowers": ("pnw",              "sound-rowers"),
    "pnw-regional": ("pnw",              "pnworca"),  # placeholder — mixed organizer, refined below
}

CLUBS = list(CLUB_MAP)


# Casual-race name patterns → series override to "none"
CASUAL_NAME_PATTERNS = [
    re.compile(r"\bst\.?\s*paddl", re.I),      # St Paddle's
    re.compile(r"\bst\.?\s*patrick", re.I),
    re.compile(r"\bhalloween", re.I),
    re.compile(r"\bfun\s+race\b", re.I),
]


def is_casual(base_name: str) -> bool:
    return any(p.search(base_name) for p in CASUAL_NAME_PATTERNS)


def refine_organizer(src_club: str, year: str, base_name: str, display_url: str) -> tuple:
    """Second-pass detection → (organizer, results_platform)."""
    name_lc = base_name.lower()
    url_lc = (display_url or "").lower()

    # Results platform from URL
    if "webscorer" in url_lc:
        platform = "webscorer"
    elif "paddleguru" in url_lc:
        platform = "paddleguru"
    elif "pacificmultisports" in url_lc:
        platform = "pacificmultisports"
    elif "jerichooutrigger" in url_lc:
        platform = "jericho"
    elif "raceresult" in url_lc:
        platform = "raceresult"
    else:
        platform = "unknown"

    # Organizer by source club + name heuristics
    if src_club == "bepc":
        if int(year) < 2018 or "salmon bay" in name_lc:
            return ("salmon-bay-paddle", platform)
        return ("bepc", platform)

    if src_club == "sound-rowers":
        return ("sound-rowers", platform)
    if src_club == "sckc":
        return ("sckc", platform)

    # pnw-regional: infer from name or URL
    if src_club == "pnw-regional":
        if "paddlers cup" in name_lc or "gig harbor" in name_lc:
            return ("ghckrt", platform)
        if "pnworca" in name_lc or "jerichooutrigger" in url_lc or "pacificmultisports" in url_lc:
            return ("pnworca", platform)
        if any(k in name_lc for k in ("sound rowers", "squaxin", "budd inlet",
                                       "rat island", "la conner", "narrows challenge")):
            return ("sound-rowers", platform)
        if any(k in name_lc for k in ("alderbrook", "deception pass", "peter marcus")):
            return ("salmon-bay-paddle", platform)
        return ("pnworca", platform)

    return ("unknown", platform)


def race_key(filename: str) -> tuple:
    """Parse YYYY-MM-DD__raceId__BaseName[__Course].common.json → (date, raceId, base_name)."""
    m = re.match(r"(\d{4}-\d{2}-\d{2})__([^_]+)__(.+?)(?:__([^_].*?))?\.common\.json$", filename)
    if not m:
        return None
    date, race_id, base, course = m.group(1), m.group(2), m.group(3), m.group(4)
    return (date, race_id, base.replace("_", " "), course.replace("_", " ") if course else None)


def parse_distance(raw_distance: str, course_label: str) -> float:
    """Best-effort parse of course distance to miles for primary auto-detect.
    Prefers clean `raw_distance` (e.g. '3 miles', '10K'); falls back to course_label.
    Returns 0 if unknown."""
    for text in (raw_distance or "", course_label or ""):
        text = text.lower()
        # Patterns: "7 mile(s)", "10k", "5 km", "2.33 miles"
        m = re.search(r"(\d+(?:\.\d+)?)\s*(mi|mile|miles|km|k)\b", text)
        if m:
            n = float(m.group(1))
            return n * 0.621371 if m.group(2).startswith("k") else n
        m = re.search(r"^\s*(\d+(?:\.\d+)?)", text)
        if m:
            return float(m.group(1))
    return 0.0


def collect():
    """Return dict: (series, year, date, race_id, base_name) → {
        'files': [(src_club, filename, file_path, course)],
        'organizer_candidates': set,
    }"""
    races = defaultdict(lambda: {"files": [], "organizer_candidates": set()})
    for club in CLUBS:
        club_dir = DATA / club
        if not club_dir.exists():
            continue
        default_series, _ = CLUB_MAP[club]
        for year_dir in sorted(club_dir.glob("*")):
            if not year_dir.is_dir():
                continue
            year = year_dir.name
            if not year.isdigit():
                continue
            common_dir = year_dir / "common"
            if not common_dir.is_dir():
                continue
            for f in sorted(common_dir.glob("*.common.json")):
                key = race_key(f.name)
                if key is None:
                    print(f"WARN: cannot parse filename: {f}", file=sys.stderr)
                    continue
                date, race_id, base, course = key

                # Per-file refinements
                display_url = ""
                try:
                    display_url = json.loads(f.read_text()).get("raceInfo", {}).get("displayURL", "")
                except Exception:
                    pass
                organizer, platform = refine_organizer(club, year, base, display_url)

                # Casual races under bepc → series=none
                series = default_series
                if is_casual(base) and club == "bepc":
                    series = "none"

                rk = (series, year, date, race_id, base)
                races[rk]["files"].append((club, f.name, f, course))
                races[rk]["organizer_candidates"].add((organizer, platform))
    return races


def build_meta(rk, info):
    """Build a .meta.yaml record for a race."""
    series, year, date, race_id, base = rk
    files = info["files"]
    org_candidates = info["organizer_candidates"]

    # Organizer + platform: pick from candidates. Prefer specific organizer over pnworca placeholder.
    organizers = {o for o, p in org_candidates}
    platforms = {p for o, p in org_candidates}
    if len(organizers) == 1:
        organizer = next(iter(organizers))
    else:
        non_placeholder = organizers - {"pnworca"}
        organizer = next(iter(non_placeholder)) if non_placeholder else "pnworca"
    # Platform: most-specific non-unknown, else "unknown"
    non_unknown = platforms - {"unknown"}
    platform = next(iter(non_unknown)) if non_unknown else "unknown"

    # Get the real race name from raceInfo (strip "— <course>" suffix if present)
    real_name = base
    for club, fname, fpath, course in files:
        try:
            d = json.loads(fpath.read_text())
            rn = d.get("raceInfo", {}).get("name", "").strip()
            # Strip trailing "— <course>" (em-dash/en-dash) suffix from per-course names.
            # Do NOT strip plain " - " since real race names often contain hyphenated fragments
            # like "La Conner - Sound Rowers and Paddlers".
            rn = re.sub(r"\s+[—–]\s+.+$", "", rn).strip()
            if rn:
                real_name = rn
                break
        except Exception:
            pass

    # Gather unique courses with distance for primary detection
    courses = {}  # course_label → {distance, starters, is_primary}
    for club, fname, fpath, course in files:
        label = course or ""  # "" means single-course race
        if label in courses:
            continue
        try:
            d = json.loads(fpath.read_text())
            raw_dist = d.get("raceInfo", {}).get("distance", "")
            starters = len(d.get("racerResults", []))
        except Exception:
            raw_dist, starters = "", 0
        # Prefer the raceInfo.distance field (clean "3 miles", "10K"); fall back to filename label
        courses[label] = {
            "distance_mi": round(parse_distance(raw_dist, label), 2),
            "starters": starters,
        }

    # Primary auto-detect: longest course. Ties broken by starter count.
    best_label = max(
        courses,
        key=lambda k: (courses[k]["distance_mi"], courses[k]["starters"]),
    )
    for label in courses:
        courses[label]["is_primary"] = (label == best_label)

    # SCKC special case: per-class files all count as same course.
    # Trigger only when we have >1 non-empty labels AND all look like class codes.
    class_like = re.compile(r"^(?:K|C|SS|OC|SUP|Wing)\s*\d*$", re.IGNORECASE)
    non_empty_labels = [l for l in courses if l]
    if len(non_empty_labels) > 1 and all(class_like.match(l) for l in non_empty_labels):
        # Collapse: one course, is_primary=true
        courses = {"": {
            "distance_mi": max((c["distance_mi"] for c in courses.values()), default=0),
            "starters": sum(c["starters"] for c in courses.values()),
            "is_primary": True,
            "_note": "classes collapsed (SCKC pattern)",
        }}

    meta = {
        "race_id": f"{date}__{race_id}",
        "name": real_name,
        "date": date,
        "organizer": organizer,
        "results_platform": platform,
        "tags": [],
        "courses": courses,
        "corrections": [],
        "notes": "",
    }
    return meta


def plan_migration():
    """Report what would be moved. Returns list of (src_paths, dest_series_dir, meta_path, meta)."""
    races = collect()
    plan = []
    for rk in sorted(races):
        series, year, date, race_id, base = rk
        info = races[rk]
        meta = build_meta(rk, info)

        dest_year = DATA / series / year / "common"
        dest_meta = DATA / series / year / "meta" / f"{date}__{race_id}.meta.yaml"

        # Dedupe: if multiple clubs contributed same (series, year, date, race_id, base),
        # there may be duplicate files with the same basename. Keep the first (pnw-regional
        # comes before sound-rowers alphabetically? Actually no: pnw-regional > pnw but let's
        # explicitly prefer pnw-regional).
        chosen_files = {}  # basename → (src_path, origin_club)
        for club, fname, fpath, course in info["files"]:
            if fname in chosen_files:
                existing_club = chosen_files[fname][1]
                # Prefer pnw-regional over sound-rowers
                if club == "pnw-regional" and existing_club == "sound-rowers":
                    chosen_files[fname] = (fpath, club)
                # otherwise keep existing
            else:
                chosen_files[fname] = (fpath, club)

        duplicate_count = sum(1 for _,_,_,_ in info["files"]) - len(chosen_files)
        plan.append({
            "series": series,
            "year": year,
            "date": date,
            "race_id": race_id,
            "base": base,
            "dest_common": dest_year,
            "dest_meta": dest_meta,
            "chosen_files": chosen_files,
            "duplicate_count": duplicate_count,
            "meta": meta,
        })
    return plan


def report(plan):
    by_series = defaultdict(list)
    for p in plan:
        by_series[p["series"]].append(p)

    print(f"\n{'='*70}\nMIGRATION PLAN (dry-run)\n{'='*70}\n")
    total_files = 0
    total_dupes = 0
    all_platforms = defaultdict(int)
    for series, races in sorted(by_series.items()):
        print(f"\n[{series}] {len(races)} races")
        orgs = defaultdict(int)
        for r in races:
            orgs[r["meta"]["organizer"]] += 1
            all_platforms[r["meta"]["results_platform"]] += 1
            total_files += len(r["chosen_files"])
            total_dupes += r["duplicate_count"]
        for org, n in sorted(orgs.items()):
            print(f"   organizer={org:20s} {n} races")

    print(f"\nResults platforms (all series):")
    for plat, n in sorted(all_platforms.items(), key=lambda kv: -kv[1]):
        print(f"   {plat:20s} {n} races")

    print(f"\nTotal races: {len(plan)}")
    print(f"Total files to keep: {total_files}")
    print(f"Duplicate files to delete: {total_dupes}")

    # Show a sample multi-course race's meta
    sample = next((r for r in plan if len(r["meta"]["courses"]) > 1), None)
    if sample:
        print(f"\n{'-'*70}\nSample multi-course meta: {sample['base']} ({sample['date']})")
        print(yaml.safe_dump(sample["meta"], sort_keys=False, default_flow_style=False))


def apply(plan):
    print("APPLYING migration...")
    for p in plan:
        p["dest_common"].mkdir(parents=True, exist_ok=True)
        p["dest_meta"].parent.mkdir(parents=True, exist_ok=True)
        # Move chosen files
        for fname, (src_path, origin) in p["chosen_files"].items():
            dest = p["dest_common"] / fname
            if src_path.resolve() == dest.resolve():
                continue
            if dest.exists():
                # Same destination reached by different source paths (cross-club duplicate).
                # Delete the source — destination already populated.
                src_path.unlink()
            else:
                shutil.move(str(src_path), str(dest))
        # Write meta
        with p["dest_meta"].open("w") as f:
            yaml.safe_dump(p["meta"], f, sort_keys=False, default_flow_style=False)
    # Remove now-empty source club directories
    for club in CLUBS:
        club_dir = DATA / club
        if not club_dir.exists():
            continue
        # Only remove if no more .common.json files
        remaining = list(club_dir.rglob("*.common.json"))
        if not remaining:
            shutil.rmtree(club_dir)
            print(f"Removed empty {club_dir}")
        else:
            print(f"WARN: {len(remaining)} files still in {club_dir} — not removed")
    print("Done.")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--apply", action="store_true")
    args = ap.parse_args()

    plan = plan_migration()
    report(plan)
    if args.apply:
        apply(plan)
    else:
        print("\nDry-run only. Pass --apply to perform migration.")


if __name__ == "__main__":
    main()
