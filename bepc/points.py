import math
from .models import RacerResult

POINTS_PLACES = 10


def race_points(original_place: int, weight: float = 1.0) -> int:
    if original_place > POINTS_PLACES:
        return 0
    raw = (POINTS_PLACES + 1 - original_place) * weight
    return max(1, round(raw))


def handicap_points(racer: RacerResult, weight: float = 1.0) -> int:
    if racer.is_fresh_racer or racer.is_outlier:
        return 0
    if racer.adjusted_place > POINTS_PLACES:
        return 0
    raw = (POINTS_PLACES + 1 - racer.adjusted_place) * weight
    return max(1, round(raw))
