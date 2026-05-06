const fs = require("fs");

function read(p) {
  try { return fs.readFileSync(p, "utf-8"); }
  catch { return ""; }
}

// 🧠 ENTRY AGENT
function entryAgent() {
  return read("Temporary Builder/memory/convo.md");
}

// 🧠 FINAL AGENT
function finalAgent() {
  return read("Temporary Builder/memory/convo2.md");
}

// 🧠 DEBUG AGENT
function debugAgent(files) {
  return files.filter(f => f && f.path && f.content);
}

// 🧠 REFACTOR AGENT (safe clean)
function refactorAgent(files) {
  return files.map(f => ({
    path: f.path,
    content: (f.content || "").trim()
  }));
}

// 🧠 MAIN BRAIN
async function runBrain() {

  const entry = entryAgent();
  const final = finalAgent();

  // BASE GENERATION (safe structure only)
  let files = [
    {
      path: "README.md",
      content: "# 🚀 PROJECT ROOT\n\nENTRY:\n" + entry
    },
    {
      path: "docs/project.md",
      content: "# FINAL SPEC\n\n" + final
    },
    {
      path: "Temporary Builder/docs/status.md",
      content: "# V3 SYSTEM ACTIVE\nMulti-Agent Brain Running"
    }
  ];

  // DEBUG CHECK
  files = debugAgent(files);

  // REFACTOR CLEAN
  files = refactorAgent(files);

  return { files };
}

module.exports = { runBrain };
