module.exports = async function critic(state) {
  console.log("⚠️ CRITIC AGENT");

  if (!state.context.files || state.context.files.length === 0) {
    state.context.failed = true;
  }

  return state;
};
