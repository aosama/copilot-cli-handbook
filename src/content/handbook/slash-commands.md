---
title: 'Slash Commands'
description: 'Interactive commands you can type in GitHub Copilot CLI'
---

Interactive commands you type in the CLI, starting with `/`.

## Table of Contents

- [Session Management](#session-management)
- [Review & Code](#review--code)
- [Mode & Agents](#mode--agents)
- [Tools & Extensions](#tools--extensions)
- [Configuration & Meta](#configuration--meta)

## Session Management

- `/clear` (or `/new` v0.0.381) — Start a fresh session.
- `/resume` (v0.0.386) — Switch to or resume a previous session (press `/` to search).
- `/rename` (v0.0.392) — Rename the current session.
- `/login` (v0.0.401) — Login for ACP terminal-auth.

## Review & Code

- `/diff` (v0.0.389) — Review session changes (full screen in v0.0.409).
- `/review` (v0.0.388) — Analyze code changes.

## Mode & Agents

- `/tasks` (v0.0.404) — View and manage background tasks/agents.
- `/delegate` (v0.0.394) — Delegate a prompt to run in the background.
- `/yolo` / `/allow-all` (v0.0.399) — Auto-approve all permissions for the session.

## Tools & Extensions

- `/mcp` (v0.0.397) — Manage MCP tools (`/mcp show` in v0.0.406).
- `/plugin` (v0.0.392) — Manage plugins (install/update).
- `/init` (v0.0.396) — Generate Copilot instructions.

## Configuration & Meta

- `/help` (`?` in v0.0.409) — Show help overlay.
- `/version` (v0.0.396) — Display CLI version.
- `/update` (v0.0.396) — Update the CLI.
- `/theme` (v0.0.400) — Switch between GitHub Dark/Light themes.
- `/on-air` (v0.0.407) — Hide model names and quota details.
- `/streamer-mode` (v0.0.408) — Hide preview model names and quota details.
- `/ide` (v0.0.409) — Details on VS Code integration.
- `/changelog` (v0.0.406) — View release notes.
- `/experimental` (v0.0.396) — Feature help screen (v0.0.405).