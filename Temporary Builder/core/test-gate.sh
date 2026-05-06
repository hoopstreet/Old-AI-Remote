#!/bin/sh

echo "🧪 RUNNING TEST GATE..."

# BASIC SAFETY TESTS (expand later)
if [ ! -d "Temporary Builder/memory" ]; then
  echo "❌ FAIL: memory folder missing"
  exit 1
fi

if [ ! -f "Temporary Builder/memory/convo.md" ]; then
  echo "❌ FAIL: convo.md missing"
  exit 1
fi

if [ ! -f "Temporary Builder/memory/convo2.md" ]; then
  echo "❌ FAIL: convo2.md missing"
  exit 1
fi

echo "✅ TESTS PASSED"
exit 0
