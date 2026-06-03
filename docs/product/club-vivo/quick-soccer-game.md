# Quick Soccer Game

## Status

Draft Chapter 2 product story.

Quick Soccer Game is the Chapter 2 name for the fast creative lane that grows out of Quick Session. This document describes product direction only. It does not rename code, routes, Lambdas, DynamoDB keys, or public API contracts.

## Product Idea

Quick Soccer Game helps a coach turn a simple idea into a playable soccer activity quickly.

It is for moments like:

- "Give me a 20-minute passing game for U10."
- "Make duck duck goose into a soccer activity."
- "I have 8 players, cones, and one ball."
- "I need a warm-up game before practice starts."
- "Make this more fun but still useful."

The product posture is fast, playful, and coach-ready. It should still return soccer coaching structure, not generic party-game text.

## Relationship To Session Builder

Quick Soccer Game should stay inside the shared Club Vivo workflow.

Current source grounding:

- The current `/sessions/quick` route redirects into `/sessions/new` with notes and a short duration.
- Current Quick Session helpers reuse the shared Session Builder generation and save paths.
- Backend generation reuses `POST /session-packs`.
- Saving reuses `POST /sessions`.

Chapter 2 should preserve that architecture. Quick Soccer Game is not a separate backend product.

## What Makes It Different

Session Builder is deliberate.

Quick Soccer Game is immediate.

The lane should emphasize:

- one prompt or one short idea
- short duration
- simple rules
- clear setup
- soccer constraints
- playful engagement
- easy/harder variations
- safe spacing
- quick coach review before saving

It should avoid asking the coach to complete the full builder form unless the coach chooses to move into the deeper Session Builder flow.

## Minimum Input Contract

Quick Soccer Game should be able to produce a simple game idea from three minimum inputs:

- age band or team age context
- number of players
- space or location

Recommended inputs:

- duration
- available equipment
- desired focus
- team context

If duration, equipment, or focus are missing, Club Vivo should make safe, transparent assumptions instead of blocking the coach.

## Expected Output Shape

A Quick Soccer Game output should include:

- game title
- age band or team context when available
- duration
- players and equipment assumptions
- setup
- rules
- scoring
- coaching points
- progression
- regression
- safety or spacing note
- simple diagram support when available through existing diagram rendering

It should be shorter than a full Session Builder output, but it should still be coach-ready.

## Naming Guidance

Use "Quick Soccer Game" in Chapter 2 product docs and product narrative.

Use "Quick Session" only when referring to current source files, route names, helper names, existing saved-session origin hints, or historical notes.

Examples:

- Product story: "Quick Soccer Game gives a coach a fast, playful activity lane."
- Source map: "Current Quick Session source lives under `apps/club-vivo/app/(protected)/sessions/quick/`."

## Non-Goals

Quick Soccer Game does not introduce:

- a separate backend service
- a separate Lambda
- a new auth or tenancy path
- a new public API contract
- a separate data model
- a game engine
- a claims-heavy AI product story
- a separate product identity outside Club Vivo

## Quality Bar

A good Quick Soccer Game should be:

- fast to understand
- safe to run
- soccer-specific
- equipment-aware
- age-aware
- easy to adapt
- more playful than a full planned session
- still useful for a real coach

## Chapter 2 Fit

Quick Soccer Game gives Club Vivo a lighter creative lane while Session Builder remains the main product wedge.

That matters because many grassroots coaches do not need a complete practice plan every time. Sometimes they need one game that fits today's players, space, and equipment. Quick Soccer Game should meet that need without weakening the shared Club Vivo/SIC platform foundation.
