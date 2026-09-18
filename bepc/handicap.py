import math
from .models import RacerResult


OUTLIER_RESET_STREAK = 3  # consecutive outliers that trigger auto-reset

# WinPoints — "beat a higher-ranked racer in a close contest" trophy.
# A racer earns a win against an opponent when:
#   - the opponent's handicap is a real underdog gap below the racer's own —
#     measured as an ABSOLUTE difference (WIN_HANDICAP_GAP_ABS), guarded by a
#     minimum RELATIVE difference (WIN_HANDICAP_GAP_REL) so a fixed absolute
#     gap doesn't trivially trigger at the high end of the handicap range
#     (e.g. 2.49 vs 2.48 is a 0.01 absolute gap but only ~0.4% relative —
#     not a meaningful skill difference at that scale). Both conditions must
#     hold. Absolute (not ratio-of-handicaps) is deliberate: handicap is
#     already "percent slower than par" (handicap - 1.0), so an absolute
#     difference between two handicaps is directly comparable regardless of
#     where on the scale they sit — a ratio-of-raw-handicaps check instead
#     makes the same nominal gap look bigger for fast racers (low handicaps)
#     than slow ones (high handicaps) for no real reason.
#   - the racer's raw-time margin of victory is no more than WIN_MAX_MARGIN of
#     the opponent's time (a close, genuinely-contested finish — not a case
#     where the racer just happened to finish somewhere near a struggling
#     opponent).
# Net score = wins - losses (losses computed the same way, mirrored). Only
# wins are ever displayed; losses exist solely to rank who had the most
# decisive day for cases with both wins and losses.
WIN_HANDICAP_GAP_ABS = 0.01
WIN_HANDICAP_GAP_REL = 0.001
WIN_MAX_MARGIN = 0.02
WIN_DISPLAY_FLOOR = 5  # minimum number of win-trophy slots per race/course
WIN_DISPLAY_PCT = 0.05  # slots scale up beyond the floor at this rate for large fields


def _handicap_gap_qualifies(worse: float, better: float) -> bool:
    """True if `worse` (higher handicap, i.e. rated slower) is far enough
    above `better` to count as a real underdog gap — both an absolute and a
    relative difference must clear their respective floors."""
    diff = worse - better
    if diff < WIN_HANDICAP_GAP_ABS:
        return False
    return (diff / better) >= WIN_HANDICAP_GAP_REL


def compute_win_trophies(racers: list[RacerResult]) -> None:
    """Compute the WinPoints trophy (win_double / win_single) for one race's
    course. Mutates racer.trophies and racer.win_beats in place for the
    winners selected; does not touch any other racer.

    Comparable pool excludes fresh racers, outliers, and auto-reset racers —
    their handicap going into this race (or the race itself) isn't a
    trustworthy basis for a head-to-head comparison. See handicap.py module
    docstring / compute_new_handicap for what each of those states means.
    """
    pool = [r for r in racers
            if not r.is_fresh_racer and not r.is_outlier and "auto_reset" not in r.trophies]
    if len(pool) < 2:
        return

    scored = []  # (racer, net, beaten_names)
    for a in pool:
        beaten = []
        losses = 0
        for b in pool:
            if a is b:
                continue
            a_beats_b = a.time_seconds < b.time_seconds
            if a_beats_b and _handicap_gap_qualifies(a.handicap, b.handicap):
                margin = (b.time_seconds - a.time_seconds) / b.time_seconds
                if margin <= WIN_MAX_MARGIN:
                    beaten.append(b.canonical_name)
            b_beats_a = b.time_seconds < a.time_seconds
            if b_beats_a and _handicap_gap_qualifies(b.handicap, a.handicap):
                margin = (a.time_seconds - b.time_seconds) / a.time_seconds
                if margin <= WIN_MAX_MARGIN:
                    losses += 1
        net = len(beaten) - losses
        if net > 0:
            scored.append((a, net, beaten))

    if not scored:
        return

    scored.sort(key=lambda t: -t[1])
    cap = max(WIN_DISPLAY_FLOOR, math.ceil(len(pool) * WIN_DISPLAY_PCT))
    shown = scored[:cap]

    # DoubleUp only goes to racer(s) tied for the single highest net score,
    # and only when that top score is a genuine standout — i.e. strictly
    # greater than the next-highest distinct score among the shown racers.
    # If everyone shown has the same net (no real leader), or there's only
    # one distinct score, nobody gets DoubleUp — they all get single Up.
    distinct_nets = sorted({net for _, net, _ in shown}, reverse=True)
    top_net = distinct_nets[0]
    has_standout_leader = len(distinct_nets) >= 2 and top_net > distinct_nets[1]

    for racer, net, beaten in shown:
        is_double = has_standout_leader and net == top_net
        racer.trophies.append("win_double" if is_double else "win_single")
        racer.win_beats = beaten


