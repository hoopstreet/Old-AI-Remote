const { generate } = require("../core/llm");

module.exports = async (state) => {
  state.review = await generate("REVIEW OUTPUT:\n" + state.build);
  return state;
};
