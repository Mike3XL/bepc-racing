"""
Craft category normalization.
See docs/CRAFT_CATEGORIES.md for the scheme.

Design: strip age/gender prefixes → match from start of cleaned string.
Using re.match (implicit ^) eliminates substring ambiguity.
Doubles-before-singles ordering + \b handles HPK vs HPK-2 cleanly.
"""
import re

# Patterns applied to the cleaned craft string using re.match (start-anchored).
# Order: doubles before singles within each family; larger before smaller for outrigger.
# Each entry: (pattern, category, specific_override_or_None)
# specific_override: if set, use this as the specific instead of the first token.
_PATTERNS = [
    # Kayak doubles — must come before singles; use $ or \b to avoid partial match
    ('hpk-3\\b|hpk3\\b',        'Kayak-3',       'HPK-3'),
    ('hpk-2\\b|hpk2\\b|hpk.*double|hpk.*2x', 'Kayak-2', 'HPK-2'),
    ('fsk-2\\b|fsk2\\b',        'Kayak-2',       'FSK-2'),
    ('sk-2\\b|sk2\\b',          'Kayak-2',       'SK-2'),
    # Surfski doubles — before generic K2 so "K2 Surfski" maps correctly
    ('k2.*surfski|surfski.*double|surfski.*2x|double.*kayak|\\bdk\\b', 'Kayak-2', 'Surfski-2'),
    ('k-2\\b|k2\\b',            'Sprint-K2',     'K2'),
    # Kayak quads — sprint K4 before generic
    ('k-4\\b|k4\\b',            'Sprint-K4',     'K4'),
    # Kayak singles — use \b or $ to avoid matching doubles
    ('surfski',                 'Kayak-1',       'Surfski'),
    ('hpk(?!-?[23])\\b|hpk1\\b|hpdk\\b', 'Kayak-1', 'HPK'),
    ('fsk(?!-?2)\\b',           'Kayak-1',       'FSK'),
    ('sk(?!-?2)\\b',            'Kayak-1',       'SK'),
    ('k-1\\b|k1\\b',            'Sprint-K1',     'K1'),
    ('pk\\b',                   'Kayak-1',       'PK'),
    ('spec\\b',                 'Kayak-1',       'Spec'),
    # Non-sprint (fitness/plastic) kayak — PaddleGuru uses this term
    ('kayak.*non.?sprint|non.?sprint.*kayak|fitness.*kayak', 'Kayak-1', 'HPK'),
    ('kayak',                   'Kayak-1',       'Kayak'),
    ('ss\\b',                   'Kayak-1',       'Surfski'),  # bare SS = surfski
    # Open water rowing — larger before smaller
    ('8[x+]|eight|oct',         'OW-8',          None),
    ('4[x+]|quad',              'OW-4',          None),
    ('2x\\b|rowboat.*2x',       'OW-2',          None),
    ('1x\\b|rowboat|wherry|gig|row\\b', 'OW-1',  None),
    # OC (outrigger canoe) — larger before smaller
    ('oc-?6',                   'OC-6',          'OC-6'),
    ('oc-?3',                   'OC-3',          'OC-3'),
    ('oc-?2',                   'OC-2',          'OC-2'),
    ('oc-?1\\b|^oc$',           'OC-1',          'OC-1'),
    # Outrigger verbose forms (e.g. "Outrigger Canoe") — default to OC-1 unless a count is specified
    ("canoe.*outrigger.*single|canoe.*oc-?1", 'OC-1', 'OC-1'),
    ("outrigger\\s+canoe",      'OC-1',          'OC-1'),
    # Va'a (rudderless outrigger) — larger before smaller
    ("v-?12\\b",                "Va'a-6",        'V-12'),
    ("v-?6\\b",                 "Va'a-6",        'V-6'),
    ("v-?2\\b",                 "Va'a-2",        'V-2'),
    ("v-?1\\b|^v$",             "Va'a-1",        'V-1'),
    # SUP — unlimited before standard
    ('unlimited|sup.*ul\\b|sup.*unlim', 'SUP-Unlimited', None),
    ('sup\\b|standup|stand.?up', 'SUP-1',        'SUP'),
    # Prone — also "paddleboard" (PaddleGuru term)
    ('prone',                   'Prone-1',       'Prone'),
    ('paddleboard|paddle\\s*board', 'Prone-1',   'Prone'),
    # Canoe (non-outrigger) — anchored to start, after outrigger patterns
    ('c-?4\\b',                 'Canoe-4',       None),
    ('c-?3\\b',                 'Canoe-3',       None),
    ('c-?2\\b',                 'Canoe-2',       None),
    ('c-?1\\b|^canoe$',         'Canoe-1',       None),
    # Other
    ('pedal|dragon|rowing',     'Other',         None),
    (r'other.*\b2\b|other.*double|other.*2.person', 'Other-2', None),
    (r'^other',                 'Other',         None),
]
_COMPILED = [(re.compile(p, re.I), cat, spec) for p, cat, spec in _PATTERNS]

