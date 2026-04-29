"""
cli audit-names — find and resolve alias candidates for racer names.

Detection methods:
  last_first  — "Smith, John" → "John Smith"
  case        — exact case-insensitive match
  fuzzy       — Jaro-Winkler similarity ≥ threshold, shared word
  nickname    — known nickname↔formal name pairs with matching last name

Decisions stored in data/name-decisions.json.
"""

import collections
import json
import re
import sys
from pathlib import Path

import jellyfish
from nameparser import HumanName
from nicknames import NickNamer

from bepc import name_decisions

_NAMER = NickNamer()

# Jaro-Winkler threshold for fuzzy candidates
_FUZZY_THRESHOLD = 0.88
# Above this → auto-accept (very high confidence)
_AUTO_ACCEPT = 0.97
# Auto-accept if BOTH names are rare (total occurrences ≤ this) and confidence ≥ this
_LOW_VOLUME_MAX_COUNT = 3
_LOW_VOLUME_MIN_CONF = 0.93
# Auto-accept if raw is rare relative to suggested (ratio ≥ this) and confidence ≥ this
_COUNT_RATIO_MIN = 5       # suggested must be at least 5× more common than raw
_COUNT_RATIO_MIN_CONF = 0.90  # minimum confidence to use ratio rule

_PERSON_NAME_RE = re.compile(r'\b[A-Z][a-z]{1,}\s+[A-Z][a-z]{1,}\b')


def _is_club_suffix(raw: str, suggested: str) -> bool:
    """True if suggested = raw + club/affiliation suffix (not a second person)."""
    if not suggested.startswith(raw):
        return False
    suffix = suggested[len(raw):].strip()
    if not suffix or not re.match(r'^[-( ]', suffix):
        return False
    inner = re.sub(r'^[-( /]+', '', suffix).strip().rstrip(')')
    # Reject if inner looks like 'FirstName LastName'
    return not _PERSON_NAME_RE.search(inner)

# Keywords that indicate a team/club entry, not an individual
_TEAM_WORDS = re.compile(
    r"\b(team|club|rowing|outrigger|canoe|paddle|dragon|occ|fcrcc|flcc|fgpc|cvrcc|"
    r"nopc|kikaha|hui|masters|wahine|mixed|novice|junior|relay|crew|squad|bros|"
    r"sisters|bbop|socc|spocc|hwops|opra|lsrc|wra|ncc|oar|association|society)\b",
    re.I,
)
# Doubles/multi-boat prefixes
_DOUBLES_RE = re.compile(r'^(K-?[2-9]|C-?[2-9]|OC-?[2-9]|V-?[2-9])\b', re.I)


def _is_individual(name: str) -> bool:
    if not name or len(name) < 3:
        return False
    if _TEAM_WORDS.search(name):
        return False
    if _DOUBLES_RE.match(name):
        return False
    # Multi-person entries: slash, ampersand, " and ", comma between names
    if re.search(r'[/&]', name):
        return False
    if re.search(r'\band\b', name, re.I):
        return False
    # Comma followed by a name (not LAST, FIRST which is handled separately)
    # Allow single comma for LAST, FIRST detection; reject multiple commas
    if name.count(',') > 1:
        return False
    words = name.replace(',', ' ').split()
    if len(words) < 2 or len(words) > 4:
        return False
    alpha = sum(c.isalpha() or c in " '-." for c in name) / len(name)
    return alpha >= 0.85


def _collect_raw_names(data_root: Path):
    """Single pass: return (name counts, names that only appear in multi-person craft)."""
    counts: collections.Counter = collections.Counter()
    name_crafts: dict = collections.defaultdict(set)
    for f in data_root.rglob("*.common.json"):
        try:
            d = json.loads(f.read_text())
            for r in d.get("racerResults", []):
                n = r.get("canonicalName", "")
                c = r.get("craftCategory", "")
                if n:
                    counts[n] += 1
                    if c:
                        name_crafts[n].add(c)
        except Exception:
            pass
    multi_only = {name for name, crafts in name_crafts.items()
                  if all(_MULTI_CRAFT_RE.match(c) for c in crafts)}
    return counts, multi_only


