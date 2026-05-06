const DAG = require("../dag");

const planner = require("../agents/planner");
const coder = require("../agents/coder");
const reviewer = require("../agents/reviewer");
const critic = require("../agents/critic");
const fixer = require("../agents/fixer");

const { loadMemory } = require("./memory");
const { writeFiles } = require("./writer");
const { safeState } = require("./state");

process.on("unhandledRejection", (e) => {
  console.log("⚠️ HANDLED REJECTION:", e.message);
});

(async () => {
  console.log("🚀 CONTRACT-BASED AI DAG START");

  let state = safeState({
    memory: loadMemory(),
    context: {}
  });

  const dag = new DAG();

  dag.add("planner", async () => {
    state = await planner(state);
    state = safeState(state);
    return state;
  });

  dag.add("coder", async () => {
    state = await coder(state);
    state = safeState(state);
    return state;
  }, ["planner"]);

  dag.add("reviewer", async () => {
    state = await reviewer(state);
    state = safeState(state);
    return state;
  }, ["coder"]);

  dag.add("critic", async () => {
    state = await critic(state);
    state = safeState(state);
    return state;
  }, ["reviewer"]);

  dag.add("fixer", async () => {
    state = await fixer(state);
    state = safeState(state);
    return state;
  }, ["critic"]);

  state = await dag.run();

  writeFiles(state.memory, state.context.files || []);

  console.log("✅ CONTRACT DAG COMPLETE");
})();
