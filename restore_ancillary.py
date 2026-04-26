"""Restore ancillary files that were collateral-damaged by the migration.

Restores: aliases.json (merged → data/aliases.json), race_names.json (→ data/pnw/),
corrections.yaml, manifest.json, and .config.json/.results.json files (placed next
to their common.json in the new structure).
"""
import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
DATA = ROOT / "data"
SERIES = ("bepc-summer", "pnw", "sckc-duck-island", "none")


def git_show(path: str) -> bytes:
    return subprocess.run(
        ["git", "show", f"HEAD~1:{path}"],
        capture_output=True, check=True, cwd=ROOT,
    ).stdout


# 1. Merge all aliases.json into data/aliases.json
all_aliases = {}
for club in ("bepc", "pnw-regional", "sckc", "sound-rowers"):
    try:
        data = json.loads(git_show(f"data/{club}/aliases.json"))
        for k, v in data.items():
            if k in all_aliases and all_aliases[k] != v:
                print(f"CONFLICT: {club!r} aliases {k!r} -> {v!r} vs existing {all_aliases[k]!r}")
            all_aliases[k] = v
    except subprocess.CalledProcessError:
        pass
(DATA / "aliases.json").write_text(json.dumps(all_aliases, indent=2, ensure_ascii=False))
print(f"Merged aliases: {len(all_aliases)} entries → data/aliases.json")

# 2. Restore pnw-regional race_names.json → data/pnw/race_names.json
try:
    (DATA / "pnw" / "race_names.json").write_bytes(git_show("data/pnw-regional/race_names.json"))
    print("Restored → data/pnw/race_names.json")
except subprocess.CalledProcessError:
    print("(no pnw-regional/race_names.json at HEAD~1)")

# 3. Restore corrections.yaml files — find them in git and figure out where they go
result = subprocess.run(
    ["git", "ls-tree", "-r", "HEAD~1", "--name-only"],
    capture_output=True, text=True, check=True, cwd=ROOT,
)
paths = result.stdout.splitlines()

# corrections.yaml files
for p in [p for p in paths if p.endswith("corrections.yaml")]:
    # data/<club>/<year>/corrections.yaml → data/<series>/<year>/corrections.yaml
    parts = Path(p).parts
    if len(parts) < 4:
        continue
    club, year = parts[1], parts[2]
    # Map club → series
    club_to_series = {
        "bepc": "bepc-summer", "sckc": "sckc-duck-island",
        "pnw-regional": "pnw", "sound-rowers": "pnw",
    }
    series = club_to_series.get(club)
    if not series:
        continue
    dest = DATA / series / year / "corrections.yaml"
    if dest.exists():
        print(f"SKIP {p} — {dest} already exists")
        continue
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_bytes(git_show(p))
    print(f"Restored {p} → {dest}")

# 4. Restore .config.json / .results.json (pacificmultisports raw data)
# These live in data/<club>/<year>/common/raw/<name>.{config,results}.json
# Pattern: same basename as a .common.json file that we've moved.
for p in paths:
    if not (p.endswith(".config.json") or p.endswith(".results.json")):
        continue
    if "/common/raw/" not in p:
        continue
    parts = Path(p).parts
    year = parts[2]
    fname = parts[-1]  # e.g. 2024-07-12__299092__2024_Gorge_Downwind_Champs.config.json
    base = fname.rsplit(".", 2)[0]  # strip .config.json / .results.json
    # Find matching common.json (exact or prefix)
    matches = list(DATA.rglob(f"{year}/common/{base}.common.json"))
    if not matches:
        matches = list(DATA.rglob(f"{year}/common/{base}__*.common.json"))
    matches = [m for m in matches if any(s in m.parts for s in SERIES)]
    # Fallback: ignore the date in the filename; match on raceId prefix (second token)
    if not matches:
        tokens = base.split("__", 2)
        if len(tokens) >= 2:
            race_id = tokens[1]
            matches = [m for m in DATA.rglob(f"{year}/common/*__{race_id}__*.common.json")
                       if any(s in m.parts for s in SERIES)]
    if not matches:
        print(f"MISS: {p} -> no matching common.json")
        continue
    dest_dir = matches[0].parent / "raw"
    dest_dir.mkdir(exist_ok=True)
    dest = dest_dir / fname
    dest.write_bytes(git_show(p))

# 5. Count restored config/results
restored = sum(1 for _ in DATA.rglob("*.config.json")) + sum(1 for _ in DATA.rglob("*.results.json"))
print(f"Total config/results files now present: {restored}")
