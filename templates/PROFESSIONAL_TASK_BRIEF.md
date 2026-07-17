# Professional AI Engineering Task Brief

Use one brief per task. Fill it before implementation and update the evidence sections while working. Delete instructional placeholders when the task is complete.

## Task identity

- Task ID:
- Date:
- Owner / integration owner:
- Repository / branch / worktree:
- Tool and model:
- Task type: small fix / unknown bug / feature / migration / hardware / security / deployment
- Risk: low / medium / high
- Operating mode: direct / plan / parallel isolated / human-gated
- Time, tool, and cost budget:

## Goal and value

### Observable outcome

What must be true for the user or system when this task is complete?

### Why now

What problem, risk, or opportunity makes this worth doing?

### Affected user or system

Who or what consumes the result?

## Current state

### Observed symptom or behavior

Record facts, logs, measurements, screenshots, failing commands, or hardware observations. Label assumptions separately.

### Minimal reproduction

Steps, input, environment, expected result, and actual result. For a feature, describe the current interface and missing capability.

### Ranked hypotheses

1. Hypothesis — evidence for/against — cheapest discriminating test
2. Hypothesis — evidence for/against — cheapest discriminating test
3. Hypothesis — evidence for/against — cheapest discriminating test

## Authoritative context

- Repository instructions read (`AGENTS.md`, `CLAUDE.md`, or equivalent):
- Relevant source modules:
- Relevant tests:
- Build, lint, type-check, simulation, or deployment commands:
- Architecture decision records / interface contracts:
- Datasheets, schematics, safety requirements, or standards:
- Official external documentation and verification date:

## Scope contract

### In scope

-

### Out of scope

-

### Must preserve

- Public interfaces and compatibility:
- Performance / memory / power / thermal limits:
- Security and privacy properties:
- Existing user-visible behavior:

### Files or systems the agent may modify

-

### Files or systems the agent must not modify

-

## Acceptance vector

Write observable checks before implementation.

| ID | Dimension | Acceptance check | Verification method | Result/evidence |
|---|---|---|---|---|
| A1 | Behavior |  |  |  |
| A2 | Regression |  |  |  |
| A3 | Integration |  |  |  |
| A4 | Performance / hardware |  |  |  |
| A5 | Security / safety |  |  |  |
| A6 | Deployment / rollback |  |  |  |

## Plan and change strategy

### Inspection summary

Relevant architecture, data flow, invariants, and uncertainty.

### Smallest defensible change

State the proposed change and why it is smaller or safer than alternatives.

### Planned steps

1.
2.
3.

### Parallel ownership, if used

| Worker | Isolated worktree/environment | Owned files/component | Output contract | Integration order |
|---|---|---|---|---|
|  |  |  |  |  |

Do not parallelize overlapping edits or decisions with a single shared invariant unless one integration owner coordinates them.

## Required verification

Run narrow checks first, then broaden according to risk.

- Focused unit/regression test:
- Integration/system test:
- Type check / lint / static analysis:
- Build/package check:
- Security/dependency check:
- Benchmark / load check:
- Simulator / hardware-in-the-loop check:
- Power, thermal, timing, or safety-limit check:
- Deployment smoke test:
- Manual accessibility/usability check:

## Stop conditions and human gates

The agent must stop and report before:

- Destructive or irreversible operations:
- Production deployment or public release:
- Accessing new secrets, accounts, or personal data:
- Energizing hardware or exceeding laboratory safety limits:
- Expanding scope beyond this brief:
- Spending beyond the task budget:
- Continuing after repeated failure or contradictory evidence:

Required approver and approval evidence:

## Independent review

Give a fresh reviewer this brief, the final diff, and verification evidence.

- Correctness findings:
- Missing tests or edge cases:
- Security / privacy / safety findings:
- Maintainability findings:
- Scope drift or unrelated changes:
- Findings resolved or explicitly accepted:

## Completion evidence

### Changed files and purpose

-

### Commands and outcomes

| Command/check | Environment | Result | Evidence location |
|---|---|---|---|
|  |  |  |  |

### Acceptance result

- [ ] Every applicable acceptance item is supported by evidence.
- [ ] The final diff contains no unexplained unrelated change.
- [ ] Residual risks are explicit.
- [ ] Rollback or recovery is documented where relevant.
- [ ] Human gates were respected.

### Residual risks and follow-up

-

### Rollback / recovery

-

## Retrospective and system improvement

- Verified-result time:
- Human corrections required:
- First-pass verified: yes / no
- Scope drift: yes / no
- Escaped defect: yes / no
- Safe stop correct: yes / no / not applicable
- What confused the agent?
- What context was missing or excessive?
- What should become a repository instruction, test, hook, skill, or evaluation case?
- Scorecard row updated: yes / no
