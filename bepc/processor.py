from .models import RaceResult, RunningRecord
from .handicap import calculate_par_racer, compute_new_handicap, std_dev
from .points import race_points, handicap_points


def process_season(races: list[RaceResult]) -> list[RaceResult]:
    """Process races in order, computing handicaps and points. Returns enriched races."""
    running: dict[tuple, RunningRecord] = {}

    for race in races:
        racers = race.racer_results

        # Initialize new racers
        for r in racers:
            key = (r.canonical_name, r.craft_category)
            if key not in running:
                running[key] = RunningRecord()

        # Apply running state to each racer
        for r in racers:
            key = (r.canonical_name, r.craft_category)
            rec = running[key]
            r.num_races = rec.num_races + 1
            r.handicap = rec.handicap
            r.season_points = rec.season_points
            r.season_handicap_points = rec.season_handicap_points

        # Compute adjusted times
        for r in racers:
            r.adjusted_time_seconds = r.time_seconds / r.handicap

        # Compute adjusted places
        for i, r in enumerate(sorted(racers, key=lambda x: x.adjusted_time_seconds), 1):
            r.adjusted_place = i

        # Par racer
        par = calculate_par_racer(racers)
        par.is_par_racer = True
        par_time = par.adjusted_time_seconds

        # Time versus par
        for r in racers:
            r.time_versus_par = r.time_seconds / par_time
            r.adjusted_time_versus_par = r.adjusted_time_seconds / par_time

        # New handicap
        for r in racers:
            compute_new_handicap(r, par_time)

        # Points
        for r in racers:
            r.race_points = race_points(r.original_place)
            r.handicap_points = handicap_points(r)
            r.season_points += r.race_points
            r.season_handicap_points += r.handicap_points

        # Handicap sequences
        for r in racers:
            key = (r.canonical_name, r.craft_category)
            r.handicap_sequence = running[key].handicap_sequence + [r.handicap_post]
            r.handicap_points_sequence = running[key].handicap_points_sequence + [r.handicap_points]
            r.handicap_std_dev = std_dev(r.handicap_sequence)

        # Save running state
        for r in racers:
            key = (r.canonical_name, r.craft_category)
            running[key] = RunningRecord(
                num_races=r.num_races,
                handicap=r.handicap_post,
                season_points=r.season_points,
                season_handicap_points=r.season_handicap_points,
                handicap_sequence=r.handicap_sequence,
                handicap_points_sequence=r.handicap_points_sequence,
                handicap_std_dev=r.handicap_std_dev,
            )

    return races
