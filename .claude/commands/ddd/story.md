---
description: Turn a capability into DDD artifacts (language, invariants, use-case contract)
argument-hint: [capability-name]
allowed-tools: Edit, Read
---
Using ubiquitous language from @docs/domain/glossary.md:
1) Update @docs/domain/model.md with the minimal model additions for "$ARGUMENTS"
2) Update @docs/domain/invariants.md with 2-5 invariants relevant to "$ARGUMENTS"
3) Add a short “Use case contract” section to @docs/domain/model.md:
   - Inputs
   - Preconditions
   - Domain rules (invariants)
   - Output/events
Keep it simple and junior-friendly.
