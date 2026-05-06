const fs = require("fs");

function write(filePath, content) {
  const parts = filePath.split("/");
  parts.pop();
  fs.mkdirSync(parts.join("/"), { recursive: true });
  fs.writeFileSync(filePath, content);
}

module.exports = function writeFiles(files) {
  for (const f of files) {
    write(f.path, f.content);
    console.log("✔ WRITE:", f.path);
  }
};
