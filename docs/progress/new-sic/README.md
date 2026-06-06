# New SIC Progress Evidence

## Status

`docs/progress/new-sic/` is historical build evidence from the New SIC phase. It helps explain how the Sports Intelligence Cloud platform and Club Vivo product direction evolved, but it is not the current Club Vivo source of truth.

Current Club Vivo product truth lives in `docs/product/club-vivo/`.

Current platform truth starts with:

- `docs/architecture/platform-constitution.md`
- `docs/architecture/architecture-principles.md`
- `docs/architecture/tenant-claim-contract.md`

Current reader-facing progress summaries live in:

- `docs/progress/weekly-progress-notes.md`
- `docs/progress/architect-process-summary.md`
- `docs/history/chapter-1-sic-closeout.md`

These progress files should not override current source code, API contracts, Chapter 2 docs, or the current Club Vivo/SIC source maps.

Current operational release hygiene comes from `docs/runbooks/how-to-ship.md`.
Current smoke test guidance comes from `docs/runbooks/smoke-tests.md`.
Current live deployment truth must be verified against current source, current runbooks, and fresh validation before making public runtime claims.

## How To Read This Folder

Start with the concise summaries in `docs/progress/` and `docs/history/`, then use this folder only when you need detailed evidence.

Treat numbered closeouts as historical checkpoint evidence only. They may mention old naming, local state, future plans, or work that has since been reclassified.

Do not use old New SIC language as current product naming. Club Vivo is the product face; Sports Intelligence Cloud is the AWS SaaS platform foundation behind it.

Do not treat future, parked, prototype, or source-present work as shipped runtime.

## Preserved Progress Cleanup Finding

The removed progress-history audit's durable finding is preserved here and in `docs/architecture/chapter-2/progress-history-cleanup-strategy.md`: detailed progress history remains useful evidence, but GitHub readers should start with concise summaries. Removed detail remains available through Git history, and historical progress docs should not override current product, source, API, architecture, or runtime truth.

## Useful Evidence

| File Or Folder | Evidence Value |
| --- | --- |
| `architect-process-log.md` | Detailed phase timeline, product model, runtime truth notes, deployment posture, and process principles. |
| Late numbered closeout facts | The original late closeout files have been consolidated into this README and `architect-process-log.md`; Git history preserves the full files. |
| `backend-export-lake-audit.md` | Important source-present export/lake/ETL caution; useful for avoiding overclaims about data lake, ETL, analytics, and domain export runtime. |
| `club-vivo-runtime-readiness-checklist.md` | Narrow Club Vivo web/runtime readiness criteria, active-route checks, smoke-test expectations, and stop conditions. |
| `club-vivo-runtime-readiness-evidence.md` | Historical validation evidence from the New SIC readiness checkpoint; useful evidence, not an active checklist. |
| `deployment-readiness-checklist.md` | Broad hosted deployment readiness evidence covering hosting, env vars, Cognito, backend readiness, validation, and stop conditions. |
| `hosting-and-domain-launch-plan.md` | Planning and narrative evidence for hosted launch/domain sequencing, Amplify/Cognito/env-var considerations, budget controls, and validation order. |
| `session-builder-core/` | Session Builder completion, output quality, fixture, template, and diagram-language evidence. |
| `match-to-match/` | Parked Match-to-Match prototype learning and future-product guardrails. |
| `new-sic-starting-point-plan.md` | Older transition plan for the New SIC baseline. |

## Readiness And Deployment Evidence Hierarchy

The core readiness/deployment evidence files are classified as historical evidence. These checklist, planning, and evidence files remain in place after this pass.

- `hosting-and-domain-launch-plan.md` is planning and narrative evidence for launch sequencing, hosted URLs, domains, environment variables, and budget/validation considerations.
- `deployment-readiness-checklist.md` is broad hosted deployment readiness evidence.
- `club-vivo-runtime-readiness-checklist.md` is narrower Club Vivo web/runtime readiness evidence.
- `club-vivo-runtime-readiness-evidence.md` is historical validation evidence, not an active checklist.

Use `docs/runbooks/how-to-ship.md` for current release hygiene and `docs/runbooks/smoke-tests.md` for current smoke test guidance. Treat this folder as evidence to compare against current source, current runbooks, source-of-truth docs, and fresh validation before making any public live-runtime claim.

Preserved overlap findings:

- The tracked readiness/deployment overlap is concentrated in `docs/progress/new-sic/`.
- The main overlapping topics are Amplify hosting, environment variables, Cognito callback/logout settings, route smoke tests, and API connectivity smoke tests.
- Ignored `.workspace` readiness notes can inform future work, but they should not be tracked directly. Distill only safe, durable conclusions into tracked docs when needed.

## Summarize Before Removal

Do not remove these from `main` until their durable facts are summarized in current product, architecture, progress, history, or runbook docs:

