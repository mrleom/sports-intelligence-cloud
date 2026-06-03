# Club Vivo

A soccer coaching SaaS product for nonprofit and grassroots sports organizations.

Powered by Sports Intelligence Cloud, a tenant-safe AWS serverless platform foundation.

## What Club Vivo Is

Club Vivo is the coach-facing product in this repository. It helps coaches and coach-admins create, save, review, and export soccer training sessions from real coaching constraints: team context, age group, space, duration, equipment, and practice objective.

Sports Intelligence Cloud (SIC) is the platform foundation behind Club Vivo. SIC provides the AWS SaaS architecture, tenant isolation model, auth/entitlement flow, infrastructure discipline, and operational guardrails that let Club Vivo grow without weakening data boundaries.

## Why It Matters

Many nonprofit and grassroots sports organizations rely on volunteer or part-time coaches who need practical support fast. Club Vivo is built around that reality: help a coach produce something usable for the next practice without starting from a blank page or managing a heavy planning tool.

The product direction is deliberately narrow in Chapter 2. Club Vivo should be useful, easy to explain, and grounded in the current source before expanding into larger platform ideas.

## Current Product Wedge: Session Builder

Session Builder is the main Club Vivo product wedge right now.

It is the deliberate planning path for creating coach-ready soccer sessions, shorter activities, saved sessions, feedback, and exportable session packs. It uses the shared Club Vivo app and the SIC platform foundation rather than a separate product, backend, auth path, or tenancy model.

Source grounding:

- `apps/club-vivo`
- `services/club-vivo/api/session-packs/handler.js`
- `services/club-vivo/api/src/domains/session-builder/`
- `services/club-vivo/api/sessions/handler.js`

## Fast Lane: Quick Soccer Game

Quick Soccer Game is the Chapter 2 product story for the fast creative lane that grows out of the current Quick Session source.

It is meant for moments when a coach needs one simple soccer activity quickly: a warm-up game, a playful activity, or a short game that fits today's players, space, time, and equipment. It stays inside the shared Club Vivo workflow and reuses the Session Builder generation and save foundations.

Quick Soccer Game does not introduce a separate backend product, Lambda, data model, auth path, tenancy path, or public API contract.

## AWS SaaS Architecture

Club Vivo runs on the SIC serverless SaaS foundation:

- Cognito for authentication.
- API Gateway HTTP API with JWT authorization.
- Lambda route handlers and a platform wrapper for logging, errors, and tenant context.
- DynamoDB for tenant entitlements and tenant-scoped domain data.
- S3 for tenant-scoped session PDF storage.
- CloudWatch for logs, metrics, and alarms.
- CDK for infrastructure as code.

The active source areas are:

- `apps/club-vivo` for the Next.js web app.
- `services/club-vivo/api` for Club Vivo API source.
- `services/auth` for Cognito trigger Lambdas.
- `infra/cdk` for AWS infrastructure source.

## Tenant-Safe By Construction

Tenant safety is part of the product promise, not just an implementation detail.

Core rules:

- Tenant identity is derived from verified auth and authoritative entitlements.
- Client input must not provide `tenant_id`, `tenantId`, or `x-tenant-id`.
- Missing or invalid tenant context fails closed.
- DynamoDB access is tenant-scoped by key construction.
- S3 session export paths are tenant-scoped.
- Tiering changes capabilities, not isolation.

The detailed contract lives in [docs/architecture/tenant-claim-contract.md](docs/architecture/tenant-claim-contract.md).

## Architecture Visual Links

- [Club Vivo SaaS architecture draw.io](docs/architecture/chapter-2/club-vivo-saas-architecture.drawio)
- [Club Vivo SaaS architecture diagram draw.io](docs/architecture/chapter-2/club-vivo-saas-architecture-diagram.drawio)
- [Club Vivo SaaS architecture Mermaid](docs/architecture/chapter-2/club-vivo-saas-architecture-mermaid.md)

## Repository Map

- `apps/club-vivo` - active Club Vivo web app and Coach Workspace.
- `services/club-vivo/api` - active Club Vivo backend API source.
- `services/auth` - Cognito auth lifecycle Lambda source.
- `infra/cdk` - AWS CDK infrastructure source.
- `docs/product/club-vivo` - active Club Vivo product docs.
- `docs/architecture` - SIC platform architecture, tenant rules, source maps, and Chapter 2 architecture package.
- `docs/api` - API and cross-layer contracts.
- `docs/proposals` - proposal and presentation docs currently on main.
- `docs/research` - research outlines and supporting analysis.
- `docs/history` - preserved Chapter 1 history.
- `docs/progress` - build history and progress evidence.
- `docs/runbooks` - operational guidance.

## Current Status

Chapter 2 makes Club Vivo the public product face of the repository, powered by Sports Intelligence Cloud.

The current repo is best read as a product-shaped architecture and pilot-ready direction, not a guarantee that every commercial SaaS feature is fully shipped. Session Builder is the active wedge. Quick Soccer Game is the fast creative lane in the Chapter 2 story while current source may still use Quick Session names in routes or helpers.

## What Is Not Claimed

The Chapter 2 product story does not claim these as shipped Club Vivo runtime behavior:

- Image analysis
- Training Brief as a shipped public product flow
- DiagramSequence as shipped runtime behavior
- RAG, FAISS, vector search, or broad retrieval infrastructure
- Autonomous agents
- Bedrock production generation
- Match-to-Match Prescription as an active creation path
- A separate admin app

Equipment Essentials and Methodology should remain source-present support, builder context, or near-term workspace areas unless source inspection confirms standalone shipped behavior.

## Chapter 1 Archive Note

Chapter 1 is preserved as SIC history and learning evidence.

- `archive/chapter-1-sic` preserves the pre-Chapter 2 repository snapshot from commit `f5eeaf4`.
- `chapter-1-sic-closeout` marks the end of Chapter 1 at commit `f5eeaf4`.
- Historical docs should not override current Chapter 2 source-of-truth docs.
