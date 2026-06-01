# Closeout Summary 12 — Club Vivo Coach Workspace + Session Builder Quality

**Date:** 2026-05-29 / 2026-05-30 session window
**Project:** Sport Intelligence Cloud — Club Vivo
**Primary product surface:** Coach Workspace
**Working goal:** simplify the active Coach Workspace product, improve generated session quality, and make the live Session Builder output feel coach-ready.

---

## 1. Executive summary

This session moved Club Vivo from a cluttered multi-lane prototype surface toward a cleaner, coach-first product.

The biggest product decision was that **Coach Workspace is the active product**. Club Workspace, Training Brief Draft, Match-to-Match Prescription, and image-assisted intake remain parked future ideas, not active frontend offers. The Home page became an orientation/about page for the Coach Workspace, while Session Builder became the main active creation path.

The biggest engineering/product-quality lesson was that **Amplify deploys the frontend only**. Backend Session Builder template changes inside `services/club-vivo/api` do not reach live `/session-packs` until `SicApiStack-Dev` is deployed with CDK. We confirmed this by checking the `sic-club-vivo-session-packs-dev` Lambda hash before and after CDK deploys.

The biggest coaching-quality improvement was the creation of a stronger deterministic session pattern for playground-game-inspired soccer activities, using the test prompt:

```text
Full Session
Team: test team 1
Objective: Attacking / Create chances
Coach note: game like activity similar to duck duck goose
```

By the end of the session, the generated output was much closer to a high-level coach-ready product:

1. **Trigger Touch Activation** — solid warm-up/activation and now the reference standard.
2. **Reaction Chase Escape Gates** — improved chase/trigger/escape activity with no confusing “server” language.
3. **Escape, Support, Score Progression** — improved main finisher/progression, with the final follow-up adding missing Safety / Space Adjustment, Progression, and Regression sections.
4. **Escape Gates Mini Tournament** — reworked competitive finish with a stronger tournament-style card.

---

## 2. Product decisions confirmed

### Coach Workspace is the active frontend product

- The landing page now presents **Coach Workspace** as the current offer.
- **Club Workspace** is parked for later and no longer shown as an active frontend offer.
- `/club` redirects to `/home`.
- Protected navigation focuses on:
  - Home
  - Session Builder
  - Methodology
  - Teams
  - Equipment
  - Sessions

### Home is an orientation/about page

The Home page no longer tries to be a dashboard. It now explains why Coach Workspace exists and what each page does.

Removed from Home:

- Quick Activity creation
- Recent Sessions list
- “Go to …” text inside cards

Added/kept:

- Clean Coach Workspace explanation
- Full-card clickable orientation boxes
- Small icons beside each card title
- Card titles:
  - Session Builder
  - Methodology
  - Teams
  - Equipment
  - Sessions

### Session Builder is the active creation surface

Session Builder now shows **Custom Build** directly.

Parked from active frontend:

- Training Brief Draft
- Match-to-Match Prescription
- image-assisted intake

Quick Activity is no longer a separate Home flow. The quick/focused activity idea lives inside Session Builder as the **Drill / Activity** mode and the coaching note/activity idea field.

---

## 3. PR timeline completed in this session

### PR #73 — `feat(session-builder): improve training brief handoff quality`

Improved deterministic generation from reviewed Training Brief handoff text.

Key improvements:

- Defensive transition after possession loss routes to compact recovery activities.
- Pressing gets trigger / pressure-cover / counter wording.
- Build-out under pressure gets support-angle and midfield-target language.
- Final-game constraints better match the objective.
- Coach notes stay visible in routed activity descriptions.
- Finishing without goals stays equipment-aware with cone-gate language.

Validation recorded:

- Backend session-builder test suite passed: 143 tests.
- `git diff --check` passed.

### PR #74 — `feat(sessions): improve saved session feedback capture`

Improved saved-session feedback UI and contract alignment.

Key improvements:

