# Task: Port Domain Model

## Description
Port the normalized data model from the prototype to the `core` module. This is the shared data representation used by all other modules.

## Background
The prototype has a working domain model in `domainModel/`. Key classes:
- `CommonRaceInfo` — race metadata (id, name, date, series)
- `CommonRacerResult` — one racer's result in one race (name, category, elapsed time, handicap fields)
- `CommonRaceResult` — a full race (info + list of racer results)
- `RacerResultKey` — composite key (canonicalName + craftCategory)
- `RunningHandicapRecord` — running state per racer across races

Source: `~/workplace/mliddellGenAI/src/MliddellGenAI/racingAnalytics/src/main/java/com/example/domainModel/`

## Technical Requirements
1. Package: `com.bepc.racing.model`
2. All fields serializable to/from JSON via Jackson
3. `CommonRacerResult` must include all handicap fields: startHC, resultHC_raw, resultHC, nextHC, correctedTime, adjustedPlace, points, handicapPoints, freshRacer, outlier, handicapNote
4. `RacerResultKey` as a record or value object (immutable)
5. `RunningHandicapRecord` as a record (immutable)
6. No business logic in model classes — pure data

## Dependencies
- Task 01 (maven scaffold) complete
- Jackson databind

## Implementation Approach
1. Copy and adapt classes from prototype
2. Rename package to `com.bepc.racing.model`
3. Rename fields to use BEPC terminology (startHC, resultHC_raw, resultHC, nextHC)
4. Add Jackson annotations where needed
5. Keep prototype field names as comments for traceability

## Acceptance Criteria

1. **JSON round-trip**
   - Given a `CommonRaceResult` object
   - When serialized to JSON and deserialized back
   - Then all fields are preserved exactly

2. **Terminology correct**
   - Given the model classes
   - When inspecting field names
   - Then startHC, resultHC_raw, resultHC, nextHC are used (not AHC/BCH/CBCH/CHC)

3. **Unit tests pass**
   - Given sample race JSON from `results/common/`
   - When deserialized into `CommonRaceResult`
   - Then all fields parse correctly with no exceptions

## Metadata
- **Complexity**: Low
- **Labels**: model, java, core
- **Required Skills**: Java, Jackson
