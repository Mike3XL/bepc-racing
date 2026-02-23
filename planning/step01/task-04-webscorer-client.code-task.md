# Task: WebScorer Client and Result Normalization

## Description
Port the WebScorer API client and result normalization pipeline to the `core` module. This is the data ingestion layer that converts raw WebScorer JSON into the common format.

## Background
The prototype has a working WebScorer client and normalization logic. The common format (`.common.json`) is already defined and used by the handicap engine.

Source:
- `~/workplace/mliddellGenAI/src/MliddellGenAI/racingAnalytics/src/main/java/com/example/resultProvider/`
- `~/workplace/mliddellGenAI/src/MliddellGenAI/racingAnalytics/src/main/java/com/example/database/CorrectionsDatabase.java`

## Technical Requirements
1. Package: `com.bepc.racing.provider`
2. `ResultProvider` interface: `CommonRaceResult fetch(String raceId)`
3. `WebScorerClient` implements `ResultProvider` — fetches raw JSON from WebScorer API
4. `RaceNormalizer` — converts raw WebScorer JSON → `CommonRaceResult`
5. `CorrectionsDatabase` — loads corrections from JSON file, applies field overrides during normalization
6. Corrections support: racer name, boat category, finish time, DNF flag
7. Raw JSON saved to `results/raw/`, normalized JSON saved to `results/common/`
8. File naming convention: `YYYY-MM-DD__<raceId>__<raceName>.<raw|common>.json`

## Dependencies
- Task 02 (domain model) complete
- WebScorer API endpoint (from prototype)

## Implementation Approach
1. Port `ResultProvider` interface and `WebScorerClient`
2. Port normalization logic from prototype
3. Port `CorrectionsDatabase` with field-level override support
4. Add file I/O for saving raw and common results

## Acceptance Criteria

1. **Fetch and normalize**
   - Given a valid WebScorer race ID
   - When `WebScorerClient.fetch()` is called
   - Then a `CommonRaceResult` is returned with all racers parsed

2. **Corrections applied**
   - Given a corrections entry overriding a racer's name
   - When normalization runs
   - Then the corrected name appears in the `CommonRaceResult`

3. **Files saved correctly**
   - Given a successful fetch
   - When results are saved
   - Then raw and common JSON files exist with correct naming convention

4. **Unit tests pass**
   - Given sample raw JSON from `results/raw/`
   - When normalized
   - Then output matches corresponding `results/common/` file

## Metadata
- **Complexity**: Medium
- **Labels**: provider, webscorer, java, core
- **Required Skills**: Java, HTTP client, JSON
