const { runAI } = require("./brain");
const { writeFiles } = require("./utils/writer");
const { execSync } = require("child_process");
const fs = require("fs");
const { logBuild } = require("./utils/logger");
const { fullScan } = require("./utils/analyzer");

function dedupe(list) {
  return [...new Set(list)];
}

function classify(file) {
  if (file.includes(".github/workflows")) return "GitHub Actions Workflow";
  if (file.includes("src/agent")) return "AI Execution Engine";
  if (file.includes("Temporary Builder")) return "Builder System";
  if (file.includes("docs")) return "Documentation Layer";
  if (file.includes("scripts")) return "Automation Scripts";
  return "Core System";
}

function explain(file) {
  const type = classify(file.path);

  let purpose = "";

  switch (type) {
    case "GitHub Actions Workflow":
      purpose = "Automates CI/CD, triggers AI build pipeline on push events.";
      break;
    case "AI Execution Engine":
      purpose = "Core AI logic for processing prompts and generating outputs.";
      break;
    case "Builder System":
      purpose = "Temporary orchestration layer for merging convo.md and convo2.md.";
      break;
    case "Documentation Layer":
      purpose = "System documentation and knowledge storage.";
      break;
    default:
      purpose = "Core system file required for runtime.";
  }

  let credentials = "None required";

  if (
    file.path.includes("deploy") ||
    file.path.includes("docker") ||
    file.path.includes("hf") ||
    file.path.includes("github") ||
    file.path.includes("api")
  ) {
    credentials =
      "Requires GitHub Secrets / ENV variables (OPENROUTER_API_KEY, GH_TOKEN, SUPABASE keys if used)";
  }

  return { type, purpose, credentials };
}

(async () => {
  console.log("🚀 TEMP BUILDER FULL SYSTEM MODE");

  const result = await runAI();
  if (!result) return;

  // WRITE FILES (ROOT)
  writeFiles(result.files);

  // RAW OUTPUT
  fs.writeFileSync(
    "Temporary Builder/docs/raw.txt",
    JSON.stringify(result, null, 2)
  );

  // FULL REPO SCAN
  const scanned = fullScan();

  const uniqueFiles = dedupe(scanned.map(f => f.path));

  const detailed = uniqueFiles.map(path => {
    const info = explain({ path });

    return `
---

## 📄 ${path}

- Category: ${info.type}
- Purpose: ${info.purpose}
- Credentials: ${info.credentials}
`;
  }).join("\n");

  const generatedFiles = result.files?.map(f => f.path) || [];

  const mergedSummary = `
# 🧠 AI-REMOTE FULL SYSTEM REPORT (MASTER BUILD)

---

## 📦 NEWLY GENERATED FILES
${generatedFiles.map(f => "- " + f).join("\n")}

---

## 🧾 COMPLETE REPOSITORY MAP
${detailed}

---

## 🧠 SYSTEM ARCHITECTURE

### 1. convo.md
→ GitHub Actions automation logic

### 2. convo2.md
→ Telegram AI task generator

### 3. Temporary Builder
→ Merge + orchestration engine (ONLY ACTIVE BRAIN)

### 4. src/agent (DISABLED)
→ Legacy execution engine (replaced)

---

## 🔐 CREDENTIALS GUIDE

If file requires credentials:

- GitHub Secrets:
  - OPENROUTER_API_KEY
  - GH_TOKEN
  - DOCKERHUB_TOKEN
  - HF_TOKEN
  - SUPABASE_SERVICE_ROLE_KEY

👉 Add in:
GitHub Repo → Settings → Secrets and Variables → Actions

---

## ⚙️ SYSTEM STATUS

✔ Builder Active  
✔ GitHub Sync Enabled  
✔ AI Generation Working  
✔ Duplicate detection enabled  
✔ Repo scan enabled  

---

## ⚠️ NOTES

- src/agent is deprecated
- Only Temporary Builder should generate files
- Always update convo.md + convo2.md for behavior control
`;

  fs.writeFileSync("Temporary Builder/docs/results.md", mergedSummary);

  logBuild(result);

  execSync("git config user.name 'AI-BOT'");
  execSync("git config user.email 'ai@bot.local'");

  execSync("git add .");

  const changed = execSync("git status --porcelain").toString();
  if (!changed) return;

  execSync("git commit -m '🧠 MASTER SYSTEM MERGE + FULL ANALYSIS' || true");
  execSync("git pull --rebase origin main || true");
  execSync("git push origin main || true");

  console.log("✅ FULL SYSTEM MERGE COMPLETE");
})();
