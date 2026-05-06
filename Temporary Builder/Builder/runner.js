const { runAI } = require("./brain");
const { writeFiles } = require("./utils/writer");
const fs = require("fs");
const { execSync } = require("child_process");

const INDEX = "Temporary Builder/memory/repo-index.json";

function loadIndex() {
  return JSON.parse(fs.readFileSync(INDEX, "utf-8"));
}

function saveIndex(i) {
  fs.writeFileSync(INDEX, JSON.stringify(i, null, 2));
}

(async () => {
  console.log("🚀 TEMP BUILDER v2 START");

  try {
    const result = await runAI();

    if (!result) throw new Error("AI failed");

    // WRITE FILES
    writeFiles(result.files || []);

    // SAVE RAW
    fs.writeFileSync(
      "Temporary Builder/docs/raw.txt",
      JSON.stringify(result, null, 2)
    );

    // UPDATE INDEX META
    const index = loadIndex();
    index.lastBuild = new Date().toISOString();
    saveIndex(index);

    // GIT AUTO COMMIT
    execSync("git config user.name 'TEMP-AI'");
    execSync("git config user.email 'ai@bot.local'");

    execSync("git add .");

    const changes = execSync("git status --porcelain").toString();
    if (!changes) {
      console.log("No changes");
      return;
    }

    execSync("git commit -m '🤖 auto build v2'");
    execSync("git pull --rebase origin main || true");
    execSync("git push origin main || true");

    console.log("✅ BUILD COMPLETE");
  } catch (e) {
    console.log("❌ ERROR:", e.message);

    // 💀 AUTO FAILURE TRACKING
    const index = loadIndex();
    index.failures.push({
      time: new Date().toISOString(),
      error: e.message
    });
    saveIndex(index);

    // 🔁 AUTO ROLLBACK
    try {
      execSync("git revert HEAD --no-edit");
      execSync("git push origin main");
    } catch {}
  }
})();
