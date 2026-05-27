# Closeout Summary 11 - Club Vivo Bounded Agentic Session Builder Foundation

## Date

May 27, 2026

## Branch / PRs

Closeout branch:

`club-vivo-closeout-summary-11`

Relevant merged PRs:

- #67 Club vivo agentic source alignment
- #68 Training brief session builder handoff
- #69 Training brief draft review UI
- #70 Training brief draft preview under POST /session-packs

## Theme

Club Vivo moved from deterministic Session Builder only into the first bounded agentic Session Builder workflow foundation.

The active direction is not broad autonomous agents. It is a coach-reviewed, deterministic, validated workflow around Session Builder:

```text
Session Builder
-> Training Brief Draft
-> clean Session Builder handoff
-> normal validated generation
-> Coach Feedback foundation
-> future intelligence loop
```

## What Changed

Source-of-truth alignment:

- Current source-of-truth docs now frame Session Builder as the active runtime wedge.
- Match-to-Match Prescription was moved into parked/future language where current docs needed cleanup.
- Training Brief is described as the bridge object for the bounded agentic coaching workflow.
- DiagramSequence is described as proposed architecture, not shipped runtime rendering.
- The docs avoid claims of broad RAG, FAISS/vector search, Bedrock production generation, or fully autonomous agents.

Internal Training Brief -> Session Builder handoff:

- The backend now has deterministic Training Brief input validation.
- The backend can build a Training Brief candidate.
- The backend can map a Training Brief candidate into a clean Session Builder handoff.
- Internal metadata is stripped before passing handoff fields into the existing Session Builder pipeline.
- Coach review remains required.

Training Brief Draft review UI:

- The Session Builder new-session flow now includes a coach-visible Training Brief Draft path.
- Coaches can enter lightweight evidence, next-game objective, coach notes, equipment, duration, and age-band context.
- The UI builds a deterministic draft preview.
- The coach can apply the draft into normal Session Builder fields.
- The coach can still edit the normal builder fields before generation.

`POST /session-packs` training-brief-draft preview mode:

- `POST /session-packs` now supports `requestType: "training-brief-draft"`.
- The mode validates Training Brief draft input using existing backend logic.
- It returns sanitized coach-review fields and clean Session Builder handoff fields.
- It does not generate a session pack.
- It does not persist a Training Brief.
- It does not expose internal metadata.
- Normal generation still uses the existing validated Session Builder `/session-packs` flow.

## What Is Now True

- Session Builder is the active runtime wedge.
- Training Brief Draft is coach-visible in the Session Builder new-session flow.
- Backend Training Brief validation, candidate building, and handoff mapping exist under the Session Builder domain.
- `POST /session-packs` supports a narrow preview-only `requestType: "training-brief-draft"` mode.
- The preview response returns sanitized coach-review fields and clean Session Builder handoff fields.
- The clean handoff fields are:
  - `sport`
  - `ageBand`
  - `durationMin`
  - `theme`
  - `sessionMode`
  - `coachNotes`
  - `equipment`
- Normal session generation still uses the existing validated Session Builder `/session-packs` generation path.
- Coach review remains required before generation.
- The implementation is deterministic and reviewable.
- Tenant-like fields in Training Brief draft input are rejected by validation.
- No auth, tenancy, entitlements, IAM, CDK, or data model changes were required for the preview boundary.

## What Is Not Claimed

This milestone does not claim:

- a public `/training-briefs` endpoint
- Training Brief persistence
- saved Training Brief lifecycle state
- a full autonomous agent
- Bedrock production generation for Training Briefs
- RAG production behavior
- FAISS or vector search
- DiagramSequence runtime rendering
- raw generated images as authoritative diagram artifacts
- Match-to-Match Prescription as the active near-term path
- unreviewed generation from match evidence
- changes to auth, tenancy, entitlements, IAM, CDK, or data models

Match-to-Match Prescription remains parked/future.

DiagramSequence remains proposed architecture until runtime code proves otherwise.

Session Feedback remains the backend contract foundation for a future learning loop.

## The 7-Level Maturity Ladder

### Level 1: Deterministic Session Builder

- Coach enters constraints.
- System generates structured sessions.
- Good for proving product value.

### Level 2: Training Brief Draft

- Coach enters evidence / match notes.
- System creates a draft focus and rationale.
- Coach reviews and applies it to Session Builder.

### Level 3: Backend-confirmed Training Brief Preview

- Frontend draft can be validated by backend preview mode.
- Backend returns sanitized draft and clean handoff fields.
- No persistence and no public `/training-briefs` endpoint.

### Level 4: Saved Training Brief Lifecycle

- Future state only.
- Possible states: draft, reviewed, applied_to_session, session_generated, session_saved, feedback_received, archived.
- Requires tenant-scoped persistence, list/read routes, contracts, and stronger lifecycle design.

### Level 5: DiagramSequence Runtime Rendering

- Future state.
- Activity diagram intent becomes validated DiagramSequence data.
- Rendered diagrams become preview/export-ready.
- Raw generated images must not be authoritative.

### Level 6: Bedrock AI-Assisted Generation

- Future state.
- AI assists with messy notes, objective wording, activity selection, progressions/regressions, diagram instructions, and refinement.
- Must include validation, cost guardrails, logging, failure handling, and coach-reviewable output.

### Level 7: RAG / Vector Search

- Future state.
- Only after curated soccer knowledge exists.
- May retrieve club methodology, age-group curriculum, session library, coach-approved activities, prior successful sessions, and organization-specific principles.
- Do not add vector search just because "AI apps use vectors."

## Why This Matters

This milestone gives Club Vivo a real bounded agentic coaching workflow foundation without overstating runtime maturity.

The system can now move from coach evidence into a reviewable Training Brief Draft, confirm that draft through backend validation, and hand clean fields into the existing Session Builder path. The normal generation path remains deterministic, validated, and coach-editable.

That matters because the product can start collecting and shaping higher-quality coaching intent without adding premature infrastructure, persistence, autonomous-agent behavior, or broad retrieval. It preserves the core platform rules: tenant safety, server-derived tenant context, validation, observability, cost awareness, and product value before platform expansion.

## Validation Evidence

Validation completed during this milestone:

- focused backend tests for the internal Training Brief handoff passed: 63 tests
- focused backend tests for the `training-brief-draft` preview mode passed: 89 tests
- app TypeScript check passed for the UI slice
- `git diff --check` passed during each slice
- GitHub checks passed on PRs #67, #68, #69, and #70

## Next Best Slice

The next best slice is to wire the Training Brief Draft UI to the backend `POST /session-packs` preview mode.

Constraints for that slice:

- keep coach review before normal generation
- keep normal generation on the existing validated Session Builder request path
- do not add `/training-briefs`
- do not add Training Brief persistence
- do not add auth, tenancy, entitlements, IAM, CDK, or data model changes
- do not add Bedrock, RAG, FAISS/vector search, or autonomous-agent behavior

After that, the maturity order should remain:

1. improve generated session quality from reviewed Training Brief handoff fields
2. improve feedback UI and connect feedback signals to future learning-loop design
3. add validated DiagramSequence runtime rendering
4. add Bedrock-assisted generation only with validation, logging, cost guardrails, and failure handling
5. add RAG/vector search only after curated soccer knowledge exists and a tenant-safe retrieval contract is justified
