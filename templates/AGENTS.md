# Repository Instructions for Codex

Read `PROJECT_CONTEXT.md` before making changes.

## Working rules

- Inspect existing code and tests before proposing changes.
- Preserve unrelated user changes.
- Make the smallest coherent change that meets the acceptance criteria.
- Never place secrets in code, logs, fixtures, or documentation.
- Ask before production deployment, destructive data operations, or materially expanding scope.

## Verification

- Use the exact commands documented in `PROJECT_CONTEXT.md`.
- Add a regression test for every bug fix when feasible.
- Run focused checks first, then the broader relevant suite.
- Review the final diff for correctness, security, privacy, accessibility, and scope drift.

## Completion report

Return:

1. Outcome.
2. Files changed.
3. Commands run and exact pass/fail result.
4. Assumptions.
5. Remaining risks or follow-ups.

