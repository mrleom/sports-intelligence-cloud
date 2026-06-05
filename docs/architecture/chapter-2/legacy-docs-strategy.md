# Chapter 2 Legacy Docs Strategy

## Status

Documentation-only strategy for the legacy Coach Lite and SIC Coach Lite documentation areas.

Product legacy status: the one-file `docs/product/sic-coach-lite/` area has been migrated into `docs/product/club-vivo/coaching-session-design-standard.md` and can remain removed unless a future audit needs historical evidence from Git.

Methodology legacy status: `docs/architecture/coach-lite/tenant-methodology-knowledge.md` has been migrated into `docs/product/club-vivo/methodology.md` and can remain removed unless a future audit needs historical evidence from Git.

Generation-flow legacy status: `docs/architecture/coach-lite/coach-lite-generation-flow.md` has been migrated into `docs/product/club-vivo/session-builder.md` and can remain removed unless a future audit needs historical evidence from Git.

Diagram-rendering legacy status: `docs/architecture/coach-lite/diagram-rendering-architecture.md` has been migrated into `docs/architecture/club-vivo/diagram-sequence-spec-v1.md` and can remain removed unless a future audit needs historical evidence from Git.

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

`docs/architecture/coach-lite/drill-diagram-spec-v1.md` appears to contain useful drill diagram field definitions, rendering constraints, and visual clarity rules that may inform current structured diagram work.

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

Useful drill diagram spec material should eventually move into or be summarized by:

- `docs/architecture/club-vivo/diagram-sequence-spec-v1.md`
- `docs/architecture/club-vivo-source-map.md`

DiagramSequence remains proposed architecture unless current source inspection proves runtime behavior. The legacy diagram docs must not be used to claim shipped DiagramSequence, image analysis, RAG/vector search, autonomous agents, Bedrock production generation, data lake, ETL, or analytics pipeline behavior.

## Do Not Move Or Delete Yet

Do not move, delete, or rename this folder yet:

- `docs/architecture/coach-lite/`

Do not move, delete, or rename these files yet:

- `docs/architecture/coach-lite/README.md`
- `docs/architecture/coach-lite/drill-diagram-spec-v1.md`

Keep the current architecture folder name until useful material has been migrated, active references have been updated, and audit/source-map docs agree on the final disposition. Do not recreate the old product legacy folder as an active docs area.

## Temporary References That Can Remain

References to the legacy folders can remain temporarily in:

- audit docs
- source maps
- repo inventories
- repo-structure docs
- legacy folder READMEs
- this strategy doc

Public index docs should not present `docs/product/sic-coach-lite/` or `docs/architecture/coach-lite/` as active Club Vivo product or architecture source-of-truth areas. They should label legacy references as migrated or legacy context and point readers to current Club Vivo and SIC source-of-truth docs.

## Safe Future Migration Sequence

1. Inventory references to `docs/architecture/coach-lite/` and any remaining historical references to `docs/product/sic-coach-lite/`.
2. Read each remaining legacy architecture file and extract only durable architecture, methodology, generation, and diagram guidance.
3. Merge durable material into the current owner docs listed above.
4. Keep non-claims explicit while migrating, especially for Training Brief, DiagramSequence, RAG/vector search, autonomous agents, Bedrock production generation, image analysis, Match-to-Match Prescription, data lake, ETL, and analytics pipeline ideas.
5. Update public indexes and source maps so current readers start from Club Vivo and SIC source-of-truth docs.
6. Re-run reference scans and link checks.
7. Decide in a separate cleanup checkpoint whether to archive, rename, or delete the legacy folders.

## Recommended Next PR Sequence

1. Add this strategy and label the legacy folders in public index docs.
2. Migrate durable drill diagram spec rules into current structured diagram docs without claiming shipped DiagramSequence runtime.
3. Update inventories and source maps after the useful material has a current owner.
4. Only then decide whether the remaining legacy architecture folder should stay, move to history, or be removed.
