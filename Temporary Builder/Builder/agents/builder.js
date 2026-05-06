const fs = require("fs");
const path = require("path");
const { generate } = require("../core/llm");

// 📦 Load repo index
function loadRepoIndex() {
  try {
    return JSON.parse(fs.readFileSync("Temporary Builder/memory/repo-index.json", "utf8"));
  } catch {
    return { files: [] };
  }
}

// 🔍 Find existing file
function findFile(target, repoIndex) {
  const files = repoIndex.files || [];

  let exact = files.find(f => f.path === target);
  if (exact) return exact.path;

  let fuzzy = files.find(f =>
    f.path.includes(target) || target.includes(f.path)
  );

  return fuzzy ? fuzzy.path : null;
}

// ✏️ Apply patch
function patchFile(filePath, content) {
  const fullPath = path.join("Temporary Builder", filePath);

  if (!fs.existsSync(fullPath)) {
    console.log("⚠️ SKIP (not found):", filePath);
    return;
  }

  fs.writeFileSync(fullPath, content, "utf8");
  console.log("✏️ UPDATED:", filePath);
}

module.exports = async (state) => {

  console.log("🧠 BUILDER AGENT RUNNING");

  const prompt = `
You are a senior software engineer.

STRICT RULES:
- DO NOT create new files
- ONLY update existing files
- Return JSON only
- Format:

{
  "files": [
    { "path": "file.js", "content": "updated code" }
  ]
}

PROJECT MEMORY:
${state.convo}

${state.convo2}
`;

  let response = await generate(prompt);

  let parsed;

  try {
    parsed = JSON.parse(response);
  } catch (e) {
    console.log("❌ INVALID JSON FROM LLM");
    return state;
  }

  const repoIndex = loadRepoIndex();

  if (!parsed.files) return state;

  for (const file of parsed.files) {
    const match = findFile(file.path, repoIndex);

    if (match) {
      patchFile(match, file.content);
    } else {
      console.log("⚠️ NO MATCH:", file.path);
    }
  }

  state.build = parsed;

  return state;
};
