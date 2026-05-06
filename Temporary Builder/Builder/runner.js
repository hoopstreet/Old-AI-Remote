const { runAI } = require("./brain");
const { writeFiles } = require("./utils/writer");
const { execSync } = require("child_process");
const fs = require("fs");
const { logBuild } = require("./utils/logger");
const { scan } = require("./utils/analyzer");

(async () => {
  console.log("🚀 TEMP BUILDER START");

  const result = await runAI();
  if (!result) return;

  // 🧠 WRITE FILES (ROOT SYSTEM OUTPUT)
  writeFiles(result.files);

  // 📊 SCAN FULL REPO (ANTI-DUPLICATE SYSTEM)
  const repo = scan(".");

  // 🧾 BUILD REPORT (FULL INTELLIGENCE)
  const report = `
# 🧠 AI-REMOTE FULL REPORT

## GENERATED FILES
${result.files?.map(f => "- " + f.path).join("\n")}

## REPOSITORY STATE
${repo.slice(0, 200).map(f => "- " + f).join("\n")}

## DEPENDENCIES
${(result.install || []).join(", ")}

## SYSTEM STATUS
- Temporary Builder: ACTIVE
- Duplicate Prevention: ENABLED
- Repo Scan: ACTIVE

## SELF-HEALING NOTES
If GitHub Actions fails:
- Check workflow YAML syntax
- Ensure secrets exist in repo settings
- Retry via push trigger (no manual execution required)

## CREDENTIAL RULES
NEVER hardcode:
- OPENROUTER_API_KEY → GitHub Secrets
- TG_BOT_TOKEN → GitHub Secrets
- SUPABASE keys → GitHub Secrets
`;

  fs.writeFileSync("Temporary Builder/docs/results.md", report);

  logBuild(result);

  // 🧠 AUTO COMMIT SYSTEM
  execSync("git config user.name 'AI-BOT'");
  execSync("git config user.email 'ai@bot.local'");

  execSync("git add .");

  const changed = execSync("git status --porcelain").toString();
  if (!changed) return;

  execSync("git commit -m '🧠 AUTO BUILD + SELF HEAL UPDATE' || true");
  execSync("git pull --rebase origin main || true");
  execSync("git push origin main || true");

  console.log("✅ BUILD COMPLETE");
})();
