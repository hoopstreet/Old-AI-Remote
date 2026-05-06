module.exports = async function selfHeal(state, error) {
  console.log("🛠 SELF-HEALING TRIGGERED");

  if (!state.context) state.context = {};
  if (!state.context.errors) state.context.errors = [];

  state.context.errors.push({
    time: new Date().toISOString(),
    error: error?.message || String(error)
  });

  // basic auto-recovery fallback
  if (!state.context.files) {
    state.context.files = [{
      path: "app.js",
      content: "console.log('auto-recovered build');"
    }];
  }

  return state;
};
