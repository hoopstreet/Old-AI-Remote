#!/bin/sh

echo "🧠 INSTALLING V11 AUTONOMOUS COGNITION LAYER..."

mkdir -p "Temporary Builder/Builder/utils"
mkdir -p "Temporary Builder/memory"
mkdir -p "docs"

# ----------------------------
# V11 COGNITION ENGINE
# ----------------------------
cat > "Temporary Builder/Builder/runner.js" << 'JS'
const fs = require("fs");

function read(p){
  return fs.existsSync(p) ? fs.readFileSync(p,"utf-8") : "";
}

function write(p, c){
  const dir = p.split("/").slice(0,-1).join("/");
  if(dir) fs.mkdirSync(dir,{recursive:true});
  fs.writeFileSync(p, c || "");
}

// 🧠 COGNITION ANALYZER
function analyze(entry, final){
  const text = (entry + final).toLowerCase();

  let type = "UNKNOWN";
  let impact = 10;

  if(text.includes("feature")) type = "FEATURE";
  if(text.includes("fix")) type = "FIX";
  if(text.includes("refactor")) type = "REFACTOR";
  if(text.includes("delete")) {
    type = "RISK";
    impact += 40;
  }

  if(text.includes("workflow")) impact += 25;
  if(text.includes("auth")) impact += 30;

  return { type, impact };
}

// 🧠 DEPENDENCY GRAPH BUILDER
function buildGraph(){
  return {
    "README.md": ["docs/project.md"],
    "docs/project.md": [],
    "Temporary Builder/memory/convo.md": ["docs/project.md"]
  };
}

// 🧠 IMPACT PROPAGATION ENGINE
function propagate(graph, changedFile){
  let affected = [];

  for(const file in graph){
    if(graph[file].includes(changedFile)){
      affected.push(file);
    }
  }

  return affected;
}

// 🧠 COGNITION DECISION ENGINE
function decide(analysis){
  return {
    safe: analysis.impact < 60,
    level:
      analysis.impact < 30 ? "LOW" :
      analysis.impact < 60 ? "MEDIUM" : "HIGH"
  };
}

// 🧠 MAIN EXECUTION
function run(){
  console.log("🚀 V11 COGNITION LAYER START");

  const entry = read("Temporary Builder/memory/convo.md");
  const final = read("Temporary Builder/memory/convo2.md");

  const analysis = analyze(entry, final);
  const decision = decide(analysis);

  const graph = buildGraph();
  const affected = propagate(graph, "docs/project.md");

  const files = [
    {
      path: "docs/cognition-report.json",
      content: JSON.stringify({
        analysis,
        decision,
        affected_files: affected,
        graph
      }, null, 2)
    },
    {
      path: "README.md",
      content:
        "# V11 COGNITION SYSTEM\n\nTYPE: " +
        analysis.type +
        "\nIMPACT: " +
        analysis.impact
    }
  ];

  if(!decision.safe){
    files.push({
      path: "docs/risk-alert.md",
      content: "# HIGH RISK CHANGE DETECTED"
    });
  }

  for(const f of files){
    write(f.path, f.content);
    console.log("✔", f.path);
  }

  console.log("🧠 TYPE:", analysis.type);
  console.log("⚖️ IMPACT:", analysis.impact);
  console.log("🧠 V11 COMPLETE");
}

run();
JS

# ----------------------------
# MEMORY STRUCTURE
# ----------------------------
echo "# ENTRY NODE" > "Temporary Builder/memory/convo.md"
echo "# FINAL NODE" > "Temporary Builder/memory/convo2.md"
echo "# COGNITION MEMORY" > "Temporary Builder/memory/temp.md"

# ----------------------------
# PUSH SYSTEM
# ----------------------------
cat > push.sh << 'SH'
#!/bin/sh

echo "🚀 V11 SAFE PUSH"

git add .

if git diff --cached --quiet; then
  echo "✅ NO CHANGES"
  exit 0
fi

git commit -m "🧠 V11 COGNITION LAYER"

git pull --no-rebase origin main || true

git push origin main || true

echo "✅ PUSH COMPLETE"
SH

chmod +x push.sh

echo "✅ V11 INSTALLED"
echo "👉 RUN: node Temporary Builder/Builder/runner.js"
echo "👉 PUSH: sh push.sh"
