# Chapter 2 Club Vivo Product Constitution

## Status

Draft Chapter 2 product constitution.

This document aligns the repo around Club Vivo as the product and SIC as the AWS SaaS platform foundation behind it. It is a product-governance document, not a runtime change.

## Core Positioning

Club Vivo is the product.

Sports Intelligence Cloud is the platform architecture behind Club Vivo. SIC provides the multi-tenant AWS SaaS foundation: auth, entitlements, tenant context, API Gateway, Lambda, DynamoDB, S3, CloudWatch, CDK, and public-safe operational discipline.

Session Builder is the major product player right now. It is the current coach-facing wedge that turns team context, constraints, equipment, objective, duration, and environment into a usable soccer session or activity.

Quick Soccer Game is the Chapter 2 fast creative lane. It should inherit the old Quick Session idea, but it should be told as a quicker, more playful soccer-game creation path inside the shared Club Vivo workflow.

## Product Promise

Club Vivo helps soccer coaches create something useful for the next practice without starting from a blank page.

The current promise is:

Tell Club Vivo what you have today, and it will help build a coach-ready soccer session or quick soccer game that fits the team, space, time, equipment, and objective.

## Product Pillars

### 1. Session Builder

Session Builder is the active core.

It should remain the deliberate planning path for:

- full sessions
- shorter drill or activity ideas
- team-aware planning context
- equipment-aware constraints
- saved sessions
- feedback
- export

Current source grounding:

- Frontend: `apps/club-vivo/app/(protected)/sessions/new/`
- Backend: `services/club-vivo/api/session-packs/handler.js`
- Domain: `services/club-vivo/api/src/domains/session-builder/`
- Saved output: `services/club-vivo/api/sessions/handler.js`

### 2. Quick Soccer Game

Quick Soccer Game is the fast creative lane.

It should be positioned as a low-friction way for a coach to ask for a simple, game-like soccer activity when time is short or the coach has a playful idea to translate.

Chapter 2 should treat it as a shared-app lane that reuses Session Builder and saved-session foundations. It is not a separate backend product, separate data model, separate auth path, or separate deployment.

### 3. Coach Workspace

Coach Workspace is the Club Vivo app shell and daily work area around the current coaching workflow.

Current Chapter 2 language should distinguish between shipped surfaces and near-term product areas. The active workspace story should center on:

- Home
- Session Builder
- Quick Soccer Game
- Teams
- Sessions library
- Saved-session detail
- Feedback
- Export action

Equipment Essentials and Methodology may appear as builder context, source-present support, or near-term workspace areas, but public docs should not present them as fully shipped standalone product areas until source inspection confirms that behavior.

Coach Workspace should feel practical and repeatable. It should make the active work easier to do rather than presenting every future idea at once.

### 4. Tenant-Safe SaaS Foundation

The product must keep the existing platform safety model:

- Tenant identity is server-derived from verified auth plus authoritative entitlements.
- Client input must not provide `tenant_id`, `tenantId`, or `x-tenant-id`.
- Missing or invalid tenant context fails closed.
- Repositories and storage paths remain tenant-scoped by construction.
- Production auth, tenancy, IAM, secrets, and deployments stay protected.

## Chapter 2 Product Language

Use:

- Club Vivo
- Coach Workspace
- Session Builder
- Quick Soccer Game
- Teams
- Equipment Essentials
- Methodology
- Sessions
- SIC platform foundation

Avoid making SIC the user-facing product name in product copy. SIC can remain architecture, repo, and platform language.

## Quick Session Rename Direction

Quick Session should become Quick Soccer Game in the Chapter 2 story.

The source may still contain Quick Session route, helper, or origin names. Chapter 2 does not require renaming code, routes, Lambdas, database keys, or public contracts. Product docs can begin using Quick Soccer Game while clearly noting that current source still reuses the shared Session Builder path.

## Runtime Non-Claims

Do not claim the following as shipped Club Vivo runtime behavior:

- Training Brief as a shipped public product flow.
- DiagramSequence as shipped runtime behavior.
- RAG, FAISS, vector search, or broad retrieval infrastructure.
- Autonomous agents.
- Bedrock production generation.
- Image analysis as part of the Chapter 2 product story.
- Match-to-Match Prescription as an active creation path.
- A separate admin app.

If any related code or docs exist, describe them as source-present, proposed, internal, parked, future, or historical according to the current source map.

## Open-Core And Developer Contribution Boundary

Developers may contribute later through an open-core or open-source model.

That model should support:

- product UI improvements
- documentation
- templates
- diagram language
- validation helpers
- non-sensitive local tooling
- public-safe extension points

It must not expose or loosen:

- production tenancy
- auth
- IAM
- secrets
- deployment control
- entitlement enforcement
- protected tenant data
- public API contracts without review

## Chapter 2 Operating Rule

Chapter 2 should simplify the story without simplifying away the platform discipline.

Club Vivo should become easier to understand. SIC should remain the protected foundation. Session Builder should keep improving as the main product wedge. Quick Soccer Game should make the product feel faster and more creative while staying inside the same tenant-safe architecture.
