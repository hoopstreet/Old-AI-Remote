const fs = require("fs");

function write(file, content) {
  const parts = file.split("/");
  parts.pop();
  fs.mkdirSync(parts.join("/"), { recursive: true });
  fs.writeFileSync(file, content);
}

module.exports = async function builder(state) {
  console.log("🧠 BUILDER START");

  const entry = state.entry;
  const final = state.final;

  const files = [
    {
      path: "app.js",
      content: `console.log("APP GENERATED\\n${entry}")`
    },
    {
      path: "server.js",
      content: `console.log("SERVER GENERATED\\n${final}")`
    },
    {
      path: "index.html",
      content: `<h1>Generated Project</h1>`
    },
    {
      path: "package.json",
      content: JSON.stringify({
        name: "ai-project",
        version: "1.0.0",
        main: "app.js"
      }, null, 2)
    }
  ];

  state.context.files = files;

  console.log("🧠 FILES GENERATED");
  return state;
};
