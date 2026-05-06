"""Generate static HTML pages from site/data.json."""
import json
import re as _re_module
from pathlib import Path
from bepc.craft import display_craft_ui
from bepc.ui_text import (
    RESULTS_COLUMNS, RESULTS_COLUMN_STYLES,
    TROPHIES, TROPHY_ORDER, PLACE_MUTE_REASONS, STREAK_TROPHY,
    RESULTS_TOOLTIPS, RESULTS_FILTER, RACER_STATS_LABELS,
    SELECTOR_PLACEHOLDERS, SEARCH,
    HOME_PAGE, STANDINGS_PAGE,
    RACER_PAGE_COLUMNS_EXTRA, RACER_PAGE_COLUMN_ORDER,
)

SITE_DIR = Path(__file__).parent.parent / "site"
_LINK_ORDER = ['Info', 'Schedule', 'Register', 'Start List', 'Series']

# CDN links
_BOOTSTRAP_CSS = '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">'
_DATATABLES_CSS = '<link rel="stylesheet" href="https://cdn.datatables.net/2.0.8/css/dataTables.bootstrap5.min.css">'
_BOOTSTRAP_JS = '<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>'
_JQUERY = '<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>'
_DATATABLES_JS = '<script src="https://cdn.datatables.net/2.0.8/js/dataTables.min.js"></script>'
_DATATABLES_BS5_JS = '<script src="https://cdn.datatables.net/2.0.8/js/dataTables.bootstrap5.min.js"></script>'
_CHARTJS = '<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.4/dist/chart.umd.min.js"></script>'
_RACER_SEARCH_MAP = "[]"  # populated by _build_search_map
_SLUG_CLUBS: dict[str, list] = {}  # slug -> [club_ids], populated by _build_search_map

# Shared JS for badge rendering — used in both per-race pages and racer pages.
# Built from TROPHIES + TROPHY_ORDER + _ICONS so Python and JS stay in sync.
def _BADGES_JS_LAZY() -> str:
    """Serialize _ICONS + TROPHIES + TROPHY_ORDER into the runtime JS badges() function."""
    icons_js = json.dumps({k: v for k, v in _ICONS.items()})
    # render map: {trophy_key: [icon_key, css, tooltip]}
    # consistent_1/2/3 all use icon "consistent" and css "hcap-consist" — but their tooltip is shared.
    render_map = {
        key: [meta["icon"], meta["css"], meta["tooltip"]]
        for key, meta in TROPHIES.items()
    }
    render_js = json.dumps(render_map)
    order_js = json.dumps(TROPHY_ORDER)
    streak_css = STREAK_TROPHY["css"]
    streak_tooltip_template = STREAK_TROPHY["tooltip"]  # contains "{n}"
    return r"""
function badges(trophies) {
  const I = """ + icons_js + r""";
  const M = """ + render_js + r""";  // trophy_key -> [icon_key, css, tooltip]
  const b = (key, cls, title) => `<span class="hcap-medal ${cls}" data-bs-toggle="tooltip" data-bs-title="${title}">${I[key]}</span>`;
  const streakCss = """ + json.dumps(streak_css) + r""";
  const streakTooltip = (n) => """ + json.dumps(streak_tooltip_template) + r""".replace('{n}', n);
  const streak = (n) => `<span class="hcap-medal ${streakCss}" data-bs-toggle="tooltip" data-bs-title="${streakTooltip(n)}"><svg width="24" height="24" viewBox="0 0 24 24" style="display:block"><polygon points="14,2 7,13 12,13 10,22 17,11 12,11" fill="#FF9800" stroke="#E65100" stroke-width="0.8" stroke-linejoin="round"/><text x="22" y="9" text-anchor="end" font-size="9" font-weight="bold" fill="#E65100">${n}</text></svg></span>`;
  if (!trophies || !trophies.length) return '';
  const ORDER = """ + order_js + r""";
  const sorted = [...trophies].sort((a,b) => {
    const ai = a.startsWith('streak_') ? ORDER.length + parseInt(a.split('_')[1]) : ORDER.indexOf(a);
    const bi = b.startsWith('streak_') ? ORDER.length + parseInt(b.split('_')[1]) : ORDER.indexOf(b);
    return ai - bi;
  });
  return `<span style="display:flex;justify-content:center;gap:2px;flex-wrap:wrap">${sorted.map(t => {
    if (t.startsWith('streak_')) return streak(parseInt(t.split('_')[1]));
    const spec = M[t];
    if (!spec) return '';
    return b(spec[0], spec[1], spec[2]);
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
    "auto_reset": _svg('<g transform="translate(0 0) scale(1.5)" fill="#F57C00"><path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2z"/><path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466"/></g>'),
}

def _streak_icon(n):
    return _svg(f'<polygon points="14,2 7,13 12,13 10,22 17,11 12,11" fill="#FF9800" stroke="#E65100" stroke-width="0.8" stroke-linejoin="round"/><text x="22" y="9" text-anchor="end" font-size="9" font-weight="bold" fill="#E65100">{n}</text>')

def _icon_span(key, cls, tooltip, count=1):
    icon = _ICONS.get(key, "")
    if count > 1:
        badge = f'<span style="position:absolute;top:-4px;right:-4px;background:#555;color:#fff;border-radius:8px;font-size:0.6em;font-weight:bold;padding:1px 4px;line-height:1.4">{count}</span>'
        return f'<span class="hcap-medal {cls}" data-bs-toggle="tooltip" data-bs-title="{tooltip}" style="white-space:nowrap;position:relative;padding-right:6px">{icon}{badge}</span>'
    return f'<span class="hcap-medal {cls}" data-bs-toggle="tooltip" data-bs-title="{tooltip}">{icon}</span>'


# Small SVG icons used in column headers. Substituted into RESULTS_COLUMNS long
# labels via {gold_cup} and {gold_flag} tokens. Size 18x18 to fit inline.
_HEADER_SVG = {
    "gold_cup":  '<span style="display:inline-block;vertical-align:middle"><svg width="18" height="18" viewBox="0 0 24 24" style="display:block"><path d="M4 3 Q4 15 12 15 Q20 15 20 3 Z" fill="#FFD700" stroke="#B8860B" stroke-width="1.8"/><path d="M4 5 Q0 5 0 9 Q0 13 4 12" fill="none" stroke="#B8860B" stroke-width="1.8"/><path d="M20 5 Q24 5 24 9 Q24 13 20 12" fill="none" stroke="#B8860B" stroke-width="1.8"/><rect x="11" y="15" width="2" height="3.5" fill="#B8860B"/><rect x="6" y="18.5" width="12" height="2.5" rx="1" fill="#B8860B"/></svg></span>',
    "gold_flag": '<span style="display:inline-block;vertical-align:middle"><svg width="18" height="18" viewBox="0 0 24 24" style="display:block"><rect x="4" y="1" width="2" height="22" rx="1" fill="#555"/><path d="M6 2 L21 9 L6 18 Z" fill="#FFD700" stroke="#9A7000" stroke-width="1.2"/></svg></span>',
}


def _render_th(key: str) -> str:
    """Render a <th> for a given RESULTS_COLUMNS key.

    Substitutes {gold_cup} and {gold_flag} tokens in the long label.
    Adds responsive show/hide classes for long vs short variants.
    """
    long_html, short_text, tooltip = RESULTS_COLUMNS[key]
    long_html = long_html.format_map(_HEADER_SVG)
    # Detect if long form has <br> — if so, wrap in inline-block nowrap to force 2 lines
    if "<br>" in long_html:
        # Separate SVG (if present) from text so the text stays on 2 lines while the
        # SVG sits inline before it. Heuristic: pull leading span tag if there is one.
        import re as _re
        m = _re.match(r'^(\s*<span[^>]*>.*?</span>\s*)(.*)$', long_html, flags=_re.DOTALL)
        if m:
            leading_icon, text_part = m.group(1), m.group(2)
        else:
            leading_icon, text_part = "", long_html
        long_span = (
            f'{leading_icon}<span class="d-none d-lg-inline-block"'
            f' style="vertical-align:middle;white-space:nowrap">{text_part}</span>'
        )
    else:
        # Single-line label — SVG token (if any) expands in place. Use inline-block
        # wrapper with vertical-align:middle so the SVG and text share a baseline.
        long_span = f'<span class="d-none d-lg-inline" style="vertical-align:middle">{long_html}</span>'
    short_span = f'<span class="d-lg-none">{short_text}</span>'
    style_attr = ""
    if key in RESULTS_COLUMN_STYLES:
        style_attr = f' style="{RESULTS_COLUMN_STYLES[key]}"'
    tooltip_attr = ""
    if tooltip:
        tooltip_attr = f' data-bs-toggle="tooltip" data-bs-title="{tooltip}"'
    # For columns with a style but no tooltip, we still need the th attrs in order.
    return f'<th{style_attr}{tooltip_attr}>{long_span}{short_span}</th>'


def _render_thead() -> str:
    """Build the full <thead> row for the race results table from RESULTS_COLUMNS."""
    ths = "".join(_render_th(k) for k in RESULTS_COLUMNS)
    return f'<thead class="text-nowrap"><tr>{ths}</tr></thead>'


def _racer_page_col(key: str) -> tuple:
    """Return (long, short, tooltip) for a racer-page column key.

    Falls back to RESULTS_COLUMNS for keys that aren't racer-page-specific,
    ensuring label consistency between the race results page and the racer
    page when the meaning is the same.
    """
    if key in RACER_PAGE_COLUMNS_EXTRA:
        return RACER_PAGE_COLUMNS_EXTRA[key]
    return RESULTS_COLUMNS[key]


def _render_racer_page_thead() -> str:
    """Build the racer-page race-history <thead> from RACER_PAGE_COLUMN_ORDER."""
    parts = []
    for key in RACER_PAGE_COLUMN_ORDER:
        long_html, short_text, tooltip = _racer_page_col(key)
        long_html = long_html.format_map(_HEADER_SVG)
        if "<br>" in long_html:
            import re as _re
            m = _re.match(r'^(\s*<span[^>]*>.*?</span>\s*)(.*)$', long_html, flags=_re.DOTALL)
            if m:
                leading_icon, text_part = m.group(1), m.group(2)
            else:
                leading_icon, text_part = "", long_html
            long_span = (f'{leading_icon}<span class="d-none d-lg-inline-block"'
                         f' style="vertical-align:middle;white-space:nowrap">{text_part}</span>')
        else:
            long_span = f'<span class="d-none d-lg-inline" style="vertical-align:middle">{long_html}</span>'
        short_span = f'<span class="d-lg-none">{short_text}</span>'
        tooltip_attr = f' data-bs-toggle="tooltip" data-bs-title="{tooltip.replace(chr(10), "&#10;") if tooltip else ""}"' if tooltip else ""
        parts.append(f'<th{tooltip_attr}>{long_span}{short_span}</th>')
    return f'<thead><tr>{"".join(parts)}</tr></thead>'


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
  .hcap-reset  {{ background:#FFE0B2; border:1px solid #F57C00; }}
  /* Muted place text for non-eligible (fresh/outlier/skipped) rows */
  .place-muted {{ color:#999; font-style:italic; }}
  /* Preserve explicit newlines (\n) in tooltip text */
  .tooltip-inner {{ white-space: pre-line; text-align: left; }}
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
            (f"{root}series.html", "Series"),
            (f"{club}/results.html", "Results", True),
            (f"{club}/standings.html", "Standings", True),
            (f"{club}/trajectories.html", "Trajectories", True),
            (f"{club}/racer/index.html", "Racers", True),
            (f"{root}how-it-works.html", "How it works"),
            (f"{root}about.html", "About"),
        ]
    else:
        pages = [
            (f"{root}index.html", "Home"),
            (f"{root}series.html", "Series"),
            (f"{club_prefix}results.html", "Results"),
            (f"{club_prefix}standings.html", "Standings"),
            (f"{club_prefix}trajectories.html", "Trajectories"),
            (f"{club_prefix}racer/index.html", "Racers"),
            (f"{root}how-it-works.html", "How it works"),
            (f"{root}about.html", "About"),
        ]

    items = ""
    for entry in pages:
        href, label = entry[0], entry[1]
        dynamic = len(entry) > 2 and entry[2]
        cls = "nav-link active" if label == active else "nav-link"
        if dynamic:
            dyn_path = "racer/index.html" if label == "Racers" else f"{label.lower()}.html"
            items += f'<li class="nav-item"><a class="{cls}" href="{href}" onclick="var c=localStorage.getItem(\'pc_club\')||\'{club}\'; this.href=c+\'/{dyn_path}\'">{label}</a></li>\n'
        else:
            items += f'<li class="nav-item"><a class="{cls}" href="{href}">{label}</a></li>\n'

    return f"""<nav class="navbar navbar-expand-md navbar-dark bg-dark mb-0">
  <div class="container-fluid px-2 px-sm-3">
    <a class="navbar-brand" href="{root}index.html"><img src="{root}logo.png" alt="PaddleRace" style="height:36px;margin-right:6px;vertical-align:middle">PaddleRace</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="nav">
      <ul class="navbar-nav me-auto">{items}</ul>
      <div class="position-relative ms-2" style="min-width:180px;max-width:280px">
        <input id="nav-search" type="text" class="form-control form-control-sm"
               placeholder="{SEARCH["placeholder"]}" autocomplete="off">
        <style>.ns-item{{display:flex;justify-content:space-between;align-items:center;padding:7px 12px;font-size:.82rem;color:#333;text-decoration:none;border-bottom:1px solid #f5f5f5}}.ns-item:hover{{background:#f0f4ff}}</style>
<div id="nav-search-results" class="position-absolute shadow"
             style="z-index:1050;display:none;min-width:320px;right:0;background:#fff;border:1px solid #dee2e6;border-radius:8px;overflow:hidden;max-height:420px;overflow-y:auto"></div>
      </div>
    </div>
  </div>
</nav>
<script>
(function(){{
  var RACERS={_RACER_SEARCH_MAP};
  var depth={depth};
  var _races=null,_racesLoading=false;

  function fuzzy(str,q){{
    str=str.toLowerCase();q=q.toLowerCase();
    if(str===q)return 2;
    if(str.includes(q))return 1+(str.startsWith(q)?0.3:0);
    var bg=function(s){{var b={{}};for(var i=0;i<s.length-1;i++)b[s.slice(i,i+2)]=1;return b;}};
    var sb=bg(str),qb=bg(q),hits=0,tot=0;
    for(var k in qb){{tot++;if(sb[k])hits++;}}
    return tot>0?hits/tot:0;
  }}

  function pfx(){{return depth===0?'':depth===1?'../':'../../';}}

  function sectionHdr(label){{
    return '<div style="font-size:.6rem;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:#aaa;padding:8px 12px 3px;background:#fafafa;border-bottom:1px solid #f0f0f0">'+label+'</div>';
  }}
  function resultLink(href,primary,secondary){{
    return '<a href="'+href+'" class="ns-item">'
      +'<span style="font-weight:500">'+primary+'</span>'
      +(secondary?'<span style="font-size:.7rem;color:#aaa;margin-left:8px;white-space:nowrap">'+secondary+'</span>':'')
      +'</a>';
  }}

  function render(q){{
    var res=document.getElementById('nav-search-results');
    res.innerHTML='';
    if(q.length<2){{res.style.display='none';return;}}
    var p=pfx(),html='';

    var rs=RACERS.map(function(r){{return {{r:r,s:fuzzy(r.name,q)}};}})
      .filter(function(x){{return x.s>0.15;}})
      .sort(function(a,b){{return b.s-a.s;}}).slice(0,5);
    if(rs.length){{
      html+=sectionHdr('Racers');
      rs.forEach(function(x){{
        var r=x.r;if(!r.clubs||!r.clubs.length)return;
        html+=resultLink(p+r.clubs[0]+'/racer/'+r.slug+'.html',r.name,'');
      }});
    }}

    if(_races){{
      var all=[];
      Object.entries(_races.seasons||{{}}).forEach(function([yr,s]){{
        (Array.isArray(s)?s:(s.races||[])).forEach(function(race){{all.push(race);}});
      }});
      var rr=all.map(function(r){{return {{r:r,s:fuzzy(r.name,q)}};}})
        .filter(function(x){{return x.s>0.15;}})
        .sort(function(a,b){{return b.s-a.s;}}).slice(0,5);
      if(rr.length){{
        html+=sectionHdr('Results');
        rr.forEach(function(x){{
          var r=x.r;
          html+=resultLink(p+(_races.club_id||'pnw')+'/results/'+r.slug+'.html',r.name,r.date);
        }});
      }}
    }} else if(!_racesLoading){{
      _racesLoading=true;
      var url=p+(depth===0?'pnw/':'')+'races-list.json';
      fetch(url).then(function(r){{return r.json();}}).then(function(d){{
        _races=d;_racesLoading=false;
        render(document.getElementById('nav-search').value.trim());
      }}).catch(function(){{_racesLoading=false;}});
    }}

    if(!html){{res.style.display='none';return;}}
    res.innerHTML=html;res.style.display='';
  }}

  document.addEventListener('DOMContentLoaded',function(){{
    var inp=document.getElementById('nav-search');
    var res=document.getElementById('nav-search-results');
    if(!inp)return;
    inp.addEventListener('input',function(){{render(this.value.trim());}});
    inp.addEventListener('focus',function(){{if(this.value.trim().length>=2)render(this.value.trim());}});
    document.addEventListener('click',function(e){{if(!inp.contains(e.target)&&!res.contains(e.target))res.style.display='none';}});
    inp.addEventListener('keydown',function(e){{
      var items=res.querySelectorAll('a');if(!items.length)return;
      var active=res.querySelector('a[data-sel]');
      var idx=active?Array.from(items).indexOf(active):-1;
      if(e.key==='ArrowDown'){{e.preventDefault();if(active){{delete active.dataset.sel;active.style.background='';}}var n=items[(idx+1)%items.length];n.dataset.sel='1';n.style.background='#e8f0fe';}}
      else if(e.key==='ArrowUp'){{e.preventDefault();if(active){{delete active.dataset.sel;active.style.background='';}}var n=items[(idx-1+items.length)%items.length];n.dataset.sel='1';n.style.background='#e8f0fe';}}
      else if(e.key==='Enter'&&active){{window.location.href=active.href;}}
      else if(e.key==='Escape'){{res.style.display='none';}}
    }});
  }});
}})();
</script>"""


def _selector_bar(data: dict, show_season: bool = True, page: str = None, season_navigate_url: str = None, race_nav_html: str = "", depth: int = 1) -> str:
    """Horizontal selector bar: club pills + season dropdown.
    page: page name within club dir (e.g. 'races', 'results', 'standings', 'trajectories').
          Club buttons link to '../{club}/{page}.html'. If None, no club buttons shown.
    season_navigate_url: if set, changing season navigates to this URL with #YEAR appended
                         instead of updating the hash on the current page.
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
    _clubs_for_js = data.get("all_clubs", data["clubs"])
    all_seasons_js = "{" + ",".join(
        f'"{cid}":{{"years":{_json.dumps(sorted(club["seasons"].keys(), reverse=True))},"current":"{club["current_season"]}"}}'
        for cid, club in _clubs_for_js.items()
    ) + "}"

    # Club buttons — <a> links to sibling club dirs.
    # Hide `none` from the selector — it's a valid series for data but not a UI destination.
    club_btns = ""
    if page:
        _all_clubs = data.get("all_clubs", data["clubs"])
        for club_id, club in _all_clubs.items():
            if club_id == "none":
                continue
            short = clubs_cfg.get(club_id, {}).get("short_name", club.get("name", club_id))
            active_cls = " active" if club_id == current_club else ""
            if club_id == current_club:
                href = "index.html" if page == "racer/index" else f"{page}.html"
            else:
                href = f"../../{club_id}/racer/index.html" if page == "racer/index" else f"{'../' * depth}{club_id}/{page}.html"
            club_btns += f'<a class="btn btn-sm btn-outline-secondary{active_cls}" data-club="{club_id}" href="{href}">{short}</a>\n'

    season_html = ""
    if show_season:
        season_html = """<div class='d-flex align-items-center gap-2'>
        <span class='text-muted small fw-semibold'>Season</span>
        <button id='season-prev' class='btn btn-sm btn-outline-secondary' disabled>&larr;</button>
        <select id='season-select' class='form-select form-select-sm' style='min-width:110px'></select>
        <button id='season-next' class='btn btn-sm btn-outline-secondary' disabled>&rarr;</button>
      </div>"""

    if page:
        nav_url = season_navigate_url or ""
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
  var prevBtn = document.getElementById('season-prev');
  var nextBtn = document.getElementById('season-next');
  var navigateUrl = {repr(nav_url)};
  function updateNavBtns(yr) {{
    var idx = info.years.indexOf(yr);
    if (prevBtn) prevBtn.disabled = idx >= info.years.length - 1;
    if (nextBtn) nextBtn.disabled = idx <= 0;
  }}
  function goYear(yr) {{
    if (navigateUrl) {{
      window.location.href = navigateUrl + '#' + yr;
      return;
    }}
    if (sel) sel.value = yr;
    localStorage.setItem('pc_year', yr);
    location.hash = yr;
    updateNavBtns(yr);
    document.querySelectorAll('#club-btn-group a[data-club]').forEach(function(a) {{
      a.href = a.getAttribute('href').split('#')[0] + '#' + yr;
    }});
  }}
  if (sel) {{
    sel.innerHTML = info.years.map(function(y) {{
      return '<option value="' + y + '"' + (y === active ? ' selected' : '') + '>' + y + ' Season</option>';
    }}).join('');
    sel.addEventListener('change', function() {{ goYear(this.value); }});
  }}
  if (prevBtn) prevBtn.addEventListener('click', function() {{
    var idx = info.years.indexOf(sel ? sel.value : active);
    if (idx < info.years.length - 1) goYear(info.years[idx + 1]);
  }});
  if (nextBtn) nextBtn.addEventListener('click', function() {{
    var idx = info.years.indexOf(sel ? sel.value : active);
    if (idx > 0) goYear(info.years[idx - 1]);
  }});
  if (!navigateUrl && location.hash !== '#' + active) location.replace(location.pathname + '#' + active);
  localStorage.setItem('pc_year', active);
  localStorage.setItem('pc_club', '{current_club}');
  updateNavBtns(active);
  document.querySelectorAll('#club-btn-group a[data-club]').forEach(function(a) {{
    a.href = a.getAttribute('href').split('#')[0] + '#' + active;
  }});
}})();"""
    else:
        club_js = ""

    club_row = f"""<div class="d-flex align-items-center gap-2">
        <span class="text-muted small fw-semibold">Series</span>
        <div class="btn-group flex-wrap" id="club-btn-group" role="group">{club_btns}</div>
      </div>""" if club_btns else ""

    return f"""<div class="bg-light border-bottom mb-4">
  <div class="container py-2">
    <div class="d-flex flex-wrap align-items-center gap-3">
      {club_row}
      {season_html}
      {race_nav_html}
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


