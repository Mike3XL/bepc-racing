"""Generate static HTML pages from site/data.json."""
import json
from pathlib import Path

SITE_DIR = Path(__file__).parent.parent / "site"

# CDN links
_BOOTSTRAP_CSS = '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">'
_DATATABLES_CSS = '<link rel="stylesheet" href="https://cdn.datatables.net/2.0.8/css/dataTables.bootstrap5.min.css">'
_BOOTSTRAP_JS = '<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>'
_JQUERY = '<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>'
_DATATABLES_JS = '<script src="https://cdn.datatables.net/2.0.8/js/dataTables.min.js"></script>'
_DATATABLES_BS5_JS = '<script src="https://cdn.datatables.net/2.0.8/js/dataTables.bootstrap5.min.js"></script>'
_CHARTJS = '<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.4/dist/chart.umd.min.js"></script>'


def _current_season(data: dict) -> dict:
    """Return the current season dict {races: [...]} for the current club."""
    club = data["clubs"][data["current_club"]]
    return club["seasons"][club["current_season"]]


def _season_races(data: dict) -> list:
    return _current_season(data)["races"]


def _all_seasons(data: dict) -> dict:
    """Return {year: {races: [...]}} for current club."""
    return data["clubs"][data["current_club"]]["seasons"]


def _club_name(data: dict) -> str:
    return data["clubs"][data["current_club"]]["name"]


_SEASON_JS = """
<script>
function getSeason(fallback) {
  return localStorage.getItem('bepc_season') || fallback;
}
function setSeason(year) {
  localStorage.setItem('bepc_season', year);
}
function getDistance() {
  return localStorage.getItem('bepc_distance') || '';
}
function setDistance(dist) {
  if (dist) localStorage.setItem('bepc_distance', dist);
}
function getResultTab() {
  return localStorage.getItem('bepc_result_tab') || '';
}
function setResultTab(tab) {
  if (tab) localStorage.setItem('bepc_result_tab', tab);
}
function fetchData(url, cb) {
  fetch(url).then(r => r.json()).then(cb);
}
</script>"""


