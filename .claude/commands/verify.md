---
description: Run the repo verification script (lint/tests/etc) and print a PASS/FAIL marker
allowed-tools: Bash, Read
---
Run: !`"$CLAUDE_PROJECT_DIR"/.claude/hooks/verify.sh`
If it fails, fix the cause (without changing intended behavior), then re-run verify.
