const { runAI } = require("./brain");
const { writeFiles } = require("./utils/writer");
const { store } = require("./utils/vector-memory");
const { selfImprove } = require("./utils/self-improver");
const fs = require("fs");
const { execSync } = require("child_process");

(async () => {
  console.log("🚀 TEMP BUILDER v4 - SELF IMPROVING SYSTEM");

  try {
    const result = await runAI();

    if (!result) throw new Error("AI failed");

    const files = result.files || [];

    // 🧠 VECTOR MEMORY LEARNING
    for (const f of files) {
      store(f.path, f.content);
    }

    // 🧠 SELF IMPROVEMENT ANALYSIS
    const improvement = selfImprove();

    fs.writeFileSync(
      "Temporary Builder/docs/raw.txt",
      JSON.stringify({
        generated: files.length,
        violations: improvement.violations,
        suggestedMoves: improvement.moves
      }, null, 2)
    );

    // WRITE FILES
    writeFiles(files);

    // GIT AUTO SYNC
    execSync("git config user.name 'TEMP-AI'");
    execSync("git config user.email 'ai@bot.local'");

    execSync("git add .");

    const changes = execSync("git status --porcelain").toString();
    if (!changes) return;

    execSync("git commit -m '🧠 self-improving architecture update'");
    execSync("git pull --rebase origin main || true");
    execSync("git push origin main || true");

    console.log("✅ v4 EVOLUTION COMPLETE");

  } catch (e) {
    console.log("❌ ERROR:", e.message);
  }
})();
