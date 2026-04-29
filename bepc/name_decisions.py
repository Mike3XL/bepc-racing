"""
Name resolution decisions for racer canonicalization.

Single source of truth: data/name-decisions.json
  aliases  — {raw: canonical}  maps variant → canonical name
  uniques  — {name: [name, ...]}  names that look similar but are genuinely different people
  pending  — [{raw, suggested, confidence, method}]  awaiting decision
  rejected — [{raw, suggested, reason}]  decided: do not merge
"""

import json
from pathlib import Path

DECISIONS_FILE = "name-decisions.json"

_EMPTY = {"aliases": {}, "uniques": {}, "pending": [], "rejected": []}


def load(data_root: Path) -> dict:
    p = data_root / DECISIONS_FILE
    if p.exists():
        d = json.loads(p.read_text())
        for k in _EMPTY:
            d.setdefault(k, type(_EMPTY[k])())
        return d
    return {k: type(v)() for k, v in _EMPTY.items()}


def save(data_root: Path, decisions: dict) -> None:
    p = data_root / DECISIONS_FILE
    p.write_text(json.dumps(decisions, indent=2, ensure_ascii=False, sort_keys=False))


def resolve(name: str, decisions: dict) -> str:
    """Resolve a raw name to its canonical form. Returns name unchanged if not aliased."""
    return decisions["aliases"].get(name, name)


def is_unique_pair(a: str, b: str, decisions: dict) -> bool:
    """Return True if a and b are recorded as genuinely different people."""
    for names in decisions["uniques"].values():
        if a in names and b in names:
            return True
    return False
