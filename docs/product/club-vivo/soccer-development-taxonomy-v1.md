# Club Vivo Soccer Development Taxonomy v1

## 1. Purpose And Status

**Status:** Product source of truth for future design and implementation.

**Current runtime status:** Not implemented as a runtime taxonomy.

This document defines how Club Vivo should organize soccer learning by:

- age band
- primary objective
- specific focus
- future golden-template coverage
- future routing terminology
- Spanish and i18n terminology

The taxonomy should guide future Session Builder routing, golden-template design, coach-facing
language, and localization work. It should help Club Vivo move from a broad dropdown plus a small
set of deterministic templates toward a deliberate soccer-learning system.

The current active Session Builder remains deterministic and template-based. The current UI sends a
guided objective string such as:

```text
Attacking: create chances.
```

The backend currently uses prompt-signal detection, a small set of soccer-specific detectors,
activity archetypes, coarse template selection, and deterministic output shaping. This document
does not claim that every dropdown option already has a distinct runtime route.

Activity 4 is not the center of this taxonomy. The compact competitive-close pattern is a useful
output-quality reference, but the taxonomy centers on the full Session Builder objective and focus
inventory.

## 2. Current App Objective And Focus Inventory

The shipped Coach Workspace Session Builder currently exposes seven age bands:

- U8
- U10
- U12
- U14
- U16
- U18
- Adult

It currently exposes these primary objectives and specific focuses:

| Primary objective | Shipped specific focuses |
| --- | --- |
| Attacking | Create chances; Play forward; Combination play; Wide play; Finishing from cutbacks |
| Defending | Pressure and cover; Delay and recover; Defend wide areas; Protect the box; Win the ball back |
| Transition to attack | First pass after regain; Escape pressure after winning the ball; Counter attack quickly; Secure possession after regain; Play out from own box after regain |
| Transition to defend | Counterpress after losing the ball; Recovery runs; Protect central space; Delay the counter attack |
| Possession / build up | Build from the back; Support angles; Switch play; Play through pressure |
| Finishing | Finish from cutbacks; Shoot early; Rebounds; Combinations to finish |
| Pressing | Pressing triggers; Force play wide; Win the ball high; Press and cover balance |
| 1v1 / small-sided duels | Beat the defender; Defend 1v1; Shield and escape; Small-sided decision-making |
| Team shape | Compact defending; Attacking width; Support underneath; Balance around the ball |
| Game understanding | Scan before receiving; Recognize pressure; Choose when to pass or dribble; Use space |
| Physical / reaction / speed | Reaction speed; Acceleration; Change of direction; Recover quickly |
| Custom | No guided focus list; coach writes the objective or activity idea manually |

### Current Runtime Coverage

The current backend has stronger deterministic language and activity shaping for:

- defensive transition after possession loss
- pressing
- attacking overloads
- defending 1v1
- first-touch receiving and scanning
- possession or build-out under pressure
- recovery runs
- finishing
- duck-duck-goose-inspired reaction-chase escape activities

The current fallback selector is intentionally simple. It broadly routes prompt text toward passing,
finishing, pressing, or fallback templates. Some shipped dropdown focuses therefore share a coarse
template path today. Future work should improve coverage incrementally with golden templates and
tests rather than pretending the full taxonomy is already implemented.

## 3. Age-Band Learning Model

Age bands should influence language, activity complexity, coach intervention, space, numbers, and
the number of decisions layered into one activity. These are product defaults, not hard limits.
Coaches should be able to adapt for player experience, program type, and team context.

