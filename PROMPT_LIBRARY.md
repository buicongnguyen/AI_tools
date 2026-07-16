# Engineering Prompt Library

Last verified: 2026-07-16

These prompts work with Claude Code, Codex, ChatGPT, and similar engineering
agents. Adapt filenames, commands, limits, and evidence to your project.

## The G-C-C-R-V-O prompt pattern

A strong engineering prompt usually contains six useful blocks:

1. **Goal** — the observable outcome.
2. **Context** — the files, symptoms, users, architecture, and current state.
3. **Constraints** — boundaries, safety rules, compatibility, and scope.
4. **References** — existing implementations, specifications, screenshots, or logs.
5. **Verification** — tests, measurements, comparisons, and pass thresholds.
6. **Output** — the evidence and summary required at completion.

You do not need all six blocks for a trivial task. Add detail in proportion to
ambiguity and risk.

```markdown
## Goal
[What should be observably different?]

## Context
[Relevant repository areas, users, errors, current behavior, environment.]

## Constraints
[What must remain unchanged? Security, compatibility, timing, budget, scope.]

## References
[Files, tests, patterns, screenshots, logs, standards, datasheets.]

## Verification
[Commands, test cases, screenshots, metrics, measurements, failure cases.]

## Output
[Changed files, decisions, commands/results, assumptions, risks, follow-ups.]
```

## Prompt quality checklist

Before sending:

- Is the desired result observable?
- Did I name the real symptom instead of guessing the cause?
- Did I identify relevant artifacts or let the agent locate them?
- Did I state the one or two boundaries that prevent costly mistakes?
- Can the agent check its own work?
- Is the task small enough for one reviewable pass?
- Do I need a plan, or is the change obvious enough to implement directly?

Avoid:

- “Make it better” without criteria.
- Asking for implementation before requirements are understood.
- Dictating low-level steps when the agent can inspect the repository.
- Huge prompts full of irrelevant background.
- “Do not make mistakes” instead of concrete negative tests.
- Asking the same context to implement and independently approve its own work.
- Accepting compilation or simulation as the only evidence.

## 1. Turn a rough idea into a specification

```text
Goal:
Turn my rough idea into an implementable engineering specification before any
code or design work begins.

Context:
The idea is: [IDEA]. The intended user/system is [USER OR SYSTEM]. The problem I
believe exists is [PROBLEM]. Available assets are [REPOSITORY, DATA, HARDWARE,
TEAM, BUDGET].

Constraints:
Do not assume demand, technical feasibility, or hardware availability. Separate
facts from assumptions. Do not implement yet.

References:
Read ENGINEERING_IDEA_BRIEF.md and any linked source material. Search current
primary sources for APIs, standards, components, competitors, and constraints
that may have changed.

Verification:
Interview me about missing requirements, edge cases, interfaces, failure modes,
security/safety, performance, cost, and deployment. Every requirement must have
a measurable acceptance method. Identify the three riskiest assumptions and the
smallest experiment that could falsify each.

Output:
Write SPEC.md with the problem, users, functional requirements, engineering
budgets, interfaces, architecture options, risks, test strategy, smallest
prototype, release gates, sources, and unresolved questions.
```

## 2. Understand an unfamiliar codebase

```text
Goal:
Explain how [FEATURE OR REQUEST] works end-to-end so I can safely change it.

Context:
Start at the repository root. Focus on the runtime path from [ENTRY POINT] to
[OUTPUT OR SIDE EFFECT].

Constraints:
Do not edit files. Do not describe every directory. Distinguish confirmed code
behavior from inference.

References:
Read AGENTS.md/CLAUDE.md, README, build files, relevant tests, configuration,
and git history where it explains non-obvious decisions.

Verification:
Trace actual function calls, data transformations, persistence, external calls,
error handling, permissions, and tests. Cite file paths and symbols for each
major step. Flag dead paths or missing evidence.

Output:
Return a one-page architecture map, a numbered execution flow, important
invariants, likely change points, relevant tests/commands, and the five biggest
risks of modifying this area.
```

