"""Restore raw/*.raw.json files from git HEAD into the new series-based structure.

For each deleted raw file at data/<old_club>/<year>/common/raw/<name>.raw.json,
find the matching common.json at data/<series>/<year>/common/<name>.common.json
and restore the raw file alongside it.

Assumes the migration has already moved common.json files to their new locations.
"""
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
DATA = ROOT / "data"

# List raw files that exist at HEAD (pre-deletion) but are now deleted from working tree
result = subprocess.run(
    ["git", "ls-tree", "-r", "HEAD", "--name-only"],
    capture_output=True, text=True, check=True, cwd=ROOT,
)
raw_paths = [p for p in result.stdout.splitlines() if p.endswith(".raw.json") and "/common/raw/" in p]

restored = 0
missing = 0
for old in raw_paths:
    # old: data/<club>/<year>/common/raw/<name>.raw.json
    parts = Path(old).parts
    if len(parts) < 6:
        continue
    # parts: ("data","<club>","<year>","common","raw","<name>.raw.json")
    year = parts[2]
    raw_fname = parts[-1]                          # e.g. 2015-08-10__48616__...raw.json
    base_no_ext = raw_fname.replace(".raw.json", "")  # date__raceid__basename
    # First try exact match; then try prefix match (per-course common.json files)
    exact = list(DATA.rglob(f"{year}/common/{base_no_ext}.common.json"))
    exact = [m for m in exact if any(s in m.parts for s in ("bepc-summer","pnw","sckc-duck-island","none"))]
    if exact:
        matches = exact
    else:
        # Race has per-course common.json files; take any match starting with base
        prefix = list(DATA.rglob(f"{year}/common/{base_no_ext}__*.common.json"))
        matches = [m for m in prefix if any(s in m.parts for s in ("bepc-summer","pnw","sckc-duck-island","none"))]
    if not matches:
        missing += 1
        if missing <= 5:
            print(f"MISS: {old} -> no common.json found for {base_no_ext}")
        continue
    dest_dir = matches[0].parent / "raw"
    dest_dir.mkdir(exist_ok=True)
    dest = dest_dir / raw_fname
    # Restore the raw file from git HEAD
    blob = subprocess.run(
        ["git", "show", f"HEAD:{old}"],
        capture_output=True, check=True, cwd=ROOT,
    )
    dest.write_bytes(blob.stdout)
    restored += 1

print(f"\nRestored: {restored}")
print(f"Missing matches: {missing}")
