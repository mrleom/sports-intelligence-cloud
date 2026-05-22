# Match-to-Match Prototype Notes

## WIP Prototype Reference

- Branch: `training-brief-server-action-prototype`
- Commit: `e406d33`
- Purpose: prototype evidence only, not shipped runtime truth

## What The Prototype Demonstrated

The prototype showed that a route-local/internal server-action bridge can call the backend Training Brief candidate builder and return a candidate preview to the Match-to-Match UI.

It also showed that deterministic reasoning can be improved enough to recognize evidence such as:

- a scoring problem
- a weak opponent side
- a coach preference for competitive, game-like work

This is useful evidence for future design, but it is not production behavior.

## What Worked

Useful prototype outcomes:

- internal candidate preview pattern
- no public `/training-briefs` route
- no `/prescriptions` route
- no persistence
- no SessionPack generation from Training Brief
- 7Q-style reasoning displayed in the UI
- evidence-specific recommendation improved over generic timeline cards
- guardrail language stayed honest about review before handoff

## What Was Not Good Enough

The prototype also showed that the feature is larger than a small integration.

Problems:

- initial recommendations could be too generic
- explanation cards are not enough
- evidence must map into practical training actions
- the 7Q answers need a stronger contract
- output must become drills, activities, session structures, coaching cues, success criteria, and match preparation logic
- the review UX is not final
- API and persistence boundaries are not decided
- observability and tenant-safe route behavior are not designed

## Why It Should Not Be Merged Yet

The prototype should not be merged because Match-to-Match is becoming a major intelligence feature.

It needs:

- stronger product design
- stronger football reasoning contract
- clearer training prescription output
- coach-tested quality bar
- explicit API/persistence decision
- observability design
- tenant-safe integration design

Merging it now would risk making a prototype look like shipped Training Prescription automation.

## How To Return To It Later

Return to the prototype only after Session Builder core quality and Spanish experience are further along.

When returning:

1. Start from current `main`.
2. Re-read this folder.
3. Inspect the preserved WIP branch `training-brief-server-action-prototype` at commit `e406d33`.
4. Keep the useful internal candidate preview idea.
5. Redesign the output around real training prescriptions.
6. Decide whether the integration remains internal or needs an API.
7. Test with real coaches before expanding scope.

Do not resume it by simply merging the WIP branch.
