const fs = require("fs");

function writeFiles(memory, files) {
  for (const f of files || []) {
    if (!f.path) continue;

    console.log("🧠 CREATED:", f.path);

    fs.writeFileSync(f.path, f.content || "");
  }
}

module.exports = { writeFiles };
