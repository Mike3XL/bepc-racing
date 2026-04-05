"""Provenance tracking — records how and when race data was obtained."""
import json
from datetime import datetime, timezone
from pathlib import Path


def log_provenance(out_dir: Path, entry: dict) -> None:
    """Append a provenance entry to out_dir/provenance.jsonl."""
    entry["fetched_at"] = datetime.now(timezone.utc).isoformat()
    log_path = out_dir / "provenance.jsonl"
    with open(log_path, "a") as f:
        f.write(json.dumps(entry) + "\n")


def save_raw(out_dir: Path, filename: str, content: str | bytes, mode: str = "w") -> Path:
    """Save raw source data to out_dir/raw/filename."""
    raw_dir = out_dir / "raw"
    raw_dir.mkdir(parents=True, exist_ok=True)
    path = raw_dir / filename
    with open(path, mode) as f:
        f.write(content)
    return path
