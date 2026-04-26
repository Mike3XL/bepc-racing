"""Entry point: bepc <command>"""
import os
import argparse
import json
import sys
from dataclasses import asdict
from pathlib import Path

from bepc.loader import load_all_common, load_series_season
from bepc.processor import process_season
from bepc.generator import generate_all, generate_club
from bepc.fetcher import fetch_season

DATA_DIR = Path(__file__).parent / "data"
SITE_DIR = Path(__file__).parent / "site"

# Series metadata (replaces per-club config)
SERIES_ORDER = ["bepc-summer", "pnw", "sckc-duck-island", "none"]


def _load_series_config() -> dict:
    """Load data/series.yaml → {series_id: config}."""
    cfg_path = DATA_DIR / "series.yaml"
    if not cfg_path.exists():
        return {}
    try:
        import yaml
        with open(cfg_path) as f:
            return yaml.safe_load(f).get("series", {})
    except Exception:
        return {}


def _load_sites_config() -> dict:
    """Load sites: section from data/clubs.yaml (still used for publish targets)."""
    cfg_path = DATA_DIR / "clubs.yaml"
    if not cfg_path.exists():
        return {}
    try:
        import yaml
        with open(cfg_path) as f:
            return yaml.safe_load(f).get("sites", {})
    except Exception:
        return {}


def _load_clubs_config() -> dict:
    """Legacy — kept for commands that haven't been migrated yet."""
    cfg_path = DATA_DIR / "clubs.yaml"
    if not cfg_path.exists():
        return {}
    try:
        import yaml
        with open(cfg_path) as f:
            return yaml.safe_load(f).get("clubs", {})
    except Exception:
        return {}


CURRENT_CLUB = "bepc-summer"  # legacy — points at the default series


