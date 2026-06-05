# Club Vivo / SIC Chapter 2 Cleanup Closeout Summary

**Date:** 2026-06-03
**Repo:** `mrleom/sports-intelligence-cloud`
**Current strategy:** Keep the same GitHub repo and Amplify connection, but make `main` feel like a clean Club Vivo product showroom powered by the SIC platform.

---

## 1. Session Theme

Today’s work focused on moving from a broad, overloaded SIC repository toward a cleaner **Club Vivo Chapter 2** working experience.

The main decision was:

> Do not create a new GitHub repo.
> Do not move Club Vivo into a top-level `Club-Vivo/` folder.
> Keep the existing `mrleom/sports-intelligence-cloud` repo and Amplify connection.
> Make `main` the clean Club Vivo product showroom, while preserving Chapter 1 and old SIC work through archive branches, tags, and Git history.

We also created a focused VS Code workspace so daily work feels like Club Vivo instead of a giant historical SIC storage room.

---

## 2. Major Decisions Made

### 2.1 Keep the current GitHub repo

We decided that creating a new GitHub repo would create unnecessary risk because Amplify is already connected to the current repository.

Current direction:

```text
mrleom/sports-intelligence-cloud
= GitHub home for Club Vivo, powered by SIC
```

### 2.2 Do not create a top-level `Club-Vivo/` folder

We discussed putting all active files inside a new `Club-Vivo/` folder inside the existing repo.

We decided against it because GitHub would still show all the old folders, and the extra nesting could confuse:

- Amplify assumptions
- import paths
- scripts
- documentation links
- GitHub readers
- future cleanup work

The better goal is:

```text
Make the repo root itself feel like Club Vivo.
```

### 2.3 Use a VS Code workspace for daily focus

We created a focused multi-root VS Code workspace:

```text
club-vivo.code-workspace
```

Purpose:

- keep the current repo structure safe
- avoid moving/deleting files
- avoid breaking Amplify
- make VS Code feel focused on Club Vivo
- hide noisy historical, generated, and parked folders from day-to-day view

The workspace now gives focused sections such as:

```text
Repo Root
Club Vivo App
Club Vivo API
Auth Services
CDK Infra
Product Docs
Chapter 2 Architecture
API Contracts
Proposals
Runbooks
```

---

## 3. What Was Completed Today

### 3.1 GitHub public face and cleanup foundation

We started today after several major Chapter 2 cleanup milestones had already been completed:

- Chapter 2 public face cleanup
- Club Vivo README positioning
- architecture PNG added to README
- Quick Soccer Game UI/product copy alignment
- repo cleanup inventory
- progress/history classification
- local artifact audit
- local cleanup runbook
- architecture diagram docs classification
- vision doc classification
- foundations docs classification
- ADR docs classification
- export docs classification
- repo cleanup closeout
- Club Vivo product docs map
- future product docs classification

These changes helped establish:

```text
Club Vivo = product face
SIC = AWS SaaS platform foundation
Session Builder = main product wedge
Quick Soccer Game = fast creative lane
Chapter 1 = preserved history/evidence
```

### 3.2 Created a focused VS Code workspace

We created and pushed:

```text
club-vivo.code-workspace
```

Latest known commit:

```text
c3f9230 chore(vscode): add focused Club Vivo workspace
```

The workspace was created as a **safe local working experience improvement**, not a repo restructure.

It does not:

- move files
- delete files
- rename files
- change app code
- change backend code
- change infra/CDK
- change auth
- change tenancy
- change IAM
- change entitlements
- change DynamoDB keys
- change routes
- change Lambdas
- change public API contracts
- change Amplify assumptions

### 3.3 Confirmed the next real cleanup phase

We agreed that the cleanup should now move from:

```text
Phase 1: classify and protect
```

to:

```text
Phase 2: showroom prune
```

Meaning: stop adding many new explanatory files and start reducing duplication, merging overlapping docs, and removing clutter from active `main` when it is already preserved in archive/history.

---

## 4. Current Repo Direction

The repo should tell a short, clear story:

```text
Club Vivo
A simple coaching SaaS for nonprofit and grassroots soccer organizations.

1. Coaches need better session planning without expensive software.
2. Club Vivo helps them create, save, review, and export sessions.
3. Session Builder is the main product.
4. Quick Soccer Game is the fast creative lane.
5. SIC powers the product with tenant-safe AWS serverless architecture.
6. The repo proves product thinking, cloud architecture, and working implementation.
```

The repo should not feel like:

```text
A long archive of every idea, future feature, old name, draft, closeout, and cleanup note.
```

---

## 5. What Should Stay Visible on `main`

The active `main` branch should eventually feel closer to this:

```text
README.md

apps/
  club-vivo/

services/
  club-vivo/
  auth/

infra/
  cdk/

docs/
  README.md
  product/
    club-vivo/
      README.md
      chapter-2-product-constitution.md
      session-builder.md
      quick-soccer-game.md
  architecture/
    README.md
    platform-constitution.md
    architecture-principles.md
    tenant-claim-contract.md
    chapter-2/
      club-vivo-saas-architecture.png
      club-vivo-saas-architecture.drawio
      club-vivo-saas-architecture-mermaid.md
      lambda-naming-inventory.md
  api/
  proposals/
    final sendable docs only
  runbooks/
    useful operational runbooks only
```

The exact file list still needs review. This is the intended direction, not a completed prune.

