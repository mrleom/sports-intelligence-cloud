# Club Vivo Nonprofit SaaS Proposal

## Status

Draft proposal.

This proposal positions Club Vivo as a practical SaaS product for nonprofit and low-resource soccer programs. It does not change runtime scope, pricing, legal structure, public API contracts, auth, tenancy, IAM, CDK, secrets, or deployments.

## One-Sentence Proposal

Club Vivo helps nonprofit soccer programs give every coach a faster, safer, and more consistent way to plan practices with the players, space, equipment, and time they actually have.

## Product Positioning

Club Vivo is the product.

SIC is the multi-tenant AWS SaaS platform foundation behind it.

Session Builder is the main product wedge right now. It helps coaches build coach-ready soccer sessions and activity ideas from practical constraints.

Quick Soccer Game is the fast creative lane for coaches who need one playable soccer game quickly.

## Why Nonprofit Programs

Nonprofit and low-resource soccer programs often have:

- volunteer or part-time coaches
- uneven coaching education access
- limited planning time
- shared or imperfect spaces
- inconsistent equipment
- mixed player experience
- a need for repeatable program quality without heavy admin overhead

Club Vivo is designed for that reality.

## Problem

Many coaching tools assume ideal conditions or return generic text.

Nonprofit programs need something more practical:

- sessions that fit today's constraints
- simple activities coaches can run immediately
- safer age-aware planning
- reusable team and methodology context
- printable or shareable session outputs
- a record of what was planned and what worked

## Proposed SaaS Offer

### Core Offer

Club Vivo Coach Workspace for nonprofit soccer programs:

- authenticated coach workspace
- Session Builder
- Quick Soccer Game
- saved sessions
- team context
- equipment essentials
- methodology notes
- coach feedback
- PDF export

### Program Value

For program directors:

- more consistent practice quality
- support for less experienced coaches
- repeatable methodology language
- better visibility into planned sessions and coach feedback
- a practical coaching tool that does not require a large technical staff

For coaches:

- faster planning
- easier setup
- clearer activity structure
- quick game ideas when time is short
- useful adaptation for limited space or equipment

For players:

- more engaging practices
- safer, age-aware activities
- better progression over time

## Protected Platform Model

Production Club Vivo must remain tenant-safe and protected:

- Tenant identity is server-derived from verified auth plus authoritative entitlements.
- Client input must not provide `tenant_id`, `tenantId`, or `x-tenant-id`.
- Missing or invalid identity or entitlement data fails closed.
- Repositories and storage paths remain tenant-scoped by construction.
- Production IAM, auth, secrets, entitlements, tenant data, and deployments stay protected.

## Open-Core Contribution Model

Club Vivo may later support an open-core or open-source contribution model.

Good public contribution areas:

- session templates
- soccer activity libraries
- coaching-language standards
- diagram language improvements
- product documentation
- public-safe UI improvements
- local development tooling
- research and evaluation rubrics

Protected production areas:

- tenant isolation
- auth
- IAM
- secrets
- deployments
- entitlement records
- tenant data
- production observability access
- public API contract changes without review

The open-core model should let developers improve the product without gaining control over production infrastructure or tenant boundaries.

## Chapter 2 Scope

In Chapter 2, the nonprofit SaaS story should focus on:

- making Session Builder more useful
- making Quick Soccer Game easy to understand
- improving saved-session review and feedback
- keeping team, equipment, and methodology context practical
- preserving tenant isolation
- documenting the product clearly for pilots and contributors

## Non-Claims

This proposal does not claim the following as shipped runtime behavior:

- Training Brief as a shipped public product flow.
- DiagramSequence as shipped runtime behavior.
- RAG/vector infrastructure.
- Autonomous agents.
- Bedrock production generation.
- Image analysis as part of the Chapter 2 product story.
- A separate admin app.
- A new public API contract.

## Pilot Fit

A nonprofit pilot should evaluate:

- time to first useful session
- repeat usage by coaches
- quality of Quick Soccer Game outputs
- saved-session and feedback usage
- director confidence in methodology consistency
- coach confidence before practice
- whether low-resource constraints are handled respectfully and practically

## Success Criteria

An early nonprofit SaaS pilot is successful if coaches can use Club Vivo without extra technical support and can produce sessions or quick soccer games that they are willing to run with real players.

The product does not need to be broad to be valuable. It needs to be clear, practical, and trustworthy.
