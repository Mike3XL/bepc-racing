# Craft Category Scheme

Every racer result has two craft fields:

- **`craft_category`** — normalized category used for scoring, handicap tracking, and display
- **`craft_specific`** — short label derived from the source data (e.g. "HPK", "SS", "OC-1")

Display format: `"Kayak-1 (HPK)"` — category + specific in parens. If specific equals category, show category only.

The handicap key is `(canonical_name, craft_category)` — so HPK and Surfski at different events share one handicap track (both Kayak-1).

---

## Categories and Specific Forms

| Category | Specific forms seen in data |
|---|---|
| Kayak-1 | HPK, HPK1, FSK, SK, SS, K1, Kayak, PK, Spec |
| Kayak-2 | HPK-2, FSK-2, SK-2, K2, Kayak-2, DK-2 |
| Kayak-4 | K4 |
| OW-1 | 1x, 1x-Flatwater, 1x-OWI, 1x-OWII, 1x-OWIII, Row, Rowboat, Wherry, Gig |
| OW-2 | 2x, 2x-Flatwater, 2x-OW, Rowboat-2 |
| OW-4 | 4x, 4x+, 4x-OW, 4x+-OW, 4+ |
| OW-8 | 8x+, 8+ |
| Outrigger-1 | OC-1, OC1, OC, V-1, V1, V, Canoe |
| Outrigger-2 | OC-2, OC2 |
| Outrigger-3 | (no data yet) |
| Outrigger-6 | OC-6, OC6 |
| SUP-1 | SUP |
| SUP-Unlimited | SUP-UL, Unlimited |
| Prone-1 | Prone |
| Canoe-1 | C1, Canoe |
| Canoe-2 | C-2 |
| Canoe-3 | C-3 |
| Other | Pedal, Pedal-boat, PedalBoat, Dragon, Rowing |
| Unknown | Division labels (Men, Women, Masters 40+, etc.) — not craft names |

---

## Unknown Results

`Unknown` occurs when source data uses age/gender/division labels instead of craft names. This is common in distance-based events (some Jericho-format results).

**UX:** Do not display "Unknown" to users. Suppress craft display. The `craft_specific` field retains the original source string.

Known unresolvable values: `Other`, `Double`, `Other - 5 person`, `Women`, `Kayaks 12 feet and under in length`

---

## Normalization

Craft normalization is implemented in `bepc/craft.py` — a table of regex patterns matched from the start of the cleaned craft string.
