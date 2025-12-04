import fs from "node:fs";
import path from "node:path";

function readJson(p) {
  try { return JSON.parse(fs.readFileSync(p, "utf8")); } catch { return null; }
}

const projectDir = process.env.CLAUDE_PROJECT_DIR || process.cwd();
const phasePath = path.join(projectDir, "docs/workflow/phase.json");
const phase = (readJson(phasePath)?.phase || "ddd").toLowerCase();

const input = JSON.parse(fs.readFileSync(0, "utf8") || "{}");
const filePath = input.tool_input?.file_path || "";
const rel = filePath.startsWith(projectDir) ? path.relative(projectDir, filePath) : filePath;

const isUI =
  rel.startsWith("app/") ||
  rel.startsWith("pages/") ||
  rel.startsWith("src/ui/") ||
  rel.startsWith("src/app/");

if (phase === "ddd" && isUI) {
  console.error(
    `Phase is DDD. UI work is blocked.\n` +
    `Edit domain + docs first:\n - docs/domain/*\n - src/domain/* (only if you already defined the model)\n\n` +
    `Attempted file: ${rel}`
  );
  process.exit(2);
}

if (phase === "tdd" && isUI) {
  console.error(
    `Phase is TDD. UI work is blocked until core domain use-cases are implemented + verified.\n` +
    `Run /verify and finish domain/application first.\n\nAttempted file: ${rel}`
  );
  process.exit(2);
}

process.exit(0);
