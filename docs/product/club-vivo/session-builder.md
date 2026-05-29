# SIC Session Builder — Product & Architecture Specification (High-Level)

**Status:** Living document (Knowledge + design brief)
**Primary goal:** Make the SIC platform immediately useful to coaches by generating training sessions tailored to real-world constraints, while collecting structured signals to power SIC’s long-term intelligence.

---

## 1) Executive Summary

SIC’s intro product is the **Session Builder**, a coach-facing generation surface that converts a coach’s **environment + constraints** into a **ready-to-run session pack** (and optionally a PDF).
Even though it may feel like “a unique tool per organization,” SIC should implement **one shared coach-facing platform capability** with **tenant-scoped configuration + tenant-scoped knowledge**, so every organization experiences the right workflow without separate deployments.

The current active frontend product is **Coach Workspace**. Session Builder remains the active planning wedge inside that coach-facing workspace, while **Club Workspace** is parked/future and should not be presented as an active frontend surface.

The active Coach Workspace shape is:

- Home as an About/orientation page, not a dashboard
- team-level program context
- team-level methodology defaults
- Custom Build as the everyday coach-led path
- Full Session and Drill / Activity modes inside Custom Build
- saved sessions and feedback foundations
- Teams, Equipment, and Methodology as supporting coach workspace areas
- Training Brief Draft, Match-to-Match Prescription, and image-assisted intake as parked/future frontend lanes

**Wedge message:**
> “Tell us what you have today (players, space, cones, balls, time, goal). We’ll design a session you can run now.”

---

## 2) Target Users & Use Cases

### Target users
- Grassroots youth coaches (primary)
- Club/academy coaches and assistants
- School teams and municipal programs
- Performance staff (later)

### Core use cases
1) **Generate a session** from constraints (players/equipment/space/time).
2) **Iterate**: “Make it easier/harder”, “switch to finishing”, “weather is bad”.
3) **Export**: printable PDF/session pack.
4) **Save**: store sessions per team/coach (tenant-scoped).
5) **Feedback loop**: “We ran it; here’s what worked.”
6) **Coach Workspace direction**: guide first-time setup, then let returning coaches start from a team-aware session-builder flow.

Current runtime shape:

- **Coach Workspace** is the current active frontend product.
- **Club Workspace** is parked/future and should not be shown as an active frontend offer.
- **Home** is an About/orientation page for the coach workspace, not a dashboard.
- **Custom Build** is the everyday coach-led builder.
- Custom Build includes **Full Session** and **Drill / Activity** modes.
- Full Session supports 45-120 minutes.
- Drill / Activity supports 15-25 minutes.
- **Quick Activity** no longer lives as a separate Home feature; the active short-form path is Session Builder **Drill / Activity** mode with the coaching note / activity idea field.
- Session Builder is currently deterministic/template-based unless runtime code proves a narrower generated behavior exists.
- **Training Brief Draft** backend foundations may remain for future reuse, but the frontend lane is parked.
- **Image-analysis** backend foundations may remain for future reuse, but image-assisted intake is parked as a frontend lane.
- **DiagramSequence** is proposed architecture for structured diagram intent and future animation data.
- **Match-to-Match Prescription** is parked/future frontend direction only; there is no active Match-to-Match runtime behavior.
- **Session Feedback** remains a foundation for future learning-loop interpretation; this is not model training, autonomous-agent behavior, dashboards, or analytics.
- Future source-of-truth direction: add a small "playground games to soccer activities" library, not a database yet. Examples include duck duck goose, cat and mouse, and police and robbers. The purpose is to transform familiar cultural games into soccer activities using reaction, scanning, first touch, chase/escape, gates, safe spacing, and short competitive rounds.

---

## 3) Inputs (Coach Environment Model)

The chatbot collects or infers (short form + chat refinement):

### Required (minimum viable)
- **Sport** (Club Vivo active scope is soccer; other sports are future scope)
- **Age group / level** (U8/U12/HS/adult)
- **Athletes count** (e.g., 20)
- **Time available** (e.g., 75 minutes)
- **Space** (grass/turf/indoor; full/half/small)
- **Equipment essentials** (cones, balls; optional others)
- **Session focus** (passing under pressure, pressing, finishing, speed)

### Optional / high-value
- Staff count (coaches/assistants)
- Space dimensions (meters/yards) or “small/medium/full”
- Equipment details (goals, bibs, ladders, poles, hurdles)
- Constraints (injuries, weather, shared field, limited balls)
- Team style preferences (possession/direct, intensity, etc.)

### Example prompt
> “20 U12 players, 10 cones, 5 balls, grass field, 75 minutes, focus on passing under pressure.”

---

## 4) Outputs (Session Pack Contract)

SIC should return a **deterministic, structured plan** that is easy to run, with consistent formatting.

