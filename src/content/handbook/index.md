---
title: 'Copilot CLI Handbook'
description: 'Custom instructions, commands, permissions, agents, hooks, configuration, and MCP for GitHub Copilot CLI'
lastUpdated: 'April 25, 2026 at 4:00 PM EDT'
---

## Instruction Files

Copilot CLI can load repository, path-specific, agent, and local instructions from several official file locations. [How-to: custom instructions][custom-instructions]

### Common instruction locations

- `AGENTS.md` in the repository root, the current working directory, or directories listed in `COPILOT_CUSTOM_INSTRUCTIONS_DIRS`. [How-to: custom instructions][custom-instructions]
- `.github/copilot-instructions.md` for repository-wide instructions. [How-to: custom instructions][custom-instructions]
- `.github/instructions/**/*.instructions.md` for path-specific instructions. [How-to: custom instructions][custom-instructions]
- `$HOME/.copilot/copilot-instructions.md` for local personal instructions. [How-to: custom instructions][custom-instructions]
- `COPILOT_CUSTOM_INSTRUCTIONS_DIRS` to add extra directories where Copilot CLI looks for `AGENTS.md` and `.github/instructions/**/*.instructions.md`. [How-to: custom instructions][custom-instructions]
- Custom instruction files in `.gitignored` directories (for example, `.github/instructions/`) now load correctly. [Release: v1.0.36][release-1-0-36]

### Useful commands and flags

- `/init` — Initialize Copilot custom instructions and agentic features for the repository. [Docs: slash commands][slash-commands]
- `copilot init` — Initialize Copilot custom instructions for the current repository. [Docs: CLI commands][cli-commands]
- `--no-custom-instructions` — Start without loading `AGENTS.md` and related instruction files. [Docs: CLI options][cli-options]

## Interactive Commands

- Slash commands support tab-completion for arguments and subcommands. [Release: v1.0.35][release-1-0-35]

### Session and navigation

- `/clear [PROMPT]`, `/new [PROMPT]` — Start a new conversation. `/clear` keeps configured MCP servers in the new session; `/new` backgrounds the old session. Both accept an optional initial prompt. [Docs: slash commands][slash-commands] [Release: v1.0.11][release-1-0-11] [Release: v1.0.12][release-1-0-12] [Blog: slash commands][blog-slash-commands]
- `/resume [SESSION-ID|NAME]` — Resume a previous session. Accepts short session ID prefixes (7+ hex characters) or session names. The session selector shows branch names, idle/in-use status, and supports cursor-based search. [Docs: slash commands][slash-commands] [Release: v1.0.32][release-1-0-32] [Release: v1.0.35][release-1-0-35]
- `/undo`, `/rewind` — Undo the last turn and revert file changes, or open a timeline picker to roll back to any point in conversation history (also double-Esc). Double-Esc is required to cancel in-flight work, preventing accidental interruptions. [Docs: slash commands][slash-commands] [Release: v1.0.10][release-1-0-10] [Release: v1.0.13][release-1-0-13] [Release: v1.0.36][release-1-0-36]
- `/session [info|checkpoints [n]|files|plan|rename [NAME]|cleanup|prune|delete [ID]|delete-all]` — Show session information and manage sessions. The session picker supports x-to-delete. [Docs: slash commands][slash-commands] [Release: v1.0.35][release-1-0-35]
- `/rename [NAME]` — Rename the current session (auto-generates a name if omitted). [Docs: slash commands][slash-commands]
- `/compact` — Summarize history to reduce context usage. [Docs: slash commands][slash-commands]
- `/context` — Show context window usage. [Docs: slash commands][slash-commands]
- `/cwd`, `/cd [PATH]` — Show or change the working directory. [Docs: slash commands][slash-commands] [Blog: slash commands][blog-slash-commands]
- `/add-dir PATH` — Add a directory to the allowed file-access list. Accepts relative paths (e.g. `./src`, `../sibling`). [Docs: slash commands][slash-commands] [Blog: slash commands][blog-slash-commands] [Release: v1.0.25][release-1-0-25]
- `/list-dirs` — Show directories that already have file access. [Docs: slash commands][slash-commands] [Blog: slash commands][blog-slash-commands]
- `/ask` — Ask a quick question without affecting conversation history. [Release: v1.0.27][release-1-0-27]
- `/env` — Show loaded environment details: instructions, MCP servers, skills, agents, plugins. [Release: v1.0.25][release-1-0-25]
- `/remote [on|off]` — Enable remote access to this session from GitHub.com and GitHub Mobile, or show current status. [How-to: remote steering][remote-steering] [Release: v1.0.25][release-1-0-25] [Release: v1.0.36][release-1-0-36]
- `/keep-alive [on|busy|NUMBERm|NUMBERh]` — Prevent the machine from sleeping while the session is active, while the agent is busy, or for a defined length of time. Now available without experimental mode. [Docs: slash commands][slash-commands] [Release: v1.0.36][release-1-0-36]
- `/copy` — Copy the last response to the clipboard. [Docs: slash commands][slash-commands]
- `/on-air`, `/streamer-mode` — Toggle streamer mode (hides preview model names and quota details). [Docs: slash commands][slash-commands]
- `/restart` — Restart the CLI, preserving the current session. [Docs: slash commands][slash-commands]
- `/exit`, `/quit` — Exit the CLI. [Docs: slash commands][slash-commands]

### Planning, review, and collaboration

- `/diff` — Review changes in the current directory. Also works while the agent is running. [Docs: slash commands][slash-commands] [Release: v1.0.23][release-1-0-23]
- `/review [PROMPT]` — Run the code review agent against your changes. [Docs: slash commands][slash-commands]
- `/plan [PROMPT]` — Draft an implementation plan before editing. [Docs: slash commands][slash-commands]
- `/delegate [PROMPT]` — Delegate work to a remote repository with an AI-generated pull request. [Docs: slash commands][slash-commands] [How-to: CLI agents][cli-agents-howto] [Blog: slash commands][blog-slash-commands] [Blog: terminal workflows][blog-terminal-workflows]
- `/share [file|gist|html] [session|research] [PATH]` — Export the current session or research report to Markdown, a secret gist, or a self-contained interactive HTML file. [Docs: slash commands][slash-commands] [Release: v1.0.15][release-1-0-15] [Release: v1.0.25][release-1-0-25]
- `/research TOPIC` — Run a deep research investigation using GitHub search and web sources. [Docs: research][research-docs]
- `/changelog [SUMMARIZE] [VERSION]` — Display the CLI changelog with an optional AI-generated summary. [Docs: slash commands][slash-commands] [Release: v1.0.5][release-1-0-5]
- `/pr [view|create|fix|auto]` — Operate on pull requests for the current branch. [Docs: slash commands][slash-commands] [Release: v1.0.5][release-1-0-5]

### Agents, models, skills, and plugins

- `/agent` — Choose from available agents. Also works while the agent is running. [Docs: slash commands][slash-commands] [How-to: custom agents][custom-agents-howto] [Release: v1.0.23][release-1-0-23]
- `/fleet [PROMPT]` — Run parts of a task in parallel with subagents. [Docs: slash commands][slash-commands] [How-to: /fleet][fleet-howto]
- `/tasks` — Inspect background tasks and subagent work created in the current session. [How-to: /fleet][fleet-howto]
- `/model`, `/models [MODEL]` — View or change the active model. Use `auto` to let Copilot pick the best available model for each session. [Docs: slash commands][slash-commands] [Blog: slash commands][blog-slash-commands] [Release: v1.0.32][release-1-0-32]
- `/skills [list|info|add|remove|reload] [ARGS...]` — Manage skills. [Docs: slash commands][slash-commands]
- `/instructions` — View and toggle custom instruction files. [Docs: slash commands][slash-commands]
- `/plugin [marketplace|install|uninstall|update|list] [ARGS...]` — Manage plugins and plugin marketplaces. [Docs: slash commands][slash-commands]

### Tools, account, and setup

