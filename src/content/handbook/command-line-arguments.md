---
title: 'Command Line Arguments'
description: 'Flags and arguments for the copilot or gh copilot CLI'
---

Flags passed to the `copilot` or `gh copilot` executable.

## Configuration Flags

- `--no-experimental` (v0.0.406) — Disables experimental features.
- `--experimental` (v0.0.396) — Opt into experimental features.
- `--config-dir` (v0.0.382) — Override the default configuration directory location.
- `--silent` (v0.0.365) — Suppress stats output for scripting.

## Interface & Mode

- `--alt-screen` (v0.0.407) — Enable experimental alternate screen buffer mode.
- `--acp` (v0.0.397) — Start as an Agent Client Protocol server.
- `--agent` (v0.0.380) — Enable agent mode in interactive sessions.
- `--resume` (v0.0.372) — Continue a remote session locally.

## Permissions & Tools

- `--enable-all-github-mcp-tools` (v0.0.388) — Enables read-write GitHub MCP tools.
- `--allow-all` / `--yolo` (v0.0.381) — Enable all permissions at once.
- `--available-tools` (v0.0.370) — Filter which tools the model can use.
- `--excluded-tools` (v0.0.370) — Filter which tools the model cannot use.

## Sharing

- `--share` (v0.0.375) — Session sharing information in non-interactive mode.
- `--share-gist` (v0.0.375) — Session sharing via Gist in non-interactive mode.

## Subcommands

- `copilot login` (v0.0.401) — Login for ACP terminal-auth.
- `copilot plugin` (v0.0.400) — Non-interactive plugin management.
- `copilot version` (v0.0.396) — Show version.
- `copilot update` (v0.0.396) — Update CLI.
