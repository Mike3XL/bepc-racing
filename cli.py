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
}
CURRENT_CLUB = "bepc"


def build_data_json() -> dict:
    """Scan data/<club>/<year>/common/ and build full multi-club/season structure."""
    clubs = {}
    for club_dir in sorted(DATA_DIR.iterdir()):
        if not club_dir.is_dir():
            continue
        club_id = club_dir.name
        seasons = {}
        for season_dir in sorted(club_dir.iterdir()):
            if not season_dir.is_dir():
                continue
            year = season_dir.name
            common_dir = season_dir / "common"
            if not common_dir.exists():
                continue
            races = load_all_common(common_dir)
            races = process_season(races, carry_over={})
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
        if seasons:
            current_season = max(seasons.keys())
            clubs[club_id] = {
                "name": CLUB_META.get(club_id, {}).get("name", club_id),
                "current_season": current_season,
                "seasons": seasons,
            }
    return {"clubs": clubs, "current_club": CURRENT_CLUB}


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


def main():
    parser = argparse.ArgumentParser(prog="bepc")
    sub = parser.add_subparsers(dest="command")
    sub.add_parser("process", help="Process common JSON → site/data.json")

    gen_p = sub.add_parser("generate", help="Generate HTML pages from site/data.json")
    gen_p.add_argument("--club", default=None, help="Scope site to one club")

    pub_p = sub.add_parser("publish", help="Generate and push site to GitHub Pages")
    pub_p.add_argument("--club", default=CURRENT_CLUB, help="Club to publish (default: bepc)")
    pub_p.add_argument("--branch", default=None, help="Override gh-pages branch name")

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
    elif args.command == "serve":
        cmd_serve(args)
    elif args.command == "fetch":
        cmd_fetch(args)
    else:
        parser.print_help()


if __name__ == "__main__":
    main()
