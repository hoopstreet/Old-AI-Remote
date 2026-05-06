module.exports = async function planner(state) {
  console.log("🧠 PLANNER AGENT");

  state.context.plan = {
    goal: "Generate structured project from convo memory",
    steps: ["analyze", "build", "review", "fix"]
  };

  return state;
};
