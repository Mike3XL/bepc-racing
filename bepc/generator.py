"""Generate static HTML pages from site/data.json."""
import json
import re as _re_module
from pathlib import Path
from bepc.craft import display_craft_ui

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
  const streak = (n) => `<span class="hcap-medal hcap-streak" data-bs-toggle="tooltip" data-bs-title="${n} consecutive races beating par"><svg width="24" height="24" viewBox="0 0 24 24" style="display:block"><polygon points="14,2 7,13 12,13 10,22 17,11 12,11" fill="#FF9800" stroke="#E65100" stroke-width="0.8" stroke-linejoin="round"/><text x="22" y="9" text-anchor="end" font-size="9" font-weight="bold" fill="#E65100">${n}</text></svg></span>`;
  const render = {
    finish_1:()=>b('finish_1','plain-medal','1st Place (Finish time)'), finish_2:()=>b('finish_2','plain-medal','2nd Place (Finish time)'), finish_3:()=>b('finish_3','plain-medal','3rd Place (Finish time)'),
    hcap_1:()=>b('hcap_1','hcap-gold','1st Place (Corrected time)'), hcap_2:()=>b('hcap_2','hcap-silver','2nd Place (Corrected time)'), hcap_3:()=>b('hcap_3','hcap-bronze','3rd Place (Corrected time)'),
    consistent_1:()=>b('consistent','hcap-consist','Consistent performer'), consistent_2:()=>b('consistent','hcap-consist','Consistent performer'), consistent_3:()=>b('consistent','hcap-consist','Consistent performer'),
    par:()=>b('par','hcap-par','Par racer'),
    fresh:()=>b('est','hcap-est','Establishing index — not yet eligible for corrected time awards'),
    outlier:()=>b('outlier','hcap-outlier','Outlier result — >10% off prediction, index unchanged'),
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
        badge = f'<span style="position:absolute;top:-4px;right:-4px;background:#555;color:#fff;border-radius:8px;font-size:0.6em;font-weight:bold;padding:1px 4px;line-height:1.4">{count}</span>'
        return f'<span class="hcap-medal {cls}" data-bs-toggle="tooltip" data-bs-title="{tooltip}" style="white-space:nowrap;position:relative;padding-right:6px">{icon}{badge}</span>'
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
            (f"{root}clubs.html", "Clubs"),
            (f"{club}/results.html", "Results", True),
            (f"{club}/standings.html", "Standings", True),
            (f"{club}/trajectories.html", "Trajectories", True),
            (f"{club}/racer/index.html", "Racers", True),
            (f"{root}about.html", "About"),
        ]
    else:
        pages = [
            (f"{root}index.html", "Home"),
            (f"{root}clubs.html", "Clubs"),
            (f"{club_prefix}results.html", "Results"),
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
      <div class="position-relative ms-2" style="min-width:180px;max-width:260px">
        <input id="nav-racer-search" type="text" class="form-control form-control-sm"
               placeholder="Find racer..." autocomplete="off">
        <div id="nav-racer-results" class="list-group position-absolute shadow"
             style="z-index:1050;display:none;min-width:260px;right:0"></div>
      </div>
    </div>
  </div>
</nav>
<script>
(function(){{
  var RACERS={_RACER_SEARCH_MAP};
  var depth={depth};
  document.addEventListener('DOMContentLoaded',function(){{
  var inp=document.getElementById('nav-racer-search');
  var res=document.getElementById('nav-racer-results');
  if(!inp)return;
  inp.addEventListener('input',function(){{
    var q=this.value.trim().toLowerCase();
    res.innerHTML='';
    if(q.length<2){{res.style.display='none';return;}}
    var matches=RACERS.filter(function(r){{return r.name.toLowerCase().includes(q);}}).slice(0,8);
    if(!matches.length){{res.style.display='none';return;}}
    var prefix=depth===0?'':depth===1?'../':'../../';
    matches.forEach(function(r){{
      if(!r.clubs||!r.clubs.length)return;
      var club=r.clubs[0];
      var link=prefix+club+'/racer/'+r.slug+'.html';
      var item=document.createElement('a');
      item.className='list-group-item list-group-item-action py-1 small';
      item.href=link;
      item.textContent=r.name;
      res.appendChild(item);
    }});
    res.style.display='';
  }});
  inp.addEventListener('keydown',function(e){{
    var items=res.querySelectorAll('a');
    if(!items.length)return;
    var active=res.querySelector('a.active');
    var idx=Array.from(items).indexOf(active);
    if(e.key==='ArrowDown'){{e.preventDefault();var next=items[idx+1]||items[0];if(active)active.classList.remove('active');next.classList.add('active');next.focus();inp.focus();}}
    else if(e.key==='ArrowUp'){{e.preventDefault();var prev=items[idx-1]||items[items.length-1];if(active)active.classList.remove('active');prev.classList.add('active');prev.focus();inp.focus();}}
    else if(e.key==='Enter'&&active){{window.location.href=active.href;}}
    else if(e.key==='Escape'){{res.style.display='none';}}
  }});
  document.addEventListener('click',function(e){{if(!inp.contains(e.target)&&!res.contains(e.target))res.style.display='none';}});
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

    # Club buttons — <a> links to sibling club dirs
    club_btns = ""
    if page:
        _all_clubs = data.get("all_clubs", data["clubs"])
        for club_id, club in _all_clubs.items():
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
        <span class="text-muted small fw-semibold">Club</span>
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
    min_races = data["clubs"].get(data["current_club"], {}).get("min_races_for_page", 3)
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
        html = _head("Standings") + _nav("Standings", data=data, depth=1) + _selector_bar(data, page="standings") + f"""
<div class="container-fluid px-2 px-sm-3">
  <h1 class="mb-3">Standings</h1>
  <ul class="nav nav-tabs mb-3">
    <li class="nav-item"><button class="nav-link active" data-bs-toggle="tab" data-bs-target="#tab-hpts">Corrected Points</button></li>
    <li class="nav-item"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-pts">Finish Points</button></li>
  </ul>
  <div class="tab-content" id="standings-content">
    <div class="tab-pane active" id="tab-hpts">
      <p class="text-muted small">Sorted by corrected points. Shift+click column headers to sort by multiple columns.</p>
      <table id="tbl-hpts" class="table table-striped table-hover">
        <thead><tr><th>#</th><th>Racer</th><th>Craft</th><th>Trophies</th><th>Races</th><th>Corr Points</th><th>Index</th><th>Finish Pts</th></tr></thead>
        <tbody id="body-hpts"></tbody>
      </table>
    </div>
    <div class="tab-pane" id="tab-pts">
      <p class="text-muted small">Sorted by overall points. Shift+click column headers to sort by multiple columns.</p>
      <table id="tbl-pts" class="table table-striped table-hover">
        <thead><tr><th>#</th><th>Racer</th><th>Craft</th><th>Trophies</th><th>Races</th><th>Corr Points</th><th>Index</th><th>Finish Pts</th></tr></thead>
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
  const row = r => `<tr><td></td><td>${{racerLink(r.name, r.name.toLowerCase().replace(/ /g,'-'))}}</td><td>${{r.craft}}</td><td style="white-space:nowrap">${{r.trophies||''}}</td><td>${{r.races}}</td><td>${{r.hpts}}</td><td>${{r.hcap}}</td><td>${{r.points}}</td></tr>`;
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
  dtHpts = $('#tbl-hpts').DataTable({{order:[[5,'desc']],pageLength:100,responsive:true,autoWidth:false,columnDefs:colDefs}});
  addRowNumbers(dtHpts);
  dtPts = $('#tbl-pts').DataTable({{order:[[7,'desc']],pageLength:100,responsive:true,autoWidth:false,columnDefs:colDefs}});
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
    global _current_racer_club
    import json as _json
    from collections import defaultdict

    race_slugs = data.get("race_slugs", {})

    # Shared JS for rendering race results (badges, tables, podium)
    _RACE_JS = """
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
""" + _BADGES_JS + """
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
  <div class="d-flex align-items-end gap-2 mb-0">
    <ul class="nav nav-tabs border-bottom-0 mb-0" id="result-tabs-${id_suffix}">
      <li class="nav-item"><button class="nav-link active" data-bs-toggle="tab" data-bs-target="#tab-handicap-${id_suffix}">Corrected time</button></li>
      <li class="nav-item"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-finish-${id_suffix}">Finish time</button></li>
    </ul>
    <select id="racer-filter" class="form-select form-select-sm ms-auto" style="width:auto;margin-bottom:1px">
      <option value="all">All racers</option>
      <option value="eligible">Eligible only</option>
      <option value="regular">Regulars only</option>
    </select>
  </div>
  <div class="tab-content border border-top-0 p-3 mb-3">
    <div class="tab-pane active" id="tab-handicap-${id_suffix}">
      <table class="table table-sm table-striped" style="table-layout:fixed">
        <colgroup><col style="width:80px"><col style="width:55px"><col style="width:160px"><col style="width:75px"><col style="width:65px"><col style="width:75px"><col style="width:75px"><col style="width:65px"><col style="width:55px"><col style="width:55px"><col style="width:65px"></colgroup>
        <thead class="text-nowrap"><tr><th></th><th>Place</th><th>Racer</th><th>Craft</th><th>Time</th><th>Index</th><th>Corr</th><th style="white-space:nowrap">vs Par</th><th>New</th><th>Points</th><th>Corr Points</th></tr></thead>
        <tbody id="body-handicap-${id_suffix}"></tbody>
      </table>
    </div>
    <div class="tab-pane" id="tab-finish-${id_suffix}">
      <table class="table table-sm table-striped" style="table-layout:fixed">
        <colgroup><col style="width:80px"><col style="width:55px"><col style="width:160px"><col style="width:75px"><col style="width:65px"><col style="width:75px"><col style="width:75px"><col style="width:65px"><col style="width:90px"><col style="width:55px"><col style="width:55px"></colgroup>
        <thead class="text-nowrap"><tr><th></th><th>Place</th><th>Racer</th><th>Craft</th><th>Time</th><th>Index</th><th>Corr</th><th style="white-space:nowrap">vs Par</th><th>New</th><th>Points</th><th>Corr Points</th></tr></thead>
        <tbody id="body-finish-${id_suffix}"></tbody>
      </table>
    </div>
  </div>`;
}
function rows(results, placeField) {
  const isHcap = placeField === 'adjusted_place';
  return results.map(r => {
    const pct = r.adjusted_time_versus_par != null && !r.is_fresh_racer
      ? ((r.adjusted_time_versus_par - 1) * 100) : null;
    const noOutlierDetect = !r.is_fresh_racer && pct != null && pct > 10 && !r.is_outlier;
    const pctNote = noOutlierDetect ? ' data-bs-toggle="tooltip" data-bs-title="First race back this season"' : '';
    const pctHtml = pct != null
      ? `<td style="text-align:center;white-space:nowrap;font-size:0.85em;color:${pct <= 0 ? '#2E7D32' : '#666'};font-weight:${pct <= 0 ? 'bold' : 'normal'}">${pct > 0 ? '+' : ''}${pct.toFixed(1)}%${noOutlierDetect ? `<sup${pctNote}>^</sup>` : ''}</td>`
      : '<td></td>';
    const hcapPostNote = r.is_outlier ? ' data-bs-toggle="tooltip" data-bs-title="Outlier — result suppressed"' : '';
    const hcapPostHtml = `<td style="padding-left:8px">${r.handicap_post.toFixed(3)}${r.is_outlier ? `<sup${hcapPostNote}>^</sup>` : ''}</td>`;
    const s = slug(r.canonical_name);
    const isFresh = r.is_fresh_racer ? 'true' : 'false';
    const isRegular = RACER_SLUGS.has(s) ? 'true' : 'false';
    return `<tr data-fresh="${isFresh}" data-regular="${isRegular}"><td>${badges(r.trophies)}</td>
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
            source_link = f'<a href="{display_url}" target="_blank" class="btn btn-outline-secondary btn-sm">Source ↗</a>' if display_url else ''

            html = _head(base_name) + _nav("Results", data=data, depth=2) + _selector_bar(data, show_season=True, page="results", season_navigate_url="../results.html", race_nav_html=race_nav_html, depth=2) + f"""
<div class="container-fluid px-2 px-sm-3">
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
  tabNav += '</ul>';
  tabContent += '</div>';
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
  // Racer filter
  function applyFilter() {{
    var f = document.getElementById('racer-filter').value;
    document.querySelectorAll('#course-content tr[data-fresh]').forEach(function(tr) {{
      var show = f === 'all'
        || (f === 'eligible' && tr.dataset.fresh === 'false')
        || (f === 'regular' && tr.dataset.regular === 'true');
      tr.style.display = show ? '' : 'none';
    }});
  }}
  document.getElementById('racer-filter').addEventListener('change', applyFilter);
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
    'Alderbrook St. Paddles Day': 'St. Paddles',
    'Deception Pass Challenge': 'Deception Pass',
    'MAKAH COAST RACE': 'Makah',
    'La Conner Classic': 'La Conner',
    'Bainbridge Island Marathon': 'Bainbridge',
    'Bainbridge Island': 'Bainbridge',
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
    'Narrows Challenge': 'Narrows',
    "Alderbrook St. Paddle's Day": "St. Paddles Day",
    'Alderbrook St. Paddles Day': "St. Paddles Day",
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


def _racer_trophy_badges(trophies: list) -> str:
    """Render trophy badges for racer page race table (Python-side, not JS)."""
    icon_map = {
        "finish_1":    ("plain-medal",  "1st Place (Finish time)",        "finish_1"),
        "finish_2":    ("plain-medal",  "2nd Place (Finish time)",        "finish_2"),
        "finish_3":    ("plain-medal",  "3rd Place (Finish time)",        "finish_3"),
        "hcap_1":      ("hcap-gold",    "1st Place (Corrected time)",    "hcap_1"),
        "hcap_2":      ("hcap-silver",  "2nd Place (Corrected time)",       "hcap_2"),
        "hcap_3":      ("hcap-bronze",  "3rd Place (Corrected time)",       "hcap_3"),
        "consistent_1":("hcap-consist", "Consistent performer (±1% of expectation)","consistent"),
        "consistent_2":("hcap-consist", "Consistent performer (±1% of expectation)","consistent"),
        "consistent_3":("hcap-consist", "Consistent performer (±1% of expectation)","consistent"),
        "par":         ("hcap-par",     "Par racer",          "par"),
        "fresh":       ("hcap-est",     "Establishing index — not yet eligible for corrected time awards", "est"),
        "outlier":     ("hcap-outlier", "Outlier result — >10% off prediction, index unchanged", "outlier"),
    }
    parts = []
    for t in trophies:
        if t.startswith('streak_'):
            n = t.split('_')[1]
            parts.append(f'<span class="hcap-medal hcap-streak" data-bs-toggle="tooltip" data-bs-title="{n} consecutive races beating par">{_streak_icon(n)}</span>')
        elif t in icon_map:
            cls, title, key = icon_map[t]
            parts.append(_icon_span(key, cls, title))
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
                        f'<td>{r["original_place"]}</td><td>{r["adjusted_place"]}</td>'
                        f'<td>{_fmt_time(r["time_seconds"])}</td><td>{_fmt_time(r["adjusted_time_seconds"])}</td>'
                        f'<td>{r["handicap"]:.3f}</td><td>{r["handicap_post"]:.3f}</td>'
                        f'<td>{r["race_points"]}</td><td>{r["handicap_points"]}</td></tr>'
                        for r in results
                    )

                    craft_content += f"""{cw_open}
<div class="row mb-3">
  <div class="col-6 col-sm-3"><strong>Races:</strong> {len(results)}</div>
  <div class="col-6 col-sm-3"><strong>Finish Pts:</strong> {last["season_points"]}</div>
  <div class="col-6 col-sm-3"><strong>Corr Pts:</strong> {last["season_handicap_points"]}</div>
  <div class="col-6 col-sm-3"><strong>Hcap:</strong> {last["handicap_post"]:.3f}</div>
</div>
<div class="row mb-3">
  <div class="col-md-6"><canvas id="chart-pts-{cid}" style="max-height:220px"></canvas></div>
  <div class="col-md-6"><canvas id="chart-hcap-{cid}" style="max-height:220px"></canvas></div>
</div>
<table class="table table-sm table-striped table-hover">
  <thead><tr><th></th><th>Race</th><th>Date</th><th>Place</th><th>Place (Corr)</th><th>Time</th><th>Time (Corr)</th><th style="white-space:nowrap">vs Par</th><th>Index</th><th>New</th><th>Points</th><th>Corr Points</th></tr></thead>
  <tbody>{"".join(
      f'<tr><td style="white-space:nowrap">{_racer_trophy_badges(r.get("trophies",[]))}</td>'
      f'<td><a href="../results/{data["race_slugs"].get(data["current_club"], {}).get(r["race_id"], str(r["race_id"]))}.html">{r["name"].split(" — ")[0] + (" — " + r["name"].split(" — ")[1] if " — " in r["name"] else "")}</a></td>'
      f'<td class="text-muted small text-nowrap">{r["date"]}</td>'
      f'<td>{r["original_place"]}</td><td>{r["adjusted_place"]}</td>'
      f'<td>{_fmt_time(r["time_seconds"])}</td><td>{_fmt_time(r["adjusted_time_seconds"])}</td>'
      + (f'<td style="text-align:right;font-size:0.85em;color:{"#2E7D32" if (r["adjusted_time_versus_par"]-1)*100<=0 else "#666"};font-weight:{"bold" if (r["adjusted_time_versus_par"]-1)*100<=0 else "normal"}">{(r["adjusted_time_versus_par"]-1)*100:+.1f}%</td>' if r.get("adjusted_time_versus_par") else '<td></td>') +
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
        <span class="text-muted small fw-semibold">Club</span>
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
    """Generate clubs.html — one section per club with expanded stats."""
    import yaml
    clubs_config_path = Path(__file__).parent.parent / "data" / "clubs.yaml"
    clubs_cfg = {}
    if clubs_config_path.exists():
        with open(clubs_config_path) as f:
            clubs_cfg = yaml.safe_load(f).get("clubs", {})

    sections = ""
    for club_id, club in data["clubs"].items():
        cfg = clubs_cfg.get(club_id, {})
        name = cfg.get("name", club.get("name", club_id))
        short = cfg.get("short_name", name)
        ctype = cfg.get("type", "org")
        desc = cfg.get("description", "").strip()
        homepage = cfg.get("homepage_url", "")
        earliest_year = min(club["seasons"].keys())
        latest_year = max(club["seasons"].keys())
        year_range = f"{earliest_year}–{latest_year}"
        total_races = sum(len(s["races"]) for s in club["seasons"].values())
        total_racers = len({r["canonical_name"] for s in club["seasons"].values()
                            for race in s["races"] for r in race["results"]})
        type_badge = '<span class="badge bg-secondary ms-2" style="font-size:0.6em;vertical-align:middle">League</span>' if ctype == "league" else '<span class="badge bg-primary ms-2" style="font-size:0.6em;vertical-align:middle">Club</span>'

        # Top 5 racers by handicap points in current season
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
            top_html = f'<p class="text-muted small mb-1 fw-semibold">{current_year} top racers (corrected pts):</p><div class="d-flex flex-wrap gap-2 mb-3">'
            for n, pts in top_racers:
                s = _slug(n)
                link = f'<a href="{club_id}/racer/{s}.html" class="badge bg-light text-dark border text-decoration-none">{n} <span class="text-muted">({pts})</span></a>'
                top_html += link
            top_html += "</div>"

        homepage_link = f' · <a href="{homepage}" target="_blank">Website ↗</a>' if homepage else ""
        sections += f"""
<div class="mb-5">
  <h2>{name}{type_badge}</h2>
  <p class="text-muted">{desc}</p>
  <div class="d-flex flex-wrap gap-3 mb-3">
    <span><strong>{total_races}</strong> races</span>
    <span><strong>{total_racers}</strong> racers</span>
    <span><strong>{year_range}</strong></span>
  </div>
  {top_html}
  <div class="d-flex flex-wrap gap-2">
    <a href="{club_id}/results.html" class="btn btn-outline-primary btn-sm">Results</a>
    <a href="{club_id}/standings.html" class="btn btn-outline-secondary btn-sm">Standings</a>
    <a href="{club_id}/trajectories.html" class="btn btn-outline-secondary btn-sm">Trajectories</a>
    <a href="{club_id}/racer/index.html" class="btn btn-outline-secondary btn-sm">Racers</a>
    {f'<a href="{homepage}" target="_blank" class="btn btn-outline-secondary btn-sm">Website ↗</a>' if homepage else ''}
  </div>
  <hr class="mt-4">
</div>"""

    html = _head("Clubs — PaddleRace") + _nav("Clubs", data=data, depth=0) + f"""
<div class="container" style="max-width:800px">
  <h1 class="mb-4">Clubs &amp; Leagues</h1>
  {sections}
</div>""" + _foot()
    (SITE_DIR / "clubs.html").write_text(html)
    print("Generated: site/clubs.html")


def generate_about(data: dict = None) -> None:
    html = _head("About — PaddleRace") + _nav("About", data=data, depth=0) + """
<style>
dl dt { font-weight: 600; margin-top: 1.2em; }
dl dd { margin-left: 0; color: #333; }
dl dt:first-child { margin-top: 0; }
</style>
<div class="container" style="max-width:720px">
  <h1>About PaddleRace</h1>

  <p>PaddleRace tracks open water paddle racing results, standings, and performance trends for clubs and leagues in the Pacific Northwest. We're community-driven and not affiliated with any club or timing platform. Our goal is to make race performance data accessible and meaningful for every paddler in the region.</p>

  <p>We have data from 2015, tracking over 960 races and 6,000 athletes across four clubs and leagues.</p>

  <p>Contact: <a href="mailto:mike.liddell@gmail.com">mike.liddell@gmail.com</a> &middot; <a href="https://github.com/Mike3XL/bepc-racing/issues" target="_blank">GitHub issues</a>.</p>

  <h2>How the corrected results work</h2>

  <p>All results are calculated automatically from official race timing data. There is no manual adjustment or subjective scoring — the same algorithm applies to every racer, every race.</p>

  <p>Each racer has a performance index for each club and craft category they race with — a number that reflects their typical pace. An index below 1.0 means you're faster; above 1.0 means slower. Each performance index starts at 1.0 and adjusts gradually after each race.</p>

  <p>After a race, each racer's finish time is divided by their index to produce a <em>corrected time</em>. The racer with the best corrected time wins on corrected time, regardless of who crossed the line first. This lets a slower craft or a newer racer compete meaningfully against the fastest paddlers.</p>

  <p>The <em>par racer</em> is the finisher about one-third of the way down the corrected time list — someone who performed close to their predicted performance. Everyone else's result is expressed as a percentage above or below par.</p>

  <p>Your index updates after each race based on how you performed vs par. It responds faster to good days than bad ones, so an occasional off day has limited impact.</p>

  <h2>Clubs &amp; Leagues</h2>

  <p>We track clubs that run their own race series (BEPC, Sound Rowers, SCKC). We also maintain a PNW Regional league that draws from events across multiple organizers. Racers who attend Sound Rowers events appear in both Sound Rowers and PNW Regional standings, with separate indexes for each.</p>

  <h2>FAQ</h2>

  <dl>
    <dt>How do I get my results added?</dt>
    <dd>For clubs we already track, results are added automatically after each race — provided we can locate the upcoming race information and the results are hosted on a supported platform (WebScorer, Race Result, or Jericho). If your results aren't appearing, or you'd like to add a new club, series, or region, please let us know.</dd>

    <dt>Why aren't Sprint Kayak, SK, FSK, and HPK separate categories?</dt>
    <dd>Two reasons. First, most PNW fields are too small — splitting K-1 into sub-categories would leave each with too few racers for a reliable index. Second, many racers choose whichever boat suits the conditions on the day. We're tracking K-1 performance more than performance in a specific flavor of K-1. See <a href="http://www.soundrowers.org/boat-classes/determining-kayak-classifications/" target="_blank">Sound Rowers kayak classifications</a> for definitions of SK, FSK, and HPK.</dd>

    <dt>What do the craft abbreviations mean?</dt>
    <dd>K-1 and K-2 are single and double kayaks. OC-1, OC-2, OC-6 are outrigger canoes. Va'a is a style of rudderless outrigger canoe used in Polynesian paddling traditions. SUP is stand-up paddleboard. Prone is prone paddleboard. Where a specific boat model is known (e.g. "Surfski"), it's shown in parentheses alongside the category.</dd>

    <dt>What does the ^ symbol mean on a result?</dt>
    <dd>A ^ next to a corrected time or index value indicates an outlier result — the performance was more than 10% outside prediction and the index was not updated. It may also indicate a racer returning after a long absence, where the first result back is treated conservatively.</dd>

    <dt>What is the par racer trophy?</dt>
    <dd>The par racer is the finisher whose corrected time is closest to the par time — the benchmark for the day. It's awarded to the racer who most closely matched their predicted performance, which is a meaningful achievement in its own right.</dd>

    <dt>What is the streak trophy?</dt>
    <dd>A streak is three or more consecutive races where a racer beat par — finishing with a negative vs par result. The streak trophy shows the current streak length. It resets when a racer fails to beat par or misses a race.</dd>

    <dt>Why track corrected time?</dt>
    <dd>Finish time tells you who was fastest on the day. Corrected time tells you who performed best relative to their own history. A racer who beats their predicted performance by 3% may have had a better race than someone who finished ahead of them outright. Corrected time rewards consistency and improvement, not just raw speed — which means every racer has a shot at the top of the corrected time list, regardless of craft or experience level.</dd>

    <dt>Why are there different craft categories?</dt>
    <dd>An athlete who competes in both SUP and K-1 races will have meaningfully different performance profiles in each. Grouping them together would mean the index is trying to track two different things at once. Craft are grouped into categories (K-1, K-2, OC-1, OC-2, OC-6, Va'a, SUP, Prone, and others). Within a category, different specific boats are treated as equivalent for corrected time purposes.</dd>

    <dt>Why are there no gender or age groups?</dt>
    <dd>Personal performance indexes generally remove the rationale for age and gender categories. A racer with a well-established index is competing against their own predicted performance, not against others directly. When all athletes have a well-calibrated index, each race is a level playing field.</dd>

    <dt>What does "establishing index" mean?</dt>
    <dd>Your first two races in a club are used to set your initial index. You're eligible for finish trophies but not corrected time awards during this period.</dd>

    <dt>What is an outlier?</dt>
    <dd>If your corrected time is more than 10% outside what your index predicted, the result is flagged as an outlier and your index doesn't change. This protects against equipment failures, wrong turns, or other anomalies.</dd>

    <dt>Can people game the system?</dt>
    <dd>Yes, intentionally or accidentally. If a racer regularly underperforms — sandbagging, testing new gear, or racing casually — their index drifts high and they receive more correction in future races. If something looks off, review the result history on their racer page. Results more than 10% outside prediction are automatically ignored and don't affect the index.</dd>

    <dt>Why do I appear in both Sound Rowers and PNW Regional?</dt>
    <dd>Sound Rowers races are included in the PNW Regional league. Your index and points are tracked separately for each — your Sound Rowers index reflects your performance in that club's field, while your PNW Regional index reflects the broader league field.</dd>

    <dt>How is the index updated after each race?</dt>
    <dd>
      <table class="table table-bordered table-sm mt-2">
        <thead><tr><th>Situation</th><th>Update</th></tr></thead>
        <tbody>
          <tr><td>First race</td><td>Index set from your corrected time vs par</td></tr>
          <tr><td>Second race</td><td>50% blend of old index and new result</td></tr>
          <tr><td>Faster than predicted</td><td>30% shift toward new result</td></tr>
          <tr><td>Slower than predicted</td><td>15% shift toward new result</td></tr>
          <tr><td>Outlier (&gt;10% off)</td><td>No change</td></tr>
        </tbody>
      </table>
    </dd>

    <dt>How is the Predicted time calculated?</dt>
    <dd>The Predicted time is what we expect you to finish in, based on your current index and the course par time.
      <br><br>
      <strong>Par time</strong> is the benchmark finish time for the course — derived from the field of racers in each event.
      <br>
      <strong>Predicted time = Par time × Your index</strong>
      <br><br>
      For example, if par is 52:00 and your index is 0.847, your predicted time is 52:00 × 0.847 = 44:02.
      If you finish in 43:01 — 61 seconds faster than predicted — that's a strong performance and your index will improve.
      <br><br>
      The <strong>% shown on the podium</strong> is how much faster (▲) or slower (▼) you were compared to your predicted time.
      A racer with a lower index is a faster paddler; the handicap system levels the field so that consistent performance relative to your own prediction is rewarded.
    </dd>

    <dt>What are corrected points and finish points?</dt>
    <dd>Finish points are awarded for crossing the line: 10 pts for 1st, 9 for 2nd, down to 1 pt for 10th. Corrected points use the same scale but based on corrected time order. Points aren't awarded during your first two races while your index is being established. When a race has multiple distance groups, points are weighted by group size so the total available per race day stays roughly constant.</dd>
  </dl>

  <h2>Updates &amp; Roadmap</h2>
  <p>PaddleRace is an ongoing project. See the <a href="https://github.com/Mike3XL/bepc-racing" target="_blank">GitHub repository</a> for source code, open issues, and planned improvements. Feedback and contributions welcome.</p>

  <h2>References</h2>

  <h5>Race organizers</h5>
  <ul>
    <li><a href="https://www.pnworca.org" target="_blank">PNWORCA</a> — Pacific Northwest Outrigger Racing Canoe Association. Runs the annual Winter Series and other regional events.</li>
    <li><a href="https://www.soundrowers.org" target="_blank">Sound Rowers</a> — open-water paddling club running a full season of distance races across Puget Sound and beyond.</li>
    <li><a href="https://www.soundrowers.org/race-schedule/bellingham-bay-rough-water-race/" target="_blank">Bellingham Bay Outrigger Paddlers (BBOP)</a> — organizes the Peter Marcus Rough Water Race on Bellingham Bay.</li>
    <li><a href="https://www.gorgedownwindchamps.com" target="_blank">Gorge Downwind Champs</a> — annual downwind race on the Columbia River Gorge, Stevenson, WA.</li>
    <li><a href="https://www.ghckrt.com" target="_blank">Gig Harbor Canoe &amp; Kayak Racing Team</a> — organizes the Paddlers Cup and Eric Hughes Memorial Regatta.</li>
    <li><a href="https://www.jerichooutrigger.com" target="_blank">Jericho Beach Outrigger Canoe Club</a> — hosts BC-based events including Da Grind, Keats Chop, Whipper Snapper, and Wake Up the Gorge.</li>
    <li><a href="https://www.ballardelks.org/paddle-club" target="_blank">Ballard Elks Paddle Club (BEPC)</a> — weekly race series at Shilshole Bay, Seattle.</li>
    <li><a href="https://www.sckc.ws" target="_blank">Seattle Canoe and Kayak Club (SCKC)</a> — Duck Island Race series on Green Lake, Seattle.</li>
  </ul>

  <h5>Data sources</h5>
  <ul>
    <li><a href="https://www.webscorer.com" target="_blank">WebScorer</a> — used by BEPC, Sound Rowers, SCKC, and many PNW Regional events.</li>
    <li><a href="https://www.raceresult.com" target="_blank">Race Result</a> — used by Gorge Downwind Champs and other Pacific Multisports events.</li>
    <li><a href="https://register.pacificmultisports.com" target="_blank">Pacific Multisports</a> — registration platform for Peter Marcus, Narrows Challenge, Gorge Downwind, and others.</li>
    <li><a href="https://www.jerichooutrigger.com" target="_blank">Jericho Beach Outrigger Canoe Club</a> — hosts results for PNWORCA and BC races.</li>
  </ul>

  <h5>Methodology</h5>
  <p>The index system uses the same multiplicative time-correction approach as established sailing clubs.</p>
  <ul>
    <li><a href="https://topyacht.com.au/web/" target="_blank">TopYacht</a> — sailing results and handicapping software whose Back Calculated Handicap (BCH) methodology inspired this approach.</li>
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


def _cross_club_nav(slug: str, current_club: str, clubs_cfg: dict) -> str:
    """Build club nav buttons for a racer page using the pre-built _SLUG_CLUBS map."""
    clubs = _SLUG_CLUBS.get(slug, [current_club])
    btns = ""
    for cid in sorted(clubs):
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


def generate_platform_home(data: dict) -> None:
    """Generate the PaddleRace platform home page with club list and recent race feed."""
    import yaml, json as _json
    clubs_config_path = Path(__file__).parent.parent / "data" / "clubs.yaml"
    clubs_cfg = {}
    if clubs_config_path.exists():
        with open(clubs_config_path) as f:
            clubs_cfg = yaml.safe_load(f).get("clubs", {})

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
                # corrected top-10 by adjusted_place
                corr_sorted = sorted(
                    [r for r in race["results"] if r.get("eligible_adjusted_place",0) > 0],
                    key=lambda x: x.get("eligible_adjusted_place", 999)
                )[:10]
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
                                "place": r.get("eligible_adjusted_place",0),
                                "trophy": next((t for t in r.get("trophies",[]) if t in ("hcap_1","hcap_2","hcap_3")), None)}
                               for r in corr_sorted]
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
    recent_races = sorted(_union, key=lambda x: _parse_date(x["date"]), reverse=True)

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
                f'<span class="badge bg-light text-dark border" style="font-size:0.75em">{clubs_cfg.get(c, {}).get("short_name", c)}</span>'
                for c in race_clubs
            ) if race_clubs else '<span class="badge bg-secondary text-white border" style="font-size:0.75em">Unaffiliated</span>'
            upcoming_races.append({
                "name": race["name"],
                "date": race_date.strftime("%b %d, %Y"),
                "clubs_html": club_badges,
                "club_keys": race_clubs,
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
        upcoming_rows += f'<tr data-clubs="{data_clubs}" style="vertical-align:middle"><td class="small text-nowrap">{_date_html}</td><td><strong class="small">{r["name"]}</strong>{_location_html}</td><td>{r["clubs_html"]}</td><td class="text-muted small">{r["distance"]}</td>{notes_td}{links_td}</tr>'

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
        _club_keys_seen = sorted(set(k for r in upcoming_races for k in r.get('club_keys', [])))
        _options = ''.join(
            f'<option value="{clubs_cfg.get(c,{}).get("short_name",c)}">{clubs_cfg.get(c,{}).get("short_name",c)}</option>'
            for c in _club_keys_seen
        )
        _show_more = (
            '<button id="upcoming-show-more" class="btn btn-sm btn-outline-secondary mb-3"'
            ' onclick="var rows=document.querySelectorAll(\'#upcoming-table .upcoming-extra\');'
            'var expand=this.textContent===\'Show more ▼\';'
            'rows.forEach(function(r){if(!r.dataset.filtered)r.style.display=expand?\'\':\'none\';});'
            'this.textContent=expand?\'Show less ▲\':\'Show more ▼\';">Show more ▼</button>'
            if upcoming_rows_hidden else ''
        )
        upcoming_section_html = (
            f"<div class='d-flex align-items-center gap-2 mb-2 flex-wrap'>"
            f"<h2 class='h5 mb-0'>Upcoming</h2>"
            f"<select id='upcoming-club-filter' class='form-select form-select-sm' style='width:auto'>"
            f"<option value=''>All clubs</option>{_options}</select>"
            + (_show_more.replace('mb-3', 'mb-0') if _show_more else '')
            + f"</div>"
            f"<div class='table-responsive mb-1'><table id='upcoming-table' class='table table-sm table-hover'>"
            f"<thead><tr><th style='width:100px'>Date</th><th style='min-width:220px'>Race</th><th>Club</th><th>Distance</th>"
            f"<th style='min-width:180px'>Notes</th><th>Links</th></tr></thead>"
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
        tri = "▲" if pct >= 0 else "▼"
        pct_str = f"{abs(pct):.1f}% {tri}"
        ft = entry.get("ft","")
        predicted = entry.get("predicted","")
        return (f'<div class="podium-col">'
                f'<div class="p-icon">{icon}</div>'
                f'<div class="p-namerow"><span class="p-name" style="color:{tc}">{name}</span></div>'
                f'<div class="p-bar" style="height:{h}px;background:{bg};border:1px solid {bdr}">'
                f'<div class="p-diffrow">'
                f'<span class="p-tri" style="color:{tc}">{tri}</span>'
                f'<span class="p-pct" style="color:{tc}">{abs(pct):.1f}%</span>'
                f'<span class="p-ridx" style="color:{tc}">⊘{idx}</span>'
                f'</div>'
                f'<div class="p-spacer"></div>'
                f'<div class="p-timerow" style="color:{tc}"><span class="p-tlabel">Actual:</span><span class="p-tval">{ft}</span></div>'
                f'<div class="p-timerow" style="color:{tc}"><span class="p-tlabel">Predicted:</span><span class="p-tval">{predicted or "—"}</span></div>'
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

    def _build_course_panels(rid, courses_data, club_id, club_short, view_cls, podium_type="% vs Predicted"):
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
                f'<div class="podium-wrap">'
                f'<div class="view-panel {view_cls} active" id="{rid}-{view_cls}-{ci}">'
                f'<div class="rc-course-hdr"><span class="rc-course-name">{dist}</span><span class="rc-podium-type">{podium_type}</span></div>'
                f'<div class="podium-bars">{c_cols}</div>'
                f'<div class="podium-base"></div>'
                f'<div class="also-ran-single">{c_ar}</div></div>'
                f'<div class="view-panel view-finish" id="{rid}-finish-{ci}">'
                f'<div class="rc-course-hdr"><span class="rc-course-name">{dist}</span><span class="rc-podium-type">Finish Time</span></div>'
                f'<div class="podium-bars">{f_cols}</div>'
                f'<div class="podium-base"></div>'
                f'<div class="also-ran-single">{f_ar}</div></div>'
                f'</div></div>'
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

        # Build pill row: Finish Times first, then | then club pills
        _pill_clubs = ''
        for ci, c in enumerate(clubs_sorted):
            view_cls = f"view-c{ci}"
            active = " active" if ci == 0 else ""
            label = clubs_cfg.get(c["id"], {}).get("short_name", c["name"])
            _pill_clubs += (f'<a class="sel-pill corr-pill{active}" '
                            f'onclick="pdmView(this,\'{rid}\',\'{view_cls}\',false)" href="#">{label}</a>')
        pill_html = ('<div class="rc-pill-row">'
                     '<span class="rc-ranking-label">Ranking:</span>'
                     f'<a class="sel-pill finish-pill" onclick="pdmView(this,\'{rid}\',\'view-finish\',true)" href="#">Finish Times</a>'
                     '<span class="pill-sep">|</span>'
                     + _pill_clubs + '</div>')

        # Build podium panels for each club
        panels_html = ""
        for ci, c in enumerate(clubs_sorted):
            view_cls = f"view-c{ci}"
            _cslug = data.get("race_slugs", {}).get(c["id"], {}).get(c.get("race_id",""), "")
            _cresults = f'{c["id"]}/results/{_cslug}.html' if _cslug else ""
            _ptype = f'% vs Predicted'
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
            f'{panels_html}'
            f'{pill_html}'
            f'</div>'
        )

    # Split feed rows and collect club keys
    _feed_row_list = [s for s in feed_rows.split('<div class="rc-card') if s.strip()]
    _feed_row_list = ['<div class="rc-card' + s.rstrip() for s in _feed_row_list]
    feed_rows_visible = ''.join(_feed_row_list)
    feed_rows_hidden = ''
    # Collect unique club short names from recent races
    _feed_clubs = []
    for _r in recent_races:
        for _c in _r.get("clubs", []):
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
</div>
<script>
(function(){{
  var sel = document.getElementById('upcoming-club-filter');
  if (!sel) return;
  sel.addEventListener('change', function() {{
    var val = this.value;
    var btn = document.getElementById('upcoming-show-more');
    document.querySelectorAll('#upcoming-table tbody tr').forEach(function(r) {{
      var clubs = r.getAttribute('data-clubs') || '';
      var shortNames = clubs.split(' ').map(function(c) {{ return {club_short_json}[c] || c; }});
      var match = !val || shortNames.indexOf(val) >= 0;
      r.dataset.filtered = match ? '' : '1';
      if (!match) {{ r.style.display = 'none'; }}
      else if (!r.classList.contains('upcoming-extra') || (btn && btn.textContent === 'Show less ▲')) {{
        r.style.display = '';
      }}
    }});
  }});
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
.p-diffrow{{position:relative;display:flex;align-items:center;justify-content:center;padding-top:4px}}
.p-tri{{position:absolute;left:0;font-size:.88em;font-weight:700}}
.p-pct{{font-size:.88em;font-weight:700;text-align:center}}
.p-ridx{{position:absolute;right:0;font-size:.58em;font-weight:700;opacity:.75;white-space:nowrap}}
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
.rc-results-link{{font-size:.75em;color:#0d6efd;text-decoration:none;white-space:nowrap}}
.rc-pill-row{{display:flex;gap:4px;flex-wrap:wrap;align-items:center;justify-content:center;margin-top:14px}}
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
    <h2 class="h5 mb-0">Results</h2>
    <select id="feed-club-filter" class="form-select form-select-sm" style="width:auto" onchange="filterFeed(this.value)">
      <option value="">All clubs</option>
      {feed_club_options}
    </select>
    {'<button id="feed-show-more" class="btn btn-sm btn-outline-secondary mb-0" onclick="toggleFeedMore(this)">Show more ▼</button>' if _has_hidden else ""}
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
  var expand=btn.textContent==='Show more ▼';
  _applyFeedFilter(expand);
  btn.textContent=expand?'Show less ▲':'Show more ▼';
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
    btn.textContent=showAll?'Show less ▲':'Show more ▼';
  }}
}}
document.addEventListener('DOMContentLoaded',function(){{_applyFeedFilter(false);}});
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
                    corr_sorted = sorted([r for r in c["results"] if r.get("eligible_adjusted_place",0)>0], key=lambda x: x.get("eligible_adjusted_place",999))[:10]
                    corr_top10 = [{"name":r["canonical_name"],"slug":_slug(r["canonical_name"]),"ct":_fmt_t(r.get("adjusted_time_seconds")),"ft":_fmt_t(r.get("time_seconds")),"idx":f"{r.get('handicap',1.0):.3f}","place":r.get("eligible_adjusted_place",0)} for r in corr_sorted]
                    fin_sorted = sorted(c["results"], key=lambda x: x.get("original_place",999))[:10]
                    fin_top10 = [{"name":r["canonical_name"],"slug":_slug(r["canonical_name"]),"ft":_fmt_t(r.get("time_seconds")),"place":r.get("original_place",0)} for r in fin_sorted]
                    courses_data.append({"label": label if multi else "", "starters": len(c["results"]), "winners": winners, "finish_winners": finish_winners, "corr_top10": corr_top10, "fin_top10": fin_top10})
                race_list.append({
                    "race_id": race_id,
                    "name": base_name,
                    "date": courses[0]["date"],
                    "starters": sum(len(c["results"]) for c in courses),
                    "courses": courses_data,
                })
            seasons_data[year] = race_list
        _club_short = clubs_cfg.get(club_id, {}).get("short_name", club_id)
        (SITE_DIR / club_id / "races-list.json").write_text(_json.dumps({"seasons": seasons_data, "current": club["current_season"], "club_short": _club_short}))

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
                    f'onclick="document.querySelectorAll(\'.upcoming-extra\').forEach(function(r){{var e=r.style.display===\'none\';r.style.display=e?\'\':\' none\';}});this.textContent=this.textContent===\'Show more ▼\'?\'Show less ▲\':\'Show more ▼\';">'
                    f'Show more ▼</button>'
                ) if hidden else ''
                upcoming_html = (
                    f'<div id="upcoming-section">'
                    '<h2 class="h5 mb-2">Upcoming Races</h2>'
                    '<div class="table-responsive mb-1"><table class="table table-sm table-hover">'
                    '<thead><tr><th>Date</th><th>Race</th><th>Distance</th><th>Notes</th><th>Links</th></tr></thead>'
                    f'<tbody>{visible}{hidden}</tbody></table></div>'
                    f'{show_more_btn}'
                    f'</div>'
                )

        html = _head("Results") + _nav("Results", data=data, depth=1) + _selector_bar(data, page="results") + f"""
<style>
.podium-bars{{display:flex;align-items:flex-end;gap:3px}}
.podium-col{{display:flex;flex-direction:column;align-items:center;gap:1px;flex:1;min-width:0}}
.podium-name{{font-size:.75em;text-align:center;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:100%;color:#555}}
.podium-bar{{width:100%;border-bottom:none;border-radius:4px 4px 0 0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;padding:3px 2px}}
.podium-time{{font-size:.82em;font-weight:700;text-align:center}}
.podium-calc{{font-size:.6em;font-weight:700;text-align:center;line-height:1.3;white-space:nowrap}}
.podium-base{{height:2px;background:#CCC;border-radius:2px}}
.also-ran-single{{margin-top:4px;font-size:.72em;color:#666}}
.rl-panel{{display:none}}.rl-panel.active{{display:block}}
.course-name-side{{font-size:.82em;font-weight:700;color:#333;min-width:40px;white-space:nowrap;padding-bottom:26px}}
.course-flex{{display:flex;gap:8px;align-items:flex-end}}
.course-panels{{flex:1;min-width:0}}
.course-block.mt-2{{margin-top:.75rem}}
.pill-group{{display:flex;gap:4px;margin-top:4px;flex-wrap:wrap;align-items:center}}
.pill-sep{{font-size:.72em;color:#ccc}}
.sel-pill{{font-size:.75em;padding:2px 8px;border-radius:12px;border:1px solid #ccc;background:#f8f9fa;color:#555;cursor:pointer;text-decoration:none;white-space:nowrap}}
.sel-pill.active.corr-pill{{background:#198754;border-color:#198754;color:#fff}}
.sel-pill.active.finish-pill{{background:#0d6efd;border-color:#0d6efd;color:#fff}}
.feed-row td{{padding-top:44px!important;padding-bottom:44px!important;border-bottom:none!important}}
</style>
<div class="container">
  <h1 class="mb-3">Races</h1>
  {upcoming_html}
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
  document.querySelectorAll('#rl-table .feed-row').forEach(function(row) {{
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
var _rlH = {{1:60,2:48,3:32}};
function _rlCourseBlock(course, ci, isFirst) {{
  var dist = course.label || '';
  var starters = course.starters || 0;
  var nameDiv = '<div class="course-name-side"><strong>'+dist+'</strong><div class="text-muted" style="font-size:.72em;font-weight:400">'+starters+' starters</div></div>';
  // corrected cols
  var cCols=''; [2,1,3].forEach(function(p){{
    var e=(course.corr_top10||[]).find(function(x){{return x.place===p;}});
    var col=_rlColors[p]; var h=_rlH[p];
    if(e) cCols+=_rlPodiumCol(CUP[p],e.name,e.slug,h,col[1],col[2],col[0],e.ct,e.ft+' ⊘'+e.idx);
    else cCols+='<div class="podium-col">'+CUP[p]+'<span class="podium-name" style="color:#bbb">—</span><div class="podium-bar" style="height:'+h+'px;background:'+col[1]+';border:1px solid '+col[2]+'"></div></div>';
  }});
  var cAr=(course.corr_top10||[]).slice(3,10).map(function(e,i){{return (i+4)+'th: '+e.name;}}).join('  ');
  // finish cols
  var fCols=''; [2,1,3].forEach(function(p){{
    var e=(course.fin_top10||[]).find(function(x){{return x.place===p;}});
    var col=_rlColors[p]; var h=_rlH[p];
    if(e) fCols+=_rlPodiumCol(MEDAL[p],e.name,e.slug,h,col[1],col[2],col[0],e.ft,'');
    else fCols+='<div class="podium-col">'+MEDAL[p]+'<span class="podium-name" style="color:#bbb">—</span><div class="podium-bar" style="height:'+h+'px;background:'+col[1]+';border:1px solid '+col[2]+'"></div></div>';
  }});
  var fAr=(course.fin_top10||[]).slice(3,10).map(function(e,i){{return (i+4)+'th: '+e.name;}}).join('  ');
  var mt=ci>0?' mt-2':'';
  return '<div class="course-block'+mt+'"><div class="course-flex">'+nameDiv+'<div class="course-panels">'
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
    var pills = '<div class="pill-group">'
      +'<a class="sel-pill corr-pill'+(_rlView==='corr'?' active':'')+'" onclick="rlSetView(this,&quot;corr&quot;)" href="#">Corrected Times</a>'
      +'<span class="pill-sep">|</span>'
      +'<a class="sel-pill finish-pill'+(_rlView==='finish'?' active':'')+'" onclick="rlSetView(this,&quot;finish&quot;)" href="#">Finish Times</a>'
      +'</div>';
    var courses = r.courses.map(function(c,i){{return _rlCourseBlock(c,i,true);}}).join('');
    return '<tr class="feed-row" style="vertical-align:middle">'
      +'<td class="small text-nowrap" style="vertical-align:middle"><span style="font-weight:600">'+_dayName(r.date)+'</span><br><span class="text-muted">'+r.date+'</span></td>'
      +'<td style="vertical-align:middle"><strong class="small"><a href="results/'+slug+'.html">'+r.name+'</a></strong>'+pills+'</td>'
      +'<td>'+courses+'</td>'
      +'</tr>';
  }}).join('');
  document.getElementById('races-content').innerHTML = rows
    ? '<h2 class="h5 mb-2">Results</h2><div class="table-responsive"><table class="table table-sm" id="rl-table"><thead><tr><th style="width:90px">Date</th><th style="width:28%">Race</th><th>Podium</th></tr></thead><tbody>'+rows+'</tbody></table></div>'
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
    _t("clubs page", generate_clubs_page, data)
    # Rebuild search map now that racer pages exist — filters to only pages that exist
    _build_search_map(data, verify_files=True)
    _t("platform home", generate_platform_home, data)
    _t("cross-club links", generate_cross_club_links)
    # Always write CNAME so GitHub Pages custom domain survives every push
    (SITE_DIR / "CNAME").write_text("pnw.paddlerace.org\n")
