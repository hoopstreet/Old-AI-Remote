const fs = require("fs");
const fetch = require("node-fetch");
const { clean } = require("./utils/cleaner");
const { parse } = require("./utils/parser");

const FILES = [
  "Temporary Builder/memory/convo.md",
  "Temporary Builder/memory/convo2.md"
];

function readAll() {
  return FILES.map(f =>
    fs.existsSync(f) ? fs.readFileSync(f, "utf-8") : ""
  ).join("\n\n---\n\n");
}

async function runAI() {
  const input = readAll();

  const prompt = `
You are a software generator.

CRITICAL RULES:
- Output ONLY VALID JSON
- NO markdown
- NO explanation
- NO comments
- MUST start with { and end with }
- If unsure, return empty valid JSON

FORMAT:
{
  "files": [{"path":"", "content":""}],
  "install": []
}

TASK:
Generate REAL WORKING CODE.

INPUT:
${input.slice(0, 10000)}
`;

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + process.env.OPENROUTER_API_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "openai/gpt-4o-mini",
      temperature: 0.1,
      messages: [{ role: "user", content: prompt }]
    })
  });

  const data = await res.json();

  if (!data.choices) {
    console.log("❌ API ERROR:", data);
    return null;
  }

  let text = data.choices[0].message.content;

  text = clean(text);

  fs.writeFileSync("Temporary Builder/docs/raw.txt", text);

  try {
    return parse(text);
  } catch (e) {
    console.log("❌ PARSE ERROR → attempting recovery...");
    return recoverJSON(text);
  }
}

function recoverJSON(text) {
  try {
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");

    if (start !== -1 && end !== -1) {
      const fixed = text.slice(start, end + 1);
      return JSON.parse(fixed);
    }
  } catch {}

  console.log("❌ RECOVERY FAILED");

  return {
    files: [],
    install: []
  };
}

module.exports = { runAI };
