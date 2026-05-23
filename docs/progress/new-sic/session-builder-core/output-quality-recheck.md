# Session Builder Output Quality Recheck

## 1. Status

- Documentation/evaluation only.
- No generation behavior changed in this branch.
- Rechecks the six fixtures after deterministic template improvements.

## 2. Recheck Method

The six fixtures from `output-quality-fixtures.md` were re-run on May 23, 2026 on branch
`session-builder-output-quality-recheck`.

Evaluation used local calls to the existing `processSessionPackRequest` pipeline. This exercises the
same request normalization, generation context resolution, deterministic pack generation, generated
pack validation, Coach Lite draft derivation, and Coach Lite validation used in the first
evaluation. No generated output was persisted, and no runtime, frontend, backend source, test,
package, infrastructure, AI/RAG, Match-to-Match, or generation source files were changed in this
branch.

Fixture 4 still cannot run exactly as written because `ageBand: mixed` is not accepted by request
validation. As in the first evaluation, an adapted observation run used `ageBand: u8` with mixed-age
OST context to inspect the current output behavior without changing validation.

## 3. Summary Improvement Findings

What improved:

- Theme-specific language is much stronger for attacking overloads, defending 1v1, first touch
  under pressure, possession under pressure, and finishing.
- Activity names are more purposeful in the strongest full-session cases, especially overloads,
  defending 1v1, possession under pressure, and Pugg-goal finishing.
- Activity 2 and Activity 3 are now more distinct for the 90-minute possession fixture.
- Drill/activity outputs no longer reference `Activity 1` or previous activities in the first-touch
  single-activity fixture.
- Pugg goals are used directly with finishing-specific shooting, rebound, pressure, and rotation
  language.
- No-goal adaptation remains strong through cone-gate scoring.

What remained partial:

- The five runnable fixtures are now much closer to coach-ready text, but still score as partial
  overall because generated packs and Coach Lite drafts do not include structured diagram specs.
- Coach Lite draft output still validates, but remains minimal for save/export review: it does not
  carry structured safety notes, success criteria, progressions, regressions, common mistakes, or
  diagrams.
- Some repeated language remains across activities within the same session, especially repeated
  cue/watch/progression/regression blocks.
- Fixture 4 still fails as written because mixed-age is not a supported raw request age band.

Based on this recheck, the next implementation should focus first on diagram review polish. The
template slice improved the core activity text enough that the widest repeated scoring gap is now
diagram usefulness, with save/export structure and mixed-age handling as clear follow-up candidates.

## 4. Fixture-by-Fixture Comparison

### Fixture 1: U10 Travel Full Session, Attacking Overloads

- previous result: Partial, 16/26
- new result: Partial, 23/26
- score movement: +7
- generated shape: `U10 Attacking Overloads Session`, 4 activities, 12 / 18 / 18 / 12 minutes,
  balls/cones/pinnies
- activity names observed: `Ball mastery arrival game`, `Wide Overload Decision Game`,
  `Overload To Free Player Game`, `Small-Sided Competitive Final Game`

Improvement notes: The session now repeatedly uses overload-specific coaching language: wide
channels, free player, pass or dribble decision, recovering defender, wide support, and attacking
open space. Activity 2 and Activity 3 now describe different overload problems instead of feeling
like a repeated generic game.

Remaining gap: Diagram specs are still absent, Coach Lite save/export structure is still minimal,
and some cue/watch/progression language repeats across every block.

### Fixture 2: U14 Full Session, Defending 1v1 In Limited Space

- previous result: Partial, 17/26
- new result: Partial, 22/26
- score movement: +5
- generated shape: `U14 Defending 1v1 Session`, 3 activities, 10 / 20 / 15 minutes, balls/cones
- activity names observed: `Warmup: reaction & acceleration`, `1v1 Angle And Delay Gates`,
  `7v7 Competitive Final Game`

Improvement notes: The output now includes defender-specific detail: side-on approach, curved run,
delay, recovery line, body shape, forcing wide, and defender scoring for delaying or winning the
ball. It continues to avoid full-goal requirements and uses cone gates.

Remaining gap: The final game still carries some narrow-channel 1v1 wording, so it reads partly as
a repeated activity rule rather than a fully transformed competitive close. Diagram and export
structure gaps remain.

