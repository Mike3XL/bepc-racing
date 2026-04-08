"""Entry point: bepc <command>"""
import os
import argparse
import json
import sys
from dataclasses import asdict
from pathlib import Path

from bepc.loader import load_all_common
from bepc.processor import process_season
from bepc.generator import generate_all
from bepc.fetcher import fetch_season

DATA_DIR = Path(__file__).parent / "data"
SITE_DIR = Path(__file__).parent / "site"

CLUB_META = {
    "bepc": {
        "name": "Ballard Elks Paddle Club",
        "gh_branch": "gh-pages",
        "gh_url": "https://mike3xl.github.io/bepc-racing/",
    },
    "sound-rowers": {
        "name": "Sound Rowers",
        "gh_branch": "gh-pages-sound-rowers",
        "gh_url": "https://mike3xl.github.io/bepc-racing/ (sound-rowers)",
    },
    "pnw-regional": {
        "name": "PNW Regional",
        "gh_branch": "gh-pages-pnw-regional",
        "gh_url": "https://mike3xl.github.io/bepc-racing/ (pnw-regional)",
        "min_races_for_page": 3,
    },
}
CURRENT_CLUB = "bepc"


def _load_clubs_config() -> dict:
    """Load data/clubs.yaml, return {club_id: config_dict}."""
    cfg_path = DATA_DIR / "clubs.yaml"
    if not cfg_path.exists():
        return {}
    try:
        import yaml
        with open(cfg_path) as f:
            return yaml.safe_load(f).get("clubs", {})
    except Exception:
        return {}


def build_data_json() -> dict:
    """Scan data/<club>/<year>/common/ and build full multi-club/season structure."""
    clubs_cfg = _load_clubs_config()
    clubs = {}
    for club_dir in sorted(DATA_DIR.iterdir()):
        if not club_dir.is_dir() or club_dir.name == "sources":
            continue
        club_id = club_dir.name
        cfg = clubs_cfg.get(club_id, {})
        hcap_cfg = cfg.get("handicap", {})
        num_races_to_establish = hcap_cfg.get("num_races_to_establish", 1)
        do_carry_over = hcap_cfg.get("carry_over", False)

        seasons = {}
        carry_over: dict = {}  # {(name, craft): (handicap, carried_over_flag)}

        for season_dir in sorted(club_dir.iterdir()):
            if not season_dir.is_dir():
                continue
            year = season_dir.name
            common_dir = season_dir / "common"
            if not common_dir.exists():
                continue
            races = load_all_common(common_dir)

            # Merge races from included clubs for the same year
            for inc_club in cfg.get("include_clubs", []):
                inc_common = DATA_DIR / inc_club / year / "common"
                if inc_common.exists():
                    inc_races = load_all_common(inc_common)
                    races = races + inc_races

            # Sort merged races by date before handicap processing
            from datetime import datetime
            def _parse_date(r):
                for fmt in ("%b %d, %Y", "%B %d, %Y"):
                    try: return datetime.strptime(r.race_info.date, fmt)
                    except: pass
                return datetime.min
            races = sorted(races, key=_parse_date)

            races = process_season(races, carry_over=carry_over,
                                   num_races_to_establish=num_races_to_establish)
            seasons[year] = {
                "races": [
                    {
                        "race_id": race.race_info.race_id,
                        "name": race.race_info.name,
                        "date": race.race_info.date,
                        "display_url": race.race_info.display_url,
                        "distance": race.race_info.distance,
                        "points_weight": race.race_info.points_weight,
                        "results": [asdict(r) for r in race.racer_results],
                    }
                    for race in races
                ]
            }
            print(f"  {club_id}/{year}: {len(races)} races")

            # Build carry_over for next season from final handicap of each racer
            if do_carry_over:
                carry_over = {}
                for race in races:
                    for r in race.racer_results:
                        key = (r.canonical_name, r.craft_category)
                        carry_over[key] = (r.handicap_post, True)

                # Rescale carry_over so P33 racer = 1.0
                if carry_over:
                    hcap_values = sorted(v[0] for v in carry_over.values())
                    p33_idx = len(hcap_values) // 3
                    p33_val = hcap_values[p33_idx]
                    if p33_val > 0 and p33_val != 1.0:
                        carry_over = {k: (v[0] / p33_val, v[1]) for k, v in carry_over.items()}

        if seasons:
            current_season = max(seasons.keys())
            meta = CLUB_META.get(club_id, {})
            clubs[club_id] = {
                "name": cfg.get("name", meta.get("name", club_id)),
                "current_season": current_season,
                "min_races_for_page": cfg.get("display", {}).get("min_races_for_page",
                                      meta.get("min_races_for_page", 1)),
                "seasons": seasons,
            }
    return {"clubs": clubs, "current_club": CURRENT_CLUB}


