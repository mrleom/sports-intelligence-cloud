# Chapter 2 Progress History Cleanup Strategy

## 1. Purpose

This strategy prepares a careful cleanup of `docs/progress/` and related history docs so GitHub `main` reads like a clean Club Vivo product showroom powered by SIC, without losing useful evidence.

The cleanup target is presentation noise, not historical truth. Progress and closeout files remain valuable as Git history, archive evidence, and source material for concise summaries. Nothing in this strategy deletes, moves, renames, or changes runtime code.

## 2. Guardrails

- Do not touch runtime code, infrastructure, API contracts, runbooks, auth, tenancy, IAM, entitlements, DynamoDB keys, routes, Lambdas, CDK wiring, build config, scripts, datasets, Postman assets, or Amplify assumptions.
- Do not remove a progress file if it is the only place that records deployment, runtime, validation, tenant-safety, source-of-truth, or product-quality evidence.
- Treat detailed New SIC docs as history and learning evidence unless current Chapter 2 source-of-truth docs confirm the claim.
- Do not claim Training Brief as shipped runtime.
- Do not claim DiagramSequence as shipped runtime.
- Do not claim RAG/vector search, autonomous agents, Bedrock production generation, image analysis, Match-to-Match Prescription, data lake, ETL, or analytics pipeline as shipped runtime.
- Prefer summary-first cleanup: preserve durable evidence in a canonical summary before removing detailed logs from `main`.

## 3. Current Progress/History Shape

The current progress/history shape is:

- `docs/history/`
  - Concise historical home for Chapter 1 preservation.
  - Currently contains `README.md` and `chapter-1-sic-closeout.md`.
- `docs/progress/`
  - Current progress evidence index plus concise summaries.
  - Contains `README.md`, `weekly-progress-notes.md`, and `architect-process-summary.md`.
  - Chapter 2 cleanup closeouts have been removed from `main` after their durable facts were summarized in current README/docs maps, this strategy, and related Chapter 2 cleanup audits.
- `docs/progress/new-sic/`
  - Earlier New SIC phase evidence.
  - Contains many closeout summaries, readiness docs, audits, launch/deployment planning, and a detailed architect process log.
- `docs/progress/new-sic/session-builder-core/`
  - Detailed Session Builder quality, completion, diagram language, and template-quality evidence.
- `docs/progress/new-sic/match-to-match/`
  - Parked Match-to-Match prototype notes and closeout evidence.
- `docs/architecture/chapter-2/`
  - Current cleanup strategy and audit area.
  - This folder should own future cleanup strategy docs, not detailed progress logs.

The repo already has a good reader-facing progress index in `docs/progress/README.md`. The cleanup problem is mostly volume and duplication, not lack of labels.

## 4. Canonical Evidence Docs To Keep

Keep these on `main` unless a later explicit cleanup decision replaces them with an equivalent or better summary:

| File | Why Keep |
| --- | --- |
| `docs/progress/README.md` | Current progress reading model and guardrails. |
| `docs/progress/weekly-progress-notes.md` | Concise week-by-week history suitable for GitHub readers. |
| `docs/progress/architect-process-summary.md` | Short architecture/process story distilled from detailed logs. |
| `docs/history/README.md` | Historical reading model. |
| `docs/history/chapter-1-sic-closeout.md` | Canonical Chapter 1 closeout and shipped-vs-proposed boundary. |
If a future `docs/progress/chapter-2-showroom-cleanup-closeout.md` or equivalent final closeout is created, it should be short and should point to current source-of-truth docs rather than recreating the removed closeout trail.

## 5. Summarize Before Remove

These files contain enough unique evidence that they should not be removed from `main` until their durable content is summarized in canonical docs:

