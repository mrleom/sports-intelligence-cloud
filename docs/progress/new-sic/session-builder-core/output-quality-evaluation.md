# Session Builder Output Quality Evaluation

## 1. Status

- Documentation/evaluation only.
- No generation behavior changed.
- Evaluates current deterministic Session Builder output using the fixture baseline.

## 2. Evaluation Method

The six fixtures from `output-quality-fixtures.md` were run on May 23, 2026 on branch
`session-builder-output-quality-evaluation`.

Evaluation used local calls to the existing `processSessionPackRequest` pipeline. This exercises
normalization, generation context resolution, deterministic pack generation, generated-pack
validation, Coach Lite draft derivation, and Coach Lite validation. No generated output was
persisted to app storage, and no runtime, frontend, backend, test, package, infrastructure, AI/RAG,
Match-to-Match, or generation source files were changed.

Two fixture-input notes:

- `programType` is not accepted as a raw Session Builder request field, so travel/OST context was
  passed through local `teamContext` options where needed.
- Fixture 4 cannot run exactly as written because `ageBand: mixed` is not currently supported by
  request validation. An adapted observation run used `ageBand: u8` with `teamContext.ageBand:
  Mixed age` and `teamContext.programType: ost`.

## 3. Summary Findings

Strongest areas:

- Duration allocation is reliable and exact across full-session and drill/activity modes.
- Drill and Quick Activity modes produce one activity with the requested duration.
- Selected equipment is preserved and generally appears directly in setup/scoring language.
- No-goal scenarios adapt to cone gates instead of requiring full goals.
- Full sessions produce the expected 45-, 60-, and 90-minute shapes.

Weakest areas:

- Activity text often repeats a generic setup/run/scoring/cue/watch/progress/regress block.
- Coaching cues and watch points are present, but too broad across different themes.
- Progressions and regressions exist, but are repeated and not deeply tied to the fixture.
- Coach Lite draft output validates, but has no structured progressions, regressions, common
  mistakes, safety notes, success criteria, or diagram specs.
- Fixture 4 exposes a product/input gap: mixed-age is a real coaching scenario, but not an accepted
  request age band.

Overall, the current output is partially coach-usable. It gives a coach a workable starting
structure, exact timing, and practical equipment constraints. It still needs template work before it
consistently feels like a high-quality field handout from a strong coach.

## 4. Fixture Results

### Fixture 1: U10 Travel Full Session, Attacking Overloads

Request summary: U10 soccer travel full session, 60 minutes, attacking overloads, wide overloads,
pass/dribble decision, finish with a game, balls/cones/pinnies.

Generated shape summary:

- session title: `U10 Attacking Overloads Session`
- number of activities: 4
- duration split: 12 / 18 / 18 / 12
- equipment used: balls, cones, pinnies
- diagram presence if observable: no generated diagram specs in pack or Coach Lite draft; frontend
  can infer placeholder diagrams from activity text

| Rubric item | Score |
| --- | --- |
| coach-ready title | 2 |
| clear setup | 2 |
| practical rules/scoring | 1 |
| useful coaching cues | 1 |
| clear watch points | 1 |
| progression | 1 |
| regression | 1 |
| equipment realism | 2 |
| age/program fit | 1 |
| game-like realism | 1 |
| activity distinctness | 1 |
| diagram usefulness | 0 |
| save/export readability | 1 |

Result: Partial.

Notes: The structure and travel style bias are solid. The first main activity names overloads, but
the second main activity is a generic conditioned final game rather than a clearly different
overload problem. U10 language is not especially complex, but it is not intentionally simple either.

Recommended improvement: Add attacking-overload-specific activity variants, cues, and watch points
for when to pass, dribble, support wide, and attack the free player.

### Fixture 2: U14 Full Session, Defending 1v1 In Limited Space

Request summary: U14 soccer full session, 45 minutes, defending 1v1, limited space, competitive,
focus on angle/delay/recovery, balls/cones.

Generated shape summary:

- session title: `U14 Defending 1v1 Session`
- number of activities: 3
- duration split: 10 / 20 / 15
- equipment used: balls, cones
- diagram presence if observable: no generated diagram specs in pack or Coach Lite draft; frontend
  can infer placeholder diagrams from activity text

