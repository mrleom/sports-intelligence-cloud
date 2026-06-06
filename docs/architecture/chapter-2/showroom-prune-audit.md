# Chapter 2 Showroom Prune Audit

## 1. Purpose

This audit prepares `main` to become a cleaner GitHub product showroom for Club Vivo, powered by the Sports Intelligence Cloud platform foundation.

It does not perform the prune. It does not delete, move, rename, rewrite, or update existing files. It classifies current docs and folders so a later PR can make conservative, reviewable cleanup decisions.

The desired showroom should help a coach, nonprofit stakeholder, recruiter, or technical reviewer understand the product story quickly without walking through every historical plan, closeout, draft, future idea, and cleanup note.

## 2. Guardrails

This audit must not change:

- app code
- backend code
- infrastructure/CDK
- auth
- tenancy
- IAM
- entitlements
- DynamoDB keys
- routes
- Lambdas
- public API contracts
- GitHub Actions
- Amplify assumptions
- package/config/build files

Later pruning must not weaken:

- tenant identity derived from verified auth plus authoritative entitlements
- rejection of client-supplied `tenant_id`, `tenantId`, or `x-tenant-id`
- fail-closed tenant context behavior
- tenant-scoped DynamoDB key construction
- tenant-scoped S3 storage paths
- tiering as capability control, not isolation control
- current API contract discipline
- CDK/IAM review boundaries
- shipped-vs-proposed language

## 3. Current Showroom Story

- Club Vivo is the product face of the repository.
- Sports Intelligence Cloud is the AWS SaaS platform foundation behind Club Vivo.
- Session Builder is the main product wedge.
- Quick Soccer Game is the fast creative lane inside the same shared Club Vivo workflow.
- Coach Workspace, Teams, Sessions, Feedback, Export, Equipment Essentials, and Methodology support the coaching workflow where source-present or clearly scoped.
- The platform is tenant-safe by construction: verified auth, authoritative entitlements, tenant-scoped data access, and fail-closed behavior.
- Chapter 1 and New SIC work are preserved as history and evidence, not the current public product story.
- Future concepts should remain parked unless current source proves runtime behavior.
- The repo should read as a practical soccer coaching SaaS and credible AWS architecture portfolio, not as a storage room of every idea.

## 4. Canonical Docs

These should be the few main truth docs for GitHub readers:

- `README.md`
- `docs/README.md`
- `docs/product/club-vivo/README.md`
- `docs/product/club-vivo/chapter-2-product-constitution.md`
- `docs/product/club-vivo/session-builder.md`
- `docs/product/club-vivo/quick-soccer-game.md`
- `docs/architecture/platform-constitution.md`
- `docs/architecture/architecture-principles.md`
- `docs/architecture/tenant-claim-contract.md`
- `docs/architecture/club-vivo-source-map.md`
- `docs/architecture/chapter-2/club-vivo-saas-architecture.png`
- `docs/architecture/chapter-2/club-vivo-saas-architecture.drawio`
- `docs/architecture/chapter-2/club-vivo-saas-architecture-mermaid.md`
- `docs/architecture/chapter-2/lambda-naming-inventory.md`
- `docs/api/README.md`
- `docs/runbooks/`

Secondary but useful if kept visible:

- `docs/proposals/club-vivo-external-proposal.md`
- `docs/proposals/club-vivo-coach-recruiter-architecture-brief.md`
- `docs/proposals/club-vivo-architecture-walkthrough-script.md`
- `docs/history/README.md`
- `docs/history/chapter-1-sic-closeout.md`
- `docs/progress/weekly-progress-notes.md`
- `docs/progress/architect-process-summary.md`

## 5. KEEP_ON_MAIN

