# Club Vivo Scientific Article Outline

## Status

Draft research outline.

This outline is for a future article or study design. It should not be read as evidence that Club Vivo has completed formal scientific validation.

## Working Title

Club Vivo: A Tenant-Safe SaaS Workflow For Constraint-Aware Soccer Session Planning In Grassroots And Nonprofit Coaching Contexts

## Article Type

Suggested formats:

- design science paper
- case study
- human-centered computing paper
- sports coaching technology paper
- nonprofit sport operations paper

## Central Thesis

Grassroots and nonprofit soccer coaches need practical planning support that respects real-world constraints. A tenant-safe SaaS workflow can help coaches create more consistent, usable sessions while preserving club data boundaries and avoiding claims of automated expertise beyond the validated product surface.

## Research Questions

1. Can a structured session-planning workflow reduce coach planning friction in grassroots soccer settings?
2. Can constraint-aware templates produce sessions coaches perceive as runnable and age-appropriate?
3. Does a fast game-creation lane help coaches respond to time pressure without abandoning quality?
4. Can tenant-safe SaaS architecture support program-level consistency while preserving data isolation?
5. What feedback signals are useful for improving future coaching workflows without claiming automated model training or autonomous decision-making?

## Background Sections

### Grassroots Coaching Constraints

Discuss:

- volunteer coaching
- low planning time
- inconsistent equipment
- shared field space
- mixed age and skill levels
- need for practical session structure

### Digital Coaching Tools

Discuss:

- generic planning tools
- limitations of unstructured text generation
- need for coach review
- importance of explicit constraints
- value of saved and reusable session artifacts

### SaaS Architecture For Club Programs

Discuss:

- multi-tenant SaaS
- authenticated access
- entitlements
- tenant-scoped data
- fail-closed authorization
- operational observability

## System Description

Describe Club Vivo as the product and SIC as the platform foundation.

Current source-grounded product surfaces:

- Coach Workspace
- Session Builder
- Quick Soccer Game as the Chapter 2 fast creative lane
- Teams
- Equipment Essentials
- Methodology
- Sessions library
- Saved-session feedback
- PDF export

Do not describe future or parked concepts as shipped runtime.

## Methodology

Suggested study design:

- small pilot with nonprofit or grassroots soccer coaches
- pre-use survey about planning time and confidence
- guided onboarding to Club Vivo
- coach creates a full session with Session Builder
- coach creates one quick activity through Quick Soccer Game
- coach reviews, saves, and optionally exports the output
- coach runs or simulates the session
- post-use survey and interview

## Measures

### Quantitative

- time to first generated session
- time to first quick soccer game
- number of sessions saved
- number of sessions exported
- number of feedback submissions
- self-reported planning confidence before and after
- perceived runnability score
- perceived age fit
- perceived equipment fit

### Qualitative

- coach trust
- clarity of instructions
- usefulness of diagrams
- perceived safety
- fit with program methodology
- friction in team/equipment/context setup
- moments where coach judgment overrode the generated plan

## Ethical And Safety Considerations

Include:

- Club Vivo supports coach judgment; it does not replace it.
- The system should avoid medical diagnosis or treatment advice.
- Coaches remain responsible for final session decisions.
- Youth sport context requires safe, age-aware activity design.
- Tenant data must remain isolated.
- Research data collection requires consent and privacy review.

## Architecture Considerations

Explain the tenant-safety model:

- verified auth
- authoritative entitlements
- server-built tenant context
- tenant-scoped DynamoDB keys
- tenant-scoped storage paths
- no client-supplied tenant identity
- fail-closed behavior

## Non-Claims And Limits

The article should not claim:

- Training Brief is shipped runtime behavior.
- DiagramSequence is shipped runtime behavior.
- RAG or vector search is deployed.
- Autonomous agents are deployed.
- Bedrock production generation is deployed.
- Image analysis is part of the Chapter 2 product story.
- Club Vivo has been scientifically validated before a study is completed.

## Expected Contributions

Potential contributions:

- a practical SaaS workflow model for grassroots coaching support
- a product framing for constraint-aware session planning
- an evaluation approach for coach-facing planning tools
- a tenant-safety framing for club and nonprofit sports software
- design guidance for balancing fast creative tools with structured planning

## Proposed Structure

1. Introduction
2. Grassroots soccer coaching problem
3. Related work
4. System overview: Club Vivo on SIC
5. Product workflow: Session Builder and Quick Soccer Game
6. Tenant-safe architecture
7. Pilot study design
8. Evaluation measures
9. Limitations and non-claims
10. Discussion
11. Conclusion

## Future Work

Future work can study:

- coach feedback interpretation
- template quality improvement
- methodology consistency across programs
- contribution models for public-safe coaching content
- longitudinal effects on planning behavior

Any future technical expansion should be evaluated separately and should preserve tenant isolation.
