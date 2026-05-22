# New SIC Architect Process Log

## Purpose

This architect process log is the concise post-Week-21 record for New SIC.

It summarizes the major architecture, product, runtime, deployment, and guardrail decisions captured across Closeout Summaries 1 through 9. The closeout summaries remain the detailed chronological evidence. This file is the high-level process record used to understand how the current SIC / Club Vivo baseline evolved.

This document is not a roadmap, closeout summary, implementation checklist, or runtime claim. It is a compact architecture-process narrative.

## Source Documents

This log is based on:

- `docs/progress/new-sic/closeout-summary-1.md`
- `docs/progress/new-sic/closeout-summary-2.md`
- `docs/progress/new-sic/closeout-summary-3.md`
- `docs/progress/new-sic/closeout-summary-4.md`
- `docs/progress/new-sic/closeout-summary-5.md`
- `docs/progress/new-sic/closeout-summary-6.md`
- `docs/progress/new-sic/closeout-summary-7.md`
- `docs/progress/new-sic/closeout-summary-8.md`
- `docs/progress/new-sic/closeout-summary-9.md`

## Executive Architecture Timeline

### Phase 1 - New SIC Reset And GitHub Main Cleanup

New SIC began with a repository reset and GitHub showcase cleanup.

The old week-based progress model was closed. Detailed historical files were preserved outside `main` through an archive branch and tag, while GitHub `main` was cleaned to show a clearer current product story.

Key architecture/process outcomes:

- `main` became cleaner and easier to review.
- Detailed historical progress remained preserved outside `main`.
- Product docs were reorganized around the active Club Vivo direction.
- Future or parked ideas were moved out of active runtime paths.
- Active code, infrastructure, API contracts, auth, tenancy, entitlements, IAM, and CDK were protected during cleanup.
- Unwired backend/export/lake folders were audited and kept parked unless explicitly needed.

This reset established a cleaner baseline without changing shipped runtime behavior.

### Phase 2 - Club Vivo Local Product Stabilization

The next phase focused on making the local Club Vivo web app feel more useful before wider deployment.

The work improved the coach-facing experience around:

- saved session detail pages
- Session Builder form flow
- generated session review
- diagram placeholder and zoom behavior
- Quick Session being clarified as Quick Activity
- shared deterministic generation behavior
- team-aware and equipment-aware generation context
- age-band parsing
- selected-equipment vs available-equipment behavior

The most important product lesson from this phase was that the generation brain should use the coach's real context:

```text
team -> age/program -> equipment -> environment -> objective -> coaching note / activity idea
```

This phase was still primarily local product stabilization, not a platform redesign.

### Phase 3 - Coach-Ready Deterministic Session Generation

Club Vivo then moved from generic activity text toward deterministic, prompt-aware soccer activity generation.

The system began interpreting coach prompts as signals rather than simply repeating text. The first concrete proof was the transformation of a playful non-soccer idea such as Duck Duck Goose into a soccer-specific activity.

Key architecture/process outcomes:

- Quick Activity became the fast activity lane.
- Session Builder remained the richer guided planning lane.
- Quick Activity and Session Builder shared the same backend generation brain.
- Prompt archetype handling was introduced deterministically.
- The backend `/session-packs` Lambda became clearly identified as the generation brain.
- Amplify was confirmed as the frontend deployment path.
- CDK/API deployment was confirmed as required for backend generation changes.
- Lambda runtime was updated from Node.js 20 to Node.js 22 in a focused infra slice.

This phase clarified a key deployment boundary:

```text
Amplify deploys the frontend.
API Gateway + Lambda deploys the generation brain.
```

### Phase 4 - Club Vivo Product Identity And Workspace Alignment

Club Vivo was then clarified as the product/platform identity.

KSC was repositioned as Jason's pilot/example verified club workspace, not the product identity. This reduced confusion and helped separate general product behavior from pilot-specific context.

Key product and architecture decisions:

