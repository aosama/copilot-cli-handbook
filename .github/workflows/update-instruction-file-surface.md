---
name: Update instruction-file-surface handbook page
description: Keep instruction-file-surface.md aligned with recent Copilot CLI releases and GitHub Blog updates.
on:
  schedule: daily
  workflow_dispatch:
permissions:
  contents: read
  issues: read
  pull-requests: read
engine:
  id: copilot
  model: claude-sonnet-4.6
network:
  allowed:
    - defaults
    - github
    - github.blog
tools:
  edit:
  web-fetch:
  github:
    toolsets: [repos, search]
safe-outputs:
  create-pull-request:
    title-prefix: '[instruction-file-surface] '
    labels: [documentation]
    draft: true
    base-branch: main
    if-no-changes: warn
    fallback-as-issue: false
---

# Update `instruction-file-surface.md` from official sources

You maintain this repository page:

- `src/content/handbook/instruction-file-surface.md`

## Sources to read each run

1. GitHub Copilot CLI releases (official source of product changes):
   - `https://github.com/github/copilot-cli/releases`
2. GitHub Blog posts relevant to Copilot CLI:
   - `https://github.blog/?s=Copilot+CLI`
   - `https://github.blog/changelog/?s=Copilot+CLI`

## Scope rules (strict)

- Edit only `src/content/handbook/instruction-file-surface.md`.
- Do not edit any other file.
- Keep content concise, user-actionable, and release-note-accurate.
- Include only instruction-file-surface relevant changes (for example instruction files,
  `/instructions`, `/init`, and related behavior).
- Do not include internal-only, backend-only, or non-actionable implementation details.

## Update procedure

1. Read the current `instruction-file-surface.md` file.
2. Collect newly relevant user-facing changes from the latest Copilot CLI releases.
3. Collect newly relevant Copilot CLI information from official GitHub Blog pages.
4. Update only the sections that require changes, preserving existing structure and tone.
5. Ensure every added/changed bullet is grounded in one of the official sources above.
6. Keep version tags in bullets where applicable, matching repository style.

## Output behavior

- If there are relevant content changes, prepare a pull request with:
  - a short summary of what changed
  - source links used
  - why each change is relevant to instruction-file-surface
- If no relevant changes are found, do not create a pull request.
