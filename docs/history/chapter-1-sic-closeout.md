# Chapter 1 SIC Closeout

## Status

Chapter 1 is preserved SIC history.

This closeout records the transition from the first Sports Intelligence Cloud build chapter into Chapter 2, where the repo should be read around Club Vivo as the product, SIC as the AWS SaaS platform foundation, Session Builder as the current product wedge, and Quick Soccer Game as the new fast creative lane.

This document is historical and orienting only. It does not change runtime code, deployed infrastructure, IAM, auth, tenancy, entitlements, DynamoDB keys, or public API contracts.

## What Chapter 1 Established

Chapter 1 built the platform foundation and the first usable coach-facing workflow:

- A multi-tenant, serverless AWS platform named Sports Intelligence Cloud.
- Cognito auth, tenant entitlements, and fail-closed tenant-context resolution.
- Tenant-scoped DynamoDB data access by key construction.
- API Gateway and Lambda handler boundaries for the Club Vivo backend.
- A protected Next.js coach workspace under `apps/club-vivo`.
- Session Builder as the active coach-facing generation wedge.
- Saved sessions, feedback, Teams, Methodology, Equipment Essentials, and PDF export foundations.
- Public-safe docs, runbooks, ADRs, progress summaries, and source maps.

Chapter 1 also produced future or parked explorations. Those are preserved as history or planning material, not as Chapter 2 runtime claims.

## Preserved History

The concise GitHub-facing history remains in:

- `docs/progress/README.md`
- `docs/progress/weekly-progress-notes.md`
- `docs/progress/architect-process-summary.md`
- `docs/progress/new-sic/`

The detailed pre-showcase history remains preserved outside the current mainline:

- branch: `archive/pre-showcase-cleanup`
- tag: `pre-showcase-cleanup-2026-04-25`

Chapter 2 should not rewrite Chapter 1 to make the past look cleaner than it was. Historical notes can be corrected for factual issues, broken references, or clarity, but they should remain evidence of how SIC evolved.

## Chapter 1 Runtime Boundary

The current source map says the active runtime is:

- `apps/club-vivo`
  - The active Club Vivo web app and coach workspace.
- `services/club-vivo/api`
  - The Club Vivo API Gateway/Lambda backend source.
- `services/auth`
  - Cognito trigger Lambdas for entitlement provisioning and token claim enrichment.
- `infra/cdk`
  - CDK source for the deployed AWS foundation.

The current deployed Club Vivo API remains focused on the CDK-wired routes for:

- `me`
- `session-packs`
- `sessions`
- `teams`
- `methodology`
- `templates`
- `athletes`

Handler folders such as `clubs`, `memberships`, `exports-domain`, `lake-ingest`, and `lake-etl` remain source-present but not currently CDK-wired according to the current source maps. They should not be deleted, renamed, or described as active deployed Club Vivo runtime without a later explicit architecture decision.

## Product Lessons To Carry Forward

Chapter 2 should carry these lessons forward:

- Club Vivo is the product name and coach-facing product identity.
- SIC is the platform architecture behind Club Vivo.
- Session Builder is the major player right now.
- Quick Session should become Quick Soccer Game in the Chapter 2 story.
- KSC remains pilot context, not the product identity.
- Coach Workspace remains one shared app direction, not separate apps per program.
- Future intelligence should be introduced only after the product wedge is useful, observable, tenant-safe, and reviewable.

## What Chapter 2 Must Not Claim From Chapter 1

Chapter 1 contains useful foundations and future planning, but Chapter 2 must not claim the following as shipped runtime behavior:

- Training Brief as a shipped public product flow.
- DiagramSequence as shipped runtime behavior.
- Broad RAG or vector-search infrastructure.
- Autonomous agents.
- Bedrock production generation.
- Image analysis as part of the Chapter 2 product story.
- Match-to-Match Prescription as the active creation path.
- A separate admin app.

If source code contains related handlers, validators, docs, tests, or request-type branches, Chapter 2 should describe them as source-present, parked, proposed, internal, or future unless current runtime evidence proves otherwise.

## Tenant Isolation Carries Forward

The Chapter 2 reset must keep the existing tenant-isolation language intact:

- Tenant identity is server-derived from verified auth plus authoritative entitlements.
- Client input must not provide `tenant_id`, `tenantId`, or `x-tenant-id`.
- Missing or invalid identity or entitlement data fails closed.
- Handlers and repositories must use server-built tenant context.
- Reads and writes stay tenant-scoped by construction.
- Tiering can change capabilities, but never tenant boundaries.

## Chapter 2 Closeout Position

Chapter 1 ends as preserved SIC history. Chapter 2 starts with a cleaner product thesis:

Club Vivo is the product coaches use. SIC is the tenant-safe AWS SaaS platform that lets it exist. Session Builder is the current core product wedge. Quick Soccer Game becomes the fast, playful, low-friction lane for soccer activity creation without creating a separate backend product or weakening the shared platform foundation.
