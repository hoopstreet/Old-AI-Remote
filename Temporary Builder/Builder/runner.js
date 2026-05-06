const { runAI } = require("./brain");
const { writeFiles } = require("./utils/writer");
const { execSync } = require("child_process");
const fs = require("fs");
const { scan } = require("./utils/analyzer");

function fixYAML(filePath) {
  try {
    let content = fs.readFileSync(filePath, "utf8");

    // basic auto-fix
    content = content.replace(/\t/g, "  "); // no tabs in YAML
    content = content.replace(/\r/g, "");

    fs.writeFileSync(filePath, content);
  } catch {}
}

function validateRepo() {
  const required = [
    "Temporary Builder/memory/convo.md",
    "Temporary Builder/memory/convo2.md",
    "Temporary Builder/Builder/brain.js",
    "Temporary Builder/Builder/runner.js"
  ];

  for (const f of required) {
    if (!fs.existsSync(f)) {
      fs.writeFileSync(f, "");
    }
  }
}

(async () => {
  console.log("🚀 TEMP AI BUILDER START");

  validateRepo();

  const result = await runAI();
  if (!result) return;

  // WRITE FILES
  writeFiles(result.files);

  // SCAN REPO
  const repoMap = scan(".");

  // SELF HEAL YAML FILES
  repoMap.forEach(f => {
    if (f.includes(".yml") || f.includes(".yaml")) {
      fixYAML(f);
    }
  });

  // AUTO RESTORE MISSING FILES
  const criticalFiles = [
    "README.md",
    "Temporary Builder/docs/results.md"
  ];

  for (const file of criticalFiles) {
    if (!fs.existsSync(file)) {
      fs.writeFileSync(file, "# AUTO RESTORED FILE\n");
    }
  }

  // RESULTS REPORT
  const report = `
# TEMP AI BUILDER REPORT

## GENERATED FILES
${result.files?.map(f => "- " + f.path).join("\n")}

## SYSTEM STATUS
- Cron Auto Trigger: ACTIVE
- Self Healing: ACTIVE
- Repo Validator: ACTIVE

## REPO SCAN SIZE
${repoMap.length} files detected
`;

  fs.writeFileSync("Temporary Builder/docs/results.md", report);

  // GIT SYNC
  execSync("git config user.name 'AI-BOT'");
  execSync("git config user.email 'ai@bot.local'");

  execSync("git add .");

  const changed = execSync("git status --porcelain").toString();
  if (!changed) return;

  execSync("git commit -m '🧠 AUTO HEAL + CRON BUILD UPDATE' || true");
  execSync("git pull --rebase origin main || true");
  execSync("git push origin main || true");

  console.log("✅ SYSTEM LOOP COMPLETE");
})();