def _racer_link(name: str, back: str = "", club_id: str = "") -> str:
    slug = _slug(name)
    club = club_id or _current_racer_club
    # Check if racer has a page in the specified club
    racer_dir = SITE_DIR / club / "racer"
    if not (racer_dir / f"{slug}.html").exists():
        return name
    return f'<a href="{club}/racer/{slug}.html">{name}</a>'


_racer_slugs_cache: dict[str, str] = {}  # 'all' -> JS snippet

def _racer_slugs_js() -> str:
    """JS snippet declaring RACER_SLUGS set for the current club."""
    club = _current_racer_club or "bepc"
    if club in _racer_slugs_cache:
        return _racer_slugs_cache[club]
    racer_dir = SITE_DIR / club / "racer"
    slugs: set[str] = set()
    if racer_dir.exists():
        slugs.update(p.stem for p in racer_dir.glob("*.html") if p.name != "index.html")
    result = f"const RACER_SLUGS = new Set({json.dumps(sorted(slugs))});"
    _racer_slugs_cache[club] = result
    return result


def _slug(name: str) -> str:
    import re
    return re.sub(r'-+', '-', re.sub(r'[^a-z0-9-]', '-', name.lower())).strip('-')

def _source_name(url: str) -> str:
    """Return a short human-readable source name from a URL."""
    if not url:
        return "Source"
    from urllib.parse import urlparse
    host = urlparse(url).netloc.lower().removeprefix("www.")
    names = {
        "webscorer.com": "WebScorer",
        "pacificmultisports.com": "Pacific Multisports",
        "pnworca.org": "PNWORCA",
        "soundrowers.org": "Sound Rowers",
        "jerichopaddle.com": "Jericho",
        "ballardelks.org": "BEPC",
        "salmonbaypaddle.com": "Salmon Bay Paddle",
    }
    for domain, name in names.items():
        if domain in host:
            return name
    # Fallback: capitalize first segment of domain
    return host.split(".")[0].capitalize()


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
                ("hcap_1",      "hcap_1",    "1st Place (Corrected time)",    "hcap-gold"),
                ("hcap_2",      "hcap_2",    "2nd Place (Corrected time)",       "hcap-silver"),
                ("hcap_3",      "hcap_3",    "3rd Place (Corrected time)",       "hcap-bronze"),
                ("finish_1",    "finish_1",  "1st Place (Finish time)",        "plain-medal"),
                ("finish_2",    "finish_2",  "2nd Place (Finish time)",        "plain-medal"),
                ("finish_3",    "finish_3",  "3rd Place (Finish time)",        "plain-medal"),
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
                    tooltip = f"{n} consecutive races beating par"
                    if cnt >= 4:
                        badge = f'<span style="position:absolute;top:-4px;right:-4px;background:#555;color:#fff;border-radius:8px;font-size:0.6em;font-weight:bold;padding:1px 4px;line-height:1.4">{cnt}</span>'
                        parts.append(f'<span class="hcap-medal hcap-streak" data-bs-toggle="tooltip" data-bs-title="{tooltip}" style="white-space:nowrap;position:relative;padding-right:6px">{_streak_icon(n)}{badge}</span>')
                    else:
                        for _ in range(cnt):
                            parts.append(f'<span class="hcap-medal hcap-streak" data-bs-toggle="tooltip" data-bs-title="{tooltip}">{_streak_icon(n)}</span>')
            return ''.join(parts)

        pts = sorted(_final_states_for_season(season["races"]).values(), key=lambda r: -r["season_points"])
        hpts = sorted(_final_states_for_season(season["races"]).values(), key=lambda r: -r["season_handicap_points"])
        distances = set(r.get("distance", "") for r in season["races"])
        # "Established" = processor's per-series handicap-established signal (inverse of is_fresh_racer).
        # num_races_to_establish is series-configured in data/clubs.yaml and carry_over:true
        # preserves established status across seasons within the series.
        standings_data["seasons"][year] = {
            "multi_dist": len([d for d in distances if d]) > 1,
            "pts": [{"name": r["canonical_name"], "craft": display_craft_ui(r["craft_category"]), "gender": r["gender"],
                     "trophies": trophy_summary(r["canonical_name"], r["craft_category"]),
                     "course": r.get("_distance", ""), "races": r["num_races"], "points": r["season_points"]} for r in pts],
            "hpts": [{"name": r["canonical_name"], "craft": display_craft_ui(r["craft_category"]),
                      "gender": r["gender"],
                      "trophies": trophy_summary(r["canonical_name"], r["craft_category"]),
                      "course": r.get("_distance", ""), "races": r["num_races"],
                      "established": not r.get("is_fresh_racer", False),
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
    # Trajectory charts: require ≥4 races for a racer to appear (avoids noisy short lines).
    # Independent of min_races_for_page which gates per-racer page generation.
    min_races = 4
    for year, season in _all_seasons(data).items():
        pts, hpts, hnum = _build_traj_series(season["races"], colors, min_races=min_races)
        traj_data["seasons"][year] = {"pts": pts, "hpts": hpts, "hnum": hnum}
    (SITE_DIR / f"trajectories-data-{data['current_club']}.json").write_text(json.dumps(traj_data))
    (SITE_DIR / data['current_club'] / "trajectories-data.json").write_text(json.dumps(traj_data))

    print(f"Generated: site/{data['current_club']}/*-data.json")


def _loading_spinner() -> str:
    return '<div id="loading" class="text-center my-5" style="display:none"><div class="spinner-border text-secondary"></div></div>'


def generate_standings(data: dict) -> None:
    global _current_racer_club
    for club_id in data["clubs"]:
        data["current_club"] = club_id
        _current_racer_club = club_id
        series_name = data["clubs"][club_id].get("name", club_id)
        html = _head("Standings") + _nav("Standings", data=data, depth=1) + _selector_bar(data, page="standings") + f"""
<div class="container-fluid px-2 px-sm-3">
  <h1 class="mb-3" id="standings-title">{STANDINGS_PAGE["heading"]}</h1>
  <div class="d-flex align-items-center gap-3 mb-2 flex-wrap">
    <div class="btn-group btn-group-sm" role="group" aria-label="{STANDINGS_PAGE["filter_aria_label"]}">
      <input type="radio" class="btn-check" name="filter" id="f-est" value="established" checked>
      <label class="btn btn-outline-secondary" for="f-est">{STANDINGS_PAGE["filter_established"]}</label>
      <input type="radio" class="btn-check" name="filter" id="f-all" value="all">
      <label class="btn btn-outline-secondary" for="f-all">{STANDINGS_PAGE["filter_all"]}</label>
    </div>
    <span class="text-muted small">{STANDINGS_PAGE["sort_hint"]}</span>
  </div>
  <table id="tbl-standings" class="table table-striped table-hover">
    <thead><tr>
      <th style="width:55px">#</th>
      <th style="min-width:180px">Racer</th>
      <th style="width:75px">Craft</th>
      <th style="min-width:160px;white-space:nowrap">Trophies</th>
      <th style="width:70px">Races</th>
      <th style="width:75px">Index</th>
      <th style="width:90px">Index Pts.</th>
      <th style="width:90px">Finish Pts.</th>
    </tr></thead>
    <tbody id="body-standings"></tbody>
  </table>
</div>
<style>
#tbl-standings td:nth-child(2) {{ white-space: normal; }}
#tbl-standings td:nth-child(4) {{ white-space: nowrap; line-height: 1; }}
</style>
<script>
{_racer_slugs_js()}
const SERIES_NAME = {json.dumps(series_name)};
let SEASONS = null;
let dtStandings = null;
let _currentYear = null;

function render(year) {{
  _currentYear = year;
  const s = SEASONS[year];
  if (dtStandings) {{ dtStandings.destroy(); dtStandings = null; }}
  const filter = document.querySelector('input[name="filter"]:checked').value;
  const racerLink = (name, slug) => RACER_SLUGS.has(slug) ? `<a href="racer/${{slug}}.html">${{name}}</a>` : name;
  const rows = (s.hpts || []).filter(r => filter === 'all' || r.established);
  const row = r => `<tr><td></td><td>${{racerLink(r.name, r.name.toLowerCase().replace(/ /g,'-'))}}</td><td>${{r.craft}}</td><td>${{r.trophies||''}}</td><td>${{r.races}}</td><td>${{r.hcap}}</td><td>${{r.hpts}}</td><td>${{r.points}}</td></tr>`;
  document.getElementById('body-standings').innerHTML = rows.map(row).join('');
  document.getElementById('standings-title').textContent = `Standings: ${{SERIES_NAME}}, ${{year}}`;
  document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => bootstrap.Tooltip.getOrCreateInstance(el));

  const dt = $('#tbl-standings').DataTable({{
    order: [[6, 'desc']],
    pageLength: 100,
    responsive: true,
    autoWidth: false,
    columnDefs: [{{targets: 0, orderable: false}}],
  }});
  dtStandings = dt;
  dt.on('draw', () => {{
    dt.column(0, {{search:'applied', order:'applied'}}).nodes().each((cell, i) => {{
      cell.innerHTML = i + 1;
    }});
  }}).draw(false);
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
    document.querySelectorAll('input[name="filter"]').forEach(el => {{
      el.addEventListener('change', () => render(_currentYear));
    }});
  }});
}});
</script>""" + _foot()
        (SITE_DIR / club_id / "standings.html").write_text(html)
        print(f"Generated: site/{club_id}/standings.html")


def generate_races(data: dict) -> None:
    """Generate per-race HTML files: site/{club}/results/{slug}.html"""
    global _current_racer_club
    import json as _json
    from collections import defaultdict

    race_slugs = data.get("race_slugs", {})

    # Shared JS for rendering race results (badges, tables, podium)
    _MUTE_REASONS_JS = json.dumps(PLACE_MUTE_REASONS)
    _RACE_JS = """
const MUTE_REASONS = """ + _MUTE_REASONS_JS + """;
function slug(name) { return name.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, ''); }
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
""" + _BADGES_JS_LAZY() + """
function podiumForCourse(course) {
  const pr = [null, null, null];
  course.handicap.forEach(r => {
    if (r.trophies && r.trophies.includes('hcap_1')) pr[0] = r;
    if (r.trophies && r.trophies.includes('hcap_2')) pr[1] = r;
    if (r.trophies && r.trophies.includes('hcap_3')) pr[2] = r;
  });
  const cfg = [
    {idx:1, label:'2nd', bg:'#EBEBEB', border:'#A0A0A0', nameColor:'#333', h:'52px', w:'135px', maxw:'180px', cup:'<svg width="36" height="36" viewBox="0 0 24 24"><path d="M4 3 Q4 15 12 15 Q20 15 20 3 Z" fill="#C0C0C0" stroke="#707070" stroke-width="1.8"/><path d="M4 5 Q0 5 0 9 Q0 13 4 12" fill="none" stroke="#707070" stroke-width="1.8"/><path d="M20 5 Q24 5 24 9 Q24 13 20 12" fill="none" stroke="#707070" stroke-width="1.8"/><rect x="11" y="15" width="2" height="3.5" fill="#707070"/><rect x="6" y="18.5" width="12" height="2.5" rx="1" fill="#707070"/><text x="12" y="12.5" text-anchor="middle" font-size="9" font-weight="bold" fill="#111">2</text></svg>'},
    {idx:0, label:'1st', bg:'#FFF8DC', border:'#FFD700', nameColor:'#7A5C00', h:'64px', w:'180px', maxw:'240px', cup:'<svg width="36" height="36" viewBox="0 0 24 24"><path d="M4 3 Q4 15 12 15 Q20 15 20 3 Z" fill="#FFD700" stroke="#B8860B" stroke-width="1.8"/><path d="M4 5 Q0 5 0 9 Q0 13 4 12" fill="none" stroke="#B8860B" stroke-width="1.8"/><path d="M20 5 Q24 5 24 9 Q24 13 20 12" fill="none" stroke="#B8860B" stroke-width="1.8"/><rect x="11" y="15" width="2" height="3.5" fill="#B8860B"/><rect x="6" y="18.5" width="12" height="2.5" rx="1" fill="#B8860B"/><text x="12" y="12.5" text-anchor="middle" font-size="9" font-weight="bold" fill="#7A5C00">1</text></svg>'},
    {idx:2, label:'3rd', bg:'#FDF0E0', border:'#DDA84A', nameColor:'#5C2E00', h:'44px', w:'135px', maxw:'180px', cup:'<svg width="36" height="36" viewBox="0 0 24 24"><path d="M4 3 Q4 15 12 15 Q20 15 20 3 Z" fill="#DDA84A" stroke="#B07020" stroke-width="1.8"/><path d="M4 5 Q0 5 0 9 Q0 13 4 12" fill="none" stroke="#B07020" stroke-width="1.8"/><path d="M20 5 Q24 5 24 9 Q24 13 20 12" fill="none" stroke="#B07020" stroke-width="1.8"/><rect x="11" y="15" width="2" height="3.5" fill="#B07020"/><rect x="6" y="18.5" width="12" height="2.5" rx="1" fill="#B07020"/><text x="12" y="12.5" text-anchor="middle" font-size="9" font-weight="bold" fill="#5C2E00">3</text></svg>'},
  ];
  let html = '<div class="d-flex justify-content-center mb-3" style="width:100%"><div style="display:flex;flex-direction:column;align-items:stretch;width:100%;max-width:600px"><div style="display:flex;align-items:flex-end;gap:6px">';
  cfg.forEach(c => {
    const r = pr[c.idx];
    const s = r ? slug(r.canonical_name) : null;
    const name = r ? (RACER_SLUGS.has(s)
      ? `<a href="../racer/${s}.html" style="color:${c.nameColor};font-weight:600;font-size:0.85em;text-decoration:none;text-align:center;display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${r.canonical_name}</a>`
      : `<span style="font-weight:600;font-size:0.85em;color:${c.nameColor};text-align:center;display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${r.canonical_name}</span>`)
      : '<span style="color:#bbb;font-size:0.85em">—</span>';
    html += `<div style="display:flex;flex-direction:column;align-items:center;gap:3px;flex:1;min-width:${c.w};max-width:${c.maxw};min-width:0">${c.cup}${name}<div style="width:100%;height:${c.h};background:${c.bg};border:1px solid ${c.border};border-bottom:none;border-radius:4px 4px 0 0;display:flex;align-items:center;justify-content:center;font-weight:bold;color:${c.nameColor};font-size:0.85em">${c.label}</div></div>`;
  });
  html += '</div><div style="height:3px;background:#CCC;border-radius:2px;width:100%"></div></div></div>';
  return html;
}

function tableHtml(id_suffix) {
  return `
  <div class="d-flex align-items-center gap-2 mb-2">
    <select id="racer-filter-${id_suffix}" class="form-select form-select-sm ms-auto" style="width:auto" aria-label=\"""" + RESULTS_FILTER["aria_label"] + """\">
""" + "".join(f'      <option value="{val}">{label}</option>\n' for val, label in RESULTS_FILTER["options"]) + """    </select>
  </div>
  <table id="tbl-results-${id_suffix}" class="table table-sm table-striped">
    """ + _render_thead() + """
    <tbody id="body-results-${id_suffix}"></tbody>
  </table>`;
}
function rows(results, placeField) {
  const isHcap = placeField === 'adjusted_place';
  return results.map(r => {
    // For handicap view: prefer eligible_adjusted_place (position among ranked racers).
    // When it's 0 (fresh/outlier/auto-reset/ineligible), fall back to adjusted_place muted.
    let placeCellVal = r[placeField];
    let placeCellHtml;
    if (isHcap) {
      const eap = r.eligible_adjusted_place || 0;
      if (eap > 0) {
        placeCellVal = eap;
        placeCellHtml = String(eap);
      } else {
        const ap = r.adjusted_place || 0;
        placeCellVal = 9999; // sort muted values to the bottom
        let reason;
        if (r.is_fresh_racer) reason = MUTE_REASONS.fresh;
        else if (r.is_outlier) reason = MUTE_REASONS.outlier;
        else if ((r.trophies||[]).includes('auto_reset')) reason = MUTE_REASONS.auto_reset;
        else reason = MUTE_REASONS.ineligible;
        placeCellHtml = ap > 0
          ? `<span class="place-muted" data-bs-toggle="tooltip" data-bs-title="${reason}">(${ap})</span>`
          : `<span class="place-muted" data-bs-toggle="tooltip" data-bs-title="${reason}">—</span>`;
      }
    } else {
      placeCellHtml = String(r[placeField]);
    }
    // Predicted time (in seconds) for sorting; 999999 sorts empty to the end
    const predSec = (!r.is_fresh_racer && r.time_versus_par > 0)
      ? (r.time_seconds / r.time_versus_par * r.handicap) : null;
    const predSort = predSec != null ? predSec : 999999;
    const predCell = predSec != null ? fmtTime(predSec) : '<span style="color:#999">—</span>';
    const pct = r.adjusted_time_versus_par != null && !r.is_fresh_racer
      ? ((1 - r.adjusted_time_versus_par) * 100) : null;
    // pctHtml — use pct (or -999 for "—") as sort key so empties sort to the bottom
    // under desc (positive = beat projection sorts to top).
    const pctSort = pct != null ? pct : -999;
    // Per-row tooltip: "{time} is {pct}% {direction} than projected {projected}"
    const pctTip = (pct != null && predSec != null)
      ? `${'""" + RESULTS_TOOLTIPS["vs_par_row"] + """'
          .replace('{time}', fmtTime(r.time_seconds))
          .replace('{pct}', Math.abs(pct).toFixed(1))
          .replace('{direction}', pct >= 0 ? '""" + RESULTS_TOOLTIPS["vs_par_faster"] + """' : '""" + RESULTS_TOOLTIPS["vs_par_slower"] + """')
          .replace('{projected}', fmtTime(predSec))
        }`
      : '';
    const pctTipAttr = pctTip ? ` data-bs-toggle="tooltip" data-bs-title="${pctTip}"` : '';
    const pctHtml = pct != null
      ? `<td data-order="${pctSort}"${pctTipAttr} style="text-align:center;white-space:nowrap;font-size:0.85em;color:${pct >= 0 ? '#2E7D32' : '#666'};font-weight:${pct >= 0 ? 'bold' : 'normal'}">${pct > 0 ? '+' : ''}${pct.toFixed(1)}%</td>`
      : `<td data-order="${pctSort}"></td>`;
    const hcapPostNote = r.is_outlier ? ' data-bs-toggle="tooltip" data-bs-title=\"""" + RESULTS_TOOLTIPS["new_outlier_frozen"] + """\"' : '';
    const hcapPostHtml = `<td data-order="${r.handicap_post}" style="padding-left:8px">${r.handicap_post.toFixed(3)}${r.is_outlier ? `<sup${hcapPostNote}>^</sup>` : ''}</td>`;
    const s = slug(r.canonical_name);
    const isFresh = r.is_fresh_racer ? 'true' : 'false';
    // Par estimate
    const parSec = (r.included_in_par && r.adjusted_time_seconds) ? r.adjusted_time_seconds : null;
    const parSort = parSec != null ? parSec : 999999;
    const parDisplay = parSec != null ? fmtTime(parSec) : '<span style="color:#999">—</span>';
    const parCell = parSec != null && r.trophies && r.trophies.includes('par')
      ? '<span data-bs-toggle="tooltip" data-bs-title=\"""" + RESULTS_TOOLTIPS["race_par"] + """\" style="background:#E3F2FD;border:1px solid #1565C0;border-radius:3px;padding:2px 4px;font-weight:bold;color:#1565C0">' + fmtTime(parSec) + '</span>'
      : parDisplay;
    return `<tr data-fresh="${isFresh}"><td>${badges(r.trophies)}</td>
    <td data-order="${placeCellVal}">${placeCellHtml}</td><td>${racerLink(r.canonical_name)}</td>
    ${craft_cell(r.craft_category, r.craft_specific)}
    ${pctHtml}
    <td data-order="${r.time_seconds}">${isHcap ? fmtTime(r.time_seconds) : '<strong>' + fmtTime(r.time_seconds) + '</strong>'}</td>
    <td data-order="${predSort}">${predCell}</td>
    <td data-order="${r.handicap}">${r.handicap.toFixed(3)}</td>
    ${hcapPostHtml}
    <td data-order="${parSort}">${parCell}</td>
    <td data-order="${r.race_points || 0}">${r.race_points || 0}</td><td data-order="${r.handicap_points || 0}">${r.handicap_points || 0}</td></tr>`;
  }).join('');
}
"""

    import time as _time_races
    _racer_slugs_cache.clear()  # force rebuild after all racer pages exist
    for club_id in data["clubs"]:
        _t0_club = _time_races.perf_counter()
        data["current_club"] = club_id
        _current_racer_club = club_id
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

        # Build name-suffix → [(year, slug)] map for "other years" links
        import re as _re2
        name_to_slugs: dict[str, list] = defaultdict(list)
        for yr, rid in all_races:
            s = id_to_slug.get(rid, str(rid))
            # Name suffix = everything after YYYY-MM-DD-
            m = _re2.match(r'\d{4}-\d{2}-\d{2}-(.*)', s)
            if m:
                name_to_slugs[m.group(1)].append((yr, s))

        count = 0
        for i, (year, race_id) in enumerate(all_races):
            slug_name = id_to_slug.get(race_id, str(race_id))
            courses = race_courses[race_id]
            # Sort courses longest to shortest by distance in label
            def _course_dist(c):
                import re as _re2
                m = _re2.search(r'(\d+(?:\.\d+)?)\s*(mi|mile|km)', c["name"].split(" — ")[-1], _re2.I)
                if not m: return 0.0
                v = float(m.group(1))
                return -(v * 1.609 if 'mi' in m.group(2).lower() else v)
            courses = sorted(courses, key=_course_dist)
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

            # Build race dropdown for current year only
            year_races = [(rid, id_to_slug.get(rid, str(rid))) for yr, rid in all_races if yr == year]
            year_race_slugs = [s for _, s in year_races]
            cur_idx = year_race_slugs.index(slug_name) if slug_name in year_race_slugs else -1
            prev_slug = year_race_slugs[cur_idx - 1] if cur_idx > 0 else None
            next_slug = year_race_slugs[cur_idx + 1] if cur_idx >= 0 and cur_idx < len(year_race_slugs) - 1 else None

            prev_link = f'<a href="{prev_slug}.html" class="btn btn-outline-secondary btn-sm">&larr;</a>' if prev_slug else '<button class="btn btn-outline-secondary btn-sm" disabled>&larr;</button>'
            next_link = f'<a href="{next_slug}.html" class="btn btn-outline-secondary btn-sm">&rarr;</a>' if next_slug else '<button class="btn btn-outline-secondary btn-sm" disabled>&rarr;</button>'

            race_options = ""
            for rid, s in year_races:
                rc = race_courses.get(rid, [{}])
                rname = rc[0].get("name", s).split(" — ")[0]
                rdate = rc[0].get("date", "")
                label = _short_label(rname, rdate)
                selected = ' selected' if s == slug_name else ''
                race_options += f'<option value="{s}.html"{selected}>{label}</option>\n'

            race_nav_html = f"""<div class="d-flex align-items-center gap-1">
  <span class="text-muted small fw-semibold">Race</span>
  {prev_link}
  <select class="form-select form-select-sm" style="min-width:140px" onchange="window.location.href=this.value">{race_options}</select>
  {next_link}
</div>"""
            source_link = f'<a href="{display_url}" target="_blank" class="btn btn-outline-secondary btn-sm">Source ({_source_name(display_url)}) ↗</a>' if display_url else ''

            html = _head(base_name) + _nav("Results", data=data, depth=2) + _selector_bar(data, show_season=True, page="results", season_navigate_url="../results.html", race_nav_html=race_nav_html, depth=2) + f"""
<div class="container-fluid px-2 px-sm-3">
  <h1 class="mb-1">{base_name}</h1>
  <p class="text-muted">{date} · {total_starters} starters{(' · <a href="' + display_url + '" target="_blank">Source (' + _source_name(display_url) + ') ↗</a>') if display_url else ''}</p>
  <div id="course-content"></div>
</div>
<script>
{_racer_slugs_js()}
const COURSES = {courses_json};
{_RACE_JS}
document.addEventListener('DOMContentLoaded', () => {{
  const sortedCourses = [...COURSES].sort((a,b) => {{
    // Sort by distance descending (longest course first); fall back to finisher count
    const distRe = /(\d+(?:\.\d+)?)\s*(mi|mile|km)/i;
    const da = a.label.match(distRe), db = b.label.match(distRe);
    const toKm = (m) => m ? parseFloat(m[1]) * (/mi/i.test(m[2]) ? 1.609 : 1) : 0;
    const diff = toKm(db) - toKm(da);
    return diff !== 0 ? diff : b.finish.length - a.finish.length;
  }});
  let tabNav = '<ul class="nav nav-tabs mb-0">';
  let tabContent = '<div class="tab-content">';
  sortedCourses.forEach((course, i) => {{
    const origIdx = COURSES.indexOf(course);
    const active = i === 0 ? 'active' : '';
    tabNav += `<li class="nav-item"><button class="nav-link ${{active}}" data-bs-toggle="tab" data-bs-target="#course-${{origIdx}}">${{course.label || 'Results'}}</button></li>`;
    tabContent += `<div class="tab-pane ${{active}} p-3 border border-top-0" id="course-${{origIdx}}">${{podiumForCourse(course)}}${{tableHtml(origIdx)}}</div>`;
  }});
  tabNav += '</ul>';
  tabContent += '</div>';
  document.getElementById('course-content').innerHTML = tabNav + tabContent;
  const _dts = {{}};
  COURSES.forEach((course, i) => {{
    document.getElementById(`body-results-${{i}}`).innerHTML = rows(course.handicap, 'original_place');
    // Disable sorting on Trophies (0), Racer (2), Craft (3)
    _dts[i] = $(`#tbl-results-${{i}}`).DataTable({{
      order: [[4, 'desc']],
      paging: false,
      searching: false,
      info: false,
      autoWidth: false,
      columnDefs: [{{ orderable: false, targets: [0, 2, 3] }}],
    }});
  }});
  document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => bootstrap.Tooltip.getOrCreateInstance(el));
  const savedDist = getDistance();
  COURSES.forEach((course, i) => {{
    const btn = document.querySelector(`[data-bs-target="#course-${{i}}"]`);
    if (btn) {{
      if (savedDist && course.label === savedDist) bootstrap.Tab.getOrCreateInstance(btn).show();
      btn.addEventListener('shown.bs.tab', () => setDistance(course.label));
    }}
  }});
  // Racer filter
  function applyFilter() {{
    // Collect filter value from each per-course selector (they're synced)
    const filters = document.querySelectorAll('[id^="racer-filter-"]');
    if (!filters.length) return;
    const f = filters[0].value;
    filters.forEach(sel => {{ sel.value = f; }});
    document.querySelectorAll('#course-content tr[data-fresh]').forEach(function(tr) {{
      var show = f === 'all'
        || (f === 'established' && tr.dataset.fresh === 'false');
      tr.style.display = show ? '' : 'none';
    }});
  }}
  document.querySelectorAll('[id^="racer-filter-"]').forEach(sel => sel.addEventListener('change', applyFilter));
}});
</script>""" + _foot()
            (results_dir / f"{slug_name}.html").write_text(html)
            count += 1

        print(f"Generated: site/{club_id}/results/ ({count} files) [{_time_races.perf_counter()-_t0_club:.1f}s]")

_SHORT_LABELS = {
    'Pnworca1': 'PNWORCA #1', 'Pnworca2': 'PNWORCA #2', 'Pnworca3': 'PNWORCA #3',
    'Pnworca4': 'PNWORCA #4', 'Pnworca5': 'PNWORCA #5', 'Pnworca6': 'PNWORCA #6',
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
    'Alderbrook St. Paddles Day': 'St. Paddles day',
    'Deception Pass Challenge': 'Deception Pass',
    'MAKAH COAST RACE': 'Makah',
    'La Conner Classic': 'La Conner',
    'Bainbridge Island Marathon': 'Bainbridge Marathon',
    'Bainbridge Island': 'Bainbridge Marathon',
    'Bellingham Bay Rough Water Race': 'Bellingham Bay',
    'Bellingham Bay': 'Bellingham Bay',
    'Gorge Downwind Champs': 'Gorge Downwind',
    'Gorge Outrigger Canoe Race': 'Gorge OC Race',
    'Salmon Row and Paddle': 'Salmon Row',
    'Salmon Row': 'Salmon Row',
    'Eric Hughes Memorial Regatta': 'Eric Hughes',
    'Fort Langley Canoe Club Race': 'Fort Langley',
    'Round Bowen Island': 'Round Bowen',
    'Wake Up the Gorge': 'Wake Up the Gorge',
    'Weapon of Choice': 'Weapon of Choice',
    'Whipper Snapper': 'Whipper Snapper',
    'Paddle 4 Food Relay': 'Paddle 4 Food',
    'BBOP Challenge': 'BBOP',
    'Narrows Challenge': 'Narrows Challenge',
    "Alderbrook St. Paddle's Day": "St. Paddles Day",
    'Alderbrook St. Paddles Day': "St. Paddles Day",
    # Sound Rowers
    'Squaxin Island': 'Squaxin',
    'Commencement Bay': 'Commencement Bay',
    'Mercer Island Sausage Pull': 'Sausage Pull',
    'Mercer Island': 'Mercer Island',
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
    # Strip year prefix and common suffixes before matching
    base = _re_module.sub(r'^\d{4}\s+', '', base).strip()
    base = _re_module.sub(r'\s*-\s*Sound Rowers and Paddlers.*$', '', base).strip()
    base = _re_module.sub(r'\s*-\s*Hosted by.*$', '', base).strip()

    if base in _SHORT_LABELS:
        return date_prefix + _SHORT_LABELS[base]
    if 'Peter Marcus' in base:
        return date_prefix + 'Peter Marcus'
    if 'PNWORCA Winter Series' in base and '#' in base:
        n = base.rsplit('#', 1)[-1].split(':')[0].strip()
        return date_prefix + f'PNWORCA #{n}'
    if 'PNWORCA' in base and '#' in base:
        n = base.rsplit('#', 1)[-1].split('-')[0].strip()
        return date_prefix + f'PNWORCA #{n}'
    if '#' in base:
        num = base.rsplit('#', 1)[-1].strip()
        # BEPC series: "BEPC 2025 Race Series #18" -> "#18"
        if 'Race Series' in base or 'Monday' in base.lower():
            return date_prefix + f'#{num.zfill(2)}'
        return date_prefix + f'#{num}'
    # Date-suffixed: "Salmon Bay Paddle Monday Race 20170501" -> use date_prefix only
    m = _re_module.search(r'20\d{2}(\d{2})(\d{2})$', base)
    if m:
        return f'{m.group(1)}/{m.group(2)}'
    # Strip "Sound Rowers: " prefix and year suffix
    base = _re_module.sub(r'^Sound Rowers:\s*', '', base)
    base = _re_module.sub(r'\s*[-–]\s*\d{4}.*$', '', base).strip()
    base = _re_module.sub(r'\s+\d{4}.*$', '', base).strip()
    for k, v in _SHORT_MAP.items():
        if k.lower() in base.lower():
            return date_prefix + v
    base = _re_module.sub(r'^(BEPC\s+)?\d{4}\s+', '', base)
    return date_prefix + base[:20]


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


def _build_traj_series(races: list, colors: list, min_races: int = 3) -> tuple:
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
        {"labels": race_labels, "datasets": make_datasets(racer_pts, min_races=min_races)},
        {"labels": race_labels, "datasets": make_datasets(racer_hpts, min_races=min_races)},
        {"labels": race_labels, "datasets": make_datasets(racer_hnum, min_races=min_races)},
    )


def generate_trajectories(data: dict) -> None:
    global _current_racer_club
    for club_id in data["clubs"]:
        data["current_club"] = club_id
        _current_racer_club = club_id
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
    <li class="nav-item"><button class="nav-link active" data-bs-toggle="tab" data-bs-target="#tab-pts">Finish Points</button></li>
    <li class="nav-item"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-hpts">Corrected Points</button></li>
    <li class="nav-item"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-hnum">Index</button></li>
  </ul>
  <div class="tab-content">
    <div class="tab-pane active" id="tab-pts">
      <p class="text-muted small">Overall season points over time. Click legend to toggle racers.</p>
      <div class="traj-scroll"><canvas id="chart-pts"></canvas></div>
    </div>
    <div class="tab-pane" id="tab-hpts">
      <p class="text-muted small">Corrected points over time. First two races provisional (no points awarded).</p>
      <div class="traj-scroll"><canvas id="chart-hpts"></canvas></div>
    </div>
    <div class="tab-pane" id="tab-hnum">
      <p class="text-muted small">Index over time. Values below 1.0 = faster than par; above 1.0 = slower. Racers with 4+ races shown.</p>
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
      k === 'pts' ? 'Season Points' : k === 'hpts' ? 'Corrected Points' : 'Index');
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


def _fmt_indexed_place(r: dict) -> str:
    """Render the 'Place (Indexed)' cell for a racer-row.

    Shows eligible_adjusted_place when the racer was competing for handicap awards
    (i.e. established, non-outlier, non-auto-reset). For fresh / outlier /
    auto-reset / skipped races the handicap comparison is not valid, so we show
    the raw adjusted_place in a muted style with a tooltip explaining why.
    Reason text comes from bepc.ui_text.PLACE_MUTE_REASONS.
    """
    eap = r.get("eligible_adjusted_place", 0) or 0
    ap = r.get("adjusted_place", 0) or 0
    if eap > 0:
        return str(eap)
    # Not eligible — show raw adjusted place muted with reason tooltip
    if r.get("is_fresh_racer"):
        reason = PLACE_MUTE_REASONS["fresh"]
    elif r.get("is_outlier"):
        reason = PLACE_MUTE_REASONS["outlier"]
    elif "auto_reset" in (r.get("trophies") or []):
        reason = PLACE_MUTE_REASONS["auto_reset"]
    elif ap == 0:
        return ""
    else:
        reason = PLACE_MUTE_REASONS["ineligible"]
    if ap == 0:
        return f'<span class="place-muted" data-bs-toggle="tooltip" data-bs-title="{reason}">—</span>'
    return f'<span class="place-muted" data-bs-toggle="tooltip" data-bs-title="{reason}">({ap})</span>'


def _racer_trophy_badges(trophies: list) -> str:
    """Render trophy badges for racer page race table (Python-side, not JS).

    Reads trophy metadata from bepc.ui_text.TROPHIES.
    """
    parts = []
    for t in trophies:
        if t.startswith('streak_'):
            n = t.split('_')[1]
            tooltip = STREAK_TROPHY["tooltip"].replace("{n}", n)
            css = STREAK_TROPHY["css"]
            parts.append(f'<span class="hcap-medal {css}" data-bs-toggle="tooltip" data-bs-title="{tooltip}">{_streak_icon(n)}</span>')
        elif t in TROPHIES:
            meta = TROPHIES[t]
            parts.append(_icon_span(meta["icon"], meta["css"], meta["tooltip"]))
    return "".join(parts)


def generate_racer_pages(data: dict) -> None:
    global _valid_racer_slugs, _current_racer_club
    from collections import defaultdict
    import yaml as _yaml

    current_club = data["current_club"]
    _current_racer_club = current_club

    clubs_config_path = Path(__file__).parent.parent / "data" / "clubs.yaml"
    clubs_cfg = {}
    if clubs_config_path.exists():
        with open(clubs_config_path) as f:
            clubs_cfg = _yaml.safe_load(f).get("clubs", {})

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
var _rs=document.getElementById('racer-select');if(_rs)_rs.addEventListener('change', function() {
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

        racer_nav = ""

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
            # Per-season stats for dynamic update when year selector changes
            season_stats = {}
            for yr, year_crafts in club_results.items():
                yr_results = [r for results in year_crafts.values() for r in results]
                season_stats[yr] = {
                    "races": len(yr_results),
                    "wins": sum(1 for r in yr_results if "hcap_1" in r.get("trophies", [])),
                    "podiums": sum(1 for r in yr_results if any(t in r.get("trophies", []) for t in ["hcap_1","hcap_2","hcap_3"])),
                }
            season_stats_js = str(season_stats).replace("'", '"').replace("True","true").replace("False","false")
            stats_html = f"""<div class="text-muted small" id="racer-stats-bar">
  <span id="stat-season-label">{max(club_results.keys())} season:</span>
  <span id="stat-races">{season_stats[max(club_results.keys())]['races']}</span> races,
  <span id="stat-wins">{season_stats[max(club_results.keys())]['wins']}</span> wins,
  <span id="stat-podiums">{season_stats[max(club_results.keys())]['podiums']}</span> podiums
</div>
<script>var racerSeasonStats = {season_stats_js};</script>"""
        else:
            stats_html = ""
            season_stats_js = "{}"

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
    {{label:'Finish Pts',data:{json.dumps(pts_data)},borderColor:'#4363d8',backgroundColor:'#4363d8',tension:0.3,pointRadius:4}},
    {{label:'Corr Pts',data:{json.dumps(hpts_data)},borderColor:'#e6194b',backgroundColor:'#e6194b',tension:0.3,pointRadius:4}}
  ]}},options:{{responsive:true,plugins:{{legend:{{position:'top'}}}},scales:{{y:{{title:{{display:true,text:'Points'}}}}}}}}
}});
new Chart(document.getElementById('chart-hcap-{cid}'), {{
  type:'line',data:{{labels:{json.dumps(race_labels)},datasets:[
    {{label:'Index',data:{json.dumps(hcap_data)},borderColor:'#3cb44b',backgroundColor:'#3cb44b',tension:0.3,pointRadius:4}}
  ]}},options:{{responsive:true,plugins:{{legend:{{position:'top'}}}},scales:{{y:{{title:{{display:true,text:'Index'}}}}}}}}
}});"""

                    rows = "".join(
                        f'<tr><td><a href="../results/{data["race_slugs"].get(data["current_club"], {}).get(r["race_id"], str(r["race_id"]))}.html">{r["name"].split(" — ")[0] + (" — " + r["name"].split(" — ")[1] if " — " in r["name"] else "")}</a></td>'
                        f'<td class="text-muted small text-nowrap">{r["date"]}</td>'
                        f'<td>{r["original_place"]}</td><td>{_fmt_indexed_place(r)}</td>'
                        f'<td>{_fmt_time(r["time_seconds"])}</td><td>{_fmt_time(r["adjusted_time_seconds"])}</td>'
                        f'<td>{r["handicap"]:.3f}</td><td>{r["handicap_post"]:.3f}</td>'
                        f'<td>{r["race_points"]}</td><td>{r["handicap_points"]}</td></tr>'
                        for r in results
                    )

                    _racer_thead = _render_racer_page_thead()
                    craft_content += f"""{cw_open}
