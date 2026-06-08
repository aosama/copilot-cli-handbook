# GitHub Copilot CLI Handbook

> A no-fluff, community-maintained reference for user-facing GitHub Copilot CLI features.

Live site: [aosama.github.io/copilot-cli-handbook](https://aosama.github.io/copilot-cli-handbook)

## What This Is

This project exists to answer one question: **"What can I use in GitHub Copilot CLI?"**

It is a friendly handbook for the community, not a tutorial, installation guide, or marketing page. The goal is simple: keep a concise, accurate record of what people can actually use in Copilot CLI, backed by official sources.

The site has a single Handbook page at `/` providing instruction files, commands, flags, hooks, and MCP configuration.

## Source of Truth

Handbook content should stay grounded in official GitHub sources:

- [GitHub Copilot CLI releases](https://github.com/github/copilot-cli/releases)
- [GitHub Copilot how-tos](https://docs.github.com/en/copilot/how-tos)
- [GitHub Copilot CLI command reference](https://docs.github.com/en/copilot/reference/cli-command-reference)
- [GitHub Copilot Blog](https://github.blog/ai-and-ml/github-copilot/)

## Local Development

Requires the current Node LTS release. This repo is pinned to `24.16.0` in `.nvmrc`.

```bash
npm install          # install dependencies
npm run dev          # local dev server → http://localhost:4321/copilot-cli-handbook
npm run build        # production build → dist/
npm run preview      # preview build → http://localhost:4321/copilot-cli-handbook
npm run lint         # check formatting with Prettier
npm run format       # auto-fix formatting
npm run test:e2e     # Playwright end-to-end tests
npm run test:e2e:ui  # Playwright UI mode
```

Formatting is enforced with Prettier, Husky, and lint-staged.

## Project Structure

```text
.
├── src/
│   ├── content/
│   │   └── handbook/
│   │       └── index.md           # Handbook page content (route /)
│   ├── content.config.ts          # Astro content collection schema
│   ├── layouts/
│   │   └── BaseLayout.astro       # Shared layout and navigation
│   ├── pages/
│   │   └── index.astro            # Renders index.md
│   └── styles/
│       └── global.css             # Global theme and layout styles
├── playwright-regression/
│   └── site-regression.spec.ts    # End-to-end site coverage
├── astro.config.mjs
├── playwright.config.ts
└── .github/workflows/
    ├── deploy.yml
    ├── preview-deploy.yml
    ├── regression.yml
    ├── update-handbook.md          # Agentic workflow source (edit this)
    └── update-handbook.lock.yml   # Compiled workflow (do not edit directly)
```

Astro pages stay thin on purpose; long-form content lives in Markdown under `src/content/handbook/`.

## Updating the Handbook

The handbook content is updated by a local coding agent (like Copilot CLI) on demand, following the procedure documented in `.github/instructions/business-requirements.instructions.md`. The agent reads official GitHub sources, compares them against the current handbook, and commits updates directly to `main` when changes are found.

To trigger an update, ask your agent to "update the handbook" or point it at specific new releases or docs.

## Contributing

Contributions are welcome. If you spot a missing capability, outdated guidance, or wording that could better help the Copilot CLI community:

1. Open an [issue](https://github.com/aosama/copilot-cli-handbook/issues)
2. Send a pull request with the proposed fix
3. Keep changes factual and grounded in the official GitHub sources used by the handbook

Run `npm run lint` locally before opening a pull request. CI runs the Playwright regression suite.

## License

Licensed under [Apache-2.0](LICENSE).