- Club Vivo is the platform/product.
- KSC is a pilot/example workspace.
- Coach Workspace is the coach planning workspace inside Club Vivo.
- Club Workspace includes Coach Workspace.
- Free Individual Coach Workspace and Free Club Workspace are valid product paths.
- Verified / Supported Club Workspace is a future higher-trust tier.
- Public start choices are product intent only, not authorization.
- Admin-like users can land in a protected Club Portal shell.
- Regular coaches land in Coach Workspace.
- Browser-local coach workspace hints are scoped by signed-in user and tenant context.
- New users should not inherit old KSC/test team hints.

This phase strengthened product identity without weakening authorization or tenancy boundaries.

### Phase 5 - Session Builder Quality And Diagram Storytelling

The next phase improved the current deterministic Session Builder so it could feel more like a real coaching tool.

The full-session output was shaped into a progressive coaching story instead of a list of generic activities.

The session pattern became:

```text
activation / warm-up
main activity 1
main activity 2 or progression
competitive final game / competitive close
```

The diagram experience also matured from placeholders into deterministic story views.

Key outcomes:

- activity setup text uses clearer grid or field dimensions
- selected equipment is used directly when available
- no-equipment cases avoid vague equipment alternatives
- Activity 2 and Activity 3 are kept distinct
- final activities close with game realism and competitive energy
- diagrams use deterministic setup/action/play/score storytelling
- diagram legend semantics were clarified
- the ball became a visual symbol instead of text
- diagrams remained deterministic SVG/React/CSS views

This phase improved presentation and coaching clarity, but it did not introduce a full diagram engine, RAG, FAISS, Bedrock production generation, vector search, or a new AI model.

### Phase 6 - Source-Of-Truth Alignment And Future Intelligence Direction

The source-of-truth alignment phase clarified how SIC and Club Vivo should be described going forward.

Key decisions:

- SIC is the platform.
- Club Vivo is the current coach-facing product.
- Session Builder is the active runtime wedge.
- Coach Workspace is the surrounding product experience.
- Training Prescription is a proposed soccer-only future evolution.
- Training Prescription extends Session Builder instead of replacing it.
- Training Prescription does not create a separate app, backend service, auth path, or tenancy path.
- Training Brief is the proposed bridge from evidence to training objective and session direction.
- DiagramSequence is the proposed structured diagram data direction.
- Diagrams are a five-star product requirement.
- GitHub/current repo docs are the source of truth for future project context.

This phase also introduced 7Q Football Intelligence and Learning as a proposed product direction, plus a future 7Q board-game learning surface as parked exploration.

The source-of-truth work was intentionally documentation-focused. It did not claim shipped runtime behavior for Training Prescription, Training Brief, DiagramSequence, or 7Q.

### Phase 7 - Custom Build And Match-to-Match Prescription Split

The most recent product/runtime phase clarified that Session Builder should not be one overloaded form.

The `/sessions/new` flow was split into two clearer paths:

```text
Custom Build
Match-to-Match Prescription
```

Custom Build is the everyday coach-led builder. It is for coaches who already know what they want to work on.

Custom Build includes:

- build mode: Full Session or Drill
- team
- duration
- primary objective
- specific focus
- coaching note / activity idea
- environment
- equipment
- generate session

Match-to-Match Prescription is the advanced evidence-led draft path from last match to next match. It is intended for competitive teams, academies, and pro-style workflows where the coach may bring match observations, team performance evidence, opponent notes, tactical notes, and days-until-next-match context.

Match-to-Match does not ask for manual build mode, manual time, primary objective, specific focus, or equipment intake before drafting recommendations.

Current Match-to-Match behavior is frontend-only and deterministic. It is a draft preview that establishes product shape, not full prescription automation.

This phase also changed the duration model:

```text
Full Session: 45-120 minutes
Drill / Activity: 15-25 minutes
```

The deterministic generator now allocates selected duration into exact activity totals. Drill/activity generation creates one focused activity matching the selected duration.

Equipment creation was removed from Session Builder and belongs in the Equipment page. Environment selection now uses curated soccer-related spaces.

## Current Product Model

The current SIC / Club Vivo product model is:

