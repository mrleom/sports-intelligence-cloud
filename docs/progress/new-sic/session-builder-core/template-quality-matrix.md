# Session Builder Template Quality Matrix

## 1. Status

- Documentation/evaluation only.
- No generation behavior changed.
- Branch/date: `session-builder-template-quality-matrix`, May 24, 2026.
- Current generator/output path reviewed: Session Builder UI focus taxonomy -> frontend generation action/API payload -> backend `/session-packs` deterministic generator -> saved-session display assumptions.

## 2. Method

Files inspected:

- `apps/club-vivo/components/coach/SessionBuilderTopBlock.tsx`
- `apps/club-vivo/components/coach/ObjectiveConstraintsInputs.tsx`
- `apps/club-vivo/app/(protected)/sessions/new/session-new-actions.ts`
- `apps/club-vivo/lib/session-builder-api.ts`
- `services/club-vivo/api/src/domains/session-builder/session-builder-pipeline.js`
- `services/club-vivo/api/src/domains/session-builder/session-pack-templates.js`
- `services/club-vivo/api/src/domains/session-builder/session-pack-templates.test.js`
- `docs/progress/new-sic/session-builder-core/output-quality-fixtures.md`
- `docs/progress/new-sic/session-builder-core/output-quality-evaluation.md`
- `docs/progress/new-sic/session-builder-core/output-quality-recheck.md`
- `docs/progress/new-sic/architect-process-log.md`

Outputs were inspected with local calls to the existing deterministic `generatePack` function. The
inspection used a U10 age-band group, full session, 60 minutes, grass field context, and
`Essentials / Builder choice` equipment. Coaching note was blank except for `Attacking / Create
chances`, where `attacking overloads` was used because the current high-quality path depends on
that realistic note signal.

Scoring rubric:

- `2` = strong / coach-ready
- `1` = acceptable but needs polish
- `0` = weak, generic, mismatched, or confusing

Scores consider activity story quality, age-band fit, setup clarity, progression/regression
usefulness, game-like feel, diagram compatibility, match between activity names/descriptions and
selected focus, genericness, and whether saved output would make sense to a coach.

## 3. Objective/Focus Inventory

Current user-facing primary objectives and specific focus options:

- Attacking: Create chances; Play forward; Combination play; Wide play; Finishing from cutbacks
- Defending: Pressure and cover; Delay and recover; Defend wide areas; Protect the box; Win the ball back
- Transition to attack: First pass after regain; Escape pressure after winning the ball; Counter attack quickly; Secure possession after regain; Play out from own box after regain
- Transition to defend: Counterpress after losing the ball; Recovery runs; Protect central space; Delay the counter attack
- Possession / build up: Build from the back; Support angles; Switch play; Play through pressure
- Finishing: Finish from cutbacks; Shoot early; Rebounds; Combinations to finish
- Pressing: Pressing triggers; Force play wide; Win the ball high; Press and cover balance
- 1v1 / small-sided duels: Beat the defender; Defend 1v1; Shield and escape; Small-sided decision-making
- Team shape: Compact defending; Attacking width; Support underneath; Balance around the ball
- Game understanding: Scan before receiving; Recognize pressure; Choose when to pass or dribble; Use space
- Physical / reaction / speed: Reaction speed; Acceleration; Change of direction; Recover quickly
- Custom: free text, not scored as a fixed objective/focus pair

## 4. Quality Matrix

