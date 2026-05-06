const { generate } = require("../core/llm");

module.exports = async (state) => {
  state.plan = await generate("PLAN THIS PROJECT:\n" + state.convo);
  return state;
};