# Craft categories that are always multi-person
_MULTI_CRAFT_RE = re.compile(
    r'^(K-?[2-9]|C-?[2-9]|OC-?[2-9]|OC-?[4-9]|OC-?6|V-?[2-9]|'
    r'.*\b(double|doubles|2x|4x|4\+|6.person|8\+|8x|tandem|dragon|'
    r'war.canoe|gig.?[2-9]|sk-?2|fsk-?2|hpk-?2|oc2|oc4|oc6|'
    r'mx.oc|mx.hpk2|mx.sk2|mx.2x|mx.4x|mx.dragon|mx.gig|'
    r'rowing.*[2-9]x|rowing.*four|rowing.*eight|rowing.*quad)\b)',
    re.I
)


def _names_only_in_multi_craft(data_root: Path) -> set:
    # Kept for backward compat — now handled inside _collect_raw_names
    _, multi_only = _collect_raw_names(data_root)
    return multi_only


def _already_decided(raw: str, suggested: str, decisions: dict) -> bool:
    aliases = decisions["aliases"]
    if raw in aliases:
        return True
    # Reverse was accepted: suggested aliases to raw
    if aliases.get(suggested) == raw:
        return True
    if any(r["raw"] == raw and r["suggested"] == suggested for r in decisions["rejected"]):
        return True
    if any(r["raw"] == suggested and r["suggested"] == raw for r in decisions["rejected"]):
        return True
    for entry in decisions["uniques"].values():
        if raw in entry and suggested in entry:
            return True
    return False


def _detect_candidates(raw_names: collections.Counter, decisions: dict,
                       multi_only: set = None) -> list:
    """Return list of {raw, suggested, confidence, method}, sorted by confidence desc."""
    candidates = []
    # All resolved canonical names (for fuzzy comparison)
    resolved = {decisions["aliases"].get(n, n) for n in raw_names}
    resolved_list = sorted(resolved)

    # Build last-name index for O(n) blocking — 2-char prefix buckets
    by_last: dict = collections.defaultdict(list)
    for name in resolved_list:
        ln = _last_name(name)
        if ln:
            by_last[ln[:2]].append(name)

    def fuzzy_candidates_for(raw: str) -> list:
        ln = _last_name(raw)
        if not ln or len(ln) < 2:
            return resolved_list
        return by_last.get(ln[:2], [])

    for raw, count in raw_names.items():
        if raw in decisions["aliases"]:
            continue  # already resolved
        if multi_only and raw in multi_only:
            continue  # only ever appears in multi-person craft

        # --- Method 1: LAST, FIRST flip ---
        if "," in raw and _is_individual(raw.replace(",", " ")):
            parsed = HumanName(raw)
            if parsed.first and parsed.last:
                suggested = f"{parsed.first} {parsed.last}".strip()
                if suggested != raw and not _already_decided(raw, suggested, decisions):
                    # High confidence if it produces a known canonical, else medium
                    conf = 0.98 if suggested in resolved else 0.85
                    candidates.append({"raw": raw, "suggested": suggested,
                                       "confidence": conf, "method": "last_first",
                                       "count": count})
            continue  # don't also fuzzy-match comma names

        if not _is_individual(raw):
            continue

        canonical = decisions["aliases"].get(raw, raw)

        # --- Method 2: Case / whitespace variant ---
        for other in resolved_list:
            if other == canonical:
                continue
            if raw.strip().lower() == other.strip().lower() and raw != other:
                if not _already_decided(raw, other, decisions):
                    candidates.append({"raw": raw, "suggested": other,
                                       "confidence": 0.99, "method": "case",
                                       "count": count})
                break

        # --- Method 3: Jaro-Winkler fuzzy ---
        best_score, best_other = 0.0, None
        raw_words = set(raw.lower().split())
        for other in fuzzy_candidates_for(raw):
            if other == canonical or other == raw:
                continue
            if name_decisions.is_unique_pair(raw, other, decisions):
                continue
            score = jellyfish.jaro_winkler_similarity(raw.lower(), other.lower())
            if score >= _FUZZY_THRESHOLD and score > best_score:
                other_words = set(other.lower().split())
                if raw_words & other_words:  # share at least one word
                    best_score, best_other = score, other
        if best_other and not _already_decided(raw, best_other, decisions):
            candidates.append({"raw": raw, "suggested": best_other,
                                "confidence": round(best_score, 3), "method": "fuzzy",
                                "count": count})

        # --- Method 4: Nickname lookup ---
        parsed = HumanName(raw)
        if parsed.first and parsed.last:
            formals = _NAMER.canonicals_of(parsed.first.lower())
            for formal in formals:
                formal_name = f"{formal.title()} {parsed.last}"
                if formal_name in resolved and formal_name != raw:
                    if not _already_decided(raw, formal_name, decisions):
                        candidates.append({"raw": raw, "suggested": formal_name,
                                           "confidence": 0.70, "method": "nickname",
                                           "count": count})
                        break

    # Deduplicate: keep highest confidence per raw name
    # Also resolve circular pairs (A→B and B→A): pick the more-common name as canonical
    seen: dict[str, dict] = {}
    for c in candidates:
        key = c["raw"]
        if key not in seen or c["confidence"] > seen[key]["confidence"]:
            seen[key] = c

    # Remove circular pairs: if both A→B and B→A exist, keep only the one where
    # suggested has higher count (more common = canonical); tie-break: prefer title case
    final = {}
    for raw, c in seen.items():
        suggested = c["suggested"]
        reverse = seen.get(suggested)
        if reverse and reverse["suggested"] == raw:
            # Circular: keep the direction pointing TO the more-common / better-cased name
            raw_count = raw_names.get(raw, 0)
            sug_count = raw_names.get(suggested, 0)
            if raw_count < sug_count:
                final[raw] = c
            elif sug_count < raw_count:
                pass  # reverse direction will be kept
            else:
                # Same count: prefer the one where suggested is title-cased
                # Never alias toward ALL-CAPS or trailing-space names
                sug_is_good = (suggested == suggested.strip() and
                               not suggested.isupper() and
                               suggested[0].isupper())
                raw_is_good = (raw == raw.strip() and
                               not raw.isupper() and
                               raw[0].isupper())
                if sug_is_good and not raw_is_good:
                    final[raw] = c
                # else: reverse direction preferred (or neither is good, skip both)
        else:
            final[raw] = c

    return sorted(final.values(), key=lambda x: -x["confidence"])