- `/allow-all`, `/yolo` — Enable all permissions for tools, paths, and URLs. Supports `on`, `off`, and `show` subcommands to enable, disable, or check allow-all mode. `/yolo` now behaves the same as `--yolo`, and its state persists across `/restart`. [Docs: slash commands][slash-commands] [Release: v1.0.12][release-1-0-12] [Release: v1.0.20][release-1-0-20]
- `/reset-allowed-tools` — Clear previously granted tool approvals. [Release: v1.0.3][release-1-0-3] [Blog: slash commands][blog-slash-commands]
- `/mcp [show|add|edit|delete|disable|enable|auth|reload] [SERVER-NAME]` — Manage MCP servers; `/mcp auth` re-authenticates OAuth servers with account switching. MCP servers can also be installed from the registry with guided configuration. [Docs: slash commands][slash-commands] [Release: v1.0.15][release-1-0-15] [Release: v1.0.25][release-1-0-25] [Blog: slash commands][blog-slash-commands]
- `/lsp [show|test|reload|help] [SERVER-NAME]` — Manage language server configuration. [Docs: slash commands][slash-commands]
- `/statusline` — Customize which items appear in the status bar (directory, branch, effort, context window, quota, custom agent name, changes). The "changes" toggle shows added/removed line counts. Alias: `/footer`. [Release: v1.0.30][release-1-0-30] [Release: v1.0.35][release-1-0-35] [Release: v1.0.36][release-1-0-36]
- `/ide` — Connect to an IDE workspace. Also works while the agent is running. [Docs: slash commands][slash-commands] [Release: v1.0.23][release-1-0-23]
- `/terminal-setup` — Configure multiline terminal input support. [Docs: slash commands][slash-commands]
- `/login`, `/logout` — Sign in or out. `/logout` warns when signed in via `gh` CLI, PAT, API key, or environment variable (only manages OAuth sessions). [Docs: slash commands][slash-commands] [Release: v1.0.25][release-1-0-25]
- `/user [show|list|switch]` — Manage the current GitHub account. [Docs: slash commands][slash-commands] [Blog: slash commands][blog-slash-commands]
- `/update`, `/version` — Check for updates and show version information, honoring your configured update channel. [Release: v1.0.35][release-1-0-35]
- `/help`, `/feedback`, `/usage`, `/theme`, `/experimental` — Session help, reporting, usage, UI, and feature toggles. `/feedback` and `/experimental` also work while the agent is running. [Docs: slash commands][slash-commands] [Blog: slash commands][blog-slash-commands] [Release: v1.0.23][release-1-0-23]

### Keyboard shortcuts

- `@ FILENAME` — Include file contents in the prompt context. Also supports attaching document files for the agent to read and reason about. [Docs: shortcuts][shortcuts] [Release: v1.0.32][release-1-0-32]
- `# NUMBER` — Include a GitHub issue or pull request in the context. [Release: v1.0.35][release-1-0-35]
- `! COMMAND` — Run a shell command directly. Uses your `$SHELL` when set, instead of always invoking `/bin/sh`. [Docs: shortcuts][shortcuts] [Release: v1.0.35][release-1-0-35]
- `Ctrl + X` then `/` — Run a slash command after you already started typing. [Docs: shortcuts][shortcuts]
- `Shift + Tab` — Cycle between standard, plan, and autopilot mode. [Docs: shortcuts][shortcuts]
- `Ctrl + O`, `Ctrl + E`, `Ctrl + T` — Expand recent timeline items, expand all, or toggle reasoning display. `Ctrl + O` expands all items (same as `Ctrl + E`). [Docs: timeline shortcuts][timeline-shortcuts] [Release: v1.0.26][release-1-0-26]
- `Ctrl + G` — Edit the prompt in an external editor. [Docs: navigation shortcuts][navigation-shortcuts]
- `Ctrl + Y` — Accept the highlighted option in completion popups (in addition to Tab). [Release: v1.0.35][release-1-0-35]
- `Ctrl + Y` — In plan mode, open the most recent research report when no plan exists yet. [Release: v1.0.12][release-1-0-12]
- `Ctrl + L`, `Ctrl + C`, `Ctrl + D` — Clear the screen, cancel the current operation, or shut down. [Docs: shortcuts][shortcuts]
- `Ctrl + V`, `Meta + V` — Paste image from clipboard on all platforms. [Release: v1.0.30][release-1-0-30]
- `Alt + D` — Delete the word in front of the cursor. [Release: v1.0.25][release-1-0-25]
- `Ctrl + A`, `Ctrl + E`, `Home`, `End` — Navigate to the start or end of a line or word in input. [Release: v1.0.35][release-1-0-35]

## Command-Line Commands and Flags

### Core commands

- `copilot` — Launch the interactive interface. [Docs: CLI commands][cli-commands]
- `copilot help [topic]` — Show help for config, commands, environment, logging, monitoring, permissions, or providers. [Docs: CLI commands][cli-commands] [Release: v1.0.20][release-1-0-20]
- `copilot init` — Initialize custom instructions for the current repository. [Docs: CLI commands][cli-commands]
- `copilot update` — Download and install the latest version. [Docs: CLI commands][cli-commands]
- `copilot version` — Show version information and check for updates. [Docs: CLI commands][cli-commands]
- `copilot login`, `copilot logout` — Authenticate or remove credentials. `copilot login` accepts `--host HOST` for GitHub Enterprise. [Docs: CLI commands][cli-commands] [Release: v1.0.32][release-1-0-32]
- `copilot mcp` — Manage MCP servers outside the interactive session. [Release: v1.0.21][release-1-0-21]
- `copilot plugin` — Manage plugins and plugin marketplaces outside the interactive session. [Docs: CLI commands][cli-commands]

### Automation and session control

- `echo "PROMPT" | copilot` — Pipe a prompt into Copilot CLI for scripting and automation. [How-to: programmatic use][programmatic-howto]
- `-p, --prompt=PROMPT` — Run a prompt programmatically and exit after completion. [Docs: CLI options][cli-options] [Blog: terminal workflows][blog-terminal-workflows] [Blog: idea to PR][blog-idea-to-pr]
- `-i, --interactive=PROMPT` — Start an interactive session and run an initial prompt. [Docs: CLI options][cli-options]
- `--continue` — Resume the most recent session, preferring sessions from the current working directory. [Docs: CLI options][cli-options] [Release: v1.0.35][release-1-0-35]
- `--name=NAME` — Set a session name on startup. [Release: v1.0.35][release-1-0-35]
- `--resume=SESSION-ID|NAME` — Resume a specific session by ID or name. Accepts short session ID prefixes (7+ hex characters). [Docs: CLI options][cli-options] [Release: v1.0.32][release-1-0-32] [Release: v1.0.35][release-1-0-35]
- `--mode=MODE` — Set the initial agent mode (`interactive`, `plan`, or `autopilot`). Cannot be combined with `--autopilot` or `--plan`. [Docs: CLI options][cli-options] [Release: v1.0.23][release-1-0-23]
- `--agent=AGENT` — Pick a custom agent up front. [Docs: CLI options][cli-options]
- `--autopilot` — Let Copilot continue autonomously in prompt mode. [Docs: CLI options][cli-options]
- `--plan` — Start in plan mode. Shorthand for `--mode plan`. Cannot be combined with `--mode` or `--autopilot`. [Docs: CLI options][cli-options] [Release: v1.0.23][release-1-0-23]
- `--max-autopilot-continues=COUNT` — Cap autonomous follow-up turns. [Docs: CLI options][cli-options]
- `--reasoning-effort=LEVEL`, `--effort=LEVEL` — Set reasoning depth (`low`, `medium`, `high`). [Docs: CLI options][cli-options]
- `--enable-reasoning-summaries` — Request reasoning summaries for OpenAI models that support it. [Docs: CLI options][cli-options]
- `--output-format=text|json` — Return plain text or JSONL output. [Docs: CLI options][cli-options]
- `--share=PATH`, `--share-gist` — Export a programmatic session after it finishes. [Docs: CLI options][cli-options]
- `-s, --silent` — Suppress usage statistics and print only the answer. [Docs: CLI options][cli-options] [How-to: programmatic use][programmatic-howto]
- `--no-ask-user` — Disable the ask-user tool for fully autonomous runs. [Docs: CLI options][cli-options] [How-to: programmatic use][programmatic-howto]

