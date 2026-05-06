function parse(text) {
  try {
    return JSON.parse(text);
  } catch (e) {
    console.log("❌ JSON PARSE FAILED");

    try {
      const fixed = text
        .substring(text.indexOf("{"), text.lastIndexOf("}") + 1);

      return JSON.parse(fixed);
    } catch {
      console.log("❌ RECOVERY FAILED");
      return null;
    }
  }
}

module.exports = { parse };
