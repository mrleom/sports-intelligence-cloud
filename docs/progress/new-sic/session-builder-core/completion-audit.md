# Session Builder Core Completion Audit

## 1. Status

- Documentation/audit only.
- No runtime changes.
- Match-to-Match is parked.
- Session Builder is the active product wedge.

## 2. Current Runtime Truth

- Custom Build is the main Session Builder path.
- Full Session exists for longer session planning.
- Drill / Activity exists for focused activity planning.
- Quick Activity exists as the fast lane from Home.
- Match-to-Match remains parked / frontend-only deterministic draft preview on `main`.
- Generation remains deterministic/template-based.
- There is no production AI, RAG, FAISS, Bedrock generation, or vector search for Session Builder output.
- There is no public Training Brief or prescription API.

## 3. Existing Strengths

- Exact duration allocation already has tests.
- Full-session structures exist for 45, 60, 90, and 120 minutes.
- Drill and Quick Activity modes exist.
- Equipment-specific setup is partly covered.
- Diagram/story standards exist.
- Save/review/export path exists.
- Team and equipment context hints exist.
- Image-assisted intake exists, but it is not the main generation brain.

## 4. Product Finish Line

Session Builder core complete means:

A coach can choose Custom Build, enter team/time/objective/context/environment/equipment, generate a useful soccer full session or drill/activity, understand it quickly, review diagrams, save it, and return to it later.

The finish line is not full Training Prescription automation, Match-to-Match backend intelligence, or AI/RAG generation. It is a trusted Session Builder workflow that helps a coach walk onto the field with something useful.

## 5. Core Completion Checklist

### Intake Clarity

- [ ] Custom Build is clearly framed as the everyday coach-led builder.
- [ ] Full Session and Drill / Activity labels are consistent across UI, docs, and saved output.
- [ ] Duration boundaries are clear before generation.
- [ ] Objective, specific focus, and coaching note / activity idea have distinct meaning.
- [ ] Team context is visible where it helps the coach trust the output.
- [ ] Match-to-Match visibility does not distract from the current Custom Build focus.

### Full Session Output Quality

- [ ] Full sessions feel coach-ready at 45, 60, 90, and 120 minutes.
- [ ] Activity 1 introduces the theme with a game-like activation.
- [ ] Activity 2 is a strong main activity.
- [ ] Activity 3 is distinct from Activity 2 and adds progression, transition, pressure, or a second decision.
- [ ] The final block closes with competition or game realism.
- [ ] Titles, setup, rules, coaching cues, watch points, progressions, and regressions are specific enough for a coach to run.

### Drill / Activity Output Quality

- [ ] Drill / Activity creates one focused 15-25 minute activity.
- [ ] The activity is game-like when possible.
- [ ] It includes setup, start cue, rules/scoring, coach cues, watch points, progression, regression, and safety/space adjustment.
- [ ] It does not feel like a thin slice of a full session.
- [ ] It handles messy coach notes without losing the main objective.

### Diagram Quality

- [ ] Diagrams are visible where expected.
- [ ] Activity 1, 2, and 3 visuals support the coaching story.
- [ ] Activity 3 does not visually repeat Activity 2.
- [ ] Symbols, arrows, ball start, gates, and labels are readable.
- [ ] Final-game diagram treatment stays lightweight and useful.
- [ ] Diagram language remains deterministic and does not imply raw AI-generated images.

### Equipment/Environment Behavior

- [ ] Selected equipment appears directly in setup where possible.
- [ ] Missing goals or no-goal contexts adapt to gates, target lines, end zones, or other practical scoring rules.
- [ ] Environment labels map into useful space guidance.
- [ ] Equipment creation remains owned by the Equipment page.
- [ ] The generator avoids broad equipment alternatives when a direct setup is better.

### Save/Review/Export Continuity

- [ ] Save flow preserves origin and planning context.
- [ ] Saved-session detail clearly shows whether the output came from Full Session, Drill / Activity, or Quick Activity.
- [ ] Review page feels like a coach-ready field handout.
- [ ] PDF/export action remains reachable and understandable.
- [ ] Feedback capture remains available after saved-session review.

### Spanish Readiness

- [ ] Decide whether Spanish starts as app-level i18n or a scoped copy pass.
- [ ] Identify coach-facing copy that must be translated first.
- [ ] Avoid changing backend contracts just for copy translation.
- [ ] Preserve soccer/football/futbol language choices for future bilingual support.

### AI Readiness Without Implementation

