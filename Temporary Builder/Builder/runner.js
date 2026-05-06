const fs = require("fs");
const { runBrain } = require("./brain");
const { execSync } = require("child_process");

function safeExec(cmd) {
  try {
    return execSync(cmd, { stdio: "inherit" });
  } catch (e) {
    console.log("⚠️ SKIP:", cmd);
  }
}

function writeFileSafe(path, content) {
  const dir = path.split("/").slice(0, -1).join("/");
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path, content || "");
  console.log("✔", path);
}

(async () => {
  console.log("🚀 SAFE BUILDER START");

  let result;
  try {
    result = await runBrain();
  } catch (e) {
    console.log("❌ BRAIN FAILED → fallback");
    result = null;
  }

  if (!result || !result.files) {
    result = {
      files: [
        {
          path: "Temporary Builder/docs/summary.md",
          content: "# Safe build fallback mode active"
        }
      ]
    };
  }

  // WRITE ROOT + TEMP FILES
  for (const f of result.files) {
    writeFileSafe(f.path, f.content);
  }

  // AUTO CREATE CREDENTIAL DOC
  writeFileSafe(
    "docs/tools-credentials.md",
`# 🔐 Tools Credentials Map

## GitHub Actions
- GITHUB_TOKEN → auto provided

## AI APIs
- OPENROUTER_API_KEY → add in GitHub Secrets

## Deploy Platforms
- Northflank → NF_TOKEN
- Render → RENDER_API_KEY
- Railway → RAILWAY_TOKEN

⚠️ NEVER hardcode secrets
`
  );

  // SAFE GIT FLOW (NO REBASE)
  safeExec("git config user.name 'AI-BOT'");
  safeExec("git config user.email 'ai@bot.local'");
  safeExec("git add .");

  const status = execSync("git status --porcelain").toString();

  if (!status) {
    console.log("✅ NO CHANGES");
    return;
  }

  safeExec("git commit -m '🧠 SAFE AUTO BUILD'");
  safeExec("git pull --no-rebase origin main || true");
  safeExec("git push origin main || true");

  console.log("✅ DONE");
})();
