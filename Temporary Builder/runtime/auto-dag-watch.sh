#!/bin/sh

echo "🧠 REAL DAG AUTONOMOUS WATCHER STARTED"

STATE_FILE=".last_hash_state"

touch $STATE_FILE

get_hash() {
  find "Temporary Builder/memory" -type f -exec md5sum {} \; 2>/dev/null | md5sum | awk '{print $1}'
}

while true
do
  cd ~/AI-Remote || exit

  git fetch origin >/dev/null 2>&1

  LOCAL_HASH=$(get_hash)
  LAST_HASH=$(cat $STATE_FILE 2>/dev/null)

  if [ "$LOCAL_HASH" != "$LAST_HASH" ]; then

    echo "🔥 CHANGE DETECTED IN MEMORY"

    echo "$LOCAL_HASH" > $STATE_FILE

    git add "Temporary Builder/memory/convo.md" \
            "Temporary Builder/memory/convo2.md" 2>/dev/null

    git commit -m "🧠 DAG AUTO MEMORY UPDATE $(date)" || {
      echo "⚠️ NO CHANGES TO COMMIT"
      continue
    }

    git pull --rebase origin main || {
      echo "❌ REBASE FAILED → SKIP"
      git rebase --abort 2>/dev/null
      continue
    }

    git push origin main || {
      echo "❌ PUSH FAILED → SKIP"
      continue
    }

    echo "🚀 SYNC COMPLETE → TRIGGERED GITHUB ACTIONS"
  fi

  sleep 5
done
