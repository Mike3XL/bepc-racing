"""
Craft category normalization.

See docs/CRAFT_CATEGORIES.md for the full scheme and data quality process.
"""
import re

# Map from normalized specific → category
# Order matters: more specific patterns first
_CATEGORY_MAP = {
    # Kayak-1
    "Kayak-1": [
        "HPK", "HPK1", "HPK-1", "FSK", "FSK-1", "SK", "Kayak", "Surfski",
        "K1", "K-1", "PK", "Spec", "HPDK", "DK",
        "Kayaks 12 feet and under in length",
    ],
    "Kayak-2": [
        "HPK-2", "HPK2", "FSK-2", "SK-2", "K2", "K-2",
    ],
    "Kayak-4": ["K4", "K-4"],

    # Open-water rowing shells
    "OW-1": ["1x", "1x-OWII", "1x-OWIII", "1x-OW", "1x-owii", "1x-owiii",
             "Row", "Wherry", "Gig",
             "Rowboat - Sliding Seat 1x (SS 1x)"],
    "OW-2": ["2x", "2x-OW", "Rowboat - Sliding Seat 2x (SS 2x)"],
    "OW-4": ["4x", "4+"],
    "OW-8": ["8x+", "8+"],

    # Canoe
    "Canoe-1": ["C1", "Canoe"],
    "Canoe-2": ["C2"],
    "Canoe-3": ["C3"],

    # Outrigger
    "Outrigger-1": ["OC1", "OC-1", "OC", "V1", "V-1"],
    "Outrigger-2": ["OC2", "OC-2", "V2", "V-2"],
    "Outrigger-3": ["OC3", "OC-3"],
    "Outrigger-6": ["OC6", "OC-6", "V6", "V-6", "V12"],

    # SUP
    "SUP-1": ["SUP", "Standup", "Stand-up", "Stand Up"],
    "SUP-Unlimited": ["Unlimited"],

    # Prone
    "Prone-1": ["Prone"],

    # Other
    "Other": ["Pedal", "Pedal-boat", "Dragon Boat", "Dragon"],
}

# Build reverse lookup (case-insensitive)
_SPECIFIC_TO_CATEGORY: dict[str, str] = {}
for cat, specifics in _CATEGORY_MAP.items():
    for s in specifics:
        _SPECIFIC_TO_CATEGORY[s.lower()] = cat

# Prefix patterns for verbose strings like "HPK1-M Master 40+", "OC1-M Open"
_PREFIX_PATTERNS = [
    (re.compile(r'^(surfski)', re.I), "Kayak-1"),
    (re.compile(r'^(hpk|fsk|sk)\b', re.I), "Kayak-1"),
    (re.compile(r'^(hpk|fsk|sk)-?2\b', re.I), "Kayak-2"),
    (re.compile(r'^k-?1\b', re.I), "Kayak-1"),
    (re.compile(r'^k-?2\b', re.I), "Kayak-2"),
    (re.compile(r'^k-?4\b', re.I), "Kayak-4"),
    (re.compile(r'^1x', re.I), "OW-1"),
    (re.compile(r'^2x', re.I), "OW-2"),
    (re.compile(r'^4x', re.I), "OW-4"),
    (re.compile(r'^oc-?1\b', re.I), "Outrigger-1"),
    (re.compile(r'^oc-?2\b', re.I), "Outrigger-2"),
    (re.compile(r'^oc-?3\b', re.I), "Outrigger-3"),
    (re.compile(r'^oc-?6\b', re.I), "Outrigger-6"),
    (re.compile(r'^oc\b', re.I), "Outrigger-1"),  # bare "OC" → OC1
    (re.compile(r'^c-?1\b', re.I), "Canoe-1"),
    (re.compile(r'^c-?2\b', re.I), "Canoe-2"),
    (re.compile(r'^rowing.*1x', re.I), "OW-1"),
    (re.compile(r'^rowing.*2x', re.I), "OW-2"),
    (re.compile(r'^rowing.*4', re.I), "OW-4"),
    (re.compile(r'^rowing.*eight|^rowing.*oct|^rowing.*8', re.I), "OW-8"),
    (re.compile(r'^rowboat.*1x', re.I), "OW-1"),
    (re.compile(r'^rowboat.*2x', re.I), "OW-2"),
    (re.compile(r'^canoe.*oc-?1', re.I), "Outrigger-1"),
    (re.compile(r'^canoe.*outrigger.*single', re.I), "Outrigger-1"),
    (re.compile(r'^v-?1\b', re.I), "Outrigger-1"),
    (re.compile(r'^v-?2\b', re.I), "Outrigger-2"),
    (re.compile(r'^v-?6\b', re.I), "Outrigger-6"),
    (re.compile(r'^v-?12\b', re.I), "Outrigger-6"),
    (re.compile(r'^sup\b', re.I), "SUP-1"),
    (re.compile(r'^prone\b', re.I), "Prone-1"),
    (re.compile(r'^pedal', re.I), "Other"),
    (re.compile(r'^kayak', re.I), "Kayak-1"),
]

