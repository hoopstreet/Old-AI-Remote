const fs = require("fs");
const path = require("path");

const ARCH_FILE = "Temporary Builder/memory/architecture.json";

function load() {
  return JSON.parse(fs.readFileSync(ARCH_FILE, "utf-8"));
}

function save(data) {
  fs.writeFileSync(ARCH_FILE, JSON.stringify(data, null, 2));
}

// scan repo structure
function scanDir(dir, tree = {}) {
  const files = fs.readdirSync(dir);

  for (const f of files) {
    const full = path.join(dir, f);

    if (f === "node_modules") continue;

    if (fs.statSync(full).isDirectory()) {
      tree[f] = scanDir(full);
    } else {
      tree[f] = "file";
    }
  }

  return tree;
}

// detect structural issues
function detectIssues(tree, issues = [], base = "") {
  for (const k in tree) {
    const full = base + "/" + k;

    if (k.includes("copy") || k.includes("backup")) {
      issues.push({ type: "DUPLICATE_FOLDER", path: full });
    }

    if (typeof tree[k] === "object") {
      detectIssues(tree[k], issues, full);
    }
  }

  return issues;
}

function analyzeRepo() {
  const state = load();

  const tree = scanDir(".");
  const issues = detectIssues(tree);

  state.structure = tree;
  state.violations = issues;
  state.history.push({
    time: new Date().toISOString(),
    issues: issues.length
  });

  save(state);

  return state;
}

module.exports = { analyzeRepo };
