const fs = require("fs");

function read(file) {
  return fs.existsSync(file)
    ? fs.readFileSync(file, "utf-8")
    : "";
}

async function runSwarm() {
  const entry = read("Temporary Builder/memory/convo.md");
  const final = read("Temporary Builder/memory/convo2.md");

  // SAFE STATIC OUTPUT (NO API CRASH)
  return {
    files: [
      {
        path: "README.md",
        content: "# 🚀 AUTO GENERATED PROJECT\n\nENTRY:\n" + entry
      },
      {
        path: "docs/project.md",
        content: "# FINAL SPEC\n" + final
      },
      {
        path: "docs/tools-credentials.md",
        content: "# CREDENTIALS GUIDE\n- OPENROUTER_API_KEY required in GitHub Secrets\n"
      }
    ]
  };
}

module.exports = { runSwarm };
