const DAG = require("./core/dag");
const { loadState } = require("./core/state");
const { safeWrite } = require("./core/writer");

const planner = require("./agents/planner");
const builder = require("./agents/builder");
const reviewer = require("./agents/reviewer");
const repair = require("./agents/repair");

(async () => {
  console.log("🚀 PRODUCTION DAG BRAIN START");

  const state = loadState();
  const dag = new DAG();

  dag.add("plan", async () => planner(state));
  dag.add("build", async () => builder(state), ["plan"]);
  dag.add("review", async () => reviewer(state), ["build"]);
  dag.add("repair", async () => repair(state), ["review"]);

  await dag.run();

  // FINAL OUTPUT ONLY GOES TO ROOT
  safeWrite("app.generated.js", state.fixed || state.review || state.build);

  console.log("✅ DAG COMPLETE");
})();
