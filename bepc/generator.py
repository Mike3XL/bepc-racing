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
<style>
  body {{ padding-top: 1rem; }}
  .navbar-brand {{ font-weight: bold; }}
</style>
</head>
<body>"""


def _nav(active: str = "") -> str:
    pages = [
        ("index.html", "Home"),
        ("standings.html", "Official Standings"),
        ("handicap.html", "Handicap Standings"),
        ("races.html", "Races"),
        ("trajectories.html", "Trajectories"),
        ("about.html", "About"),
    ]
    items = ""
    for href, label in pages:
        cls = "nav-link active" if label == active else "nav-link"
        items += f'<li class="nav-item"><a class="{cls}" href="{href}">{label}</a></li>\n'
    return f"""<nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
  <div class="container">
    <a class="navbar-brand" href="index.html">🏄 BEPC Racing</a>
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
{_JQUERY}
{_BOOTSTRAP_JS}
{_DATATABLES_JS}
{_DATATABLES_BS5_JS}
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
    return name.lower().replace(" ", "-")


# ── Final racer state ────────────────────────────────────────────────────────

def _final_states(data: dict) -> dict:
    """Return {(name, craft): racer_dict} from last appearance."""
    racers = {}
    for race in data["races"]:
        for r in race["results"]:
            racers[(r["canonical_name"], r["craft_category"])] = r
    return racers


# ── Pages ────────────────────────────────────────────────────────────────────

def generate_index(data: dict) -> None:
    races = data["races"]
    season = races[0]["name"].rsplit("#", 1)[0].strip() if races else "BEPC Race Series"
    rows = ""
    for i, race in enumerate(races, 1):
        rows += f'<tr><td>{i}</td><td><a href="races.html#{race["race_id"]}">{race["name"]}</a></td><td>{race["date"]}</td><td>{len(race["results"])}</td></tr>\n'

    html = _head(season) + _nav("Home") + f"""
<div class="container">
  <h1>{season}</h1>
  <p class="lead">{len(races)} races completed</p>
  <div class="row mb-4">
    <div class="col-md-4"><a href="standings.html" class="btn btn-primary w-100">Official Standings</a></div>
    <div class="col-md-4"><a href="handicap.html" class="btn btn-secondary w-100">Handicap Standings</a></div>
    <div class="col-md-4"><a href="trajectories.html" class="btn btn-success w-100">Trajectories</a></div>
  </div>
  <h2>Races</h2>
  <table id="races-table" class="table table-striped table-hover">
    <thead><tr><th>#</th><th>Race</th><th>Date</th><th>Starters</th></tr></thead>
    <tbody>{rows}</tbody>
  </table>
</div>""" + _foot(_datatable_init("races-table", 0, "asc"))
    (SITE_DIR / "index.html").write_text(html)
    print("Generated: site/index.html")


def generate_standings(data: dict) -> None:
    racers = sorted(_final_states(data).values(), key=lambda r: -r["season_points"])
    rows = ""
    for i, r in enumerate(racers, 1):
        rows += f'<tr><td>{i}</td><td>{_racer_link(r["canonical_name"])}</td><td>{r["craft_category"]}</td><td>{r["gender"]}</td><td>{r["num_races"]}</td><td>{r["season_points"]}</td></tr>\n'

    html = _head("Official Standings") + _nav("Official Standings") + f"""
<div class="container">
  <h1>Official Standings</h1>
  <p class="text-muted">Points awarded for top-10 finish (10 pts for 1st … 1 pt for 10th). No handicap applied.</p>
  <table id="standings-table" class="table table-striped table-hover">
    <thead><tr><th>#</th><th>Racer</th><th>Craft</th><th>Gender</th><th>Races</th><th>Points</th></tr></thead>
    <tbody>{rows}</tbody>
  </table>
</div>""" + _foot(_datatable_init("standings-table", 5, "desc"))
    (SITE_DIR / "standings.html").write_text(html)
    print("Generated: site/standings.html")


