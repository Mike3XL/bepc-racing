"""Fetch upcoming race schedules from external sources and merge into upcoming.yaml."""
import re
import urllib.request
from datetime import datetime, date
from html.parser import HTMLParser
from pathlib import Path

import yaml


# ── HTML helpers ──────────────────────────────────────────────────────────────

class _TableParser(HTMLParser):
    """Extract text rows from the first <table> on a page, capturing first link per row."""
    def __init__(self):
        super().__init__()
        self.rows: list[list[str]] = []
        self.row_links: list[str] = []  # first href per row
        self._row: list[str] = []
        self._row_link: str = ''
        self._cell: list[str] = []
        self._in_table = self._in_row = self._in_cell = False

    def handle_starttag(self, tag, attrs):
        attrs_d = dict(attrs)
        if tag == 'table': self._in_table = True
        elif tag == 'tr' and self._in_table:
            self._in_row = True; self._row = []; self._row_link = ''
        elif tag in ('td', 'th') and self._in_row: self._in_cell = True; self._cell = []
        elif tag == 'a' and self._in_row and not self._row_link:
            href = attrs_d.get('href', '')
            if href and not href.startswith('#') and 'soundrowers' in href:
                self._row_link = href

    def handle_endtag(self, tag):
        if tag == 'table': self._in_table = False
        elif tag == 'tr' and self._in_row:
            self._in_row = False
            if self._row:
                self.rows.append(self._row)
                self.row_links.append(self._row_link)
        elif tag in ('td', 'th') and self._in_cell:
            self._in_cell = False
            self._row.append(' '.join(self._cell).strip())

    def handle_data(self, data):
        if self._in_cell: self._cell.append(data.strip())


def _fetch(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=15) as r:
        return r.read().decode("utf-8", errors="replace")


# ── Date parsing ──────────────────────────────────────────────────────────────

def _parse_mdy(s: str) -> date | None:
    """Parse M/D/YYYY → date."""
    m = re.match(r'(\d{1,2})/(\d{1,2})/(\d{4})', s.strip())
    if m:
        try:
            return date(int(m.group(3)), int(m.group(1)), int(m.group(2)))
        except ValueError:
            pass
    return None


def _parse_time_str(s: str) -> str:
    """Extract start time string from a date/time cell like '5/2/2026 10 AM'."""
    # Remove the date part
    s = re.sub(r'^\d{1,2}/\d{1,2}/\d{4}\s*', '', s).strip()
    if not s:
        return ''
    # Normalise: take first time if range like "9:45/10 AM"
    s = re.sub(r'(\d+:\d+)/\d+', r'\1', s)
    s = re.sub(r'(\d+)/\d+\s*(AM|PM)', r'\1 \2', s)
    return s.strip()


# ── Source: Sound Rowers schedule ─────────────────────────────────────────────

def _fetch_soundrowers_race_details(url: str) -> dict:
    """Fetch individual Sound Rowers race page. Returns {meeting, start, register_url}."""
    result = {'meeting': '', 'start': '', 'register_url': ''}
    try:
        html = _fetch(url)
        text = re.sub(r'<[^>]+>', ' ', html)
        text = re.sub(r'\s+', ' ', text)
        m = re.search(r'Pre-Race Meeting\s*[:\*]*\s*([\d:]+\s*(?:AM|PM))', text, re.IGNORECASE)
        if not m:
            m = re.search(r'\bMeeting\s*[:\*]*\s*([\d:]+\s*(?:AM|PM))', text, re.IGNORECASE)
        if m:
            result['meeting'] = m.group(1).strip()
        m = re.search(r'Time\s*[:\*]*\s*([\d:]+\s*(?:AM|PM))', text, re.IGNORECASE)
        if not m:
            m = re.search(r'Start\s*[:\*]*\s*\w+\s+\d+,\s+\d{4}\s+([\d:]+\s*(?:AM|PM))', text, re.IGNORECASE)
        if m:
            result['start'] = m.group(1).strip()
        m = re.search(r'href="([^"]*register[^"]*)"', html, re.IGNORECASE)
        if m and 'soundrowers' not in m.group(1):
            result['register_url'] = m.group(1)
    except Exception:
        pass
    return result


