module.exports = async function reviewer(state) {
  console.log("🧠 REVIEWER START");

  const files = state.context.files || [];

  let valid = true;

  for (const f of files) {
    if (!f.content || f.content.length < 5) {
      valid = false;
    }
  }

  state.context.review = {
    valid,
    issues: valid ? [] : ["Empty or invalid files"]
  };

  console.log("🧠 REVIEW:", valid ? "PASS" : "FAIL");

  return state;
};
