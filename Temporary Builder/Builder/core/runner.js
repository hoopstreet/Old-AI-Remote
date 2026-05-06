const fs = require("fs");

// Read memory (SOURCE OF TRUTH)
const convo = fs.readFileSync("Temporary Builder/memory/convo.md", "utf8");
const convo2 = fs.readFileSync("Temporary Builder/memory/convo2.md", "utf8");

// SIMPLE PARSER (AI OUTPUT SIMULATION PLACEHOLDER)
function generateRootProject(input) {
  return {
    files: [
      {
        path: "app.js",
        content: `// AUTO GENERATED FROM TEMP BUILDER\nconsole.log('AI-Remote App Running');\n/* INPUT SUMMARY:\n${input.slice(0, 500)}\n*/`
      },
      {
        path: "server.js",
        content: `// SERVER GENERATED\nconst http = require('http');\nhttp.createServer((req,res)=>res.end('AI-Remote Server')).listen(3000);`
      },
      {
        path: "index.html",
        content: `<html><body><h1>AI-Remote Generated UI</h1></body></html>`
      },
      {
        path: "package.json",
        content: JSON.stringify({
          name: "ai-remote-generated",
          version: "1.0.0",
          main: "app.js"
        }, null, 2)
      }
    ]
  };
}

// COMBINE MEMORY
const input = convo + "\n" + convo2;

// GENERATE
const project = generateRootProject(input);

// WRITE TO ROOT
for (const file of project.files) {
  fs.writeFileSync(file.path, file.content);
  console.log("🧠 CREATED:", file.path);
}

console.log("✅ ROOT GENERATION COMPLETE FROM TEMP BUILDER");
