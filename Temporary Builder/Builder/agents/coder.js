module.exports = async function coder(state) {
  console.log("💻 CODER AGENT");

  state.context.files = [
    {
      path: "app.js",
      content: "console.log('AI generated app from swarm system');"
    }
  ];

  return state;
};
