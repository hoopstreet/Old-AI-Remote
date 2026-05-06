const https = require("https");

async function callOpenRouter(prompt) {

  const body = JSON.stringify({
    model: "openai/gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "You are a STRICT JSON generator. You MUST output ONLY valid JSON. No markdown. No explanation."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    temperature: 0.1
  });

  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: "openrouter.ai",
      path: "/api/v1/chat/completions",
      method: "POST",
      headers: {
        "Authorization": "Bearer " + process.env.OPENROUTER_API_KEY,
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(body)
      }
    }, (res) => {
      let data = "";

      res.on("data", chunk => data += chunk);

      res.on("end", () => {
        try {
          const json = JSON.parse(data);
          const output = json.choices?.[0]?.message?.content || "";
          resolve(output.trim());
        } catch (e) {
          reject(new Error("OpenRouter response parse failed"));
        }
      });
    });

    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

module.exports = { callOpenRouter };
