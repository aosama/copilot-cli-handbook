---
title: "GitHub Copilot CLI — Feature Releases"
description: "Every feature in GitHub Copilot CLI, grouped by release date"
lastUpdated: "February 2026"
---

Every user-facing feature shipped in [GitHub Copilot CLI](https://github.com/github/copilot-cli/releases), newest first. No fluff — just what you can use and when it landed.

---

## 0.0.410 — 2026-02-14

- `/init suppress` to control init suggestions per repository
- Show IDE file selection indicator in the status bar when connected to an IDE
- Repo-level settings to disable individual validation tools
- Page Up/Page Down keyboard scrolling in alt-screen mode
- Ctrl+Z suspend/resume support on Unix platforms
- Tilde (~) expansion in MCP server cwd configuration
- ctrl+n and ctrl+p as arrow key alternatives
- Exit CLI with ctrl+d on empty prompt
- Shift+Enter inserts newlines in terminals with kitty keyboard protocol
- Shell mode removed from Shift+Tab cycle, accessed only via `!`
- Copilot co-authored-by trailer added to git commits automatically

## 0.0.409 — 2026-02-12

- `/diff` uses full screen in alt-screen mode
- Quick help overlay: press `?` to see grouped shortcuts and commands
- CLI integrates with VS Code — use `/ide` for details
- Default plugin marketplaces (copilot-plugins, awesome-copilot) included for easier plugin discovery

## 0.0.408 — 2026-02-12

- Add `/streamer-mode` to hide preview model names and quota details for streaming
- Add mouse text selection in --alt-screen mode
- Add substring matching to slash command autocomplete
- Change run command shortcut from ctrl+p to ctrl+s

## 0.0.407 — 2026-02-11

- Theme picker shows live preview of diffs and markdown, adds colorblind and tritanopia theme variants
- `/on-air` mode to hide model names and quota details for streaming
- `/tasks` shows Recent Activity for background agents
- `--alt-screen` experimental alternate screen buffer mode
- Add option to approve tool permissions permanently for a location
- `/instructions` command to view and toggle custom instruction files
- Ctrl-b and ctrl-f cursor movement now available on all platforms
- Ctrl+d now favors deleting character after cursor, with queueing moved to ctrl+q (or ctrl+enter)
- Workspace-local MCP configuration via `.vscode/mcp.json`
- Tab cycles modes forward, Shift+Tab backward; shell is now a mode
- Ctrl+P runs slash commands while preserving input (replaces Ctrl+X → /)
- MCP servers using Microsoft OAuth configure automatically without manual client ID setup
- Support for gpt-5.3-codex model

## 0.0.406 — 2026-02-07

- Support for Claude Opus 4.6 Fast (Preview)
- Markdown formatting displays in non-interactive mode output
- Warning displayed when user has no Copilot subscription
- Commands from plugins are now translated into skills
- `/changelog` command to view release notes
- Plugin marketplace add accepts URLs as sources
- `--no-experimental` flag disables experimental features
- `/mcp show` displays enabled/disabled status for MCP tools

## 0.0.405 — 2026-02-05

- `/experimental` shows help screen listing experimental features
- Plugins can bundle LSP server configurations

## 0.0.404 — 2026-02-05

- Support for claude-opus-4.6 model
- `/allow-all` and `/yolo` execute immediately
- `/tasks` command to view and manage background tasks
- Background agents enabled for all users
- GITHUB_TOKEN environment variable accessible in agent shell sessions

## 0.0.403 — 2026-02-04

- Reasoning summaries enabled by default for supporting models
- Comma-separated tools supported in custom agent frontmatter

## 0.0.402 — 2026-02-03

- Plugins can provide hooks for session lifecycle events

## 0.0.401 — 2026-02-03

- `.agents/skills` directory for auto-loading skills
- Claude-style `.mcp.json` format supported without mcpServers wrapper
- Shift+Enter inserts new line in VS Code integrated terminal
- `copilot login` subcommand for ACP terminal-auth
- agentStop and subagentStop hooks to control agent completion
- /diff displays accurate line numbers with dual column layout

## 0.0.400 — 2026-01-30

- MCP server instructions support
- `/theme` command with GitHub Dark/Light themes
- Show progress indicator in terminal tab when thinking
- Autopilot mode for autonomous task completion (experimental)
- Fuzzy search in model picker
- `copilot plugin` subcommand for non-interactive plugin management
- Diff mode file list uses carousel navigation, showing up to 5 files at a time
- UNIX keyboard bindings (Ctrl+A/E/W/U/K, Alt+arrows) and multiline content in text inputs
- `launch_messages` config for startup announcements

## 0.0.399 — 2026-01-29

- Ctrl+X then / to run slash commands without losing your input
- `/allow-all` and `/yolo` commands to auto-approve all permissions during a session
- Agent creation wizard can auto-generate name, description, and instructions from an initial description
- LSP (Language Server Protocol) tool for code intelligence
- Sessions get AI-generated names from first message
- `.claude/commands/` single-file commands as simpler alternative to skills
- `/diff` command to review session changes
- Undo/rewind to previous states with double-Esc

## 0.0.398 — 2026-01-28

- Skills from parent directories are now invocable and work in non-git directories

## 0.0.397 — 2026-01-28

- `/mcp show <server-name>` displays server details and available tools
- Content pasted into the prompt over 30 KB is automatically saved to workspace files
- `--acp` flag to start as Agent Client Protocol server
- Directories appear in @mention autocomplete

## 0.0.396 — 2026-01-27

- Create custom agents through interactive CLI wizard
- `copilot version` and `copilot update` commands
- preToolUse hooks can deny tool execution and modify arguments
- `/plugin install` supports GitHub repos, URLs, and local paths
- `/experimental` command and `--experimental` flag to opt into experimental features
- `/init` command to generate Copilot instructions
- Plugins can provide custom agents
- Commenting in /diff mode for line-specific feedback

## 0.0.395 — 2026-01-26

- `/mcp show` displays all configured MCP servers including defaults and plugin servers
- Load local shell configuration in agent sessions
- Plugin skills usable by the agent
- Completed tool calls display in prompt mode

## 0.0.394 — 2026-01-24

- Support for GitHub Enterprise Cloud (*.ghe.com) in `/delegate` command
- `/delegate` command accepts optional prompt, uses conversation context
- Queue slash commands alongside messages using Ctrl+D
- Press `/` to search sessions in `/resume`

## 0.0.393 — 2026-01-23

- GHE Cloud (*.ghe.com) remote custom agents
- Esc-Esc to undo file changes to any previous snapshot

## 0.0.392 — 2026-01-22

- `/plugin` command for plugin marketplace management
- `/rename` command as alias for `/session rename`
- `/plugin update` command to update installed plugins
- Edit tool displays diffs when expanded in timeline

## 0.0.390 — 2026-01-22

- Enable steering during plan mode

## 0.0.389 — 2026-01-22

- MSI installer for Windows
- MCP servers can authenticate using OAuth 2.0 with automatic token management and refresh
- Plugins can bundle MCP servers that load automatically when installed
- Invoke skills using slash commands like `/skill-name`
- `/diff` command to review changes made during the current session
- `/models` as alias for `/model` command
- Shell commands (`!`) can run in parallel while agent is working

## 0.0.388 — 2026-01-20

- `/review` command to analyze code changes
- `--enable-all-github-mcp-tools` flag enables read-write GitHub MCP tools

## 0.0.387 — 2026-01-20

- ask_user tool for interactive clarification questions
- Plan mode with dedicated panel for viewing implementation plans

## 0.0.386 — 2026-01-19

- `/resume` command to switch sessions

## 0.0.385 — 2026-01-19

- Current intent displayed in terminal tab title
- All custom instruction files combined instead of priority-based fallbacks
- Infinite sessions with automatic context management through compaction checkpoints

## 0.0.384 — 2026-01-16

- `&` prefix shortcut for delegating prompts to run in background (equivalent to `/delegate`)
- Configure reasoning effort for GPT models
- `/cd` as alias for `/cwd` command
- Files created by the CLI available for @-mention
- Extended thinking for Anthropic Claude models
- 'Approve for session' auto-approves pending parallel permission requests of the same type
- Reasoning view setting persists across sessions
- Repo memories injected in prompt; memory storage tool to remember facts across sessions
- Proxy URLs supported without scheme (e.g., localhost:9999)

## 0.0.382 — 2026-01-14

- GPT-5.2-Codex model available
- `--config-dir` flag to override default configuration directory location

## 0.0.381 — 2026-01-13

- `--allow-all` and `--yolo` flags to enable all permissions at once
- `/new` as alias for `/clear` command
- Shell mode history filters by prefix — typing `!git` and pressing up arrow cycles only through previous git commands

## 0.0.380 — 2026-01-13

- `--agent` flag works in interactive mode
- Inline feedback when rejecting tool permission requests so agents can continue
- Send messages while Copilot is thinking to steer or queue

## 0.0.376 — 2026-01-08

- Load remote sessions using GraphQL ID or session picker
- Task tool subagents can process images

## 0.0.375 — 2026-01-07

- Ctrl+T to toggle reasoning summaries for supported models
- `--share` and `--share-gist` flags for session sharing in non-interactive mode

## 0.0.374 — 2026-01-02

- Auto-compaction at 95% token limit and `/compact` command
- Built-in subagents for exploring and managing tasks
- Built-in `web_fetch` tool for fetching web content

## 0.0.373 — 2025-12-30

- Tab completion for path arguments in slash commands like `/cwd` and `/add-dir`
- Copilot Spaces tools enabled in GitHub MCP Server

## 0.0.372 — 2025-12-19

- Enable disabled models directly in CLI when selecting or specifying them
- `/context` command to visualize token usage
- `--resume` flag to continue remote sessions locally
- URL permission controls for shell commands that access the web

## 0.0.370 — 2025-12-18

- STDIO type synonymous with Local for MCP servers in CLI configuration UI
- Diff display uses your configured git pager (delta, diff-so-fancy)
- `--available-tools` and `--excluded-tools` flags to filter which tools the model can use

## 0.0.369 — 2025-12-11

- Add support for GPT-5.2

## 0.0.368 — 2025-12-10

- Add grep tool for Codex models

## 0.0.367 — 2025-12-04

- GPT-5.1-Codex-Max is now available in GitHub Copilot CLI

## 0.0.366 — 2025-12-03

- `infer` property to control custom agent tool visibility
- CLI executables available in GitHub release artifacts
- apply_patch toolchain for OpenAI Codex models

## 0.0.365 — 2025-11-25

- `--silent` option to suppress stats output for scripting

## 0.0.364 — 2025-11-25

- Add syntax highlighting for diffs

## 0.0.363 — 2025-11-24

- Opus 4.5, GPT-4.1, and GPT-5-Mini models available
- GITHUB_ASKPASS environment variable supported for authentication
- MCP servers work in `--prompt` mode

## 0.0.362 — 2025-11-20

- Paste image data from clipboard directly into the CLI

## 0.0.361 — 2025-11-18

- Gemini 3 Pro model available

## 0.0.359 — 2025-11-17

- Add images to context via drag & drop or pasting paths to image files
- `/share` command to save session as markdown file or GitHub gist
- `copilot -p` no longer interactively prompts for permission requests

## 0.0.356 — 2025-11-13

- GPT-5.1, GPT-5.1-Codex, and GPT-5.1-Codex-Mini models available

## 0.0.355 — 2025-11-12

- CLI agent can read its own `/help` and README to answer questions about its capabilities
- Bundled `ripgrep` with `grep` and `glob` tools for faster codebase searching

## 0.0.354 — 2025-11-03

- `COPILOT_GITHUB_TOKEN` environment variable for authentication (takes precedence over `GH_TOKEN`)
- MCP servers in GitHub Actions automatically use `GITHUB_WORKSPACE` as working directory

## 0.0.353 — 2025-10-28

- Custom agents: define in `~/.copilot/agents`, `.github/agents` in your repo, or your org's `.github` repo. Invoke with `/agent` slash command or `--agent <agent>` flag
- `/delegate` command to delegate a task asynchronously to Copilot coding agent

## 0.0.350 — 2025-10-23

- `--enable-all-github-mcp-tools` to restore the full set of GitHub MCP server tools (default set reduced to conserve context)

## 0.0.349 — 2025-10-22

- Parallel tool calling — the model can call multiple tools at once. Disable with `--disable-parallel-tools-execution`
- `/quit` as alias of `/exit`
- Temp directory accessible to the model by default. Disable with `--disallow-temp-dir`

## 0.0.348 — 2025-10-21

- Token-by-token streaming output. Disable with `--stream off`

## 0.0.344 — 2025-10-17

- GitHub MCP server enabled in prompt mode
- Detached process execution in the bash tool

## 0.0.343 — 2025-10-16

- Haiku 4.5 model available
- `--additional-mcp-config` flag to augment MCP server configuration per session (inline JSON or from file, supports multiple passes)

## 0.0.342 — 2025-10-15

- Multi-line input via Shift+Ctrl on Kitty-protocol terminals; also via `/terminal-setup` in VSCode
- Non-interactive GHE logins via `GH_HOST` environment variable
- Persistent `log_level` option in `~/.copilot/config`

## 0.0.341 — 2025-10-14

- `/terminal-setup` command to set up multi-line input on terminals not implementing the Kitty protocol
- Each model's premium request multiplier shown in `/model` list

## 0.0.340 — 2025-10-13

- `--allow-all-paths` argument to approve access to all paths in `-p` mode
- MCP server env config now treats values as literals; use `${VAR}` syntax for environment variable references

## 0.0.339 — 2025-10-10

- `/mcp add` "Command" field accepts a full command as if running it in a shell

## 0.0.337 — 2025-10-08

- Multi-line input for terminals supporting the Kitty protocol
- Ctrl+B and Ctrl+F for moving cursor back and forward

## 0.0.336 — 2025-10-07

- Proxy support via HTTPS_PROXY/HTTP_PROXY environment variables regardless of Node version
- Persistent `--screen-reader` preference prompt

## 0.0.335 — 2025-10-06

- File diffs shown in timeline by default
- Slash command input shows argument hints

## 0.0.334 — 2025-10-03

- Large pastes displayed as compact tokens like `[Paste #1 - 15 lines]`
- Warning when conversation context approaches ≤20% remaining of model's limit

## 0.0.333 — 2025-10-02

- Image support via `@`-mention
- Execute shell commands directly by prepending input with `!`
- `/usage` command for premium request usage, session time, code changes, and per-model token stats
- `--screen-reader` mode with informative labels replacing icons
- `--continue` flag to resume the most recently closed session

## 0.0.331 — 2025-10-01

- `/model` list only shows models the user has access to
- Scrollbar in the `@` file mentioning picker

## 0.0.329 — 2025-09-29

- Claude Sonnet 4.5 model available
- `/model` command to change the model interactively or with `/model <model>`
- Currently selected model shown above the input text box
- Ctrl+R to expand only recent timeline items; Ctrl+E to expand all
- Glob matching in shell rules for `--allow-tool` and `--deny-tool`

---

Source: [github/copilot-cli/releases](https://github.com/github/copilot-cli/releases) · Last updated: February 2026
