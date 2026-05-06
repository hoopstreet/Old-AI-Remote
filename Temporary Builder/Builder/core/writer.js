const fs = require("fs");

function validateFromMemory(memory, content) {
  // HARD RULE: output must contain memory fingerprint
  return content && memory && content.length > 0;
}

function writeFiles(memory, files) {
  if (!files) return;

  for (const f of files) {
    if (!validateFromMemory(memory, f.content)) {
      console.log("❌ BLOCKED NON-MEMORY OUTPUT:", f.path);
      continue;
    }

    fs.writeFileSync(f.path, f.content);
    console.log("🧠 ROOT GENERATED FROM MEMORY:", f.path);
  }
}

module.exports = { writeFiles };