| Path | Why it stays | Notes |
| --- | --- | --- |
| `README.md` | GitHub front door for Club Vivo on SIC. | Keep concise and product-first. |
| `docs/README.md` | Main documentation map and reading model. | Should remain the public docs index. |
| `docs/product/club-vivo/README.md` | Club Vivo product-doc landing page. | Good current reading model for active, pilot, and future docs. |
| `docs/product/club-vivo/chapter-2-product-constitution.md` | Product governance for Chapter 2. | Canonical product positioning. |
| `docs/product/club-vivo/session-builder.md` | Main product wedge spec. | Needs later title/encoding cleanup, but content is core. |
| `docs/product/club-vivo/quick-soccer-game.md` | Canonical fast-lane product story. | Keep as the Quick Session language bridge. |
| `docs/product/club-vivo/coaching-session-design-standard.md` | Supports coach-ready output quality. | Keep if it stays aligned to Session Builder. |
| `docs/product/club-vivo/session-generation-quality-standards.md` | Defines quality expectations for generation. | Could later be summarized from `session-builder.md`. |
| `docs/product/club-vivo/golden-template-library-v1.md` | Supports deterministic/template-based Session Builder quality. | Keep if source-present template work remains a product asset. |
| `docs/product/club-vivo/soccer-development-taxonomy-v1.md` | Supports soccer-specific output and generation language. | Keep as product support, not shipped AI claim. |
| `docs/product/club-vivo/pilots/README.md` | Keeps pilot docs separated from general product truth. | Useful guardrail. |
| `docs/product/club-vivo/pilots/ksc/README.md` | Marks KSC as pilot context, not generic product model. | Keep while KSC evidence remains useful. |
| `docs/architecture/platform-constitution.md` | Platform direction and guardrails. | Keep, but do not let future workflow language overclaim shipped runtime. |
| `docs/architecture/architecture-principles.md` | Non-negotiable engineering principles. | Protected governance doc. |
| `docs/architecture/tenant-claim-contract.md` | Authoritative tenant-context contract. | Safety-critical. |
| `docs/architecture/club-vivo-source-map.md` | Best reader-oriented source map for current Club Vivo. | Prefer over heavier inventories for public readers. |
| `docs/architecture/chapter-2/club-vivo-saas-architecture.png` | Public visual in root README. | Keep as final visual asset. |
| `docs/architecture/chapter-2/club-vivo-saas-architecture.drawio` | Editable source for public visual. | Keep with PNG. |
| `docs/architecture/chapter-2/club-vivo-saas-architecture-mermaid.md` | Text source for current architecture visual. | Keep as conservative diagram source. |
| `docs/architecture/chapter-2/lambda-naming-inventory.md` | Prevents product-story cleanup from renaming deployed Lambdas/routes. | Strong guardrail doc. |
| `docs/architecture/foundations/source-of-truth-manifest.md` | Governs source-of-truth order. | Keep as internal governance. |
| `docs/api/` | API and cross-layer contracts. | Do not prune casually. Some docs are proposed, but the folder is protected. |
| `docs/runbooks/` | Operational support guidance. | Keep unless a later ops review retires specific runbooks. |
| `docs/history/README.md` | Explains Chapter 1 preservation. | Keep concise history entry. |
| `docs/history/chapter-1-sic-closeout.md` | Records the Chapter 1 closeout. | Keep as preserved history. |
| `docs/progress/weekly-progress-notes.md` | Concise progress history. | Keep only if progress evidence remains useful on main. |
| `docs/progress/architect-process-summary.md` | Concise architecture/process history. | Better than many detailed closeouts. |
| `docs/proposals/README.md` | Keeps proposal docs honest about shipped vs proposed. | Keep if proposal folder remains. |
| `docs/proposals/club-vivo-external-proposal.md` | Broadest polished external proposal. | Good candidate for canonical proposal. |
| `docs/proposals/club-vivo-coach-recruiter-architecture-brief.md` | Recruiter/technical architecture story. | Keep if portfolio-facing docs remain on main. |
| `docs/proposals/club-vivo-architecture-walkthrough-script.md` | Short explainable architecture script. | Useful with the architecture PNG. |

## 6. MERGE_INTO_CANONICAL_DOC

