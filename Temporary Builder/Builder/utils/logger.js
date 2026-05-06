const fs = require("fs");

function logBuild(data) {
  const file = "Temporary Builder/logs/build-history.json";

  let history = [];
  if (fs.existsSync(file)) {
    try {
      history = JSON.parse(fs.readFileSync(file));
    } catch {}
  }

  history.push({
    time: new Date().toISOString(),
    files: data.files || [],
  });

  fs.writeFileSync(file, JSON.stringify(history, null, 2));
}

module.exports = { logBuild };
