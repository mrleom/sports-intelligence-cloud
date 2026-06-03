# Chapter 2 Repo Cleanup Inventory

## 1. Purpose

This inventory is a documentation-only cleanup plan for Chapter 2.

It classifies the current repository so future cleanup can make GitHub easier to read without deleting, moving, renaming, or changing runtime behavior yet.

This document does not change app code, backend code, infrastructure, auth, tenancy, IAM, entitlements, DynamoDB keys, routes, Lambdas, or public API contracts.

## 2. Current Public Repo Story

The public repo story is now:

- Club Vivo is the product.
- Sports Intelligence Cloud is the AWS SaaS platform foundation behind Club Vivo.
- Session Builder is the main product wedge.
- Quick Soccer Game is the fast creative lane.
- Chapter 1 is preserved as history through `archive/chapter-1-sic` and `chapter-1-sic-closeout`.

The repo should make Club Vivo easy to understand first, then show that SIC provides the tenant-safe AWS serverless foundation underneath it.

## 3. Classification Categories

| Category | Meaning |
| --- | --- |
| Active Chapter 2 | Current Club Vivo product story, product docs, public README content, and Chapter 2 cleanup docs. |
| Active platform/architecture | Current SIC platform foundation, tenant contract, architecture principles, source maps, and AWS SaaS diagrams. |
| Active runtime/source | Current app, service, auth, infrastructure, API client, test, workflow, dataset schema, Postman, or script source. |
| Chapter 1 history | Preserved SIC learning evidence and closeout material that should not override Chapter 2 source-of-truth docs. |
| Parked future | Useful future direction that is not shipped runtime and must stay clearly labeled. |
| Proposal/presentation | Outreach, portfolio, recruiter, nonprofit, and architecture presentation material. |
| Research/learning | Scientific, certification, learning, or evidence docs that support context but do not define runtime behavior. |
| Needs inspection | Areas with mixed current, historical, generated, or source-present material that need review before classification. |
| Candidate for archive later | Material likely to be moved or classified as historical after review. No action yet. |
| Do not touch | Runtime, contracts, protected infrastructure, generated-looking but unreviewed files, and historical preservation points. |

## 4. Top-Level Folder Classification Table

| Path | Primary classification | Current read |
| --- | --- | --- |
| `README.md` | Active Chapter 2 | GitHub front door. Leads with Club Vivo and SIC platform foundation. |
| `apps/` | Active runtime/source | App source. `apps/club-vivo` is the active Club Vivo web app. Do not move or rename. |
| `services/` | Active runtime/source | Backend and auth service source. Includes Club Vivo API and Cognito trigger Lambdas. Do not rename Lambdas or handlers. |
| `infra/` | Active runtime/source / Do not touch | CDK source and related infra package files. Do not change IAM, CDK, auth, tenancy, entitlements, DynamoDB keys, or deployments. |
| `docs/` | Mixed | Active docs, platform docs, proposals, research, history, and older progress evidence. Needs classification by subfolder. |
| `datasets/` | Active runtime/source / Needs inspection | Contains schemas, including export schemas. Do not change data shape without contract review. |
| `postman/` | Active runtime/source / Needs inspection | API collections and environment templates. Useful for validation; should align with current contracts. |
| `scripts/` | Active runtime/source / Needs inspection | Smoke tooling. Do not remove before confirming CI/manual validation dependencies. |
| `.github/` | Active runtime/source / Do not touch | CI workflows and Copilot instructions. Tenant guardrails and smoke tests are repo protection. |
| `Makefile` | Active runtime/source / Needs inspection | Developer command surface. Classify after checking current usefulness. |
| `.gitattributes`, `.gitignore` | Do not touch | Repo hygiene and ignore rules. Only change through explicit cleanup decision. |
| `.venv`, `.workspace`, `.tmp-methodology-smoke`, `cdk.out`, `club-vivo-dev.log`, `club-vivo-dev.err.log` | Needs inspection / Candidate for archive or ignore review | Present in working tree listing but not in tracked top-level file list. Inspect ignore status and local-artifact policy before any action. |

## 5. Docs Folder Classification Table