| File Or Cluster | Preserve Before Removal |
| --- | --- |
| `docs/progress/new-sic/architect-process-log.md` | Detailed phase timeline, current runtime truth, architecture/deployment posture, and process principles. |
| Late New SIC closeout evidence | Consolidated into `docs/progress/new-sic/README.md` and `docs/progress/new-sic/architect-process-log.md`; original numbered closeouts are preserved in Git history. |
| `docs/progress/new-sic/backend-export-lake-audit.md` | Source-present export/lake/ETL evidence and unwired-route caution; keep as the evidence anchor until a separate export/lake focused review reconciles docs, runbooks, schemas, source-present folders, tests, and current CDK wiring. |
| `docs/progress/new-sic/club-vivo-runtime-readiness-checklist.md` | Runtime readiness criteria and validation expectations. |
| `docs/progress/new-sic/club-vivo-runtime-readiness-evidence.md` | Local build and route evidence. |
| `docs/progress/new-sic/deployment-readiness-checklist.md` | Deployment readiness checklist; compare with runbooks before removing from `main`. |
| `docs/progress/new-sic/hosting-and-domain-launch-plan.md` | Hosting, domain, env-var, Cognito, backend, budget, and launch-sequence evidence. |
| New SIC readiness/deployment cluster | Classified in `docs/progress/new-sic/README.md`; the core checklist, planning, and validation evidence files remain in place. Current release hygiene belongs to `docs/runbooks/how-to-ship.md`, and current smoke guidance belongs to `docs/runbooks/smoke-tests.md`. |
| `docs/progress/new-sic/session-builder-core/*.md` | Session Builder quality findings, fixture baselines, template gaps, consolidated diagram-language findings, consolidated output-quality recheck findings, completion/runtime-boundary findings, and validation guardrails. |
| `docs/progress/new-sic/match-to-match/*.md` | Prototype learning and parked-product guardrails; summarize into future/parking docs before removal. |

Potential target owners for summarized material:

- Chapter 2 cleanup facts from the removed closeouts are now covered by `README.md`, `docs/README.md`, `docs/progress/README.md`, `docs/architecture/chapter-2/showroom-prune-audit.md`, `docs/architecture/chapter-2/repo-cleanup-inventory.md`, and this strategy. The preserved facts are: keep the same repo and Amplify assumptions, make `main` the Club Vivo showroom powered by SIC, preserve Chapter 1/New SIC as history, use showroom-prune cleanup instead of broad restructuring, and keep runtime/auth/tenancy/API/CDK guardrails untouched.
- Runtime and deployment evidence should remain in current runbooks or current architecture/source-map docs before the progress evidence is removed.
- Export/lake/ETL is a separate future cleanup track, not a safe remove-now candidate. Treat `exports-domain`, `lake-ingest`, and `lake-etl` as source-present, parked, or historical unless current CDK wiring proves active runtime.
- Session Builder quality findings should be summarized in current Club Vivo product docs such as `docs/product/club-vivo/session-builder.md`, `docs/product/club-vivo/session-generation-quality-standards.md`, `docs/product/club-vivo/coaching-session-design-standard.md`, or `docs/product/club-vivo/golden-template-library-v1.md`.
- Diagram vocabulary or readability evidence should remain in current diagram architecture docs.
- Match-to-Match learning should remain parked in future/product context, not presented as shipped runtime.
- Training Brief, agentic, Bedrock, and RAG material should remain clearly proposed, source-present, or future unless current source-of-truth docs prove otherwise.
- Do not claim data lake, ETL, analytics pipeline, domain export automation, lake ingest, Glue, Athena, or QuickSight as shipped Club Vivo runtime unless current source and CDK validation prove it. PDF export and saved-session export are separate from domain export/lake work.

## 6. Remove From Main After Review

These are reasonable future remove-from-main candidates after link checks and summary review:

