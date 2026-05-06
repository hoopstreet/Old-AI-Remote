const DAG = require("../dag");
const planner = require("../agents/planner");
const coder = require("../agents/coder");
const reviewer = require("../agents/reviewer");
const critic = require("../agents/critic");
const fixer = require("../agents/fixer");

const { loadMemory } = require("./memory");
const { writeFiles } = require("./writer");

process.on("unhandledRejection", (e) => {
  console.log("⚠️ HANDLED REJECTION:", e.message);
});

(async () => {
  console.log("🚀 STABLE AI DAG START");

  const memory = loadMemory();

  let state = { memory, context: {} };

  const dag = new DAG();

  dag.add("planner", async () => planner(state));
  dag.add("coder", async () => coder(state), ["planner"]);
  dag.add("reviewer", async () => reviewer(state), ["coder"]);
  dag.add("critic", async (s) => critic(s), ["reviewer"]);
  dag.add("fixer", async (s) => fixer(s), ["critic"]);

  state = await dag.run();

  writeFiles(state.memory, state.context.files || []);

  console.log("✅ STABLE GENERATION COMPLETE");
})();
