class DAG {
  constructor() {
    this.nodes = new Map();
  }

  add(name, fn, deps = []) {
    this.nodes.set(name, { fn, deps, done: false });
  }

  async run() {
    const runNode = async (name, ctx) => {
      const node = this.nodes.get(name);

      for (const d of node.deps) {
        await runNode(d, ctx);
      }

      if (!node.done) {
        node.result = await node.fn(ctx);
        node.done = true;
      }

      return node.result;
    };

    const ctx = {};
    for (const key of this.nodes.keys()) {
      await runNode(key, ctx);
    }

    return ctx;
  }
}

module.exports = DAG;
