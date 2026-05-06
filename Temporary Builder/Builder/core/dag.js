class DAG {
  constructor() {
    this.nodes = new Map();
  }

  add(name, fn, deps = []) {
    this.nodes.set(name, { fn, deps, done: false, result: null });
  }

  async runNode(name) {
    const node = this.nodes.get(name);
    if (!node) return;

    for (const dep of node.deps) {
      await this.runNode(dep);
    }

    if (!node.done) {
      node.result = await node.fn();
      node.done = true;
    }

    return node.result;
  }

  async run() {
    for (const key of this.nodes.keys()) {
      await this.runNode(key);
    }
  }
}

module.exports = DAG;
