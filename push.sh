#!/bin/sh

echo "🚀 V11 SAFE PUSH"

git add .

if git diff --cached --quiet; then
  echo "✅ NO CHANGES"
  exit 0
fi

git commit -m "🧠 V11 COGNITION LAYER"

git pull --no-rebase origin main || true

git push origin main || true

echo "✅ PUSH COMPLETE"
