#!/bin/sh

echo "🧠 DAG AI ENGINE (SELF-HEALING MODE)"

API_URL="https://openrouter.ai/api/v1/chat/completions"
MODEL="openai/gpt-4o-mini"

MAX_REPAIR=2
REPAIR_COUNT=0

call_llm () {
  PROMPT="$1"

  curl -s $API_URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $OPENROUTER_API_KEY" \
    -d "{
      \"model\": \"$MODEL\",
      \"messages\": [
        {\"role\": \"system\", \"content\": \"You are a production DAG engineering agent.\"},
        {\"role\": \"user\", \"content\": \"$PROMPT\"}
      ]
    }"
}

plan () {
  call_llm "Plan changes based on convo.md and convo2.md"
}

code () {
  call_llm "Generate safe code changes ONLY"
}

review () {
  call_llm "Find bugs, risks, and unsafe logic"
}

fix () {
  call_llm "Fix issues strictly. output corrected version"
}

decide () {
  call_llm "Return YES or NO only for commit approval"
}

run_tests () {
  sh Temporary\ Builder/core/test-gate.sh
}

