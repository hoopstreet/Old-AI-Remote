const fs = require("fs");

function writeFiles(memory, files) {
  if (!Array.isArray(files)) {
    console.log("❌ INVALID FILES INPUT");
    return;
  }

  for (const f of files) {
    if (!f?.path || !f?.content) continue;

    console.log("🧠 CREATED:", f.path);

    const dir = f.path.split("/").slice(0, -1).join("/");
    if (dir) fs.mkdirSync(dir, { recursive: true });

    fs.writeFileSync(f.path, f.content, "utf8");
  }
}

module.exports = { writeFiles };
