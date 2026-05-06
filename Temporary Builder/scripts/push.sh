#!/bin/sh
echo "🚀 SAFE PUSH"

git add .

if git diff --cached --quiet; then
  echo "✔ NO CHANGES"
  exit 0
fi

git commit -m "🧠 FINAL CLEAN ARCHITECTURE: TEMP BUILDER ISOLATED + ROOT CLEAN"

git pull --no-rebase origin main || true

git push origin main || true

echo "✅ DONE"
