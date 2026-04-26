# BEPC Racing — Series System Design

**Status:** Draft
**Date:** 2026-04-26
**Supersedes:** `CLUB_SYSTEM.md` (deprecated)

---

## Motivation

The previous design treated "clubs" as both organizers *and* analytical groupings. This conflated two distinct concerns:

1. **Who organized the race** (a fact about the event)
2. **What competitive field the race belongs to** (an analytical grouping used for standings, indexes, and bragging rights)

This led to problems:

- Races that spanned multiple clubs (e.g. Sound Rowers' La Conner race also in PNW Regional) were duplicated across club directories, with independent index computations and inconsistent eligibility verdicts for the same race.
- Index numbers were fragmented: a racer had a separate "Sound Rowers index" and "PNW index" built from overlapping data.
- Casual races and serious races were mixed in the same standings.

The new design separates these concerns cleanly.

---

## Core Concepts

### Series

A **series** is an analytical grouping of races at a consistent competitive level. A series has:

- Its own index numbers per racer
- Its own standings and racer pages
- Its own "serious" field of regular racers

**Each race belongs to exactly one series.**

**Initial series (fixed enum):**

| ID | Display name | Description |
|---|---|---|
| `bepc-summer` | BEPC Summer | Ballard Elks weekly Monday race series (summer) |
| `sckc-duck-island` | SCKC Duck Island | South Columbia Kayak Club Duck Island Friday series |
| `pnw` | PNW | Regional races — PNWORCA, Sound Rowers, La Conner, Rat Island, Paddlers Cup 10K, and similar |
| `none` | None | Unaffiliated / casual races (e.g. St Paddle's, one-off events) |

Series names can be added later. The set is deliberately small to avoid fragmentation.

### Organizer

The real-world organization that ran the event. This is a **fact about the race**, not an analytical grouping.

Examples: `bepc`, `sound-rowers`, `sckc`, `pnwo` (PNWORCA), `salmon-bay-paddle`, `pacific-paddle-events`.

Organizer is used for **filtering only** — it does not affect indexes or standings. Each race has exactly one organizer.

### Tags

Free-form labels attached to a race for filtering. Multiple tags per race allowed.

Examples: `usa-sup`, `downwind`, `sup-only`, `winter`, `championship`, `fun`.

Tags are purely for filtering. They do not affect indexes or standings.

### Index (per-racer, per-series)

A racer's index is a property of **(racer, series)**. A racer who competes in both BEPC Summer and PNW will have two independent indexes — one built from each series' races. This is intentional: a racer's competitive level relative to the BEPC Summer field is a different measurement than their level relative to the PNW field.

Indexes update **only from eligible races within the series**.

---

## Eligibility Rule

A course (a single distance within a race) is eligible when it meets the rule below. Eligibility determines two things:

1. Whether the course produces **indexed rankings** (the "handicap podium")
2. Whether finish times feed the **index update** for that series

"Established" = the racer has an existing index in *this series* (built from a prior eligible race in the same series).

| Course type | Eligibility rule |
|---|---|
| **Primary** | `>5 established racers` **OR** `>10 total starters` |
| **Secondary** | `>5 established racers` |

The total-starters rule for primary courses exists to **seed** a series when no racers have an established index yet. A well-attended primary race (e.g. a new series' opening day with 15 paddlers) can bootstrap the index even though nobody is established.

### Primary course

Each race has one or more **primary courses** — the main competitive fields. Typically a race has exactly one primary course. Rare cases have more than one (e.g. "primary SUP course" and "primary non-SUP course" — separate serious fields that don't race against each other on the same water).

Each course in a race carries an `is_primary: bool` flag. Courses are classified by:

1. **Auto-detect** (rule-based, based on course length and starter count) — proposes primary courses during processing.
2. **Operator override** — Mike confirms / adjusts the auto-detect output, including multi-primary cases.

Until a better auto-detect rule exists, multi-primary races are decided manually.

All courses not flagged `is_primary` are **secondary**.

### What eligibility does *not* mean

- Non-eligible courses still have their finish times recorded and shown (normal finish podium, full results tables).
- Non-eligible courses just don't produce an indexed podium and don't contribute to index updates.

---

## Filter UI

All views support four independent filters, combinable:

| Filter | Options |
|---|---|
| **Series** | BEPC Summer \| SCKC Duck Island \| PNW \| None \| All |
| **Organizer** | BEPC \| Sound Rowers \| SCKC \| PNWORCA \| ... \| All |
| **Race name** | free-text / slug match (e.g. `la-conner`, `paddlers-cup`) |
| **Tags** | multi-select from all tags present in data |

Default view shows **All** for each filter.

**Use cases:**

- A Sound Rowers paddler filters to `organizer=sound-rowers` to see only races their club ran (across all series).
- A serious regional racer filters to `series=pnw` to see only PNW-level races regardless of organizer.
- A SUP racer filters to `tags=sup-only` to see SUP events across everything.
- A racer tracking a recurring event filters to `race-name=la-conner` to see every La Conner race across years.

---

## Data Model Changes

### Race (new fields)

```yaml
series: bepc-summer        # one of the fixed enum
organizer: bepc            # organizer ID
tags: [usa-sup, winter]    # zero or more
```

### Course (new field)

Each course within a race carries:

```yaml
is_primary: true           # one or more courses per race may be primary
```

Most races have exactly one primary course. Multi-primary races (e.g. separate serious SUP and non-SUP fields) are permitted but currently set manually.

### Racer index (new shape)

Previously: `racer.index` (single value)

New: `racer.indexes: {bepc-summer: 1.07, pnw: 1.22}` — a map keyed by series ID. Missing key means no index in that series yet.

### Course eligibility (computed)

Computed at processing time, stored on each course record:

```yaml
eligible: true              # or false
eligibility_reason: "primary: 12 total starters"
```

---

## Site Structure

No more per-club directories. The site reorganizes around series and global views:

```
/                          Home — recent results across all series (with filters)
/races                     All races list (filterable)
/series/pnw                PNW series — standings, trajectories, racers
/series/bepc-summer        BEPC Summer series
/series/sckc-duck-island   SCKC Duck Island series
/series/none               (Optional — may just be "filter: None" on /races)
/organizers/sound-rowers   Sound Rowers organizer view — races they ran, filterable by series
/races/<race-slug>         Individual race results (all courses, full tables)
/racer/<racer-slug>        Racer page — stats per series (separate indexes)
/about                     Design + handicap explanation
```

---

## Migration Plan

Complete rebuild (no backward compatibility with old URLs).

1. **Design** — this doc + decision log entry (done first).
2. **Data model** — add `series`, `organizer`, `tags`, `primary_course` to `common.json` schema. Backfill existing data.
3. **Series assignment** — for every existing race, assign exactly one series. Record assignments in a config file for review.
4. **Eligibility + index** — rewrite the processor to compute per-series indexes using the new eligibility rule.
5. **Generator** — rewrite site generation around the new structure (series pages, filter UI).
6. **Validation** — compare before/after for a few sample racers and races to confirm indexes and standings make sense.
7. **Switch over** — publish the new site, retire the old `/clubs.yaml` club definitions.

---

## Open Questions

- **Auto-detect rule for `is_primary`:** Initial proposal — longest course with most starters is primary. What's the full rule set, and how confident can we be? Until the rule is stable, Mike confirms per race.
- **Multi-primary detection:** No auto-detect for multi-primary cases (e.g. separate SUP and non-SUP serious fields). Set manually. Need to revisit once we have more multi-primary examples.
- **Series inheritance for recurring events:** If La Conner 2024 was series=`pnw`, should La Conner 2025/2026 default to the same? Probably yes, via an event-template config.
- **Cross-series racer pages:** When viewing a racer, how do we display multiple series indexes? A table with one row per series, or separate tabs? Both show the same race history — only the index column changes.
- **Points/standings carry-over:** Are points per season or per series-within-season? Matches current behavior (per season), so no change expected.
- **Race-name filter UX:** Dropdown with all unique race slugs, or free-text search? Leaning free-text with autocomplete.