| Path | Merge into | Reason | Useful content to preserve |
| --- | --- | --- | --- |
| `docs/architecture/github-showcase-cleanup-plan.md` | `docs/architecture/chapter-2/showroom-prune-audit.md` and `docs/architecture/repo-structure.md` | Older cleanup plan overlaps with Chapter 2 reset and showroom cleanup. | Product-doc migration map, KSC-specific rule, do-not-move review questions. |
| `docs/architecture/chapter-2/github-public-face-cleanup-plan.md` | `README.md`, `docs/README.md`, and this audit | It describes work already reflected in current public docs. | Public face reminder and folders needing future classification. |
| `docs/architecture/chapter-2/club-vivo-repo-reset-plan.md` | `docs/product/club-vivo/chapter-2-product-constitution.md` and `docs/architecture/chapter-2/lambda-naming-inventory.md` | Reset plan is mostly now source-of-truth language plus guardrails. | Non-negotiable reset boundaries and source-present-but-unwired route caution. |
| `docs/architecture/chapter-2/club-vivo-saas-diagram-prompt.md` | `docs/architecture/chapter-2/club-vivo-saas-architecture-mermaid.md` | Intermediate diagram prompt duplicates final diagram intent. | Explicit exclusions and purpose-based route labels, already mostly preserved. |
| `docs/architecture/chapter-2/club-vivo-saas-drawio-brief.md` | `docs/architecture/chapter-2/club-vivo-saas-architecture-mermaid.md` and `.drawio` asset notes | Handoff brief is useful during creation but noisy after final diagram exists. | Audience framing and tenant-safety callout language. |
| `docs/architecture/chapter-2/club-vivo-saas-diagram-layout.md` | `docs/architecture/chapter-2/club-vivo-saas-architecture.drawio` or a short diagram maintenance note | Draw.io layout source is an intermediate construction artifact. | Shape/connector specs only if future diagram maintenance needs them. |
| `docs/architecture/sic-current-system-map.md` | `docs/architecture/club-vivo-source-map.md` | Heavy internal system map overlaps with the cleaner Club Vivo source map. | CDK-wired route list, current runtime flow, and unwired export/lake caution. |
| `docs/architecture/sic-repo-inventory.md` | `docs/architecture/club-vivo-source-map.md` and `docs/architecture/repo-structure.md` | Large inventory overlaps with folder maps and source map. | Runtime/source inventory and "not CDK-wired" source facts. |
| `docs/product/club-vivo/coach-workspace.md` | `docs/product/club-vivo/chapter-2-product-constitution.md` or a refreshed `coach-workspace.md` | Path is current but title/content still carries SIC Coach Lite and Week 21 language. | Active workspace surfaces, non-claims, team/methodology workspace boundaries. |
| `docs/product/club-vivo/role-and-workspace-model.md` | `docs/product/club-vivo/chapter-2-product-constitution.md` | Role/workspace story should be governed in fewer product truth docs. | Role definitions and one-shared-app model. |
| `docs/product/club-vivo/user-flows.md` | `docs/product/club-vivo/session-builder.md` | Older SIC Coach Lite user flows overlap with Session Builder/Coach Workspace. | Generate, refine, save, export flow details if current. |
| `docs/product/club-vivo/club-vivo-evolution-roadmap.md` | `docs/product/club-vivo/chapter-2-product-constitution.md` and `docs/product/club-vivo/future/README.md` | Useful roadmap but future-heavy for the showroom. | Strategic chain and parked-scope cautions. |
| `docs/product/sic-coach-lite/club-vivo-session-output-design-plan.md` | `docs/product/club-vivo/coaching-session-design-standard.md` | Legacy folder with product-output guidance. | Route-by-route output design observations. |
| `docs/architecture/coach-lite/coach-lite-generation-flow.md` | `docs/product/club-vivo/session-builder.md` or a current Club Vivo architecture note | Legacy name; durable generation-flow material. | Tenant-safe generation pipeline and validation-first principles. |
| `docs/architecture/coach-lite/diagram-rendering-architecture.md` | `docs/architecture/club-vivo/diagram-sequence-spec-v1.md` and `docs/api/diagram-rendering-contract-v1.md` | Legacy diagram architecture overlaps with current DiagramSequence direction. | Deterministic SVG/rendering principles. |
| `docs/architecture/coach-lite/drill-diagram-spec-v1.md` | `docs/architecture/club-vivo/diagram-sequence-spec-v1.md` | Older spec overlaps current proposed diagram sequence model. | DrillDiagramSpec fields still used by current types/validators. |
| `docs/architecture/coach-lite/tenant-methodology-knowledge.md` | `docs/product/club-vivo/methodology.md` and `docs/api/methodology-v1-contract.md` | Legacy methodology architecture overlaps current methodology docs. | Tenant-scoped methodology knowledge guardrails. |
| `docs/product/club-vivo/future/image-assisted-intake-v1-scope.md` | `docs/product/club-vivo/future/image-assisted-intake-parking-lot.md` | Scope note and parking lot cover the same future idea. | Coach confirmation boundary and narrow mode limits. |
| `docs/architecture/session-builder-image-assisted-intake-v1.md` | `docs/product/club-vivo/future/image-assisted-intake-parking-lot.md` plus source map note | Historical architecture note overlaps parked future image docs. | Tenant-scoped image storage and Bedrock adapter boundary. |
| `docs/proposals/club-vivo-nonprofit-saas-proposal.md` | `docs/proposals/club-vivo-external-proposal.md` | Long nonprofit proposal overlaps external proposal. | Nonprofit value framing and protected platform model. |
| `docs/proposals/club-vivo-nonprofit-saas-one-page.md` | `docs/proposals/club-vivo-external-proposal.md` | One-page repeats the same problem/solution/pilot story. | Short sendable language. |
| `docs/proposals/club-vivo-nonprofit-pilot-message.md` | `docs/proposals/club-vivo-external-proposal.md` or a small outreach appendix | Outreach message repeats proposal story. | Email/WhatsApp draft if actively used. |
| `docs/proposals/club-vivo-recruiter-message.md` | `docs/proposals/club-vivo-coach-recruiter-architecture-brief.md` | Short recruiter message overlaps architecture brief. | One-line version and short message. |
| `docs/progress/new-sic/docs-readiness-duplication-audit.md` | This audit and `docs/progress/README.md` | Prior duplication audit is useful evidence but redundant for showroom pruning. | Readiness/deployment overlap findings. |

## 7. RENAME_FOR_CLARITY_LATER

| Current path | Suggested clearer name/path | Reason | Risk/notes |
| --- | --- | --- | --- |
| `docs/architecture/coach-lite/` | `docs/architecture/club-vivo/legacy-coach-lite/` or migrate files into current Club Vivo architecture paths | `coach-lite` is legacy naming and distracts from Club Vivo. | Medium. Must migrate useful references first. |
| `docs/product/sic-coach-lite/` | `docs/history/legacy-product/sic-coach-lite/` or remove after merge | Legacy product folder remains outside current Club Vivo product tree. | Medium. Review references before move/remove. |
| `docs/product/club-vivo/coach-workspace.md` | Same path, title changed later to `Club Vivo Coach Workspace` | File path is fine; title still says SIC Coach Lite and Week 21. | Low if title/status only; do not rewrite behavior claims casually. |
| `docs/product/club-vivo/methodology.md` | Same path, title changed later to `Club Vivo Methodology` | Current title says SIC Coach Lite. | Low to medium; methodology claims must match source/API contract. |
| `docs/product/club-vivo/user-flows.md` | Same path, title changed later to `Club Vivo User Flows` | Current title says SIC Coach Lite. | Medium; may be better merged than renamed. |
| `docs/product/club-vivo/generation-profiles/soccer.md` | Same path, title changed later to `Club Vivo Soccer Generation Profile` | Current title says SIC Coach Lite. | Low. |
| `docs/product/club-vivo/generation-profiles/fut-soccer.md` | Same path, title changed later to `Club Vivo Fut-Soccer Generation Profile` | Current title says SIC Coach Lite and may imply shipped product flavor. | Medium; verify current source before claims. |
| `docs/product/club-vivo/future/roadmap-phases.md` | `docs/product/club-vivo/future/legacy-coach-lite-roadmap-phases.md` | Current filename is generic but content is old SIC Coach Lite roadmap. | Medium; future-heavy and likely candidate for archive. |
| `docs/progress/new-sic/` | `docs/history/new-sic-progress/` or remove from main after summary | Folder name is historically accurate but confusing in Chapter 2 showroom. | Medium/high. Preserve evidence and links first. |
| `docs/architecture/sic-current-system-map.md` | `docs/architecture/internal-system-map.md` if kept | Current name is SIC-first and heavy for public readers. | Medium. Could instead be superseded. |
| `docs/architecture/sic-repo-inventory.md` | `docs/architecture/internal-repo-inventory.md` if kept | Useful but too large and internal for the public path. | Medium. Could instead be superseded by source map plus repo structure. |
| `docs/product/club-vivo/training-prescription-layer.md` | `docs/product/club-vivo/future/training-brief-and-prescription-direction.md` | It is explicitly future/parked but sits beside active product docs. | Medium/high. Product decision needed. |
| `docs/product/club-vivo/football-intelligence-learning-layer.md` | `docs/product/club-vivo/future/football-intelligence-learning-layer.md` | Proposed learning layer sits among active docs. | Medium. It may be better parked. |
| `docs/product/future/` | `docs/history/future-concepts/` or keep only if broad SIC future concepts are desired on main | Broader non-Club Vivo concepts distract from showroom. | Medium. Product positioning decision. |

