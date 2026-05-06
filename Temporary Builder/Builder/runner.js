const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");

function write(file, content) {
  const full = path.resolve(file);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content || "");
  console.log("✔", file);
}

function read(file) {
  return fs.existsSync(file)
    ? fs.readFileSync(file, "utf-8")
    : "";
}

async function run() {
  console.log("🧠 AUTOGPT DEVOPS START");

  const entry = read("Temporary Builder/memory/convo.md");
  const final = read("Temporary Builder/memory/convo2.md");

  const prompt = `
You are AutoGPT DevOps SaaS Engine.

Return ONLY JSON:
{
  "files":[
    {"path":"index.js","content":"console.log(1)"}
  ]
}

ENTRY:
${entry}

FINAL:
${final}
`;

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + process.env.OPENROUTER_API_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "openai/gpt-4o-mini",
      temperature: 0.2,
      messages: [{ role: "user", content: prompt }]
    })
  });

  const data = await res.json();

  let result;
  try {
    result = JSON.parse(data.choices[0].message.content);
  } catch {
    result = {
      files: [
        {
          path: "docs/error.md",
          content: "SAFE MODE ACTIVE - JSON FAILED"
        }
      ]
    };
  }

  for (const f of result.files || []) {
    write(f.path, f.content);
  }

  console.log("✅ DONE");
}

run();
