---
title: "GitHub Copilot CLI — Feature Releases"
description: "Every feature in GitHub Copilot CLI, grouped by release date"
lastUpdated: "February 2026"
---

Every user-facing feature shipped in [GitHub Copilot CLI](https://github.com/github/copilot-cli/releases), newest first. No fluff — just what you can use and when it landed.

---

## 0.0.410 — 2026-02-14

- Add `/init suppress` to control init suggestions per repository
- Show IDE file selection indicator in the status bar when connected to an IDE
- Add repo-level settings to disable individual validation tools
- ACP server supports loading existing sessions
- Page Up/Page Down keyboard scrolling in alt-screen mode
- Add Ctrl+Z suspend/resume support on Unix platforms
- Support tilde (~) expansion in MCP server cwd configuration
- Support ctrl+n and ctrl+p as arrow key alternatives
- Exit CLI with ctrl+d on empty prompt
- Shift+Enter inserts newlines in terminals with kitty keyboard protocol
- Shell mode removed from Shift+Tab cycle, accessed only via `!`
- Add Copilot co-authored-by trailer to git commits created

## 0.0.409 — 2026-02-12

- `/diff` uses full screen in alt-screen mode
- Quick help overlay: press `?` to see grouped shortcuts and commands, navigate with arrow keys
- Add `list_copilot_spaces` tool to default GitHub MCP config
- CLI now integrates with VS Code, use `/ide` for more information
- Include default plugin marketplaces (copilot-plugins, awesome-copilot) for easier plugin discovery

## 0.0.408 — 2026-02-12

- Add `/streamer-mode` to hide preview model names and quota details for streaming
- Add mouse text selection in --alt-screen mode
- Add substring matching to slash command autocomplete
- Change run command shortcut from ctrl+p to ctrl+s

## 0.0.407 — 2026-02-11

- Theme picker shows live preview of diffs and markdown, adds colorblind and tritanopia theme variants
- Add `/on-air` mode to hide model names and quota details for streaming
- Show agent type and description in read_agent timeline entries
- `/tasks` shows Recent Activity for background agents
- Add experimental alternate screen buffer mode: `--alt-screen`
- Interactive programs that query terminal state work in shell
- Add `tools.list` RPC to query available built-in tools
- Streaming responses automatically retry when interrupted by server errors
- Add option to approve tool permissions permanently for a location
- Add `/instructions` command to view and toggle custom instruction files
- Ctrl-b and ctrl-f cursor movement now available on all platforms
- Ctrl+d now favors deleting character after cursor, with queueing moved to ctrl+q (or ctrl+enter)
- Add workspace-local MCP configuration via `.vscode/mcp.json`
- Tab cycles modes forward, Shift+Tab backward; shell is now a mode
- Ctrl+P runs slash commands while preserving input (replaces Ctrl+X → /)
- ask_user tool asks one question at a time for clearer interaction
- MCP servers using Microsoft OAuth configure automatically without manual client ID setup
- Add support for gpt-5.3-codex

## 0.0.406 — 2026-02-07

- Add support for Claude Opus 4.6 Fast (Preview)
- Markdown formatting displays in non-interactive mode output
- Display warning when user has no Copilot subscription
- Commands from plugins are now translated into skills
- Add `/changelog` command to view release notes
- Plugin marketplace add accepts URLs as sources
- `--no-experimental` flag disables experimental features
- `/mcp show` displays enabled/disabled status for MCP tools
- MCP tool responses now include structured content (images, resources) for richer UI display in VS Code

## 0.0.405 — 2026-02-05

- Plugin and marketplace names support uppercase letters
- `/experimental` shows help screen listing experimental features
- Plugins can bundle LSP server configurations

## 0.0.404 — 2026-02-05

- Add support for claude-opus-4.6 model
- `/allow-all` and `/yolo` execute immediately
- Cancel --resume session picker to start a new session
- Add `/tasks` command to view and manage background tasks
- Enable background agents for all users
- GITHUB_TOKEN environment variable now accessible in agent shell sessions

## 0.0.403 — 2026-02-04

- ACP model info includes usage multiplier and enablement status
- Reasoning summaries enabled by default for supporting models
- Support comma-separated tools in custom agent frontmatter
- Skills with unknown frontmatter fields now load with warnings instead of being silently skipped

## 0.0.402 — 2026-02-03

- ACP server supports agent and plan session modes
- MCP configuration applies to ACP mode
- Plugins can provide hooks for session lifecycle events

## 0.0.401 — 2026-02-03

- Support `.agents/skills` directory for auto-loading skills
- MCP tools returning structuredContent now display correctly in CLI
- Support Claude-style .mcp.json format without mcpServers wrapper
- Inserting new line with shift+enter keybinding in VS Code integrated terminal
- Add `copilot login` subcommand and support ACP terminal-auth
- Add agentStop and subagentStop hooks to control agent completion
- /diff displays accurate line numbers with dual column layout

## 0.0.400 — 2026-01-30

- Add MCP server instructions support
- Timeline displays user responses to `ask_user` tool prompts with username
- Add theme picker with `/theme` command and GitHub Dark/Light themes
- ACP server supports changing models during a session
- ACP server support permission flags: --yolo, --allow-all, etc. and permissions config
- Show progress indicator in terminal tab when thinking
- Remove bundled LSP servers (TypeScript, Python)
- Add autopilot mode for autonomous task completion (experimental)
- Add fuzzy search to model picker
- Add `copilot plugin` subcommand for non-interactive plugin management
- Diff mode file list uses carousel navigation, showing up to 5 files at a time
- Better support for UNIX keyboard bindings (Ctrl+A/E/W/U/K, Alt+arrows) and multiline content in various text inputs
- Add `launch_messages` config for startup announcements

## 0.0.399 — 2026-01-29

- Press Ctrl+X then / to run slash commands without losing your input
- Add `/allow-all` and `/yolo` commands to auto-approve all permissions during a session
- Add Copilot option for agent creation wizard to generate name, description, and instructions based on initial agent description
- Add LSP (Language Server Protocol) tool for code intelligence
- Sessions get AI-generated names from first message
- Support `.claude/commands/` single-file commands as simpler alternative to skills
- Add `/diff` command to review session changes
- Undo/rewind to previous states with double-Esc

## 0.0.398 — 2026-01-28

- Skills from parent directories are now invocable and work in non-git directories

## 0.0.397 — 2026-01-28

- `/mcp show <server-name>` displays server details and available tools
- Content pasted into the prompt over 30 KB is automatically saved to workspace files
- Add --acp flag to start as Agent Client Protocol server
- Directories now appear in @mention autocomplete

## 0.0.396 — 2026-01-27

- Skill names can include uppercase letters
- `/skills add` works with directories that contain SKILL.md directly
- Create custom agents through interactive CLI wizard
- Tool filtering flags now apply to subagents
- Add `copilot version` and `copilot update` commands
- preToolUse hooks can deny tool execution and modify arguments
- `/plugin install` supports GitHub repos, URLs, and local paths
- Add `/experimental` command and `--experimental` flag to opt into experimental features
- Add `/init` command to generate Copilot instructions
- Plugins can provide custom agents
- Add commenting to /diff mode for line-specific feedback

## 0.0.395 — 2026-01-26

- `/mcp show` displays all configured MCP servers including defaults and servers from additional configuration
- `/mcp show` displays servers from installed plugins
- Load local shell configuration in agent sessions
- Plugin skills are now usable by the agent
- Completed tool calls display in prompt mode
- Add commenting to /diff mode for line-specific feedback

## 0.0.394 — 2026-01-24

- Deduplicate identical model instruction files to save context
- Add support for GitHub Enterprise Cloud (*.ghe.com) in /delegate command
- Plugin skills work in agent responses
- SDK supports infinite sessions with automatic context compaction
- `/delegate` command accepts optional prompt, uses conversation context
- Queue slash commands alongside messages using Ctrl+D
- Press `/` to search sessions in `/resume`

## 0.0.393 — 2026-01-23

- Add support for GHE Cloud (*.ghe.com) remote custom agents
- Add Esc-Esc to undo file changes to any previous snapshot

## 0.0.392 — 2026-01-22

- Add `/plugin` command for plugin marketplace management
- Add /rename command as alias for /session rename
- Add /plugin update command to update installed plugins
- Edit tool now displays diffs when expanded in timeline

## 0.0.390 — 2026-01-22

- Preserve extended thinking after compaction
- Enable steering during plan mode

## 0.0.389 — 2026-01-22

- Add MSI installer for Windows
- MCP servers can now authenticate using OAuth 2.0 with automatic token management and refresh
- Display progress messages from MCP tools in timeline
- Plugins can bundle MCP servers that load automatically when installed
- Invoke skills using slash commands like /skill-name
- Add `/diff` command to review changes made during the current session
- Add `/models` as alias for `/model` command
- Shell commands (!) can run in parallel while agent is working

## 0.0.388 — 2026-01-20

- Add `/review` command to analyze code changes
- `--enable-all-github-mcp-tools` flag now enables read-write GitHub MCP tools
- Redesign CLI header with branded mascot and streamlined welcome message

## 0.0.387 — 2026-01-20

- Add ask_user tool for interactive clarification questions
- Add plan mode with dedicated panel for viewing implementation plans

## 0.0.386 — 2026-01-19

- Add `/resume` command to switch sessions

## 0.0.385 — 2026-01-19

- Display current intent in terminal tab title
- Combine all custom instruction files instead of using priority-based fallbacks
- Enable infinite sessions with automatic long-running context management through compaction checkpoints

## 0.0.384 — 2026-01-16

- Add `&` prefix shortcut for delegating prompts to run in background (equivalent to `/delegate`)
- Allow users to configure the reasoning effort for gpt models
- Add `/cd` as an alias for `/cwd` command
- Files created by the CLI are available for @-mention
- Enable extended thinking for Anthropic Claude models
- Selecting 'approve for session' now auto-approves pending parallel permission requests of the same type
- Reasoning view setting persists across sessions
- Inject repo memories in the prompt and add memory storage tool to remember facts across sessions
- Support proxy URLs without scheme (e.g., localhost:9999)

## 0.0.382 — 2026-01-14

- Add support for GPT-5.2-Codex model
- Add `--config-dir` flag to override default configuration directory location

## 0.0.381 — 2026-01-13

- Add --allow-all and --yolo flags to enable all permissions at once
- Ghost text and tab completion show correct alias when typing slash commands
- Add `/new` as an alias for `/clear` command
- Shell mode history navigation now filters by prefix — typing `!git` and pressing up arrow cycles only through previous git commands

## 0.0.380 — 2026-01-13

- The `--agent` flag now works in interactive mode
- Provide inline feedback when rejecting tool permission requests so agents don't have to stop
- Auto-compaction runs in background without blocking the conversation
- Abort signals now propagate to sub-agents, allowing task cancellation to stop all nested agent work
- Custom agent tool aliasing for the task tool
- Allow reading files >10MB when using view_range parameter
- Send messages while Copilot is thinking to steer or queue

## 0.0.377 — 2026-01-08

- Large file messages now encourage incremental reading with view_range

## 0.0.376 — 2026-01-08

- Loading remote sessions using GraphQL ID or session picker
- Task tool subagents can now process images

## 0.0.375 — 2026-01-07

- Add Ctrl+T to toggle reasoning summaries for supported models
- Add --share and --share-gist flags for session sharing in non-interactive mode

## 0.0.374 — 2026-01-02

- Add auto-compaction at 95% token limit and `/compact` command
- Built-in subagents for exploring and managing tasks
- Built in `web_fetch` tool for fetching web content

## 0.0.373 — 2025-12-30

- Tab completion for path arguments in slash commands like `/cwd` and `/add-dir`
- Enable Copilot Spaces tools in GitHub MCP Server

## 0.0.372 — 2025-12-19

- Enable disabled models directly in CLI when selecting or specifying them
- Add `/context` command to visualize token usage
- Add `--resume` flag to continue remote sessions locally
- Add URL permission controls which affect common shell commands which access the web

## 0.0.371 — 2025-12-18

- Normal text respects terminal's default foreground color

## 0.0.370 — 2025-12-18

- Add STDIO type as synonymous for Local for MCP servers in CLI configuration UI
- Diff display uses your configured git pager (delta, diff-so-fancy)
- Publish SHA256 checksums for CLI executables in releases
- Add --available-tools and --excluded-tools to filter which tools the model can use

## 0.0.369 — 2025-12-11

- Add support for GPT-5.2

## 0.0.368 — 2025-12-10

- Add grep tool for Codex models

## 0.0.367 — 2025-12-04

- GPT-5.1-Codex-Max is now available in GitHub Copilot CLI

## 0.0.366 — 2025-12-03

- Add `infer` property to control custom agent tool visibility
- Add CLI executables to GitHub release artifacts
- Add apply_patch toolchain for OpenAI Codex models

## 0.0.365 — 2025-11-25

- Add `--silent` option to suppress stats output for scripting

## 0.0.364 — 2025-11-25

- Add syntax highlighting for diffs

## 0.0.363 — 2025-11-24

- Opus 4.5, GPT-4.1 and GPT-5-Mini are now available in GitHub Copilot CLI
- Add support for GITHUB_ASKPASS environment variable for authentication
- MCP servers work in `--prompt` mode

## 0.0.362 — 2025-11-20

- Paste image data from your clipboard directly into the CLI

## 0.0.361 — 2025-11-18

- Gemini 3 Pro is now available in GitHub Copilot CLI

## 0.0.359 — 2025-11-17

- Support adding images to context via drag & dropping and pasting paths to image files
- Add `/share` command to save session as markdown file or GitHub gist
- Enable `USE_BUILTIN_RIPGREP` environment variable to optionally use ripgrep from PATH
- `copilot -p` will no longer interactively prompt for permission requests

## 0.0.358 — 2025-11-14

- Recovery release to fix availability of GPT-5.1, GPT-5.1-Codex, and GPT-5.1-Codex-Mini models

## 0.0.356 — 2025-11-13

- GPT-5.1, GPT-5.1-Codex, and GPT-5.1-Codex-Mini are now available in GitHub Copilot CLI

## 0.0.355 — 2025-11-12

- Enabled the CLI agent to read its own `/help` and README to answer questions about its capabilities
- Bundled `ripgrep` and added `grep` and `glob` tools for more performant searching of codebases
- Added more detail and improved the styling of the `/session` command's output

## 0.0.354 — 2025-11-03

- Exit with nonzero code when `-p` mode fails due to LLM backend errors
- Support for MCP server tool notifications
- Support for `COPILOT_GITHUB_TOKEN` environment variable for authentication
- MCP servers in GitHub Actions environments automatically use `GITHUB_WORKSPACE` as working directory

## 0.0.353 — 2025-10-28

- Added support for custom agents. Custom agent definitions are pulled from `~/.copilot/agents`, `.github/agents` in your repository, or your organization's `.github` repository. You can invoke an agent with the `/agent` slash command or `--agent <agent>` flag. Agents are also provided as tools the model can call
- Added a `/delegate` command to delegate a task asynchronously to Copilot coding agent

## 0.0.351 — 2025-10-24

- Improved path detection heuristic to avoid unnecessary permissions requests for standard bash/PowerShell commands, shell redirections, `gh api` arguments, and code comments

## 0.0.350 — 2025-10-23

- Limited the list of tools available to the default GitHub MCP server to conserve context window space. Added `--enable-all-github-mcp-tools` to turn on all available tools

## 0.0.349 — 2025-10-22

- The model can now call multiple tools in parallel. Disable with `--disable-parallel-tools-execution`
- Added `/quit` as an alias of `/exit`
- Added the temp directory to the paths the model has access to by default. Disable with `--disallow-temp-dir`

## 0.0.348 — 2025-10-21

- Copilot's output now streams in token-by-token. Disable with `--stream off`

## 0.0.344 — 2025-10-17

- Enabled GitHub MCP server in prompt mode
- Added support for executing detached processes in the bash tool
- Added list of supported models as part of `copilot help config` text

## 0.0.343 — 2025-10-16

- Added Haiku 4.5 model
- Added `--additional-mcp-config` flag to augment MCP server configuration per session (inline JSON or from file, supports multiple passes)
- Added a prompt for users to run `/terminal-setup` if needed to enable multi-line input

## 0.0.342 — 2025-10-15

- Overhauled session logging format. New sessions stored in `~/.copilot/session-state`
- Enabled the Kitty protocol by default for multi-line input via Shift+Ctrl. Also supported in VSCode via `/terminal-setup`
- Enabled non-interactive GHE logins by respecting the `GH_HOST` environment variable
- Added persistent `log_level` option in `~/.copilot/config`

## 0.0.341 — 2025-10-14

- Added `/terminal-setup` command to set up multi-line input on terminals not implementing the kitty protocol
- Added each model's premium request multiplier to the `/model` list

## 0.0.340 — 2025-10-13

- Removed the "Windows support is experimental" warning
- Added a prompt to approve new paths in `-p` mode. Added `--allow-all-paths` argument
- Changed MCP server env config to treat values as literals; use `${VAR}` syntax for environment variable references

## 0.0.339 — 2025-10-10

- Improved MCP server argument input in `/mcp add` — the "Command" field now accepts a full command as if running it in a shell

## 0.0.338 — 2025-10-09

- Moved Kitty protocol support behind the `COPILOT_KITTY` environment variable due to regressions

## 0.0.337 — 2025-10-08

- Added support for multi-line input for terminals that support the Kitty protocol
- Added support for Ctrl+B and Ctrl+F for moving cursor back and forward
- Added validation for MCP server names

## 0.0.336 — 2025-10-07

- Enabled proxy support via HTTPS_PROXY/HTTP_PROXY environment variables regardless of Node version
- Significantly reduced token consumption, round trips per problem, and time to result
- Added a prompt for users who launch with `--screen-reader` to persistently save this preference

## 0.0.335 — 2025-10-06

- File diffs shown in timeline by default without needing Ctrl+R
- Slash command input shows argument hints in the input box

## 0.0.334 — 2025-10-03

- Large pastes displayed as compact tokens like `[Paste #1 - 15 lines]` instead of flooding the terminal
- Added a warning when conversation context approaches ≤20% remaining of the model's limit

## 0.0.333 — 2025-10-02

- Added image support via @-mention
- Added support for directly executing shell commands by prepending input with `!`
- Added `/usage` slash command for premium request usage, session time, code changes, and per-model token stats
- Added `--screen-reader` mode with informative labels replacing icons
- Added a `--continue` flag to resume the most recently closed session

## 0.0.332 — 2025-10-01

- Switched to per-subscription Copilot API endpoints

## 0.0.331 — 2025-10-01

- Improved the `/model` list to only show models the user has access to
- Added a scrollbar to the `@` file mentioning picker

## 0.0.330 — 2025-09-29

- Changed the default model back to Sonnet 4 (Sonnet 4.5 still available via `/model`)

## 0.0.329 — 2025-09-29

- Added support for Claude Sonnet 4.5 and made it the default model
- Added `/model` slash command to change the model interactively or with `/model <model>`
- Display of currently selected model above the input text box
- Changed Ctrl+r to expand only recent timeline items; use Ctrl+e to expand all
- Added glob matching to shell rules for `--allow-tool` and `--deny-tool`

## 0.0.328 — 2025-09-26

- Improved error message when Copilot CLI is blocked by organization policy
- Improved error message when using a PAT missing the "Copilot Requests" permission

---

Source: [github/copilot-cli/releases](https://github.com/github/copilot-cli/releases) · Last updated: February 2026