def generate_handicap(data: dict) -> None:
    racers = sorted(_final_states(data).values(), key=lambda r: -r["season_handicap_points"])
    rows = ""
    for i, r in enumerate(racers, 1):
        hseq = ", ".join(f'{h:.2f}' for h in r["handicap_sequence"])
        rows += f'<tr><td>{i}</td><td>{_racer_link(r["canonical_name"])}</td><td>{r["craft_category"]}</td><td>{r["num_races"]}</td><td>{r["season_handicap_points"]}</td><td>{r["handicap_post"]:.3f}</td><td style="white-space:nowrap">{hseq}</td></tr>\n'

    html = _head("Handicap Standings") + _nav("Handicap Standings") + f"""
<div class="container">
  <h1>Handicap Standings</h1>
  <p class="text-muted">Points awarded for top-10 adjusted finish. First two races are provisional (no handicap points awarded).</p>
  <table id="handicap-table" class="table table-striped table-hover">
    <thead><tr><th>#</th><th style="min-width:180px">Racer</th><th>Craft</th><th>Races</th><th>Handicap Points</th><th>Current Handicap</th><th style="white-space:nowrap">Handicap History</th></tr></thead>
    <tbody>{rows}</tbody>
  </table>
</div>""" + _foot(_datatable_init("handicap-table", 4, "desc"))
    (SITE_DIR / "handicap.html").write_text(html)
    print("Generated: site/handicap.html")


def generate_races(data: dict) -> None:
    # Group races by season year (inferred from date)
    from collections import defaultdict
    import re

    def year_from_date(date_str: str) -> int:
        m = re.search(r'\b(20\d\d)\b', date_str)
        return int(m.group(1)) if m else 0

    seasons: dict[int, list] = defaultdict(list)
    for race in data["races"]:
        seasons[year_from_date(race["date"])].append(race)

    sorted_years = sorted(seasons.keys())
    current_year = sorted_years[-1]

    # Season selector JS data: { year: [race, ...] }
    seasons_js = json.dumps({
        str(y): [
            {
                "race_id": r["race_id"],
                "name": r["name"],
                "date": r["date"],
                "display_url": r["display_url"],
                "finish": sorted(r["results"], key=lambda x: x["original_place"]),
                "handicap": sorted(r["results"], key=lambda x: x["adjusted_place"]),
            }
            for r in seasons[y]
        ]
        for y in sorted_years
    })

    year_options = "".join(
        f'<option value="{y}"{" selected" if y == current_year else ""}>{y} Season</option>'
        for y in reversed(sorted_years)
    )

    html = _head("Races") + _nav("Races") + f"""
<div class="container">
  <h1>Race Results</h1>

  <div class="mb-3">
    <select id="season-select" class="form-select w-auto d-inline-block">
      {year_options}
    </select>
  </div>

  <div class="d-flex align-items-center gap-2 mb-3">
    <button id="btn-prev" class="btn btn-outline-secondary">&larr; Prev</button>
    <button id="btn-next" class="btn btn-outline-secondary">Next &rarr;</button>
    <div class="ms-3">
      <h5 id="race-name" class="mb-0"></h5>
      <small id="race-meta" class="text-muted"></small>
    </div>
  </div>

  <ul class="nav nav-tabs" id="result-tabs">
    <li class="nav-item"><button class="nav-link active" data-bs-toggle="tab" data-bs-target="#tab-finish">Finish Order</button></li>
    <li class="nav-item"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-handicap">Handicap Order</button></li>
  </ul>
  <div class="tab-content border border-top-0 p-3">
    <div class="tab-pane active" id="tab-finish">
      <table class="table table-sm table-striped" id="tbl-finish" style="table-layout:fixed">
        <colgroup><col style="width:60px"><col style="width:200px"><col style="width:90px"><col style="width:70px"><col style="width:80px"><col style="width:80px"><col style="width:100px"></colgroup>
        <thead><tr>
          <th>Place</th><th>Racer</th><th>Craft</th><th>Time</th>
          <th><span class="d-sm-none">Hcap</span><span class="d-none d-sm-inline">Handicap</span></th>
          <th><span class="d-sm-none">Adj</span><span class="d-none d-sm-inline">Adj Time</span></th>
          <th><span class="d-sm-none">New</span><span class="d-none d-sm-inline">New Handicap</span></th>
        </tr></thead>
        <tbody></tbody>
      </table>
    </div>
    <div class="tab-pane" id="tab-handicap">
      <table class="table table-sm table-striped" id="tbl-handicap" style="table-layout:fixed">
        <colgroup><col style="width:60px"><col style="width:200px"><col style="width:90px"><col style="width:70px"><col style="width:80px"><col style="width:80px"><col style="width:100px"></colgroup>
        <thead><tr>
          <th>Place</th><th>Racer</th><th>Craft</th><th>Time</th>
          <th><span class="d-sm-none">Hcap</span><span class="d-none d-sm-inline">Handicap</span></th>
          <th><span class="d-sm-none">Adj</span><span class="d-none d-sm-inline">Adj Time</span></th>
          <th><span class="d-sm-none">New</span><span class="d-none d-sm-inline">New Handicap</span></th>
        </tr></thead>
        <tbody></tbody>
      </table>
    </div>
  </div>
</div>

<script>
const SEASONS = {seasons_js};
let currentYear = '{current_year}';
let currentIndex = 0;

function slug(name) {{ return name.toLowerCase().replace(/ /g, '-'); }}
function fmtTime(s) {{
  s = Math.floor(s);
  const m = Math.floor(s / 60), sec = s % 60, h = Math.floor(m / 60);
  return h ? h+':'+String(m%60).padStart(2,'0')+':'+String(sec).padStart(2,'0')
           : m+':'+String(sec).padStart(2,'0');
}}

function renderRace(index) {{
  const races = SEASONS[currentYear];
  currentIndex = index;
  const race = races[index];

  document.getElementById('race-name').textContent = race.name;
  document.getElementById('race-meta').innerHTML = race.date + ' · ' + race.finish.length + ' starters · <a href="' + race.display_url + '" target="_blank">WebScorer ↗</a>';

  document.getElementById('btn-prev').disabled = index === 0;
  document.getElementById('btn-next').disabled = index === races.length - 1;

  function rows(results, placeField, timeField, extra) {{
    return results.map(r => {{
      return `<tr>
        <td>${{r[placeField]}}</td>
        <td><a href="racer/${{slug(r.canonical_name)}}.html">${{r.canonical_name}}</a></td>
        <td>${{r.craft_category}}</td>
        <td>${{fmtTime(r.time_seconds)}}</td>
        <td>${{r.handicap.toFixed(3)}}</td>
        <td>${{fmtTime(r.adjusted_time_seconds)}}</td>
        <td>${{r.handicap_post.toFixed(3)}}</td>
      </tr>`;
    }}).join('');
  }}

  document.querySelector('#tbl-finish tbody').innerHTML = rows(race.finish, 'original_place', 'time_seconds', false);
  document.querySelector('#tbl-handicap tbody').innerHTML = rows(race.handicap, 'adjusted_place', 'time_seconds', true);
}}

function loadSeason(year) {{
  currentYear = year;
  renderRace(SEASONS[year].length - 1);  // default to most recent
}}

document.getElementById('btn-prev').addEventListener('click', () => renderRace(currentIndex - 1));
document.getElementById('btn-next').addEventListener('click', () => renderRace(currentIndex + 1));
document.getElementById('season-select').addEventListener('change', e => loadSeason(e.target.value));

loadSeason(currentYear);

// If linked to a specific race via #race_id, navigate to it
const hash = location.hash.replace('#', '');
if (hash) {{
  const races = SEASONS[currentYear];
  const idx = races.findIndex(r => String(r.race_id) === hash);
  if (idx >= 0) renderRace(idx);
}}
</script>""" + _foot()
    (SITE_DIR / "races.html").write_text(html)
    print("Generated: site/races.html")


