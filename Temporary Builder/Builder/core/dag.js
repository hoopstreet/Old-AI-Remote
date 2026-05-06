class DAG {
  constructor() {
    this.nodes = {};
    this.edges = {};
  }

  add(name, fn, deps = []) {
    this.nodes[name] = fn;
    this.edges[name] = deps;
  }

  async run() {
    const state = {};

    const executed = new Set();

    const runNode = async (name) => {
      if (executed.has(name)) return;

      const deps = this.edges[name] || [];

      for (const d of deps) {
        await runNode(d);
      }

      const fn = this.nodes[name];

      const result = await fn(state);

      // 🔥 CRITICAL FIX: MERGE STATE PROPERLY
      if (result && typeof result === "object") {
        Object.assign(state, result);
      }

      executed.add(name);
    };

    for (const name of Object.keys(this.nodes)) {
      await runNode(name);
    }

    return state;
  }
}

module.exports = DAG;
