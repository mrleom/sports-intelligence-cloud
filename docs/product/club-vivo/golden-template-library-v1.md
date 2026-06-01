# Club Vivo Golden Template Library v1

## 1. Purpose And Status

**Status:** Product source of truth for future golden-template design and implementation.

**Current runtime status:** Docs-first plan. The complete library is not implemented as a runtime
registry or routing layer.

This document turns the Club Vivo Soccer Development Taxonomy v1 into an implementation-ready
golden-template library plan. It defines the first reviewed soccer session patterns that future
Session Builder routes should select, adapt, validate, and protect with regression tests.

The shipped Session Builder remains deterministic and template-based. It currently uses prompt
signal detection, soccer-specific detectors, activity archetype detection, coarse template
selection, and deterministic output shaping. This document does not claim that every Wave 1 entry
is already fully golden in runtime.

Reaction Chase Escape Gates has the strongest current implementation evidence. Other Wave 1
entries have useful partial deterministic coverage or proposed coverage that should be formalized
incrementally.

## 2. Relationship To Soccer Development Taxonomy v1

The [Soccer Development Taxonomy v1](soccer-development-taxonomy-v1.md) defines:

- the shipped age bands
- the shipped primary objectives
- the shipped specific focuses
- age-band recommendation guidance
- objective classification
- Spanish and i18n terminology direction
- the first three golden-template roadmap waves

This library document defines how the first roadmap wave should become reviewable implementation
units.

The taxonomy remains the source of truth for soccer-learning organization. This library is the
source of truth for reviewed template patterns. Future runtime routing should reference both:

```text
coach selection and note
-> taxonomy tags
-> reviewed golden template when available
-> age, environment, equipment, and duration adaptation
-> deterministic validation
-> coach-ready session pack
```

The library should cover the full objective inventory over time. It should not treat one activity,
one final-game layout, or one cultural-game adaptation as the whole system.

## 3. Golden Template Definition

A golden template is a reviewed soccer session pattern with:

- a clear learning purpose
- explicit taxonomy coverage
- recommended and adaptable age bands
- a coach-ready session flow
- deterministic activity structure expectations
- diagram storytelling expectations
- Spanish terminology notes
- one or more regression fixtures
- an honest implementation status

A golden template is not necessarily one fixed session. It is a bounded pattern that may adapt
numbers, space, language, equipment, and activity complexity while preserving the learning story.

### 3.1 Proposed Template Record

Future implementation should represent each reviewed entry with stable IDs separate from display
labels:

```text
templateId
displayName
version
status
supportedPrimaryObjectiveIds[]
supportedSpecificFocusIds[]
secondaryTags[]
recommendedAgeBands[]
adaptableAgeBands[]
supportedSessionModes[]
routingSignals[]
sessionFlow
diagramPattern
activityStructure
localizationNotes
regressionFixtures[]
```

This is a proposed contract. It is not shipped runtime data.

### 3.2 Status Vocabulary

| Status | Meaning |
| --- | --- |
| Reference implementation evidence | Current code and tests provide the strongest reviewed example. Additional cleanup may still happen. |
| Partial deterministic coverage | Current code has relevant detectors, language, naming, or tests, but the entry is not yet a complete reviewed golden route. |
| Proposed library entry | Taxonomy coverage is planned, but a distinct reviewed runtime route does not exist yet. |

### 3.3 Shared Full-Session Pattern

For a standard 60-minute full session, Wave 1 templates should use:

| Activity | Role | Minutes |
| --- | --- | --- |
| Activity 1 | Game-like activation that introduces the theme | 12 |
| Activity 2 | Main starter with clear pressure or decision | 18 |
| Activity 3 | Main progression with a harder decision, transition, or recovery demand | 18 |
| Activity 4 | Competitive close, final game, or mini tournament | 12 |

Other full-session durations should follow the allocations in the
[Coaching Session Design Standard](coaching-session-design-standard.md). Quick Activity and Drill /
Activity modes should produce one strong activity from 15 to 25 minutes.

### 3.4 Shared Activity 4 Pattern

Activity 4 is a compact competitive close, not a full tactical diagram.

Left side:

