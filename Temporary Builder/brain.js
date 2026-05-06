const fs = require("fs");
const fetch = require("node-fetch");

function read(file) {
  try {
    return fs.readFileSync(file, "utf-8");
  } catch {
    return "";
  }
}

// 🧠 CLOUD BRAIN CORE
async function runCloudBrain() {
  const entry = read("Temporary Builder/memory/convo.md");
  const final = read("Temporary Builder/memory/convo2.md");

  const prompt = `
You are V7 CLOUD DEVOPS OS.

FEATURES:
- repo-to-repo learning
- DAG execution graph
- PR-based deployment
- semantic diff engine
- microservice generator

RULES:
- output ONLY JSON
- no markdown
- no explanation

FORMAT:
{
  "files": [
    { "path": "services/api.js", "content": "console.log('api')" }
  ]
}

ENTRY:
${entry}

FINAL:
${final}

Generate production-ready distributed system.
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

  try {
    return JSON.parse(data.choices[0].message.content);
  } catch {
    return {
      files: [
        {
          path: "docs/v7-error.md",
          content: "⚠️ JSON FAILURE → SAFE MODE"
        }
      ]
    };
  }
}

module.exports = { runCloudBrain };