def calculate_par_racer(racers: list[RacerResult]) -> tuple[RacerResult | None, set[tuple]]:
    """Par racer at ~33rd percentile by adjusted time.

    Prefers established-only racers when there are enough (≥6). Otherwise falls
    back to the full field — this lets young series and small events still
    produce a par estimate.

    Returns (par_racer, included_keys) where included_keys is the set of
    (canonical_name, craft_category) tuples for racers whose adjusted_time
    estimates contributed to par selection. Returns (None, set()) if fewer
    than 10 racers total (field too small for par at all).
    """
    if len(racers) < 10:
        return None, set()
    established = [r for r in racers if not r.is_fresh_racer]
    pool = established if len(established) >= 6 else racers
    sorted_by_adj = sorted(pool, key=lambda r: r.adjusted_time_seconds)
    par = sorted_by_adj[len(sorted_by_adj) // 3]
    included = {(r.canonical_name, r.craft_category) for r in pool}
    return par, included


def compute_new_handicap(racer: RacerResult, par_time: float,
                         num_races_to_establish: int = 3) -> None:
    """Compute and set handicap_post, is_fresh_racer, is_outlier, handicap_note on racer.

    Establishment: a racer is established once they have completed
    num_races_to_establish ranked races (races where a handicap decision was
    made — excluding small-group and ineligible-course races). Carried-over
    racers are established immediately.

    Fresh-racer update schedule (races 1, 2, 3):
        Race 1: handicap = tvp                              (100% — all we know; eliminates seed bias)
        Race 2: handicap = 0.2 * prev + 0.8 * tvp           (80% — weight recent higher)
        Race 3: handicap = 0.4 * prev + 0.6 * tvp           (60% — weight recent higher)

    Effective weights on (tvp₁, tvp₂, tvp₃) = (0.08, 0.32, 0.60). Chosen to reduce
    the transient bias when racers improve over their first 3 races (empirically
    ~30% of racers showed >5% high bias under equal weighting, consistent with
    a ~5-10% per-race improvement during establishment).

    No outlier check applies during establishment.

    Established racer update:
        atvp > 1.10  → outlier (handicap frozen). After OUTLIER_RESET_STREAK
                       consecutive outliers, auto-reset to mean tvp of those
                       outlier races and clear streak.
        atvp ≤ 1.00  → faster than expected, 30% update
        atvp ∈ (1.00, 1.10] → slightly slower, 15% update

    Requires racer.num_ranked_races_pre (ranked-race count BEFORE this race) and
    racer.outlier_streak_pre / racer.outlier_tvp_window_pre to be set by caller.
    """
    existing = racer.handicap
    tvp = racer.time_versus_par
    atvp = racer.adjusted_time_versus_par

    n_ranked_pre = racer.num_ranked_races_pre  # count before this race (cross-season)
    n_ranked_post = n_ranked_pre + 1           # including this race (which is a ranked race)

    # Established once cumulative ranked races ≥ num_races_to_establish.
    # Carryover preserves the ranked count so establishment continues across seasons.
    eligible = n_ranked_pre >= num_races_to_establish
    racer.is_fresh_racer = not eligible

    if not eligible:
        # Establishment window — no outlier check; update schedule depends on which
        # ranked race this is (1, 2, 3, ...)
        which = n_ranked_post  # 1-indexed ranked-race number
        if which == 1:
            racer.handicap_post = tvp  # 100%
            rate_label = "100%"
        elif which == 2:
            racer.handicap_post = existing * 0.2 + tvp * 0.8
            rate_label = "80%"
        else:
            # Third or later fresh race — 60% weight on new race.
            # Combined with race 2's 80%, final effective weights on
            # (tvp₁, tvp₂, tvp₃) are (0.08, 0.32, 0.60).
            racer.handicap_post = existing * 0.4 + tvp * 0.6
            rate_label = "60%"
        racer.handicap_note = (
            f"Ranked race {which} of {num_races_to_establish} (fresh, {rate_label} adjustment)."
        )
        # Reset outlier tracking while fresh — no outliers apply.
        racer.outlier_streak_post = 0
        racer.outlier_tvp_window_post = []
        return

    # Established racer — apply normal rules.
    if atvp > 1.1:
        # Outlier: increment streak and check for auto-reset.
        new_streak = racer.outlier_streak_pre + 1
        new_window = (racer.outlier_tvp_window_pre + [tvp])[-OUTLIER_RESET_STREAK:]

        if new_streak >= OUTLIER_RESET_STREAK:
            # Auto-reset: hard set to mean of the last N outlier tvps.
            reset_value = sum(new_window) / len(new_window)
            racer.handicap_post = reset_value
            racer.is_outlier = False  # no longer suppressed — actively reset
            racer.handicap_note = (
                f"Auto-reset after {OUTLIER_RESET_STREAK} consecutive outliers. "
                f"Handicap set to mean tvp of those races = {reset_value:.3f}."
            )
            racer.trophies.append("auto_reset")
            # Clear streak so the next race starts fresh.
            racer.outlier_streak_post = 0
            racer.outlier_tvp_window_post = []
        else:
            racer.handicap_post = existing
            racer.is_outlier = True
            racer.handicap_note = (
                f"Outlier (>10% slower than predicted). No change. "
                f"Streak {new_streak}/{OUTLIER_RESET_STREAK}."
            )
            racer.outlier_streak_post = new_streak
            racer.outlier_tvp_window_post = new_window
    elif atvp <= 1.0:
        # Faster than expected — always update, clear outlier streak
        racer.handicap_post = existing * 0.7 + tvp * 0.3
        racer.handicap_note = "Faster than expected. Handicap adjusted 30% towards result."
        racer.outlier_streak_post = 0
        racer.outlier_tvp_window_post = []
    else:
        # Slower than predicted but within threshold — normal 15% update
        racer.handicap_post = existing * 0.85 + tvp * 0.15
        racer.handicap_note = "Slower than predicted. Handicap adjusted 15% towards result."
        racer.outlier_streak_post = 0
        racer.outlier_tvp_window_post = []


def std_dev(values: list[float]) -> float:
    if not values:
        return 0.0
    mean = sum(values) / len(values)
    return math.sqrt(sum((v - mean) ** 2 for v in values) / len(values))
