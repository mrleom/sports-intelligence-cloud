# SIC / Club Vivo Execution Protocol

## Purpose

This document defines how Sports Intelligence Cloud (SIC) and Club Vivo work should be executed with speed, discipline, and professional engineering judgment.

SIC should be built like a serious product, not like a classroom exercise.

This protocol exists so VS Code, Codex, ChatGPT, GitHub, and the builder all work from the same operating model.

The goal is not to create more process. The goal is to create better product work with fewer mistakes.

---

## 1. Operating Standard

All SIC / Club Vivo work must be:

- repo-aware
- source-of-truth driven
- implementation-focused
- tenant-safe
- cost-aware
- testable
- honest about shipped behavior
- clear about proposed or parked behavior
- useful to the product, platform, or portfolio story

Do not create process for the sake of process.

Do not create documents that only say what might be done later.

A good work session produces one or more of the following:

- shipped code
- improved tests
- corrected source-of-truth docs
- updated implementation contracts
- validated architecture alignment
- a closeout summary that explains what changed and what is now true

---

## 2. Current Active Product Direction

SIC is the platform.

Club Vivo is the current coach-facing product.

The active product wedge is Session Builder.

The active agentic workflow direction is:

```text
Session Builder
-> Training Brief
-> Diagrams
-> Coach Feedback
-> Future intelligence loop
```

Match-to-Match Prescription is parked for later unless explicitly reactivated by a product or architecture decision.

Do not treat parked features as active runtime behavior.

Do not claim broad RAG, FAISS, vector search, autonomous agents, or Bedrock production generation unless the current code and deployment prove it.

The current agentic direction should be described as:

> bounded agentic coaching workflow

That means the system may reason through structured workflow steps, but each step must remain controlled, validated, tenant-safe, observable, and reviewable by the coach.

---

## 3. Work Sequence

Use this order for serious SIC / Club Vivo work:

1. Confirm the current repo state.
2. Read the relevant source-of-truth docs.
3. Inspect the current implementation before changing behavior.
4. Decide whether the task is documentation, implementation, architecture, or cleanup.
5. Create or continue a coherent working-session branch when making tracked repo changes.
6. Make the smallest useful change, but keep related changes together when they support the same session goal.
7. Commit logical checkpoints as needed.
8. Run validation.
9. Review the diff.
10. Push the working-session branch.
11. Open or update one pull request at the end of the working session or day.
12. Write a closeout only after the meaningful work is complete.

Do not start by inventing new docs.

Do not start by rewriting architecture.

Do not start by adding AI infrastructure before the product workflow is ready.

Do not create a new branch or pull request for every tiny document edit, small cleanup, or mini task.

---

## 4. VS Code Working Standard

VS Code is the local execution environment.

Use it to:

- inspect current code
- compare source-of-truth docs against implementation
- edit files
- run tests
- review diffs
- stage and commit changes
- keep the repo clean

Before starting tracked work:

```bash
git switch main
git pull origin main
git fetch --prune
git status --short
git log --oneline -8
```

Create a branch when starting a coherent working session or implementation slice that may become a pull request.

Do not create a new branch for every tiny document edit, small cleanup, or mini task.

Preferred flow:

```text
one working-session branch
-> multiple related edits
-> logical commits as needed
-> validation
-> one pull request at the end of the working session or day
```

A branch should represent a coherent unit of work, not every individual file change.

```bash
git switch -c <narrow-working-session-branch-name>
```

Branch names should describe the session or slice:

```text
club-vivo-agentic-source-alignment
session-builder-agentic-foundation
training-brief-session-builder-handoff
diagram-feedback-workflow-alignment
```

Avoid broad names:

```text
big-update
ai-work
platform-redesign
misc-fixes
```

If a branch already exists for the current coherent work session, continue using it instead of creating a new one.

If the current branch name no longer matches the work, either finish and merge it first or move the uncommitted changes to a better branch before continuing.

---

## 5. Commit Standard

Commits should be small enough to review but not so tiny that the history becomes noisy.

A good commit represents one logical checkpoint.

Good examples:

```text
docs(architecture): refresh execution protocol
docs(product): align Club Vivo agentic workflow source truth
feat(session-builder): add training brief handoff mapping
test(session-builder): cover training brief focus routing
```

