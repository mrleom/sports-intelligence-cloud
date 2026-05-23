# Session Builder Soccer Diagram Language Research

## 1. Status

- Documentation/research only.
- No runtime changes.
- Current diagram polish work is paused until the diagram language is clearer.

## 2. Product Goal

SIC diagrams should help a coach understand and run the activity quickly. They should function like
a clean coaching-board explanation, not just a decorative picture next to the activity text.

The diagram should explain:

- setup
- player roles
- ball movement
- player movement
- pressure/defender movement
- scoring method
- rotation/reset
- progression/regression when useful

The coach should be able to glance at the diagram, understand the shape of the activity, then use
the written activity sections for exact coaching detail.

## 3. Current Problem

The current visual smoke test showed that diagrams are improving, but they can still feel
template-like. The frontend-inferred diagrams can show a more useful board than the original generic
placeholder, but they do not yet express a true soccer diagram language.

Observed problems:

- diagrams are improving but still feel template-like
- labels can overwhelm the pitch
- inference can be fragile if it reacts to incidental words
- diagrams need a soccer-native symbol language
- diagrams should tell the activity story, not just decorate the activity

The important product lesson is that better diagram rendering is not only a visual polish problem.
SIC needs a consistent way to represent activity intelligence: who starts where, where the ball
starts, who moves, where pressure comes from, how scoring works, and how the next repetition resets.

## 4. Soccer Diagram Visual Language

Proposed symbols:

- blue circle = coached team/player
- red circle = opposition/defender
- gray or neutral circle = neutral/support player
- black/white ball = ball
- yellow cone = cone/equipment
- small goal icon = mini/Pugg/target goal
- shaded box = grid/channel/zone
- solid arrow = ball path/pass/shot
- dashed arrow = player run/support movement
- dotted/wavy arrow = dribble/carry
- red dashed arrow = pressure/defensive recovery
- curved arrow = rotation/reset
- numbered badge = sequence step
- target zone label = scoring or destination area

Labels should be rare and short. The pitch should show the shape and movement; captions should
carry most of the explanation.

## 5. Diagram Story Model

Use a consistent three-panel model:

- Setup
- Action
- Score / Reset

Each panel should have:

- title
- diagram
- one-sentence coaching explanation
- compact legend only for symbols used in that diagram

For very simple activation activities, the model may collapse to two panels:

- Setup
- Action

For final game / competitive close blocks, a lightweight final-game format card is usually enough.
The coach needs teams, scoring, restarts, and constraints more than a full tactical board.

## 6. Activity-Specific Diagram Requirements

Attacking overloads / wide free player:

- show wide channels or wide support lanes
- show the ball starting wide or moving into the overload
- show the free player clearly as a support option
- show at least one defender being committed
- show the scoring gate/target and recovering defender when used

Defending 1v1 angle and delay:

- show a narrow 1v1 channel or defended lane
- show attacker and defender start positions
- show defender angle of approach
- show pressure/delay movement in red
- show scoring gates or end zones
- show defender recovery or counter direction when relevant

First touch under pressure:

- show server, receiver, and defender roles
- show the receiving box or pressure area
- show where the first touch should escape
- show pressure arriving after the pass
- show quick rotation/reset between server, receiver, and defender

Directional possession under pressure:

- show possession team, pressing defenders, and support angles
- show target zones or destination areas
- show the escape pass or directional pass
- show counter/transition path after a defensive regain
- keep Activity 2 and Activity 3 visually distinct when one is rondo-like and the other is directional

Pugg goal finishing:

- show server, shooter, defender, and goal
- show Pugg goals directly rather than a generic goal
- show shot path
- show rebound cone or rebound follow-up
- show clear shooter/server/defender rotation

Mini-goal possession:

- show mini goals as small goals, not generic yellow dots
- show possession direction and counter direction
- show target zone or mini-goal scoring options
- show pressure and recovery movement clearly

Final game / competitive close:

- keep the visual lightweight
- show or describe teams, scoring, restarts, and final constraint
- avoid a crowded tactical diagram unless the activity specifically requires one

## 7. Intelligence Generator Direction

The future direction should move from generic template diagram inference to structured activity
intelligence.

The generator should produce an activity model first:

- objective
- players/numbers
- space
- equipment
- constraints
- scoring
- roles
- coaching cues
- diagram intent

Diagrams should be generated from that structured model, not from loose text matching alone.

This does not require immediate AI/RAG or full DiagramSequence implementation. The near-term goal is
to clarify the activity model and symbol language so future deterministic or intelligent diagram
generation has a stable target.

## 8. What Not To Do Yet

- no raw AI-generated images
- no full DiagramSequence implementation yet
- no backend schema changes in this research slice
- no public API changes
- no persistence changes
- no Match-to-Match work
- no AI/RAG implementation yet

## 9. Recommended Next Slice

Recommended next branch:

```text
session-builder-diagram-symbol-system
```

Scope:

- frontend-only diagram symbol system and legend polish
- reduce oversized labels
- make symbol sizes consistent
- make legend dynamic per diagram
- use soccer-native symbols
- preserve inferred diagrams
- no backend generation changes yet

Recommended later branch:

```text
session-builder-activity-model-design
```

Scope:

- define structured activity model that can eventually power intelligent diagrams and sessions
