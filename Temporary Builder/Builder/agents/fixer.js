module.exports = async function fixer(state) {
  console.log("🛠 FIXER AGENT");

  if (state.context.needsFix) {
    state.context.files = [{
      path: "app.js",
      content: "console.log('auto-fixed output');"
    }];
  }

  return state;
};
