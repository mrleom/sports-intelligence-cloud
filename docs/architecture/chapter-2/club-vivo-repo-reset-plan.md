# Club Vivo Repo Reset Plan

## Status

Draft Chapter 2 architecture reset plan.

This plan is documentation-only. It does not move, delete, rename, or reclassify runtime code. It does not change IAM, CDK, auth, tenancy, entitlements, DynamoDB keys, or public API contracts.

## Goal

Align the repo around:

- Club Vivo as the product.
- SIC as the AWS SaaS platform foundation behind Club Vivo.
- Session Builder as the current major product wedge.
- Quick Soccer Game as the new fast creative lane.
- Chapter 1 SIC as preserved history.

## Source Of Truth For This Reset

Use current repo files as truth, especially:

- `README.md`
- `docs/README.md`
- `docs/architecture/sic-repo-inventory.md`
- `docs/architecture/sic-current-system-map.md`
- `docs/architecture/club-vivo-source-map.md`
- `docs/architecture/foundations/source-of-truth-manifest.md`
- `docs/product/club-vivo/README.md`
- `docs/product/club-vivo/session-builder.md`
- `apps/club-vivo/README.md`
- `services/club-vivo/api/README.md`
- `infra/cdk/README.md`
- `infra/cdk/lib/sic-api-stack.ts`
- `infra/cdk/lib/sic-auth-stack.ts`

## Non-Negotiable Boundaries

Do not:

- delete files
- rename deployed Lambdas
- change IAM
- change CDK resources
- change auth
- change tenancy
- change entitlements
- change DynamoDB keys
- change public API contracts
- accept client-supplied `tenant_id`, `tenantId`, or `x-tenant-id`
- claim future or parked ideas as shipped runtime

## Chapter 2 Repo Reading Model

### Product

Use `docs/product/club-vivo/` for active Club Vivo product direction.

Chapter 2 product docs should lead with Club Vivo and should use SIC mainly for platform context.

### Platform Architecture

Use `docs/architecture/` for SIC platform governance, source maps, tenancy, diagrams, repo reset notes, and deployed-resource inventories.

SIC remains the multi-tenant serverless AWS platform foundation.

### API Contracts

Use `docs/api/` for public and cross-layer contracts.

Do not modify those contracts as part of the Chapter 2 reset unless there is a separate explicit product or architecture decision.

### History

Use `docs/history/` and `docs/progress/` to preserve Chapter 1 and prior work.

Historical docs are evidence, not active runtime claims.

### Future Or Parked

Keep future and parked concepts clearly marked. Do not blend them into active Club Vivo product docs as shipped behavior.

## Current Active Runtime Areas

### Frontend

- `apps/club-vivo`
  - Active Next.js Club Vivo web app and Coach Workspace.
  - Current protected surfaces include Home, Session Builder, Teams, Equipment Essentials, Methodology, Sessions, saved-session detail, feedback, and export actions.

### Backend

- `services/club-vivo/api`
  - Active Club Vivo API handler and domain source.
  - Current CDK-wired backend route families are `me`, `athletes`, `sessions`, `templates`, `session-packs`, `teams`, and `methodology`.

### Auth

- `services/auth`
  - Cognito post-confirmation and pre-token-generation trigger Lambdas.

### Infrastructure

- `infra/cdk`
  - CDK source for API Gateway, Lambda, DynamoDB, S3, Cognito integration, CloudWatch, IAM, and current permission grants.

## Source-Present But Not Active Deployed Route Families

Current source maps identify these as present but not currently CDK-wired:

- `services/club-vivo/api/clubs`
- `services/club-vivo/api/memberships`
- `services/club-vivo/api/exports-domain`
- `services/club-vivo/api/lake-ingest`
- `services/club-vivo/api/lake-etl`

Keep these files. Do not delete or rename them. Do not present them as active deployed Club Vivo runtime unless CDK wiring and deployment evidence later prove it.

## Product Story Reset

Chapter 2 product docs should use this story:

1. Club Vivo is the product.
2. SIC is the platform foundation.
3. Session Builder is the main product wedge right now.
4. Quick Soccer Game is the fast creative lane.
5. Coach Workspace is the shared app shell.
6. Team, equipment, methodology, saved sessions, feedback, and export support the wedge.
7. Tenant isolation remains part of the product promise because clubs need protected data boundaries.

## Explicit Non-Claims

The reset must not claim these as shipped runtime behavior:

- Training Brief as a shipped public product flow.
- DiagramSequence as shipped runtime behavior.
- RAG/vector infrastructure.
- Autonomous agents.
- Bedrock production generation.
- Image analysis as part of the Chapter 2 product story.
- Match-to-Match Prescription as active runtime.
- Separate admin app.

## Open-Core Reset Boundary

Chapter 2 may describe a later open-core or open-source contribution model.

Safe future contribution areas:

- product docs
- templates
- diagram language
- UI improvements
- validation helpers
- public-safe local tooling
- research and coaching-methodology content

Protected areas:

- production auth
- tenant isolation
- IAM
- secrets
- deployments
- entitlements
- tenant data
- public API contracts
- infrastructure wiring

## Suggested Follow-Up Sequence

1. Add Chapter 2 docs and inventories.
2. Update cross-links only after review.
3. Decide whether any README wording should shift from "Quick Session" to "Quick Soccer Game" at the product-story layer.
4. Review legacy `sic-coach-lite` and `coach-lite` docs for later migration or archive decisions.
5. Review whether source-present but unwired export/lake docs need a clearer historical or parked label.
6. Only after product docs are stable, consider UI copy updates.
7. Only after explicit approval, consider route/helper naming changes.

## Completion Criteria For The Documentation Reset

The reset is complete when:

- Chapter 1 is preserved as history.
- Club Vivo is clearly the product.
- SIC is clearly the platform foundation.
- Session Builder is clearly the active wedge.
- Quick Soccer Game has a product doc.
- Lambda names and route families are inventoried without rename pressure.
- Tenant isolation language is intact.
- Parked/future non-claims are explicit.
- Validation runs `git diff --check`.
