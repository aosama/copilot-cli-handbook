---
title: 'Copilot CLI Handbook'
description: 'Custom instructions, commands, permissions, agents, hooks, configuration, and MCP for GitHub Copilot CLI'
lastUpdated: 'March 30, 2026 at 6:13 AM EDT'
---

## Instruction Files

Copilot CLI can load repository, path-specific, agent, and local instructions from several official file locations. [How-to: custom instructions][custom-instructions]

### Common instruction locations

- `AGENTS.md` in the repository root, the current working directory, or directories listed in `COPILOT_CUSTOM_INSTRUCTIONS_DIRS`. [How-to: custom instructions][custom-instructions]
- `CLAUDE.md` or `GEMINI.md` at the repository root as alternative root agent instruction files. [How-to: custom instructions][custom-instructions]
- `.github/copilot-instructions.md` for repository-wide instructions. [How-to: custom instructions][custom-instructions]
- `.github/instructions/**/*.instructions.md` for path-specific instructions. [How-to: custom instructions][custom-instructions]
- `$HOME/.copilot/copilot-instructions.md` for local personal instructions. [How-to: custom instructions][custom-instructions]
- `COPILOT_CUSTOM_INSTRUCTIONS_DIRS` to add extra directories where Copilot CLI looks for `AGENTS.md` and `.github/instructions/**/*.instructions.md`. [How-to: custom instructions][custom-instructions]

### Useful commands and flags

- `/init` — Initialize Copilot custom instructions and agentic features for the repository. [Docs: slash commands][slash-commands]
- `copilot init` — Initialize Copilot custom instructions for the current repository. [Docs: CLI commands][cli-commands]
- `--no-custom-instructions` — Start without loading `AGENTS.md` and related instruction files. [Docs: CLI options][cli-options]

## Interactive Commands

### Session and navigation

- `/clear` — Abandon the current session and clear history while keeping configured MCP servers available in the new session. `/new` — Start a fresh conversation (keeps the old session backgrounded). Both accept an optional prompt to begin the new session. [Docs: slash commands][slash-commands] [Release: v1.0.11][release-1-0-11] [Release: v1.0.12][release-1-0-12] [Blog: slash commands][blog-slash-commands]
- `/resume [SESSION-ID]` — Resume a previous session. [Docs: slash commands][slash-commands]
- `/undo` — Undo the last turn and revert any file changes it made. [Release: v1.0.10][release-1-0-10]
- `/session [checkpoints [n]|files|plan|rename NAME]` — Show session information and a workspace summary. [Docs: slash commands][slash-commands]
- `/rename NAME` — Rename the current session. [Docs: slash commands][slash-commands]
- `/compact` — Summarize history to reduce context usage. [Docs: slash commands][slash-commands]
- `/context` — Show context window usage. [Docs: slash commands][slash-commands]
- `/cwd`, `/cd [PATH]` — Show or change the working directory. [Docs: slash commands][slash-commands] [Blog: slash commands][blog-slash-commands]
- `/add-dir PATH` — Add a directory to the allowed file-access list. [Docs: slash commands][slash-commands] [Blog: slash commands][blog-slash-commands]
- `/list-dirs` — Show directories that already have file access. [Docs: slash commands][slash-commands] [Blog: slash commands][blog-slash-commands]
- `/exit`, `/quit` — Exit the CLI. [Docs: slash commands][slash-commands]

### Planning, review, and collaboration

- `/diff` — Review changes in the current directory. [Docs: slash commands][slash-commands]
- `/review [PROMPT]` — Run the code review agent against your changes. [Docs: slash commands][slash-commands]
- `/plan [PROMPT]` — Draft an implementation plan before editing. [Docs: slash commands][slash-commands]
- `/delegate [PROMPT]` — Delegate work to a remote repository with an AI-generated pull request. [Docs: slash commands][slash-commands] [How-to: CLI agents][cli-agents-howto] [Blog: slash commands][blog-slash-commands] [Blog: terminal workflows][blog-terminal-workflows]
- `/share [file|gist] [PATH]` — Export the session to Markdown or a secret gist. [Docs: slash commands][slash-commands] [Blog: slash commands][blog-slash-commands]
- `/changelog` — Browse release notes from inside the CLI. [Release: v1.0.5][release-1-0-5]
- `/pr` — Create or inspect pull requests, fix CI failures, address review feedback, and resolve merge conflicts. [Release: v1.0.5][release-1-0-5]

### Agents, models, skills, and extensions