# Known locations for Sound Rowers races (fixed venues — update if venues change)
_SR_LOCATIONS = {
    'la conner': 'La Conner, WA',
    'peter marcus': 'Bellingham, WA',
    'squaxin': 'Olympia, WA',
    'lake whatcom': 'Bellingham, WA',
    'commencement bay': 'Tacoma, WA',
    'guano rocks': 'Lake Entiat, WA',
    'rat island': 'Port Townsend, WA',
    'budd inlet': 'Olympia, WA',
    'elk river': 'Aberdeen, WA',
    'round shaw': 'Shaw Island, WA',
    'bainbridge': 'Bainbridge Island, WA',
    'lake samish': 'Bellingham, WA',
    'sausage pull': 'Mercer Island, WA',
    'port angeles': 'Port Angeles, WA',
}


def fetch_soundrowers() -> list[dict]:
    """Fetch Sound Rowers race schedule, enriching with per-race page details."""
    html = _fetch("https://www.soundrowers.org/race-schedule/")
    p = _TableParser()
    p.feed(html)
    today = date.today()
    races = []
    for row, row_link in zip(p.rows, p.row_links):
        if len(row) < 4:
            continue
        name_raw, datetime_raw, _level, distance_raw = row[0], row[1], row[2], row[3]
        if not name_raw or name_raw.lower() in ('race', 'annual meeting'):
            continue
        d = _parse_mdy(datetime_raw)
        if d is None or d <= today:
            continue
        time_str = _parse_time_str(datetime_raw)
        url = row_link or "https://www.soundrowers.org/race-schedule/"
        details = _fetch_soundrowers_race_details(url) if row_link else {}
        meeting = details.get('meeting') or ('TBD' if not details else 'TBD')
        start = details.get('start') or time_str or 'TBD'
        notes = f"Meeting: {meeting}, Start: {start}"
        location = next((v for k, v in _SR_LOCATIONS.items() if k in name_raw.lower()), '')
        if location:
            notes += f" · {location}"
        links = [{"label": "Series", "url": "https://www.soundrowers.org/race-schedule/"}]
        if details.get('register_url'):
            links.append({"label": "Register", "url": details['register_url']})
        distance = re.sub(r'\s+', ' ', distance_raw).strip()
        races.append({
            "name": name_raw,
            "date": d.strftime("%Y-%m-%d"),
            "clubs": ["sound-rowers", "pnw-regional"],
            "distance": distance,
            "url": url,
            "links": links,
            "notes": notes,
        })
    return races


# ── Source: Paddlers Cup ───────────────────────────────────────────────────────

def fetch_paddlers_cup() -> list[dict]:
    html = _fetch("https://gigharborpaddlerscup.com")
    # Look for pattern like "April 25-26, 2026" or "April 25 & 26, 2026"
    m = re.search(r'(January|February|March|April|May|June|July|August|September|October|November|December)'
                  r'\s+(\d{1,2})[\s\-–&]+\d{1,2},?\s+(\d{4})', html)
    if not m:
        return []
    month_str, day_str, year_str = m.group(1), m.group(2), m.group(3)
    try:
        d = datetime.strptime(f"{month_str} {day_str} {year_str}", "%B %d %Y").date()
    except ValueError:
        return []
    if d <= date.today():
        return []
    return [{
        "name": "Paddlers Cup",
        "date": d.strftime("%Y-%m-%d"),
        "clubs": ["pnw-regional"],
        "distance": "2.5K/5K/10K",
        "url": "https://gigharborpaddlerscup.com",
        "links": [
            {"label": "Register", "url": "https://gigharborpaddlerscup.com/registration-2/"},
            {"label": "Info", "url": "https://gigharborpaddlerscup.com"},
        ],
        "notes": "Meeting: TBD, Start: TBD · Skansie Park, Gig Harbor, WA",
    }]


# ── Source: BEPC WebScorer start lists ────────────────────────────────────────

class _StartListParser(HTMLParser):
    """Parse WebScorer organizer page start lists tab."""
    def __init__(self):
        super().__init__()
        self.races: list[dict] = []
        self._in_row = False
        self._cells: list[str] = []
        self._cell_buf: list[str] = []
        self._in_cell = False
        self._current_link = ''

    def handle_starttag(self, tag, attrs):
        attrs_d = dict(attrs)
        if tag == 'tr':
            self._in_row = True
            self._cells = []
            self._current_link = ''
        elif tag in ('td', 'th') and self._in_row:
            self._in_cell = True
            self._cell_buf = []
        elif tag == 'a' and self._in_cell:
            href = attrs_d.get('href', '')
            if 'raceid=' in href or 'startlistid=' in href:
                self._current_link = 'https://www.webscorer.com/' + href.lstrip('/')

    def handle_endtag(self, tag):
        if tag == 'tr':
            self._in_row = False
            if len(self._cells) >= 2:
                name = self._cells[0]
                date_str = self._cells[1] if len(self._cells) > 1 else ''
                d = _parse_date_webscorer(date_str)
                if d and name and not name.lower().startswith('name'):
                    self.races.append({'name': name, 'date': d, 'url': self._current_link})
        elif tag in ('td', 'th') and self._in_cell:
            self._in_cell = False
            self._cells.append(' '.join(self._cell_buf).strip())

    def handle_data(self, data):
        if self._in_cell:
            self._cell_buf.append(data.strip())


