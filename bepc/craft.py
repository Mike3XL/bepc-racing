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
    ('hpk-2\\b|hpk2\\b',        'Kayak-2',       'HPK-2'),
    ('fsk-2\\b|fsk2\\b',        'Kayak-2',       'FSK-2'),
    ('sk-2\\b|sk2\\b',          'Kayak-2',       'SK-2'),
    ('k-2\\b|k2\\b',            'Kayak-2',       'K2'),
    ('surfski.*double|double.*kayak|\\bdk\\b', 'Kayak-2', None),
    # Kayak quads
    ('k-4\\b|k4\\b',            'Kayak-4',       'K4'),
    # Kayak singles — use \b or $ to avoid matching doubles
    ('surfski',                 'Kayak-1',       'SS'),
    ('hpk(?!-?2)\\b|hpk1\\b|hpdk\\b', 'Kayak-1', 'HPK'),
    ('fsk(?!-?2)\\b',           'Kayak-1',       'FSK'),
    ('sk(?!-?2)\\b',            'Kayak-1',       'SK'),
    ('k-1\\b|k1\\b',            'Kayak-1',       'K1'),
    ('pk\\b',                   'Kayak-1',       'PK'),
    ('spec\\b',                 'Kayak-1',       'Spec'),
    ('kayak',                   'Kayak-1',       'Kayak'),
    ('ss\\b',                   'Kayak-1',       'SS'),   # bare SS = surfski
    # Open water rowing — larger before smaller
    ('8[x+]|eight|oct',         'OW-8',          None),
    ('4[x+]|quad',              'OW-4',          None),
    ('2x\\b|rowboat.*2x',       'OW-2',          None),
    ('1x\\b|rowboat|wherry|gig|row\\b', 'OW-1',  None),
    # Outrigger — larger before smaller
    ('oc-?6|v-?6|v-?12',        'Outrigger-6',   None),
    ('oc-?3',                   'Outrigger-3',   None),
    ('oc-?2|v-?2',              'Outrigger-2',   None),
    ('oc-?1\\b|^oc$|v-?1\\b|^v$', 'Outrigger-1', None),
    # Canoe - Outrigger (verbose form)
    ('canoe.*outrigger.*single|canoe.*oc-?1', 'Outrigger-1', None),
    # SUP — unlimited before standard
    ('unlimited|sup.*ul\\b|sup.*unlim', 'SUP-Unlimited', None),
    ('sup\\b|standup|stand.?up', 'SUP-1',        'SUP'),
    # Prone
    ('prone',                   'Prone-1',       'Prone'),
    # Canoe (non-outrigger) — anchored to start, after outrigger patterns
    ('c-?3\\b',                 'Canoe-3',       None),
    ('c-?2\\b',                 'Canoe-2',       None),
    ('c-?1\\b|^canoe$',         'Canoe-1',       None),
    # Other
    ('pedal|dragon|rowing',     'Other',         None),
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
    r'recreational|rec|competitive|double|other.*)$', re.I
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
