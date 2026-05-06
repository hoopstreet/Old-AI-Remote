function extractJSON(text) {
  if (!text) return null;

  text = text.replace(/```json/g, "").replace(/```/g, "");

  try {
    return JSON.parse(text);
  } catch {}

  const match = text.match(/\{[\s\S]*\}/);
  if (!match) return null;

  try {
    return JSON.parse(match[0]);
  } catch {
    return null;
  }
}

module.exports = { extractJSON };
