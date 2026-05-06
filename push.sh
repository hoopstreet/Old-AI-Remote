#!/bin/sh

echo "🚀 V10 SAFE PUSH"

git add .

if git diff --cached --quiet; then
  echo "✅ NO CHANGES"
  exit 0
fi

git commit -m "🧠 V10 SELF-HEALING DEVOPS BRAIN"

git pull --no-rebase origin main || true

git push origin main || true

echo "✅ PUSH COMPLETE"
