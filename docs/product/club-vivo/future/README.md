# Club Vivo Future And Parked Product Docs

## 1. Status / Reading Model

This folder contains parked, proposed, exploratory, and future-facing product ideas for Club Vivo.

These docs are useful planning material. They do not define shipped Chapter 2 behavior unless current source and current source-of-truth docs confirm it.

Club Vivo is the current product and public GitHub face. Sports Intelligence Cloud is the AWS SaaS platform foundation behind Club Vivo. Session Builder is the main product wedge, and Quick Soccer Game is the fast creative lane.

Product-story cleanup must not turn future docs into runtime claims.

## 2. What Belongs Here

This folder is the right place for:

- parking-lot product ideas
- exploratory product scope notes
- future roadmap material
- ideas that need source inspection before promotion
- concepts that may inform Club Vivo later without changing Chapter 2 runtime

Current docs:

- [7q-board-game-learning-surface.md](7q-board-game-learning-surface.md)
- [image-assisted-intake-parking-lot.md](image-assisted-intake-parking-lot.md)
- [image-assisted-intake-v1-scope.md](image-assisted-intake-v1-scope.md)
- [methodology-source-mode-planning.md](methodology-source-mode-planning.md)
- [roadmap-phases.md](roadmap-phases.md)

## 3. How To Read Parked Future Docs

Read these docs as planning context unless a current source-of-truth doc says otherwise.

They may contain:

- older Week 18 scope language
- source-present ideas
- proposed flows
- future product hypotheses
- roadmap possibilities
- exploratory methodology or intake directions

They should not override:

- the Chapter 2 product constitution
- the Quick Soccer Game source doc
- current architecture docs
- current source files
- tenant/auth/data-boundary rules

If a future doc conflicts with current Chapter 2 source-of-truth docs, prefer the current Chapter 2 docs.

## 4. Current Chapter 2 Source-Of-Truth Links

Start with:

- [Club Vivo Product Docs](../README.md)
- [Chapter 2 Product Constitution](../chapter-2-product-constitution.md)
- [Quick Soccer Game](../quick-soccer-game.md)
- [Root README](../../../../README.md)
- [Docs README](../../../README.md)
- [Platform Constitution](../../../architecture/platform-constitution.md)
- [Architecture Principles](../../../architecture/architecture-principles.md)
- [Tenant Claim Contract](../../../architecture/tenant-claim-contract.md)
- [Chapter 2 Architecture Package](../../../architecture/chapter-2/)

## 5. Non-Claims

Do not claim these as shipped Chapter 2 Club Vivo runtime behavior:

- Training Brief
- DiagramSequence
- RAG/vector search
- autonomous agents
- Bedrock production generation
- image analysis
- Match-to-Match Prescription
- data lake
- analytics pipeline
- ETL
- production export automation
- methodology upload/source-mode
- broader image-assisted intake restart
- 7Q board-game learning surface
- a finished commercial SaaS launch

Future docs should not create or imply a new backend service, route, Lambda, data model, auth path, tenancy path, entitlement model, DynamoDB key pattern, public API contract, IAM rule, or CDK change.

## 6. Cleanup Boundary

Do not delete, move, or rename future docs yet.

Do not rewrite future docs as part of classification cleanup.

Future docs may be labeled, cross-linked, or classified later, but promotion into active product docs should require current source confirmation or an explicit source-of-truth update.

No app code, backend code, infra/CDK, auth, tenancy, IAM, entitlements, DynamoDB keys, routes, Lambdas, or public API contracts should change because of this folder map.
