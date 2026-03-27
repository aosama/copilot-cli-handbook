---
on:
  schedule: daily
  workflow_dispatch:

permissions:
  contents: read
  issues: read
  pull-requests: read

engine: copilot

tools:
  github:
    toolsets: [repos, search]

network:
  allowed:
    - github

safe-outputs:
  create-pull-request:
    draft: false
    base-branch: main
---

# Update the handbook page from official GitHub sources

You maintain the single handbook page for this repository:

- `src/content/handbook/index.md`

## Mission

Keep `src/content/handbook/index.md` accurate and current for end users of GitHub Copilot CLI.

The page must remain:

- concise and factual
- grounded exclusively in official GitHub sources
- focused on user-visible, user-actionable information
- consistent with the repository's existing tone, structure, and formatting

## Allowed sources

Only use official GitHub sources directly relevant to GitHub Copilot CLI:

1. GitHub Copilot CLI releases: `https://github.com/github/copilot-cli/releases`
2. GitHub Docs pages for specific Copilot CLI how-tos: use the exact Copilot CLI page URL, not the generic how-tos landing page, when citing a fact
3. GitHub Docs CLI command reference: `https://docs.github.com/en/copilot/reference/cli-command-reference`
4. GitHub Blog posts directly about Copilot CLI: use the exact post URL, not a blog landing page, when citing a fact

Do not use third-party blogs, social posts, forum threads, or unofficial summaries.

## File scope

- Edit **only** `src/content/handbook/index.md`.
- Do not edit any other file under any circumstances.
- Do not modify workflow files, Astro components, configuration, README, package files, or any generated file.

## Content selection rules

Include only information that is:

- user-facing and user-actionable (the user can go try it right now)
- relevant to Copilot CLI usage: commands, flags, configuration, hooks, instruction files, MCP servers, skills, environment variables, permission prompts, or observability
- backed by an official source you fetched during this run
- not already accurately covered in the page

Exclude:

- internal or backend implementation details the user does not control
- passive improvements with no user action required
- speculative or weakly supported claims
- information unrelated to Copilot CLI users
- installation guides or getting-started tutorials

## Update procedure

1. Read the current contents of `src/content/handbook/index.md`.
2. Fetch the latest official sources listed above.
3. Identify only new or changed facts that matter to users and are not already in the page.
4. Update the page conservatively:
   - preserve the existing structure and section headings
   - preserve the formatting style and conventions already in the file
   - avoid unnecessary rewrites or restructuring
   - keep the `Last updated on` timestamp current if any content changed
5. Confirm every change is supported by an official source fetched during this run.
6. If the page is already current, do not make any edits.

When a handbook bullet cites a how-to or blog post, link to the exact page used as evidence rather than a landing page.

## Quality bar

Before producing output, verify:

- every added or changed fact is grounded in an official source fetched this run
- wording is clear, concise, and matches the existing page style
- no unsupported claims were added
- the page remains coherent as a single handbook reference
- only `src/content/handbook/index.md` was changed

## Output behavior

If relevant content changes were made:

- Create one pull request that is ready for review.
- Title: `[handbook] Update from official GitHub sources – <date>`
- Body must include:
  - a short summary of what changed
  - the official source URLs used
  - why each change is relevant to handbook readers

If no relevant changes are needed, do not create a pull request.