| Age band | Learning center | Session design guidance | Coach language |
| --- | --- | --- | --- |
| U8 | Ball confidence, movement, joy, simple perception | Use playful games, many touches, 1v1 and small-number activities, obvious targets, short rounds, and simple restarts. Introduce one decision at a time. | Short action words: scan, turn, dribble, pass, stop, go, find space. |
| U10 | Individual action connected to one teammate and one opponent | Add support, pressure, direction, simple scoring choices, quick rotations, and basic transition moments. Keep activities active and understandable without long explanations. | Use simple relationships: help the ball, move after passing, pressure the ball, recover inside. |
| U12 | Perception before action, small-group principles, transition habits | Use 2v1, 2v2, 3v2, 3v3, rondos, gates, target players, and small-sided games. Add scanning, first touch, support angles, pressure-cover, and reaction after regain or loss. | Connect cue to decision: scan before receiving, first touch away, support underneath, protect the middle. |
| U14 | Unit relationships, game phases, role clarity, repeatable principles | Use directional games, overloads, compactness, pressing triggers, build-up choices, wide play, cutbacks, and transition rules. Ask players to recognize why a decision fits the moment. | Use principle language: create width, break a line, press together, cover behind, secure the regain. |
| U16 | Game-model application, tempo, tactical flexibility | Use position-aware and phase-aware practices, opponent problems, realistic transitions, pressing schemes, build-out variations, and constraints that reward the intended team behavior. | Add tactical detail without over-coaching: identify the trigger, manage the next line, balance around the ball. |
| U18 | Match-specific execution, collective problem-solving, self-correction | Use realistic numbers and spaces, match scenarios, role-specific detail, tactical tradeoffs, high-tempo decisions, and player reflection. | Invite diagnosis: what opened the space, what was the next best action, how should the unit adjust? |
| Adult | Context-specific performance, clarity, efficiency | Adapt to recreational, competitive, or performance context. Use realistic game problems, concise coaching detail, appropriate load, and flexible complexity. | Keep language direct and relevant to the team's level, match model, and available training time. |

### Age-Band Use Rules

- Do not hard-lock objectives by age.
- Recommend age-appropriate focuses and activity complexity.
- Prefer simpler language and fewer simultaneous rules for younger groups.
- Preserve play, competition, safety, and high involvement at every age.
- Allow advanced younger teams and developing older teams to move up or down the complexity ladder.
- Treat physical themes as soccer-action themes, not isolated conditioning by default.

## 4. Objective Classification

Each shipped objective has one primary organizational category. Several objectives also connect to
other categories during real play. The classification is for product organization and routing, not
for drawing rigid tactical boundaries.

### 4.1 Game Phase Objectives

These describe the moment of the game Club Vivo is helping the coach train.

| Objective | Product meaning |
| --- | --- |
| Attacking | Create and exploit opportunities while the team has the ball. |
| Defending | Prevent progress and chances while the opponent has the ball. |
| Transition to attack | Decide what to do immediately after winning possession. |
| Transition to defend | React immediately after losing possession. |

### 4.2 Team Principle Objectives

These describe repeatable collective behaviors that can appear inside one or more game phases.

| Objective | Product meaning |
| --- | --- |
| Possession / build up | Keep, progress, and circulate the ball with useful support. |
| Pressing | Apply connected pressure to force mistakes, regain, or direct play. |
| Team shape | Maintain useful relationships around the ball and across the team. |

### 4.3 Player Action Objectives

These center on a player's soccer action inside a realistic decision.

| Objective | Product meaning |
| --- | --- |
| Finishing | Select and execute an action that creates a goal attempt or scores. |
| 1v1 / small-sided duels | Attack, defend, protect, escape, and decide in direct contests. |

### 4.4 Cognitive And Physical Objectives

These support soccer decisions and actions across every phase.

| Objective | Product meaning |
| --- | --- |
| Game understanding | Perceive ball, space, teammates, opponents, and pressure before choosing an action. |
| Physical / reaction / speed | Accelerate, react, recover, and change direction inside soccer actions. |

### 4.5 Custom And Manual Routing

`Custom` lets the coach write a manual objective, constraint, cultural-game idea, or activity
preference. Custom input should remain a first-class path because coaches often think in practical
field language rather than taxonomy labels.

Future routing should try to classify custom input into one or more taxonomy tags while preserving
the coach's note. It should not silently overwrite the coach's intent.

## 5. Specific Focus Mapping By Age Band

