const fs = require("fs");

function read(p){
  try { return fs.readFileSync(p,"utf8"); }
  catch { return ""; }
}

function write(p,c){
  const dir = p.split("/").slice(0,-1).join("/");
  if(dir) fs.mkdirSync(dir,{recursive:true});
  fs.writeFileSync(p,c||"");
}

// =========================
// 🧠 VECTOR MEMORY (SIMPLE EMBED STORE)
// =========================
function storeMemory(key, data){
  write("memory/vector/" + key + ".json", JSON.stringify({
    data,
    ts: Date.now()
  }, null, 2));
}

// =========================
// 🧠 SEMANTIC SCORING ENGINE
// =========================
function scoreChange(a,b){
  if(!a || !b) return 0.5;
  if(a === b) return 0.1;
  return 0.8;
}

// =========================
// 🧠 SWARM AGENTS
// =========================
function entryAgent(input){
  return "# ENTRY ANALYSIS\n" + input;
}

function analyzerAgent(entry, final){
  const score = scoreChange(entry, final);
  return {
    score,
    risk: score > 0.7 ? "HIGH" : "LOW"
  };
}

function repairAgent(risk){
  if(risk === "HIGH"){
    return "ROLLBACK RECOMMENDED";
  }
  return "NO REPAIR REQUIRED";
}

// =========================
// 🧠 MAIN SWARM FLOW
// =========================
async function run(){

  console.log("🧠 SWARM v2 START");

  const entry = read("Temporary Builder/memory/convo.md");
  const final = read("Temporary Builder/memory/convo2.md");

  const entryOut = entryAgent(entry);
  const analysis = analyzerAgent(entry, final);
  const repair = repairAgent(analysis.risk);

  // =========================
  // MEMORY STORE (VECTOR STYLE)
  // =========================
  storeMemory("entry", entry);
  storeMemory("final", final);
  storeMemory("analysis", analysis);

  // =========================
  // OUTPUT FILES
  // =========================
  write("docs/entry.md", entryOut);
  write("docs/analysis.json", JSON.stringify(analysis,null,2));
  write("docs/repair.md", repair);

  // =========================
  // SWARM DAG REPORT
  // =========================
  write("docs/swarm-report.md",
`# 🧠 SWARM EXECUTION REPORT

Risk Level: ${analysis.risk}
Score: ${analysis.score}

Status: ${repair}
`);

  console.log("✅ SWARM COMPLETE");
}

run();