- Format
- Teams
- Focus

Under the visual:

- Rules / Scoring
- Bonus + Winner Rule

Do not repeat format, teams, goals, game length, constraint, win condition, or winner-rule concepts
across both sides.

## 4. Golden Template Quality Requirements

### 4.1 Soccer Learning

Each template should:

- match its selected primary objective and specific focus
- stay game-like and field-ready
- keep players active with short waits and clear rotations
- scale complexity by age band without hard-locking objectives
- connect physical work to soccer actions and decisions
- end with competition or a realistic game moment
- include progressions, regressions, and safety or space adjustments

### 4.2 Coach-Facing Structure

Activities 1 through 3 should provide useful field instructions:

- Setup
- How to start
- How to run it
- Rules / scoring
- Coaching cues
- What to watch for
- Safety / space adjustment
- Progression
- Regression

Activity 4 should use the compact competitive-close pattern in Section 3.4.

### 4.3 Equipment And Space

- Name one clear setup choice instead of vague equipment alternatives.
- Prefer selected equipment.
- Use meters first with yards in parentheses.
- Avoid requiring equipment that the coach did not select.
- Adapt safely when goals are unavailable.

### 4.4 Diagram Storytelling

- Keep words out of the SVG field.
- Use local mini legends for visible symbols and actions only.
- Show a clear ball start and action story.
- Use solid lines for passes, shots, or ball actions.
- Use small round dotted lines for dribble or carry actions.
- Use dashed lines for movement, support, recovery, chase, or pressure.
- Keep Activity 2 and Activity 3 visually distinct.
- Keep Activity 4 as a simple final-game visual card.

### 4.5 Regression Fixtures

Each implemented golden template should have fixtures that prove:

- route selection from supported guided input or custom-note signals
- age-band adaptation where meaningful
- equipment-aware setup
- the standard 60-minute activity flow
- coach-ready activity naming and descriptions
- Activity 3 progression quality
- compact Activity 4 output
- diagram captions, local legends, and line meanings
- no internal metadata leaks
- no confusing playground labels when adapting cultural games

## 5. Wave 1 Template List

| Template | Current status | Primary purpose |
| --- | --- | --- |
| Reaction Chase Escape Gates | Reference implementation evidence | Translate a playful reaction-chase idea into scanning, first touch, escape, support, and competition. |
| Defensive Transition Compact Recovery | Reference implementation evidence | React after loss, press the ball, recover inside, and protect central space. |
| Press And Counter | Partial deterministic coverage | Recognize a pressing trigger, press together, regain, and counter quickly. |
| Build-Out Through Pressure | Partial deterministic coverage | Create support angles, play away from pressure, and break the first pressing line. |
| 1v1 Delay And Recover | Partial deterministic coverage | Defend side-on, delay, recover goal-side, and counter after the regain. |
| Finishing Waves | Partial deterministic coverage | Finish with realistic decisions while adapting safely to available scoring equipment. |
| Wide Overload Decision Game | Partial deterministic coverage | Recognize the free player, create width, and choose pass or dribble before pressure recovers. |

## 6. Wave 1 Template Specifications

### 6.1 Reaction Chase Escape Gates

| Field | Definition |
| --- | --- |
| Proposed template ID | `reaction-chase-escape-gates-v1` |
| Supported primary objectives | `Physical / reaction / speed`; `Game understanding`; `1v1 / small-sided duels` |
| Supported specific focuses | `Reaction speed`; `Acceleration`; `Change of direction`; `Scan before receiving`; `Recognize pressure`; `Choose when to pass or dribble`; `Shield and escape`; `Small-sided decision-making` |
| Recommended age bands | U8, U10, U12 |
| Adaptable age bands | U14; older groups when the coach wants a fast, playful activation or small-sided decision game |
| Session flow pattern | Trigger Touch Activation -> Reaction Chase Escape Gates -> Escape, Support, Score Progression -> Escape Gates Mini Tournament |
| Diagram pattern | Activity 1 introduces gates and first touch. Activity 2 shows coach start, attacker escape, and defender/chaser pressure. Activity 3 adds support and a second defender. Activity 4 uses a simple gate-battle grid. |
| Expected activity structure | Keep the soccer translation obvious: trigger, first touch away from pressure, scan, escape, support, score, reset. Use the shared Activity 4 compact layout. |
| Spanish terminology notes | Prefer `velocidad de reacción`, `escanear antes de recibir`, `primer toque lejos de la presión`, `proteger el balón`, and `escapar por una puerta`. Avoid literal playground-game wording in coach-facing output. |
| Implementation status | **Reference implementation evidence.** Current code has a dedicated duck-duck-goose-inspired escape archetype, specialized activity descriptions, specialized activity names, final-game shaping, diagram kinds, local legend tests, dotted-versus-dashed line tests, and compact Activity 4 renderer tests. |
| Next implementation test needed | Add one named full-session fixture that records the complete generated pack for U10 and one age-adaptation fixture for U14. Assert taxonomy tags once stable IDs exist. |

