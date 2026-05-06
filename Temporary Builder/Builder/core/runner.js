const DAG = require("../dag");
const planner = require("../agents/planner");
const coder = require("../agents/coder");
const reviewer = require("../agents/reviewer");
const critic = require("../agents/critic");
const fixer = require("../agents/fixer");

const fs = require("fs");

function loadMemory() {
  return fs.readFileSync("Temporary Builder/memory/convo.md", "utf8") +
         fs.readFileSync("Temporary Builder/memory/convo2.md", "utf8");
}

function writeFiles(files) {
  for (const f of files || []) {
    fs.writeFileSync(f.path, f.content);
    console.log("🧠 CREATED:", f.path);
  }
}

(async () => {
  console.log("🚀 REAL OPENROUTER DAG START");

  let state = { memory: loadMemory(), context: {} };

  const dag = new DAG();

  dag.add("planner", async () => planner(state));
  dag.add("coder", async () => coder(state), ["planner"]);
  dag.add("reviewer", async () => reviewer(state), ["coder"]);
  dag.add("critic", async () => critic(state), ["reviewer"]);
  dag.add("fixer", async () => fixer(state), ["critic"]);

  state = await dag.run();

  writeFiles(state.context.files);

  console.log("✅ REAL AI GENERATION COMPLETE");
})();
