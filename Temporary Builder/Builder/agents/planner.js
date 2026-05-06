const { callOpenRouter } = require("../core/llm");

module.exports = async function planner(state) {
  const prompt = `
Return ONLY a short structured plan.

NO sentences.
NO explanations.

Format:
- files
- features
- structure

Input:
${state.memory}
`;

  const res = await callOpenRouter(prompt);

  return {
    ...state,
    context: { plan: res }
  };
};
