module.exports = async function planner(state) {
  console.log("🧠 PLANNER START");

  const plan = {
    goal: "Build project from convo.md and convo2.md",
    steps: [
      "analyze input",
      "generate files",
      "validate output",
      "fix issues if any"
    ]
  };

  state.context.plan = plan;

  console.log("🧠 PLAN CREATED");
  return state;
};