### Permissions and safety

- `--allow-all`, `--yolo` — Approve all tools, paths, and URLs. [Docs: CLI options][cli-options]
- `--allow-all-tools`, `--allow-all-paths`, `--allow-all-urls` — Approve one permission category at a time. [Docs: CLI options][cli-options] [Blog: terminal workflows][blog-terminal-workflows]
- `--allow-tool=TOOL`, `--deny-tool=TOOL` — Pre-allow or pre-deny tool patterns. [Docs: CLI options][cli-options]
- `--allow-url=URL`, `--deny-url=URL` — Control URL access. [Docs: CLI options][cli-options]
- `--available-tools=TOOL`, `--excluded-tools=TOOL` — Reduce the tool surface available to the model. [Docs: CLI options][cli-options]
- `--disallow-temp-dir` — Block automatic access to the system temp directory. [Docs: CLI options][cli-options]
- `--disable-parallel-tools-execution` — Execute tools sequentially even when the model makes parallel calls. [Docs: CLI options][cli-options]

### UI, output, and logging

- `--model=MODEL` — Select the model. Use `auto` to let Copilot pick the best available model. [Docs: CLI options][cli-options] [Release: v1.0.32][release-1-0-32]
- `--banner` — Show the startup banner. [Docs: CLI options][cli-options]
- `--plain-diff` — Disable rich diff rendering. [Docs: CLI options][cli-options]
- `--screen-reader` — Enable screen-reader optimizations. [Docs: CLI options][cli-options]
- `--stream=on|off` — Turn streaming output on or off. [Docs: CLI options][cli-options]
- `--secret-env-vars=VAR` — Redact extra environment variables in output. [Docs: CLI options][cli-options]
- `--config-dir=PATH` — Override the config directory. [Docs: CLI options][cli-options]
- `--bash-env`, `--no-bash-env` — Control `BASH_ENV` sourcing. [Docs: CLI options][cli-options]
- `--experimental`, `--no-experimental` — Toggle experimental features. [Docs: CLI options][cli-options]
- `--log-dir=DIRECTORY`, `--log-level=LEVEL` — Control CLI logging. [Docs: CLI options][cli-options]
- `--no-auto-update` — Disable automatic updates. [Docs: CLI options][cli-options]
- `--remote`, `--no-remote` — Enable or disable remote access to this session from GitHub.com and GitHub Mobile. [How-to: remote steering][remote-steering] [Release: v1.0.25][release-1-0-25]
- `--connect` — Directly connect to a remote session by ID. [Release: v1.0.32][release-1-0-32]
- `--print-debug-info` — Display version, terminal capabilities, and environment variables for debugging. [Release: v1.0.32][release-1-0-32]
- `--session-idle-timeout` — Configure session idle timeout; disabled by default. [Release: v1.0.32][release-1-0-32]
- `--mouse[=VALUE]`, `--no-mouse` — Enable or disable mouse support in alt screen mode. [Docs: CLI options][cli-options]
- `--plugin-dir=DIRECTORY` — Load a plugin from a local directory (can be used multiple times). [Docs: CLI options][cli-options]

### MCP and tooling flags

- `--acp` — Start an Agent Client Protocol server. [Docs: CLI options][cli-options]
- `--additional-mcp-config=JSON|@path` — Add MCP servers for the current session only. [Docs: CLI options][cli-options]
- `--disable-builtin-mcps` — Disable built-in MCP servers. [Docs: CLI options][cli-options]
- `--disable-mcp-server=SERVER-NAME` — Disable a specific MCP server. [Docs: CLI options][cli-options]
- `--enable-all-github-mcp-tools` — Enable the full GitHub MCP tool surface. [Docs: CLI options][cli-options]
- `--add-github-mcp-toolset=TOOLSET`, `--add-github-mcp-tool=TOOL` — Expand the GitHub MCP subset. [Docs: CLI options][cli-options]

## Permission Prompts and Tool Rules

When Copilot CLI asks for permission, these one-key responses are available. [Docs: permission approvals][permission-approvals]

- `y` — Allow once. [Docs: permission approvals][permission-approvals]
- `n` — Deny once. [Docs: permission approvals][permission-approvals]
- `!` — Allow similar requests for the rest of the session. [Docs: permission approvals][permission-approvals]
- `#` — Deny similar requests for the rest of the session. [Docs: permission approvals][permission-approvals]
- `?` — Show more detail about the request. [Docs: permission approvals][permission-approvals]

Tool rules use the `Kind(argument)` pattern. Deny rules always override allow rules. [Docs: tool rules][tool-rules]

```bash
# Allow all git commands except git push
copilot --allow-tool='shell(git:*)' --deny-tool='shell(git push)'

# Allow one MCP tool
copilot --allow-tool='MyMCP(create_issue)'

# Allow all tools from one MCP server
copilot --allow-tool='MyMCP'
```

Examples adapted from the command reference. [Docs: tool rules][tool-rules]

## Configuration Files

Settings cascade from broader scopes to narrower scopes. Command-line flags and environment variables always win. [Docs: config settings][config-settings]

- `~/.copilot/config.json` — User-wide defaults. [Docs: config settings][config-settings]
- `~/.copilot/settings.json` — User settings stored separately from internal state. [Release: v1.0.35][release-1-0-35]
- `.github/copilot/settings.json` — Repository-wide shared settings. [Docs: config settings][config-settings]
- `.github/copilot/settings.local.json` — Local personal overrides that should not be committed. [Docs: config settings][config-settings]
- `.claude/settings.json` — Additional repository config source (loaded alongside `.github/copilot/settings.json`). [Release: v1.0.12][release-1-0-12]
- `.claude/settings.local.json` — Additional local config source (loaded alongside `.github/copilot/settings.local.json`). [Release: v1.0.12][release-1-0-12]

### Common user settings

- `model` — Default model selection. Use `auto` to let Copilot pick the best available model. [Docs: user settings][user-settings] [Release: v1.0.32][release-1-0-32]
- `theme` — `auto`, `dark`, or `light`. [Docs: user settings][user-settings]
- `effortLevel` — `low`, `medium`, `high`, or `xhigh`. [Docs: user settings][user-settings]
- `experimental` — Enable experimental features by default. [Docs: user settings][user-settings]
- `trusted_folders` — Pre-granted file access. [Docs: user settings][user-settings]
- `allowed_urls`, `denied_urls` — URL allowlists and blocklists. [Docs: user settings][user-settings]
- `screenReader` — Screen-reader mode. [Docs: user settings][user-settings]
- `stream` — Streaming responses. [Docs: user settings][user-settings]
- `autoUpdate` — Automatic updates. [Docs: user settings][user-settings]
- `bashEnv` — `BASH_ENV` support. [Docs: user settings][user-settings]
- `banner` — Startup banner frequency: `always`, `once`, or `never`. [Docs: user settings][user-settings]
- `beep` — Play an audible beep when attention is required. [Docs: user settings][user-settings]
- `compactPaste` — Collapse large pastes into compact tokens. [Docs: user settings][user-settings]
- `includeCoAuthoredBy` — Add a `Co-authored-by` trailer to git commits made by the agent. [Docs: user settings][user-settings]
- `logLevel` — Logging verbosity (`none`, `error`, `warning`, `info`, `debug`, `all`, `default`). [Docs: user settings][user-settings]
- `mouse` — Enable mouse support in alt screen mode. [Docs: user settings][user-settings]
- `renderMarkdown` — Render Markdown in terminal output. [Docs: user settings][user-settings]
- `respectGitignore` — Exclude gitignored files from the `@` file picker. [Docs: user settings][user-settings]
- `disableAllHooks` — Disable all hooks. [Docs: user settings][user-settings]
- `hooks` — Inline user-level hook definitions. [Docs: user settings][user-settings]
- `updateTerminalTitle` — Show the current intent in the terminal title. [Docs: user settings][user-settings]
- `streamerMode` — Hide preview model names and quota details. [Docs: user settings][user-settings]
- `storeTokenPlaintext` — Store authentication tokens in plaintext when no system keychain is available. [Docs: user settings][user-settings]
- `companyAnnouncements` — Custom messages shown randomly on startup. [Docs: user settings][user-settings]
- `custom_agents.default_local_only` — Only use local custom agents. [Docs: user settings][user-settings]
- `continueOnAutoMode` — Automatically switch to the `auto` model when rate-limited. [Release: v1.0.35][release-1-0-35]
- `enabledFeatureFlags` — Enable or disable individual feature flags by name. [Docs: user settings][user-settings]

