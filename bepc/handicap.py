import math
from .models import RacerResult


def calculate_par_racer(racers: list[RacerResult]) -> RacerResult:
    """Par racer is the racer at the ~33rd percentile by finish time."""
    if len(racers) <= 10:
        raise ValueError(f"Insufficient racers for par calculation: {len(racers)} (min 10)")
    sorted_by_time = sorted(racers, key=lambda r: r.time_seconds)
    return sorted_by_time[len(sorted_by_time) // 3]


def compute_new_handicap(racer: RacerResult, par_time: float) -> None:
    """Compute and set handicap_post, is_fresh_racer, is_outlier, handicap_note on racer."""
    existing = racer.handicap
    tvp = racer.time_versus_par
    atvp = racer.adjusted_time_versus_par

    if racer.num_races == 1:
        racer.handicap_post = tvp
        racer.handicap_note = "First race. Handicap set to timeVsPar"
        racer.is_fresh_racer = True
    elif racer.num_races == 2:
        racer.handicap_post = existing * 0.5 + tvp * 0.5
        racer.handicap_note = "Second race. 50% adjustment from previous handicap."
        racer.is_fresh_racer = True
    elif abs(atvp) > 1.1:
        racer.handicap_post = existing
        racer.is_outlier = True
        if atvp > 1.0:
            racer.handicap_note = "Outlier (>10% slower than predicted). No change."
        else:
            racer.handicap_note = "Outlier (>10% faster than predicted). No change."
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