## 3. Implement a software feature

Weak:

```text
Add notifications.
```

Strong:

```text
Goal:
Add an in-app notification when a background export finishes. A signed-in user
must see only their own completed exports and can mark a notification as read.

Context:
Read AGENTS.md and PROJECT_CONTEXT.md. Trace the existing export job, event
handling, authorization, and the notification pattern used for billing alerts.

Constraints:
Preserve existing export behavior and public API compatibility. Do not add a new
queue, frontend framework, or third-party notification service. Avoid broad
refactoring. Never expose another user's export metadata.

References:
Follow the billing-alert implementation and existing database migration style.
Use the project’s established component and accessibility patterns.

Verification:
Add tests for success, duplicate job events, authorization, empty state, unread
count, and marking as read. Run focused tests, type checking, lint, and the
critical browser flow. Confirm the migration can roll back.

Output:
Implement the smallest end-to-end slice. Report the changed files, data flow,
commands and exact results, migration/rollback notes, assumptions, security
review, and remaining risks.
```

## 4. Diagnose and fix a bug

Weak:

```text
Fix the login bug.
```

Strong:

```text
Goal:
Find and fix the root cause of login failure after an access token expires.

Context:
Users remain on the login spinner after approximately 60 minutes. The network
trace shows a 401 from /session/refresh followed by repeated profile requests.
Relevant code is likely under src/auth and src/api, but confirm the actual flow.

Constraints:
Diagnose before editing. Do not suppress the 401, increase token lifetime, add
blind retries, or weaken authentication. Change one behavior at a time.

References:
Use @logs/login-timeout.har, the auth integration tests, and git history for the
refresh-token implementation.

Verification:
Reproduce the failure with the shortest test or fixture. Build a ranked
hypothesis table. Add a regression test that fails before the fix. After the
smallest root-cause change, run auth tests, relevant integration tests, lint,
and a browser login/expiry flow. Inspect for retry loops and token leakage.

Output:
Report the reproduction, root cause, changed files, before/after evidence,
commands/results, security impact, and unresolved edge cases.
```

## 5. Software architecture decision

```text
Goal:
Recommend an architecture for [CAPABILITY] that meets the stated requirements
without unnecessary platform work.

Context:
Current system: [ARCHITECTURE]. Expected load: [LOAD]. Availability target:
[SLO]. Team/tooling: [CONSTRAINTS]. Known growth or integration needs: [NEEDS].

Constraints:
Prefer the simplest design that meets the next 12 months of requirements.
Preserve [COMPATIBILITY]. Include operational ownership, migration, failure, and
cost—not only component diagrams.

References:
Inspect the current repository and deployment configuration. Verify current
service limits and API behavior using primary documentation.

Verification:
Compare at least three options using latency, throughput, consistency,
availability, security, complexity, cost, migration, observability, and rollback.
Stress each option with two failure scenarios and one growth scenario.

Output:
Write an ADR with context, decision drivers, option table, recommended design,
sequence/data-flow diagram, rejected alternatives, migration phases, test plan,
operational risks, cost assumptions, and conditions that would trigger a revisit.
```

## 6. Code review

```text
Goal:
Review this change as an independent owner before merge.

Context:
Compare the current branch with [BASE BRANCH]. Read the issue/spec and relevant
AGENTS.md review instructions. The intended behavior is [SUMMARY].

Constraints:
Do not rewrite code or comment on style unless it creates a real maintenance or
correctness problem. Do not assume tests prove the implementation is complete.

References:
Inspect the full diff, changed tests, nearby code paths, public contracts,
database/configuration changes, and deployment impact.

Verification:
Look for reproducible correctness defects, security/privacy issues, concurrency,
error handling, compatibility, missing tests, migration hazards, performance
regressions, and scope drift. For every finding, provide file/line evidence,
impact, likelihood, and the smallest reproduction or verification step.

Output:
List findings by severity. Say explicitly when a category has no actionable
finding. Finish with test gaps, deployment concerns, and a merge recommendation.
```

## 7. Build a realistic test strategy

