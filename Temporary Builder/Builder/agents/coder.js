const { callOpenRouter } = require("../core/llm");
const { extractJSON } = require("../core/json-safe");

module.exports = async function coder(state) {

  const prompt = `
YOU MUST OUTPUT VALID JSON ONLY.

NO TEXT.
NO MARKDOWN.
NO EXPLANATION.

SCHEMA:
{
  "files": [
    { "path": "app.js", "content": "// code" }
  ]
}

PROJECT:
${state.memory}
`;

  for (let attempt = 0; attempt < 3; attempt++) {

    const res = await callOpenRouter(prompt);
    const parsed = extractJSON(res);

    if (parsed?.files?.length > 0) {
      return {
        ...state,
        context: {
          ...state.context,
          files: parsed.files
        }
      };
    }

    console.log("⚠️ Retry coder attempt:", attempt + 1);
  }

  return { ...state, context: { files: [] } };
};