<div class="row mb-3">
  <div class="col-6 col-sm-3"><strong>{RACER_STATS_LABELS['races']}:</strong> {len(results)}</div>
  <div class="col-6 col-sm-3"><strong>{RACER_STATS_LABELS['finish_pts']}:</strong> {last["season_points"]}</div>
  <div class="col-6 col-sm-3"><strong>{RACER_STATS_LABELS['corr_pts']}:</strong> {last["season_handicap_points"]}</div>
  <div class="col-6 col-sm-3"><strong>{RACER_STATS_LABELS['hcap']}:</strong> {last["handicap_post"]:.3f}</div>
</div>
<div class="row mb-3">
  <div class="col-md-6"><canvas id="chart-pts-{cid}" style="max-height:220px"></canvas></div>
  <div class="col-md-6"><canvas id="chart-hcap-{cid}" style="max-height:220px"></canvas></div>
</div>
<table class="table table-sm table-striped table-hover">
  {_racer_thead}
  <tbody>{"".join(
      f'<tr><td style="white-space:nowrap">{_racer_trophy_badges(r.get("trophies",[]))}</td>'
      f'<td><a href="../results/{data["race_slugs"].get(data["current_club"], {}).get(r["race_id"], str(r["race_id"]))}.html">{r["name"].split(" — ")[0] + (" — " + r["name"].split(" — ")[1] if " — " in r["name"] else "")}</a></td>'
      f'<td class="text-muted small text-nowrap">{r["date"]}</td>'
      f'<td>{r["original_place"]}</td><td>{_fmt_indexed_place(r)}</td>'
      + (f'<td style="text-align:right;font-size:0.85em;color:{"#2E7D32" if (1-r["adjusted_time_versus_par"])*100>=0 else "#666"};font-weight:{"bold" if (1-r["adjusted_time_versus_par"])*100>=0 else "normal"}">{(1-r["adjusted_time_versus_par"])*100:+.1f}%</td>' if r.get("adjusted_time_versus_par") else '<td></td>') +
      f'<td>{_fmt_time(r["time_seconds"])}</td>'
      + (f'<td>{_fmt_time(r["time_seconds"] / r["adjusted_time_versus_par"])}</td>' if r.get("adjusted_time_versus_par") else '<td></td>') +
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
                    craft_content += f'<div class="mt-3 pt-2 border-top"><span class="text-muted small fw-semibold">Frequent competitors this season: </span>{also_links}</div>'

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
    if (typeof racerSeasonStats !== 'undefined' && racerSeasonStats[s]) {{
      var st = racerSeasonStats[s];
      var el;
      if ((el = document.getElementById('stat-season-label'))) el.textContent = s + ' season:';
      if ((el = document.getElementById('stat-races'))) el.textContent = st.races;
      if ((el = document.getElementById('stat-wins'))) el.textContent = st.wins;
      if ((el = document.getElementById('stat-podiums'))) el.textContent = st.podiums;
    }}
  }}

  showSeason(season);

  var sel = document.getElementById('season-select');
  var prevBtn = document.getElementById('season-prev');
  var nextBtn = document.getElementById('season-next');
  function updateNavBtns(yr) {{
    var idx = availYears.indexOf(yr);
    if (prevBtn) prevBtn.disabled = idx >= availYears.length - 1;
    if (nextBtn) nextBtn.disabled = idx <= 0;
  }}
  function goSeason(yr) {{
    if (sel) sel.value = yr;
    localStorage.setItem('pc_year', yr);
    showSeason(yr);
    updateNavBtns(yr);
  }}
  if (sel) {{
    sel.innerHTML = availYears.map(function(y) {{
      return '<option value="' + y + '"' + (y === season ? ' selected' : '') + '>' + y + ' Season</option>';
    }}).join('');
    sel.addEventListener('change', function() {{ goSeason(this.value); }});
  }}
  if (prevBtn) prevBtn.addEventListener('click', function() {{
    var idx = availYears.indexOf(sel ? sel.value : season);
    if (idx < availYears.length - 1) goSeason(availYears[idx + 1]);
  }});
  if (nextBtn) nextBtn.addEventListener('click', function() {{
    var idx = availYears.indexOf(sel ? sel.value : season);
    if (idx > 0) goSeason(availYears[idx - 1]);
  }});
  updateNavBtns(season);

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
        <span class="text-muted small fw-semibold">Series</span>
        <div class="btn-group flex-wrap" id="club-nav">{_cross_club_nav(slug, club_id, clubs_cfg)}</div>
      </div>
      <div class="d-flex align-items-center gap-2">
        <span class="text-muted small fw-semibold">Season</span>
        <button id="season-prev" class="btn btn-sm btn-outline-secondary" disabled>&larr;</button>
        <select id="season-select" class="form-select form-select-sm" style="min-width:110px"></select>
        <button id="season-next" class="btn btn-sm btn-outline-secondary" disabled>&rarr;</button>
      </div>
    </div>
  </div>
