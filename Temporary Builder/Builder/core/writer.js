const fs = require("fs");

function writeFiles(files) {
  if (!Array.isArray(files)) {
    console.log("⚠️ No valid files array → skip writing");
    return;
  }

  for (const f of files) {
    if (!f?.path || !f?.content) continue;

    console.log("🧠 CREATED:", f.path);
    fs.writeFileSync(f.path, f.content);
  }
}

module.exports = { writeFiles };
