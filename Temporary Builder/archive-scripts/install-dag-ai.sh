#!/bin/sh

echo "🧠 INSTALLING REAL DAG DEVOPS AI..."

mkdir -p "Temporary Builder/Builder/agents"
mkdir -p "Temporary Builder/memory"
mkdir -p "Temporary Builder/logs"
mkdir -p "Temporary Builder/docs"

cd "Temporary Builder"

npm init -y

npm install node-fetch

echo "✅ BASE INSTALLED"
