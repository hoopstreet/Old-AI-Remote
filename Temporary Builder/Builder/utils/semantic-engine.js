function analyzeCode(files) {
  return files.map(f => ({
    file: f.path,
    type: detectType(f.path),
    risk: detectRisk(f.content || "")
  }));
}

function detectType(path) {
  if (path.includes("api")) return "backend";
  if (path.includes("ui")) return "frontend";
  if (path.includes("db")) return "database";
  return "core";
}

function detectRisk(code) {
  if (!code) return "low";
  if (code.includes("eval")) return "high";
  if (code.includes("exec")) return "high";
  return "low";
}

module.exports = { analyzeCode };
