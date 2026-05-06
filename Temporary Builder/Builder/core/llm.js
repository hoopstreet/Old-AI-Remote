const https = require("https");

function callOpenRouter(prompt) {
  return new Promise((resolve, reject) => {

    const body = JSON.stringify({
      model: "openai/gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
      max_tokens: 4000,
      stream: false
    });

    const req = https.request({
      hostname: "openrouter.ai",
      path: "/api/v1/chat/completions",
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(body)
      }
    }, (res) => {
      let data = "";

      res.on("data", chunk => data += chunk);

      res.on("end", () => {
        try {
          const json = JSON.parse(data);

          const output = json?.choices?.[0]?.message?.content;

          if (!output || output.length < 20) {
            return reject(new Error("EMPTY_OR_TRUNCATED_RESPONSE"));
          }

          resolve(output);

        } catch (err) {
          reject(new Error("INVALID_JSON_FROM_OPENROUTER"));
        }
      });
    });

    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

module.exports = { callOpenRouter };
