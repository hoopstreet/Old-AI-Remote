const fs = require("fs");
const path = require("path");

function scanDir(dir) {
  let results = [];

  if (!fs.existsSync(dir)) return results;

  const items = fs.readdirSync(dir);

  for (const item of items) {
    const full = path.join(dir, item);

    if (fs.lstatSync(full).isDirectory()) {
      results = results.concat(scanDir(full));
    } else {
      results.push(full);
    }
  }

  return results;
}

function analyzeFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf-8");

    return {
      path: filePath,
      size: content.length,
      empty: content.trim().length === 0
    };
  } catch {
    return {
      path: filePath,
      size: 0,
      empty: true
    };
  }
}

function fullScan() {
  const rootFiles = scanDir(".")
    .filter(f =>
      f.startsWith("docs/") ||
      f.startsWith(".github/") ||
      f.startsWith("src/") ||
      f.startsWith("Temporary Builder/")
    );

  return rootFiles.map(analyzeFile);
}

module.exports = { fullScan };
