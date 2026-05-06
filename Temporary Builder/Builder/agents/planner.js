const { callOpenRouter } = require("../core/llm");

module.exports = async function planner(state) {
  const prompt = `
You are a senior software architect.

TASK:
Analyze FULL project specification below and design REAL software structure.

IMPORTANT:
- This is NOT a summary
- This is NOT explanation
- This is a BUILD PLAN for real code generation

OUTPUT FORMAT:
- files (list)
- features
- dependencies
- architecture

PROJECT SPEC:
${state.memory}
`;

  const res = await callOpenRouter(prompt);

  return {
    ...state,
    context: {
      plan: res
    }
  };
};