### Repository-level settings

Repository settings support shared plugin behavior and startup messaging. [Docs: repo settings][repo-settings]

- `enabledPlugins` — Declarative plugin auto-install for the repository. [Docs: repo settings][repo-settings]
- `extraKnownMarketplaces` — Additional plugin marketplaces available in the repository. [Docs: repo settings][repo-settings]
- `companyAnnouncements` — Shared startup messages for repository users. [Docs: repo settings][repo-settings]

## Hooks

Hook configuration files live in `.github/hooks/*.json` in the current working directory. User-level hook scripts can also live in `~/.copilot/hooks/`, and `~/.copilot/config.json` supports inline user-level hook definitions. [Docs: hooks reference][hooks] [How-to: hooks][hooks-howto] [Docs: config dir][config-dir]

### What hooks can do

- Run shell commands before or after tool use. [Docs: hooks reference][hooks]
- Auto-submit a prompt or slash command when a session starts. [Docs: prompt hooks][hook-prompt]
- Allow, deny, ask for confirmation, or modify tool calls before they execute. [Docs: pre-tool hooks][hook-pretool]
- Block an agent or subagent from finishing and force another turn. [Docs: agent-stop hooks][hook-agentstop]
- POST JSON payloads to a URL instead of running a command (HTTP hooks). [Release: v1.0.35][release-1-0-35]

### Main hook events

- `sessionStart`, `sessionEnd` — Fire once per session in interactive mode (not once per prompt). [Docs: hook events][hook-events] [Release: v1.0.22][release-1-0-22]
- `userPromptSubmitted` [Docs: hook events][hook-events]
- `preToolUse`, `postToolUse`, `postToolUseFailure` — `preToolUse` respects `modifiedArgs`/`updatedInput` and `additionalContext`. `postToolUseFailure` can provide recovery guidance via `additionalContext`. [Docs: hook events][hook-events] [Release: v1.0.15][release-1-0-15] [Release: v1.0.24][release-1-0-24]
- `agentStop`, `subagentStart`, `subagentStop` — `subagentStart` returns `additionalContext` prepended to the subagent's prompt and supports `matcher` to filter by agent name. [Docs: hook events][hook-events]
- `preCompact` — Supports `matcher` to filter by trigger (`"manual"` or `"auto"`). [Docs: hook events][hook-events]
- `permissionRequest` — Allow scripts to programmatically approve or deny tool permission requests. Supports `matcher` regex on `toolName`. [Docs: hook events][hook-events] [Docs: permission hook][hook-permission]
- `notification` — React to shell completion, agent completion or idle, permission prompts, and elicitation dialogs without blocking the session. Supports `matcher` regex on `notification_type`. [Docs: notification hook][hook-notification]
- `errorOccurred` [Docs: hook events][hook-events]

### Hook formats

- Command hooks support `bash`, `powershell`, `cwd`, `env`, and `timeoutSec`. [Docs: command hooks][hook-command]
- Prompt hooks support a `prompt` string and can submit either plain text or a slash command. [Docs: prompt hooks][hook-prompt]
- `preToolUse` can return `allow`, `deny`, or `ask`, and can also replace tool arguments with `modifiedArgs`. [Docs: pre-tool hooks][hook-pretool]
- `agentStop` and `subagentStop` can return `allow` or `block`. [Docs: agent-stop hooks][hook-agentstop]

### Useful recent hook updates

- `preCompact` hooks can run before context compaction starts. [Release: v1.0.5][release-1-0-5]
- Hooks can ask for confirmation before a tool runs. [Docs: pre-tool hooks][hook-pretool]
- Hooks configured with PascalCase event names now receive VS Code-compatible snake_case payloads with `hook_event_name`, `session_id`, and ISO 8601 timestamps. [Release: v1.0.21][release-1-0-21]
- Plugin hooks receive `CLAUDE_PROJECT_DIR` and `CLAUDE_PLUGIN_DATA` environment variables, and support `{{project_dir}}` and `{{plugin_data_dir}}` template variables in hook configurations. [Release: v1.0.12][release-1-0-12]
- Plugin hooks also receive `PLUGIN_ROOT`, `COPILOT_PLUGIN_ROOT`, and `CLAUDE_PLUGIN_ROOT` with the plugin's installation directory. [Release: v1.0.26][release-1-0-26]
- `sessionStart` and `sessionEnd` hooks fire once per session in interactive mode instead of once per prompt. [Release: v1.0.22][release-1-0-22]
- `preToolUse` respects `modifiedArgs`/`updatedInput` and `additionalContext` return fields. [Release: v1.0.24][release-1-0-24]
- Permission prompt notification hooks only fire when a prompt is actually shown to the user. [Release: v1.0.26][release-1-0-26]
- Installing plugins from repos, URLs, or local paths shows a deprecation warning. [Release: v1.0.26][release-1-0-26]

## MCP Servers

Copilot CLI can load MCP servers from several places. [Docs: MCP config][mcp]

### Configuration sources

- `~/.copilot/mcp-config.json` [Docs: MCP config][mcp]
- `.github/mcp.json` [Docs: MCP trust][mcp-trust]
- `.mcp.json` [Docs: MCP trust][mcp-trust]

CLI only reads `.mcp.json` for project-level MCP config. If a `.vscode/mcp.json` is detected without a `.mcp.json`, a migration hint appears with a `jq` command to convert. [Release: v1.0.22][release-1-0-22]

### Built-in MCP servers

- `github-mcp-server` — GitHub API actions such as issues, pull requests, commits, code search, and GitHub Actions. [Docs: built-in MCP][mcp-builtin]
- `playwright` — Browser automation. [Docs: built-in MCP][mcp-builtin]
- `fetch` — HTTP requests. [Docs: built-in MCP][mcp-builtin]
- `time` — Time utilities. [Docs: built-in MCP][mcp-builtin]

### Transport types

- `local` / `stdio` — Launch a local process with `command` and `args`. [Docs: MCP transport][mcp-transport]
- `http` — Connect to a remote streamable HTTP server via `url`. [Docs: MCP transport][mcp-transport]
- `sse` — Connect to a remote Server-Sent Events server via `url`. [Docs: MCP transport][mcp-transport]

### Common fields

- Local servers: `command`, `args`, `tools`, `env`, `cwd`, `timeout`, `type`. [Docs: MCP local config][mcp-local]
- Remote servers: `type`, `url`, `tools`, `headers`, `oauthClientId`, `oauthPublicClient`, `timeout`. The `type` field can be omitted and defaults to `http`. [Docs: MCP remote config][mcp-remote] [Release: v1.0.29][release-1-0-29]
- `filterMapping` controls output filtering: `hidden_characters` (default), `markdown`, or `none`. [Docs: MCP filter][mcp-filter]

### MCP server registry

MCP servers can be installed from the registry with guided configuration directly in the CLI. [Release: v1.0.25][release-1-0-25]

### Trust model

- Built-in servers are high trust. [Docs: MCP trust][mcp-trust]
- Repository, workspace, and dev-container configs are medium trust. [Docs: MCP trust][mcp-trust]
- User config trust is your responsibility. [Docs: MCP trust][mcp-trust]
- Remote servers are low trust and should always be reviewed. [Docs: MCP trust][mcp-trust]