| Rubric item | Score |
| --- | --- |
| coach-ready title | 2 |
| clear setup | 2 |
| practical rules/scoring | 2 |
| useful coaching cues | 1 |
| clear watch points | 1 |
| progression | 1 |
| regression | 1 |
| equipment realism | 2 |
| age/program fit | 1 |
| game-like realism | 1 |
| activity distinctness | 1 |
| diagram usefulness | 0 |
| save/export readability | 1 |

Result: Partial.

Notes: The output correctly avoids goal requirements and uses cone gates. The final block is
competitive. The main activity becomes a 3v3+2 transition game, which is game-like, but the specific
1v1 defending teaching points for body angle, delay distance, and recovery line are too generic.

Recommended improvement: Add a defending 1v1 archetype with clearer defender start positions,
attacker target, delay scoring, recovery scoring, and age-appropriate defensive cues.

### Fixture 3: U12 Drill / Activity, First Touch Under Pressure

Request summary: U12 soccer drill/activity, 20 minutes, first touch under pressure, one focused
game-like activity, quick rotations, scan before receiving, balls/cones/pinnies.

Generated shape summary:

- session title: `U12 First Touch Under Pressure Session`
- number of activities: 1
- duration split: 20
- equipment used: balls, cones, pinnies
- diagram presence if observable: no generated diagram specs in pack or Coach Lite draft; frontend
  can infer placeholder diagrams from activity text

| Rubric item | Score |
| --- | --- |
| coach-ready title | 1 |
| clear setup | 2 |
| practical rules/scoring | 2 |
| useful coaching cues | 1 |
| clear watch points | 1 |
| progression | 1 |
| regression | 1 |
| equipment realism | 2 |
| age/program fit | 1 |
| game-like realism | 1 |
| activity distinctness | 2 |
| diagram usefulness | 0 |
| save/export readability | 1 |

Result: Partial.

Notes: The output correctly creates one 20-minute activity and includes scanning language. It still
reads like a generic transition game adapted to the prompt, not a purpose-built first-touch activity.
The line "increase the pressure from Activity 1" leaks full-session language into a single drill.

Recommended improvement: Improve drill/activity templates so one-activity outputs do not reference
previous activities and include more precise receiving, scanning, pressure, and rotation detail.

### Fixture 4: OST Mixed-Age Quick Activity, Game-Like With Cones And Balls

Request summary: mixed-age OST quick activity, 20 minutes, game-like dribbling and reaction, fun,
playful, safe, cones and balls only.

Generated shape summary:

- exact fixture result: did not generate; request validation rejected `ageBand: mixed`
- validation reason: unsupported age band
- adapted observation title: `U8 Game-like Dribbling And Reaction Session`
- adapted observation activity count: 1
- adapted observation duration split: 20
- adapted observation equipment used: balls, cones
- diagram presence if observable: no generated diagram specs in pack or Coach Lite draft; frontend
  can infer placeholder diagrams from activity text

| Rubric item | Score |
| --- | --- |
| coach-ready title | 0 |
| clear setup | 0 |
| practical rules/scoring | 0 |
| useful coaching cues | 0 |
| clear watch points | 0 |
| progression | 0 |
| regression | 0 |
| equipment realism | 0 |
| age/program fit | 0 |
| game-like realism | 0 |
| activity distinctness | 0 |
| diagram usefulness | 0 |
| save/export readability | 0 |

Result: Fail as written.

Notes: The fixture exposes a real gap: mixed-age OST is in product language, but the current request
validator supports only `u6`, `u8`, `u10`, `u12`, `u14`, `u16`, `u18`, and `adult`. The adapted
observation using `u8` plus mixed-age OST team context produced one playful, safe, cone-gate
activity, but it is not the same as accepting the fixture request.

Recommended improvement: Decide how mixed-age should enter Session Builder. If it remains a team
context concept rather than a request age band, the UI/docs should map mixed-age choices to a
supported age band plus mixed-age context before generation.

### Fixture 5: 90-Minute Full Session, Possession Under Pressure

Request summary: U14 soccer full session, 90 minutes, possession under pressure, build from rondo
to directional possession to final game, balls/cones/pinnies/mini goals.

Generated shape summary:

- session title: `U14 Possession Under Pressure Session`
- number of activities: 4
- duration split: 20 / 25 / 25 / 20
- equipment used: balls, cones, pinnies, mini goals
- diagram presence if observable: no generated diagram specs in pack or Coach Lite draft; frontend
  can infer placeholder diagrams from activity text