- Feedback panel now explains that one submission is saved per session.
- “Favorite activity” became a “Most useful activity” picker populated from saved activity names.
- Builder/quick saved sessions now submit `flowMode: "session_builder"`.
- Missing/confusing prompt now asks what should improve in the next generated plan.
- `docs/api/session-feedback-v1-contract.md` documents `favoriteActivity` as optional, trimmed, and capped at 280 characters.

Validation recorded:

- Club Vivo TypeScript check passed.
- `git diff --check` passed.

### PR #75 — `feat(coach-workspace): simplify active product surface`

Simplified the active frontend product around Coach Workspace.

Key improvements:

- Landing presents Coach Workspace as the active product.
- Home became orientation/about rather than quick-activity dashboard.
- Session Builder shows Custom Build directly.
- Training Brief, Match-to-Match, and image-assisted intake lanes are hidden from active UI.
- `/club` redirects to `/home`.
- Quick Activity route redirects into `/sessions/new` while preserving prompts as coaching notes.
- Generated coach text strips internal metadata leaks.
- Final-game diagram cards summarize setup/scoring/constraint instead of dumping paragraphs.
- Duck-duck-goose style prompts moved toward soccer “Reaction Chase Escape Gates” language.
- `docs/product/club-vivo/session-builder.md` updated as current source of truth.

Validation recorded:

- Club Vivo TypeScript check passed.
- Backend template tests passed.
- Backend pipeline tests passed.
- `git diff --check` passed.

### PR #76 — `feat(coach-workspace): polish visual product experience`

Polished the public/Coach Workspace visual experience.

Key improvements:

- Landing page now makes `CLUB VIVO` the main title.
- Removed “Welcome to Club Vivo” and “Current Product.”
- Added retro sport visual treatment with Tailwind/CSS only.
- Header label changed to `Coach Workspace`.
- Removed header subtitle.
- Home starts directly with `Coach Workspace`.
- Orientation cards became full-card links.
- Page header badges removed.
- Equipment title changed to `Equipment Essentials`.

Validation recorded:

- Club Vivo TypeScript check passed.
- `git diff --check` passed.

### PR #77 — `fix(coach-workspace): polish home cards and session diagrams`

Polished Home card language and initial diagram issues.

Key improvements:

- Removed visible “Go to …” text from Home orientation cards.
- Renamed Home card title from “Saved Sessions” to “Sessions.”
- Cleaned reaction-chase diagrams so field labels like `S`, `R`, `Box`, `Gate`, and `Scan first` no longer appear inside the diagram field.
- Adjusted final-game diagram inference so Activity 3 in a four-activity session gets visual progression support instead of being treated as the final game.
- Added source-of-truth note for a future playground-games-to-soccer-activities library.

Validation recorded:

- Club Vivo TypeScript check passed.
- `git diff --check` passed.

### PR #78 — `feat(session-builder): raise generated session quality standard`

Raised the deterministic generated-session quality standard.

Key improvements:

- Diagram SVG fields no longer render token text.
- Mini legends show actual symbol/action explanations.
- Added reaction-chase diagram kinds.
- Activity 2 and Activity 3 receive cleaner soccer visuals.
- Activity 3 gets support / second defender / counter-gate progression support.
- Strengthened duck-duck-goose prompt handling into soccer language.
- Activity 4 becomes `Escape Gates Mini Tournament` style.
- Added tests for literal wording avoidance, Activity 2/3/4 quality, metadata leak prevention, no diagram field text, and Activity 3 visual support.
- Updated docs with the no-words-inside-diagram-field rule and cultural-games-to-soccer translation guidance.

Validation recorded:

- Club Vivo TypeScript check passed.
- Backend template tests passed: 60/60.
- Backend pipeline tests passed: 38/38.
- `git diff --check` passed.

### Backend deploy lesson after PR #78

Manual live smoke showed frontend changes were visible but backend template behavior remained old. Investigation confirmed:

