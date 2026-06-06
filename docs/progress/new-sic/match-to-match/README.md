# Match-to-Match Evidence Index

## Status

This folder is historical Match-to-Match prototype evidence from the New SIC phase. It is useful
for understanding the product learning around evidence intake, practical training prescription
direction, prototype observations, and future guardrails, but it is not current Club Vivo runtime
truth.

Match-to-Match remains parked/future unless a later explicit product and implementation decision
reactivates it.

Current Club Vivo product truth is:

- Club Vivo as the product face
- Coach Workspace as the active coach-facing workspace
- Session Builder / Custom Build as the main creation path
- Quick Soccer Game as the lighter creative lane

Current generation truth still goes through the existing validated Session Builder / Session Pack
path unless current source proves otherwise.

## Reading Model

Treat these files as evidence, not active requirements by themselves. They preserve what the
prototype taught about turning match evidence into practical training decisions, but they should not
override current source code, product docs, API contracts, architecture docs, or fresh validation.

This folder does not claim backend Match-to-Match automation, a public Training Brief API, persisted
Training Brief or prescription objects, SessionPack generation from Training Brief, RAG/vector
search, autonomous agents, Bedrock production generation, image analysis, full DiagramSequence
runtime, data lake, ETL, analytics pipeline, domain export automation, Glue, Athena, or QuickSight
as shipped runtime.

## File Classification

| File | Classification | Evidence Value |
| --- | --- | --- |
| `README.md` | Evidence index | Gives the current reading model, shipped-vs-parked boundary, file classification, and future cleanup options for this folder. |
| `closeout-summary.md` | Closeout summary | Records the decision to park Match-to-Match Prescription, the prototype quality bar, current runtime non-claims, and why Session Builder remained the product focus. |
| `next-steps.md` | Next steps | Captures future design work for evidence intake, 7Q reasoning, training prescription output, Session Builder handoff, API/persistence decisions, and coach testing. |
| `prototype-notes.md` | Prototype notes | Preserves WIP branch and commit evidence, what the internal candidate-preview prototype demonstrated, what was not good enough, and why not to merge it as production behavior. |

## Useful Findings Preserved

- Reasoning cards alone were not enough; useful Match-to-Match work must turn evidence into
  practical training actions, drills, activities, session structures, coaching cues, success
  criteria, and match preparation logic.
- Evidence intake needs an explicit model before implementation: last-match problem,
  next-opponent opportunity, coach preference, player availability, timeline, team context, and
  tenant-safe validation.
- Future 7Q reasoning must be specific to the submitted evidence and must lead to coach-reviewed
  training output, not generic explanation.
- Any handoff into generation should preserve Custom Build / Session Builder as the execution path
  and keep generation as an explicit coach-reviewed step.
- API, persistence, observability, and tenant/access behavior must be designed before adding public
  routes or durable prescription objects.
- The WIP prototype reference remains useful evidence only: branch
  `training-brief-server-action-prototype`, commit `e406d33`.

## Future Summarize-Before-Remove Candidates

These detailed files may be future remove-from-main candidates only after their durable findings
are summarized into current Club Vivo product, architecture, progress, or future-product docs:

- `closeout-summary.md`
- `next-steps.md`
- `prototype-notes.md`

Likely target docs for durable findings are:

- `docs/product/club-vivo/session-builder.md`
- `docs/product/club-vivo/coach-workspace.md`
- `docs/product/club-vivo/training-prescription-layer.md`
- `docs/architecture/chapter-2/progress-history-cleanup-strategy.md`
- this README, if the folder remains as compact historical evidence

Removal from `main` would not erase the work. Git history and the retained summary layer should
preserve the evidence trail before any detailed Match-to-Match progress file is removed.

## Guardrails

Do not use this folder to change or reinterpret runtime code, infrastructure, API contracts,
runbooks, auth, tenancy, IAM, entitlements, DynamoDB keys, routes, Lambdas, public API contracts,
CDK wiring, build config, or Amplify assumptions.

Do not use this folder to claim parked, proposed, source-present, prototype, or future work as
shipped Club Vivo runtime.
