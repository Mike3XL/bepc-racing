import math
from .models import RacerResult


def calculate_par_racer(racers: list[RacerResult]) -> RacerResult | None:
    """Par racer at ~33rd percentile by adjusted time. Returns None if insufficient racers (<10)."""
    if len(racers) < 10:
        return None
    sorted_by_adj = sorted(racers, key=lambda r: r.adjusted_time_seconds)
    return sorted_by_adj[len(sorted_by_adj) // 3]


def compute_new_handicap(racer: RacerResult, par_time: float,
                         establishment_races: int = 2) -> None:
    """Compute and set handicap_post, is_fresh_racer, is_outlier, handicap_note on racer.

    Two concepts:
    - eligible: can win hcap awards. True if carried_over OR num_races >= establishment_races.
    - established: handicap converged. True if num_races >= establishment_races.
      Established racers get slow updates + outlier detection.
      Unestablished racers (including carried-over) get fast 50/50 updates, no outlier detection.
    """
    existing = racer.handicap
    tvp = racer.time_versus_par
    atvp = racer.adjusted_time_versus_par

    established = racer.num_races >= establishment_races
    eligible = racer.carried_over or established

    # EST badge = not eligible
    racer.is_fresh_racer = not eligible

    if not established:
        # Fast convergence: 50/50 update, no outlier detection
        racer.handicap_post = existing * 0.5 + tvp * 0.5
        racer.handicap_note = f"Race {racer.num_races + 1} of {establishment_races} (fast update). 50% adjustment."
    elif atvp > 1.1:
        racer.handicap_post = existing
        racer.is_outlier = True
        racer.handicap_note = "Outlier (>10% slower than predicted). No change."
    elif atvp <= 1.0:
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
