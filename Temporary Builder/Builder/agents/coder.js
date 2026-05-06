const { callOpenRouter } = require("../core/llm");
const { safeJSON } = require("../core/json-safe");

module.exports = async function coder(state) {

  const prompt = `
YOU ARE A PRODUCTION CODE GENERATOR.

RULES:
- ONLY output VALID JSON
- NO markdown
- NO explanation
- NO text outside JSON
- MUST be a list of files

FORMAT:
[
  {
    "path": "app.js",
    "content": "// working node app"
  },
  {
    "path": "index.html",
    "content": "<html></html>"
  }
]

PROJECT SPEC:
${state.memory}
`;

  try {
    const res = await callOpenRouter(prompt);

    const parsed = safeJSON(res);

    if (!parsed || !Array.isArray(parsed)) {
      console.log("❌ CODER FAILED: invalid JSON output");
      return { ...state, context: { files: [] } };
    }

    return {
      ...state,
      context: {
        ...state.context,
        files: parsed
      }
    };

  } catch (err) {
    console.log("❌ CODER CRASH:", err.message);
    return { ...state, context: { files: [] } };
  }
};
