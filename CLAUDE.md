# Project: ToDo App (Teaching Repo)

This repository is a training project for junior developers. We build a simple ToDo app in three phases:
1) DDD first (discover domain + model rules)
2) TDD second (implement rules with red/green/refactor)
3) BDD last (capture behavior as examples + living docs)

## How to work in this repo (Claude Code)
- Always check the current phase: run `/phase`
- Change phase only when the checklist is met: `/set-phase ddd|tdd|bdd`
- Prefer small vertical slices (one capability at a time): Add, Complete, Rename, Reopen, Delete.
- Before stopping, run `/verify` (hooks may block stopping if you skip this in TDD/BDD).

## Architecture rules (DDD-friendly)
- Model the domain in `src/domain/*` (pure logic, no Next.js, no DB, no fetch).
- Application use cases live in `src/application/*` (orchestrate domain operations).
- Infrastructure/adapters live in `src/infrastructure/*` (DB, HTTP, storage).
- UI lives in `app/*` (Next.js).

(We will not generate UI until the domain model + core rules are clear.)

## Canonical docs
- DDD artifacts: `docs/domain/*`
- Testing strategy: `docs/testing/strategy.md`
- BDD features: `docs/bdd/features/*`
- Roadmap and checklists: `docs/workflow/*`

## Quality bar
- Use the ubiquitous language from `docs/domain/glossary.md` in code + tests + scenarios.
- Domain invariants must be enforced inside aggregates (not in controllers).
- Keep tests fast and readable. Prefer domain tests over UI tests.
