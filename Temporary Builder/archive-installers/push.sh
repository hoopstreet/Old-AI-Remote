#!/bin/sh

echo "🚀 SWARM PUSH"

git add .

if git diff --cached --quiet; then
  echo "✅ NO CHANGES"
  exit 0
fi

git commit -m "🧠 AUTONOMOUS DEVOPS OS v2 SWARM UPDATE"

git pull --no-rebase origin main || true

git push origin main || true

echo "✅ PUSH COMPLETE"
