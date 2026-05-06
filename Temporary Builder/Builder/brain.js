const fs = require("fs");

function read(file) {
  return fs.existsSync(file)
    ? fs.readFileSync(file, "utf-8")
    : "";
}

async function runBrain() {
  const entry = read("Temporary Builder/memory/convo.md");
  const final = read("Temporary Builder/memory/convo2.md");

  // SAFE STATIC OUTPUT (NO API CRASHES)
  return {
    files: [
      {
        path: "README.md",
        content: "# 🚀 ROOT PROJECT\n\nENTRY:\n" + entry
      },
      {
        path: "docs/project-summary.md",
        content: "# FINAL SPEC\n\n" + final
      },
      {
        path: "Temporary Builder/docs/summary.md",
        content: "# BUILD SUCCESS (SAFE MODE)"
      }
    ]
  };
}

module.exports = { runBrain };