### 6.2 Defensive Transition Compact Recovery

| Field | Definition |
| --- | --- |
| Proposed template ID | `defensive-transition-compact-recovery-v1` |
| Supported primary objectives | `Transition to defend`; `Defending`; `Team shape` |
| Supported specific focuses | `Counterpress after losing the ball`; `Recovery runs`; `Protect central space`; `Delay the counter attack`; `Delay and recover`; `Compact defending`; `Recover quickly` |
| Recommended age bands | U12, U14, U16, U18, Adult |
| Adaptable age bands | U10 with one transition rule, a larger recovery space, and simpler language |
| Session flow pattern | Ball-and-reaction activation -> Compact Recovery Transition Game -> Recover And Protect Central Spaces -> Compact Recovery Final Game |
| Diagram pattern | Activity 2 shows the loss trigger, nearest-player pressure, cover, and inside recovery. Activity 3 adds a counter runner or central danger gate. Activity 4 uses a directional final-game grid with compact-recovery scoring. |
| Expected activity structure | Make the first three seconds after loss visible: press the ball, recover inside, communicate, protect the middle, delay, and regain when support arrives. |
| Spanish terminology notes | Prefer `transición defensiva`, `presionar tras perder el balón`, `recuperación compacta`, `proteger el espacio central`, and `temporizar el contraataque`. |
| Implementation status | **Reference implementation evidence.** Current code has a bounded compact-recovery classifier for supported guided focuses, a dedicated four-activity 60-minute story, full coach-ready sections for Activities 1 through 3, a compact Activity 4 source description, a U10 simplification, distinct Activity 2 and Activity 3 diagram kinds, a directional final-game visual, guided backend fixtures, and pipeline-level renderer checks. |
| Next implementation test needed | Add a saved-session rendering smoke after deployment and review one U10 and one U16 live output with coaches before broadening the route. |

### 6.3 Press And Counter

| Field | Definition |
| --- | --- |
| Proposed template ID | `press-and-counter-v1` |
| Supported primary objectives | `Pressing`; `Transition to defend`; `Transition to attack`; `Defending` |
| Supported specific focuses | `Pressing triggers`; `Force play wide`; `Win the ball high`; `Press and cover balance`; `Counterpress after losing the ball`; `Counter attack quickly`; `Win the ball back` |
| Recommended age bands | U12, U14, U16, U18, Adult |
| Adaptable age bands | U10 with simple pressure-cover language and one visible trigger |
| Session flow pattern | Pressure-cover activation -> Pressing Trigger Game -> Press And Counter Progression -> Press And Counter Final Game |
| Diagram pattern | Activity 2 shows a trigger and curved first pressure run. Activity 3 adds cover, a regain, and a short counter route. Activity 4 uses a simple directional game card with a pressing bonus. |
| Expected activity structure | Teach the trigger, first pressure run, cover behind the ball, connected team movement, regain, and quick counter as one story. Avoid rewarding one player pressing alone. |
| Spanish terminology notes | Prefer `presión`, `señal para presionar`, `orientar el juego hacia afuera`, `equilibrio entre presión y cobertura`, `recuperar el balón`, and `contraatacar rápido`. |
| Implementation status | **Partial deterministic coverage.** Current code has a pressing detector, pressing-specific setup and coaching language, refined names, a specialized final game, and existing pressing-oriented base templates. |
| Next implementation test needed | Add a guided fixture for `Pressing: pressing triggers.` Assert trigger language, curved pressure, cover balance, six-second counter progression, compact Activity 4 output, and local pressure-line diagram legends. |

