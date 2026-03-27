"""Generate static HTML pages from site/data.json."""
import json
from pathlib import Path

SITE_DIR = Path(__file__).parent.parent / "site"


def _nav() -> str:
    return """<nav>
  <a href="index.html">Standings</a> |
  <a href="trajectories.html">Trajectories</a>
</nav>"""


def generate_standings(data: dict) -> None:
    # Collect final state per racer from last race they appeared in
    racers: dict[tuple, dict] = {}
    for race in data["races"]:
        for r in race["results"]:
            key = (r["canonical_name"], r["craft_category"])
            racers[key] = r

    rows_pts = sorted(racers.values(), key=lambda r: -r["season_points"])
    rows_hpts = sorted(racers.values(), key=lambda r: -r["season_handicap_points"])

    def table(rows: list, points_field: str) -> str:
        html = '<table><thead><tr><th>#</th><th>Racer</th><th>Craft</th><th>Races</th><th>Points</th></tr></thead><tbody>\n'
        for i, r in enumerate(rows, 1):
            slug = r["canonical_name"].lower().replace(" ", "-")
            html += f'<tr><td>{i}</td><td><a href="racer/{slug}.html">{r["canonical_name"]}</a></td>'
            html += f'<td>{r["craft_category"]}</td><td>{r["num_races"]}</td><td>{r[points_field]}</td></tr>\n'
        html += '</tbody></table>'
        return html

    season_name = data["races"][0]["name"].rsplit("#", 1)[0].strip() if data["races"] else "BEPC Race Series"

    html = f"""<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>{season_name} — Standings</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
{_nav()}
<h1>{season_name}</h1>
<p>{len(data["races"])} races completed</p>

<h2>Season Standings</h2>
{table(rows_pts, "season_points")}

<h2>Handicap Standings</h2>
{table(rows_hpts, "season_handicap_points")}
</body></html>"""

    (SITE_DIR / "index.html").write_text(html)
    print("Generated: site/index.html")


def generate_all(data: dict) -> None:
    SITE_DIR.mkdir(exist_ok=True)
    (SITE_DIR / "racer").mkdir(exist_ok=True)
    _write_css()
    generate_standings(data)
    # trajectories.html and racer pages: coming soon


def _write_css() -> None:
    css = """body { font-family: sans-serif; max-width: 900px; margin: 2em auto; padding: 0 1em; }
nav { margin-bottom: 1.5em; }
nav a { margin-right: 1em; }
table { border-collapse: collapse; width: 100%; }
th, td { border: 1px solid #ccc; padding: 0.4em 0.8em; text-align: left; }
th { background: #f0f0f0; }
tr:nth-child(even) { background: #fafafa; }
"""
    (SITE_DIR / "style.css").write_text(css)
