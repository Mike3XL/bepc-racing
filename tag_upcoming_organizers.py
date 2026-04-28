"""Tag upcoming.yaml entries with an 'organizer' field.

Uses race-name pattern matching to infer the organizer. One-off.
"""
import yaml
import re
from pathlib import Path

UPCOMING = Path("data/upcoming.yaml")

# Name-pattern → organizer-id (first match wins)
RULES = [
    (re.compile(r"paddlers cup|gig harbor", re.I), "ghckrt"),
    (re.compile(r"lake whatcom classic|commencement bay|squaxin|bainbridge.*marathon|rat island|budd inlet|round shaw|elk river|lake samish|mercer island|sausage pull|port angeles.*coastal|la conner", re.I), "sound-rowers"),
    (re.compile(r"pnworca|chicken of the sea|whipper snapper|da grind|wake up the gorge|weapon of choice|keats", re.I), "pnworca"),
    (re.compile(r"peter marcus|bellingham bay rough|alderbrook.*st\.? paddle|deception pass", re.I), "salmon-bay-paddle"),
    (re.compile(r"bepc", re.I), "bepc"),
    (re.compile(r"duck island", re.I), "sckc"),
    (re.compile(r"jericho|wavechaser", re.I), "jericho"),
    (re.compile(r"board the fjord", re.I), "coast-outdoors"),
    (re.compile(r"gorge challenge|nch'i.*wanna|columbia river race", re.I), "ocean-flight"),
    (re.compile(r"ski to sea", re.I), "whatcom-events"),
    (re.compile(r"seventy48|r2ak|race to alaska|wa360", re.I), "nwmc"),
    (re.compile(r"narrows challenge", re.I), "pacific-paddle-events"),  # Narrows is via Pacific Paddle Events
    (re.compile(r"bremerton bridges", re.I), "pnworca"),  # best guess
    (re.compile(r"guano rocks", re.I), "sound-rowers"),
]

data = yaml.safe_load(UPCOMING.read_text()) or {}
updates = []
unmatched = []
for r in data.get("upcoming", []) or []:
    if "organizer" in r:
        continue
    name = r.get("name", "")
    matched = None
    for pat, org in RULES:
        if pat.search(name):
            matched = org
            break
    if matched:
        r["organizer"] = matched
        updates.append((name, matched))
    else:
        unmatched.append(name)

UPCOMING.write_text(yaml.safe_dump(data, default_flow_style=False, sort_keys=False, allow_unicode=True))
print(f"Tagged {len(updates)} upcoming entries")
for n, o in updates[:50]:
    print(f"  {o:22s}  {n}")
if unmatched:
    print()
    print(f"UNMATCHED ({len(unmatched)}):")
    for n in unmatched:
        print(f"  {n}")
