---
description: 'Business requirements and desired state for this project.'
applyTo: '**'
---

# Business Requirements

- Keep this repository a friendly, public, open-source handbook for the GitHub Copilot CLI community.
- Prefer concise, accurate, official-source-backed content over tutorials, installation guides, marketing language, or maintainer-only detail in public-facing docs.
- Optimize for user benefit: help people quickly understand what Copilot CLI can do.
- When documenting capabilities, favor user-actionable features and omit internal or non-user-facing changes.

## What This Project Is

A small static site built with Astro and a modern Node LTS runtime, serving as a community handbook for GitHub Copilot CLI user-facing features and commands. Single page at `/`; deployed to GitHub Pages at `https://aosama.github.io/copilot-cli-handbook`.

## Source of Truth

All content is derived from official GitHub sources:

- [GitHub Copilot CLI releases](https://github.com/github/copilot-cli/releases)
- [How-tos for GitHub Copilot](https://docs.github.com/en/copilot/how-tos)
- [Copilot CLI Command Reference](https://docs.github.com/en/copilot/reference/cli-command-reference)

## Content rules

1. Do not add introductions, installation guides.
2. **No jargon inflation.** Use the same terminology from official sources. Do not invent categories or reword things to sound more impressive.
3. **Only things a user can actively use.** Every bullet must describe something the user can do, invoke, configure, or opt into. Apply the test: "Can a user read this and go try it right now?" If not, leave it out.

### Examples of what to exclude

- Internal or automatic behaviors the user doesn't control
- Backend or infrastructure changes
- SDK or API internals not exposed to the end user
- Passive improvements with no user action
