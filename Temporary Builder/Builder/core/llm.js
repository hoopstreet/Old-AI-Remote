const https = require("https");

async function callOpenRouter(prompt) {
  const data = JSON.stringify({
    model: "openai/gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.2
  });

  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: "openrouter.ai",
      path: "/api/v1/chat/completions",
      method: "POST",
      headers: {
        "Authorization": "Bearer " + process.env.OPENROUTER_API_KEY,
        "Content-Type": "application/json",
        "Content-Length": data.length
      }
    }, (res) => {
      let body = "";

      res.on("data", chunk => body += chunk);

      res.on("end", () => {
        try {
          const json = JSON.parse(body);
          const text = json.choices?.[0]?.message?.content || "";
          resolve(text);
        } catch (e) {
          reject(new Error("Invalid OpenRouter response"));
        }
      });
    });

    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

module.exports = { callOpenRouter };