### SessionPack (high-level schema)
- `title`
- `sport`, `ageGroup`, `level`
- `durationMinutes`
- `equipment[]`
- `space` (type + size)
- `intensity` (low/medium/high)
- `objective` (1–2 sentences)
- `activities[]` (ordered)
  - `name`
  - `minutes`
  - `setup`
  - `instructions`
  - `coachingPoints[]`
  - `progressions[]`
  - `regressions[]`
  - `commonMistakes[]` (optional)
  - `organization` (groups/rotations)
- `cooldown` (optional block)
- `safetyNotes[]`
- `successCriteria[]` (how coach knows it worked)
- `assumptions[]` (what SIC assumed if inputs missing)
- `export`
  - `pdfUrl` (short TTL) (optional)
  - `ttlSeconds`

**Quality invariants**
- Total minutes **must equal** requested duration.
- Equipment list must match the plan.
- Age-appropriate load + safety defaults (warm-up/cool-down).
- Output must be readable even without diagrams.

---

## 5) Conversation Design (Intake Flow)

### Default flow (fast)
1) Returning coach lands in the Session Builder area.
2) Coach selects team and confirms today’s constraints.
3) SIC asks **only missing essentials** (max 3 questions).
4) SIC generates the session pack.
5) SIC offers quick edits:
   - “Harder/easier”
   - “More small-sided”
   - “Add finishing”
   - “Indoor version”
6) Coach saves + exports.

### First-time coach direction

When the coach does not yet have workspace context, SIC should guide a one-time setup flow before normal repeat usage.

That setup direction should stay lightweight and focus on:

- coach setup basics
- one or more teams
- team-level program context
- age context
- practical defaults such as environment and equipment, while duration stays request-owned per generation request

This remains product direction for Week 21, not a claim that all of those durable surfaces are already shipped.

### Question set (when info missing)
- Sport?
- Age/level?
- Players count?
- Time available?
- Space type/size?
- Equipment list?
- Focus (skill/tactical/physical)?

### Fallback assumptions (transparent)
If omitted, SIC assumes:
- medium space
- cones + balls present
- standard warm-up & cool-down
- moderate intensity for youth
and lists these under `assumptions[]`.

---

## 6) Tenant Customization (How every org gets a “unique bot”)

SIC runs **one bot platform**, with these tenant-scoped customizations:

### TenantBotConfig (stored per tenant)
- `defaultSportPack` (soccer/basketball/etc.)
- `terminology` (e.g., “pinnies” vs “bibs”)
- `sessionTemplate` (format preferences)
- `safetyPolicyOverrides` (stricter youth rules, max intensity caps)
- `branding` (logo/colors for exports, later)
- `knowledgeSources` (allowed docs; tenant-scoped)

### Team-level workspace direction

Within the tenant, Session Builder should increasingly use team context as the main product lever for tenant-specific behavior. KSC is the current pilot/example tenant, not shared platform truth.

Near-term Coach Workspace direction:

- `programType = travel | ost`
- optional `playerCount`
- team-level methodology defaulting
- team-level age context

Current repo grounding:

- Team now supports optional durable `programType` and optional durable `playerCount`
- selected-team server context already exists for internal Session Builder lookup/resolution
- public `POST /session-packs` remains unchanged
- `durationMin` remains request-owned and is not inherited from Team

This should happen inside the existing shared app and shared tenant-safe product path.

### Future Tenant Knowledge (Parked)
- club playbook, philosophy, drill library
- field availability and facility constraints
- equipment inventory defaults

This is future direction only. RAG, FAISS/vector search, and tenant knowledge retrieval are not active shipped Session Builder runtime behavior. Any future retrieval would need a separate product decision and must remain stored/queryable **within tenant boundary**.

---

## 7) Safety & Policy Guardrails

### Hard constraints
- Age-appropriate training load; include warm-up/cool-down defaults.
- No medical diagnosis or treatment advice.
- If injury/condition mentioned: recommend professional guidance + safe modification.
- Don’t propose drills that require equipment not available.

### Content boundaries
- No unsafe/illegal instructions.
- No personal data exposure.
- Avoid claiming guaranteed performance outcomes.

---

## 8) SIC Architecture (High-Level)

### Design principle
**One shared coach-facing capability** in the SIC platform with:
- **Tenant-scoped auth context** → **tenant-scoped data access** → **tenant-scoped knowledge**.
- The product never trusts tenant identifiers from the client.

---

## 9) Reference Architecture (Logical Components)

### A) Client / UI
- **Coach Portal** (web): login → session-builder intake → session output → save/export
- Optional: mobile later

### B) API Layer (SIC platform)
- **API Gateway** + authorizer (Cognito/JWT)
- Request enters SIC with verified identity context

### C) Core Services (domain-aligned)
- **Session Builder Service**
  - Accepts coach message + structured intake
  - Uses deterministic/template-based generation in the current runtime shape unless source code proves otherwise
  - May later use bounded generation from sport pack + tenant config + safety policy
  - Stores conversation/session artifacts
- **Session Pack Service**
  - Validates minutes, structure, equipment
  - Deterministic padding/normalization rules
  - Generates PDFs via export subsystem (short TTL URLs)
- **Clubs/Teams/Membership (RBAC)**
  - Determines permissions and personalization scope
  - “Who can save for a team?” etc.
