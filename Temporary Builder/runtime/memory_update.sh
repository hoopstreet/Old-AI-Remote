#!/bin/sh

cd ~/AI-Remote

echo "🧠 MEMORY UPDATE START"

FILE1="Temporary Builder/company/memory/convo.md"
FILE2="Temporary Builder/company/memory/convo2.md"

# ALWAYS APPEND (NO CONFLICT EVER)
echo "" >> "$FILE1"
echo "## UPDATE $(date)" >> "$FILE1"
echo "$1" >> "$FILE1"

echo "" >> "$FILE2"
echo "## OUTPUT $(date)" >> "$FILE2"
echo "$1" >> "$FILE2"

git add .
git commit -m "🧠 AUTO MEMORY UPDATE" || true

git pull --rebase origin main || true
git push origin main || true

echo "🚀 MEMORY SYNC COMPLETE"