## 8. MARK_SUPERSEDED

| Path | Superseded by | Reason | Suggested note to add later |
| --- | --- | --- | --- |
| `docs/architecture/github-showcase-cleanup-plan.md` | `docs/architecture/chapter-2/repo-cleanup-inventory.md` and this audit | Older cleanup plan from pre-showroom phase. | "Superseded by Chapter 2 showroom prune audit; preserve for history until removed." |
| `docs/architecture/chapter-2/github-public-face-cleanup-plan.md` | `README.md`, `docs/README.md`, and `docs/progress/chapter-2-public-face-closeout.md` | Public-face cleanup is already reflected in current docs. | "Superseded by current README/docs README and closeout." |
| `docs/architecture/chapter-2/club-vivo-repo-reset-plan.md` | Current product constitution, source map, lambda inventory, and this audit | Reset plan is largely complete and overlaps active docs. | "Superseded as a reset plan; use active source-of-truth docs." |
| `docs/architecture/chapter-2/club-vivo-saas-diagram-prompt.md` | `docs/architecture/chapter-2/club-vivo-saas-architecture-mermaid.md` | Prompt is an intermediate creation aid. | "Superseded by final Mermaid/draw.io/PNG architecture assets." |
| `docs/architecture/chapter-2/club-vivo-saas-drawio-brief.md` | `docs/architecture/chapter-2/club-vivo-saas-architecture.drawio` and Mermaid doc | Handoff brief is less useful once final asset exists. | "Superseded by final architecture diagram sources." |
| `docs/architecture/chapter-2/club-vivo-saas-diagram-layout.md` | `docs/architecture/chapter-2/club-vivo-saas-architecture.drawio` | Layout source duplicates final draw.io file. | "Superseded by editable draw.io file." |
| `docs/architecture/chapter-2/repo-cleanup-inventory.md` | This audit, after prune decisions begin | It is still useful but becomes a broader inventory once this audit exists. | "For prune decisions, start with showroom-prune-audit.md." |
| `docs/architecture/chapter-2/local-artifact-audit.md` | `docs/runbooks/local-cleanup-runbook.md`, if a runbook covers the same local cleanup rules | Local artifact audit is evidence, not current product story. | "Historical audit evidence; use local cleanup runbook for active guidance." |
| `docs/progress/chapter-2-public-face-closeout.md` | `README.md`, `docs/README.md`, and this audit | Closeout is historical evidence of completed cleanup. | "Historical closeout; not current source of truth." |
| `docs/progress/chapter-2-repo-cleanup-closeout.md` | This audit and current docs maps | Closeout overlaps with ongoing showroom prune decisions. | "Historical closeout; use showroom prune audit for next cleanup decisions." |
| `docs/progress/chapter-2-cleanup-workspace-closeout.md` | Current README/docs maps and this audit | Workspace closeout is useful evidence but too narrative for showroom. | "Historical closeout; current reading model lives in README/docs." |
| `docs/progress/new-sic/docs-readiness-duplication-audit.md` | This audit | Prior duplication audit is narrower and historical. | "Historical duplication audit; current prune guidance supersedes it." |

## 9. REMOVE_FROM_MAIN_AFTER_REVIEW

