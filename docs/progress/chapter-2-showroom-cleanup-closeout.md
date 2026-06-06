# Chapter 2 Showroom Cleanup Closeout

## Branch

`chapter2-showroom-final-audit`

## Purpose

Close the Chapter 2 showroom cleanup by confirming that GitHub readers now get a clearer Club Vivo
product story without losing historical SIC/New SIC evidence.

## What Was Cleaned

- Long Chapter 2 cleanup closeouts were removed after durable facts were summarized.
- New SIC numbered closeouts, old audits, starting-point plans, Session Builder quality reviews,
  diagram research, and Match-to-Match prototype notes were consolidated into concise indexes.
- Export/lake/ETL wording was clarified so source-present docs and runbooks are not mistaken for
  shipped Club Vivo runtime.

## Intentionally Preserved

- `docs/progress/weekly-progress-notes.md`
- `docs/progress/architect-process-summary.md`
- `docs/progress/new-sic/`
- `docs/history/`
- readiness/deployment evidence that still needs future focused review
- export/lake evidence that still needs future focused review
- compact Session Builder and Match-to-Match evidence indexes

Historical progress evidence remains useful, but current source and source-of-truth docs lead.

## Current Source Of Truth

- `README.md`
- `docs/README.md`
- `docs/product/club-vivo/chapter-2-product-constitution.md`
- `docs/product/club-vivo/session-builder.md`
- `docs/product/club-vivo/coach-workspace.md`
- `docs/product/club-vivo/quick-soccer-game.md`
- `docs/architecture/foundations/source-of-truth-manifest.md`
- `docs/architecture/platform-constitution.md`
- `docs/architecture/architecture-principles.md`
- `docs/architecture/tenant-claim-contract.md`
- `docs/architecture/club-vivo-source-map.md`

The current story is: Club Vivo is the product face, SIC is the AWS SaaS platform foundation,
Session Builder is the main product wedge, Quick Soccer Game is the fast creative lane, and Coach
Workspace is the active product surface.

## Non-Claims

Do not use Chapter 1, New SIC, progress, proposal, future, or source-present docs to claim these as
shipped Chapter 2 runtime:

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
- domain export automation
- Glue
- Athena
- QuickSight

## Final Validation Commands

```text
find docs/progress/new-sic -maxdepth 2 -type f | sort
rg -n "SIC Coach Lite|Coach Lite|New SIC|Match-to-Match|Training Brief|DiagramSequence|RAG|Bedrock|autonomous agents|data lake|ETL|analytics pipeline|shipped runtime|source of truth" README.md docs
git diff --check
git status --short
git diff --stat
```

PowerShell users can replace the `find` command with a `Get-ChildItem` max-depth inventory.

## Recommended Next Product Work

- Continue improving Session Builder output quality and deterministic template coverage.
- Keep Quick Soccer Game lightweight and clearly inside the shared Club Vivo generation path.
- Tighten Coach Workspace product polish around repeat coach workflows.
- Review remaining readiness/deployment and export/lake evidence in focused future passes.
- Reactivate Training Brief, DiagramSequence, Match-to-Match, AI/RAG, or analytics work only after
  explicit product and architecture decisions.
