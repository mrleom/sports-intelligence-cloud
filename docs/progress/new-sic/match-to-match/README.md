# Match-to-Match Prescription Parking Notes

## Status

Match-to-Match Prescription is parked as a future high-level intelligence feature.

These notes preserve the prototype learning without claiming the WIP prototype is shipped runtime behavior.

## Current Main Runtime Truth

Current `main` runtime truth remains:

- Match-to-Match is frontend-only deterministic draft preview unless a future PR changes that.
- Training Brief backend foundation exists as internal validator, handoff mapper, and candidate builder.
- There is no public `/training-briefs` route.
- There is no `/prescriptions` route.
- There is no Training Brief or prescription persistence.
- There is no SessionPack generation from Training Brief.
- There is no production Match-to-Match backend automation.

## WIP Prototype Reference

- Branch: `training-brief-server-action-prototype`
- Commit: `e406d33`
- Purpose: prototype evidence only, not shipped runtime truth

Do not merge or describe this prototype as production behavior without a new implementation decision and review.

## Why It Is Parked

The prototype showed that Match-to-Match is becoming a major intelligence feature, not a small UI addition.

Reasoning alone is not enough. SIC must convert evidence into:

- practical training actions
- drills
- activities
- session structures
- coaching cues
- success criteria
- match preparation logic

Match-to-Match should eventually answer the 7 football intelligence questions at a high standard, but those answers must lead to actual training prescriptions, not just explanation cards.

## Product Focus Now

The next product focus returns to:

- finishing Session Builder core product
- improving generated activities, drills, and session quality
- Spanish translation/localization
- preparing AI integration thoughtfully
- adding RAG only if needed for a real methodology/session knowledge base
- deployment and domain polish after the wedge is solid

## Parking Folder

Read this folder with:

- `closeout-summary.md`
- `next-steps.md`
- `prototype-notes.md`
