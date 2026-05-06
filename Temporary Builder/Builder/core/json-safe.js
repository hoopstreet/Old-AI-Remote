function safeJSON(text) {
  try {
    return JSON.parse(text);
  } catch (e) {
    const match = text.match(/\[[\s\S]*\]/);
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch (err) {
        return null;
      }
    }
    return null;
  }
}

module.exports = { safeJSON };