| Path | Reason it is noisy | Where history is preserved | Risk level | Review needed before removal |
| --- | --- | --- | --- | --- |
| `docs/architecture/chapter-2/club-vivo-saas-diagram-prompt.md` | Intermediate diagram prompt after final assets exist. | Git history and final diagram docs. | low | Confirm no docs link to it as required source. |
| `docs/architecture/chapter-2/club-vivo-saas-drawio-brief.md` | Intermediate handoff brief after final draw.io/PNG exist. | Git history and final diagram docs. | low | Preserve any unique audience/callout language first. |
| `docs/architecture/chapter-2/club-vivo-saas-diagram-layout.md` | Manual layout source duplicates editable draw.io. | Git history and `.drawio` file. | low | Confirm draw.io asset is editable and complete. |
| `docs/architecture/chapter-2/github-public-face-cleanup-plan.md` | Completed cleanup plan. | Git history and closeout docs. | low | Add superseded note or remove after link check. |
| `docs/architecture/github-showcase-cleanup-plan.md` | Older cleanup/restructure plan overlaps newer Chapter 2 docs. | Git history, prior PRs, current inventory. | medium | Preserve migration map and open decisions if still useful. |
| `docs/architecture/chapter-2/local-artifact-audit.md` | Local artifact evidence is not product showroom material. | Git history and local cleanup runbook. | medium | Make sure it is not the only place recording ignored artifact risk. |
| `docs/progress/chapter-2-public-face-closeout.md` | Closeout narrative clutters current product story. | Git history and current README/docs. | low | Keep if progress evidence on main is desired. |
| `docs/progress/chapter-2-repo-cleanup-closeout.md` | Closeout narrative overlaps this audit. | Git history and this audit. | low/medium | Ensure commit/PR references are not needed on main. |
| `docs/progress/chapter-2-cleanup-workspace-closeout.md` | Very useful narrative, but too long for showroom. | Git history and current docs maps. | medium | Preserve key next-phase decisions if not in this audit. |
| `docs/progress/new-sic/closeout-summary-*.md` | Many detailed closeouts create archive feel. | `archive/chapter-1-sic`, tags, and Git history. | medium | Review for unique facts before removing from main. |
| `docs/progress/new-sic/match-to-match/` | Parked future direction that distracts from Session Builder/Quick Soccer Game. | Git history and future product docs if summarized. | medium/high | Confirm no active source/docs depend on it. |
| `docs/progress/new-sic/session-builder-core/output-quality-*.md` | Detailed QA evidence is useful but too deep for main showroom. | Git history; summary can live in Session Builder quality docs. | medium | Preserve actionable quality findings first. |
| `docs/progress/new-sic/session-builder-core/template-quality-matrix.md` | Detailed progress matrix belongs in evidence/archive more than showroom. | Git history; golden template docs. | medium | Preserve current template implications if still accurate. |
| Removed Session Builder diagram-language research note | Research/progress note overlapped diagram specs and has been consolidated. | Git history; DiagramSequence/diagram contract docs. | medium | Durable diagram vocabulary is now preserved in the Session Builder core evidence index and current diagram standards. |
| `docs/progress/new-sic/club-vivo-runtime-readiness-evidence.md` | Evidence log, not current reader path. | Git history and runbooks. | medium | Keep if deployment proof on main is needed. |
| `docs/progress/new-sic/club-vivo-runtime-readiness-checklist.md` | Checklist overlaps runbooks and deployment docs. | Git history; runbooks. | medium | Review against `docs/runbooks/how-to-ship.md` and `smoke-tests.md`. |
| `docs/progress/new-sic/deployment-readiness-checklist.md` | Operational checklist under progress history. | Git history; runbooks. | medium | Decide whether to promote to runbook or remove. |
| `docs/progress/new-sic/hosting-and-domain-launch-plan.md` | Hosting plan is not core product showroom. | Git history. | medium | Keep if Amplify/domain decision history is needed. |
| `docs/research/club-vivo-scientific-article-outline.md` | Research outline may distract from product/runtime truth. | Git history or a future research branch. | medium | Keep only if public academic positioning is desired. |
| `docs/product/future/ruta-viva.md` | Future SIC concept outside current Club Vivo story. | Git history. | medium | Product decision: keep broad SIC future concepts on main or not. |
| `docs/product/future/athlete-evolution-ai.md` | Future SIC concept outside current Club Vivo story. | Git history. | medium | Product decision: keep broad SIC future concepts on main or not. |
| `docs/product/club-vivo/future/7q-board-game-learning-surface.md` | Interesting future learning surface, not shipped runtime. | Git history or future docs branch. | medium | Preserve if future product strategy needs it. |
| `docs/product/club-vivo/future/roadmap-phases.md` | Old SIC Coach Lite roadmap language. | Git history and current constitution/roadmap if summarized. | medium | Preserve active roadmap implications only. |
| `docs/product/club-vivo/future/image-assisted-intake-v1-scope.md` | Duplicates image parking lot and architecture note. | Git history; one parked image note. | medium | Merge guardrails first. |
| `docs/product/club-vivo/football-intelligence-learning-layer.md` | Proposed learning layer sits among active product docs. | Git history or future folder. | medium/high | Move to future or remove only after product decision. |
| `docs/proposals/club-vivo-nonprofit-saas-proposal.md` | Overlaps external proposal. | Git history and external proposal. | low/medium | Preserve any final sendable language. |
| `docs/proposals/club-vivo-nonprofit-saas-one-page.md` | Overlaps external proposal. | Git history and external proposal. | low | Keep only if actively sendable. |
| `docs/proposals/club-vivo-nonprofit-pilot-message.md` | Outreach draft, not core repo story. | Git history. | low | Keep if currently used. |
| `docs/proposals/club-vivo-recruiter-message.md` | Overlaps recruiter architecture brief. | Git history and architecture brief. | low | Preserve one-line pitch if useful. |
| `docs/learning/aws-certification-map-club-vivo.md` | Learning/certification evidence distracts from product showroom. | Git history. | medium | Decide if portfolio evidence belongs on main. |

## 10. DO_NOT_TOUCH

