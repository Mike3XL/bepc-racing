# BEPC Racing — Club System Design

**Status:** Draft  
**Date:** 2026-04-04

---

## Overview

The system tracks race results across multiple **clubs**. A club is a logical grouping of races with its own handicap system, standings, and racer pages. Clubs are not necessarily tied to a single real-world organization.

---

## Club Types

### Organization Club
A club that mirrors a real paddling organization's race series.

Examples: BEPC, Sound Rowers

- Races are primarily sourced from that organization's WebScorer organizer page
- Membership is implicit (anyone who races is in the club)
- Handicap carries over season-to-season within the club

### Community League (League for short)
A curated collection of races drawn from multiple organizers, defined by racer behavior rather than organizational membership.

Examples: PNW Small Boats Community League

- Races are hand-curated or rule-selected from multiple sources
- A racer "joins" the league simply by appearing in included races
- Handicap carry-over is essential (racers may only do 1–3 events/year)
- No formal organizing body — community-curated

**Terminology:**
- **Community League** — primary full name (e.g. "PNW Small Boats Community League")
- **League** — short form in UI, labels, config
- "Virtual club" and "Series" reserved for explanatory copy only

---

## Club Specification

Each club is defined by a configuration block with the following fields:

### Identity
```
id:           string          # e.g. "bepc", "pnw-regional"
name:         string          # Display name
type:         org | league   # Club type
```

### Race Inclusion Rules
```
include_organizers:  [organizer_id, ...]   # All races from these WebScorer organizers
include_urls:        [url, ...]            # Specific race result URLs to always include
exclude_urls:        [url, ...]            # Specific races to exclude (overrides include rules)
include_patterns:    [regex, ...]          # Match race names/IDs (for Jericho etc.)
exclude_patterns:    [regex, ...]          # Exclude matching races
```

Races can appear in multiple clubs. Inclusion is evaluated per-club independently.

### Handicap Settings
```
establishment_races:  int     # Races before handicap is "established" (default: 2)
                              # During establishment: racer is "EST", ineligible for hcap awards
update_faster:        float   # Weight toward new result when faster than par (default: 0.30)
update_slower:        float   # Weight toward new result when slower than par (default: 0.15)
carry_over:           bool    # Carry handicap from previous season (default: true)
carry_over_seasons:   int     # How many seasons back to carry (default: all)
```

### Season / Year Picker
```
season_mode:   annual | rolling_N | all_time
               # annual    = standard year-by-year (default)
               # rolling_N = last N calendar years combined
               # all_time  = single combined view across all years
show_all_time: bool    # Whether to offer "All Time" option in year picker
```

### Display
```
min_races_for_page:  int     # Min appearances to generate a racer page (default: 1)
craft_scope:         [str]   # Craft categories included (default: all)
                             # e.g. ["Kayak-1", "Kayak-2", "OC-1", "SUP-1"]
```

---

## Race Inclusion Logic (per club, per race)

```
included = False

if race.organizer_id in include_organizers:
    included = True
if race.url in include_urls:
    included = True
if any(pattern matches race.name or race.url) for pattern in include_patterns:
    included = True

if race.url in exclude_urls:
    included = False
if any(pattern matches race.name or race.url) for pattern in exclude_patterns:
    included = False
```

---

## Club Page

Each club gets a dedicated page (`/club/<id>.html`) with:

### General Information
```
name:               string    # Display name
type:               org | virtual
homepage_url:       string    # Link to the organization's website (if org club)
description:        string    # 1-3 sentence description of the club/circuit
```

### Contacts
```
contacts:
  - role:   string            # e.g. "Organization", "Handicap System"
    name:   string
    email:  string (optional)
    url:    string (optional)  # e.g. link to org contact page
```

Contact roles:
- **Organization** — the real-world club/org contact (president, race director, etc.)
- **Handicap System** — person responsible for managing settings on this website
  - Currently: Mike Liddell for all clubs
  - Will be delegated per-club over time

### Displayed on Club Page
- General info and description
- Contact table (role, name, link)
- Configuration summary (establishment races, carry-over, craft scope, etc.)
- Statistics: total races, total racers, seasons covered, most active racer
- Link to Results, Standings, Trajectories for this club

---

## Site Architecture & Branding

### Multi-Club Site Model

