# GitHub Copilot CLI Handbook

> A no-fluff, community-maintained reference for user-facing GitHub Copilot CLI features.

Live site: https://aosama.github.io/copilot-cli-handbook

## What This Is

This project exists to answer one question: **"What can I use in GitHub Copilot CLI, and when did it land?"**

It is a friendly handbook for the community, not a tutorial, installation guide, or marketing page. The goal is simple: keep a concise, accurate record of what people can actually use in Copilot CLI, backed by official sources.

The site currently has two pages:

| Page            | Route       | Purpose                                                                 |
| --------------- | ----------- | ----------------------------------------------------------------------- |
| Handbook        | `/`         | Instruction files, slash commands, CLI arguments, and MCP configuration |
| Release Tracker | `/handbook` | User-facing Copilot CLI features grouped by release date, newest first  |

## Source of Truth

All content is derived from official GitHub sources:

- [GitHub Copilot CLI releases](https://github.com/github/copilot-cli/releases)
- [How-tos for GitHub Copilot](https://docs.github.com/en/copilot/how-tos)
- [Copilot CLI Command Reference](https://docs.github.com/en/copilot/reference/cli-command-reference)

## Local Development

Requires Node 18+.

```bash
npm install          # install dependencies
npm run dev          # local dev server → http://localhost:4321
npm run build        # production build → dist/
npm run preview      # preview the production build locally
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
│   │       ├── handbook.md        # Handbook page content (route /)
│   │       └── index.md           # Release Tracker content (route /handbook)
│   ├── content.config.ts          # Astro content collection schema
│   ├── layouts/
│   │   └── BaseLayout.astro       # Shared layout and navigation
│   ├── pages/
│   │   ├── handbook.astro         # Renders index.md
│   │   └── index.astro            # Renders handbook.md
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
    └── update-instruction-file-surface.md
```

Astro pages stay thin on purpose; long-form content lives in Markdown under `src/content/handbook/`.

## Contributing

Contributions are welcome. If you spot a missing feature, a stale release entry, or wording that could better help the Copilot CLI community:

1. Open an [issue](https://github.com/aosama/copilot-cli-handbook/issues)
2. Send a pull request with the proposed fix
3. Keep changes factual and grounded in the official sources listed above

Pull requests are checked with formatting and Playwright regression tests.

## License

Licensed under [Apache-2.0](LICENSE).
