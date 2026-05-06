const { callOpenRouter } = require("../core/llm");
const { safeJSON } = require("../core/json-safe");

module.exports = async function coder(state) {

  const prompt = `
You are a production code generator.

RULES:
- Output ONLY valid JSON array
- NO markdown
- NO explanation

FORMAT:
[
  { "path": "app.js", "content": "console.log('app');" }
]

PROJECT:
${state.memory}
`;

  const res = await callOpenRouter(prompt);

  const parsed = safeJSON(res);

  return {
    ...state,
    context: {
      ...state.context,
      files: parsed || []
    }
  };
};
