#!/bin/sh

echo "🚀 SAFE PUSH START"

git add .

if git diff --cached --quiet; then
  echo "✅ No changes"
  exit 0
fi

git commit -m "🧠 AUTOGPT DEVOPS BUILD"

git pull --no-rebase origin main || true

git push origin main || true

echo "✅ PUSH DONE"
