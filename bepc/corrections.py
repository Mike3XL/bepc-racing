"""Apply manual corrections to parsed race results.

Corrections live in each race's meta.yaml under the `corrections:` key.
They are applied in the fetcher pipeline, right after raw data is parsed
into the common.json shape but before the file is written. This means
the common.json on disk is always the corrected output.

Supported operations:

  - edit: {course: LABEL, racer: "Name"}
    set: {field: value, ...}
    reason: "..."

  - remove: {course: LABEL, racer: "Name"}
    reason: "..."

  - move: {racer: "Name", from: LABEL, to: LABEL}
    set: {field: value, ...}   # optional
    reason: "..."

  - add: {course: LABEL, racer: "Name", timeSeconds: N, craftCategory: "...", ...}
    reason: "..."

Field names in `set` and `add` match the common.json keys (camelCase:
timeSeconds, canonicalName, craftCategory, gender, ...).

Each course is re-ranked by timeSeconds after corrections are applied.
"""
from __future__ import annotations

from typing import Any


def _default_racer() -> dict:
    return {
        "originalPlace": 0,
        "canonicalName": "",
        "craftCategory": "",
        "gender": "",
        "handicap": 1.0,
        "timeSeconds": 0.0,
        "timeVersusPar": 0.0,
        "adjustedTimeSeconds": 0.0,
        "adjustedTimeVersusPar": 0.0,
        "adjustedPlace": 0,
        "handicapPost": 1.0,
        "numRaces": 0,
        "handicapSequence": None,
        "handicapPointsSequence": None,
        "handicapStdDev": 0.0,
        "absoluteImprovement": 0.0,
        "parRacer": False,
    }


def _find_racer(racers: list[dict], name: str,
                original_place: int | None = None) -> int | None:
    """Return index of racer matching `name` (and optionally originalPlace).
    Returns None if not found or ambiguous."""
    matches = [i for i, r in enumerate(racers) if r.get("canonicalName") == name]
    if original_place is not None:
        matches = [i for i in matches if racers[i].get("originalPlace") == original_place]
    if len(matches) == 1:
        return matches[0]
    return None


def _renumber(racers: list[dict]) -> None:
    """Sort by timeSeconds and set originalPlace 1..N."""
    racers.sort(key=lambda r: (r.get("timeSeconds") or 0))
    for i, r in enumerate(racers, 1):
        r["originalPlace"] = i


def apply_corrections(courses: dict[str, list[dict]],
                      corrections: list[dict]) -> dict[str, list[dict]]:
    """Apply the corrections list to the courses dict.

    `courses` maps course label → list of racer-result dicts (common.json schema).
    Returns the same dict (mutated). Raises ValueError with a clear message
    if a correction can't be applied.
    """
    if not corrections:
        return courses

    for i, corr in enumerate(corrections):
        reason = corr.get("reason", "")
        tag = f"correction #{i+1}"
        if reason:
            tag += f" ({reason[:60]}...)" if len(reason) > 60 else f" ({reason})"

        if "edit" in corr:
            target = corr["edit"]
            course = target.get("course")
            name = target.get("racer")
            if course not in courses:
                raise ValueError(f"{tag}: edit target course {course!r} not found")
            idx = _find_racer(courses[course], name, target.get("originalPlace"))
            if idx is None:
                raise ValueError(f"{tag}: racer {name!r} not found in course {course!r}")
            for k, v in (corr.get("set") or {}).items():
                courses[course][idx][k] = v
            _renumber(courses[course])

        elif "remove" in corr:
            target = corr["remove"]
            course = target.get("course")
            name = target.get("racer")
            if course not in courses:
                raise ValueError(f"{tag}: remove target course {course!r} not found")
            idx = _find_racer(courses[course], name, target.get("originalPlace"))
            if idx is None:
                raise ValueError(f"{tag}: racer {name!r} not found in course {course!r}")
            courses[course].pop(idx)
            _renumber(courses[course])

        elif "move" in corr:
            target = corr["move"]
            name = target.get("racer")
            from_course = target.get("from")
            to_course = target.get("to")
            if from_course not in courses:
                raise ValueError(f"{tag}: move source course {from_course!r} not found")
            if to_course not in courses:
                raise ValueError(f"{tag}: move destination course {to_course!r} not found")
            idx = _find_racer(courses[from_course], name, target.get("originalPlace"))
            if idx is None:
                raise ValueError(f"{tag}: racer {name!r} not found in course {from_course!r}")
            racer = courses[from_course].pop(idx)
            # Apply any field overrides
            for k, v in (corr.get("set") or {}).items():
                racer[k] = v
            courses[to_course].append(racer)
            _renumber(courses[from_course])
            _renumber(courses[to_course])

        elif "add" in corr:
            target = corr["add"]
            course = target.get("course")
            if course not in courses:
                raise ValueError(f"{tag}: add target course {course!r} not found")
            racer = _default_racer()
            for k, v in target.items():
                if k == "course":
                    continue
                if k == "racer":
                    racer["canonicalName"] = v
                else:
                    racer[k] = v
            # adjustedTimeSeconds defaults to timeSeconds
            if racer.get("timeSeconds") and not racer.get("adjustedTimeSeconds"):
                racer["adjustedTimeSeconds"] = racer["timeSeconds"]
            courses[course].append(racer)
            _renumber(courses[course])

        else:
            raise ValueError(f"{tag}: unknown operation — expected one of edit/remove/move/add")

    return courses


def load_meta_corrections(meta_path) -> list[dict]:
    """Load `corrections:` from a .meta.yaml file. Returns empty list if none."""
    import yaml
    from pathlib import Path
    p = Path(meta_path)
    if not p.exists():
        return []
    data = yaml.safe_load(p.read_text()) or {}
    return data.get("corrections") or []