| File Or Cluster | Reason |
| --- | --- |
| `docs/progress/new-sic/closeout-summary-1.md` through `closeout-summary-9.md` | Detailed New SIC closeouts create an archive feel; most durable narrative should already be captured by `weekly-progress-notes.md` and `architect-process-summary.md`. |
| `docs/progress/new-sic/progress-history-audit.md` | Removed from `main` after its durable findings were preserved in `docs/progress/new-sic/README.md`, `docs/progress/README.md`, and this strategy. |
| `docs/progress/new-sic/new-sic-starting-point-plan.md` | Removed from `main` after its transition-baseline facts were consolidated in `docs/progress/new-sic/README.md`, `docs/progress/architect-process-summary.md`, and this strategy. |
| `docs/progress/new-sic/docs-readiness-duplication-audit.md` | Removed from `main` after its durable readiness/deployment overlap findings were preserved in `docs/progress/new-sic/README.md` and this strategy. |
| `docs/progress/new-sic/coach-lite-preview-audit.md` | Removed from `main` after durable legacy-preview facts were preserved in `docs/progress/new-sic/README.md`, the legacy-doc strategy, and current source maps. |
| `docs/progress/new-sic/session-builder-core/completion-audit.md` | Removed from `main` after its durable Session Builder runtime-boundary, creation-path, parked-scope, deterministic-generation, and deployment-sequencing facts were preserved in `docs/progress/new-sic/session-builder-core/README.md` and current Club Vivo product docs. |
| `docs/progress/new-sic/session-builder-core/output-quality-evaluation.md` and `docs/progress/new-sic/session-builder-core/output-quality-recheck.md` | Removed from `main` after durable fixture-review findings were preserved in `docs/progress/new-sic/session-builder-core/README.md`: five runnable fixtures improved after deterministic template work, mixed-age validation remained unsolved, diagram specs and save/export structure still needed follow-up, and no runtime/source, AI/RAG, Match-to-Match, or public Training Brief API work was introduced. |
| `docs/progress/new-sic/session-builder-core/diagram-language-research.md` | Removed from `main` after durable diagram-quality findings were preserved in `docs/progress/new-sic/session-builder-core/README.md` and current Club Vivo diagram standards: diagrams should explain activity space, players, ball, equipment, action, timing, and scoring/reset through soccer-native symbols, compact legends, structured story steps, and no shipped DiagramSequence, Match-to-Match, or AI/RAG claims. |
| `docs/progress/new-sic/match-to-match/closeout-summary.md`, `docs/progress/new-sic/match-to-match/prototype-notes.md`, and `docs/progress/new-sic/match-to-match/next-steps.md` | Removed from `main` after durable Match-to-Match prototype findings were preserved in `docs/progress/new-sic/match-to-match/README.md`: Match-to-Match remains parked/future, the prototype showed evidence-to-training value but required a future intelligence-layer design, current product focus remains Session Builder/Quick Soccer Game/Coach Workspace, Training Brief foundation was internal-only evidence, no public Training Brief or prescription API/persistence/runtime automation exists, and any future restart must preserve tenant safety. |
| `docs/progress/chapter-2-public-face-closeout.md` | Removed from `main` after durable public-face cleanup facts were summarized in current docs and this strategy. |
| `docs/progress/chapter-2-repo-cleanup-closeout.md` | Removed from `main` after durable repo-cleanup facts were summarized in current docs and this strategy. |
| `docs/progress/chapter-2-cleanup-workspace-closeout.md` | Removed from `main` after durable workspace/showroom-prune facts were summarized in current docs and this strategy. |

Removal means removal from `main`, not deletion from history. Git history, tags, branches, and retained history docs preserve the evidence trail.

## 7. Do Not Touch Yet

Do not remove or rewrite these until a later PR explicitly summarizes their unique evidence:

- `docs/progress/new-sic/backend-export-lake-audit.md`
- export/lake docs, runbooks, schemas, and source-looking references that need a separate focused review
- `docs/progress/new-sic/club-vivo-runtime-readiness-checklist.md`
- `docs/progress/new-sic/club-vivo-runtime-readiness-evidence.md`
- `docs/progress/new-sic/deployment-readiness-checklist.md`
- `docs/progress/new-sic/hosting-and-domain-launch-plan.md`
- `docs/progress/new-sic/session-builder-core/`
- `docs/progress/new-sic/match-to-match/`
- `docs/history/`
- `docs/api/`
- `docs/runbooks/`

Also do not touch runtime-support folders or any source path listed in the guardrails.

## 8. Duplicate / Overlap Clusters

Top noisy clusters:

1. Chapter 2 cleanup closeouts
   - `chapter-2-public-face-closeout.md`, `chapter-2-repo-cleanup-closeout.md`, and `chapter-2-cleanup-workspace-closeout.md` overlap with current README/docs maps, `showroom-prune-audit.md`, and this strategy.
2. New SIC numbered closeouts
   - `closeout-summary-1.md` through `closeout-summary-12.md` are useful evidence but too many for a clean public showroom.
3. Readiness and deployment notes
   - `deployment-readiness-checklist.md`, `club-vivo-runtime-readiness-checklist.md`, `club-vivo-runtime-readiness-evidence.md`, and `hosting-and-domain-launch-plan.md` overlap with each other and with runbook responsibilities.
   - Status: classified in `docs/progress/new-sic/README.md` as historical evidence; the older overlap audit has been removed from `main` after preserving its durable findings.
4. Session Builder quality evidence
   - The broad Session Builder core completion audit has been removed from `main` after its durable facts were summarized in the folder index and current product docs.
   - The first output-quality evaluation and follow-up recheck have been removed from `main` after durable fixture and recheck findings were summarized in the folder index.
   - The diagram-language research has been removed from `main` after durable soccer-diagram findings were summarized in the folder index and current diagram standards.
   - `output-quality-fixtures.md` and `template-quality-matrix.md` are valuable but better summarized into current product and architecture docs before any later removal.
