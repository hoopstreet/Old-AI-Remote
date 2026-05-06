const fs = require("fs");
const path = require("path");

function writeFiles(files = []) {
  files.forEach(f => {
    const full = path.join(process.cwd(), f.path);
    fs.mkdirSync(path.dirname(full), { recursive: true });
    fs.writeFileSync(full, f.content || "");
    console.log("✔ Wrote:", f.path);
  });
}

module.exports = { writeFiles };