- Frontend calls: `POST ${CLUB_VIVO_API_URL}/session-packs`.
- Live dev API URL: `https://ekth4bq6ze.execute-api.us-east-1.amazonaws.com/`.
- `/session-packs` is owned by Lambda: `sic-club-vivo-session-packs-dev`.
- Lambda is deployed through CDK stack: `SicApiStack-Dev`.
- Amplify does **not** deploy backend Lambda code.

AWS profile correction:

- The intended IAM user `j-admin` exists under the local AWS CLI `default` profile.
- `AWS_PROFILE=j-admin` failed because no local profile named `j-admin` exists.
- Correct local profile for deploy work today: `AWS_PROFILE=default`.

Safe CDK env values:

```bash
export AWS_PROFILE=default
export AWS_DEFAULT_REGION=us-east-1
export SIC_USER_POOL_ID="us-east-1_WfcDqdxJh"
export SIC_USER_POOL_CLIENT_ID="4ssfq7va608hr9uolatbhsma7q"
```

Unsafe placeholder attempt caught before deploy:

```text
<dev-user-pool-id>
<dev-user-pool-client-id>
```

CDK diff initially showed an unsafe authorizer change when placeholders were used. After setting real values, the authorizer diff disappeared and only Lambda code asset changes remained.

Confirmed deploy state after first backend deploy:

```text
Old Lambda state:
LastModified: 2026-05-08T22:05:11.000+0000
CodeSha256: 4JI3b9dIrvqQN4n50DRgZzZWmVnDQqIvm+WcxZiHY3o=

New Lambda state:
LastModified: 2026-05-29T22:21:44.000+0000
CodeSha256: qn9gREtAn35WWk7OhSKkqUlFH6XzeQ0KGcN8yQEiGVw=
Runtime: nodejs22.x
```

### PR #79 — `feat(coach-workspace): add home card icons`

Added simple icons beside Home orientation card titles.

Key improvements:

- Session Builder, Methodology, Teams, Equipment, and Sessions cards gained simple visual icons.
- Whole-card clickable behavior preserved.
- No “Go to …” text reintroduced.

Validation recorded:

- Club Vivo TypeScript check passed.
- `git diff --check` passed.

### PR #80 — `feat(session-builder): improve coach-ready activity language`

Improved coach-facing activity language for playground-game-inspired generated sessions.

Key improvements:

- Activity 1 became a clearer activation with pairs, gates, role switching, and first-touch scoring.
- Activity 2 became the main starter with coach trigger, chase pressure, first touch away, escape gates, and defender counter.
- Activity 3 became the main finisher progression with support, second defender, clear ball start, and no confusing counter-gate language.
- Activity 4 became Escape Gates Mini Tournament with 4v4/5v5, timed/first-to-2 structure, winner/rematch rule, bonus scoring, and win condition.
- Relevant generated setup dimensions now use meters first with yards in parentheses.
- Removed confusing “caller” language.
- Simplified reaction/progression diagrams.
- Added tests for Activity 1/2 distinction, Activity 3 progression, Activity 4 competitive finish, meters-first dimensions, no confusing role language, no metadata leaks, and no field text.
- Updated coaching-session design standard with meters-first and cultural-game adaptation guidance.

Validation recorded:

- Backend template tests passed: 60/60.
- Backend pipeline tests passed: 38/38.
- Club Vivo TypeScript check passed.
- `git diff --check` passed.

### PR #81 — `feat(session-builder): polish final session output experience`

Polished the final visible generated-session experience.

Key improvements:

- At a Glance now includes:
  - Coach note / activity idea
  - Session story fallback
- Removed coach-facing `server` language from reaction-chase / duck-goose / generic generated output paths.
- Replaced old role language with:
  - coach starts the rep
  - coach rolls or passes the ball in
  - attacker
  - defender/chaser
  - support player
  - goalkeeper or coach where appropriate
- Tightened Activity 3 captions, ball/action story, and progression diagram readability.
- Reduced overlapping progression lines.
- Mini legends are now local to visible diagram content.
- Dotted carry lines and dashed movement/pressure lines are more visually distinct.
- Activity 4 became a more cohesive Escape Gates Mini Tournament finish with simple grid visual and tournament details.
- Frontend fallback fixture now uses meters first with yards in parentheses.
- Tests and docs updated for stricter visual, legend, and language standards.

