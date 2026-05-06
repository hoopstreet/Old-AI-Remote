const { runAI } = require("./brain");
const { writeFiles } = require("./utils/writer");
const { logBuild } = require("./utils/logger");
const fs = require("fs");
const { execSync } = require("child_process");

function safeExec(cmd) {
  try {
    return execSync(cmd, { stdio: "inherit" });
  } catch (e) {
    console.log("⚠️ FAIL:", cmd);
    return null;
  }
}

(async () => {
  console.log("🚀 TEMP BUILDER START");

  const result = await runAI();

  if (!result) {
    console.log("❌ AI FAILED");
    process.exit(1);
  }

  // WRITE FILES
  writeFiles(result.files);

  // SAVE RAW OUTPUT
  fs.writeFileSync(
    "Temporary Builder/docs/raw.txt",
    JSON.stringify(result, null, 2)
  );

  // BUILD SUMMARY
  const summary = `
# 🧠 AI BUILD RESULTS

## 📦 Files Generated
${result.files?.map(f => "- " + f.path).join("\n")}

## ⚙️ Dependencies
${(result.install || []).join(", ")}

## ✅ STATUS
SELF-HEAL ACTIVE
`;

  fs.writeFileSync("Temporary Builder/docs/results.md", summary);

  // LOG HISTORY
  logBuild(result);

  // SAFE GIT FLOW (NO REBASE LOOP)
  try {
    safeExec("git config user.name 'AI-BOT'");
    safeExec("git config user.email 'ai@bot.local'");

    safeExec("git add .");

    const changed = execSync("git status --porcelain").toString();

    if (!changed) {
      console.log("✅ NO CHANGES");
      return;
    }

    safeExec("git commit -m '🧠 AUTO BUILD UPDATE'");

    // SAFE SYNC STRATEGY (NO REBASE)
    safeExec("git fetch origin");
    safeExec("git merge origin/main --no-edit || true");

    safeExec("git push origin main");

  } catch (e) {
    console.log("⚠️ GIT FAILURE → RESET");

    try {
      safeExec("git reset --hard origin/main");
    } catch {}

    console.log("♻️ RECOVERED");
  }

  console.log("✅ COMPLETE");
})();
