# Agent Instructions — Copilot CLI Handbook

## What This Project Is

A single-page static site (Astro) that lists every feature of GitHub Copilot CLI, grouped by release date (newest first). Nothing else — no tutorials, no installation guides, no marketing copy.

## Source of Truth

The canonical source for content is the [GitHub Copilot CLI releases page](https://github.com/github/copilot-cli/releases). Every release listed there should have a corresponding section on the page. Each section contains:

- Version number and release date
- A concise list of features, changes, and fixes introduced in that release

## Content Rules

1. **No fluff.** Do not add introductions, installation guides, best-practices, or explanatory prose beyond what is needed to describe a feature.
2. **No jargon inflation.** Use the same terminology the release notes use. Do not invent categories or reword things to sound more impressive.
3. **Grouped by date.** Releases are listed newest-first. Each release is its own section with version + date as the heading.
4. **Only things a user can actively use.** Every bullet must describe something the user can do, invoke, configure, or opt into. Apply the test: "Can a user read this and go try it right now?" If not, leave it out. Examples of what to **exclude**:
   - Internal/automatic behaviors the user doesn't control (e.g., "Streaming responses automatically retry when interrupted by server errors")
   - Backend or infrastructure changes (e.g., "Switched to per-subscription Copilot API endpoints", "ACP server supports agent and plan session modes")
   - SDK/API internals not exposed to the end user (e.g., "SDK supports infinite sessions with automatic context compaction", "Expose session context in session.list SDK response")
   - Passive improvements with no user action (e.g., "Significantly reduced token consumption", "Sessions load faster on startup")
   - Recovery/hotfix releases that just restore broken functionality
5. **Skip empty releases.** If after filtering a release has zero qualifying bullets, omit the entire release section.

## Technical Notes

- Content lives in `src/content/handbook/index.md` (Markdown, rendered via Astro content collection).
- Layout: `src/layouts/BaseLayout.astro`. Styles: `src/styles/global.css`.
- Build: `npm run build`. Dev server: `npm run dev`.
- Astro 5.x, Node 18+.

## Updating Content

To add a new release:

1. Fetch the release notes from https://github.com/github/copilot-cli/releases.
2. Add a new section at the top of the releases list in `src/content/handbook/index.md`.
3. Follow the existing Markdown heading/list structure.
4. Update the "Last updated" date if present.