Validation recorded:

- Backend template tests passed: 60/60.
- Backend pipeline tests passed: 41/41.
- Club Vivo TypeScript check passed.
- `git diff --check` passed.

Confirmed backend deploy state after PR #81 work:

```text
LastModified: 2026-05-30T00:02:22.000+0000
CodeSha256: irTb0TKUWh0TRKrBevg8p7QZLaOzrwCv6VOTpEJigt8=
Runtime: nodejs22.x
```

### PR #82 — `fix(session-builder): complete activity 3 support sections`

Completed Activity 3 coach support sections.

Key improvements:

- Activity 3 `Escape, Support, Score Progression` now includes:
  - Safety / space adjustment
  - Progression
  - Regression
- Earlier Activity 3 text was shortened so the missing sections fit under the existing description cap.
- Test coverage added to prove Activity 3 includes those support sections and their coaching intent.

Validation recorded:

- Backend template tests passed: 60/60.
- Backend pipeline tests passed: 41/41.
- `git diff --check` passed.

Current status:

- PR #82 is merged.
- Backend deploy for PR #82 still needs to be completed unless already done after this summary.

---

## 4. Current live smoke status

The live app was tested with:

```text
Full Session
Team: test team 1
Objective: Attacking / Create chances
Coach note: make it game like, similar to duck duck goose.
```

Observed after the final output polish deploy:

### At a Glance

Now shows useful information:

- Objective
- Coach note / activity idea
- Session story

Example session story:

```text
Introduce gates and first-touch scoring. Add chase pressure. Add support and a second decision. Finish with an escape-gates mini tournament.
```

### Activity 1 — Trigger Touch Activation

This is now the reference standard.

Strengths:

- Clear 15 x 15 meter grid (16 x 16 yards).
- Four cone gates or Pugg goals.
- Balls in the middle.
- Blue/red teams.
- Pair start.
- One attacker and one defender share one ball.
- Light pressure.
- Role switching after scoring.
- Coach-ready support sections.

Decision:

- Preserve Activity 1 as the standard example.

### Activity 2 — Reaction Chase Escape Gates

Improved and close to expected.

Strengths:

- No `server` wording.
- Coach starts the rep by rolling or passing the ball.
- Attacker takes first touch away from pressure.
- Defender/chaser pressures immediately.
- Defender can counter through an open gate.
- Mini legend is cleaner than before.

Remaining watchout:

- Continue checking that mini legends only show symbols actually visible in each diagram.

### Activity 3 — Escape, Support, Score Progression

Improved significantly.

Strengths:

- Clearer progression from Activity 2.
- Support player added.
- Second defender added.
- Ball starts with the attacker or coach beside attacker.
- No confusing counter-gate symbol.
- Local mini legend is cleaner.

Follow-up completed in PR #82:

- Activity 3 now includes missing Safety / Space Adjustment, Progression, and Regression in backend template.

Pending:

- CDK deploy needed so live Lambda reflects PR #82.

### Activity 4 — Escape Gates Mini Tournament

Improved and more lively.

Strengths:

- Competitive Close card.
- Simple grid visual.
- 4v4 or 5v5.
- Same 36 x 28 meter area (39 x 31 yards).
- Four cone gates or Pugg goals.
- 5-minute games or first team to two goals.
- Winner stays on / quick rematch.
- Bonus scoring.
- Winner rule.

Decision:

- Activity 4 is intentionally structured differently from Activities 1–3 because it is the competitive close.

---

## 5. Standards established today

### Session activity structure

For full sessions, the intended flow is:

1. **Activity 1:** activation / warm-up
2. **Activity 2:** main starter
3. **Activity 3:** main finisher / progression
4. **Activity 4:** competitive game / mini tournament / competitive close

### Diagram rules

