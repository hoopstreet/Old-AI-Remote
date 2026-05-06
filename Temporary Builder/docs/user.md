# 👤 USER GUIDE — TEMPORARY BUILDER

## 🚀 HOW TO CONTROL SYSTEM

Edit:

Temporary Builder/memory/convo.md  
Temporary Builder/memory/convo2.md  

These define what the AI builds.

---

## ▶️ TRIGGER BUILD

git add .
git commit -m "update instructions"
git push

→ GitHub Actions runs automatically

---

## 🧠 WHAT SYSTEM DOES

1. Reads instructions
2. Generates real code
3. Writes into root repo
4. Repairs workflows
5. Commits updates
6. Logs everything

---

## 📂 OUTPUT LOCATION

Generated files go to:

ROOT REPOSITORY

NOT inside Temporary Builder

---

## 🔧 TROUBLESHOOTING

❌ No output:
- Check convo.md content

❌ AI error:
- Check OPENROUTER_API_KEY

❌ Workflow failure:
- System auto-fixes next run

---

## 🔐 REQUIRED SETUP

GitHub Secrets:

OPENROUTER_API_KEY

---

## 📊 LOGS

Temporary Builder/logs/build-history.json

---

## ⚠️ IMPORTANT RULES

DO NOT:
- manually break workflows
- delete builder files
- mix builder with output files

---

## 🧠 BEST PRACTICE

- Keep instructions clear
- Avoid duplicates
- Define exact build goals

---

## ✅ CONTROL POINT

Everything is controlled via:

convo.md + convo2.md
