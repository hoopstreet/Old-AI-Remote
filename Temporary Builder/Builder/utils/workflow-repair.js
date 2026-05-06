const fs = require("fs");

function repairWorkflows() {
  const dir = ".github/workflows";
  if (!fs.existsSync(dir)) return;

  fs.readdirSync(dir).forEach(file => {
    const full = dir + "/" + file;
    let content = fs.readFileSync(full, "utf-8");

    if (!content.includes("actions/checkout")) {
      content = content.replace(
        "steps:",
        "steps:\n      - uses: actions/checkout@v4"
      );
    }

    if (!content.includes("permissions:")) {
      content = "permissions:\n  contents: write\n\n" + content;
    }

    fs.writeFileSync(full, content);
  });
}

module.exports = { repairWorkflows };
