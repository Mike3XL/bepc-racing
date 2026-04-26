"""Regenerate meta.yaml files for races in data/<series>/ that are missing one.

Reads common.json files, groups by (series, year, date, race_id, base_name),
and writes meta.yaml for any group lacking one. Uses the same heuristics as
migrate_to_series.py.
"""
import json
import sys
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent
sys.path.insert(0, str(ROOT))
import migrate_to_series as m

DATA = ROOT / "data"
SERIES = ("bepc-summer", "pnw", "sckc-duck-island", "none")

# Map series → default organizer+platform (for the "none" case which had mixed origins)
# We'll re-infer per-file using the refine_organizer heuristic; series is known.

import yaml

count = 0
for series in SERIES:
    for year_dir in sorted((DATA / series).glob("*")):
        if not year_dir.is_dir() or not year_dir.name.isdigit():
            continue
        year = year_dir.name
        common_dir = year_dir / "common"
        meta_dir = year_dir / "meta"
        meta_dir.mkdir(exist_ok=True)
        # Group common.json files by (date, race_id, base_name)
        races = defaultdict(lambda: {"files": [], "organizer_candidates": set()})
        for f in sorted(common_dir.glob("*.common.json")):
            key = m.race_key(f.name)
            if key is None:
                continue
            date, race_id, base, course = key
            # Derive a virtual src_club from the series to drive refine_organizer
            src_club = {
                "bepc-summer": "bepc", "sckc-duck-island": "sckc",
                "pnw": "pnw-regional", "none": "bepc",
            }[series]
            try:
                d = json.loads(f.read_text())
                url = d.get("raceInfo", {}).get("displayURL", "")
            except Exception:
                url = ""
            org, plat = m.refine_organizer(src_club, year, base, url)
            rk = (date, race_id, base)
            races[rk]["files"].append((src_club, f.name, f, course))
            races[rk]["organizer_candidates"].add((org, plat))

        for rk, info in races.items():
            date, race_id, _ = rk
            meta_file = meta_dir / f"{date}__{race_id}.meta.yaml"
            if meta_file.exists():
                continue
            meta = m.build_meta((series, year, *rk), info)
            meta_file.write_text(yaml.safe_dump(meta, sort_keys=False, default_flow_style=False))
            count += 1
            print(f"Wrote {meta_file}")

print(f"\nGenerated {count} meta files")