- `/agent` — Choose from available agents. [Docs: slash commands][slash-commands] [How-to: custom agents][custom-agents-howto]
- `/fleet [PROMPT]` — Run parts of a task in parallel with subagents. [Docs: slash commands][slash-commands] [How-to: /fleet][fleet-howto]
- `/tasks` — Inspect background tasks and subagent work created in the current session. [How-to: /fleet][fleet-howto]
- `/model`, `/models [MODEL]` — View or change the active model. [Docs: slash commands][slash-commands] [Blog: slash commands][blog-slash-commands]
- `/skills [list|info|add|remove|reload] [ARGS...]` — Manage skills. [Docs: slash commands][slash-commands]
- `/plugin [marketplace|install|uninstall|update|list] [ARGS...]` — Manage plugins and plugin marketplaces. [Docs: slash commands][slash-commands]
- `/extensions` — View, enable, and disable CLI extensions. [Release: v1.0.5][release-1-0-5]

### Tools, account, and setup

- `/allow-all`, `/yolo` — Enable all permissions for tools, paths, and URLs. Supports `on`, `off`, and `show` subcommands to enable, disable, or check allow-all mode. [Docs: slash commands][slash-commands] [Release: v1.0.12][release-1-0-12]
- `/reset-allowed-tools` — Clear previously granted tool approvals. [Release: v1.0.3][release-1-0-3] [Blog: slash commands][blog-slash-commands]
- `/mcp [show|add|edit|delete|disable|enable] [SERVER-NAME]` — Manage MCP servers. [Docs: slash commands][slash-commands] [Blog: slash commands][blog-slash-commands]
- `/lsp [show|test|reload|help] [SERVER-NAME]` — Manage language server configuration. [Docs: slash commands][slash-commands]
- `/ide` — Connect to an IDE workspace. [Docs: slash commands][slash-commands]
- `/terminal-setup` — Configure multiline terminal input support. [Docs: slash commands][slash-commands]
- `/login`, `/logout` — Sign in or out. [Docs: slash commands][slash-commands]
- `/user [show|list|switch]` — Manage the current GitHub account. [Docs: slash commands][slash-commands] [Blog: slash commands][blog-slash-commands]
- `/help`, `/feedback`, `/usage`, `/theme`, `/experimental` — Session help, reporting, usage, UI, and feature toggles. [Docs: slash commands][slash-commands] [Blog: slash commands][blog-slash-commands]
- `/version` — Display the CLI version and check for updates from inside the session. [Release: v1.0.5][release-1-0-5]

### Keyboard shortcuts

- `@ FILENAME` — Include file contents in the prompt context. [Docs: shortcuts][shortcuts]
- `! COMMAND` — Run a shell command directly. [Docs: shortcuts][shortcuts]
- `Ctrl + X` then `/` — Run a slash command after you already started typing. [Docs: shortcuts][shortcuts]
- `Shift + Tab` — Cycle between standard, plan, and autopilot mode. [Docs: shortcuts][shortcuts]
- `Ctrl + O`, `Ctrl + E`, `Ctrl + T` — Expand recent timeline items, expand all, or toggle reasoning display. [Docs: timeline shortcuts][timeline-shortcuts]
- `Ctrl + G` — Edit the prompt in an external editor. [Docs: navigation shortcuts][navigation-shortcuts]
- `Ctrl + Y` — In plan mode, open the most recent research report when no plan exists yet. [Release: v1.0.12][release-1-0-12]
- `Ctrl + L`, `Ctrl + C`, `Ctrl + D` — Clear the screen, cancel the current operation, or shut down. [Docs: shortcuts][shortcuts]

## Command-Line Commands and Flags

### Core commands

- `copilot` — Launch the interactive interface. [Docs: CLI commands][cli-commands]
- `copilot help [topic]` — Show help for config, commands, environment, logging, or permissions. [Docs: CLI commands][cli-commands]
- `copilot init` — Initialize custom instructions for the current repository. [Docs: CLI commands][cli-commands]
- `copilot update` — Download and install the latest version. [Docs: CLI commands][cli-commands]
- `copilot version` — Show version information and check for updates. [Docs: CLI commands][cli-commands]
- `copilot login`, `copilot logout` — Authenticate or remove credentials. [Docs: CLI commands][cli-commands]
- `copilot plugin` — Manage plugins and plugin marketplaces outside the interactive session. [Docs: CLI commands][cli-commands]

### Automation and session control

