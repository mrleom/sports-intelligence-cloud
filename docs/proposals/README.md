# Club Vivo Proposals

This folder contains proposal and presentation docs for Club Vivo.

The audience includes nonprofit club directors, coach coordinators, coach recruiters, technical reviewers, and people evaluating the product and architecture story.

Club Vivo is the product. Sports Intelligence Cloud is the tenant-safe AWS SaaS platform foundation behind it.

## Proposal Rules

- Keep Club Vivo as the product.
- Keep Sports Intelligence Cloud visible as the AWS SaaS platform foundation.
- Keep Session Builder framed as the main product wedge.
- Keep Quick Soccer Game framed as the fast creative lane.
- Treat proposal docs as presentation material, not runtime source code, deployment evidence, or public API contracts.
- Stay honest about pilot-ready direction; do not present Club Vivo as a finished commercial SaaS launch.
- Stay honest about what is shipped, source-present, proposed, parked, or future.
- Do not present Training Brief, DiagramSequence, RAG/vector search, autonomous agents, Bedrock production generation, or image analysis as shipped runtime behavior.
- Do not weaken tenant isolation language.

## Canonical Proposal Docs

- [Club Vivo External Proposal](club-vivo-external-proposal.md)
  - Coach, nonprofit, and stakeholder-facing proposal for a small pilot conversation.
- [Club Vivo Coach Recruiter Architecture Brief](club-vivo-coach-recruiter-architecture-brief.md)
  - Portfolio and recruiter-facing architecture brief that explains the product and AWS SaaS foundation.
- [Club Vivo Architecture Walkthrough Script](club-vivo-architecture-walkthrough-script.md)
  - Short explanation script for walking through the Chapter 2 architecture diagram.

## Reading Notes

These docs should support conversations and reviews. They should not be used to infer changes to app code, backend code, infrastructure, auth, tenancy, IAM, entitlements, DynamoDB keys, routes, Lambdas, or public API contracts.

When proposal language conflicts with source-of-truth docs, prefer the current Chapter 2 product and architecture docs.
