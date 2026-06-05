# Club Vivo Coach Recruiter Architecture Brief

## Status

Draft portfolio-ready architecture brief.

This brief is documentation-only. It explains the current Club Vivo/SIC architecture story without changing runtime behavior or claiming proposed features as shipped.

## Short Version

Club Vivo is a soccer coaching SaaS product built on Sports Intelligence Cloud, a tenant-safe AWS serverless platform foundation.

The product helps coaches turn real-world constraints into usable sessions and quick soccer games. The architecture shows practical cloud engineering: authenticated access, API Gateway, Lambda route families, DynamoDB tenant-scoped data, S3 exports, CloudWatch observability, IAM discipline, and CDK infrastructure as code.

One-line portfolio pitch: Club Vivo is a soccer coaching SaaS product built on a tenant-safe AWS serverless foundation, with Session Builder as the main planning wedge and Quick Soccer Game as the fast activity lane.

## Product Problem

Grassroots and nonprofit soccer coaches often plan under pressure:

- limited time
- uneven coaching experience
- inconsistent equipment
- shared fields or small spaces
- changing player counts
- a need for sessions that are safe, clear, and runnable

Many tools return generic advice. Club Vivo focuses on the actual coaching workflow: what a coach has today, what the team needs, and what can be run on the field.

## Product Solution

Club Vivo gives coaches a practical workspace for planning and reuse.

The current Chapter 2 product story centers on:

- Session Builder as the major planning wedge.
- Quick Soccer Game as a fast creative lane.
- Saved sessions, feedback, and export as the reuse loop.
- Teams as durable context for repeat planning.
- Equipment and methodology as context or near-term support unless source-verified as standalone shipped workspace areas.

Quick Soccer Game inherits the spirit of Quick Session but does not create a separate backend product. It stays inside the shared Club Vivo workflow.

## AWS Architecture

The platform foundation is SIC, a multi-tenant serverless architecture on AWS.

Core services:

- Amazon Cognito for authentication.
- API Gateway HTTP API for secured backend access.
- AWS Lambda for route-family handlers.
- DynamoDB for tenant entitlements and domain data.
- S3 for session PDF export storage.
- CloudWatch for logs, metrics, and alarms.
- IAM for least-privilege access.
- AWS CDK for infrastructure as code.

The architecture is designed to be small enough to operate realistically, but disciplined enough to grow.

## SaaS Model

Club Vivo is built as one shared SaaS product, not one deployment per club.

The SaaS model depends on tenant-safe platform rules:

- Tenant identity is server-derived from verified auth plus authoritative entitlements.
- Client input must not provide `tenant_id`, `tenantId`, or `x-tenant-id`.
- Missing or invalid tenant context fails closed.
- Repositories and storage paths remain tenant-scoped by construction.
- Tiering may change capabilities, but not tenant boundaries.

This is the difference between a demo app and a product foundation: the architecture is designed around protected multi-tenant use from the start.

## Why It Matters

For coaches, Club Vivo reduces planning friction.

For clubs and nonprofits, it supports consistency across coaches without requiring a large technical or administrative staff.

For a technical reviewer, it demonstrates practical experience across product thinking, AWS architecture, SaaS boundaries, serverless implementation, tenant isolation, observability, and infrastructure governance.

For a recruiter, the signal is not just "built an app." The signal is: built a product-shaped, cloud-native SaaS foundation around a real user problem, with security and platform boundaries treated as first-class work.

## Current Boundaries

This brief does not claim the following as shipped runtime behavior:

- Training Brief as a public product flow.
- DiagramSequence as shipped runtime behavior.
- RAG or vector-search infrastructure.
- Autonomous agents.
- Bedrock production generation.
- A separate admin app.
- A new public API contract.

The Chapter 2 architecture story is strongest when it stays honest: Club Vivo is the product, SIC is the platform, Session Builder is the major wedge, and Quick Soccer Game is the fast lane inside the shared SaaS foundation.
