---
title: 'Copilot CLI Handbook'
description: 'Custom instructions, commands, permissions, agents, hooks, configuration, and MCP for GitHub Copilot CLI'
lastUpdated: 'March 2026'
---

## Instruction Files

Copilot CLI can load repository and user instructions from files such as `AGENTS.md`, `.github/copilot-instructions.md`, `.copilot/instructions.md`, and user instruction directories.

### Common instruction locations

- `AGENTS.md`
- `.github/copilot-instructions.md`
- `.copilot/instructions.md`
- `~/.copilot/instructions/*.instructions.md`
- `COPILOT_CUSTOM_INSTRUCTIONS_DIRS` — Add extra instruction directories as a comma-separated list.

### Useful commands and flags

- `/init` — Initialize Copilot custom instructions and agentic features for the repository.
- `/instructions` — View loaded instruction files and enable or disable them.
- `copilot init` — Non-interactive entry point for repository initialization.
- `--no-custom-instructions` — Start without loading `AGENTS.md` and related instruction files.

## Interactive Commands

### Session and navigation

- `/clear`, `/new` — Clear the conversation history.
- `/resume [SESSION-ID]` — Resume a previous session.
- `/session [checkpoints [n]|files|plan|rename NAME]` — Inspect session details and workspace state.
- `/rename NAME` — Rename the current session.
- `/compact` — Summarize history to reduce context usage.
- `/context` — Show context window usage.
- `/cwd`, `/cd [PATH]` — Show or change the working directory.
- `/add-dir PATH` — Add a directory to the allowed file-access list.
- `/list-dirs` — Show directories that already have file access.
- `/exit`, `/quit` — Exit the CLI.

### Planning, review, and collaboration

- `/diff` — Review changes in the current directory.
- `/review [PROMPT]` — Run the code review agent against your changes.
- `/plan [PROMPT]` — Draft an implementation plan before editing.
- `/delegate [PROMPT]` — Delegate work to a remote repository with an AI-generated pull request.
- `/share [file|gist] [PATH]` — Export the session to Markdown or a secret gist.
- `/changelog` — Browse release notes from inside the CLI.
- `/pr` — Create or inspect pull requests, fix CI failures, address review feedback, and resolve merge conflicts.

### Agents, models, skills, and extensions

- `/agent` — Choose from available agents.
- `/fleet [PROMPT]` — Run parts of a task in parallel with subagents.
- `/model`, `/models [MODEL]` — View or change the active model.
- `/skills [list|info|add|remove|reload] [ARGS...]` — Manage skills.
- `/plugin [marketplace|install|uninstall|update|list] [ARGS...]` — Manage plugins and plugin marketplaces.
- `/extensions` — View, enable, and disable CLI extensions.

### Tools, account, and setup

- `/allow-all`, `/yolo` — Enable all permissions for tools, paths, and URLs.
- `/reset-allowed-tools` — Clear previously granted tool approvals.
- `/mcp [show|add|edit|delete|disable|enable] [SERVER-NAME]` — Manage MCP servers.
- `/lsp [show|test|reload|help] [SERVER-NAME]` — Manage language server configuration.
- `/ide` — Connect to an IDE workspace.
- `/terminal-setup` — Configure multiline terminal input support.
- `/login`, `/logout` — Sign in or out.
- `/user [show|list|switch]` — Manage the current GitHub account.
- `/help`, `/feedback`, `/usage`, `/version`, `/update`, `/theme`, `/experimental` — Session help, reporting, usage, updates, UI, and feature toggles.

### Keyboard shortcuts

- `@ FILENAME` — Include file contents in the prompt context.
- `! COMMAND` — Run a shell command directly.
- `Ctrl + X` then `/` — Run a slash command after you already started typing.
- `Shift + Tab` — Cycle between standard, plan, and autopilot mode.
- `Ctrl + O`, `Ctrl + E`, `Ctrl + T` — Expand recent timeline items, expand all, or toggle reasoning display.
- `Ctrl + G` — Edit the prompt in an external editor.
- `Ctrl + L`, `Ctrl + C`, `Ctrl + D` — Clear screen, cancel, or shut down.

## Command-Line Commands and Flags

### Core commands

- `copilot` — Launch the interactive interface.
- `copilot help [topic]` — Show help for config, commands, environment, logging, or permissions.
- `copilot init` — Initialize instructions for the current repository.
- `copilot update` — Download and install the latest version.
- `copilot version` — Show version information and check for updates.
- `copilot login`, `copilot logout` — Authenticate or remove credentials.
- `copilot plugin` — Manage plugins outside the interactive session.

### Automation and session control

- `-p, --prompt=PROMPT` — Run a prompt programmatically and exit after completion.
- `-i, --interactive=PROMPT` — Start an interactive session and run an initial prompt.
- `--continue` — Resume the most recent session.
- `--resume=SESSION-ID` — Resume a specific session.
- `--agent=AGENT` — Pick a custom agent up front.
- `--autopilot` — Let Copilot continue autonomously in prompt mode.
- `--max-autopilot-continues=COUNT` — Cap autonomous follow-up turns.
- `--output-format=text|json` — Return plain text or JSONL.
- `--share=PATH`, `--share-gist` — Export a programmatic session after it finishes.
- `-s, --silent` — Suppress usage statistics and print only the answer.
- `--no-ask-user` — Disable the ask-user tool for fully autonomous runs.

