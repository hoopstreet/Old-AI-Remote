const fs = require("fs");
const fetch = require("node-fetch");
const { clean } = require("./utils/cleaner");
const { parse } = require("./utils/parser");

async function runAI() {
  const c1 = fs.readFileSync("Temporary Builder/memory/convo.md", "utf-8");
  const c2 = fs.readFileSync("Temporary Builder/memory/convo2.md", "utf-8");

  const prompt = `
Return ONLY JSON:
{ "files":[{"path":"","content":""}], "install":[] }

${c1}
${c2}
`;

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + process.env.OPENROUTER_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await res.json();
    let text = data.choices?.[0]?.message?.content || "";

    text = clean(text);
    fs.writeFileSync("Temporary Builder/docs/raw.txt", text);

    return parse(text);
  } catch (e) {
    console.log("❌ AI ERROR", e.message);
    return null;
  }
}

module.exports = { runAI };