| Path/folder | Reason protected |
| --- | --- |
| `apps/` | Active frontend app source. Do not prune for docs cleanup. |
| `services/` | Backend API and auth source. Includes runtime and tests. |
| `infra/` | CDK/IAM/auth/API infrastructure source. |
| `.github/` | CI, smoke, and tenant guardrail workflows. |
| `scripts/` | Smoke and validation tooling. |
| `postman/` | API validation assets and environment templates. |
| `datasets/` | Checked schemas; CI and export docs may depend on them. |
| `docs/api/` | Public and cross-layer contracts. Some are proposed, but the folder is contract-sensitive. |
| `docs/runbooks/` | Operational guidance and support procedures. |
| `README.md` | GitHub front door. Edit only with explicit docs scope. |
| `docs/README.md` | Main docs index. Edit only with explicit docs scope. |
| `.gitattributes` | Repo behavior/config. |
| `.gitignore` | Local artifact protection. |
| `Makefile` | Developer validation command surface. |
| `club-vivo.code-workspace` | Focused workspace file; do not remove as part of doc prune. |
| `apps/club-vivo/package.json` and `apps/club-vivo/package-lock.json` | Frontend package/build config. |
| `apps/club-vivo/next.config.mjs`, `postcss.config.mjs`, `tsconfig.json`, `next-env.d.ts` | Frontend build/config files. |
| `services/club-vivo/api/package.json` and `package-lock.json` | API package/test config. |
| `services/auth/post-confirmation/package.json` and `package-lock.json` | Auth Lambda package/test config. |
| `infra/cdk/package.json`, `package-lock.json`, `tsconfig.json`, `cdk.json` | CDK build/deploy config. |
| `docs/adr/` | Architecture decision history. Do not rewrite casually. |
| `docs/architecture/architecture-principles.md` | Platform governance. |
| `docs/architecture/tenant-claim-contract.md` | Tenant contract. |
| `docs/architecture/platform-constitution.md` | Platform constitution. |
| `docs/architecture/chapter-2/lambda-naming-inventory.md` | Prevents accidental runtime/deployed-name changes. |

## 11. Duplicate / Overlap Clusters

* Cluster name: Repo cleanup / public face / reset / showroom
* Files involved: `docs/architecture/github-showcase-cleanup-plan.md`, `docs/architecture/chapter-2/club-vivo-repo-reset-plan.md`, `docs/architecture/chapter-2/github-public-face-cleanup-plan.md`, `docs/architecture/chapter-2/repo-cleanup-inventory.md`, `docs/architecture/chapter-2/local-artifact-audit.md`, `docs/progress/chapter-2-public-face-closeout.md`, `docs/progress/chapter-2-repo-cleanup-closeout.md`, `docs/progress/chapter-2-cleanup-workspace-closeout.md`
* What overlaps: All explain the move from SIC/Coach Lite history toward Club Vivo as the product face, with repeated guardrails and cleanup boundaries.
* Recommended canonical home: This audit for prune decisions; `README.md` and `docs/README.md` for current reading model.
* Recommended action: Mark older cleanup plans superseded, remove intermediate cleanup docs after link checks, and keep only concise history if needed.

* Cluster name: Source maps / folder maps / inventories
* Files involved: `docs/architecture/club-vivo-source-map.md`, `docs/architecture/repo-structure.md`, `docs/architecture/sic-repo-inventory.md`, `docs/architecture/sic-current-system-map.md`, `docs/architecture/chapter-2/lambda-naming-inventory.md`, `docs/architecture/README.md`
* What overlaps: Current source layout, active route families, source-present/unwired folders, top-level repo orientation.
* Recommended canonical home: `docs/architecture/club-vivo-source-map.md` for readers; `docs/architecture/repo-structure.md` for placement rules; `lambda-naming-inventory.md` for deployed Lambda names.
* Recommended action: Keep canonical maps; merge unique facts from heavy inventories; mark old large maps superseded or internal after review.

* Cluster name: Session Builder product docs
* Files involved: `docs/product/club-vivo/session-builder.md`, `chapter-2-product-constitution.md`, `coaching-session-design-standard.md`, `session-generation-quality-standards.md`, `golden-template-library-v1.md`, `soccer-development-taxonomy-v1.md`, `docs/progress/new-sic/session-builder-core/*`
* What overlaps: Session Builder as main wedge, deterministic/template-based generation, output quality, coaching standards, diagram quality, save/export/review loop.
* Recommended canonical home: `chapter-2-product-constitution.md` for governance; `session-builder.md` for the product/spec; quality docs only if they remain focused.
* Recommended action: Keep current product docs; move detailed progress evaluations out of main after preserving useful quality findings.

* Cluster name: Quick Session vs Quick Soccer Game language
* Files involved: `docs/product/club-vivo/quick-soccer-game.md`, `docs/product/club-vivo/session-builder.md`, `docs/architecture/chapter-2/lambda-naming-inventory.md`, `docs/architecture/club-vivo-source-map.md`, current source paths under `apps/club-vivo/app/(protected)/sessions/quick*`
* What overlaps: Product name is Quick Soccer Game; current source and origin names still use Quick Session.
* Recommended canonical home: `docs/product/club-vivo/quick-soccer-game.md`
* Recommended action: Use Quick Soccer Game in product/docs narrative; use Quick Session only for current source paths, route/helper names, and saved-origin references. Do not rename code in a prune PR.

