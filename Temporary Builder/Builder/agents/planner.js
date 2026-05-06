const { callOpenRouter } = require("../core/llm");

module.exports = async function planner(state) {

  if (!state || !state.memory) {
    throw new Error("Planner received invalid state");
  }

  const prompt = `
You are a software architect.

Return ONLY JSON plan.

PROJECT:
${state.memory}
`;

  const res = await callOpenRouter(prompt);

  return {
    ...state,
    context: {
      ...state.context,
      plan: res
    }
  };
};
