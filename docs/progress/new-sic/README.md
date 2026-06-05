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

## How To Read This Folder

Start with the concise summaries in `docs/progress/` and `docs/history/`, then use this folder only when you need detailed evidence.

Treat numbered closeouts as historical checkpoint evidence only. They may mention old naming, local state, future plans, or work that has since been reclassified.

Do not use old New SIC language as current product naming. Club Vivo is the product face; Sports Intelligence Cloud is the AWS SaaS platform foundation behind it.

Do not treat future, parked, prototype, or source-present work as shipped runtime.

## Useful Evidence

| File Or Folder | Evidence Value |
| --- | --- |
| `architect-process-log.md` | Detailed phase timeline, product model, runtime truth notes, deployment posture, and process principles. |
| `closeout-summary-10.md` through `closeout-summary-12.md` | Late checkpoint evidence for Training Brief foundation, bounded Session Builder workflow framing, Coach Workspace simplification, Session Builder quality, validation, and backend deployment lessons. |
| `backend-export-lake-audit.md` | Important source-present export/lake/ETL caution; useful for avoiding overclaims about data lake, ETL, analytics, and domain export runtime. |
| `club-vivo-runtime-readiness-checklist.md` | Runtime readiness criteria, active-route checks, smoke-test expectations, and stop conditions. |
| `club-vivo-runtime-readiness-evidence.md` | Local build and route evidence from the New SIC readiness checkpoint. |
| `deployment-readiness-checklist.md` | Deployment readiness checklist covering hosting, env vars, Cognito, backend readiness, validation, and stop conditions. |
| `hosting-and-domain-launch-plan.md` | Hosting/domain launch planning, Amplify/Cognito/env-var considerations, budget controls, and validation sequencing. |
| `session-builder-core/` | Session Builder completion, output quality, fixture, template, and diagram-language evidence. |
| `match-to-match/` | Parked Match-to-Match prototype learning and future-product guardrails. |
| `progress-history-audit.md` | Earlier progress-history cleanup decision record. |
| `docs-readiness-duplication-audit.md` | Older duplication/readiness audit that may still contain useful stale-doc findings. |
| `coach-lite-preview-audit.md` | Legacy Coach Lite preview audit evidence. |
| `new-sic-starting-point-plan.md` | Older transition plan for the New SIC baseline. |

## Summarize Before Removal

Do not remove these from `main` until their durable facts are summarized in current product, architecture, progress, history, or runbook docs:

- `architect-process-log.md`
- `closeout-summary-10.md`
- `closeout-summary-11.md`
- `closeout-summary-12.md`
- `backend-export-lake-audit.md`
- `club-vivo-runtime-readiness-checklist.md`
- `club-vivo-runtime-readiness-evidence.md`
- `deployment-readiness-checklist.md`
- `hosting-and-domain-launch-plan.md`
- `session-builder-core/`
- `match-to-match/`

The most important facts to preserve are runtime boundaries, deployment/readiness evidence, tenant-safety decisions, validation results, Session Builder quality findings, and clear shipped-versus-proposed labels.

## Removed Numbered Closeouts

The early numbered New SIC closeouts were removed from `main` after review. Their role is now covered by this README, `docs/progress/weekly-progress-notes.md`, `docs/progress/architect-process-summary.md`, current Chapter 2 source-of-truth docs, merged PR history, and Git history.

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

## Future Remove-From-Main Candidates

These may be reasonable future remove-from-main candidates after link checks and summary review:

- `progress-history-audit.md`
- `new-sic-starting-point-plan.md`
- `docs-readiness-duplication-audit.md`
- `coach-lite-preview-audit.md`

Removal from `main` would not erase the work. Git history, tags, archive branches, `docs/history/`, and the concise progress summaries preserve the evidence trail.

## Do Not Touch Yet

Do not move, rename, delete, or rewrite these until a dedicated cleanup PR summarizes their unique evidence:

- runtime and deployment readiness docs
- `backend-export-lake-audit.md`
- `session-builder-core/`
- `match-to-match/`
- late numbered closeouts with runtime, validation, Session Builder, Training Brief, or product-quality evidence

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
