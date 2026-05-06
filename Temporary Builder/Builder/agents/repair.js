const { generate } = require("../core/llm");

module.exports = async (state) => {
  state.fixed = await generate("FIX ERRORS IF ANY:\n" + state.review);
  return state;
};
