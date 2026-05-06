const { runAI } = require("./brain");
const { writeFiles } = require("./utils/writer");
const { logBuild } = require("./utils/logger");
const { repairWorkflows } = require("./utils/workflow-repair");
const fs = require("fs");
const { execSync } = require("child_process");

(async () => {
  console.log("🚀 TEMP BUILDER RUNNING");

  repairWorkflows();

  const result = await runAI();
  if (!result) return;

  writeFiles(result.files);

  fs.writeFileSync(
    "Temporary Builder/docs/results.md",
    JSON.stringify(result, null, 2)
  );

  logBuild(result);

  try {
    execSync("git config user.name 'AI-BOT'");
    execSync("git config user.email 'ai@bot.local'");
    execSync("git add .");

    const changed = execSync("git status --porcelain").toString();
    if (!changed) return;

    execSync("git commit -m '🧠 AUTO BUILD'");
    execSync("git pull --rebase origin main || true");
    execSync("git push origin main || true");
  } catch {}
})();
