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
    const initialState = {
      memory: loadMemory(),
      context: {}
    };

    const dag = new DAG();

    dag.add("planner", async (state) => {
      if (!state) throw new Error("Planner received invalid state");
      return planner(state);
    });

    dag.add("coder", async (state) => coder(state), ["planner"]);
    dag.add("reviewer", async (state) => reviewer(state), ["coder"]);
    dag.add("critic", async (state) => critic(state), ["reviewer"]);
    dag.add("fixer", async (state) => fixer(state), ["critic"]);

    const result = await dag.run(initialState);

    console.log("📦 FINAL STATE:", JSON.stringify(result?.context, null, 2));

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
