# Session Builder Core Evidence

## Status

This folder is historical Session Builder quality evidence from the New SIC phase. It is useful for understanding how Session Builder output, fixtures, templates, diagram language, completion criteria, and validation findings evolved, but it is not the current Club Vivo product source of truth.

Current Club Vivo product truth lives in `docs/product/club-vivo/`, especially:

- `docs/product/club-vivo/session-builder.md`
- `docs/product/club-vivo/session-generation-quality-standards.md`
- `docs/product/club-vivo/coaching-session-design-standard.md`
- `docs/product/club-vivo/golden-template-library-v1.md`

Use those current product docs before using this folder to make product, runtime, or implementation claims.

## Reading Model

Treat these files as evidence, not active requirements by themselves. They preserve detailed observations about deterministic Session Builder quality, representative fixtures, template gaps, diagram-language needs, and future implementation slices.

These files should not override current source code, current product docs, current architecture docs, API contracts, runbooks, or fresh validation.

This folder does not claim AI/RAG, RAG/vector search, Match-to-Match Prescription, a public Training Brief API, Bedrock production generation, autonomous agents, image analysis, full DiagramSequence runtime, data lake, ETL, analytics pipeline, domain export automation, Glue, Athena, or QuickSight as shipped runtime.

## File Classification

| File | Classification | Evidence Value |
| --- | --- | --- |
| `diagram-language-research.md` | Diagram language research | Captures soccer diagram symbol language, story-panel model, activity-specific diagram needs, and deterministic diagram guardrails. |
| `output-quality-fixtures.md` | Output quality fixtures | Establishes representative coach prompts and a scoring rubric for repeatable Session Builder quality review. |
| `template-quality-matrix.md` | Template quality matrix | Maps objective/focus options to template-quality scores, routing gaps, and future deterministic template-pack candidates. |

## Useful Findings Preserved

- Session Builder quality review depended on repeatable fixtures, not one-off examples.
- Deterministic generation was the current brain in this evidence set; AI/RAG and autonomous generation were not implemented by these docs.
- Full-session duration allocation and drill/activity duration behavior were strong baseline areas.
- Output quality gaps clustered around generic activity language, activity distinctness, diagram usefulness, save/export review structure, mixed-age handling, and focus-to-template routing.
- Diagram quality needed a soccer-native symbol language and deterministic story model before any broader intelligent diagram direction.
- Template quality varied by objective/focus; strong paths should be promoted deliberately rather than generalized by assumption.
- Future implementation should be sliced narrowly and keep auth, tenancy, persistence, infrastructure, API routes, public contracts, and CDK wiring out of scope unless separately approved.

## Preserved Output Quality Findings

The consolidated first quality review and follow-up recheck preserve these durable findings:

- Five runnable fixtures moved closer to coach-ready text after deterministic template improvements.
- Mixed-age remained unsupported as a raw request age band; the adapted mixed-age/OST observation was useful evidence, but it did not mean mixed-age validation was solved.
- Diagram usefulness remained the widest repeated quality gap.
- Generated packs and draft review views still lacked structured diagram specs during that evidence pass.
- Save/export readability needed follow-up, especially richer safety notes, success criteria, progressions, regressions, common mistakes, and diagrams in review/export-oriented views.
- The next useful product-quality work was diagram review polish, mixed-age context handling, and stronger deterministic template coverage.
- The evidence pass made no runtime, source, frontend, backend, test, package, persistence, infrastructure, AI/RAG, Match-to-Match, public Training Brief API, or generation-source changes.

## Preserved Completion Findings

The removed broad completion audit's durable facts are preserved here and in the current Club Vivo product docs:

- Session Builder is the active product wedge, with Custom Build as the main creation path inside Coach Workspace.
- Quick Soccer Game is the lighter creative lane that reuses the shared deterministic generation direction.
- Match-to-Match Prescription is parked/future context and not active shipped runtime.
- Generation remains deterministic/template-based unless current source validation proves otherwise.
- There is no public Training Brief or prescription API, and no production AI/RAG, FAISS, Bedrock generation, or vector search for Session Builder output.
- Diagram work is a deterministic, structured future direction; this evidence folder does not claim full shipped DiagramSequence runtime.
- Deployment and domain polish are downstream of core product quality, current source validation, and smoke validation.

## Future Summarize-Before-Remove Candidates

These detailed files may be future remove-from-main candidates only after their durable findings are summarized into current Club Vivo product or architecture docs:

- `diagram-language-research.md`
- `output-quality-fixtures.md`
- `template-quality-matrix.md`

Likely target docs for durable findings are:

- `docs/product/club-vivo/session-builder.md`
- `docs/product/club-vivo/session-generation-quality-standards.md`
- `docs/product/club-vivo/coaching-session-design-standard.md`
- `docs/product/club-vivo/golden-template-library-v1.md`
- current diagram architecture docs, if diagram-language findings are still needed

Removal from `main` would not erase the work. Git history and the current summary/product docs should preserve the evidence trail before any detailed progress file is removed.

## Guardrails

Do not use this folder to change or reinterpret runtime code, infrastructure, API contracts, runbooks, auth, tenancy, IAM, entitlements, DynamoDB keys, routes, Lambdas, public API contracts, CDK wiring, build config, or Amplify assumptions.

Do not use this folder to claim parked, proposed, source-present, or future work as shipped Club Vivo runtime.
