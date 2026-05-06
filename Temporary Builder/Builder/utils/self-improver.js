const fs = require("fs");
const { analyzeRepo } = require("./architecture-engine");

function suggestMoves(structure) {
  const moves = [];

  function walk(obj, base = "") {
    for (const k in obj) {
      const full = base + "/" + k;

      // learning rule: agent code must stay in Builder/
      if (full.includes("brain.js") && !full.includes("Builder")) {
        moves.push({
          from: full,
          to: "Temporary Builder/Builder/brain.js",
          reason: "centralize AI logic"
        });
      }

      if (typeof obj[k] === "object") {
        walk(obj[k], full);
      }
    }
  }

  walk(structure);

  return moves;
}

function selfImprove() {
  const analysis = analyzeRepo();

  const moves = suggestMoves(analysis.structure);

  return {
    violations: analysis.violations,
    moves
  };
}

module.exports = { selfImprove };
