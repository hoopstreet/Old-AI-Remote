#!/bin/sh

echo "🧠 AUTONOMOUS DAG OS STARTED (REAL MODE)"

cd ~/AI-Remote

LAST_HASH=""

while true
do
  cd ~/AI-Remote

  HASH=$(find "Temporary Builder/memory" -type f -exec cksum {} \; 2>/dev/null | cksum | awk '{print $1}')

  if [ "$HASH" = "$LAST_HASH" ]; then
    sleep 5
    continue
  fi

  echo "🔥 MEMORY CHANGE DETECTED"

  source Temporary\ Builder/brain/dag-brain.sh

  PLAN=$(plan)
  CODE=$(code "$PLAN")
  REVIEW=$(review "$CODE")
  FIXED=$(fix "$REVIEW")

  echo "🧪 TESTING BEFORE COMMIT..."

  sh Temporary\ Builder/core/test-gate.sh
  TEST_RESULT=$?

  if [ $TEST_RESULT -ne 0 ]; then
    echo "❌ TEST FAILED → ROLLBACK MODE"

    # rollback cycle (safe)
    git reset --hard origin/main
    LAST_HASH="$HASH"
    sleep 5
    continue
  fi

  DECISION=$(decide "$FIXED")

  echo "$DECISION" | grep -q "YES"

  if [ $? -eq 0 ]; then
    echo "✅ COMMIT APPROVED"

    echo "" >> "Temporary Builder/memory/convo.md"
    echo "## AUTO DAG UPDATE $(date)" >> "Temporary Builder/memory/convo.md"

    git add "Temporary Builder/memory/convo.md" \
            "Temporary Builder/memory/convo2.md"

    git commit -m "🧠 DAG SELF-HEAL COMMIT $(date)" || true

    git pull --rebase origin main || true
    git push origin main || true

    echo "🚀 PUSHED"
  else
    echo "⛔ REJECTED BY AI"
  fi

  LAST_HASH="$HASH"

  sleep 5
done
