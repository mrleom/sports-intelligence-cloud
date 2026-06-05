# Chapter 2 Legacy Docs Strategy

## Status

Documentation-only strategy for the legacy Coach Lite and SIC Coach Lite documentation areas.

Product legacy status: the one-file `docs/product/sic-coach-lite/` area has been migrated into `docs/product/club-vivo/coaching-session-design-standard.md` and can remain removed unless a future audit needs historical evidence from Git.

Methodology legacy status: `docs/architecture/coach-lite/tenant-methodology-knowledge.md` has been migrated into `docs/product/club-vivo/methodology.md` and can remain removed unless a future audit needs historical evidence from Git.

Generation-flow legacy status: `docs/architecture/coach-lite/coach-lite-generation-flow.md` has been migrated into `docs/product/club-vivo/session-builder.md` and can remain removed unless a future audit needs historical evidence from Git.

Diagram-rendering legacy status: `docs/architecture/coach-lite/diagram-rendering-architecture.md` has been migrated into `docs/architecture/club-vivo/diagram-sequence-spec-v1.md` and can remain removed unless a future audit needs historical evidence from Git.

Drill diagram spec legacy status: `docs/architecture/coach-lite/drill-diagram-spec-v1.md` has been migrated into `docs/architecture/club-vivo/diagram-sequence-spec-v1.md` and can remain removed unless a future audit needs historical evidence from Git.

This strategy does not move files, delete files, rename folders, change runtime code, change API contracts, or change auth, tenancy, entitlements, IAM, DynamoDB keys, routes, Lambdas, CDK wiring, build config, or Amplify assumptions.

## Legacy Areas

The migrated legacy product folder was:

- `docs/product/sic-coach-lite/`

The remaining legacy architecture folder is:

- `docs/architecture/coach-lite/`

These legacy areas come from the earlier Coach Lite / SIC Coach Lite product framing. Chapter 2 now presents Club Vivo as the coach-facing product and Sports Intelligence Cloud as the tenant-safe AWS SaaS platform foundation behind it.

The folders may still contain useful evidence and design material, but their names make the public repo harder to read. A GitHub reader can mistake them for current product areas, parallel app surfaces, or source-of-truth architecture paths instead of older context that needs review and migration.

## Useful Material To Preserve

`docs/product/sic-coach-lite/club-vivo-session-output-design-plan.md` contained product-output design observations that have been merged into `docs/product/club-vivo/coaching-session-design-standard.md`.

`docs/architecture/coach-lite/coach-lite-generation-flow.md` contained useful generation-flow material, including validation-first principles, session-pack shaping, tenant-safe generation boundaries, and trust-boundary notes that have been merged into `docs/product/club-vivo/session-builder.md`.

`docs/architecture/coach-lite/diagram-rendering-architecture.md` contained useful deterministic diagram-rendering ideas, cost and consistency guidance, and structured rendering principles that have been merged into `docs/architecture/club-vivo/diagram-sequence-spec-v1.md`.

`docs/architecture/coach-lite/drill-diagram-spec-v1.md` contained useful drill diagram field definitions, rendering constraints, validation rules, fallback behavior, and visual clarity rules that have been merged into `docs/architecture/club-vivo/diagram-sequence-spec-v1.md`.

`docs/architecture/coach-lite/tenant-methodology-knowledge.md` contained useful tenant-scoped methodology guardrails, governance notes, fallback behavior, and configuration boundaries that have been merged into `docs/product/club-vivo/methodology.md`.

None of this means the legacy docs describe shipped Club Vivo runtime behavior. They are evidence to mine carefully, not active product truth.

## Future Owners

Useful product-output material has been summarized by:

- `docs/product/club-vivo/coaching-session-design-standard.md`

Useful methodology material has been summarized by:

- `docs/product/club-vivo/methodology.md`
- `docs/architecture/tenant-claim-contract.md`

Useful generation-flow material has been summarized by:

- `docs/product/club-vivo/session-builder.md`
- `docs/architecture/club-vivo-source-map.md`
- `docs/architecture/chapter-2/lambda-naming-inventory.md`

Useful diagram-rendering material has been summarized by:

- `docs/architecture/club-vivo/diagram-sequence-spec-v1.md`
- `docs/architecture/club-vivo-source-map.md`

Useful drill diagram spec material has been summarized by:

- `docs/architecture/club-vivo/diagram-sequence-spec-v1.md`
- `docs/architecture/club-vivo-source-map.md`

DiagramSequence remains proposed architecture unless current source inspection proves runtime behavior. The legacy diagram docs must not be used to claim shipped DiagramSequence, image analysis, RAG/vector search, autonomous agents, Bedrock production generation, data lake, ETL, or analytics pipeline behavior.

## Legacy Folder Status

The legacy architecture folder has no remaining tracked source-of-truth files after the migration checkpoints.

Do not recreate the old product or architecture legacy folders as active docs areas. If historical evidence is needed, use Git history, audit docs, or this strategy doc.

## Temporary References That Can Remain

References to the legacy folders can remain temporarily in:

- audit docs
- history/progress docs
- this strategy doc

Public index docs should not present `docs/product/sic-coach-lite/` or `docs/architecture/coach-lite/` as active Club Vivo product or architecture source-of-truth areas. They should label legacy references as migrated or legacy context and point readers to current Club Vivo and SIC source-of-truth docs.

## Safe Future Migration Sequence

1. Keep non-claims explicit in current owner docs, especially for Training Brief, DiagramSequence, RAG/vector search, autonomous agents, Bedrock production generation, image analysis, Match-to-Match Prescription, data lake, ETL, and analytics pipeline ideas.
2. Keep public indexes and source maps pointed at Club Vivo and SIC source-of-truth docs.
3. Re-run reference scans and link checks after each migration checkpoint.
4. Use Git history and audit docs for historical evidence instead of recreating legacy folders.

## Recommended Next PR Sequence

1. Keep current owner docs concise and source-aligned after the migration checkpoints.
2. Update inventories and source maps if they still point readers to removed legacy folders.
3. Use a later audit/history cleanup pass for old references in showroom or progress evidence.
