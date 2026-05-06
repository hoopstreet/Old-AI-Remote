const fs = require("fs");

function loadMemory() {
  const convo = fs.readFileSync("Temporary Builder/memory/convo.md", "utf8");
  const convo2 = fs.readFileSync("Temporary Builder/memory/convo2.md", "utf8");

  if (!convo && !convo2) {
    throw new Error("NO MEMORY FOUND");
  }

  return `
# MEMORY SOURCE (STRICT)
## convo.md
${convo}

## convo2.md
${convo2}

RULE:
Only generate code if explicitly described in memory.
If no project is defined → return empty array.
`;
}

module.exports = { loadMemory };
