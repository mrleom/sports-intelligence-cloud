# DiagramSequence v1 Spec

## 1. Status

Proposed architecture specification.

This is a documentation/specification file only. It does not describe shipped runtime behavior and does not change runtime code.

## 2. Purpose

`DiagramSequence v1` defines the structured diagram data model Club Vivo should use to render soccer training diagrams and future movement animation.

The model is designed for soccer/football/fútbol only. It should support static setup diagrams first, step-based diagrams next, and future animation later.

## 3. Product Principle

Diagrams and movement visuals are a five-star requirement from day one.

Raw image generation is not the authoritative diagram source. The authoritative source should be structured, validated sequence data that can be rendered consistently for preview, review, export, and future animation.

## 4. Relationship To Training Brief And Session Builder

This spec supports:

- `docs/product/club-vivo/training-prescription-layer.md`
- `docs/api/training-brief-v1-contract.md`
- the existing Club Vivo Session Builder direction

Training Briefs may describe diagram needs. Session Builder output should later turn those needs into validated `DiagramSequence` data for activities that need a visual.

## 5. DiagramSequence Object

```json
{
  "sequenceId": "diagseq_001",
  "schemaVersion": "diagram-sequence.v1",
  "sport": "soccer",
  "title": "Compact Recovery Transition Game",
  "viewType": "setup-and-steps",
  "field": {
    "surface": "half-field",
    "orientation": "left-to-right"
  },
  "entities": [],
  "equipment": [],
  "areas": [],
  "steps": [],
  "labels": [],
  "legend": {}
}
```

## 6. Field Coordinate Model

Coordinates use normalized `0-100` field values:

- `x: 0` is the left touchline or starting edge of the rendered field.
- `x: 100` is the right touchline or far edge.
- `y: 0` is the top edge.
- `y: 100` is the bottom edge.

All entities, equipment, areas, and actions use this normalized coordinate model. Renderers may scale coordinates to any visual size.

## 7. Entities

Supported entity types:

- `player`
- `opponent`
- `neutral`
- `coach`
- `ball`

```json
{
  "id": "p1",
  "type": "player",
  "label": "1",
  "team": "blue",
  "position": { "x": 42, "y": 48 }
}
```

Entities should be simple enough for grassroots coaches to understand and structured enough for academy or professional environments to extend later.

## 8. Equipment And Areas

Supported equipment types:

- `goal`
- `cone`
- `gate`
- `mannequin`

Supported area types:

- `zone`
- `channel`
- `target-area`
- `start-area`

```json
{
  "id": "zone_central",
  "type": "zone",
  "label": "Protect central lane",
  "bounds": { "x": 38, "y": 25, "width": 24, "height": 50 }
}
```

Mannequins are optional and should not be required for grassroots activities.

## 9. Movement And Action Types

Supported action types:

- `pass`
- `shot`
- `carry`
- `dribble`
- `player-movement`
- `pressure`
- `recovery-run`
- `rotation`
- `reset`
- `ball-loss`
- `turnover`

Arrow semantics:

- ball actions use a solid arrow.
- player movement uses a dashed arrow.
- pressure uses an assertive directional arrow toward the target.
- recovery runs use a curved or dashed recovery arrow.
- rotations should show ordered movement between positions.
- reset actions should return entities or the ball to a clear restart state.
- ball loss and turnover actions should show the change of possession or trigger point.

## 10. Steps And Timing

`DiagramSequence` should support:

- a `setup` step for the initial organization
- one or more `sequence` steps for movement or decisions
- optional timing hints for future animation

```json
{
  "stepId": "step_1",
  "type": "sequence",
  "title": "Turnover and first pressure",
  "durationSeconds": 4,
  "actions": [
    {
      "type": "ball-loss",
      "fromEntityId": "p4",
      "toEntityId": "o1",
      "path": [{ "x": 50, "y": 50 }, { "x": 56, "y": 45 }]
    }
  ]
}
```

## 11. Labels And Legends

Labels should clarify the diagram without replacing coaching language.

Suggested label fields:

- `id`
- `text`
- `position`
- `targetEntityId`
- `targetAreaId`

Legends may define color, shape, and arrow meaning for players, opponents, neutral players, ball movement, player movement, and pressure.

## 12. Visual Clarity Rules

Diagrams should remain readable on small screens and in PDF export.

Rules:

- keep each step focused on one main idea
- avoid excessive arrows in a single step
- prefer multiple steps over one crowded diagram
- keep labels short
- avoid placing labels directly over players, balls, cones, or arrows
- use zones only when they clarify the coaching point
- make the ball easy to identify
- keep team colors visually distinct

## 13. Validation Rules

Stable v1 validation rules:

