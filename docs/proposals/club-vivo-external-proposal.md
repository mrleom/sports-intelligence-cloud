# Club Vivo External Proposal

## Audience

This proposal is written for nonprofit club directors, coach coordinators, coach recruiters, and technical reviewers who want to understand the Club Vivo Chapter 2 direction.

## Summary

Club Vivo is a soccer coaching SaaS product for nonprofit sports organizations, clubs, academies, and coach development programs.

It helps coaches turn real-world constraints into practical training sessions and quick soccer games they can actually run. Sports Intelligence Cloud is the AWS SaaS platform foundation behind the product, providing authenticated access, tenant-safe data boundaries, serverless APIs, observability, and infrastructure discipline.

Short version: Club Vivo helps nonprofit soccer programs give every coach a faster, safer, and more consistent way to plan practices with the players, space, equipment, and time they actually have.

Chapter 2 is pilot-ready direction, not a claim that Club Vivo is a finished commercial SaaS. The focus is to prove the product wedge with a small group of coaches, learn from their use, and keep the architecture honest as the product matures.

## Problem

Nonprofit and grassroots soccer programs often depend on coaches who are busy, volunteer, part-time, or still developing their coaching style.

These coaches usually plan around imperfect conditions:

- changing player counts
- limited or inconsistent equipment
- shared fields and small spaces
- mixed skill levels
- limited planning time
- pressure to keep activities safe, fun, and useful

Generic coaching content does not solve this problem. A coach does not just need another list of drills. The coach needs a plan that fits today: the players, the space, the time, the equipment, and the immediate coaching goal.

## Solution

Club Vivo gives coaches a practical planning workspace.

The product starts with two creation paths:

- Session Builder: the main product wedge for deliberate session planning.
- Quick Soccer Game: the fast creative lane for one playable soccer activity when the coach needs something simple and engaging quickly.

The product also supports the surrounding coaching workflow:

- saved sessions
- coach feedback
- export support
- team context
- equipment and methodology context where source-verified or near-term

The goal is not to replace the coach. The goal is to reduce blank-page planning stress and give coaches a better starting point.

## Product Wedge

Session Builder is the major product wedge because it turns practical inputs into a coach-ready output.

Current Chapter 2 positioning:

- Club Vivo is the product.
- SIC is the AWS SaaS platform foundation.
- Session Builder is the main wedge.
- Quick Soccer Game is a fast lane inside the same shared workflow.
- Quick Soccer Game does not create a separate backend product, data model, auth path, route family, or deployment.

This keeps the product simple enough for a pilot while preserving a SaaS architecture that can support future growth.

## Pilot Fit

Club Vivo is a good fit for a small nonprofit pilot if the organization wants to:

- support newer coaches
- reduce planning friction
- improve session consistency
- help coaches create practical activities faster
- keep a record of sessions and feedback
- evaluate whether coaches would reuse the workflow
- protect organization and team data boundaries

A practical pilot could start with a small group of coaches over a short program window. The purpose would be to test usefulness, clarity, and repeat use, not to promise a fully finished commercial product.

The pilot should be small and honest rather than framed as a big rollout: a few coaches, realistic scenarios, and direct feedback on whether the tool saves planning time and produces sessions they would actually run.

Pilot success signals:

- time to first useful session
- repeat use by coaches
- quality of Quick Soccer Game outputs
- saved-session usage
- coach feedback submissions
- director confidence in practice consistency
- coach confidence before practice

## AWS Trust Points

Club Vivo runs on Sports Intelligence Cloud, a tenant-safe AWS serverless platform foundation.

The current architecture story includes:

- Amazon Cognito for authentication.
- API Gateway HTTP API for secured backend access.
- AWS Lambda route families for backend behavior.
- DynamoDB for tenant entitlements and domain data.
- S3 for private session export storage.
- CloudWatch for logs, metrics, and alarms.
- IAM discipline for service access.
- CDK infrastructure as code.

Tenant safety is a core trust point:

- Tenant identity is server-derived from verified auth plus authoritative entitlements.
- Client input must not provide `tenant_id`, `tenantId`, or `x-tenant-id`.
- Missing or invalid tenant context fails closed.
- DynamoDB reads and writes remain tenant-scoped by construction.
- Storage paths remain tenant-scoped.

For a technical reviewer, the value is that Club Vivo is not just a prototype screen. It is a product-shaped SaaS system with security, identity, tenancy, and operational boundaries treated as part of the product foundation.

## Honest Boundaries

This proposal does not claim the following as shipped runtime behavior:

- Training Brief as a public product flow.
- DiagramSequence as shipped runtime behavior.
- RAG or vector-search infrastructure.
- autonomous agents.
- Bedrock production generation.
- image analysis as part of the Chapter 2 product story.
- a separate admin app.
- a finished commercial SaaS launch.

The proposal is strongest when it stays grounded: Club Vivo is ready to be discussed as a pilot-focused product direction with a serious AWS SaaS foundation.

## Next Step

The recommended next step is a small pilot conversation.

Suggested pilot question:

Would a small group of coaches use Club Vivo to create one session and one quick soccer game, then give feedback on whether the outputs were clear, useful, and realistic for their program?

If the answer is yes, the next step is to define:

- coach group
- pilot window
- session-planning scenarios
- feedback format
- success measures
- data/privacy expectations

The goal is simple: help coaches walk onto the field with a better plan and less stress, while proving the product responsibly.
