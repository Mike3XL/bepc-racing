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
        establishment_races = hcap_cfg.get("establishment_races", 2)
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
            races = process_season(races, carry_over=carry_over,
                                   establishment_races=establishment_races)
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
                        # Keep the most recent handicap_post for each racer
                        carry_over[key] = (r.handicap_post, True)

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
    club = getattr(args, 'club', CURRENT_CLUB)
    meta = CLUB_META.get(club, {})
    branch = getattr(args, 'branch', None) or meta.get("gh_branch", f"gh-pages-{club}")
    url = meta.get("gh_url", f"https://mike3xl.github.io/bepc-racing/ ({club})")

    # Generate scoped site first
    data = json.loads((SITE_DIR / "data.json").read_text())
    if club not in data["clubs"]:
        print(f"ERROR: club '{club}' not found in data.json. Run 'bepc process' first.")
        sys.exit(1)
    data["current_club"] = club
    generate_all(data)

    root = Path(__file__).parent
    site = root / "site"
    script = f"""set -e
cd {root}
git read-tree --empty
git --work-tree={site} add --all
TREE=$(git write-tree)
COMMIT=$(git commit-tree $TREE -m "chore: publish site ({club})")
git push origin $COMMIT:refs/heads/{branch} --force
git read-tree HEAD
echo "Published → {url}"
"""
    result = subprocess.run(["bash", "-c", script])
    sys.exit(result.returncode)


def cmd_audit_sources(args):
    """Detect duplicate race sources and generate/update manifests."""
    import re as _re
    from difflib import SequenceMatcher

    def _normalize(name: str) -> str:
        """Strip distance/course suffixes for event base name comparison."""
        name = name.lower()
        name = _re.sub(r'\s*[-—]\s*(long|short|downwind|intermediate|expert|novice|youth|men|women|mixed|overall|iron).*$', '', name)
        name = _re.sub(r'\s*\d+\s*(mile|km|mi|k)\b.*$', '', name)
        name = _re.sub(r'\s+course\s*$', '', name)
        return name.strip()

    def _norm_course(course: str) -> str:
        """Normalize course label for duplicate detection — keep distance numbers."""
        c = course.lower().strip()
        c = _re.sub(r'[^a-z0-9]', ' ', c)
        c = _re.sub(r'\s+', ' ', c).strip()
        return c or '__no_course__'

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

        # Load race info from each file
        races = []
        for f in files:
            try:
                d = json.loads(f.read_text())
                info = d.get("raceInfo", {})
                races.append({
                    "file": f.name,
                    "date": info.get("date", ""),
                    "name": info.get("name", ""),
                    "base": info.get("name", "").split(" — ")[0],
                    "course": info.get("distance", "") or (info.get("name", "").split(" — ")[-1] if " — " in info.get("name", "") else ""),
                    "racers": len(d.get("racerResults", [])),
                })
            except Exception:
                continue

        # Find duplicates: same date + similar base name
        groups: dict[str, list] = {}
        for r in races:
            key = r["date"]
            groups.setdefault(key, []).append(r)

        manifest_path = common_dir / "manifest.json"
        existing_manifest = json.loads(manifest_path.read_text()) if manifest_path.exists() else None
        include = []
        exclude = []
        has_dupes = False

        for date, group in sorted(groups.items()):
            if len(group) < 2:
                include.extend(f["file"] for f in group)
                continue

            # Group by normalized base name to find same-event files
            base_groups: dict[str, list] = {}
            for r in group:
                # Find which base_group this belongs to
                placed = False
                for key in list(base_groups.keys()):
                    if _similar(r["base"], key) > 0.7:
                        base_groups[key].append(r)
                        placed = True
                        break
                if not placed:
                    base_groups[r["base"]] = [r]

            for base_key, same_event in base_groups.items():
                if len(same_event) == 1:
                    include.append(same_event[0]["file"])
                    continue

                # Check if these are true duplicates (same course label) or multi-course
                course_groups: dict[str, list] = {}
                for r in same_event:
                    norm_course = _norm_course(r["course"])
                    course_groups.setdefault(norm_course, []).append(r)

                for course_key, course_files in course_groups.items():
                    if len(course_files) == 1:
                        # Unique course — include it
                        include.append(course_files[0]["file"])
                    else:
                        # True duplicate: same event, same course, multiple sources
                        has_dupes = True
                        total_dupes += 1
                        print(f"\n  [{year_dir.name}] True duplicates on {date} (course: '{course_key}'):")
                        for d in course_files:
                            print(f"    {d['file']} ({d['racers']} racers)")
                        best = max(course_files, key=lambda x: x["racers"])
                        print(f"    → Auto-selecting: {best['file']}")
                        include.append(best["file"])
                        for d in course_files:
                            if d["file"] != best["file"]:
                                exclude.append({
                                    "file": d["file"],
                                    "reason": f"True duplicate of {best['file']} (same event/course, different source fetch)",
                                    "preferred": best["file"]
                                })

        if has_dupes or existing_manifest:
            manifest = {
                "note": "Authoritative list of race files included in club history. Edit to resolve source conflicts.",
                "include": sorted(include),
                "exclude": exclude,
            }
            manifest_path.write_text(json.dumps(manifest, indent=2))
            print(f"  Written: {manifest_path}")

    if total_dupes == 0:
        print(f"No duplicates found for {club}.")
    else:
        print(f"\nFound {total_dupes} duplicate group(s). Manifests written.")
        print("Review manifests and run 'process' to recompute.")


def main():
    parser = argparse.ArgumentParser(prog="bepc")
    sub = parser.add_subparsers(dest="command")
    sub.add_parser("process", help="Process common JSON → site/data.json")

    gen_p = sub.add_parser("generate", help="Generate HTML pages from site/data.json")
    gen_p.add_argument("--club", default=None, help="Scope site to one club")

    pub_p = sub.add_parser("publish", help="Generate and push site to GitHub Pages")
    pub_p.add_argument("--club", default=CURRENT_CLUB, help="Club to publish (default: bepc)")
    pub_p.add_argument("--branch", default=None, help="Override gh-pages branch name")

    audit_p = sub.add_parser("audit-crafts", help="List unrecognized craft values")
    audit_src_p = sub.add_parser("audit-sources", help="Detect duplicate race sources and generate manifests")
    audit_src_p.add_argument("--club", default=CURRENT_CLUB, help="Club to audit")
    audit_p.add_argument("--club", default=None)

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
    else:
        parser.print_help()


if __name__ == "__main__":
    main()
