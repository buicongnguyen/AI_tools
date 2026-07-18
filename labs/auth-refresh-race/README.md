# Executable Lab: Refresh-Token Concurrency Race

This lab turns Case SE-01 into a deterministic software-engineering exercise. The baseline intentionally starts one refresh per expired request. Two concurrent calls rotate the same refresh token, so one succeeds and one incorrectly logs the user out.

## Requirements

- Node.js 22 or newer
- No external packages are required

## Start the exercise

```powershell
cd labs/auth-refresh-race
npm run reproduce
```

The command must fail on the untouched baseline. Preserve that output as evidence.

## Goal

Change only `src/auth-client.js` so concurrent expired requests within one session share a single refresh operation.

Acceptance criteria:

1. Exactly one refresh is sent for concurrent expired requests.
2. Every waiting request resumes with the new access token.
3. One failed shared refresh logs the session out exactly once.
4. Refresh-token rotation remains enabled.
5. Access and refresh token values never appear in logs.
6. No test, fake server, or acceptance criterion is weakened.

## Claude Code path

1. Start Claude Code in this directory and read `CLAUDE.md`.
2. Ask it to reproduce and explain the concurrent sequence before editing.
3. Use Plan mode if the promise lifecycle or failure semantics are unclear.
4. Implement the smallest candidate change.
5. Ask a fresh reviewer/subagent to review the diff and raw test output.

## Codex path

1. Open this directory in Codex and read `AGENTS.md`.
2. Run the baseline and use `/plan` to state the invariants and promise lifecycle.
3. Implement the smallest candidate change.
4. Run `/review` with the task, diff, and raw evidence.

## Check the lab itself

The repository CI runs:

```powershell
npm run verify:lab
```

That verifier requires the untouched baseline to fail and the separate reference solution to pass. After your own attempt, compare with `solution/auth-client.js`, then record results in `EVIDENCE.md` and the repository practice scorecard.
