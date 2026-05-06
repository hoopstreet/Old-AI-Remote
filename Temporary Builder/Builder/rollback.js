const fs = require("fs");

function snapshot(state) {
  fs.writeFileSync(
    "Temporary Builder/memory/last-state.json",
    JSON.stringify(state, null, 2)
  );
}

function restore() {
  try {
    return JSON.parse(
      fs.readFileSync("Temporary Builder/memory/last-state.json", "utf-8")
    );
  } catch {
    return null;
  }
}

module.exports = { snapshot, restore };
