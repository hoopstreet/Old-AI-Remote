const { safeJSON } = require("../core/json-safe");

module.exports = async function coder(state) {
  try {
    const planRaw =
      state?.plan ||
      state?.context?.plan ||
      state?.context?.output;

    if (!planRaw) {
      console.log("❌ CODER: No plan found");
      return state;
    }

    // Parse if string
    let plan = planRaw;

    if (typeof planRaw === "string") {
      plan = safeJSON(planRaw) || { raw: planRaw };
    }

    // IMPORTANT: convert PLAN → FILES
    const files = [];

    // CASE 1: already files
    if (Array.isArray(plan.files)) {
      return {
        ...state,
        context: { ...state.context, files: plan.files }
      };
    }

    // CASE 2: structured plan → convert to file
    files.push({
      path: "output/plan.json",
      content: JSON.stringify(plan, null, 2)
    });

    return {
      ...state,
      context: {
        ...state.context,
        files
      }
    };

  } catch (err) {
    console.log("❌ CODER CRASH:", err.message);
    return state;
  }
};
