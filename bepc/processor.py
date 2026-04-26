from .models import RaceResult, RunningRecord
from .handicap import calculate_par_racer, compute_new_handicap, std_dev
from .points import race_points, handicap_points


def process_season(races: list[RaceResult], carry_over: dict | None = None,
                   num_races_to_establish: int = 1) -> list[RaceResult]:
    """Process races in order, computing handicaps and points. Returns enriched races."""
    running: dict[tuple, RunningRecord] = {}
    if carry_over:
        for key, val in carry_over.items():
            # val is either a float (legacy) or (handicap, carried_over_flag)
            if isinstance(val, tuple):
                hcap, carried = val
            else:
                hcap, carried = val, True
            # Seed num_races at num_races_to_establish so carried-over racers are immediately established
            running[key] = RunningRecord(handicap=hcap, carried_over=carried,
                                         num_races=0,
                                         streak=0, last_atvp=0.0)  # reset streak at season start

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
            r.carried_over = rec.carried_over
            r.season_points = rec.season_points
            r.season_handicap_points = rec.season_handicap_points

        # Compute adjusted times
        for r in racers:
            r.adjusted_time_seconds = r.time_seconds / r.handicap

        # Compute adjusted places (all racers, for display)
        for i, r in enumerate(sorted(racers, key=lambda x: x.adjusted_time_seconds), 1):
            r.adjusted_place = i

        # Par racer — None if too few racers
        par = calculate_par_racer(racers)
        small_group = par is None

        # Eligibility (series-aware): primary course → >5 established OR >10 total;
        # secondary → >5 established. Non-eligible courses skip handicap updates and
        # don't produce corrected/indexed rankings.
        is_primary = getattr(race.race_info, "is_primary", True)
        n_established = sum(1 for r in racers if r.handicap != 1.0)
        n_total = len(racers)
        eligible_course = ((n_established > 5) or (n_total > 10)) if is_primary else (n_established > 5)

        # Non-eligible courses behave like small_group for handicap purposes.
        skip_handicap_update = small_group or not eligible_course

        if not skip_handicap_update:
            par.is_par_racer = True
            par_time = par.adjusted_time_seconds

            # Time versus par
            for r in racers:
                r.time_versus_par = r.time_seconds / par_time
                r.adjusted_time_versus_par = r.adjusted_time_seconds / par_time

            # New handicap
            for r in racers:
                compute_new_handicap(r, par_time, num_races_to_establish=num_races_to_establish)
        else:
            # Not eligible (small group or series-eligibility rule): no handicap update.
            reason = f"Small group ({len(racers)} racers)" if small_group else \
                     f"Course not eligible (primary={is_primary}, established={n_established}, total={n_total})"
            for r in racers:
                r.time_versus_par = 0.0
                r.adjusted_time_versus_par = 0.0
                r.handicap_post = r.handicap
                if r.num_races <= num_races_to_establish:
                    r.is_fresh_racer = True
                r.handicap_note = f"{reason} — no handicap update"

        # Eligible adjusted place (among non-fresh, non-outlier racers only, for points)
        eligible_sorted = [r for r in sorted(racers, key=lambda x: x.adjusted_time_seconds)
                           if not r.is_fresh_racer and not r.is_outlier]
        for i, r in enumerate(eligible_sorted, 1):
            r.eligible_adjusted_place = i

        # Points (scaled by weight)
        for r in racers:
            r.race_points = race_points(r.original_place, w)
            r.handicap_points = handicap_points(r, w) if not skip_handicap_update else 0
            r.season_points += r.race_points
            r.season_handicap_points += r.handicap_points

        # Handicap sequences
        for r in racers:
            key = (r.canonical_name, r.craft_category)
            r.handicap_sequence = running[key].handicap_sequence + [r.handicap_post]
            r.handicap_points_sequence = running[key].handicap_points_sequence + [r.handicap_points]
            r.handicap_std_dev = std_dev(r.handicap_sequence)

        # Trophies
        MIN_ELIGIBLE = 3
        finish_podium = {1: "finish_1", 2: "finish_2", 3: "finish_3"}
        hcap_podium = ["hcap_1", "hcap_2", "hcap_3"]
        consistent_awards = ["consistent_1", "consistent_2", "consistent_3"]
        for r in racers:
            r.trophies = []
        eligible = [r for r in sorted(racers, key=lambda x: x.adjusted_place)
                    if not r.is_fresh_racer and not skip_handicap_update]
        if len(eligible) >= MIN_ELIGIBLE:
            for i, r in enumerate(eligible[:3]):
                r.trophies.append(hcap_podium[i])
        # Consistent: top 3 eligible racers within ±1% of adjusted_time_vs_par == 1.0
        consistent_eligible = [r for r in racers
                                if not r.is_fresh_racer and not r.is_outlier
                                and not skip_handicap_update
                                and r.time_versus_par > 0
                                and abs(r.adjusted_time_versus_par - 1.0) <= 0.01]
        consistent_eligible.sort(key=lambda x: abs(x.adjusted_time_versus_par - 1.0))
        for i, r in enumerate(consistent_eligible[:3]):
            r.trophies.append(consistent_awards[i])
        for r in racers:
            if r.is_fresh_racer:
                r.trophies.append("fresh")
            if r.is_outlier:
                r.trophies.append("outlier")
            if r.original_place in finish_podium:
                r.trophies.append(finish_podium[r.original_place])
            if r.is_par_racer:
                r.trophies.append("par")

        # Streaks — consecutive races beating par (adjusted_time_versus_par < 1.0)
        streak_state: dict[tuple, tuple[int, float]] = {}  # key -> (streak, last_atvp)
        for r in racers:
            key = (r.canonical_name, r.craft_category)
            rec = running[key]
            if not r.is_fresh_racer and not r.is_outlier and not skip_handicap_update and r.adjusted_time_versus_par < 1.0:
                r_streak = rec.streak + 1
                if r_streak >= 3:
                    r.trophies.append(f"streak_{r_streak}")
                new_atvp = r.adjusted_time_versus_par
            else:
                r_streak = 0
                new_atvp = rec.last_atvp
            streak_state[key] = (r_streak, new_atvp)

        # Save running state
        for r in racers:
            key = (r.canonical_name, r.craft_category)
            r_streak, new_atvp = streak_state.get(key, (0, 0.0))
            running[key] = RunningRecord(
                num_races=r.num_races,
                handicap=r.handicap_post,
                carried_over=False,  # once raced this season, no longer "just carried over"
                season_points=r.season_points,
                season_handicap_points=r.season_handicap_points,
                handicap_sequence=r.handicap_sequence,
                handicap_points_sequence=r.handicap_points_sequence,
                handicap_std_dev=r.handicap_std_dev,
                last_atvp=new_atvp,
                streak=r_streak,
            )

    return races
