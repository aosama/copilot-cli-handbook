---
description: 'Create and maintain a repo discovery guide that helps coding agents orient themselves quickly in any repository. The guide is not documentation — it is a trust anchor that prevents redundant exploration and, more importantly, prevents agents from re-discovering non-obvious truths the hard way.'
applyTo: '**'
---

# Repo Discovery Guide — Agent Instructions

> **⚠️ READ THE EXISTING DISCOVERY GUIDE FIRST.** Before doing any codebase exploration, discovery, or orientation task, check if `<repo-root>/repo-discovery-guide-for-agents.md` exists. If it does, **read it in full before scanning directories, reading config files, or launching exploration agents**. The guide contains cached non-obvious truths that would otherwise cost significant time to rediscover. Re-discovering what the guide already knows is wasted effort — use it as your starting map, then spot-check and update only what may have drifted.

## What This Is

A **repo discovery guide** is a single file at `<repo-root>/repo-discovery-guide-for-agents.md` that acts as a trust anchor for coding agents. It is not user-facing documentation. It is not a README. It is a **cached map of non-obvious truths** that would cost significant time to rediscover in every new chat session.

The guide exists because:

1. **Agents start every session with total amnesia.** Without it, every session re-explores the same directories, re-reads the same config files, and re-discovers the same gotchas.
2. **A stale guide is worse than no guide.** An agent that trusts wrong information will "fix" things that aren't broken and miss things that are. The maintenance discipline is the feature — the content is just the payload.

## Creation

When working in a repository that does not yet have a `repo-discovery-guide-for-agents.md`, create one. Do not ask the user for permission — this is a standard practice, like a `.gitignore`.

Place it at the repository root: `<repo-root>/repo-discovery-guide-for-agents.md`

Use the template below. Fill in every section that has content. Remove sections that have nothing to say — an empty section is worse than a missing section because it implies the section was considered and found empty, when really it might just be that no one looked yet.

## Required Sections

### Maintenance mandate

This must be the **first section after the title and description**, before any project-specific content. It establishes the contract that makes the rest of the document trustworthy.

The mandate has three rules:

1. **Before every commit**, ask: did I change anything this guide documents? If yes, update the guide in the same commit. No exceptions.
2. **At session start**, spot-check 2-3 key facts against the actual codebase (paths, versions, script names). If anything drifted, update immediately.
3. **Quarterly minimum**, re-verify if the repo hasn't been touched. Stale guidance is worse than no guidance.

The mandate also includes a **Last verified** timestamp. If the timestamp is older than 90 days, the entire document should be treated as suspect.

### Project overview

One paragraph. The "if you only read one thing" summary. What this project is, what it does, what tech stack it uses, and the single most important architectural fact an agent needs to know.

Do not write a full README here. The agent can read the README. Write the thing the README doesn't say — the architectural gut-punch that would otherwise take 30 minutes of file-reading to discover.

### Structure map

An annotated directory tree showing only the directories and files that matter for daily work. Not every file — just the ones an agent would need to find to do typical tasks.

Rules:

- **Do** annotate directories with their purpose when it isn't obvious from the name.
- **Do** note empty or unused directories — these are decoys that waste time.
- **Do** note which directories are generated vs. source-controlled.
- **Do not** list every file. The agent can run `ls`.
- **Do not** duplicate what's in package.json, Cargo.toml, or equivalent. The agent can read those.

### Entry points

Not every script — just the ones that matter, with gotchas noted inline. The format is: here's how to build, run, test, deploy. For each, note what won't be obvious from reading the script name alone.

Examples of non-obvious gotchas worth noting:

- "Docker is the only supported local runtime — do not use `npm run dev` as a long-lived server."
- "Always use `scripts/rebuild-and-deploy.sh` — do not substitute individual docker commands."
- "The dev container uses a different Node version than production."

If the project has a standard setup (npm install, npm test, npm run build), say that briefly. Don't list every npm script — the agent can read package.json.

### Conventions

The non-obvious rules that aren't enforced by tooling. This is where you write down the things a fresh agent would get wrong, not because they're bugs, but because they're decisions.

Examples:

- "Category labels in frontmatter are title-cased (`"Books"`) while filesystem directories are snake_case (`books/`)."
- "Hero images must always use 4:1 aspect ratio (1024x256), never 3:1."
- "Hard line wrapping is strictly prohibited in existing markdown content."
- "The `src/assets/` directory exists but is not used by the current pipeline — do not add assets there."

