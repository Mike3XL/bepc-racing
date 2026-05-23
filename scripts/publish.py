#!/usr/bin/env python3
"""
BEPC build+publish background worker.

Usage:
    python3 scripts/publish.py [site]          # launch background job, return immediately
    python3 scripts/publish.py [site] --worker  # run as worker (called by launcher)

Logs to /tmp/bepc-publish.log
"""
import sys
import os
import subprocess
import time
import hashlib
import urllib.request
from datetime import datetime
from pathlib import Path

REPO = Path(__file__).parent.parent
LOG = Path("/tmp/bepc-publish.log")
SITE_URL = "https://pnw.paddlerace.org/"
FINGERPRINT_URL = "https://pnw.paddlerace.org/index.html"  # rebuilt on every publish
POLL_INTERVAL = 15   # seconds between site checks
POLL_TIMEOUT = 300   # give up after 5 minutes


def notify(title: str, message: str):
    script = f'display notification "{message}" with title "{title}" sound name "Glass"'
    subprocess.run(["osascript", "-e", script], capture_output=True)


def log(msg: str):
    ts = datetime.now().strftime("%H:%M:%S")
    line = f"[{ts}] {msg}"
    print(line, flush=True)  # goes to LOG file when running as worker


def site_fingerprint() -> str:
    try:
        req = urllib.request.Request(FINGERPRINT_URL, headers={"Cache-Control": "no-cache", "Pragma": "no-cache"})
        with urllib.request.urlopen(req, timeout=10) as r:
            return hashlib.md5(r.read()).hexdigest()
    except Exception as e:
        return f"error:{e}"


def run_worker(site: str):
    LOG.write_text("")  # clear log
    log(f"=== BEPC publish worker started: site={site} ===")

    # Fingerprint current live site before publish
    log("Fingerprinting current live site...")
    before = site_fingerprint()
    log(f"Pre-publish fingerprint: {before}")

    # Build
    log("Building...")
    result = subprocess.run(
        [sys.executable, "cli.py", "build-site", site],
        cwd=REPO, capture_output=True, text=True
    )
    log(result.stdout.strip()[-500:] if result.stdout else "(no output)")
    if result.returncode != 0:
        log(f"BUILD FAILED: {result.stderr[-300:]}")
        notify("BEPC Build Failed", result.stderr[-100:] or "Check /tmp/bepc-publish.log")
        return

    log("Build complete. Publishing...")

    # Publish
    result = subprocess.run(
        [sys.executable, "cli.py", "publish-site", site],
        cwd=REPO, capture_output=True, text=True
    )
    log(result.stdout.strip()[-300:] if result.stdout else "(no output)")
    if result.returncode != 0:
        log(f"PUBLISH FAILED: {result.stderr[-300:]}")
        notify("BEPC Publish Failed", result.stderr[-100:] or "Check /tmp/bepc-publish.log")
        return

    log("Published to GitHub Pages. Waiting for site to refresh...")
    notify("BEPC Published", "Waiting for site to go live...")

    # Poll until site content changes
    deadline = time.time() + POLL_TIMEOUT
    refreshed = False
    while time.time() < deadline:
        time.sleep(POLL_INTERVAL)
        after = site_fingerprint()
        log(f"Poll: {after}")
        if after != before and not after.startswith("error:"):
            refreshed = True
            break

    if refreshed:
        log("Site refreshed!")
        notify("BEPC Site Live ✓", f"{SITE_URL} is updated")
    else:
        log("Timed out waiting for site refresh.")
        notify("BEPC Publish", "Published but site refresh not detected after 5 min")


def launch_background(site: str):
    """Launch worker in background and return immediately."""
    LOG.write_text("")  # clear log
    subprocess.Popen(
        [sys.executable, __file__, site, "--worker"],
        stdout=open(LOG, "w"),
        stderr=subprocess.STDOUT,
        start_new_session=True,
        cwd=REPO,
    )
    print(f"Background publish started. Log: {LOG}")


if __name__ == "__main__":
    args = sys.argv[1:]
    site = next((a for a in args if not a.startswith("--")), "pnw")
    worker = "--worker" in args

    if worker:
        run_worker(site)
    else:
        launch_background(site)