### Permissions and safety

- `--allow-all`, `--yolo` — Approve all tools, paths, and URLs.
- `--allow-all-tools`, `--allow-all-paths`, `--allow-all-urls` — Approve one permission category at a time.
- `--allow-tool=TOOL`, `--deny-tool=TOOL` — Pre-allow or pre-deny tool patterns.
- `--allow-url=URL`, `--deny-url=URL` — Control URL access.
- `--available-tools=TOOL`, `--excluded-tools=TOOL` — Reduce the tool surface available to the model.
- `--disallow-temp-dir` — Block automatic access to the system temp directory.

### UI, output, and logging

- `--model=MODEL` — Select the model.
- `--alt-screen=on|off`, `--no-alt-screen` — Control alternate screen buffer usage.
- `--banner` — Show the startup banner.
- `--plain-diff` — Disable rich diff rendering.
- `--screen-reader` — Enable screen-reader optimizations.
- `--stream=on|off` — Turn streaming output on or off.
- `--secret-env-vars=VAR` — Redact extra environment variables in output.
- `--config-dir=PATH` — Override the config directory.
- `--bash-env`, `--no-bash-env` — Control `BASH_ENV` sourcing.
- `--experimental`, `--no-experimental` — Toggle experimental features.
- `--log-dir=DIRECTORY`, `--log-level=LEVEL` — Control CLI logging.
- `--no-auto-update` — Disable automatic updates.

### MCP and tooling flags

- `--acp` — Start an Agent Client Protocol server.
- `--additional-mcp-config=JSON|@path` — Add MCP servers for the current session only.
- `--disable-builtin-mcps` — Disable built-in MCP servers.
- `--disable-mcp-server=SERVER-NAME` — Disable a specific MCP server.
- `--enable-all-github-mcp-tools` — Enable the full GitHub MCP tool surface.
- `--add-github-mcp-toolset=TOOLSET`, `--add-github-mcp-tool=TOOL` — Expand the GitHub MCP subset.

## Permission Prompts and Tool Rules

When Copilot CLI asks for permission, these one-key responses are available:

- `y` — Allow once.
- `n` — Deny once.
- `!` — Allow similar requests for the rest of the session.
- `#` — Deny similar requests for the rest of the session.
- `?` — Show more detail about the request.

Tool rules use the `Kind(argument)` pattern. Deny rules always override allow rules.

```bash
# Allow all git commands except git push
copilot --allow-tool='shell(git:*)' --deny-tool='shell(git push)'

# Allow one MCP tool
copilot --allow-tool='MyMCP(create_issue)'

# Allow all tools from one MCP server
copilot --allow-tool='MyMCP'
```

## Configuration Files

Settings cascade from broader scopes to narrower scopes. Command-line flags and environment variables always win.

- `~/.copilot/config.json` — User-wide defaults.
- `.github/copilot/settings.json` — Repository-wide shared settings.
- `.github/copilot/settings.local.json` — Local personal overrides that should not be committed.

### Common user settings

- `model` — Default model selection.
- `theme` — `auto`, `dark`, or `light`.
- `reasoning_effort` — `low`, `medium`, `high`, or `xhigh`.
- `experimental` — Enable experimental features by default.
- `alt_screen` — Use the terminal alternate screen buffer.
- `trusted_folders` — Pre-granted file access.
- `allowed_urls`, `denied_urls` — URL allowlists and blocklists.
- `screen_reader` — Screen-reader mode.
- `stream` — Streaming responses.
- `auto_update` — Automatic updates.
- `bash_env` — `BASH_ENV` support.

### Repository-level settings

Repository settings support shared plugin behavior and startup messaging, including:

- Enabled plugins for the repository.
- Extra known plugin marketplaces.
- Shared startup announcements.

## Hooks

Hook configuration files live in `.github/hooks/*.json`.

### What hooks can do

- Run shell commands before or after tool use.
- Auto-submit a prompt or slash command when a session starts.
- Allow, deny, or modify tool calls before they execute.
- Block an agent or subagent from finishing and force another turn.

### Main hook events

- `sessionStart`, `sessionEnd`
- `userPromptSubmitted`
- `preToolUse`, `postToolUse`
- `agentStop`, `subagentStop`
- `errorOccurred`

### Hook formats

- Command hooks support `bash`, `powershell`, `cwd`, `env`, and `timeoutSec`.
- Prompt hooks support a `prompt` string and can submit either plain text or a slash command.
- `preToolUse` can return `allow`, `deny`, or `ask`, and can also replace tool arguments with `modifiedArgs`.
- `agentStop` and `subagentStop` can return `allow` or `block`.

### Useful recent hook updates

