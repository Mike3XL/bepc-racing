"""Entry point: bepc <command>"""
import argparse
import json
from dataclasses import asdict
from pathlib import Path

from bepc.loader import load_all_common
from bepc.processor import process_season
from bepc.generator import generate_all

DATA_DIR = Path(__file__).parent / "data"
SITE_DIR = Path(__file__).parent / "site"


def cmd_process(args):
    races = load_all_common(DATA_DIR / "common")
    races = process_season(races)

    # Build data.json
    output = {
        "races": [
            {
                "race_id": race.race_info.race_id,
                "name": race.race_info.name,
                "date": race.race_info.date,
                "display_url": race.race_info.display_url,
                "results": [asdict(r) for r in race.racer_results],
            }
            for race in races
        ]
    }

    SITE_DIR.mkdir(exist_ok=True)
    out_path = SITE_DIR / "data.json"
    out_path.write_text(json.dumps(output, indent=2))
    print(f"Written: {out_path} ({len(races)} races)")


def cmd_generate(args):
    data = json.loads((SITE_DIR / "data.json").read_text())
    generate_all(data)


def main():
    parser = argparse.ArgumentParser(prog="bepc")
    sub = parser.add_subparsers(dest="command")

    sub.add_parser("process", help="Process common JSON → site/data.json")
    sub.add_parser("generate", help="Generate HTML pages from site/data.json")

    args = parser.parse_args()
    if args.command == "process":
        cmd_process(args)
    elif args.command == "generate":
        cmd_generate(args)
    else:
        parser.print_help()


if __name__ == "__main__":
    main()