- [ ] Keep deterministic generation as the current brain.
- [ ] Identify where AI could later sit behind validation boundaries.
- [ ] Do not add RAG/vector/Bedrock generation until product quality and knowledge needs are clearer.
- [ ] Preserve structured diagram direction instead of raw generated images.

### Deployment/Domain Readiness

- [ ] Treat deployment/domain polish as downstream of core product quality and Spanish readiness.
- [ ] Keep Amplify as the frontend hosting direction.
- [ ] Keep API Gateway + Lambda as the backend generation/data API direction.
- [ ] Do not deploy unused parked resources just to make the platform look complete.

## 6. Gaps To Inspect Before Coding

- Does the UI label still say Drill while docs say Drill / Activity?
- Does `quick_drill` naming still appear internally while product says Drill / Activity?
- Are duration limits visually clear for full session vs drill/activity?
- Does generated output feel coach-ready across several prompts?
- Are activity titles, setups, rules, cues, progressions, regressions, and watch points strong enough?
- Are diagrams always visible and useful?
- Does save flow preserve origin/context?
- Does export/review feel like a coach-ready field handout?
- Is Spanish translation planned as app-level i18n or simple copy pass first?
- Is AI integration blocked on product quality or can it be prepared behind a boundary?
- Does Match-to-Match visibility distract from the parked product focus?

## 7. Recommended Implementation Slices

### 1. `session-builder-copy-and-mode-polish`

Scope:

- align UI labels around Full Session and Drill / Activity
- clarify duration helper copy
- clarify Custom Build as the active path
- reduce Match-to-Match distraction without changing runtime behavior

Non-goals:

- no backend behavior change
- no generation logic change
- no auth, tenancy, or infrastructure change

### 2. `session-builder-output-quality-fixtures`

Scope:

- define a small set of representative coach prompts
- inspect generated full-session and drill/activity output
- identify template gaps around titles, setup, rules, cues, watch points, progressions, and regressions
- add or update focused backend tests only if implementation follows

Non-goals:

- no AI/RAG implementation
- no Match-to-Match intelligence work
- no new public API

### 3. `session-builder-diagram-review-polish`

Scope:

- review current deterministic diagram presentation
- improve readability and coach usefulness where needed
- keep diagrams visible and lightweight
- preserve deterministic rendering semantics

Non-goals:

- no raw generated images
- no full DiagramSequence implementation unless separately scoped
- no new storage or infrastructure

### 4. `session-builder-save-export-review-polish`

Scope:

- review saved-session detail and PDF/export continuity
- confirm origin labels and planning context are preserved
- improve coach-ready field-handout presentation where needed

Non-goals:

- no persistence model redesign
- no new export service
- no auth/tenancy change

### 5. `session-builder-spanish-readiness-plan`

Scope:

- decide whether Spanish starts with app-level i18n or a scoped copy pass
- inventory coach-facing strings
- define first Spanish workflow coverage

Non-goals:

- no runtime translation implementation unless the slice is explicitly converted into implementation
- no backend contract changes
- no Match-to-Match Spanish expansion

### 6. `session-builder-ai-boundary-design`

Scope:

- document where future AI generation could sit after Session Builder quality is stronger
- define validation, observability, cost, and fallback boundaries
- decide what knowledge base would justify RAG later

Non-goals:

- no AI/RAG/Bedrock/vector implementation
- no model selection
- no public API expansion

### 7. `deployment-domain-readiness-check`

Scope:

- re-check Amplify/domain/Cognito/env-var readiness after product polish
- validate that deployment docs match the current active product
- prepare hosted smoke test expectations

Non-goals:

- no infrastructure expansion
- no parked resource deployment
- no README live URL update before validation

## 8. Guardrails

- No Match-to-Match runtime work in this phase.
- No public Training Brief API.
- No prescription API.
- No persistence changes unless explicitly scoped.
- No auth, tenancy, or infrastructure changes.
- No AI/RAG implementation yet.
- Preserve tenant-safe behavior.
- Keep Session Builder as one shared Club Vivo path.

## 9. Next Recommended Slice

Recommended first implementation slice:

```text
session-builder-copy-and-mode-polish
```

Scope:

- UI copy/mode naming only
- no backend behavior change
- no generation logic change
- no auth/tenancy/infra change
- no Match-to-Match runtime work

This is the right first slice because it reduces product confusion before deeper generation-quality work. It should make the current Session Builder surface easier to understand without changing the deterministic generation brain.
