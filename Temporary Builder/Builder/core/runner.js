const DAG = require("../dag");
const { loadMemory } = require("./memory");
const { writeFiles } = require("./writer");

const planner = require("../agents/planner");
const coder = require("../agents/coder");
const reviewer = require("../agents/reviewer");
const critic = require("../agents/critic");
const fixer = require("../agents/fixer");

process.on("unhandledRejection", (e) => {
  console.log("⚠️ HANDLED REJECTION:", e.message);
});

(async () => {
  console.log("🚀 MEMORY → ROOT GENERATION START");

  const memory = loadMemory();

  if (!memory || !memory.raw.includes("convo")) {
    console.log("❌ NO MEMORY FOUND → STOP");
    return;
  }

  let state = { memory, context: {} };

  const dag = new DAG();

  dag.add("planner", async () => planner(state));

  dag.add("coder", async () => {
    if (!state.context.plan) {
      console.log("❌ NO PLAN → SKIP CODER");
      return state;
    }
    return coder(state);
  }, ["planner"]);

  dag.add("reviewer", async () => {
    if (!state.context.files) {
      console.log("⚠️ NO FILES → SKIP REVIEW");
      return state;
    }
    return reviewer(state);
  }, ["coder"]);

  dag.add("critic", async () => state.context.files ? critic(state) : state, ["reviewer"]);

  dag.add("fixer", async () => state.context.files ? fixer(state) : state, ["critic"]);

  try {
    state = await dag.run();
  } catch (e) {
    console.log("❌ DAG FAILED:", e.message);
    return;
  }

  if (!state || !state.context || !state.context.files) {
    console.log("⚠️ NO VALID OUTPUT → NOTHING GENERATED (SAFE MODE)");
    return;
  }

  writeFiles(state.context.files);

  console.log("✅ MEMORY → ROOT COMPLETE");
})();