All MCP tool calls still require explicit permission, including read-only calls against external services. [Docs: MCP trust][mcp-trust]

## Skills and Custom Agents

### Skills

Skills are Markdown files that extend what Copilot CLI can do. Each skill lives in its own directory with a `SKILL.md` file. [Docs: skills][skills]

**Built-in skills** are now included with the CLI, starting with guides for common tasks. [Release: v1.0.17][release-1-0-17]

Common skill locations:

- `.github/skills/` [Docs: skill locations][skill-locations]
- `.agents/skills/` [Docs: skill locations][skill-locations]
- `.claude/skills/` [Docs: skill locations][skill-locations]
- Parent `.github/skills/` directories in monorepos [Docs: skill locations][skill-locations]
- `~/.copilot/skills/` [Docs: skill locations][skill-locations]
- `~/.agents/skills/` — Personal skill directory, aligned with VS Code Copilot extension default. [Release: v1.0.11][release-1-0-11]
- `~/.claude/skills/` [Docs: skill locations][skill-locations]
- Extra directories from `COPILOT_SKILLS_DIRS` [Docs: skill locations][skill-locations]

Useful frontmatter fields:

- `name` [Docs: skill frontmatter][skill-frontmatter]
- `description` [Docs: skill frontmatter][skill-frontmatter]
- `allowed-tools` [Docs: skill frontmatter][skill-frontmatter]
- `user-invocable` [Docs: skill frontmatter][skill-frontmatter]
- `disable-model-invocation` [Docs: skill frontmatter][skill-frontmatter]

Skill instructions persist correctly across conversation turns. [Release: v1.0.25][release-1-0-25]

Custom instructions and skills refresh from disk after `/clear` or `/new`. [Release: v1.0.28][release-1-0-28]

Skills that exceed the token limit are still discoverable and invocable by name. [Release: v1.0.32][release-1-0-32]

### Custom agents

Custom agents are specialized AI agents defined in Markdown files. You can browse them with `/agent` or select one up front with `--agent=AGENT`. [Docs: custom agents][custom-agents] [Docs: slash commands][slash-commands] [Docs: CLI options][cli-options]

Built-in agents currently include:

- `code-review` [Docs: built-in agents][agent-builtins]
- `explore` [Docs: built-in agents][agent-builtins]
- `general-purpose` [Docs: built-in agents][agent-builtins]
- `research` [Docs: built-in agents][agent-builtins]
- `task` [Docs: built-in agents][agent-builtins]

Custom agent locations:

- `.github/agents/` or `.claude/agents/` [Docs: agent locations][agent-locations]
- `~/.copilot/agents/` or `~/.claude/agents/` [Docs: agent locations][agent-locations]
- Plugin-provided agents [Docs: agent locations][agent-locations]

Useful frontmatter fields:

- `description` [Docs: agent frontmatter][agent-frontmatter]
- `infer` [Docs: agent frontmatter][agent-frontmatter]
- `model` — Accepts display names and vendor suffixes from VS Code (e.g. "Claude Sonnet 4.5", "GPT-5.4 (copilot)"). [Docs: agent frontmatter][agent-frontmatter] [Release: v1.0.24][release-1-0-24]
- `tools` [Docs: agent frontmatter][agent-frontmatter]
- `mcp-servers` [Docs: agent frontmatter][agent-frontmatter]
- `skills` — Eagerly load skill content into agent context at startup. [Docs: agent frontmatter][agent-frontmatter] [Release: v1.0.22][release-1-0-22]

## Environment Variables

Useful environment variables include:

- `COPILOT_MODEL` — Default model. [Docs: env vars][env-vars]
- `COPILOT_ALLOW_ALL` — Equivalent to `--allow-all`. [Docs: env vars][env-vars]
- `COPILOT_HOME` — Override the default Copilot home directory. [Docs: env vars][env-vars]
- `COPILOT_CACHE_HOME` — Override the cache directory separately from `COPILOT_HOME`. [Docs: env vars][env-vars] [Docs: config dir][config-dir]
- `COPILOT_EDITOR` — External editor command. [Docs: env vars][env-vars]
- `COPILOT_CUSTOM_INSTRUCTIONS_DIRS` — Extra instruction directories. [Docs: env vars][env-vars]
- `COPILOT_SKILLS_DIRS` — Extra skill directories. [Docs: env vars][env-vars]
- `COPILOT_GITHUB_TOKEN`, `GH_TOKEN`, `GITHUB_TOKEN` — Authentication tokens. [Docs: env vars][env-vars]
- `COPILOT_GH_HOST` — GitHub hostname. Takes precedence over `GH_HOST`. [Release: v1.0.35][release-1-0-35]
- `GH_HOST` — Alternate GitHub host. [Release: v1.0.3][release-1-0-3]
- `COPILOT_DISABLE_TERMINAL_TITLE` — Opt out of terminal title updates. [Release: v1.0.28][release-1-0-28]
- `COPILOT_AGENT_SESSION_ID` — Set as an environment variable on shell commands and MCP servers. [Release: v1.0.29][release-1-0-29]
- `COPILOT_SUBAGENT_MAX_DEPTH` — Maximum subagent nesting depth (default `6`, range 1–256). [Docs: env vars][env-vars]
- `COPILOT_SUBAGENT_MAX_CONCURRENT` — Maximum concurrent subagents (default `32`, range 1–256). [Docs: env vars][env-vars]
- `COPILOT_CLI_ENABLED_FEATURE_FLAGS` — Comma-separated list of feature flags to enable. [Docs: env vars][env-vars]
- `COLORFGBG` — Fallback for dark/light terminal background detection. [Docs: env vars][env-vars]
- `HTTP_PROXY`, `HTTPS_PROXY`, `NO_PROXY` — Network proxy settings. [Release: v1.0.3][release-1-0-3]
- `NO_COLOR` — Disable terminal color. [Release: v1.0.3][release-1-0-3]
- `USE_BUILTIN_RIPGREP` — Switch between bundled and system ripgrep. [Docs: env vars][env-vars]
- `PLAIN_DIFF` — Disable rich diff rendering. [Docs: env vars][env-vars]

## Observability

Copilot CLI can export traces and metrics with OpenTelemetry. [Docs: OTel][otel]

- `copilot help monitoring` — Open monitoring help with OpenTelemetry configuration details and examples. [Release: v1.0.20][release-1-0-20]
- OTel is off by default. [Docs: OTel][otel]
- It turns on when `COPILOT_OTEL_ENABLED=true`, `OTEL_EXPORTER_OTLP_ENDPOINT` is set, or `COPILOT_OTEL_FILE_EXPORTER_PATH` is set. [Docs: OTel][otel]
- `OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT=true` captures full prompts, responses, and tool payloads. [Docs: OTel content][otel-content]
- Content capture can expose sensitive data and should only be enabled in trusted environments. [Docs: OTel content][otel-content]
- Select `auto` as your model to let Copilot automatically pick the best available model for each session. [Release: v1.0.32][release-1-0-32]
- Warnings appear when approaching 75% and 90% of your weekly usage limit. [Release: v1.0.32][release-1-0-32]

## Recent Additions Worth Knowing

Recent official releases added or improved several user-facing CLI features.

### v1.0.36

- Double-Esc is required to cancel in-flight work, preventing accidental interruptions. [Release: v1.0.36][release-1-0-36]
- `/keep-alive` now available without experimental mode. [Release: v1.0.36][release-1-0-36]
- `/remote` shows current status and supports `/remote on` and `/remote off`. [Release: v1.0.36][release-1-0-36]
- Disabled skills no longer appear in the slash command list. [Release: v1.0.36][release-1-0-36]
- "changes" statusline toggle shows added/removed line counts. [Release: v1.0.36][release-1-0-36]
- Custom instruction files in `.gitignored` directories (for example, `.github/instructions/`) now load correctly. [Release: v1.0.36][release-1-0-36]
- `Claude Opus 4.6` uses medium reasoning effort by default. [Release: v1.0.36][release-1-0-36]

