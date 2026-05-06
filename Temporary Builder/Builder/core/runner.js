const DAG = require("../dag");
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

  const memory = loadMemory();

  // 🔥 HARD RULE: empty output unless memory explicitly defines files
  let state = {
    memory,
    context: {
      files: []
    }
  };

  const dag = new DAG();

  dag.add("planner", async () => planner(state));
  dag.add("coder", async () => coder(state), ["planner"]);
  dag.add("reviewer", async () => reviewer(state), ["coder"]);
  dag.add("critic", async (s) => critic(s), ["reviewer"]);
  dag.add("fixer", async (s) => fixer(s), ["critic"]);

  state = await dag.run();

  // 🧠 STRICT FILTER: only allow valid file output
  const files = Array.isArray(state?.context?.files)
    ? state.context.files.filter(f => f && f.path && f.content)
    : [];

  if (files.length === 0) {
    console.log("⚠️ NO VALID FILES IN MEMORY → NOTHING GENERATED");
    console.log("🧠 SYSTEM FOLLOWING convo.md RULES STRICTLY");
    return;
  }

  console.log("📦 GENERATING ROOT FILES FROM MEMORY ONLY");

  writeFiles(memory, files);

  console.log("✅ ROOT GENERATION COMPLETE (MEMORY-DRIVEN ONLY)");
})();