def _head(title: str, extra_css: str = "") -> str:
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
{_BOOTSTRAP_CSS}
{_DATATABLES_CSS}
{extra_css}
{_JQUERY}
{_BOOTSTRAP_JS}
{_DATATABLES_JS}
{_DATATABLES_BS5_JS}
<style>
  body {{ padding-top: 1rem; }}
  .navbar-brand {{ font-weight: bold; }}
  .traj-scroll {{ height: calc(100vh - 220px); overflow: auto; }}
  .hcap-medal {{ font-size:1.3em; padding: 2px 5px; border-radius: 4px; line-height:1; display:inline-block; }}
  .hcap-gold   {{ background:#FFF8DC; border:1px solid #FFD700; }}
  .hcap-silver {{ background:#F5F5F5; border:1px solid #C0C0C0; }}
  .hcap-bronze {{ background:#FDF0E0; border:1px solid #CD7F32; }}
  .plain-medal {{ background:#F8F8F8; border:1px solid #DDDDDD; }}
</style>
</head>
<body>
{_SEASON_JS}"""


def _nav(active: str = "", prefix: str = "") -> str:
    pages = [
        ("index.html", "Results"),
        ("standings.html", "Standings"),
        ("trajectories.html", "Trajectories"),
        ("racer/index.html", "Racers"),
        ("about.html", "About"),
    ]
    items = ""
    for href, label in pages:
        cls = "nav-link active" if label == active else "nav-link"
        items += f'<li class="nav-item"><a class="{cls}" href="{prefix}{href}">{label}</a></li>\n'
    return f"""<nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
  <div class="container">
    <a class="navbar-brand" href="{prefix}index.html">🏄 BEPC Racing</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="nav">
      <ul class="navbar-nav ms-auto">{items}</ul>
    </div>
  </div>
</nav>"""


def _foot(extra_js: str = "") -> str:
    return f"""
{extra_js}
</body></html>"""


def _datatable_init(table_id: str, order_col: int = 3, order_dir: str = "desc") -> str:
    return f"""<script>
$(document).ready(function() {{
  $('#{table_id}').DataTable({{
    order: [[{order_col}, '{order_dir}']],
    pageLength: 50,
    responsive: true
  }});
}});
</script>"""


def _racer_link(name: str, back: str = "") -> str:
    slug = _slug(name)
    return f'<a href="racer/{slug}.html">{name}</a>'


def _slug(name: str) -> str:
    import re
    return re.sub(r'[^a-z0-9-]', '-', name.lower()).strip('-')


# ── Final racer state ────────────────────────────────────────────────────────

def _final_states(data: dict) -> dict:
    """Return {(name, craft): racer_dict} from last appearance in current season."""
    return _final_states_for_season(_season_races(data))


# ── Pages ────────────────────────────────────────────────────────────────────

def _season_opts(data: dict, current_year: str) -> str:
    """Render <option> elements for season selector, newest first."""
    years = sorted(data["clubs"][data["current_club"]]["seasons"].keys(), reverse=True)
    return "".join(
        f'<option value="{y}"{" selected" if y == current_year else ""}>{y} Season</option>'
        for y in years
    )


def _final_states_for_season(season_races: list) -> dict:
    """Return {(name, craft): racer_dict} from last appearance in given races."""
    racers = {}
    for race in season_races:
        dist = race.get("distance", "")
        for r in race["results"]:
            entry = dict(r)
            entry["_distance"] = dist
            racers[(r["canonical_name"], r["craft_category"])] = entry
    return racers


def generate_data_files(data: dict) -> None:
    """Write per-page JSON data files to site/."""
    club = data["clubs"][data["current_club"]]
    current_year = club["current_season"]

    # standings-data.json
    standings_data = {"current_year": current_year, "seasons": {}}
    for year, season in _all_seasons(data).items():
        # Aggregate trophies per (name, craft) across all races
        trophy_totals: dict[tuple, dict] = {}
        for race in season["races"]:
            for r in race["results"]:
                key = (r["canonical_name"], r["craft_category"])
                if key not in trophy_totals:
                    trophy_totals[key] = {}
                for t in r.get("trophies", []):
                    trophy_totals[key][t] = trophy_totals[key].get(t, 0) + 1

        def trophy_summary(name, craft):
            counts = trophy_totals.get((name, craft), {})
            parts = []
            # Group streak codes by their max streak length
            streak_codes = {k: v for k, v in counts.items() if k.startswith('streak_')}
            max_streak = max((int(k.split('_')[1]) for k in streak_codes), default=0)
            streak_total = sum(streak_codes.values())

            for code, icon, label in [
                ("hcap_1", "🥇", "Handicap winner"),
                ("hcap_2", "🥈", "Handicap 2nd"),
                ("hcap_3", "🥉", "Handicap 3rd"),
                ("finish_1", "🥇", "Overall 1st"),
                ("finish_2", "🥈", "Overall 2nd"),
                ("finish_3", "🥉", "Overall 3rd"),
                ("consistent_1", "🎯", "Consistent performer"),
                ("consistent_2", "🎯", "Consistent performer"),
                ("consistent_3", "🎯", "Consistent performer"),
                ("par", "⛳", "Par racer"),
            ]:
                n = counts.get(code, 0)
                if not n:
                    continue
                cls = {"hcap_1": "hcap-gold", "hcap_2": "hcap-silver", "hcap_3": "hcap-bronze"}.get(code, "plain-medal")
                if n >= 4:
                    parts.append(f'<span class="hcap-medal {cls}" data-bs-toggle="tooltip" data-bs-title="{label} × {n}" style="white-space:nowrap">{icon}<sup style="font-size:0.65em;font-weight:bold">×{n}</sup></span>')
                else:
                    for _ in range(n):
                        parts.append(f'<span class="hcap-medal {cls}" data-bs-toggle="tooltip" data-bs-title="{label}">{icon}</span>')

            if streak_total:
                tooltip = f"Improving streak (best: {max_streak} races) × {streak_total}" if streak_total > 1 else f"Improving streak: {max_streak} races"
                if streak_total >= 4:
                    parts.append(f'<span class="hcap-medal plain-medal" data-bs-toggle="tooltip" data-bs-title="{tooltip}" style="white-space:nowrap">☄️<sup style="font-size:0.65em;font-weight:bold">×{streak_total}</sup></span>')
                else:
                    for _ in range(streak_total):
                        parts.append(f'<span class="hcap-medal plain-medal" data-bs-toggle="tooltip" data-bs-title="{tooltip}">☄️</span>')
            return ''.join(parts)

        pts = sorted(_final_states_for_season(season["races"]).values(), key=lambda r: -r["season_points"])
        hpts = sorted(_final_states_for_season(season["races"]).values(), key=lambda r: -r["season_handicap_points"])
        distances = set(r.get("distance", "") for r in season["races"])
        standings_data["seasons"][year] = {
            "multi_dist": len([d for d in distances if d]) > 1,
            "pts": [{"name": r["canonical_name"], "craft": r["craft_category"], "gender": r["gender"],
                     "trophies": trophy_summary(r["canonical_name"], r["craft_category"]),
                     "course": r.get("_distance", ""), "races": r["num_races"], "points": r["season_points"]} for r in pts],
            "hpts": [{"name": r["canonical_name"], "craft": r["craft_category"],
                      "gender": r["gender"],
                      "trophies": trophy_summary(r["canonical_name"], r["craft_category"]),
                      "course": r.get("_distance", ""), "races": r["num_races"],
                      "hpts": r["season_handicap_points"],
                      "hcap": round(r["handicap_post"], 3),
                      "points": r["season_points"]} for r in hpts],
        }
    (SITE_DIR / "standings-data.json").write_text(json.dumps(standings_data))

    # races-data.json
    from collections import defaultdict
    races_data = {"current_year": current_year, "seasons": {}}
    for year, season in _all_seasons(data).items():
        days: dict[int, list] = defaultdict(list)
        for r in season["races"]:
            days[r["race_id"]].append(r)
        seen_ids = []
        for r in season["races"]:
            if r["race_id"] not in seen_ids:
                seen_ids.append(r["race_id"])
        race_days = []
        for rid in seen_ids:
            courses = days[rid]
            base_name = courses[0]["name"].split(" — ")[0].strip()
            race_days.append({
                "race_id": rid,
                "name": base_name,
                "date": courses[0]["date"],
                "display_url": courses[0]["display_url"],
                "courses": [
                    {
                        "label": c["name"].split(" — ")[-1] if " — " in c["name"] else "Results",
                        "finish": sorted(c["results"], key=lambda x: x["original_place"]),
                        "handicap": sorted(c["results"], key=lambda x: x["adjusted_place"]),
                    }
                    for c in courses
                ],
            })
        races_data["seasons"][year] = race_days
    (SITE_DIR / "races-data.json").write_text(json.dumps(races_data))

    # trajectories-data.json
    colors = ["#e6194b","#3cb44b","#4363d8","#f58231","#911eb4","#42d4f4","#f032e6",
              "#bfef45","#c8a000","#469990","#dcbeff","#9A6324","#800000","#aaffc3",
              "#808000","#ffd8b1","#000075","#a9a9a9"]
    traj_data = {"current_year": current_year, "seasons": {}}
    for year, season in _all_seasons(data).items():
        pts, hpts, hnum = _build_traj_series(season["races"], colors)
        traj_data["seasons"][year] = {"pts": pts, "hpts": hpts, "hnum": hnum}
    (SITE_DIR / "trajectories-data.json").write_text(json.dumps(traj_data))

    print("Generated: site/*-data.json (3 files)")


def _loading_spinner() -> str:
    return '<div id="loading" class="text-center my-5" style="display:none"><div class="spinner-border text-secondary"></div></div>'


def generate_standings(data: dict) -> None:
    club = data["clubs"][data["current_club"]]
    current_year = club["current_season"]

    html = _head("Standings") + _nav("Standings") + f"""
<div class="container">
  <div class="d-flex align-items-center gap-3 mb-3">
    <h1 class="mb-0">Standings</h1>
    <select id="season-select" class="form-select form-select-sm w-auto d-inline-block mb-3">{_season_opts(data, current_year)}</select>
  </div>
  <ul class="nav nav-tabs mb-3">
    <li class="nav-item"><button class="nav-link active" data-bs-toggle="tab" data-bs-target="#tab-hpts">Handicap Points</button></li>
    <li class="nav-item"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-pts">Overall Points</button></li>
  </ul>
  <div class="tab-content" id="standings-content">
    <div class="tab-pane active" id="tab-hpts">
      <p class="text-muted small">Sorted by handicap points. Shift+click column headers to sort by multiple columns.</p>
      <table id="tbl-hpts" class="table table-striped table-hover">
        <thead><tr><th>#</th><th>Racer</th><th>Craft</th><th>Gender</th><th>Trophies</th><th>Races</th><th>Handicap Pts</th><th>Handicap</th><th>Overall Pts</th></tr></thead>
        <tbody id="body-hpts"></tbody>
      </table>
    </div>
    <div class="tab-pane" id="tab-pts">
      <p class="text-muted small">Sorted by overall points. Shift+click column headers to sort by multiple columns.</p>
      <table id="tbl-pts" class="table table-striped table-hover">
        <thead><tr><th>#</th><th>Racer</th><th>Craft</th><th>Gender</th><th>Trophies</th><th>Races</th><th>Handicap Pts</th><th>Handicap</th><th>Overall Pts</th></tr></thead>
        <tbody id="body-pts"></tbody>
      </table>
    </div>
  </div>
</div>
<script>
let SEASONS = null;
let dtPts = null, dtHpts = null;
function render(year) {{
  const s = SEASONS[year];
  if (dtPts) {{ dtPts.destroy(); dtPts = null; }}
  if (dtHpts) {{ dtHpts.destroy(); dtHpts = null; }}
  const fmtGender = g => g === 'Female/Male' ? 'Mixed' : g;
  const row = r => `<tr><td></td><td><a href="racer/${{r.name.toLowerCase().replace(/ /g,'-')}}.html">${{r.name}}</a></td><td>${{r.craft}}</td><td>${{fmtGender(r.gender)}}</td><td style="white-space:nowrap">${{r.trophies||''}}</td><td>${{r.races}}</td><td>${{r.hpts}}</td><td>${{r.hcap}}</td><td>${{r.points}}</td></tr>`;
  document.getElementById('body-hpts').innerHTML = s.hpts.map(row).join('');
  document.getElementById('body-pts').innerHTML = s.hpts.map(row).join('');
  document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => bootstrap.Tooltip.getOrCreateInstance(el));
  function addRowNumbers(dt) {{
    dt.on('draw', () => {{
      dt.column(0, {{search:'applied', order:'applied'}}).nodes().each((cell, i) => {{
        cell.innerHTML = i + 1;
      }});
    }}).draw(false);
  }}
  const colDefs = [{{targets:0, orderable:false}},{{targets:4, orderable:false}}];
  dtHpts = $('#tbl-hpts').DataTable({{order:[[6,'desc']],pageLength:100,responsive:true,autoWidth:false,columnDefs:colDefs}});
  addRowNumbers(dtHpts);
  dtPts = $('#tbl-pts').DataTable({{order:[[8,'desc']],pageLength:100,responsive:true,autoWidth:false,columnDefs:colDefs}});
  addRowNumbers(dtPts);
}}
window.addEventListener('DOMContentLoaded', () => {{
  fetchData('standings-data.json', d => {{
    SEASONS = d.seasons;
    const sel = document.getElementById('season-select');
    const yr = getSeason(d.current_year);
    if (SEASONS[yr]) sel.value = yr;
    render(sel.value);
    sel.addEventListener('change', e => {{ setSeason(e.target.value); render(e.target.value); }});
  }});
}});
</script>""" + _foot()
    (SITE_DIR / "standings.html").write_text(html)
    print("Generated: site/standings.html")


def generate_races(data: dict) -> None:
    club = data["clubs"][data["current_club"]]
    current_year = club["current_season"]

    html = _head("Results") + _nav("Results") + f"""
<div class="container">
  <div class="d-flex align-items-center gap-3 mb-3">
    <h1 class="mb-0">Results</h1>
    <select id="season-select" class="form-select form-select-sm w-auto d-inline-block mb-3">{_season_opts(data, current_year)}</select>
  </div>
  <div class="d-flex align-items-center gap-2 mb-3 flex-wrap">
    <button id="btn-prev" class="btn btn-outline-secondary">&larr; Prev</button>
    <button id="btn-next" class="btn btn-outline-secondary">Next &rarr;</button>
    <select id="race-select" class="form-select form-select-sm w-auto"></select>
    <div class="ms-2"><small id="race-meta" class="text-muted"></small></div>
  </div>
  <div id="course-content"></div>
</div>
<script>
let SEASONS = null;
let currentYear = '{current_year}';
let currentIndex = 0;

function slug(name) {{ return name.toLowerCase().replace(/ /g, '-'); }}
function fmtTime(s) {{
  s = Math.floor(s);
  const m = Math.floor(s / 60), sec = s % 60, h = Math.floor(m / 60);
  return h ? h+':'+String(m%60).padStart(2,'0')+':'+String(sec).padStart(2,'0')
           : m+':'+String(sec).padStart(2,'0');
}}

function badges(trophies) {{
  const plain = (icon, title) => `<span class="hcap-medal plain-medal" data-bs-toggle="tooltip" data-bs-title="${{title}}">${{icon}}</span>`;
  const badged = (icon, title, cls) => `<span class="hcap-medal ${{cls}}" data-bs-toggle="tooltip" data-bs-title="${{title}}">${{icon}}</span>`;
  const streak = (n) => `<span class="hcap-medal plain-medal" data-bs-toggle="tooltip" data-bs-title="Improving streak: ${{n}} races">☄️<sup style="font-size:0.65em;font-weight:bold">${{n}}</sup></span>`;
  const render = {{
    finish_1: () => plain('🥇','Overall 1st'),
    finish_2: () => plain('🥈','Overall 2nd'),
    finish_3: () => plain('🥉','Overall 3rd'),
    hcap_1:   () => badged('🥇','Handicap winner','hcap-gold'),
    hcap_2:   () => badged('🥈','Handicap 2nd','hcap-silver'),
    hcap_3:   () => badged('🥉','Handicap 3rd','hcap-bronze'),
    consistent_1: () => plain('🎯','Consistent performer'),
    consistent_2: () => plain('🎯','Consistent performer'),
    consistent_3: () => plain('🎯','Consistent performer'),
    par:      () => plain('⛳','Par racer'),
    fresh:    () => `<span class="hcap-medal" style="opacity:0.5;filter:grayscale(1)" data-bs-toggle="tooltip" data-bs-title="Provisional — first 2 results, not yet eligible for handicap awards">🆕</span>`,
  }};
  if (!trophies || !trophies.length) return '';
  return `<span style="display:flex;justify-content:center;gap:2px;flex-wrap:wrap">${{trophies.map(t => {{
    if (t.startsWith('streak_')) return streak(parseInt(t.split('_')[1]));
    return render[t] ? render[t]() : '';
  }}).join('')}}</span>`;
}}

function tableHtml(id_suffix) {{
  return `
  <ul class="nav nav-tabs" id="result-tabs-${{id_suffix}}">
    <li class="nav-item"><button class="nav-link active" data-bs-toggle="tab" data-bs-target="#tab-handicap-${{id_suffix}}">Handicap Order</button></li>
    <li class="nav-item"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-finish-${{id_suffix}}">Finish Order</button></li>
  </ul>
  <div class="tab-content border border-top-0 p-3 mb-3">
    <div class="tab-pane active" id="tab-handicap-${{id_suffix}}">
      <table class="table table-sm table-striped" style="table-layout:fixed">
        <colgroup><col style="width:90px"><col style="width:60px"><col style="width:170px"><col style="width:80px"><col style="width:70px"><col style="width:80px"><col style="width:80px"><col style="width:100px"><col style="width:60px"><col style="width:60px"></colgroup>
        <thead><tr><th></th><th>Place</th><th>Racer</th><th>Craft</th><th>Time</th>
          <th><span class="d-sm-none">Hcap</span><span class="d-none d-sm-inline">Handicap</span></th>
          <th><span class="d-sm-none">Adj</span><span class="d-none d-sm-inline">Adj Time</span></th>
          <th><span class="d-sm-none">New</span><span class="d-none d-sm-inline">New Handicap</span></th>
          <th><span class="d-sm-none">Pts</span><span class="d-none d-sm-inline">Points</span></th>
          <th><span class="d-sm-none">HPts</span><span class="d-none d-sm-inline">Hcap Pts</span></th>
        </tr></thead>
        <tbody id="body-handicap-${{id_suffix}}"></tbody>
      </table>
    </div>
    <div class="tab-pane" id="tab-finish-${{id_suffix}}">
      <table class="table table-sm table-striped" style="table-layout:fixed">
        <colgroup><col style="width:90px"><col style="width:60px"><col style="width:170px"><col style="width:80px"><col style="width:70px"><col style="width:80px"><col style="width:80px"><col style="width:100px"><col style="width:60px"><col style="width:60px"></colgroup>
        <thead><tr><th></th><th>Place</th><th>Racer</th><th>Craft</th><th>Time</th>
          <th><span class="d-sm-none">Hcap</span><span class="d-none d-sm-inline">Handicap</span></th>
          <th><span class="d-sm-none">Adj</span><span class="d-none d-sm-inline">Adj Time</span></th>
          <th><span class="d-sm-none">New</span><span class="d-none d-sm-inline">New Handicap</span></th>
          <th><span class="d-sm-none">Pts</span><span class="d-none d-sm-inline">Points</span></th>
          <th><span class="d-sm-none">HPts</span><span class="d-none d-sm-inline">Hcap Pts</span></th>
        </tr></thead>
        <tbody id="body-finish-${{id_suffix}}"></tbody>
      </table>
    </div>
  </div>`;
}}

function rows(results, placeField) {{
  const isHcap = placeField === 'adjusted_place';
  return results.map(r =>
    `<tr><td>${{badges(r.trophies)}}</td>
    <td>${{r[placeField]}}</td>
    <td><a href="racer/${{slug(r.canonical_name)}}.html">${{r.canonical_name}}</a></td>
    <td>${{r.craft_category}}</td>
    <td>${{isHcap ? fmtTime(r.time_seconds) : '<strong>' + fmtTime(r.time_seconds) + '</strong>'}}</td>
    <td>${{r.handicap.toFixed(3)}}</td>
    <td>${{isHcap ? '<strong>' + fmtTime(r.adjusted_time_seconds) + '</strong>' : fmtTime(r.adjusted_time_seconds)}}</td>
    <td>${{r.handicap_post.toFixed(3)}}</td>
    <td>${{r.race_points || 0}}</td>
    <td>${{r.handicap_points || 0}}</td></tr>`
  ).join('');
}}

function renderRace(index) {{
  const races = SEASONS[currentYear];
  currentIndex = index;
  const race = races[index];
  const totalStarters = race.courses.reduce((s,c) => s + c.finish.length, 0);
  const content = document.getElementById('course-content');
  document.getElementById('race-meta').innerHTML =
    race.date + ' · ' + totalStarters + ' starters · <a href="' + race.display_url + '" target="_blank">WebScorer ↗</a>';
  document.getElementById('race-select').value = index;
  document.getElementById('btn-prev').disabled = index === 0;
  document.getElementById('btn-next').disabled = index === races.length - 1;
  let tabNav = '<ul class="nav nav-tabs mb-0">';
  let tabContent = '<div class="tab-content">';
  race.courses.forEach((course, i) => {{
    const active = i === 0 ? 'active' : '';
    tabNav += `<li class="nav-item"><button class="nav-link ${{active}}" data-bs-toggle="tab" data-bs-target="#course-${{i}}">${{course.label}}</button></li>`;
    tabContent += `<div class="tab-pane ${{active}} p-3 border border-top-0" id="course-${{i}}">${{tableHtml(i)}}</div>`;
  }});
  tabNav += '</ul>';
  tabContent += '</div>';
  content.innerHTML = tabNav + tabContent;
  race.courses.forEach((course, i) => {{
    document.getElementById(`body-finish-${{i}}`).innerHTML = rows(course.finish, 'original_place');
    document.getElementById(`body-handicap-${{i}}`).innerHTML = rows(course.handicap, 'adjusted_place');
  }});
  // Init tooltips on newly injected badges
  document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {{
    bootstrap.Tooltip.getOrCreateInstance(el);
  }});
  const savedDist = getDistance();
  race.courses.forEach((course, i) => {{
    const btn = document.querySelector(`[data-bs-target="#course-${{i}}"]`);
    if (btn) {{
      if (savedDist && course.label === savedDist) bootstrap.Tab.getOrCreateInstance(btn).show();
      btn.addEventListener('shown.bs.tab', () => setDistance(course.label));
    }}
    const savedTab = getResultTab();
    document.querySelectorAll(`#result-tabs-${{i}} button`).forEach(tb => {{
      if (savedTab && tb.textContent === savedTab) bootstrap.Tab.getOrCreateInstance(tb).show();
      tb.addEventListener('shown.bs.tab', () => setResultTab(tb.textContent));
    }});
  }});
}}

function loadSeason(year) {{
  currentYear = year;
  const races = SEASONS[year];
  const sel = document.getElementById('race-select');
  sel.innerHTML = races.map((r,i) => `<option value="${{i}}">${{r.name}} — ${{r.date}}</option>`).join('');
  renderRace(races.length - 1);
}}

document.addEventListener('DOMContentLoaded', () => {{
  document.getElementById('btn-prev').addEventListener('click', () => renderRace(currentIndex - 1));
  document.getElementById('btn-next').addEventListener('click', () => renderRace(currentIndex + 1));
  document.getElementById('race-select').addEventListener('change', e => renderRace(parseInt(e.target.value)));
  document.getElementById('season-select').addEventListener('change', e => {{ setSeason(e.target.value); loadSeason(e.target.value); }});
  fetchData('races-data.json', d => {{
    SEASONS = d.seasons;
    const sel = document.getElementById('season-select');
    const yr = getSeason(d.current_year);
    if (SEASONS[yr]) {{ currentYear = yr; sel.value = yr; }}
    loadSeason(currentYear);
    const hash = location.hash.replace('#', '');
    if (hash) {{
      const races = SEASONS[currentYear];
      const idx = races.findIndex(r => String(r.race_id) === hash);
      if (idx >= 0) renderRace(idx);
    }}
  }});
}});
</script>""" + _foot()
    (SITE_DIR / "index.html").write_text(html)
    print("Generated: site/index.html")


def _build_traj_series(races: list, colors: list) -> tuple:
    """Build chart_pts, chart_hpts, chart_hnum dicts for a list of races."""
    racer_pts: dict[str, list] = {}
    racer_hpts: dict[str, list] = {}
    racer_hnum: dict[str, list] = {}
    race_labels = []

    for race in races:
        label = f'#{race["name"].rsplit("#",1)[-1].strip()}'
        race_labels.append(label)
        n = len(race_labels)
        for r in race["results"]:
            key = f'{r["canonical_name"]} ({r["craft_category"]})'
            for d in (racer_pts, racer_hpts, racer_hnum):
                if key not in d:
                    d[key] = [None] * (n - 1)
            racer_pts[key].append(r["season_points"])
            racer_hpts[key].append(r["season_handicap_points"])
            racer_hnum[key].append(round(r["handicap_post"], 4))
        for d in (racer_pts, racer_hpts, racer_hnum):
            for key in d:
                if len(d[key]) < n:
                    d[key].append(None)

    def make_datasets(series: dict, min_races: int = 3) -> list:
        active = {k: v for k, v in series.items()
                  if sum(1 for x in v if x is not None) >= min_races}
        ds = []
        for i, (name, pts) in enumerate(sorted(active.items())):
            color = colors[i % len(colors)]
            ds.append({"label": name, "data": pts, "borderColor": color,
                       "backgroundColor": color, "tension": 0.3,
                       "spanGaps": True, "pointRadius": 4, "borderWidth": 2})
        return ds

    return (
        {"labels": race_labels, "datasets": make_datasets(racer_pts)},
        {"labels": race_labels, "datasets": make_datasets(racer_hpts)},
        {"labels": race_labels, "datasets": make_datasets(racer_hnum, min_races=4)},
    )


def generate_trajectories(data: dict) -> None:
    club = data["clubs"][data["current_club"]]
    current_year = club["current_season"]

    # Shared chart options JS — sorted tooltip, skip nulls, highlight hovered line, inline end labels
    chart_options_js = """
const endLabelPlugin = {
  id: 'endLabel',
  _labelRects: [],
  _activeIndex: null,
  afterDatasetsDraw(chart) {
    const ctx = chart.ctx;
    const LINE_HEIGHT = 14;

    const items = [];
    chart.data.datasets.forEach((ds, i) => {
      const meta = chart.getDatasetMeta(i);
      if (meta.hidden) return;
      let last = null;
      for (let j = meta.data.length - 1; j >= 0; j--) {
        if (ds.data[j] !== null && ds.data[j] !== undefined) { last = meta.data[j]; break; }
      }
      if (!last) return;
      items.push({ label: ds.label, color: ds._origColor || ds.borderColor, idealY: last.y, x: last.x, index: i });
    });

    items.sort((a, b) => a.idealY - b.idealY);

    const placed = [];
    for (const item of items) {
      let y = item.idealY;
      for (const p of placed) {
        if (Math.abs(p - y) < LINE_HEIGHT) y = p + LINE_HEIGHT;
      }
      placed.push(y);
      item.placedY = y;
    }

    const labelX = chart.chartArea.right + 8;
    this._labelRects = [];

    ctx.save();
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    items.forEach(item => {
      ctx.fillStyle = item.color;
      ctx.beginPath();
      ctx.arc(item.x, item.idealY, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillText(item.label, labelX, item.placedY);
      const w = ctx.measureText(item.label).width;
      this._labelRects.push({ x: labelX, y: item.placedY - 7, w, h: 14, index: item.index });
    });
    ctx.restore();
  },
  afterEvent(chart, args) {
    const e = args.event;
    if (e.type !== 'mousemove') return;
    const hit = this._labelRects.find(r =>
      e.x >= r.x && e.x <= r.x + r.w && e.y >= r.y && e.y <= r.y + r.h
    );
    const newIndex = hit ? hit.index : null;
    if (newIndex === this._activeIndex) return;
    this._activeIndex = newIndex;
    if (newIndex !== null) {
      highlightDataset(chart, newIndex);
      chart.canvas.style.cursor = 'pointer';
    } else {
      resetHighlight(chart);
      chart.canvas.style.cursor = 'default';
    }
  }
};

function makeChart(id, data, yLabel) {
  const canvas = document.getElementById(id);
  const n = data.datasets.length;
  const h = Math.max(window.innerHeight - 220, n * 22 + 100);
  canvas.height = h;
  canvas.width = 1100;
  const plugin = Object.assign({}, endLabelPlugin, { _labelRects: [], _activeIndex: null });
  const chart = new Chart(canvas, {
    type: 'line',
    data: data,
    plugins: [plugin],
    options: {
      responsive: false,
      maintainAspectRatio: false,
      layout: { padding: { right: 160 } },
      interaction: { mode: 'nearest', intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => ctx.parsed.y !== null
              ? ctx.dataset.label + ': ' + ctx.parsed.y
              : null,
          },
          filter: item => item.parsed.y !== null,
          itemSort: (a, b) => b.parsed.y - a.parsed.y,
        }
      },
      onHover: (e, elements, chart) => {
        const newIndex = elements.length ? elements[0].datasetIndex : null;
        if (newIndex === chart._hoverIndex) return;
        chart._hoverIndex = newIndex;
        if (newIndex !== null) highlightDataset(chart, newIndex);
        else resetHighlight(chart);
      },
      scales: {
        y: { title: { display: true, text: yLabel } },
        x: { title: { display: true, text: 'Race' } }
      }
    }
  });
  document.getElementById(id).addEventListener('mouseleave', () => {
    chart._hoverIndex = null;
    plugin._activeIndex = null;
    resetHighlight(chart);
  });
  return chart;
}

function highlightDataset(chart, index) {
  chart.data.datasets.forEach((ds, i) => {
    if (!ds._origColor) ds._origColor = ds.borderColor;
    ds.borderWidth = i === index ? 3 : 1;
    ds.borderColor = i === index ? ds._origColor : ds._origColor + '44';
    ds.pointRadius = i === index ? 5 : 2;
  });
  chart.update('none');
}

function resetHighlight(chart) {
  chart.data.datasets.forEach(ds => {
    ds.borderWidth = 2;
    ds.borderColor = ds._origColor || ds.borderColor;
    ds.pointRadius = 4;
  });
  chart.update('none');
}
"""

    html = _head("Trajectories", _CHARTJS) + _nav("Trajectories") + f"""
<div class="container">
  <div class="d-flex align-items-center gap-3 mb-3">
    <h1 class="mb-0">Trajectories</h1>
    <select id="season-select" class="form-select form-select-sm w-auto d-inline-block mb-3">{_season_opts(data, current_year)}</select>
  </div>
  <div id="traj-content">
  <ul class="nav nav-tabs mb-3" id="traj-tabs">
    <li class="nav-item"><button class="nav-link active" data-bs-toggle="tab" data-bs-target="#tab-pts">Overall Points</button></li>
    <li class="nav-item"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-hpts">Handicap Points</button></li>
    <li class="nav-item"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-hnum">Handicap Number</button></li>
  </ul>
  <div class="tab-content">
    <div class="tab-pane active" id="tab-pts">
      <p class="text-muted small">Official season points over time. Click legend to toggle racers.</p>
      <div class="traj-scroll"><canvas id="chart-pts"></canvas></div>
    </div>
    <div class="tab-pane" id="tab-hpts">
      <p class="text-muted small">Handicap season points over time. First two races provisional (no points awarded).</p>
      <div class="traj-scroll"><canvas id="chart-hpts"></canvas></div>
    </div>
    <div class="tab-pane" id="tab-hnum">
      <p class="text-muted small">Handicap factor over time. Values below 1.0 = faster than par; above 1.0 = slower. Racers with 4+ races shown.</p>
      <div class="traj-scroll"><canvas id="chart-hnum"></canvas></div>
    </div>
  </div>
  </div>
</div>
<script>
{chart_options_js}
let ALL_SEASONS = null;
let charts = {{}};
function loadTrajSeason(year) {{
  const s = ALL_SEASONS[year];
  ['pts','hpts','hnum'].forEach(k => {{
    if (charts[k]) charts[k].destroy();
    charts[k] = makeChart('chart-' + k, s[k],
      k === 'pts' ? 'Season Points' : k === 'hpts' ? 'Handicap Points' : 'Handicap Factor');
  }});
}}
window.addEventListener('DOMContentLoaded', () => {{
  fetchData('trajectories-data.json', d => {{
    ALL_SEASONS = d.seasons;
    const sel = document.getElementById('season-select');
    const yr = getSeason(d.current_year);
    if (ALL_SEASONS[yr]) sel.value = yr;
    loadTrajSeason(sel.value);
    sel.addEventListener('change', e => {{ setSeason(e.target.value); loadTrajSeason(e.target.value); }});
  }});
}});
</script>""" + _foot()
    (SITE_DIR / "trajectories.html").write_text(html)
    print("Generated: site/trajectories.html")


def _fmt_time(seconds: float) -> str:
    s = int(seconds)
    m, s = divmod(s, 60)
    h, m = divmod(m, 60)
    return f"{h}:{m:02d}:{s:02d}" if h else f"{m}:{s:02d}"


def _racer_trophy_badges(trophies: list) -> str:
    """Render trophy badges for racer page race table (Python-side, not JS)."""
    map = {
        "finish_1": '<span class="hcap-medal plain-medal" title="Overall 1st">🥇</span>',
        "finish_2": '<span class="hcap-medal plain-medal" title="Overall 2nd">🥈</span>',
        "finish_3": '<span class="hcap-medal plain-medal" title="Overall 3rd">🥉</span>',
        "hcap_1":   '<span class="hcap-medal hcap-gold" title="Handicap winner">🥇</span>',
        "hcap_2":   '<span class="hcap-medal hcap-silver" title="Handicap 2nd">🥈</span>',
        "hcap_3":   '<span class="hcap-medal hcap-bronze" title="Handicap 3rd">🥉</span>',
        "consistent_1": '<span class="hcap-medal plain-medal" title="Consistent performer">🎯</span>',
        "consistent_2": '<span class="hcap-medal plain-medal" title="Consistent performer">🎯</span>',
        "consistent_3": '<span class="hcap-medal plain-medal" title="Consistent performer">🎯</span>',
        "par":      '<span class="hcap-medal plain-medal" title="Par racer">⛳</span>',
        "fresh":    '<span class="hcap-medal" style="opacity:0.5;filter:grayscale(1)" title="Provisional — first 2 results, not yet eligible for handicap awards">🆕</span>',
    }
    parts = []
    for t in trophies:
        if t.startswith('streak_'):
            n = t.split('_')[1]
            parts.append(f'<span class="hcap-medal plain-medal" title="Improving streak: {n} races">☄️<sup style="font-size:0.65em;font-weight:bold">{n}</sup></span>')
        elif t in map:
            parts.append(map[t])
    return "".join(parts)


def generate_racer_pages(data: dict) -> None:
    from collections import defaultdict

    # racer_data[name][(club_id, year, craft)] = [race results...]
    racer_data: dict[str, dict[tuple, list]] = defaultdict(lambda: defaultdict(list))

    for club_id, club in data["clubs"].items():
        for year, season in club["seasons"].items():
            for race in season["races"]:
                for r in race["results"]:
                    key = (club_id, year, r["craft_category"])
                    racer_data[r["canonical_name"]][key].append({
                        "race_id": race["race_id"],
                        "name": race["name"],
                        "date": race["date"],
                        "display_url": race["display_url"],
                        **r,
                    })

    # Order by best official season points in current club/season
    current_club = data["current_club"]
    current_year = data["clubs"][current_club]["current_season"]

    def best_pts(name):
        best = 0
        for (club, year, craft), results in racer_data[name].items():
            best = max(best, results[-1]["season_points"])
        return best

    ordered_by_rank = sorted(racer_data.keys(), key=lambda n: -best_pts(n))
    alpha_names = sorted(racer_data.keys())

    nav_js = """<script>
document.getElementById('racer-select').addEventListener('change', function() {
  window.location.href = this.value + '.html';
});
</script>"""

    for rank_idx, name in enumerate(ordered_by_rank):
        slug = _slug(name)
        keys = racer_data[name]

        prev_name = ordered_by_rank[rank_idx - 1] if rank_idx > 0 else None
        next_name = ordered_by_rank[rank_idx + 1] if rank_idx < len(ordered_by_rank) - 1 else None
        prev_btn = f'<a href="{_slug(prev_name)}.html" class="btn btn-outline-secondary btn-sm" style="width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">&larr; {prev_name}</a>' if prev_name else '<span style="width:160px;display:inline-block"></span>'
        next_btn = f'<a href="{_slug(next_name)}.html" class="btn btn-outline-secondary btn-sm" style="width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">{next_name} &rarr;</a>' if next_name else '<span style="width:160px;display:inline-block"></span>'

        racer_nav = f"""<div class="d-flex align-items-center gap-2 mb-3 flex-wrap">
  {prev_btn}
  <select id="racer-select" class="form-select form-select-sm" style="width:200px">
    {"".join(f'<option value="{_slug(n)}"{" selected" if n == name else ""}>{n}</option>' for n in alpha_names)}
  </select>
  {next_btn}
</div>"""

        # Group by club → year → craft
        by_club: dict[str, dict[str, dict[str, list]]] = {}
        for (club_id, year, craft), results in sorted(keys.items()):
            by_club.setdefault(club_id, {}).setdefault(year, {})[craft] = results

        all_charts_js = ""
        body_html = ""

        for club_id, years in sorted(by_club.items()):
            club_name = data["clubs"][club_id]["name"]
            body_html += f'<h4 class="mt-4">{club_name}</h4>'

            # Season tabs
            season_keys = sorted(years.keys())  # ascending: 2024, 2025
            current_season_key = data["clubs"][club_id]["current_season"]
            multi_season = True  # always show season tabs
            body_html += f'<ul class="nav nav-tabs mb-2">'
            for si, yr in enumerate(season_keys):
                    active = "active" if yr == current_season_key else ""
                    body_html += f'<li class="nav-item"><button class="nav-link {active}" data-bs-toggle="tab" data-bs-target="#s-{club_id}-{yr}">{yr}</button></li>'
            body_html += '</ul><div class="tab-content">'

            for si, year in enumerate(season_keys):
                crafts = years[year]
                active = "active" if year == current_season_key else ""
                wrap_open = f'<div class="tab-pane {active}" id="s-{club_id}-{year}">'
                wrap_close = "</div>"

                craft_keys = sorted(crafts.keys())
                craft_tabs = '<ul class="nav nav-tabs mb-2">'
                for ci, craft in enumerate(craft_keys):
                    active_c = "active" if ci == 0 else ""
                    craft_tabs += f'<li class="nav-item"><button class="nav-link {active_c}" data-bs-toggle="tab" data-bs-target="#c-{club_id}-{year}-{_slug(craft)}">{craft}</button></li>'
                craft_tabs += '</ul><div class="tab-content">'
                craft_content = ""

                for ci, craft in enumerate(craft_keys):
                    results = crafts[craft]
                    active_c = "active" if ci == 0 else ""
                    cw_open = f'<div class="tab-pane {active_c}" id="c-{club_id}-{year}-{_slug(craft)}">'
                    cw_close = "</div>"

                    last = results[-1]
                    cid = f"{club_id}-{year}-{_slug(craft)}"
                    race_labels = [f'#{r["name"].rsplit("#",1)[-1].strip()}' for r in results]
                    pts_data = [r["season_points"] for r in results]
                    hpts_data = [r["season_handicap_points"] for r in results]
                    hcap_data = [round(r["handicap_post"], 4) for r in results]

                    all_charts_js += f"""
new Chart(document.getElementById('chart-pts-{cid}'), {{
  type:'line',data:{{labels:{json.dumps(race_labels)},datasets:[
    {{label:'Official Pts',data:{json.dumps(pts_data)},borderColor:'#4363d8',backgroundColor:'#4363d8',tension:0.3,pointRadius:4}},
    {{label:'Handicap Pts',data:{json.dumps(hpts_data)},borderColor:'#e6194b',backgroundColor:'#e6194b',tension:0.3,pointRadius:4}}
  ]}},options:{{responsive:true,plugins:{{legend:{{position:'top'}}}},scales:{{y:{{title:{{display:true,text:'Points'}}}}}}}}
}});
new Chart(document.getElementById('chart-hcap-{cid}'), {{
  type:'line',data:{{labels:{json.dumps(race_labels)},datasets:[
    {{label:'Handicap',data:{json.dumps(hcap_data)},borderColor:'#3cb44b',backgroundColor:'#3cb44b',tension:0.3,pointRadius:4}}
  ]}},options:{{responsive:true,plugins:{{legend:{{position:'top'}}}},scales:{{y:{{title:{{display:true,text:'Handicap Factor'}}}}}}}}
}});"""

                    rows = "".join(
                        f'<tr><td><a href="../races.html#{r["race_id"]}">{r["date"]}</a></td>'
                        f'<td>{r["original_place"]}</td><td>{r["adjusted_place"]}</td>'
                        f'<td>{_fmt_time(r["time_seconds"])}</td><td>{_fmt_time(r["adjusted_time_seconds"])}</td>'
                        f'<td>{r["handicap"]:.3f}</td><td>{r["handicap_post"]:.3f}</td>'
                        f'<td>{r["race_points"]}</td><td>{r["handicap_points"]}</td></tr>'
                        for r in results
                    )

                    craft_content += f"""{cw_open}
<div class="row mb-3">
  <div class="col-6 col-sm-3"><strong>Races:</strong> {len(results)}</div>
  <div class="col-6 col-sm-3"><strong>Overall Pts:</strong> {last["season_points"]}</div>
  <div class="col-6 col-sm-3"><strong>Handicap Pts:</strong> {last["season_handicap_points"]}</div>
  <div class="col-6 col-sm-3"><strong>Hcap:</strong> {last["handicap_post"]:.3f}</div>
</div>
<div class="row mb-3">
  <div class="col-md-6"><canvas id="chart-pts-{cid}" style="max-height:220px"></canvas></div>
  <div class="col-md-6"><canvas id="chart-hcap-{cid}" style="max-height:220px"></canvas></div>
</div>
<table class="table table-sm table-striped table-hover">
  <thead><tr><th></th><th>Race</th><th>Place</th><th>Adj</th><th>Time</th><th>Adj Time</th><th>Hcap</th><th>New</th><th>Pts</th><th>HPts</th></tr></thead>
  <tbody>{"".join(
      f'<tr><td style="white-space:nowrap">{_racer_trophy_badges(r.get("trophies",[]))}</td>'
      f'<td><a href="../index.html#{r["race_id"]}">{r["date"]}</a></td>'
      f'<td>{r["original_place"]}</td><td>{r["adjusted_place"]}</td>'
      f'<td>{_fmt_time(r["time_seconds"])}</td><td>{_fmt_time(r["adjusted_time_seconds"])}</td>'
      f'<td>{r["handicap"]:.3f}</td><td>{r["handicap_post"]:.3f}</td>'
      f'<td>{r["race_points"]}</td><td>{r["handicap_points"]}</td></tr>'
      for r in results
  )}</tbody>
</table>{cw_close}"""

                craft_content += "</div>"  # close tab-content div

                body_html += f"{wrap_open}{craft_tabs}{craft_content}{wrap_close}"

            body_html += "</div>"  # close tab-content

        # Build list of available (club, year) tab IDs for JS
        available_tabs = json.dumps([
            f"s-{club_id}-{year}"
            for club_id in by_club
            for year in sorted(by_club[club_id].keys())
        ])

        season_tab_js = f"""<script>
window.addEventListener('load', () => {{
  const target = getSeason('{current_year}');
  const tabs = {available_tabs};
  const exact = tabs.find(t => t.endsWith('-' + target));
  const best = exact || tabs.slice().sort((a,b) => {{
    const ya = parseInt(a.split('-').pop()), yb = parseInt(b.split('-').pop()), yt = parseInt(target);
    return Math.abs(ya-yt) - Math.abs(yb-yt);
  }})[0];
  if (best) {{
    const btn = document.querySelector(`[data-bs-target="#${{best}}"]`);
    if (btn) bootstrap.Tab.getOrCreateInstance(btn).show();
  }}
  // Save year to localStorage whenever a season tab is clicked
  document.querySelectorAll('[data-bs-target^="#s-"]').forEach(btn => {{
    btn.addEventListener('shown.bs.tab', () => {{
      const year = btn.getAttribute('data-bs-target').split('-').pop();
      setSeason(year);
    }});
  }});
}});
</script>"""

        html = _head(name, _CHARTJS) + _nav("Racers", prefix="../") + f"""
<div class="container">
  {racer_nav}
  <h2>{name}</h2>
  {body_html}
</div>
<script>{all_charts_js}</script>
{nav_js}
{season_tab_js}""" + _foot()

        (SITE_DIR / "racer" / f"{slug}.html").write_text(html)

    print(f"Generated: site/racer/ ({len(racer_data)} pages)")


def generate_about() -> None:
    html = _head("About — BEPC Handicap System") + _nav("About") + """
<div class="container" style="max-width:720px">
  <h1>About the Handicap System</h1>
  <p class="lead">BEPC uses a dynamic handicap system so all racers can compete and be scored on their relative performance.</p>

  <h2>How it works</h2>

  <h5>Par racer</h5>
  <p>Each race has a <em>par racer</em> — the finisher at roughly the 33rd percentile by finish time.
  The par racer's adjusted time defines the benchmark for that race.</p>

  <h5>Adjusted time</h5>
  <p>Your adjusted time = your finish time ÷ your handicap.
  A handicap of 1.0 means no adjustment. A handicap below 1.0 means you're a faster racer —
  for example, a handicap of 0.85 means you typically finish at 85% of the par time.
  Above 1.0 means slower than par.</p>

  <h5>Updating your handicap</h5>
  <p>After each race your handicap is updated based on how your adjusted time compared to par:</p>
  <table class="table table-bordered table-sm">
    <thead><tr><th>Situation</th><th>Update rule</th></tr></thead>
    <tbody>
      <tr><td>Race 1</td><td>Handicap set to your time-vs-par (no prior history)</td></tr>
      <tr><td>Race 2</td><td>50% blend of old handicap and new result</td></tr>
      <tr><td>Faster than expected (&le;100% of par)</td><td>30% shift toward new result</td></tr>
      <tr><td>Slower than expected (&gt;100% of par)</td><td>15% shift toward new result</td></tr>
      <tr><td>Outlier (&gt;10% outside prediction)</td><td>No change — result ignored</td></tr>
    </tbody>
  </table>
  <p>The asymmetry (30% vs 15%) means the handicap responds faster to improvement than to a bad day.</p>

  <h5>Points</h5>
  <p><strong>Official points</strong> are awarded for finishing position (10 pts for 1st, 9 for 2nd … 1 pt for 10th).</p>
  <p><strong>Handicap points</strong> use the same scale but based on <em>adjusted</em> finishing position.
  Handicap points are not awarded in your first two results (while your handicap is being established).</p>
  <p>When a race day has multiple distance groups (e.g. Long Course and Short Course), points are weighted
  proportionally by group size. For example, if the Long Course has 26 racers and Short Course has 13,
  the Long Course winner earns <code>round(10 × 26/39)</code> = 7 pts and the Short Course winner earns
  <code>round(10 × 13/39)</code> = 3 pts. This keeps the total points available per race day roughly constant.</p>

  <h2>References</h2>
  <p>The BEPC handicap system uses the same multiplicative time-correction approach as established sailing clubs.
  Raw race times are recorded via <a href="https://www.webscorer.com" target="_blank">WebScorer</a>;
  the handicap calculation is applied separately by this system.</p>
  <ul>
    <li><a href="https://topyacht.com.au/web/" target="_blank">TopYacht</a> — the leading sailing results and handicapping software, whose Back Calculated Handicap (BCH) methodology directly inspired BEPC's approach.</li>
    <li><a href="https://rycv.com.au/sailing/rules-handicaps/" target="_blank">Royal Yacht Club of Victoria</a> — a well-documented example of the AHC/BCH/CHC system in practice.</li>
  </ul>
</div>""" + _foot()
    (SITE_DIR / "about.html").write_text(html)
    print("Generated: site/about.html")


def generate_racer_index(data: dict) -> None:
    from collections import defaultdict
    # Collect all racers across all clubs and seasons
    racer_data: dict[str, dict] = defaultdict(dict)
    for club_id, club in data["clubs"].items():
        for year, season in club["seasons"].items():
            for race in season["races"]:
                for r in race["results"]:
                    key = r["canonical_name"]
                    # Keep entry with most races
                    if not racer_data[key] or r["num_races"] > racer_data[key].get("num_races", 0):
                        racer_data[key] = r

    rows = ""
    for name in sorted(racer_data.keys()):
        r = racer_data[name]
        rows += f'<tr><td><a href="{_slug(name)}.html">{name}</a></td><td>{r["craft_category"]}</td></tr>\n'

    html = _head("Racers") + _nav("Racers", prefix="../") + f"""
<div class="container">
  <h1>Racers</h1>
  <table id="racer-index" class="table table-striped table-hover">
    <thead><tr><th>Name</th><th>Craft</th></tr></thead>
    <tbody>{rows}</tbody>
  </table>
</div>""" + _foot(_datatable_init("racer-index", 0, "asc"))
    (SITE_DIR / "racer" / "index.html").write_text(html)
    print("Generated: site/racer/index.html")


def generate_all(data: dict) -> None:
    SITE_DIR.mkdir(exist_ok=True)
    (SITE_DIR / "racer").mkdir(exist_ok=True)
    generate_data_files(data)
    generate_standings(data)
    generate_races(data)
    generate_trajectories(data)
    generate_about()
    generate_racer_pages(data)
    generate_racer_index(data)
