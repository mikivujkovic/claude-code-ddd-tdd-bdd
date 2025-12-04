import fs from "node:fs";
import path from "node:path";

const projectDir = process.env.CLAUDE_PROJECT_DIR || process.cwd();
const phaseFile = path.join(projectDir, "docs/workflow/phase.json");

let phase = "ddd";
try { phase = JSON.parse(fs.readFileSync(phaseFile, "utf8")).phase?.toLowerCase() || "ddd"; } catch {}

const input = JSON.parse(fs.readFileSync(0, "utf8") || "{}");
const transcriptPath = input.transcript_path;

if (phase === "ddd") process.exit(0);

if (!transcriptPath || !fs.existsSync(transcriptPath)) {
  console.error("Stop blocked: could not find transcript to confirm verification. Run /verify.");
  process.exit(2);
}

const transcript = fs.readFileSync(transcriptPath, "utf8");
const ok = transcript.includes("✅ VERIFY PASSED");
const failed = transcript.includes("❌ VERIFY FAILED");

if (!ok || failed) {
  console.error("Stop blocked: run `/verify` and ensure it passes (✅ VERIFY PASSED).");
  process.exit(2);
}

process.exit(0);
