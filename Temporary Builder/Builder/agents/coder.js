const { callOpenRouter } = require("../core/llm");

module.exports = async function coder(state) {
  const prompt = `
You are Coder AI.
Create FULL WORKING CODE based on this plan:

${state.context.plan}

Return JSON:
[{path, content}]
`;

  const res = await callOpenRouter(prompt);

  return {
    ...state,
    context: {
      ...state.context,
      files: JSON.parse(res)
    }
  };
};
