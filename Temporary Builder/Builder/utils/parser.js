function parse(text) {
  if (!text) throw new Error("Empty AI output");

  try {
    return JSON.parse(text);
  } catch {
    throw new Error("Invalid JSON");
  }
}

module.exports = { parse };