- No words inside the visual field.
- No random labels such as `S`, `R`, `Box`, `Gate`, or `Scan first` inside diagrams.
- Use the mini legend to explain symbols and lines.
- Mini legends should be local to the diagram:
  - Only show symbols/actions actually visible.
  - Do not repeat unused gray-player entries.
  - Do not duplicate Activity Area entries.
- Dotted and dashed lines must be visually distinct.
- Avoid overlapping lines where possible.
- Avoid giving one player two incompatible actions in the same visual frame.
- Ball placement must make sense:
  - If the ball starts with a player, show it near that player.
  - If the coach starts the rep, make that clear in caption/text.
  - If the ball is loose/race ball, explain that clearly.

### Language rules

- Use soccer language, not generic playground labels.
- Avoid coach-facing `server` language.
- Prefer:
  - coach
  - coach starts the rep
  - coach rolls or passes the ball in
  - attacker
  - defender/chaser
  - support player
  - goalkeeper or coach when needed
- Avoid unclear `caller` language unless the role is explicitly explained.
- Keep instructions simple, fun, and coach-ready.
- Use meters first, yards in parentheses.

Example:

```text
15 x 15 meters (16 x 16 yards)
```

### Cultural games to soccer standard

Playground/cultural games can inspire soccer activities, but generated output should translate them into soccer behavior:

- scanning
- first touch
- pressure
- escape
- support
- counter
- scoring
- transition
- competition

The user wants a future library of examples such as:

- Duck Duck Goose → Reaction Chase Escape Gates
- Cat and Mouse → Shield / escape / chase
- Police and Robbers → Press / evade / counter
- Sharks and Minnows → Dribble through pressure
- King of the Ring → Shielding / scanning
- Numbers Game → Quick attack
- Rondo to Finish → Possession to chance creation

---

## 6. Operational deployment rule learned

Amplify deployment is not enough for backend generation changes.

Frontend changes:

```text
apps/club-vivo/**
```

Deploy through Amplify.

Backend generation changes:

```text
services/club-vivo/api/src/domains/session-builder/**
```

Deploy through CDK:

```bash
cd infra/cdk
export AWS_PROFILE=default
export AWS_DEFAULT_REGION=us-east-1
export SIC_USER_POOL_ID="us-east-1_WfcDqdxJh"
export SIC_USER_POOL_CLIENT_ID="4ssfq7va608hr9uolatbhsma7q"

npm run build
npx cdk diff SicApiStack-Dev
npx cdk deploy SicApiStack-Dev
```

Safe CDK diff expectation:

- Lambda code asset updates only.

Stop if diff shows unexpected changes to:

- Cognito authorizer values
- API replacement
- DynamoDB/table replacement
- IAM policy expansion not expected
- tenancy/auth infrastructure

Confirm Lambda after deploy:

```bash
aws lambda get-function-configuration \
  --function-name sic-club-vivo-session-packs-dev \
  --query "{LastModified:LastModified,CodeSha256:CodeSha256,Runtime:Runtime}" \
  --output table
```

---

## 7. Validation run across session

Repeated validations across branches included:

```bash
cd apps/club-vivo && npx.cmd tsc --noEmit --project tsconfig.json
```

```bash
cd services/club-vivo/api && npm.cmd test -- src/domains/session-builder/session-pack-templates.test.js
```

```bash
cd services/club-vivo/api && npm.cmd test -- src/domains/session-builder/session-builder-pipeline.test.js
```

```bash
git diff --check
```

Observed results:

- Frontend TypeScript checks passed on UI-changing branches.
- Backend template tests passed repeatedly, including 60/60.
- Backend pipeline tests increased to 41/41 after additional quality tests.
- `git diff --check` passed repeatedly.
- GitHub PR checks passed for merged PRs.

---

## 8. Current next steps

### Immediate local cleanup after PR #82

```bash
git switch main
git pull --ff-only origin main
git fetch --prune
git status --short
git log --oneline -8
```

Delete local branch if still present:

```bash
git branch -D club-vivo-activity3-section-completeness
git status --short
```

### Deploy PR #82 backend template change

Because PR #82 touched backend templates, deploy `SicApiStack-Dev` again.