def _parse_date_webscorer(s: str) -> str | None:
    """Parse WebScorer date formats like 'May 5, 2026' or '5/5/2026'."""
    s = s.strip()
    for fmt in ('%b %d, %Y', '%B %d, %Y', '%m/%d/%Y'):
        try:
            d = datetime.strptime(s, fmt).date()
            if d > date.today():
                return d.strftime('%Y-%m-%d')
        except ValueError:
            pass
    return None


# ── Source: BEPC Monday series (config-driven) ────────────────────────────────

def _bepc_notes(d: date) -> str:
    """Return timing notes for a BEPC Monday race based on month."""
    if d.month >= 9:  # September onwards — early sunset schedule
        return "Reg: 5:30 PM, Meeting: 6 PM, Start: 6:30 PM"
    return "Reg: 6 PM, Meeting: 6:30 PM, Start: 7 PM"


def fetch_bepc_monday(season_start: str, season_end: str, skip_dates: list[str] = None,
                      notes_template: str = "") -> list[dict]:
    """Generate BEPC Monday race entries from season date range."""
    from datetime import timedelta
    today = date.today()
    skip = set(skip_dates or [])
    start = datetime.strptime(season_start, "%Y-%m-%d").date()
    end = datetime.strptime(season_end, "%Y-%m-%d").date()
    # Find first Monday on or after start
    d = start
    while d.weekday() != 0:  # 0 = Monday
        d += timedelta(days=1)
    races = []
    race_num = 1
    while d <= end:
        ds = d.strftime("%Y-%m-%d")
        if ds not in skip and d > today:
            races.append({
                "name": f"BEPC {d.year} Race Series #{race_num}",
                "date": ds,
                "clubs": ["bepc"],
                "distance": "~3 mi",
                "url": "https://ballardelks.org/membership/ballard-elks-paddling-club-bepc/elks-monday-night-races/",
                "links": [{"label": "Info", "url": "https://ballardelks.org/membership/ballard-elks-paddling-club-bepc/elks-monday-night-races/"}],
                "notes": _bepc_notes(d) + " · Shilshole Bay, Seattle, WA",
            })
        race_num += 1
        d += timedelta(days=7)
    return races


def fetch_bepc_webscorer() -> list[dict]:
    """Fetch upcoming BEPC races from WebScorer registration page."""
    import urllib.request as _req
    import re as _re
    from datetime import datetime as _dt

    url = 'https://www.webscorer.com/bepc827?pg=register'
    try:
        r = _req.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with _req.urlopen(r, timeout=15) as resp:
            html = resp.read().decode('utf-8', errors='replace')
    except Exception as e:
        print(f"  BEPC WebScorer: ERROR fetching register page — {e}")
        return []

    # Extract (raceid, date) pairs from register page
    pairs = _re.findall(
        r'href=\"/register\?raceid=(\d+)\".*?lbRaceDate[^>]*>([^<]+)<',
        html, _re.DOTALL
    )
    today = date.today()
    races = []
    seen_ids = set()
    race_num = 0
    for raceid, date_str in pairs:
        if raceid in seen_ids:
            continue
        seen_ids.add(raceid)
        d = None
        for fmt in ('%B %d, %Y', '%b %d, %Y', '%m/%d/%Y'):
            try:
                d = _dt.strptime(date_str.strip(), fmt).date()
                break
            except ValueError:
                pass
        if not d or d <= today:
            continue

        race_num += 1
        race_url = f'https://www.webscorer.com/register?raceid={raceid}'
        name = f'BEPC {d.year} Race Series #{race_num}'
        # Use _bepc_notes for timing (consistent by month, no need to parse each page)
        notes = _bepc_notes(d)

        races.append({
            'name': name,
            'date': d.strftime('%Y-%m-%d'),
            'clubs': ['bepc'],
            'distance': '~3 mi',
            'source_id': int(raceid),
            'url': race_url,
            'links': [
                {'label': 'Register', 'url': race_url},
                {'label': 'Info', 'url': 'https://ballardelks.org/membership/ballard-elks-paddling-club-bepc/elks-monday-night-races/'},
            ],
            'notes': notes + (' · ' if notes else '') + 'Shilshole Bay, Seattle, WA',
        })
    return races




