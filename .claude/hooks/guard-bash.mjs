import fs from "node:fs";

const input = JSON.parse(fs.readFileSync(0, "utf8") || "{}");
const cmd = (input.tool_input?.command || "").trim();

const banned = [
  /rm\s+-rf\s+\//,
  /:\(\)\s*\{\s*:\|:\s*&\s*\}\s*;\s*:/,
  /\bcurl\b.*\|\s*(sh|bash)\b/,
  /\bwget\b.*\|\s*(sh|bash)\b/,
  /\bchmod\b.*\+x\b.*\.\//,
];

if (banned.some((re) => re.test(cmd))) {
  console.error(
    `Blocked Bash command for safety in training repo:\n  ${cmd}\n\nUse explicit, reviewable scripts or ask for a safer alternative.`
  );
  process.exit(2);
}

process.exit(0);