```text
Goal:
Create the smallest test strategy that gives strong confidence in [FEATURE].

Context:
The behavior, architecture, risks, and current tests are in [FILES]. The most
expensive failures would be [FAILURES].

Constraints:
Avoid duplicating coverage at every layer. Prefer deterministic tests. Use mocks
only at true external boundaries. Include failure and recovery paths.

References:
Follow existing fixtures and test conventions. Use production incidents and
known regressions as candidate cases.

Verification:
Map every acceptance criterion and major risk to at least one test or measurement.
Include normal, boundary, invalid, adversarial, concurrency, dependency failure,
performance, accessibility, migration, rollback, and observability cases as relevant.

Output:
Return a traceability table with test ID, risk/requirement, layer, setup, input,
expected result, forbidden result, evidence, priority, and automation status.
Implement the highest-priority missing tests and run them.
```

## 8. Performance investigation

```text
Goal:
Reduce [LATENCY / MEMORY / CPU / BUNDLE / POWER] from [BASELINE] to [TARGET]
without changing externally visible behavior.

Context:
The regression occurs under [WORKLOAD/DEVICE/ENVIRONMENT]. Current measurements
and profiles are in [ARTIFACTS].

Constraints:
Measure before optimizing. Do not trade correctness, security, accessibility, or
reliability for the target. Avoid micro-optimizations without profile evidence.

References:
Use the existing benchmark harness and production-like dataset. Record machine,
build, workload, tool version, and variance.

Verification:
Reproduce the baseline at least [N] times. Identify the dominant contributors,
compare 2-3 bounded changes, and run correctness plus regression checks. Report
median/p95 or other appropriate statistics, variance, and resource tradeoffs.

Output:
Provide the profile evidence, hypothesis, selected change, before/after table,
commands, raw result location, risks, and rollback.
```

## 9. Design-system audit

Weak:

```text
Make the design system consistent and modern.
```

Strong:

```text
Goal:
Audit the current web design system and propose a bounded plan to improve
consistency, accessibility, and developer usability.

Context:
Inspect the application, component library, tokens, Storybook/examples, CSS,
design files/screenshots, and the three most-used product flows. The supported
platforms and browsers are [LIST].

Constraints:
Do not redesign the brand or replace the framework. Preserve public component
APIs unless a migration is justified. Meet WCAG 2.2 AA. Treat dark mode,
localization, reduced motion, keyboard use, and responsive behavior as first-class.

References:
Use existing product patterns as evidence. Compare implementation to the approved
design source, not to personal taste. Verify any standard claims using current
primary sources.

Verification:
Inventory tokens and components; identify duplicate values, inaccessible states,
API inconsistencies, missing states, and visual drift. Sample real screens at
mobile and desktop widths in light/dark mode. Run automated accessibility checks
and manually test keyboard/focus behavior.

Output:
Produce an audit table ranked by user impact and migration effort, a proposed
token hierarchy, component-state matrix, before/after examples, migration phases,
compatibility risks, and measurable completion criteria. Do not implement until
the plan is reviewed.
```

## 10. Implement a design-system component

```text
Goal:
Implement a production-ready [COMPONENT] in the existing design system.

Context:
The component will be used for [USER FLOWS]. Read the current token, component,
testing, documentation, and packaging conventions.

Constraints:
Use existing dependencies and tokens. Support controlled/uncontrolled behavior
only if the system already uses both. Meet WCAG 2.2 AA. Include keyboard,
focus-visible, screen-reader, disabled, loading, error, empty, high-contrast,
reduced-motion, RTL/localization, responsive, light, and dark behavior as relevant.

References:
Match [EXISTING COMPONENT/PATTERN] and the approved [FIGMA/SCREENSHOT/SPEC].
Do not invent new visual values when a token exists.

Verification:
Add unit and interaction tests, accessibility checks, visual stories for all
states, and consumer examples. Compare screenshots at target widths and themes.
Run type checking, lint, tests, package build, and a real consuming-app smoke test.

Output:
Implement the component, stories/docs, tests, and migration example. Report API
decisions, token use, accessibility evidence, screenshots, bundle impact,
commands/results, and known limitations.
```

