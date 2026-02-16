# GitHub Copilot CLI Handbook

Live site: https://aosama.github.io/copilot-cli-handbook

A few straight to the point pages, no-fluff reference of every feature available in GitHub Copilot CLI, grouped by release date. If you already use Copilot CLI, this site answers one question: **"What can I use, and when did it land?"**

This is not a tutorial, installation guide, or marketing page. It is a concise feature inventory sourced from the official release history.

## Source of Truth

All content is derived from 
- [GitHub Copilot CLI releases page](https://github.com/github/copilot-cli/releases). Each release's features are listed under its version and date, newest first.
- [How-tos for GitHub Copilot](https://docs.github.com/en/copilot/how-tos).
- [Copilot CLI Command Reference](https://docs.github.com/en/copilot/reference/cli-command-reference?versionId=free-pro-team%40latest&productId=copilot&restPage=how-tos%2Ccopilot-cli%2Ccli-best-practices)

## Quick Start

```bash
npm install     # install dependencies
npm run dev     # development server at http://localhost:4321
npm run build   # production build
npm run preview # preview production build
```

## Project Structure

```
/
├── src/
│   ├── content/
│   │   └── handbook/
│   │       └── index.md        # Handbook content in Markdown
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   └── index.astro         # Renders Markdown content
│   ├── styles/
│   │   └── global.css
│   └── content.config.ts       # Astro content collection config
├── astro.config.mjs
├── tsconfig.json
└── package.json
```

## GitHub Pages Deployment

Deployed via `.github/workflows/deploy.yml` on pushes to `main`.

Repository settings: **Settings → Pages → Source → GitHub Actions** (select Static HTML, not Jekyll).

## Design Principles

- **Single page** — everything on one scrollable page, no navigation to other routes.
- **Grouped by release date** — newest releases at the top, oldest at the bottom.
- **No fluff** — no installation guides, no "why Copilot is great" sections, no best practices. Just features and when they shipped.
- **Dark theme** — GitHub-inspired dark color scheme.
- **Responsive** — works on all screen sizes.

## License

See [LICENSE](LICENSE) file for details.