| Path | Primary classification | Current read |
| --- | --- | --- |
| `docs/README.md` | Active Chapter 2 | Documentation map for current Club Vivo and SIC docs. |
| `docs/product/club-vivo/` | Active Chapter 2 / Parked future | Current product docs plus future, pilot, generation profile, and older product-shape docs. |
| `docs/product/club-vivo/chapter-2-product-constitution.md` | Active Chapter 2 | Product source of truth for Club Vivo Chapter 2. |
| `docs/product/club-vivo/quick-soccer-game.md` | Active Chapter 2 | Source doc for Quick Soccer Game as the fast creative lane. |
| `docs/product/club-vivo/future/` | Parked future | Future product ideas. Keep clearly separated from shipped behavior. |
| `docs/product/club-vivo/pilots/` | Needs inspection | Pilot context, including KSC. Useful evidence, not the generic product identity. |
| `docs/product/club-vivo/generation-profiles/` | Active Chapter 2 / Needs inspection | Product generation behavior docs. Keep aligned with actual source and avoid shipped-overclaim language. |
| `docs/architecture/` | Active platform/architecture / Needs inspection | Platform docs, Chapter 2 package, source maps, older coach-lite architecture, and future architecture. |
| `docs/architecture/chapter-2/` | Active Chapter 2 / Active platform/architecture | Chapter 2 architecture package, diagrams, Lambda inventory, and cleanup plans. |
| `docs/architecture/foundations/` | Active platform/architecture | Source-of-truth governance docs. |
| `docs/architecture/club-vivo/` | Parked future / Needs inspection | Contains Training Brief and DiagramSequence architecture material. Do not present as shipped runtime. |
| `docs/architecture/coach-lite/` | Candidate for archive later / Needs inspection | Legacy naming with useful architecture material. It now has a README labeling it as legacy / earlier architecture context; review before any move, rename, or archive decision. |
| `docs/architecture/diagrams/` | Needs inspection | Older diagram guidance. Review against Chapter 2 architecture package. |
| `docs/api/` | Active platform/architecture / Do not touch | API and cross-layer contracts. Some proposed docs exist; public contracts should not change casually. |
| `docs/proposals/` | Proposal/presentation | Proposal, recruiter, nonprofit, and walkthrough docs. README may need future update because more tracked proposal files now exist than the README lists. |
| `docs/research/` | Research/learning | Scientific article outline and supporting research. Does not define runtime behavior. |
| `docs/history/` | Chapter 1 history | Chapter 1 closeout and history README. Preserve as evidence. |
| `docs/progress/` | Research/learning / Chapter 1 history / Needs inspection | Progress summaries, New SIC notes, runtime readiness evidence, and closeouts. Classify before moving. |
| `docs/learning/` | Research/learning | AWS certification map and related learning evidence. |
| `docs/runbooks/` | Active platform/architecture / Needs inspection | Operational guidance. Keep if current; update only after source/ops review. |
| `docs/adr/` | Active platform/architecture / Chapter 1 history / Needs inspection | Decision records. Do not rewrite history casually. |
| `docs/exports/` | Needs inspection | Export-related docs need review against active export/runtime scope. |
| `docs/vision.md` | Needs inspection | Vision doc may contain older SIC-first language. Review before changing. |

## 6. Active Chapter 2 Source-Of-Truth Docs

Use these first when explaining the current repo:

- `README.md`
- `docs/README.md`
- `docs/product/club-vivo/chapter-2-product-constitution.md`
- `docs/product/club-vivo/quick-soccer-game.md`
- `docs/architecture/chapter-2/club-vivo-repo-reset-plan.md`
- `docs/architecture/chapter-2/club-vivo-saas-architecture-mermaid.md`
- `docs/architecture/chapter-2/club-vivo-saas-architecture.drawio`
- `docs/architecture/chapter-2/club-vivo-saas-architecture-diagram.drawio`
- `docs/architecture/chapter-2/club-vivo-saas-architecture.png`
- `docs/architecture/chapter-2/lambda-naming-inventory.md`
- `docs/architecture/chapter-2/github-public-face-cleanup-plan.md`
- `docs/architecture/platform-constitution.md`
- `docs/architecture/architecture-principles.md`
- `docs/architecture/tenant-claim-contract.md`
- `docs/architecture/club-vivo-source-map.md`
- `docs/architecture/foundations/source-of-truth-manifest.md`

These docs should be used to resolve naming and positioning conflicts: Club Vivo is the product, SIC is the platform foundation, Session Builder is the main wedge, and Quick Soccer Game is the fast creative lane.

## 7. Chapter 1 And History Docs

Preserve these as history and learning evidence:

- `docs/history/README.md`
- `docs/history/chapter-1-sic-closeout.md`
- `docs/progress/README.md`
- `docs/progress/weekly-progress-notes.md`
- `docs/progress/architect-process-summary.md`
- `docs/progress/new-sic/`
- archive branch: `archive/chapter-1-sic`
- closeout tag: `chapter-1-sic-closeout`

Historical docs should not be deleted or rewritten to pretend Chapter 1 did not happen. They should be classified so readers know they are evidence, not the current product story.

## 8. Parked Future Docs

The following areas are useful but should remain parked, proposed, or future unless later source inspection proves otherwise:

- `docs/product/club-vivo/future/`
- `docs/product/club-vivo/training-prescription-layer.md`
- `docs/architecture/club-vivo/training-prescription-backend-design.md`
- `docs/architecture/club-vivo/training-brief-internal-integration-design.md`
- `docs/architecture/club-vivo/diagram-sequence-spec-v1.md`
- `docs/api/training-brief-v1-contract.md`
- `docs/api/diagram-rendering-contract-v1.md`, if presented as future structured diagram work rather than shipped behavior.
- `docs/architecture/session-builder-image-assisted-intake-v1.md`
- `docs/product/club-vivo/future/image-assisted-intake-v1-scope.md`
- `docs/product/club-vivo/future/image-assisted-intake-parking-lot.md`
- `docs/progress/new-sic/match-to-match/`

