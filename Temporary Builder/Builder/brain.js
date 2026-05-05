const fs = require("fs");
const fetch = require("node-fetch");
const { clean } = require("./utils/cleaner");
const { parse } = require("./utils/parser");

const CONVOS = [
  "Temporary Builder/memory/convo.md",
  "Temporary Builder/memory/convo2.md"
];

function readConvos() {
  return CONVOS.map(f =>
    fs.existsSync(f) ? fs.readFileSync(f, "utf-8") : ""
  ).join("\n\n--- NEXT ---\n\n");
}

async function runAI() {
  const convo = readConvos();

  const prompt = `
You are an autonomous software builder.

RULES:
- Output ONLY valid JSON
- NO markdown, NO code blocks
- MUST be parseable JSON

FORMAT:
{
  "files": [{"path":"", "content":""}],
  "install": []
}

INPUT SYSTEMS:
- convo.md = GitHub Actions system
- convo2.md = Telegram system

TASK:
Merge both into working system.

DATA:
${convo.slice(0, 12000)}
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

  if (!data.choices) {
    console.log("API ERROR:", data);
    return null;
  }

  let text = data.choices[0].message.content;

  text = clean(text);

  fs.writeFileSync("Temporary Builder/docs/raw.txt", text);

  return parse(text);
}

module.exports = { runAI };
