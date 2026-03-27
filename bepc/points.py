from .models import RacerResult

POINTS_PLACES = 10


def race_points(original_place: int) -> int:
    return max(0, POINTS_PLACES + 1 - original_place) if original_place <= POINTS_PLACES else 0


def handicap_points(racer: RacerResult) -> int:
    if racer.is_fresh_racer or racer.is_outlier:
        return 0
    return max(0, POINTS_PLACES + 1 - racer.adjusted_place) if racer.adjusted_place <= POINTS_PLACES else 0