</div>
<div class="container-fluid px-2 px-sm-3">
  {racer_nav}
  <div class="d-flex flex-wrap align-items-baseline gap-3 mb-2">
    <h2 class="mb-0">{name}</h2>
    {stats_html}
  </div>
  {body_html}
</div>
<script>{all_charts_js}</script>
{nav_js}
{season_tab_js}""" + _foot()

        (racer_club_dir / f"{slug}.html").write_text(html)
        _valid_racer_slugs.add(slug)

    print(f"Generated: site/{current_club}/racer/ ({len(racer_data)} pages)")


def generate_clubs_page(data: dict) -> None:
    """Generate series.html — one section per series with expanded stats."""
    import yaml
    clubs_config_path = Path(__file__).parent.parent / "data" / "clubs.yaml"
    clubs_cfg = {}
    series_cfg_path = Path(__file__).parent.parent / "data" / "series.yaml"
    organizers_cfg = {}
    if clubs_config_path.exists():
        with open(clubs_config_path) as f:
            clubs_cfg = yaml.safe_load(f).get("clubs", {})
    if series_cfg_path.exists():
        with open(series_cfg_path) as f:
            organizers_cfg = yaml.safe_load(f).get("organizers", {})

    sections = ""
    _site_order = ["pnw", "bepc-summer", "sckc-duck-island", "none"]
    _ordered_clubs = [(c, data["clubs"][c]) for c in _site_order if c in data["clubs"]]
    _ordered_clubs += [(c, data["clubs"][c]) for c in data["clubs"] if c not in _site_order]
    for club_id, club in _ordered_clubs:
        cfg = clubs_cfg.get(club_id, {})
        name = cfg.get("name", club.get("name", club_id))
        short = cfg.get("short_name", name)
        desc = cfg.get("description", "").strip()
        homepage = cfg.get("homepage_url", "")
        organizer_ids = cfg.get("organizers", []) or []
        earliest_year = min(club["seasons"].keys())
        latest_year = max(club["seasons"].keys())
        year_range = f"{earliest_year}–{latest_year}"
        total_races = sum(len(s["races"]) for s in club["seasons"].values())
        total_racers = len({r["canonical_name"] for s in club["seasons"].values()
                            for race in s["races"] for r in race["results"]})

        # Top 5 racers by handicap points in current season
        # Skip for Independent — no indexed competition
        top_racers = []
        if club_id != "none":
            current_year = club["current_season"]
            season_racers = {}
            for race in club["seasons"].get(current_year, {}).get("races", []):
                for r in race["results"]:
                    n = r["canonical_name"]
                    if n not in season_racers or r["season_handicap_points"] > season_racers[n]:
                        season_racers[n] = r["season_handicap_points"]
            top_racers = sorted(season_racers.items(), key=lambda x: -x[1])[:5]
        top_html = ""
        if top_racers:
            top_html = f'<p class="text-muted small mb-1 fw-semibold">{current_year} top racers (indexed pts):</p><div class="d-flex flex-wrap gap-2 mb-3">'
            for n, pts in top_racers:
                s = _slug(n)
                link = f'<a href="{club_id}/racer/{s}.html" class="badge bg-light text-dark border text-decoration-none">{n} <span class="text-muted">({pts})</span></a>'
                top_html += link
            top_html += "</div>"

        organizers_html = ""
        if organizer_ids:
            items = []
            for oid in organizer_ids:
                o_name = organizers_cfg.get(oid, {}).get("name", oid)
                items.append(o_name)
            organizers_html = (
                f'<p class="small mb-2"><strong>Organizers:</strong> '
                + ", ".join(items) + '</p>'
            )

        # For Independent: note that indexes aren't tracked
        index_note_html = ""
        if club_id == "none":
            index_note_html = '<p class="text-muted small mb-2"><em>Indexes are not tracked for this series — finish times only.</em></p>'

        if club_id == "none":
            action_buttons = f'<a href="{club_id}/results.html" class="btn btn-outline-primary btn-sm">Results</a>'
        else:
            action_buttons = (
                f'<a href="{club_id}/results.html" class="btn btn-outline-primary btn-sm">Results</a>'
                f'<a href="{club_id}/standings.html" class="btn btn-outline-secondary btn-sm">Standings</a>'
                f'<a href="{club_id}/trajectories.html" class="btn btn-outline-secondary btn-sm">Trajectories</a>'
                f'<a href="{club_id}/racer/index.html" class="btn btn-outline-secondary btn-sm">Racers</a>'
            )
        sections += f"""
<div class="mb-5">
  <h2>{name}</h2>
  <p class="text-muted">{desc}</p>
  {organizers_html}
  {index_note_html}
  <div class="d-flex flex-wrap gap-3 mb-3">
    <span><strong>{total_races}</strong> races</span>
    <span><strong>{total_racers}</strong> racers</span>
    <span><strong>{year_range}</strong></span>
  </div>
  {top_html}
  <div class="d-flex flex-wrap gap-2">
    {action_buttons}
    {f'<a href="{homepage}" target="_blank" class="btn btn-outline-secondary btn-sm">Website ↗</a>' if homepage else ''}
  </div>
  <hr class="mt-4">
</div>"""

    html = _head("Series — PaddleRace") + _nav("Series", data=data, depth=0) + f"""
<div class="container" style="max-width:800px">
  <h1 class="mb-4">Series</h1>
  <p class="text-muted mb-4">Each series is a collection of races with a consistent and competitive field of paddlers. Within a series, each paddler builds an Index that reflects their relative performance. From that index we calculate a projected finish time for each race, and how each paddler performs against their projection determines the podium.</p>
  {sections}
</div>""" + _foot()
    (SITE_DIR / "series.html").write_text(html)
    print("Generated: site/series.html")


def generate_about(data: dict = None) -> None:
    html = _head("About — PaddleRace") + _nav("About", data=data, depth=0) + """
