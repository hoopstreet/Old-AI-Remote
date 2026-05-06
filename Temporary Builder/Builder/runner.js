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
