Follow the architecture and conventions described in #[[file:SPEC.md]]

- Python 3.13 (Homebrew: /opt/homebrew/bin/python3.13)
- No external Python dependencies — stdlib only
- Ask before making assumptions; don't fabricate technical facts
- Mike is a BEPC member and surfski racer — this is his club's race analytics site
- Chicago 17th edition for any document citations

## CRITICAL: Before making any code change

1. **Analyze** — understand the root cause fully before touching anything
2. **Plan** — write out the specific changes needed
3. **Decide** — is this a design decision requiring discussion? Does Mike need to approve the approach?
4. **Only then implement** — after analysis, plan, and any needed go-decision

Never start editing code to "try something" — always analyze first.

**Whenever a racer name is mentioned** (in conversation, debugging, or analysis), ALWAYS:
1. Check `data/<club>/aliases.json` — the name Mike uses may not be the canonical name
2. Common patterns: Matt → Matthew, Eli → Elizabeth, typos (MAtthew), last-first format (Sun, Matthew)
3. Search for the canonical name in `site/data.json`, not the colloquial name
4. If a racer "has no page", first verify their canonical name before concluding the page is missing

Example: "Matt Sun" → canonical is "Matthew Sun" (page: matthew-sun.html)
Example: "Eli Holmes" → canonical is "Elizabeth Holmes" (page: elizabeth-holmes.html)

## Conventions

- Handicap result is the primary competition — always default to handicap view
- Consistency in naming matters: use exact trophy tooltip strings from SPEC.md
- HTML pages fetch JSON data files — no inline data blobs in HTML
- All dynamic DOM injection must be followed by Bootstrap tooltip initialization
- localStorage keys: bepc_season, bepc_result_tab, bepc_distance
- Fresh racers (first 3 races) are ineligible for handicap trophies and handicap points — established on 4th ranked race
- process → generate → publish is always manual, never automatic

## After pulling new race data

- Always run alias check: compare all canonical names against aliases.json for new variants
- Check for obvious duplicates: same person with different capitalisation, spelling, or abbreviation
- Verify racer counts per race look reasonable (not 0, not wildly different from similar races)
- Check pointsWeight is 1.0 for single-course races
- Run process and verify race/racer counts before generating

## Fetcher notes

- **AllRacers=True grouping** — Some organizers (e.g. Urban Surf / 60473) use `AllRacers=True` instead of `Overall=True` in WebScorer results. `_get_overall_groups()` in `fetcher.py` handles both.
- **Carry-over gap years** — `carry_over` dict is merged (not replaced) each season so racers who skip a season retain their handicap and ranked-race count. Fix in `cli.py` `build_data_json()`.

## Coding principles (learned from craft normalization work)

- **Simplicity first.** If a solution requires nested conditions, lookaheads, or ordering tricks to work correctly, step back and redesign. The craft.py rewrite (imperative → declarative table) cut 40% of code and eliminated most bugs.
- **Don't rely on ordering without verification.** If correctness depends on pattern order, the audit must verify it. Use `audit-crafts` after any change to craft.py.
- **Anchor patterns explicitly.** Use `re.match` (start-anchored) not `re.search` (anywhere). Substring matches cause silent bugs that are hard to find.
- **Encode constraints in the pattern, not the order.** `hpk(?!-?2)` is better than "put HPK-2 before HPK and hope". Negative lookaheads are acceptable when they express a real constraint; ordering tricks are not.
- **Test with the audit tool after every change.** `cli.py audit-crafts` shows unknowns and multi-matches. Zero multi-matches (or only ones that resolve correctly) is the target.
- **Separate concerns.** Strip prefixes first, then match. Don't mix stripping and matching in one regex.



When doing a general cleanup or review pass, cover all of:

1. UX consistency — titles, selectors, tab order, naming conventions
2. Inclusive language — gender values, terminology, tooltips
3. Code quality — unused imports, dead code, fragile patterns, type hints
4. **docs/ review** — ensure all docs describe *what the system is*, not *how to work on it*. Move any process/checklist content to `.kiro/steering/`. Update stale content (category lists, data counts, known issues).
5. SPEC.md — update architecture, data model, trophy system, UI conventions
6. docs/FUTURE_WORK.md — mark completed items, add new ideas
7. docs/CHANGES.md — summarise what changed in this session (create if missing)
8. .kiro/steering/project.md — update conventions if anything new was established

## Data Investigation Files

**CRITICAL: Always use the per-club data files for race result investigation, NOT `site/data.json`.**

The per-club files are the authoritative processed output served directly to the website via HTTP:

| File (local) | URL | Contains |
|---|---|---|
| `site/races-data-pnw.json` | https://pnw.paddlerace.org/races-data-pnw.json | Full processed race results for PNW |
| `site/races-data-bepc-summer.json` | https://pnw.paddlerace.org/races-data-bepc-summer.json | BEPC Summer |
| `site/standings-data-pnw.json` | https://pnw.paddlerace.org/standings-data-pnw.json | Standings |
| `site/trajectories-data-pnw.json` | https://pnw.paddlerace.org/trajectories-data-pnw.json | Trajectories |