- SIC is the broader platform.
- Club Vivo is the current coach-facing product.
- Coach Workspace is the coach planning workspace inside Club Vivo.
- Club Workspace includes Coach Workspace.
- Session Builder is the active runtime wedge.
- Custom Build is the everyday coach-led Session Builder path.
- Match-to-Match Prescription is the advanced evidence-led draft path.
- Quick Activity is the fast activity lane.
- Equipment page owns equipment creation and equipment essentials.
- Saved Sessions preserve generated plans and review/export continuity.
- Training Prescription, Training Brief, DiagramSequence, and 7Q are evolving intelligence layers unless explicitly implemented.

## Current Runtime Truth

The current runtime truth is intentionally narrower than the future product vision.

Currently shipped or represented in runtime:

- deterministic/template-based session generation
- Quick Activity fast generation path
- Custom Build guided Session Builder path
- frontend-only deterministic Match-to-Match draft preview
- duration-based deterministic activity allocation
- deterministic SVG story diagrams
- browser-local coach workspace hints scoped by signed-in user/tenant context where applicable
- team-aware, equipment-aware, environment-aware, and coach-note-aware generation context
- guided session focus inputs
- saved session review/detail behavior

Not shipped as production runtime yet:

- RAG
- FAISS
- Bedrock production generation
- vector search
- public Training Brief API
- public Match-to-Match Prescription API
- persisted prescription objects
- full Training Prescription backend brain
- full editable diagram engine
- AI-generated raw diagram images
- multi-sport expansion

## Architecture And Deployment Posture

Current deployment posture:

- Amplify deploys the Club Vivo frontend.
- API Gateway + Lambda hosts the backend generation and data APIs.
- The `/session-packs` backend is the deterministic generation brain for Session Builder and Quick Activity.
- Backend generation-quality changes require backend deployment.
- Frontend-only UI/copy/doc changes generally require Amplify deployment.
- Slices touching both frontend and backend need both deployment paths.
- Club Vivo API Lambdas are on Node.js 22 after the focused runtime update.

Current generation posture:

- deterministic/template-based
- tested through backend session-builder tests
- intentionally not described as RAG, FAISS, Bedrock production generation, or vector search

Current diagram posture:

- deterministic SVG/React/CSS story views
- useful coaching-board aids
- not a complete activity-specific tactical diagram system yet
- future AI diagram work should output structured diagram data for a deterministic renderer, not raw generated images

## Non-Negotiable Guardrails

The following guardrails remained consistent across the New SIC phases:

- Tenancy must fail closed.
- Tenant context must be server-derived.
- Client-supplied tenant scope must never be trusted.
- Auth and role-routing changes must not weaken backend authorization.
- Public start choices are product intent only, not authorization.
- KSC is a pilot/example workspace, not the product identity.
- Club Portal remains a shell unless backend role/membership work is intentionally expanded.
- Deterministic generation must not be described as RAG, FAISS, Bedrock production generation, or vector search.
- Future Training Prescription work must not introduce a separate app, backend service, auth path, or tenancy path without an explicit architecture decision.
- Match-to-Match Prescription remains draft preview behavior until backend architecture, validation, observability, and persistence are intentionally designed.

## Process Principles Established

The New SIC process established several working principles:

- Keep `main` readable and current.
- Preserve historical detail outside `main` when it no longer serves current product understanding.
- Treat closeout summaries as chronological handoffs, not long-lived product roadmap sources.
- Use current repo docs and shipped code as the highest-confidence source of truth.
- Make product decisions explicit before implementing larger runtime changes.
- Prefer narrow slices with validation over broad platform jumps.
- Do not overclaim future intelligence features as shipped runtime.
- Keep product value ahead of platform expansion.
- Use deterministic generation improvements as a safe bridge while the future AI/RAG architecture remains unbuilt.

## Current Baseline Statement

New SIC now has a cleaner repo, clearer product identity, stronger deterministic generation, better coach-facing Session Builder output, more useful diagram storytelling, and a more professional Session Builder product model.

The current baseline is:

```text
Club Vivo is a soccer-only coach-facing product inside SIC.
Session Builder is the active runtime wedge.
Custom Build is the everyday coach-led builder.
Match-to-Match Prescription is the advanced evidence-led draft path.
The current brain is deterministic/template-based.
Future Training Prescription intelligence still needs dedicated backend architecture.
```
