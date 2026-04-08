"""Generate static HTML pages from site/data.json."""
import json
import re as _re_module
from pathlib import Path
from bepc.craft import display_craft_ui

SITE_DIR = Path(__file__).parent.parent / "site"

# CDN links
_BOOTSTRAP_CSS = '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">'
_DATATABLES_CSS = '<link rel="stylesheet" href="https://cdn.datatables.net/2.0.8/css/dataTables.bootstrap5.min.css">'
_BOOTSTRAP_JS = '<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>'
_JQUERY = '<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>'
_DATATABLES_JS = '<script src="https://cdn.datatables.net/2.0.8/js/dataTables.min.js"></script>'
_DATATABLES_BS5_JS = '<script src="https://cdn.datatables.net/2.0.8/js/dataTables.bootstrap5.min.js"></script>'
_CHARTJS = '<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.4/dist/chart.umd.min.js"></script>'

# Shared JS for badge rendering — used in both per-race pages and racer pages
_BADGES_JS = r"""
function badges(trophies) {
  const I = {
    hcap_1:'<svg width="24" height="24" viewBox="0 0 24 24" style="display:block"><path d="M4 3 Q4 15 12 15 Q20 15 20 3 Z" fill="#FFD700" stroke="#B8860B" stroke-width="1.8"/><path d="M4 5 Q0 5 0 9 Q0 13 4 12" fill="none" stroke="#B8860B" stroke-width="1.8"/><path d="M20 5 Q24 5 24 9 Q24 13 20 12" fill="none" stroke="#B8860B" stroke-width="1.8"/><rect x="11" y="15" width="2" height="3.5" fill="#B8860B"/><rect x="6" y="18.5" width="12" height="2.5" rx="1" fill="#B8860B"/><text x="12" y="12.5" text-anchor="middle" font-size="9" font-weight="bold" fill="#7A5C00">1</text></svg>',
    hcap_2:'<svg width="24" height="24" viewBox="0 0 24 24" style="display:block"><path d="M4 3 Q4 15 12 15 Q20 15 20 3 Z" fill="#C0C0C0" stroke="#707070" stroke-width="1.8"/><path d="M4 5 Q0 5 0 9 Q0 13 4 12" fill="none" stroke="#707070" stroke-width="1.8"/><path d="M20 5 Q24 5 24 9 Q24 13 20 12" fill="none" stroke="#707070" stroke-width="1.8"/><rect x="11" y="15" width="2" height="3.5" fill="#707070"/><rect x="6" y="18.5" width="12" height="2.5" rx="1" fill="#707070"/><text x="12" y="12.5" text-anchor="middle" font-size="9" font-weight="bold" fill="#111">2</text></svg>',
    hcap_3:'<svg width="24" height="24" viewBox="0 0 24 24" style="display:block"><path d="M4 3 Q4 15 12 15 Q20 15 20 3 Z" fill="#DDA84A" stroke="#B07020" stroke-width="1.8"/><path d="M4 5 Q0 5 0 9 Q0 13 4 12" fill="none" stroke="#B07020" stroke-width="1.8"/><path d="M20 5 Q24 5 24 9 Q24 13 20 12" fill="none" stroke="#B07020" stroke-width="1.8"/><rect x="11" y="15" width="2" height="3.5" fill="#B07020"/><rect x="6" y="18.5" width="12" height="2.5" rx="1" fill="#B07020"/><text x="12" y="12.5" text-anchor="middle" font-size="9" font-weight="bold" fill="#5C2E00">3</text></svg>',
    finish_1:'<svg width="24" height="24" viewBox="0 0 24 24" style="display:block"><rect x="4" y="1" width="2" height="22" rx="1" fill="#555"/><path d="M6 2 L21 9 L6 18 Z" fill="#FFD700" stroke="#9A7000" stroke-width="1.2"/><text x="11" y="9" text-anchor="middle" dominant-baseline="central" font-size="9" font-weight="bold" fill="#7A5C00">1</text></svg>',
    finish_2:'<svg width="24" height="24" viewBox="0 0 24 24" style="display:block"><rect x="4" y="1" width="2" height="22" rx="1" fill="#555"/><path d="M6 2 L21 9 L6 18 Z" fill="#C0C0C0" stroke="#707070" stroke-width="1.2"/><text x="11" y="9" text-anchor="middle" dominant-baseline="central" font-size="9" font-weight="bold" fill="#333">2</text></svg>',
    finish_3:'<svg width="24" height="24" viewBox="0 0 24 24" style="display:block"><rect x="4" y="1" width="2" height="22" rx="1" fill="#555"/><path d="M6 2 L21 9 L6 18 Z" fill="#DDA84A" stroke="#B07020" stroke-width="1.2"/><text x="11" y="9" text-anchor="middle" dominant-baseline="central" font-size="9" font-weight="bold" fill="#5C2E00">3</text></svg>',
    par:'<svg width="24" height="24" viewBox="0 0 24 24" style="display:block"><rect x="11" y="1" width="2" height="13" rx="1" fill="#1565C0"/><rect x="4" y="6" width="16" height="2.5" rx="1.25" fill="#1565C0"/><rect x="8" y="2" width="8" height="1.5" rx="0.75" fill="#1565C0"/><rect x="8" y="11" width="8" height="1.5" rx="0.75" fill="#1565C0"/><text x="12" y="23" text-anchor="middle" font-size="7" fill="#1565C0" font-weight="bold">PAR</text></svg>',
    consistent:'<svg width="24" height="24" viewBox="0 0 24 24" style="display:block"><line x1="1" y1="17" x2="23" y2="17" stroke="#BBDEFB" stroke-width="0.8"/><polyline points="1,17 3,7 5,20 7,11 9,19 11,15 13,17 16,16 19,17 22,17" fill="none" stroke="#42A5F5" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    est:'<svg width="24" height="24" viewBox="0 0 24 24" style="display:block"><rect x="2" y="6" width="20" height="12" rx="3" fill="#388E3C"/><text x="12" y="15" text-anchor="middle" font-size="8" font-weight="bold" fill="white" font-family="system-ui,sans-serif">EST</text></svg>',
    outlier:'<svg width="24" height="24" viewBox="0 0 24 24" style="display:block"><text x="12" y="18" text-anchor="middle" font-size="16">🤷</text></svg>',
  };
  const b = (key, cls, title) => `<span class="hcap-medal ${cls}" data-bs-toggle="tooltip" data-bs-title="${title}">${I[key]}</span>`;
  const streak = (n) => `<span class="hcap-medal hcap-streak" data-bs-toggle="tooltip" data-bs-title="Improving streak: ${n} races"><svg width="24" height="24" viewBox="0 0 24 24" style="display:block"><polygon points="14,2 7,13 12,13 10,22 17,11 12,11" fill="#FF9800" stroke="#E65100" stroke-width="0.8" stroke-linejoin="round"/><text x="22" y="9" text-anchor="end" font-size="9" font-weight="bold" fill="#E65100">${n}</text></svg></span>`;
  const render = {
    finish_1:()=>b('finish_1','plain-medal','Overall 1st'), finish_2:()=>b('finish_2','plain-medal','Overall 2nd'), finish_3:()=>b('finish_3','plain-medal','Overall 3rd'),
    hcap_1:()=>b('hcap_1','hcap-gold','Handicap winner'), hcap_2:()=>b('hcap_2','hcap-silver','Handicap 2nd'), hcap_3:()=>b('hcap_3','hcap-bronze','Handicap 3rd'),
    consistent_1:()=>b('consistent','hcap-consist','Consistent performer'), consistent_2:()=>b('consistent','hcap-consist','Consistent performer'), consistent_3:()=>b('consistent','hcap-consist','Consistent performer'),
    par:()=>b('par','hcap-par','Par racer'),
    fresh:()=>b('est','hcap-est','Establishing handicap — not yet eligible for handicap awards'),
    outlier:()=>b('outlier','hcap-outlier','Outlier result — >10% off prediction, handicap unchanged'),
  };
  if (!trophies || !trophies.length) return '';
  const ORDER = ['hcap_1','hcap_2','hcap_3','finish_1','finish_2','finish_3','consistent_1','consistent_2','consistent_3','par','fresh','outlier'];
  const sorted = [...trophies].sort((a,b) => {
    const ai = a.startsWith('streak_') ? ORDER.length + parseInt(a.split('_')[1]) : ORDER.indexOf(a);
    const bi = b.startsWith('streak_') ? ORDER.length + parseInt(b.split('_')[1]) : ORDER.indexOf(b);
    return ai - bi;
  });
  return `<span style="display:flex;justify-content:center;gap:2px;flex-wrap:wrap">${sorted.map(t => {
    if (t.startsWith('streak_')) return streak(parseInt(t.split('_')[1]));
    return render[t] ? render[t]() : '';
  }).join('')}</span>`;
}
"""

# SVG icon definitions (24x24)
def _svg(content): return f'<svg width="24" height="24" viewBox="0 0 24 24" style="display:block">{content}</svg>'

