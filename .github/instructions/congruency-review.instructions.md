---
description: 'Mandatory full-file congruency review for all changed files before commit or push'
applyTo: '**'
---

# Congruency Review Instruction

## Table of Contents

- Purpose
- Required Trigger Points
- Required Workflow
- Review Criteria
- Completion Gate

## Purpose

Require a full-file congruency review of every changed file before any commit or push.

## Required Trigger Points

Run this review when any of the following are true:

- You edited files in this task.
- You are about to commit.
- You are about to push.

## Required Workflow

1. List changed files using git status or an equivalent change listing tool.
2. Read each changed file in full, not only the diff.
3. Apply the congruency checklist in this file.
4. Remediate issues directly in source files.
5. Run quality gates and fix remaining errors.

## Congruency Checklist

For each changed file, verify and remediate all of the following:

### Naming

- Variable Names: Does the variable name communicate its purpose, type and whats in it or used for?
- functions Names: Does the function name communicate its purpose, return type and side effects?
- Constants Names: Does the constant name communicate its purpose, type and value?
- Types Names: Does the type name communicate its purpose, structure and usage?

### Comments and Docstrings

- Comments in unison should tell a story of what the code is doing, why it does it, and any constraints or edge cases.
- Docstrings should accurately describe the intent, parameters, return values, and behavior of functions and classes.

### Public API and Documentation

- Public API: method signatures, parameter names, and return types should be consistent with their documentation and intended use.

### Validation and Errors

- Validation checks should be fail-fast, and error messages should be explicit, informative, and consistent across the codebase.

## Completion Gate

Do not commit or push until all changed files were reviewed in full and congruency fixes are complete.
