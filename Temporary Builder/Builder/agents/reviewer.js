const { callOpenRouter } = require("../core/llm");

module.exports = async function reviewer(state) {
  const prompt = `
You are Reviewer AI.
Check this code:

${JSON.stringify(state.context.files)}

Return OK or FIX suggestions.
`;

  const res = await callOpenRouter(prompt);

  return {
    ...state,
    context: { ...state.context, review: res }
  };
};
