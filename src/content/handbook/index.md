---
title: "GitHub Copilot CLI Handbook"
description: "Your comprehensive guide to AI-powered command line assistance"
lastUpdated: "January 2025"
---

## Table of Contents

- [Introduction](#introduction)
- [Installation & Setup](#installation--setup)
- [Basic Usage](#basic-usage)
- [Commands](#commands)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [Slash Commands](#slash-commands)
- [Configuration Options](#configuration-options)
- [File Patterns](#file-patterns)
- [Integration Examples](#integration-examples)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)
- [Version History](#version-history)

## Introduction

GitHub Copilot CLI is an AI-powered command-line interface tool that helps you discover, recall, and compose shell commands with natural language. It brings the power of GitHub Copilot directly to your terminal.

> **Key Features**
>
> - **Natural Language to Commands:** Describe what you want to do in plain English
> - **Context-Aware Suggestions:** Uses your current directory and environment
> - **Interactive Mode:** Review and refine suggestions before execution
> - **Multiple Shell Support:** Works with bash, zsh, PowerShell, and more
> - **Git Integration:** Specialized commands for Git operations

## Installation & Setup

### Prerequisites

- GitHub account with Copilot access
- GitHub CLI (gh) version 2.29.0 or later
- Active GitHub Copilot subscription

### Installation Steps

```bash
# Install GitHub CLI if not already installed

# macOS
brew install gh

# Windows
winget install --id GitHub.cli

# Linux
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
sudo apt update
sudo apt install gh

# Install Copilot CLI extension
gh extension install github/gh-copilot

# Authenticate
gh auth login
```

### Setting Up Aliases

```bash
# Add to your shell configuration file (.bashrc, .zshrc, etc.)

# Suggest commands
alias '??'='gh copilot suggest'

# Explain commands
alias 'git?'='gh copilot explain'
```

## Basic Usage

### Suggest Commands

Get command suggestions by describing what you want to do:

```bash
# Using the full command
gh copilot suggest "find all javascript files modified in the last week"

# Using alias
?? "compress all images in current directory"

# Interactive mode - you'll be prompted for your request
gh copilot suggest
```

### Explain Commands

Understand what a command does:

```bash
# Explain a specific command
gh copilot explain "tar -xzf archive.tar.gz"

# Using alias
git? "git rebase -i HEAD~3"

# Explain from clipboard
gh copilot explain
```

### Command Types

Copilot CLI can suggest commands for different contexts:

- **Generic Shell:** General command-line operations
- **Git:** Version control operations
- **GitHub CLI:** GitHub-specific operations

## Commands

| Command | Description | Example |
|---------|-------------|---------|
| `gh copilot suggest` | Get command suggestions from natural language | `gh copilot suggest -t shell "list all docker containers"` |
| `gh copilot explain` | Explain what a command does | `gh copilot explain "find . -name '*.log' -delete"` |
| `gh copilot config` | Configure Copilot CLI settings | `gh copilot config` |
| `gh copilot --version` | Show version information | `gh copilot --version` |
| `gh extension upgrade gh-copilot` | Update to the latest version | `gh extension upgrade gh-copilot` |

### Command Flags

| Flag | Description |
|------|-------------|
| `-t, --target` | Target type: `shell`, `git`, or `gh` |
| `-h, --help` | Show help information |
| `--version` | Display version information |

## Keyboard Shortcuts

### Interactive Mode Navigation

| Shortcut | Action |
|----------|--------|
| ↑ / ↓ | Navigate between suggestions |
| Enter | Select current suggestion |
| Tab | Copy command to clipboard |
| Ctrl+C | Cancel and exit |
| Ctrl+E | Open in editor |
| ? | Show help |

### Command Review Options

| Key | Action |
|-----|--------|
| e | Execute command |
| r | Revise query |
| x | Explain command |
| c | Copy to clipboard |
| q | Quit |

### Editor Shortcuts

| Shortcut | Action |
|----------|--------|
| Ctrl+A | Move to beginning of line |
| Ctrl+E | Move to end of line |
| Ctrl+K | Delete from cursor to end |
| Ctrl+U | Delete from cursor to beginning |
| Ctrl+W | Delete previous word |

## Slash Commands

Use slash commands within the interactive prompt to modify behavior:

| Command | Description | Example |
|---------|-------------|---------|
| `/shell` | Force shell command context | `/shell list all processes` |
| `/git` | Force git command context | `/git show last 5 commits` |
| `/gh` | Force GitHub CLI context | `/gh list my pull requests` |
| `/help` | Show help information | `/help` |
| `/exit` | Exit interactive mode | `/exit` |
| `/clear` | Clear current input | `/clear` |

> **Pro Tip: Command Context**
>
> Copilot CLI automatically detects context, but slash commands let you override the detection when needed. This is useful when the AI misinterprets your intent.

## Configuration Options

### Access Configuration

```bash
# Interactive configuration
gh copilot config

# View current settings
gh copilot config --show
```

### Available Settings

| Setting | Description | Options |
|---------|-------------|---------|
| **Editor** | Default editor for command editing | vim, nano, emacs, code, etc. |
| **Shell** | Target shell for suggestions | bash, zsh, fish, powershell |
| **Auto-execute** | Automatically run suggested commands | true, false (default: false) |
| **Theme** | Color scheme for output | auto, light, dark |

### Environment Variables

```bash
# Set default editor
export GH_COPILOT_EDITOR=vim

# Set default shell
export GH_COPILOT_SHELL=zsh

# Disable telemetry
export GH_COPILOT_TELEMETRY=false

# Set API timeout (in seconds)
export GH_COPILOT_TIMEOUT=30
```

### Configuration File Location

```bash
# macOS/Linux
~/.config/github-copilot/config.yml

# Windows
%USERPROFILE%\.config\github-copilot\config.yml
```

## File Patterns

Common file pattern operations you can request from Copilot CLI:

### Finding Files

```bash
# Natural language requests
?? "find all javascript files in src directory"
?? "list files modified in the last 24 hours"
?? "search for files larger than 10MB"
?? "find empty directories"
?? "locate all .env files excluding node_modules"
```

### File Operations

```bash
# Batch operations
?? "rename all .txt files to .md in current folder"
?? "copy all images to backup folder"
?? "compress all log files older than 30 days"
?? "delete all files matching *.tmp recursively"
```

### Pattern Examples

| Pattern | Description | Example Command |
|---------|-------------|-----------------|
| `*.{js,ts}` | JavaScript or TypeScript files | `find . -name "*.js" -o -name "*.ts"` |
| `**/*.test.js` | Test files in all directories | `find . -name "*.test.js"` |
| `[!.]*.json` | JSON files not starting with dot | `find . -name "*.json" ! -name ".*"` |
| `src/**/{index,main}.*` | Index or main files in src | `find src -name "index.*" -o -name "main.*"` |

## Integration Examples

### Docker Integration

```bash
# Container management
?? "list all running docker containers with their ports"
?? "remove all stopped containers"
?? "show logs for container named web-app"
?? "create a docker network named app-network"

# Image operations
?? "build docker image from Dockerfile in current directory"
?? "remove unused docker images"
?? "export container filesystem to tar file"
```

### Kubernetes Integration

```bash
# Cluster operations
?? "get all pods in namespace production"
?? "describe service named api-gateway"
?? "show logs from pod matching label app=frontend"
?? "apply configuration from k8s directory"

# Debugging
?? "exec into pod and open bash shell"
?? "port forward service to local port 8080"
```

### Git Workflows

```bash
# Branch management
?? "create new branch from main called feature/user-auth"
?? "show all branches merged into main"
?? "delete local branches that are merged"

# History and logs
?? "show commits by author in last month"
?? "find commit that changed specific file"
?? "show diff between two branches"

# Advanced operations
?? "cherry pick commit from another branch"
?? "rebase current branch onto main"
?? "stash changes including untracked files"
```

### Database Operations

```bash
# PostgreSQL
?? "backup postgres database to file"
?? "restore database from backup file"
?? "list all tables in database"

# MySQL
?? "export mysql database with structure and data"
?? "import sql file into mysql database"

# MongoDB
?? "export mongodb collection to json"
?? "import json into mongodb collection"
```

### AWS CLI Integration

```bash
# S3 operations
?? "list all s3 buckets"
?? "sync local folder to s3 bucket"
?? "download file from s3 bucket"

# EC2 operations
?? "list running ec2 instances with their IPs"
?? "stop instance by instance id"

# Lambda
?? "list all lambda functions"
?? "invoke lambda function with test payload"
```

### CI/CD Integration

```bash
# GitHub Actions
?? "list recent workflow runs"
?? "trigger workflow dispatch event"
?? "download artifact from workflow run"

# Jenkins
?? "trigger jenkins job with parameters"
?? "get last build status for job"
```

## Best Practices

> **1. Be Specific and Descriptive**
>
> The more context you provide, the better the suggestions:
>
> - ❌ *"find files"*
> - ✅ *"find all JavaScript files modified in the last week in the src directory"*

> **2. Review Before Executing**
>
> Always review suggested commands before execution, especially for:
>
> - Delete operations
> - Recursive modifications
> - System-wide changes
> - Production deployments

> **3. Use the Right Context**
>
> Specify the target type for better results:
>
> - `-t shell` for general commands
> - `-t git` for version control
> - `-t gh` for GitHub operations

> **4. Leverage Aliases**
>
> Set up convenient aliases for faster access:
>
> ```bash
> # Quick suggest
> alias '??'='gh copilot suggest'
>
> # Context-specific
> alias 'ghcs'='gh copilot suggest -t shell'
> alias 'ghcg'='gh copilot suggest -t git'
> alias 'ghch'='gh copilot suggest -t gh'
> ```

> **5. Iterate on Suggestions**
>
> Don't settle for the first suggestion - refine your query:
>
> - Use the revise option (r) to modify your request
> - Add more constraints or context
> - Ask for explanations to understand the command

> **6. Combine with Other Tools**
>
> Copilot CLI works great with other command-line tools:
>
> - **fzf:** Fuzzy finder for interactive selection
> - **jq:** JSON processing
> - **ripgrep:** Fast searching
> - **tldr:** Simplified man pages

> **7. Learn from Explanations**
>
> Use `gh copilot explain` to understand complex commands you encounter:
>
> - Historical commands from your shell history
> - Commands from documentation
> - Scripts from colleagues

> **8. Keep Your Extension Updated**
>
> ```bash
> # Check for updates regularly
> gh extension upgrade gh-copilot
>
> # Or upgrade all extensions
> gh extension upgrade --all
> ```

> **9. Use in Scripts Carefully**
>
> While you can pipe to Copilot CLI, be cautious in automated scripts:
>
> - Suggestions may vary between runs
> - API calls require authentication
> - Consider rate limits for bulk operations

> **10. Privacy Considerations**
>
> - Don't include sensitive data in queries
> - Review telemetry settings
> - Understand that queries are sent to GitHub's servers
> - Avoid including passwords, keys, or tokens in prompts

## Troubleshooting

### Common Issues

#### Authentication Failed

```bash
# Re-authenticate
gh auth login

# Check authentication status
gh auth status

# Verify Copilot access
gh copilot --version
```

#### Extension Not Found

```bash
# List installed extensions
gh extension list

# Reinstall if necessary
gh extension remove gh-copilot
gh extension install github/gh-copilot
```

#### Slow Response Times

- Check your internet connection
- Verify GitHub API status
- Try increasing timeout: `export GH_COPILOT_TIMEOUT=60`
- Consider simplifying your query

#### Suggestions Not Relevant

- Be more specific in your description
- Use slash commands to specify context (`/shell`, `/git`, `/gh`)
- Include file paths, patterns, or constraints
- Revise your query with additional context

#### Commands Not Working in Your Shell

```bash
# Set correct shell in config
gh copilot config

# Or via environment variable
export GH_COPILOT_SHELL=zsh  # or bash, fish, etc.
```

### Getting Help

- **Built-in help:** `gh copilot --help`
- **GitHub Copilot documentation:** [https://docs.github.com/copilot](https://docs.github.com/copilot)
- **Community forum:** [GitHub Community Discussions](https://github.com/orgs/community/discussions/categories/copilot)
- **Report issues:** [gh-copilot issues](https://github.com/github/gh-copilot/issues)

## Version History

### v1.0.0 (April 2023)

- Initial release of GitHub Copilot CLI
- Basic `suggest` and `explain` commands
- Support for shell, git, and gh contexts
- Interactive mode with command review

### v1.0.1 (May 2023)

- Improved command accuracy for git operations
- Better error handling and messaging
- Performance optimizations
- Bug fixes for Windows PowerShell

### v1.0.2 (June 2023)

- Added support for fish shell
- Enhanced context detection
- Improved multi-line command formatting
- Fixed clipboard integration on Linux

### v1.0.3 (July 2023)

- Added configuration management (`gh copilot config`)
- Support for custom editor integration
- Improved suggestions for Docker commands
- Better handling of special characters

### v1.0.4 (September 2023)

- Enhanced natural language understanding
- Added slash commands for context switching
- Improved explanation formatting
- Better error recovery

### v1.0.5 (November 2023)

- Performance improvements for large codebases
- Enhanced git commit message suggestions
- Better handling of environment variables
- Improved Windows support

### v1.0.6 (January 2024)

- Added support for Kubernetes commands
- Enhanced AWS CLI integration
- Improved multi-step command suggestions
- Better context awareness for monorepos

### v1.0.7 (March 2024)

- Enhanced security for sensitive operations
- Improved telemetry controls
- Better handling of piped input
- Performance optimizations

### v1.0.8 (May 2024)

- Added support for more shell environments
- Enhanced explanation details
- Improved command history integration
- Better offline error messaging

### v1.0.9 (July 2024)

- Enhanced AI model for better accuracy
- Improved suggestions for complex queries
- Better handling of file patterns
- Added support for more CI/CD platforms

### v1.0.10 (September 2024)

- Improved response times
- Enhanced context switching
- Better integration with GitHub Actions
- Improved accessibility features

### v1.0.11 (November 2024)

- Added advanced filtering options
- Enhanced multi-language support
- Improved suggestion ranking
- Better error diagnostics

### v1.0.12 (January 2025) - Latest

- Major AI model improvements
- Enhanced context awareness
- Better handling of complex scenarios
- Improved performance and stability
- Enhanced security features

---

Last updated: January 2025

[GitHub Copilot](https://github.com/features/copilot) | [Documentation](https://docs.github.com/copilot) | [Repository](https://github.com/github/gh-copilot)
