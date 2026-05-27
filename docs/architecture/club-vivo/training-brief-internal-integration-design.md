# Club Vivo Training Brief Internal Integration Design

## 1. Status

Proposed integration design only. No runtime behavior.

This document does not add a route, expose `/training-briefs`, expose `/prescriptions`, persist records, generate SessionPacks from Training Briefs, or change frontend/backend runtime behavior.

## 2. Current State

Current frontend state:

- Match-to-Match Prescription is parked for later. Its existing deterministic draft preview behavior should be read as prior product-shape context, not the near-term source path.
- `match-to-match-prescription-draft.tsx` collects team, days-until-next-match, environment, match observations, tactical notes, and coach notes.
- The draft UI currently uses a route-local deterministic recommendation library.
- When the coach selects an option, the UI hands objective, constraints, environment, duration, and mode back into Custom Build.
- `session-new-flow.tsx` keeps SessionPack generation inside the existing Custom Build / Session Builder flow.

Current backend state:

- The backend now has internal Training Brief foundation code under the existing Session Builder domain:
  - `training-brief-validate.js`
  - `training-brief-handoff.js`
  - `training-brief-candidate.js`
- The validator rejects unsupported sports, unsupported age bands, invalid field shapes, unknown fields, and client-supplied tenant identity fields.
- The handoff mapper converts validated Training Brief input into existing Session Builder handoff fields.
- The candidate builder returns a reviewable draft candidate with validated input, recommendation metadata, activity recommendation shape, and Session Builder handoff.

Current non-runtime claims:

- There is still no public `/training-briefs` route.
- There is still no `/prescriptions` route.
- There is still no persisted Training Brief or prescription record.
- There is still no SessionPack generation from Training Brief.

## 3. Design Goal

The design goal is an internal-first bridge from Session Builder / Training Brief intake to a reviewable Training Brief candidate.

The first integration should let a bounded Training Brief intake inside the existing Session Builder path submit coach evidence or planning notes to a server-side boundary that calls `buildTrainingBriefCandidate`, then returns a candidate preview for coach review.

The existing Match-to-Match UI can remain historical/prior context and may inform future intake ideas, but it should not be treated as the near-term first integration source.

The candidate should remain a draft planning object. It should not become an automatically trusted prescription, persisted record, or generated SessionPack.

## 4. Recommended Flow

Preferred flow:

```text
Session Builder / Training Brief intake
-> internal integration boundary
-> buildTrainingBriefCandidate
-> candidate review state
-> coach accepts/adapts candidate
-> Session Builder handoff
-> future SessionPack generation
```

Important sequencing:

- A bounded Training Brief intake should eventually submit coach evidence or planning notes to an internal backend boundary that calls `buildTrainingBriefCandidate`.
- The returned candidate should be reviewable before handoff into Session Builder generation.
- SessionPack generation should remain a separate explicit coach-reviewed step.
- The coach should be able to accept, adapt, or abandon the candidate before generation.

## 5. Why Not Public API Yet

Do not add public `/training-briefs` or `/prescriptions` endpoints yet.

Reasons:

- API contract is not finalized.
- Persistence is not decided.
- Observability events are not wired.
- Frontend review/handoff behavior is not finalized.
- Tenant/access boundary should be reviewed first.

The existing `docs/api/training-brief-v1-contract.md` remains proposed contract direction, not shipped runtime behavior.

## 6. Integration Boundary Options

### A. Route-local server action inside existing Next app

This option keeps the first integration close to the existing Session Builder UI without exposing a public API.

Advantages:

- minimal product surface change
- no public API route
- no API Gateway/CDK/IAM change
- easier to keep candidate preview route-local
- useful for proving coach review behavior before platformizing the boundary

Risks:

- auth/session context handling must be explicit
- server action must not bypass backend validation rules
- future migration to the API service may require reshaping tests and observability

### B. Protected internal API route inside existing Club Vivo API service

This option keeps Training Brief behavior in the existing Club Vivo API service and existing Session Builder domain.

Advantages:

- closer to the future backend placement
- can reuse API service validation and platform wrapper patterns
- easier to add stable backend tests around the integration boundary
- keeps Training Brief candidate behavior inside the existing Club Vivo API service

Risks:

- must still avoid public `/training-briefs` and `/prescriptions`
- must not add API Gateway/CDK/IAM/DynamoDB changes until explicitly approved
- tenant/auth behavior must be reviewed before any route is exposed

### C. Public `/training-briefs` endpoint

This option should be rejected for now.

Reasons:

- public API contract is not finalized
- persistence lifecycle is not decided
- observability and cost controls are not wired
- frontend review behavior is still a draft
- tenant/access boundary needs review before public exposure

Recommended first integration option: A or B.

Do not choose C until there is an explicit API decision.

## 7. Tenant/Auth Guardrails

Any server-side integration must use existing auth/session behavior.

Required guardrails:

- verified auth/session context is required for server-side candidate building
- tenant context must be server-derived
- client-supplied tenant scope must never be trusted
- never accept `tenant_id`, `tenantId`, or `x-tenant-id` from client input
- do not add `tenantId`, `userId`, auth claims, or entitlement fields into candidate output
- fail closed if auth/session/tenant context cannot be resolved
- role/tier behavior must come from server-side entitlements if it is introduced later

The existing validator already rejects client-supplied tenant identity fields. Any integration boundary must preserve that behavior rather than wrapping around it.

## 8. Review UX Requirements

The candidate must be reviewable and editable before generating a SessionPack.

The review UI should let the coach inspect:

- evidence summary
- recommended focus
- rationale
- activity recommendation
- diagram requirement
- Session Builder handoff fields

The coach should be able to:

- accept the candidate
- edit the focus or planning notes
- return to Custom Build with mapped handoff fields
- generate only after review
- abandon the candidate without persistence

The UI should continue to avoid claiming full prescription automation. It should present the candidate as a draft planning aid.

## 9. Non-Goals

This design does not include:

- public `/training-briefs`
- `/prescriptions`
- persistence
- SessionPack generation from Training Brief
- new backend service
- new app
- auth changes
- tenancy changes
- infrastructure changes
- CDK changes
- IAM changes
- API Gateway changes
- DynamoDB changes
- Cognito changes
- raw generated diagrams

Raw generated images must not become authoritative diagram artifacts. Training Brief candidates should continue to express diagram requirements and defer structured diagram validation/rendering to later work.

## 10. Recommended Next Implementation Slice

Recommended branch:

```text
training-brief-server-action-prototype
```

Scope:

- route-local/internal only
- call `buildTrainingBriefCandidate`
- return candidate preview
- no persistence
- no public API
- no SessionPack generation
- tests where practical

Implementation should begin only after deciding how auth/session context is handled for the route-local or server-action boundary.

The slice should prove the coach review loop before adding public routes, persistence, infrastructure, or automatic generation.
