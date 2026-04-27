import math
from .models import RacerResult


def calculate_par_racer(racers: list[RacerResult]) -> tuple[RacerResult | None, set[tuple]]:
    """Par racer at ~33rd percentile by adjusted time.

    Prefers established-only racers when there are enough (≥6). Otherwise falls
    back to the full field — this lets young series and small events still
    produce a par estimate.

    Returns (par_racer, included_keys) where included_keys is the set of
    (canonical_name, craft_category) tuples for racers whose adjusted_time
    estimates contributed to par selection. Returns (None, set()) if fewer
    than 10 racers total (field too small for par at all).
    """
    if len(racers) < 10:
        return None, set()
    established = [r for r in racers if not r.is_fresh_racer]
    pool = established if len(established) >= 6 else racers
    sorted_by_adj = sorted(pool, key=lambda r: r.adjusted_time_seconds)
    par = sorted_by_adj[len(sorted_by_adj) // 3]
    included = {(r.canonical_name, r.craft_category) for r in pool}
    return par, included


def compute_new_handicap(racer: RacerResult, par_time: float,
                         num_races_to_establish: int = 1) -> None:
    """Compute and set handicap_post, is_fresh_racer, is_outlier, handicap_note on racer.

    num_races_to_establish: number of races required before handicap is established.
    Racer is ineligible (fresh) for their first N races, eligible from race N+1 onward.
    """
    existing = racer.handicap
    tvp = racer.time_versus_par
    atvp = racer.adjusted_time_versus_par

    # Incoming established flag: carried over from prior season OR enough races this season.
    # Use num_races - 1 because num_races was bumped to include THIS race.
    eligible = racer.carried_over or (racer.num_races - 1) >= num_races_to_establish
    established = eligible
    # Keep is_fresh_racer consistent with processor's pre-race determination
    racer.is_fresh_racer = not eligible

    if not established:
        # Fast convergence: 50/50 update, no outlier detection
        racer.handicap_post = existing * 0.5 + tvp * 0.5
        racer.handicap_note = f"Race {racer.num_races} of {num_races_to_establish} (fast update). 50% adjustment."
    elif atvp > 1.1:
        # Outlier: significantly slower than predicted — suppress update
        racer.handicap_post = existing
        racer.is_outlier = True
        racer.handicap_note = "Outlier (>10% slower than predicted). No change."
    elif atvp <= 1.0:
        # Faster than expected (including genuine improvement jumps) — always update
        racer.handicap_post = existing * 0.7 + tvp * 0.3
        racer.handicap_note = "Faster than expected. Handicap adjusted 30% towards result."
    else:
        racer.handicap_post = existing * 0.85 + tvp * 0.15
        racer.handicap_note = "Slower than predicted. Handicap adjusted 15% towards result."


def std_dev(values: list[float]) -> float:
    if not values:
        return 0.0
    mean = sum(values) / len(values)
    return math.sqrt(sum((v - mean) ** 2 for v in values) / len(values))