| Primary objective | Specific focus | Score | What works | Main gap | Recommended next action |
| --- | ---: | ---: | --- | --- | --- |
| Attacking | Create chances | 2 | With an overload note, the output becomes `Overload Gates Activation -> Wide Overload Decision Game -> Overload Recovery Counter Game -> Overload Gate Battle Final Game`; setup, action story, scoring, and diagrams align well. | The high-quality path depends on an overload signal rather than the focus option alone. | Promote this into a first-class attacking/create-chances template path. |
| Attacking | Play forward | 1 | Creates a playable gates/channels session with exact timing and a competitive final game. | The story is broad attacking play, not clearly forward passing, line-breaking, or receiving beyond the next line. | Add a play-forward variant with target players, line breaks, and forward-pass scoring. |
| Attacking | Combination play | 1 | Usable small-sided/channels structure and general support-angle cues. | Activity names and descriptions do not create a real wall-pass, third-player, or overlap story. | Add combination-play activity variants and diagram states. |
| Attacking | Wide play | 1 | Wide play can fit the current gates/channels structure. | The output does not consistently use wide channels, switches, cutbacks, or weak-side support. | Add wide-play and crossing/cutback variants. |
| Attacking | Finishing from cutbacks | 0 | Produces a valid session shape. | With default generic equipment, it does not create a cutback-finishing story and can avoid goal specificity. | Move to a goal-aware finishing/cutback template with no-goal fallback rules. |
| Defending | Pressure and cover | 1 | Falls into the fut-soccer pressing/pressure-cover path, which is coherent and game-like. | Same activity sequence appears for all defending focuses; pressure-cover cues are broad. | Add defending pressure-cover template with first/second defender roles. |
| Defending | Delay and recover | 1 | Recover and pressure language is plausible, and final game is usable. | No clear delay line, recovery runner, or defender scoring logic. | Add delay/recover defender start positions and scoring. |
| Defending | Defend wide areas | 1 | Existing pressure-cover game can be adapted to wide defending. | No sideline trap, wide channel, crossing denial, or forcing-play-wide story. | Add wide-defending template and diagram lane variant. |
| Defending | Protect the box | 0 | Generates valid activities and timing. | Output is reduced-space pressing, not box protection, screening, blocking, or clearing danger. | Add protect-the-box template only when space/goal context supports it. |
| Defending | Win the ball back | 1 | Pressing-style activities are relevant and usable. | Lacks clear regain triggers, counterpress rules, and what happens after winning it. | Tie regain scoring and transition after win into pressing templates. |
| Transition to attack | First pass after regain | 1 | Uses transition/pressing tags and a game-like pressure-cover structure. | Does not isolate first pass quality, support after regain, or forward/outlet choices. | Add regain-to-first-pass transition template. |
| Transition to attack | Escape pressure after winning the ball | 1 | Pressure and escape language can fit the current reduced-space template. | Escape routes, outlets, and first three seconds after regain are not explicit enough. | Add escape-pressure transition rules and diagram arrows. |
| Transition to attack | Counter attack quickly | 1 | Competitive final game and transition tags are relevant. | Lacks fast counter lanes, time-to-goal scoring, and recovery defender realism. | Add counter-attack quick-strike activity variant. |
| Transition to attack | Secure possession after regain | 1 | Reduced-space possession/pressing activities are plausible. | The output does not clearly contrast secure possession vs immediate counter. | Add secure-regain template with reset, support, and keep-ball scoring. |
| Transition to attack | Play out from own box after regain | 0 | Produces a valid plan. | Same pressing sequence appears, but the own-box build-out scenario is missing. | Defer until build-out/box-zone diagram and field layout exist. |
| Transition to defend | Counterpress after losing the ball | 1 | Pressing template is directionally relevant and playable. | Counterpress triggers, time window, rest defense, and reaction after loss are too generic. | Add counterpress-specific scoring and transition moment. |
| Transition to defend | Recovery runs | 1 | Recovery language is plausible and activity shape is usable. | No recovery line, opponent breakaway, or goal-side recovery story. | Add recovery-run template with start positions and chase lanes. |
| Transition to defend | Protect central space | 0 | Valid timing and field plan. | Current sequence does not teach compact central protection or force-wide choices. | Add central-space/compactness defending template. |
| Transition to defend | Delay the counter attack | 1 | Pressing/defending final game can support delay concepts. | Delay scoring and recovery support are not distinct enough. | Extend delay/recover template into transition-to-defend. |
| Possession / build up | Build from the back | 1 | Passing/build-up-under-pressure path gives rondo and lane activities. | No goalkeeper/center back/fullback shape, thirds, or build-out decision picture. | Add build-from-back field layout and team-shape rules. |
| Possession / build up | Support angles | 1 | Rondo and support-angle cues are useful and age-appropriate. | Could be stronger with explicit triangle/diamond support and rotation constraints. | Add support-angle rondo variants and diagrams. |
| Possession / build up | Switch play | 0 | Passing sequence validates and is coach-usable at a generic level. | No switch, weak-side target, central transfer, or wide receiving picture. | Add switch-play template and diagram with opposite-side target. |
| Possession / build up | Play through pressure | 1 | Reduced-space rondo/build-up path is relevant. | The special `possession under pressure` language is not reliably triggered by this focus text alone. | Map this focus to the possession-under-pressure template. |
| Finishing | Finish from cutbacks | 1 | Finishing-specific descriptions mention server, shooter, recovering defender, rebound cone, and pressure. | Activity name says `Pugg Goal Finishing Waves` even with default no-goal equipment, and cutback geometry is missing. | Add cutback-specific finishing with equipment-aware naming. |
| Finishing | Shoot early | 1 | Finishing body text gives repetitions and pressure timing. | Same duplicated finishing activity appears for multiple finishing focuses; early-shot decision is not explicit. | Add early-shot scoring and defender-pressure clock. |
| Finishing | Rebounds | 1 | Rebound cone and follow-up language appear in descriptions. | Activity names and progression are still generic/duplicated. | Add rebound ladder and rotation-specific finishing variant. |
| Finishing | Combinations to finish | 1 | Competitive finishing setup is usable. | No wall pass, overlap, set-back, or third-player combination to finish. | Add combination-to-finish template and diagram panel. |
| Pressing | Pressing triggers | 1 | Fut-soccer pressing sequence is relevant and playable. | Trigger specificity is light; same output appears across all pressing focuses. | Add trigger menu: bad touch, back pass, sideline trap, square pass. |
| Pressing | Force play wide | 1 | Pressure-cover game can support forcing wide. | No touchline trap or body-shape cue sequence is explicit enough. | Add force-wide pressing variant with sideline diagram. |
| Pressing | Win the ball high | 1 | High-press theme fits the pressing template. | Field location and high-regain scoring are not clear. | Add high-press zone and six-second finish/counter scoring. |
| Pressing | Press and cover balance | 1 | `2v2+1 pressure-cover rotations` is a good starting activity. | Needs clearer first defender, cover defender, and balance-around-ball diagnostics. | Expand pressure-cover roles and watch points. |
| 1v1 / small-sided duels | Beat the defender | 1 | Valid gates/channels session and small-sided final game. | No attacker start, defender angle, move choice, or 1v1 scoring detail. | Add attacking 1v1 template with gates and defender recovery line. |
| 1v1 / small-sided duels | Defend 1v1 | 0 | Produces valid timing and a generic 1v1 channels title. | The current special defending-1v1 language is not triggered by this focus text; output is too generic. | Map `Defend 1v1` directly to the defending-1v1 archetype. |
| 1v1 / small-sided duels | Shield and escape | 0 | Valid session shape. | No shielding body position, pressure direction, escape gate, or protection cue. | Add shield/escape activity and diagram language. |
| 1v1 / small-sided duels | Small-sided decision-making | 1 | Small-sided final game and general decision cues fit the theme. | Too broad; does not name a concrete decision problem. | Add decision-game variants keyed by numbers and constraints. |
| Team shape | Compact defending | 1 | Passing/build-up path still yields usable field organization. | It is not actually compact defending, block distances, or deny-central-space work. | Route compact defending to defending/team-shape template. |
| Team shape | Attacking width | 1 | Some channel/gate language can support width. | Current output follows build-up-under-pressure, not width/stretching/weak-side support. | Add attacking-width team-shape variant. |
| Team shape | Support underneath | 1 | Passing and support-angle cues are relevant. | Needs explicit underneath support, bounce pass, and rest-support positions. | Add support-underneath template and diagram. |
| Team shape | Balance around the ball | 0 | Valid generic session. | No clear rest defense, cover, support, or balance picture. | Defer to team-shape foundation template with role language. |
| Game understanding | Scan before receiving | 1 | General scanning cue appears in descriptions. | It does not trigger the stronger first-touch/receiving-box path. | Map scanning before receiving to first-touch/receiving template. |
| Game understanding | Recognize pressure | 1 | Pressure language appears in broad setup/cue text. | No decision tree for pressure/no pressure. | Add pressure-recognition decision game. |
| Game understanding | Choose when to pass or dribble | 1 | The general game-like structure can host pass/dribble choices. | Activity does not explicitly reward pass-vs-dribble decisions. | Add decision-scoring rules and diagram branches. |
| Game understanding | Use space | 0 | Valid session shape. | Too generic; no specific spatial problem, target, or constraint. | Add space-use variants or require a more specific focus. |
| Physical / reaction / speed | Reaction speed | 0 | Produces a valid session. | Generic soccer channels, not reaction-speed training with ball-linked triggers. | Add physical/reaction template with soccer-first triggers. |
| Physical / reaction / speed | Acceleration | 0 | Valid timing and final game. | Does not train acceleration mechanics or game-relevant first steps. | Add acceleration activity only if it stays ball/game connected. |
| Physical / reaction / speed | Change of direction | 0 | Valid session structure. | No COD gates, defender cues, braking/turning, or safety coaching. | Add change-of-direction ball activity variant. |
| Physical / reaction / speed | Recover quickly | 0 | Valid plan. | No recovery run or transition chase story; generic physical template. | Route to recovery-run transition/defending template. |

