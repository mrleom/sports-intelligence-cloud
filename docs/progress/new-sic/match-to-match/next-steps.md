# Match-to-Match Future Next Steps

## 1. Evidence Intake

Define the evidence intake model before implementation.

Actions:

- list required and optional evidence fields
- distinguish last-match problem, next-opponent opportunity, coach preference, player availability, and training timeline
- define supported evidence lengths and validation rules
- define how evidence maps to team context without accepting client-supplied tenant identity
- test evidence examples with real coaches

## 2. Football Reasoning / 7Q

Define the 7Q football reasoning contract.

Actions:

- choose final coach-facing labels for the 7 football intelligence questions
- map each question to the existing 7Q categories where useful
- require answers to be specific to the submitted evidence
- avoid generic explanation cards
- define what a high-quality answer looks like for grassroots, academy, and competitive contexts

The reasoning should answer:

- What problem did we see?
- Why does it matter for the next match?
- Where can we attack or improve?
- Who needs to be involved?
- What behavior are we training?
- How should the activity look?
- How will the coach know it worked?

## 3. Training Prescription Output

Map 7Q answers to actual training output.

Actions:

- define recommended focus
- define one to three activity/drill/session options
- define coaching cues
- define success criteria
- define match preparation logic
- define diagram requirements
- define what changes by training timeline

The output must lead to useful training prescriptions, not only tactical explanation.

## 4. Session Builder Handoff

Define how reviewed Match-to-Match output enters Session Builder.

Actions:

- map prescription output to objective
- map prescription output to specific focus
- map prescription output to coaching note / activity idea
- map prescription output to duration
- map prescription output to environment and equipment assumptions
- keep generation as an explicit coach-reviewed step
- preserve Custom Build as the execution path

## 5. Backend/API/Persistence Decision

Do not add a route until the boundary is designed.

Actions:

- decide whether the first integration remains route-local/internal
- decide whether `/training-briefs` should exist at all
- define response contract
- define persistence lifecycle if persistence becomes necessary
- define observability events
- define failure modes
- define tenant/access behavior
- add tenant-safe route only after design

No API Gateway, IAM/CDK, DynamoDB, Cognito, auth, or tenancy changes should happen before this decision.

## 6. Testing With Coaches

Validate quality with real coaches before expanding the platform.

Actions:

- test common grassroots scenarios
- test competitive/team-specific scenarios
- test Spanish-language coach workflows later
- compare prescription output against what a strong coach would actually run
- check whether the prescription becomes a usable session, drill, or activity
- measure whether coaches trust the recommendation enough to review and adapt it

The feature should return only when it can produce practical coaching value, not just good-sounding reasoning.