def _enrich(candidates: list, raw_names: collections.Counter) -> list:
    """Attach sug_count to each candidate."""
    for c in candidates:
        c["sug_count"] = raw_names.get(c["suggested"], 0)
    return candidates


def _last_name(name: str) -> str:
    """Best-effort last name extraction (last word, ignoring suffixes)."""
    words = [w for w in name.split() if w.lower() not in ("jr", "jr.", "sr", "sr.", "ii", "iii")]
    return words[-1].lower() if words else ""


def _shares_last_name(a: str, b: str) -> bool:
    la, lb = _last_name(a), _last_name(b)
    if not la or not lb:
        return False
    return jellyfish.jaro_winkler_similarity(la, lb) >= 0.88


def _is_count_ratio_match(c: dict, raw_names: collections.Counter) -> bool:
    """True if raw is rare relative to suggested AND they share a last name."""
    raw_count = raw_names.get(c["raw"], 0)
    sug_count = raw_names.get(c["suggested"], 0)
    if raw_count == 0 or sug_count == 0:
        return False
    if (sug_count / raw_count) < _COUNT_RATIO_MIN or c["confidence"] < _COUNT_RATIO_MIN_CONF:
        return False
    return _shares_last_name(c["raw"], c["suggested"])


def _is_low_volume(c: dict, raw_names: collections.Counter) -> bool:
    """True if both raw and suggested are rare AND share a last name."""
    raw_count = raw_names.get(c["raw"], 0)
    sug_count = raw_names.get(c["suggested"], 0)
    if (raw_count + sug_count) > _LOW_VOLUME_MAX_COUNT:
        return False
    return _shares_last_name(c["raw"], c["suggested"])