## 5. Cross-Cutting Findings

- Strongest current path: `Attacking / Create chances` when the prompt or coach note includes an
  overload signal. It is now a noticeably higher-quality path than the rest of the matrix because
  names, setup, action story, final game, and diagram expectations line up.
- Solid template families exist for pressing, possession/build-up-under-pressure, and finishing,
  but they are reused too broadly. Many different focus options collapse into the same activity
  sequence.
- Generic fallback paths remain common for game understanding, physical/reaction/speed, 1v1 duels,
  and several attacking/team-shape options.
- Some focus labels do not route to the special deterministic language that already exists. The
  clearest examples are `Defend 1v1`, `Play through pressure`, and `Scan before receiving`.
- Finishing output body text has improved, but equipment-aware naming is not clean enough. Default
  no-goal inputs can still produce `Pugg Goal Finishing Waves` wording.
- Age-band scaling is mostly timing-safe but not coaching-depth-specific. U10/U12 outputs validate
  and are usable, but the language is not consistently tuned for age, cognitive load, or field size.
- Final-game formats are generally playable but frequently generic. More focus-specific final games
  would make saved-session output feel less templated.
- Diagram compatibility is strongest where the activity story has one clear action. Generic
  fallback templates need more diagram variants before they will feel coach-ready.

## 6. Recommended Implementation Slices

