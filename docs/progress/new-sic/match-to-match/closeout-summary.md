# Match-to-Match Prescription Closeout Summary

## Branch / Theme

Branch:

`match-to-match-feature-parking`

Theme:

Park Match-to-Match Prescription as a future high-level intelligence feature and return product focus to finishing Session Builder.

## Summary

Match-to-Match Prescription remains an important future Club Vivo direction, but the latest prototype made clear that it should not be squeezed into the current product as a shallow recommendation card.

The feature needs to become a true intelligence layer that converts match evidence into practical training prescriptions.

Current `main` truth remains narrow:

- Match-to-Match is frontend-only deterministic draft preview unless a future PR changes that.
- Training Brief backend foundation exists as internal validator, handoff mapper, and candidate builder.
- There is no public `/training-briefs` route.
- There is no `/prescriptions` route.
- There is no persistence.
- There is no SessionPack generation from Training Brief.
- There is no production Match-to-Match backend automation.

## What Was Learned

The prototype exposed the key product quality bar.

Reasoning alone is not enough.

SIC must convert evidence into practical training work:

- training actions
- drills
- activities
- session structures
- coaching cues
- success criteria
- match preparation logic

Match-to-Match should eventually answer the 7 football intelligence questions at a high standard:

- What problem did we see?
- Why does it matter for the next match?
- Where can we attack or improve?
- Who needs to be involved?
- What behavior are we training?
- How should the activity look?
- How will the coach know it worked?

Those answers must lead to actual training prescriptions, not just explanation cards.

## WIP Prototype Reference

- Branch: `training-brief-server-action-prototype`
- Commit: `e406d33`
- Purpose: prototype evidence only, not shipped runtime truth

The WIP prototype should not be merged as-is.

It is useful evidence for future product design and quality expectations.

## What Is Not Shipped

This parking work does not ship:

- public `/training-briefs`
- `/prescriptions`
- persisted Training Brief records
- persisted prescription records
- SessionPack generation from Training Brief
- production Match-to-Match backend automation
- new backend service
- new app
- auth changes
- tenancy changes
- IAM/CDK changes
- API Gateway changes
- DynamoDB changes
- Cognito changes
- infrastructure changes

## Why We Are Parking It

Match-to-Match is becoming a major intelligence feature.

It should not distract from the immediate product wedge.

The core Session Builder product must be completed first. The Spanish app experience must be completed. AI/RAG architecture should be introduced only after the product wedge is solid and there is a real methodology/session knowledge base need.

Parking the feature keeps the learning without over-expanding the platform too early.

## Guardrails Preserved

This decision preserves:

- tenant isolation
- server-derived tenant context
- no client-provided tenant identity fields
- validation before route/API/persistence
- no unreviewed AI/generation path
- no raw generated diagrams as authoritative artifacts
- no new infrastructure before proof of value

## Next Focus: Session Builder Completion

The next product focus should be:

- finish Session Builder core product
- improve generated activities/drills/session quality
- complete Spanish translation/localization
- prepare AI integration thoughtfully
- add RAG only if needed for a real methodology/session knowledge base
- then move to deployment/domain polish

## Next-Session Starting Point

Start from current `main`.

Do not resume the Match-to-Match prototype unless the session goal is explicitly future intelligence design.

Recommended next branch:

```text
session-builder-core-completion
```

First inspect:

- current Session Builder user flow
- generated activity/drill quality
- Spanish/localization gaps
- deployment readiness docs

The next session should improve the product wedge before returning to Match-to-Match.
