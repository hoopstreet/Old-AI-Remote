# 🧠 Autonomous AI Engineering OS v3 (Production DAG System)

## SYSTEM TYPE
Multi-agent DAG-based autonomous AI engineering system using OpenRouter.

---

## 🧠 CORE AGENTS

### 1. Planner
Defines execution strategy from memory input.

### 2. Coder
Generates application code from plan.

### 3. Reviewer
Validates structure and correctness.

### 4. Critic
Detects failure conditions before execution completes.

### 5. Fixer
Repairs broken or missing outputs automatically.

---

## 🔁 EXECUTION ENGINE

- DAG-based execution graph
- Controlled dependency resolution
- No infinite loops
- Ordered execution pipeline

---

## 🧠 MEMORY SYSTEM

- convo.md → input instructions
- convo2.md → final refinement
- vector-db.json → persistent semantic memory

---

## 🔁 FAILURE HANDLING

- state snapshot before execution
- rollback on crash or invalid output
- critic agent prevents broken writes

---

## ⚙️ LLM INTEGRATION

- OpenRouter API used per agent
- centralized llm.js gateway
- production-safe prompt routing

---

## 🚀 SYSTEM GOAL

Transform natural language into safe, validated, production-ready software using autonomous multi-agent execution.