### v1.0.35

- Slash commands support tab-completion for arguments and subcommands. [Release: v1.0.35][release-1-0-35]
- Shell escape commands (`!`) now use your `$SHELL` when set, instead of always invoking `/bin/sh`. [Release: v1.0.35][release-1-0-35]
- Session selector shows branch names, idle/in-use status, and improved search with cursor support. [Release: v1.0.35][release-1-0-35]
- `/update` and `/version` honor your configured update channel. [Release: v1.0.35][release-1-0-35]
- `COPILOT_GH_HOST` environment variable for GitHub hostname; takes precedence over `GH_HOST`. [Release: v1.0.35][release-1-0-35]
- `Ctrl+Y` accepts the highlighted option in completion popups (in addition to Tab). [Release: v1.0.35][release-1-0-35]
- `/session delete`, `delete-all` subcommands, and x-to-delete in the session picker. [Release: v1.0.35][release-1-0-35]
- `--continue` prefers resuming sessions from the current working directory. [Release: v1.0.35][release-1-0-35]
- `--name=NAME` sets a session name; `--resume=NAME` resumes by name. [Release: v1.0.35][release-1-0-35]
- `~/.copilot/settings.json` stores user settings separately from internal state. [Release: v1.0.35][release-1-0-35]
- `continueOnAutoMode` config option to auto-switch to the `auto` model on rate limit. [Release: v1.0.35][release-1-0-35]
- HTTP hook support, allowing hooks to POST JSON payloads to a URL instead of running a command. [Release: v1.0.35][release-1-0-35]
- Custom agent name visible in the statusline footer and toggleable via `/statusline`. [Release: v1.0.35][release-1-0-35]
- `grep` and `glob` tools accept multiple search paths. [Release: v1.0.35][release-1-0-35]
- `Ctrl+A`, `Ctrl+E`, `Home`, `End` navigation shortcuts in input. [Release: v1.0.35][release-1-0-35]
- `# NUMBER` includes a GitHub issue or pull request in the context. [Release: v1.0.35][release-1-0-35]

### v1.0.32

- Short session ID prefixes (7+ hex characters) work with `--resume` and `/resume`. [Release: v1.0.32][release-1-0-32]
- Select `auto` as your model to let Copilot pick the best available model for each session. [Release: v1.0.32][release-1-0-32]
- `--print-debug-info` flag to display version, terminal capabilities, and environment variables for debugging. [Release: v1.0.32][release-1-0-32]
- `--connect` flag to directly connect to a remote session by ID. [Release: v1.0.32][release-1-0-32]
- `--session-idle-timeout` flag to configure session idle timeout (disabled by default). [Release: v1.0.32][release-1-0-32]
- Attach supported document files to prompts for the agent to read and reason about. [Release: v1.0.32][release-1-0-32]
- Warnings when approaching 75% and 90% of your weekly usage limit. [Release: v1.0.32][release-1-0-32]
- `copilot login --host` correctly authenticates with GitHub Enterprise Cloud instances. [Release: v1.0.32][release-1-0-32]

### v1.0.30

- `/statusline` command (with `/footer` alias) to customize which items appear in the status bar. [Release: v1.0.30][release-1-0-30]
- `Ctrl+V` and `Meta+V` image paste on all platforms. [Release: v1.0.30][release-1-0-30]

### v1.0.29

- `COPILOT_AGENT_SESSION_ID` available as an environment variable on shell commands and MCP servers. [Release: v1.0.29][release-1-0-29]
- `COPILOT_SUBAGENT_MAX_DEPTH` and `COPILOT_SUBAGENT_MAX_CONCURRENT` to control subagent depth and concurrency limits. [Docs: env vars][env-vars]
- Remote MCP server config: `type` field optional, defaults to `http`. [Release: v1.0.29][release-1-0-29]

### v1.0.28

- `/remote` command and `--remote` / `--no-remote` flags for remote control of CLI sessions. [How-to: remote steering][remote-steering]
- `--resume` picker connects to remote control sessions. [Release: v1.0.28][release-1-0-28]
- `COPILOT_DISABLE_TERMINAL_TITLE` to opt out of terminal title updates. [Release: v1.0.28][release-1-0-28]
- Custom instructions and skills refresh from disk after `/clear` or `/new`. [Release: v1.0.28][release-1-0-28]

### v1.0.27

- `/ask` command for quick questions without affecting conversation history. [Release: v1.0.27][release-1-0-27]
- `copilot plugin marketplace update` command to refresh plugin catalogs. [Release: v1.0.27][release-1-0-27]

### v1.0.26

- Plugin hooks receive `PLUGIN_ROOT`, `COPILOT_PLUGIN_ROOT`, and `CLAUDE_PLUGIN_ROOT` with the plugin's installation directory. [Release: v1.0.26][release-1-0-26]
- Instruction files with specific `applyTo` patterns consolidated into a table to reduce context window usage. [Release: v1.0.26][release-1-0-26]
- Installing plugins from repos, URLs, or local paths shows a deprecation warning. [Release: v1.0.26][release-1-0-26]

### v1.0.25

- Install MCP servers from the registry with guided configuration. [Release: v1.0.25][release-1-0-25]
- `/env` command to show loaded environment details (instructions, MCP servers, skills, agents, plugins). [Release: v1.0.25][release-1-0-25]
- `/share html` — Restored export to self-contained interactive HTML; shows `file://` URL and supports `Ctrl+X O` to open. [Release: v1.0.25][release-1-0-25]
- `/add-dir` accepts relative paths (e.g. `./src`, `../sibling`). [Release: v1.0.25][release-1-0-25]
- `/logout` warns when signed in via `gh` CLI, PAT, API key, or environment variable. [Release: v1.0.25][release-1-0-25]
- ACP clients can provide MCP servers (stdio, HTTP, SSE) when starting or loading sessions. [Release: v1.0.25][release-1-0-25]

### v1.0.24

- `preToolUse` hooks respect `modifiedArgs`/`updatedInput` and `additionalContext` fields. [Release: v1.0.24][release-1-0-24]
- Custom agent `model` field accepts display names and vendor suffixes from VS Code (e.g. "Claude Sonnet 4.5", "GPT-5.4 (copilot)"). [Release: v1.0.24][release-1-0-24]

### v1.0.23

- `--mode`, `--autopilot`, and `--plan` flags to start directly in a specific agent mode. [Release: v1.0.23][release-1-0-23]
- `Ctrl+L` clears the terminal screen without clearing the conversation session. [Release: v1.0.23][release-1-0-23]
- `/diff`, `/agent`, `/feedback`, `/ide`, and `/tuikit` work while the agent is running. [Release: v1.0.23][release-1-0-23]

### v1.0.22

- `.vscode/mcp.json` and `.devcontainer/devcontainer.json` removed as MCP server config sources; CLI now only reads `.mcp.json`. A migration hint with `jq` command appears when `.vscode/mcp.json` is detected without `.mcp.json`. [Release: v1.0.22][release-1-0-22]
- Custom agents can declare a `skills` field to eagerly load skill content at startup. [Release: v1.0.22][release-1-0-22]
- Plugins remain enabled across sessions and auto-install on startup based on user config. [Release: v1.0.22][release-1-0-22]
- `sessionStart` and `sessionEnd` hooks fire once per session in interactive mode instead of once per prompt. [Release: v1.0.22][release-1-0-22]

### v1.0.21

- `copilot mcp` command for managing MCP servers outside the interactive session. [Release: v1.0.21][release-1-0-21]
- Hooks configured with PascalCase event names now receive VS Code-compatible snake_case payloads with `hook_event_name`, `session_id`, and ISO 8601 timestamps. [Release: v1.0.21][release-1-0-21]

### v1.0.20

- `copilot help monitoring` topic with OpenTelemetry configuration details and examples. [Release: v1.0.20][release-1-0-20]
- `/yolo` and `--yolo` now behave identically, and `/yolo` state persists across `/restart`. [Release: v1.0.20][release-1-0-20]

