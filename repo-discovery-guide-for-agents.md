# Repo Discovery Guide for Agents — copilot-cli-handbook

This document is a cached map of non-obvious truths for coding agents. It is not user-facing documentation. Read this first before exploring the codebase — it prevents re-discovering known gotchas the hard way.

## Maintenance mandate

1. **Before every commit**, ask: did I change anything this guide documents? If yes, update the guide in the same commit. No exceptions.
2. **At session start**, spot-check 2-3 key facts against the actual codebase (paths, versions, script names). If anything drifted, update immediately.
3. **Quarterly minimum**, re-verify if the repo hasn't been touched. Stale guidance is worse than no guidance.

If the **Last verified** date is older than 90 days, treat the entire document as suspect.

## Project overview

A single-page static site built with Astro 6, served under `/copilot-cli-handbook` via GitHub Pages. The entire site is one Markdown file (`src/content/handbook/index.md`) rendered through a thin `.astro` page. The handbook documents every user-facing GitHub Copilot CLI feature — commands, flags, hooks, MCP, skills, agents — backed by official GitHub sources only. No backend, no SSR, no database. Pure static.

## Known gotchas

- **No Dockerfile or docker-compose.yml exists.** The old discovery guide (`.github/instructions/repo-discovery-guide.instructions.md`) mentioned a Docker version mismatch — this was ghost content from a template. Ignore it.
- **`src/assets/` does not exist.** The old guide warned against using it. It was removed. Adding assets under `src/` is fine; just wire them into the Astro pipeline.
- **`update-handbook.md` is NOT a standard GitHub Actions workflow.** It uses Copilot's own workflow format (frontmatter fields: `engine`, `tools`, `permissions`, `safe-outputs`). Do not try to parse it as a regular Actions YAML.
- **No `.lock.yml` files currently exist** in `.github/workflows/`, despite `.gitattributes` declaring them `linguist-generated=true merge=ours` and AGENTS.md warning not to edit them. The infrastructure is forward-looking but no lock files have been compiled yet.
- **The entire handbook body text is intentionally monospace.** `body` defaults to `font-family: ui-monospace, ...`. This is a design choice, not a missing font or broken stylesheet.
- **Reference links in `index.md` are a two-layer system.** Layer 1 is the human-readable `## Sources` section with full citations. Layer 2 is ~48 topic labels (e.g., `[slash-commands]`, `[mcp-trust]`) and ~21 release labels (e.g., `[release-1-0-36]`) defined as `[label]: URL` at the bottom of the file. Adding a new source requires both layers — miss the link definition and the reference silently renders as plain text.
- **Missing release versions in references are intentional.** Only releases that introduced user-facing CLI features are cited. Gaps (v1.0.1, v1.0.2, v1.0.6–v1.0.9, v1.0.18, v1.0.19, v1.0.31, v1.0.33, v1.0.34) are normal — those releases had no user-visible CLI changes.
- **The Playwright test expects exactly one 404** at `/copilot-cli-handbook/handbook`. This is a regression guard for a removed Release Tracker route. Adding a new route that 404s won't fail the test, but removing that specific 404 will.
- **Copilot CLI loads `.claude/*` config files alongside `.github/copilot/*` ones.** The handbook documents `.claude/settings.json`, `.claude/settings.local.json`, `.claude/skills/`, and `.claude/agents/` as valid config sources. This is a real compatibility feature, not an error.
- **The green left border on version items is hardcoded** as `border-left: 4px solid #2ab060` in CSS. It is not a CSS variable. If the accent color changes, this won't follow.
- **`markdownlint.json` disables only MD013** (line length limit). All other rules run at defaults. Long reference URLs at the bottom of `index.md` would fail without this.
- **The Playwright `webServer` config runs `npm run build && npm run preview`**, not the dev server. CI tests run against the production build, so test failures can differ from dev-server behavior.

## Conventions