- `echo "PROMPT" | copilot` — Pipe a prompt into Copilot CLI for scripting and automation. [How-to: programmatic use][programmatic-howto]
- `-p, --prompt=PROMPT` — Run a prompt programmatically and exit after completion. [Docs: CLI options][cli-options] [Blog: terminal workflows][blog-terminal-workflows] [Blog: idea to PR][blog-idea-to-pr]
- `-i, --interactive=PROMPT` — Start an interactive session and run an initial prompt. [Docs: CLI options][cli-options]
- `--continue` — Resume the most recent session. [Docs: CLI options][cli-options]
- `--resume=SESSION-ID` — Resume a specific session. [Docs: CLI options][cli-options]
- `--agent=AGENT` — Pick a custom agent up front. [Docs: CLI options][cli-options]
- `--autopilot` — Let Copilot continue autonomously in prompt mode. [Docs: CLI options][cli-options]
- `--max-autopilot-continues=COUNT` — Cap autonomous follow-up turns. [Docs: CLI options][cli-options]
- `--reasoning-effort=LEVEL`, `--effort=LEVEL` — Set reasoning depth (`low`, `medium`, `high`, `xhigh`). [Docs: CLI options][cli-options]
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

### UI, output, and logging

- `--model=MODEL` — Select the model. [Docs: CLI options][cli-options]
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
- `.github/copilot/settings.json` — Repository-wide shared settings. [Docs: config settings][config-settings]
- `.github/copilot/settings.local.json` — Local personal overrides that should not be committed. [Docs: config settings][config-settings]
- `.claude/settings.json` — Additional repository config source (loaded alongside `.github/copilot/settings.json`). [Release: v1.0.12][release-1-0-12]
- `.claude/settings.local.json` — Additional local config source (loaded alongside `.github/copilot/settings.local.json`). [Release: v1.0.12][release-1-0-12]

### Common user settings

- `model` — Default model selection. [Docs: user settings][user-settings]
- `theme` — `auto`, `dark`, or `light`. [Docs: user settings][user-settings]
- `reasoning_effort` — `low`, `medium`, `high`, or `xhigh`. [Docs: user settings][user-settings]
- `experimental` — Enable experimental features by default. [Docs: user settings][user-settings]
- `trusted_folders` — Pre-granted file access. [Docs: user settings][user-settings]
- `allowed_urls`, `denied_urls` — URL allowlists and blocklists. [Docs: user settings][user-settings]
- `screen_reader` — Screen-reader mode. [Docs: user settings][user-settings]
- `stream` — Streaming responses. [Docs: user settings][user-settings]
- `auto_update` — Automatic updates. [Docs: user settings][user-settings]
- `bash_env` — `BASH_ENV` support. [Docs: user settings][user-settings]

### Repository-level settings

Repository settings support shared plugin behavior and startup messaging. [Docs: repo settings][repo-settings]

- `enabledPlugins` — Declarative plugin auto-install for the repository. [Docs: repo settings][repo-settings]
- `extraKnownMarketplaces` — Additional plugin marketplaces available in the repository. [Docs: repo settings][repo-settings]
- `companyAnnouncements` — Shared startup messages for repository users. [Docs: repo settings][repo-settings]

## Hooks

Hook configuration files live in `.github/hooks/*.json` in the current working directory. [Docs: hooks reference][hooks] [How-to: hooks][hooks-howto]

### What hooks can do

- Run shell commands before or after tool use. [Docs: hooks reference][hooks]
- Auto-submit a prompt or slash command when a session starts. [Docs: prompt hooks][hook-prompt]
- Allow, deny, ask for confirmation, or modify tool calls before they execute. [Docs: pre-tool hooks][hook-pretool]
- Block an agent or subagent from finishing and force another turn. [Docs: agent-stop hooks][hook-agentstop]

### Main hook events

- `sessionStart`, `sessionEnd` [Docs: hook events][hook-events]
- `userPromptSubmitted` [Docs: hook events][hook-events]
- `preToolUse`, `postToolUse` [Docs: hook events][hook-events]
- `agentStop`, `subagentStop` [Docs: hook events][hook-events]
- `errorOccurred` [Docs: hook events][hook-events]

### Hook formats

- Command hooks support `bash`, `powershell`, `cwd`, `env`, and `timeoutSec`. [Docs: command hooks][hook-command]
- Prompt hooks support a `prompt` string and can submit either plain text or a slash command. [Docs: prompt hooks][hook-prompt]
- `preToolUse` can return `allow`, `deny`, or `ask`, and can also replace tool arguments with `modifiedArgs`. [Docs: pre-tool hooks][hook-pretool]
- `agentStop` and `subagentStop` can return `allow` or `block`. [Docs: agent-stop hooks][hook-agentstop]

