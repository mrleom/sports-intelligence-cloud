# Match-to-Match Evidence Index

## Status

This folder is historical Match-to-Match prototype evidence from the New SIC phase. It is useful
for understanding product learning around evidence intake, practical training prescription
direction, prototype observations, and future guardrails, but it is not current Club Vivo runtime
truth.

Match-to-Match remains parked/future unless a later explicit product and implementation decision
reactivates it.

Current Club Vivo product focus remains:

- Coach Workspace as the active coach-facing workspace
- Session Builder / Custom Build as the main creation path
- Quick Soccer Game as the lighter creative lane

Current generation truth still goes through the existing validated Session Builder / Session Pack
path unless current source proves otherwise.

## Reading Model

Treat this folder as evidence, not active requirements by itself. It preserves what the prototype
taught about turning match evidence into practical training decisions, but it should not override
current source code, product docs, API contracts, architecture docs, or fresh validation.

The former closeout summary, prototype notes, and next-steps notes have been consolidated into this
index and removed from `main`. Git history preserves the full detail.

This folder does not claim Training Brief, DiagramSequence, RAG/vector search, autonomous agents,
Bedrock production generation, image analysis, Match-to-Match Prescription, data lake, ETL,
analytics pipeline, domain export automation, Glue, Athena, or QuickSight as shipped runtime.

## Consolidated Evidence

Durable findings from the detailed Match-to-Match prototype notes:

- Match-to-Match is historical prototype evidence, not current shipped runtime.
- The prototype showed that match evidence can be interpreted into more useful training direction
  than generic recommendation cards.
- The prototype also showed that Match-to-Match is larger than a shallow integration and should be
  treated as a future intelligence layer.
- Reasoning cards alone are not enough; useful Match-to-Match work must turn evidence into
  practical training actions, drills, activities, session structures, coaching cues, success
  criteria, and match preparation logic.
- The WIP prototype reference remains useful evidence only: branch
  `training-brief-server-action-prototype`, commit `e406d33`.

## Runtime Non-Claims

The consolidated evidence does not ship or claim:

- backend Match-to-Match automation
- a public Training Brief API
- a `/prescriptions` route
- persisted Training Brief records
- persisted prescription records
- SessionPack generation from Training Brief
- production Match-to-Match backend automation
- RAG/vector search
- autonomous agents
- Bedrock production generation

Training Brief backend foundation existed only as internal validation, handoff mapping, and
candidate-building evidence.

## Future Restart Guardrails

Any future restart should be a deliberate product and architecture decision, not an accidental
continuation of the prototype.

Before reactivation, future work should define:

- the evidence intake model for last-match problems, next-opponent opportunities, coach
  preferences, player availability, timeline, team context, and tenant-safe validation
- the 7Q football reasoning contract and quality bar for evidence-specific answers
- training prescription output that maps to recommended focus, activities, drills, coaching cues,
  success criteria, diagram requirements, and match preparation logic
- the coach-reviewed handoff into Session Builder / Custom Build
- whether any integration remains route-local/internal or needs a public API
- persistence lifecycle, observability events, failure modes, and tenant/access behavior before any
  route or durable object is added
- real-coach testing before expanding the platform

Tenant safety remains required for any future version: server-derived tenant context, no
client-supplied tenant identity, and validation before route, API, or persistence work.

## Guardrails

Do not use this folder to change or reinterpret runtime code, infrastructure, API contracts,
runbooks, auth, tenancy, IAM, entitlements, DynamoDB keys, routes, Lambdas, public API contracts,
CDK wiring, build config, or Amplify assumptions.

Do not use this folder to claim parked, proposed, source-present, prototype, or future work as
shipped Club Vivo runtime.
