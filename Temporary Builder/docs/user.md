# 👤 USER GUIDE — TEMPORARY BUILDER

## 🚀 HOW TO USE

### STEP 1 — Edit Instructions

Modify:

Temporary Builder/memory/convo.md  
Temporary Builder/memory/convo2.md  

These control what the AI builds.

---

### STEP 2 — Trigger Build

Option A (Recommended):

git add .
git commit -m "update instructions"
git push

→ GitHub Actions runs automatically

---

Option B (Manual):

node "Temporary Builder/Builder/runner.js"

---

## 🧠 WHAT HAPPENS

1. AI reads convo files
2. Generates real code
3. Writes files into root repo
4. Fixes broken workflows
5. Commits updates

---

## 📂 WHERE OUTPUT GOES

Generated files appear in:

ROOT REPOSITORY

NOT inside Temporary Builder

---

## 🔧 TROUBLESHOOTING

### ❌ No output generated
- Check convo.md content
- Ensure valid instructions

### ❌ AI fails
- Check OPENROUTER_API_KEY
- Check API quota

### ❌ Workflow fails
- System auto-repairs on next run

---

## 🔐 REQUIRED SETUP

GitHub → Settings → Secrets:

ADD:

OPENROUTER_API_KEY

---

## 🔁 AUTO REPAIR SYSTEM

Builder automatically:
- fixes workflows
- retries builds
- commits patches

---

## 📊 LOGS

View:

Temporary Builder/logs/build-history.json

---

## 🧠 BEST PRACTICE

- Keep convo.md clear and structured
- Avoid duplicate instructions
- Use specific build goals

---

## ⚠️ WARNING

Do NOT:
- manually edit generated files randomly
- break workflow YAML structure

---

## ✅ FINAL NOTE

You control the system via:

convo.md + convo2.md

Everything else is automated.