- `preCompact` hooks can run before context compaction starts.
- Hooks can ask for confirmation before a tool runs.
- Hook configuration files can omit the `version` field.

## MCP Servers

Copilot CLI can load MCP servers from several places.

### Configuration sources

- `~/.copilot/mcp-config.json`
- `.github/mcp.json`
- `.mcp.json`
- `.vscode/mcp.json`
- `.devcontainer/devcontainer.json`

### Built-in MCP servers

- `github-mcp-server` — GitHub API actions such as issues, pull requests, commits, code search, and GitHub Actions.
- `playwright` — Browser automation.
- `fetch` — HTTP requests.
- `time` — Time utilities.

### Transport types

- `local` / `stdio` — Launch a local process with `command` and `args`.
- `http` — Connect to a remote streamable HTTP server via `url`.
- `sse` — Connect to a remote Server-Sent Events server via `url`.

### Common fields

- Local servers: `command`, `args`, `tools`, `env`, `cwd`, `timeout`, `type`.
- Remote servers: `type`, `url`, `tools`, `headers`, `oauthClientId`, `oauthPublicClient`, `timeout`.
- `filterMapping` controls output filtering: `hidden_characters` (default), `markdown`, or `none`.

### Trust model

- Built-in servers are high trust.
- Repository, workspace, and dev-container configs are medium trust.
- User config trust is your responsibility.
- Remote servers are low trust and should always be reviewed.

All MCP tool calls still require explicit permission, including read-only calls against external services.

## Skills and Custom Agents

### Skills

Skills are Markdown packages that extend what Copilot CLI can do. Each skill lives in its own directory with a `SKILL.md` file.

Common skill locations:

- `.github/skills/`
- `.agents/skills/`
- `.claude/skills/`
- Parent `.github/skills/` directories in monorepos
- `~/.copilot/skills/`
- `~/.claude/skills/`
- Extra directories from `COPILOT_SKILLS_DIRS`

Useful frontmatter fields:

- `name`
- `description`
- `allowed-tools`
- `user-invocable`
- `disable-model-invocation`

### Custom agents

Custom agents are Markdown-defined specialists that can be selected with `/agent` or `--agent=AGENT`.

Built-in agents currently include:

- `code-review`
- `explore`
- `general-purpose`
- `research`
- `task`

Custom agent locations:

- `.github/agents/` or `.claude/agents/`
- `~/.copilot/agents/` or `~/.claude/agents/`
- Plugin-provided agents

Useful frontmatter fields:

- `description`
- `infer`
- `model`
- `tools`
- `mcp-servers`

## Environment Variables

Useful environment variables include:

- `COPILOT_MODEL` — Default model.
- `COPILOT_ALLOW_ALL` — Equivalent to `--allow-all`.
- `COPILOT_HOME` — Override the default Copilot home directory.
- `COPILOT_EDITOR` — External editor command.
- `COPILOT_CUSTOM_INSTRUCTIONS_DIRS` — Extra instruction directories.
- `COPILOT_SKILLS_DIRS` — Extra skill directories.
- `COPILOT_GITHUB_TOKEN`, `GH_TOKEN`, `GITHUB_TOKEN` — Authentication tokens.
- `GH_HOST` — Alternate GitHub host.
- `HTTP_PROXY`, `HTTPS_PROXY`, `NO_PROXY` — Network proxy settings.
- `NO_COLOR` — Disable terminal color.
- `USE_BUILTIN_RIPGREP` — Switch between bundled and system ripgrep.
- `PLAIN_DIFF` — Disable rich diff rendering.

## Observability

Copilot CLI can export traces and metrics with OpenTelemetry.

- OTel is off by default.
- It turns on when `COPILOT_OTEL_ENABLED=true`, `OTEL_EXPORTER_OTLP_ENDPOINT` is set, or `COPILOT_OTEL_FILE_EXPORTER_PATH` is set.
- `OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT=true` captures full prompts, responses, and tool payloads.
- Content capture can expose sensitive data and should only be enabled in trusted environments.

## Recent Additions Worth Knowing

Recent official releases added or improved several user-facing CLI features:

- `/extensions` for viewing, enabling, and disabling CLI extensions.
- `/pr` for PR creation, inspection, review feedback, merge-conflict work, and CI follow-up.
- `/version` inside the interactive session.
- `/changelog last <N>`, `/changelog since <version>`, and `/changelog summarize`.
- `@` file mentions for absolute paths, home-directory paths, and parent-relative paths.
- `--reasoning-effort` for setting reasoning depth from the command line.
- `.devcontainer/devcontainer.json` as another MCP configuration source.
- One-time path approval in permission dialogs.
- OpenTelemetry instrumentation for sessions, model calls, and tool execution.

## Sources

- [GitHub Copilot CLI command reference](https://docs.github.com/en/copilot/reference/cli-command-reference)
- [GitHub Copilot CLI releases](https://github.com/github/copilot-cli/releases)
- [GitHub Copilot CLI plugin reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-plugin-reference)