- **Pages must render from Markdown.** Every `.astro` page must be thin — just `getEntry()` + `render()`. Long-form content goes in `src/content/handbook/`.
- **Base-path-aware links required.** Always use `import.meta.env.BASE_URL`. See `BaseLayout.astro` for the trailing-slash normalization pattern.
- **Every fact needs an official source link.** Inline references use the pattern `[Docs: topic][topic-label] [Release: vX.Y.Z][release-X-Y-Z]` with up to 3 labels per bullet. Source labels use kebab-case (dots become dashes in release labels, e.g., `v1.0.36` → `release-1-0-36`).
- **Content is user-actionable only.** Apply the test: "Can a user read this and go try it right now?" No internal behaviors, backend changes, or passive improvements.
- **Terminology must match official GitHub sources.** Do not invent categories or reword things to sound more impressive.
- **The `lastUpdated` frontmatter field** in `index.md` uses the format "Month DD, YYYY at H:MM AM/PM TZ" (e.g., "April 25, 2026 at 4:00 PM EDT").
- **Lock files (`*.lock.yml`) are linguist-generated**, with `merge=ours` in `.gitattributes`. Edit the `.md` source file only; never edit lock files directly unless making an urgent fix.
- **No automatic lint in CI.** Husky + lint-staged enforces formatting on commit locally. Run `npm run lint` before opening a PR.
- **Prefer explicit `glob()` loaders** in `content.config.ts` per the Content Layer API, not legacy `type: 'content'` collections.
- **External link verification in tests tolerates 401/403** responses since GitHub Docs and Blog often block headless/automated requests.

## Structure map

```text
.
├── src/
│   ├── content/handbook/index.md   ← The entire handbook (710 lines, all content)
│   ├── content.config.ts            ← Zod schema: title, description, lastUpdated
│   ├── layouts/BaseLayout.astro     ← Shared layout: nav, theme toggle, BASE_URL
│   ├── pages/index.astro            ← Thin renderer: getEntry + render + <Content />
│   └── styles/global.css            ← Dark/light theme, monospace body, card sections
├── playwright-regression/
│   └── site-regression.spec.ts      ← BFS crawl + link checker + 404 regression guard
├── .github/
│   ├── copilot-instructions.md      ← Startup rules for agents (symlinked as AGENTS.md)
│   ├── instructions/                 ← 7 path-specific instruction files
│   └── workflows/
│       ├── deploy.yml                ← GitHub Pages deploy on main
│       ├── preview-deploy.yml        ← PR preview deployments
│       ├── regression.yml            ← Playwright e2e on PR/push
│       └── update-handbook.md        ← Copilot-native workflow (NOT standard Actions)
├── astro.config.mjs                 ← site + base path
├── playwright.config.ts             ← baseURL + webServer (build+preview, not dev)
├── .nvmrc                           ← Node 24.14.0
├── .markdownlint.json               ← Only MD013 disabled
├── .gitattributes                   ← *.lock.yml linguist-generated + merge=ours
└── .husky/pre-commit                ← lint-staged (prettier + markdownlint on commit)
```

No Python, Rust, DB, Docker, or backend services. Pure static site.

## Entry points

Always start with:

```bash
npm install
```

| Command               | What it does                                               |
| --------------------- | ---------------------------------------------------------- |
| `npm run dev`         | Dev server at `http://localhost:4321/copilot-cli-handbook` |
| `npm run build`       | Production build to `dist/`                                |
| `npm run preview`     | Preview the production build                               |
| `npm run lint`        | Prettier check + markdownlint-cli2 on MD files             |
| `npm run format`      | Auto-fix formatting                                        |
| `npm run test:e2e`    | Builds + preview server + Playwright (CI-compatible)       |
| `npm run test:e2e:ui` | Interactive Playwright UI mode                             |

**Playwright gotcha**: `webServer` in `playwright.config.ts` runs `npm run build && npm run preview`, not the dev server. baseURL is `http://localhost:4321/copilot-cli-handbook`. CI caches browsers via `actions/cache`.

No persistent services, PID files, or complex profiles.

## What to verify

A reusable checklist of categories to spot-check when verifying the guide:

1. **Versions** — `.nvmrc` Node version, `package.json` engines, Astro version
2. **Paths** — Do all directories in the structure map still exist? Any new ones? Any removed?
3. **Scripts** — Do all `npm run` commands still work? Any new ones?
4. **Config values** — `astro.config.mjs` base/site, `playwright.config.ts` baseURL/port
5. **Content structure** — Does `index.md` still follow the two-layer source system? Any new sections or removed ones?
6. **Workflows** — Are CI workflow names and triggers still accurate? Any new `.lock.yml` files?
7. **CSS** — Hardcoded colors still present? New CSS variables added?
8. **Known gotchas** — Are all gotchas still true? Any new ones discovered?

## Maintenance snapshot

- Last verified: 2026-04-28
- Changes since last verify: Initial creation from template; supersedes stale `.github/instructions/repo-discovery-guide.instructions.md` (last verified 2026-03-16)
