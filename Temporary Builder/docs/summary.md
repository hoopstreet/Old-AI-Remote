# 🧠 TEMPORARY BUILDER — SYSTEM SUMMARY

## 🔥 OVERVIEW

Temporary Builder is an autonomous AI-powered DevOps engine that:

- Reads instruction sources (convo.md, convo2.md)
- Generates real production-ready code
- Writes files directly into repository root
- Detects and repairs broken GitHub workflows
- Tracks build history and system evolution
- Self-updates via Git commits

---

## 🧠 CORE COMPONENTS

### 1. brain.js
- Calls AI (OpenRouter API)
- Merges convo.md + convo2.md
- Outputs structured JSON:
  - files[]
  - install[]

---

### 2. runner.js (MAIN ENGINE)
- Executes AI build
- Writes generated files
- Logs build history
- Repairs workflows
- Handles Git sync
- Prevents duplicate commits

---

### 3. utils/

#### analyzer.js
- Reads build logs
- Detects failures

#### cleaner.js
- Sanitizes AI output

#### parser.js
- Converts AI text → JSON

#### writer.js
- Writes files into ROOT repo

#### logger.js
- Stores build history

#### workflow-repair.js
- Detects broken workflows
- Applies safe patches

---

## 🧠 MEMORY SYSTEM

Located in:
Temporary Builder/memory/

Files:

- convo.md → GitHub logic instructions
- convo2.md → Telegram / secondary logic
- repo-index.json → system memory index
- vector-db.json → long-term storage
- architecture.json → structure tracking

---

## 📦 OUTPUT SYSTEM

Generated files are written to:

➡ ROOT AI-Remote repository

NOT inside Temporary Builder

---

## 🔁 SELF-HEAL SYSTEM

✔ Detects:
- broken workflows
- empty builds
- invalid outputs

✔ Fixes:
- YAML workflows
- missing steps
- permission issues

✔ Commits:
- automatic repair updates

---

## 📊 LOGGING SYSTEM

Temporary Builder/logs/build-history.json

Tracks:
- timestamp
- generated files
- install dependencies

---

## ⚙️ GITHUB ACTIONS

Workflow:
.github/workflows/temp-ai-builder.yml

Triggers:
- push to convo.md / convo2.md
- manual dispatch

---

## 🔐 REQUIRED CREDENTIALS

Set in GitHub Secrets:

OPENROUTER_API_KEY

Used by:
brain.js → AI generation

---

## ⚠️ LIMITATIONS

- No infinite execution loops
- GitHub enforces execution limits
- AI output depends on prompt quality

---

## 🚀 FINAL STATE

✔ Fully automated builder  
✔ Self-healing workflows  
✔ Memory-based evolution  
✔ Root-level file generation  

System is production-ready.
