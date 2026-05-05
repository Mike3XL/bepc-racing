from .models import RaceResult, RunningRecord
from .handicap import calculate_par_racer, compute_new_handicap, std_dev
from .points import race_points, handicap_points


def process_season(races: list[RaceResult], carry_over: dict | None = None,
                   num_races_to_establish: int = 3) -> list[RaceResult]:
    """Process races in order, computing handicaps and points. Returns enriched races."""
    running: dict[tuple, RunningRecord] = {}
    if carry_over:
        for key, val in carry_over.items():
            # val can be:
            #   float (legacy — handicap only)
            #   (handicap, carried_over_flag) — legacy
            #   dict with handicap/carried_over/outlier_streak/outlier_tvp_window/num_ranked_races
            if isinstance(val, dict):
                hcap = val.get("handicap", 1.0)
                carried = val.get("carried_over", True)
                outlier_streak = val.get("outlier_streak", 0)
                outlier_window = list(val.get("outlier_tvp_window", []))
                prior_ranked = val.get("num_ranked_races", 0)
            elif isinstance(val, tuple):
                hcap, carried = val
                outlier_streak = 0
                outlier_window = []
                prior_ranked = 0
            else:
                hcap, carried = val, True
                outlier_streak = 0
                outlier_window = []
                prior_ranked = 0
            # Carryover preserves prior ranked-race count so establishment continues
            # seamlessly across seasons — a racer with only 1 prior ranked race still
            # has 2 more fresh-window races before being established.
            running[key] = RunningRecord(handicap=hcap, carried_over=carried,
                                         num_races=0, num_ranked_races=prior_ranked,
                                         streak=0, last_atvp=0.0,
                                         outlier_streak=outlier_streak,
                                         outlier_tvp_window=outlier_window)

    for race in races:
        racers = race.racer_results
        w = race.race_info.points_weight

        # Initialize new racers
        for r in racers:
            key = (r.canonical_name, r.craft_category)
            if key not in running:
                running[key] = RunningRecord()

        # Apply running state (pre-race)
        for r in racers:
            key = (r.canonical_name, r.craft_category)
            rec = running[key]
            r.num_races = rec.num_races + 1
            r.num_ranked_races_pre = rec.num_ranked_races
            r.handicap = rec.handicap
            r.carried_over = rec.carried_over
            r.season_points = rec.season_points
            r.season_handicap_points = rec.season_handicap_points
            r.outlier_streak_pre = rec.outlier_streak
            r.outlier_tvp_window_pre = list(rec.outlier_tvp_window)
            # Pre-race established flag: established only when cumulative ranked
            # races (across seasons, via carryover) ≥ num_races_to_establish.
            # Carryover no longer implies establishment by itself — only when
            # enough ranked races have accumulated.
            is_incoming_established = rec.num_ranked_races >= num_races_to_establish
            r.is_fresh_racer = not is_incoming_established

        # Compute adjusted times
        for r in racers:
            r.adjusted_time_seconds = r.time_seconds / r.handicap

        # Compute adjusted places (all racers, for display)
        for i, r in enumerate(sorted(racers, key=lambda x: x.adjusted_time_seconds), 1):
            r.adjusted_place = i

        # Par racer — prefers established-only when ≥6 established, else falls back to all.
        par, par_included = calculate_par_racer(racers)
        small_group = par is None
        for r in racers:
            r.included_in_par = (r.canonical_name, r.craft_category) in par_included

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
                r.handicap_note = f"{reason} — no handicap update"
                # Preserve outlier streak across non-ranked races.
                r.outlier_streak_post = r.outlier_streak_pre
                r.outlier_tvp_window_post = list(r.outlier_tvp_window_pre)

        # Eligible adjusted place (among non-fresh, non-outlier racers only, for points)
        eligible_sorted = [r for r in sorted(racers, key=lambda x: x.adjusted_time_seconds)
                           if not r.is_fresh_racer and not r.is_outlier]
        for i, r in enumerate(eligible_sorted, 1):
            r.eligible_adjusted_place = i

        # Points (scaled by weight)
        # Auto-reset races: racer is no longer "is_outlier" but no handicap points are awarded
        # for the reset race itself (it's a corrective event, not a valid comparison).
        for r in racers:
            r.race_points = race_points(r.original_place, w)
            if skip_handicap_update:
                r.handicap_points = 0
            elif "auto_reset" in r.trophies:
                r.handicap_points = 0
            else:
                r.handicap_points = handicap_points(r, w)
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
        # Note: trophies list is already populated for auto_reset during compute_new_handicap.
        # Preserve it — don't clear.
        eligible = [r for r in sorted(racers, key=lambda x: x.adjusted_place)
                    if not r.is_fresh_racer and not skip_handicap_update
                    and "auto_reset" not in r.trophies]
        if len(eligible) >= MIN_ELIGIBLE:
            for i, r in enumerate(eligible[:3]):
                r.trophies.append(hcap_podium[i])
        # Consistent: top 3 eligible racers within ±1% of adjusted_time_vs_par == 1.0
        consistent_eligible = [r for r in racers
                                if not r.is_fresh_racer and not r.is_outlier
                                and not skip_handicap_update
                                and "auto_reset" not in r.trophies
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
            # num_ranked_races increments only when a handicap decision was made.
            new_ranked = running[key].num_ranked_races + (0 if skip_handicap_update else 1)
            running[key] = RunningRecord(
                num_races=r.num_races,
                num_ranked_races=new_ranked,
                handicap=r.handicap_post,
                carried_over=r.carried_over,  # preserve established status across all races of the season
                season_points=r.season_points,
                season_handicap_points=r.season_handicap_points,
                handicap_sequence=r.handicap_sequence,
                handicap_points_sequence=r.handicap_points_sequence,
                handicap_std_dev=r.handicap_std_dev,
                last_atvp=new_atvp,
                streak=r_streak,
                outlier_streak=r.outlier_streak_post,
                outlier_tvp_window=list(r.outlier_tvp_window_post),
            )

    return races
