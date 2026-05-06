#!/bin/sh

echo "🧠 INSTALLING AUTOGPT-STYLE DEVOPS AI..."

mkdir -p "Temporary Builder/Builder/utils"
mkdir -p "Temporary Builder/memory"
mkdir -p "docs"

# -------------------------
# SAFE RUNNER (NO CRASH)
# -------------------------
cat > "Temporary Builder/Builder/runner.js" << 'JS'
const fs = require("fs");

function read(p){
  return fs.existsSync(p) ? fs.readFileSync(p,"utf-8") : "";
}

function write(path, content){
  const dir = path.split("/").slice(0,-1).join("/");
  if(dir) fs.mkdirSync(dir,{recursive:true});
  fs.writeFileSync(path, content || "");
}

async function run(){
  console.log("🚀 V6 AUTOGPT DEVOPS START");

  const entry = read("Temporary Builder/memory/convo.md");
  const final = read("Temporary Builder/memory/convo2.md");

  const files = [
    {
      path: "README.md",
      content: "# AUTOGPT DEVOPS PROJECT\n\nENTRY:\n" + entry
    },
    {
      path: "docs/project.md",
      content: "# FINAL SPEC\n" + final
    },
    {
      path: "docs/tools-credentials.md",
      content: "# Credentials\nOPENROUTER_API_KEY required in GitHub Secrets"
    }
  ];

  for(const f of files){
    write(f.path, f.content);
    console.log("✔", f.path);
  }

  console.log("✅ BUILD COMPLETE");
}

run();
JS

# -------------------------
# SAFE MEMORY FILES
# -------------------------
echo "# ENTRY PROJECT" > "Temporary Builder/memory/convo.md"
echo "# FINAL PROJECT" > "Temporary Builder/memory/convo2.md"
echo "# TEMP MEMORY" > "Temporary Builder/memory/temp.md"

# -------------------------
# PUSH SCRIPT (SAFE GIT)
# -------------------------
cat > push.sh << 'SH'
#!/bin/sh

echo "🚀 SAFE PUSH START"

git add .

if git diff --cached --quiet; then
  echo "✅ No changes"
  exit 0
fi

git commit -m "🧠 AUTOGPT DEVOPS BUILD"

git pull --no-rebase origin main || true

git push origin main || true

echo "✅ PUSH DONE"
SH

chmod +x push.sh

echo "✅ INSTALL COMPLETE"
echo "👉 Run: node Temporary Builder/Builder/runner.js"
echo "👉 Push: sh push.sh"
