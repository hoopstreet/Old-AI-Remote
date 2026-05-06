const fs = require("fs");

function analyzeLogs() {
  const file = "Temporary Builder/logs/build-history.json";
  if (!fs.existsSync(file)) return null;

  const logs = JSON.parse(fs.readFileSync(file));
  return {
    total: logs.length,
    last: logs[logs.length - 1]
  };
}

module.exports = { analyzeLogs };
