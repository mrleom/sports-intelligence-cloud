# Club Vivo And SIC Documentation

This folder contains the human-readable documentation for Club Vivo and the Sports Intelligence Cloud platform foundation behind it.

Chapter 2 source-of-truth language should lead with Club Vivo as the product and SIC as the tenant-safe AWS SaaS foundation. Historical docs remain useful evidence, but they should not override current product and architecture docs.

## Active Club Vivo Product Docs

- [Chapter 2 Product Constitution](product/club-vivo/chapter-2-product-constitution.md)
- [Quick Soccer Game](product/club-vivo/quick-soccer-game.md)
- [Club Vivo Product Folder](product/club-vivo/)

Use these docs for the current product story:

- Club Vivo is the product.
- Session Builder is the main product wedge.
- Quick Soccer Game is the fast creative lane.
- Image analysis is out of the Chapter 2 product story.

## Architecture And Platform Docs

- [Platform Constitution](architecture/platform-constitution.md)
- [Architecture Principles](architecture/architecture-principles.md)
- [Tenant Claim Contract](architecture/tenant-claim-contract.md)
- [Club Vivo Source Map](architecture/club-vivo-source-map.md)
- [Source-of-Truth Manifest](architecture/foundations/source-of-truth-manifest.md)

Use these docs for platform governance, tenant isolation, source orientation, and architecture discipline.

## Chapter 2 Architecture Package

- [Club Vivo Repo Reset Plan](architecture/chapter-2/club-vivo-repo-reset-plan.md)
- [Lambda Naming Inventory](architecture/chapter-2/lambda-naming-inventory.md)
- [Club Vivo SaaS Diagram Prompt](architecture/chapter-2/club-vivo-saas-diagram-prompt.md)
- [Club Vivo SaaS Architecture Mermaid](architecture/chapter-2/club-vivo-saas-architecture-mermaid.md)
- [Club Vivo SaaS Architecture Draw.io](architecture/chapter-2/club-vivo-saas-architecture.drawio)
- [Club Vivo SaaS Architecture Diagram Draw.io](architecture/chapter-2/club-vivo-saas-architecture-diagram.drawio)

These docs explain Club Vivo as the product and SIC as the AWS SaaS foundation without renaming deployed Lambdas or changing runtime contracts.

## API Contracts

- [API Contracts Folder](api/)

API docs describe public and cross-layer contracts. Do not change public API contracts casually, and do not use product-story cleanup as a reason to change routes, Lambdas, DynamoDB keys, auth, tenancy, or entitlements.

## Research

- [Research Folder](research/)
- [Club Vivo Scientific Article Outline](research/club-vivo-scientific-article-outline.md)

Research docs can support positioning and learning evidence, but they should stay separate from shipped runtime claims.

## Proposals Currently On Main

- [Proposals Folder](proposals/)
- [Club Vivo Nonprofit SaaS Proposal](proposals/club-vivo-nonprofit-saas-proposal.md)
- [Club Vivo Nonprofit SaaS One-Page](proposals/club-vivo-nonprofit-saas-one-page.md)
- [Club Vivo Coach Recruiter Architecture Brief](proposals/club-vivo-coach-recruiter-architecture-brief.md)

Proposal docs should be honest about shipped versus proposed behavior and should not reference files from unmerged branches.

## History And Progress Evidence

- [History Folder](history/)
- [Chapter 1 SIC Closeout](history/chapter-1-sic-closeout.md)
- [Progress Folder](progress/)

Chapter 1 is preserved history. Current Chapter 2 docs are the active public face for Club Vivo powered by SIC.

## Change Rules

- Keep source-of-truth docs aligned with current source.
- Do not present future or parked ideas as shipped runtime behavior.
- Keep tenant isolation language intact.
- Keep image analysis out of the Chapter 2 product story.
- Auth, tenancy, entitlement, IAM, CDK, data model, route, Lambda, or public API contract changes require deliberate architecture review.
