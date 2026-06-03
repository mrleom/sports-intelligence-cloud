# Club Vivo SaaS Draw.io Brief

## Status

Draft draw.io handoff brief.

This document is documentation-only. It does not change app code, backend code, infrastructure, auth, tenancy, IAM, entitlements, DynamoDB keys, routes, Lambdas, or public API contracts.

## Diagram Goal

Create a simple draw.io architecture diagram that a coach, nonprofit director, or recruiter can understand in one pass.

The diagram should communicate:

- Club Vivo is the product.
- Sports Intelligence Cloud is the AWS SaaS platform foundation behind it.
- Session Builder is the main product wedge.
- Quick Soccer Game is the fast creative lane inside the same shared product.
- Tenant isolation is built into the platform path, not added later.

## Audience

Primary audience:

- coach recruiter
- technical recruiter
- nonprofit club director
- coach coordinator

Secondary audience:

- product reviewer
- technical reviewer
- future contributor

## Recommended Title

`Club Vivo on SIC SaaS Platform`

Recommended subtitle:

`A tenant-safe AWS serverless foundation for soccer coaching workflows`

## Core Visual Story

Use a left-to-right diagram with four simple zones:

1. Coach and product experience.
2. Protected API entry.
3. Purpose-based backend route families.
4. Tenant-safe AWS data, storage, and observability foundation.

The diagram should feel like a SaaS product architecture, not a classroom service list.

## Boxes To Show

### Product Experience

- Coach or coach-admin
- Club Vivo web app
- Coach Workspace
- Session Builder
- Quick Soccer Game
- Teams / Sessions / Feedback / Export
- Equipment + methodology context only when source-verified

### Secure Platform Entry

- Cognito authentication
- API Gateway HTTP API with JWT authorizer
- Lambda platform wrapper with logging, errors, and tenant context

### Purpose-Based API Route Families

Use purpose labels, not vague Lambda labels:

- Current Coach Profile / Me API
- Session Pack Generation API
- Saved Sessions API
- Team Management API
- Session Templates API
- Athlete Profile API, only if active in the Chapter 2 story
- Methodology Context API, only if source-verified

### AWS Foundation

- DynamoDB Tenant Entitlements Table
- DynamoDB SIC Domain Table
- S3 Session PDF storage
- CloudWatch logs, metrics, and alarms
- Auth trigger Lambdas for post-confirmation and pre-token-generation
- CDK infrastructure source

## Request Flow To Show

1. Coach signs in through Club Vivo.
2. Cognito authenticates the user.
3. Club Vivo calls API Gateway.
4. API Gateway validates JWT context.
5. Lambda wrapper resolves tenant context from verified claims and authoritative entitlements.
6. Session Builder and Quick Soccer Game both use the shared Session Pack Generation API path.
7. Saved sessions, feedback, and export use the shared sessions foundation.
8. DynamoDB and S3 stay tenant-scoped by construction.
9. CloudWatch records operational signals.

## Tenant Safety Callout

Add a visible callout near the platform wrapper and DynamoDB tables:

`Tenant-safe by construction`

Callout bullets:

- verified auth plus authoritative entitlements
- no client-supplied `tenant_id`, `tenantId`, or `x-tenant-id`
- fail closed when tenant context is missing or invalid
- tenant-scoped DynamoDB keys and S3 paths

## Visual Style

Keep the diagram calm and product-ready:

- white canvas
- light green or teal product lane
- light blue platform lane
- light purple or gray source lane
- one accent color for tenant safety
- rounded rectangles, but not oversized
- no dense AWS icon collage
- no more than 18 primary boxes

Recommended grouping:

- top lane: Club Vivo product
- middle lane: SIC request and API foundation
- bottom lane: AWS storage, auth triggers, observability, and CDK

## Explicit Exclusions

Do not include image analysis in the Chapter 2 product story.

Do not draw these as shipped runtime behavior:

- Training Brief
- DiagramSequence
- RAG or vector search
- autonomous agents
- Bedrock production generation
- separate admin app
- separate Quick Soccer Game backend
- separate Travel or OST app
- unwired export/lake route families as active deployed runtime

## Presenter Notes

If explaining the diagram:

- Start with the coach problem, not AWS.
- Explain that Club Vivo is the product and SIC is the foundation.
- Point out that Session Builder and Quick Soccer Game share the same protected backend path.
- Emphasize tenant isolation as a platform rule, not a product afterthought.
- Keep future AI or analytics ideas out of the walkthrough unless clearly labeled as not shipped.
