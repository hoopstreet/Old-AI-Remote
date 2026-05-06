#!/bin/sh

echo "🧠 SAFE PUSH START"

git add .

git commit -m "🧠 AUTO SYNC $(date '+%Y-%m-%d %H:%M:%S')" || echo "No changes"

echo "🚀 Pulling remote changes first..."

git pull origin main --rebase

echo "📤 Pushing..."

git push origin main

echo "✅ PUSH DONE"
