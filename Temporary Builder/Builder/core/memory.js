const fs = require("fs");

function loadMemory() {
  const c1 = fs.readFileSync("Temporary Builder/memory/convo.md", "utf8");
  const c2 = fs.readFileSync("Temporary Builder/memory/convo2.md", "utf8");

  return `
=== CONVO.md (PRIMARY) ===
${c1}

=== CONVO2.md (FINAL SPEC) ===
${c2}
`;
}

module.exports = { loadMemory };
