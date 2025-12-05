# Claude Code Workflow Manual (DDD → TDD → BDD ToDo Training Repo)

This manual explains the repo’s Claude Code tooling:
- Slash commands (`.claude/commands/*`)
- Hooks (`.claude/settings.json` + `.claude/hooks/*`)
- Subagents (`.claude/agents/*`)
- Skills (`.claude/skills/*`)

---

## 0) Core principle: the repo teaches discipline

This repo intentionally enforces constraints:
- **DDD phase:** focus on domain language + rules (no UI work).
- **TDD phase:** implement domain behavior via *red/green/refactor* (no UI work).
- **BDD phase:** write scenarios + mapping. Automation optional.

Hooks ensure:
- You don’t accidentally run dangerous shell commands.
- You don’t jump into UI too early.
- You don’t stop while tests are failing during TDD/BDD.

---

## 1) Commands (Slash commands)

Commands are markdown files in `.claude/commands/**` and are used in Claude Code chat like:

- `/phase`
- `/set-phase tdd`
- `/ddd:story Add todo item`

### How to interpret command docs
Each command does 3 kinds of things:
1) Reads / updates repo docs (mainly `docs/*`)
2) Creates a structured workflow step (like DDD story or BDD feature)
3) In TDD/BDD phases, it supports verification and discipline

---

### `/phase`
**Purpose:** Show the current phase and tell you what to do next.

**Reads:**
- `docs/workflow/phase.json`
- `docs/workflow/definition-of-done.md`
- `docs/workflow/roadmap.md`

**When to use:**
- Start of every session/day.
- When you’re unsure what is allowed (UI or not).
- Right after switching phase.

**Example:**
- `/phase`

**Expected outcome:**
- You see current phase (ddd/tdd/bdd)
- You see phase checklist
- You see next 3 roadmap tasks

**Common mistakes:**
- Skipping `/phase` and trying to start coding (hooks may block you).
- Not reading phase DoD and switching too early.

---

### `/set-phase [ddd|tdd|bdd]`
**Purpose:** Change the workflow phase and activate the correct constraints.

**Writes:**
- `docs/workflow/phase.json` (sets `"phase": "ddd|tdd|bdd"`)

**When to use:**
- At the start of DDD/TDD/BDD sections.
- Only after meeting the prior phase’s “Definition of Done”.

**Examples:**
- `/set-phase ddd`
- `/set-phase tdd`
- `/set-phase bdd`

**What changes when you set phase:**
- DDD: UI edits are blocked. Stop is not gated.
- TDD: UI edits blocked. Stop is gated by `/verify`.
- BDD: Stop is gated by `/verify`. UI edits are allowed in principle, but you should still prefer stable, intent-based checks.

**Common mistakes:**
- Switching to TDD before DDD docs contain real invariants.
- Switching to BDD without a strong set of core tests.
- Trying to “force” UI work in DDD/TDD (hooks will block).

---

### `/verify`
**Purpose:** Run the repo verification script and print a **PASS marker** that hooks can detect.

**Runs:**
- `.claude/hooks/verify.sh`

**When to use:**
- End of every TDD/BDD work session.
- Before you stop work.
- After any significant changes.

**Example:**
- `/verify`

**Expected outcome:**
- It runs lint/tests/typecheck (depending on scripts you configure)
- Prints: `✅ VERIFY PASSED`

**Why it matters:**
- The Stop hook in TDD/BDD checks your transcript for `✅ VERIFY PASSED`.
- If you don’t run it (or it fails), Stop may be blocked.

**Common mistakes:**
- Running tests manually but not `/verify` (Stop still blocks).
- “Fixing” tests by weakening assertions instead of addressing logic.
- Ignoring a failing verify and trying to stop.

---

## DDD Commands

### `/ddd:init`
**Purpose:** Initialize DDD documentation templates for this repo.

**Creates/updates:**
- `docs/domain/glossary.md`
- `docs/domain/bounded-context.md`
- `docs/domain/context-map.mmd`
- `docs/domain/model.md`
- `docs/domain/invariants.md`
- Updates `docs/workflow/roadmap.md` with core capabilities

**When to use:**
- Day 0 or Day 1, first thing in DDD phase.
- If you reset the repo or want to re-seed templates.

**Example:**
- `/ddd:init`

