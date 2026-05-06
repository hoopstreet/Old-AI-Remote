function buildDAG(files) {
  const graph = [];

  for (const file of files || []) {
    graph.push({
      node: file.path,
      dependsOn: inferDependencies(file.path)
    });
  }

  return {
    nodes: graph,
    total: graph.length
  };
}

function inferDependencies(path) {
  if (path.includes("server")) return ["database", "config"];
  if (path.includes("api")) return ["server"];
  if (path.includes("ui")) return ["api"];
  return [];
}

module.exports = { buildDAG };
