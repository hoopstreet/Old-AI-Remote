const fetch = require("node-fetch");

const API_KEY = process.env.OPENROUTER_API_KEY;

async function generate(prompt) {
  if (!API_KEY) throw new Error("Missing OPENROUTER_API_KEY");

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "openai/gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a production DAG AI software engineer. Output ONLY valid JSON when requested." },
        { role: "user", content: prompt }
      ]
    })
  });

  const data = await res.json();
  return data.choices?.[0]?.message?.content || "";
}

module.exports = { generate };