def cmd_audit_crafts(args):
    """List Unknown, no-match, and multi-match craft values across all clubs/seasons."""
    from bepc.craft import normalize_craft, _strip_prefixes, _NON_CRAFT, _COMPILED
    from bepc.loader import load_all_common
    from collections import Counter
    unknown = Counter()
    multi = []
    seen = set()
    for club_dir in sorted(DATA_DIR.iterdir()):
        if not club_dir.is_dir():
            continue
        if args.club and club_dir.name != args.club:
            continue
        for season_dir in sorted(club_dir.iterdir()):
            if not season_dir.is_dir():
                continue
            common_dir = season_dir / "common"
            if not common_dir.exists():
                continue
            races = load_all_common(common_dir)
            for race in races:
                for r in race.racer_results:
                    raw = r.craft_specific or r.craft_category
                    if not raw or raw in seen:
                        continue
                    seen.add(raw)
                    cat, _ = normalize_craft(raw)
                    if cat == "Unknown":
                        unknown[raw] += 1
                    # Check multi-match
                    cleaned = _strip_prefixes(raw)
                    if not _NON_CRAFT.match(cleaned):
                        import re; cleaned2 = re.sub(r"-[MWFmwf](?:x)?$", "", cleaned, flags=re.I); matches = [c for p, c, _ in _COMPILED if p.match(cleaned2)]
                        if len(matches) > 1:
                            multi.append((raw, matches))
    if unknown:
        print(f"Unknown ({sum(unknown.values())} results):")
        for spec, n in unknown.most_common():
            print(f"  {n:4d}  {spec!r}")
    if multi:
        print(f"\nMulti-match ({len(multi)} craft strings):")
        for raw, matches in multi:
            print(f"  {raw!r:40} → {matches}")
    if not unknown and not multi:
        print("All craft values resolve to exactly one category.")
    elif multi:
        print("\nNote: multi-match entries resolve correctly via first-match-wins.")
        print("Review only if the first match seems wrong.")


def cmd_fetch_jericho(args):
    """Fetch all PNW smallboat races from a Jericho year page."""
    import urllib.request, re
    from bepc.fetcher_jericho import import_jericho_url

    year = args.year
    base = "https://www.jerichooutrigger.com"
    index_url = f"{base}/races{year}.html"
    print(f"Scanning {index_url}...")

    req = urllib.request.Request(index_url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=30) as resp:
        html = resp.read().decode("utf-8", errors="replace")

    # All result page links for this year
    all_links = re.findall(r'href="(/races' + year + r'/([^"]+\.html))"', html)

    # PNW smallboat slugs to include (substring match on slug)
    PNW_SLUGS = [
        'pnworca', 'roughwater', 'gorge', 'downwind',
        'laconner', 'rat', 'commencement', 'budd', 'shaw',
        'bainbridge', 'narrows', 'keats', 'fjord', 'whipper',
        'salmon', 'squaxin', 'guano', 'sausage', 'elk',
        'peter', 'bellingham', 'crazy8', 'npi', 'chicken',
        'flcc', 'bridges', 'islandironsmallboats', 'wutg',
        'bowen', 'weapon', 'penticton', 'cdnssmallboats',
        'innyoutty', 'lotusiron', 'dagrind', 'pnwchallenge',
        'sup',
    ]
    # Exclude OC6/team slugs even if matched above
    # Exact slug exclusions (OC6-only, sprint, or non-smallboat)
    EXCLUDE_EXACT = {'gorgev12', 'icebreaker', 'rustyiron', 'rati', 'roosterrock',
                     'classic', 'riverrun', 'islandiron', 'bbay', 'lotl',
                     'pokerpaddle', 'cdnsoc6', 'bridges', 'gorge',
                     'lotusiron', 'pnwchallenge',
                     'coratt', 'kanuhakit',  # sprint events (<1 mile)
                     'laconner',  # already in Sound Rowers data from WebScorer
                     'pnworca7',  # already fetched from WebScorer (race 384862)
                     'fjord',     # Board the Fjord — use WebScorer (389408) not Jericho HTML
                     }
    # bbay = OC6/team boats; lotusiron = OC6; pnwchallenge = OC6 change race
    # coratt = Canada sprint time trials (250-500m); kanuhakit = 1500m sprints

    seen = set()
    to_fetch = []
    for path, slug in all_links:
        slug_lower = slug.replace('.html', '').lower()
        if slug_lower in seen:
            continue
        if slug_lower in EXCLUDE_EXACT:
            continue
        if any(x in slug_lower for x in PNW_SLUGS):
            seen.add(slug_lower)
            to_fetch.append((path, slug_lower))

    print(f"Found {len(to_fetch)} PNW smallboat races:")
    for path, slug in to_fetch:
        print(f"  {slug}")

    if args.dry_run:
        return

    out_dir = DATA_DIR / args.club / year / "common"
    imported = 0
    for path, slug in to_fetch:
        url = base + path
        race_id = int(year) * 10000 + abs(hash(slug)) % 10000
        race_name = slug.replace('-', ' ').replace('_', ' ').title()
        print(f"\n  Importing: {slug}")
        try:
            import_jericho_url(url, out_dir, race_id, race_name, f"Jan 1, {year}")
            imported += 1
        except Exception as e:
            print(f"  FAILED: {e}")

    print(f"\nDone: {imported}/{len(to_fetch)} races imported")