* Cluster name: Training Brief / Training Prescription / DiagramSequence future docs
* Files involved: `docs/product/club-vivo/training-prescription-layer.md`, `docs/product/club-vivo/club-vivo-evolution-roadmap.md`, `docs/architecture/club-vivo/training-prescription-backend-design.md`, `docs/architecture/club-vivo/training-brief-internal-integration-design.md`, `docs/api/training-brief-v1-contract.md`, `docs/architecture/club-vivo/diagram-sequence-spec-v1.md`, `docs/product/club-vivo/football-intelligence-learning-layer.md`
* What overlaps: Proposed evidence-to-training bridge, Training Brief candidate/handoff, DiagramSequence, future intelligence loop.
* Recommended canonical home: A future/parked Club Vivo product doc plus the proposed API/architecture specs if kept.
* Recommended action: Keep shipped-vs-proposed labels explicit. Consider moving future product docs under `docs/product/club-vivo/future/` or removing from main after review.

* Cluster name: Coach-lite legacy docs
* Files involved: `docs/architecture/coach-lite/*`, `docs/product/sic-coach-lite/club-vivo-session-output-design-plan.md`, `docs/product/club-vivo/coach-workspace.md`, `methodology.md`, `user-flows.md`, `generation-profiles/*.md`, `future/roadmap-phases.md`
* What overlaps: Older Coach Lite product/generation/diagram/methodology language now lives beside Club Vivo docs.
* Recommended canonical home: Current `docs/product/club-vivo/` and `docs/architecture/club-vivo/` docs.
* Recommended action: Migrate durable decisions, update titles/status later, then archive/remove legacy paths after reference checks.

* Cluster name: Image-assisted intake
* Files involved: `docs/architecture/session-builder-image-assisted-intake-v1.md`, `docs/product/club-vivo/future/image-assisted-intake-v1-scope.md`, `docs/product/club-vivo/future/image-assisted-intake-parking-lot.md`, `docs/runbooks/session-builder-image-assisted-intake-v1-failures.md`, source map references to Bedrock/image analysis.
* What overlaps: Week 18 image-assisted intake scope, tenant-scoped image storage, Bedrock adapter, coach-confirmation boundary, and future parking lot.
* Recommended canonical home: One parked future image-assisted intake note, plus source map note for source-present code.
* Recommended action: Merge useful guardrails into parking lot doc; keep image analysis out of Chapter 2 product showroom claims.

* Cluster name: Proposal drafts
* Files involved: `docs/proposals/club-vivo-external-proposal.md`, `club-vivo-nonprofit-saas-proposal.md`, `club-vivo-nonprofit-saas-one-page.md`, `club-vivo-nonprofit-pilot-message.md`, `club-vivo-recruiter-message.md`, `club-vivo-coach-recruiter-architecture-brief.md`, `club-vivo-architecture-walkthrough-script.md`
* What overlaps: Same product problem, Session Builder wedge, Quick Soccer Game lane, tenant-safe AWS trust points, nonprofit pilot framing.
* Recommended canonical home: `club-vivo-external-proposal.md` plus `club-vivo-coach-recruiter-architecture-brief.md` and walkthrough script if wanted.
* Recommended action: Keep final sendable docs; merge or remove draft variants after review.

* Cluster name: Progress closeouts
* Files involved: `docs/progress/chapter-2-*.md`, `docs/progress/new-sic/closeout-summary-*.md`, `docs/progress/new-sic/*audit*.md`, `docs/progress/new-sic/session-builder-core/*`
* What overlaps: Build evidence, cleanup decisions, readiness evidence, quality findings, and old New SIC checkpoints.
* Recommended canonical home: `docs/progress/README.md`, `weekly-progress-notes.md`, `architect-process-summary.md`, `docs/history/`
* Recommended action: Keep concise summaries; remove detailed closeouts from main after preserving any unique active facts.

* Cluster name: Research / scientific paper docs
* Files involved: `docs/research/club-vivo-scientific-article-outline.md`, `docs/product/club-vivo/football-intelligence-learning-layer.md`, `docs/product/club-vivo/future/7q-board-game-learning-surface.md`
* What overlaps: Research framing, learning layer, 7Q framework, future study/product ideas.
* Recommended canonical home: `docs/research/` if public research positioning matters, otherwise future/archive branch.
* Recommended action: Keep out of active product docs. Consider removing from main if showroom clarity matters more than research evidence.

* Cluster name: KSC pilot docs
* Files involved: `docs/product/club-vivo/pilots/ksc/README.md`, `program-types-and-methodology.md`, older KSC references in `coach-workspace.md`, progress closeouts.
* What overlaps: KSC program/methodology context and pilot-specific product evidence.
* Recommended canonical home: `docs/product/club-vivo/pilots/ksc/`
* Recommended action: Keep only if pilot evidence is useful on main. Do not let KSC define generic Club Vivo product truth.

* Cluster name: Methodology docs
* Files involved: `docs/product/club-vivo/methodology.md`, `docs/api/methodology-v1-contract.md`, `docs/architecture/coach-lite/tenant-methodology-knowledge.md`, `docs/product/club-vivo/future/methodology-source-mode-planning.md`, `docs/product/club-vivo/pilots/ksc/program-types-and-methodology.md`
* What overlaps: Tenant-scoped methodology, admin/coach behavior, KSC-specific methodology, future source-mode/RAG ideas.
* Recommended canonical home: `docs/product/club-vivo/methodology.md` and `docs/api/methodology-v1-contract.md`
* Recommended action: Merge legacy tenant-knowledge principles; keep source-mode/RAG parked; keep KSC-specific details under pilot docs.

