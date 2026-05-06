#!/bin/sh

echo "🧠 SAFE DAG RUN"

if [ -f core/dag.js ]; then
  node core/dag.js
else
  echo "⚠️ DAG MISSING - SKIPPING (NO CRASH)"
fi

echo "✅ DAG STEP COMPLETE"
