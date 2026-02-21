---
title: 'Copilot CLI Handbook'
description: 'Instruction files, slash commands, CLI arguments, and MCP configuration'
---

## Instruction File Surface

Copilot CLI looks for custom instruction files in your repository to tailor its behavior.

### Supported Files

- `.github/copilot-instructions.md`
- `.copilot/instructions.md`
- `~/.copilot/instructions/*.instructions.md` (v0.0.412) — User-level instructions applied across all repositories.

### Behavior

- **Combination (v0.0.385):** All custom instruction files found are combined. Earlier versions used a
  priority-based fallback system; now, multiple files are merged to provide comprehensive context.
- **View & Toggle (v0.0.407):** You can interactively view and enable/disable specific instruction files
  using the `/instructions` command.

### Commands

- `/instructions` — View and toggle custom instruction files (v0.0.407)
- `/init` — Generate Copilot instructions (v0.0.396)
- `/init suppress` — Control init suggestions per repository (v0.0.410)

## Slash Commands

Interactive commands you type in the CLI, starting with `/`.

### Session Management

- `/clear` (or `/new` v0.0.381) — Start a fresh session.
- `/resume` (v0.0.386) — Switch to or resume a previous session (press `/` to search).
- `/rename` (v0.0.392) — Rename the current session.
- `/login` (v0.0.401) — Login for ACP terminal-auth.

### Review & Code

- `/diff` (v0.0.389) — Review session changes (full screen in v0.0.409).
- `/review` (v0.0.388) — Analyze code changes.

### Mode & Agents

- `/tasks` (v0.0.404) — View and manage background tasks/agents.
- `/delegate` (v0.0.394) — Delegate a prompt to run in the background.
- `/yolo` / `/allow-all` (v0.0.399) — Auto-approve all permissions for the session.
- `/fleet` (v0.0.411) — Dispatch multiple subagents in parallel (available to all users).

### Tools & Extensions

- `/mcp` (v0.0.397) — Manage MCP tools (`/mcp show` in v0.0.406, `/mcp reload` in v0.0.412).
- `/plugin` (v0.0.392) — Manage plugins (install/update).
- `/init` (v0.0.396) — Generate Copilot instructions.

### Configuration & Meta

- `/help` (`?` in v0.0.409) — Show help overlay.
- `/version` (v0.0.396) — Display CLI version.
- `/update` (v0.0.396) — Update the CLI.
- `/theme` (v0.0.400) — Switch between GitHub Dark/Light themes.
- `/on-air` (v0.0.407) — Hide model names and quota details.
- `/streamer-mode` (v0.0.408) — Hide preview model names and quota details.
- `/ide` (v0.0.409) — Details on VS Code integration.
- `/changelog` (v0.0.406) — View release notes.
- `/experimental` (v0.0.396) — Feature help screen (v0.0.405).

## Command Line Arguments

Flags passed to the `copilot` or `gh copilot` executable.

### Configuration Flags

- `--no-experimental` (v0.0.406) — Disables experimental features.
- `--experimental` (v0.0.396) — Opt into experimental features.
- `--config-dir` (v0.0.382) — Override the default configuration directory location.
- `--silent` (v0.0.365) — Suppress stats output for scripting.
- `--bash-env` (v0.0.412) — Source BASH_ENV in shell sessions.

### Interface & Mode

- `--alt-screen` (v0.0.407) — Enable experimental alternate screen buffer mode (`--alt-screen on` / `--alt-screen off` syntax added in v0.0.411).
- `--acp` (v0.0.397) — Start as an Agent Client Protocol server.
- `--agent` (v0.0.380) — Enable agent mode in interactive sessions.
- `--resume` (v0.0.372) — Continue a remote session locally.

### Permissions & Tools

- `--enable-all-github-mcp-tools` (v0.0.388) — Enables read-write GitHub MCP tools.
- `--allow-all` / `--yolo` (v0.0.381) — Enable all permissions at once.
- `--available-tools` (v0.0.370) — Filter which tools the model can use.
- `--excluded-tools` (v0.0.370) — Filter which tools the model cannot use.

### Sharing

- `--share` (v0.0.375) — Session sharing information in non-interactive mode.
- `--share-gist` (v0.0.375) — Session sharing via Gist in non-interactive mode.

### Subcommands

- `copilot login` (v0.0.401) — Login for ACP terminal-auth.
- `copilot plugin` (v0.0.400) — Non-interactive plugin management.
- `copilot version` (v0.0.396) — Show version.
- `copilot update` (v0.0.396) — Update CLI.

## MCP Configuration Files

### Files

- `~/.copilot/mcp-config.json` — Default user-level MCP server configuration file.
- `--config-dir PATH` — Overrides the config directory (default `~/.copilot`).
- `.vscode/mcp.json` (v0.0.407) — Workspace-local MCP configuration.
- `.mcp.json` (v0.0.401) — Claude-style MCP config format supported without the `mcpServers` wrapper.
- Windows On-Device Registry (v0.0.411) — MCP servers can be configured via the Windows registry.

### CLI commands

- `/mcp [show|add|edit|delete|disable|enable|reload] [SERVER-NAME]` — Manage MCP server configuration.

### CLI flags

- `--additional-mcp-config JSON` or `--additional-mcp-config @path/to/file.json` — Add additional MCP
  servers config for the current session (can be used multiple times). Augments the configuration from
  `~/.copilot/mcp-config.json`.
- `--disable-mcp-server SERVER-NAME` — Disable a specific MCP server (can be used multiple times).
- `--disable-builtin-mcps` — Disable all built-in MCP servers (currently: `github-mcp-server`).

### GitHub MCP server tool selection

- `--enable-all-github-mcp-tools` — Enable all GitHub MCP server tools.
- `--add-github-mcp-toolset TOOLSET` — Add toolsets for the GitHub MCP server (use `all` for all toolsets).
- `--add-github-mcp-tool TOOL` — Add tools for the GitHub MCP server (use `*` for all tools).

### Release timeline

#### 0.0.412 — 2026-02-19

- `/mcp reload` command to reload MCP configuration.

#### 0.0.411 — 2026-02-17

- Support MCP servers from Windows On-Device Registry.

#### 0.0.410 — 2026-02-14

- Tilde (`~`) expansion in MCP server `cwd` configuration.

#### 0.0.407 — 2026-02-11

- Workspace-local MCP configuration via `.vscode/mcp.json`.
- Editing MCP servers shows existing configuration values.

#### 0.0.406 — 2026-02-07

- `/mcp show` displays enabled/disabled status for MCP tools.

#### 0.0.401 — 2026-02-03

- Support for Claude-style `.mcp.json` format without `mcpServers` wrapper.

#### 0.0.397 — 2026-01-28

- `/mcp show <server-name>` displays server details and available tools.

#### 0.0.395 — 2026-01-26

- `/mcp show` displays all configured MCP servers, including defaults, additional configuration, and plugin
  servers.

### Sources

- https://docs.github.com/en/copilot/reference/cli-command-reference
- https://github.com/github/copilot-cli/releases
