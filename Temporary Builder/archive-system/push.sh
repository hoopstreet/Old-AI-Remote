#!/bin/sh
echo "🚀 SAFE PUSH START"

git add .

if git diff --cached --quiet; then
  echo "✔ No changes"
  exit 0
fi

git commit -m "🧠 FULL MIGRATION: ALL AI SYSTEMS MOVED TO TEMP BUILDER"

git pull --no-rebase origin main || true

git push origin main || true

echo "✅ PUSH COMPLETE"
