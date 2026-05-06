
cd ~/AI-Remote &&
git fetch origin &&
git reset --hard origin/main &&
cd "Temporary Builder" &&
npm install &&
cd ..
echo "✅ SYNCED"

