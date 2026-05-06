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
    dag.add("coder", async () => coder(state), ["planner"]);
    dag.add("reviewer", async (s) => reviewer(s), ["coder"]);
    dag.add("critic", async (s) => critic(s), ["reviewer"]);
    dag.add("fixer", async (s) => fixer(s), ["critic"]);

    const result = await dag.run();

    console.log("📦 FINAL STATE:", JSON.stringify(result, null, 2));

    const files = result?.context?.files;

    if (!Array.isArray(files) || files.length === 0) {
      console.log("❌ NO FILES GENERATED");
      return;
    }

    writeFiles(result.memory, files);

    console.log("✅ ROOT GENERATED SUCCESSFULLY");

  } catch (err) {
    console.log("❌ DAG CRASH:", err.message);
  }
})();
