# BEPC Racing Analytics — Project Spec

## Overview

A system for Ballard Elks Paddle Club (BEPC) members to view race results, standings, and handicap calculations for the annual race series. Built on a working Java prototype that already handles WebScorer integration, data normalization, and handicap computation.

## Goals

1. **Website** — BEPC members can log in to view their results, series standings, and how their handicap was calculated
2. **Batch pipeline** — Automated processing each time new race results are published to WebScorer
3. **CLI tool** — Admin tool for uploading results, applying corrections, and evaluating handicaps

## Architecture

```
WebScorer API
     │
     ▼
[Batch Job / CLI]  ──→  S3 (raw + processed JSON)
                              │
                         [Lambda API]  ←──  [Cognito Auth]
                              │
                         [Static Site on S3/CloudFront]
                              │
                         BEPC Members (browser)
```

### Components

**1. Core Library (Java)**
- Ported/refactored from prototype
- WebScorer API client
- Data normalization (raw → common format)
- Handicap calculation engine
- Corrections database

**2. CLI Tool (Java)**
- `racing fetch <race-id>` — download race from WebScorer
- `racing process <race-id>` — normalize and compute handicaps
- `racing upload` — push processed data to S3
- `racing correct <racer> <race-id> <correction>` — apply manual correction
- `racing standings` — print current standings

**3. Batch Job (AWS Lambda or shell + cron)**
- Triggered manually or on schedule
- Fetches latest race from WebScorer
- Processes and uploads to S3

**4. REST API (AWS Lambda + API Gateway)**
- `GET /races` — list all races in series
- `GET /races/{id}` — results for a specific race
- `GET /racers` — list all racers
- `GET /racers/{name}` — racer profile, history, handicap breakdown
- `GET /standings` — current series standings
- Auth via Cognito JWT

**5. Static Website (S3 + CloudFront)**
- Login via Cognito hosted UI
- Pages: Standings, Race Results, My Profile, Handicap Explained
- Simple HTML/JS (no heavy framework needed at this scale)

**6. AWS Infrastructure (CDK or CloudFormation)**
- S3 buckets (data, website)
- CloudFront distribution
- Cognito user pool
- Lambda functions
- API Gateway
- IAM roles

## Data Model

### Race (from WebScorer, normalized)
```
raceId, raceName, raceDate, series, results[]
```

### RacerResult
```
racerName, category, distance, finishTime, place, dnf
```

### Handicap
```
racerName, category, baselineRacer, percentDifference, racesUsed, stdDev, predictedTime
```

### Correction
```
raceId, racerName, originalTime, correctedTime, reason
```

## Handicap Algorithm

The system implements the **TopYacht Time-on-Time** handicapping approach. The handicap is a Time Correction Factor (TCF/AHC) multiplied by elapsed time to produce a corrected time.

### Core Concepts

BEPC terminology with mapping to TopYacht source document:

| BEPC Term | TopYacht Term | Definition |
|---|---|---|
| **startHC** | AHC | Handicap assigned to a racer going into a race |
| **correctedTime** | Corrected Time | `elapsedTime × startHC` |
| **resultHC_raw** | BCH | `markCorrectedTime / elapsedTime` — handicap needed to tie the mark boat |
| **resultHC** | CBCH | resultHC_raw after clamping and outlier checks |
| **nextHC** | CHC | Computed handicap to be used in the next race |
| **markBoat** | Mark/Reference Boat | Racer at configured percentile of corrected-time ranking |

### Algorithm Steps (per race)

1. **Rank** racers by correctedTime
2. **Select markBoat** at configured percentile
3. **Compute resultHC_raw** for each racer: `resultHC_raw = markCorrectedTime / elapsedTime`
4. **Clamp → resultHC**: if resultHC_raw deviates from startHC by more than clamp%, substitute clamped value; if deviation exceeds ignore%, substitute startHC (outlier — no change)
5. **Compute nextHC** using configured update method
6. **Assign points**: top-N finishers by correctedTime earn points

### Parameter Sets

The system supports multiple named parameter sets run in parallel on the same data.

#### Set 1: TopYacht Standard
| Parameter | Value |
|---|---|
| Mark boat percentile | 45% |
| Clamp | ±4% of startHC |
| Ignore (outlier) | ±6% of startHC |
| Update method | Exponential (EWMA), gain=3: `nextHC = (1/3)×resultHC + (2/3)×startHC` |
| Fresh racer startup | `R1: nextHC = (3/N)×startHC + (1/N)×resultHC` (N=3) |

#### Set 2: BEPC #1 (current prototype)
| Parameter | Value |
|---|---|
| Mark boat percentile | 33% |
| Clamp | none |
| Ignore (outlier) | ±10% of adjusted time vs par |
| Update method | Asymmetric: faster→ `0.7×startHC + 0.3×resultHC`; slower→ `0.85×startHC + 0.15×resultHC` |
| Fresh racer startup | R1: set to timeVersusPar; R2: 50/50 blend |

### Design Notes
- All parameter sets are run on the same input data each time
- Results for each set are stored and displayed independently
- New parameter sets can be added without changing core logic
- Parameter sets are defined in configuration (not hardcoded)

## Implementation Plan

### Step 1 — Project scaffold & core library
- GitHub repo setup
- Maven project structure
- Port core domain model and handicap engine from prototype
- Unit tests

### Step 2 — CLI tool
- Port `RacingCLI.java` from prototype
- Add `upload` command (S3)
- Add `fetch` + `process` pipeline

### Step 3 — AWS infrastructure
- CDK project for S3, Cognito, API Gateway, Lambda
- Deploy skeleton

### Step 4 — REST API (Lambda)
- Implement API endpoints reading from S3
- Wire up Cognito auth

### Step 5 — Static website
- HTML/JS pages for standings, results, profile
- Cognito login flow

### Step 6 — Batch pipeline
- Lambda or scheduled job to auto-fetch + process new races

## Authentication

**v1:** No login required. All data is publicly readable.

**Future:** Cognito user pool for member accounts, enabling personalized views and integration with external systems (e.g. club membership, registration). API Gateway will be designed to support optional auth from the start so adding it later doesn't require restructuring.

**v1:** WebScorer API only.

**Corrections layer:** A corrections database sits between the raw source data and the normalized common format. It allows overriding specific fields (racer name, boat class, finish time, DNF status) without modifying the raw data. Corrections are applied during normalization.

**Future:** Additional result sources (e.g. manual entry, other timing systems) will be added as new `ResultProvider` implementations.

## Out of Scope (v1)
- Mobile app
- Email notifications
- Multi-club support
- Historical data beyond 2025 season
