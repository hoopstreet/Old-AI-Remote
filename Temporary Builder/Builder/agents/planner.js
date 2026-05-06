module.exports = async function planner(state) {
  try {
    const input =
      state?.input ||
      state?.context?.input ||
      "create system";

    // FORCE STRUCTURED OUTPUT (NO TEXT PLANS)
    const files = [
      {
        path: "output/system.json",
        content: JSON.stringify(
          {
            message: "AUTO GENERATED SYSTEM",
            input,
            timestamp: Date.now()
          },
          null,
          2
        )
      }
    ];

    return {
      ...state,
      context: {
        ...state.context,
        files
      }
    };

  } catch (err) {
    console.log("❌ PLANNER ERROR:", err.message);
    return state;
  }
};
