function safeJSON(text) {
  try {
    if (!text) return null;
    return JSON.parse(text);
  } catch (e) {
    console.log("⚠️ JSON PARSE FAILED:", e.message);
    return null;
  }
}

module.exports = { safeJSON };
