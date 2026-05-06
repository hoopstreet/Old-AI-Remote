const fetch = require("node-fetch");

const API_KEY = process.env.OPENROUTER_API_KEY;

async function callLLM(prompt, model = "openai/gpt-4o-mini") {
  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: "You are a production DAG AI agent." },
          { role: "user", content: prompt }
        ]
      })
    });

    const data = await res.json();
    return data.choices?.[0]?.message?.content || "";
  } catch (e) {
    return JSON.stringify({ error: e.message });
  }
}

module.exports = { callLLM };