def build_data_json() -> dict:
    """Scan data/<series>/<year>/common/ and build multi-series/season structure.

    The output key is still 'clubs' (for generator backward-compat) but entries
    are keyed by series ID. Each entry carries name, seasons, and a handicap
    computed per-series via process_season."""
    from datetime import datetime, date as _date
    series_cfg = _load_series_config()
    clubs_cfg = _load_clubs_config()  # for per-series handicap settings (keyed by series)
    clubs = {}
    for series_id in SERIES_ORDER:
        series_dir = DATA_DIR / series_id
        if not series_dir.is_dir():
            continue
        # Per-series handicap config (falls back to defaults)
        hcap_cfg = (clubs_cfg.get(series_id, {}) or {}).get("handicap", {})
        num_races_to_establish = hcap_cfg.get("num_races_to_establish", 1)
        do_carry_over = hcap_cfg.get("carry_over", False)

        seasons = {}
        carry_over: dict = {}

        for season_dir in sorted(series_dir.iterdir()):
            if not season_dir.is_dir() or not season_dir.name.isdigit():
                continue
            year = season_dir.name
            races = load_series_season(DATA_DIR, series_id, year)
            if not races:
                continue

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
                        "series": race.race_info.series,
                        "organizer": race.race_info.organizer,
                        "results_platform": race.race_info.results_platform,
                        "tags": race.race_info.tags,
                        "is_primary": race.race_info.is_primary,
                        "results": [asdict(r) for r in race.racer_results],
                    }
                    for race in races
                ]
            }
            print(f"  {series_id}/{year}: {len(races)} races")

            if do_carry_over:
                carry_over = {}
                for race in races:
                    for r in race.racer_results:
                        key = (r.canonical_name, r.craft_category)
                        carry_over[key] = (r.handicap_post, True)
                if carry_over:
                    hcap_values = sorted(v[0] for v in carry_over.values())
                    p33_idx = len(hcap_values) // 3
                    p33_val = hcap_values[p33_idx]
                    if p33_val > 0 and p33_val != 1.0:
                        carry_over = {k: (v[0] / p33_val, v[1]) for k, v in carry_over.items()}

        if seasons:
            current_year = str(_date.today().year)
            current_season = max(seasons.keys())
            if current_year > current_season:
                seasons[current_year] = {"races": []}
                current_season = current_year
            scfg = series_cfg.get(series_id, {}) or {}
            clubs[series_id] = {
                "name": scfg.get("name", series_id),
                "current_season": current_season,
                "min_races_for_page": 1,
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
    import posixpath
    import threading
    import urllib.parse
    port = args.port
    site = Path(__file__).parent / "site"
    os.chdir(site)

    class _Handler(http.server.SimpleHTTPRequestHandler):
        def translate_path(self, path):
            p = urllib.parse.unquote(urllib.parse.urlparse(path).path)
            self.path = posixpath.normpath(p)
            return super().translate_path(self.path)
        log_message = lambda *a: None

    with http.server.HTTPServer(("", port), _Handler) as httpd:
        print(f"Serving site/ at http://localhost:{port}  (Ctrl+C to stop)")
        import webbrowser
        webbrowser.open(f"http://localhost:{port}")
        httpd.serve_forever()


def cmd_fetch(args):
    out_dir = DATA_DIR / args.club / args.year / "common"
    print(f"Fetching {len(args.race_ids)} races → {out_dir}")
    fetch_season([int(r) for r in args.race_ids], out_dir)


def _process() -> dict:
    """Rebuild site/data.json from raw files. Returns the data dict."""
    output = build_data_json()
    SITE_DIR.mkdir(exist_ok=True)
    (SITE_DIR / "data.json").write_text(json.dumps(output, indent=2))
    total = sum(len(s["races"]) for c in output["clubs"].values() for s in c["seasons"].values())
    print(f"Processed: {total} total races → site/data.json")
    return output


def cmd_build_club(args):
    """Generate pages for a single club only (fast, skips site-wide pages)."""
    club = args.club
    data = _process()
    if club not in data["clubs"]:
        print(f"ERROR: club '{club}' not found")
        sys.exit(1)
    data["current_club"] = club
    generate_club(data)


def cmd_build_site(args):
    """Generate full site for a named site config (all clubs + crosslinking + search)."""
    import time as _time
    site_id = args.site
    sites = _load_sites_config()
    if site_id not in sites:
        print(f"ERROR: site '{site_id}' not found in clubs.yaml sites: section")
        print(f"Available: {list(sites.keys())}")
        sys.exit(1)
    site_cfg = sites[site_id]
    t0 = _time.perf_counter()
    data = _process()
    print(f"  {_time.perf_counter()-t0:5.1f}s  data load + process")
    # Restrict to clubs in this site
    site_clubs = site_cfg.get("clubs", list(data["clubs"].keys()))
    data["site_clubs"] = site_clubs
    data["current_club"] = site_clubs[0]
    generate_all(data)


def cmd_publish_site(args):
    """Push built site to GitHub Pages (no generation)."""
    import subprocess
    site_id = args.site
    sites = _load_sites_config()
    if site_id not in sites:
        print(f"ERROR: site '{site_id}' not found in clubs.yaml sites: section")
        sys.exit(1)
    site_cfg = sites[site_id]
    branch = site_cfg.get("gh_branch", "gh-pages")
    url = site_cfg.get("gh_url", f"https://mike3xl.github.io/bepc-racing/")
    root = Path(__file__).parent
    site = root / "site"
    msg = f"chore: publish {site_id} site"
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


def cmd_update_club(args):
    """Auto-discover and fetch new races for a single club."""
    cmd_sync(args)


def cmd_update_site(args):
    """Auto-discover and fetch new races for all clubs in a named site."""
    import types, yaml
    from datetime import date
    from bepc.fetcher_upcoming import sync_upcoming

    site_id = args.site
    sites = _load_sites_config()
    if site_id not in sites:
        print(f"ERROR: site '{site_id}' not found")
        sys.exit(1)
    site_clubs = sites[site_id].get("clubs", [])
    year = str(date.today().year)

    # Sync upcoming
    upcoming_path = DATA_DIR.parent / "data" / "upcoming.yaml"
    print("=== Syncing upcoming races ===")
    sync_upcoming(upcoming_path, dry_run=getattr(args, 'dry_run', False))

    # Sync each club
    fetched_any = False
    for club in site_clubs:
        print(f"\n=== Syncing {club} {year} ===")
        sync_args = types.SimpleNamespace(club=club, year=year, dry_run=getattr(args, 'dry_run', False))
        before = _count_race_files(club)
        cmd_sync(sync_args)
        after = _count_race_files(club)
        if after > before:
            fetched_any = True

    # Report BEPC races needing manual fetch
    upcoming_data = yaml.safe_load(upcoming_path.read_text())
    today = date.today()
    manual_needed = []
    for r in upcoming_data.get("upcoming", []):
        d = r.get("date")
        if isinstance(d, str):
            d = date.fromisoformat(d)
        if d and d <= today and not r.get("source_id") and any(c in site_clubs for c in r.get("clubs", [])):
            manual_needed.append(r)
    if manual_needed:
        print(f"\n⚠️  {len(manual_needed)} race(s) past today with no source_id — fetch manually:")
        for r in manual_needed:
            print(f"   {r['date']} {r['name']} clubs={r.get('clubs',[])} → cli.py fetch webscorer --club <club> --year {year} <race_id>")

    if fetched_any:
        print(f"\n✓ New races fetched. Run: cli.py build-site {site_id} && cli.py publish-site {site_id}")
    else:
        print(f"\n✓ No new races found.")


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


def cmd_update(args):
    """Update site: sync upcoming, auto-fetch new results for all clubs, process, publish."""
    import types, yaml
    from datetime import date
    from bepc.fetcher_upcoming import sync_upcoming

    year = str(date.today().year)
    clubs_cfg = _load_clubs_config()
    auto_clubs = [c for c, d in clubs_cfg.items()
                  if d.get("data_sources", {}).get("fetch_sources")]

    # 1. Sync upcoming
    upcoming_path = DATA_DIR.parent / "data" / "upcoming.yaml"
    print("=== Syncing upcoming races ===")
    sync_upcoming(upcoming_path)

    # 2. Auto-sync all clubs with fetch_sources
    fetched_any = False
    for club in auto_clubs:
        print(f"\n=== Syncing {club} {year} ===")
        sync_args = types.SimpleNamespace(club=club, year=year, dry_run=False)
        before = _count_race_files(club)
        cmd_sync(sync_args)
        after = _count_race_files(club)
        if after > before:
            fetched_any = True
            print(f"  → {after - before} new race(s) fetched for {club}")

    # 3. Report BEPC races needing manual fetch (past, no source_id)
    upcoming_data = yaml.safe_load(upcoming_path.read_text())
    today = date.today()
    manual_needed = []
    for r in upcoming_data.get("upcoming", []):
        d = r.get("date")
        if isinstance(d, str):
            d = date.fromisoformat(d)
        if d and d <= today and not r.get("source_id") and "bepc" in r.get("clubs", []):
            manual_needed.append(r)
    if manual_needed:
        print(f"\n⚠️  {len(manual_needed)} BEPC race(s) past today with no source_id — fetch manually:")
        for r in manual_needed:
            print(f"   {r['date']} {r['name']}")
            print(f"   → python3.13 cli.py fetch --club bepc --year {year} <race_id>")

    # 4. Process + publish if anything changed (or --force)
    if fetched_any or getattr(args, 'force', False):
        print("\n=== Processing ===")
        cmd_process(args)
        print("\n=== Publishing ===")
        cmd_publish(args)
    else:
        print("\n✓ No new races found. Site is up to date.")


def _count_race_files(club: str) -> int:
    club_dir = DATA_DIR / club
    if not club_dir.exists():
        return 0
    return sum(1 for f in club_dir.rglob("*.common.json"))


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

    # --- Data refresh ---
    uc_p = sub.add_parser("update-club", help="Auto-discover and fetch new races for a club")
    uc_p.add_argument("club", help="Club ID e.g. bepc, sound-rowers")
    uc_p.add_argument("--year", default=None, help="Season year (default: current year)")
    uc_p.add_argument("--dry-run", action="store_true", help="Report without fetching")

    us_p = sub.add_parser("update-site", help="Auto-discover and fetch new races for all clubs in a site")
    us_p.add_argument("site", help="Site ID e.g. pnw")
    us_p.add_argument("--dry-run", action="store_true", help="Report without fetching")

    # --- Build ---
    bc_p = sub.add_parser("build-club", help="Generate pages for a single club (fast, skips site-wide pages)")
    bc_p.add_argument("club", help="Club ID e.g. bepc")

    bs_p = sub.add_parser("build-site", help="Generate full site for a named site config")
    bs_p.add_argument("site", help="Site ID e.g. pnw")

    # --- Publish ---
    ps_p = sub.add_parser("publish-site", help="Push built site to GitHub Pages")
    ps_p.add_argument("site", help="Site ID e.g. pnw")

    # --- Manual fetch (when you have the ID/file) ---
    fetch_p = sub.add_parser("fetch", help="Manually fetch races by source type")
    fetch_sub = fetch_p.add_subparsers(dest="fetch_source")

    fw = fetch_sub.add_parser("webscorer", help="Fetch races from WebScorer by race ID")
    fw.add_argument("--club", default="bepc")
    fw.add_argument("--year", required=True)
    fw.add_argument("race_ids", nargs="+", help="WebScorer race IDs")

    fj = fetch_sub.add_parser("jericho", help="Fetch PNW smallboat races from Jericho year page")
    fj.add_argument("year", help="Year e.g. 2025")
    fj.add_argument("--club", default="pnw-regional")
    fj.add_argument("--dry-run", action="store_true")

    fju = fetch_sub.add_parser("jericho-url", help="Import Jericho-format HTML results from URL")
    fju.add_argument("url")
    fju.add_argument("--club", default="pnw-regional")
    fju.add_argument("--year", required=True)
    fju.add_argument("--race-id", required=True)
    fju.add_argument("--name", required=True)
    fju.add_argument("--date", required=True)

    frr = fetch_sub.add_parser("raceresult", help="Fetch events from raceresult.com (Pacific Multisports)")
    frr.add_argument("rr_ids", nargs="+", type=int, help="raceresult event ID(s)")
    frr.add_argument("--club", default="pnw-regional")
    frr.add_argument("--year", required=True)

    fpdf = fetch_sub.add_parser("pdf", help="Import Pacific Multisports PDF results")
    fpdf.add_argument("pdf", help="Path to PDF file")
    fpdf.add_argument("--club", default="pnw-regional")
    fpdf.add_argument("--year", required=True)
    fpdf.add_argument("--race-id", required=True)
    fpdf.add_argument("--name", required=True)
    fpdf.add_argument("--date", required=True)
    fpdf.add_argument("--url", default=None)

    # --- Diagnostics ---
    sub.add_parser("audit-crafts", help="List unrecognized craft values")
    audit_src_p = sub.add_parser("audit-sources", help="Detect duplicate race sources")
    audit_src_p.add_argument("--club", default=CURRENT_CLUB)

    # --- Dev ---
    serve_p = sub.add_parser("serve", help="Serve site/ locally for testing")
    serve_p.add_argument("--port", type=int, default=8080)

    # --- Legacy aliases (kept for backward compat) ---
    sub.add_parser("process", help="[legacy] Rebuild data.json (now called automatically)")
    gen_p = sub.add_parser("generate", help="[legacy] Use build-site instead")
    gen_p.add_argument("--club", default=None)
    pub_p = sub.add_parser("publish", help="[legacy] Use build-site + publish-site instead")
    pub_p.add_argument("--club", default=None)
    pub_p.add_argument("--branch", default=None)
    sync_p = sub.add_parser("sync", help="[legacy] Use update-club instead")
    sync_p.add_argument("--club", default=CURRENT_CLUB)
    sync_p.add_argument("--year", required=True)
    sync_p.add_argument("--dry-run", action="store_true")

    args = parser.parse_args()

    from datetime import date as _date
    if args.command == "update-club":
        if not args.year:
            args.year = str(_date.today().year)
        cmd_update_club(args)
    elif args.command == "update-site":
        cmd_update_site(args)
    elif args.command == "build-club":
        cmd_build_club(args)
    elif args.command == "build-site":
        cmd_build_site(args)
    elif args.command == "publish-site":
        cmd_publish_site(args)
    elif args.command == "fetch":
        if args.fetch_source == "webscorer":
            cmd_fetch(args)
        elif args.fetch_source == "jericho":
            cmd_fetch_jericho(args)
        elif args.fetch_source == "jericho-url":
            cmd_import_url(args)
        elif args.fetch_source == "raceresult":
            cmd_fetch_raceresult(args)
        elif args.fetch_source == "pdf":
            cmd_import_pdf(args)
        else:
            fetch_p.print_help()
    elif args.command == "audit-crafts":
        cmd_audit_crafts(args)
    elif args.command == "audit-sources":
        cmd_audit_sources(args)
    elif args.command == "serve":
        cmd_serve(args)
    # Legacy aliases
    elif args.command == "process":
        cmd_process(args)
    elif args.command == "generate":
        print("⚠️  'generate' is deprecated — use 'build-site pnw' instead")
        cmd_generate(args)
    elif args.command == "publish":
        print("⚠️  'publish' is deprecated — use 'build-site pnw && publish-site pnw' instead")
        cmd_publish(args)
    elif args.command == "sync":
        cmd_sync(args)
    else:
        parser.print_help()



if __name__ == "__main__":
    main()
