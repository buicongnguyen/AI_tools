# Loop Specification

> Version-control this contract. Replace every `{{placeholder}}`. Keep required
> acceptance criteria, policy, and verifier definitions immutable during a run.

## 1. Identity and ownership

- Loop name: `{{name}}`
- Version: `{{version}}`
- Owner: `{{team_or_person}}`
- Risk tier: `low | medium | high`
- Kill switch / disable procedure: `{{exact_procedure}}`
- Last reviewed: `{{yyyy-mm-dd}}`

## 2. Trigger and deduplication

- Trigger: `manual | schedule | GitHub event | alert | API | measurement`
- Trigger filter: `{{which_signals_are_eligible}}`
- Idempotency key: `{{task_id + source_revision + failure_signature}}`
- Cooldown / debounce: `{{duration}}`
- Concurrent-run policy: `{{one_active_run_per_key}}`

## 3. Goal contract

### Goal

`{{one observable outcome}}`

### In scope

- `{{allowed_change_or_investigation}}`

### Out of scope

- `{{forbidden_refactor_or_side_effect}}`
- `{{merge_deploy_flash_delete_or_external_write}}`

### Acceptance vector

| Dimension | Required evidence | Pass threshold | Cannot regress |
|---|---|---|---|
| Functional | `{{test_or_measurement}}` | `{{threshold}}` | `{{invariant}}` |
| Scope | diff manifest | `{{paths/files/lines}}` | no unrelated change |
| Security | `{{scan/review}}` | `{{threshold}}` | no authority expansion |
| Performance | `{{benchmark}}` | `{{threshold}}` | `{{baseline}}` |
| Domain / hardware | `{{HIL/timing/power/etc.}}` | `{{threshold}}` | `{{safety_limit}}` |

## 4. State and memory

- State store: `{{database/issue/.loop/state}}`
- Append-only event log: `{{location}}`
- Materialized current state: `{{location}}`
- Lock / lease: `{{mechanism_and_timeout}}`
- Required fields: run ID, goal/spec hash, source revision, candidate revision,
  attempt, hypothesis, normalized failure, evidence, decision, budget, timestamps.
- Resume rule: resume only when spec hash, source revision, lease, and workspace
  ownership still match; otherwise start a new run or stop.

## 5. Workspace and capability envelope

- Isolation: `{{worktree/container/cloud sandbox}}`
- Base revision: `{{immutable_ref}}`
- Setup command: `{{pinned_or_lockfile_driven_command}}`
- Allowed write paths: `{{paths}}`
- Protected paths: `{{tests/policy/workflow/controller}}`
- Allowed commands/tools: `{{allowlist}}`
- Network egress: `none | {{allowlisted_domains}}`
- Secrets: `none | {{short_lived_scoped_secret_names}}`
- External writes: `none | {{draft_PR/comment/etc.}}`

The loop must stop as `BLOCKED` if it needs authority outside this envelope.

## 6. Maker contract

- One attempt produces: `diagnostic | experiment | patch`
- Maximum changed files: `{{n}}`
- Required maker output: hypothesis, observations, changed files, commands run,
  raw evidence paths, assumptions, risks, and proposed next action.
- The maker never decides `PASS` and may not weaken protected verifiers.

Prompt: [`MAKER_PROMPT.md`](MAKER_PROMPT.md)

## 7. Verifier stack

Run from a clean checkout at the candidate revision.

| Order | Required check | Command / method | Timeout | Flake rule |
|---:|---|---|---:|---|
| 1 | Static | `{{command}}` | `{{time}}` | deterministic |
| 2 | Target behavior | `{{command}}` | `{{time}}` | `{{repeat rule}}` |
| 3 | Affected suite | `{{command}}` | `{{time}}` | `{{rule}}` |
| 4 | Nonfunctional | `{{method}}` | `{{time}}` | `{{confidence rule}}` |
| 5 | Independent review | `{{agent/human}}` | `{{time}}` | fresh context |

Prompt: [`VERIFIER_PROMPT.md`](VERIFIER_PROMPT.md)

## 8. Controller decisions

| Result | Required condition | Action | Terminal? |
|---|---|---|:---:|
| `PASS` | every required verifier passes with provenance | create review artifact | yes |
| `RETRYABLE` | reproducible failure + changed hypothesis + budget | prepare one new attempt | no |
| `BLOCKED` | missing context/tool/environment/permission | evidence handoff | yes |
| `HUMAN_GATE` | judgment or material-risk action required | request explicit decision | yes |
| `UNSAFE` | policy, injection, secret, or authority conflict | stop and alert | yes |
| `BUDGET_EXHAUSTED` | any hard cap reached | partial-progress report | yes |

Patience rule: `{{stop after same normalized failure N times or no progress N times}}`

## 9. Budgets

- Maximum attempts: `{{n}}`
- Maximum wall time: `{{duration}}`
- Maximum model/tool cost: `{{currency amount}}`
- Maximum changed files/lines: `{{n}}`
- Maximum workers: `{{n}}`
- Daily / repository cap: `{{cap}}`

Hard caps cannot be raised by the maker or verifier.

## 10. Evidence package

Every handoff contains:

- run ID, task ID, spec hash, baseline and candidate revision;
- attempt timeline and changed hypotheses;
- diff manifest and protected-file comparison;
- exact commands, tool versions, exit codes, durations, stdout/stderr paths;
- test, benchmark, screenshot, trace, HIL, or scan artifacts with hashes;
- independent review decision and cited findings;
- budget consumed, unresolved risks, rollback/cleanup procedure;
- final named state and controller reason.

## 11. Human gates

Explicit human approval is required before: `{{merge/deploy/flash/migration/etc.}}`

Decision owner: `{{role}}`  
Required evidence: `{{artifact list}}`  
Rollback owner and command: `{{role_and_command}}`

## 12. Evaluation and promotion

- Offline test set: `{{path}}`
- Baseline: `{{human_or_single_agent}}`
- Promotion thresholds: `{{accepted rate / escape rate / safe-stop / cost}}`
- Shadow period: `{{duration/runs}}`
- Canary scope: `{{repository/task class}}`
- Disable thresholds: `{{escape/rollback/cost/incident}}`

