#!/bin/sh

cd ~/AI-Remote

MSG="$1"

echo "" >> "Temporary Builder/company/memory/convo.md"
echo "## UPDATE $(date)" >> "Temporary Builder/company/memory/convo.md"
echo "$MSG" >> "Temporary Builder/company/memory/convo.md"

echo "" >> "Temporary Builder/company/memory/convo2.md"
echo "## OUTPUT $(date)" >> "Temporary Builder/company/memory/convo2.md"
echo "$MSG" >> "Temporary Builder/company/memory/convo2.md"

git add .
git commit -m "🧠 MEMORY UPDATE $(date)" || true

git pull --rebase origin main || true
git push origin main || true

echo "🚀 MEMORY SYNC COMPLETE"