### Useful recent hook updates

- Hooks can ask for confirmation before a tool runs. [Docs: pre-tool hooks][hook-pretool]
- Hook configuration files can omit the `version` field. [Release: v1.0.5][release-1-0-5]
- Plugin hooks receive `CLAUDE_PROJECT_DIR` and `CLAUDE_PLUGIN_DATA` environment variables, and support `{{project_dir}}` and `{{plugin_data_dir}}` template variables in hook configurations. [Release: v1.0.12][release-1-0-12]

## MCP Servers

Copilot CLI can load MCP servers from several places. [Docs: MCP config][mcp]

### Configuration sources

- `~/.copilot/mcp-config.json` [Docs: MCP config][mcp]
- `.github/mcp.json` [Docs: MCP trust][mcp-trust]
- `.mcp.json` [Docs: MCP trust][mcp-trust]
- `.vscode/mcp.json` [Docs: MCP trust][mcp-trust]
- `.devcontainer/devcontainer.json` [Docs: MCP trust][mcp-trust]

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
- Remote servers: `type`, `url`, `tools`, `headers`, `oauthClientId`, `oauthPublicClient`, `timeout`. [Docs: MCP remote config][mcp-remote]
- `filterMapping` controls output filtering: `hidden_characters` (default), `markdown`, or `none`. [Docs: MCP filter][mcp-filter]

### Trust model

- Built-in servers are high trust. [Docs: MCP trust][mcp-trust]
- Repository, workspace, and dev-container configs are medium trust. [Docs: MCP trust][mcp-trust]
- User config trust is your responsibility. [Docs: MCP trust][mcp-trust]
- Remote servers are low trust and should always be reviewed. [Docs: MCP trust][mcp-trust]

All MCP tool calls still require explicit permission, including read-only calls against external services. [Docs: MCP trust][mcp-trust]

## Skills and Custom Agents

### Skills

Skills are Markdown files that extend what Copilot CLI can do. Each skill lives in its own directory with a `SKILL.md` file. [Docs: skills][skills]

- Use `/SKILL-NAME` to invoke a user-invocable skill explicitly, or let Copilot invoke it automatically when the task fits. [Docs: skills][skills]

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
- `model` [Docs: agent frontmatter][agent-frontmatter]
- `tools` [Docs: agent frontmatter][agent-frontmatter]
- `mcp-servers` [Docs: agent frontmatter][agent-frontmatter]

## Environment Variables

Useful environment variables include:

- `COPILOT_MODEL` — Default model. [Docs: env vars][env-vars]
- `COPILOT_ALLOW_ALL` — Equivalent to `--allow-all`. [Docs: env vars][env-vars]
- `COPILOT_HOME` — Override the default Copilot home directory. [Docs: env vars][env-vars]
- `COPILOT_EDITOR` — External editor command. [Docs: env vars][env-vars]
- `COPILOT_CUSTOM_INSTRUCTIONS_DIRS` — Extra instruction directories. [Docs: env vars][env-vars]
- `COPILOT_SKILLS_DIRS` — Extra skill directories. [Docs: env vars][env-vars]
- `COPILOT_GITHUB_TOKEN`, `GH_TOKEN`, `GITHUB_TOKEN` — Authentication tokens. [Docs: env vars][env-vars]
- `GH_HOST` — Alternate GitHub host. [Release: v1.0.3][release-1-0-3]
- `HTTP_PROXY`, `HTTPS_PROXY`, `NO_PROXY` — Network proxy settings. [Release: v1.0.3][release-1-0-3]
- `NO_COLOR` — Disable terminal color. [Release: v1.0.3][release-1-0-3]
- `USE_BUILTIN_RIPGREP` — Switch between bundled and system ripgrep. [Docs: env vars][env-vars]
- `PLAIN_DIFF` — Disable rich diff rendering. [Docs: env vars][env-vars]

## Observability

Copilot CLI can export traces and metrics with OpenTelemetry. [Docs: OTel][otel]

- OTel is off by default. [Docs: OTel][otel]
- It turns on when `COPILOT_OTEL_ENABLED=true`, `OTEL_EXPORTER_OTLP_ENDPOINT` is set, or `COPILOT_OTEL_FILE_EXPORTER_PATH` is set. [Docs: OTel][otel]
- `OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT=true` captures full prompts, responses, and tool payloads. [Docs: OTel content][otel-content]
- Content capture can expose sensitive data and should only be enabled in trusted environments. [Docs: OTel content][otel-content]

