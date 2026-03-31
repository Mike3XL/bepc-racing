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

        # Trophies
        finish_podium = {1: "finish_1", 2: "finish_2", 3: "finish_3"}
        hcap_podium = ["hcap_1", "hcap_2", "hcap_3"]
        consistent_awards = ["consistent_1", "consistent_2", "consistent_3"]
        for r in racers:
            r.trophies = []
        eligible = [r for r in sorted(racers, key=lambda x: x.adjusted_place)
                    if not r.is_fresh_racer and not small_group]
        for i, r in enumerate(eligible[:3]):
            r.trophies.append(hcap_podium[i])
        # Consistent: top 3 closest to adjusted_time_vs_par == 1.0, excluding par racer
        consistent_eligible = [r for r in racers
                                if not r.is_fresh_racer and not r.is_outlier
                                and not r.is_par_racer and not small_group
                                and r.time_versus_par > 0]
        consistent_eligible.sort(key=lambda x: abs(x.adjusted_time_versus_par - 1.0))
        for i, r in enumerate(consistent_eligible[:3]):
            r.trophies.append(consistent_awards[i])
        for r in racers:
            if r.original_place in finish_podium:
                r.trophies.append(finish_podium[r.original_place])
            if r.is_par_racer:
                r.trophies.append("par")

        # Streaks — consecutive races with improving adjusted_time_vs_par
        for r in racers:
            key = (r.canonical_name, r.craft_category)
            rec = running[key]
            if not r.is_fresh_racer and not r.is_outlier and not small_group and r.adjusted_time_versus_par > 0:
                if rec.last_atvp > 0 and r.adjusted_time_versus_par < rec.last_atvp:
                    r_streak = rec.streak + 1
                else:
                    r_streak = 1
                if r_streak >= 3:
                    r.trophies.append(f"streak_{r_streak}")
            else:
                r_streak = 0
            # store streak on racer for saving to running record
            r._streak = r_streak
            r._atvp_for_streak = r.adjusted_time_versus_par if not r.is_outlier and not small_group else rec.last_atvp

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
                last_atvp=getattr(r, '_atvp_for_streak', 0.0),
                streak=getattr(r, '_streak', 0),
            )

    return races
