const { callOpenRouter } = require("../core/llm");
const { safeJSON } = require("../core/json-safe");

module.exports = async function coder(state) {
  const prompt = `
You are Coder AI.

IMPORTANT:
Return ONLY valid JSON array:
[
  { "path": "file.js", "content": "code here" }
]

NO explanation. NO markdown. ONLY JSON.

Project:
${state.context.plan}
`;

  const res = await callOpenRouter(prompt);

  const parsed = safeJSON(res);

  if (!parsed) {
    console.log("❌ INVALID JSON FROM AI - RETRYING SAFE MODE");

    return {
      ...state,
      context: { files: [] }
    };
  }

  return {
    ...state,
    context: { ...state.context, files: parsed }
  };
};
