# Club Vivo Product Docs

## 1. Status / Reading Model

This folder is the product documentation home for Club Vivo Chapter 2.

Club Vivo is the current product and public GitHub face. Sports Intelligence Cloud is the AWS SaaS platform foundation behind Club Vivo.

Read this folder with the current Chapter 2 source-of-truth docs first:

- [Chapter 2 Product Constitution](chapter-2-product-constitution.md)
- [Quick Soccer Game](quick-soccer-game.md)
- [Root README](../../../README.md)
- [Docs README](../../README.md)

Older docs, pilot-specific docs, roadmap docs, and future docs remain useful, but they should not override the current Chapter 2 product constitution, current architecture docs, or current source.

## 2. Current Product Truth

- Club Vivo is the product.
- Sports Intelligence Cloud is the platform foundation.
- Session Builder is the main product wedge.
- Quick Soccer Game is the fast creative lane.
- Chapter 1 is preserved as history and learning evidence.
- Cleanup work is classification-first. It does not delete, move, rename, or change runtime behavior.

## 3. Start-Here Docs

Start with:

- [Chapter 2 Product Constitution](chapter-2-product-constitution.md)
  - Current product positioning and product governance for Chapter 2.
- [Quick Soccer Game](quick-soccer-game.md)
  - Current product story for the fast creative lane.
- [Session Builder](session-builder.md)
  - Product direction for the main planning wedge. Read against the Chapter 2 constitution.
- [Coach Workspace](coach-workspace.md)
  - Workspace direction and product surface context. Treat standalone workspace-area claims as source-verification candidates.

## 4. Active Product Docs

These docs describe current or source-present product direction. Use them with the Chapter 2 constitution as the governing lens:

- [chapter-2-product-constitution.md](chapter-2-product-constitution.md)
- [quick-soccer-game.md](quick-soccer-game.md)
- [session-builder.md](session-builder.md)
- [coach-workspace.md](coach-workspace.md)
- [role-and-workspace-model.md](role-and-workspace-model.md)
- [methodology.md](methodology.md)
- [user-flows.md](user-flows.md)

If any of these docs conflict with the current Chapter 2 constitution, prefer the constitution until the doc is updated or source inspection proves otherwise.

## 5. Session Builder Docs

Session Builder is the main product wedge.

Use these docs for Session Builder behavior, quality, and design direction:

- [session-builder.md](session-builder.md)
- [coaching-session-design-standard.md](coaching-session-design-standard.md)
- [session-generation-quality-standards.md](session-generation-quality-standards.md)
- [golden-template-library-v1.md](golden-template-library-v1.md)
- [soccer-development-taxonomy-v1.md](soccer-development-taxonomy-v1.md)

These docs should support the current Session Builder story: a coach-facing planning path that turns real soccer constraints into coach-ready sessions, shorter activities, saved sessions, feedback, and exportable output while staying on the SIC platform foundation.

## 6. Quick Soccer Game Docs

Quick Soccer Game is the Chapter 2 name for the fast creative lane.

- [quick-soccer-game.md](quick-soccer-game.md)

Use "Quick Soccer Game" for product language. Use "Quick Session" only when referring to current source files, routes, helpers, saved origin hints, or historical notes.

Quick Soccer Game does not introduce a separate backend product, Lambda, data model, auth path, tenancy path, route family, or public API contract.

## 7. Generation Profiles / Quality Standards

Generation and quality docs should keep outputs coach-ready, soccer-specific, age-aware, equipment-aware, and safe to run.

- [generation-profiles/](generation-profiles/)
  - Product guidance for sport, format, methodology style, or coaching context.
- [coaching-session-design-standard.md](coaching-session-design-standard.md)
- [session-generation-quality-standards.md](session-generation-quality-standards.md)
- [golden-template-library-v1.md](golden-template-library-v1.md)
- [soccer-development-taxonomy-v1.md](soccer-development-taxonomy-v1.md)

Do not claim a generation profile is implemented unless current source and current architecture docs support it.

## 8. Pilot / Context Docs

Pilot and context docs preserve evidence and examples. They should inform product learning without becoming the generic product model by default.

- [pilots/](pilots/)
  - Pilot-specific setup, readiness notes, and club-specific examples.
- [pilots/ksc/](pilots/ksc/)
  - KSC-specific program and methodology context.
- [club-vivo-evolution-roadmap.md](club-vivo-evolution-roadmap.md)
  - Product evolution context. Read as direction unless current source proves shipped behavior.
- [football-intelligence-learning-layer.md](football-intelligence-learning-layer.md)
  - Learning/intelligence context. Do not read as shipped runtime.

Pilot-specific assumptions should not override the Chapter 2 product constitution.

## 9. Parked Future Docs

Future and parked docs are useful context, not shipped Chapter 2 runtime behavior.

- [future/](future/)
- [training-prescription-layer.md](training-prescription-layer.md)

Examples of parked or future areas in this folder include:

- image-assisted intake
- methodology source-mode planning
- broader roadmap phases
- 7Q board-game learning surface
- Training Prescription direction

These docs should stay clearly separated from shipped product claims unless a later source-of-truth update promotes them.

## 10. What Not To Overclaim

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
- a finished commercial SaaS launch
- a separate admin app
- a separate Quick Soccer Game backend product

Equipment Essentials and Methodology may appear as builder context, source-present support, or near-term workspace areas, but do not present them as fully shipped standalone product areas unless source inspection confirms that behavior.

## 11. Cleanup Boundary

Do not delete, move, or rename product docs during classification cleanup.

Do not use product-story cleanup to change app code, backend code, infra/CDK, auth, tenancy, IAM, entitlements, DynamoDB keys, routes, Lambdas, or public API contracts.

If a product doc conflicts with current source or higher-order Chapter 2 docs, label and cross-link it before rewriting or moving it. Historical, pilot, and future docs should remain preserved until a dedicated cleanup decision says otherwise.
