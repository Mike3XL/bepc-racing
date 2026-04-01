# Craft Category Scheme

## Overview

Every racer result has two craft fields:

- **`craft_category`** — the normalized category used for scoring, handicap tracking, and display. This is the canonical key.
- **`craft_specific`** — the original craft name from the source data (e.g. "HPK", "Surfski", "OC-1"). Displayed in parentheses alongside the category.

Display format: `"Kayak-1 (HPK)"` or just `"Kayak-1"` if specific == category.

The handicap key is `(canonical_name, craft_category)` — so a racer using HPK at one event and Surfski at another shares one handicap track (both are Kayak-1).

---

## Category Definitions

### Kayak-1
Single-person kayak (sprint, sea, surf ski, fast sea kayak).

Specific forms: HPK, HPK1, HPK-1, FSK, FSK-1, SK, Kayak, Surfski, K1, K-1

### Kayak-2
Double kayak.

Specific forms: HPK-2, HPK2, FSK-2, SK-2, K2, K-2

### Kayak-4
Four-person kayak.

Specific forms: K4, K-4

### OW-1
Single open-water rowing shell. Class designations (OWII = 19-21ft, OWIII = 21ft+) are sub-types within OW-1.

Specific forms: 1x, 1x-OWII, 1x-OWIII, 1x-OW

### OW-2
Double open-water rowing shell.

Specific forms: 2x, 2x-OW

### OW-4
Four-person rowing shell.

Specific forms: 4x

### Outrigger-1
Single outrigger canoe or va'a.

Specific forms: OC1, OC-1, V1, V-1

### Outrigger-2
Double outrigger.

Specific forms: OC2, OC-2, V2, V-2

### Outrigger-3
Three-person outrigger.

Specific forms: OC3, OC-3

### Outrigger-6
Six-person outrigger or va'a.

Specific forms: OC6, OC-6, V6, V-6, V12

### SUP-1
Stand-up paddleboard (standard).

Specific forms: SUP, Standup, Stand-up, Stand Up

### SUP-Unlimited
Stand-up paddleboard, unlimited class.

Specific forms: Unlimited

### Prone-1
Prone paddleboard.

Specific forms: Prone

### Other
Craft that don't fit the above categories.

Specific forms: Pedal, Pedal-boat

### Unknown
Craft category could not be determined from source data. This occurs when source data uses age/gender/division labels instead of craft names (e.g. distance-based events that list "Men Open" or "Masters 40+" as the division).

**UX note:** Do not display "Unknown" to users. Suppress craft display or show a neutral indicator. The `craft_specific` field retains the original source string for debugging.

**Future work:** Infer category from racer's history in the same club/season. If a racer consistently uses Kayak-1 in other events, apply that category to Unknown results.

---

## Data Quality Process

### When adding new race data

1. **Run the craft audit:** `python3 cli.py audit-crafts --club <club>` — lists all craft_specific values that map to Unknown or are unrecognized.
2. **Review Unknown results:** Check if the source data has craft info elsewhere (e.g. start list, race website).
3. **Update aliases or craft map** if new specific forms are found.
4. **Spot-check top finishers** — verify their craft category makes sense.

### Conformance check

Every `craft_specific` value should map to a known category. Unrecognized values are logged as warnings during `cli.py process`. Review warnings before publishing.

### Adding new specific forms

Edit `bepc/craft.py` — add to the appropriate category's `specifics` list. Document the source (which event/organizer uses this form).

---

## Known Issues

- **Distance-based events** (e.g. some Jericho-format results) use age/gender as the division field with no craft info. These produce `Unknown` results. Affected events: Fjord (Board the Fjord), some Jericho smallboat events.
- **Inference not yet implemented.** Unknown results do not benefit from racer history inference.
- **SUP-Unlimited assumption:** "Unlimited" is assumed to mean SUP-Unlimited. This may be incorrect for some events.