- **Future Knowledge Service (parked)**
  - Tenant-scoped retrieval of docs/snippets
  - Enforces per-tenant knowledge boundaries
- **Entitlements / Tenant Context**
  - Builds authoritative `tenantCtx` from verified auth + entitlements store

### D) Data Stores (tenant-scoped by construction)
- DynamoDB (single-table or domain tables) with `PK=TENANT#<tenantId>`
- S3 for exports (tenant prefix + short TTL presigned URLs)
- Optional future vector store (OpenSearch/pgvector/etc.) tenant-scoped only if product need and an explicit decision justify it

### E) Observability
- CloudWatch logs with correlation IDs
- Metrics:
  - generation success/failure
  - latency
  - export success
  - validation failures
- Alarms on 5xx spikes; avoid noisy 4xx alerts

---

## 10) End-to-End Request Flow (Tenant-Safe)

1) Coach logs in → obtains JWT.
2) UI calls `POST /chat` or `POST /session-packs` with message + constraints.
3) Handler calls `buildTenantContext(event)`:
   - verifies identity + loads entitlements
   - derives `tenantCtx.tenantId` and role
4) Session Builder loads tenant-safe context needed for the request.
5) Current deterministic/template-based generation produces a draft session pack.
6) Future bounded generation or retrieval may be introduced only when product need and tenant-safe contracts justify it.
7) Session Pack Service validates:
   - minutes sum matches duration
   - equipment feasibility
   - schema validity
8) Result stored under tenant-scoped keys and returned to UI.
9) Optional: PDF export stored at `s3://.../tenant/<tenantId>/...` and returned via short TTL URL.

**Critical rule:** Tenant scoping is never derived from request body/query/headers.

**Duration ownership rule:** `durationMin` remains request-owned. Quick Session duration comes from the coach prompt, and Session Builder duration comes from the current builder request. Team may carry durable context such as `programType` and `playerCount`, but not duration.

---

## 11) API Surface (Suggested)

### Chat / Orchestration
- `POST /chat` (message + optional structured constraints) → `assistantReply + sessionPack?`

### Session Packs
- `POST /session-packs` → session pack (validated)
- `GET /sessions` / `GET /sessions/{id}` (tenant-scoped)
- `GET /sessions/{id}/pdf` (short TTL presigned URL)

### Governance
- `POST /clubs`, `GET /clubs`
- `POST /teams`, `GET /teams`
- Membership endpoints (next phase)

Coach-admin direction remains intentionally narrow:

- methodology ownership and updates should remain controlled
- coach-admin capability should stay inside the shared tenant-scoped app direction
- Week 21 should document this direction without implying a full admin workspace is already shipped

---

## 12) Data Model (Suggested Items)

All items tenant-scoped by construction:
- `PK = TENANT#<tenantId>`

Examples:
- Club: `SK = CLUB#<tenantId>`
- Team: `SK = TEAM#<teamId>`
- Session: `SK = SESSION#<sessionId>`
- SessionPack: `SK = SESSIONPACK#<id>`
- Conversation: `SK = CONVO#<id>`
- Bot config: `SK = BOTCFG#DEFAULT`

---

## 13) Quality & Testing Strategy

### Unit tests (must-have)
- Tenant context ignores spoofed tenant inputs
- Repositories build PK/SK from tenantCtx only
- SessionPack validation: minutes sum/padding
- PDF key derivation is tenant-scoped

### Integration (later)
- End-to-end generation with mocked model responses
- Export pipeline smoke tests

---

## 14) Success Metrics (Intro Wedge)

- Activation: % of coaches generating first session
- Retention: sessions generated per coach/week
- Conversion: invites / team workspace adoption
- Quality: “ran this session” confirmations + ratings
- Safety: low rate of “unsafe content” flags

---

## 15) Roadmap Fit

Session Builder sits on SIC's core:
- Auth + entitlements → clubs/teams/membership/RBAC → session generation → exports → analytics

It is the adoption surface that makes SIC valuable immediately while building the structured data foundation.

Week 21 keeps that foundation intact while moving the product direction from narrow Session Builder toward a more realistic Coach Workspace:

- Coach Workspace as the current active frontend product
- Home as About/orientation rather than a dashboard
- team-aware generation context
- methodology-aware defaults
- Custom Build with Full Session and Drill / Activity modes
- Quick Activity folded into Drill / Activity mode and coaching notes / activity idea
- Training Brief Draft parked as a frontend lane while backend foundations remain reusable
- image-assisted intake parked as a frontend lane while backend foundations remain reusable
- structured diagram intent / DiagramSequence as the proposed diagram path
- Coach Feedback as the future learning-loop signal
- Match-to-Match Prescription parked for later with no active runtime behavior
- Club Workspace parked/future
- coach-admin governance direction

---

## Appendix: “Sport Packs” Concept (Template Library)
A Sport Pack is a curated set of:
- drill archetypes
- coaching language
- age constraints
- common session structures
Used as a template, not a separate bot deployment.
