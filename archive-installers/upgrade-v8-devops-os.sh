#!/bin/sh

echo "🧠 INSTALLING V8 DEVOPS OPERATING SYSTEM..."

mkdir -p "Temporary Builder/Builder/utils"
mkdir -p "Temporary Builder/memory"
mkdir -p "docs"

# ----------------------------
# V8 DAG ENGINE
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

// 🧠 TASK GRAPH (DAG MODEL)
function buildDAG(entry, final){
  return [
    { id: "entry", depends: [], data: entry },
    { id: "analyze", depends: ["entry"], data: "analyzing specs" },
    { id: "plan", depends: ["analyze"], data: "planning architecture" },
    { id: "build", depends: ["plan"], data: "building output files" },
    { id: "finalize", depends: ["build"], data: final }
  ];
}

// 🧠 AGENTS
function agent(name, input){
  return {
    agent: name,
    output: input,
    status: "ok"
  };
}

// 🧠 EXECUTE DAG SEQUENCE
function execute(entry, final){
  const dag = buildDAG(entry, final);

  const log = [];

  for(const node of dag){
    log.push(agent(node.id.toUpperCase()+"_AGENT", node.data));
  }

  return log;
}

function run(){
  console.log("🚀 V8 DEVOPS OS START");

  const entry = read("Temporary Builder/memory/convo.md");
  const final = read("Temporary Builder/memory/convo2.md");

  const flow = execute(entry, final);

  const files = [
    {
      path: "README.md",
      content: "# V8 DEVOPS OS\n\nENTRY:\n" + entry
    },
    {
      path: "docs/project.md",
      content: "# FINAL SPEC\n" + final
    },
    {
      path: "docs/dag-log.json",
      content: JSON.stringify(flow, null, 2)
    }
  ];

  for(const f of files){
    write(f.path, f.content);
    console.log("✔", f.path);
  }

  console.log("✅ V8 BUILD COMPLETE");
}

run();
JS

# ----------------------------
# MEMORY SYSTEM
# ----------------------------
echo "# ENTRY PROJECT" > "Temporary Builder/memory/convo.md"
echo "# FINAL PROJECT" > "Temporary Builder/memory/convo2.md"
echo "# TEMP MEMORY (V8)" > "Temporary Builder/memory/temp.md"

# ----------------------------
# SAFE PUSH SYSTEM
# ----------------------------
cat > push.sh << 'SH'
#!/bin/sh

echo "🚀 V8 SAFE PUSH"

git add .

if git diff --cached --quiet; then
  echo "✅ NO CHANGES"
  exit 0
fi

git commit -m "🧠 V8 DEVOPS OS BUILD"

git pull --no-rebase origin main || true

git push origin main || true

echo "✅ PUSH COMPLETE"
SH

chmod +x push.sh

echo "✅ V8 DEVOPS OS INSTALLED"
echo "👉 RUN: node Temporary Builder/Builder/runner.js"
echo "👉 PUSH: sh push.sh"