Structure of `races-data-pnw.json`:
```
{
  current_year: "2026",
  seasons: {
    "2026": [
      {race_id, name, date, courses: [
        {label, short_label,
         finish: [{canonical_name, handicap, adjusted_time_seconds, adjusted_place,
                   eligible_adjusted_place, time_versus_par, adjusted_time_versus_par,
                   handicap_post, num_races, is_fresh_racer, is_par_racer, trophies,
                   handicap_note, num_ranked_races_pre, ...}],
         handicap: [same entries, sorted by adjusted_place]}
      ]}
    ]
  }
}
```

Key fields: `handicap` = pre-race handicap, `handicap_post` = post-race, `is_par_racer` = True for par racer, `adjusted_time_versus_par` = Jordan's "+0.3%" value.

`site/data.json` — large aggregated file used internally for generating racer pages. Not for race investigation.
`data/*/common/*.common.json` — raw fetched data BEFORE handicap processing. Do not use for investigating processed handicap results.



- **PNW Regional racer page threshold:** currently `min_races_for_page = 3` in CLUB_META (only generate pages for racers with 3+ appearances across all seasons). Review annually — increase to 4-5 as more years accumulate. Check: `python3 -c "..."` count script in FUTURE_WORK.md.
- Alias check: compare all new canonical names against `data/<club>/aliases.json`
- Verify race counts per season look reasonable
- Check pointsWeight sums to ~1.0 per race day
- Spot-check top 3 standings against known results

## Design Decisions

### Selector bar always shows all clubs (2026-04-20)
Every page (results, standings, trajectories, racer) shows all clubs in the selector bar, not just the current club. Implemented via `all_clubs` key in `data` dict passed to `_selector_bar()`. `generate_club()` sets `single["all_clubs"] = data["clubs"]` while `single["clubs"]` remains single-club for generation loops.

### Link ordering in upcoming races (2026-04-20)
`_LINK_ORDER = ['Info', 'Schedule', 'Register', 'Start List', 'Series']` in generator.py controls badge order. Anything not in the list appears last.

### Upcoming races: location vs notes split (2026-04-20)
`upcoming.yaml` has separate `location` and `notes` fields. `location` shows under race name (grey, small). `notes` shows in the Notes column (timing info only). Extracted from old combined notes field.

### Upcoming races: notes field is competitor-facing only (2026-07-09)
`notes` in `upcoming.yaml` MUST only contain information relevant to competitors (format, team composition, handicaps, schedule quirks, registration counts). It MUST NOT contain information for site-operator purposes (data-source uncertainty, "would be a new results source", TODO-style tracking notes). Site-operator notes belong in the diary/memory system or a code comment, not in the published `notes` field.

### Annual points rule: best-N results (2026-07-09)
Each series has an `annualPointsRule` in `data/clubs.yaml` (default `countAll`; BEPC Summer uses `top10results`) plus an optional `annualPointsRuleDescription` shown on the standings page banner when the rule isn't `countAll`.

Under `top10results`, a racer's season Finish Pts and Index Pts are each the sum of their best `BEST_N_RESULTS` (10) per-race point values — computed independently per metric, since a race can rank well on one metric and poorly on the other. Racing more than 10 times never lowers a racer's total; it only gives them more chances to post a result in their top 10.

Implementation:
- `bepc/generator.py`: `_season_points_summary()` (season-wide, used for standings-data.json) and `_racer_points_total()` (single racer's already-filtered results, used on the racer detail page) both compute per-race point lists and select the top N per `annualPointsRule`.
- `_fmt_points_cell()` renders a race's `race_points`/`handicap_points` cell muted (reusing the `place-muted` CSS class and `data-bs-toggle="tooltip"` pattern from `_fmt_indexed_place()`) when that specific race isn't in the racer's top-10 set for that metric. Only applies when `annualPointsRule != countAll`.
- The per-race results page (`results/{slug}.html`) does NOT show points at all — only the racer detail page and standings page display season point totals, so muting is only implemented there.
- Verified: for every racer-season with ≤10 total races, the new top-10 computation is byte-identical to the old raw cumulative sum (regression-tested against all 1065 bepc-summer racer-season records with ≤10 races before this feature shipped).

### Results page naming (2026-04-20)
Nav item and file renamed from "Races"/"races.html" to "Results"/"results.html". Old races.html files deleted.

### Podium display: % vs par as headline (2026-04-21)
Recent Results on index.html uses `% ▲/▼` as the primary podium headline (how much faster/slower than projected). Supporting data: Actual time + Projected time. Index shown next to racer name. Steps: gold=66px, silver=58px, bronze=58px, bottom-aligned content.

Formula: `predicted = par_time × index`, `pct = (1 - actual/predicted) × 100`. Positive = beat projection (▲), negative = missed (▼).

When `tvp=0` (no par established for a course), corrected podium shows "—" names with empty colored steps.

### Mobile-first card layout for Recent Results (2026-04-21)
index.html Recent Results uses card layout (not table): race name + date/link row, then course blocks, then centered Ranking pills. Podium centered in `podium-wrap` (max-width:546px). Course name and 4th-10th left-align to silver step via the wrap container.
