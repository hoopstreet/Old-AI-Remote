const { generate } = require("../core/llm");

module.exports = async (state) => {
  state.build = await generate("BUILD SYSTEM:\n" + state.convo + "\n" + state.convo2);
  return state;
};
