const fs = require("fs");

const MEMORY_FILE = "Temporary Builder/memory/vector-db.json";

function loadMemory() {
  if (!fs.existsSync(MEMORY_FILE)) return [];
  return JSON.parse(fs.readFileSync(MEMORY_FILE, "utf-8"));
}

function saveMemory(data) {
  fs.writeFileSync(MEMORY_FILE, JSON.stringify(data, null, 2));
}

function addMemory(entry) {
  const mem = loadMemory();
  mem.push({
    time: new Date().toISOString(),
    ...entry
  });
  saveMemory(mem);
}

module.exports = { loadMemory, addMemory };
