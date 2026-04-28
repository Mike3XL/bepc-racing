"""Build RR→PMS mapping by scraping each PMS event detail page.

The PMS results index lists events with href="/Events/Results/{PMS_ID}".
Each of those pages embeds the raceresult event ID as a 6-digit number
in the HTML (inside the raceresult loader config). Fetch each page and
extract the RR ID.

Strategy: fetch the PMS results index, enumerate all /Events/Results/{ID}
links, fetch each, grep for the RR ID.

Output: data/sources/pms_rr_mapping.json
"""
import json
import re
import time
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent
DATA_ROOT = ROOT / "data"
OUT_PATH = DATA_ROOT / "sources" / "pms_rr_mapping.json"

UA = {"User-Agent": "Mozilla/5.0"}


def _fetch(url: str) -> str:
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=30) as resp:
        return resp.read().decode("utf-8", errors="replace")


def _load_existing() -> dict:
    if OUT_PATH.exists():
        return json.loads(OUT_PATH.read_text())
    return {}


def _save(m: dict) -> None:
    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUT_PATH.write_text(json.dumps(m, indent=2, sort_keys=True))


def scan(rr_ids_wanted: set[str] | None = None) -> dict:
    """Return mapping {rr_id: pms_id}. Skips already-mapped RR IDs."""
    existing = _load_existing()
    mapping = dict(existing)
    already = set(mapping.keys())

    # Fetch PMS results index
    print("Fetching PMS results index…")
    html = _fetch("https://register.pacificmultisports.com/Events/Results")

    # Extract all /Events/Results/{PMS_ID} links
    pms_ids = sorted(set(m.group(1) for m in re.finditer(r'/Events/Results/(\d+)', html)), key=int)
    print(f"Found {len(pms_ids)} PMS event IDs")

    for pms_id in pms_ids:
        # Skip if we already have a RR mapping pointing to this pms_id
        if any(str(v) == pms_id for v in mapping.values()):
            continue
        try:
            ev_html = _fetch(f"https://register.pacificmultisports.com/Events/Results/{pms_id}")
        except Exception as e:
            print(f"  PMS {pms_id}: fetch failed ({e})")
            continue
        # Grep for 6-digit IDs; RR IDs look like 6-digit integers > 100000
        candidates = set(m for m in re.findall(r'\b(\d{6})\b', ev_html))
        # Filter: only keep plausible RR IDs (>= 100000)
        rr_candidates = [c for c in candidates if int(c) >= 100000]
        if not rr_candidates:
            continue
        # If multiple, pick the first that matches a wanted RR ID
        chosen = None
        if rr_ids_wanted:
            for c in rr_candidates:
                if c in rr_ids_wanted and c not in already:
                    chosen = c
                    break
        if chosen is None and len(rr_candidates) == 1:
            chosen = rr_candidates[0]
        if chosen is None:
            # ambiguous; print all
            print(f"  PMS {pms_id}: candidates={rr_candidates} (no match — needs manual resolution)")
            continue
        mapping[chosen] = int(pms_id)
        print(f"  PMS {pms_id} ↔ RR {chosen}")
        _save(mapping)
        time.sleep(0.3)

    return mapping


if __name__ == "__main__":
    import sys
    wanted = set(sys.argv[1:]) if len(sys.argv) > 1 else None
    m = scan(wanted)
    print(f"\nMapping has {len(m)} entries → {OUT_PATH}")
