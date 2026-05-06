#!/bin/sh

echo "🧠 AUTONOMOUS SWARM V2 STARTED"

LAST_HASH=""

while true
do
  cd ~/AI-Remote

  # -----------------------------
  # SAFE CHANGE DETECTION (NO md5, NO reset)
  # -----------------------------
  CURRENT_HASH=$(cat convo.md convo2.md 2>/dev/null | shasum | awk '{print $1}')

  if [ "$CURRENT_HASH" != "$LAST_HASH" ]; then

    echo "🔥 MEMORY CHANGE DETECTED"

    # -----------------------------
    # APPEND MEMORY SAFELY
    # -----------------------------
    echo "" >> convo.md
    echo "## AUTO $(date)" >> convo.md

    echo "" >> convo2.md
    echo "## AUTO $(date)" >> convo2.md

    # -----------------------------
    # COMMIT ONLY MEMORY FILES
    # -----------------------------
    git add convo.md convo2.md

    git commit -m "🧠 SWARM AUTO UPDATE $(date)" || true

    # -----------------------------
    # SAFE PUSH (NO REBASE CHAOS)
    # -----------------------------
    git pull --rebase origin main || true
    git push origin main || true

    echo "🚀 PUSHED → GitHub Actions TRIGGERED"

    LAST_HASH="$CURRENT_HASH"
  fi

  sleep 5
done
