# Export Documentation

## Status / Reading Model

This folder contains export-related documentation for Sports Intelligence Cloud and Club Vivo.

Export docs may include active export behavior, historical planning, contract direction, or future/lake-ready design. Current shipped export behavior should be verified against current source before it is presented externally.

Club Vivo is the current product and public GitHub face. Sports Intelligence Cloud is the AWS SaaS platform foundation behind Club Vivo. Export docs should support that product/platform story, not override it.

## Current Contents

- `domain-export-spec-v1.md`
  - Draft/stable-intended export contract direction for SIC domain entities.
  - Includes tenant-safety requirements and lake-ready storage layout language.
  - Should be source-verified before being described as current shipped export automation.

## Source-Of-Truth Boundary

When export docs conflict with current Chapter 2 product or architecture docs, prefer:

- `README.md`
- `docs/README.md`
- `docs/product/club-vivo/chapter-2-product-constitution.md`
- `docs/product/club-vivo/quick-soccer-game.md`
- `docs/architecture/platform-constitution.md`
- `docs/architecture/architecture-principles.md`
- `docs/architecture/tenant-claim-contract.md`
- current source under `apps/`, `services/`, `infra/`, `datasets/`, `postman/`, and `scripts/`

Do not infer a data lake, analytics pipeline, Glue/Athena workflow, ETL process, production export automation, or shipped lake-ready export runtime unless current source confirms it.

## Cleanup Boundary

Do not move, rename, or delete export docs yet.

Future cleanup should classify each export doc as active, historical, proposed, or future after source inspection. Product-story cleanup must not change runtime behavior, public API contracts, DynamoDB keys, routes, Lambdas, auth, tenancy, IAM, entitlements, or CDK.
