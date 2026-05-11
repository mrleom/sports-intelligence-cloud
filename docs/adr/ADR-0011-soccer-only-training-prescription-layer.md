# ADR-0011 - Soccer-Only Training Prescription Layer

Status: Accepted
Date: 2026-05-11

## Context

SIC is the platform. Club Vivo is the current coach-facing product.

Club Vivo currently starts from the Session Builder: coaches provide real-world constraints and receive usable soccer training sessions.

The next product gap is the bridge between match or performance evidence and the next training action. Grassroots and low-budget clubs are the starting market, while academies and professional environments remain a future scaling direction.

Training Prescription is proposed direction, not shipped runtime behavior yet.

## Decision

Club Vivo's active evolution will be a soccer/football/fútbol-only Training Prescription Layer that extends the existing Session Builder.

The decision is:

- active scope is soccer-only
- futsal and multi-sport expansion are parked for later
- Training Prescription extends the existing Club Vivo Session Builder instead of replacing it
- Training Prescription does not create a separate app, backend service, or tenancy path
- `TrainingBrief v1` is the proposed bridge object between evidence and Session Builder output
- `DiagramSequence v1` is the proposed structured diagram data model
- diagrams should be rendered from structured sequence data, not raw generated images

Tenant isolation, server-derived tenant context, validation, observability, and cost-awareness remain non-negotiable.

## Consequences

Positive

- keeps Club Vivo focused on a clear soccer coaching problem
- preserves the existing Session Builder as the execution surface
- creates a path from coach evidence to training objectives, activities, and drills
- keeps diagrams structured, validatable, and reusable for preview, export, and future animation
- avoids multiplying apps, services, or tenancy paths too early

Negative

- futsal and multi-sport ideas remain parked
- richer evidence intake is future work
- Training Prescription requires careful validation before it becomes runtime behavior

## Non-Goals

This decision does not:

- claim Training Prescription is shipped
- replace the existing Session Builder
- create a separate Training Prescription app, backend service, or tenancy path
- accept `tenant_id`, `tenantId`, or `x-tenant-id` from client input
- make raw generated images the authoritative diagram source
- require paid data providers or heavy analytics infrastructure for the MVP

## Source-Of-Truth Links

- `docs/product/club-vivo/training-prescription-layer.md`
- `docs/api/training-brief-v1-contract.md`
- `docs/architecture/club-vivo/diagram-sequence-spec-v1.md`
- `docs/product/club-vivo/session-builder.md`
- `docs/architecture/platform-constitution.md`
- `docs/architecture/architecture-principles.md`
- `docs/architecture/tenant-claim-contract.md`
