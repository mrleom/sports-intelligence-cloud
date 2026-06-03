# Progress Evidence

`docs/progress` contains build history, closeouts, and learning evidence for Sports Intelligence Cloud and Club Vivo.

This folder is documentation only. It is not runtime code, deployment evidence by itself, or the source of truth for current shipped behavior.

## Chapter 2 Reading Model

Club Vivo is now the current product and public GitHub face. Sports Intelligence Cloud remains the AWS SaaS platform foundation behind it.

Chapter 1 and New SIC progress docs are preserved as history and learning evidence. They should not override current Chapter 2 source-of-truth docs.

Current source-of-truth starts with:

- `README.md`
- `docs/README.md`
- `docs/product/club-vivo/chapter-2-product-constitution.md`
- `docs/product/club-vivo/quick-soccer-game.md`
- `docs/architecture/chapter-2/`
- `docs/architecture/platform-constitution.md`
- `docs/architecture/architecture-principles.md`
- `docs/architecture/tenant-claim-contract.md`

## Start Here

- `weekly-progress-notes.md`
  - Short week-by-week summary for GitHub readers.
- `architect-process-summary.md`
  - Short architecture/process story distilled from the archived detailed process log.
- `chapter-2-public-face-closeout.md`
  - Closeout summary for the Chapter 2 public-face cleanup work.
- `new-sic/`
  - Earlier Chapter 1 / New SIC cleanup plans, audits, readiness evidence, and closeout summaries.

## Historical Archive Status

Detailed week-by-week progress history was removed from GitHub `main` after the concise summary layer was created. The full detailed history remains preserved in:

- branch: `archive/pre-showcase-cleanup`
- tag: `pre-showcase-cleanup-2026-04-25`

Chapter 1 SIC history is also preserved through:

- branch: `archive/chapter-1-sic`
- tag: `chapter-1-sic-closeout`

## Current Structure

```text
docs/progress/
|-- README.md
|-- architect-process-summary.md
|-- chapter-2-public-face-closeout.md
|-- weekly-progress-notes.md
`-- new-sic/
```

## Cleanup Boundary

Do not move, rename, or delete progress folders yet.

Future cleanup should classify older progress docs before any archive move. Preserve them as evidence unless a dedicated cleanup decision says otherwise.

## Rules

- Keep progress summaries factual, concise, and linked to current docs where possible.
- Do not claim old progress docs are current product truth.
- Do not claim future or parked ideas are shipped runtime.
- Do not present Training Brief, DiagramSequence, RAG/vector search, autonomous agents, Bedrock production generation, or image analysis as shipped Chapter 2 runtime.
- Keep tenant isolation language intact.
