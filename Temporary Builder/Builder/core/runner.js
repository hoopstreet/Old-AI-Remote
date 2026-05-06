const DAG = require("../dag");
const planner = require("../agents/planner");
const coder = require("../agents/coder");
const reviewer = require("../agents/reviewer");
const fixer = require("../agents/fixer");
const critic = require("../agents/critic");

const { loadMemory } = require("./memory");
const { writeFiles } = require("./writer");

(async () => {
  console.log("🚀 MEMORY → ROOT DAG START");

  let state = {
    memory: loadMemory(),
    context: {}
  };

  const dag = new DAG();

  dag.add("planner", async () => planner(state));
  const dag = new DAG();
  dag.add("planner", async () => planner(state));
  dag.add("coder", async () => coder(state), ["planner"]);
  dag.add("reviewer", async () => reviewer(state), ["coder"]);
  dag.add("critic", async () => critic(state), ["reviewer"]);
  dag.add("fixer", async () => fixer(state), ["critic"]);

  try {
    state = await dag.run();
  } catch (e) {
    console.log("❌ DAG ERROR:", e.message);
  }

  writeFiles(state?.context?.files || []);

  console.log("✅ ROOT GENERATION COMPLETE FROM MEMORY");
})();
