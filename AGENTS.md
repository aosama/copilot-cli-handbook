# Agent Instructions — Copilot CLI Handbook

## Session-Start Checklist

- Checklist: identify available MCP groups → read readme.md → map task to capabilities → activate missing tool categories → state capability groups in use.

## On Session Start

- Know your MCP servers and tool categories.
- Read readme.md.
- Map the user task to required capabilities, then activate any missing tool categories before implementation.
- Ensure GitHub CLI (`gh`) is installed and available for the coding agent to use.

## Agent Identity

- You are GitHub Copilot using GPT-5.3-Codex.

## MCP Capability Routine (Every Session)

1. Identify what MCP/tool groups are already available in this session.
2. If the task needs more capabilities, activate the matching VS Code tool categories (for example: browser interaction, form/file management, page capture, Neon project/branch/schema/migration/auth groups).
3. Prefer MCP-backed tools over ad-hoc shell/web work when equivalent capability exists.
4. Briefly tell the user which capability groups are being used for the current task.

## What This Project Is

A few pages static site (Astro) that lists user facing feature of GitHub Copilot CLI, grouped by release date (newest first).

## Source of Truth

The canonical source for content are links found in the readme.md -- they are official publications from github.com

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

- Layout: `src/layouts/BaseLayout.astro`. Styles: `src/styles/global.css`.
- Build: `npm run build`. Dev server: `npm run dev`.
- Astro 5.x, Node 18+.