# Prefixes to strip: "Master 60+ Men Surfski" → "Surfski"
# Applied in order until no more stripping possible.
_STRIP = [re.compile(p, re.I) for p in [
    r'^(?:masters?|open|junior|senior|novice|elite)\s+[\d+\-\(\)]+\s+(?:men|women|mixed)\s+(.+)$',
    r'^(?:masters?|open|junior|senior|novice|elite)\s+(?:men|women|mixed)\s+(.+)$',
    r'^(?:masters?)\s+[\d+\-\(\)]+\s+(.+)$',
    r'^(?:masters?)\s+([a-z][a-z0-9\-]+)(?:\s+[\d\(].*)?$',
    r'^(?:men|women|mixed|male|female)\s+(.+)$',
    r'^(?:junior|senior|master|open|any|novice|elite|rec)\s+(.+)$',
]]

# Pure division labels — not craft
_NON_CRAFT = re.compile(
    r'^(men|women|mixed|male|female|master|masters|open|junior|senior|novice|elite|'
    r'recreational|rec|competitive|double)$', re.I
)


def _strip_prefixes(raw: str) -> str:
    for _ in range(4):
        changed = False
        for pat in _STRIP:
            m = pat.match(raw)
            if m:
                candidate = m.group(1).strip()
                if not re.match(r'^[\d+\-\(\)]+$', candidate):
                    raw, changed = candidate, True
                    break
        if not changed:
            break
    return raw


def normalize_craft(raw: str) -> tuple[str, str]:
    """Return (category, specific) for a raw craft string."""
    raw = raw.strip()
    if not raw:
        return 'Unknown', ''
    cleaned = _strip_prefixes(raw)
    # Strip gender suffix from token: OC2-M → OC2
    cleaned = re.sub(r'-[MWFmwf](?:x)?$', '', cleaned, flags=re.I)
    if _NON_CRAFT.match(cleaned):
        return 'Unknown', raw
    for pattern, category, spec_override in _COMPILED:
        if pattern.match(cleaned):
            specific = spec_override or _make_specific(cleaned, category)
            return category, specific
    return 'Unknown', raw


def _make_specific(cleaned: str, category: str) -> str:
    """Short specific name, with -N suffix for multi-person craft."""
    n = int(m.group(1)) if (m := re.search(r'-(\d+)$', category)) else 1
    # Strip board-length suffixes with foot/inch markers only (14', 12")
    token = re.sub(r"-?\d+['\"]$", '', cleaned.split()[0].rstrip(".,'\"`"))
    token = re.sub(r'-[MWFmwf](?:x)?$', '', token, flags=re.I)
    # If token is a non-craft word, use next meaningful token
    if token.lower() in ('double', 'men', 'women', 'mixed', 'single'):
        parts = cleaned.split()
        token = parts[1] if len(parts) > 1 else token
    if n > 1:
        # Don't append -N if token already encodes count (starts with digit, e.g. 2x, 4x+, 2x-OW)
        if re.match(r'\d', token):
            return token
        token = re.sub(r'-?\d+$', '', token)
        return f'{token}-{n}'
    return token


def display_craft(category: str, specific: str) -> str:
    if category == 'Unknown':
        return ''
    if not specific or specific.lower() == category.lower():
        return category
    return f'{category} ({specific})'


def display_craft_ui(category: str) -> str:
    """Return the Display (UX) label for a craft category.

    Three-level naming:
      Raw (source)  →  Craft (normalized specific)  →  Display (UX)
      e.g. "surfski 2x" → "Surfski-2" → "K-2"
      e.g. "HPK"        → "HPK"       → "K-1"
      e.g. "K1"         → "K1"        → "K-1 (sprint)"
      e.g. "OC-1"       → "OC-1"      → "OC-1"
      e.g. "1x"         → "1x"        → "OW"

    UX cell shows Display; tooltip shows Craft (specific).
    """
    if not category or category == 'Unknown':
        return ''
    # Sprint kayak family → K-N (sprint)
    m = re.match(r'^Sprint-K(\d+)$', category)
    if m:
        return f'K-{m.group(1)} (sprint)'
    # Va'a family → V-N
    m = re.match(r"^Va'a-(\d+)$", category)
    if m:
        return f'V-{m.group(1)}'
    # Canoe family → C-N
    m = re.match(r'^Canoe-(\d+)$', category)
    if m:
        return f'C-{m.group(1)}'
    # Kayak family → K-N
    m = re.match(r'^Kayak-(\d+)$', category)
    if m:
        return f'K-{m.group(1)}'
    # Strip -1 for OW, SUP, Prone
    if re.match(r'^(OW|SUP|Prone)-1$', category):
        return category[:-2]
    return category


def audit_crafts(results: list[dict]) -> list[str]:
    warnings = []
    seen = set()
    for r in results:
        raw = r.get('craft_specific', r.get('craft_category', ''))
        if not raw or raw in seen:
            continue
        seen.add(raw)
        cat, _ = normalize_craft(raw)
        if cat == 'Unknown':
            warnings.append(f"Unknown craft: '{raw}'")
    return warnings