def cmd_import_url(args):
    from bepc.fetcher_jericho import import_jericho_url
    out_dir = DATA_DIR / args.club / args.year / "common"
    print(f"Importing URL → {out_dir}")
    import_jericho_url(args.url, out_dir, int(args.race_id), args.name, args.date)


def cmd_import_pdf(args):
    from bepc.fetcher_pdf import import_pdf
    out_dir = DATA_DIR / args.club / args.year / "common"
    display_url = args.url or f"https://register.pacificmultisports.com/Events/Results/{args.race_id}"
    print(f"Importing PDF → {out_dir}")
    import_pdf(Path(args.pdf), out_dir, int(args.race_id), args.name, args.date, display_url)


def cmd_serve(args):
    import http.server
    import threading
    port = args.port
    site = Path(__file__).parent / "site"
    os.chdir(site)
    handler = http.server.SimpleHTTPRequestHandler
    handler.log_message = lambda *a: None  # suppress request logs
    with http.server.HTTPServer(("", port), handler) as httpd:
        print(f"Serving site/ at http://localhost:{port}  (Ctrl+C to stop)")
        import webbrowser
        webbrowser.open(f"http://localhost:{port}")
        httpd.serve_forever()


def cmd_fetch(args):
    out_dir = DATA_DIR / args.club / args.year / "common"
    print(f"Fetching {len(args.race_ids)} races → {out_dir}")
    fetch_season([int(r) for r in args.race_ids], out_dir)


def cmd_process(args):
    print("Processing seasons...")
    output = build_data_json()
    SITE_DIR.mkdir(exist_ok=True)
    out_path = SITE_DIR / "data.json"
    out_path.write_text(json.dumps(output, indent=2))
    total_races = sum(
        len(s["races"])
        for c in output["clubs"].values()
        for s in c["seasons"].values()
    )
    print(f"Written: {out_path} ({total_races} total races)")


def cmd_generate(args):
    club = getattr(args, 'club', None)
    data = json.loads((SITE_DIR / "data.json").read_text())
    if club:
        # Scope site to a single club
        if club not in data["clubs"]:
            print(f"ERROR: club '{club}' not found in data.json")
            sys.exit(1)
        data["current_club"] = club
    generate_all(data)


def cmd_publish(args):
    import subprocess
    club = getattr(args, 'club', None)
    publish_all = club is None or club == 'all'

    root = Path(__file__).parent
    site = root / "site"
    data = json.loads((SITE_DIR / "data.json").read_text())

    if publish_all:
        # Generate full multi-club site and push to gh-pages
        generate_all(data)
        branch = "gh-pages"
        url = "https://mike3xl.github.io/bepc-racing/"
        msg = "chore: publish full site (all clubs)"
    else:
        meta = CLUB_META.get(club, {})
        branch = getattr(args, 'branch', None) or meta.get("gh_branch", f"gh-pages-{club}")
        url = meta.get("gh_url", f"https://mike3xl.github.io/bepc-racing/ ({club})")
        if club not in data["clubs"]:
            print(f"ERROR: club '{club}' not found in data.json. Run 'bepc process' first.")
            sys.exit(1)
        data["current_club"] = club
        generate_all(data)
        msg = f"chore: publish site ({club})"

    script = f"""set -e
cd {root}
git read-tree --empty
git --work-tree={site} add --all
TREE=$(git write-tree)
COMMIT=$(git commit-tree $TREE -m "{msg}")
git push origin $COMMIT:refs/heads/{branch} --force
git read-tree HEAD
echo "Published → {url}"
"""
    result = subprocess.run(["bash", "-c", script])
    sys.exit(result.returncode)