### 1. `session-builder-template-foundation-cleanup`

Goal: Make focus routing explicit before adding many new templates.

Scope:

- Map UI focus labels to deterministic template/archetype keys.
- Fix known routing misses: `Defend 1v1`, `Play through pressure`, `Scan before receiving`,
  `Recover quickly`, and finishing no-goal naming.
- Keep generation deterministic.

Files likely touched:

- `apps/club-vivo/app/(protected)/sessions/new/session-new-actions.ts`
- `apps/club-vivo/lib/session-builder-api.ts`
- `services/club-vivo/api/src/domains/session-builder/session-pack-templates.js`
- Existing session-builder tests

Validation plan:

- TypeScript check for the app.
- Backend session-builder template/pipeline tests.
- Focused fixture checks for the rerouted focus labels.

Non-goals:

- No AI/RAG.
- No persistence.
- No new backend route.
- No Match-to-Match.

### 2. `session-builder-attacking-template-pack`

Goal: Promote attacking/create-chances quality to the rest of the attacking focus set.

Scope:

- Add deterministic variants for play forward, combination play, wide play, and cutback finishing.
- Add focus-specific final-game constraints.
- Align diagram stories with one clear action per panel.

Files likely touched:

- `services/club-vivo/api/src/domains/session-builder/session-pack-templates.js`
- `apps/club-vivo/components/coach/DiagramPlaceholder.tsx`
- Existing session-builder tests

