const { callOpenRouter } = require("../core/llm");

module.exports = async function coder(state) {

  if (!state?.memory) {
    throw new Error("Coder received invalid state");
  }

  const prompt = `
YOU ARE A PRODUCTION CODE GENERATOR.

STRICT RULES:
- Output ONLY valid JSON
- NO markdown
- NO explanation
- NO text before or after
- MUST follow schema exactly

SCHEMA:
{
  "files": [
    {
      "path": "string",
      "content": "string"
    }
  ]
}

PROJECT MEMORY:
${state.memory}

PROJECT PLAN:
${state.context?.plan || ""}
`;

  const res = await callOpenRouter(prompt);

  try {
    const parsed = JSON.parse(res);

    if (!parsed.files || !Array.isArray(parsed.files)) {
      console.log("❌ INVALID AI OUTPUT STRUCTURE");
      return { ...state, context: { files: [] } };
    }

    return {
      ...state,
      context: {
        ...state.context,
        files: parsed.files
      }
    };

  } catch (e) {
    console.log("❌ RAW AI OUTPUT (NOT JSON):");
    console.log(res);

    return { ...state, context: { files: [] } };
  }
};