### v1.0.17

- Built-in skills are now included with the CLI, starting with a guide for customizing Copilot cloud agent's environment. [Release: v1.0.17][release-1-0-17]
- `/resume` session picker loads significantly faster, especially with large session histories. [Release: v1.0.17][release-1-0-17]
- MCP OAuth flows now support HTTPS redirect URIs via self-signed certificate fallback for providers like Slack. [Release: v1.0.17][release-1-0-17]

### v1.0.16

- `permissionRequest` hook allows scripts to programmatically approve or deny tool permission requests. [Release: v1.0.16][release-1-0-16]
- `postToolUse` now runs only after successful tool calls; use `postToolUseFailure` for tool errors. [Release: v1.0.16][release-1-0-16]
- SQL prompt tags no longer appear when the `sql` tool is excluded via `--excluded-tools` or `--available-tools`. [Release: v1.0.16][release-1-0-16]
- MCP tool calls display tool name and parameter summary in the timeline. [Release: v1.0.16][release-1-0-16]
- Deprecated `marketplaces` repository setting removed; use `extraKnownMarketplaces` instead. [Release: v1.0.16][release-1-0-16]

### v1.0.15

- `/mcp auth` command for re-authenticating MCP OAuth servers with account switching. [Release: v1.0.15][release-1-0-15]
- `postToolUseFailure` hook event for handling tool errors separately from successful tool calls. [Release: v1.0.15][release-1-0-15]
- Device code flow (RFC 8628) as a fallback for MCP OAuth in headless and CI environments. [Release: v1.0.15][release-1-0-15]
- Home/End and Page Up/Page Down navigation in the diff viewer. [Release: v1.0.15][release-1-0-15]
- Config settings now prefer camelCase names (`askUser`, `autoUpdate`, `storeTokenPlaintext`, `logLevel`, `skillDirectories`, `disabledSkills`); snake_case still works. [Release: v1.0.15][release-1-0-15]
- Removed support for `gpt-5.1-codex`, `gpt-5.1-codex-mini`, and `gpt-5.1-codex-max` models. [Release: v1.0.15][release-1-0-15]

### v1.0.14

- Shift+Enter inserts a newline in terminals with Kitty keyboard protocol support. [Release: v1.0.14][release-1-0-14]
- CLI starts faster with parallel terminal detection, auth, and git operations. [Release: v1.0.14][release-1-0-14]
- V8 compile cache reduces parse and compile time on repeated invocations. [Release: v1.0.14][release-1-0-14]
- Reduced CPU usage during streaming by optimizing spinner rendering and task polling. [Release: v1.0.14][release-1-0-14]
- Removed support for `gemini-3-pro-preview` model. [Release: v1.0.14][release-1-0-14]

### v1.0.13

- `/rewind` and double-Esc open a timeline picker to roll back to any point in conversation history. [Release: v1.0.13][release-1-0-13]
- MCP servers can request LLM inference (sampling) with user approval via a new review prompt. [Release: v1.0.13][release-1-0-13]

### Earlier releases

- `/undo` to undo the last turn and revert file changes. [Release: v1.0.10][release-1-0-10]
- `--effort` as a shorthand alias for `--reasoning-effort`. [Release: v1.0.10][release-1-0-10]
- `/allow-all` (`/yolo`) `on`, `off`, and `show` subcommands to control allow-all mode. [Release: v1.0.12][release-1-0-12]
- `Ctrl + Y` in plan mode opens the most recent research report when no plan exists. [Release: v1.0.12][release-1-0-12]
- `/session rename` can auto-generate a session name from conversation history when you omit the name argument. [Release: v1.0.12][release-1-0-12]
- `.claude/settings.json` and `.claude/settings.local.json` as additional repo config sources. [Release: v1.0.12][release-1-0-12]
- Plugin hooks receive `CLAUDE_PROJECT_DIR` and `CLAUDE_PLUGIN_DATA` env vars plus `{{project_dir}}` and `{{plugin_data_dir}}` template variables. [Release: v1.0.12][release-1-0-12]
- `~/.agents/skills/` as a personal skill discovery directory. [Release: v1.0.11][release-1-0-11]
- `/clear` and `/new` are now distinct: `/clear` abandons the current session and keeps configured MCP servers available in the new session, `/new` starts fresh (keeping the old session backgrounded). Both accept an optional initial prompt. [Release: v1.0.11][release-1-0-11] [Release: v1.0.12][release-1-0-12]
- Custom instructions, MCP servers, skills, and agents are discovered at every directory level from the working directory up to the git root (full monorepo support). [Release: v1.0.11][release-1-0-11]
- `/pr` for PR creation, inspection, review feedback, merge-conflict work, and CI follow-up. [Release: v1.0.5][release-1-0-5]
- `/changelog` in the interactive session, with optional summary and version arguments in the current docs. [Docs: slash commands][slash-commands] [Release: v1.0.5][release-1-0-5]
- `@` file mentions for absolute paths, home-directory paths, and parent-relative paths. [Release: v1.0.5][release-1-0-5]
- `--reasoning-effort` for setting reasoning depth from the command line. [Release: v1.0.4][release-1-0-4]
- `.devcontainer/devcontainer.json` was previously an MCP configuration source; removed in v1.0.22 in favor of `.mcp.json`. [Release: v1.0.3][release-1-0-3] [Release: v1.0.22][release-1-0-22]
- One-time path approval in permission dialogs. [Release: v1.0.4][release-1-0-4]
- OpenTelemetry instrumentation for sessions, model calls, and tool execution. [Release: v1.0.4][release-1-0-4]

## Sources

