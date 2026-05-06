const { callOpenRouter } = require("../core/llm");
const { extractJSON } = require("../core/json-safe");

module.exports = async function coder(state) {
  const prompt = `
YOU ARE A CODE GENERATOR.

STRICT RULES:
- Output ONLY valid JSON
- NO markdown
- NO explanation
- NO extra text

FORMAT:
{
  "files": [
    { "path": "app.js", "content": "// code here" }
  ]
}

PROJECT:
${state.memory}
`;

  for (let i = 0; i < 3; i++) {
    const res = await callOpenRouter(prompt);

    console.log("📦 RAW AI OUTPUT:", res);

    const parsed = extractJSON(res);

    if (parsed && Array.isArray(parsed.files) && parsed.files.length > 0) {
      return {
        ...state,
        context: {
          ...state.context,
          files: parsed.files
        }
      };
    }

    console.log("⚠️ Retry coder:", i + 1);
  }

  return { ...state, context: { files: [] } };
};
