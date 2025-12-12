---
description: Run the repo verification script (lint/tests/etc) and print a PASS/FAIL marker
allowed-tools: Bash, Read
---
Run: !`bash .claude/hooks/verify.sh`
If it fails, fix the cause (without changing intended behavior), then re-run verify.