5. Old cleanup/audit docs
   - `progress-history-audit.md`, `docs-readiness-duplication-audit.md`, and `coach-lite-preview-audit.md` overlap with newer Chapter 2 cleanup audits and legacy-doc strategies.
   - Status: progress history, readiness duplication, and Coach Lite preview audits have been removed from `main` after preserving their durable findings.
6. Match-to-Match prototype evidence
   - The detailed Match-to-Match closeout, prototype, and next-steps notes have been consolidated into the folder index and removed from `main`.
   - The folder remains parked future evidence and must not be read as active Session Builder, Training Brief, or prescription runtime.

## 9. Recommended First Progress Cleanup PR

Status: completed as a low-risk progress cleanup pass.

The pass removed these Chapter 2 cleanup closeouts from `main`:

   - `docs/progress/chapter-2-public-face-closeout.md`
   - `docs/progress/chapter-2-repo-cleanup-closeout.md`
   - `docs/progress/chapter-2-cleanup-workspace-closeout.md`

No replacement closeout was added because the durable facts are already covered by current README/docs maps, `docs/architecture/chapter-2/showroom-prune-audit.md`, `docs/architecture/chapter-2/repo-cleanup-inventory.md`, this strategy, and Git history.

The preserved facts are:

   - public-face cleanup outcome
   - showroom-prune sequence
   - current source-of-truth reading model
   - explicit shipped-vs-proposed non-claims
   - runtime/code untouched guardrails

`docs/progress/README.md` now points readers to the concise progress layer rather than the deleted closeouts.

Validation for that PR should include:

```text
rg -n "chapter-2-public-face-closeout|chapter-2-repo-cleanup-closeout|chapter-2-cleanup-workspace-closeout" README.md docs
git diff --check
git status --short
git diff --stat
```

## 10. Recommended Second Progress Cleanup PR

Medium-risk second PR:

1. Review `docs/progress/new-sic/closeout-summary-1.md` through `closeout-summary-12.md`.
2. Confirm that `docs/progress/weekly-progress-notes.md` and `docs/progress/architect-process-summary.md` preserve the durable platform/product/process story.
3. Summarize any missing runtime truth, validation evidence, or product-quality lessons from late closeouts before removal.
4. Remove the numbered closeout summaries from `main` only after the summary layer is complete.
5. Leave readiness/deployment, export/lake, Session Builder quality, and Match-to-Match prototype folders in place for later targeted PRs.

Status: completed for the numbered closeout summaries. Durable late evidence now lives in `docs/progress/new-sic/README.md` and `docs/progress/new-sic/architect-process-log.md`.

Validation for that PR should include:

```text
rg -n "closeout-summary" README.md docs
rg -n "Training Brief|DiagramSequence|RAG|vector|autonomous agents|Bedrock|image analysis|Match-to-Match|data lake|ETL|analytics pipeline" docs/progress docs/product docs/architecture
git diff --check
git status --short
git diff --stat
```

## 11. Validation

Every progress cleanup PR should run:

```text
git diff --check
git status --short
git diff --stat
```

Reference scans should be tailored to the files removed. At minimum, scan `README.md`, `docs/README.md`, `docs/progress`, `docs/history`, `docs/product`, and `docs/architecture`.

Expected outcome:

- No runtime files changed.
- No active README points to deleted progress files.
- Deleted progress paths remain only in audit/history/strategy context if useful.
- Current source-of-truth docs still describe Club Vivo as the product face and SIC as the platform foundation.
- Shipped-vs-proposed language remains honest.

## 12. Uncertainty

The riskiest uncertainty is whether detailed New SIC files contain unique runtime, deployment, tenant-safety, or validation evidence that has not yet been summarized elsewhere. That is why this strategy marks readiness, deployment, export/lake, Session Builder quality, and late closeout files as "summarize before remove" instead of immediate deletion candidates.

The second uncertainty is public portfolio value. Some detailed logs show engineering discipline, but too many of them make `main` feel like an internal workspace. The preferred compromise is to keep a small canonical evidence layer on `main` and rely on Git history, tags, branches, and `docs/history/` for the long trail.

The third uncertainty is whether a final Chapter 2 showroom cleanup closeout should live in `docs/progress/` or `docs/history/`. Keep it in `docs/progress/` while Chapter 2 cleanup is active; move or summarize it into `docs/history/` only after Chapter 2 itself is closed.