### 6.4 Build-Out Through Pressure

| Field | Definition |
| --- | --- |
| Proposed template ID | `build-out-through-pressure-v1` |
| Supported primary objectives | `Possession / build up`; `Transition to attack`; `Game understanding` |
| Supported specific focuses | `Build from the back`; `Support angles`; `Play through pressure`; `Play out from own box after regain`; `Recognize pressure`; `Use space` |
| Recommended age bands | U12, U14, U16, U18, Adult |
| Adaptable age bands | U10 with a coach start, fewer players, clear support gates, and no position-specific overload |
| Session flow pattern | Support-angle activation -> Build-Out Support Angles -> Build-Out Under Pressure Game -> Build-Out Pressure Final Game |
| Diagram pattern | Activity 2 shows goalkeeper or coach start, two support angles, pressing players, and midfield target. Activity 3 adds a stronger first pressing line and reaction after regain. Activity 4 uses a build-out game card with a support-angle bonus. |
| Expected activity structure | Reward calm first pass, body shape, useful support angles, playing away from pressure, and recognizing when the first pressing line is broken. |
| Spanish terminology notes | Prefer `salir jugando desde atrás`, `ángulos de apoyo`, `jugar bajo presión`, `primer pase con calma`, and `superar la primera línea de presión`. |
| Implementation status | **Partial deterministic coverage.** Current code has build-out-under-pressure and possession-under-pressure detectors, specialized language, refined activity names, a specialized final game, and a Training Brief pipeline test. |
| Next implementation test needed | Add a guided fixture for `Possession / build up: play through pressure.` Assert support-angle behavior, goalkeeper-or-coach adaptation, Activity 3 pressing-line progression, compact Activity 4 output, and distinct Activity 2 and Activity 3 visuals. |

### 6.5 1v1 Delay And Recover

| Field | Definition |
| --- | --- |
| Proposed template ID | `one-v-one-delay-and-recover-v1` |
| Supported primary objectives | `1v1 / small-sided duels`; `Defending`; `Physical / reaction / speed` |
| Supported specific focuses | `Defend 1v1`; `Delay and recover`; `Pressure and cover`; `Recover quickly`; `Change of direction` |
| Recommended age bands | U8, U10, U12, U14 |
| Adaptable age bands | U16, U18, Adult as a role-specific defensive detail block or activation |
| Session flow pattern | Footwork-and-angle activation -> 1v1 Angle And Delay Gates -> Recover And Delay 1v1 -> 1v1 recovery gate battle |
| Diagram pattern | Activity 2 shows attacker start, angled defender release, and end gates. Activity 3 changes the defender angle or adds a second action after the first duel. Activity 4 uses a compact gate battle or directional small-sided game. |
| Expected activity structure | Teach side-on approach, curved run, controlled slowdown, showing away from danger, delaying without diving in, recovery goal-side, and counter after regain. |
| Spanish terminology notes | Prefer `defender 1 contra 1`, `temporizar`, `orientar lejos del peligro`, `recuperar la posición`, and `contraatacar tras recuperar`. |
| Implementation status | **Partial deterministic coverage.** Current code has a defending-1v1 detector, specialized language, and refined Activity 2 and Activity 3 names. A full reviewed golden session fixture is still missing. |
| Next implementation test needed | Add a guided fixture for `1v1 / small-sided duels: defend 1v1.` Assert the angle-and-delay activity names, progression after the first duel, age-appropriate U8 language, and a distinct defender-release diagram. |

### 6.6 Finishing Waves

