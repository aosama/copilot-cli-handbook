---
title: 'MCP Configuration Files'
description: 'Files, commands, and flags for configuring MCP servers in Copilot CLI'
---

## Files

- `~/.copilot/mcp-config.json` — Default user-level MCP server configuration file.
- `--config-dir PATH` — Overrides the config directory (default `~/.copilot`).
- `.vscode/mcp.json` (v0.0.407) — Workspace-local MCP configuration.
- `.mcp.json` (v0.0.401) — Claude-style MCP config format supported without the `mcpServers` wrapper.

## CLI commands

- `/mcp [show|add|edit|delete|disable|enable] [SERVER-NAME]` — Manage MCP server configuration.

## CLI flags

- `--additional-mcp-config JSON` or `--additional-mcp-config @path/to/file.json` — Add additional MCP
  servers config for the current session (can be used multiple times). Augments the configuration from
  `~/.copilot/mcp-config.json`.
- `--disable-mcp-server SERVER-NAME` — Disable a specific MCP server (can be used multiple times).
- `--disable-builtin-mcps` — Disable all built-in MCP servers (currently: `github-mcp-server`).

## GitHub MCP server tool selection

- `--enable-all-github-mcp-tools` — Enable all GitHub MCP server tools.
- `--add-github-mcp-toolset TOOLSET` — Add toolsets for the GitHub MCP server (use `all` for all toolsets).
- `--add-github-mcp-tool TOOL` — Add tools for the GitHub MCP server (use `*` for all tools).

## Release timeline

### 0.0.410 — 2026-02-14

- Tilde (`~`) expansion in MCP server `cwd` configuration.

### 0.0.407 — 2026-02-11

- Workspace-local MCP configuration via `.vscode/mcp.json`.
- Editing MCP servers shows existing configuration values.

### 0.0.406 — 2026-02-07

- `/mcp show` displays enabled/disabled status for MCP tools.

### 0.0.401 — 2026-02-03

- Support for Claude-style `.mcp.json` format without `mcpServers` wrapper.

### 0.0.397 — 2026-01-28

- `/mcp show <server-name>` displays server details and available tools.

### 0.0.395 — 2026-01-26

- `/mcp show` displays all configured MCP servers, including defaults, additional configuration, and plugin
  servers.

## Sources

- https://docs.github.com/en/copilot/reference/cli-command-reference
- https://github.com/github/copilot-cli/releases
