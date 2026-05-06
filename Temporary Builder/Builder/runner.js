const DAG = require("./dag");
const planner = require("./agents/planner");
const coder = require("./agents/coder");
const reviewer = require("./agents/reviewer");
const fixer = require("./agents/fixer");
const critic = require("./agents/critic");

const { loadMemory, addMemory } = require("./memory");
const { snapshot, restore } = require("./rollback");
const fs = require("fs");

function writeFiles(files) {
  for (const f of files || []) {
    fs.writeFileSync(f.path, f.content);
  }
}

(async () => {
  console.log("🚀 PRODUCTION DAG SWARM START");

  let state = { memory: loadMemory(), context: {} };

  snapshot(state);

  try {
    const dag = new DAG();

    dag.add("planner", async () => planner(state));
    dag.add("coder", async () => coder(state), ["planner"]);
    dag.add("reviewer", async () => reviewer(state), ["coder"]);
    dag.add("critic", async () => critic(state), ["reviewer"]);
    dag.add("fixer", async () => fixer(state), ["critic"]);

    state = await dag.run();

    if (state.context.failed) {
      console.log("🔁 FAILURE DETECTED → ROLLBACK");
      state = restore();
    }

    writeFiles(state.context.files);

    addMemory({ event: "execution_complete" });

    console.log("✅ DAG COMPLETE");
  } catch (e) {
    console.log("💥 CRASH → ROLLBACK ACTIVE");
    state = restore();
  }
})();
