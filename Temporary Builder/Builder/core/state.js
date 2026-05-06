const fs = require("fs");

function read(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, "utf-8") : "";
}

function loadState() {
  return {
    memory: {
      convo: read("Temporary Builder/memory/convo.md"),
      convo2: read("Temporary Builder/memory/convo2.md")
    },
    context: {}
  };
}

module.exports = { loadState };
