class DAG {
  constructor() {
    this.nodes = {};
    this.deps = {};
  }

  add(name, fn, deps = []) {
    this.nodes[name] = fn;
    this.deps[name] = deps;
  }

  async run() {
    const state = { context: {}, memory: "" };
    const executed = new Set();

    const runNode = async (name) => {
      if (executed.has(name)) return;

      const deps = this.deps[name] || [];

      for (const d of deps) {
        await runNode(d);
      }

      const fn = this.nodes[name];

      if (!fn) throw new Error("Missing node: " + name);

      const result = await fn(state);

      if (result) {
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