**What “good” looks like after:**
- You can read the glossary and understand the domain.
- The model has a minimal structure.
- Invariants exist (even if incomplete initially).

**Common mistakes:**
- Treating `/ddd:init` output as final truth. It’s a starting point.

---

### `/ddd:story [capability-name]`
**Purpose:** Convert one capability into DDD artifacts:
- model additions
- invariants
- use-case contract (inputs, preconditions, rules, outputs)

**Reads:**
- `docs/domain/glossary.md`

**Writes:**
- `docs/domain/model.md`
- `docs/domain/invariants.md`

**When to use:**
- In DDD phase, for each capability (Add/Complete/Rename/Reopen/Delete).
- Also useful later if you add a “stretch” capability.

**Examples:**
- `/ddd:story Add todo item`
- `/ddd:story Complete todo item`

**Expected outcome:**
- 2–5 crisp invariants for that capability
- A short “Use case contract” section that a junior can follow

**What NOT to do:**
- Don’t write implementation details (no UI/button talk).
- Don’t propose complex patterns (CQRS/event sourcing) unless asked.

**Common mistakes:**
- Writing invariants like “should work properly” (too vague).
- Copying UI behavior into rules (“when user clicks…”).

---

### `/ddd:model-review`
**Purpose:** A “review” of the DDD artifacts for clarity and correctness.

**Reads:**
- `docs/domain/glossary.md`
- `docs/domain/model.md`
- `docs/domain/invariants.md`

**When to use:**
- End of Day 2 (DDD wrap-up).
- Any time the model starts to feel confusing.

**Example:**
- `/ddd:model-review`

**Expected outcome:**
- Concrete suggestions:
  - clarify terms in glossary
  - reduce model complexity
  - move invariants into aggregates (conceptually)

**Common mistakes:**
- Ignoring review suggestions and “coding anyway”.

---

## TDD Commands

### `/tdd:red [capability-name]`
**Purpose:** TDD RED step: write **one failing test** for the smallest rule.

**Reads:**
- `docs/domain/invariants.md`
- optionally the capability contract in `docs/domain/model.md`

**Writes:**
- A test file (wherever your test setup lives)
- Possibly small doc edits if you discover missing clarity

**When to use:**
- Start every TDD loop for a capability.
- Every time you want to add another rule/test.

**Examples:**
- `/tdd:red Add todo item`
- `/tdd:red Rename todo item`

**What “good” looks like:**
- Exactly one failing test.
- Test name reads like a rule (e.g., “reject empty title”).
- Failure reason is obvious.

**Common mistakes:**
- Writing 5 tests at once.
- Making a test that checks multiple invariants at once.
- Writing UI-driven tests.

---

### `/tdd:green`
**Purpose:** TDD GREEN step: minimal code to pass the currently failing test(s).

**When to use:**
- Immediately after a RED test fails.

**Example:**
- `/tdd:green`

**What “good” looks like:**
- Smallest implementation change.
- No refactors or “cleanup” yet.
- No new features.

**Common mistakes:**
- Doing “cleanup” here (save it for refactor).
- Implementing extra behaviors “while you’re here”.

---

### `/tdd:refactor`
**Purpose:** TDD REFACTOR step: improve design while tests stay green.

**When to use:**
- After GREEN passes.
- Any time code smells appear (duplication, unclear names).

**Example:**
- `/tdd:refactor`

**Refactor targets:**
- use glossary terms in names
- move logic into domain aggregates/value objects
- reduce duplication
- separate domain from infrastructure

**Common mistakes:**
- Changing behavior during refactor.
- Refactoring without running `/verify`.

---

### `/tdd:next`
**Purpose:** Choose the next smallest test to write.

**Reads:**
- `docs/workflow/roadmap.md`
- `docs/domain/invariants.md`

**When to use:**
- When the team is stuck: “what next?”
- When multiple rules are available and you need priority.

**Example:**
- `/tdd:next`

**Expected outcome:**
- One specific next test idea
- Which invariant it covers
- Which files likely change

**Common mistakes:**
- Using it as permission to write large tests anyway.

---

## BDD Commands

### `/bdd:feature [capability-name]`
**Purpose:** Write or refine Gherkin scenarios for one capability.

**Reads:**
- `docs/domain/glossary.md`

**Writes:**
- `docs/bdd/features/todo.feature`

