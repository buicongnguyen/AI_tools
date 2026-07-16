# Repository Instructions for Claude Code

Read `PROJECT_CONTEXT.md` before making changes.

## Working rules

- Inspect existing code, configuration, and tests first.
- Preserve unrelated work.
- Prefer small, reviewable changes.
- Do not expose secrets or personal data.
- Do not deploy production, delete data, or broaden scope without explicit approval.

## Build and test

- Use commands from `PROJECT_CONTEXT.md`; do not guess when a command is documented.
- Reproduce bugs before editing.
- Add or update tests for changed behavior.
- Run focused checks followed by the relevant full suite.
- Inspect the final diff and remove temporary debug code.

## Required final response

- Outcome and changed files.
- Commands run with results.
- Evidence that acceptance criteria pass.
- Assumptions, risks, and anything not completed.

