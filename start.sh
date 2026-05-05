#!/bin/sh

echo "🚀 AI-Remote Starting..."

cd ~/AI-Remote || exit

# fix git state automatically
git stash || true
git pull --rebase origin main || true

# install deps
npm install
npm install node-fetch@2

# run AI engine
node src/agent/brain.js

echo "✅ AI-Remote RUN COMPLETE"
