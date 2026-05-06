const fs = require("fs");

function writeFiles(memory, files) {
  for (const f of files) {
    if (!f?.path || !f?.content) continue;

    console.log("🧠 CREATING:", f.path);

    fs.writeFileSync(f.path, f.content, "utf8");
  }
}

module.exports = { writeFiles };
