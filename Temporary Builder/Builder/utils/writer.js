const fs = require("fs");
const path = require("path");

function writeFiles(files = []) {
  files.forEach(f => {
    if (!f.path) return;

    // 🚫 PREVENT writing inside Temporary Builder
    if (f.path.startsWith("Temporary Builder")) {
      console.log("⚠️ Skipped (protected path):", f.path);
      return;
    }

    const full = path.join(process.cwd(), f.path);

    fs.mkdirSync(path.dirname(full), { recursive: true });
    fs.writeFileSync(full, f.content || "");

    console.log("✔ GENERATED:", f.path);
  });
}

module.exports = { writeFiles };
