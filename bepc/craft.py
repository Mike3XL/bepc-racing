"""
Craft category normalization — table-driven approach.
See docs/CRAFT_CATEGORIES.md for the scheme.

Compare with craft.py (imperative approach) using:
    python3 bepc/craft_compare.py
"""
import re

# Step 1: Strip age/gender/qualifier prefixes to expose the craft token.
# Applied repeatedly until no more stripping is possible.
_STRIP_PATTERNS = [
    # "Master/Masters AgeRange Gender Craft" — full PNWORCA format
    r'^(?:masters?|open|junior|senior|novice|elite)\s+[\d+\-\(\)]+\s+(?:men|women|mixed)\s+(.+)$',
    # "Master/Masters Gender Craft" — no age range
    r'^(?:masters?|open|junior|senior|novice|elite)\s+(?:men|women|mixed)\s+(.+)$',
    # "Masters AgeRange Craft" — no gender
    r'^(?:masters?)\s+[\d+\-\(\)]+\s+(.+)$',
    # "Masters Craft (AgeRange)" or "Masters Craft AgeRange"
    r'^(?:masters?)\s+([a-z][a-z0-9\-]+)(?:\s+[\d\(].*)?$',
    # "Gender Craft" — "Men HPK", "Women OC1"
    r'^(?:men|women|mixed|male|female)\s+(.+)$',
    # "Qualifier Craft" — "Junior SUP", "Any SUP Inflatable"
    r'^(?:junior|senior|master|open|any|novice|elite|rec)\s+(.+)$',
]
_STRIP_RE = [re.compile(p, re.I) for p in _STRIP_PATTERNS]


def _strip_prefixes(raw: str) -> str:
    """Strip age/gender/qualifier prefixes, returning the craft token."""
    for _ in range(4):  # max 4 passes
        changed = False
        for pat in _STRIP_RE:
            m = pat.match(raw)
            if m:
                candidate = m.group(1).strip()
                # Don't strip if result is just digits/symbols
                if re.match(r'^[\d+\-\(\)]+$', candidate):
                    continue
                raw = candidate
                changed = True
                break
        if not changed:
            break
    return raw


# Step 2: Match the cleaned craft token against category patterns.
# Each entry: (compiled_regex, category)
# First match wins. Patterns are ordered most-specific first.
_CATEGORY_PATTERNS = [
    # Kayak — most specific first; use negative lookahead to avoid -2 forms matching Kayak-1
    (re.compile(r'surfski.*double|double.*kayak|hpk.?2|fsk.?2|sk.?2|k-?2\b|\bdk\b', re.I), 'Kayak-2'),
    (re.compile(r'k-?4\b|k4\b', re.I), 'Kayak-4'),
    (re.compile(r'surfski|^ss$|\bhpk(?!-?2)\b|\bfsk(?!-?2)\b|\bsk(?!-?2)\b|k-?1\b|pk\b|\bkayak(?!-?2)\b|hpdk\b|^spec\b', re.I), 'Kayak-1'),

    # Open water rowing — larger before smaller
    (re.compile(r'8[x+]|eight|oct', re.I), 'OW-8'),
    (re.compile(r'4[x+]|quad', re.I), 'OW-4'),
    (re.compile(r'2x|double.*ow|ow.*double|rowboat.*2x|sliding.*2x', re.I), 'OW-2'),
    (re.compile(r'1x|single.*ow|ow.*single|rowboat.*1x|sliding.*1x|wherry|gig|row\b', re.I), 'OW-1'),

    # Outrigger — larger before smaller; use exact boundaries to avoid OC-2 matching OC-1
    (re.compile(r'oc-?6|v-?6|v-?12', re.I), 'Outrigger-6'),
    (re.compile(r'oc-?3', re.I), 'Outrigger-3'),
    (re.compile(r'oc-?2|v-?2', re.I), 'Outrigger-2'),
    (re.compile(r'oc-?1\b|^oc$|v-?1\b', re.I), 'Outrigger-1'),  # bare OC or OC1/OC-1 only

    # SUP — unlimited before standard
    (re.compile(r'unlimited|sup.*ul\b|sup.*unlim', re.I), 'SUP-Unlimited'),
    (re.compile(r'sup\b|standup|stand.?up', re.I), 'SUP-1'),

    # Prone
    (re.compile(r'prone', re.I), 'Prone-1'),

    # Canoe (non-outrigger) — must start with C, not OC
    (re.compile(r'^c-?3', re.I), 'Canoe-3'),
    (re.compile(r'^c-?2', re.I), 'Canoe-2'),
    (re.compile(r'^c-?1\b|^canoe$', re.I), 'Canoe-1'),

    # Other
    (re.compile(r'pedal|dragon|rowboat|rowing', re.I), 'Other'),
]

