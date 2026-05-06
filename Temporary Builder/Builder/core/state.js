function validateState(state) {
  if (!state) return false;
  if (!state.memory) return false;
  if (!state.context) state.context = {};
  return true;
}

function safeState(state) {
  return validateState(state) ? state : { memory: "", context: {} };
}

module.exports = { validateState, safeState };