**When to use:**
- Start BDD phase with “Add”.
- Repeat for each capability.

**Examples:**
- `/bdd:feature Add todo item`
- `/bdd:feature Reopen todo item`

**What “good” looks like:**
- Steps are business intent, not UI mechanics.
- Outcomes are observable.
- 2–4 scenarios per capability is plenty.

**Common mistakes:**
- “Click/type/wait” steps.
- Scenarios that are too long and brittle.

---

### `/bdd:map`
**Purpose:** Convert scenarios into a mapping of step intent → application service call.

**Writes:**
- `docs/bdd/mapping.md`

**When to use:**
- After writing scenarios.
- When juniors write UI steps and need to “lift” them.

**Example:**
- `/bdd:map`

**What “good” looks like:**
- Each scenario has:
  - Step intent
  - Suggested service call
  - Domain objects involved

**Common mistakes:**
- Mapping to UI actions instead of domain/application operations.

---

### `/bdd:run`
**Purpose:** Run BDD checks if configured (`npm run test:bdd`), otherwise prints setup checklist.

**When to use:**
- After BDD features + mapping exist.
- In CI eventually.

**Example:**
- `/bdd:run`

**Common mistakes:**
- Trying to automate every scenario (start small).
- Debugging flaky end-to-end UI tests instead of service-level checks.

---

## General Command

### `/retro`
**Purpose:** Append a short reflection entry to `docs/learning-log.md`.

**Writes:**
- `docs/learning-log.md`

**When to use:**
- End of every training day.
- After finishing a capability.

**Example:**
- `/retro`

**What “good” looks like:**
- 4 bullets max (built, mistake, concept, rule of thumb)

**Common mistakes:**
- Writing a novel. Keep it practical.

---

## 2) Hooks (automatic guardrails)

Hooks are configured in `.claude/settings.json` and run automatically.
You do not “run” hooks directly; they trigger on events.

### Hook: `guard-bash.mjs` (PreToolUse → Bash)
**Purpose:** Prevent dangerous shell commands during training.

**Triggers when:**
- Claude is about to run a Bash command.

**Blocks patterns like:**
- destructive deletes (`rm -rf /`)
- fork bombs
- `curl | sh` style remote piping

**Example situation:**
You ask: “Run this script from the internet.”
Hook blocks it and instructs safer alternatives.

**How to respond when blocked:**
- Use repo scripts.
- Copy command content into a file for review.
- Avoid piped execution.

---

### Hook: `enforce-phase.mjs` (PreToolUse → Write/Edit)
**Purpose:** Block UI work during DDD/TDD phases.

**Triggers when:**
- Claude tries to write/edit files in `app/`, `pages/`, or `src/ui/` etc.

**Behavior:**
- If phase is `ddd`: blocks UI edits.
- If phase is `tdd`: blocks UI edits until core is done.

**Example:**
- In DDD you try to add a page under `app/`.
- Hook blocks and says: focus on `docs/domain/*` or domain code.

**How to proceed:**
- Run `/phase`
- Use `/ddd:story ...` or `/tdd:red ...` instead.

---

### Hook: `stop-gate.mjs` (Stop)
**Purpose:** Prevent “stopping” in TDD/BDD unless `/verify` passed.

**Triggers when:**
- You try to stop/end the session.

**Pass condition:**
- Transcript contains `✅ VERIFY PASSED`
- Did not contain `❌ VERIFY FAILED`

**What to do if blocked:**
- Run `/verify`
- Fix failures, re-run `/verify`
- Then stop.

---

### Script: `verify.sh`
**Purpose:** Single “quality gate” for the repo.
It typically runs:
- lint
- unit tests
- typecheck
- optional bdd tests (in BDD phase)

**Best practice for juniors:**
- run `/verify` frequently
- don’t stop work while it fails

---

## 3) Subagents (what they do and how to use them)

Subagents live in `.claude/agents/*.md`.
You invoke them by asking in chat, e.g.:

> “Use the subagent tdd-coach …”

### `sdlc-orchestrator`
**Role:** Training lead and workflow conductor.

**Use when:**
- Start of day/session
- Team is stuck
- You want the next smallest step

**Best prompt:**
```text
Use the subagent sdlc-orchestrator.
Read docs/workflow/phase.json and docs/workflow/roadmap.md.
Tell us the next smallest step and the exact slash commands to run.
