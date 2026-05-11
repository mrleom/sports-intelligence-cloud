# Training Brief v1 Contract

## 1. Status

Proposed documentation contract.

This is not shipped runtime behavior yet. It defines a proposed `TrainingBrief v1` shape and proposed endpoint semantics for a future Club Vivo Training Prescription Layer.

## 2. Purpose

`TrainingBrief v1` is the structured bridge object between match or performance evidence and the Club Vivo Session Builder.

It translates coach observations, match evidence, performance context, and next-game objectives into a concise brief that can later drive Session Builder output.

## 3. Relationship To Training Prescription Layer

This contract supports `docs/product/club-vivo/training-prescription-layer.md`.

The Training Prescription Layer remains soccer/football/fútbol only. It extends the existing Session Builder direction and does not create a separate app, backend service, or tenancy path.

## 4. Proposed Endpoint

Proposed future endpoint:

- `POST /training-briefs`

This endpoint does not exist yet unless implemented later. The first MVP may also keep this behavior internal before exposing a public API route.

## 5. Request Shape

```json
{
  "sport": "soccer",
  "ageBand": "u14",
  "durationMinutes": 60,
  "playerCount": 12,
  "evidenceSummary": "We conceded twice after losing the ball in midfield and struggled to recover compactness.",
  "coachNotes": "Need a practical session for a low-budget grassroots team with limited space.",
  "nextGameObjective": "Improve defensive transition after possession loss",
  "availableEquipment": ["balls", "cones", "bibs"],
  "context": {
    "teamLevel": "grassroots",
    "space": "half-field",
    "methodologyTags": ["transition", "compactness"]
  }
}
```

## 6. Response Shape

```json
{
  "trainingBrief": {
    "briefId": "brief_123",
    "schemaVersion": 1,
    "sport": "soccer",
    "ageBand": "u14",
    "durationMinutes": 60,
    "playerCount": 12,
    "evidence": {},
    "objectiveRecommendation": {},
    "activityRecommendations": [],
    "createdAt": "2026-05-11T00:00:00.000Z",
    "createdBy": "user-sub-or-null"
  }
}
```

## 7. TrainingBrief Object

```json
{
  "briefId": "brief_123",
  "schemaVersion": 1,
  "sport": "soccer",
  "ageBand": "u14",
  "durationMinutes": 60,
  "playerCount": 12,
  "evidence": {
    "evidenceSummary": "We conceded twice after losing the ball in midfield.",
    "coachNotes": "Limited space and simple equipment.",
    "nextGameObjective": "Improve defensive transition after possession loss"
  },
  "objectiveRecommendation": {
    "recommendedFocus": "Defensive transition and compact recovery after possession loss",
    "objective": "Improve the team's first five seconds after losing the ball",
    "rationale": "The evidence points to delayed pressure and poor team compactness after turnovers."
  },
  "activityRecommendations": [
    {
      "activityId": "activity_1",
      "title": "Transition Rondo To Recover Shape",
      "activityType": "possession-transition",
      "durationMinutes": 20,
      "playerCount": 12,
      "coachingPoints": [
        "Nearest player pressures immediately",
        "Second defender covers central passing lane",
        "Team compresses space around the ball"
      ],
      "diagramSequenceRequirements": {
        "required": true,
        "reasonIfNotRequired": null,
        "sequenceType": "transition",
        "mustShow": ["ball loss", "first pressure", "cover", "compact recovery"]
      }
    }
  ],
  "createdAt": "2026-05-11T00:00:00.000Z",
  "createdBy": "user-sub-or-null"
}
```

## 8. Evidence Inputs

Evidence inputs are intentionally lightweight in v1.

Required MVP evidence:

- `evidenceSummary`

Optional evidence:

- `coachNotes`
- `nextGameObjective`
- `availableEquipment`
- `context.teamLevel`
- `context.space`
- `context.methodologyTags`

Manual coach notes are the first MVP input. Richer match, video, or performance data may be added later without requiring paid providers now.

## 9. Objective Recommendation

`objectiveRecommendation` should contain:

- `recommendedFocus`
- `objective`
- `rationale`

The recommendation should be specific enough to drive a Session Builder request, but it should remain editable by the coach.

## 10. Activity Recommendation

Each `activityRecommendation` should contain:

- `activityId`
- `title`
- `activityType`
- `durationMinutes`
- `playerCount`
- `coachingPoints`
- `diagramSequenceRequirements`

Activity recommendations should be practical for grassroots use first and should not assume expensive equipment or advanced tracking systems.

## 11. Diagram Sequence Requirements

Diagrams are represented as structured sequence requirements, not raw generated images.

```json
{
  "required": true,
  "reasonIfNotRequired": null,
  "sequenceType": "transition",
  "mustShow": ["ball loss", "first pressure", "cover", "compact recovery"],
  "preferredView": "top-down",
  "notes": "Show the team becoming compact around the ball after the turnover."
}
```

Main activities should prefer `required: true`. If no diagram is needed, `required` may be `false` only when `reasonIfNotRequired` is provided.

## 12. Validation Rules

Stable v1 validation rules:

