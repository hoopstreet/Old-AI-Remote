const https = require("https");

async function callOpenRouter(prompt) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      model: "openai/gpt-4o-mini",
      messages: [{ role: "user", content: prompt }]
    });

    const options = {
      hostname: "openrouter.ai",
      path: "/api/v1/chat/completions",
      method: "POST",
      headers: {
        "Authorization": "Bearer " + process.env.OPENROUTER_API_KEY,
        "Content-Type": "application/json"
      }
    };

    const req = https.request(options, (res) => {
      let body = "";

      res.on("data", (chunk) => body += chunk);

      res.on("end", () => {
        try {
          const json = JSON.parse(body);
          resolve(json.choices[0].message.content);
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

module.exports = { callOpenRouter };
