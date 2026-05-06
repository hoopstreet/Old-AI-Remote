const { callOpenRouter } = require("../core/llm");

module.exports = async function fixer(state) {
  if (state.context.failed) {
    const prompt = `
Fix this broken output:

${JSON.stringify(state.context.files)}
`;

    const res = await callOpenRouter(prompt);

    state.context.files = JSON.parse(res);
  }

  return state;
};
