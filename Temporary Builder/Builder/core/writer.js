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
