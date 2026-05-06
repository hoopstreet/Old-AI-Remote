const fs = require("fs");

function read(p) {
  try {
    return fs.readFileSync(p, "utf-8");
  } catch {
    return "";
  }
}

async function runBrain() {
  const entry = read("Temporary Builder/memory/convo.md");
  const final = read("Temporary Builder/memory/convo2.md");

  return {
    files: [
      {
        path: "README.md",
        content: "# 🚀 ROOT PROJECT\n\nENTRY:\n" + entry
      },
      {
        path: "docs/project.md",
        content: "# FINAL PROJECT\n\n" + final
      },
      {
        path: "Temporary Builder/docs/status.md",
        content: "# SYSTEM OK\nSAFE MODE ACTIVE"
      }
    ]
  };
}

module.exports = { runBrain };
