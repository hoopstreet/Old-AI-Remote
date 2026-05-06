const fs = require("fs");

function loadMemory() {
  const convoPath = "Temporary Builder/memory/convo.md";
  const convo2Path = "Temporary Builder/memory/convo2.md";

  const convo = fs.existsSync(convoPath)
    ? fs.readFileSync(convoPath, "utf8")
    : "";

  const convo2 = fs.existsSync(convo2Path)
    ? fs.readFileSync(convo2Path, "utf8")
    : "";

  return `
=== CONVO.md (SOURCE OF TRUTH) ===
${convo}

=== CONVO2.md (FINAL INSTRUCTIONS) ===
${convo2}
`;
}

module.exports = { loadMemory };
