function parse(text) {
  try {
    return JSON.parse(text);
  } catch {
    console.log("❌ JSON PARSE FAILED");
    return null;
  }
}
module.exports = { parse };