### Fixture 3: U12 Drill / Activity, First Touch Under Pressure

- previous result: Partial, 16/26
- new result: Partial, 23/26
- score movement: +7
- generated shape: `U12 First Touch Under Pressure Session`, 1 activity, 20 minutes,
  balls/cones/pinnies
- activity name observed: `3v3+2 transition game`

Improvement notes: The single activity no longer references `Activity 1` or previous activities.
The activity text includes a receiving box, pressure gates, scanning before the pass, first touch
away from pressure, quick rotations, defender pressure, progression, and regression.

Remaining gap: The activity name is still generic for the theme; the body is first-touch specific,
but the title does not say first touch. Diagram and save/export structure gaps remain.

### Fixture 4: OST Mixed-Age Quick Activity, Game-Like With Cones And Balls

- previous result: Fail as written, 0/26
- new result: Fail as written, 0/26
- score movement: 0
- exact fixture result: validation still rejects `ageBand: mixed`
- adapted observation shape: `U8 Game-like Dribbling And Reaction Session`, 1 activity, 20 minutes,
  balls/cones

Improvement notes: The adapted observation still produces a playful, safe, one-activity cone-gate
game with OST-style cues such as eyes up, find space, brave touch, and help a teammate.

Remaining gap: The actual fixture cannot generate until mixed-age handling is resolved before or
during validation. The adapted output also has one rough sentence ending around "gate score," which
shows some quick-activity wording still needs polish.

### Fixture 5: 90-Minute Full Session, Possession Under Pressure

- previous result: Partial, 18/26
- new result: Partial, 23/26
- score movement: +5
- generated shape: `U14 Possession Under Pressure Session`, 4 activities, 20 / 25 / 25 / 20
  minutes, balls/cones/pinnies/mini goals
- activity names observed: `Dynamic warmup + ball mastery`, `Rondo Under Pressure`,
  `Directional Possession To Targets`, `7v7 Competitive Final Game`

Improvement notes: Activity 2 and Activity 3 are now meaningfully distinct. The session builds from
rondo pressure to directional possession with target zones and counter moments, then applies the
theme in the final game. Mini goals are preserved and used directly.

Remaining gap: Some cue/watch/progression text repeats between blocks. The generated pack still has
no diagram specs, and the Coach Lite draft still lacks richer export review structure.

### Fixture 6: Finishing With Pugg Goals

- previous result: Partial, 17/26
- new result: Partial, 23/26
- score movement: +6
- generated shape: `U12 Finishing Session`, 1 activity, 25 minutes, balls/cones/Pugg goals
- activity name observed: `1v1 to goal`

Improvement notes: The activity uses Pugg goals directly and now includes finishing-specific
details: short finishing lane, server, shooter, recovering defender, rebound cone, repeated shots,
first-time finishes, rebound follow-up, pressure timing, and clear shooter/server/defender
rotation.

Remaining gap: The activity body is strong, but the activity name could be more specific to Pugg
goal finishing. Diagram and save/export structure gaps remain.

## 5. Remaining Cross-Fixture Issues

- No generated diagram specs are present in the generated pack or Coach Lite draft.
- Mixed-age is still not accepted as a raw request age band.
- Coach Lite save/export draft still lacks structured safety notes, success criteria, progressions,
  regressions, common mistakes, and diagrams.
- Some theme-specific cue/watch/progression/regression blocks repeat across all activities in a
  session.
- Some activity names still lag behind the improved activity body text, especially first touch and
  Pugg-goal finishing.
- Quick-activity playful wording can still produce a rough sentence ending in adapted mixed-age OST
  scenarios.

## 6. Recommended Next Slice

Recommended next branch:

```text
session-builder-diagram-review-polish
```

Rationale: the template improvement slice moved five runnable fixtures close to coach-ready text,
while every runnable fixture still scores 0 for generated diagram usefulness. Diagram review polish
is now the clearest cross-fixture quality gap.

Follow-up candidates:

- `session-builder-save-export-review-polish`
- `session-builder-mixed-age-context-plan`

## 7. Guardrails

- no AI/RAG
- no Match-to-Match
- no public Training Brief API
- no backend route changes
- no persistence changes
- no infrastructure changes
