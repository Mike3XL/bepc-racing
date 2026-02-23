# Task: Handicap Engine with Parameter Sets

## Description
Port and refactor the handicap calculation engine from `Analysis.java` to support multiple named parameter sets running in parallel on the same race data.

## Background
The prototype `Analysis.java` has a single hardcoded parameter set (BEPC #1). The new engine must support pluggable parameter sets so results from different configurations can be compared.

Two initial parameter sets (from SPEC.md):
- **TopYacht Standard**: 45% mark boat, ±4% clamp, ±6% ignore, EWMA gain=3
- **BEPC #1**: 33% mark boat, no clamp, ±10% outlier, asymmetric update (30%/15%)

Source: `~/workplace/mliddellGenAI/src/MliddellGenAI/racingAnalytics/src/main/java/com/example/Analysis.java`

## Technical Requirements
1. Package: `com.bepc.racing.engine`
2. `HandicapParameters` — immutable config object with all tunable values:
   - markBoatPercentile (double)
   - clampPercent (double, 0 = disabled)
   - ignorePercent (double)
   - updateMethod (enum: EWMA, ASYMMETRIC)
   - ewmaGain (double, used when method=EWMA)
   - fasterWeight / slowerWeight (doubles, used when method=ASYMMETRIC)
3. `HandicapEngine` — processes a list of `CommonRaceResult` in order, returns results annotated with all handicap fields
4. `HandicapEngine` takes a `HandicapParameters` at construction
5. `ParameterSets` — static factory with named sets: `TOPYACHT_STANDARD`, `BEPC_1`
6. `HandicapAnalysis` — runs multiple engines in parallel, returns results keyed by parameter set name

## Dependencies
- Task 02 (domain model) complete

## Implementation Approach
1. Extract `HandicapParameters` from hardcoded values in `Analysis.java`
2. Refactor `Analysis.java` → `HandicapEngine` using parameters
3. Implement both update methods (EWMA and ASYMMETRIC) as strategies
4. Add `ParameterSets` with the two named configs
5. Add `HandicapAnalysis` wrapper

## Acceptance Criteria

1. **TopYacht produces correct mark boat**
   - Given a race with 20 racers
   - When processed with TopYacht parameters
   - Then mark boat is at the 45th percentile of corrected-time ranking

2. **BEPC #1 matches prototype output**
   - Given the 2025 BEPC race data
   - When processed with BEPC #1 parameters
   - Then nextHC values match the prototype's output within 0.0001

3. **Parallel execution**
   - Given the same race list
   - When run through HandicapAnalysis with both parameter sets
   - Then results for both sets are returned independently

4. **Clamping works**
   - Given a racer with a BCH 8% above their startHC
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
