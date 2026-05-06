const fs = require("fs");

function read(p) {
  return fs.existsSync(p) ? fs.readFileSync(p, "utf-8") : "";
}

function loadState() {
  return {
    convo: read("Temporary Builder/memory/convo.md"),
    convo2: read("Temporary Builder/memory/convo2.md"),
    context: {}
  };
}

module.exports = { loadState };