- `architect-process-log.md`
- `backend-export-lake-audit.md`
- `club-vivo-runtime-readiness-checklist.md`
- `club-vivo-runtime-readiness-evidence.md`
- `deployment-readiness-checklist.md`
- `hosting-and-domain-launch-plan.md`
- `session-builder-core/`
- `match-to-match/`

The most important facts to preserve are runtime boundaries, deployment/readiness evidence, tenant-safety decisions, validation results, Session Builder quality findings, and clear shipped-versus-proposed labels.

## Removed Numbered Closeouts

The numbered New SIC closeouts were removed from `main` after review. Their role is now covered by this README, `architect-process-log.md`, `docs/progress/weekly-progress-notes.md`, `docs/progress/architect-process-summary.md`, current Chapter 2 source-of-truth docs, merged PR history, and Git history.

High-level facts preserved from the removed early closeouts:

- New SIC shifted the repo from broad SIC history toward a cleaner Club Vivo product face.
- Early cleanup protected runtime code, backend code, infrastructure, auth, tenancy, IAM, entitlements, routes, Lambdas, public API contracts, CDK wiring, and Amplify assumptions.
- Coach Lite preview work was treated as legacy evidence, not current Club Vivo product truth.
- Local readiness and readiness-overlap work produced separate readiness, deployment, and audit docs that remain in this folder.
- Session Builder and Quick Activity shared the same backend generation foundation while presenting different coach-facing experiences.
- Club Vivo workspace work clarified the product model, role/workspace framing, coach-facing navigation, and deterministic Session Builder quality.
- Early diagram and generated-output work stayed deterministic and did not introduce RAG, vector search, Bedrock production generation, or autonomous agents.
- Match-to-Match appeared as a frontend deterministic draft direction and remains parked unless a future scoped product decision revives it.
- Backend deploy lessons from early Session Builder work are historical evidence; current deployment truth should come from current runbooks, source maps, and active deployment validation.

High-level facts preserved from the removed Coach Lite preview audit:

- The isolated Coach Lite preview route was legacy and removed from the active Club Vivo app tree.
- Coach Lite preview was not the current Club Vivo product surface.
- Useful legacy product and architecture material was migrated into current Club Vivo product and architecture docs.
- The legacy Coach Lite architecture folder has been migrated and no longer contains tracked source-of-truth files.
- Current product truth is Club Vivo, with Session Builder, Quick Soccer Game, and Coach Workspace as active product-facing surfaces.

High-level facts preserved from the removed late closeouts:

- Training Brief backend foundation existed as internal-only work under the existing Session Builder domain.
- The Training Brief foundation included validation, handoff mapping, and candidate draft building.
- It did not create a public Training Brief API, did not persist Training Brief or prescription records, and did not generate SessionPacks from Training Brief.
- Training Brief stayed inside the existing Club Vivo / Session Builder path and preserved validation and tenant-safety boundaries.
- The bounded agentic direction was framed as coach-reviewed and deterministic, not broad autonomous agents.
- Training Brief Draft / preview behavior was a bridge into existing Session Builder fields. Normal generation still used the existing validated Session Builder `/session-packs` path.
- Training Brief persistence, Bedrock production generation, RAG/vector search, DiagramSequence runtime rendering, and Match-to-Match active-path claims were explicitly out of scope.
- The maturity ladder is future/proposed framing, not shipped runtime.
- Coach Workspace and Session Builder became the active product surface.
- Training Brief, Match-to-Match, and image-assisted intake were hidden or parked from active UI.
- Session Builder became the main active creation path.
- Quick Activity / Quick Soccer Game shared the generation foundation and stayed lighter than full Session Builder.
- Deterministic generation quality improved without introducing RAG, Bedrock, vector search, or autonomous agents.
- Amplify deploys the frontend only; backend generation changes require CDK/API deployment.
- Validation and smoke evidence from the closeouts should be read as historical evidence, not a current live-runtime claim.

## Future Remove-From-Main Candidates

This may be a reasonable future remove-from-main candidate after link checks and summary review:

- `new-sic-starting-point-plan.md`

Removal from `main` would not erase the work. Git history, tags, archive branches, `docs/history/`, and the concise progress summaries preserve the evidence trail.

## Do Not Touch Yet

Do not move, rename, delete, or rewrite these until a dedicated cleanup PR summarizes their unique evidence:

- runtime and deployment readiness docs
- `backend-export-lake-audit.md`
- `session-builder-core/`
- `match-to-match/`

Do not use this folder to change or reinterpret runtime code, infrastructure, API contracts, runbooks, auth, tenancy, IAM, entitlements, DynamoDB keys, routes, Lambdas, CDK wiring, build config, or Amplify assumptions.

## Non-Claims

Do not use this folder to claim any of the following as shipped Chapter 2 runtime behavior:

- Training Brief
- DiagramSequence
- RAG/vector search
- autonomous agents
- Bedrock production generation
- image analysis
- Match-to-Match Prescription
- data lake
- ETL
- analytics pipeline
