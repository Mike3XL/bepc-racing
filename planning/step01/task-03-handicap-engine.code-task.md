# Task: Handicap Engine with Parameter Sets

## Description
Port and refactor the handicap calculation engine from `Analysis.java` to support config-driven parameter sets. Each Race Series folder has an `AnalysisConfig.json` specifying which parameter set to use.

## Background
The prototype `Analysis.java` has a single hardcoded parameter set (BEPC #1). The new engine must support pluggable parameter sets so different series folders can use different configurations for comparison.

Two initial named parameter sets (from SPEC.md):
- **TopYacht Standard**: 45% mark boat, ±4% clamp, ±6% ignore, EWMA gain=3
- **BEPC #1**: 33% mark boat, no clamp, ±10% outlier, asymmetric update (30%/15%)

Source: `~/workplace/mliddellGenAI/src/MliddellGenAI/racingAnalytics/src/main/java/com/example/Analysis.java`

## Technical Requirements
1. Package: `com.bepc.racing.engine`
2. `HandicapParameters` — immutable config with all tunable values:
   - markBoatPercentile (double)
   - clampPercent (double, 0 = disabled)
   - ignorePercent (double)
   - updateMethod (enum: EWMA, ASYMMETRIC)
   - ewmaGain (double, used when method=EWMA)
   - fasterWeight / slowerWeight (doubles, used when method=ASYMMETRIC)
3. `AnalysisConfig` — loaded from `AnalysisConfig.json`:
   - seriesName
   - parameterSet (named string or inline HandicapParameters)
   - seasonStartRaceId (races before this are warmup only — excluded from standings/points)
   - corrections list
4. `HandicapEngine` — processes list of `CommonRaceResult` in chronological order using given `HandicapParameters`
5. `ParameterSets` — static factory: `TOPYACHT_STANDARD`, `BEPC_1`
6. `SeriesAnalysis` — loads a series folder, applies corrections, runs HandicapEngine, returns annotated results

## Dependencies
- Task 02 (domain model) complete

## Implementation Approach
1. Extract `HandicapParameters` from hardcoded values in `Analysis.java`
2. Refactor `Analysis.java` → `HandicapEngine`
3. Implement EWMA and ASYMMETRIC update methods
4. Add `AnalysisConfig` with JSON deserialization
5. Add `SeriesAnalysis` as the main entry point

## Acceptance Criteria

1. **TopYacht produces correct mark boat**
   - Given a race with 20 racers
   - When processed with TopYacht parameters
   - Then mark boat is at the 45th percentile of corrected-time ranking

2. **BEPC #1 matches prototype output**
   - Given the 2025 BEPC race data
   - When processed with BEPC #1 parameters
   - Then nextHC values match prototype output within 0.0001

3. **Season start respected**
   - Given a series with seasonStartRaceId set to race 5
   - When analysis runs
   - Then races 1-4 contribute to running handicap state but have zero season points

4. **Clamping works**
   - Given a racer with resultHC_raw 8% above startHC
   - When processed with TopYacht parameters (±4% clamp, ±6% ignore)
   - Then resultHC is clamped to startHC × 1.04

5. **Unit tests pass for all update methods**
   - Given known input values
   - When each update method is applied
   - Then output matches hand-calculated expected values

## Metadata
- **Complexity**: High
- **Labels**: engine, handicap, java, core
- **Required Skills**: Java, algorithm implementation
