---
applyTo: '**'
---

# Repo Discovery Guide (agent-only) — copilot-cli-handbook

This document is an internal discovery + maintenance index for coding agents. It is not user-facing documentation.

Use this file like a cache for Astro site structure, content conventions, and workflows.

- Prefer updating it when you discover drift (paths, npm scripts, CI behavior, content rules, base path).
- Treat the “Last verified” timestamp as the main trust signal; if you only reformat or reorganize text, do not update it.

## Table of Contents

- Maintenance snapshot
- High-signal docs (read-first index)
- Project structure map
- Runtime / dev entry points
- Content & workflow anchors
- CI reality (verified)
- When to update this file

## Maintenance snapshot

- Last verified: 2026-03-16
- Verification scope (high level): Astro pages/content collection, base-path handling, Playwright e2e config, npm scripts, agentic release-tracker workflow, content rules from copilot-instructions.md, CI workflows, and PR submission process.

Keep this section short: the goal is to preserve the last verified date and why it can be trusted, not to fully inventory every subsystem.

## 1. High-signal docs (read-first index)

Mandatory startup reads (per copilot-instructions.md):

- README.md
- .github/copilot-instructions.md (session checklist, content rules, page pattern, PR requirements)
- .github/instructions/business-requirements.instructions.md
- .github/instructions/repository-memory.instructions.md

Additional high-signal files:

- .github/workflows/update-release-tracker.md (agentic updater + strict content rules)
- astro.config.mjs (site + base path)
- src/content.config.ts (handbook collection schema)
- playwright.config.ts (e2e baseURL + webServer)
- src/pages/index.astro + src/pages/handbook.astro (thin MD renderers)
- src/layouts/BaseLayout.astro (BASE_URL nav + theme)
- .github/workflows/{deploy.yml,preview-deploy.yml,regression.yml}

## 2. Project structure map

Static Astro site (no backend/runtime services beyond dev server):

```mermaid
graph TB
    Content["src/content/handbook/*.md<br/>(handbook.md → /, index.md → /handbook)"] --> Pages["src/pages/*.astro<br/>(thin getEntry/render)"]
    Pages --> Layout["src/layouts/BaseLayout.astro<br/>(BASE_URL nav)"]
    Layout --> Styles["src/styles/global.css"]
    Workflows[".github/workflows/*.yml + update-release-tracker.md"] --> Content
```

Key navigation anchors:

- Content rules & page pattern: `.github/copilot-instructions.md`
- Release tracker updater: `.github/workflows/update-release-tracker.md` (edits **only** `src/content/handbook/index.md`)
- Base path: `astro.config.mjs` + `import.meta.env.BASE_URL`
- Tests: `playwright-regression/site-regression.spec.ts` + `playwright.config.ts`
- Lint: `package.json` scripts + `.markdownlint.json` + `.husky/pre-commit`

No Python/Rust/DB/Neon/Bitcoin components. Pure static site + MD-driven content.

## 3. Runtime / dev entry points

Always start with:

```bash
npm install
```

- `npm run dev` — local dev server at `http://localhost:4321/copilot-cli-handbook`
- `npm run build` — production build to `dist/`
- `npm run preview` — preview built site
- `npm run lint` — prettier --check + markdownlint-cli2 on MD files
- `npm run test:e2e` — builds + starts preview server then runs Playwright (see playwright.config.ts for baseURL)
- `npm run test:e2e:ui` — interactive mode

**Playwright nuance**: webServer in playwright.config.ts runs `npm run build && npm run preview` with baseURL `http://localhost:4321/copilot-cli-handbook`. CI caches browsers via actions/cache.

No persistent services, PID files, or complex profiles. Pure static.

## 4. Content & workflow anchors

- **Content rules** (strict, from copilot-instructions.md): user-actionable only ("Can a user read this and go try it right now?"), newest-first date-grouped releases (`## x.y.z — YYYY-MM-DD`), omit internal/backend/passive changes, skip empty releases.
- Release tracker (`src/content/handbook/index.md`) updated **only** by agentic workflow in update-release-tracker.md.
- Lock files: never edit `*.lock.yml` directly (sync from .md source).
- PRs: use `gh pr create` with descriptive title, detailed body (what/why + per-file summary), screenshots for visual changes, one logical change per PR. No direct pushes to main.

## 5. CI reality (verified)

- Node 20 in all workflows.
- `regression.yml`: runs on PR/push to main; executes `npm run test:e2e`.
- `deploy.yml`: builds + deploys to GitHub Pages on main (sets ASTRO_BASE).
- `preview-deploy.yml`: PR previews + comments.
- No automatic lint in CI (run `npm run lint` locally before commit).
- Husky + lint-staged enforces formatting on commit for `*.md`, `*.astro`, etc.
- gh CLI available for creating PRs from workflows.

## When to update this file

Update on drift in file paths, npm scripts, content rules, base-path usage, test config, or workflow behavior. Re-verify against copilot-instructions.md and actual CI files.
