#!/bin/sh

echo "🚀 SAFE PUSH"

git add .

if git diff --cached --quiet; then
  echo "✔ No changes"
  exit 0
fi

git commit -m "🧠 CLEAN CONSOLIDATION: SINGLE WORKFLOW + TEMP BUILDER ISOLATED"

git pull --no-rebase origin main || true

git push origin main || true

echo "✅ DONE"