```bash
cd services/club-vivo/api
npm.cmd test -- src/domains/session-builder/session-pack-templates.test.js
npm.cmd test -- src/domains/session-builder/session-builder-pipeline.test.js
cd ../../..
```

Then:

```bash
cd infra/cdk
export AWS_PROFILE=default
export AWS_DEFAULT_REGION=us-east-1
export SIC_USER_POOL_ID="us-east-1_WfcDqdxJh"
export SIC_USER_POOL_CLIENT_ID="4ssfq7va608hr9uolatbhsma7q"

npm run build
npx cdk diff SicApiStack-Dev
npx cdk deploy SicApiStack-Dev
```

Confirm Lambda hash changed:

```bash
aws lambda get-function-configuration \
  --function-name sic-club-vivo-session-packs-dev \
  --query "{LastModified:LastModified,CodeSha256:CodeSha256,Runtime:Runtime}" \
  --output table
```

### Final smoke test

Generate this exact case again:

```text
Full Session
Team: test team 1
Objective: Attacking / Create chances
Coach note: make it game like, similar to duck duck goose.
```

Expected:

- At a Glance includes coach note and session story.
- Activity 1 remains solid.
- Activity 2 has no `server` language and has clean mini legend.
- Activity 3 includes:
  - Safety / Space Adjustment
  - Progression
  - Regression
- Activity 3 visual remains readable.
- Activity 4 remains a cohesive Escape Gates Mini Tournament competitive close.

---

## 9. Recommended next product slice

The next best product slice should **not** be another large polish pass on the same generated output unless the final smoke after PR #82 reveals a serious problem.

Recommended next slice:

### Build the golden-template library plan

Create a source-of-truth design doc for a future **Playground Games → Soccer Activities** library.

Initial golden templates:

1. Reaction Chase Escape Gates
2. Cat and Mouse Shield/Escape
3. Police and Robbers Press/Evade/Counter
4. Sharks and Minnows Dribble Through Pressure
5. King of the Ring Shielding/Scanning
6. Numbers Game Quick Attack
7. Rondo to Finish

Each golden template should define:

- Purpose
- Age range
- Setup
- How to start
- How to run it
- Rules/scoring
- Coaching cues
- What to watch for
- Safety / Space Adjustment
- Progression
- Regression
- Diagram setup
- Diagram action
- Mini legend
- Competitive close

This gives the future AI/generator a clear standard for what “good” means without needing to introduce RAG, Bedrock, vector search, or autonomous agents yet.

---

## 10. Risks and watchouts

- Backend template changes require CDK deploy every time.
- Amplify can make frontend changes appear live while backend generated text remains stale.
- Diagram readability can regress if symbols/lines are added without tests.
- Mini legends can become noisy if they repeat global legend items.
- Coach-facing language must stay simple and soccer-specific.
- Activity 4 should remain a special competitive close card, not be forced into the same section pattern as Activity 1–3.
- Avoid reintroducing parked features into active frontend before the Coach Workspace core is stable.

---

## 11. End-of-session state

Merged PRs in this closeout window:

- #73 `feat(session-builder): improve training brief handoff quality`
- #74 `feat(sessions): improve saved session feedback capture`
- #75 `feat(coach-workspace): simplify active product surface`
- #76 `feat(coach-workspace): polish visual product experience`
- #77 `fix(coach-workspace): polish home cards and session diagrams`
- #78 `feat(session-builder): raise generated session quality standard`
- #79 `feat(coach-workspace): add home card icons`
- #80 `feat(session-builder): improve coach-ready activity language`
- #81 `feat(session-builder): polish final session output experience`
- #82 `fix(session-builder): complete activity 3 support sections`

Current required action before calling this fully live-complete:

- Pull merged `main` after PR #82.
- Delete local branch.
- Run backend tests.
- Run CDK diff/deploy for `SicApiStack-Dev`.
- Confirm `sic-club-vivo-session-packs-dev` Lambda hash changed.
- Run one final live Session Builder smoke.