| Field | Definition |
| --- | --- |
| Proposed template ID | `finishing-waves-v1` |
| Supported primary objectives | `Finishing`; `Attacking` |
| Supported specific focuses | `Shoot early`; `Rebounds`; `Combinations to finish`; `Finish from cutbacks`; `Finishing from cutbacks`; `Create chances` |
| Recommended age bands | U10, U12, U14, U16, U18, Adult |
| Adaptable age bands | U8 with simple shooting, rebound reactions, short lines, and safe distances |
| Session flow pattern | Finishing activation -> focus-specific Finishing Waves -> pressure or combination progression -> competitive finishing game |
| Diagram pattern | Activity 2 shows ball start, finish route, and rebound area where relevant. Activity 3 adds a defender, combination, cutback, or second finish. Activity 4 uses goals when available or a compact gate-scoring game when they are not. |
| Expected activity structure | Keep lines short. Reward shot selection, early finish, rebound reaction, combination timing, or cutback arrival according to the selected focus. Adapt scoring targets to equipment. |
| Spanish terminology notes | Prefer `finalización`, `rematar rápido`, `rebotes`, `combinaciones para finalizar`, `finalizar tras pase atrás`, and `llegar al área`. |
| Implementation status | **Partial deterministic coverage.** Current code has finishing template selection, focus-sensitive activity naming, equipment-aware goal detection, gate adaptation when goals are unavailable, and a Training Brief pipeline test for cone-gate finishing. |
| Next implementation test needed | Add guided fixtures for `Finishing: rebounds.` and `Finishing: finish from cutbacks.` Run each with and without goals. Assert equipment-aware scoring targets, focus-specific progression, short rotations, and matching diagram stories. |

### 6.7 Wide Overload Decision Game

| Field | Definition |
| --- | --- |
| Proposed template ID | `wide-overload-decision-game-v1` |
| Supported primary objectives | `Attacking`; `Team shape`; `Game understanding` |
| Supported specific focuses | `Create chances`; `Play forward`; `Combination play`; `Wide play`; `Attacking width`; `Choose when to pass or dribble`; `Use space` |
| Recommended age bands | U12, U14, U16, U18, Adult |
| Adaptable age bands | U10 with 2v1 or 3v1 numbers, a fixed wide player, and one simple choice |
| Session flow pattern | Overload Gates Activation -> Wide Overload Decision Game -> Overload Recovery Counter Game -> Overload Gate Battle Final Game |
| Diagram pattern | Activity 2 shows central ball start, wide free-player lane, support run, and shifting defender. Activity 3 adds a recovery defender and a second decision. Activity 4 uses a compact overload gate-battle card. |
| Expected activity structure | Start central, stretch wide, see the free player, commit the defender, choose pass or dribble, and attack open space before the defense recovers. |
| Spanish terminology notes | Prefer `superioridad numérica`, `jugador libre`, `amplitud`, `apoyo`, `fijar al defensor`, and `elegir entre pasar o conducir`. |
| Implementation status | **Partial deterministic coverage.** Current code has overload prompt-signal detection, specialized language, refined activity names, a specialized final game, a polished four-activity pipeline fixture, and diagram legend checks. The shipped guided dropdown does not currently send an explicit `overload` focus, so this route still depends on custom prompt or coach-note wording. |
| Next implementation test needed | Add a reviewed mapping decision for one or more guided focuses, then test `Attacking: wide play.` plus an overload coach note. Assert taxonomy coverage, four activity names, recovery-defender progression, compact Activity 4 output, and overload diagram legends. |

## 7. Wave 2 Placeholders

Wave 2 should expand distinct reviewed coverage across the shipped focus inventory.

| Proposed template | Intended coverage |
| --- | --- |
| Secure Or Counter After Regain | `Transition to attack`: first pass after regain, escape pressure after winning the ball, counterattack quickly, secure possession after regain |
| Switch Play Through Width | `Possession / build up`: switch play; `Attacking`: wide play; `Team shape`: attacking width |
| Defend Wide Areas And Protect The Box | `Defending`: defend wide areas, protect the box; finishing-defense reactions around crosses and cutbacks |
| Compact Defending And Balance Around The Ball | `Team shape`: compact defending, balance around the ball; `Defending`: pressure and cover |
| Support Underneath To Progress | `Team shape`: support underneath; `Possession / build up`: support angles; `Attacking`: play forward |
| Cutback Chance Creation And Arrival | `Attacking`: finishing from cutbacks; `Finishing`: finish from cutbacks |
| Small-Sided Pass-Or-Dribble Decisions | `Game understanding`: choose when to pass or dribble, recognize pressure, use space |