* Cluster name: AI / agentic workflow docs
* Files involved: `docs/architecture/ai-evaluation-harness.md`, `docs/architecture/platform-constitution.md`, `docs/product/club-vivo/club-vivo-evolution-roadmap.md`, `training-prescription-layer.md`, `docs/api/training-brief-v1-contract.md`, progress closeouts 10-12.
* What overlaps: AI/ML discipline, bounded agentic coaching workflow, Training Brief, future intelligence loop.
* Recommended canonical home: `platform-constitution.md` for guardrails; future/parked product docs for workflow direction.
* Recommended action: Keep non-claims prominent. Do not claim RAG, Bedrock production generation, autonomous agents, data lake, ETL, analytics pipeline, or Training Brief as shipped unless source and current contracts prove it.

## 12. Recommended First Prune PR

Make the first prune PR low-risk and documentation-only.

Recommended scope:

- Remove from main after link check:
  - `docs/architecture/chapter-2/club-vivo-saas-diagram-prompt.md`
  - `docs/architecture/chapter-2/club-vivo-saas-drawio-brief.md`
  - `docs/architecture/chapter-2/club-vivo-saas-diagram-layout.md`
- Mark superseded, or remove after link check if the team is comfortable:
  - `docs/architecture/chapter-2/github-public-face-cleanup-plan.md`
  - `docs/architecture/chapter-2/club-vivo-repo-reset-plan.md`
- Keep:
  - `docs/architecture/chapter-2/club-vivo-saas-architecture.png`
  - `docs/architecture/chapter-2/club-vivo-saas-architecture.drawio`
  - `docs/architecture/chapter-2/club-vivo-saas-architecture-mermaid.md`
  - `docs/architecture/chapter-2/lambda-naming-inventory.md`

Files to merge first, if any:

- Confirm the final Mermaid diagram doc already contains the exclusion/guardrail language from the prompt/brief/layout docs.
- If anything unique is missing, add one short "Diagram Maintenance Notes" section to `club-vivo-saas-architecture-mermaid.md` before removing helper docs.

Validation command:

```bash
git diff --check
```

Additional link/reference check for that future PR:

```bash
rg -n "club-vivo-saas-diagram-prompt|club-vivo-saas-drawio-brief|club-vivo-saas-diagram-layout|github-public-face-cleanup-plan|club-vivo-repo-reset-plan" README.md docs
```

Risk notes:

- Risk is low because these are documentation-only planning/helper docs.
- Risk becomes medium if current READMEs link to the removed files; update those links in the same PR.
- Do not touch app, backend, infra, API contracts, Lambda names, routes, or CDK.

## 13. Recommended Second Prune PR

Use the second pass for medium-risk consolidation after the first low-risk diagram/cleanup helper prune lands.

Recommended scope:

- Consolidate proposal drafts:
  - choose `docs/proposals/club-vivo-external-proposal.md` as the main external proposal
  - choose `docs/proposals/club-vivo-coach-recruiter-architecture-brief.md` as the portfolio/recruiter brief
  - keep `docs/proposals/club-vivo-architecture-walkthrough-script.md` if the diagram walkthrough is useful
  - merge/remove overlapping one-page, nonprofit proposal, pilot message, and recruiter message drafts after review
- Start legacy naming cleanup:
  - add superseded/legacy notes to `docs/architecture/coach-lite/`
  - update titles in `docs/product/club-vivo/coach-workspace.md`, `methodology.md`, `user-flows.md`, and generation profile docs, or decide to merge them
  - do not move/remove legacy coach-lite architecture until references are updated
- Park or archive future-heavy docs:
  - review `training-prescription-layer.md`, `football-intelligence-learning-layer.md`, `future/roadmap-phases.md`, image-assisted intake docs, and `docs/product/future/`
  - decide whether they belong on main or in history/future branch material

Validation:

```bash
git diff --check
rg -n "coach-lite|SIC Coach Lite|New SIC|Quick Session|Training Brief|DiagramSequence|image-assisted|Match-to-Match" README.md docs
```

Risk notes:

- This is medium risk because many docs still reference legacy names.
- Prefer mark-superseded and merge-first behavior over broad deletion.
- Keep API/runbook/runtime-support folders untouched.

## 14. Validation

This audit is documentation-only. It should be validated with:

```bash
git diff --check
```

Validation result for this audit file:

- `git diff --check`: PASS / no output for the tracked diff.
- `git diff --check --no-index -- NUL docs/architecture/chapter-2/showroom-prune-audit.md`: no whitespace errors for this new untracked file. Exit code `1` is expected for `--no-index` because the files differ.

No runtime, build, API, CDK, or test validation is required because this audit does not change runtime code or existing documentation.

## 15. Uncertainty

- I did not inspect every line of every Markdown file; I inspected canonical docs, folder READMEs, prioritized folder inventories, headings, keyword clusters, and representative high-overlap files.
- I did not verify remote GitHub branches or tags. Archive preservation claims are based on current docs.
- I did not run runtime tests, frontend builds, backend tests, CDK synth, or link checkers because this is audit-only.
- Some docs mention source-present image analysis and Training Brief internals. I treated those as source-present or proposed/internal unless current canonical docs clearly claim shipped runtime.
- Some source maps may still contain drift from earlier cleanup work; this audit classifies them as merge/supersede candidates rather than correcting them.
- Proposal usefulness depends on the intended audience. A coach, nonprofit director, and recruiter may each prefer a different final sendable doc.
