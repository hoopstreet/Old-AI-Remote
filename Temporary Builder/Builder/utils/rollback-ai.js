function shouldRollback(dag, analysis) {
  let riskScore = 0;

  for (const a of analysis) {
    if (a.risk === "high") riskScore += 50;
  }

  if (dag.total > 50) riskScore += 20;

  return {
    rollback: riskScore > 60,
    score: riskScore
  };
}

module.exports = { shouldRollback };
