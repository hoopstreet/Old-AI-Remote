const fs = require("fs");
const fetch = require("node-fetch");
const { execSync } = require("child_process");

function readFileSafe(path) {
  try {
    return fs.readFileSync(path, "utf-8");
  } catch {
    return "";
  }
}

async function runAI() {
  const convo1 = readFileSafe("./memory/convo.md");
  const convo2 = readFileSafe("./memory/convo2.md");

  const prompt = `
You are an autonomous AI software engineer inside a GitHub repository.

You must:
1. Read ALL instructions from convo.md and convo2.md
2. Detect missing modules/files
3. Generate full working project structure
4. Improve existing code if needed

IMPORTANT RULES:
- Output ONLY valid JSON
- No explanations outside JSON
- Must include ALL required files
- Fix missing dependencies automatically

FORMAT:
{
  "files": [
    {
      "path": "file path",
      "content": "file content"
    }
  ]
}

CONVO PHASE 1:
${convo1.slice(0, 8000)}

CONVO PHASE 2:
${convo2.slice(0, 8000)}
`;

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + process.env.OPENROUTER_API_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "openai/gpt-4o-mini",
      max_tokens: 2000,
      messages: [{ role: "user", content: prompt }]
    })
  });

  const data = await res.json();

  if (!data.choices) {
    console.log("ERROR:", data);
    return;
  }

  const text = data.choices[0].message.content;

  fs.writeFileSync("./memory/output.json", text);

  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch (e) {
    console.log("❌ JSON PARSE ERROR");
    console.log(text);
    return;
  }

  // 🏗 CREATE FILES
  parsed.files.forEach(file => {
    const dir = file.path.split("/").slice(0, -1).join("/");
    if (dir) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(file.path, file.content);
  });

  console.log("✅ AI files generated");

  // 🔥 AUTO GIT FIX + PUSH (SELF-HEALING)
  try {
    execSync("git config user.name 'AI Bot'");
    execSync("git config user.email 'ai@bot.com'");

    execSync("git add .");

    try {
      execSync("git commit -m '🤖 AI auto build update' || echo 'no changes'");
    } catch {}

    // 🔥 AUTO RESOLVE CONFLICTS
    try {
      execSync("git pull origin main --rebase --autostash");
    } catch {
      console.log("⚠️ Rebase failed, trying merge...");
      execSync("git merge origin/main || true");
    }

    execSync("git push origin main");

    console.log("🚀 Git synced successfully");
  } catch (err) {
    console.log("Git error:", err.message);
  }
}

runAI();