The `Start` column identifies the first age band where Club Vivo should commonly recommend a focus.
It is a recommendation threshold, not a hard restriction. The `Progression` column shows how the
same focus can mature across later age bands.

### 5.1 Attacking

| Specific focus | Start | Progression | Suggested Spanish |
| --- | --- | --- | --- |
| Create chances | U10 | Move from attacking open space to combining, timing runs, and exploiting defensive movement. | Crear ocasiones |
| Play forward | U10 | Move from recognizing open forward space to breaking lines with pass, dribble, or support. | Jugar hacia adelante |
| Combination play | U12 | Move from simple give-and-go actions to third-player and unit combinations. | Juego combinado |
| Wide play | U12 | Move from using open wide space to coordinated width, overlap, underlap, and delivery choices. | Juego por las bandas |
| Finishing from cutbacks | U14 | Move from recognizing the backward pass to coordinated arrival, spacing, and finishing decisions. | Finalización tras pase atrás |

### 5.2 Defending

| Specific focus | Start | Progression | Suggested Spanish |
| --- | --- | --- | --- |
| Pressure and cover | U10 | Move from first defender and helper to connected unit pressure-cover balance. | Presión y cobertura |
| Delay and recover | U10 | Move from slowing the attacker to recovering compact shape and protecting danger. | Temporizar y recuperar |
| Defend wide areas | U12 | Move from showing away from goal to unit support and defending crosses or cutbacks. | Defender zonas amplias |
| Protect the box | U12 | Move from protecting central danger to marking, cover, clearances, and second-ball reactions. | Proteger el área |
| Win the ball back | U10 | Move from well-timed individual regain attempts to collective regain decisions. | Recuperar el balón |

### 5.3 Transition To Attack

| Specific focus | Start | Progression | Suggested Spanish |
| --- | --- | --- | --- |
| First pass after regain | U10 | Move from finding a safe teammate to selecting the best forward or secure option. | Primer pase tras recuperar |
| Escape pressure after winning the ball | U12 | Move from protecting the regain to using support and breaking the first pressure line. | Salir de la presión tras recuperar |
| Counter attack quickly | U12 | Move from immediate forward play to coordinated counterattack timing and numbers. | Contraatacar rápido |
| Secure possession after regain | U12 | Move from keeping the first pass to recognizing when not to force the counterattack. | Asegurar la posesión tras recuperar |
| Play out from own box after regain | U14 | Move from first outlet recognition to coordinated build-out under match pressure. | Salir jugando desde el área propia tras recuperar |

### 5.4 Transition To Defend

| Specific focus | Start | Progression | Suggested Spanish |
| --- | --- | --- | --- |
| Counterpress after losing the ball | U12 | Move from immediate nearby pressure to coordinated counterpress triggers and cover. | Contrapresionar tras perder el balón |
| Recovery runs | U10 | Move from sprinting goal-side to recovering with angle, role, and communication. | Carreras de recuperación |
| Protect central space | U10 | Move from recovering inside to coordinated compactness and danger management. | Proteger el espacio central |
| Delay the counter attack | U12 | Move from slowing the ball carrier to unit recovery and transition control. | Temporizar el contraataque |

### 5.5 Possession / Build Up

| Specific focus | Start | Progression | Suggested Spanish |
| --- | --- | --- | --- |
| Build from the back | U12 | Move from goalkeeper or coach-start support angles to position-aware build-out solutions. | Salir jugando desde atrás |
| Support angles | U8 | Move from helping the player with the ball to creating multiple useful passing lines. | Ángulos de apoyo |
| Switch play | U12 | Move from seeing open opposite space to moving the opponent and changing the point of attack. | Cambiar el juego |
| Play through pressure | U12 | Move from first-touch escape to breaking lines through, around, or away from pressure. | Jugar bajo presión |

### 5.6 Finishing