- `schemaVersion` must be `diagram-sequence.v1`.
- `sport` must be `soccer`.
- coordinates must stay within normalized `0-100` bounds.
- area `width` and `height` must be positive and remain in bounds.
- entity IDs must be unique.
- equipment IDs must be unique.
- area IDs must be unique.
- actions must reference existing entities, equipment, or areas.
- action paths must contain in-bounds coordinates.
- main activities should have at least one `setup` step or an explicit reason why no diagram is needed.
- raw generated images must not be treated as authoritative diagram source data.

If persisted, diagram source data must be tenant-scoped by construction and must follow existing SIC auth, tenancy, validation, observability, and cost-awareness principles.

## 14. Accessibility And Beginner-Coach Readability

Diagrams should help beginner and grassroots coaches understand the activity quickly.

Guidelines:

- use plain labels
- avoid tactical overload
- make the starting shape clear
- separate setup from movement
- preserve enough whitespace to scan the diagram
- use consistent symbols across Club Vivo
- support readable export for print or sharing

## 15. MVP Rendering Behavior

The first renderer should support:

- static setup diagrams
- top-down field view
- players, opponents, neutral players, coach, ball, goals, cones, gates, zones, and optional mannequins
- simple arrows for ball and player movement
- one setup step and simple sequence steps
- deterministic rendering from validated sequence data

## 16. Future Animation Behavior

Future animation may use the same `DiagramSequence` data with:

- step timing
- entity interpolation
- ball path interpolation
- animated arrows
- pause points
- coach-controlled playback

Animation should remain downstream of validated structured data.

## 17. Non-Goals

This spec does not:

- implement runtime rendering
- create a new app, backend service, or tenancy path
- claim animation is shipped
- define a public API endpoint
- make raw image generation authoritative
- require paid data providers or advanced tracking systems
- generalize beyond soccer

## 18. Example DiagramSequence

```json
{
  "sequenceId": "diagseq_transition_001",
  "schemaVersion": "diagram-sequence.v1",
  "sport": "soccer",
  "title": "Compact Recovery After Turnover",
  "viewType": "setup-and-steps",
  "field": {
    "surface": "half-field",
    "orientation": "left-to-right"
  },
  "entities": [
    { "id": "p1", "type": "player", "label": "1", "team": "blue", "position": { "x": 42, "y": 42 } },
    { "id": "p2", "type": "player", "label": "2", "team": "blue", "position": { "x": 45, "y": 58 } },
    { "id": "o1", "type": "opponent", "label": "A", "team": "red", "position": { "x": 56, "y": 50 } },
    { "id": "ball", "type": "ball", "label": "Ball", "position": { "x": 50, "y": 50 } }
  ],
  "equipment": [
    { "id": "g1", "type": "goal", "position": { "x": 96, "y": 50 } },
    { "id": "c1", "type": "cone", "position": { "x": 35, "y": 35 } },
    { "id": "gate1", "type": "gate", "points": [{ "x": 62, "y": 42 }, { "x": 62, "y": 58 }] }
  ],
  "areas": [
    { "id": "central_zone", "type": "zone", "label": "Protect middle", "bounds": { "x": 38, "y": 30, "width": 28, "height": 40 } }
  ],
  "steps": [
    {
      "stepId": "setup",
      "type": "setup",
      "title": "Starting shape",
      "actions": []
    },
    {
      "stepId": "step_1",
      "type": "sequence",
      "title": "Turnover and recovery",
      "durationSeconds": 5,
      "actions": [
        {
          "type": "turnover",
          "fromEntityId": "p1",
          "toEntityId": "o1",
          "path": [{ "x": 50, "y": 50 }, { "x": 56, "y": 50 }]
        },
        {
          "type": "pressure",
          "fromEntityId": "p2",
          "toEntityId": "o1",
          "path": [{ "x": 45, "y": 58 }, { "x": 54, "y": 52 }]
        }
      ]
    }
  ],
  "labels": [
    { "id": "label_1", "text": "First pressure, protect middle", "position": { "x": 50, "y": 22 } }
  ],
  "legend": {
    "solidArrow": "ball action",
    "dashedArrow": "player movement",
    "pressureArrow": "pressure"
  }
}
```

## 19. Source-Of-Truth Relationships

Read this spec with:

- `docs/product/club-vivo/training-prescription-layer.md`
- `docs/api/training-brief-v1-contract.md`
- `docs/api/diagram-rendering-contract-v1.md`
- `docs/architecture/coach-lite/drill-diagram-spec-v1.md`
- `docs/architecture/architecture-principles.md`
- `docs/architecture/platform-constitution.md`
- `docs/architecture/tenant-claim-contract.md`

If this proposed spec conflicts with shipped source code or current platform source-of-truth docs, shipped source code and higher-order platform rules govern until an explicit implementation change is made.