## 11. Implement a UI from a screenshot or Figma design

```text
Goal:
Implement [SCREEN/FLOW] with close visual and behavioral parity to the supplied
design while using the repository’s existing design system.

Context:
Target users and critical actions are [DETAILS]. Target viewport/device range is
[RANGE]. Existing implementation is [PATH OR URL].

Constraints:
Do not hard-code screenshot-specific positions. Reuse components and tokens.
Preserve semantics, accessibility, localization, and responsive behavior. Do not
change unrelated screens.

References:
Use [FIGMA LINK/SCREENSHOT] as the visual source and [EXISTING SCREEN] as the
implementation pattern. List any ambiguity before choosing a behavior.

Verification:
Implement, run the page, capture screenshots at [WIDTHS] in light and dark mode,
compare layout/spacing/type/color/states, test keyboard and screen-reader labels,
and exercise loading, empty, error, and success paths. Iterate on visible differences.

Output:
Report changed files, reused/new components, screenshot evidence, accessibility
results, responsive decisions, unresolved design questions, and test results.
```

## 12. API design and implementation

```text
Goal:
Design and implement [API CAPABILITY] for [CONSUMERS].

Context:
Current API conventions, authentication, error format, persistence, and clients
are in [FILES]. Expected request volume and data size are [LIMITS].

Constraints:
Preserve backward compatibility. Enforce authorization and validation server-side.
Define idempotency, pagination, rate limits, timeouts, retries, and partial failure.
Do not expose internal identifiers or sensitive fields.

References:
Follow the closest existing endpoint and current API specification.

Verification:
Add contract, authorization, validation, boundary, concurrency/idempotency,
dependency-failure, and performance tests. Generate/update the API schema and
verify a real client can consume it.

Output:
Return the contract, implementation, tests, migration/versioning strategy,
observability, abuse/security review, commands/results, and rollout/rollback plan.
```

## 13. Firmware feature

```text
Goal:
Implement [FIRMWARE BEHAVIOR] on [MCU/SOC/BOARD] with deterministic timing and
safe recovery.

Context:
Toolchain, RTOS/bare-metal environment, board revision, peripherals, memory map,
interrupt model, and existing drivers are in [FILES]. Timing and memory budgets
are [LIMITS].

Constraints:
No dynamic allocation after initialization unless explicitly approved. Avoid
unbounded waits. Preserve ISR/task rules, watchdog behavior, power states, and
existing protocol compatibility. Do not access undocumented registers.

References:
Use the pinned vendor datasheet/reference manual and existing driver pattern.
Flag errata and ambiguous electrical/timing assumptions.

Verification:
Add host/unit tests where possible, static analysis, compile warnings-as-errors,
timeout/error injection, boundary tests, and hardware-in-loop steps. Measure
latency, stack/memory, power impact, and recovery on the target.

Output:
Implement the smallest change. Report state/timing behavior, changed files,
resource usage, test and bench evidence, tool versions, assumptions, failure
modes, update/rollback, and anything requiring hardware confirmation.
```

## 14. FPGA/RTL implementation

```text
Goal:
Implement [RTL BLOCK] for [TARGET DEVICE/USE] meeting [FREQUENCY, THROUGHPUT,
LATENCY, AREA] requirements.

Context:
Clock/reset domains, interface protocol, data widths, backpressure, ordering,
reset behavior, and target tool flow are documented in [FILES].

Constraints:
Produce synthesizable RTL. No inferred latches, unsafe CDC, undocumented vendor
primitives, or assumptions that exist only in the testbench. Preserve protocol
behavior under stalls, reset, and illegal input.

References:
Follow the existing RTL style, interface specification, constraints, and golden
software/reference model.

Verification:
Create a self-checking testbench with directed and randomized cases, protocol and
state assertions, reset during traffic, backpressure, min/max values, invalid
sequences, and scoreboard comparison. Run lint, simulation, synthesis, CDC/RDC,
timing, and report review where tools are available. Provide board validation steps.

Output:
Return RTL, tests/assertions, architecture/timing diagram, simulation evidence,
warnings, post-synthesis resource/timing results, assumptions, and HIL plan.
Do not claim signoff from simulation alone.
```

