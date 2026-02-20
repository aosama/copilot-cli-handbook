---
title: 'Instruction File Surface'
description: 'How GitHub Copilot CLI uses instruction files to customize behavior'
---

Copilot CLI looks for custom instruction files in your repository to tailor its behavior.

## Supported Files

- `.github/copilot-instructions.md`
- `.copilot/instructions.md`
- `~/.copilot/instructions/*.instructions.md` — user-level instructions applied across all repositories (v0.0.412)

## Behavior

- **Combination (v0.0.385):** All custom instruction files found are combined. Earlier versions used a
  priority-based fallback system; now, multiple files are merged to provide comprehensive context.
- **View & Toggle (v0.0.407):** You can interactively view and enable/disable specific instruction files
  using the `/instructions` command.
- **Case-insensitive (v0.0.411):** Custom instruction files are recognized regardless of filename casing.

## Commands

- `/instructions` — View and toggle custom instruction files (v0.0.407)
- `/init` — Generate Copilot instructions (v0.0.396)
- `/init suppress` — Control init suggestions per repository (v0.0.410)
