# Copilot Instructions — Copilot CLI Handbook

## Session-Start Checklist

- Checklist: identify available MCP groups → read readme.md → map task to capabilities → activate missing tool categories → state capability groups in use.

## On Session Start

- Know your MCP servers and tool categories.
- Read readme.md.
- Map the user task to required capabilities, then activate any missing tool categories before implementation.
- Ensure GitHub CLI (`gh`) is installed and available for the coding agent to use.

## Agent Identity

- You are GitHub Copilot using GPT-5.3-Codex.

## MCP Capability Routine (Every Session)

1. Identify what MCP/tool groups are already available in this session.
2. If the task needs more capabilities, activate the matching VS Code tool categories (for example: browser interaction, form/file management, page capture, Neon project/branch/schema/migration/auth groups).
3. Prefer MCP-backed tools over ad-hoc shell/web work when equivalent capability exists.
4. Briefly tell the user which capability groups are being used for the current task.

## What This Project Is

A small static site (Astro 5.x, Node 18+) that lists user-facing features of GitHub Copilot CLI, grouped by release date (newest first). Two pages: a Handbook page at `/` (content from `handbook.md`) and a Release Tracker at `/handbook` (content from `index.md`). No backend; deployed to GitHub Pages at `https://aosama.github.io/copilot-cli-handbook`.

## Source of Truth

The canonical source for content are links found in the readme.md -- they are official publications from github.com

## Build, Lint, and Test

```bash
npm install          # always run before build or test
npm run build        # production build → dist/
npm run lint         # prettier --check (read-only)
npm run format       # prettier --write (auto-fix)
npm run test:e2e     # Playwright end-to-end tests (builds + previews site first)
npm run test:e2e:ui  # same with interactive UI
```

- **Lint before committing.** The project uses Husky + lint-staged to run Prettier automatically on commit, but run `npm run lint` to check first.
- **No unit/integration tests** — only Playwright e2e tests under `playwright-regression/`.
- `npm run test:e2e` auto-starts `astro build && astro preview`; no need to run the dev server first.
- Use `eslint 9.x` with `@typescript-eslint/parser 8.55.0`. Do **not** upgrade to eslint 10 — it causes `ERESOLVE` in CI.

## Project Layout

```
src/
  content/
    handbook/
      handbook.md     # Content for route / (Handbook — instruction files, slash commands, CLI args, MCP config)
      index.md        # Content for route /handbook (Release Tracker — features by release date, newest first)
  content.config.ts   # Astro content collection schema (title, description, lastUpdated)
  layouts/
    BaseLayout.astro  # Shared layout: nav, theme toggle, footer
  pages/
    index.astro       # Route / — renders handbook.md (Handbook page)
    handbook.astro    # Route /handbook — renders index.md (Release Tracker)
  styles/
    global.css        # All styles (GitHub-inspired dark/light theme)
astro.config.mjs      # site + base ('/copilot-cli-handbook') + telemetry:false
playwright.config.ts  # e2e config; webServer auto-starts build+preview
playwright-regression/
  site-regression.spec.ts  # e2e tests
.github/workflows/
  deploy.yml                            # Push-to-main → GitHub Pages deploy
  preview-deploy.yml                    # PR preview deploy + comment
  regression.yml                        # Playwright e2e on PRs
  update-instruction-file-surface.md    # Agentic workflow source (human-readable)
  update-instruction-file-surface.lock.yml  # Compiled lock file (generated — do not edit directly)
```

## Key Conventions

### Pages must render from Markdown

Every route in `src/pages/*.astro` must be a thin renderer that loads a markdown entry from the `handbook` content collection. Do **not** embed long-form content in `.astro` files.

Standard page pattern:

```astro
---
import { getEntry, render } from 'astro:content';
import BaseLayout from '../layouts/BaseLayout.astro';

const entry = await getEntry('handbook', '<slug>');
if (!entry) throw new Error('Missing handbook entry: <slug>');

const { Content } = await render(entry);
---

<BaseLayout title={entry.data.title}>
  <article class="handbook-content">
    <header class="page-intro">
      <h1>{entry.data.title}</h1>
      <p>{entry.data.description}</p>
    </header>
    <Content />
  </article>
</BaseLayout>
```

### Base-path-aware links

The site is served under `/copilot-cli-handbook`. Never hardcode absolute paths like `/handbook`. Always use `import.meta.env.BASE_URL` in `.astro` files (see `BaseLayout.astro` for the trailing-slash pattern).

### Content rules

1. Do not add introductions, installation guides.
2. **No jargon inflation.** Use the same terminology the release notes use and from the blog. Do not invent categories or reword things to sound more impressive.
3. **Grouped by date.** Releases are listed newest-first. Each release is its own section with version + date as the heading.
4. **Only things a user can actively use.** Every bullet must describe something the user can do, invoke, configure, or opt into. Apply the test: "Can a user read this and go try it right now?" If not, leave it out. Examples of what to **exclude**:
   - Internal/automatic behaviors the user doesn't control (e.g., "Streaming responses automatically retry when interrupted by server errors")
   - Backend or infrastructure changes (e.g., "Switched to per-subscription Copilot API endpoints", "ACP server supports agent and plan session modes")
   - SDK/API internals not exposed to the end user (e.g., "SDK supports infinite sessions with automatic context compaction", "Expose session context in session.list SDK response")
   - Passive improvements with no user action (e.g., "Significantly reduced token consumption", "Sessions load faster on startup")
   - Recovery/hotfix releases that just restore broken functionality
5. **Skip empty releases.** If after filtering a release has zero qualifying bullets, omit the entire release section.

### Markdown frontmatter

Every `.md` file in `src/content/handbook/` must include:

```yaml
---
title: '...'
description: '...'
---
```

`lastUpdated` is optional.

### Lock files

`*.lock.yml` files in `.github/workflows/` are generated artifacts (linguist-generated, merge=ours). Do not edit them directly unless making an urgent fix; sync with the source `.md` file to avoid drift.

### Adding a new page

1. Create `src/content/handbook/<slug>.md` with valid frontmatter.
2. Create `src/pages/<slug>.astro` using the standard pattern above.
3. Add a nav link in `BaseLayout.astro` using `import.meta.env.BASE_URL`.
4. Run `npm run build` and `npm run lint` to validate.

## Submitting Changes via Pull Request

All code changes **must** be submitted as a pull request — never push directly to `main`.

### PR Requirements

1. **Descriptive title** — clearly state what changed (e.g., `Add v0.23.0 release section`, `Fix broken nav link on mobile`).
2. **Detailed body** — the PR description must include:
   - **What** was changed and **why**.
   - A summary of every file touched and the reasoning behind each change.
   - Any assumptions made or trade-offs considered.
3. **Screenshots** — for any change that affects the visual appearance of the site (new page, layout tweak, style change, content addition), include at least one before/after screenshot captured with the Playwright browser tools or equivalent. Embed them directly in the PR body using markdown image syntax.
4. **One logical change per PR** — do not bundle unrelated changes. If the task requires multiple independent changes, open separate PRs.

### How to Open a PR

```bash
# Create a branch, commit, push, then open the PR with a full description
git checkout -b <descriptive-branch-name>
git add <files>
git commit -m "<concise commit message>"
git push -u origin <descriptive-branch-name>
gh pr create --title "<title>" --body "<full description with screenshots>"
```
