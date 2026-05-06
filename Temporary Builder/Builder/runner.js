const DAG = require("./dag");

const planner = require("./agents/planner");
const coder = require("./agents/coder");
const reviewer = require("./agents/reviewer");
const fixer = require("./agents/fixer");
const critic = require("./agents/critic");

const { loadMemory, addMemory } = require("./memory");
const { snapshot, restore } = require("./rollback");

const fs = require("fs");

/**
 * SAFE FILE WRITER
 */
function writeFiles(files) {
  if (!files || !Array.isArray(files)) {
    console.log("⚠️ No files to write");
    return;
  }

  for (const f of files) {
    try {
      if (!f?.path || !f?.content) continue;
      fs.mkdirSync(require("path").dirname(f.path), { recursive: true });
      fs.writeFileSync(f.path, f.content, "utf8");
      console.log("✍️ wrote:", f.path);
    } catch (err) {
      console.log("❌ write failed:", f.path);
    }
  }
}

(async () => {
  console.log("🚀 PRODUCTION DAG SWARM START");

  // -------------------------
  // INIT STATE
  // -------------------------
  let state = {
    memory: loadMemory(),
    context: {
      files: [],
      failed: false,
    },
  };

  // snapshot BEFORE execution
  snapshot(state);

  try {
    const dag = new DAG();

    // -------------------------
    // AGENTS PIPELINE
    // -------------------------
    dag.add("planner", async () => {
      const res = await planner(state);
      state.context.plan = res;
      return state;
    });

    dag.add(
      "coder",
      async () => {
        const res = await coder(state);
        state.context.files = res?.files || [];
        return state;
      },
      ["planner"]
    );

    dag.add(
      "reviewer",
      async () => {
        const res = await reviewer(state);
        state.context.review = res;
        return state;
      },
      ["coder"]
    );

    dag.add(
      "critic",
      async () => {
        const res = await critic(state);

        if (res?.failed) {
          state.context.failed = true;
        }

        return state;
      },
      ["reviewer"]
    );

    dag.add(
      "fixer",
      async () => {
        const res = await fixer(state);

        if (res?.files) {
          state.context.files = res.files;
        }

        return state;
      },
      ["critic"]
    );

    // -------------------------
    // RUN DAG
    // -------------------------
    state = await dag.run(state);

    // -------------------------
    // FAILURE HANDLING
    // -------------------------
    if (state?.context?.failed) {
      console.log("🔁 FAILURE DETECTED → RESTORE SNAPSHOT");
      state = restore();
    }

    // -------------------------
    // WRITE OUTPUT FILES
    // -------------------------
    writeFiles(state?.context?.files);

    // -------------------------
    // MEMORY UPDATE
    // -------------------------
    addMemory({
      event: "execution_complete",
      timestamp: Date.now(),
    });

    console.log("✅ DAG COMPLETE SUCCESSFULLY");
  } catch (e) {
    console.log("💥 CRASH DETECTED → ROLLBACK");
    console.error(e);

    state = restore();
  }
})();
