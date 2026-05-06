function extractJSON(text) {
  if (!text) return null;

  // remove markdown fences
  text = text.replace(/```json/g, "").replace(/```/g, "");

  // try direct parse
  try {
    return JSON.parse(text);
  } catch {}

  // fallback: extract first JSON block
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) return null;

  try {
    return JSON.parse(match[0]);
  } catch {
    return null;
  }
}

module.exports = { extractJSON };
