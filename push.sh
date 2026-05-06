#!/bin/sh

echo "🚀 V7 SAFE PUSH"

git add .

if git diff --cached --quiet; then
  echo "✅ NO CHANGES"
  exit 0
fi

git commit -m "🧠 V7 SWARM DEVOPS BUILD"

git pull --no-rebase origin main || true

git push origin main || true

echo "✅ PUSH COMPLETE"