- [GitHub Copilot CLI command reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference)
- [GitHub Copilot CLI configuration directory](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-config-dir-reference)
- [Adding custom instructions for GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-custom-instructions)
- [Overview of customizing GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/overview)
- [Running GitHub Copilot CLI programmatically](https://docs.github.com/en/copilot/how-tos/copilot-cli/automate-copilot-cli/run-cli-programmatically)
- [Using hooks with GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/use-hooks)
- [Speeding up task completion with the /fleet command](https://docs.github.com/en/copilot/how-tos/copilot-cli/speeding-up-task-completion)
- [Creating and using custom agents for GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/create-custom-agents-for-cli)
- [Use GitHub Copilot CLI agents](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli-agents)
- [GitHub Copilot CLI plugin reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-plugin-reference)
- [A cheat sheet to slash commands in GitHub Copilot CLI](https://github.blog/ai-and-ml/github-copilot/a-cheat-sheet-to-slash-commands-in-github-copilot-cli/)
- [Power agentic workflows in your terminal with GitHub Copilot CLI](https://github.blog/ai-and-ml/github-copilot/power-agentic-workflows-in-your-terminal-with-github-copilot-cli/)
- [From idea to pull request: A practical guide to building with GitHub Copilot CLI](https://github.blog/ai-and-ml/github-copilot/from-idea-to-pull-request-a-practical-guide-to-building-with-github-copilot-cli/)
- [Run multiple agents at once with /fleet in Copilot CLI](https://github.blog/ai-and-ml/github-copilot/run-multiple-agents-at-once-with-fleet-in-copilot-cli/)
- [GitHub Copilot CLI releases: v1.0.32](https://github.com/github/copilot-cli/releases/tag/v1.0.32)
- [GitHub Copilot CLI releases: v1.0.30](https://github.com/github/copilot-cli/releases/tag/v1.0.30)
- [GitHub Copilot CLI releases: v1.0.29](https://github.com/github/copilot-cli/releases/tag/v1.0.29)
- [GitHub Copilot CLI releases: v1.0.28](https://github.com/github/copilot-cli/releases/tag/v1.0.28)
- [GitHub Copilot CLI releases: v1.0.27](https://github.com/github/copilot-cli/releases/tag/v1.0.27)
- [GitHub Copilot CLI releases: v1.0.26](https://github.com/github/copilot-cli/releases/tag/v1.0.26)
- [GitHub Copilot CLI releases: v1.0.25](https://github.com/github/copilot-cli/releases/tag/v1.0.25)
- [GitHub Copilot CLI releases: v1.0.24](https://github.com/github/copilot-cli/releases/tag/v1.0.24)
- [GitHub Copilot CLI releases: v1.0.23](https://github.com/github/copilot-cli/releases/tag/v1.0.23)
- [GitHub Copilot CLI releases: v1.0.22](https://github.com/github/copilot-cli/releases/tag/v1.0.22)
- [Steering a GitHub Copilot CLI session from another device](https://docs.github.com/en/copilot/how-tos/copilot-cli/steer-remotely)
- [Researching with GitHub Copilot CLI](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/research)
- [GitHub Copilot CLI releases: v1.0.21](https://github.com/github/copilot-cli/releases/tag/v1.0.21)
- [GitHub Copilot CLI releases: v1.0.20](https://github.com/github/copilot-cli/releases/tag/v1.0.20)
- [GitHub Copilot CLI releases: v1.0.17](https://github.com/github/copilot-cli/releases/tag/v1.0.17)
- [GitHub Copilot CLI releases: v1.0.16](https://github.com/github/copilot-cli/releases/tag/v1.0.16)
- [GitHub Copilot CLI releases: v1.0.15](https://github.com/github/copilot-cli/releases/tag/v1.0.15)
- [GitHub Copilot CLI releases: v1.0.14](https://github.com/github/copilot-cli/releases/tag/v1.0.14)
- [GitHub Copilot CLI releases: v1.0.13](https://github.com/github/copilot-cli/releases/tag/v1.0.13)
- [GitHub Copilot CLI releases: v1.0.11](https://github.com/github/copilot-cli/releases/tag/v1.0.11)
- [GitHub Copilot CLI releases: v1.0.10](https://github.com/github/copilot-cli/releases/tag/v1.0.10)
- [GitHub Copilot CLI releases: v1.0.5](https://github.com/github/copilot-cli/releases/tag/v1.0.5)
- [GitHub Copilot CLI releases: v1.0.4](https://github.com/github/copilot-cli/releases/tag/v1.0.4)
- [GitHub Copilot CLI releases: v1.0.3](https://github.com/github/copilot-cli/releases/tag/v1.0.3)

[custom-instructions]: https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-custom-instructions
[config-dir]: https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-config-dir-reference
[programmatic-howto]: https://docs.github.com/en/copilot/how-tos/copilot-cli/automate-copilot-cli/run-cli-programmatically
[hooks-howto]: https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/use-hooks
[fleet-howto]: https://docs.github.com/en/copilot/how-tos/copilot-cli/speeding-up-task-completion
[custom-agents-howto]: https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/create-custom-agents-for-cli
[cli-agents-howto]: https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli-agents
[blog-slash-commands]: https://github.blog/ai-and-ml/github-copilot/a-cheat-sheet-to-slash-commands-in-github-copilot-cli/
[blog-terminal-workflows]: https://github.blog/ai-and-ml/github-copilot/power-agentic-workflows-in-your-terminal-with-github-copilot-cli/
[blog-idea-to-pr]: https://github.blog/ai-and-ml/github-copilot/from-idea-to-pull-request-a-practical-guide-to-building-with-github-copilot-cli/
[shortcuts]: https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference#global-shortcuts-in-the-interactive-interface
[timeline-shortcuts]: https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference#timeline-shortcuts-in-the-interactive-interface
[navigation-shortcuts]: https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference#navigation-shortcuts-in-the-interactive-interface
[cli-commands]: https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference#command-line-commands
[slash-commands]: https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference#slash-commands-in-the-interactive-interface
[cli-options]: https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference#command-line-options
[tool-rules]: https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference#tool-permission-patterns
[permission-approvals]: https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference#permission-approval-responses
[env-vars]: https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference#environment-variables
[config-settings]: https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference#configuration-file-settings
[user-settings]: https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference#user-settings-copilotconfigjson
[repo-settings]: https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference#repository-settings-githubcopilotsettingsjson
[hooks]: https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference#hooks-reference
[hook-events]: https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference#hook-events
[hook-command]: https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference#command-hooks
[hook-prompt]: https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference#prompt-hooks
[hook-pretool]: https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference#pretooluse-decision-control
[hook-agentstop]: https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference#agentstop--subagentstop-decision-control
[hook-permission]: https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference#permissionrequest-decision-control
[hook-notification]: https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference#notification-hook
[mcp]: https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference#mcp-server-configuration
[mcp-transport]: https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference#transport-types
[mcp-local]: https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference#local-server-configuration-fields
[mcp-remote]: https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference#remote-server-configuration-fields
[mcp-filter]: https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference#filter-mapping
[mcp-builtin]: https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference#built-in-mcp-servers
[mcp-trust]: https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference#mcp-server-trust-levels
[skills]: https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference#skills-reference
[skill-locations]: https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference#skill-locations
[skill-frontmatter]: https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference#skill-frontmatter-fields
[custom-agents]: https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference#custom-agents-reference
[agent-builtins]: https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference#built-in-agents
[agent-frontmatter]: https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference#custom-agent-frontmatter-fields
[agent-locations]: https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference#custom-agent-locations
[otel]: https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference#opentelemetry-monitoring
[otel-content]: https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference#content-capture
[research-docs]: https://docs.github.com/en/copilot/concepts/agents/copilot-cli/research
[remote-steering]: https://docs.github.com/en/copilot/how-tos/copilot-cli/steer-remotely
[release-1-0-36]: https://github.com/github/copilot-cli/releases/tag/v1.0.36
[release-1-0-35]: https://github.com/github/copilot-cli/releases/tag/v1.0.35
[release-1-0-32]: https://github.com/github/copilot-cli/releases/tag/v1.0.32
[release-1-0-30]: https://github.com/github/copilot-cli/releases/tag/v1.0.30
[release-1-0-29]: https://github.com/github/copilot-cli/releases/tag/v1.0.29
[release-1-0-28]: https://github.com/github/copilot-cli/releases/tag/v1.0.28
[release-1-0-27]: https://github.com/github/copilot-cli/releases/tag/v1.0.27
[release-1-0-26]: https://github.com/github/copilot-cli/releases/tag/v1.0.26
[release-1-0-25]: https://github.com/github/copilot-cli/releases/tag/v1.0.25
[release-1-0-24]: https://github.com/github/copilot-cli/releases/tag/v1.0.24
[release-1-0-23]: https://github.com/github/copilot-cli/releases/tag/v1.0.23
[release-1-0-22]: https://github.com/github/copilot-cli/releases/tag/v1.0.22
[release-1-0-21]: https://github.com/github/copilot-cli/releases/tag/v1.0.21
[release-1-0-20]: https://github.com/github/copilot-cli/releases/tag/v1.0.20
[release-1-0-17]: https://github.com/github/copilot-cli/releases/tag/v1.0.17
[release-1-0-16]: https://github.com/github/copilot-cli/releases/tag/v1.0.16
[release-1-0-15]: https://github.com/github/copilot-cli/releases/tag/v1.0.15
[release-1-0-14]: https://github.com/github/copilot-cli/releases/tag/v1.0.14
[release-1-0-13]: https://github.com/github/copilot-cli/releases/tag/v1.0.13
[release-1-0-12]: https://github.com/github/copilot-cli/releases/tag/v1.0.12
[release-1-0-11]: https://github.com/github/copilot-cli/releases/tag/v1.0.11
[release-1-0-10]: https://github.com/github/copilot-cli/releases/tag/v1.0.10
[release-1-0-5]: https://github.com/github/copilot-cli/releases/tag/v1.0.5
[release-1-0-4]: https://github.com/github/copilot-cli/releases/tag/v1.0.4
[release-1-0-3]: https://github.com/github/copilot-cli/releases/tag/v1.0.3