def _are_duplicates(a: dict, b: dict) -> tuple[bool, list[str]]:
    """
    Three-stage duplicate detection:
    1. Racer count — >10% difference → not duplicates
    2. Finish time comparison — ≥80% of sorted times match within 2s
    3. Returns (is_duplicate, diff_notes) where diff_notes surfaces canonicalization opportunities
    """
    a_results = a.get("racerResults", [])
    b_results = b.get("racerResults", [])
    if not a_results or not b_results:
        return False, []

    # Stage 1: racer count
    count_a, count_b = len(a_results), len(b_results)
    if abs(count_a - count_b) / max(count_a, count_b) > 0.10:
        return False, []

    # Stage 2: finish time comparison
    def times(results):
        ts = []
        for r in results:
            t = r.get("timeSeconds", 0)
            if t and t > 0:
                ts.append(t)
        return sorted(ts)

    ta, tb = times(a_results), times(b_results)
    n = min(len(ta), len(tb), 20)
    if n < 3:
        return False, []

    matches = sum(1 for x, y in zip(ta[:n], tb[:n]) if abs(x - y) <= 2.0)
    if matches / n < 0.80:
        return False, []

    # Stage 3: diff for canonicalization opportunities
    diffs = []
    a_by_time = {round(r.get("timeSeconds", 0)): r for r in a_results}
    b_by_time = {round(r.get("timeSeconds", 0)): r for r in b_results}
    for t, ra in a_by_time.items():
        rb = b_by_time.get(t) or b_by_time.get(t+1) or b_by_time.get(t-1)
        if not rb:
            continue
        if ra.get("canonicalName") != rb.get("canonicalName"):
            diffs.append(f"  name: '{ra['canonicalName']}' vs '{rb['canonicalName']}'")
        if ra.get("craftCategory") != rb.get("craftCategory"):
            diffs.append(f"  craft: '{ra['craftCategory']}' vs '{rb['craftCategory']}'")

    return True, diffs


def cmd_audit_sources(args):
    """Detect duplicate race sources using time-based comparison and generate/update manifests."""
    import re as _re
    from difflib import SequenceMatcher

    def _normalize(name: str) -> str:
        name = name.lower()
        name = _re.sub(r'\s*[-—]\s*(long|short|downwind|intermediate|expert|novice|youth|men|women|mixed|overall|iron).*$', '', name)
        name = _re.sub(r'\s*\d+\s*(mile|km|mi|k)\b.*$', '', name)
        name = _re.sub(r'\s+course\s*$', '', name)
        return name.strip()

    def _similar(a: str, b: str) -> float:
        return SequenceMatcher(None, _normalize(a), _normalize(b)).ratio()

    club = getattr(args, 'club', CURRENT_CLUB)
    club_dir = DATA_DIR / club
    if not club_dir.exists():
        print(f"Club not found: {club}")
        return

    total_dupes = 0
    for year_dir in sorted(club_dir.iterdir()):
        if not year_dir.is_dir():
            continue
        common_dir = year_dir / "common"
        if not common_dir.exists():
            continue

        files = sorted(common_dir.glob("*.common.json"))
        if not files:
            continue

        loaded = []
        for f in files:
            try:
                d = json.loads(f.read_text())
                info = d.get("raceInfo", {})
                loaded.append({
                    "file": f.name, "data": d,
                    "date": info.get("date", ""),
                    "base": info.get("name", "").split(" — ")[0],
                    "racers": len(d.get("racerResults", [])),
                })
            except Exception:
                continue

        by_date: dict[str, list] = {}
        for r in loaded:
            by_date.setdefault(r["date"], []).append(r)

        manifest_path = common_dir / "manifest.json"
        existing = json.loads(manifest_path.read_text()) if manifest_path.exists() else None
        include, exclude = [], []
        has_dupes = False

        for date, group in sorted(by_date.items()):
            if len(group) < 2:
                include.extend(f["file"] for f in group)
                continue

            # Group by similar base name
            base_groups: dict[str, list] = {}
            for r in group:
                placed = False
                for key in list(base_groups.keys()):
                    if _similar(r["base"], key) > 0.7:
                        base_groups[key].append(r)
                        placed = True
                        break
                if not placed:
                    base_groups[r["base"]] = [r]

            for same_event in base_groups.values():
                if len(same_event) == 1:
                    include.append(same_event[0]["file"])
                    continue

                processed = set()
                for i, a in enumerate(same_event):
                    if a["file"] in processed:
                        continue
                    dupe_group = [a]
                    for b in same_event[i+1:]:
                        if b["file"] in processed:
                            continue
                        is_dup, diffs = _are_duplicates(a["data"], b["data"])
                        if is_dup:
                            dupe_group.append(b)
                            processed.add(b["file"])
                            if diffs:
                                print(f"\n  [{year_dir.name}] Canonicalization ({a['file'][:40]} vs {b['file'][:40]}):")
                                for d in diffs[:5]:
                                    print(d)

                    if len(dupe_group) > 1:
                        has_dupes = True
                        total_dupes += 1
                        print(f"\n  [{year_dir.name}] Duplicates on {date}:")
                        for d in dupe_group:
                            print(f"    {d['file']} ({d['racers']} racers)")
                        best = max(dupe_group, key=lambda x: x["racers"])
                        print(f"    → Selecting: {best['file']}")
                        include.append(best["file"])
                        for d in dupe_group:
                            if d["file"] != best["file"]:
                                exclude.append({"file": d["file"],
                                               "reason": f"Duplicate of {best['file']} (time-match)",
                                               "preferred": best["file"]})
                    else:
                        include.append(a["file"])
                    processed.add(a["file"])

        if has_dupes or existing:
            manifest_path.write_text(json.dumps({
                "note": "Authoritative list of race files included in club history.",
                "include": sorted(include),
                "exclude": exclude,
            }, indent=2))
            print(f"  Written: {manifest_path}")

    if total_dupes == 0:
        print(f"No duplicates found for {club}.")
    else:
        print(f"\nFound {total_dupes} duplicate group(s). Manifests written.")
        print("Review manifests and run 'process' to recompute.")


