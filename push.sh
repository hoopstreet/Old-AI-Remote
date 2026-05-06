#!/bin/sh
echo "🚀 SAFE PUSH START"
git add .
git commit -m "🧠 CLEAN AUTONOMOUS DEVOPS RESTRUCTURE" || true
git pull --no-rebase origin main || true
git push origin main || true
echo "✅ PUSH COMPLETE"