def _prompt(candidate: dict) -> str:
    """Prompt user for a decision. Returns 'y', 'n', 'u', 's' (skip), or 'q'."""
    raw, suggested = candidate["raw"], candidate["suggested"]
    conf = candidate["confidence"]
    method = candidate["method"]
    count = candidate.get("count", "?")
    sug_count = candidate.get("sug_count", "?")
    print(f"\n  [{method} {conf:.2f}] {raw!r} ({count}x)  →  {suggested!r} ({sug_count}x)")
    print("  [y]es  [n]o  [r]everse  [u]nique  [s]kip  [q]uit  ", end="", flush=True)
    while True:
        ch = input().strip().lower()
        if ch in ("y", "n", "r", "u", "s", "q"):
            return ch
        print("  Enter y/n/r/u/s/q: ", end="", flush=True)


def cmd_audit_names(args):
    data_root = Path("data")
    decisions = name_decisions.load(data_root)

    print("Scanning race data for name candidates...")
    raw_names, multi_only = _collect_raw_names(data_root)
    print(f"  {len(raw_names)} raw names, {len(multi_only)} multi-person-only (excluded)")
    candidates = _detect_candidates(raw_names, decisions, multi_only)
    candidates = _enrich(candidates, raw_names)

    if not candidates:
        print("No new candidates found.")
        return

    # Split: high-confidence auto-accept, low-volume auto-accept, count-ratio auto-accept, needs review
    auto = [c for c in candidates
            if c["confidence"] >= _AUTO_ACCEPT
            or (c["confidence"] >= _LOW_VOLUME_MIN_CONF and _is_low_volume(c, raw_names))
            or _is_count_ratio_match(c, raw_names)
            or _is_club_suffix(c["raw"], c["suggested"])]
    review = [c for c in candidates if c not in auto]

    # Auto-accept
    if auto:
        print(f"\nAuto-accepting {len(auto)} aliases:")
        for c in auto:
            raw, suggested = c["raw"], c["suggested"]
            # Club-suffix: bare name is canonical, suffixed variant aliases to it
            if _is_club_suffix(raw, suggested):
                raw, suggested = suggested, raw
            decisions["aliases"][raw] = suggested
            if c["confidence"] >= _AUTO_ACCEPT:
                rule = ""
            elif _is_club_suffix(c["raw"], c["suggested"]):
                rule = " club-suffix"
            elif _is_count_ratio_match(c, raw_names):
                rule = " ratio"
            else:
                rule = " low-vol"
            tag = f"{c['method']} {c['confidence']:.2f}{rule}"
            print(f"  {c['raw']!r} ({c['count']}x) → {c['suggested']!r} ({c['sug_count']}x)  [{tag}]")

    # Interactive review
    if review:
        print(f"\n{len(review)} candidates need review (q to stop and save):")
        for c in review:
            ch = _prompt(c)
            if ch == "y":
                decisions["aliases"][c["raw"]] = c["suggested"]
                decisions["pending"] = [p for p in decisions["pending"]
                                        if p["raw"] != c["raw"]]
            elif ch == "r":
                decisions["aliases"][c["suggested"]] = c["raw"]
                decisions["pending"] = [p for p in decisions["pending"]
                                        if p["raw"] != c["raw"]]
            elif ch == "n":
                decisions["rejected"].append({
                    "raw": c["raw"], "suggested": c["suggested"],
                    "method": c["method"], "reason": "rejected by user"
                })
            elif ch == "u":
                key = f"{c['raw']} / {c['suggested']}"
                decisions["uniques"][key] = [c["raw"], c["suggested"]]
                print("  Recorded as unique pair.")
            elif ch == "s":
                # Leave in pending for next time
                if not any(p["raw"] == c["raw"] for p in decisions["pending"]):
                    decisions["pending"].append({
                        "raw": c["raw"], "suggested": c["suggested"],
                        "confidence": c["confidence"], "method": c["method"]
                    })
            elif ch == "q":
                # Save all remaining (including current) as pending
                idx = review.index(c)
                for c2 in review[idx:]:
                    if not any(p["raw"] == c2["raw"] for p in decisions["pending"]):
                        decisions["pending"].append({
                            "raw": c2["raw"], "suggested": c2["suggested"],
                            "confidence": c2["confidence"], "method": c2["method"]
                        })
                break

    name_decisions.save(data_root, decisions)
    total_aliases = len(decisions["aliases"])
    print(f"\nSaved. Total aliases: {total_aliases}, "
          f"uniques: {len(decisions['uniques'])}, "
          f"pending: {len(decisions['pending'])}, "
          f"rejected: {len(decisions['rejected'])}")