## 15. Hardware bring-up and failure analysis

```text
Goal:
Create and execute a safe bring-up/debug plan for [BOARD/SUBSYSTEM/FAILURE].

Context:
Board revision, schematic/layout, BOM substitutions, assembly notes, firmware,
bitstream, boot configuration, instruments, observed symptoms, and environmental
conditions are in [ARTIFACTS].

Constraints:
Safety first. Define power/current limits and pre-power checks. Do not recommend
probing or modifications that exceed component or instrument ratings. Separate
measured evidence from inference.

References:
Use current manufacturer datasheets, errata, reference designs, and design rules.

Verification:
Proceed from rails and shorts to sequencing, clocks, resets, programming, minimal
image, communications, and one subsystem at a time. Record expected versus
measured values, instrument settings, timestamps, temperature, and captures.
For a failure, rank hypotheses and define one distinguishing measurement each.

Output:
Produce a bring-up checklist or failure timeline, measurement table, safe test
order, stop conditions, root-cause confidence, smallest corrective experiment,
regression test, and recovery/rollback.
```

## 16. Deployment and release

```text
Goal:
Prepare [SERVICE/APP/FIRMWARE/BITSTREAM] version [VERSION] for a controlled release.

Context:
Read the release process, CI/CD, environments, observability, update mechanism,
compatibility matrix, and prior incidents.

Constraints:
Do not deploy production without explicit approval. Do not expose secrets.
Preserve backward compatibility and recovery for [SUPPORTED VERSIONS/DEVICES].

References:
Use the approved release checklist and closest successful release.

Verification:
Build from a clean checkout; run required tests/security checks; verify artifact
provenance and configuration; deploy to preview/pilot; exercise critical and
failure flows; check telemetry; test rollback/recovery; identify stop thresholds.

Output:
Provide the versioned artifact, change summary, evidence links, deployment steps,
approvals required, monitoring dashboard/signals, rollback command/procedure,
known risks, and post-release verification window.
```

## 17. Research and verify a technical decision

```text
Goal:
Answer [TECHNICAL QUESTION] so an engineer can make [DECISION].

Context:
The system, constraints, geography, target versions, and decision date are
[DETAILS].

Constraints:
Treat current facts as untrusted until verified. Prefer primary official sources.
Do not use search-result snippets as evidence. Separate facts, inference,
estimates, and opinion.

References:
Search official documentation, specifications, datasheets, changelogs, source
repositories, standards, and benchmark methodology. Use independent sources to
cross-check material claims when possible.

Verification:
Open every cited source, record publication/update date and version, identify
conflicts, reproduce calculations, and state what remains unknown. Recheck
volatile claims on the decision date.

Output:
Return a decision-first summary, claim/evidence table with direct links, option
comparison, assumptions, conflicts, confidence, recommended experiment, and
verification date.
```

## Follow-up prompts that improve weak results

```text
Show me which acceptance criteria are not yet evidenced.
```

```text
Separate confirmed facts from assumptions and list the artifact supporting each fact.
```

```text
Reduce this to the smallest reviewable change that proves the critical path.
```

```text
Do not add code yet. Reproduce the failure and rank competing root-cause hypotheses.
```

```text
Review your diff as a skeptical maintainer. Find scope drift, missing failure
cases, unsafe assumptions, and changes that can be removed.
```

```text
Run the relevant checks now. Report the exact command, result, and any warnings;
do not summarize a check you did not run.
```

```text
Create a fresh reviewer task with only the requirements, diff, and test evidence.
```

## When to save a prompt

- Put universal project rules in `AGENTS.md` or `CLAUDE.md`.
- Save a repeatable reasoning workflow as a skill.
- Turn mandatory deterministic checks into hooks or CI.
- Store task-specific requirements in a specification or issue.
- Keep prompts short by referencing these durable artifacts.

