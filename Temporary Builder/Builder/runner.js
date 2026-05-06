const { loadState } = require("./core/state");
const writeFiles = require("./core/writer");

const planner = require("./agents/planner");
const builder = require("./agents/builder");
const reviewer = require("./agents/reviewer");
const repair = require("./agents/repair");

(async () => {
  console.log("🚀 MULTI-AGENT DEVOPS START");

  let state = loadState();

  state = await planner(state);
  state = await builder(state);
  state = await reviewer(state);
  state = await repair(state);

  writeFiles(state.context.files);

  console.log("✅ BUILD COMPLETE");
})();