_ICONS = {
    "hcap_1": _svg('<path d="M4 3 Q4 15 12 15 Q20 15 20 3 Z" fill="#FFD700" stroke="#B8860B" stroke-width="1.8"/><path d="M4 5 Q0 5 0 9 Q0 13 4 12" fill="none" stroke="#B8860B" stroke-width="1.8"/><path d="M20 5 Q24 5 24 9 Q24 13 20 12" fill="none" stroke="#B8860B" stroke-width="1.8"/><rect x="11" y="15" width="2" height="3.5" fill="#B8860B"/><rect x="6" y="18.5" width="12" height="2.5" rx="1" fill="#B8860B"/><text x="12" y="12.5" text-anchor="middle" font-size="9" font-weight="bold" fill="#7A5C00">1</text>'),
    "hcap_2": _svg('<path d="M4 3 Q4 15 12 15 Q20 15 20 3 Z" fill="#C0C0C0" stroke="#707070" stroke-width="1.8"/><path d="M4 5 Q0 5 0 9 Q0 13 4 12" fill="none" stroke="#707070" stroke-width="1.8"/><path d="M20 5 Q24 5 24 9 Q24 13 20 12" fill="none" stroke="#707070" stroke-width="1.8"/><rect x="11" y="15" width="2" height="3.5" fill="#707070"/><rect x="6" y="18.5" width="12" height="2.5" rx="1" fill="#707070"/><text x="12" y="12.5" text-anchor="middle" font-size="9" font-weight="bold" fill="#111">2</text>'),
    "hcap_3": _svg('<path d="M4 3 Q4 15 12 15 Q20 15 20 3 Z" fill="#DDA84A" stroke="#B07020" stroke-width="1.8"/><path d="M4 5 Q0 5 0 9 Q0 13 4 12" fill="none" stroke="#B07020" stroke-width="1.8"/><path d="M20 5 Q24 5 24 9 Q24 13 20 12" fill="none" stroke="#B07020" stroke-width="1.8"/><rect x="11" y="15" width="2" height="3.5" fill="#B07020"/><rect x="6" y="18.5" width="12" height="2.5" rx="1" fill="#B07020"/><text x="12" y="12.5" text-anchor="middle" font-size="9" font-weight="bold" fill="#5C2E00">3</text>'),
    "finish_1": _svg('<rect x="4" y="1" width="2" height="22" rx="1" fill="#555"/><path d="M6 2 L21 9 L6 18 Z" fill="#FFD700" stroke="#9A7000" stroke-width="1.2"/><text x="11" y="9" text-anchor="middle" dominant-baseline="central" font-size="9" font-weight="bold" fill="#7A5C00">1</text>'),
    "finish_2": _svg('<rect x="4" y="1" width="2" height="22" rx="1" fill="#555"/><path d="M6 2 L21 9 L6 18 Z" fill="#C0C0C0" stroke="#707070" stroke-width="1.2"/><text x="11" y="9" text-anchor="middle" dominant-baseline="central" font-size="9" font-weight="bold" fill="#333">2</text>'),
    "finish_3": _svg('<rect x="4" y="1" width="2" height="22" rx="1" fill="#555"/><path d="M6 2 L21 9 L6 18 Z" fill="#DDA84A" stroke="#B07020" stroke-width="1.2"/><text x="11" y="9" text-anchor="middle" dominant-baseline="central" font-size="9" font-weight="bold" fill="#5C2E00">3</text>'),
    "par":      _svg('<rect x="11" y="1" width="2" height="13" rx="1" fill="#1565C0"/><rect x="4" y="6" width="16" height="2.5" rx="1.25" fill="#1565C0"/><rect x="8" y="2" width="8" height="1.5" rx="0.75" fill="#1565C0"/><rect x="8" y="11" width="8" height="1.5" rx="0.75" fill="#1565C0"/><text x="12" y="23" text-anchor="middle" font-size="7" fill="#1565C0" font-weight="bold">PAR</text>'),
    "consistent": _svg('<line x1="1" y1="17" x2="23" y2="17" stroke="#BBDEFB" stroke-width="0.8"/><polyline points="1,17 3,7 5,20 7,11 9,19 11,15 13,17 16,16 19,17 22,17" fill="none" stroke="#42A5F5" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>'),
    "est":      _svg('<rect x="2" y="6" width="20" height="12" rx="3" fill="#388E3C"/><text x="12" y="15" text-anchor="middle" font-size="8" font-weight="bold" fill="white" font-family="system-ui,sans-serif">EST</text>'),
    "outlier":  _svg('<text x="12" y="18" text-anchor="middle" font-size="16">🤷</text>'),
}

def _streak_icon(n):
    return _svg(f'<polygon points="14,2 7,13 12,13 10,22 17,11 12,11" fill="#FF9800" stroke="#E65100" stroke-width="0.8" stroke-linejoin="round"/><text x="22" y="9" text-anchor="end" font-size="9" font-weight="bold" fill="#E65100">{n}</text>')