Each Wave 2 entry needs its own reviewed template specification before runtime routing work begins.

## 8. Wave 3 Placeholders

Wave 3 should add soccer-first cultural-game adaptations after Wave 1 and Wave 2 coverage is stable.

| Proposed template | Intended soccer translation |
| --- | --- |
| Cat And Mouse Shield / Escape | Protect the ball, scan, turn, escape pressure, and connect with support. |
| Police And Robbers Press / Evade / Counter | Press, evade, regain, counter, and reset through safe short rounds. |
| Sharks And Minnows Dribble Through Pressure | Dribble with awareness, change direction, and escape live pressure. |
| King Of The Ring Shielding / Scanning | Shield, scan, protect space, and recover after losing the ball. |
| Numbers Game Quick Attack | React to a number call, attack with an advantage, and make an early decision. |
| Rondo To Finish | Keep possession, recognize the release moment, and turn circulation into a chance. |

These templates should translate familiar ideas into soccer behavior. Do not copy confusing
playground labels into coach-facing instructions.

## 9. Future Golden-Template Routing

Future routing should stay deterministic and reviewable.

### 9.1 Proposed Selection Order

1. Preserve the coach's selected primary objective and specific focus.
2. Preserve the coach's note and practical constraints.
3. Normalize the selected focus into stable taxonomy IDs when those IDs exist.
4. Detect additional bounded signals such as age band, player count, equipment, build-out pressure,
   defensive-transition language, overload wording, or cultural-game inspiration.
5. Select an exact reviewed golden template when one supports the primary focus.
6. Use secondary tags to choose an adaptation inside that template.
7. Apply age-band, duration, environment, equipment, and player-count adjustments.
8. Otherwise use a reviewed objective-family template.
9. Otherwise use the current deterministic fallback.
10. Validate coach-facing structure, duration, safety, equipment, and diagram readability.

### 9.2 Routing Guardrails

- Keep one primary focus as the routing anchor.
- Treat secondary tags as refinements, not competing session objectives.
- Preserve manual coach intent from `Custom` input.
- Prefer reviewed template IDs over ad hoc display-label matching once IDs exist.
- Keep English and localized display labels separate from routing keys.
- Do not hide the deterministic fallback while library coverage is incomplete.
- Add one reviewed runtime route and fixture at a time.

### 9.3 Proposed Selection Example

```text
ageBand: u12
primaryObjective: Possession / build up
specificFocus: Play through pressure
coachNote: Start from the goalkeeper and find midfield targets.
equipment: balls, cones, bibs

-> taxonomy focus: play-through-pressure
-> secondary signal: build-out-under-pressure
-> reviewed template: build-out-through-pressure-v1
-> adaptation: U12 coach-start build-out with target gates
```

This is proposed future routing behavior, not a claim about the current runtime contract.

## 10. Implementation Sequence

Keep implementation slices small and reviewable:

1. Add stable internal IDs for the shipped objective and focus inventory.
2. Choose one partial Wave 1 entry after Reaction Chase Escape Gates.
3. Add a reviewed fixture and expected coaching story.
4. Add or refine the bounded deterministic route.
5. Add diagram expectations where needed.
6. Validate against the Coaching Session Design Standard.
7. Move the entry to reference implementation evidence only after review.
8. Repeat for the next entry.

Do not implement all seven routes in one broad rewrite.

## 11. Out Of Scope / Not Shipped Yet

This library document does not ship:

- runtime template-registry data
- stable runtime taxonomy IDs
- complete golden runtime coverage for all Wave 1 entries
- Wave 2 or Wave 3 runtime routes
- age-aware dropdown filtering
- automatic age-band recommendations
- Spanish UI localization
- club-specific terminology settings
- database-backed activity retrieval
- tenant knowledge retrieval
- RAG, FAISS, or vector search
- Bedrock-backed generation
- autonomous agents
- model training from coach feedback
- match-analysis routing
- Training Brief frontend lanes
- image-assisted intake
- multi-sport expansion

These require separate product and implementation slices.
