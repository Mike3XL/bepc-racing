Follow the architecture and conventions described in #[[file:SPEC.md]]

- Python 3.13 (Homebrew: /opt/homebrew/bin/python3.13)
- No external Python dependencies — stdlib only
- Ask before making assumptions; don't fabricate technical facts
- Mike is a BEPC member and surfski racer — this is his club's race analytics site
- Chicago 17th edition for any document citations

## Conventions

- Handicap result is the primary competition — always default to handicap view
- Consistency in naming matters: use exact trophy tooltip strings from SPEC.md
- HTML pages fetch JSON data files — no inline data blobs in HTML
- All dynamic DOM injection must be followed by Bootstrap tooltip initialization
- localStorage keys: bepc_season, bepc_result_tab, bepc_distance
- Fresh racers (first 2 races) are ineligible for handicap trophies and handicap points
- process → generate → publish is always manual, never automatic

## After pulling new race data

- Always run alias check: compare all canonical names against aliases.json for new variants
- Check for obvious duplicates: same person with different capitalisation, spelling, or abbreviation
- Verify racer counts per race look reasonable (not 0, not wildly different from similar races)
- Check pointsWeight is 1.0 for single-course races
- Run process and verify race/racer counts before generating

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
4. SPEC.md — update architecture, data model, trophy system, UI conventions
5. docs/FUTURE_WORK.md — mark completed items, add new ideas
6. docs/CHANGES.md — summarise what changed in this session (create if missing)
7. .kiro/steering/project.md — update conventions if anything new was established

## Data review checklist (run when adding new seasons or clubs)

- **PNW Regional racer page threshold:** currently `min_races_for_page = 3` in CLUB_META (only generate pages for racers with 3+ appearances across all seasons). Review annually — increase to 4-5 as more years accumulate. Check: `python3 -c "..."` count script in FUTURE_WORK.md.
- Alias check: compare all new canonical names against `data/<club>/aliases.json`
- Verify race counts per season look reasonable
- Check pointsWeight sums to ~1.0 per race day
- Spot-check top 3 standings against known results
