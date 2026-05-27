# Club Vivo Training Prescription Backend Design

## 1. Status

- Proposed backend design.
- Does not implement runtime behavior.
- Does not create public `/training-briefs` or `/prescriptions` endpoints.

## 2. Purpose

This note preserves the future/parked Training Prescription backend framing and explains how bounded Training Brief work should fit inside the existing Club Vivo/SIC architecture before implementation.

It is intended to align product, API, tenancy, validation, observability, and implementation boundaries before any runtime behavior is added.

## 3. Current Runtime Baseline

- Session Builder is the active runtime wedge.
- Custom Build is the everyday coach-led builder.
- Match-to-Match Prescription is parked for later. Existing deterministic draft preview behavior should be read as prior product-shape context, not the near-term source path.
- Quick Activity remains the fast activity lane.
- `/session-packs` is the current generation brain.
- No public Training Brief API exists yet.
- No public prescription API exists yet.
- No persisted prescription object exists yet.

## 4. Design Direction

The active near-term future flow is:

1. Session Builder / Training Brief intake
2. validated Training Brief candidate
3. recommended objective and activity direction
4. structured diagram intent / DiagramSequence requirements
5. coach review and Session Builder handoff
6. validated SessionPack
7. save/export through existing session workflow
8. coach feedback for future intelligence

The first backend implementation should be internal-first unless an explicit API decision is made.

## 5. Public API Decision

Public `/training-briefs` or `/prescriptions` endpoints should not be added until the following are reviewed:

- request validation
- response contract
- tenant context behavior
- persistence behavior
- observability events
- cost controls
- failure modes
- frontend handoff
- tests
- CI guardrails

`docs/api/training-brief-v1-contract.md` remains proposed and not shipped runtime behavior.

## 6. Backend Placement

Training Brief candidate logic should stay inside the existing Club Vivo API service. Broader Training Prescription and Match-to-Match behavior is parked/future unless a later explicit decision reactivates it.

Preferred initial placement:

```text
services/club-vivo/api/src/domains/session-builder/
```

Possible future placement only if justified:

```text
services/club-vivo/api/src/domains/training-prescription/
```

Do not create:

- separate app
- separate backend service
- separate auth path
- separate tenancy path
- separate infrastructure stack

## 7. Tenant And Auth Rules

- Verified auth is required.
- `withPlatform` / platform wrapper resolves correlation and tenant context.
- `buildTenantContext` derives tenant context from verified auth and entitlements.
- Never accept `tenant_id`, `tenantId`, or `x-tenant-id` from client input.
- Persistence must be tenant-scoped by construction if added later.
- Role/tier checks must come from server-side entitlements.
- Fail closed if tenant context cannot be built.

## 8. Validation Model

Minimum input validation:

- `sport` must be `soccer`.
- `ageBand` must be supported.
- `evidenceSummary` is required and non-empty.
- `evidenceSummary` must have a max length.
- `coachNotes` is optional with a max length.
- `nextGameObjective` is optional with a max length.
- `playerCount` must be a positive integer when supplied.
- `durationMinutes` must fit the Session Builder handoff range.
- `availableEquipment` must be a bounded string array.
- Unknown fields must be rejected.
- Client-supplied tenant identity fields must be rejected.

Output validation:

- one recommended focus
- one editable objective
- one rationale
- one to three activity recommendations
- diagram sequence requirements for main activity recommendations
- explicit reason when diagram is not required

## 9. Handoff To Session Builder

Training Brief candidate logic should map a validated Training Brief candidate into existing Session Builder inputs:

- objective
- specific focus
- coaching note / activity idea
- duration
- environment
- equipment
- player count
- team context when available

Session Builder/session-pack validation remains responsible for final duration totals, equipment feasibility, activity shape, diagram validation, save, review, and export continuity.

## 10. Persistence Decision

Do not persist prescription objects in the first backend design unless a separate persistence decision is made.

Allowed first step:

- produce a validated, reviewable brief-shaped object
- let coach continue into Session Builder
- save the final generated session through existing sessions workflow

Future persistence requires defining key shape, lifecycle, ownership, access rules, deletion/update behavior, audit events, and retention expectations.

## 11. Observability

Suggested event types:

- `training_brief_request_received`
- `training_brief_validation_failed`
- `training_brief_candidate_created`
- `training_brief_handoff_created`
- `training_brief_failure`

Safe log fields:

- `requestId`
- `correlationId`
- `tenantId` only after tenant context resolves
- `userId` only in safe/truncated form where appropriate
- `teamId` only if server-resolved or validated against tenant scope
- stable failure reason codes

Do not log raw JWTs, auth headers, or sensitive player/personally identifying evidence.

## 12. Cost And AI Guardrails

First backend slice should stay deterministic or tightly bounded.

Do not introduce broad RAG, vector search, or Bedrock generation until a separate AI architecture decision defines model boundary, prompt/input limits, output validation, retry/fallback behavior, cost limits, observability, and safe failure behavior.

## 13. Diagram Requirements

Training Brief candidate logic should produce diagram requirements, not raw generated images.

Preferred flow:

1. recommend activity
2. describe diagram sequence requirements
3. validate structured DiagramSequence later
4. render through deterministic Club Vivo diagram renderer

Raw generated images must not be authoritative diagram artifacts.

## 14. Failure Behavior

Expected failures:

- invalid evidence input -> `platform.bad_request`
- unsupported sport -> `platform.bad_request`
- missing auth -> `401`
- missing entitlements -> `403`
- invalid tenant context -> `403`
- internal generation or mapping failure -> `500`

Validation failures should not create partially trusted prescription output.

## 15. Testing Expectations

First implementation should include tests for:

- rejecting client-supplied tenant identity fields
- validating required evidence fields
- rejecting unsupported sport values
- enforcing input length limits
- creating a stable brief-shaped output
- mapping a brief candidate into Session Builder handoff fields
- preserving existing `/session-packs` behavior
- emitting stable validation error details

## 16. Non-Goals

This design does not:

- implement runtime behavior
- add `/training-briefs`
- add `/prescriptions`
- create a persisted prescription object
- create a new backend service
- create a new app
- change auth, tenancy, IAM, CDK, Cognito, DynamoDB, or infrastructure
- introduce RAG, FAISS, vector search, or Bedrock production generation
- make raw generated diagrams authoritative

## 17. First Implementation Recommendation

Recommended first backend implementation branch/slice:

```text
training-brief-validation
```

Scope:

- add validator for proposed Training Brief input shape
- reject client-supplied tenant identity fields
- add tests only
- do not expose public endpoint yet
- do not persist records yet
- do not change CDK or API Gateway yet
