function safeJSON(input) {
  if (!input) return null;

  try {
    return JSON.parse(input);
  } catch (e) {
    console.log("⚠️ RAW NON-JSON OUTPUT DETECTED, FIXING...");

    // extract JSON block from messy LLM output
    const match = input.match(/\[[\s\S]*\]|\{[\s\S]*\}/);

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
