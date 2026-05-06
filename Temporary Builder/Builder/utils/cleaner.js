function clean(text) {
  if (!text) return "";

  return text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .replace(/^\s+|\s+$/g, "");
}

module.exports = { clean };