# Pure division labels — not craft at all
_NON_CRAFT = re.compile(
    r'^(men|women|mixed|male|female|master|masters|open|junior|senior|novice|elite|'
    r'recreational|rec|competitive|double|other.*person)$',
    re.I
)


def normalize_craft(raw: str) -> tuple[str, str]:
    """
    Normalize a raw craft string to (category, specific).

    Returns:
        category: e.g. "Kayak-1", "Outrigger-1", "Unknown"
        specific: cleaned short form, with -N suffix for multi-person craft
    """
    raw = raw.strip()
    if not raw:
        return "Unknown", ""

    cleaned = _strip_prefixes(raw)

    # Check if it's a pure division label
    if _NON_CRAFT.match(cleaned):
        return "Unknown", raw

    # Match against category patterns
    for pattern, category in _CATEGORY_PATTERNS:
        if pattern.search(cleaned):
            specific = _make_specific(cleaned, category)
            return category, specific

    return "Unknown", raw


def _make_specific(cleaned: str, category: str) -> str:
    """Derive the specific craft name from the cleaned string and category."""
    token = cleaned.split()[0].rstrip(".,'\"`")
    # Strip gender/age suffixes like -M, -W, -Mx from token
    token = re.sub(r'-[MWFmwf](?:x)?$', '', token)

    # Determine person count from category suffix
    m = re.search(r'-(\d+)$', category)
    n = int(m.group(1)) if m else 1

    # Canonical short names for common tokens
    _TOKEN_MAP = {
        'surfski': 'SS', 'hpk': 'HPK', 'hpdk': 'HPK',
        'fsk': 'FSK', 'sk': 'SK', 'kayak': 'Kayak', 'kayaks': 'Kayak',
        'k': 'K', 'pk': 'PK', 'spec': 'Spec', 'dk': 'DK',
        'oc': 'OC', 'v': 'V',
        'sup': 'SUP', 'prone': 'Prone', 'canoe': 'Canoe',
        'pedal': 'Pedal', 'dragon': 'Dragon',
        'row': 'Row', 'rowboat': 'Row', 'wherry': 'Wherry', 'gig': 'Gig',
        'double': None,  # "Double" alone is not a useful specific
    }
    base = _TOKEN_MAP.get(token.lower(), token)
    if base is None:
        # "Double" in "Surfski Double" — use first non-Double token
        parts = [p for p in cleaned.split() if p.lower() not in ('double', 'men', 'women', 'mixed')]
        base = _TOKEN_MAP.get(parts[0].lower(), parts[0]) if parts else token
        if base is None:
            base = token

    # Tokens that already encode the count (e.g. 2x, 4x, OC2, V1) — don't append -N
    if re.match(r'^[0-9]', token) or re.search(r'\d$', token):
        return base  # e.g. "2x", "4x", "1x"

    # Strip board length suffixes like 14', 12' before adding -N
    base = re.sub(r"-?\d+['\"ft]?$", '', base)

    # For multi-person craft, append -N
    if n > 1:
        base = re.sub(r'-?\d+$', '', base)  # strip any existing number
        return f"{base}-{n}"
    return base


def display_craft(category: str, specific: str) -> str:
    """Format craft for display: 'Kayak-1 (HPK)' or 'Kayak-1' if redundant."""
    if category == "Unknown":
        return ""
    if not specific or specific.lower() == category.lower():
        return category
    return f"{category} ({specific})"


def audit_crafts(results: list[dict]) -> list[str]:
    """Return list of warning strings for Unknown or ambiguous craft values."""
    warnings = []
    seen = set()
    for r in results:
        raw = r.get("craft_specific", r.get("craft_category", ""))
        if raw and raw not in seen:
            seen.add(raw)
            # Count how many patterns match
            cleaned = _strip_prefixes(raw)
            if _NON_CRAFT.match(cleaned):
                continue  # expected Unknown
            matches = [cat for pat, cat in _CATEGORY_PATTERNS if pat.search(cleaned)]
            if len(matches) == 0:
                warnings.append(f"NO MATCH: '{raw}'")
            elif len(matches) > 1:
                warnings.append(f"MULTI-MATCH ({len(matches)}): '{raw}' → {matches}")
    return warnings
