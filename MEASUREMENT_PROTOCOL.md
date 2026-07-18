# Measurement protocol

This project teaches measured AI-assisted engineering. It does not claim that one tool is universally faster or better.

## Current evidence status

As of 2026-07-18, this repository publishes the protocol and reusable scorecards, but **zero completed benchmark runs**. Examples in the guide illustrate methods; they are not performance claims.

## Run a fair comparison

1. Select a real, bounded engineering task with an objective acceptance test.
2. Freeze the same repository commit, environment, task brief, test command, and time limit.
3. Run Claude Code and Codex in separate clean worktrees. Alternate which tool goes first across tasks.
4. Allow the same permissions, reference material, and human interventions.
5. Record elapsed time, agent turns, human interventions, changed lines, tests added, first-pass test result, final result, regressions, and reviewer findings.
6. Preserve the prompt, relevant transcript excerpts, patch, test logs, and commit SHA. Redact secrets and private data.
7. Repeat on at least 20 representative tasks before drawing a workflow conclusion. Report distributions and failure modes, not only an average.

## Promotion rule

Adopt a technique as a team default only when it improves the target metric without worsening correctness, security, maintainability, or review effort. Re-test after major model, CLI, harness, or repository changes.

## Required task record

Use `professional-scorecard.csv` for aggregate observations and `software-engineering-cases.csv` for task-level cases. Each completed row should link to reproducible evidence. Leave unknown fields blank; never infer a result from a model's self-evaluation.

## Reviewer checklist

- Acceptance criteria were written before the run.
- Both tools saw equivalent context and permissions.
- Tests are independent of the implementation under evaluation.
- Human rescue work is counted.
- Security and regression checks ran.
- Failed and abandoned runs remain in the dataset.
- Conclusions state the repository, task mix, dates, and limitations.
