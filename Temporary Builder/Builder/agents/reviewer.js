module.exports = async function reviewer(state) {
  console.log("🔍 REVIEWER AGENT");

  if (!state.context.files || state.context.files.length === 0) {
    state.context.needsFix = true;
  }

  return state;
};
