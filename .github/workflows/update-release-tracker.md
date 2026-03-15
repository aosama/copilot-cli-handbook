---
name: Update release tracker page
description: Keep index.md release sections aligned with recent Copilot CLI releases and GitHub Blog updates.
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
  args:
    - --allow-url
    - github.com
    - --allow-url
    - github.blog
    - --allow-url
    - api.github.com
network:
  allowed:
    - defaults
    - github
    - github.blog
    - node
tools:
  edit:
  bash:
    [
      'npm',
      'npx',
      'node',
      'cat',
      'ls',
      'pwd',
      'grep',
      'head',
      'tail',
      'mkdir',
      'rm',
      'cp',
      'mv',
      'kill',
    ]
  web-fetch:
  playwright:
  github:
    toolsets: [repos, search]
safe-outputs:
  upload-asset:
    branch: 'assets/update-handbook'
    allowed-exts: [.png]
    max: 3
  create-pull-request:
    title-prefix: '[handbook] '
    labels: [documentation]
    draft: true
    base-branch: main
    if-no-changes: warn
    fallback-as-issue: false
---

# Update release tracker in `index.md`

You maintain this file:

- `src/content/handbook/index.md`

The release tracker page is rendered at: `http://127.0.0.1:4321/copilot-cli-handbook/handbook/`

Do not touch the frontmatter (`title`, `description`).

## Sources to read each run

1. GitHub Copilot CLI releases (official source of product changes):
   - `https://github.com/github/copilot-cli/releases`
2. GitHub Blog posts relevant to Copilot CLI:
   - `https://github.blog/?s=Copilot+CLI`
   - `https://github.blog/changelog/?s=Copilot+CLI`

## Pull request hygiene

Before proposing any new pull request:

1. Inspect open pull requests in this repository that look like release-tracker updates.
2. If an open draft PR already covers the same latest release, or a newer release than the one you would add, do not create another PR.
3. If multiple overlapping draft PRs already exist, prefer a no-op over creating one more duplicate PR.

This workflow should create a draft PR only when the default branch is behind and there is no equivalent draft PR already open.

## Content rules (strict)

- Edit only `src/content/handbook/index.md`. Do not create or edit any other file.
- Keep content concise and user-actionable. Apply the test: "Can a user read this and go
  try it right now?" If not, leave it out.
- **Include** only things a user can actively invoke, configure, or opt into.
- **Exclude**:
  - Internal or automatic behaviors the user doesn't control.
  - Backend or infrastructure changes.
  - SDK/API internals not exposed to the end user.
  - Passive performance improvements with no user action required.
  - Recovery/hotfix releases that merely restore broken functionality.
- Group entries by release date (`## x.y.z — YYYY-MM-DD`) in newest-first order.
- If after filtering a release has zero qualifying bullets, omit that release section.
- Do not reword or reformat existing bullets unless they are factually incorrect.

## Update procedure

1. Read the full `src/content/handbook/index.md` to understand the current release tracker state.
2. Fetch the latest Copilot CLI release notes and blog posts from the sources above.
3. Identify new user-facing release changes not yet reflected.
4. Add or update release sections and bullets in newest-first order.
5. Ensure every added or changed bullet is grounded in one of the official sources above.

## Output behavior

- If there are any content changes, prepare a pull request with:
  - a summary of what changed, broken down by release
  - the source links used
  - why each change is relevant (maps to a user-actionable feature)
  - a `## Screenshots` section that embeds at least one uploaded screenshot
- Screenshot requirements for changed runs:
  1. Build and preview locally (`npm ci`, `npm run build`, `npm run preview -- --host 127.0.0.1 --port 4321`)
  2. Capture a full-page screenshot of the release tracker page:
     - `http://127.0.0.1:4321/copilot-cli-handbook/handbook/`
  3. Save screenshot to:
     - `/tmp/gh-aw/screenshots/release-tracker-updated.png`
  4. Publish the image with `upload_asset` before creating the PR.
  5. Include the uploaded image URL in the PR body using Markdown image syntax.
- If no relevant changes are found across any section:
  - do not create screenshots
  - do not upload assets
  - do not create a pull request.
