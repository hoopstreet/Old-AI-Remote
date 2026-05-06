function safeJSON(text) {
  try {
    if (!text || typeof text !== "string") return null;

    const clean = text.trim();

    try {
      return JSON.parse(clean);
    } catch (e) {}

    const arrStart = clean.indexOf("[");
    const arrEnd = clean.lastIndexOf("]");
    if (arrStart !== -1 && arrEnd !== -1) {
      return JSON.parse(clean.slice(arrStart, arrEnd + 1));
    }

    const objStart = clean.indexOf("{");
    const objEnd = clean.lastIndexOf("}");
    if (objStart !== -1 && objEnd !== -1) {
      return JSON.parse(clean.slice(objStart, objEnd + 1));
    }

    return null;
  } catch (e) {
    return null;
  }
}

module.exports = { safeJSON };