The system hosts multiple clubs under a single platform, but each club gets an individualized experience:

- **Club URL** — each club has its own URL (e.g. `bepc.paddlehandicap.com` or `paddlehandicap.com/bepc`)
- **Club branding** — when in a club view, the navbar, title, and colours reflect that club, not the platform
- **Cross-club links** — racer pages link out to the racer's results across all clubs they've raced in
- **Platform identity** — a subtle "powered by [platform name]" or platform nav link connects clubs to the broader system

### Platform Naming

The platform needs a name that:
- Works for any paddling club or league, not just BEPC
- Implies handicap racing / performance tracking
- Is memorable and URL-friendly
- Doesn't imply a specific geography or craft type

**Decision: `paddleclub.com`** — primary platform name.  
**Second choice: `paddleleague.com`**

**Available domains (checked 2026-04-04):**

| Domain | Status |
|--------|--------|
| `paddleclub.com` | ✅ Available — **primary choice** |
| `paddleclub.io` | ✅ Available |
| `paddleclub.net` | ✅ Available |
| `paddleleague.com` | ✅ Available — second choice |
| `paddleleague.io` | ✅ Available |
| `paddlehandicap.com` | ✅ Available — most descriptive fallback |
| `paddleclub.app` | ❌ Taken |
| `paddleclub.org` | ❌ Taken |

**Open:** Domain not yet registered. Mike to purchase when ready.

### URL Structure (proposed)

```
paddlehandicap.com/              # Platform home — list of clubs
paddlehandicap.com/bepc/         # BEPC club view
paddlehandicap.com/pnw/          # PNW Community League view
paddlehandicap.com/racer/mike-liddell/  # Cross-club racer page
```

Or subdomain model:
```
bepc.paddlehandicap.com          # BEPC club view
pnw.paddlehandicap.com           # PNW Community League
```

---

### BEPC
```yaml
id: bepc
name: Ballard Elks Paddle Club
type: org
include_organizers: [bepc_webscore_organizer_id]
exclude_urls: []          # add silly races here
establishment_races: 2
carry_over: true
season_mode: annual
show_all_time: false
min_races_for_page: 1
```

### Sound Rowers
```yaml
id: sound-rowers
name: Sound Rowers
type: org
include_organizers: [sound_rowers_jericho_organizer]
establishment_races: 2
carry_over: true
season_mode: annual
show_all_time: false
min_races_for_page: 1
```

### PNW Regional Small Boats
```yaml
id: pnw-regional
name: PNW Regional Small Boats
type: circuit
include_organizers: []
include_urls: [...]        # hand-curated list
include_patterns:
  - "PNWORCA Winter Series"
  - "Peter Marcus"
  - "Gorge Downwind"
  - "Keats Chop"
  - "Board the Fjord"
  - "Salmon Row"
  # etc.
exclude_patterns:
  - "OC6"                  # team boats excluded
  - "Dragon Boat"
establishment_races: 1     # only 1 race needed (racers do few events/year)
carry_over: true
carry_over_seasons: all
season_mode: annual
show_all_time: true        # "All Time" view important for circuit
min_races_for_page: 3
craft_scope: [Kayak-1, Kayak-2, OC-1, OC-2, SUP-1, V1, FSK-1]
```

---

## Open Questions

1. **Club type naming** — "Community League" is the primary full name, "League" for short. "Virtual club" and "Series" reserved for explanatory copy only.
2. **Craft scope enforcement** — should non-scoped craft be silently excluded or shown with a note?
3. **Rolling N seasons** — is this needed now or future?
4. **Multi-club racer pages** — currently racer pages show all clubs. Should there be a "primary club" concept for the racer page header?
5. **Exclusion granularity** — exclude by URL, or also by race name pattern?

---

## Implementation Status

| Feature | Status |
|---------|--------|
| Multiple clubs in data model | ✅ Done |
| Per-club `current_club` rendering | ✅ Done |
| `establishment_races` configurable | ❌ Hardcoded at 2 |
| `carry_over` | ❌ Not implemented |
| `include_organizers` rules | ❌ Manual fetch only |
| `exclude_urls` | ❌ Not implemented |
| `show_all_time` year picker | ❌ Not implemented |
| `craft_scope` filtering | ❌ Not implemented |
| Club page (`/club/<id>.html`) | ❌ Not implemented |
