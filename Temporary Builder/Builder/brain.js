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
YOU ARE A PRODUCTION-GRADE SOFTWARE ENGINE BUILDER.

STRICT RULES:
- Output ONLY valid JSON
- NO markdown, NO explanation
- MUST be production-ready code (NOT demo)
- MUST include full working logic

SYSTEM INPUTS:
- convo.md = GitHub Actions workflow rules
- convo2.md = Telegram AI Remote system

TASK:
1. Build FULL working system
2. Ensure GitHub Actions executes correctly
3. Ensure Telegram bot is production-ready
4. Connect all modules properly
5. NO placeholders

OUTPUT FORMAT:
{
  "files": [
    { "path": "string", "content": "string" }
  ],
  "install": ["dependencies"]
}

CONTEXT:
${convo.slice(0, 15000)}
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
  if (!data.choices) return null;

  let text = clean(data.choices[0].message.content);
  fs.writeFileSync("Temporary Builder/docs/raw.txt", text);

  return parse(text);
}

module.exports = { runAI };
