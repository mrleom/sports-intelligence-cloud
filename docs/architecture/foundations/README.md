# SIC Architecture Foundations

## Status

Active platform governance and source-of-truth material.

This folder holds governance and foundation docs for Sports Intelligence Cloud architecture. These docs support SIC as the AWS SaaS platform foundation behind Club Vivo.

These docs are not Chapter 1 history unless a specific document says so. Club Vivo is the current product and public GitHub face, while platform rules, source-of-truth discipline, tenant boundaries, auth boundaries, data-boundary expectations, and governance rules remain governed here.

Do not move, rename, or delete this folder yet.

## Purpose

Foundation docs protect source-of-truth material from accidental drift. Protected does not mean frozen. These docs can evolve when SIC needs better architecture, product clarity, or repo organization, but changes should be intentional and traceable.

Product-story cleanup should not weaken tenant isolation, auth rules, IAM expectations, entitlement rules, DynamoDB key boundaries, route contracts, Lambda boundaries, or public API contracts.

## What Belongs Here

- Source-of-truth manifests.
- Architecture governance docs.
- Rules for how protected docs can change.
- Small foundation docs that help keep architecture and product direction aligned.

## What Should Not Go Here

- Weekly progress notes.
- Casual planning notes.
- Runtime source code.
- Product-only docs.
- Future ideas presented as shipped runtime behavior.
- Chapter 1 history unless explicitly marked as historical.

## Important Files

- `source-of-truth-manifest.md`
  - Defines protected source-of-truth docs, amendment philosophy, ADR-required changes, and review checklist.

## Change Rules

- Changes should be reviewed, intentional, and traceable.
- Major changes may require an ADR or explicit architecture decision.
- Small clarifications can be made through normal doc review.
- Historical docs should not be rewritten to pretend the past was different.
- Future or parked docs should not be presented as shipped runtime behavior.
- Do not present Training Brief, DiagramSequence, RAG/vector search, autonomous agents, Bedrock production generation, image analysis, or Match-to-Match Prescription as shipped Chapter 2 runtime unless current source and current source-of-truth docs prove it.
