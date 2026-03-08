---
description: 'Guidelines for keeping repository memory accurate, durable, and useful across future sessions and models.'
applyTo: '**'
---

# Copilot Repository Memory

Use the `store_memory` tool to record high-signal facts about this repository that will help future sessions, assistants, and models work more accurately and efficiently.

Store a memory only when the fact is all of the following:

- Durable across future tasks, not just the current change
- Verified by code, configuration, command output, or explicit user input
- Non-obvious from a quick read of a single file
- Likely to improve future coding, review, debugging, or release-tracking work

Good candidates include:

- Verified build, lint, and test commands
- Stable repository conventions or architecture constraints
- Important workflow gotchas, deployment rules, or public-facing content rules
- Corrections to outdated repository memories, with fresh citations

Do not store:

- Temporary task state, plans, TODOs, or branch-specific details
- PR-specific notes, one-off investigations, or transient failures
- Speculative conclusions or unverified assumptions
- Facts already obvious from existing instructions or a single file
- Secrets, credentials, personal data, or other sensitive information

Before storing, ask:

- Will this still help a future session working on a different task?
- Is it worth remembering instead of rediscovering from the repository?
- Do I have strong evidence and a precise citation for it?

Prefer fewer, higher-value memories over many low-value ones.

If an existing repository memory is outdated or factually incorrect, store a corrected fact with clear citations and note that it supersedes the earlier understanding.