def _icon_span(key, cls, tooltip, count=1):
    icon = _ICONS.get(key, "")
    if count > 1:
        return f'<span class="hcap-medal {cls}" data-bs-toggle="tooltip" data-bs-title="{tooltip} \xd7 {count}" style="white-space:nowrap">{icon}</span>'
    return f'<span class="hcap-medal {cls}" data-bs-toggle="tooltip" data-bs-title="{tooltip}">{icon}</span>'


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
  var h = location.hash.replace('#', '');
  if (h && /^\d{4}$/.test(h)) return h;
  return localStorage.getItem('pc_year') || fallback;
}
function setSeason(year) {
  localStorage.setItem('pc_year', year);
  location.hash = year;
}
function getDistance() {
  return localStorage.getItem('pc_distance') || '';
}
function setDistance(dist) {
  if (dist) localStorage.setItem('pc_distance', dist);
}
function getResultTab() {
  return localStorage.getItem('pc_result_tab') || '';
}
function setResultTab(tab) {
  if (tab) localStorage.setItem('pc_result_tab', tab);
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
  .hcap-silver {{ background:#EBEBEB; border:1px solid #A0A0A0; }}
  .hcap-bronze {{ background:#FDF0E0; border:1px solid #DDA84A; }}
  .plain-medal {{ background:#F8F8F8; border:1px solid #DDDDDD; }}
  .hcap-par    {{ background:#E3F2FD; border:1px solid #1565C0; }}
  .hcap-consist{{ background:#E3F2FD; border:1px solid #42A5F5; }}
  .hcap-streak {{ background:#FFF3E0; border:1px solid #FF9800; }}
  .hcap-est    {{ background:#F8F8F8; border:1px solid #DDDDDD; opacity:0.75; }}
  .hcap-outlier{{ background:#FFF3E0; border:1px solid #FF9800; opacity:0.85; }}
</style>
</head>
<body>
{_SEASON_JS}"""


def _nav(active: str = "", data: dict = None, depth: int = 1) -> str:
    """depth: 0=global (index/about), 1=club page, 2=racer page"""
    club = data["current_club"] if data else "bepc"
    # Relative prefix to site root
    root = "../" * depth  # depth=0 → "", depth=1 → "../", depth=2 → "../../"
    # Relative prefix to club dir from current page
    club_prefix = "" if depth == 1 else ("../" if depth == 2 else f"{club}/")

    if depth == 0:
        # Global page — club links resolved via JS
        pages = [
            (f"{root}index.html", "Home"),
            (f"{club}/races.html", "Races", True),
            (f"{club}/standings.html", "Standings", True),
            (f"{club}/trajectories.html", "Trajectories", True),
            (f"{club}/racer/index.html", "Racers", True),
            (f"{root}about.html", "About"),
        ]
    else:
        pages = [
            (f"{root}index.html", "Home"),
            (f"{club_prefix}races.html", "Races"),
            (f"{club_prefix}standings.html", "Standings"),
            (f"{club_prefix}trajectories.html", "Trajectories"),
            (f"{club_prefix}racer/index.html", "Racers"),
            (f"{root}about.html", "About"),
        ]

    items = ""
    for entry in pages:
        href, label = entry[0], entry[1]
        dynamic = len(entry) > 2 and entry[2]
        cls = "nav-link active" if label == active else "nav-link"
        if dynamic:
            items += f'<li class="nav-item"><a class="{cls}" href="{href}" onclick="var c=localStorage.getItem(\'pc_club\')||\'{club}\'; this.href=c+\'/{label.lower()}.html\'">{label}</a></li>\n'
        else:
            items += f'<li class="nav-item"><a class="{cls}" href="{href}">{label}</a></li>\n'

    return f"""<nav class="navbar navbar-expand-md navbar-dark bg-dark mb-0">
  <div class="container">
    <a class="navbar-brand" href="{root}index.html">🏄 PaddleClub</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="nav">
      <ul class="navbar-nav ms-auto">{items}</ul>
    </div>
  </div>
</nav>"""


def _selector_bar(data: dict, show_season: bool = True, page: str = None) -> str:
    """Horizontal selector bar: club pills + season dropdown.
    page: page name within club dir (e.g. 'races', 'results', 'standings', 'trajectories').
          Club buttons link to '../{club}/{page}.html'. If None, no club buttons shown.
    """
    if not data:
        return ""

    cfg_path = Path(__file__).parent.parent / "data" / "clubs.yaml"
    clubs_cfg = {}
    if cfg_path.exists():
        try:
            import yaml
            with open(cfg_path) as f:
                clubs_cfg = yaml.safe_load(f).get("clubs", {})
        except Exception:
            pass

    current_club = data["current_club"]
    import json as _json
    all_seasons_js = "{" + ",".join(
        f'"{cid}":{{"years":{_json.dumps(sorted(club["seasons"].keys(), reverse=True))},"current":"{club["current_season"]}"}}'
        for cid, club in data["clubs"].items()
    ) + "}"

    # Club buttons — <a> links to sibling club dirs
    club_btns = ""
    if page:
        for club_id, club in data["clubs"].items():
            short = clubs_cfg.get(club_id, {}).get("short_name", club.get("name", club_id))
            active_cls = " active" if club_id == current_club else ""
            if club_id == current_club:
                href = "index.html" if page == "racer/index" else f"{page}.html"
            else:
                href = f"../../{club_id}/racer/index.html" if page == "racer/index" else f"../{club_id}/{page}.html"
            club_btns += f'<a class="btn btn-sm btn-outline-secondary{active_cls}" data-club="{club_id}" href="{href}">{short}</a>\n'

    season_html = ""
    if show_season:
        season_html = "<div class='d-flex align-items-center gap-2'><span class='text-muted small fw-semibold'>Season</span><select id='season-select' class='form-select form-select-sm' style='min-width:110px'></select></div>"

    if page:
        club_js = f"""
(function() {{
  var ALL_CLUB_SEASONS = {all_seasons_js};
  var info = ALL_CLUB_SEASONS['{current_club}'];
  var hash = location.hash.replace('#', '');
  var saved = localStorage.getItem('pc_year');
  var active = (hash && info.years.indexOf(hash) >= 0) ? hash
             : (saved && info.years.indexOf(saved) >= 0) ? saved
             : info.current;
  var sel = document.getElementById('season-select');
  if (sel) {{
    sel.innerHTML = info.years.map(function(y) {{
      return '<option value="' + y + '"' + (y === active ? ' selected' : '') + '>' + y + ' Season</option>';
    }}).join('');
    sel.addEventListener('change', function() {{
      var yr = this.value;
      localStorage.setItem('pc_year', yr);
      location.hash = yr;
      document.querySelectorAll('#club-btn-group a[data-club]').forEach(function(a) {{
        a.href = a.href.split('#')[0] + '#' + yr;
      }});
    }});
  }}
  if (location.hash !== '#' + active) location.replace(location.pathname + '#' + active);
  localStorage.setItem('pc_year', active);
  localStorage.setItem('pc_club', '{current_club}');
  document.querySelectorAll('#club-btn-group a[data-club]').forEach(function(a) {{
    a.href = a.href.split('#')[0] + '#' + active;
  }});
}})();"""
    else:
        club_js = ""

    club_row = f"""<div class="d-flex align-items-center gap-2">
        <span class="text-muted small fw-semibold">Club</span>
        <div class="btn-group flex-wrap" id="club-btn-group" role="group">{club_btns}</div>
      </div>""" if club_btns else ""

    return f"""<div class="bg-light border-bottom mb-4">
  <div class="container py-2">
    <div class="d-flex flex-wrap align-items-center gap-3">
      {club_row}
      {season_html}
    </div>
  </div>
</div>
{"<script>" + club_js + "</script>" if club_js else ""}"""


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


_valid_racer_slugs: set = set()
_current_racer_club: str = ""


def _racer_link(name: str, back: str = "") -> str:
    slug = _slug(name)
    if slug not in _valid_racer_slugs:
        return name
    return f'<a href="racer/{slug}.html">{name}</a>'


def _racer_slugs_js() -> str:
    """JS snippet declaring RACER_SLUGS set for use in client-side templates."""
    slugs_json = json.dumps(sorted(_valid_racer_slugs))
    return f"const RACER_SLUGS = new Set({slugs_json});"


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

            for code, icon_key, label, cls in [
                ("hcap_1",      "hcap_1",    "Handicap winner",    "hcap-gold"),
                ("hcap_2",      "hcap_2",    "Handicap 2nd",       "hcap-silver"),
                ("hcap_3",      "hcap_3",    "Handicap 3rd",       "hcap-bronze"),
                ("finish_1",    "finish_1",  "Overall 1st",        "plain-medal"),
                ("finish_2",    "finish_2",  "Overall 2nd",        "plain-medal"),
                ("finish_3",    "finish_3",  "Overall 3rd",        "plain-medal"),
                ("consistent_1","consistent","Consistent performer (±1% of expectation)","hcap-consist"),
                ("consistent_2","consistent","Consistent performer (±1% of expectation)","hcap-consist"),
                ("consistent_3","consistent","Consistent performer (±1% of expectation)","hcap-consist"),
                ("par",         "par",       "Par racer",          "hcap-par"),
            ]:
                n = counts.get(code, 0)
                if not n:
                    continue
                parts.append(_icon_span(icon_key, cls, label, n if n >= 4 else 1) if n < 4 else _icon_span(icon_key, cls, label, n))
                if n < 4:
                    for _ in range(n - 1):
                        parts.append(_icon_span(icon_key, cls, label))

            if streak_codes:
                for code, cnt in sorted(streak_codes.items(), key=lambda x: int(x[0].split('_')[1])):
                    n = int(code.split('_')[1])
                    tooltip = f"Improving streak: {n} races"
                    if cnt >= 4:
                        parts.append(f'<span class="hcap-medal hcap-streak" data-bs-toggle="tooltip" data-bs-title="{tooltip} × {cnt}" style="white-space:nowrap">{_streak_icon(n)}</span>')
                    else:
                        for _ in range(cnt):
                            parts.append(f'<span class="hcap-medal hcap-streak" data-bs-toggle="tooltip" data-bs-title="{tooltip}">{_streak_icon(n)}</span>')
            return ''.join(parts)

        pts = sorted(_final_states_for_season(season["races"]).values(), key=lambda r: -r["season_points"])
        hpts = sorted(_final_states_for_season(season["races"]).values(), key=lambda r: -r["season_handicap_points"])
        distances = set(r.get("distance", "") for r in season["races"])
        standings_data["seasons"][year] = {
            "multi_dist": len([d for d in distances if d]) > 1,
            "pts": [{"name": r["canonical_name"], "craft": display_craft_ui(r["craft_category"]), "gender": r["gender"],
                     "trophies": trophy_summary(r["canonical_name"], r["craft_category"]),
                     "course": r.get("_distance", ""), "races": r["num_races"], "points": r["season_points"]} for r in pts],
            "hpts": [{"name": r["canonical_name"], "craft": display_craft_ui(r["craft_category"]),
                      "gender": r["gender"],
                      "trophies": trophy_summary(r["canonical_name"], r["craft_category"]),
                      "course": r.get("_distance", ""), "races": r["num_races"],
                      "hpts": r["season_handicap_points"],
                      "hcap": round(r["handicap_post"], 3),
                      "points": r["season_points"]} for r in hpts],
        }
    (SITE_DIR / f"standings-data-{data['current_club']}.json").write_text(json.dumps(standings_data))
    (SITE_DIR / data['current_club'] / "standings-data.json").write_text(json.dumps(standings_data))

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
    (SITE_DIR / f"races-data-{data['current_club']}.json").write_text(json.dumps(races_data))
    (SITE_DIR / data['current_club'] / "races-data.json").write_text(json.dumps(races_data))

    # trajectories-data.json
    colors = ["#e6194b","#3cb44b","#4363d8","#f58231","#911eb4","#42d4f4","#f032e6",
              "#bfef45","#c8a000","#469990","#dcbeff","#9A6324","#800000","#aaffc3",
              "#808000","#ffd8b1","#000075","#a9a9a9"]
    traj_data = {"current_year": current_year, "seasons": {}}
    for year, season in _all_seasons(data).items():
        pts, hpts, hnum = _build_traj_series(season["races"], colors)
        traj_data["seasons"][year] = {"pts": pts, "hpts": hpts, "hnum": hnum}
    (SITE_DIR / f"trajectories-data-{data['current_club']}.json").write_text(json.dumps(traj_data))
    (SITE_DIR / data['current_club'] / "trajectories-data.json").write_text(json.dumps(traj_data))

    print(f"Generated: site/{data['current_club']}/*-data.json")


def _loading_spinner() -> str:
    return '<div id="loading" class="text-center my-5" style="display:none"><div class="spinner-border text-secondary"></div></div>'


def generate_standings(data: dict) -> None:
    for club_id in data["clubs"]:
        data["current_club"] = club_id
        html = _head("Standings") + _nav("Standings", data=data, depth=1) + _selector_bar(data, page="standings") + f"""
<div class="container">
  <h1 class="mb-3">Standings</h1>
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
{_racer_slugs_js()}
let SEASONS = null;
let dtPts = null, dtHpts = null;
function render(year) {{
  const s = SEASONS[year];
  if (dtPts) {{ dtPts.destroy(); dtPts = null; }}
  if (dtHpts) {{ dtHpts.destroy(); dtHpts = null; }}
  const fmtGender = g => g === 'Female/Male' ? 'Mixed' : g;
  const racerLink = (name, slug) => RACER_SLUGS.has(slug) ? `<a href="racer/${{slug}}.html">${{name}}</a>` : name;
  const row = r => `<tr><td></td><td>${{racerLink(r.name, r.name.toLowerCase().replace(/ /g,'-'))}}</td><td>${{r.craft}}</td><td>${{fmtGender(r.gender)}}</td><td style="white-space:nowrap">${{r.trophies||''}}</td><td>${{r.races}}</td><td>${{r.hpts}}</td><td>${{r.hcap}}</td><td>${{r.points}}</td></tr>`;
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
    const yr = getSeason(d.current_year);
    const sel = document.getElementById('season-select');
    if (sel && SEASONS[yr]) sel.value = yr;
    render(SEASONS[yr] ? yr : d.current_year);
    window.addEventListener('hashchange', () => {{
      const y = location.hash.replace('#','');
      if (SEASONS[y]) {{ if (sel) sel.value = y; render(y); }}
    }});
    if (sel) sel.addEventListener('change', e => render(e.target.value));
  }});
}});
</script>""" + _foot()
        (SITE_DIR / club_id / "standings.html").write_text(html)
        print(f"Generated: site/{club_id}/standings.html")


def generate_races(data: dict) -> None:
    """Generate per-race HTML files: site/{club}/results/{slug}.html"""
    import json as _json
    from collections import defaultdict

    race_slugs = data.get("race_slugs", {})

    # Shared JS for rendering race results (badges, tables, podium)
    _RACE_JS = """
function slug(name) { return name.toLowerCase().replace(/ /g, '-'); }
function racerLink(name) { const s = slug(name); return RACER_SLUGS.has(s) ? `<a href="../racer/${s}.html">${name}</a>` : name; }
function display_craft_ui(cat) {
  if (!cat || cat === 'Unknown') return '';
  const sprint = cat.match(/^Sprint-K(\d+)$/); if (sprint) return 'K-' + sprint[1] + ' (sprint)';
  const vaa = cat.match(/^Va'a-(\d+)$/); if (vaa) return 'V-' + vaa[1];
  const canoe = cat.match(/^Canoe-(\d+)$/); if (canoe) return 'C-' + canoe[1];
  const kayak = cat.match(/^Kayak-(\d+)$/); if (kayak) return 'K-' + kayak[1];
  if (/^(OW|SUP|Prone)-1$/.test(cat)) return cat.slice(0, -2);
  return cat;
}
function craft_cell(cat, specific) {
  const display = display_craft_ui(cat);
  if (!display) return '<td></td>';
  if (!specific || specific === display || cat.startsWith('Sprint-')) return `<td>${display}</td>`;
  return `<td>${display} (${specific})</td>`;
}
function fmtTime(s) {
  s = Math.floor(s);
  const m = Math.floor(s / 60), sec = s % 60, h = Math.floor(m / 60);
  return h ? h+':'+String(m%60).padStart(2,'0')+':'+String(sec).padStart(2,'0')
           : m+':'+String(sec).padStart(2,'0');
}
""" + _BADGES_JS + """
function podiumForCourse(course) {
  const pr = [null, null, null];
  course.handicap.forEach(r => {
    if (r.trophies && r.trophies.includes('hcap_1')) pr[0] = r;
    if (r.trophies && r.trophies.includes('hcap_2')) pr[1] = r;
    if (r.trophies && r.trophies.includes('hcap_3')) pr[2] = r;
  });
  const cfg = [
    {idx:1, label:'2nd', bg:'#EBEBEB', border:'#A0A0A0', nameColor:'#333', h:'52px', w:'135px', cup:'<svg width="36" height="36" viewBox="0 0 24 24"><path d="M4 3 Q4 15 12 15 Q20 15 20 3 Z" fill="#C0C0C0" stroke="#707070" stroke-width="1.8"/><path d="M4 5 Q0 5 0 9 Q0 13 4 12" fill="none" stroke="#707070" stroke-width="1.8"/><path d="M20 5 Q24 5 24 9 Q24 13 20 12" fill="none" stroke="#707070" stroke-width="1.8"/><rect x="11" y="15" width="2" height="3.5" fill="#707070"/><rect x="6" y="18.5" width="12" height="2.5" rx="1" fill="#707070"/><text x="12" y="12.5" text-anchor="middle" font-size="9" font-weight="bold" fill="#111">2</text></svg>'},
    {idx:0, label:'1st', bg:'#FFF8DC', border:'#FFD700', nameColor:'#7A5C00', h:'64px', w:'180px', cup:'<svg width="36" height="36" viewBox="0 0 24 24"><path d="M4 3 Q4 15 12 15 Q20 15 20 3 Z" fill="#FFD700" stroke="#B8860B" stroke-width="1.8"/><path d="M4 5 Q0 5 0 9 Q0 13 4 12" fill="none" stroke="#B8860B" stroke-width="1.8"/><path d="M20 5 Q24 5 24 9 Q24 13 20 12" fill="none" stroke="#B8860B" stroke-width="1.8"/><rect x="11" y="15" width="2" height="3.5" fill="#B8860B"/><rect x="6" y="18.5" width="12" height="2.5" rx="1" fill="#B8860B"/><text x="12" y="12.5" text-anchor="middle" font-size="9" font-weight="bold" fill="#7A5C00">1</text></svg>'},
    {idx:2, label:'3rd', bg:'#FDF0E0', border:'#DDA84A', nameColor:'#5C2E00', h:'44px', w:'135px', cup:'<svg width="36" height="36" viewBox="0 0 24 24"><path d="M4 3 Q4 15 12 15 Q20 15 20 3 Z" fill="#DDA84A" stroke="#B07020" stroke-width="1.8"/><path d="M4 5 Q0 5 0 9 Q0 13 4 12" fill="none" stroke="#B07020" stroke-width="1.8"/><path d="M20 5 Q24 5 24 9 Q24 13 20 12" fill="none" stroke="#B07020" stroke-width="1.8"/><rect x="11" y="15" width="2" height="3.5" fill="#B07020"/><rect x="6" y="18.5" width="12" height="2.5" rx="1" fill="#B07020"/><text x="12" y="12.5" text-anchor="middle" font-size="9" font-weight="bold" fill="#5C2E00">3</text></svg>'},
  ];
  let html = '<div class="d-flex justify-content-center mb-3"><div style="display:flex;flex-direction:column;align-items:center"><div style="display:flex;align-items:flex-end;gap:6px">';
  cfg.forEach(c => {
    const r = pr[c.idx];
    const s = r ? slug(r.canonical_name) : null;
    const name = r ? (RACER_SLUGS.has(s)
      ? `<a href="../racer/${s}.html" style="color:${c.nameColor};font-weight:600;font-size:0.85em;text-decoration:none;text-align:center;display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${r.canonical_name}</a>`
      : `<span style="font-weight:600;font-size:0.85em;color:${c.nameColor};text-align:center;display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${r.canonical_name}</span>`)
      : '<span style="color:#bbb;font-size:0.85em">—</span>';
    html += `<div style="display:flex;flex-direction:column;align-items:center;gap:3px;width:${c.w};min-width:0;flex-shrink:1">${c.cup}${name}<div style="width:100%;height:${c.h};background:${c.bg};border:1px solid ${c.border};border-bottom:none;border-radius:4px 4px 0 0;display:flex;align-items:center;justify-content:center;font-weight:bold;color:${c.nameColor};font-size:0.85em">${c.label}</div></div>`;
  });
  html += '</div><div style="height:3px;background:#CCC;border-radius:2px;width:calc(100% + 90px)"></div></div></div>';
  return html;
}

function tableHtml(id_suffix) {
  return `
  <ul class="nav nav-tabs" id="result-tabs-${id_suffix}">
    <li class="nav-item"><button class="nav-link active" data-bs-toggle="tab" data-bs-target="#tab-handicap-${id_suffix}">Handicap Order</button></li>
    <li class="nav-item"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-finish-${id_suffix}">Finish Order</button></li>
  </ul>
  <div class="tab-content border border-top-0 p-3 mb-3">
    <div class="tab-pane active" id="tab-handicap-${id_suffix}">
      <table class="table table-sm table-striped" style="table-layout:fixed">
        <colgroup><col style="width:80px"><col style="width:55px"><col style="width:160px"><col style="width:75px"><col style="width:65px"><col style="width:75px"><col style="width:75px"><col style="width:90px"><col style="width:55px"><col style="width:55px"><col style="width:65px"></colgroup>
        <thead><tr><th></th><th>Place</th><th>Racer</th><th>Craft</th><th>Time</th><th>Handicap</th><th>Adj Time</th><th>Improvement %</th><th>New Handicap</th><th>Pts</th><th>Hcap Pts</th></tr></thead>
        <tbody id="body-handicap-${id_suffix}"></tbody>
      </table>
    </div>
    <div class="tab-pane" id="tab-finish-${id_suffix}">
      <table class="table table-sm table-striped" style="table-layout:fixed">
        <colgroup><col style="width:80px"><col style="width:55px"><col style="width:160px"><col style="width:75px"><col style="width:65px"><col style="width:75px"><col style="width:75px"><col style="width:65px"><col style="width:90px"><col style="width:55px"><col style="width:55px"></colgroup>
        <thead><tr><th></th><th>Place</th><th>Racer</th><th>Craft</th><th>Time</th><th>Handicap</th><th>Adj Time</th><th>Improvement %</th><th>New Handicap</th><th>Pts</th><th>Hcap Pts</th></tr></thead>
        <tbody id="body-finish-${id_suffix}"></tbody>
      </table>
    </div>
  </div>`;
}
function rows(results, placeField) {
  const isHcap = placeField === 'adjusted_place';
  return results.map(r => {
    const pct = r.adjusted_time_versus_par != null && !r.is_fresh_racer
      ? ((1 - r.adjusted_time_versus_par) * 100) : null;
    const noOutlierDetect = !r.is_fresh_racer && pct != null && pct < -10 && !r.is_outlier;
    const pctNote = noOutlierDetect ? ' data-bs-toggle="tooltip" data-bs-title="First race back this season"' : '';
    const pctHtml = pct != null
      ? `<td style="text-align:right;font-size:0.85em;color:${pct >= 0 ? '#2E7D32' : '#666'};font-weight:${pct >= 0 ? 'bold' : 'normal'}">${pct >= 0 ? '+' : ''}${pct.toFixed(1)}%${noOutlierDetect ? `<sup${pctNote}>^</sup>` : ''}</td>`
      : '<td></td>';
    const hcapPostNote = r.is_outlier ? ' data-bs-toggle="tooltip" data-bs-title="Outlier — result suppressed"' : '';
    const hcapPostHtml = `<td>${r.handicap_post.toFixed(3)}${r.is_outlier ? `<sup${hcapPostNote}>^</sup>` : ''}</td>`;
    return `<tr><td>${badges(r.trophies)}</td>
    <td>${r[placeField]}</td><td>${racerLink(r.canonical_name)}</td>
    ${craft_cell(r.craft_category, r.craft_specific)}
    <td>${isHcap ? fmtTime(r.time_seconds) : '<strong>' + fmtTime(r.time_seconds) + '</strong>'}</td>
    <td>${r.handicap.toFixed(3)}</td>
    ${r.trophies && r.trophies.includes('par') ? '<td><span style="background:#E3F2FD;border:1px solid #1565C0;border-radius:3px;padding:2px 4px;font-weight:bold;color:#1565C0">' + fmtTime(r.adjusted_time_seconds) + '</span></td>' : '<td>' + (isHcap ? '<strong>' + fmtTime(r.adjusted_time_seconds) + '</strong>' : fmtTime(r.adjusted_time_seconds)) + '</td>'}
    ${pctHtml}${hcapPostHtml}
    <td>${r.race_points || 0}</td><td>${r.handicap_points || 0}</td></tr>`;
  }).join('');
}
"""

    for club_id in data["clubs"]:
        data["current_club"] = club_id
        club = data["clubs"][club_id]
        results_dir = SITE_DIR / club_id / "results"
        results_dir.mkdir(parents=True, exist_ok=True)
        # Clear stale files
        for f in results_dir.glob("*.html"):
            f.unlink()

        id_to_slug = race_slugs.get(club_id, {})
        # Build ordered list of all races for prev/next navigation
        all_races = []
        for year in sorted(club["seasons"].keys()):
            seen = []
            for race in club["seasons"][year]["races"]:
                if race["race_id"] not in seen:
                    seen.append(race["race_id"])
                    all_races.append((year, race["race_id"]))

        # Group courses by race_id
        race_courses: dict = defaultdict(list)
        for year, season in club["seasons"].items():
            for race in season["races"]:
                race_courses[race["race_id"]].append(race)

        count = 0
        for i, (year, race_id) in enumerate(all_races):
            slug_name = id_to_slug.get(race_id, str(race_id))
            courses = race_courses[race_id]
            base_name = courses[0]["name"].split(" — ")[0]
            date = courses[0]["date"]
            display_url = courses[0].get("display_url", "")
            total_starters = sum(len(c["results"]) for c in courses)

            prev_slug = id_to_slug.get(all_races[i-1][1]) if i > 0 else None
            next_slug = id_to_slug.get(all_races[i+1][1]) if i < len(all_races)-1 else None

            # Build inline course data
            courses_json = _json.dumps([{
                "label": c["name"].split(" — ")[-1] if " — " in c["name"] else "Results",
                "finish": sorted(c["results"], key=lambda x: x["original_place"]),
                "handicap": sorted(c["results"], key=lambda x: x["adjusted_place"]),
            } for c in courses])

            prev_link = f'<a href="{prev_slug}.html" class="btn btn-outline-secondary btn-sm">&larr; Prev</a>' if prev_slug else '<span class="btn btn-outline-secondary btn-sm disabled">&larr; Prev</span>'
            next_link = f'<a href="{next_slug}.html" class="btn btn-outline-secondary btn-sm">Next &rarr;</a>' if next_slug else '<span class="btn btn-outline-secondary btn-sm disabled">Next &rarr;</span>'
            source_link = f'<a href="{display_url}" target="_blank" class="btn btn-outline-secondary btn-sm">Source ↗</a>' if display_url else ''

            html = _head(base_name) + _nav("Results", data=data, depth=2) + f"""
<div class="bg-light border-bottom mb-4">
  <div class="container py-2">
    <div class="d-flex flex-wrap align-items-center gap-2">
      {prev_link}
      {next_link}
      <a href="../races.html#{year}" class="btn btn-outline-secondary btn-sm">{year} Races ↑</a>
    </div>
  </div>
</div>
<div class="container">
  <h1 class="mb-1">{base_name}</h1>
  <p class="text-muted">{date} · {total_starters} starters{(' · <a href="' + display_url + '" target="_blank">Source ↗</a>') if display_url else ''}</p>
  <div id="course-content"></div>
</div>
<script>
{_racer_slugs_js()}
const COURSES = {courses_json};
{_RACE_JS}
document.addEventListener('DOMContentLoaded', () => {{
  const sortedCourses = [...COURSES].sort((a,b) => b.finish.length - a.finish.length);
  let tabNav = '<ul class="nav nav-tabs mb-0">';
  let tabContent = '<div class="tab-content">';
  sortedCourses.forEach((course, i) => {{
    const origIdx = COURSES.indexOf(course);
    const active = i === 0 ? 'active' : '';
    tabNav += `<li class="nav-item"><button class="nav-link ${{active}}" data-bs-toggle="tab" data-bs-target="#course-${{origIdx}}">${{course.label || 'Results'}}</button></li>`;
    tabContent += `<div class="tab-pane ${{active}} p-3 border border-top-0" id="course-${{origIdx}}">${{podiumForCourse(course)}}${{tableHtml(origIdx)}}</div>`;
  }});
  tabNav += '</ul>'; tabContent += '</div>';
  document.getElementById('course-content').innerHTML = tabNav + tabContent;
  COURSES.forEach((course, i) => {{
    document.getElementById(`body-finish-${{i}}`).innerHTML = rows(course.finish, 'original_place');
    document.getElementById(`body-handicap-${{i}}`).innerHTML = rows(course.handicap, 'adjusted_place');
  }});
  document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => bootstrap.Tooltip.getOrCreateInstance(el));
  const savedDist = getDistance();
  const savedTab = getResultTab();
  COURSES.forEach((course, i) => {{
    const btn = document.querySelector(`[data-bs-target="#course-${{i}}"]`);
    if (btn) {{
      if (savedDist && course.label === savedDist) bootstrap.Tab.getOrCreateInstance(btn).show();
      btn.addEventListener('shown.bs.tab', () => setDistance(course.label));
    }}
    document.querySelectorAll(`#result-tabs-${{i}} button`).forEach(tb => {{
      if (savedTab && tb.textContent === savedTab) bootstrap.Tab.getOrCreateInstance(tb).show();
      tb.addEventListener('shown.bs.tab', () => setResultTab(tb.textContent));
    }});
  }});
}});
</script>""" + _foot()
            (results_dir / f"{slug_name}.html").write_text(html)
            count += 1

        print(f"Generated: site/{club_id}/results/ ({count} files)")

_SHORT_LABELS = {
    'Pnworca1': 'PNWORCA #1', 'Pnworca2': 'PNWORCA #2', 'Pnworca3': 'PNWORCA #3',
    'Pnworca5': 'PNWORCA #5', 'Pnworca6': 'PNWORCA #6',
    'Cdnssmallboats': 'CDN Small Boats', 'Salmonrow': 'Salmon Row',
    'Gorgedownwind': 'Gorge Downwind', 'Keatschop': 'Keats Chop',
    'Supchallenge': 'SUP Challenge', 'Islandironsmallboats': 'Island Iron',
    'Dagrind': 'Da Grind', 'Wutg': 'WUTG', 'Weapon': 'Weapon',
    'Whipper': 'Whipper', 'Chicken': 'Chicken', 'Flcc': 'FLCC',
    "Board the Fjord 2025": "Fjord '25",
}

_SHORT_MAP = {
    'Halloween Race': 'Halloween', 'Halloween': 'Halloween',
    "New Year's Paddle Race": "New Year's",
    'Paddle Your Heart Out': 'Heart Out',
    'Post Poultry Paddle': 'Post Poultry',
    'Alderbrook St. Paddles Day': 'St. Paddles',
    'Deception Pass Challenge': 'Deception Pass',
    'MAKAH COAST RACE': 'Makah',
    # Sound Rowers
    'Squaxin Island': 'Squaxin',
    'Commencement Bay': 'Comm. Bay',
    'Mercer Island Sausage Pull': 'Mercer Is.',
    'Mercer Island': 'Mercer Is.',
    'Rat Island Regatta': 'Rat Island',
    'Elk River Challenge': 'Elk River',
    'Wenatchee Guano Rocks': 'Guano Rocks',
    'Round Shaw': 'Round Shaw',
    'Budd Inlet': 'Budd Inlet',
}


def _short_label(name: str, date: str = "") -> str:
    """Generate a short chart label in 'MM/DD - <name>' format."""
    # Parse date prefix
    date_prefix = ""
    if date:
        m = _re_module.search(r'(\w+)\s+(\d+),\s*\d{4}', date)
        if m:
            months = {'Jan':'01','Feb':'02','Mar':'03','Apr':'04','May':'05','Jun':'06',
                      'Jul':'07','Aug':'08','Sep':'09','Oct':'10','Nov':'11','Dec':'12'}
            mo = months.get(m.group(1)[:3], '??')
            day = m.group(2).zfill(2)
            date_prefix = f'{mo}/{day} - '

    base = name.split(' — ')[0].strip()
    if base in _SHORT_LABELS:
        return date_prefix + _SHORT_LABELS[base]
    if 'Peter Marcus' in base:
        return date_prefix + 'Peter Marcus'
    if 'PNWORCA Winter Series' in base and '#' in base:
        n = base.rsplit('#', 1)[-1].split(':')[0].strip()
        return date_prefix + f'PNWORCA #{n}'
    if '#' in base:
        num = base.rsplit('#', 1)[-1].strip()
        # BEPC series: "BEPC 2025 Race Series #18" -> "Monday #18"
        if 'Race Series' in base or 'Monday' in base.lower():
            return date_prefix + f'Monday #{num.zfill(2)}'
        return date_prefix + f'#{num}'
    # Date-suffixed: "Salmon Bay Paddle Monday Race 20170501" -> use date_prefix only + "Monday"
    m = _re_module.search(r'20\d{2}(\d{2})(\d{2})$', base)
    if m:
        return f'{m.group(1)}/{m.group(2)} - Monday'
    # Strip "Sound Rowers: " prefix and year suffix
    base = _re_module.sub(r'^Sound Rowers:\s*', '', base)
    base = _re_module.sub(r'\s+\d{4}.*$', '', base).strip()
    for k, v in _SHORT_MAP.items():
        if k.lower() in base.lower():
            return date_prefix + v
    base = _re_module.sub(r'^(BEPC\s+)?\d{4}\s+', '', base)
    return date_prefix + base[:12]


def _race_slug(name: str, date: str, race_id) -> str:
    """Generate a URL slug for a race: YYYY-MM-DD-short-name."""
    import re as _re
    # Parse date to YYYY-MM-DD
    date_part = ""
    for fmt in ("%b %d, %Y", "%B %d, %Y"):
        try:
            from datetime import datetime
            d = datetime.strptime(date, fmt)
            date_part = d.strftime("%Y-%m-%d")
            break
        except ValueError:
            pass
    if not date_part:
        date_part = str(date)[:10]

    # Get short label (strip MM/DD - prefix, use just the name part)
    short = _short_label(name, date)
    # Remove the MM/DD - prefix that _short_label adds
    short = _re.sub(r'^\d{2}/\d{2} - ', '', short)
    # Slugify: lowercase, replace non-alphanumeric with hyphen, collapse hyphens
    slug = _re.sub(r'[^a-z0-9]+', '-', short.lower()).strip('-')
    return f"{date_part}-{slug}"


def _build_race_slugs(data: dict) -> dict:
    """Build {club_id: {race_id: slug}} mapping with collision detection."""
    result = {}
    for club_id, club in data["clubs"].items():
        slugs: dict[str, str] = {}  # slug -> race_id (for collision detection)
        id_to_slug: dict = {}
        for year, season in club["seasons"].items():
            seen_ids = []
            for race in season["races"]:
                rid = race["race_id"]
                if rid in seen_ids:
                    continue
                seen_ids.append(rid)
                base_name = race["name"].split(" — ")[0]
                slug = _race_slug(base_name, race["date"], rid)
                if slug in slugs:
                    # Collision — append race_id suffix
                    print(f"WARNING: slug collision '{slug}' for {rid} and {slugs[slug]} in {club_id}")
                    slug = f"{slug}-{str(rid).replace('/', '-')}"
                slugs[slug] = rid
                id_to_slug[rid] = slug
        result[club_id] = id_to_slug
    return result


def _build_traj_series(races: list, colors: list) -> tuple:
    """Build chart_pts, chart_hpts, chart_hnum dicts for a list of races."""
    racer_pts: dict[str, list] = {}
    racer_hpts: dict[str, list] = {}
    racer_hnum: dict[str, list] = {}
    race_labels = []

    for race in races:
        label = _short_label(race["name"], race.get("date", ""))
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
    for club_id in data["clubs"]:
        data["current_club"] = club_id
        club = data["clubs"][club_id]
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

        html = _head("Trajectories", _CHARTJS) + _nav("Trajectories", data=data, depth=1) + _selector_bar(data, page="trajectories") + f"""
<div class="container">
  <h1 class="mb-3">Trajectories</h1>
  <div id="traj-content">
  <ul class="nav nav-tabs mb-3" id="traj-tabs">
    <li class="nav-item"><button class="nav-link active" data-bs-toggle="tab" data-bs-target="#tab-pts">Overall Points</button></li>
    <li class="nav-item"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-hpts">Handicap Points</button></li>
    <li class="nav-item"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-hnum">Handicap Number</button></li>
  </ul>
  <div class="tab-content">
    <div class="tab-pane active" id="tab-pts">
      <p class="text-muted small">Overall season points over time. Click legend to toggle racers.</p>
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
    loadTrajSeason(ALL_SEASONS[yr] ? yr : d.current_year);
    window.addEventListener('hashchange', () => {{
      const y = location.hash.replace('#','');
      if (ALL_SEASONS[y]) {{ if (sel) sel.value = y; loadTrajSeason(y); }}
    }});
    if (sel) sel.addEventListener('change', e => loadTrajSeason(e.target.value));
  }});
}});
</script>""" + _foot()
        (SITE_DIR / club_id / "trajectories.html").write_text(html)
        print(f"Generated: site/{club_id}/trajectories.html")


def _fmt_time(seconds: float) -> str:
    s = int(seconds)
    m, s = divmod(s, 60)
    h, m = divmod(m, 60)
    return f"{h}:{m:02d}:{s:02d}" if h else f"{m}:{s:02d}"


def _racer_trophy_badges(trophies: list) -> str:
    """Render trophy badges for racer page race table (Python-side, not JS)."""
    icon_map = {
        "finish_1":    ("plain-medal",  "Overall 1st",        "finish_1"),
        "finish_2":    ("plain-medal",  "Overall 2nd",        "finish_2"),
        "finish_3":    ("plain-medal",  "Overall 3rd",        "finish_3"),
        "hcap_1":      ("hcap-gold",    "Handicap winner",    "hcap_1"),
        "hcap_2":      ("hcap-silver",  "Handicap 2nd",       "hcap_2"),
        "hcap_3":      ("hcap-bronze",  "Handicap 3rd",       "hcap_3"),
        "consistent_1":("hcap-consist", "Consistent performer (±1% of expectation)","consistent"),
        "consistent_2":("hcap-consist", "Consistent performer (±1% of expectation)","consistent"),
        "consistent_3":("hcap-consist", "Consistent performer (±1% of expectation)","consistent"),
        "par":         ("hcap-par",     "Par racer",          "par"),
        "fresh":       ("hcap-est",     "Establishing handicap — not yet eligible for handicap awards", "est"),
        "outlier":     ("hcap-outlier", "Outlier result — >10% off handicap prediction, handicap unchanged", "outlier"),
    }
    parts = []
    for t in trophies:
        if t.startswith('streak_'):
            n = t.split('_')[1]
            parts.append(f'<span class="hcap-medal hcap-streak" title="Improving streak: {n} races">{_streak_icon(n)}</span>')
        elif t in icon_map:
            cls, title, key = icon_map[t]
            parts.append(_icon_span(key, cls, title))
    return "".join(parts)


def generate_racer_pages(data: dict) -> None:
    global _valid_racer_slugs, _current_racer_club
    from collections import defaultdict

    current_club = data["current_club"]
    _current_racer_club = current_club

    # Per-club minimum races to generate a racer page
    MIN_RACER_PAGES = data["clubs"].get(current_club, {}).get("min_races_for_page", 1)

    # Remove stale racer pages for this club before regenerating
    racer_club_dir = SITE_DIR / current_club / "racer"
    racer_club_dir.mkdir(parents=True, exist_ok=True)
    for stale in racer_club_dir.glob("*.html"):
        if stale.name != "index.html":
            stale.unlink()
    _valid_racer_slugs = set()

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

    # Filter by minimum races across all seasons for current club
    current_club = data["current_club"]
    min_races = MIN_RACER_PAGES  # always filter to current club racers

    def total_races_in_club(name):
        return sum(
            len(results)
            for (club, year, craft), results in racer_data[name].items()
            if club == current_club
        )
    racer_data = {n: v for n, v in racer_data.items() if total_races_in_club(n) >= min_races}

    # Order by best official season points in current club/season
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

        # Only include current club's data — other clubs have their own racer pages
        by_club: dict[str, dict[str, dict[str, list]]] = {}
        for (club_id, year, craft), results in sorted(keys.items()):
            if club_id != current_club:
                continue
            by_club.setdefault(club_id, {}).setdefault(year, {})[craft] = results

        all_charts_js = ""
        body_html = ""

        # Personal stats summary (feature #2)
        club_results = by_club.get(current_club, {})
        all_results = [r for year_crafts in club_results.values() for results in year_crafts.values() for r in results]
        if all_results:
            total_races = len(all_results)
            best_hcap = min((r["handicap_post"] for r in all_results if r["handicap_post"] > 0), default=None)
            current_hcap = all_results[-1]["handicap_post"] if all_results else None
            best_finish = min((r["adjusted_place"] for r in all_results), default=None)
            wins = sum(1 for r in all_results if "hcap_1" in r.get("trophies", []))
            podiums = sum(1 for r in all_results if any(t in r.get("trophies", []) for t in ["hcap_1","hcap_2","hcap_3"]))
            stats_html = f"""<div class="d-flex flex-wrap gap-3 mb-3 p-3 bg-light rounded">
  <div class="text-center"><div class="fw-bold fs-5">{total_races}</div><div class="text-muted small">Races</div></div>
  <div class="text-center"><div class="fw-bold fs-5">{wins}</div><div class="text-muted small">Wins</div></div>
  <div class="text-center"><div class="fw-bold fs-5">{podiums}</div><div class="text-muted small">Podiums</div></div>
  {f'<div class="text-center"><div class="fw-bold fs-5">{best_hcap:.3f}</div><div class="text-muted small">Best Handicap</div></div>' if best_hcap else ''}
  {f'<div class="text-center"><div class="fw-bold fs-5">{current_hcap:.3f}</div><div class="text-muted small">Current Handicap</div></div>' if current_hcap else ''}
</div>"""
        else:
            stats_html = ""

        racer_clubs = list(by_club.keys())  # clubs this racer has data for

        for club_id, years in sorted(by_club.items()):
            for year, crafts in sorted(years.items()):
                body_html += f'<div data-season="{year}" style="display:none">'

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
                    race_labels = [_short_label(r["name"], r.get("date", "")) for r in results]
                    pts_data = [r["season_points"] for r in results]
                    hpts_data = [r["season_handicap_points"] for r in results]
                    hcap_data = [round(r["handicap_post"], 4) for r in results]

                    all_charts_js += f"""
new Chart(document.getElementById('chart-pts-{cid}'), {{
  type:'line',data:{{labels:{json.dumps(race_labels)},datasets:[
    {{label:'Overall Pts',data:{json.dumps(pts_data)},borderColor:'#4363d8',backgroundColor:'#4363d8',tension:0.3,pointRadius:4}},
    {{label:'Handicap Pts',data:{json.dumps(hpts_data)},borderColor:'#e6194b',backgroundColor:'#e6194b',tension:0.3,pointRadius:4}}
  ]}},options:{{responsive:true,plugins:{{legend:{{position:'top'}}}},scales:{{y:{{title:{{display:true,text:'Points'}}}}}}}}
}});
new Chart(document.getElementById('chart-hcap-{cid}'), {{
  type:'line',data:{{labels:{json.dumps(race_labels)},datasets:[
    {{label:'Handicap',data:{json.dumps(hcap_data)},borderColor:'#3cb44b',backgroundColor:'#3cb44b',tension:0.3,pointRadius:4}}
  ]}},options:{{responsive:true,plugins:{{legend:{{position:'top'}}}},scales:{{y:{{title:{{display:true,text:'Handicap Factor'}}}}}}}}
}});"""

                    rows = "".join(
                        f'<tr><td><a href="../results/{data["race_slugs"].get(data["current_club"], {}).get(r["race_id"], str(r["race_id"]))}.html">{r["name"].split(" — ")[0]}</a></td>'
                        f'<td class="text-muted small text-nowrap">{r["date"]}</td>'
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
  <thead><tr><th></th><th>Race</th><th>Date</th><th>Place</th><th>Adj</th><th>Time</th><th>Adj Time</th><th>Hcap</th><th>New</th><th>Pts</th><th>HPts</th></tr></thead>
  <tbody>{"".join(
      f'<tr><td style="white-space:nowrap">{_racer_trophy_badges(r.get("trophies",[]))}</td>'
      f'<td><a href="../results/{data["race_slugs"].get(data["current_club"], {}).get(r["race_id"], str(r["race_id"]))}.html">{r["name"].split(" — ")[0]}</a></td>'
      f'<td class="text-muted small text-nowrap">{r["date"]}</td>'
      f'<td>{r["original_place"]}</td><td>{r["adjusted_place"]}</td>'
      f'<td>{_fmt_time(r["time_seconds"])}</td><td>{_fmt_time(r["adjusted_time_seconds"])}</td>'
      f'<td>{r["handicap"]:.3f}</td><td>{r["handicap_post"]:.3f}</td>'
      f'<td>{r["race_points"]}</td><td>{r["handicap_points"]}</td></tr>'
      for r in results
  )}</tbody>
</table>{cw_close}"""

                craft_content += "</div>"  # close tab-content div

                # "Also raced" — racers who appeared in ≥2 same races this season (feature #3)
                season_races = data["clubs"][current_club]["seasons"].get(year, {}).get("races", [])
                racer_race_ids = {race["race_id"] for race in season_races for r in race["results"] if r["canonical_name"] == name}
                co_racers: dict[str, int] = {}
                for race in season_races:
                    if race["race_id"] in racer_race_ids:
                        for r in race["results"]:
                            n = r["canonical_name"]
                            if n != name:
                                co_racers[n] = co_racers.get(n, 0) + 1
                frequent = sorted([(n, c) for n, c in co_racers.items() if c >= 2], key=lambda x: -x[1])[:12]
                if frequent:
                    also_links = " ".join(
                        f'<a href="{_slug(n)}.html" class="badge bg-light text-dark border text-decoration-none">{n}</a>'
                        for n, _ in frequent
                    )
                    craft_content += f'<div class="mt-3 pt-2 border-top"><span class="text-muted small fw-semibold">Also raced this season: </span>{also_links}</div>'

                body_html += f"{craft_tabs}{craft_content}</div>"  # close data-season div

        season_tab_js = f"""<script>
(function() {{
  var club = '{current_club}';
  localStorage.setItem('pc_club', club);
  var availYears = {list(sorted(by_club[current_club].keys(), reverse=True))};
  var storedSeason = localStorage.getItem('pc_year');
  var season = (storedSeason && availYears.indexOf(storedSeason) >= 0) ? storedSeason : availYears[0];
  localStorage.setItem('pc_year', season);

  function showSeason(s) {{
    document.querySelectorAll('[data-season]').forEach(function(el) {{
      el.style.display = el.dataset.season === s ? '' : 'none';
    }});
  }}

  showSeason(season);

  var sel = document.getElementById('season-select');
  if (sel) {{
    sel.innerHTML = availYears.map(function(y) {{
      return '<option value="' + y + '"' + (y === season ? ' selected' : '') + '>' + y + ' Season</option>';
    }}).join('');
    sel.addEventListener('change', function() {{
      var yr = this.value;
      localStorage.setItem('pc_year', yr);
      showSeason(yr);
    }});
  }}

  // Restore saved craft tab
  var savedCraft = localStorage.getItem('pc_craft');
  if (savedCraft) {{
    var craftBtn = document.querySelector('[data-bs-target="#' + savedCraft + '"]');
    if (craftBtn) bootstrap.Tab.getOrCreateInstance(craftBtn).show();
  }}
  document.querySelectorAll('[data-bs-target^="#c-"]').forEach(function(btn) {{
    btn.addEventListener('shown.bs.tab', function() {{
      localStorage.setItem('pc_craft', btn.getAttribute('data-bs-target').substring(1));
    }});
  }});
  document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(function(el) {{
    bootstrap.Tooltip.getOrCreateInstance(el);
  }});
}})();
</script>"""

        html = _head(name, _CHARTJS) + _nav("Racers", data=data, depth=2) + f"""
<div class="bg-light border-bottom mb-4">
  <div class="container py-2">
    <div class="d-flex flex-wrap align-items-center gap-3">
      <div class="d-flex align-items-center gap-2">
        <span class="text-muted small fw-semibold">Club</span>
        <div class="btn-group flex-wrap" id="club-nav"></div>
      </div>
      <div class="d-flex align-items-center gap-2">
        <span class="text-muted small fw-semibold">Season</span>
        <select id="season-select" class="form-select form-select-sm" style="min-width:110px"></select>
      </div>
    </div>
  </div>
</div>
<div class="container">
  {racer_nav}
  <h2>{name}</h2>
  {stats_html}
  {body_html}
</div>
<script>{all_charts_js}</script>
{nav_js}
{season_tab_js}""" + _foot()

        (racer_club_dir / f"{slug}.html").write_text(html)
        _valid_racer_slugs.add(slug)

    print(f"Generated: site/{current_club}/racer/ ({len(racer_data)} pages)")


def generate_about(data: dict = None) -> None:
    html = _head("About — PaddleClub") + _nav("About", data=data, depth=0) + """
<div class="container" style="max-width:720px">
  <h1>About PaddleClub</h1>
  <p class="lead">Race results, standings, and handicap tracking for open-water paddling clubs and community leagues in the Pacific Northwest.</p>

  <h2>What's here</h2>
  <p>PaddleClub covers four clubs and leagues:</p>
  <ul>
    <li><strong>BEPC</strong> — Ballard Elks Paddle Club Monday night race series, Seattle (2015–present)</li>
    <li><strong>Sound Rowers</strong> — Washington State open-water racing series (2022–present)</li>
    <li><strong>PNW League</strong> — An informal community league tracking regional events: PNWORCA, Gorge Downwind, Peter Marcus, Narrows Challenge, and all Sound Rowers events (2017–present)</li>
    <li><strong>SCKC</strong> — Seattle Canoe and Kayak Club Duck Island Race series, Lake Washington (2015–present)</li>
  </ul>
  <p>Craft covered includes surfski, outrigger canoe (OC-1, OC-2), kayak, canoe, SUP, and prone paddleboard.</p>

  <h2>How to use this site</h2>
  <ul>
    <li>Use the <strong>Club</strong> buttons to switch between clubs. The <strong>Season</strong> dropdown filters by year.</li>
    <li><strong>Races</strong> — browse all races for a club/season, click any race to see full results and podium.</li>
    <li><strong>Standings</strong> — season points leaderboard, sortable by handicap or overall points.</li>
    <li><strong>Trajectories</strong> — charts showing how points and handicap evolved over the season.</li>
    <li><strong>Racers</strong> — find any racer, see their history across seasons and clubs.</li>
  </ul>
  <p>Racer pages show results per craft type (e.g. surfski and OC-1 are tracked separately). Use the craft tabs to switch.</p>

  <h2>The handicap system</h2>

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
  <p><strong>Overall points</strong> are awarded for finishing position (10 pts for 1st, 9 for 2nd … 1 pt for 10th).</p>
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
    current_club = _current_racer_club
    # Only list racers that have a page in the current club
    racer_club_dir = SITE_DIR / current_club / "racer"
    valid_slugs = {p.stem for p in racer_club_dir.glob("*.html") if p.name != "index.html"}

    racer_data: dict[str, dict] = defaultdict(dict)
    for year, season in data["clubs"][current_club]["seasons"].items():
        for race in season["races"]:
            for r in race["results"]:
                key = r["canonical_name"]
                if _slug(key) in valid_slugs:
                    if not racer_data[key] or r["num_races"] > racer_data[key].get("num_races", 0):
                        racer_data[key] = r

    rows = ""
    for name in sorted(racer_data.keys()):
        r = racer_data[name]
        rows += f'<tr><td><a href="{_slug(name)}.html">{name}</a></td><td>{display_craft_ui(r["craft_category"])}</td></tr>\n'

    html = _head("Racers") + _nav("Racers", data=data, depth=2) + _selector_bar(data, show_season=False, page="racer/index") + f"""
<div class="container">
  <h1>Racers</h1>
  <table id="racer-index" class="table table-striped table-hover">
    <thead><tr><th>Name</th><th>Craft</th></tr></thead>
    <tbody>{rows}</tbody>
  </table>
</div>""" + _foot(_datatable_init("racer-index", 0, "asc"))
    out = SITE_DIR / _current_racer_club / "racer" / "index.html"
    out.write_text(html)
    print(f"Generated: site/{_current_racer_club}/racer/index.html")


def generate_platform_home(data: dict) -> None:
    """Generate the PaddleClub platform home page with club list and recent race feed."""
    import yaml, json as _json
    clubs_config_path = Path(__file__).parent.parent / "data" / "clubs.yaml"
    clubs_cfg = {}
    if clubs_config_path.exists():
        with open(clubs_config_path) as f:
            clubs_cfg = yaml.safe_load(f).get("clubs", {})

    # Build racer search map: [{name, slug, clubs: [club_id,...]}]
    racer_clubs: dict[str, set] = {}
    for club_id, club in data["clubs"].items():
        racer_dir = SITE_DIR / club_id / "racer"
        for page in racer_dir.glob("*.html"):
            if page.name == "index.html": continue
            # Find canonical name from data
            for year, season in club["seasons"].items():
                for race in season["races"]:
                    for r in race["results"]:
                        if _slug(r["canonical_name"]) == page.stem:
                            racer_clubs.setdefault(r["canonical_name"], set()).add(club_id)
    racer_search_map = _json.dumps([
        {"name": name, "slug": _slug(name), "clubs": sorted(clubs)}
        for name, clubs in sorted(racer_clubs.items())
    ])
    race_map = {}  # (base_name, date) -> entry
    for club_id, club in data["clubs"].items():
        cfg = clubs_cfg.get(club_id, {})
        club_name = cfg.get("short_name", club.get("name", club_id))
        club_type = cfg.get("type", "org")
        for year, season in club["seasons"].items():
            for race in season["races"]:
                base_name = race["name"].split(" — ")[0]
                key = (base_name, race["date"])
                if key not in race_map:
                    race_map[key] = {
                        "name": base_name,
                        "date": race["date"],
                        "starters": len(race["results"]),
                        "clubs": [],
                    }
                else:
                    race_map[key]["starters"] = max(race_map[key]["starters"], len(race["results"]))
                # Find winner for this club/course
                winners = [r["canonical_name"] for r in race["results"]
                           if "hcap_1" in r.get("trophies", [])]
                course_label = race["name"].split(" — ")[1] if " — " in race["name"] else None
                entry = race_map[key]
                existing = next((c for c in entry["clubs"] if c["id"] == club_id), None)
                if existing is None:
                    existing = {
                        "id": club_id,
                        "name": club_name,
                        "type": club_type,
                        "winners": [],
                        "race_id": race["race_id"],
                    }
                    entry["clubs"].append(existing)
                if winners:
                    existing["winners"].append((course_label, winners[0]))

    from datetime import datetime
    def _parse_date(d):
        for fmt in ("%b %d, %Y", "%B %d, %Y", "%Y-%m-%d"):
            try: return datetime.strptime(d, fmt)
            except: pass
        return datetime.min

    recent_races = sorted(race_map.values(), key=lambda x: _parse_date(x["date"]), reverse=True)[:15]

    # Club cards
    club_cards = ""
    for club_id, club in data["clubs"].items():
        cfg = clubs_cfg.get(club_id, {})
        name = cfg.get("name", club.get("name", club_id))
        short = cfg.get("short_name", name)
        ctype = cfg.get("type", "org")
        desc = cfg.get("description", "").strip()
        latest_year = max(club["seasons"].keys())
        earliest_year = min(club["seasons"].keys())
        year_range = earliest_year if earliest_year == latest_year else f"{earliest_year}–{latest_year}"
        total_races = sum(len(s["races"]) for s in club["seasons"].values())
        total_racers = len({r["canonical_name"] for s in club["seasons"].values()
                            for race in s["races"] for r in race["results"]})
        type_badge = '<span class="badge bg-secondary">Community League</span>' if ctype == "league" else '<span class="badge bg-primary">Club</span>'
        club_cards += f"""
        <div class="col-12 col-md-4 mb-4">
          <div class="card h-100">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start mb-2">
                <h5 class="card-title mb-0">{name}</h5>
                {type_badge}
              </div>
              <p class="card-text text-muted small">{desc}</p>
              <div class="small text-muted mb-3">{total_races} races · {total_racers} racers · {year_range}</div>
              <a href="{club_id}/races.html" onclick="localStorage.setItem('pc_club','{club_id}')" class="btn btn-outline-primary btn-sm">View Races →</a>
            </div>
          </div>
        </div>"""

    # Recent races feed
    feed_rows = ""
    for r in recent_races:
        club_links_html = ""
        winners_html = ""
        for c in r["clubs"]:
            slug = data.get("race_slugs", {}).get(c["id"], {}).get(c["race_id"], str(c["race_id"]))
            race_link = f'{c["id"]}/results/{slug}.html'
            cls = "text-secondary" if c["type"] == "league" else ""
            club_links_html += f'<a href="{race_link}" onclick="localStorage.setItem(\'pc_club\',\'{c["id"]}\')" class="badge bg-light text-dark border me-1 small fw-normal {cls}">{c["name"]} ↗</a>'
            winners = c.get("winners", [])
            if not winners:
                winner_line = '<span class="text-muted">—</span>'
            elif len(winners) == 1 or all(w[0] is None for w in winners):
                # Single course or no labels — just show name
                winner_line = _racer_link(winners[0][1])
            else:
                # Multiple courses — show label: name for each
                parts = []
                for label, name in winners:
                    if label:
                        m = __import__('re').search(r'(\d+(?:\.\d+)?)\s*(?:mi|mile|km)', label, __import__('re').I)
                        unit = 'km' if m and 'km' in m.group(0).lower() else 'mi'
                        short = f"{m.group(1)}{unit}" if m else label.split()[0]
                    else:
                        short = ""
                    parts.append(f'<span class="text-muted small">{short}:</span> {_racer_link(name)}')
                winner_line = " · ".join(parts)
            winners_html += f'<div class="small"><span class="text-muted">{c["name"]}:</span> {winner_line}</div>'
        feed_rows += f"""
        <tr>
          <td class="text-muted small text-nowrap">{r["date"]}</td>
          <td><span class="fw-semibold me-2">{r["name"]}</span>{club_links_html}</td>
          <td class="text-muted small text-center">{r["starters"]}</td>
          <td>{winners_html}</td>
        </tr>"""

    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>PaddleClub — Handicap Racing</title>
{_BOOTSTRAP_CSS}
{_BOOTSTRAP_JS}
<style>
  body {{ padding-top: 1rem; }}
  .navbar-brand {{ font-weight: bold; font-size: 1.3em; }}
  .hero {{ background: #1a1a2e; color: white; padding: 3rem 0 2rem; margin-bottom: 2rem; }}
  .hero h1 {{ font-size: 2.5rem; font-weight: 700; }}
  .hero p {{ font-size: 1.1rem; opacity: 0.85; }}
  #racer-results {{ max-height: 260px; overflow-y: auto; }}
</style>
</head>
<body>
{_nav("Home", data=data, depth=0)}

<div class="hero">
  <div class="container">
    <h1>PaddleClub</h1>
    <p>Handicap racing results, standings, and trajectories for paddling clubs and community leagues.</p>
    <div class="row justify-content-center mt-3">
      <div class="col-12 col-md-6 position-relative">
        <input id="racer-search" type="text" class="form-control form-control-lg"
               placeholder="Find a racer..." autocomplete="off"
               style="background:rgba(255,255,255,0.15);border:1px solid rgba(255,255,255,0.4);color:white;">
        <div id="racer-results" class="list-group position-absolute w-100 shadow" style="z-index:100;display:none"></div>
      </div>
    </div>
  </div>
</div>

<div class="container">
  <h2 class="h4 mb-3">Clubs &amp; Leagues</h2>
  <div class="row">{club_cards}</div>

  <h2 class="h4 mb-3 mt-2">Recent Races</h2>
  <div class="table-responsive">
    <table class="table table-sm table-striped">
      <thead><tr><th>Date</th><th>Race</th><th class="text-center">Starters</th><th>Handicap Winner (by club)</th></tr></thead>
      <tbody>{feed_rows}</tbody>
    </table>
  </div>
</div>
<script>
(function() {{
  var RACERS = {racer_search_map};
  var CLUB_NAMES = {_json.dumps({cid: clubs_cfg.get(cid, {}).get('short_name', cid) for cid in data['clubs']})};
  var inp = document.getElementById('racer-search');
  var res = document.getElementById('racer-results');
  inp.addEventListener('input', function() {{
    var q = this.value.trim().toLowerCase();
    res.innerHTML = '';
    if (q.length < 2) {{ res.style.display = 'none'; return; }}
    var matches = RACERS.filter(function(r) {{ return r.name.toLowerCase().includes(q); }}).slice(0, 10);
    if (!matches.length) {{ res.style.display = 'none'; return; }}
    matches.forEach(function(r) {{
      var badges = r.clubs.map(function(c) {{
        return '<a href="' + c + '/racer/' + r.slug + '.html" class="badge bg-secondary text-decoration-none me-1">' + (CLUB_NAMES[c] || c) + '</a>';
      }}).join('');
      var item = document.createElement('div');
      item.className = 'list-group-item list-group-item-action d-flex justify-content-between align-items-center';
      item.innerHTML = '<span>' + r.name + '</span><span>' + badges + '</span>';
      res.appendChild(item);
    }});
    res.style.display = 'block';
  }});
  document.addEventListener('click', function(e) {{
    if (!inp.contains(e.target) && !res.contains(e.target)) res.style.display = 'none';
  }});
  inp.addEventListener('keydown', function(e) {{
    if (e.key === 'Escape') res.style.display = 'none';
  }});
}})();
</script>
</body>
</html>"""

    (SITE_DIR / "index.html").write_text(html)
    print("Generated: site/index.html")


def generate_races_list(data: dict) -> None:
    """Generate per-club races-{club}.html + races-list-{club}.json data files."""
    import json as _json
    from collections import defaultdict

    # Write per-club JSON data files
    for club_id, club in data["clubs"].items():
        seasons_data = {}
        for year, season in club["seasons"].items():
            days: dict = defaultdict(list)
            for race in season["races"]:
                days[race["race_id"]].append(race)
            from datetime import datetime
            def _parse_date(d):
                for fmt in ("%b %d, %Y", "%B %d, %Y"):
                    try: return datetime.strptime(d, fmt)
                    except: pass
                return datetime.min

            race_list = []
            for race_id, courses in sorted(days.items(), key=lambda x: _parse_date(x[1][0]["date"])):
                base_name = courses[0]["name"].split(" — ")[0]
                multi = len(courses) > 1
                courses_data = []
                for c in courses:
                    label = c["name"].split(" — ")[-1] if " — " in c["name"] else ""
                    winners = {}
                    for r in c["results"]:
                        for place, trophy in [(1,"hcap_1"),(2,"hcap_2"),(3,"hcap_3")]:
                            if trophy in r.get("trophies", []):
                                winners[place] = {"name": r["canonical_name"], "slug": _slug(r["canonical_name"])}
                    courses_data.append({"label": label if multi else "", "starters": len(c["results"]), "winners": winners})
                race_list.append({
                    "race_id": race_id,
                    "name": base_name,
                    "date": courses[0]["date"],
                    "starters": sum(len(c["results"]) for c in courses),
                    "courses": courses_data,
                })
            seasons_data[year] = race_list
        (SITE_DIR / club_id / "races-list.json").write_text(_json.dumps({"seasons": seasons_data, "current": club["current_season"]}))

    # Generate per-club HTML pages
    for club_id in data["clubs"]:
        data["current_club"] = club_id
        import json as _json2
        slug_map_js = "const raceSlugMap = " + _json2.dumps(data.get("race_slugs", {}).get(club_id, {})) + ";"

        # Cup SVGs as JS strings
        cup_js = """
const CUP = {
  1: '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M4 3 Q4 15 12 15 Q20 15 20 3 Z" fill="#FFD700" stroke="#B8860B" stroke-width="1.5"/><path d="M4 5 Q0 5 0 9 Q0 13 4 12" fill="none" stroke="#B8860B" stroke-width="1.3"/><path d="M20 5 Q24 5 24 9 Q24 13 20 12" fill="none" stroke="#B8860B" stroke-width="1.3"/><rect x="11" y="15" width="2" height="3" fill="#B8860B"/><rect x="7" y="18" width="10" height="1.5" rx="0.75" fill="#B8860B"/></svg>',
  2: '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M4 3 Q4 15 12 15 Q20 15 20 3 Z" fill="#C0C0C0" stroke="#707070" stroke-width="1.5"/><path d="M4 5 Q0 5 0 9 Q0 13 4 12" fill="none" stroke="#707070" stroke-width="1.3"/><path d="M20 5 Q24 5 24 9 Q24 13 20 12" fill="none" stroke="#707070" stroke-width="1.3"/><rect x="11" y="15" width="2" height="3" fill="#707070"/><rect x="7" y="18" width="10" height="1.5" rx="0.75" fill="#707070"/></svg>',
  3: '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M4 3 Q4 15 12 15 Q20 15 20 3 Z" fill="#DDA84A" stroke="#B07020" stroke-width="1.5"/><path d="M4 5 Q0 5 0 9 Q0 13 4 12" fill="none" stroke="#B07020" stroke-width="1.3"/><path d="M20 5 Q24 5 24 9 Q24 13 20 12" fill="none" stroke="#B07020" stroke-width="1.3"/><rect x="11" y="15" width="2" height="3" fill="#B07020"/><rect x="7" y="18" width="10" height="1.5" rx="0.75" fill="#B07020"/></svg>',
};
        """

        html = _head("Races") + _nav("Races", data=data, depth=1) + _selector_bar(data, page="races") + f"""
<div class="container">
  <h1 class="mb-3">Races</h1>
  <div id="races-content"></div>
</div>
<script>
{_racer_slugs_js()}
{slug_map_js}
{cup_js}
function podiumHtml(course) {{
  var w = course.winners;
  if (!w || Object.keys(w).length === 0) return '';
  var rows = '';
  [1,2,3].forEach(function(p) {{
    if (w[p]) {{
      var nameHtml = RACER_SLUGS.has(w[p].slug)
        ? '<a href="racer/' + w[p].slug + '.html" class="small text-truncate" style="max-width:130px">' + w[p].name + '</a>'
        : '<span class="small text-truncate" style="max-width:130px">' + w[p].name + '</span>';
      rows += '<div class="d-flex align-items-center gap-1 text-nowrap">' + CUP[p] + nameHtml + '</div>';
    }}
  }});
  var lbl = course.label ? '<div class="text-muted small fw-semibold mb-1">' + course.label + '</div>' : '';
  return '<div class="me-3">' + lbl + rows + '</div>';
}}

function renderRacesList(d, year) {{
  var races = (d.seasons[year] || []).slice().reverse();  // newest first
  var rows = races.map(function(r) {{
    var podiums = r.courses.map(podiumHtml).join('');
    return '<tr><td class="text-muted small text-nowrap">' + r.date + '</td>'
      + '<td><a href="results/' + (raceSlugMap[r.race_id] || r.race_id) + '.html">' + r.name + '</a></td>'
      + '<td class="text-muted small text-center">' + r.starters + '</td>'
      + '<td><div class="d-flex flex-wrap">' + podiums + '</div></td></tr>';
  }}).join('');
  document.getElementById('races-content').innerHTML =
    '<div class="table-responsive"><table class="table table-sm table-striped">'
    + '<thead><tr><th>Date</th><th>Race</th><th class="text-center">Starters</th><th>Handicap Podium</th></tr></thead>'
    + '<tbody>' + rows + '</tbody></table></div>';
}}

var _racesData = null;
document.addEventListener('DOMContentLoaded', function() {{
  fetchData('races-list.json', function(d) {{
    _racesData = d;
    var yr = getSeason(d.current);
    var sel = document.getElementById('season-select');
    if (sel) sel.value = yr;
    renderRacesList(d, yr);
    window.addEventListener('hashchange', function() {{
      var y = location.hash.replace('#','');
      if (d.seasons[y]) {{ if (sel) sel.value = y; renderRacesList(d, y); }}
    }});
    if (sel) sel.addEventListener('change', function() {{ renderRacesList(d, this.value); }});
  }});
}});
</script>""" + _foot()
        (SITE_DIR / club_id / "races.html").write_text(html)
        print(f"Generated: site/{club_id}/races.html")


def generate_cross_club_links() -> None:
    """Post-processing: inject correct club nav buttons into racer page placeholders."""
    import yaml
    cfg_path = Path(__file__).parent.parent / "data" / "clubs.yaml"
    clubs_cfg = {}
    if cfg_path.exists():
        with open(cfg_path) as f:
            clubs_cfg = yaml.safe_load(f).get("clubs", {})

    # Build {slug: [club_id, ...]} from site/{club}/racer/*.html
    slug_clubs: dict[str, list] = {}
    for club_dir in sorted(SITE_DIR.iterdir()):
        if not club_dir.is_dir():
            continue
        racer_dir = club_dir / "racer"
        if not racer_dir.exists():
            continue
        for page in racer_dir.glob("*.html"):
            if page.name == "index.html":
                continue
            slug_clubs.setdefault(page.stem, []).append(club_dir.name)

    # Inject club nav into every racer page
    for slug, clubs in slug_clubs.items():
        for club_id in clubs:
            page = SITE_DIR / club_id / "racer" / f"{slug}.html"
            html = page.read_text()
            # Build buttons — active for current club, links for others
            btns = ""
            for cid in sorted(slug_clubs.get(slug, [])):
                short = clubs_cfg.get(cid, {}).get("short_name", cid)
                active = " active" if cid == club_id else ""
                if cid == club_id:
                    btns += f'<a class="btn btn-sm btn-outline-secondary{active}" href="{slug}.html">{short}</a>\n'
                else:
                    btns += f'<a class="btn btn-sm btn-outline-secondary{active}" href="../../{cid}/racer/{slug}.html">{short}</a>\n'
            html = html.replace('<div class="btn-group flex-wrap" id="club-nav"></div>',
                                f'<div class="btn-group flex-wrap" id="club-nav">{btns}</div>')
            page.write_text(html)

    multi = sum(1 for clubs in slug_clubs.values() if len(clubs) > 1)
    print(f"Cross-club links: {multi} racers linked across clubs")


def generate_all(data: dict) -> None:
    global _current_racer_club
    SITE_DIR.mkdir(exist_ok=True)
    # Build race slugs before any generator (racer pages need them)
    data["race_slugs"] = _build_race_slugs(data)
    # Create per-club subdirs
    for club_id in data["clubs"]:
        (SITE_DIR / club_id / "racer").mkdir(parents=True, exist_ok=True)
        (SITE_DIR / club_id / "results").mkdir(parents=True, exist_ok=True)
    # Generate racer pages for all clubs
    original_club = data["current_club"]
    for club_id in data["clubs"]:
        data["current_club"] = club_id
        generate_racer_pages(data)
        generate_racer_index(data)
    data["current_club"] = original_club
    _current_racer_club = original_club
    for club_id in data["clubs"]:
        data["current_club"] = club_id
        generate_data_files(data)
    data["current_club"] = original_club
    generate_races(data)
    data["current_club"] = original_club
    generate_races_list(data)
    data["current_club"] = original_club
    generate_trajectories(data)
    data["current_club"] = original_club
    generate_about(data)
    generate_platform_home(data)
    generate_cross_club_links()
