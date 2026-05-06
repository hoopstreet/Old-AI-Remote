const { callOpenRouter } = require("../core/llm");
const { safeJSON } = require("../core/json-safe");

module.exports = async function coder(state) {
  const prompt = `
You are a production software generator.

RULES:
- Generate REAL working code
- Output ONLY JSON array
- NO explanation
- NO markdown

FORMAT:
[
  { "path": "app.js", "content": "..." },
  { "path": "server.js", "content": "..." }
]

PROJECT PLAN:
${state.context.plan}
`;

  const res = await callOpenRouter(prompt);

  const parsed = safeJSON(res);

  if (!parsed) {
    console.log("❌ INVALID CODE OUTPUT → RETURN EMPTY");
    return {
      ...state,
      context: { files: [] }
    };
  }

  return {
    ...state,
    context: {
      ...state.context,
      files: parsed
    }
  };
};
