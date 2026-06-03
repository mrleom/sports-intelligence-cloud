# Club Vivo Nonprofit SaaS One-Page

## What Club Vivo Is

Club Vivo is a soccer coaching SaaS product for clubs, academies, and nonprofit sports programs.

It helps coaches turn today's real constraints into a session or quick soccer game they can actually run.

## Problem

Many nonprofit sports programs rely on coaches who are busy, part-time, volunteer, or still developing their coaching style.

They often plan with:

- limited time
- changing player counts
- shared fields
- limited equipment
- mixed skill levels
- pressure to keep sessions safe, fun, and useful

Generic coaching advice is not enough. Coaches need practical plans that fit today's players, space, time, and equipment.

## Solution

Club Vivo gives coaches a simple workspace for planning and reuse.

The core product is Session Builder, which helps create coach-ready soccer sessions from practical inputs.

Quick Soccer Game is the fast lane for one playable activity when a coach needs something simple and engaging quickly.

## Key Features

- Session Builder for full sessions and shorter activity ideas.
- Quick Soccer Game for fast, playful soccer activities.
- Saved sessions for reuse and review.
- Coach feedback to capture what worked.
- Team context for repeat planning.
- Export support for sharing or printing session plans.
- Equipment and methodology context where source-verified or near-term.

## Architecture Trust Points

Club Vivo runs on Sports Intelligence Cloud, a tenant-safe AWS SaaS platform foundation.

Trust points:

- Cognito authentication.
- API Gateway and Lambda backend.
- DynamoDB tenant entitlements and domain data.
- S3 private session export storage.
- CloudWatch logs, metrics, and alarms.
- IAM and CDK-based infrastructure discipline.
- Tenant identity comes from verified auth plus authoritative entitlements.
- Coaches cannot set tenant identity through request body, query params, or headers.
- Missing or invalid tenant context fails closed.

## Pilot Fit

Club Vivo is a good fit for a nonprofit pilot if the organization wants to:

- support less experienced coaches
- reduce planning friction
- improve practice consistency
- make session planning easier to repeat
- give directors better insight into what coaches are planning
- keep data boundaries protected

## Next Step

Run a small pilot with a few coaches.

Success should be measured by:

- time to first useful session
- repeat usage
- quality of Quick Soccer Game outputs
- saved sessions
- coach feedback
- director confidence in practice consistency

The goal is simple: help coaches walk onto the field with a better plan and less stress.
