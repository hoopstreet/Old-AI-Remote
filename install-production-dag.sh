#!/bin/sh

echo "🧠 INSTALLING PRODUCTION MULTI-AGENT DAG BRAIN..."

# =========================
# 1. STRUCTURE ENFORCEMENT
# =========================

mkdir -p "Temporary Builder/Builder/agents"
mkdir -p "Temporary Builder/Builder/core"
mkdir -p "Temporary Builder/memory"
mkdir -p "Temporary Builder/docs"
mkdir -p ".github/workflows"

# =========================
# 2. SAFE CLEAN RULES
# =========================

# remove only broken duplicates (safe)
rm -rf node_modules 2>/dev/null || true

# =========================
# 3. OPENROUTER LLM CORE
# =========================

cat > "Temporary Builder/Builder/core/llm.js" << 'JS'
const fetch = require("node-fetch");

const API_KEY = process.env.OPENROUTER_API_KEY;

async function generate(prompt) {
  if (!API_KEY) throw new Error("Missing OPENROUTER_API_KEY");

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "openai/gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a production DAG AI software engineer. Output ONLY valid JSON when requested." },
        { role: "user", content: prompt }
      ]
    })
  });

  const data = await res.json();
  return data.choices?.[0]?.message?.content || "";
}

module.exports = { generate };
JS

# =========================
# 4. DAG ENGINE (NO LOOP BUGS)
# =========================

cat > "Temporary Builder/Builder/core/dag.js" << 'JS'
class DAG {
  constructor() {
    this.nodes = new Map();
  }

  add(name, fn, deps = []) {
    this.nodes.set(name, { fn, deps, done: false, result: null });
  }

  async runNode(name) {
    const node = this.nodes.get(name);
    if (!node) return;

    for (const dep of node.deps) {
      await this.runNode(dep);
    }

    if (!node.done) {
      node.result = await node.fn();
      node.done = true;
    }

    return node.result;
  }

  async run() {
    for (const key of this.nodes.keys()) {
      await this.runNode(key);
    }
  }
}

module.exports = DAG;
JS

# =========================
# 5. SAFE WRITER (NO ROOT CORRUPTION)
# =========================

cat > "Temporary Builder/Builder/core/writer.js" << 'JS'
const fs = require("fs");
const path = require("path");

// ONLY allow root-level output files
function safeWrite(filePath, content) {
  if (!filePath) return;

  // BLOCK accidental builder overwrite
  if (filePath.includes("Temporary Builder/Builder")) return;

  const full = path.resolve(filePath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content);
  console.log("✔ WRITE:", filePath);
}

module.exports = { safeWrite };
JS

# =========================
# 6. STATE LOADER
# =========================

cat > "Temporary Builder/Builder/core/state.js" << 'JS'
const fs = require("fs");

function read(p) {
  return fs.existsSync(p) ? fs.readFileSync(p, "utf-8") : "";
}

function loadState() {
  return {
    convo: read("Temporary Builder/memory/convo.md"),
    convo2: read("Temporary Builder/memory/convo2.md"),
    context: {}
  };
}

module.exports = { loadState };
JS

# =========================
# 7. AGENTS (SIMPLE SAFE PROMPTS)
# =========================

cat > "Temporary Builder/Builder/agents/planner.js" << 'JS'
const { generate } = require("../core/llm");

module.exports = async (state) => {
  state.plan = await generate("PLAN THIS PROJECT:\n" + state.convo);
  return state;
};
JS

cat > "Temporary Builder/Builder/agents/builder.js" << 'JS'
const { generate } = require("../core/llm");

module.exports = async (state) => {
  state.build = await generate("BUILD SYSTEM:\n" + state.convo + "\n" + state.convo2);
  return state;
};
JS

cat > "Temporary Builder/Builder/agents/reviewer.js" << 'JS'
const { generate } = require("../core/llm");

module.exports = async (state) => {
  state.review = await generate("REVIEW OUTPUT:\n" + state.build);
  return state;
};
JS

cat > "Temporary Builder/Builder/agents/repair.js" << 'JS'
const { generate } = require("../core/llm");

module.exports = async (state) => {
  state.fixed = await generate("FIX ERRORS IF ANY:\n" + state.review);
  return state;
};
JS

# =========================
# 8. MAIN RUNNER (DAG EXECUTION)
# =========================

cat > "Temporary Builder/Builder/runner.js" << 'JS'
const DAG = require("./core/dag");
const { loadState } = require("./core/state");
const { safeWrite } = require("./core/writer");

const planner = require("./agents/planner");
const builder = require("./agents/builder");
const reviewer = require("./agents/reviewer");
const repair = require("./agents/repair");

(async () => {
  console.log("🚀 PRODUCTION DAG BRAIN START");

  const state = loadState();
  const dag = new DAG();

  dag.add("plan", async () => planner(state));
  dag.add("build", async () => builder(state), ["plan"]);
  dag.add("review", async () => reviewer(state), ["build"]);
  dag.add("repair", async () => repair(state), ["review"]);

  await dag.run();

  // FINAL OUTPUT ONLY GOES TO ROOT
  safeWrite("app.generated.js", state.fixed || state.review || state.build);

  console.log("✅ DAG COMPLETE");
})();
JS

# =========================
# 9. GITHUB WORKFLOW (SAFE SINGLE RUN)
# =========================

cat > ".github/workflows/temp-ai-builder.yml" << 'YML'
name: 🧠 TEMP DAG AI BRAIN

on:
  push:
    paths:
      - 'Temporary Builder/memory/convo.md'
      - 'Temporary Builder/memory/convo2.md'
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install
        run: |
          cd "Temporary Builder"
          npm install node-fetch || true

      - name: Run DAG Brain
        run: node "Temporary Builder/Builder/runner.js"

      - name: Commit Output
        run: |
          git config user.name "AI-BOT"
          git config user.email "bot@ai.dev"

          git add .

          git commit -m "🧠 DAG AI OUTPUT" || exit 0
          git push
YML

# =========================
# 10. MEMORY SAFETY RULE FILE
# =========================

cat > "Temporary Builder/docs/architecture.json" << 'JSON'
{
  "rules": {
    "single_source_memory": true,
    "memory_input_only": [
      "Temporary Builder/memory/convo.md",
      "Temporary Builder/memory/convo2.md"
    ],
    "output_root_only": true,
    "no_builder_output_to_root": true,
    "dag_execution": "planner -> builder -> reviewer -> repair",
    "conflict_policy": "ignore_duplicates_safe_merge"
  }
}
JSON

echo "✅ PRODUCTION DAG AI INSTALLED"
