from .models import RaceResult, RunningRecord
from .handicap import calculate_par_racer, compute_new_handicap, std_dev
from .points import race_points, handicap_points


def process_season(races: list[RaceResult], carry_over: dict | None = None) -> list[RaceResult]:
    """Process races in order, computing handicaps and points. Returns enriched races."""
    running: dict[tuple, RunningRecord] = {}
    if carry_over:
        for key, hcap in carry_over.items():
            running[key] = RunningRecord(handicap=hcap)

    for race in races:
        racers = race.racer_results
        w = race.race_info.points_weight

        # Initialize new racers
        for r in racers:
            key = (r.canonical_name, r.craft_category)
            if key not in running:
                running[key] = RunningRecord()

        # Apply running state
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

        # Par racer — None if too few racers
        par = calculate_par_racer(racers)
        small_group = par is None

        if not small_group:
            par.is_par_racer = True
            par_time = par.adjusted_time_seconds

            # Time versus par
            for r in racers:
                r.time_versus_par = r.time_seconds / par_time
                r.adjusted_time_versus_par = r.adjusted_time_seconds / par_time

            # New handicap
            for r in racers:
                compute_new_handicap(r, par_time)
        else:
            # Small group: no handicap update, mark as fresh
            for r in racers:
                r.time_versus_par = 0.0
                r.adjusted_time_versus_par = 0.0
                r.handicap_post = r.handicap  # no change
                r.is_fresh_racer = True
                r.handicap_note = f"Small group ({len(racers)} racers) — no handicap update"

        # Points (scaled by weight)
        for r in racers:
            r.race_points = race_points(r.original_place, w)
            r.handicap_points = handicap_points(r, w) if not small_group else 0
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
