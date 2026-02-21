# Copilot Instructions — Copilot CLI Handbook

## What This Project Is

A small static site (Astro 5.x, Node 18+) that lists user-facing features of GitHub Copilot CLI, grouped by release date (newest first). Two pages: a Handbook page at `/` (content from `handbook.md`) and a Release Tracker at `/handbook` (content from `index.md`). No backend; deployed to GitHub Pages at `https://aosama.github.io/copilot-cli-handbook`.

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

- **No jargon inflation.** Match the wording from official release notes.
- **Grouped by date, newest first** on the Release Tracker (`index.md`).
- **Only user-actionable features.** Each bullet must describe something the user can actively invoke, configure, or opt into. Exclude internal/automatic behaviors, backend changes, and passive improvements.
- **Skip empty releases.** If a release has no qualifying bullets after filtering, omit it.

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
