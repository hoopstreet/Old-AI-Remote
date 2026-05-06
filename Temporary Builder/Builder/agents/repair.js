module.exports = async function repair(state) {
  console.log("🧠 REPAIR START");

  const review = state.context.review;

  if (review.valid) {
    console.log("🧠 NO REPAIR NEEDED");
    return state;
  }

  console.log("⚠️ REPAIRING FILES");

  state.context.files = state.context.files.map(f => ({
    path: f.path,
    content: f.content || "// repaired fallback"
  }));

  return state;
};
