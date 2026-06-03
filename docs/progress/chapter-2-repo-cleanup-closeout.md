# Chapter 2 Repo Cleanup Closeout

## 1. Theme

This cleanup wave made the repository easier to read after the GitHub public-face reset.

The repo now presents:

- Club Vivo as the current product and public GitHub face.
- Sports Intelligence Cloud as the AWS SaaS platform foundation behind Club Vivo.
- Chapter 1 as preserved history and learning evidence.
- Chapter 2 cleanup as classification work, not file deletion, moving, or runtime change.

## 2. What Changed

This wave added or tightened documentation classification around older, mixed, or easy-to-misread areas:

- Repo cleanup inventory.
- Proposals README map.
- Parked/future status labels.
- `coach-lite` legacy context README.
- Progress and New SIC history classification.
- Local artifact audit.
- Local cleanup runbook.
- Architecture diagrams classification.
- Vision doc classification.
- Foundations docs classification.
- ADR docs classification.
- Export docs classification.

The work focused on helping readers distinguish:

- active Chapter 2 source-of-truth docs
- active platform governance
- active runtime/source areas
- Chapter 1 history
- proposal and presentation material
- research and learning evidence
- parked future or source-present ideas
- folders that still need inspection before any move, rename, archive, or deletion

## 3. Commits And PRs Included

This closeout covers the cleanup wave visible on `main` after the public-face reset:

- `36115c3` - Chapter 2 repo cleanup inventory (#100)
- `b99ad1d` - Chapter 2 progress history classification (#101)
- `a296d1d` - local artifact audit (#102)
- `b2e0ddf` - local cleanup runbook
- `6cc539f` - architecture diagram docs classification
- `f4bceca` - vision doc classification
- `a0e2164` - foundations docs classification as platform governance
- `bb9c604` - ADR docs classification as decision history
- `9a5e9b7` - export docs classification

Related preceding context:

- PR #95 made Club Vivo the GitHub front door.
- PR #97 added the architecture PNG to the root README.
- `547b77f` added the Chapter 2 public-face closeout (#98).

## 4. What Is Now Easier To Understand

Readers should now have a clearer path through the repo:

- Start with Club Vivo as the product.
- Understand SIC as the tenant-safe AWS serverless foundation.
- Treat Session Builder as the main product wedge.
- Treat Quick Soccer Game as the fast creative lane.
- Read Chapter 1 and New SIC docs as history and evidence, not current product truth.
- Read ADRs as decision history that may need new ADRs to supersede old decisions.
- Read foundations docs as active platform governance.
- Read older diagram docs as supporting context, not competition for the Chapter 2 SaaS visual.
- Read export docs cautiously until current source confirms shipped export behavior.
- Treat local artifacts as ignored/untracked evidence for future cleanup, not as automatic deletion targets.

## 5. What Was Intentionally Not Changed

This cleanup wave did not:

- change app code
- change backend code
- change infra/CDK
- change auth, tenancy, IAM, entitlements, DynamoDB keys, routes, Lambdas, or public API contracts
- delete files
- move files
- rename files
- change `.gitignore`
- claim historical docs are current runtime truth
- claim proposal docs are shipped behavior
- turn parked future ideas into product commitments

## 6. Guardrails Preserved

The cleanup preserved the core Chapter 2 guardrails:

- Tenant identity remains server-derived from verified auth and authoritative entitlements.
- Client-provided `tenant_id`, `tenantId`, or `x-tenant-id` must not define tenant context.
- Missing or invalid tenant context fails closed.
- Tenant-scoped DynamoDB keys and S3 paths remain part of the platform story.
- Tiering changes capability, not isolation.
- SIC remains visible as the platform foundation rather than being collapsed into only a product name.
- Club Vivo remains the current product and public face.

This wave also kept these out of shipped Chapter 2 runtime claims:

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

## 7. Remaining Cleanup Candidates

Cleanup candidates still need source inspection or a dedicated decision before action:

- Update the Chapter 2 repo cleanup inventory to mark completed classification items.
- Review older architecture docs such as `sic-current-system-map.md`, `repo-structure.md`, and `sic-repo-inventory.md` against the current Club Vivo SaaS package.
- Review `docs/product/club-vivo/` older product docs against the Chapter 2 product constitution.
- Review `docs/api/` and distinguish active contracts from proposed or future-facing contracts.
- Review `datasets/`, `postman/`, `scripts/`, `.github/`, and `Makefile` as runtime-support or validation-support areas.
- Source-verify export behavior before making external claims about exports, lake-ready paths, or automation.
- Decide later whether labeled legacy folders should remain in place, move, or be archived.
- Consider local artifact cleanup only after explicit user confirmation.

## 8. Recommended Next Cleanup Slice

The next best cleanup slice is a source-of-truth alignment pass:

1. Update `docs/architecture/chapter-2/repo-cleanup-inventory.md` so it reflects completed classifications from this wave.
2. Classify `docs/api/` into active contracts, proposed contracts, and parked future contracts without changing contract behavior.
3. Review older architecture map docs against the Chapter 2 architecture package.
4. Review runtime-support folders (`datasets/`, `postman/`, `scripts/`, `.github/`, `Makefile`) without moving or deleting anything.
5. Keep all cleanup documentation-only until a dedicated move/archive PR is intentionally approved.

No runtime behavior should be inferred from this closeout.
