---
description: 'Store only durable, evidence-backed repository facts that improve future assistant performance across tasks and models.'
applyTo: '**'
---

# Repository Memory Policy

Use `store_memory` only for high-signal facts that will help future sessions, assistants, and models work faster and more accurately.

Store a fact only if it is all of the following:

- Durable: likely true across future tasks, not tied to one PR, branch, or session
- Verified: supported by code, configuration, command output, or explicit user input
- Non-obvious: not easy to infer from a quick read of one file or the current local context
- Actionable: likely to improve future coding, review, debugging, or operational work

Strong candidates:

- Verified build, lint, test, deploy, or release commands, including easy-to-miss prerequisites or flags
- Stable architecture constraints, repository conventions, or cross-file patterns
- Dependency constraints, version ceilings, or CI/CD rules that cause breakage if violated
- Persistent environment-specific gotchas or workflow rules
- Corrections to outdated repository memory, with fresh citations

Do not store:

- Temporary task state, plans, TODOs, or branch- or PR-specific details
- One-off investigations, transient failures, or speculative conclusions
- Facts already covered by existing instruction files or obvious from a single file
- Secrets, credentials, personal data, tokens, or other sensitive information

Before storing, ask:

- Will this still help a future session working on a different task?
- Is it worth remembering instead of rediscovering from the repository?
- Does an existing instruction file or nearby context already cover it?
- Do I have strong evidence and a precise citation for it?

Quality bar:

- Prefer fewer, higher-value memories over many low-value ones.
- Avoid duplicates unless the new fact is materially more accurate, complete, or current.

If an existing repository memory is outdated or incorrect, store a corrected fact with clear citations and note that it supersedes the earlier understanding.