<style>
dl dt { font-weight: 600; margin-top: 1.2em; }
dl dd { margin-left: 0; color: #333; }
dl dt:first-child { margin-top: 0; }
</style>
<div class="container" style="max-width:720px">
  <h1>About PaddleRace</h1>

  <p>PaddleRace tracks open water paddle races and results in the Pacific Northwest. Instead of splitting the field into craft and age-group categories we measure each paddler against their own history. We then award virtual trophies to competitors who performed best relative to their standard.</p>

  <p>Contact: <a href="mailto:mike.liddell@gmail.com">mike.liddell@gmail.com</a> &middot; <a href="https://github.com/Mike3XL/bepc-racing/issues" target="_blank">GitHub issues</a>.</p>

  <h2>How indexed results work</h2>

  <p>Each racer has a performance <strong>index</strong> per series and craft category — a multiplier reflecting their typical pace.</p>

  <p>After each race, every racer's finish time divided by their index gives an estimate of the <strong>par time</strong> for the course. We sort the estimates and take the 30th-percentile value to be the <em>official par time</em>. Once we have the par time we calculate the projected time for each racer as <em>par x index</em> and compare their actual result with their projected time.</p>

  <p>The <strong>par racer trophy</strong> is just a fun recognition for the racer who happened to define par that day.</p>

  <h2>FAQ</h2>

  <dl>
    <dt>How do I get my results added?</dt>
    <dd>Results for tracked series are added automatically after each race if they're on a supported platform (WebScorer, Race Result, or Jericho). For missing results or new series, contact us.</dd>

    <dt>Why no age groups, gender categories, or open-water kayak sub-types (SK, FSK, HPK)?</dt>
    <dd>The indexed system makes them unnecessary — each racer competes against their own projected times, not directly against others. Splitting further would also leave too few racers per group for a reliable index. Many racers also choose their boat based on conditions, so we track K-1 performance broadly. See <a href="http://www.soundrowers.org/boat-classes/determining-kayak-classifications/" target="_blank">Sound Rowers kayak classifications</a> for SK/FSK/HPK definitions.</dd>

    <dt>Why are there craft categories at all?</dt>
    <dd>A racer's SUP and K-1 performances are genuinely different things. Grouping them would mean the index tracks two different profiles at once. Within a category, specific boat models are treated as equivalent.</dd>

    <dt>What do the craft abbreviations mean?</dt>
    <dd>K-1/K-2: single/double kayak. OC-1/OC-2/OC-6: outrigger canoe. Va'a: rudderless Polynesian outrigger. SUP: stand-up paddleboard. Prone: prone paddleboard. Specific models (e.g. "Surfski") appear in parentheses where known.</dd>

    <dt>What does ^ mean on a result?</dt>
    <dd>Outlier — the result was more than 10% outside projection and the index was not updated. Also used for a racer's first result back after a long absence.</dd>

    <dt>What is the streak trophy?</dt>
    <dd>Awared to racers who have three or more consecutive races beating their projected time. Rewards steady improvement.</dd>

    <dt>Why track indexed time at all?</dt>
    <dd>Finish time shows who was fastest. Indexed time shows who performed best relative to their own history — rewarding improvement rather than raw speed.</dd>

    <dt>What does "establishing index" mean?</dt>
    <dd>Your first three ranked races in a series set your initial index. Only established racers are considered for indexed-time awards. Races in small groups or on ineligible courses don't count toward establishment — only ranked races do.</dd>

    <dt>What is an outlier?</dt>
    <dd>A result more than 10% outside projection. The index doesn't change — protecting against wrong turns, equipment failures, or other anomalies. If a racer is flagged outlier three races in a row, the system auto-resets their index to the mean of those three races and they resume normal racing.</dd>

    <dt>Can people game the system?</dt>
    <dd>Yes. Variable effort in different races will cause a fluctuating index and potentially a high number of podiums. We protect against 
    inadvertant issues by ignoring results that are more than 10% higher than projection.</dd>

    <dt>How is the index updated?</dt>
    <dd>
      <table class="table table-bordered table-sm mt-2">
        <thead><tr><th>Situation</th><th>Update</th></tr></thead>
        <tbody>
          <tr><td>Establishment race 1</td><td>Index = result vs par (100%)</td></tr>
          <tr><td>Establishment race 2</td><td>80% shift toward new result</td></tr>
          <tr><td>Establishment race 3</td><td>60% shift toward new result (racer is now established)</td></tr>
          <tr><td>Faster than projected</td><td>30% shift toward new result</td></tr>
          <tr><td>Slower than projected</td><td>15% shift toward new result</td></tr>
          <tr><td>Outlier (&gt;10% off)</td><td>No change (but see auto-reset below)</td></tr>
          <tr><td>3 outliers in a row</td><td>Auto-reset to mean of those three races</td></tr>
        </tbody>
      </table>
      During establishment the weighting is biased toward more recent races. Final weights on the three establishment-race results are 8% / 32% / 60%, reflecting the common pattern that racers improve through their first few races.
    </dd>

    <dt>How is the projected time calculated?</dt>
    <dd>
      <strong>Projected time = Par time × Your index</strong><br>
      And par time is a consensus estimate from observing the result of all the established racers.<br>
      Example: par 52:00, index 0.847 → projected 44:02. Finish 43:01 → 61 seconds faster than projected → index improves.
    </dd>

    <dt>What are indexed points vs finish points?</dt>
    <dd>Finish points: 10 for 1st down to 1 for 10th, by crossing order. Indexed points: same scale, by indexed time order. Not awarded during establishment (first three ranked races) or on the auto-reset race. In multi-distance races, points are weighted by group size.</dd>
  </dl>

  <h2>References</h2>

  <h5>Race organizers</h5>
  <ul>
    <li><a href="https://www.pnworca.org" target="_blank">PNWORCA</a> — Pacific Northwest Outrigger Racing Canoe Association. Annual Winter Series and regional events.</li>
    <li><a href="https://www.soundrowers.org" target="_blank">Sound Rowers</a> — full season of distance races across Puget Sound and beyond.</li>
    <li><a href="https://www.soundrowers.org/race-schedule/bellingham-bay-rough-water-race/" target="_blank">Bellingham Bay Outrigger Paddlers (BBOP)</a> — Peter Marcus Rough Water Race.</li>
    <li><a href="https://www.gorgedownwindchamps.com" target="_blank">Gorge Downwind Champs</a> — annual downwind race, Columbia River Gorge.</li>
    <li><a href="https://www.ghckrt.com" target="_blank">Gig Harbor Canoe &amp; Kayak Racing Team</a> — Paddlers Cup and Eric Hughes Memorial Regatta.</li>
    <li><a href="https://www.jerichooutrigger.com" target="_blank">Jericho Beach Outrigger Canoe Club</a> — Da Grind, Keats Chop, Whipper Snapper, Wake Up the Gorge.</li>
    <li><a href="https://www.ballardelks.org/paddle-club" target="_blank">Ballard Elks Paddle Club (BEPC)</a> — weekly Monday night series, Shilshole Bay.</li>
    <li><a href="https://www.sckc.ws" target="_blank">Seattle Canoe and Kayak Club (SCKC)</a> — Duck Island Race series, Green Lake.</li>
  </ul>

  <h5>Data sources</h5>
  <ul>
    <li><a href="https://www.webscorer.com" target="_blank">WebScorer</a> — BEPC, Sound Rowers, SCKC, and many PNW Regional events.</li>
    <li><a href="https://www.raceresult.com" target="_blank">Race Result</a> — Gorge Downwind Champs and Pacific Multisports events.</li>
    <li><a href="https://register.pacificmultisports.com" target="_blank">Pacific Multisports</a> — Peter Marcus, Narrows Challenge, Gorge Downwind, and others.</li>
    <li><a href="https://www.jerichooutrigger.com" target="_blank">Jericho Beach Outrigger Canoe Club</a> — PNWORCA and BC race results.</li>
  </ul>

  <h5>Methodology</h5>
  <p>The index system uses the same multiplicative time-correction approach as used by the TopYacht sailing system. 
  We have adjusted some of the terminology to (hopefully) make it more accessible but the core concept and math is unchanged.</p>
  <ul>
    <li><a href="https://topyacht.com.au/web/" target="_blank">TopYacht</a> — Back Calculated Handicap (BCH) methodology that inspired this approach.</li>
    <li><a href="https://rycv.com.au/sailing/rules-handicaps/" target="_blank">Royal Yacht Club of Victoria</a> — AHC/BCH/CHC system in practice.</li>
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


def _cross_club_nav(slug: str, current_club: str, clubs_cfg: dict) -> str:
    """Build club nav buttons for a racer page using the pre-built _SLUG_CLUBS map.
    Excludes `none` from the selector — per-series racer pages exist there but we
    don't show it as a clickable filter (too few races to be meaningful)."""
    clubs = _SLUG_CLUBS.get(slug, [current_club])
    btns = ""
    for cid in sorted(clubs):
        if cid == "none" and current_club != "none":
            continue
        short = clubs_cfg.get(cid, {}).get("short_name", cid)
        active = " active" if cid == current_club else ""
        href = f"{slug}.html" if cid == current_club else f"../../{cid}/racer/{slug}.html"
        btns += f'<a class="btn btn-sm btn-outline-secondary{active}" href="{href}">{short}</a>\n'
    return btns


def _build_search_map(data: dict, verify_files: bool = False) -> None:
    """Build the global racer search map from race data."""
    global _RACER_SEARCH_MAP, _SLUG_CLUBS
    racer_clubs: dict[str, set] = {}
    for club_id, club in data["clubs"].items():
        for year, season in club["seasons"].items():
            for race in season["races"]:
                for r in race["results"]:
                    racer_clubs.setdefault(r["canonical_name"], set()).add(club_id)
    _SLUG_CLUBS = {}
    for name, clubs in racer_clubs.items():
        s = _slug(name)
        if verify_files:
            valid = sorted(c for c in clubs if (SITE_DIR / c / "racer" / f"{s}.html").exists())
        else:
            valid = sorted(clubs)
        if valid:
            _SLUG_CLUBS[s] = valid
    _RACER_SEARCH_MAP = json.dumps([
        {"name": name, "slug": _slug(name), "clubs": _SLUG_CLUBS.get(_slug(name), sorted(clubs))}
        for name, clubs in sorted(racer_clubs.items())
        if _slug(name) in _SLUG_CLUBS
    ])


def generate_how_it_works(data: dict = None) -> None:
    """Render the handicap-racing explainer as a regular site page with nav.

    Source: bepc/how-it-works-template.html (standalone, self-contained HTML).
    The template uses `.htw-*` prefixed classes so it won't collide with Bootstrap.
    We extract its <style>, <body> content, and <script> and wrap them with the
    standard site head + nav. Output: site/how-it-works.html.
    """
    import re as _re
    tpl_path = Path(__file__).parent / "how-it-works-template.html"
    tpl = tpl_path.read_text()
    m_style = _re.search(r"<style>([\s\S]*?)</style>", tpl)
    m_body  = _re.search(r"<body>([\s\S]*?)</body>", tpl)
    if not (m_style and m_body):
        raise RuntimeError("how-it-works-template.html: missing <style> or <body>")
    style_inner = m_style.group(1)
    body_inner = m_body.group(1).strip()

    # extra_css fed into _head goes inside <head>, so styles apply before body renders
    extra_css = f"<style>{style_inner}</style>"
    html = _head("How it works — PaddleRace", extra_css=extra_css) \
         + _nav("How it works", data=data, depth=0) \
         + f'<div class="htw-root">{body_inner}</div></body></html>'

    out = SITE_DIR / "how-it-works.html"
    out.write_text(html)
    print(f"Generated: {out.relative_to(SITE_DIR.parent)}")


def generate_platform_home(data: dict) -> None:
    """Generate the PaddleRace platform home page with club list and recent race feed."""
    import yaml, json as _json
    clubs_config_path = Path(__file__).parent.parent / "data" / "clubs.yaml"
    series_config_path = Path(__file__).parent.parent / "data" / "series.yaml"
    clubs_cfg = {}
    organizers_cfg = {}
    if clubs_config_path.exists():
        with open(clubs_config_path) as f:
            clubs_cfg = yaml.safe_load(f).get("clubs", {})
    if series_config_path.exists():
        with open(series_config_path) as f:
            organizers_cfg = yaml.safe_load(f).get("organizers", {})

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
                # Find top-10 corrected and finish for this club/course
                course_label = race["name"].split(" — ")[1] if " — " in race["name"] else None
                def _fmt_time(s):
                    if s is None: return ""
                    s = float(s)
                    m, sec = divmod(int(s), 60)
                    h, m = divmod(m, 60)
                    if h: return f"{h}:{m:02d}:{sec:02d}"
                    return f"{m}:{sec:02d}"
                def _fmt_delta(seconds):
                    if seconds is None: return ""
                    sign = "−" if seconds < 0 else "+"
                    s = abs(int(seconds)); m,sec = divmod(s,60); h,m2 = divmod(m,60)
                    return f"{sign}{h}:{m2:02d}:{sec:02d}" if h else f"{sign}{m:02d}:{sec:02d}"
                # corrected top-10 by adjusted_place
                corr_sorted = sorted(
                    [r for r in race["results"] if r.get("eligible_adjusted_place",0) > 0],
                    key=lambda x: x.get("eligible_adjusted_place", 999)
                )[:10]
                # Eligibility: suppress corrected results if <=5 established racers
                _n_established = sum(
                    1 for r in race["results"]
                    if r.get("handicap", 1.0) != 1.0 and r.get("time_versus_par", 0) > 0
                )
                _course_eligible = _n_established > 5
                def _predicted(r):
                    ft=r.get("time_seconds"); tvp=r.get("time_versus_par"); idx=r.get("handicap",1.0)
                    if ft and tvp and tvp>0: return _fmt_time(ft/tvp*idx)
                    return ""
                def _pct(r):
                    ft=r.get("time_seconds"); tvp=r.get("time_versus_par"); idx=r.get("handicap",1.0)
                    if ft and tvp and tvp>0:
                        pred=ft/tvp*idx; return round((1-ft/pred)*100,1) if pred>0 else 0.0
                    return 0.0
                corr_top10 = [{"name": r["canonical_name"],
                                "ct": _fmt_time(r.get("adjusted_time_seconds")),
                                "ft": _fmt_time(r.get("time_seconds")),
                                "idx": f"{r.get('handicap',1.0):.2f}",
                                "pct": _pct(r),
                                "predicted": _predicted(r),
                                "delta": _fmt_delta((r.get("time_seconds") - float(r.get("time_seconds"))/float(r.get("time_versus_par"))*float(r.get("handicap",1.0))) if r.get("time_versus_par") and r.get("time_versus_par")>0 and r.get("time_seconds") else None),
                                "place": r.get("eligible_adjusted_place",0),
                                "trophy": next((t for t in r.get("trophies",[]) if t in ("hcap_1","hcap_2","hcap_3")), None)}
                               for r in corr_sorted]
                if not _course_eligible:
                    corr_top10 = []
                # finish top-10 by original_place
                fin_sorted = sorted(race["results"], key=lambda x: x.get("original_place", 999))[:10]
                fin_top10 = [{"name": r["canonical_name"],
                               "ft": _fmt_time(r.get("time_seconds")),
                               "idx": f"{r.get('handicap',1.0):.2f}",
                               "predicted": _predicted(r),
                               "place": r.get("original_place",0),
                               "trophy": next((t for t in r.get("trophies",[]) if t in ("finish_1","finish_2","finish_3")), None)}
                              for r in fin_sorted]
                entry = race_map[key]
                existing = next((c for c in entry["clubs"] if c["id"] == club_id), None)
                if existing is None:
                    existing = {
                        "id": club_id,
                        "name": club_name,
                        "type": club_type,
                        "courses": [],
                        "race_id": race["race_id"],
                    }
                    entry["clubs"].append(existing)
                existing["courses"].append({"label": course_label, "corr_top10": corr_top10, "fin_top10": fin_top10, "starters": len(race["results"])})

    from datetime import datetime
    def _parse_date(d):
        for fmt in ("%b %d, %Y", "%B %d, %Y", "%Y-%m-%d"):
            try: return datetime.strptime(d, fmt)
            except: pass
        return datetime.min

    # Collect last 10 races per club, union+dedup
    _per_club = {}
    for key, entry in race_map.items():
        for c in entry["clubs"]:
            cid = c["id"]
            _per_club.setdefault(cid, []).append(entry)
    _seen = set()
    _union = []
    for cid, races in _per_club.items():
        for r in sorted(races, key=lambda x: _parse_date(x["date"]), reverse=True)[:10]:
            k = id(r)
            if k not in _seen:
                _seen.add(k)
                _union.append(r)
    recent_races = sorted(_union, key=lambda x: _parse_date(x["date"]), reverse=True)[:10]

    # Load upcoming races
    upcoming_path = Path(__file__).parent.parent / "data" / "upcoming.yaml"
    upcoming_races = []
    if upcoming_path.exists():
        with open(upcoming_path) as f:
            upcoming_data = yaml.safe_load(f) or {}
        today = datetime.today().date()
        from collections import Counter
        club_counts: Counter = Counter()
        for race in sorted(upcoming_data.get("upcoming", []), key=lambda x: x.get("date", "")):
            try:
                race_date = datetime.strptime(race["date"], "%Y-%m-%d").date()
            except Exception:
                continue
            if race_date <= today:
                continue
            # Support both 'club' (single) and 'clubs' (list)
            race_clubs = race.get("clubs", [race.get("club", "")] if race.get("club") else [])
            # Use first club for count limiting (primary club)
            primary = race_clubs[0] if race_clubs else ""
            # no per-club cap
            club_counts[primary] += 1
            club_badges = " ".join(
                f'<a href="{c}/results.html" class="badge bg-light text-dark border text-decoration-none" style="font-size:0.75em">{clubs_cfg.get(c, {}).get("short_name", c)}</a>'
                for c in race_clubs
            ) if race_clubs else '<span class="badge bg-secondary text-white border" style="font-size:0.75em">Unaffiliated</span>'
            upcoming_races.append({
                "name": race["name"],
                "date": race_date.strftime("%b %d, %Y"),
                "clubs_html": club_badges,
                "club_keys": race_clubs,
                "organizer": race.get("organizer", ""),
                "distance": race.get("distance", ""),
                "url": race.get("url", ""),
                "links": race.get("links", []),
                "notes": race.get("notes", ""),
                "location": race.get("location", ""),
            })

    upcoming_rows = ""
    upcoming_club_names = []
    for r in upcoming_races:
        link = f'<a href="{r["url"]}" target="_blank">{r["name"]}</a>' if r["url"] else r["name"]
        notes_td = f'<td class="text-muted small">{r.get("notes","")}</td>' if r.get("notes") else '<td></td>'
        _location_html = f'<div class="text-muted" style="font-size:.8em">{r["location"]}</div>' if r.get("location") else ''
        links_html = ' '.join(
            f'<a href="{lnk["url"]}" target="_blank" class="badge bg-light text-dark border me-1 text-decoration-none">{lnk["label"]} ↗</a>'
            for lnk in sorted(r["links"], key=lambda l: _LINK_ORDER.index(l["label"]) if l["label"] in _LINK_ORDER else len(_LINK_ORDER))
        )
        links_td = f'<td class="text-nowrap">{links_html}</td>' if links_html else '<td></td>'
        club_keys = r.get("club_keys", [])
        data_clubs = ' '.join(club_keys)
        for k in club_keys:
            sn = clubs_cfg.get(k, {}).get("short_name", k)
            if sn not in upcoming_club_names:
                upcoming_club_names.append(sn)
        # Two-line date: weekday + date
        from datetime import datetime as _datetime_cls
        try:
            _dt = _datetime_cls.strptime(r["date"], "%b %d, %Y")
            _date_html = f'<span style="font-weight:600">{_dt.strftime("%A")}</span><br><span class="text-muted">{r["date"]}</span>'
        except Exception:
            _date_html = r["date"]
        upcoming_rows += f'<tr data-clubs="{data_clubs}" data-organizer="{r.get("organizer","")}" style="vertical-align:middle"><td class="small text-nowrap">{_date_html}</td><td><strong class="small">{r["name"]}</strong>{_location_html}</td><td>{r["clubs_html"]}</td><td class="small">{organizers_cfg.get(r.get("organizer",""),{}).get("name", r.get("organizer",""))}</td><td class="text-muted small">{r["distance"]}</td>{notes_td}{links_td}</tr>'

    # Split into visible (first 5) and hidden (rest) — single table for column consistency
    row_list = upcoming_rows.split('</tr>')[:-1]
    row_list = [r + '</tr>' for r in row_list]
    upcoming_rows_visible = ''.join(row_list[:5])
    upcoming_rows_hidden = ''.join(
        f'<tr class="upcoming-extra" style="display:none"{r[3:]}' if r.startswith('<tr') else r
        for r in row_list[5:]
    )
    upcoming_rows = upcoming_rows_visible  # keep for backward compat check

    # Build upcoming section HTML
    if upcoming_rows:
        _club_keys_seen = sorted(set(k for r in upcoming_races for k in r.get('club_keys', []) if k != "none"))
        _options = ''.join(
            f'<option value="{clubs_cfg.get(c,{}).get("short_name",c)}">{clubs_cfg.get(c,{}).get("short_name",c)}</option>'
            for c in _club_keys_seen
        )
        _org_keys_seen = sorted(set(r.get('organizer','') for r in upcoming_races if r.get('organizer')))
        _org_options = ''.join(
            f'<option value="{oid}">{organizers_cfg.get(oid,{}).get("name", oid)}</option>'
            for oid in _org_keys_seen
        )
        _show_more = (
            '<button id="upcoming-show-more" class="btn btn-sm btn-outline-secondary mb-3"'
            ' onclick="var rows=document.querySelectorAll(\'#upcoming-table .upcoming-extra\');'
            f'var expand=this.textContent===\'{HOME_PAGE["show_more_label"]}\';'
            'rows.forEach(function(r){if(!r.dataset.filtered)r.style.display=expand?\'\':\'none\';});'
            f'this.textContent=expand?\'{HOME_PAGE["show_less_label"]}\':\'{HOME_PAGE["show_more_label"]}\';">{HOME_PAGE["show_more_label"]}</button>'
            if upcoming_rows_hidden else ''
        )
        upcoming_section_html = (
            f"<div class='d-flex align-items-center gap-2 mb-2 flex-wrap'>"
            f"<h2 class='h5 mb-0'>{HOME_PAGE['upcoming_heading']}</h2>"
            f"<select id='upcoming-club-filter' class='form-select form-select-sm' style='width:auto'>"
            f"<option value=''>{SELECTOR_PLACEHOLDERS['all_series']}</option>{_options}</select>"
            f"<select id='upcoming-org-filter' class='form-select form-select-sm' style='width:auto'>"
            f"<option value=''>{SELECTOR_PLACEHOLDERS['all_organizers']}</option>{_org_options}</select>"
            + (_show_more.replace('mb-3', 'mb-0') if _show_more else '')
            + f"</div>"
            f"<div class='table-responsive mb-1'><table id='upcoming-table' class='table table-sm table-hover'>"
            f"<thead><tr><th style='width:100px'>Date</th><th style='min-width:220px'>Race</th><th style='width:80px'>Series</th><th style='min-width:120px'>Organizer</th><th style='width:80px'>Distance</th>"
            f"<th style='min-width:180px;width:22%'>Notes</th><th style='min-width:160px'>Links</th></tr></thead>"
            f"<tbody>{upcoming_rows_visible}{upcoming_rows_hidden}</tbody></table></div>"
        )
    else:
        upcoming_section_html = ""

    # Compact club strip
    club_strip = ""
    for club_id, club in data["clubs"].items():
        cfg = clubs_cfg.get(club_id, {})
        short = cfg.get("short_name", cfg.get("name", club_id))
        earliest_year = min(club["seasons"].keys())
        latest_year = max(club["seasons"].keys())
        year_range = f"{earliest_year}–{latest_year}"
        total_races = sum(len(s["races"]) for s in club["seasons"].values())
        club_strip += f'<a href="{club_id}/results.html" onclick="localStorage.setItem(\'pc_club\',\'{club_id}\')" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center py-2"><span class="fw-semibold">{short}</span><span class="text-muted small">{total_races} races · {year_range}</span></a>'

    # Club short name map for JS filter
    import json as _json2
    club_short_json = _json2.dumps({cid: clubs_cfg.get(cid, {}).get("short_name", cid) for cid in data["clubs"]})

    # Recent races feed — new interactive podium design
    feed_rows = ""
    _re = __import__('re')
    _race_counter = [0]  # unique ID per race row

    # SVG icons
    _CUP = {
        2: '<svg width="20" height="20" viewBox="0 0 24 24"><path d="M4 3 Q4 15 12 15 Q20 15 20 3 Z" fill="#C0C0C0" stroke="#707070" stroke-width="1.8"/><path d="M4 5 Q0 5 0 9 Q0 13 4 12" fill="none" stroke="#707070" stroke-width="1.8"/><path d="M20 5 Q24 5 24 9 Q24 13 20 12" fill="none" stroke="#707070" stroke-width="1.8"/><rect x="11" y="15" width="2" height="3.5" fill="#707070"/><rect x="6" y="18.5" width="12" height="2.5" rx="1" fill="#707070"/><text x="12" y="12.5" text-anchor="middle" font-size="9" font-weight="bold" fill="#111">2</text></svg>',
        1: '<svg width="20" height="20" viewBox="0 0 24 24"><path d="M4 3 Q4 15 12 15 Q20 15 20 3 Z" fill="#FFD700" stroke="#B8860B" stroke-width="1.8"/><path d="M4 5 Q0 5 0 9 Q0 13 4 12" fill="none" stroke="#B8860B" stroke-width="1.8"/><path d="M20 5 Q24 5 24 9 Q24 13 20 12" fill="none" stroke="#B8860B" stroke-width="1.8"/><rect x="11" y="15" width="2" height="3.5" fill="#B8860B"/><rect x="6" y="18.5" width="12" height="2.5" rx="1" fill="#B8860B"/><text x="12" y="12.5" text-anchor="middle" font-size="9" font-weight="bold" fill="#7A5C00">1</text></svg>',
        3: '<svg width="20" height="20" viewBox="0 0 24 24"><path d="M4 3 Q4 15 12 15 Q20 15 20 3 Z" fill="#DDA84A" stroke="#B07020" stroke-width="1.8"/><path d="M4 5 Q0 5 0 9 Q0 13 4 12" fill="none" stroke="#B07020" stroke-width="1.8"/><path d="M20 5 Q24 5 24 9 Q24 13 20 12" fill="none" stroke="#B07020" stroke-width="1.8"/><rect x="11" y="15" width="2" height="3.5" fill="#B07020"/><rect x="6" y="18.5" width="12" height="2.5" rx="1" fill="#B07020"/><text x="12" y="12.5" text-anchor="middle" font-size="9" font-weight="bold" fill="#5C2E00">3</text></svg>',
    }
    _FLAG = {
        2: '<svg width="20" height="20" viewBox="0 0 24 24" style="display:block"><rect x="4" y="1" width="2" height="22" rx="1" fill="#555"/><path d="M6 2 L21 9 L6 18 Z" fill="#C0C0C0" stroke="#707070" stroke-width="1.2"/><text x="11" y="9" text-anchor="middle" dominant-baseline="central" font-size="9" font-weight="bold" fill="#333">2</text></svg>',
        1: '<svg width="20" height="20" viewBox="0 0 24 24" style="display:block"><rect x="4" y="1" width="2" height="22" rx="1" fill="#555"/><path d="M6 2 L21 9 L6 18 Z" fill="#FFD700" stroke="#9A7000" stroke-width="1.2"/><text x="11" y="9" text-anchor="middle" dominant-baseline="central" font-size="9" font-weight="bold" fill="#7A5C00">1</text></svg>',
        3: '<svg width="20" height="20" viewBox="0 0 24 24" style="display:block"><rect x="4" y="1" width="2" height="22" rx="1" fill="#555"/><path d="M6 2 L21 9 L6 18 Z" fill="#DDA84A" stroke="#B07020" stroke-width="1.2"/><text x="11" y="9" text-anchor="middle" dominant-baseline="central" font-size="9" font-weight="bold" fill="#5C2E00">3</text></svg>',
    }
    _PODIUM_COLORS = {
        1: ("#7A5C00", "#FFF8DC", "#FFD700", "600"),
        2: ("#555",    "#EBEBEB", "#A0A0A0", "400"),
        3: ("#5C2E00", "#FDF0E0", "#DDA84A", "400"),
    }
    _PODIUM_H = {1: 66, 2: 58, 3: 58}

    def _dist_key(lbl):
        m2 = _re.search(r'(\d+(?:\.\d+)?)\s*(mi|mile|km)', lbl or '', _re.I)
        if not m2: return 0.0
        val = float(m2.group(1))
        return -(val * 1.609 if 'mi' in m2.group(2).lower() else val)

    def _short_dist(lbl):
        if not lbl: return ""
        m = _re.search(r'(\d+(?:\.\d+)?)\s*(mi|mile|km|m)', lbl, _re.I)
        if not m: return lbl.split()[0]
        unit = 'km' if 'km' in m.group(2).lower() else ('m' if m.group(2).lower() == 'm' else 'mi.')
        return f"{m.group(1)} {unit}"

    def _podium_col_c(place, entry, cid):
        tc, bg, bdr, fw = _PODIUM_COLORS.get(place, ("#555","#f8f9fa","#ccc","400"))
        h = _PODIUM_H.get(place, 52)
        icon = _CUP.get(place, "")
        name = _racer_link(entry["name"], club_id=cid)
        idx = entry.get("idx","")
        pct = entry.get("pct", 0.0)
        ft = entry.get("ft","")
        predicted = entry.get("predicted","")
        delta = entry.get("delta","")
        _pct_val = pct if pct is not None else 0.0
        _tip_dir = HOME_PAGE["podium_tip_faster"] if _pct_val >= 0 else HOME_PAGE["podium_tip_slower"]
        tooltip = HOME_PAGE["podium_tip"].format(
            finish=ft or "—",
            pct=f"{abs(_pct_val):.1f}",
            direction=_tip_dir,
            projected=predicted or "—",
        )
        return (f'<div class="podium-col">'
                f'<div class="p-icon">{icon}</div>'
                f'<div class="p-namerow"><span class="p-name" style="color:{tc}">{name}</span></div>'
                f'<div class="p-bar" style="height:{h}px;background:{bg};border:1px solid {bdr}"'
                f' data-bs-toggle="tooltip" title="{tooltip}">'
                f'<span class="p-diff" style="color:{tc}">{f"{pct:+.1f}%" if pct is not None else ""}</span>'
                f'<div class="p-spacer"></div>'
                f'<div class="p-timerow" style="color:{tc}"><span class="p-tlabel">{HOME_PAGE["podium_actual"]}</span><span class="p-tval">{ft}</span></div>'
                f'<div class="p-timerow" style="color:{tc}"><span class="p-tlabel">{HOME_PAGE["podium_projected"]}</span><span class="p-tval">{predicted or "—"}</span></div>'
                f'</div></div>')

    def _podium_col_f(place, entry, cid):
        tc, bg, bdr, fw = _PODIUM_COLORS.get(place, ("#555","#f8f9fa","#ccc","400"))
        h = _PODIUM_H.get(place, 52)
        icon = _FLAG.get(place, "")
        name = _racer_link(entry["name"], club_id=cid)
        idx = entry.get("idx","")
        ft = entry.get("ft","")
        predicted = entry.get("predicted","")
        return (f'<div class="podium-col">'
                f'<div class="p-icon">{icon}</div>'
                f'<div class="p-namerow"><span class="p-name" style="color:{tc}">{name}</span></div>'
                f'<div class="p-bar" style="height:{h}px;background:{bg};border:1px solid {bdr};display:flex;align-items:center;justify-content:center;">'
                f'<span style="font-size:.88em;font-weight:700;color:{tc};text-align:center">{ft}</span>'
                f'</div></div>')

    def _also_ran(entries, start=4, end=10):
        parts = [f'{e["place"]}th: {e["name"]}' for e in entries[3:end] if e.get("name")]
        return ' &nbsp;&nbsp; '.join(parts) if parts else ""

    def _build_course_panels(rid, courses_data, club_id, club_short, view_cls, podium_type="Result vs Projected"):
        """Build course blocks for one club view."""
        html = ""
        for ci, cd in enumerate(sorted(courses_data, key=lambda x: _dist_key(x["label"] or ""))):
            lbl = cd.get("label") or ""
            dist = _short_dist(lbl) if lbl else ""
            top10 = cd.get("corr_top10", [])
            fin10 = cd.get("fin_top10", [])
            mt = " mt-2" if ci > 0 else ""
            # corrected podium — only if par is established (predicted non-empty)
            par_valid = any(e.get("predicted") for e in top10)
            c_cols = ""
            for place in [2, 1, 3]:
                entry = next((e for e in top10 if e["place"] == place), None)
                _tc,_bg,_bdr,_fw = _PODIUM_COLORS.get(place,("#aaa","#f8f9fa","#ddd","400"))
                _h = _PODIUM_H.get(place,52)
                if entry and par_valid:
                    c_cols += _podium_col_c(place, entry, club_id)
                else:
                    c_cols += (f'<div class="podium-col"><div class="p-icon">{_CUP.get(place,"")}</div>'
                               f'<div class="p-namerow"><span class="p-name" style="color:#bbb">—</span></div>'
                               f'<div class="p-bar" style="height:{_h}px;background:#f8f9fa;border:1px solid #eee"></div></div>')
            c_ar = _also_ran(top10)
            # finish podium
            f_cols = ""
            for place in [2, 1, 3]:
                entry = next((e for e in fin10 if e["place"] == place), None)
                if entry:
                    f_cols += _podium_col_f(place, entry, club_id)
                else:
                    _tc2,_bg2,_bdr2,_fw2 = _PODIUM_COLORS.get(place,("#aaa","#f8f9fa","#ddd","400"))
                    _h2 = _PODIUM_H.get(place,32)
                    f_cols += f'<div class="podium-col">{_FLAG.get(place,"")}<span class="podium-name" style="color:#bbb">—</span><div class="podium-bar" style="height:{_h2}px;background:{_bg2};border:1px solid {_bdr2}"></div></div>'
            f_ar = _also_ran(fin10)
            html += (
                f'<div class="rc-course{mt}">'
                f'<div class="rc-course-row">'
                f'<div class="rc-course-name-side">{dist}</div>'
                f'<div class="podium-wrap">'
                f'<div class="view-panel {view_cls} active" id="{rid}-{view_cls}-{ci}">'
                f'<div class="podium-bars">{c_cols}</div>'
                f'<div class="podium-base"></div>'
                f'<div class="also-ran-single">{c_ar}</div></div>'
                f'<div class="view-panel view-finish" id="{rid}-finish-{ci}">'
                f'<div class="podium-bars">{f_cols}</div>'
                f'<div class="podium-base"></div>'
                f'<div class="also-ran-single">{f_ar}</div></div>'
                f'</div></div></div>'
            )
        return html

    _CLUB_PREF = ["pnw-regional"]

    for r in recent_races:
        _race_counter[0] += 1
        rid = f"r{_race_counter[0]}"

        # Sort clubs: preferred first
        clubs_sorted = sorted(r["clubs"], key=lambda c: (0 if c["id"] in _CLUB_PREF else 1, c["name"]))
        primary = clubs_sorted[0] if clubs_sorted else None

        # Primary club results link
        _p0 = clubs_sorted[0] if clubs_sorted else None
        _p0_slug = data.get("race_slugs", {}).get(_p0["id"], {}).get(_p0.get("race_id",""), "") if _p0 else ""
        _primary_results = f'{_p0["id"]}/results/{_p0_slug}.html' if _p0 and _p0_slug else ""

        # Build pill row: [vs Projected] | [Finish Time]
        _primary_view = "view-c0"
        pill_html = ('<div class="rc-pill-row">'
                     f'<a class="sel-pill corr-pill active" onclick="pdmView(this,\'{rid}\',\'{_primary_view}\',false)" href="#">{HOME_PAGE["pill_vs_projected"]}</a>'
                     '<span class="pill-sep">|</span>'
                     f'<a class="sel-pill finish-pill" onclick="pdmView(this,\'{rid}\',\'view-finish\',true)" href="#">{HOME_PAGE["pill_finish_time"]}</a>'
                     '</div>')

        # Build podium panels for each club
        panels_html = ""
        for ci, c in enumerate(clubs_sorted):
            view_cls = f"view-c{ci}"
            _cslug = data.get("race_slugs", {}).get(c["id"], {}).get(c.get("race_id",""), "")
            _cresults = f'{c["id"]}/results/{_cslug}.html' if _cslug else ""
            _ptype = f'Result vs Projected'
            course_panels = _build_course_panels(rid, c.get("courses", []), c["id"],
                                                  clubs_cfg.get(c["id"], {}).get("short_name", c["name"]),
                                                  view_cls, podium_type=_ptype)
            # results link now in meta row, not per-course
            display = "" if ci == 0 else ' style="display:none"'
            panels_html += f'<div class="club-panel" id="{rid}-club-{ci}"{display}>{course_panels}</div>'

        _date_str = r["date"]
        try:
            _d = _parse_date(_date_str)
            _date_fmt = f'{_d.strftime("%b")} {_d.day}, {_d.year}' if _d.year > 1 else _date_str
        except Exception:
            _date_fmt = _date_str
        feed_rows += (
            f'<div class="rc-card feed-row">'
            f'<div class="rc-name">{r["name"]}</div>'
            f'<div class="rc-meta-row">'
            f'<span class="rc-date">{_date_fmt}</span>'
            + (f'<a href="{_primary_results}" class="rc-results-link">Full Results →</a>' if _primary_results else '')
            + f'</div>'
            f'{pill_html}'
            f'{panels_html}'
            f'</div>'
        )

    # Split feed rows and collect club keys
    _feed_row_list = [s for s in feed_rows.split('<div class="rc-card') if s.strip()]
    _feed_row_list = ['<div class="rc-card' + s.rstrip() for s in _feed_row_list]
    feed_rows_visible = ''.join(_feed_row_list[:5])
    feed_rows_hidden = ''.join(
        r.replace('<div class="rc-card', '<div class="rc-card feed-hidden" style="display:none"', 1)
        for r in _feed_row_list[5:]
    )
    # Collect unique club short names from recent races.
    # Exclude `none` — we show the races themselves but don't expose `none` as a filter value.
    _feed_clubs = []
    for _r in recent_races:
        for _c in _r.get("clubs", []):
            if _c["id"] == "none":
                continue
            _sn = clubs_cfg.get(_c["id"], {}).get("short_name", _c["name"])
            if _sn not in _feed_clubs:
                _feed_clubs.append(_sn)
    feed_club_options = ''.join(f'<option value="{sn}">{sn}</option>' for sn in sorted(_feed_clubs))
    _has_hidden = len(_feed_row_list) > 5

    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>PaddleRace — Open Water Paddle Racing</title>
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
  <div class="container-fluid px-2 px-sm-3">
    <h1>PaddleRace</h1>
    <p>Open water paddle racing in the Pacific Northwest.</p>
  </div>
</div>

<div class="container-fluid px-2 px-sm-3">
  {upcoming_section_html}

  <div class="card my-4 border-primary" style="background:#F0F7FF">
    <div class="card-body d-flex flex-column flex-sm-row align-items-sm-center gap-3">
      <div style="font-size:2.2rem;line-height:1">🛶</div>
      <div class="flex-grow-1">
        <h2 class="h5 mb-1">New to PaddleRace.org?</h2>
        <p class="mb-0 text-muted">See how our "Par and Index" scoring system works with a short walkthrough.</p>
      </div>
      <a href="how-it-works.html"
         class="btn btn-primary align-self-start align-self-sm-center">
        See how it works →
      </a>
    </div>
  </div>
</div>
<script>
(function(){{
  var clubSel = document.getElementById('upcoming-club-filter');
  var orgSel = document.getElementById('upcoming-org-filter');
  if (!clubSel && !orgSel) return;
  function applyFilter() {{
    var clubVal = clubSel ? clubSel.value : '';
    var orgVal = orgSel ? orgSel.value : '';
    var btn = document.getElementById('upcoming-show-more');
    document.querySelectorAll('#upcoming-table tbody tr').forEach(function(r) {{
      var clubs = r.getAttribute('data-clubs') || '';
      var shortNames = clubs.split(' ').map(function(c) {{ return {club_short_json}[c] || c; }});
      var orgId = r.getAttribute('data-organizer') || '';
      var clubMatch = !clubVal || shortNames.indexOf(clubVal) >= 0;
      var orgMatch = !orgVal || orgId === orgVal;
      var match = clubMatch && orgMatch;
      r.dataset.filtered = match ? '' : '1';
      if (!match) {{ r.style.display = 'none'; }}
      else if (!r.classList.contains('upcoming-extra') || (btn && btn.textContent === '{HOME_PAGE["show_less_label"]}')) {{
        r.style.display = '';
      }}
    }});
  }}
  if (clubSel) clubSel.addEventListener('change', applyFilter);
  if (orgSel) orgSel.addEventListener('change', applyFilter);
}})();
</script>
<div class="container-fluid px-2 px-sm-3">
  <style>
.podium-wrap{{max-width:546px;margin:0 auto}}
.podium-bars{{display:flex;align-items:flex-end;gap:3px}}
.podium-col{{display:flex;flex-direction:column;align-items:stretch;gap:1px;flex:1;min-width:0;max-width:180px}}
.p-icon{{display:flex;justify-content:center}}
.p-namerow{{position:relative;height:1.2em}}
.p-name{{position:absolute;left:0;right:0;text-align:center;font-size:.72em;font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;top:0}}
.p-idx{{position:absolute;right:0;bottom:4px;font-size:.58em;font-weight:700;opacity:.75;white-space:nowrap}}
.p-bar{{width:100%;border-bottom:none;border-radius:4px 4px 0 0;display:flex;flex-direction:column;align-items:stretch;padding:4px 5px}}
.p-diff{{font-size:.88em;font-weight:700;text-align:center;padding-top:4px}}
.p-bar{{cursor:help}}
.p-spacer{{flex:1}}
.p-timerow{{display:flex;justify-content:space-between;align-items:baseline;font-size:.56em;line-height:1.35;opacity:.9;font-weight:700}}
.p-tlabel{{white-space:nowrap;margin-right:3px}}
.p-tval{{font-variant-numeric:tabular-nums;text-align:right;white-space:nowrap}}
.podium-base{{height:2px;background:#CCC;border-radius:2px}}
.also-ran-single{{margin-top:4px;font-size:.72em;color:#666}}
.view-panel{{display:none}}.view-panel.active{{display:block}}
.course-flex{{display:flex;gap:8px;align-items:flex-end}}.course-name-side{{font-size:.82em;font-weight:700;color:#333;min-width:40px;white-space:nowrap;padding-bottom:26px}}.course-panels{{flex:1;min-width:0}}
.course-block.mt-2{{margin-top:.75rem}}
.pill-group{{display:flex;gap:4px;margin-top:4px;flex-wrap:wrap;align-items:center}}
.pill-sep{{font-size:.72em;color:#ccc}}
.sel-pill{{font-size:.75em;padding:2px 8px;border-radius:12px;border:1px solid #ccc;background:#f8f9fa;color:#555;cursor:pointer;text-decoration:none;white-space:nowrap}}
.sel-pill.active.corr-pill{{background:#198754;border-color:#198754;color:#fff}}
.sel-pill.active.finish-pill{{background:#0d6efd;border-color:#0d6efd;color:#fff}}
.mode-badge{{display:inline-block;font-size:.72em;padding:2px 9px;border-radius:12px;color:#fff;margin-bottom:6px;font-weight:500;background:#198754}}
.mode-badge.finish{{background:#0d6efd}}
.results-link{{margin-top:3px;font-size:.8em}}
.rc-card{{padding:32px 0;border-bottom:1px solid #e0e0e0}}
.rc-name{{font-weight:700;font-size:.95em;margin-bottom:2px}}
.rc-meta-row{{display:flex;align-items:baseline;gap:12px;margin-bottom:8px}}
.rc-date{{font-size:.78em;color:#888;white-space:nowrap}}
.rc-results-link{{font-size:.78em;color:#0d6efd;text-decoration:none;white-space:nowrap}}
.rc-course{{margin-top:0}}
.rc-course.mt-2{{margin-top:1rem}}
.rc-course-hdr{{display:flex;align-items:baseline;margin-bottom:3px}}
.rc-course-name{{flex:1;font-size:.78em;font-weight:700;color:#333}}
.rc-podium-type{{flex:1;text-align:center;font-size:.65em;color:#888;font-weight:600;text-transform:uppercase;letter-spacing:.04em}}
.rc-course-name{{font-size:.78em;font-weight:700;color:#333}}
.rc-course-row{{display:flex;align-items:center;gap:0}}
.rc-course-name-side{{font-size:.85em;font-weight:700;color:#333;min-width:60px;text-align:right;flex-shrink:0;padding-right:12px}}
.rc-course-row .podium-wrap{{flex:1;min-width:0;margin:0}}
.rc-results-link{{font-size:.75em;color:#0d6efd;text-decoration:none;white-space:nowrap}}
.rc-pill-row{{display:flex;gap:4px;flex-wrap:wrap;align-items:center;justify-content:flex-start;margin-top:6px;margin-bottom:6px}}
.rc-ranking-label{{font-size:.72em;color:#888;font-weight:600;white-space:nowrap}}

</style>
<script>
function pdmView(el,rid,viewCls,isFinish){{
  event.preventDefault();
  var row=el.closest('.rc-card')||el.closest('tr');
  row.querySelectorAll('.sel-pill').forEach(function(p){{p.classList.remove('active');}});
  el.classList.add('active');
  var td=row;
  td.querySelectorAll('.club-panel').forEach(function(p){{p.style.display='none';}});
  if(isFinish){{
    var firstPanel=td.querySelector('.club-panel');
    if(firstPanel){{firstPanel.style.display='';}}
    td.querySelectorAll('.view-panel').forEach(function(p){{p.classList.remove('active');}});
    td.querySelectorAll('.view-finish').forEach(function(p){{p.classList.add('active');}});
  }} else {{
    var pills=Array.from(row.querySelectorAll('.corr-pill'));
    var idx=pills.indexOf(el);
    var panel=td.querySelector('#'+rid+'-club-'+idx);
    if(panel){{panel.style.display='';}}
    td.querySelectorAll('.view-panel').forEach(function(p){{p.classList.remove('active');}});
    if(panel){{panel.querySelectorAll('.'+viewCls).forEach(function(p){{p.classList.add('active');}});}}
  }}
  var rl=row.querySelector('#'+rid+'-rl');
  if(rl){{
    var href=isFinish?(row.querySelector('.corr-pill[data-results]')||{{dataset:{{}}}}).dataset.results||'':el.dataset.results||'';
    var lbl=isFinish?((row.querySelector('.corr-pill.active')||el).textContent.trim()):el.textContent.trim();
    rl.innerHTML=href?'<a href="'+href+'">Full Results: '+lbl+' →</a>':'';
  }}
}}
</script>
  <div class="d-flex align-items-center gap-2 mb-2 mt-4 flex-wrap">
    <h2 class="h5 mb-0">{HOME_PAGE['results_heading']}</h2>
    <select id="feed-club-filter" class="form-select form-select-sm" style="width:auto" onchange="filterFeed(this.value)">
      <option value="">{SELECTOR_PLACEHOLDERS['all_series']}</option>
      {feed_club_options}
    </select>
    {'<button id="feed-show-more" class="btn btn-sm btn-outline-secondary mb-0" onclick="toggleFeedMore(this)">' + HOME_PAGE["show_more_label"] + '</button>' if _has_hidden else ""}
  </div>
  <div id="feed-table">{feed_rows_visible}{feed_rows_hidden}</div>
</div>
<script>
var _feedFilter='';
function filterFeed(club){{
  _feedFilter=club;
  _applyFeedFilter(false);
}}
function toggleFeedMore(btn){{
  var expand=btn.textContent==='{HOME_PAGE["show_more_label"]}';
  _applyFeedFilter(expand);
  btn.textContent=expand?'{HOME_PAGE["show_less_label"]}':'{HOME_PAGE["show_more_label"]}';
}}
function _applyFeedFilter(showAll){{
  var rows=Array.from(document.querySelectorAll('#feed-table .rc-card'));
  var matching=rows.filter(function(r){{
    if(!_feedFilter)return true;
    var pills=r.querySelectorAll('.sel-pill.corr-pill');
    return Array.from(pills).some(function(p){{return p.textContent.trim()===_feedFilter;}});
  }});
  rows.forEach(function(r){{r.style.display='none';}});
  var limit=showAll?matching.length:5;
  matching.slice(0,limit).forEach(function(r){{r.style.display='';}});
  var btn=document.getElementById('feed-show-more');
  if(btn){{
    btn.style.display=matching.length>5?'':'none';
    btn.textContent=showAll?'{HOME_PAGE["show_less_label"]}':'{HOME_PAGE["show_more_label"]}';
  }}
}}
document.addEventListener('DOMContentLoaded',function(){{
  _applyFeedFilter(false);
  document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(function(el){{new bootstrap.Tooltip(el);}});
}});
</script>
</body>
</html>"""

    (SITE_DIR / "index.html").write_text(html)
    print("Generated: site/index.html")


def generate_races_list(data: dict) -> None:
    """Generate per-club races-{club}.html + races-list-{club}.json data files."""
    import json as _json, yaml as _yaml2
    from collections import defaultdict
    _clubs_cfg_path = Path(__file__).parent.parent / "data" / "clubs.yaml"
    clubs_cfg = _yaml2.safe_load(_clubs_cfg_path.read_text()).get("clubs", {}) if _clubs_cfg_path.exists() else {}

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
                    finish_winners = {}
                    for r in c["results"]:
                        for place, trophy in [(1,"hcap_1"),(2,"hcap_2"),(3,"hcap_3")]:
                            if trophy in r.get("trophies", []):
                                winners[place] = {"name": r["canonical_name"], "slug": _slug(r["canonical_name"])}
                        for place, trophy in [(1,"finish_1"),(2,"finish_2"),(3,"finish_3")]:
                            if trophy in r.get("trophies", []):
                                finish_winners[place] = {"name": r["canonical_name"], "slug": _slug(r["canonical_name"])}
                    def _fmt_t(s):
                        if s is None: return ""
                        s=float(s); m,sec=divmod(int(s),60); h,m=divmod(m,60)
                        return f"{h}:{m:02d}:{sec:02d}" if h else f"{m}:{sec:02d}"
                    def _pred_rl(r):
                        ft=r.get("time_seconds"); tvp=r.get("time_versus_par"); idx=r.get("handicap",1.0)
                        if ft and tvp and tvp>0: return _fmt_t(ft/tvp*idx)
                        return ""
                    def _pct_rl(r):
                        ft=r.get("time_seconds"); tvp=r.get("time_versus_par"); idx=r.get("handicap",1.0)
                        if ft and tvp and tvp>0:
                            pred=ft/tvp*idx; return round((1-ft/pred)*100,1) if pred>0 else 0.0
                        return 0.0
                    def _delta_rl(r):
                        ft=r.get("time_seconds"); tvp=r.get("time_versus_par"); idx=r.get("handicap",1.0)
                        if ft and tvp and tvp>0:
                            pred=ft/tvp*idx; d=ft-pred
                            sign="−" if d<0 else "+"; s=abs(int(d)); m,sec=divmod(s,60); h,m2=divmod(m,60)
                            return f"{sign}{h}:{m2:02d}:{sec:02d}" if h else f"{sign}{m:02d}:{sec:02d}"
                        return ""
                    _n_est = sum(1 for r in c["results"] if r.get("handicap",1.0) != 1.0 and r.get("time_versus_par",0) > 0)
                    _eligible = _n_est > 5
                    corr_sorted = sorted([r for r in c["results"] if r.get("eligible_adjusted_place",0)>0], key=lambda x: x.get("eligible_adjusted_place",999))[:10]
                    corr_top10 = [] if not _eligible else [{"name":r["canonical_name"],"slug":_slug(r["canonical_name"]),"ct":_fmt_t(r.get("adjusted_time_seconds")),"ft":_fmt_t(r.get("time_seconds")),"idx":f"{r.get('handicap',1.0):.2f}","pct":_pct_rl(r),"predicted":_pred_rl(r),"delta":_delta_rl(r),"place":r.get("eligible_adjusted_place",0)} for r in corr_sorted]
                    fin_sorted = sorted(c["results"], key=lambda x: x.get("original_place",999))[:10]
                    fin_top10 = [{"name":r["canonical_name"],"slug":_slug(r["canonical_name"]),"ft":_fmt_t(r.get("time_seconds")),"idx":f"{r.get('handicap',1.0):.2f}","predicted":_pred_rl(r),"place":r.get("original_place",0)} for r in fin_sorted]
                    courses_data.append({"label": label if multi else "", "starters": len(c["results"]), "winners": winners, "finish_winners": finish_winners, "corr_top10": corr_top10, "fin_top10": fin_top10})
                race_list.append({
                    "race_id": race_id,
                    "slug": data.get("race_slugs", {}).get(club_id, {}).get(race_id, str(race_id)),
                    "name": base_name,
                    "date": courses[0]["date"],
                    "starters": sum(len(c["results"]) for c in courses),
                    "courses": courses_data,
                })
            seasons_data[year] = race_list
        _club_short = clubs_cfg.get(club_id, {}).get("short_name", club_id)
        (SITE_DIR / club_id / "races-list.json").write_text(_json.dumps({"seasons": seasons_data, "current": club["current_season"], "club_short": _club_short, "club_id": club_id}))

    # Generate per-club HTML pages
    global _current_racer_club
    for club_id in data["clubs"]:
        data["current_club"] = club_id
        _current_racer_club = club_id
        import json as _json2
        slug_map_js = "const raceSlugMap = " + _json2.dumps(data.get("race_slugs", {}).get(club_id, {})) + ";"

        # Cup SVGs as JS strings
        cup_js = """
const CUP = {
  1: '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M4 3 Q4 15 12 15 Q20 15 20 3 Z" fill="#FFD700" stroke="#B8860B" stroke-width="1.5"/><path d="M4 5 Q0 5 0 9 Q0 13 4 12" fill="none" stroke="#B8860B" stroke-width="1.3"/><path d="M20 5 Q24 5 24 9 Q24 13 20 12" fill="none" stroke="#B8860B" stroke-width="1.3"/><rect x="11" y="15" width="2" height="3" fill="#B8860B"/><rect x="7" y="18" width="10" height="1.5" rx="0.75" fill="#B8860B"/></svg>',
  2: '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M4 3 Q4 15 12 15 Q20 15 20 3 Z" fill="#C0C0C0" stroke="#707070" stroke-width="1.5"/><path d="M4 5 Q0 5 0 9 Q0 13 4 12" fill="none" stroke="#707070" stroke-width="1.3"/><path d="M20 5 Q24 5 24 9 Q24 13 20 12" fill="none" stroke="#707070" stroke-width="1.3"/><rect x="11" y="15" width="2" height="3" fill="#707070"/><rect x="7" y="18" width="10" height="1.5" rx="0.75" fill="#707070"/></svg>',
  3: '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M4 3 Q4 15 12 15 Q20 15 20 3 Z" fill="#DDA84A" stroke="#B07020" stroke-width="1.5"/><path d="M4 5 Q0 5 0 9 Q0 13 4 12" fill="none" stroke="#B07020" stroke-width="1.3"/><path d="M20 5 Q24 5 24 9 Q24 13 20 12" fill="none" stroke="#B07020" stroke-width="1.3"/><rect x="11" y="15" width="2" height="3" fill="#B07020"/><rect x="7" y="18" width="10" height="1.5" rx="0.75" fill="#B07020"/></svg>',
};
const MEDAL = {
  1: '<svg width="20" height="20" viewBox="0 0 24 24" style="display:block"><rect x="4" y="1" width="2" height="22" rx="1" fill="#555"/><path d="M6 2 L21 9 L6 18 Z" fill="#FFD700" stroke="#9A7000" stroke-width="1.2"/><text x="11" y="9" text-anchor="middle" dominant-baseline="central" font-size="9" font-weight="bold" fill="#7A5C00">1</text></svg>',
  2: '<svg width="20" height="20" viewBox="0 0 24 24" style="display:block"><rect x="4" y="1" width="2" height="22" rx="1" fill="#555"/><path d="M6 2 L21 9 L6 18 Z" fill="#C0C0C0" stroke="#707070" stroke-width="1.2"/><text x="11" y="9" text-anchor="middle" dominant-baseline="central" font-size="9" font-weight="bold" fill="#333">2</text></svg>',
  3: '<svg width="20" height="20" viewBox="0 0 24 24" style="display:block"><rect x="4" y="1" width="2" height="22" rx="1" fill="#555"/><path d="M6 2 L21 9 L6 18 Z" fill="#DDA84A" stroke="#B07020" stroke-width="1.2"/><text x="11" y="9" text-anchor="middle" dominant-baseline="central" font-size="9" font-weight="bold" fill="#5C2E00">3</text></svg>',
};
        """

        # Build upcoming rows for this club
        upcoming_html = ""
        upcoming_path = Path(__file__).parent.parent / "data" / "upcoming.yaml"
        if upcoming_path.exists():
            import yaml as _yaml
            from datetime import datetime as _dt
            upcoming_data = _yaml.safe_load(upcoming_path.read_text()) or {}
            today = _dt.today().date()
            rows = ""
            for race in sorted(upcoming_data.get("upcoming", []), key=lambda x: x.get("date", "")):
                try:
                    race_date = _dt.strptime(str(race["date"]), "%Y-%m-%d").date()
                except Exception:
                    continue
                if race_date <= today:
                    continue
                race_clubs = race.get("clubs", [race.get("club", "")] if race.get("club") else [])
                if club_id not in race_clubs:
                    continue  # skip races not explicitly for this club
                date_str = race_date.strftime("%b %d, %Y")
                name = race.get("name", "")
                url = race.get("url", "")
                link = f'<a href="{url}" target="_blank">{name}</a>' if url else name
                dist = race.get("distance", "")
                notes = race.get("notes", "")
                links_html = " ".join(
                    f'<a href="{lnk["url"]}" target="_blank" class="badge bg-light text-dark border me-1 text-decoration-none">{lnk["label"]} ↗</a>'
                    for lnk in sorted(race.get('links',[]), key=lambda l: _LINK_ORDER.index(l['label']) if l['label'] in _LINK_ORDER else len(_LINK_ORDER))
                )
                rows += (f'<tr><td class="text-muted small text-nowrap">{date_str}</td>'
                         f'<td>{link}</td>'
                         f'<td class="text-muted small">{dist}</td>'
                         f'<td class="text-muted small">{notes}</td>'
                         f'<td class="text-nowrap">{links_html}</td></tr>')
            if rows:
                # Split into visible (first 5) and hidden (rest) — single table to keep column widths consistent
                row_list = rows.split('</tr>')
                row_list = [r + '</tr>' for r in row_list if r.strip()]
                visible = ''.join(row_list[:5])
                hidden = ''.join(f'<tr class="upcoming-extra" style="display:none">{r[4:]}' if r.startswith('<tr>') else r for r in row_list[5:])
                show_more_btn = (
                    f'<button class="btn btn-sm btn-outline-secondary mb-3" '
                    f'onclick="document.querySelectorAll(\'.upcoming-extra\').forEach(function(r){{var e=r.style.display===\'none\';r.style.display=e?\'\':\' none\';}});this.textContent=this.textContent===\'{HOME_PAGE["show_more_label"]}\'?\'{HOME_PAGE["show_less_label"]}\':\'{HOME_PAGE["show_more_label"]}\';">'
                    f'{HOME_PAGE["show_more_label"]}</button>'
                ) if hidden else ''
                upcoming_html = (
                    f'<div id="upcoming-section">'
                    f'<h2 class="h5 mb-2">{HOME_PAGE["upcoming_heading_races_list"]}</h2>'
                    '<div class="table-responsive mb-1"><table class="table table-sm table-hover">'
                    '<thead><tr><th style="width:100px">Date</th><th style="min-width:180px">Race</th><th style="width:80px">Distance</th><th style="min-width:200px;width:25%">Notes</th><th style="min-width:160px">Links</th></tr></thead>'
                    f'<tbody>{visible}{hidden}</tbody></table></div>'
                    f'{show_more_btn}'
                    f'</div>'
                )

        html = _head("Results") + _nav("Results", data=data, depth=1) + _selector_bar(data, page="results") + f"""
<style>
.rc-card{{padding:32px 0;border-bottom:1px solid #e0e0e0}}
.rc-name{{font-weight:700;font-size:.95em;margin-bottom:2px}}
.rc-name a{{color:inherit;text-decoration:none}}
.rc-meta-row{{display:flex;align-items:baseline;gap:12px;margin-bottom:8px}}
.rc-date{{font-size:.78em;color:#888;white-space:nowrap}}
.podium-bars{{display:flex;align-items:flex-end;gap:3px;max-width:546px}}
.podium-col{{display:flex;flex-direction:column;align-items:stretch;gap:1px;flex:1;min-width:0;max-width:180px}}
.podium-wrap{{max-width:546px;margin:0 auto}}
.p-icon{{display:flex;justify-content:center}}
.p-namerow{{position:relative;height:1.2em}}
.p-name{{position:absolute;left:0;right:0;text-align:center;font-size:.72em;font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;top:0}}
.p-bar{{width:100%;border-bottom:none;border-radius:4px 4px 0 0;display:flex;flex-direction:column;align-items:stretch;padding:4px 5px;cursor:help}}
.p-diff{{font-size:.88em;font-weight:700;text-align:center;padding-top:4px}}
.p-bar{{cursor:help}}
.p-spacer{{flex:1}}
.p-timerow{{display:flex;justify-content:space-between;align-items:baseline;font-size:.56em;line-height:1.35;opacity:.9;font-weight:700}}
.p-tlabel{{white-space:nowrap;margin-right:3px}}
.p-tval{{font-variant-numeric:tabular-nums;text-align:right;white-space:nowrap}}
.podium-base{{height:2px;background:#CCC;border-radius:2px}}
.also-ran-single{{margin-top:4px;font-size:.72em;color:#666}}
.rl-panel{{display:none}}.rl-panel.active{{display:block}}
.course-block.mt-2{{margin-top:.75rem}}
.rc-course-hdr{{display:flex;align-items:baseline;margin-bottom:3px}}
.rc-course-name{{flex:1;font-size:.78em;font-weight:700;color:#333}}
.rc-podium-type{{flex:1;text-align:center;font-size:.65em;color:#888;font-weight:600;text-transform:uppercase;letter-spacing:.04em}}
.rc-course-hdr-spacer{{flex:1}}
.rc-course-row{{display:flex;align-items:center;gap:0}}
.rc-course-name-side{{font-size:.85em;font-weight:700;color:#333;min-width:60px;text-align:right;flex-shrink:0;padding-right:12px}}
.rc-course-row .podium-wrap{{flex:1;min-width:0;margin:0}}
.rc-pill-row{{display:flex;gap:4px;flex-wrap:wrap;align-items:center;justify-content:flex-start;margin-top:6px;margin-bottom:6px}}
.pill-sep{{font-size:.72em;color:#ccc}}
.sel-pill{{font-size:.75em;padding:2px 8px;border-radius:12px;border:1px solid #ccc;background:#f8f9fa;color:#555;cursor:pointer;text-decoration:none;white-space:nowrap}}
.sel-pill.active.corr-pill{{background:#198754;border-color:#198754;color:#fff}}
.sel-pill.active.finish-pill{{background:#0d6efd;border-color:#0d6efd;color:#fff}}
.tooltip-inner{{text-align:left;white-space:pre-line}}
</style>
</style>
<div class="container">
  <h1 class="mb-3">Results</h1>
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

function finishPodiumHtml(course) {{
  var w = course.finish_winners;
  if (!w || Object.keys(w).length === 0) return '';
  var rows = '';
  [1,2,3].forEach(function(p) {{
    if (w[p]) {{
      var nameHtml = RACER_SLUGS.has(w[p].slug)
        ? '<a href="racer/' + w[p].slug + '.html" class="small text-truncate" style="max-width:130px">' + w[p].name + '</a>'
        : '<span class="small text-truncate" style="max-width:130px">' + w[p].name + '</span>';
      rows += '<div class="d-flex align-items-center gap-1 text-nowrap">' + MEDAL[p] + nameHtml + '</div>';
    }}
  }});
  var lbl = course.label ? '<div class="text-muted small fw-semibold mb-1">' + course.label + '</div>' : '';
  return '<div class="me-3">' + lbl + rows + '</div>';
}}

var _rlView = 'corr';
function rlSetView(el, view) {{
  event.preventDefault();
  // Update all rows to match the new view
  _rlView = view;
  document.querySelectorAll('#races-content .feed-row').forEach(function(row) {{
    row.querySelectorAll('.sel-pill').forEach(function(p) {{
      p.classList.remove('active');
      if((view==='corr'&&p.classList.contains('corr-pill'))||(view==='finish'&&p.classList.contains('finish-pill'))) p.classList.add('active');
    }});
    row.querySelectorAll('.rl-panel').forEach(function(p){{p.classList.remove('active');}});
    row.querySelectorAll('.rl-'+view).forEach(function(p){{p.classList.add('active');}});
  }});
}}
function _rlPodiumCol(icon, name, slug, h, bg, bdr, tc, time, calc) {{
  var nameHtml = RACER_SLUGS.has(slug) ? '<a href="racer/'+slug+'.html" class="podium-name" style="font-weight:700">'+name+'</a>' : '<span class="podium-name" style="font-weight:700">'+name+'</span>';
  var calcHtml = calc ? '<span class="podium-calc" style="color:'+tc+'">'+calc+'</span>' : '';
  return '<div class="podium-col">'+icon+nameHtml+'<div class="podium-bar" style="height:'+h+'px;background:'+bg+';border:1px solid '+bdr+'"><span class="podium-time" style="color:'+tc+'">'+time+'</span>'+calcHtml+'</div></div>';
}}
var _rlColors = {{1:['#7A5C00','#FFF8DC','#FFD700'],2:['#555','#EBEBEB','#A0A0A0'],3:['#5C2E00','#FDF0E0','#DDA84A']}};
var _rlH = {{1:66,2:58,3:58}};
function _rlCourseBlock(course, ci, isFirst) {{
  var dist = course.label || '';
  var parValid = (course.corr_top10||[]).some(function(e){{return e.predicted;}});
  // corrected cols
  var cCols=''; [2,1,3].forEach(function(p){{
    var e=(course.corr_top10||[]).find(function(x){{return x.place===p;}});
    var col=_rlColors[p]; var h=_rlH[p]; var tc=col[0]; var bg=col[1]; var bdr=col[2];
    if(e && parValid) {{
      var name=RACER_SLUGS.has(e.slug)?'<a href="racer/'+e.slug+'.html" class="p-name" style="color:'+tc+'">'+e.name+'</a>':'<span class="p-name" style="color:'+tc+'">'+e.name+'</span>';
      var pctSign=(e.pct||0)>0?'+':'';
      var _pctAbs=Math.abs(e.pct||0).toFixed(1);
      var _dir=(e.pct||0)>=0?'{HOME_PAGE["podium_tip_faster"]}':'{HOME_PAGE["podium_tip_slower"]}';
      var tip='{HOME_PAGE["podium_tip"]}'.replace('{{finish}}',e.ft||'—').replace('{{pct}}',_pctAbs).replace('{{direction}}',_dir).replace('{{projected}}',e.predicted||'—');
      cCols+='<div class="podium-col"><div class="p-icon">'+CUP[p]+'</div><div class="p-namerow">'+name+'</div>'
        +'<div class="p-bar" style="height:'+h+'px;background:'+bg+';border:1px solid '+bdr+'" data-bs-toggle="tooltip" data-bs-html="true" title="'+tip+'">'
        +'<span class="p-diff" style="color:'+tc+'">'+pctSign+(e.pct||0).toFixed(1)+'%</span><div class="p-spacer"></div>'
        +'<div class="p-timerow" style="color:'+tc+'"><span class="p-tlabel">{HOME_PAGE["podium_actual"]}</span><span class="p-tval">'+e.ft+'</span></div>'
        +'<div class="p-timerow" style="color:'+tc+'"><span class="p-tlabel">{HOME_PAGE["podium_projected"]}</span><span class="p-tval">'+(e.predicted||'\u2014')+'</span></div>'
        +'</div></div>';
    }} else {{
      cCols+='<div class="podium-col"><div class="p-icon">'+CUP[p]+'</div><div class="p-namerow"><span class="p-name" style="color:#bbb">\u2014</span></div><div class="p-bar" style="height:'+h+'px;background:#f8f9fa;border:1px solid #eee"></div></div>';
    }}
  }});
  var cAr=(course.corr_top10||[]).slice(3,10).map(function(e,i){{return (i+4)+'th: '+e.name;}}).join('  ');
  // finish cols
  var fCols=''; [2,1,3].forEach(function(p){{
    var e=(course.fin_top10||[]).find(function(x){{return x.place===p;}});
    var col=_rlColors[p]; var h=_rlH[p]; var tc=col[0]; var bg=col[1]; var bdr=col[2];
    if(e) {{
      var name=RACER_SLUGS.has(e.slug)?'<a href="racer/'+e.slug+'.html" class="p-name" style="color:'+tc+'">'+e.name+'</a>':'<span class="p-name" style="color:'+tc+'">'+e.name+'</span>';
      fCols+='<div class="podium-col"><div class="p-icon">'+MEDAL[p]+'</div><div class="p-namerow">'+name+'</div>'
        +'<div class="p-bar" style="height:'+h+'px;background:'+bg+';border:1px solid '+bdr+';display:flex;align-items:center;justify-content:center;">'
        +'<span style="font-size:.88em;font-weight:700;color:'+tc+';text-align:center">'+e.ft+'</span></div></div>';
    }} else {{
      fCols+='<div class="podium-col"><div class="p-icon">'+MEDAL[p]+'</div><div class="p-namerow"><span class="p-name" style="color:#bbb">\u2014</span></div><div class="p-bar" style="height:'+h+'px;background:#f8f9fa;border:1px solid #eee"></div></div>';
    }}
  }});
  var fAr=(course.fin_top10||[]).slice(3,10).map(function(e,i){{return (i+4)+'th: '+e.name;}}).join('  ');
  var mt=ci>0?' mt-2':'';
  return '<div class="course-block'+mt+'"><div class="rc-course-row">'
    +'<div class="rc-course-name-side">'+dist+'</div>'
    +'<div class="podium-wrap">'
    +'<div class="rl-panel rl-corr'+(isFirst&&_rlView==='corr'?' active':'')+'"><div class="podium-bars">'+cCols+'</div><div class="podium-base"></div><div class="also-ran-single">'+cAr+'</div></div>'
    +'<div class="rl-panel rl-finish'+(isFirst&&_rlView==='finish'?' active':'')+'"><div class="podium-bars">'+fCols+'</div><div class="podium-base"></div><div class="also-ran-single">'+fAr+'</div></div>'
    +'</div></div></div>';
}}
function renderRacesList(d, year) {{
  var sec = document.getElementById('upcoming-section');
  if (sec) sec.style.display = (year === d.current) ? '' : 'none';
  var races = (d.seasons[year] || []).slice().reverse();
  var clubLabel = document.querySelector('.navbar-brand') ? '' : '';
  var rows = races.map(function(r) {{
    var slug = raceSlugMap[r.race_id] || r.race_id;
    var courses = r.courses.map(function(c,i){{return _rlCourseBlock(c,i,true);}}).join('');
    var pills = '<div class="rc-pill-row" style="margin-bottom:6px">'
      +'<a class="sel-pill corr-pill'+(_rlView==='corr'?' active':'')+' " onclick="rlSetView(this,&quot;corr&quot;)" href="#">{HOME_PAGE["pill_vs_projected"]}</a>'
      +'<span class="pill-sep">|</span>'
      +'<a class="sel-pill finish-pill'+(_rlView==='finish'?' active':'')+' " onclick="rlSetView(this,&quot;finish&quot;)" href="#">{HOME_PAGE["pill_finish_time"]}</a>'
      +'</div>';
    return '<div class="rc-card feed-row">'
      +'<div class="rc-name">'+r.name+'</div>'
      +'<div class="rc-meta-row"><span class="rc-date">'+_dayName(r.date)+', '+r.date+'</span><a href="results/'+slug+'.html" class="rc-results-link">Full Results →</a></div>'
      +pills
      +courses
      +'</div>';
  }}).join('');
  var tooltipEls = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  tooltipEls.forEach(function(el){{new bootstrap.Tooltip(el);}});
  document.getElementById('races-content').innerHTML = rows
    ? '<h2 class="h5 mb-2">Results</h2>'+rows
    : '<p class="text-muted">No results yet for this season.</p>';
}}
function _dayName(dateStr) {{
  try {{ return new Date(dateStr).toLocaleDateString('en-US',{{weekday:'long'}}); }} catch(e) {{ return ''; }}
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
        (SITE_DIR / club_id / "results.html").write_text(html)
        print(f"Generated: site/{club_id}/results.html")


def generate_cross_club_links() -> None:
    """Report cross-club racer count (links are now injected at generation time)."""
    multi = sum(1 for clubs in _SLUG_CLUBS.values() if len(clubs) > 1)
    print(f"Cross-club links: {multi} racers linked across clubs")


def generate_club(data: dict) -> None:
    """Generate all pages for data['current_club'] only. Fast — skips site-wide pages."""
    global _current_racer_club
    club_id = data["current_club"]
    SITE_DIR.mkdir(exist_ok=True)
    # Build a single-club data view so generators don't loop over all clubs
    single = dict(data)
    single["clubs"] = {club_id: data["clubs"][club_id]}
    single["all_clubs"] = data["clubs"]  # all clubs for selector bar
    single["race_slugs"] = _build_race_slugs(single)
    (SITE_DIR / club_id / "racer").mkdir(parents=True, exist_ok=True)
    (SITE_DIR / club_id / "results").mkdir(parents=True, exist_ok=True)
    _current_racer_club = club_id
    _build_search_map(single)
    generate_racer_pages(single)
    generate_racer_index(single)
    generate_data_files(single)
    generate_races(single)
    generate_standings(single)
    generate_races_list(single)
    generate_trajectories(single)
    print(f"Built club: {club_id} (skipped site-wide pages — run build-site for full site)")


def generate_all(data: dict) -> None:
    global _current_racer_club
    SITE_DIR.mkdir(exist_ok=True)
    # Build race slugs before any generator (racer pages need them)
    data["race_slugs"] = _build_race_slugs(data)
    import time as _time
    def _t(label, fn, *args, **kwargs):
        t0 = _time.perf_counter()
        result = fn(*args, **kwargs)
        print(f"  {_time.perf_counter()-t0:5.1f}s  {label}")
        return result

    # Create per-club subdirs
    for club_id in data["clubs"]:
        (SITE_DIR / club_id / "racer").mkdir(parents=True, exist_ok=True)
        (SITE_DIR / club_id / "results").mkdir(parents=True, exist_ok=True)
    # Build search map before racer pages so they embed the full map
    _t("search map", _build_search_map, data)
    # Generate racer pages for all clubs
    original_club = data["current_club"]
    for club_id in data["clubs"]:
        data["current_club"] = club_id
        _t(f"racer pages [{club_id}]", generate_racer_pages, data)
        _t(f"racer index [{club_id}]", generate_racer_index, data)
    data["current_club"] = original_club
    _current_racer_club = original_club
    for club_id in data["clubs"]:
        data["current_club"] = club_id
        _t(f"data files [{club_id}]", generate_data_files, data)
    data["current_club"] = original_club
    _t("races", generate_races, data)
    data["current_club"] = original_club
    _t("standings", generate_standings, data)
    data["current_club"] = original_club
    _t("races list", generate_races_list, data)
    data["current_club"] = original_club
    _t("trajectories", generate_trajectories, data)
    data["current_club"] = original_club
    _t("about", generate_about, data)
    _t("how it works", generate_how_it_works, data)
    _t("clubs page", generate_clubs_page, data)
    # Rebuild search map now that racer pages exist — filters to only pages that exist
    _build_search_map(data, verify_files=True)
    _t("platform home", generate_platform_home, data)
    _t("cross-club links", generate_cross_club_links)
    # Always write CNAME so GitHub Pages custom domain survives every push
    (SITE_DIR / "CNAME").write_text("pnw.paddlerace.org\n")
