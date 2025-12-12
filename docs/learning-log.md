# Learning Log

## 2025-12-05: DDD Phase - "Add Todo Item" Capability

### What We Built Today
- **Glossary** with stakeholder-friendly terms (Todo Item, Title, Todo List, Status)
- **Bounded Context** for Todo Management (single context, clear responsibilities)
- **Domain Model** with TodoList as aggregate root and TodoItem as entity
- **3 Invariants** for Add capability:
  - INV-ADD-1: Title cannot be empty
  - INV-ADD-2: Cannot add duplicate items (case-insensitive)
  - INV-ADD-3: New items start as Pending
- **Use-case contract** defining inputs, preconditions, rules, and outputs
- **Aggregate design** clarifying where each invariant should be enforced

### One Mistake We Made
Initially modeled TodoItem as the aggregate root, but realized **TodoList must be the aggregate root** because only the list can enforce the "no duplicates" invariant. An individual item can't check for duplicates since it doesn't see other items.

**Lesson**: When an invariant requires knowledge of a collection, the collection must be the aggregate root.

### One Concept Learned (DDD)
**Invariant placement matters**:
- **Value Object invariants** (Title validation) → enforce in the Value Object constructor
- **Aggregate-level invariants** (duplicate detection) → enforce in the Aggregate Root
- **Creation invariants** (new items are Pending) → enforce at the factory/creation point

**Why this matters**: Puts rules where the knowledge lives. Title knows if it's valid. TodoList knows if duplicates exist.

### One Rule of Thumb for Next Time
**"Clarify ambiguity before coding"**: Terms like "meaningful title" and "case-insensitive match" sound clear but hide edge cases (Unicode? Whitespace? Length limits?).

**Use the risk-checker agent** before TDD phase to find:
- Ambiguous terms
- Missing edge cases
- Validation order questions

This prevents juniors from making different assumptions and writing inconsistent tests.

---

## 2025-12-05: TDD Phase - First Red/Green/Refactor Cycle

### What We Built Today
- **First failing test** for INV-ADD-1 (Title cannot be empty) using Vitest
- **Title value object** at `src/domain/value-objects/Title.ts` that enforces the invariant
- **Test infrastructure**: package.json, vitest.config.ts, tsconfig.json
- **Fixed /verify command** to properly run tests in TDD workflow
- Completed full **Red → Green → Refactor** cycle:
  - RED: Test fails because Title class doesn't exist
  - GREEN: Minimal implementation passes test
  - REFACTOR: Extracted validation method, added getValue()

### One Mistake We Made
The original verify script had logic: `if npm run test >/dev/null 2>&1; then npm run test; fi` which meant "only run tests if they already pass." This **broke TDD RED phase** where tests should fail!

**Lesson**: In TDD, the verify script must ALWAYS run tests, not skip them when failing. Fixed by checking if script exists in package.json, then running it unconditionally.

### One Concept Learned (TDD)
**Red → Green → Refactor is strict**:
- **RED**: Write ONE failing test. See it fail for the RIGHT reason (missing implementation, not setup issues)
- **GREEN**: Write the SMALLEST code to pass. Don't add features, getters, or extra validation
- **REFACTOR**: Only improve when tests are green. Make one tiny change, run tests immediately

**Why this matters**: Small steps prevent bugs. If you add too much in GREEN, you don't know which part made the test pass. If you refactor before green, you break TDD flow.

### One Rule of Thumb for Next Time
**"One assertion, one test"**: Our first test only checked empty string `""`. We should write separate tests for:
- Whitespace `"   "`
- Null/undefined
- Valid title

This makes failures clearer. If "whitespace test" fails, you know exactly what's broken. If one test checks 3 things, failures are ambiguous.