| Specific focus | Start | Progression | Suggested Spanish |
| --- | --- | --- | --- |
| Finish from cutbacks | U12 | Move from arriving for a backward pass to timing runs and selecting finish type. | Finalizar tras pase atrás |
| Shoot early | U10 | Move from recognizing an open shot to finishing before pressure closes. | Rematar rápido |
| Rebounds | U8 | Move from following shots to coordinated second-action reactions in the box. | Rebotes |
| Combinations to finish | U12 | Move from simple wall passes to third-player and overload combinations near goal. | Combinaciones para finalizar |

### 5.7 Pressing

| Specific focus | Start | Progression | Suggested Spanish |
| --- | --- | --- | --- |
| Pressing triggers | U14 | Move from recognizing a bad touch or sideline moment to team pressing cues. | Señales para presionar |
| Force play wide | U12 | Move from curved individual pressure to coordinated pressure-cover that directs play. | Orientar el juego hacia afuera |
| Win the ball high | U14 | Move from aggressive pressure to coordinated high regains and quick chances. | Recuperar el balón en campo rival |
| Press and cover balance | U12 | Move from first and second defender roles to connected unit pressing. | Equilibrio entre presión y cobertura |

### 5.8 1v1 / Small-Sided Duels

| Specific focus | Start | Progression | Suggested Spanish |
| --- | --- | --- | --- |
| Beat the defender | U8 | Move from dribbling confidence to disguise, timing, and next action after the duel. | Superar al defensor |
| Defend 1v1 | U8 | Move from slowing down under control to angle, delay, recovery, and counter after regain. | Defender 1 contra 1 |
| Shield and escape | U8 | Move from protecting the ball to scanning, turning, and linking with support. | Proteger y escapar |
| Small-sided decision-making | U10 | Move from simple pass-or-dribble choices to transition and overload decisions. | Toma de decisiones en juegos reducidos |

### 5.9 Team Shape

| Specific focus | Start | Progression | Suggested Spanish |
| --- | --- | --- | --- |
| Compact defending | U12 | Move from staying connected to managing vertical and horizontal compactness. | Defender compactos |
| Attacking width | U10 | Move from spreading out to coordinated width that creates space inside. | Amplitud en ataque |
| Support underneath | U10 | Move from helping behind the ball to balancing risk and enabling the next action. | Apoyo por detrás del balón |
| Balance around the ball | U12 | Move from basic support positions to rest-defense and transition readiness. | Equilibrio alrededor del balón |

### 5.10 Game Understanding

| Specific focus | Start | Progression | Suggested Spanish |
| --- | --- | --- | --- |
| Scan before receiving | U8 | Move from looking before the ball arrives to repeated scanning and body orientation. | Escanear antes de recibir |
| Recognize pressure | U8 | Move from noticing a nearby opponent to choosing the best action for pressure direction. | Reconocer la presión |
| Choose when to pass or dribble | U8 | Move from a simple choice to reading space, support, opponents, and risk. | Elegir cuando pasar o conducir |
| Use space | U8 | Move from finding open space to creating, occupying, and exploiting space together. | Utilizar el espacio |

### 5.11 Physical / Reaction / Speed

| Specific focus | Start | Progression | Suggested Spanish |
| --- | --- | --- | --- |
| Reaction speed | U8 | Move from playful reaction games to soccer-specific response after a trigger, regain, or loss. | Velocidad de reacción |
| Acceleration | U8 | Move from first steps with the ball or toward space to repeated game-speed actions. | Aceleración |
| Change of direction | U8 | Move from balanced turning to escaping pressure and adjusting defensive movement. | Cambio de dirección |
| Recover quickly | U10 | Move from sprinting back to recovering with angle, awareness, and a defensive purpose. | Recuperar rápido |

## 6. Recommended Dropdown Changes And Clarifications

The current dropdown is a useful v1 inventory. Do not remove options casually. Improve clarity and
ordering before expanding the list.

### Keep

- Keep the current primary objectives and focuses as the v1 inventory.
- Keep `Custom` as a visible manual path.
- Keep age bands as recommendations, not hard restrictions.
- Keep similar-looking focuses when their tactical context differs.

For example:

- `Finishing from cutbacks` under `Attacking` is about creating the chance.
- `Finish from cutbacks` under `Finishing` is about executing the finish.
- `Win the ball back` under `Defending` is general regain behavior.
- `Win the ball high` under `Pressing` is a high-field collective pressing outcome.

### Clarify Later

Consider these label improvements in a later UI slice:

| Current label | Suggested clarification | Reason |
| --- | --- | --- |
| Transition to attack | Attacking transition | Common soccer terminology and easier Spanish alignment. |
| Transition to defend | Defensive transition | Common soccer terminology and easier Spanish alignment. |
| Possession / build up | Possession / build-up | Consistent compound spelling. |
| Physical / reaction / speed | Soccer movement / reaction / speed | Signals that this is soccer-action work, not isolated conditioning by default. |
| Counter attack quickly | Counterattack quickly | Consistent compound spelling. |

### Recommend Later

- Show age-recommended focuses first while keeping the full list available.
- Add stable internal IDs separate from English display labels.
- Support localized display labels without changing routing keys.
- Allow a coach to add a secondary focus later, but keep one primary focus as the routing anchor.
- Add short helper text when two focuses sound similar.

## 7. Golden Template Roadmap v1

Golden templates should be reviewed coaching examples with deterministic tests. A golden template
may define a full session, a single drill/activity, or an activity archetype that can appear inside
several sessions.

The roadmap should cover the objective inventory, not only one playground-game adaptation.

### Wave 1: Existing Strong Routes

Formalize and test the strongest current deterministic paths:

1. Reaction Chase Escape Gates
   - Supports reaction speed, scan before receiving, recognize pressure, shield and escape, and
     small-sided decision-making.
2. Defensive Transition Compact Recovery
   - Supports counterpress after losing the ball, recovery runs, protect central space, and delay
     the counter attack.
3. Press And Counter
   - Supports pressing triggers, force play wide, win the ball high, and press-cover balance.
4. Build-Out Through Pressure
   - Supports build from the back, support angles, play through pressure, and play out from own box
     after regain.
5. 1v1 Delay And Recover
   - Supports defend 1v1, pressure and cover, delay and recover, and recover quickly.
6. Finishing Waves
   - Supports shoot early, rebounds, combinations to finish, and finish from cutbacks.
7. Wide Overload Decision Game
   - Supports create chances, play forward, combination play, wide play, and attacking width.

### Wave 2: Inventory Coverage Expansion

Add reviewed templates for current focuses that need clearer distinct routes:

1. Secure Or Counter After Regain
2. Switch Play Through Width
3. Defend Wide Areas And Protect The Box
4. Compact Defending And Balance Around The Ball
5. Support Underneath To Progress
6. Cutback Chance Creation And Arrival
7. Small-Sided Pass-Or-Dribble Decisions

### Wave 3: Cultural-Game Soccer Adaptations

Add soccer-first activity archetypes inspired by familiar games:

1. Cat And Mouse Shield / Escape
2. Police And Robbers Press / Evade / Counter
3. Sharks And Minnows Dribble Through Pressure
4. King Of The Ring Shielding / Scanning
5. Numbers Game Quick Attack
6. Rondo To Finish

Each adaptation should translate the idea into soccer actions, decisions, safety rules, scoring, and
competition. Do not copy playground labels literally when they confuse the coaching purpose.

### Golden Template Definition

Each future golden template should define:

- taxonomy IDs
- recommended and adaptable age bands
- purpose
- setup
- how to start
- how to run it
- rules / scoring
- coaching cues
- what to watch for
- safety / space adjustment
- progression
- regression
- diagram setup
- diagram action
- local mini legend
- competitive close where appropriate
- Spanish terminology review
- deterministic regression fixture

## 8. How This Taxonomy Should Guide Future Brain Routing

The taxonomy should become a routing layer before Club Vivo adds broad generation complexity.

### Proposed Normalized Inputs

Future routing should normalize:

```text
sport
ageBand
primaryObjectiveId
specificFocusId
secondaryTags[]
coachNote
teamContext
environment
equipment[]
durationMin
sessionMode
```

### Proposed Routing Order