---

## 6. What Should Be Questioned During the Showroom Prune

The following areas may be too noisy for the active GitHub product story and should be reviewed carefully:

```text
old progress logs
old cleanup closeouts
old New SIC planning files
legacy coach-lite docs
parked future docs
image-assisted intake docs
old diagram prompts
multiple proposal drafts that say similar things
local cleanup audit docs
cleanup inventory docs
old scientific/research drafts
old history-heavy planning files
```

These should not be deleted emotionally or quickly.

Each file or folder should be classified as:

```text
Keep on main
Merge into canonical doc
Mark superseded
Move/archive later
Remove from main because preserved in archive/history
Do not touch
```

---

## 7. What Must Not Be Removed Yet

To protect runtime, deployment, CI, and Amplify assumptions, do not remove these until proven unnecessary:

```text
apps/
services/
infra/
.github/
datasets/
postman/
scripts/
docs/api/
README.md
docs/README.md
package/config/build files
```

Also avoid changing:

```text
auth
tenancy
IAM
entitlements
DynamoDB keys
routes
Lambdas
public API contracts
CDK wiring
Amplify assumptions
```

---

## 8. Guardrails Preserved

The cleanup so far has preserved the important platform guardrails:

- Club Vivo is the product face.
- SIC remains the AWS SaaS platform foundation.
- Tenant safety language stays intact.
- Chapter 1 remains preserved as history/evidence.
- Old ideas are not claimed as shipped runtime.
- Future concepts stay parked unless source proves otherwise.
- No runtime behavior changed during the cleanup/documentation work.
- Amplify stays connected to the same repo.

Non-claims that must remain protected:

```text
Training Brief is not shipped public runtime.
DiagramSequence is not shipped runtime behavior.
RAG/vector search is not active runtime.
Autonomous agents are not shipped runtime.
Bedrock production generation is not shipped runtime.
Image analysis is out of the Chapter 2 product story.
Match-to-Match Prescription is future/parked unless implemented later.
Data lake / ETL / analytics pipeline should not be claimed without source proof.
```

---

## 9. What Needs To Happen Next To End the Cleanup

### Step 1: Create a Showroom Prune Audit

Create a single audit that reviews existing docs and folders for duplication, overlap, and public-story value.

Suggested file:

```text
docs/architecture/chapter-2/showroom-prune-audit.md
```

The audit should answer:

```text
What stays on main?
What gets merged into canonical docs?
What is superseded?
What can be removed from main because it is preserved in archive/history?
What must not be touched?
```

This audit should not move or delete files yet.

### Step 2: Decide Canonical Docs

Define the few documents that are allowed to be “the truth” for GitHub readers.

Likely canonical docs:

```text
README.md
docs/README.md
docs/product/club-vivo/README.md
docs/product/club-vivo/chapter-2-product-constitution.md
docs/product/club-vivo/session-builder.md
docs/product/club-vivo/quick-soccer-game.md
docs/architecture/platform-constitution.md
docs/architecture/architecture-principles.md
docs/architecture/tenant-claim-contract.md
docs/architecture/chapter-2/club-vivo-saas-architecture.png
docs/architecture/chapter-2/club-vivo-saas-architecture-mermaid.md
docs/api/
docs/runbooks/
```

### Step 3: Merge Repeated Information

Where two or more docs say the same thing, choose one canonical location and either:

```text
merge the useful content into the canonical doc
mark the older doc superseded
or remove the older doc from main if preserved in archive/history
```

### Step 4: Prune High-Noise Docs From `main`

After the audit, start with safe removals from `main` only.

Candidate groups:

```text
old cleanup planning docs
old progress closeouts
duplicated proposal drafts
intermediate diagram prompts
legacy coach-lite docs after useful content is migrated
parked future docs that distract from the current product story
```

Removal from `main` does not mean the work is lost. It remains in:

```text
archive/chapter-1-sic
chapter-1-sic-closeout tag
Git history
```

### Step 5: Make GitHub Feel Like a Product

After pruning, the GitHub repo should feel like:

```text
Product
Architecture
Run
Validate
Proposal
```

Not:

```text
History
Plans
Closeouts
Ideas
Old names
Future experiments
Multiple overlapping READMEs
```

### Step 6: Final Cleanup Closeout

When pruning is done, create one final closeout that says:

```text
What was removed from main
Where history is preserved
What remains active
How to read the repo now
What is safe to show a recruiter or coach
```

---

## 10. Recommended Next Session Opening

Start the next session with:

```text
We are continuing the Chapter 2 showroom prune.
The VS Code workspace is done.
Now we need to audit the repo for duplicate, overlapping, and noisy docs so main can become minimal and product-focused.
Do not create more folder maps unless necessary.
Help me decide what to keep, merge, mark superseded, or remove from main.
```

Then run:

```bash
git status --short
git log --oneline -10
```

Expected latest commit should include:

```text
c3f9230 chore(vscode): add focused Club Vivo workspace
```

---

## 11. Current Stopping Point

Current status at closeout:

```text
Branch: main
Latest work: focused Club Vivo VS Code workspace
GitHub repo: still mrleom/sports-intelligence-cloud
Amplify: should remain connected to same repo
Next phase: Showroom Prune
```

The project is now ready for the next cleanup phase:

> make `main` minimal, straight to the point, fun to understand, and recruiter/coach friendly.