Do not claim Training Brief, DiagramSequence, RAG/vector search, autonomous agents, Bedrock production generation, image analysis, or Match-to-Match Prescription as shipped Chapter 2 runtime behavior.

## 9. Duplicate Or Superseded Docs To Inspect Later

These are not cleanup actions yet. They are review candidates:

- `docs/architecture/sic-repo-inventory.md` versus this Chapter 2 cleanup inventory.
- `docs/architecture/github-showcase-cleanup-plan.md` versus `docs/architecture/chapter-2/github-public-face-cleanup-plan.md`.
- `docs/architecture/repo-structure.md` versus current README/docs maps.
- `docs/architecture/sic-current-system-map.md` versus the Chapter 2 SaaS architecture package.
- `docs/architecture/diagrams/sic-current-system-blueprint.md` versus Chapter 2 draw.io/Mermaid assets.
- `docs/architecture/coach-lite/` legacy naming versus current Club Vivo product name. The folder is now labeled with a README, but still needs future review before any move, rename, or archive decision.
- `docs/product/club-vivo/coach-workspace.md`, `role-and-workspace-model.md`, and `club-vivo-evolution-roadmap.md` versus the Chapter 2 constitution.
- `docs/product/club-vivo/session-builder.md` versus newer Session Builder and Quick Soccer Game positioning.
- `docs/proposals/README.md` versus the currently tracked proposal files.
- `docs/progress/new-sic/` closeout summaries versus `docs/history/` and current Chapter 2 closeout docs.
- `docs/vision.md` versus current Club Vivo-first public story.

Each item should be reviewed before any move, rename, archive, or rewrite.

## 10. Folders And Files Not To Touch Yet

Do not touch these during cleanup planning:

- `apps/club-vivo`
- `services/club-vivo/api`
- `services/auth`
- `infra/cdk`
- `.github/workflows`
- `docs/api`
- `datasets/schemas`
- `postman/collections`
- `postman/environments`
- `scripts/smoke`
- `archive/chapter-1-sic`
- the `chapter-1-sic-closeout` tag

Also do not casually remove local or generated-looking artifacts such as `.venv`, `.workspace`, `.tmp-methodology-smoke`, `cdk.out`, or dev logs until their tracked/ignored status and local use are explicitly reviewed.

## 11. Proposed Cleanup Phases

### Phase 1: Label And Map

- Add classification notes to docs that are active, parked, proposed, historical, or superseded.
- Update README-style folder maps where they are stale.
- Keep all files in place.

### Phase 2: Source-Of-Truth Cross-Linking

- Add "start here" links from older docs to active Chapter 2 docs.
- Point older SIC-first docs to the Club Vivo public face where appropriate.
- Keep tenant-safe docs prominent.

### Phase 3: Proposal And Presentation Cleanup

- Update `docs/proposals/README.md` to list every tracked proposal file on main.
- Separate outreach-ready proposal docs from drafts or scripts.
- Keep proposal docs honest about pilot-ready direction rather than a finished commercial SaaS launch.

### Phase 4: Historical Classification

- Mark Chapter 1 and New SIC progress docs as preserved evidence.
- Decide whether any old docs should move into `docs/history/` later.
- Do not move or delete until a dedicated archive PR is approved.

### Phase 5: Runtime-Support Folder Review

- Review `datasets/`, `postman/`, `scripts/`, `.github/`, and generated-looking infra output.
- Confirm which files are active validation assets, local artifacts, generated artifacts, or archive candidates.
- Only then decide whether ignore rules or cleanup actions are needed.

## 12. Risks And Guardrails

- Do not delete historical docs just because the product story changed.
- Do not rename routes, files, Lambdas, handlers, DynamoDB keys, or public contracts as part of docs cleanup.
- Do not change auth, tenancy, IAM, entitlements, CDK, or deployment wiring.
- Do not weaken tenant isolation language.
- Do not present future or parked ideas as shipped runtime behavior.
- Do not include image analysis in the Chapter 2 product story.
- Do not treat generated-looking folders as safe to delete until their tracked/ignored status and use are reviewed.
- Do not collapse SIC into Club Vivo. Club Vivo is the product; SIC remains the platform foundation.

## 13. Recommended Next Cleanup Slice

The best next slice is a documentation classification pass, not a move/delete pass:

1. Add short status headers to older docs that are clearly active, parked future, proposal, research, or history.
2. Update `docs/proposals/README.md` so it lists all tracked proposal files currently on main.
3. Review `docs/progress/new-sic/` and classify which files are history, evidence, or candidate archive material.
4. Review generated-looking root and infra artifacts, then decide separately whether ignore or cleanup changes are needed.
5. After broader classification, decide whether labeled legacy areas such as `docs/architecture/coach-lite/` should stay in place, move, or archive later.

This keeps the repo easier to read while preserving Chapter 1 evidence and protecting the runtime platform.
