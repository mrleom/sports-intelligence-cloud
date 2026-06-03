# GitHub Public Face Cleanup Plan

## Status

Documentation-only Chapter 2 cleanup.

This plan does not change app code, backend code, infrastructure, auth, tenancy, IAM, entitlements, DynamoDB keys, routes, Lambdas, or public API contracts.

## What Changed In This Cleanup

- Root `README.md` now opens with Club Vivo as the product.
- Sports Intelligence Cloud stays visible as the tenant-safe AWS SaaS platform foundation.
- Session Builder is framed as the current main product wedge.
- Quick Soccer Game is framed as the fast creative lane.
- Architecture visual links point to the Chapter 2 draw.io and Mermaid assets.
- `docs/README.md` now separates active product docs, platform docs, Chapter 2 architecture docs, API contracts, research, proposals, history, and progress evidence.
- `docs/history/README.md` explains Chapter 1 preservation.
- `docs/proposals/README.md` explains proposal scope and honesty rules.

## What Should Be Done Later

- Review older product and architecture docs for Chapter 1 language that should be marked historical, parked, or superseded.
- Decide which old SIC-facing docs should remain active platform docs and which should move into a history/archive classification later.
- Review public-facing screenshots or diagrams after the Chapter 2 architecture package is stable.
- Consider UI copy cleanup only after docs are stable and the change is explicitly requested.
- Consider source route/helper rename work for Quick Soccer Game only after a separate implementation decision.

## Folders That Need Future Classification

- `docs/product/club-vivo/future/`
- `docs/product/club-vivo/pilots/`
- `docs/progress/`
- `docs/adr/`
- `docs/architecture/diagrams/`
- `docs/architecture/foundations/`
- older SIC, KSC, coach-lite, or pipeline-oriented docs if present

Classification should preserve evidence while making the active Chapter 2 source of truth easy to find.

## Chapter 1 History Reminder

Do not delete or move Chapter 1 history yet.

`archive/chapter-1-sic` preserves the pre-Chapter 2 repo snapshot from commit `f5eeaf4`, and `chapter-1-sic-closeout` marks the end of Chapter 1 at that same commit.

Historical docs should be treated as evidence, not as the current product story.

## Public Face Reminder

`main` is now the Club Vivo public face, powered by Sports Intelligence Cloud.

The repo should make Club Vivo easy to understand first, then show that SIC is the serious AWS SaaS foundation underneath it.

