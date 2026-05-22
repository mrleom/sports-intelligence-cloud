# New SIC Closeout Summary 10 - Training Brief Backend Foundation

## Branch / Theme

Primary closeout branch:

`training-brief-foundation-progress-doc`

Theme:

SIC restart / Club Vivo Training Brief foundation work after the Match-to-Match Prescription draft flow.

This closeout records the product-doc alignment, backend design note, and first internal backend domain slices for future Training Prescription behavior.

## Summary

This phase moved Training Prescription from product direction into a carefully bounded backend foundation.

The work did not expose a public route or claim full prescription automation. Instead, it established the intended sequence:

```text
validated Training Brief input
-> Session Builder handoff mapping
-> reviewable Training Brief candidate
-> future coach review in Session Builder
```

The important architectural choice is that Training Brief work stays inside the existing Club Vivo / Session Builder backend domain for now. It remains internal-first and review-only until an explicit API, tenant context, observability, persistence, and frontend handoff decision is made.

## Merged PRs

- #47 `docs(product): align Club Vivo session builder paths`
- #48 `fix(home): clarify quick activity planning note copy`
- #49 `docs(architecture): design Training Prescription backend path`
- #50 `feat(session-builder): add Training Brief input validator`
- #51 `feat(session-builder): map Training Brief to session handoff`
- #52 `feat(session-builder): build Training Brief candidate draft`

PR checks passed on GitHub for #47 through #52.

## Files Created Or Updated

Product and architecture documentation:

- `docs/product/club-vivo/club-vivo-evolution-roadmap.md`
- `docs/product/club-vivo/session-builder.md`
- `docs/product/club-vivo/coach-workspace.md`
- `docs/product/club-vivo/training-prescription-layer.md`
- `docs/product/club-vivo/pilots/ksc/program-types-and-methodology.md`
- `docs/architecture/club-vivo/training-prescription-backend-design.md`

Home copy:

- Home Quick Activity copy was clarified to match practical planning context semantics.

Backend domain foundation:

- `services/club-vivo/api/src/domains/session-builder/training-brief-validate.js`
- `services/club-vivo/api/src/domains/session-builder/training-brief-validate.test.js`
- `services/club-vivo/api/src/domains/session-builder/training-brief-handoff.js`
- `services/club-vivo/api/src/domains/session-builder/training-brief-handoff.test.js`
- `services/club-vivo/api/src/domains/session-builder/training-brief-candidate.js`
- `services/club-vivo/api/src/domains/session-builder/training-brief-candidate.test.js`

Progress documentation:

- `docs/progress/new-sic/architect-process-log.md`
- `docs/progress/new-sic/closeout-summary-10.md`

## What Shipped

- Long-lived product docs now align with Custom Build vs Match-to-Match Prescription.
- Home Quick Activity copy now matches practical planning context semantics.
- Training Prescription backend design doc was added.
- Training Brief input validator was added under the existing Session Builder domain.
- Training Brief handoff mapper was added under the existing Session Builder domain.
- Training Brief candidate builder was added under the existing Session Builder domain.
- Tests were added for the validator, handoff mapper, and candidate builder.

## Runtime Truth After This Work

The current runtime truth is:

- Session Builder remains the active runtime wedge.
- Custom Build is the everyday coach-led builder.
- Match-to-Match Prescription remains a frontend-only deterministic draft preview.
- Quick Activity remains the fast activity lane.
- `/session-packs` remains the current generation brain.
- Training Brief backend code exists only as internal domain foundation:
  - validate input
  - map to Session Builder handoff
  - build a reviewable candidate shape

The new backend foundation does not generate a SessionPack, persist records, or expose a public route.

## What Is Not Shipped

This phase did not ship:

- `/training-briefs` route
- `/prescriptions` route
- public Training Brief API
- persisted Training Brief records
- persisted prescription records
- frontend integration to the new backend candidate builder
- SessionPack generation from Training Brief
- new backend service
- new app
- auth changes
- tenancy changes
- IAM/CDK changes
- API Gateway changes
- DynamoDB changes
- Cognito changes
- infrastructure changes

## Guardrails Preserved

The following guardrails were preserved:

- tenant isolation
- server-derived tenant context
- no client-provided tenant identity fields
- validation before route/API/persistence
- no unreviewed AI/generation path
- no raw generated diagrams as authoritative artifacts
- no new infrastructure before proof of value

Training Brief validation rejects client-supplied tenant identity fields before any route or persistence decision exists.

The candidate builder does not import platform tenancy/auth code, does not call generation, and does not persist anything.

## Validation Evidence

Training Brief validator targeted tests:

```text
tests 17
pass 17
fail 0
```

Related validation/session tests:

```text
tests 31
pass 31
fail 0
```

Training Brief handoff targeted tests:

```text
tests 13
pass 13
fail 0
```

Related validation/session-pack/pipeline tests:

```text
tests 61
pass 61
fail 0
```

Training Brief candidate targeted tests:

```text
tests 15
pass 15
fail 0
```

Related validator/handoff/session-pack/pipeline tests:

```text
tests 74
pass 74
fail 0
```

GitHub PR checks passed for #47 through #52.

## Recommended Next Steps

Do not add a public route yet.

The next slice should likely be one of:

1. an internal server-action or route-local integration design for the Match-to-Match frontend to call the candidate builder
2. a docs/API decision note for whether `/training-briefs` should remain internal-first

If implementation begins, keep it:

- internal-first
- tenant-safe
- review-only
- inside the existing Club Vivo / Session Builder path

Do not add persistence, API Gateway routes, CDK/IAM changes, DynamoDB schema changes, or generation calls until the API and tenancy boundary is explicitly reviewed.

## Next-Session Starting Point

Start from the current `main` baseline after PR #52.

Recommended next branch:

```text
training-brief-internal-integration-design
```

First inspect:

- `docs/architecture/club-vivo/training-prescription-backend-design.md`
- `services/club-vivo/api/src/domains/session-builder/training-brief-validate.js`
- `services/club-vivo/api/src/domains/session-builder/training-brief-handoff.js`
- `services/club-vivo/api/src/domains/session-builder/training-brief-candidate.js`
- current Match-to-Match frontend draft flow

The next session should decide whether the backend candidate builder remains internal-only behind existing Session Builder flow, or whether a future public `/training-briefs` API decision note is needed before any route work.
