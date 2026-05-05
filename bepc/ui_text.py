"""User-facing text and UI config.

All column labels, tooltip text, trophy metadata, and CSS class names live
here so they can be edited in one place without touching code.

Consumers:
- bepc/generator.py — Python-side HTML generation for racer pages, etc.
- bepc/generator.py — JS snippets emitted inline (TROPHIES is serialized to
  JS so the client-side badges() function stays in sync).

Editing workflow:
- Change a string here and run `cli.py build-site pnw` to see it propagate.
- Header changes affect both desktop (long) and mobile (short) variants —
  tooltip is optional (set None if not needed).
"""

# ---------------------------------------------------------------------------
# Race results page — column headers
#
# Format: "key": (long_html, short_text, tooltip_or_none)
#
# long_html may contain <br> for a two-line desktop form.
# short_text is the mobile / narrow-viewport label (< 992px).
# tooltip shows on hover when set.
#
# The order here is DISPLAY order on the race results page.
# ---------------------------------------------------------------------------
RESULTS_COLUMNS = {
    "trophies":       ("Trophies",        "Trophies", None),
    "place":          ("Place",           "Place",    None),
    "racer":          ("Racer",           "Racer",    None),
    "craft":          ("Craft",           "Craft",    None),
    "vs_projected":   ("vs<br>Projected", "vs Proj",  None),   # icon + 2-line long form injected separately
    "finish_time":    ("Finish<br>Time",  "Finish",   None),   # icon + 2-line long form injected separately
    "projected_time": ("Projected Time",  "Proj",     "Projected Time"),
    "race_index":     ("Race Index",      "Index",    "Race Index (index entering this race)"),
    "new_index":      ("New Index",       "New",      "New Index (index after this race)"),
    "par_estimate":   ("Par Estimate",    "Par",      None),
    "finish_points":  ("Finish Points",   "Pts",      "Finish Points (by crossing order)"),
    "indexed_points": ("Indexed Points",  "Idx Pts",  "Indexed Points (by indexed time order)"),
}


# ---------------------------------------------------------------------------
# Trophies — CSS class, icon key (in _ICONS), tooltip text
#
# When adding a trophy: add here, add icon SVG to generator._ICONS, add to
# TROPHY_ORDER below for badge sort order.
# ---------------------------------------------------------------------------
TROPHIES = {
    "hcap_1":       {"css": "hcap-gold",    "icon": "hcap_1",     "tooltip": "1st Place (Corrected time)"},
    "hcap_2":       {"css": "hcap-silver",  "icon": "hcap_2",     "tooltip": "2nd Place (Corrected time)"},
    "hcap_3":       {"css": "hcap-bronze",  "icon": "hcap_3",     "tooltip": "3rd Place (Corrected time)"},
    "finish_1":     {"css": "plain-medal",  "icon": "finish_1",   "tooltip": "1st Place (Finish time)"},
    "finish_2":     {"css": "plain-medal",  "icon": "finish_2",   "tooltip": "2nd Place (Finish time)"},
    "finish_3":     {"css": "plain-medal",  "icon": "finish_3",   "tooltip": "3rd Place (Finish time)"},
    "consistent_1": {"css": "hcap-consist", "icon": "consistent", "tooltip": "Consistent performer (±1% of expectation)"},
    "consistent_2": {"css": "hcap-consist", "icon": "consistent", "tooltip": "Consistent performer (±1% of expectation)"},
    "consistent_3": {"css": "hcap-consist", "icon": "consistent", "tooltip": "Consistent performer (±1% of expectation)"},
    "par":          {"css": "hcap-par",     "icon": "par",        "tooltip": "Par racer"},
    "fresh":        {"css": "hcap-est",     "icon": "est",        "tooltip": "Establishing index — not yet eligible for indexed time awards"},
    "outlier":      {"css": "hcap-outlier", "icon": "outlier",    "tooltip": "Outlier result — >10% off prediction, index unchanged"},
    "auto_reset":   {"css": "hcap-reset",   "icon": "auto_reset", "tooltip": "Index auto-reset after 3 consecutive outliers — hard-reset to mean of those races"},
}

# Badge display sort order (streak_N always renders after these, sorted by N)
TROPHY_ORDER = [
    "hcap_1", "hcap_2", "hcap_3",
    "finish_1", "finish_2", "finish_3",
    "consistent_1", "consistent_2", "consistent_3",
    "par", "auto_reset", "fresh", "outlier",
]


# ---------------------------------------------------------------------------
# Tooltip text for muted "Place (Indexed)" cells (fresh / outlier / etc.)
# Keyed by the reason code (see _fmt_indexed_place).
# ---------------------------------------------------------------------------
PLACE_MUTE_REASONS = {
    "fresh":      "Fresh — still establishing index, not ranked for handicap awards",
    "outlier":    "Outlier — result suppressed, not ranked for handicap awards",
    "auto_reset": "Auto-reset race — corrective, not ranked for handicap awards",
    "ineligible": "Race not ranked for handicap awards (small group / ineligible course)",
    "default":    "Not ranked for handicap awards",
}
