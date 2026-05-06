class DAG {
  constructor() {
    this.nodes = {};
    this.dependencies = {};
  }

  add(name, fn, deps = []) {
    this.nodes[name] = fn;
    this.dependencies[name] = deps;
  }

  async run(initialState = {}) {
    const state = { ...initialState };
    const executed = new Set();

    const runNode = async (name) => {
      if (executed.has(name)) return state;

      const deps = this.dependencies[name] || [];
      for (const dep of deps) {
        await runNode(dep);
      }

      const fn = this.nodes[name];
      if (!fn) throw new Error(`Missing node: ${name}`);

      const result = await fn(state);

      if (result && typeof result === "object") {
        Object.assign(state, result);
      }

      executed.add(name);
      return state;
    };

    await runNode("planner");
    return state;
  }
}

module.exports = DAG;
