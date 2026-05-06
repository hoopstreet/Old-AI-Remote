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
    const state = {
      memory: loadMemory(),
      context: {}
    };

    const dag = new DAG();

    dag.add("planner", async () => planner(state));
    dag.add("coder", async (s) => coder(s), ["planner"]);
    dag.add("reviewer", async (s) => reviewer(s), ["coder"]);
    dag.add("critic", async (s) => critic(s), ["reviewer"]);
    dag.add("fixer", async (s) => fixer(s), ["critic"]);

    const result = await dag.run();

    if (!result?.context?.files?.length) {
      console.log("❌ NO FILES GENERATED FROM AI");
      return;
    }

    writeFiles(result.memory, result.context.files);

    console.log("✅ ROOT GENERATED SUCCESSFULLY");

  } catch (err) {
    console.log("❌ DAG CRASH:", err.message);
  }
})();