Avoid commits that are too vague:

```text
update
fix stuff
more docs
changes
```

Multiple commits may live in one working-session branch when they support the same goal.

Do not force one pull request per commit.

---

## 6. Codex Usage Standard

Use Codex to accelerate work, not to outsource judgment.

Codex is useful for:

- repo search
- locating stale references
- comparing docs and implementation
- finding route handlers and domain logic
- drafting small code changes
- updating repeated language across docs
- writing or extending tests
- checking validation commands
- summarizing diffs

Do not use Codex blindly for:

- tenancy boundaries
- auth behavior
- entitlements behavior
- IAM or CDK changes
- data access rules
- public API contract changes
- durable persistence model changes
- broad architecture decisions
- claims about what is shipped

Those require human review and source-of-truth alignment.

Every Codex task should include:

- the exact goal
- the files or folders to inspect
- what must not change
- shipped-vs-proposed language requirements
- validation commands
- expected output

Codex should normally work inside the active working-session branch unless the task is pure inspection.

---

## 7. ChatGPT Usage Standard

Use ChatGPT for architecture thinking, product framing, planning, review, and writing assistance.

ChatGPT is useful for:

- turning messy goals into clear implementation slices
- creating Codex prompts
- checking whether docs and architecture are aligned
- reviewing closeout summaries
- preparing GitHub-ready language
- explaining AWS, SaaS, and agentic workflow decisions
- keeping the product story honest and portfolio-ready

ChatGPT should not be treated as the source of truth by itself.

When ChatGPT guidance conflicts with the current repo, prefer:

1. shipped source code
2. architecture principles
3. platform constitution
4. current source-of-truth docs
5. API contracts
6. recent merged pull requests
7. historical closeouts

When using ChatGPT, provide:

- the current branch
- relevant closeout summaries
- current repo paths
- recent PRs
- what is shipped
- what is proposed
- what is parked

---

## 8. Documentation Standard

Documentation must explain one of these things:

### Current truth

What exists now, what it does, where it lives, and how it behaves.

Examples:

- Session Builder current runtime behavior
- Feedback API contract
- Diagram rendering behavior
- Source map
- Platform architecture overview

### Implementation contract

How a route, object, validation rule, or cross-layer behavior works.

Examples:

- request shape
- response shape
- tenant rules
- error semantics
- validation rules
- persistence behavior

### Completed work

What changed, what passed validation, and what is now true.

Examples:

- closeout summary
- PR summary
- implementation notes after merge

### Parked or future scope

Future ideas are allowed only when clearly labeled as parked or future.

Future docs must not sound like shipped behavior.

Do not create documents that only say:

```text
We should do this later.
We need to think about this.
Maybe we can build this.
```

If the idea is not ready for implementation, place it in a clearly parked/future area or keep it out of tracked docs.

Prefer updating existing source-of-truth docs over creating parallel docs.

---

## 9. Source-of-Truth Discipline

Use current GitHub `main` and current repo docs as the source of truth.

Historical closeouts are useful evidence, but they do not override current source files.

When documents conflict, prefer:

1. shipped source code
2. `docs/architecture/architecture-principles.md`
3. `docs/architecture/platform-constitution.md`
4. `docs/vision.md`
5. `docs/architecture/tenant-claim-contract.md`
6. active product source-of-truth docs
7. API contracts
8. historical closeouts

When product direction changes, update the source-of-truth docs before implementing a new major slice.

When implementation changes, update docs only if the docs would otherwise become false or incomplete.

Do not rewrite historical closeouts to make the past look cleaner. Historical docs are evidence.

---

## 10. Agentic Workflow Discipline

Club Vivo may evolve toward bounded agentic workflows, but agentic behavior must be built through controlled product slices.

The preferred active chain is:

```text
coach input
-> Training Brief
-> Session Builder objective
-> activity/drill plan
-> diagram intent or DiagramSequence data
-> validation
-> coach review
-> save/export
-> feedback
-> future intelligence
```

The system must not skip coach review.

The system must not persist unvalidated output.

The system must not create a new tenancy path.

The system must not depend on raw generated images as authoritative diagram data.

AI may be added when it improves a real workflow step. AI should not be added just to make the product sound more advanced.

Good future AI uses:

