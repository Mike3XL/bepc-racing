"""Top-level racer page generator — /racer/<slug>.html

Shows a racer's activity across ALL series they've competed in, with a section
per series. Per-series detail pages live at /<series>/racer/<slug>.html (generated
by the existing generate_racer_pages function).
"""
import json
from collections import defaultdict
from pathlib import Path

SITE_DIR = Path(__file__).parent.parent / "site"


def _slug(name: str) -> str:
    import re
    return re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")


def _fmt_time(seconds: float) -> str:
    if seconds is None or seconds <= 0:
        return ""
    s = int(seconds)
    h, rem = divmod(s, 3600)
    m, sec = divmod(rem, 60)
    return f"{h}:{m:02d}:{sec:02d}" if h else f"{m}:{sec:02d}"


def generate_top_level_racer_pages(data: dict) -> None:
    """Generate /racer/<slug>.html aggregating each human across all series."""
    from bepc.generator import _head, _foot, _nav, _racer_trophy_badges

    racer_data = defaultdict(lambda: defaultdict(lambda: defaultdict(list)))
    # racer_data[name][series_id][year][craft] = [race results]
    series_names = {sid: c.get("name", sid) for sid, c in data.get("clubs", {}).items()}

    for series_id, series in data["clubs"].items():
        for year, season in series["seasons"].items():
            for race in season["races"]:
                for r in race["results"]:
                    racer_data[r["canonical_name"]][series_id][year].append({
                        "race_id": race["race_id"],
                        "name": race["name"],
                        "date": race["date"],
                        "craft_category": r["craft_category"],
                        **r,
                    })

    out_dir = SITE_DIR / "racer"
    out_dir.mkdir(parents=True, exist_ok=True)
    for stale in out_dir.glob("*.html"):
        if stale.name != "index.html":
            stale.unlink()

    count = 0
    for name, series_map in sorted(racer_data.items()):
        slug = _slug(name)
        sections_html = ""

        # For each series, show: current index, races this season, link to per-series page
        series_ids_sorted = sorted(series_map.keys(), key=lambda s: (
            ["bepc-summer", "pnw", "sckc-duck-island", "none"].index(s)
            if s in ["bepc-summer", "pnw", "sckc-duck-island", "none"] else 99
        ))

        for series_id in series_ids_sorted:
            years = series_map[series_id]
            if not years:
                continue
            series_name = series_names.get(series_id, series_id)
            latest_year = max(years.keys())
            latest_results = years[latest_year]
            last = latest_results[-1] if latest_results else {}
            idx = last.get("handicap_post", 1.0)
            total_races = sum(len(results) for results in years.values())

            # Build a compact race history table for this series (across all years)
            rows = []
            for year in sorted(years.keys(), reverse=True):
                for r in sorted(years[year], key=lambda x: x.get("date", ""), reverse=True):
                    badges = _racer_trophy_badges(r.get("trophies", []))
                    pct = ""
                    if r.get("adjusted_time_versus_par"):
                        v = (r["adjusted_time_versus_par"] - 1) * 100
                        pct = f'<span style="color:{"#2E7D32" if v<=0 else "#666"};font-weight:{"bold" if v<=0 else "normal"}">{v:+.1f}%</span>'
                    rows.append(
                        f'<tr><td>{badges}</td>'
                        f'<td>{r["name"]}</td>'
                        f'<td class="text-muted small text-nowrap">{r["date"]}</td>'
                        f'<td>{_fmt_time(r.get("time_seconds"))}</td>'
                        f'<td>{r.get("original_place", "")}</td>'
                        f'<td>{r.get("adjusted_place", "")}</td>'
                        f'<td>{pct}</td>'
                        f'<td>{r.get("handicap_post", 0):.3f}</td></tr>'
                    )
            table_html = (
                '<div class="table-responsive"><table class="table table-sm table-striped">'
                '<thead><tr><th></th><th>Race</th><th>Date</th><th>Time</th>'
                '<th>Place</th><th>Place (Corr)</th><th>vs Predicted</th><th>Index</th></tr></thead>'
                f'<tbody>{"".join(rows)}</tbody></table></div>'
            )

            sections_html += f"""
<section class="mb-5">
  <div class="d-flex align-items-baseline justify-content-between mb-2 pb-2 border-bottom">
    <h3 class="mb-0"><a href="/{series_id}/racer/{slug}.html" class="text-decoration-none">{series_name}</a></h3>
    <div class="text-muted small">
      <strong>Index:</strong> {idx:.3f} &nbsp;|&nbsp;
      <strong>Races:</strong> {total_races} &nbsp;|&nbsp;
      <a href="/{series_id}/racer/{slug}.html">full {series_name} profile &rarr;</a>
    </div>
  </div>
  {table_html}
</section>"""

        html = _head(f"{name} — Racer Profile") + f"""
{_nav(active="racer", data=data, depth=1)}
<div class="container-fluid px-2 px-sm-3 mt-3">
  <h1 class="mb-1">{name}</h1>
  <p class="text-muted">Activity across all series. For series-specific standings and trajectories, click a series heading.</p>
  {sections_html}
</div>
""" + _foot()
        (out_dir / f"{slug}.html").write_text(html)
        count += 1

    print(f"Generated: site/racer/ ({count} top-level racer pages)")
