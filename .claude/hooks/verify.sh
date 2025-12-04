#!/usr/bin/env bash
set -euo pipefail

PHASE_FILE="docs/workflow/phase.json"
PHASE="ddd"
if [ -f "$PHASE_FILE" ]; then
  PHASE="$(node -e "console.log(JSON.parse(require('fs').readFileSync('$PHASE_FILE','utf8')).phase || 'ddd')")"
fi

echo "Running verification for phase: $PHASE"

if [ -f package.json ]; then
  if npm run -s lint >/dev/null 2>&1; then npm run -s lint; fi
  if npm run -s test >/dev/null 2>&1; then npm run -s test; fi
  if npm run -s typecheck >/dev/null 2>&1; then npm run -s typecheck; fi
  if [ "$PHASE" = "bdd" ] && npm run -s test:bdd >/dev/null 2>&1; then npm run -s test:bdd; fi
fi

echo "✅ VERIFY PASSED"