- interpreting messy coach notes
- mapping intent into structured Training Brief fields
- suggesting better objectives
- recommending activity archetypes
- creating structured diagram instructions
- summarizing feedback trends
- supporting methodology-aware generation

Avoid for now:

- broad RAG before there is a real knowledge need
- vector infrastructure before curated knowledge exists
- autonomous agents without validation and review
- raw AI-generated diagrams as source of truth
- heavy ML infrastructure before product usage justifies it

---

## 11. Non-Negotiables

Never weaken:

- tenant isolation
- server-derived tenant context
- entitlements
- validation
- observability
- cost-awareness
- fail-closed behavior
- least-privilege access
- product value before platform expansion
- honest shipped-vs-proposed language

Never accept tenant identity from:

- request body
- query params
- client-controlled headers
- `tenant_id`
- `tenantId`
- `x-tenant-id`

Tiering can change capabilities, but never tenant isolation.

---

## 12. Implementation Slice Standard

Prefer thin vertical slices.

A good slice has:

- one clear product or operator outcome
- a coherent working-session branch
- minimal file changes for the stated goal
- tests or validation
- source-of-truth alignment
- no overstated runtime claims

Bad slices are broad and vague:

```text
make ai better
update platform
fix docs
improve everything
```

Good slices are specific:

```text
training-brief-validation
session-builder-training-brief-handoff
diagram-sequence-validator
session-feedback-summary-card
agentic-session-builder-source-alignment
```

Small related edits can be grouped into one branch and one pull request when they support the same outcome.

---

## 13. Validation Standard

Use validation that matches the changed area.

For frontend changes:

```bash
cd apps/club-vivo
npx.cmd tsc --noEmit --project tsconfig.json
```

For backend Session Builder changes:

```bash
cd services/club-vivo/api
node --import ./_testHelpers/silence-console.js --test src/domains/session-builder/session-pack-templates.test.js src/domains/session-builder/session-pack-validate.test.js src/domains/session-builder/session-builder-pipeline.test.js
```

For broader backend changes:

```bash
npm test --prefix services/club-vivo/api
```

For documentation-only changes:

```bash
git diff --check
```

For infrastructure changes:

```bash
cd infra/cdk
npm run build
npx cdk synth
npx cdk diff
```

Do not claim validation passed unless it was actually run.

If validation was not run, say so.

---

## 14. Pull Request Standard

Pull requests should normally be created at the end of a coherent working session or end of day, not after every tiny edit.

Small related changes may live together in one pull request when they support the same goal.

Good pull request scope:

- one source-of-truth alignment pass
- one product workflow slice
- one implementation slice with tests
- one documentation cleanup tied to a clear outcome
- one end-of-session branch containing logical commits for the same goal

Avoid pull requests for every small document edit unless the change is urgent, risky, or needs separate review.

A good pull request explains:

- what changed
- why it changed
- what is now true
- what is not claimed
- validation performed
- risk areas
- next slice if relevant

PR descriptions should avoid vague language.

Use this structure:

```md
## Summary

## What changed

## What is now true

## What is not claimed

## Validation

## Follow-up
```

---

## 15. Closeout Standard

A closeout summary should be written after meaningful work is complete.

A closeout should explain:

- branch
- theme
- what changed
- what was validated
- what is now true
- what remains parked
- next best slice

A closeout should not invent future scope.

A closeout should not claim implementation that did not ship.

A closeout should not replace source-of-truth docs.

If a closeout reveals that source-of-truth docs are stale, update the source-of-truth docs in a follow-up slice.

Do not write a closeout for every tiny edit.

A closeout should summarize a meaningful work session, completed slice, or merged pull request.

---

## 16. Definition Of Done

A task is done when:

- the change is narrow enough to review
- the diff is reviewed
- validation has been run or explicitly marked not run
- shipped behavior is not overstated
- docs match implementation when needed
- tenant and auth rules remain intact
- Git status is clean after commit or merge
- the next step is clear

For product-facing slices, the work is not done until the user-facing behavior can be explained clearly.

For architecture-facing slices, the work is not done until the source-of-truth docs are aligned.

For agentic workflow slices, the work is not done until validation, review, and tenant safety are preserved.

For working-session branches, the work is not done until the session branch has a clear end-of-session PR or an explicit reason to keep it open.
