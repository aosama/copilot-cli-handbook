# Repo Discovery Guide for Agents — copilot-cli-handbook

A cached map of non-obvious truths for coding agents. Read this first before exploring the codebase.

## Maintenance mandate

1. **Before every commit**, ask: did I change anything this guide documents? If yes, update the guide in the same commit.
2. **At session start**, spot-check 2-3 key facts against the actual codebase. If anything drifted, update immediately.
3. **Quarterly minimum**, re-verify if the repo hasn't been touched. Stale guidance is worse than no guidance.

Last verified: 2026-06-08

## Project overview

A single-page static site built with Astro 6, served under `/copilot-cli-handbook` via GitHub Pages. One Markdown file (`src/content/handbook/index.md`) rendered through a thin `.astro` page. Documents every user-facing GitHub Copilot CLI feature, backed by official GitHub sources only. No backend, no SSR, no database.

## Known gotchas

- **Handbook updates are local-agent-driven.** No scheduled GitHub workflow; see `.github/instructions/business-requirements.instructions.md` for the procedure.
- **Handbook body text is intentionally monospace.** Not a bug.
- **Reference links in `index.md` are two-layer.** Human-readable `## Sources` plus `[label]: URL` definitions. Miss a definition and it silently renders as plain text.
- **Missing release versions in references are intentional.** Only releases with user-facing CLI changes are cited.
- **Playwright expects exactly one 404** at `/copilot-cli-handbook/handbook` (regression guard for a removed route).
- **Copilot CLI loads `.claude/*` config** alongside `.github/copilot/*`. Real compatibility feature, not an error.
- **`.version-item` has a hardcoded green border** (`#2ab060`). `.info-box` uses `var(--accent)` but `.version-item` does not.
- **Lock files and `*.lock.yml` gitattributes removed.** No agentic workflow compiles lock files anymore.
- **`markdownlint.json` disables only MD013.** All other rules run at defaults.
- **Playwright `webServer` runs build+preview**, not the dev server. Test failures can differ from dev behavior.
- **`.playwright-mcp/` is auto-generated** (do not edit). **`opencode.json` loads `.github/instructions/*.md`** as agent instructions.
- **All devDependencies pinned to exact versions** (no `^` ranges). Bump the string directly to upgrade.
- **`lint-staged` must stay on v16.** v17 requires `node >= 22.22.1` which does not exist.

## Conventions

- **Pages render from Markdown.** Every `.astro` page is thin — `getEntry()` + `render()`.
- **Base-path-aware links required.** Always use `import.meta.env.BASE_URL`.
- **Every fact needs an official source link.** Use `[Docs: topic][label] [Release: vX.Y.Z][release-X-Y-Z]`.
- **Content is user-actionable only.** "Can a user read this and go try it right now?"
- **Terminology must match official GitHub sources.** No invented categories.
- **`lastUpdated` frontmatter** uses "Month DD, YYYY at H:MM AM/PM TZ".
- **Handbook updates are local-agent-driven.** No scheduled workflow; the procedure is in `.github/instructions/business-requirements.instructions.md`.
- **No automatic lint in CI.** Run `npm run lint` before PRs.
- **Prefer explicit `glob()` loaders** in `content.config.ts` per Content Layer API.
- **External link checks tolerate 401/403** since GitHub Docs often block headless requests.

## Structure map

```text
src/
  content/handbook/index.md   ← Entire handbook
  content.config.ts            ← Zod schema: title, description, lastUpdated
  layouts/BaseLayout.astro     ← Nav, theme toggle, BASE_URL
  pages/index.astro            ← Thin renderer: getEntry + render + <Content />
  styles/global.css            ← Dark/light theme, monospace body
playwright-regression/
  site-regression.spec.ts      ← BFS crawl + link check + 404 guard
.github/
  instructions/                ← Path-specific instruction files (astro, business-requirements)
  workflows/                    ← deploy, preview-deploy, regression
.playwright-mcp/                ← Auto-generated MCP snapshots (do not edit)
astro.config.mjs               ← site + base path
playwright.config.ts            ← baseURL + webServer (build+preview)
opencode.json                  ← Loads .github/instructions/*.md
AGENTS.md                       ← Copilot startup rules (root-level instructions)
.nvmrc                          ← Node version
.markdownlint.json              ← Only MD013 disabled
.husky/pre-commit               ← lint-staged
tsconfig.json                   ← extends astro/tsconfigs/strict
```

## Entry points

| Command               | What it does                                               |
| --------------------- | ---------------------------------------------------------- |
| `npm run dev`         | Dev server at `http://localhost:4321/copilot-cli-handbook` |
| `npm run build`       | Production build to `dist/`                                |
| `npm run preview`     | Preview the production build                               |
| `npm run lint`        | Prettier check + markdownlint-cli2                         |
| `npm run lint:md`     | markdownlint-cli2 only                                     |
| `npm run lint:fix`    | Prettier auto-fix                                          |
| `npm run format`      | Auto-fix formatting                                        |
| `npm run test:e2e`    | Build + preview + Playwright (CI-compatible)               |
| `npm run test:e2e:ui` | Interactive Playwright UI                                  |

## What to verify

1. **Versions** — `.nvmrc`, `package.json` engines, Astro major, Playwright major
2. **Paths** — Do all structure map directories still exist?
3. **Scripts** — Do all `npm run` commands still work?
4. **Config values** — `astro.config.mjs` base/site, `playwright.config.ts` baseURL
5. **Content structure** — Does `index.md` still use the two-layer source system?
6. **Workflows** — CI triggers still accurate?
7. **CSS** — Hardcoded colors still present? New variables?
8. **Known gotchas** — All still true? New ones?

## Maintenance snapshot

- Last verified: 2026-06-08. Agentic workflow removed; handbook updates are local-agent-driven. All dev deps pinned exact; lint-staged held at v16. AGENTS.md is root-level.
