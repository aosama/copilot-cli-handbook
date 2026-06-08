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
- [How-tos for GitHub Copilot: use specific Copilot CLI how-to pages, not the landing page](https://docs.github.com/en/copilot/how-tos)
- [Copilot CLI Command Reference](https://docs.github.com/en/copilot/reference/cli-command-reference)
- [GitHub Copilot Blog: use specific Copilot CLI post URLs, not the category landing page](https://github.blog/ai-and-ml/github-copilot/)

## Content rules

1. Do not add introductions, installation guides.
2. **No jargon inflation.** Use the same terminology from official sources. Do not invent categories or reword things to sound more impressive.
3. **Only things a user can actively use.** Every bullet must describe something the user can do, invoke, configure, or opt into. Apply the test: "Can a user read this and go try it right now?" If not, leave it out.
4. Keep a human-readable `Last updated on <date/time>` stamp directly under the handbook title, and refresh it whenever the public handbook content changes.

### Examples of what to exclude

- Internal or automatic behaviors the user doesn't control
- Backend or infrastructure changes
- SDK or API internals not exposed to the end user
- Passive improvements with no user action

## Desired Sections in the Handbook

- Instruction Files
- Interactive Commands
- Command-Line Commands and Flags
- Permission Prompts and Tool Rules
- Configuration Files
- Hooks
- MCP Servers
- Skills and Custom Agents
- Environment Variables
- Observability
- Recent Additions Worth Knowing
- Sources

## Handbook Update Procedure

When asked to "update the handbook" or when new Copilot CLI releases or docs become available, a local coding agent should follow this procedure:

### Allowed sources

Only use official GitHub sources directly relevant to GitHub Copilot CLI:

1. **GitHub Copilot CLI releases**: `https://github.com/github/copilot-cli/releases`
2. **GitHub Docs — specific Copilot CLI how-to pages**: use the exact Copilot CLI page URL, not the generic how-tos landing page
3. **GitHub Docs — CLI command reference**: `https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference`
4. **GitHub Blog — specific Copilot CLI posts**: use the exact post URL, not a blog category landing page

Do not use third-party blogs, social posts, forum threads, or unofficial summaries.

### File scope

- Edit **only** `src/content/handbook/index.md`.
- Do not edit any other file under any circumstances.
- Do not modify Astro components, configuration, README, package files, or any generated file.

### Update steps

1. Read the current contents of `src/content/handbook/index.md`.
2. Fetch the latest official sources listed above.
3. Identify only new or changed facts that matter to users and are not already in the page.
4. Update the page conservatively:
   - Preserve the existing structure and section headings.
   - Preserve the formatting style and conventions already in the file.
   - Avoid unnecessary rewrites or restructuring.
   - Keep the `lastUpdated` frontmatter timestamp current if any content changed.
5. Confirm every change is supported by an official source fetched during this run.
6. If the page is already current, do not make any edits.

### Content selection rules

Include only information that is:

- user-facing and user-actionable (the user can go try it right now)
- relevant to Copilot CLI usage: commands, flags, configuration, hooks, instruction files, MCP servers, skills, environment variables, permission prompts, or observability
- backed by an official source fetched during the update
- not already accurately covered in the page

Exclude:

- internal or backend implementation details the user does not control
- passive improvements with no user action required
- speculative or weakly supported claims
- information unrelated to Copilot CLI users
- installation guides or getting-started tutorials

### Quality bar

Before committing, verify:

- every added or changed fact is grounded in an official source fetched this run
- wording is clear, concise, and matches the existing page style
- no unsupported claims were added
- the page remains coherent as a single handbook reference
- only `src/content/handbook/index.md` was changed

### Commit

Commit directly to `main` with message: `[handbook] Update from official sources – <date>`

### Validation

After editing, run:

```bash
npm run lint       # Prettier check + markdownlint-cli2
npm run test:e2e   # Playwright regression (auto-starts build+preview)
```

## References

- Every fact stated in the handbook must be backed by an official source. Link to the specific source at the end of each bullet.
- Do not use the generic GitHub Copilot how-tos landing page as evidence for a handbook fact; use the exact Copilot CLI how-to page URL when a how-to is the source.
- Do not use the generic GitHub Copilot Blog category page as evidence for a handbook fact; use the exact Copilot CLI blog post URL when the blog is the source.
