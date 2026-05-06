const DAG = require("./dag");
const { loadMemory } = require("./memory");
const { writeFiles } = require("./writer");

const planner = require("../agents/planner");
const coder = require("../agents/coder");
const reviewer = require("../agents/reviewer");
const critic = require("../agents/critic");
const fixer = require("../agents/fixer");

(async () => {
  console.log("🚀 MEMORY → ROOT GENERATION START");

  try {

    const baseState = {
      memory: loadMemory(),
      context: {}
    };

    const dag = new DAG();

    dag.add("planner", async () => planner(baseState));
    dag.add("coder", async () => coder(baseState), ["planner"]);
    dag.add("reviewer", async () => reviewer(baseState), ["coder"]);
    dag.add("critic", async () => critic(baseState), ["reviewer"]);
    dag.add("fixer", async () => fixer(baseState), ["critic"]);

    const state = await dag.run();

    if (!state.context.files || state.context.files.length === 0) {
      console.log("⚠️ NO FILE OUTPUT FROM AI");
      return;
    }

    writeFiles(state.memory, state.context.files);

    console.log("✅ ROOT GENERATED SUCCESSFULLY");

  } catch (err) {
    console.log("❌ DAG CRASH:", err.message);
  }
})();
