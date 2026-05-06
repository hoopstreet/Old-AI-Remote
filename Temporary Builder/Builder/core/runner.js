const DAG = require("../dag");
const planner = require("../agents/planner");
const coder = require("../agents/coder");
const reviewer = require("../agents/reviewer");
const fixer = require("../agents/fixer");
const critic = require("../agents/critic");

const { loadMemory } = require("./memory");
const { writeFiles } = require("./writer");

function safeFiles(files) {
  if (!Array.isArray(files)) return [];

  return files.filter(f => {
    return (
      f &&
      typeof f.path === "string" &&
      typeof f.content === "string" &&
      f.path.length > 0 &&
      f.content.length > 0
    );
  });
}

function isAllowedByMemory(filePath, memory) {
  // STRICT RULE:
  // file must be explicitly mentioned in convo.md OR convo2.md
  return memory.includes(filePath);
}

(async () => {
  console.log("🚀 MEMORY → ROOT STRICT GENERATION START");

  const memory = loadMemory();

  let state = { memory, context: {} };

  try {
    const dag = new DAG();

    dag.add("planner", async () => planner(state));
    dag.add("coder", async () => coder(state), ["planner"]);
    dag.add("reviewer", async () => reviewer(state), ["coder"]);
    dag.add("critic", async () => critic(state), ["reviewer"]);
    dag.add("fixer", async () => fixer(state), ["critic"]);

    state = await dag.run();

    const rawFiles = state?.context?.files;

    const safe = safeFiles(rawFiles)
      .filter(f => isAllowedByMemory(f.path, memory));

    if (!safe.length) {
      console.log("⚠️ NO VALID FILES IN MEMORY SPEC → NOTHING GENERATED");
      process.exit(0);
    }

    writeFiles(memory, safe);

    console.log("✅ ROOT GENERATED STRICTLY FROM MEMORY ONLY");
  } catch (err) {
    console.log("❌ DAG FAILED SAFELY:", err.message);
    process.exit(1);
  }
})();
