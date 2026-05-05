from dataclasses import dataclass, field


@dataclass
class RaceInfo:
    race_id: str
    name: str
    date: str
    display_url: str
    points_weight: float = 1.0
    distance: str = ""
    series: str = ""
    organizer: str = ""
    results_platform: str = ""
    tags: list = field(default_factory=list)
    is_primary: bool = True


@dataclass
class RacerResult:
    original_place: int
    canonical_name: str
    craft_category: str
    gender: str
    time_seconds: float

    # computed during processing
    handicap: float = 1.0
    adjusted_time_seconds: float = 0.0
    adjusted_place: int = 0
    eligible_adjusted_place: int = 0
    time_versus_par: float = 0.0
    adjusted_time_versus_par: float = 0.0
    handicap_post: float = 1.0
    num_races: int = 0
    race_points: int = 0
    handicap_points: int = 0
    season_points: int = 0
    season_handicap_points: int = 0
    handicap_sequence: list = field(default_factory=list)
    handicap_points_sequence: list = field(default_factory=list)
    handicap_std_dev: float = 0.0
    handicap_note: str = ""
    is_par_racer: bool = False
    is_fresh_racer: bool = False
    is_outlier: bool = False
    included_in_par: bool = False  # True if this racer's adjusted_time contributed to par calc
    carried_over: bool = False  # True if handicap was carried from previous season
    craft_specific: str = ""  # original craft string from source data
    trophies: list = field(default_factory=list)  # e.g. ["finish_1", "hcap_2", "par"]

    # Ranked-race tracking for establishment and outlier-reset.
    # "Ranked" = race where a handicap decision was made (not small-group / ineligible).
    num_ranked_races_pre: int = 0  # count of prior ranked races before this race
    outlier_streak_pre: int = 0  # consecutive outlier streak entering this race
    outlier_tvp_window_pre: list = field(default_factory=list)  # tvps of those outliers
    # Post-race state (set by compute_new_handicap) — used to seed running record
    outlier_streak_post: int = 0
    outlier_tvp_window_post: list = field(default_factory=list)


@dataclass
class RaceResult:
    race_info: RaceInfo
    racer_results: list[RacerResult]


@dataclass
class RunningRecord:
    num_races: int = 0
    num_ranked_races: int = 0  # ranked races only (handicap decision made)
    handicap: float = 1.0
    carried_over: bool = False  # True if seeded from previous season carry-over
    season_points: int = 0
    season_handicap_points: int = 0
    handicap_sequence: list = field(default_factory=list)
    handicap_points_sequence: list = field(default_factory=list)
    handicap_std_dev: float = 0.0
    last_atvp: float = 0.0
    streak: int = 0  # good-performance streak (consecutive races beating par)
    outlier_streak: int = 0  # consecutive outlier streak — persists across seasons
    outlier_tvp_window: list = field(default_factory=list)  # tvp values of the outlier streak
