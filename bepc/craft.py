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
    # Kayak — most specific first
    (re.compile(r'surfski.*double|double.*kayak|hpk.?2|fsk.?2|sk.?2|k-?2\b', re.I), 'Kayak-2'),
    (re.compile(r'k-?4\b|k4\b', re.I), 'Kayak-4'),
    (re.compile(r'surfski|hpk|fsk\b|sk\b|k-?1\b|pk\b|kayak|hpdk\b|dk\b|^spec\b', re.I), 'Kayak-1'),

    # Open water rowing — larger before smaller
    (re.compile(r'8[x+]|eight|oct', re.I), 'OW-8'),
    (re.compile(r'4[x+]|quad', re.I), 'OW-4'),
    (re.compile(r'2x|double.*ow|ow.*double|rowboat.*2x|sliding.*2x', re.I), 'OW-2'),
    (re.compile(r'1x|single.*ow|ow.*single|rowboat.*1x|sliding.*1x|wherry|gig|row\b', re.I), 'OW-1'),

    # Outrigger — larger before smaller
    (re.compile(r'oc-?6|v-?6|v-?12', re.I), 'Outrigger-6'),
    (re.compile(r'oc-?3', re.I), 'Outrigger-3'),
    (re.compile(r'oc-?2|v-?2', re.I), 'Outrigger-2'),
    (re.compile(r'oc-?1\b|oc\b|v-?1\b', re.I), 'Outrigger-1'),

    # SUP — unlimited before standard
    (re.compile(r'unlimited', re.I), 'SUP-Unlimited'),
    (re.compile(r'sup\b|standup|stand.?up', re.I), 'SUP-1'),

    # Prone
    (re.compile(r'prone', re.I), 'Prone-1'),

    # Canoe — larger before smaller
    (re.compile(r'c-?3', re.I), 'Canoe-3'),
    (re.compile(r'c-?2', re.I), 'Canoe-2'),
    (re.compile(r'c-?1\b|canoe', re.I), 'Canoe-1'),

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
        specific: cleaned short form after prefix stripping
    """
    raw = raw.strip()
    if not raw:
        return "Unknown", ""

    cleaned = _strip_prefixes(raw)
    specific = cleaned.split()[0] if cleaned else raw  # first word as short form

    # Check if it's a pure division label
    if _NON_CRAFT.match(cleaned):
        return "Unknown", raw

    # Match against category patterns
    for pattern, category in _CATEGORY_PATTERNS:
        if pattern.search(cleaned):
            return category, specific

    return "Unknown", raw


def display_craft(category: str, specific: str) -> str:
    """Format craft for display: 'Kayak-1 (HPK)' or 'Kayak-1' if redundant."""
    if category == "Unknown":
        return ""
    if not specific or specific.lower() == category.lower():
        return category
    return f"{category} ({specific})"


def audit_crafts(results: list[dict]) -> list[str]:
    """Return list of warning strings for Unknown craft values."""
    warnings = []
    seen = set()
    for r in results:
        raw = r.get("craft_specific", r.get("craft_category", ""))
        if raw and raw not in seen:
            cat, _ = normalize_craft(raw)
            if cat == "Unknown":
                warnings.append(f"Unknown craft: '{raw}'")
            seen.add(raw)
    return warnings
