const { runAI } = require("./brain");
const { writeFiles } = require("./utils/writer");
const { logBuild } = require("./utils/logger");
const { repairWorkflows } = require("./utils/workflow-repair");
const fs = require("fs");
const { execSync } = require("child_process");

function safe(cmd) {
  try { execSync(cmd, { stdio: "inherit" }); } catch {}
}

(async () => {
  console.log("🚀 TEMP BUILDER START");

  // 🧠 Repair workflows first
  repairWorkflows();

  const result = await runAI();

  if (!result || !result.files) {
    console.log("❌ No valid AI output");
    return;
  }

  // 🧠 WRITE FILES TO ROOT ONLY
  writeFiles(result.files);

  // 🧠 SAVE RAW OUTPUT
  fs.writeFileSync(
    "Temporary Builder/docs/raw.txt",
    JSON.stringify(result, null, 2)
  );

  // 🧠 SUMMARY
  const summary = `
# 🧠 AI BUILD RESULTS

## FILES:
${result.files.map(f => "- " + f.path).join("\n")}

## STATUS:
SUCCESS
`;

  fs.writeFileSync("Temporary Builder/docs/results.md", summary);

  logBuild(result);

  // 🧠 GIT SAFE SYNC
  safe("git config user.name 'AI-BOT'");
  safe("git config user.email 'ai@bot.local'");
  safe("git add .");

  const changed = execSync("git status --porcelain").toString();

  if (!changed) {
    console.log("✅ No changes");
    return;
  }

  safe("git commit -m '🧠 AUTO BUILD CLEAN'");
  safe("git pull --rebase origin main || true");
  safe("git push origin main || true");

  console.log("✅ BUILD COMPLETE");
})();
