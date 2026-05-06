function clean(text) {
  if (!text) return "";

  return text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .replace(/\n/g, " ")
    .trim();
}

module.exports = { clean };
