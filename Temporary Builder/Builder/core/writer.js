const fs = require("fs");

function writeFiles(files = []) {
  if (!Array.isArray(files)) {
    console.log("❌ NO VALID FILE ARRAY → SKIP WRITING");
    return;
  }

  if (files.length === 0) {
    console.log("⚠️ NO FILES GENERATED → NOTHING TO WRITE");
    return;
  }

  for (const f of files) {
    if (!f || !f.path || !f.content) continue;

    console.log("🧠 CREATED:", f.path);
    fs.writeFileSync(f.path, f.content, "utf8");
  }
}

module.exports = { writeFiles };
