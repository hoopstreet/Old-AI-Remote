const fs = require("fs");
const path = require("path");
const { runBrain } = require("./brain");
const { execSync } = require("child_process");

// 🧠 SAFE FILE WRITER (NO CRASH EVER)
function writeSafe(filePath, content) {
  try {
    const dir = path.dirname(filePath);
    fs.mkdirSync(dir, { recursive: true }); // FIXED
    fs.writeFileSync(filePath, content || "");
    console.log("✔ FILE:", filePath);
  } catch (e) {
    console.log("⚠️ WRITE FAILED:", filePath);
  }
}

// 🧠 SAFE EXEC
function run(cmd) {
  try {
    return execSync(cmd, { stdio: "inherit" });
  } catch (e) {
    console.log("⚠️ CMD FAIL:", cmd);
  }
}

// 🧠 SAFE MAIN WRAPPER (NO unhandled promise crash)
async function main() {
  console.log("🚀 SAFE BRAIN START");

  let result = null;

  try {
    result = await runBrain();
  } catch (e) {
    console.log("❌ BRAIN ERROR → fallback mode");
  }

  if (!result || !result.files) {
    result = {
      files: [
        {
          path: "Temporary Builder/docs/fallback.md",
          content: "# SAFE FALLBACK MODE ACTIVE"
        }
      ]
    };
  }

  for (const file of result.files) {
    writeSafe(file.path, file.content);
  }

  // credentials doc ALWAYS SAFE
  writeSafe(
    "docs/tools-credentials.md",
`# 🔐 CREDENTIALS MAP

GitHub:
- GITHUB_TOKEN (auto)

AI:
- OPENROUTER_API_KEY (GitHub Secrets)

Deploy:
- NF_TOKEN (Northflank)
- RENDER_API_KEY
- RAILWAY_TOKEN

RULE:
Never hardcode secrets
`
  );

  // SAFE GIT FLOW
  run("git add .");

  let status = "";
  try {
    status = execSync("git status --porcelain").toString();
  } catch {}

  if (!status) {
    console.log("✅ NO CHANGES");
    return;
  }

  run("git commit -m '🧠 SAFE AUTO BUILD'");
  run("git pull --no-rebase origin main || true");
  run("git push origin main || true");

  console.log("✅ DONE SAFE");
}

// 🧠 HARD SAFETY WRAPPER (prevents iSH crash)
main().catch(err => {
  console.log("💥 GLOBAL CATCH:", err);
});