Validation plan:

- Backend template tests for each attacking focus.
- Visual/manual saved-session review for generated activities and diagrams.
- `git diff --check`.

Non-goals:

- No AI/RAG.
- No Training Brief integration.
- No public Training Prescription API.

### 3. `session-builder-defending-transition-template-pack`

Goal: Improve defending and transition-to-defend output so it teaches concrete defensive moments.

Scope:

- Add pressure-cover, delay/recover, wide defending, protect-the-box, counterpress, recovery-run,
  and central-protection variants.
- Clarify defender roles, recovery lines, and scoring.
- Add diagram variants for defender pressure, cover, recovery, and compactness.

Files likely touched:

- `services/club-vivo/api/src/domains/session-builder/session-pack-templates.js`
- `apps/club-vivo/components/coach/DiagramPlaceholder.tsx`
- Existing session-builder tests

Validation plan:

- Backend template tests for defending/transition focus labels.
- Saved-session smoke review for title, focus, activity sequence, and diagrams.

Non-goals:

- No Match-to-Match prescription logic.
- No infrastructure.
- No persistence.

### 4. `session-builder-possession-team-shape-template-pack`

Goal: Separate possession/build-up and team-shape outputs instead of overusing the same build-up-under-pressure sequence.

Scope:

- Add build-from-back, support angles, switch play, attacking width, compact defending, support
  underneath, and balance-around-ball variants.
- Add clearer final-game constraints and field zones.

Files likely touched:

- `services/club-vivo/api/src/domains/session-builder/session-pack-templates.js`
- `apps/club-vivo/components/coach/DiagramPlaceholder.tsx`
- Existing session-builder tests

Validation plan:

- Backend template tests for possession and team-shape focus labels.
- Manual review with U10 and U14 age bands.

Non-goals:

- No AI/RAG.
- No new saved-session storage model.
- No DiagramSequence implementation.

### 5. `session-builder-age-band-and-diagram-variant-expansion`

Goal: Make output feel intentionally age-appropriate and diagram-ready across the matrix.

Scope:

- Add age-band scaling rules for space, numbers, constraints, and coaching language.
- Add diagram variants for 1v1, receiving, switching play, pressing, finishing, and reaction games.
- Keep deterministic SVG/React/CSS rendering.

Files likely touched:

- `services/club-vivo/api/src/domains/session-builder/session-pack-templates.js`
- `apps/club-vivo/components/coach/DiagramPlaceholder.tsx`
- `apps/club-vivo/components/coach/ActivityOutput.tsx`

Validation plan:

- Backend tests for age-band shape changes.
- Frontend TypeScript check.
- Manual visual review of representative saved sessions.

Non-goals:

- No full editable diagram engine.
- No generated raster diagrams.
- No AI/RAG.

## 7. AI Readiness Notes

Before AI/RAG, these pieces should remain deterministic and well-defined:

- objective/focus taxonomy and routing keys
- age-band rules for space, numbers, pressure, and language
- diagram symbol language and diagram panel types
- generated-pack and saved-session output contracts
- coach feedback capture loop and evaluation rubric

AI can later help with:

- interpreting messy coach notes
- adapting constraints such as space, numbers, equipment, and player level
- choosing activity variations from a deterministic library
- generating sharper coaching cues and watch points
- improving progressions/regressions for a known template
- learning from coach feedback after field tests

The safer direction is AI-assisted selection/adaptation over AI-owned raw session generation until
the deterministic taxonomy, diagrams, and output contracts are stable.

## 8. Guardrails

- no AI/RAG in this slice
- no Match-to-Match
- no public Training Brief API
- no backend route changes
- no persistence changes
- no infrastructure changes
