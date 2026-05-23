# Session Builder Output Quality Fixtures

## 1. Status

- Documentation-only fixture set.
- No runtime/generation changes.
- Purpose: create repeatable coach prompt scenarios before improving templates.

## 2. Why Fixtures Matter

Session Builder output quality needs a stable review baseline before generation logic changes. These
fixtures give coaches, product reviewers, and future implementation branches the same prompt
scenarios each time, so quality can be compared consistently instead of judged from one-off examples.

The fixtures are not new product behavior. They are evaluation inputs and expectations for the
current deterministic Session Builder brain. The goal is to see where generated full sessions,
drills, quick activities, diagrams, and save/export views are already coach-ready, and where the
next template pass should improve them.

## 3. Fixture Quality Rubric

Use this rubric for every generated output:

- coach-ready title
- clear setup
- practical rules/scoring
- useful coaching cues
- clear watch points
- progression
- regression
- equipment realism
- age/program fit
- game-like realism
- activity distinctness
- diagram usefulness
- save/export readability

## 4. Fixture Set

### Fixture 1: U10 Travel Full Session, Attacking Overloads

Request:

- sport: soccer
- ageBand: u10
- programType: travel
- durationMin: 60
- sessionMode: full_session
- theme: attacking overloads
- coachNotes: create wide overloads, decision to pass or dribble, finish with a game
- equipment: balls, cones, pinnies

Expected quality:

- 4 connected blocks
- game-like activation
- main activity with overload
- second main activity distinct from first
- competitive finish
- simple U10 language

### Fixture 2: U14 Full Session, Defending 1v1 In Limited Space

Request:

- ageBand: u14
- durationMin: 45
- sessionMode: full_session
- theme: defending 1v1
- coachNotes: limited space, make it competitive, focus on angle, delay, and recovery
- equipment: balls, cones

Expected quality:

- no full goals required
- gate/end-zone scoring
- defending cues are specific
- final block is competitive

### Fixture 3: U12 Drill / Activity, First Touch Under Pressure

Request:

- ageBand: u12
- durationMin: 20
- sessionMode: drill
- theme: first touch under pressure
- coachNotes: one focused game-like activity, quick rotations, players scan before receiving
- equipment: balls, cones, pinnies

Expected quality:

- one activity only
- clear setup
- pressure and scanning are visible
- progression/regression included
- not a thin full-session slice

### Fixture 4: OST Mixed-Age Quick Activity, Game-Like With Cones And Balls

Request:

- ageBand: mixed
- programType: ost
- durationMin: 20
- sessionMode: quick_activity
- theme: game-like dribbling and reaction
- coachNotes: fun, playful, safe, mixed ages, cones and balls only
- equipment: balls, cones

Expected quality:

- playful
- safe
- easy to run
- works without goals
- clear scoring

### Fixture 5: 90-Minute Full Session, Possession Under Pressure

Request:

- ageBand: u14
- durationMin: 90
- sessionMode: full_session
- theme: possession under pressure
- coachNotes: build from rondo to directional possession to final game
- equipment: balls, cones, pinnies, mini goals

Expected quality:

- 4 or 5 blocks depending current template
- progression from simple to game-realistic
- Activity 2 and 3 are distinct
- final game applies theme

### Fixture 6: Finishing With Pugg Goals

Request:

- ageBand: u12
- durationMin: 25
- sessionMode: drill
- theme: finishing
- coachNotes: use Pugg goals, lots of repetitions, competitive scoring
- equipment: balls, cones, Pugg goals

Expected quality:

- direct use of Pugg goals
- no vague goal alternatives
- finishing actions under pressure
- competitive scoring
- clear rotation

## 5. How To Evaluate Generated Output

Score each rubric item and each fixture-specific expectation.

| Score | Meaning |
| --- | --- |
| 2 | strong |
| 1 | acceptable but needs polish |
| 0 | weak or missing |

Pass:

- Most rubric items score 2.
- No critical fixture-specific expectation is missing.
- The session or activity is practical enough for a coach to run without follow-up questions.

Partial:

- Most rubric items score 1 or higher.
- One or two fixture-specific expectations need polish.
- The output is usable, but quality issues are visible enough to guide the next template pass.

Fail:

- Multiple rubric items score 0.
- A critical fixture-specific expectation is missing.
- The output is generic, unrealistic, unsafe, not age-fit, not equipment-fit, or hard to read as a
  field handout.

## 6. Expected Follow-Up Work

This fixture doc supports the next implementation branch:

```text
session-builder-output-quality-improvements
```

Possible future work:

- add backend tests for fixture expectations
- improve template language
- improve activity distinctness
- improve drill/activity single-output quality
- improve diagram story alignment

## 7. Guardrails

- no AI/RAG yet
- no Match-to-Match work
- no public Training Brief API
- no backend route changes
- no persistence changes
- no infra changes
