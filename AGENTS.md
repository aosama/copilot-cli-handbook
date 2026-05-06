# Copilot Instructions — Copilot CLI Handbook

## On Session Start

- Read `README.md`.

## Linting

- **Lint before committing.** The project uses Husky + lint-staged to run Prettier automatically on commit, but run `npm run lint` to check first.
- `npm run test:e2e` auto-starts `astro build && astro preview`; no need to run the dev server first.

## Key Conventions

### Pages must render from Markdown

Every route in `src/pages/*.astro` must be a thin renderer that loads a markdown entry from the `handbook` content collection. Do **not** embed long-form content in `.astro` files.

### Base-path-aware links

The site is served under `/copilot-cli-handbook`. Always use `import.meta.env.BASE_URL` in `.astro` files (see `BaseLayout.astro` for the trailing-slash pattern).

### Lock files

`*.lock.yml` files in `.github/workflows/` are generated artifacts (linguist-generated, merge=ours). Do not edit them directly; sync with the source `.md` file to avoid drift.