def generate_trajectories(data: dict) -> None:
    # Build per-racer series for all three charts
    racer_pts: dict[str, list] = {}      # official points
    racer_hpts: dict[str, list] = {}     # handicap points
    racer_hnum: dict[str, list] = {}     # handicap number
    race_labels = []

    for race in data["races"]:
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

    colors = ["#e6194b","#3cb44b","#4363d8","#f58231","#911eb4","#42d4f4","#f032e6",
              "#bfef45","#c8a000","#469990","#dcbeff","#9A6324","#800000","#aaffc3",
              "#808000","#ffd8b1","#000075","#a9a9a9"]

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

    chart_pts = json.dumps({"labels": race_labels, "datasets": make_datasets(racer_pts)})
    chart_hpts = json.dumps({"labels": race_labels, "datasets": make_datasets(racer_hpts)})
    chart_hnum = json.dumps({"labels": race_labels, "datasets": make_datasets(racer_hnum, min_races=4)})

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
  const plugin = Object.assign({}, endLabelPlugin, { _labelRects: [], _activeIndex: null });
  const chart = new Chart(document.getElementById(id), {
    type: 'line',
    data: data,
    plugins: [plugin],
    options: {
      responsive: true,
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
  <h1>Season Trajectories</h1>
  <ul class="nav nav-tabs mb-3" id="traj-tabs">
    <li class="nav-item"><button class="nav-link active" data-bs-toggle="tab" data-bs-target="#tab-pts">Official Points</button></li>
    <li class="nav-item"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-hpts">Handicap Points</button></li>
    <li class="nav-item"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-hnum">Handicap Number</button></li>
  </ul>
  <div class="tab-content">
    <div class="tab-pane active" id="tab-pts">
      <p class="text-muted small">Official season points over time. Click legend to toggle racers.</p>
      <canvas id="chart-pts" style="max-height:700px"></canvas>
    </div>
    <div class="tab-pane" id="tab-hpts">
      <p class="text-muted small">Handicap season points over time. First two races provisional (no points awarded).</p>
      <canvas id="chart-hpts" style="max-height:700px"></canvas>
    </div>
    <div class="tab-pane" id="tab-hnum">
      <p class="text-muted small">Handicap factor over time. Values below 1.0 = faster than par; above 1.0 = slower. Racers with 4+ races shown.</p>
      <canvas id="chart-hnum" style="max-height:700px"></canvas>
    </div>
  </div>
</div>
<script>
{chart_options_js}
makeChart('chart-pts',  {chart_pts},  'Season Points');
makeChart('chart-hpts', {chart_hpts}, 'Handicap Points');
makeChart('chart-hnum', {chart_hnum}, 'Handicap Factor');
</script>""" + _foot()
    (SITE_DIR / "trajectories.html").write_text(html)
    print("Generated: site/trajectories.html")


def _fmt_time(seconds: float) -> str:
    s = int(seconds)
    m, s = divmod(s, 60)
    h, m = divmod(m, 60)
    return f"{h}:{m:02d}:{s:02d}" if h else f"{m}:{s:02d}"


def generate_racer_pages(data: dict) -> None:
    from collections import defaultdict
    racer_data: dict[str, dict[str, list]] = defaultdict(lambda: defaultdict(list))

    for race in data["races"]:
        for r in race["results"]:
            racer_data[r["canonical_name"]][r["craft_category"]].append({
                "race_id": race["race_id"],
                "name": race["name"],
                "date": race["date"],
                "display_url": race["display_url"],
                **r,
            })

    # Order by best official season points across crafts
    def best_pts(name):
        return max(
            crafts[c][-1]["season_points"]
            for c in crafts
        ) if (crafts := racer_data[name]) else 0

    ordered_by_rank = sorted(racer_data.keys(), key=lambda n: -best_pts(n))
    alpha_names = sorted(racer_data.keys())

    # Dropdown options (alphabetical)
    dropdown_opts = "".join(
        f'<option value="{_slug(n)}">{n}</option>' for n in alpha_names
    )
    nav_js = f"""
<script>
document.getElementById('racer-select').addEventListener('change', function() {{
  window.location.href = this.value + '.html';
}});
</script>"""

    for rank_idx, name in enumerate(ordered_by_rank):
        slug = _slug(name)
        crafts = racer_data[name]
        craft_list = sorted(crafts.keys())
        multi = len(craft_list) > 1

        # Prev/next by rank
        prev_name = ordered_by_rank[rank_idx - 1] if rank_idx > 0 else None
        next_name = ordered_by_rank[rank_idx + 1] if rank_idx < len(ordered_by_rank) - 1 else None

        prev_btn = f'<a href="{_slug(prev_name)}.html" class="btn btn-outline-secondary btn-sm" style="width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">&larr; {prev_name}</a>' if prev_name else '<span style="width:160px;display:inline-block"></span>'
        next_btn = f'<a href="{_slug(next_name)}.html" class="btn btn-outline-secondary btn-sm" style="width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">{next_name} &rarr;</a>' if next_name else '<span style="width:160px;display:inline-block"></span>'

        racer_nav = f"""
<div class="d-flex align-items-center gap-2 mb-3 flex-wrap">
  {prev_btn}
  <select id="racer-select" class="form-select form-select-sm" style="width:200px">
    {"".join(f'<option value="{_slug(n)}"{" selected" if n == name else ""}>{n}</option>' for n in alpha_names)}
  </select>
  {next_btn}
</div>"""

        # Tabs
        tab_nav = ""
        tab_content = ""
        if multi:
            tab_nav = '<ul class="nav nav-tabs mb-3">'
            for i, craft in enumerate(craft_list):
                active = "active" if i == 0 else ""
                tab_nav += f'<li class="nav-item"><button class="nav-link {active}" data-bs-toggle="tab" data-bs-target="#craft-{_slug(craft)}">{craft}</button></li>'
            tab_nav += '</ul><div class="tab-content">'

        all_charts_js = ""
        for i, craft in enumerate(craft_list):
            results = crafts[craft]
            active = "active" if i == 0 else ""
            wrap_open = f'<div class="tab-pane {active}" id="craft-{_slug(craft)}">' if multi else ""
            wrap_close = "</div>" if multi else ""

            last = results[-1]
            num_races = len(results)
            season_pts = last["season_points"]
            season_hpts = last["season_handicap_points"]
            cur_hcap = last["handicap_post"]

            race_labels = [f'#{r["name"].rsplit("#",1)[-1].strip()}' for r in results]
            pts_data = [r["season_points"] for r in results]
            hpts_data = [r["season_handicap_points"] for r in results]
            hcap_data = [round(r["handicap_post"], 4) for r in results]

            cid = _slug(craft)
            all_charts_js += f"""
new Chart(document.getElementById('chart-pts-{cid}'), {{
  type: 'line',
  data: {{labels:{json.dumps(race_labels)},datasets:[
    {{label:'Official Pts',data:{json.dumps(pts_data)},borderColor:'#4363d8',backgroundColor:'#4363d8',tension:0.3,pointRadius:4}},
    {{label:'Handicap Pts',data:{json.dumps(hpts_data)},borderColor:'#e6194b',backgroundColor:'#e6194b',tension:0.3,pointRadius:4}}
  ]}},
  options:{{responsive:true,plugins:{{legend:{{position:'top'}}}},scales:{{y:{{title:{{display:true,text:'Points'}}}}}}}}
}});
new Chart(document.getElementById('chart-hcap-{cid}'), {{
  type: 'line',
  data: {{labels:{json.dumps(race_labels)},datasets:[
    {{label:'Handicap',data:{json.dumps(hcap_data)},borderColor:'#3cb44b',backgroundColor:'#3cb44b',tension:0.3,pointRadius:4}}
  ]}},
  options:{{responsive:true,plugins:{{legend:{{position:'top'}}}},scales:{{y:{{title:{{display:true,text:'Handicap Factor'}}}}}}}}
}});"""

            rows = ""
            for r in results:
                race_link = f'<a href="../races.html#{r["race_id"]}">{r["date"]}</a>'
                rows += f'<tr><td>{race_link}</td><td>{r["original_place"]}</td><td>{r["adjusted_place"]}</td><td>{_fmt_time(r["time_seconds"])}</td><td>{_fmt_time(r["adjusted_time_seconds"])}</td><td>{r["handicap"]:.3f}</td><td>{r["handicap_post"]:.3f}</td><td>{r["race_points"]}</td><td>{r["handicap_points"]}</td></tr>\n'

            tab_content += f"""{wrap_open}
<div class="row mb-3">
  <div class="col-6 col-sm-3"><strong>Races:</strong> {num_races}</div>
  <div class="col-6 col-sm-3"><strong>Official Pts:</strong> {season_pts}</div>
  <div class="col-6 col-sm-3"><strong>Handicap Pts:</strong> {season_hpts}</div>
  <div class="col-6 col-sm-3"><strong>Current Hcap:</strong> {cur_hcap:.3f}</div>
</div>
<div class="row mb-4">
  <div class="col-md-6"><canvas id="chart-pts-{cid}" style="max-height:250px"></canvas></div>
  <div class="col-md-6"><canvas id="chart-hcap-{cid}" style="max-height:250px"></canvas></div>
</div>
<table class="table table-sm table-striped table-hover">
  <thead><tr><th>Race</th><th>Place</th><th>Adj</th><th>Time</th><th>Adj Time</th><th>Hcap</th><th>New</th><th>Pts</th><th>HPts</th></tr></thead>
  <tbody>{rows}</tbody>
</table>
{wrap_close}"""

        if multi:
            tab_content += "</div>"

        html = _head(name, _CHARTJS) + _nav() + f"""
<div class="container">
  {racer_nav}
  <h2>{name}</h2>
  {tab_nav}
  {tab_content}
</div>
<script>{all_charts_js}</script>
{nav_js}""" + _foot()

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
  Handicap points are not awarded in your first two races (while your handicap is being established).</p>

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


def generate_all(data: dict) -> None:
    SITE_DIR.mkdir(exist_ok=True)
    (SITE_DIR / "racer").mkdir(exist_ok=True)
    generate_index(data)
    generate_standings(data)
    generate_handicap(data)
    generate_races(data)
    generate_trajectories(data)
    generate_about()
    generate_racer_pages(data)
