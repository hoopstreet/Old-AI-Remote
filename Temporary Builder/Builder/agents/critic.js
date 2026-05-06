const { callOpenRouter } = require("../core/llm");

module.exports = async function critic(state) {
  if (state.context.review && state.context.review.includes("error")) {
    state.context.failed = true;
  }
  return state;
};