1. Preserve the coach's selected primary objective and specific focus.
2. Parse custom notes for additional soccer intents, constraints, and cultural-game inspiration.
3. Apply age-band guidance to language, complexity, numbers, space, and progressions.
4. Prefer an exact reviewed golden template when one exists.
5. Otherwise prefer a reviewed objective-family template with focus-specific language.
6. Otherwise use the current deterministic fallback path.
7. Validate duration, equipment, safety, section quality, and diagram readability.
8. Keep the coach-facing output concise and field-ready.

### Runtime Honesty

This routing order is a roadmap. The shipped backend does not yet have stable taxonomy IDs,
age-specific focus recommendation logic, or complete golden-template coverage.

The current implementation should continue improving through:

- small deterministic routes
- reviewed coaching examples
- regression fixtures
- explicit source-of-truth docs
- coach feedback

Future bounded AI assistance may help classify notes or draft variations after the curated taxonomy
and template library are strong enough. This document does not ship RAG, vector search, Bedrock,
autonomous agents, or model-training behavior.

## 9. Spanish And i18n Terminology Notes

### Product Rules

- Keep stable internal IDs separate from translated display labels.
- Translate coach-facing soccer meaning, not word-for-word English structure.
- Prefer neutral, widely understandable Spanish for the first translation pass.
- Review terminology with coaches from the target club or region before shipping.
- Allow club-level terminology preferences later without changing taxonomy IDs.
- Keep soccer as the English product term and `fútbol` as the default Spanish sport term.

### Primary Objective Terminology

| English | Suggested Spanish |
| --- | --- |
| Attacking | Ataque |
| Defending | Defensa |
| Transition to attack / Attacking transition | Transición ofensiva |
| Transition to defend / Defensive transition | Transición defensiva |
| Possession / build-up | Posesión / salida de balón |
| Finishing | Finalización |
| Pressing | Presión |
| 1v1 / small-sided duels | Duelos 1 contra 1 / juegos reducidos |
| Team shape | Estructura del equipo |
| Game understanding | Comprensión del juego |
| Soccer movement / reaction / speed | Movimiento / reacción / velocidad en fútbol |
| Custom | Personalizado |

### Translation Watchouts

- `Pressing` may remain familiar to many Spanish-speaking coaches, but `presión` should be the
  default localized label.
- `Build-up` can mean `salida de balón`, `construcción`, or `inicio de juego` depending on region
  and club methodology.
- `Cutback` is better explained as `pase atrás` or `pase retrasado` than left untranslated.
- `Scan` may be taught as `escanear`, `mirar antes de recibir`, or `perfilarse y observar`.
- `Shield` should be translated by coaching meaning, such as `proteger el balón`.
- `Counterpress` may be shown as `contrapresión` or `presionar tras perder el balón`.
- `Pinnies`, `bibs`, and local equipment words should remain club-configurable later.

## 10. Out Of Scope / Not Shipped Yet

This taxonomy does not ship:

- runtime taxonomy IDs
- age-aware dropdown ordering or filtering
- automatic age-band recommendations
- a database-backed activity library
- complete one-to-one runtime routing for every focus
- Spanish UI localization
- club-specific terminology settings
- methodology-driven automatic template selection
- RAG, FAISS, vector search, or tenant knowledge retrieval
- Bedrock-backed generation
- autonomous agents
- model training from coach feedback
- match analysis or Training Brief frontend lanes
- image-assisted intake
- multi-sport expansion

These may be considered later through separate product and implementation slices.

## 11. Next Implementation Slice

The next implementation slice should stay small:

1. Assign stable internal IDs to the current objective and focus inventory in a source-of-truth
   module or JSON document.
2. Keep current English labels unchanged in the UI while separating labels from routing keys.
3. Add age-band recommendation metadata without hiding options.
4. Select one Wave 1 golden template beyond Reaction Chase Escape Gates.
5. Add deterministic routing and regression coverage for that template.

This creates a measured path from the current dropdown to a richer soccer-learning system without
changing auth, tenancy, infrastructure, or data models.
