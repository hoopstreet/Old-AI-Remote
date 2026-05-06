#!/bin/sh

echo "🧠 STARTING FULL REPOSITORY ANALYSIS..."

OUT="repo-analysis-report.md"
rm -f "$OUT"

echo "# 🧠 AI-REMOTE REPOSITORY REPORT" > "$OUT"
echo "Generated: $(date)" >> "$OUT"
echo "" >> "$OUT"

#####################################
# STRUCTURE
#####################################
echo "📦 STRUCTURE..."

echo "## FILE STRUCTURE" >> "$OUT"
echo '```' >> "$OUT"

find . -type f \
  ! -path "./node_modules/*" \
  ! -path "./.git/*" \
  ! -path "./Temporary Builder/node_modules/*" \
  | sed 's|^\./||' >> "$OUT"

echo '```' >> "$OUT"
echo "" >> "$OUT"

#####################################
# WORKFLOWS
#####################################
echo "⚙️ WORKFLOWS..."

echo "## GITHUB WORKFLOWS" >> "$OUT"
echo '```yaml' >> "$OUT"

if [ -d ".github/workflows" ]; then
  for f in .github/workflows/*; do
    if [ -f "$f" ]; then
      echo "### $f" >> "$OUT"
      cat "$f" >> "$OUT"
      echo "" >> "$OUT"
    fi
  done
fi

echo '```' >> "$OUT"
echo "" >> "$OUT"

#####################################
# BUILDER CORE
#####################################
echo "🧠 BUILDER CORE..."

echo "## TEMP BUILDER CORE" >> "$OUT"

for f in \
Temporary\ Builder/Builder/runner.js \
Temporary\ Builder/Builder/core/state.js \
Temporary\ Builder/Builder/core/writer.js
do
  if [ -f "$f" ]; then
    echo "### $f" >> "$OUT"
    echo '```javascript' >> "$OUT"
    cat "$f" >> "$OUT"
    echo '```' >> "$OUT"
    echo "" >> "$OUT"
  fi
done

#####################################
# MEMORY
#####################################
echo "🧠 MEMORY..."

echo "## MEMORY INPUT" >> "$OUT"
echo '```text' >> "$OUT"

if [ -f "Temporary Builder/memory/convo.md" ]; then
  echo "### convo.md" >> "$OUT"
  cat "Temporary Builder/memory/convo.md" >> "$OUT"
  echo "" >> "$OUT"
fi

if [ -f "Temporary Builder/memory/convo2.md" ]; then
  echo "### convo2.md" >> "$OUT"
  cat "Temporary Builder/memory/convo2.md" >> "$OUT"
  echo "" >> "$OUT"
fi

echo '```' >> "$OUT"
echo "" >> "$OUT"

#####################################
# ROOT FILES
#####################################
echo "📦 ROOT FILES..."

echo "## ROOT APPLICATION FILES" >> "$OUT"
echo '```' >> "$OUT"

for f in app.js server.js index.html package.json bot.py requirements.txt; do
  if [ -f "$f" ]; then
    echo "### $f" >> "$OUT"
    cat "$f" >> "$OUT"
    echo "" >> "$OUT"
  fi
done

echo '```' >> "$OUT"
echo "" >> "$OUT"

#####################################
# SUMMARY
#####################################
echo "## SUMMARY" >> "$OUT"
echo "- System: Temporary Builder DAG DevOps" >> "$OUT"
echo "- Input: convo.md + convo2.md" >> "$OUT"
echo "- Output: ROOT repo generation" >> "$OUT"
echo "- Mode: Self-healing AI builder" >> "$OUT"

echo ""
echo "✅ DONE"
echo "📄 REPORT GENERATED: $OUT"
