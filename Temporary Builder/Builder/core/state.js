const fs = require("fs");

function read(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, "utf-8") : "";
}

function write(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

function loadState() {
  return {
    entry: read("Temporary Builder/memory/convo.md"),
    final: read("Temporary Builder/memory/convo2.md"),
    context: {}
  };
}

module.exports = { loadState };
