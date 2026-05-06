function safeJSON(text) {
  try {
    return JSON.parse(text);
  } catch (e) {
    // extract JSON block only
    const match = text.match(/\[[\s\S]*\]/);
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch (e2) {
        return null;
      }
    }
    return null;
  }
}

module.exports = { safeJSON };
