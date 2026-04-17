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
    place = racer.eligible_adjusted_place or racer.adjusted_place
    if place > POINTS_PLACES:
        return 0
    raw = (POINTS_PLACES + 1 - place) * weight
    return max(1, round(raw))