def cmd_fetch_raceresult(args):
    """Fetch one or more raceresult.com events into a club's data folder."""
    from bepc.fetcher_raceresult import fetch_event
    club = args.club
    year = args.year
    out_dir = DATA_DIR / club / year / "common"
    for rr_id in args.rr_ids:
        # Look up name/date from catalog if available
        catalog_path = DATA_DIR / "sources" / "pacificmultisports_events.json"
        name, date = f"Event {rr_id}", f"Jan 1, {year}"
        if catalog_path.exists():
            catalog = json.loads(catalog_path.read_text())
            for e in catalog.get("events", []):
                if e.get("rr_id") == rr_id:
                    name = e.get("name", name)
                    date = e.get("date") or date
                    break
        print(f"Fetching rr:{rr_id} → {name}")
        fetch_event(rr_id=rr_id, name=name, date=date, out_dir=out_dir)


def _scan_pacificmultisports(verbose: bool = True) -> list[dict]:
    """Scan gbrc.pacificmultisports.com for paddling events not yet in catalog."""
    import urllib.request, re as _re
    catalog_path = DATA_DIR / "sources" / "pacificmultisports_events.json"
    known_rr_ids = set()
    excluded_rr_ids = set()
    if catalog_path.exists():
        catalog = json.loads(catalog_path.read_text())
        known_rr_ids = {e["rr_id"] for e in catalog.get("events", []) if e.get("rr_id")}
        excluded_rr_ids = {e["rr_id"] for e in catalog.get("excluded", []) if e.get("rr_id")}

    paddling_keywords = ['peter marcus', 'gorge', 'narrows', 'keats', 'fjord', 'rough water',
                         'paddle', 'kayak', 'surfski', 'sup', 'outrigger', 'rat island',
                         'mercer', 'sound rower', 'pnworca', 'bbop', 'spocc', 'bellingham bay']

    # Get all event IDs from the results page
    req = urllib.request.Request("https://gbrc.pacificmultisports.com/Events/Results",
                                  headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=15) as r:
        html = r.read().decode("utf-8", errors="replace")
    all_ids = sorted(set(int(x) for x in re.findall(r'/Events/Results/(\d+)', html)))

    new_events = []
    import time
    for eid in all_ids:
        try:
            req = urllib.request.Request(f"https://gbrc.pacificmultisports.com/Events/Results/{eid}",
                                          headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(req, timeout=5) as r:
                page = r.read().decode("utf-8", errors="replace")
            title = re.search(r'<title>Results - ([^<]+) - Pacific', page)
            rr = re.search(r'new RRPublish\([^,]+,\s*(\d+)', page)
            if not title:
                continue
            name = title.group(1).strip()
            rr_id = int(rr.group(1)) if rr else None
            if not any(k in name.lower() for k in paddling_keywords):
                continue
            if rr_id and rr_id in known_rr_ids:
                continue
            if rr_id and rr_id in excluded_rr_ids:
                continue
            new_events.append({"gbrc_id": eid, "rr_id": rr_id, "name": name})
            if verbose:
                print(f"  NEW: gbrc:{eid} rr:{rr_id} — {name}")
        except Exception:
            pass
        time.sleep(0.1)

    return new_events


def cmd_scan_sources(args):
    """Scan result sources for new paddling events not yet in catalog."""
    source = getattr(args, 'source', 'all')
    found = []
    if source in ('all', 'pacificmultisports'):
        print("Scanning Pacific Multisports...")
        found.extend(_scan_pacificmultisports())
    # Future: add jericho, webscore organizer scans here
    if not found:
        print("No new events found.")
    else:
        print(f"\nFound {len(found)} new event(s). Add to data/sources/pacificmultisports_events.json and run fetch-raceresult.")


def cmd_scan(args):
    """Scan all result sources for new events."""
    args.source = 'all'
    cmd_scan_sources(args)


def cmd_sync(args):
    """Sync a club/year: discover missing races from data_sources, fetch them, reprocess."""
    import urllib.request, re as _re
    from datetime import datetime

    club = args.club
    year = args.year
    dry_run = args.dry_run
    clubs_cfg = _load_clubs_config()
    cfg = clubs_cfg.get(club, {})
    data_sources = cfg.get("data_sources", {})
    fetch_sources = data_sources.get("fetch_sources", [])

    if not fetch_sources:
        print(f"No data_sources.fetch_sources configured for '{club}' in clubs.yaml.")
        return

    # Build set of accepted jericho slugs from config
    accepted_jericho = set()
    for src in fetch_sources:
        if src.get("type") == "jericho":
            for slug in src.get("accepted_slugs", []):
                accepted_jericho.add(slug.lower())

    # Existing race IDs for this club/year
    club_year_dir = DATA_DIR / club / year / "common"
    existing_ids = set()
    suspect = []
    if club_year_dir.exists():
        for f in club_year_dir.glob("*.common.json"):
            m = _re.search(r'__(\d+)__', f.name)
            if m:
                existing_ids.add(m.group(1))
            # Flag suspects: placeholder date or unaccepted jericho source
            if "-01-01__" in f.name:
                suspect.append(f"  SUSPECT (placeholder date): {f.name}")
            else:
                import json as _json
                ri = _json.loads(f.read_text()).get("raceInfo", {})
                if "jericho" in ri.get("displayURL", ""):
                    # Check if this slug is accepted (match against full name after ID)
                    slug = _re.search(r'__\d+__(.+)\.common\.json$', f.name)
                    slug_str = slug.group(1).lower() if slug else ""
                    if not any(a.lower() in slug_str for a in accepted_jericho):
                        suspect.append(f"  SUSPECT (jericho — check for better source): {f.name}")

    print(f"Sync: {club} / {year}  [{'DRY RUN' if dry_run else 'LIVE'}]")
    print(f"  Existing races: {len(existing_ids)}")

    to_fetch_ws = []    # (race_id_str, name, date)
    to_fetch_rr = []    # (rr_id_int, name, date)

    for src in fetch_sources:
        src_type = src.get("type", "")

        if src_type == "webscorer_organizer":
            org_id = src.get("id", "")
            try:
                url = f"https://www.webscorer.com/{org_id}"
                req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
                with urllib.request.urlopen(req, timeout=15) as r:
                    html = r.read().decode("utf-8", errors="replace")
                pairs = _re.findall(r'raceid=(\d+)[^>]*>\s*([^<\n]{3,60})', html)
                date_map = {}
                for rid, date in _re.findall(r'raceid=(\d+)[^\n]*\n[^\n]*(\d{4}-\d{2}-\d{2}|\w+ \d+, \d{4})', html):
                    date_map[rid] = date
                seen = set()
                for rid, name in pairs:
                    name = name.strip()
                    if rid in seen or not name or rid in existing_ids:
                        continue
                    seen.add(rid)
                    d = date_map.get(rid, "")
                    # Filter to requested year
                    if year not in d and f"/{year}" not in d and not d.endswith(year):
                        continue
                    to_fetch_ws.append((rid, name, d))
                print(f"  [{src_type}:{org_id}] {len([x for x in to_fetch_ws])} new race(s) found")
            except Exception as e:
                print(f"  [{src_type}:{org_id}] ERROR: {e}")

        elif src_type == "pacificmultisports":
            catalog_path = DATA_DIR / "sources" / "pacificmultisports_events.json"
            if catalog_path.exists():
                import json as _json
                catalog = _json.loads(catalog_path.read_text())
                for ev in catalog.get("events", []):
                    if str(ev.get("year", "")) != year:
                        continue
                    if ev.get("type") and ev["type"] != club:
                        continue  # skip events tagged for a different club
                    rr_id = ev.get("rr_id")
                    if not rr_id:
                        continue
                    if str(rr_id) not in existing_ids:
                        to_fetch_rr.append((rr_id, ev.get("name", f"Event {rr_id}"), ev.get("date", f"Jan 1, {year}")))
                print(f"  [{src_type}] {len(to_fetch_rr)} new raceresult event(s) from catalog")

        # jericho: skip in sync — manual only

    # Report suspects
    if suspect:
        print(f"\n  Suspect races ({len(suspect)}):")
        for s in suspect:
            print(s)

    # Report what would be fetched
    all_new = len(to_fetch_ws) + len(to_fetch_rr)
    if not all_new:
        print("\n  Nothing new to fetch.")
    else:
        print(f"\n  New races to fetch: {all_new}")
        for rid, name, date in to_fetch_ws:
            print(f"    ws:{rid}  {date:<14}  {name[:55]}")
        for rr_id, name, date in to_fetch_rr:
            print(f"    rr:{rr_id}  {date:<14}  {name[:55]}")

    if dry_run or not all_new:
        return

    # Fetch
    if to_fetch_ws:
        from bepc.fetcher import fetch_race
        out_dir = club_year_dir
        out_dir.mkdir(parents=True, exist_ok=True)
        for rid, name, date in to_fetch_ws:
            print(f"  Fetching ws:{rid} {name}...")
            fetch_race(int(rid), out_dir)

    if to_fetch_rr:
        from bepc.fetcher_raceresult import fetch_event
        out_dir = club_year_dir
        out_dir.mkdir(parents=True, exist_ok=True)
        for rr_id, name, date in to_fetch_rr:
            print(f"  Fetching rr:{rr_id} {name}...")
            fetch_event(rr_id=rr_id, name=name, date=date, out_dir=out_dir)

    # Reprocess and regenerate
    print("\n  Reprocessing...")
    import types
    proc_args = types.SimpleNamespace()
    cmd_process(proc_args)
    gen_args = types.SimpleNamespace(club=club)
    cmd_generate(gen_args)


    """Search configured organizers for new races not yet fetched for a club."""
    import urllib.request, re

    club = args.club
    clubs_cfg = _load_clubs_config()
    cfg = clubs_cfg.get(club, {})
    organizers = cfg.get("race_inclusion", {}).get("include_organizers", [])

    if not organizers:
        print(f"No include_organizers configured for club '{club}' in clubs.yaml.")
        return

    # Find all race IDs already in this club's data folders
    club_dir = DATA_DIR / club
    existing_ids = set()
    if club_dir.exists():
        for f in club_dir.rglob("*.common.json"):
            m = re.search(r'__(\d{5,})__', f.name)
            if m:
                existing_ids.add(int(m.group(1)))

    print(f"Club: {club} | Organizers: {organizers}")
    print(f"Already have {len(existing_ids)} race IDs on disk.\n")

    all_new = []
    for org_id in organizers:
        try:
            url = f"https://www.webscorer.com/{org_id}"
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(req, timeout=15) as r:
                html = r.read().decode("utf-8", errors="replace")

            # Extract race ID + name + date pairs
            # WebScorer page has links like /race?raceid=XXXXX
            pairs = re.findall(r'raceid=(\d+)[^>]*>\s*([^<\n]{3,60})', html)
            # Also try to get dates
            date_map = {}
            date_blocks = re.findall(r'raceid=(\d+)[^\n]*\n[^\n]*(\d{4}-\d{2}-\d{2}|\w+ \d+, \d{4})', html)
            for rid, date in date_blocks:
                date_map[rid] = date

            seen = set()
            new_for_org = []
            for rid, name in pairs:
                name = name.strip()
                if rid in seen or not name:
                    continue
                seen.add(rid)
                if int(rid) not in existing_ids:
                    new_for_org.append((rid, name, date_map.get(rid, "")))

            if new_for_org:
                print(f"  [{org_id}] {len(new_for_org)} new races:")
                for rid, name, date in new_for_org[:30]:
                    print(f"    {rid}  {date:<12}  {name[:55]}")
                all_new.extend(new_for_org)
            else:
                print(f"  [{org_id}] No new races found.")
        except Exception as e:
            print(f"  [{org_id}] ERROR: {e}")

    if all_new:
        ids = " ".join(r[0] for r in all_new)
        print(f"\nTo fetch all new races:")
        print(f"  python3.13 cli.py fetch --club {club} --year <YEAR> {ids}")
        print(f"\nTo exclude a race, add its ID to the club's exclude_urls in clubs.yaml.")


def main():
    parser = argparse.ArgumentParser(prog="bepc")
    sub = parser.add_subparsers(dest="command")
    sub.add_parser("process", help="Process common JSON → site/data.json")

    gen_p = sub.add_parser("generate", help="Generate HTML pages from site/data.json")
    gen_p.add_argument("--club", default=None, help="Scope site to one club")

    pub_p = sub.add_parser("publish", help="Generate and push site to GitHub Pages")
    pub_p.add_argument("--club", default=None, help="Club to publish, or omit for full multi-club site on gh-pages")
    pub_p.add_argument("--branch", default=None, help="Override gh-pages branch name")

    audit_p = sub.add_parser("audit-crafts", help="List unrecognized craft values")
    audit_src_p = sub.add_parser("audit-sources", help="Detect duplicate race sources and generate manifests")
    audit_src_p.add_argument("--club", default=CURRENT_CLUB, help="Club to audit")

    rr_p = sub.add_parser("fetch-raceresult", help="Fetch events from raceresult.com (Pacific Multisports)")
    rr_p.add_argument("rr_ids", nargs="+", type=int, help="raceresult event ID(s)")
    rr_p.add_argument("--club", default="pnw-regional")
    rr_p.add_argument("--year", required=True, help="Year folder e.g. 2025")

    scan_src_p = sub.add_parser("scan-sources", help="Scan a result source for new events")
    scan_src_p.add_argument("--source", default="all", choices=["all", "pacificmultisports"],
                            help="Source to scan (default: all)")

    sub.add_parser("scan", help="Scan all result sources for new events")

    search_p = sub.add_parser("search", help="Search club's configured organizers for new races")
    search_p.add_argument("--club", default=CURRENT_CLUB, help="Club to search for")
    audit_p.add_argument("--club", default=None)

    sync_p = sub.add_parser("sync", help="Discover and fetch missing races for a club/year, then reprocess")
    sync_p.add_argument("--club", default=CURRENT_CLUB)
    sync_p.add_argument("--year", required=True, help="Season year e.g. 2025")
    sync_p.add_argument("--dry-run", action="store_true", help="Report missing/suspect races without fetching")

    jericho_p = sub.add_parser("fetch-jericho", help="Fetch PNW smallboat races from Jericho year page")
    jericho_p.add_argument("year", help="Year e.g. 2025")
    jericho_p.add_argument("--club", default="pnw-regional")
    jericho_p.add_argument("--dry-run", action="store_true", help="List races without importing")

    url_p = sub.add_parser("import-url", help="Import Jericho-format HTML results from URL")
    url_p.add_argument("url", help="URL of results page")
    url_p.add_argument("--club", default="pnw-regional")
    url_p.add_argument("--year", required=True)
    url_p.add_argument("--race-id", required=True)
    url_p.add_argument("--name", required=True)
    url_p.add_argument("--date", required=True)

    pdf_p = sub.add_parser("import-pdf", help="Import Pacific Multisports PDF results")
    pdf_p.add_argument("pdf", help="Path to PDF file")
    pdf_p.add_argument("--club", default="pnw-regional")
    pdf_p.add_argument("--year", required=True)
    pdf_p.add_argument("--race-id", required=True)
    pdf_p.add_argument("--name", required=True, help="Race name")
    pdf_p.add_argument("--date", required=True, help="Race date e.g. 'Mar 14, 2026'")
    pdf_p.add_argument("--url", default=None)

    serve_p = sub.add_parser("serve", help="Serve site/ locally for testing")
    serve_p.add_argument("--port", type=int, default=8080)

    fetch_p = sub.add_parser("fetch", help="Fetch races from WebScorer API")
    fetch_p.add_argument("--club", default="bepc")
    fetch_p.add_argument("--year", required=True)
    fetch_p.add_argument("race_ids", nargs="+", help="WebScorer race IDs")

    args = parser.parse_args()
    if args.command == "process":
        cmd_process(args)
    elif args.command == "generate":
        cmd_generate(args)
    elif args.command == "publish":
        cmd_publish(args)
    elif args.command == "audit-crafts":
        cmd_audit_crafts(args)
    elif args.command == "fetch-jericho":
        cmd_fetch_jericho(args)
    elif args.command == "import-url":
        cmd_import_url(args)
    elif args.command == "import-pdf":
        cmd_import_pdf(args)
    elif args.command == "serve":
        cmd_serve(args)
    elif args.command == "fetch":
        cmd_fetch(args)
    elif args.command == "audit-sources":
        cmd_audit_sources(args)
    elif args.command == "fetch-raceresult":
        cmd_fetch_raceresult(args)
    elif args.command == "scan-sources":
        cmd_scan_sources(args)
    elif args.command == "scan":
        cmd_scan(args)
    elif args.command == "search":
        cmd_search(args)
    elif args.command == "sync":
        cmd_sync(args)
    else:
        parser.print_help()


if __name__ == "__main__":
    main()