## Recent Additions Worth Knowing

Recent official releases added or improved several user-facing CLI features. [Release: v1.0.12][release-1-0-12]

- `/undo` to undo the last turn and revert file changes. [Release: v1.0.10][release-1-0-10]
- `--effort` as a shorthand alias for `--reasoning-effort`. [Release: v1.0.10][release-1-0-10]
- `/allow-all` (`/yolo`) `on`, `off`, and `show` subcommands to control allow-all mode. [Release: v1.0.12][release-1-0-12]
- `Ctrl + Y` in plan mode opens the most recent research report when no plan exists. [Release: v1.0.12][release-1-0-12]
- `/session rename` can auto-generate a session name from conversation history when you omit the name argument. [Release: v1.0.12][release-1-0-12]
- The full-screen model picker supports inline reasoning effort adjustment with the `←` and `→` arrow keys. [Release: v1.0.12][release-1-0-12]
- `.claude/settings.json` and `.claude/settings.local.json` as additional repo config sources. [Release: v1.0.12][release-1-0-12]
- Plugin hooks receive `CLAUDE_PROJECT_DIR` and `CLAUDE_PLUGIN_DATA` env vars plus `{{project_dir}}` and `{{plugin_data_dir}}` template variables. [Release: v1.0.12][release-1-0-12]
- `~/.agents/skills/` as a personal skill discovery directory. [Release: v1.0.11][release-1-0-11]
- `/clear` and `/new` are now distinct: `/clear` abandons the current session and keeps configured MCP servers available in the new session, `/new` starts fresh (keeping the old session backgrounded). Both accept an optional initial prompt. [Release: v1.0.11][release-1-0-11] [Release: v1.0.12][release-1-0-12]
- Custom instructions, MCP servers, skills, and agents are discovered at every directory level from the working directory up to the git root (full monorepo support). [Release: v1.0.11][release-1-0-11]
- `/extensions` for viewing, enabling, and disabling CLI extensions. [Release: v1.0.5][release-1-0-5]
- `/pr` for PR creation, inspection, review feedback, merge-conflict work, and CI follow-up. [Release: v1.0.5][release-1-0-5]
- `/version` inside the interactive session. [Release: v1.0.5][release-1-0-5]
- `/changelog last <N>`, `/changelog since <version>`, and `/changelog summarize`. [Release: v1.0.5][release-1-0-5]
- `@` file mentions for absolute paths, home-directory paths, and parent-relative paths. [Release: v1.0.5][release-1-0-5]
- `--reasoning-effort` for setting reasoning depth from the command line. [Release: v1.0.4][release-1-0-4]
- `.devcontainer/devcontainer.json` as another MCP configuration source. [Release: v1.0.3][release-1-0-3]
- One-time path approval in permission dialogs. [Release: v1.0.4][release-1-0-4]
- OpenTelemetry instrumentation for sessions, model calls, and tool execution. [Release: v1.0.4][release-1-0-4]

## Sources

- [GitHub Copilot CLI command reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference)
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
- [GitHub Copilot CLI releases: v1.0.12](https://github.com/github/copilot-cli/releases/tag/v1.0.12)
- [GitHub Copilot CLI releases: v1.0.11](https://github.com/github/copilot-cli/releases/tag/v1.0.11)
- [GitHub Copilot CLI releases: v1.0.10](https://github.com/github/copilot-cli/releases/tag/v1.0.10)
- [GitHub Copilot CLI releases: v1.0.5](https://github.com/github/copilot-cli/releases/tag/v1.0.5)
- [GitHub Copilot CLI releases: v1.0.4](https://github.com/github/copilot-cli/releases/tag/v1.0.4)
- [GitHub Copilot CLI releases: v1.0.3](https://github.com/github/copilot-cli/releases/tag/v1.0.3)

[custom-instructions]: https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-custom-instructions
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
[release-1-0-12]: https://github.com/github/copilot-cli/releases/tag/v1.0.12
[release-1-0-11]: https://github.com/github/copilot-cli/releases/tag/v1.0.11
[release-1-0-10]: https://github.com/github/copilot-cli/releases/tag/v1.0.10
[release-1-0-5]: https://github.com/github/copilot-cli/releases/tag/v1.0.5
[release-1-0-4]: https://github.com/github/copilot-cli/releases/tag/v1.0.4
[release-1-0-3]: https://github.com/github/copilot-cli/releases/tag/v1.0.3
