---
title: 'Instruction File Surface'
description: 'How GitHub Copilot CLI uses instruction files to customize behavior'
---

Copilot CLI looks for custom instruction files in your repository to tailor its behavior.

## Supported Files

- `.github/copilot-instructions.md`
- `.copilot/instructions.md`
- `~/.copilot/instructions/*.instructions.md` — user-level instructions applied across all repositories ([v0.0.412](https://github.com/github/copilot-cli/releases/tag/v0.0.412))
- `AGENTS.md` — agent-specific instructions for guidelines, project structure, or environment details

## Commands

- `/instructions` — View and toggle which instruction files are active ([v0.0.407](https://github.com/github/copilot-cli/releases/tag/v0.0.407))
- `/instructions` with `--alt-screen` enabled — Opens as a full-screen picker ([v0.0.412](https://github.com/github/copilot-cli/releases/tag/v0.0.412))
- `/init` — Generate a `copilot-instructions.md` for your repository ([v0.0.396](https://github.com/github/copilot-cli/releases/tag/v0.0.396))
- `/init suppress` — Stop `/init` suggestions for a specific repository ([v0.0.410](https://github.com/github/copilot-cli/releases/tag/v0.0.410))

## Notes

- Instruction filenames are matched case-insensitively ([v0.0.411](https://github.com/github/copilot-cli/releases/tag/v0.0.411))
