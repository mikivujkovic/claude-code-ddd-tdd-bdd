#!/usr/bin/env bash
set -euo pipefail

PHASE_FILE="docs/workflow/phase.json"
PHASE="ddd"
if [ -f "$PHASE_FILE" ]; then
  PHASE="$(node -e "console.log(JSON.parse(require('fs').readFileSync('$PHASE_FILE','utf8')).phase || 'ddd')")"
fi

echo "Running verification for phase: $PHASE"

if [ -f package.json ]; then
  # Check if command exists by checking package.json scripts
  if grep -q '"lint"' package.json 2>/dev/null; then
    echo "Running lint..."
    npm run lint
  fi

  if grep -q '"test"' package.json 2>/dev/null; then
    echo "Running tests..."
    npm run test
  fi

  if grep -q '"typecheck"' package.json 2>/dev/null; then
    echo "Running typecheck..."
    npm run typecheck
  fi

  if [ "$PHASE" = "bdd" ] && grep -q '"test:bdd"' package.json 2>/dev/null; then
    echo "Running BDD tests..."
    npm run test:bdd
  fi
fi

echo "✅ VERIFY PASSED"
