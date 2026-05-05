#!/bin/bash

# Task Runner Script
if [[ -f docs/Task.md ]]; then
    echo "Executing tasks from Task.md"
    # Custom execution logic here
else
    echo "No tasks found."
fi
