const { callOpenRouter } = require("../core/llm");

module.exports = async function planner(state) {
  const prompt = `
You are Planner AI.
Analyze this project request:

${state.memory}

Return JSON plan of files to generate.
`;

  const res = await callOpenRouter(prompt);

  return {
    ...state,
    context: { plan: res }
  };
};
