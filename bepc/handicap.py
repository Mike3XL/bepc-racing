import math
from .models import RacerResult


def calculate_par_racer(racers: list[RacerResult]) -> RacerResult | None:
    """Par racer at ~33rd percentile by adjusted time. Returns None if insufficient racers (<10)."""
    if len(racers) < 10:
        return None
    sorted_by_adj = sorted(racers, key=lambda r: r.adjusted_time_seconds)
    return sorted_by_adj[len(sorted_by_adj) // 3]


def compute_new_handicap(racer: RacerResult, par_time: float,
                         num_races_to_establish: int = 1) -> None:
    """Compute and set handicap_post, is_fresh_racer, is_outlier, handicap_note on racer.

    num_races_to_establish: number of races required before handicap is established.
    Racer is ineligible (fresh) for their first N races, eligible from race N+1 onward.
    """
    existing = racer.handicap
    tvp = racer.time_versus_par
    atvp = racer.adjusted_time_versus_par

    established = racer.num_races > num_races_to_establish
    eligible = racer.carried_over or racer.num_races > num_races_to_establish

    # EST badge = not eligible
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
