const fs = require("fs");
const path = require("path");
const { runBrain } = require("./brain");
const { execSync } = require("child_process");

// 🧠 SAFE WRITE
function writeSafe(filePath, content) {
  const dir = path.dirname(filePath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, content || "");
  console.log("✔", filePath);
}

// 🧠 SAFE EXEC
function run(cmd) {
  try { execSync(cmd, { stdio: "inherit" }); }
  catch (e) { console.log("⚠️", cmd); }
}

// 🧠 GIT AGENT
function gitAgent() {
  run("git add .");

  const status = execSync("git status --porcelain").toString();

  if (!status) return false;

  run("git commit -m '🧠 V3 AUTO MULTI-AGENT BUILD'");
  run("git pull --no-rebase origin main || true");
  run("git push origin main || true");

  return true;
}

// 🧠 MAIN EXECUTION
(async () => {
  console.log("🚀 V3 AUTONOMOUS DEVOPS BRAIN START");

  let result;

  try {
    result = await runBrain();
  } catch (e) {
    console.log("❌ BRAIN FAIL SAFE MODE");
    result = { files: [] };
  }

  if (!result.files) result.files = [];

  // WRITE ALL FILES
  for (const f of result.files) {
    writeSafe(f.path, f.content);
  }

  // ALWAYS CREATE TOOL DOCS
  writeSafe(
    "docs/tools-credentials.md",
`# 🔐 CREDENTIAL SYSTEM

GitHub:
- GITHUB_TOKEN (auto)

AI:
- OPENROUTER_API_KEY (GitHub Secrets)

Deploy:
- NF_TOKEN
- RENDER_API_KEY
- RAILWAY_TOKEN

RULE:
Never expose secrets
`
  );

  // GIT AGENT
  gitAgent();

  console.log("✅ V3 COMPLETE");
})();
