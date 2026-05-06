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
# Tokens (replaced at render time):
#   {gold_cup}   — small gold cup SVG (indexed awards)
#   {gold_flag}  — small gold flag SVG (finish awards)
#
# The order here is DISPLAY order on the race results page.
# ---------------------------------------------------------------------------
RESULTS_COLUMNS = {
    "trophies":       ("Trophies",        "Trophies", None),
    "place":          ("Place",           "Place",    "Finish line order"),
    "racer":          ("Racer",           "Racer",    "Athlete name"),
    "craft":          ("Craft",           "Craft",    "Craft category\n(sub-category)"),
    "vs_projected":   ("{gold_cup} vs Par", "vs Par",  "Improvement vs personal par\n(+ve is best)"),
    "finish_time":    ("{gold_flag} Time",  "Finish",   "Finish time"),
    "projected_time": ("Par",  "Par",     "Personal par time\n(RacePar * Index)"),
    "race_index":     ("Index",      "Index",    "Racer Speed Index"),
    "new_index":      ("New Index",       "New",      "Index for next race"),
    "par_estimate":   ("RacePar vote",    "ParVote",  "Vote for RacePar\n(Finish ÷ Index)"),
    "finish_points":  ("Finish Points",   "Pts",      "Points, by time"),
    "indexed_points": ("Par Points",  "Par Pts",  "Points, by par result)"),
}

# Column CSS style overrides keyed the same as RESULTS_COLUMNS
RESULTS_COLUMN_STYLES = {
    "vs_projected":   "text-align:center;min-width:95px",
    "finish_time":    "text-align:center;min-width:75px",
}


# ---------------------------------------------------------------------------
# Trophies — CSS class, icon key (in _ICONS), tooltip text
#
# When adding a trophy: add here, add icon SVG to generator._ICONS, add to
# TROPHY_ORDER below for badge sort order.
# ---------------------------------------------------------------------------
TROPHIES = {
    "hcap_1":       {"css": "hcap-gold",    "icon": "hcap_1",     "tooltip": "1st Place (vs Par)"},
    "hcap_2":       {"css": "hcap-silver",  "icon": "hcap_2",     "tooltip": "2nd Place (vs Par)"},
    "hcap_3":       {"css": "hcap-bronze",  "icon": "hcap_3",     "tooltip": "3rd Place (vs Par)"},
    "finish_1":     {"css": "plain-medal",  "icon": "finish_1",   "tooltip": "1st Place (Finish time)"},
    "finish_2":     {"css": "plain-medal",  "icon": "finish_2",   "tooltip": "2nd Place (Finish time)"},
    "finish_3":     {"css": "plain-medal",  "icon": "finish_3",   "tooltip": "3rd Place (Finish time)"},
    "consistent_1": {"css": "hcap-consist", "icon": "consistent", "tooltip": "Consistent racer"},
    "consistent_2": {"css": "hcap-consist", "icon": "consistent", "tooltip": "Consistent racer"},
    "consistent_3": {"css": "hcap-consist", "icon": "consistent", "tooltip": "Consistent racer"},
    "par":          {"css": "hcap-par",     "icon": "par",        "tooltip": "Chosen to define RacePar"},
    "fresh":        {"css": "hcap-est",     "icon": "est",        "tooltip": "Establishing index — not included in ranking"},
    "outlier":      {"css": "hcap-outlier", "icon": "outlier",    "tooltip": "Outlier result — >10% off prediction, index unchanged"},
    "auto_reset":   {"css": "hcap-reset",   "icon": "auto_reset", "tooltip": "Index auto-reset after 3 consecutive outliers"},
}

# Badge display sort order (streak_N always renders after these, sorted by N)
TROPHY_ORDER = [
    "hcap_1", "hcap_2", "hcap_3",
    "finish_1", "finish_2", "finish_3",
    "consistent_1", "consistent_2", "consistent_3",
    "par", "auto_reset", "fresh", "outlier",
]


