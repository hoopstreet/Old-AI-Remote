#!/bin/sh

echo "🚀 V9 SAFE PUSH"

git add .

if git diff --cached --quiet; then
  echo "✅ NO CHANGES"
  exit 0
fi

git commit -m "🧠 V9 AUTONOMOUS DEVOPS INTELLIGENCE"

git pull --no-rebase origin main || true

git push origin main || true

echo "✅ PUSH COMPLETE"
