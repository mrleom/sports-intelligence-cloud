# Club Vivo Web App

`apps/club-vivo` is the active Next.js coach-facing web app for Sports Intelligence Cloud.

SIC is the platform. Club Vivo is the current product and app surface. KSC is pilot context, not the app identity.

## What Belongs Here

- Next.js routes and layouts for the Club Vivo web app.
- Coach-facing UI components.
- Frontend API clients and app-local helpers.
- Frontend TypeScript types used by the app.

## What Should Not Go Here

- Backend Lambda handlers.
- CDK stack definitions.
- API contract docs.
- KSC-only product docs.
- Historical progress notes.

## Important Routes

- Public entry:
  - `app/page.tsx`
- Auth routes:
  - `app/login/page.tsx`
  - `app/login/start/route.ts`
  - `app/callback/route.ts`
  - `app/logout/route.ts`
- Protected app shell:
  - `app/(protected)/layout.tsx`
  - `components/coach/CoachAppShell.tsx`
  - `components/coach/CoachPrimaryNav.tsx`
- Coach workspace:
  - `app/(protected)/home/page.tsx`
  - `app/(protected)/sessions/quick/page.tsx`
  - `app/(protected)/sessions/new/page.tsx`
  - `app/(protected)/sessions/page.tsx`
  - `app/(protected)/sessions/[sessionId]/page.tsx`
  - `app/(protected)/teams/page.tsx`
  - `app/(protected)/equipment/page.tsx`
  - `app/(protected)/methodology/page.tsx`

## Important Folders

- `app/`
  - Next.js App Router routes.
- `components/coach/`
  - Shared coach workspace UI.
- `lib/`
  - Auth helpers, API clients, Session Builder helpers, Quick Soccer Game display helpers, current Quick Session source helpers, and browser-local planning hints.
- `lib/types/`
  - Frontend TypeScript types for generated session packs and drill diagrams.

## Local Commands

From `apps/club-vivo`:

- `npm run dev`
  - Start the local Next.js dev server.
- `npm run build`
  - Build the app.
- `npx tsc --noEmit`
  - Frontend typecheck.

On Windows, the project has commonly run typecheck as:

```powershell
cmd /c npx tsc --noEmit
```

## Change Rules

- Keep Quick Soccer Game and Session Builder as shared-app lanes. Current source may still use Quick Session names for routes, helpers, and saved origin hints until a separate rename decision.
- Do not make KSC-specific behavior the generic app model.
- Do not add client-supplied tenant identity paths.
- Keep backend API behavior in `services/club-vivo/api`.
- Keep infrastructure changes in `infra/cdk`.