# Values that are NOT craft — age/gender/division labels
_NON_CRAFT = {
    "men", "women", "mixed", "open", "master", "masters", "junior", "seniors",
    "senior", "novice", "elite", "recreational", "rec", "competitive",
    "unlimited",  # handled separately above, but catch-all here
}


def normalize_craft(raw: str) -> tuple[str, str]:
    """
    Normalize a raw craft string to (category, specific).

    Returns:
        category: e.g. "Kayak-1", "Outrigger-1", "Unknown"
        specific: cleaned short form, e.g. "HPK", "OC1"
    """
    raw = raw.strip()
    if not raw:
        return "Unknown", ""

    # Handle "Gender Craft" format: "Men HPK", "Women OC1", "Mixed SUP"
    gender_prefix = re.match(r'^(Men|Women|Mixed|Male|Female)\s+(.+)$', raw, re.I)
    if gender_prefix:
        raw = gender_prefix.group(2).strip()

    # Handle "Craft AgeGroup" format: "Junior SUP <18", "Any SUP Inflatable"
    # Strip leading qualifiers
    qualifier_prefix = re.match(r'^(Junior|Senior|Master|Open|Any|Novice|Elite|Rec)\s+(.+)$', raw, re.I)
    if qualifier_prefix:
        raw = qualifier_prefix.group(2).strip()

    # Extract the specific short form (prefix before space/dash/digit suffix)
    # e.g. "HPK1-M Master 40+" → "HPK", "OC1-M Open" → "OC1"
    specific = _extract_specific(raw)

    # Prefix pattern match on original raw string (before exact lookup)
    for pattern, cat in _PREFIX_PATTERNS:
        if pattern.match(raw):
            return cat, specific

    # Exact lookup on specific
    cat = _SPECIFIC_TO_CATEGORY.get(specific.lower())
    if cat:
        return cat, specific

    # Check if it's a non-craft label
    if specific.lower() in _NON_CRAFT or raw.lower() in _NON_CRAFT:
        return "Unknown", raw

    # Unrecognized — log warning and return Unknown
    return "Unknown", raw


def _extract_specific(raw: str) -> str:
    """Extract the short craft code from a verbose string."""
    # "HPK1-M Master 40+" → "HPK"  (letter prefix only)
    # "OC1-M Open" → "OC1"  (letters+digits prefix)
    # "1x-OWII" → "1x-OWII"  (keep as-is, it's already specific)
    # "Surfski Men Open" → "Surfski"
    # "SUP Men" → "SUP"

    # If it contains a dash followed by M/W/F/Mx (gender marker), strip from there
    m = re.match(r'^([A-Za-z0-9\-]+?)(?:-[MWFmwf](?:\s|$)|(?:\s+(?:Men|Women|Mixed|Open|Master|Senior|Junior|Novice|Elite|Rec)))', raw)
    if m:
        return m.group(1)

    # First word if space-separated
    first = raw.split()[0]
    return first


def display_craft(category: str, specific: str) -> str:
    """Format craft for display: 'Kayak-1 (HPK)' or 'Kayak-1' if same."""
    if category == "Unknown":
        return ""  # Don't show Unknown to users
    if not specific or specific.lower() == category.lower():
        return category
    # Abbreviate specific if it's just the category prefix
    return f"{category} ({specific})"


def audit_crafts(results: list[dict]) -> list[str]:
    """Return list of warning strings for unrecognized or Unknown craft values."""
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
