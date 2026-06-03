# Local Cleanup Runbook

## 1. Purpose

This runbook explains how to inspect and, after confirmation, remove local generated artifacts that are already ignored and untracked.

It is based on `docs/architecture/chapter-2/local-artifact-audit.md`.

This runbook is documentation only. It does not change repository state by itself, and it does not change `.gitignore`, app code, backend code, infra/CDK code, auth, tenancy, IAM, entitlements, DynamoDB keys, routes, Lambdas, or public API contracts.

## 2. Safety Rules

- Start with status and size checks.
- Confirm a path is ignored before treating it as a cleanup candidate.
- Confirm a path is not tracked before deleting it locally.
- Delete one path at a time, not a broad folder pattern.
- Keep local secrets and environment files.
- Do not use `git clean -fdx` for this repo cleanup.
- Do not delete, move, or rename historical docs as part of local artifact cleanup.
- Do not change `.gitignore` during this runbook.

## 3. What Not To Delete

Do not delete these without a separate decision:

- tracked source, docs, contracts, or infrastructure files
- `README.md`
- `.gitignore`
- `.gitattributes`
- `.github/`
- `apps/`
- `services/`
- `infra/`
- `docs/`
- `datasets/`
- `postman/`
- `scripts/`
- `.workspace/` until its contents have been reviewed
- `infra/cdk/.workspace/` until its contents have been reviewed
- `apps/club-vivo/.env.local`

Keep `apps/club-vivo/.env.local`. It may contain local configuration or secrets. It is ignored for a reason and should not be committed or casually removed.

## 4. Safe-To-Remove Local Generated Outputs After Confirmation

The audit found these local artifacts are ignored and untracked. They may be removed locally after confirming they are not needed for active debugging or inspection:

- `.tmp-methodology-smoke/`
- `cdk.out/`
- `club-vivo-dev.log`
- `club-vivo-dev.err.log`
- `apps/club-vivo/.next/`
- `apps/club-vivo/.next-dev.log`
- `apps/club-vivo/.next-dev.err.log`
- `apps/club-vivo/tsconfig.tsbuildinfo`
- `infra/cdk/.local/`
- `infra/cdk/cdk.out/`
- `infra/cdk/cdk.out.methodology-verify-deploy/`
- `infra/cdk/cdk.out.methodology-verify-synth/`
- `infra/cdk/dist/`

Dependency folders can also be removed locally if reinstalling is acceptable:

- `apps/club-vivo/node_modules/`
- `infra/cdk/node_modules/`
- `services/auth/post-confirmation/node_modules/`
- `services/club-vivo/api/node_modules/`

Local virtual environments can be removed only if they are no longer used:

- `.venv/`

## 5. Check Size And Status Before Deleting

Run these before any local cleanup.

```bash
git status --short --ignored
git ls-files -- .tmp-methodology-smoke .venv .workspace cdk.out club-vivo-dev.log club-vivo-dev.err.log
git check-ignore -v .tmp-methodology-smoke .venv .workspace cdk.out club-vivo-dev.log club-vivo-dev.err.log
```

For nested artifacts:

```bash
git ls-files -- apps/club-vivo/.next apps/club-vivo/node_modules apps/club-vivo/tsconfig.tsbuildinfo infra/cdk/cdk.out infra/cdk/node_modules services/club-vivo/api/node_modules
git check-ignore -v apps/club-vivo/.next apps/club-vivo/node_modules apps/club-vivo/tsconfig.tsbuildinfo infra/cdk/cdk.out infra/cdk/node_modules services/club-vivo/api/node_modules
```

Check size in Git Bash:

```bash
du -sh .tmp-methodology-smoke .venv .workspace cdk.out 2>/dev/null
du -sh apps/club-vivo/.next apps/club-vivo/node_modules infra/cdk/cdk.out infra/cdk/node_modules 2>/dev/null
du -sh services/auth/post-confirmation/node_modules services/club-vivo/api/node_modules 2>/dev/null
```

Dry-run ignored cleanup discovery only:

```bash
git clean -ndX
```

Review this output carefully. Do not convert it to `git clean -fdX` unless there is a separate explicit cleanup decision.

## 6. Windows Git Bash Commands

After confirmation, remove individual generated paths one at a time.

Logs and small generated files:

```bash
rm -f club-vivo-dev.log
rm -f club-vivo-dev.err.log
rm -f apps/club-vivo/.next-dev.log
rm -f apps/club-vivo/.next-dev.err.log
rm -f apps/club-vivo/tsconfig.tsbuildinfo
```

Build and smoke output:

```bash
rm -rf .tmp-methodology-smoke
rm -rf cdk.out
rm -rf apps/club-vivo/.next
rm -rf infra/cdk/.local
rm -rf infra/cdk/cdk.out
rm -rf infra/cdk/cdk.out.methodology-verify-deploy
rm -rf infra/cdk/cdk.out.methodology-verify-synth
rm -rf infra/cdk/dist
```

Dependency folders, only if reinstalling is acceptable:

```bash
rm -rf apps/club-vivo/node_modules
rm -rf infra/cdk/node_modules
rm -rf services/auth/post-confirmation/node_modules
rm -rf services/club-vivo/api/node_modules
```

Local Python environment, only if no longer used:

```bash
rm -rf .venv
```

Do not run:

```bash
rm -rf apps/club-vivo/.env.local
```

## 7. PowerShell Alternatives

Check status and ignore rules:

```powershell
git status --short --ignored
git ls-files -- .tmp-methodology-smoke .venv .workspace cdk.out club-vivo-dev.log club-vivo-dev.err.log
git check-ignore -v .tmp-methodology-smoke .venv .workspace cdk.out club-vivo-dev.log club-vivo-dev.err.log
```

Check sizes:

```powershell
$paths = @(
  ".tmp-methodology-smoke",
  ".venv",
  ".workspace",
  "cdk.out",
  "apps/club-vivo/.next",
  "apps/club-vivo/node_modules",
  "infra/cdk/cdk.out",
  "infra/cdk/node_modules"
)

foreach ($p in $paths) {
  if (Test-Path -LiteralPath $p) {
    $item = Get-Item -LiteralPath $p
    if ($item.PSIsContainer) {
      $sum = (Get-ChildItem -LiteralPath $p -Recurse -File -ErrorAction SilentlyContinue | Measure-Object -Property Length -Sum).Sum
      if ($null -eq $sum) { $sum = 0 }
      "{0}`t{1:N2} MB" -f $p, ([double]$sum / 1MB)
    } else {
      "{0}`t{1:N2} KB" -f $p, ($item.Length / 1KB)
    }
  }
}
```

After confirmation, remove individual paths with `Remove-Item`.

```powershell
Remove-Item -LiteralPath "club-vivo-dev.log" -Force
Remove-Item -LiteralPath "club-vivo-dev.err.log" -Force
Remove-Item -LiteralPath "apps/club-vivo/tsconfig.tsbuildinfo" -Force
Remove-Item -LiteralPath "apps/club-vivo/.next" -Recurse -Force
Remove-Item -LiteralPath "infra/cdk/cdk.out" -Recurse -Force
```

Dependency folders, only if reinstalling is acceptable:

```powershell
Remove-Item -LiteralPath "apps/club-vivo/node_modules" -Recurse -Force
Remove-Item -LiteralPath "infra/cdk/node_modules" -Recurse -Force
Remove-Item -LiteralPath "services/auth/post-confirmation/node_modules" -Recurse -Force
Remove-Item -LiteralPath "services/club-vivo/api/node_modules" -Recurse -Force
```

Do not run:

```powershell
Remove-Item -LiteralPath "apps/club-vivo/.env.local" -Force
```

## 8. Reinstall And Regenerate Notes

`node_modules/`:

- Reinstall from the relevant package directory.
- Use the package manager and lockfile already present for that package.
- Removing dependency folders can interrupt local development until dependencies are reinstalled.

`.next/`:

- Regenerated by the Club Vivo Next.js app during local dev or build.
- Removing it can clear stale frontend build state.

CDK output:

- `cdk.out/`, `infra/cdk/cdk.out/`, and `infra/cdk/cdk.out.methodology-verify-*` are generated by CDK synth/deploy-style workflows.
- Removing them may clear bulky local output and filename-too-long warnings.
- Regenerate from the CDK package when needed.
- Do not remove CDK output while actively inspecting a synth or deploy result.

`tsconfig.tsbuildinfo`:

- Regenerated by TypeScript incremental builds.
- Safe to remove locally after confirmation.

`.venv/`:

- Recreate only if the Python environment setup is known.
- Removing it deletes locally installed Python packages.

## 9. Environment File Warning

Keep `apps/club-vivo/.env.local`.

It is ignored because it may contain local configuration or secrets. Do not commit it, delete it casually, paste its contents into docs, or include it in cleanup scripts.

## 10. Repo State Note

This runbook does not change repo state by itself.

Using it should not modify app code, backend code, infra/CDK source, auth, tenancy, IAM, entitlements, DynamoDB keys, routes, Lambdas, public API contracts, or `.gitignore`.

Local cleanup actions should be run only after explicit confirmation and only against ignored, untracked generated artifacts.