def _race_key(r: dict) -> tuple:
    # Prefer source_id for dedup if available
    if r.get('source_id'):
        return ('source_id', str(r['source_id']))
    return (r.get('name', '').lower().strip(), r.get('date', ''))


def sync_upcoming(upcoming_path: Path, dry_run: bool = False) -> None:
    today = date.today()

    # Load existing
    existing: list[dict] = []
    if upcoming_path.exists():
        with open(upcoming_path) as f:
            data = yaml.safe_load(f) or {}
        existing = data.get('upcoming', [])

    # Remove past entries
    today_str = today.strftime('%Y-%m-%d')
    pruned = [r for r in existing if r.get('date', '9999') <= today_str]
    existing = [r for r in existing if r.get('date', '9999') > today_str]

    existing_keys = {_race_key(r) for r in existing}

    # Load clubs.yaml for BEPC season config
    clubs_yaml_path = upcoming_path.parent / 'clubs.yaml'
    bepc_season = {}
    if clubs_yaml_path.exists():
        with open(clubs_yaml_path) as f:
            clubs_cfg = yaml.safe_load(f) or {}
        bepc_season = clubs_cfg.get('clubs', {}).get('bepc', {}).get('monday_season', {})

    # Fetch all sources
    sources = [
        ("Sound Rowers", fetch_soundrowers),
        ("Paddlers Cup", fetch_paddlers_cup),
        ("BEPC WebScorer", fetch_bepc_webscorer),
    ]

    added = []
    updated = []
    for label, fn in sources:
        try:
            races = fn()
            print(f"  {label}: {len(races)} races found")
            for r in races:
                k = _race_key(r)
                if k not in existing_keys:
                    existing.append(r)
                    existing_keys.add(k)
                    added.append(r['name'])
                else:
                    # Update name/notes/distance on existing entry if source has them
                    for ex in existing:
                        if _race_key(ex) == k:
                            if r.get('name') and ex.get('name') != r['name']:
                                ex['name'] = r['name']
                                updated.append(r['name'])
                            if r.get('notes') and ex.get('notes') != r['notes']:
                                ex['notes'] = r['notes']
                            if r.get('distance') and not ex.get('distance'):
                                ex['distance'] = r['distance']
                            break
        except Exception as e:
            print(f"  {label}: ERROR — {e}")

    # Sort by date
    existing.sort(key=lambda r: r.get('date', ''))

    # Write back (skip if dry run)
    if not dry_run:
        with open(upcoming_path, 'w') as f:
            f.write("# Upcoming races — auto-synced via cli.py sync-upcoming\n")
            f.write("# Manual entries OK; past entries are pruned automatically\n\n")
            f.write("upcoming:\n")
            for r in existing:
                f.write(f"  - name: \"{r['name']}\"\n")
                f.write(f"    date: \"{r['date']}\"\n")
                clubs_str = '[' + ', '.join(r.get('clubs', [])) + ']'
                f.write(f"    clubs: {clubs_str}\n")
                if r.get('source_id'):
                    f.write(f"    source_id: {r['source_id']}\n")
                if r.get('distance'):
                    f.write(f"    distance: \"{r['distance']}\"\n")
                if r.get('url'):
                    f.write(f"    url: {r['url']}\n")
                if r.get('series_url'):
                    f.write(f"    series_url: {r['series_url']}\n")
                if r.get('links'):
                    f.write(f"    links:\n")
                    for lnk in r['links']:
                        f.write(f"      - label: \"{lnk['label']}\"\n")
                        f.write(f"        url: {lnk['url']}\n")
                if r.get('notes'):
                    f.write(f"    notes: \"{r['notes']}\"\n")

    prefix = "[DRY RUN] Would " if dry_run else ""
    if pruned:
        print(f"  {prefix}prune {len(pruned)} past race(s): {', '.join(r['name'] for r in pruned)}")
    if added:
        print(f"  {prefix}add {len(added)} new race(s): {', '.join(added[:5])}{'...' if len(added) > 5 else ''}")
    if updated:
        print(f"  {prefix}update notes on {len(updated)} race(s).")
    if not added and not updated and not pruned:
        print("  No changes.")
