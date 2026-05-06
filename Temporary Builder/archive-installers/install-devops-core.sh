#!/bin/sh

echo "🧠 INSTALLING AUTONOMOUS DEVOPS COGNITION CORE..."

mkdir -p "Temporary Builder/Builder"
mkdir -p "Temporary Builder/memory"
mkdir -p "docs"

# -------------------------
# SAFE RUNNER (NO CRASH)
# -------------------------
cat > "Temporary Builder/Builder/runner.js" << 'JS'
const fs = require("fs");

function read(file) {
  try {
    return fs.readFileSync(file, "utf-8");
  } catch {
    return "";
  }
}

function writeSafe(filePath, content) {
  const dir = filePath.split("/").slice(0, -1).join("/");
  if (dir) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, content || "");
}

async function runCore() {
  console.log("🚀 DEVOPS COGNITION CORE START");

  const entry = read("Temporary Builder/memory/convo.md");
  const final = read("Temporary Builder/memory/convo2.md");

  // 🧠 SIMPLE BUT STABLE GENERATION CORE
  const files = [
    {
      path: "README.md",
      content: "# 🧠 AI DEVOPS PROJECT\n\n## ENTRY\n" + entry + "\n\n## FINAL\n" + final
    },
    {
      path: "docs/project-plan.md",
      content: "# Project Plan\nGenerated from convo.md + convo2.md"
    },
    {
      path: "docs/status.md",
      content: "✅ System running in COGNITION CORE MODE"
    },
    {
      path: "Temporary Builder/docs/raw.txt",
      content: "SAFE MODE OUTPUT LOG"
    }
  ];

  for (const f of files) {
    writeSafe(f.path, f.content);
    console.log("✔", f.path);
  }

  console.log("✅ BUILD COMPLETE");
}

runCore();
JS

# -------------------------
# MEMORY FILES
# -------------------------
cat > "Temporary Builder/memory/convo.md" << 'EOF'
ENTRY PROJECT SPEC