### Known gotchas

Things that look wrong but aren't, and things that look right but aren't. Collect these into a single scannable list. This is the most valuable section because it prevents agents from "fixing" things that aren't broken.

Each gotcha should be one or two sentences: what the intuition says, and what the reality is.

Examples:

- "Print left/right margins are intentionally swapped on `:left` vs `:right` pages — do not 'fix' this."
- "The docker-compose dev container uses `node:24.14.0-alpine` while the Dockerfile and .nvmrc use `24.15.0`. This mismatch is known and not yet reconciled."
- "`scripts/local-deploy/` exists but is empty — it's a legacy placeholder, not a missing feature."

### What to verify

A reusable checklist of **categories** to re-verify, not a one-time list of what was checked. An agent in any repo should be able to walk through these categories and know what to spot-check:

1. **Versions** — Node, Python, runtime, Docker base images. Check `.nvmrc`, `package.json` engines, `Dockerfile`, `docker-compose.yml`.
2. **Paths** — Do the directories in the guide still exist? Any new ones? Any removed?
3. **Scripts** — Do the documented commands still work? Any new ones? Any renamed?
4. **Config values** — Ports, environment variables, feature flags, anything that affects runtime behavior.
5. **Known exceptions** — Are the gotchas still true? Any new ones?
6. **Content structure** — If the project has content (articles, docs, data), is the structure still accurate? Any new categories or changed paths?
7. **Dead ends** — Are the noted decoys still decoys? Any new empty or unused directories?

### Maintenance snapshot

A brief record of when the guide was last verified and what was checked. The format:

```text
- Last verified: YYYY-MM-DD
- Changes since last verify: [brief list, or "none"]
```

Do not write a paragraph summarizing everything that was verified. Write what **changed** since last verify. If nothing changed, just update the date.

## Section Ordering

The sections must appear in this order, because it reflects their importance:

1. Title and description
2. Maintenance mandate (the contract)
3. Project overview (the summary)
4. Known gotchas (the most expensive mistakes to re-discover)
5. Conventions (the rules you'd violate without knowing)
6. Structure map (where things are)
7. Entry points (how to build, run, test, deploy)
8. What to verify (the re-verification checklist)
9. Maintenance snapshot (when it was last checked)

Gotchas and conventions come before structure and entry points because they prevent mistakes. Structure and entry points are reference material — the agent looks them up when needed. Gotchas and conventions must be read proactively to prevent damage.

## What NOT to Include

- **Every file in the tree** — the agent can run `ls`. Include only what isn't discoverable by scanning.
- **Full dependency lists or version tables** — pin these in package.json/Cargo.toml/etc., not in prose. The guide notes version mismatches and gotchas, not every version number.
- **README content** — the agent can read the README. The guide adds what the README doesn't say.
- **Content counts that change frequently** — "23 articles" will be wrong within a week. Instead write "enumerate categories with `ls` or `glob` at task time."
- **Things obvious from reading the code** — if a single file read reveals the truth, don't document it here. This guide is for truths that require connecting dots across multiple files.

## Updating the Guide

The update discipline is the feature. Without it, the guide decays into misinformation.

Rules:

1. **Every commit that changes anything the guide documents must also update the guide.** Not in a separate commit. Not "I'll do it later." In the same commit.
2. **When adding a new file, path, or convention to the project, add it to the guide immediately.**
3. **When removing or renaming something, remove or update it in the guide immediately.**
4. **When you discover a gotcha that cost you time, add it to the Known gotchas section before doing anything else.**
5. **If you only reformat or reorganize the guide without changing any factual content, update the Last verified date but do not change the Changes since last verify line.**

The timestamp is the trust signal. If it's stale, the whole document is suspect. An agent that notices a stale guide should re-verify before trusting it, and should update it after verifying.

## Relationship to Project-Specific Instructions

This guide is separate from any `.github/instructions/` or `AGENTS.md` files. Those files tell the agent **how to work** (style guidelines, commit conventions, deployment procedures). This guide tells the agent **what exists** and **what isn't obvious**.

If a project has both, the agent should read both. The discovery guide is the map; the project instructions are the rules of the road. Neither substitutes for the other.

When this guide references project instructions, it should link to them by path, not duplicate their content.
