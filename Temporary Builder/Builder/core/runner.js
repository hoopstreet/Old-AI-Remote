const DAG = require("./dag");
const planner = require("../agents/planner");
const coder = require("../agents/coder");
const reviewer = require("../agents/reviewer");
const fixer = require("../agents/fixer");
const critic = require("../agents/critic");

const { loadMemory } = require("./memory");
const { writeFiles } = require("./writer");

process.on("unhandledRejection", (e) => {
  console.log("⚠️ HANDLED REJECTION:", e.message);
});

(async () => {
  console.log("🚀 MEMORY → ROOT GENERATION START");

  let memory;
  try {
    memory = loadMemory();
  } catch (e) {
    console.log("❌ NO MEMORY FOUND → STOP");
    return;
  }

  let state = { memory, context: {} };

  const dag = new DAG();

  dag.add("planner", async () => planner(state));
  dag.add("coder", async () => coder(state), ["planner"]);
  dag.add("reviewer", async () => reviewer(state), ["coder"]);
  dag.add("critic", async () => critic(state), ["reviewer"]);
  dag.add("fixer", async () => fixer(state), ["critic"]);

  try {
    state = await dag.run();

    const files = state?.context?.files;

    if (!files) {
      console.log("⚠️ NO FILE OUTPUT FROM AI → SKIP ROOT WRITE");
      return;
    }

    writeFiles(files);

    console.log("✅ ROOT GENERATED FROM MEMORY ONLY");
  } catch (e) {
    console.log("❌ DAG FAILED:", e.message);
  }
})();
