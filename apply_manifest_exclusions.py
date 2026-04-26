"""Apply old manifest.json exclusions: races NOT in a club's manifest should be
moved to series=none (or the correct series based on current data)."""
import json
import subprocess
import shutil
import yaml
from pathlib import Path

ROOT = Path(__file__).resolve().parent
DATA = ROOT / "data"

CLUB_SERIES = {
    "bepc": "bepc-summer",
    "sckc": "sckc-duck-island",
    "pnw-regional": "pnw",
    "sound-rowers": "pnw",
}

# Collect all files that were excluded by manifests
excluded = set()  # set of common.json basenames
for club, series in CLUB_SERIES.items():
    for year in range(2015, 2027):
        try:
            m = json.loads(subprocess.run(
                ["git", "show", f"HEAD~1:data/{club}/{year}/common/manifest.json"],
                capture_output=True, check=True,
            ).stdout)
        except subprocess.CalledProcessError:
            continue
        included = set(m.get("include", []))
        current_dir = DATA / series / str(year) / "common"
        if not current_dir.exists():
            continue
        for f in current_dir.glob("*.common.json"):
            if f.name not in included:
                excluded.add((series, str(year), f.name, club))

print(f"Found {len(excluded)} file-year-series entries excluded by manifests")

# Move excluded files + their raw siblings + meta to series=none
moved = 0
for series, year, fname, origin_club in sorted(excluded):
    src_common = DATA / series / year / "common" / fname
    if not src_common.exists():
        continue
    dest_dir = DATA / "none" / year / "common"
    dest_dir.mkdir(parents=True, exist_ok=True)
    dest_common = dest_dir / fname
    if dest_common.exists():
        print(f"SKIP duplicate: {dest_common}")
        src_common.unlink()
    else:
        shutil.move(str(src_common), str(dest_common))
    # Move matching raw.json if present
    raw = DATA / series / year / "common" / "raw" / fname.replace(".common.json", ".raw.json")
    if raw.exists():
        raw_dest_dir = DATA / "none" / year / "common" / "raw"
        raw_dest_dir.mkdir(parents=True, exist_ok=True)
        raw_dest = raw_dest_dir / raw.name
        if not raw_dest.exists():
            shutil.move(str(raw), str(raw_dest))
    moved += 1

print(f"Moved {moved} files to series=none")

# Rebuild meta files for affected races (both source series and none)
# Simplest: delete all existing meta for affected (series,year), then re-run plan
affected_years = {(s, y) for s, y, _, _ in excluded}
for s, y in affected_years:
    meta_dir = DATA / s / y / "meta"
    # Remove any meta file whose race_id points to a now-missing common file
    if meta_dir.exists():
        for m in list(meta_dir.glob("*.meta.yaml")):
            rc = yaml.safe_load(m.read_text())
            race_id = rc.get("race_id", "")  # e.g. "2016-06-01__73978"
            common_files = list((DATA / s / y / "common").glob(f"{race_id}*.common.json"))
            if not common_files:
                m.unlink()
                print(f"Removed orphaned meta: {m}")
