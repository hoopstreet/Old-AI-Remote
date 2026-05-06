const fs = require("fs");

function loadMemory() {
  const convo = fs.readFileSync("Temporary Builder/memory/convo.md", "utf8");
  const convo2 = fs.readFileSync("Temporary Builder/memory/convo2.md", "utf8");

  return {
    raw: `
=== CONVO.md (PRIMARY) ===
${convo}

=== CONVO2.md (FINAL SPEC) ===
${convo2}
`
  };
}

module.exports = { loadMemory };
