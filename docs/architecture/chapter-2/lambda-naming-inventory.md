# Lambda Naming Inventory

## Status

Draft Chapter 2 inventory.

This inventory records current Lambda names and handler relationships from `infra/cdk/lib/sic-api-stack.ts` and `infra/cdk/lib/sic-auth-stack.ts`. It does not propose renames. Deployed Lambda names must not be changed as part of the Chapter 2 reset.

## Naming Rule

Preserve deployed Lambda names.

Product docs may shift from Quick Session to Quick Soccer Game, but that product-story change must not force Lambda, route, public contract, or durable key renames.

## Environment Placeholder

CDK derives `envName` from context:

```text
const envName = this.node.tryGetContext("env") ?? "dev";
```

Names below use `${envName}`. In dev, `${envName}` resolves to `dev`.

## Club Vivo API Lambdas

| CDK construct | Function name pattern | Handler | Current route family |
| --- | --- | --- | --- |
| `MeFn` | `sic-club-vivo-me-${envName}` | `me/handler.handler` | `GET /me` |
| `AthletesFn` | `sic-club-vivo-athletes-${envName}` | `athletes/handler.handler` | `/athletes` |
| `SessionsFn` | `sic-club-vivo-sessions-${envName}` | `sessions/handler.handler` | `/sessions` |
| `TemplatesFn` | `sic-club-vivo-templates-${envName}` | `templates/handler.handler` | `/templates` |
| `SessionPacksFn` | `sic-club-vivo-session-packs-${envName}` | `session-packs/handler.handler` | `POST /session-packs` |
| `TeamsFn` | `sic-club-vivo-teams-${envName}` | `teams/handler.handler` | `/teams` |
| `MethodologyFn` | `sic-club-vivo-methodology-${envName}` | `methodology/handler.handler` | `/methodology/{scope}` |

## API Gateway Routes By Lambda

### `sic-club-vivo-me-${envName}`

- `GET /me`

### `sic-club-vivo-athletes-${envName}`

- `POST /athletes`
- `GET /athletes`
- `GET /athletes/{athleteId}`

### `sic-club-vivo-sessions-${envName}`

- `POST /sessions`
- `GET /sessions`
- `GET /sessions/{sessionId}`
- `GET /sessions/{sessionId}/pdf`
- `POST /sessions/{sessionId}/feedback`

### `sic-club-vivo-templates-${envName}`

- `POST /templates`
- `GET /templates`
- `POST /templates/{templateId}/generate`

### `sic-club-vivo-session-packs-${envName}`

- `POST /session-packs`

Session Builder and current Quick Session source reuse this route family. Chapter 2 product docs may call the fast lane Quick Soccer Game, but the Lambda and public route stay unchanged unless a later explicit contract and deployment decision changes them.

### `sic-club-vivo-teams-${envName}`

- `POST /teams`
- `GET /teams`
- `GET /teams/{teamId}`
- `PUT /teams/{teamId}`
- `GET /teams/{teamId}/sessions`
- `POST /teams/{teamId}/sessions/{sessionId}/assign`

The Teams handler source also contains attendance and weekly-planning handlers and tests, but those routes were not found in the current CDK route list during this reset pass.

### `sic-club-vivo-methodology-${envName}`

- `GET /methodology/{scope}`
- `PUT /methodology/{scope}`
- `POST /methodology/{scope}/publish`

## Auth Trigger Lambdas

| CDK construct | Function name pattern | Handler | Trigger |
| --- | --- | --- | --- |
| `PostConfirmationFn` | `sic-post-confirmation-${envName}` | `handler.handler` in `services/auth/post-confirmation` | Cognito post confirmation |
| `PreTokenGenerationFn` | `sic-pre-token-generation-${envName}` | `handler.handler` in `services/auth/pre-token-generation` | Cognito pre token generation |

## Source Present But Not Currently CDK-Wired

These handler folders exist in source but were not found in the current `SicApiStack` route wiring:

- `services/club-vivo/api/clubs`
- `services/club-vivo/api/memberships`
- `services/club-vivo/api/exports-domain`
- `services/club-vivo/api/lake-ingest`
- `services/club-vivo/api/lake-etl`

Do not delete them. Do not rename them. Do not present them as active deployed Club Vivo route families without later CDK and deployment evidence.

## Naming Implications For Chapter 2

Allowed:

- Product docs can introduce Quick Soccer Game as the new Chapter 2 fast creative lane.
- Architecture docs can explain that Quick Soccer Game currently maps onto the existing shared Session Builder route family.
- UI copy may be reviewed later after product approval.

Not allowed in this reset:

- Renaming `sic-club-vivo-session-packs-${envName}`.
- Renaming API Gateway routes.
- Renaming handler folders.
- Renaming auth trigger Lambdas.
- Changing public API contracts.
- Changing CDK/IAM/auth/tenancy/entitlement behavior.