| Rubric item | Score |
| --- | --- |
| coach-ready title | 2 |
| clear setup | 2 |
| practical rules/scoring | 1 |
| useful coaching cues | 1 |
| clear watch points | 1 |
| progression | 1 |
| regression | 1 |
| equipment realism | 2 |
| age/program fit | 1 |
| game-like realism | 2 |
| activity distinctness | 2 |
| diagram usefulness | 0 |
| save/export readability | 1 |

Result: Partial.

Notes: The shape is strong, with rondo, passing pattern, and final game blocks. Activity 2 and 3
are distinct. The output uses mini goals directly. The main weakness is that the text repeats broad
generic cues and scoring rules, and the coach note asks for directional possession but Activity 3 is
still framed as a passing pattern rather than a directional possession game.

Recommended improvement: Add a possession-under-pressure progression that moves from rondo to a
directional possession game with clear target zones, pressing triggers, support angles, and final
game constraints.

### Fixture 6: Finishing With Pugg Goals

Request summary: U12 soccer drill/activity, 25 minutes, finishing, use Pugg goals, lots of
repetitions, competitive scoring, balls/cones/Pugg goals.

Generated shape summary:

- session title: `U12 Finishing Session`
- number of activities: 1
- duration split: 25
- equipment used: balls, cones, pugg goals
- diagram presence if observable: no generated diagram specs in pack or Coach Lite draft; frontend
  can infer placeholder diagrams from activity text

| Rubric item | Score |
| --- | --- |
| coach-ready title | 2 |
| clear setup | 2 |
| practical rules/scoring | 2 |
| useful coaching cues | 1 |
| clear watch points | 1 |
| progression | 1 |
| regression | 1 |
| equipment realism | 2 |
| age/program fit | 1 |
| game-like realism | 1 |
| activity distinctness | 2 |
| diagram usefulness | 0 |
| save/export readability | 1 |

Result: Partial.

Notes: The output uses Pugg goals directly and avoids vague goal alternatives. The drill is one
activity with competitive scoring. The finishing action is not specific enough: cues mention
scanning, support angle, first touch, and transition more than shot selection, approach angle,
rebound, goalkeeper/no-goalkeeper reality, or rotation after shots.

Recommended improvement: Add finishing-specific drill language for Pugg goals, shot repetition,
pressure timing, rotation, rebounds, and competitive scoring ladders.

## 5. Cross-Fixture Issues

- Generic activity names still appear, especially `Conditioned final game`, `3v3+2 transition game`,
  and `7v7 Competitive Final Game`.
- Activity 2 and Activity 3 are sometimes distinct by name/shape, but not always distinct enough in
  coaching purpose.
- Setup wording is present and often practical, but includes broad filler such as "use the
  available space" and repeated equipment lists.
- Rules/scoring usually exist, but can be too generic for the specific theme.
- Coaching cues are present but frequently reused across unrelated topics.
- Watch points are present but broad, with limited theme-specific diagnostic detail.
- Progressions and regressions are present but repetitive.
- Drill/activity single-output quality is structurally correct, but some text still references
  full-session sequencing.
- Diagram placeholders are likely useful in the frontend, but generated pack and Coach Lite draft
  output do not contain fixture-specific diagram specs.
- Equipment usage is one of the strongest areas, especially no-goal adaptation and direct Pugg goal
  usage.
- Program/age language is too generic, and mixed-age is not accepted as a raw request age band.
- Save/export readability is acceptable through Coach Lite draft validation, but the draft lacks
  structured safety notes, success criteria, progressions, regressions, common mistakes, and
  diagrams.

## 6. Recommended Next Implementation Slice

Recommended next implementation slice:

```text
session-builder-output-quality-improvements
```

Likely scope:

- improve template wording
- improve activity distinctness
- improve drill/activity single-output quality
- improve equipment-aware setup language
- improve coaching cues/watch points/progression/regression specificity

Non-goals:

- no AI/RAG
- no Match-to-Match
- no public Training Brief API
- no persistence
- no infra/auth/tenancy changes

## 7. Guardrails

- deterministic generation remains current brain
- no AI/RAG implementation
- no Match-to-Match work
- no public Training Brief or prescription API
- no backend route changes
- no persistence changes
- no infrastructure changes