# Streak trophy (streak_N) — N is variable (streak_3, streak_4, ...).
# Not in TROPHIES because of the variable suffix. The Python and JS renderers
# generate the SVG with the number substituted. Editable metadata:
STREAK_TROPHY = {
    "css": "hcap-streak",
    "tooltip": "{n} consecutive races faster than projected",  # {n} is replaced at render time
}


# ---------------------------------------------------------------------------
# Tooltip text for muted "Place (Indexed)" cells (fresh / outlier / etc.)
# Keyed by the reason code (see _fmt_indexed_place).
# ---------------------------------------------------------------------------
PLACE_MUTE_REASONS = {
    "fresh":      "Establishing index - excluded from ranking",
    "outlier":    "Outlier result - excluded from ranking",
    "auto_reset": "Auto-reset applied - excluded from ranking",
    "ineligible": "Race has insufficient number of racers - no ranking or index updates",
}


# ---------------------------------------------------------------------------
# Race results table — miscellaneous tooltips and filter labels
# ---------------------------------------------------------------------------
RESULTS_TOOLTIPS = {
    # "New" index column "^" superscript when outlier freezes the index.
    "new_outlier_frozen": "Outlier result — >10% off prediction, index unchanged",
    # Highlighted par time in the RacePar Estimate column — the time selected
    # as the official par for the whole race.
    "race_par":           "RacePar. Defines par for an Index=1.0 racer",
    # vs Par column — template applied per row. Placeholders:
    #   {time}      — racer's finish time (e.g. "33:06")
    #   {pct}       — absolute percentage (e.g. "4.0")
    #   {direction} — "faster" or "slower" (from vs_par_faster/vs_par_slower)
    #   {projected} — racer's projected time (e.g. "31:47")
    "vs_par_row":         "{time} is {pct}% {direction} than projected {projected}",
    "vs_par_faster":      "faster",
    "vs_par_slower":      "slower",
}

# Racer filter dropdown (shown above each per-course result table)
RESULTS_FILTER = {
    "aria_label":  "Filter racers",
    "options": [
        # (value, label)
        ("all",         "All racers"),
        ("established", "Established only"),
    ],
}


# ---------------------------------------------------------------------------
# Racer page — stat block labels (above the season/craft table)
# ---------------------------------------------------------------------------
RACER_STATS_LABELS = {
    "races":      "Races",
    "finish_pts": "Finish Pts",
    "corr_pts":   "Corr Pts",
    "hcap":       "Hcap",
}


# ---------------------------------------------------------------------------
# Common dropdown placeholders (for series/organizer/club selectors)
# ---------------------------------------------------------------------------
SELECTOR_PLACEHOLDERS = {
    "all_series":     "All series",
    "all_organizers": "All organizers",
}


# ---------------------------------------------------------------------------
# Global search box
# ---------------------------------------------------------------------------
SEARCH = {
    "placeholder": "Search…",
}


# ---------------------------------------------------------------------------
# Home page / index — section headings, buttons, podium labels
# ---------------------------------------------------------------------------
HOME_PAGE = {
    # Section headings
    "results_heading":   "Results",
    "upcoming_heading":  "Upcoming",           # home page selector-bar heading
    "upcoming_heading_races_list": "Upcoming Races",  # races-list page heading
    # "Show more/less" toggle on long lists (upcoming, feed)
    "show_more_label":   "Show more ▼",
    "show_less_label":   "Show less ▲",
    # Podium time-row labels (Recent Results card, Home podium)
    "podium_actual":     "Finish Time:",
    "podium_projected":  "Personal Par:",
    # Pill toggles between the two podium views
    "pill_vs_projected": "Improvement vs Par",
    "pill_finish_time":  "Finish Time",
}


# ---------------------------------------------------------------------------
# Standings page — filter buttons
# ---------------------------------------------------------------------------
STANDINGS_PAGE = {
    "heading":             "Standings",
    "filter_aria_label":   "Filter",
    "filter_established":  "Established",
    "filter_all":          "All",
    "sort_hint":           "Click column headers to sort. Shift+click for multi-column.",
}