- `sport` must be `soccer`.
- `ageBand` is required and must be a supported age-band string.
- `durationMinutes` is required and must be a positive integer.
- `playerCount` is required and must be a positive integer.
- `evidenceSummary` is required, must be a non-empty string, and should be concise enough for review.
- `objectiveRecommendation.recommendedFocus` is required in responses and must be a non-empty string.
- `objectiveRecommendation.objective` is required in responses and must be a non-empty string.
- `activityRecommendations` must be an array when present.
- `activityRecommendations[].diagramSequenceRequirements` is required for main recommended activities.
- `diagramSequenceRequirements.required` must be boolean.
- `diagramSequenceRequirements.reasonIfNotRequired` is required when `required` is `false`.
- `diagramSequenceRequirements.mustShow` must be a non-empty array when `required` is `true`.
- Client-supplied tenant identity fields such as `tenant_id`, `tenantId`, or `x-tenant-id` are rejected.

Total session duration is validated later by the Session Builder/session-pack contract, not by `TrainingBrief` alone.

## 13. Tenant And Auth Rules

Tenant scope is server-derived only.

Requests must not include:

- `tenant_id`
- `tenantId`
- `x-tenant-id`

Verified auth establishes user identity. Server-side entitlements establish tenant scope. Any future persistence must remain tenant-scoped by construction.

## 14. Error Semantics

Use the stable platform error envelope:

```json
{
  "error": {
    "code": "platform.bad_request",
    "message": "Bad request",
    "details": {}
  }
}
```

Suggested validation details:

```json
{
  "reason": "invalid_field",
  "field": "evidenceSummary"
}
```

Unsupported sport:

```json
{
  "reason": "unsupported_sport",
  "field": "sport",
  "value": "basketball"
}
```

Tenant identity supplied by client:

```json
{
  "reason": "tenant_identity_not_allowed",
  "unknown": ["tenantId"]
}
```

## 15. MVP Behavior

The MVP should:

- accept manual coach evidence first
- produce one recommended training focus
- produce one session objective
- recommend one to three activities
- include diagram sequence requirements for main activities
- hand off to Session Builder for full session generation, duration validation, save, review, and export flows

## 16. Future Extensions

Future extensions may include:

- match event summaries
- video-derived observations
- team trends
- player-group context
- methodology-aware recommendations
- prior-session feedback loops
- localization-ready labels
- richer diagram sequence data compatible with diagram rendering contracts

These are future directions, not current shipped behavior.

## 17. Example Request

```json
{
  "sport": "soccer",
  "ageBand": "u14",
  "durationMinutes": 60,
  "playerCount": 12,
  "evidenceSummary": "The team loses shape after turnovers and allows central counterattacks.",
  "coachNotes": "Grassroots group, half-field, cones, bibs, and balls only.",
  "nextGameObjective": "Be harder to counter through the middle",
  "availableEquipment": ["balls", "cones", "bibs"]
}
```

## 18. Example Response

```json
{
  "trainingBrief": {
    "briefId": "brief_123",
    "schemaVersion": 1,
    "sport": "soccer",
    "ageBand": "u14",
    "durationMinutes": 60,
    "playerCount": 12,
    "evidence": {
      "evidenceSummary": "The team loses shape after turnovers and allows central counterattacks.",
      "coachNotes": "Grassroots group, half-field, cones, bibs, and balls only.",
      "nextGameObjective": "Be harder to counter through the middle"
    },
    "objectiveRecommendation": {
      "recommendedFocus": "Central defensive transition after possession loss",
      "objective": "React quickly after losing the ball and recover compact central shape",
      "rationale": "The evidence points to central exposure immediately after turnovers."
    },
    "activityRecommendations": [
      {
        "activityId": "activity_1",
        "title": "Compact Recovery Transition Game",
        "activityType": "small-sided-transition",
        "durationMinutes": 20,
        "playerCount": 12,
        "coachingPoints": [
          "Nearest player pressures the ball",
          "Second player blocks the central lane",
          "Rest of team recovers narrow before expanding again"
        ],
        "diagramSequenceRequirements": {
          "required": true,
          "reasonIfNotRequired": null,
          "sequenceType": "transition",
          "mustShow": ["turnover", "first pressure", "central cover", "compact recovery"],
          "preferredView": "top-down"
        }
      }
    ],
    "createdAt": "2026-05-11T00:00:00.000Z",
    "createdBy": "user-sub-or-null"
  }
}
```

## 19. Source-Of-Truth Relationships

Read this contract with:

- `docs/product/club-vivo/training-prescription-layer.md`
- `docs/product/club-vivo/session-builder.md`
- `docs/api/session-builder-v1-contract.md`
- `docs/api/session-pack-contract-v2.md`
- `docs/api/diagram-rendering-contract-v1.md`
- `docs/architecture/architecture-principles.md`
- `docs/architecture/platform-constitution.md`
- `docs/architecture/tenant-claim-contract.md`

If this proposed contract conflicts with shipped source code or current platform source-of-truth docs, shipped source code and higher-order platform rules govern until an explicit implementation change is made.
