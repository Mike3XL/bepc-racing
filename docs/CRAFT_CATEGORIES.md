# Craft Category Scheme

## Three-Level Naming

| Level | Field | Description | Example |
|---|---|---|---|
| **Raw** | source data | Whatever came off the score sheet | `surfski 2x`, `HPK Double`, `K1` |
| **Craft** | `craft_specific` | Normalized short form | `Surfski-2`, `HPK-2`, `K1` |
| **Display** | `display_craft_ui()` | Standard UX label | `K-2`, `K-2`, `K-1 (sprint)` |

**UX rule:** Cell shows Display. Tooltip shows Craft (specific).

---

## Full Mapping Table

| Raw (examples) | Craft (specific) | Category | Display |
|---|---|---|---|
| `Surfski`, `SS` | `Surfski` | `Kayak-1` | `K-1` |
| `Surfski 2x`, `Surfski Double` | `Surfski-2` | `Kayak-2` | `K-2` |
| `HPK`, `HPK1` | `HPK` | `Kayak-1` | `K-1` |
| `HPK-2`, `HPK Double` | `HPK-2` | `Kayak-2` | `K-2` |
| `FSK` | `FSK` | `Kayak-1` | `K-1` |
| `FSK-2` | `FSK-2` | `Kayak-2` | `K-2` |
| `SK` | `SK` | `Kayak-1` | `K-1` |
| `SK-2` | `SK-2` | `Kayak-2` | `K-2` |
| `K1`, `K-1` | `K1` | `Sprint-K1` | `K-1 (sprint)` |
| `K2`, `K-2` | `K2` | `Sprint-K2` | `K-2 (sprint)` |
| `K4`, `K-4` | `K4` | `Sprint-K4` | `K-4 (sprint)` |
| `Kayak`, `PK`, `Spec` | `Kayak`/`PK`/`Spec` | `Kayak-1` | `K-1` |
| `1x`, `Rowboat`, `Wherry`, `Gig` | `1x`/`Rowboat`/etc | `OW-1` | `OW` |
| `2x`, `2x-OW` | `2x` | `OW-2` | `OW-2` |
| `4x`, `4x+` | `4x` | `OW-4` | `OW-4` |
| `8x+`, `8+` | `8x+` | `OW-8` | `OW-8` |
| `OC-1`, `OC1`, `OC` | `OC-1` | `OC-1` | `OC-1` |
| `OC-2` | `OC-2` | `OC-2` | `OC-2` |
| `OC-6` | `OC-6` | `OC-6` | `OC-6` |
| `V-1`, `V1`, `V` | `V-1` | `Va'a-1` | `V-1` |
| `V-2` | `V-2` | `Va'a-2` | `V-2` |
| `V-6`, `V-12` | `V-6`/`V-12` | `Va'a-6` | `V-6` |
| `SUP` | `SUP` | `SUP-1` | `SUP` |
| `SUP-UL`, `Unlimited` | `SUP-UL` | `SUP-Unlimited` | `SUP-Unlimited` |
| `Prone` | `Prone` | `Prone-1` | `Prone` |
| `C-1`, `C1`, `Canoe` | `C-1` | `Canoe-1` | `C-1` |
| `C-2` | `C-2` | `Canoe-2` | `C-2` |
| `C-3` | `C-3` | `Canoe-3` | `C-3` |

### OC vs Va'a
OC (outrigger canoe, steered) and Va'a (rudderless outrigger) are separate families with separate handicap tracks. Racers rarely switch between them.

### Sprint Kayak
K1/K2/K4 (sprint/flatwater kayak) are a separate family from sea/surf kayaks. They share the `K-N` display format but are distinguished by the `(sprint)` suffix and tracked separately for handicaps.

---

## Display Rules

| Category family | Display rule | Examples |
|---|---|---|
| `Kayak-N` | `K-N` | `K-1`, `K-2`, `K-4` |
| `Sprint-KN` | `K-N (sprint)` | `K-1 (sprint)`, `K-2 (sprint)` |
| `OW-1` | `OW` | — |
| `OW-N` (N>1) | `OW-N` | `OW-2`, `OW-4`, `OW-8` |
| `OC-N` | `OC-N` | `OC-1`, `OC-6` |
| `Va'a-N` | `V-N` | `V-1`, `V-6` |
| `Canoe-N` | `C-N` | `C-1`, `C-2` |
| `SUP-1` | `SUP` | — |
| `SUP-Unlimited` | `SUP-Unlimited` | — |
| `Prone-1` | `Prone` | — |
| `Unknown` | *(hidden)* | Division labels, unrecognized strings |

---

## Implementation

- **Python:** `display_craft_ui(category)` in `bepc/craft.py`
- **JavaScript:** `display_craft_ui(cat)` + `craft_cell(cat, specific)` in generated HTML
- **Normalization:** `normalize_craft(raw)` → `(category, specific)` in `bepc/craft.py`
- **Audit:** `cli.py audit-crafts` — checks for Unknown and multi-match values

---

## Unknown Results

`Unknown` occurs when source data uses division labels instead of craft names.
**UX:** Suppress display. `craft_specific` retains the original string.

Known unresolvable: `Other`, `Double`, `Other - 5 person`, `Women`, `Kayaks 12 feet and under in length`
