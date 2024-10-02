#!/bin/bash

# Function to run the backend
run_backend() {
    echo "Starting backend..."
    cd Infrastructure/tasks_api
    npm install
    npm run dev &
    BACKEND_PID=$!
    cd ../../
}

# Function to run the frontend
run_frontend() {
    echo "Starting frontend..."
    cd Presentation/web_client
    npm install
    npm run dev -- --port 5473 &
    FRONTEND_PID=$!
    cd ../../
}

# Function to stop processes
stop_processes() {
    echo "Stopping processes..."
    kill $BACKEND_PID
    kill $FRONTEND_PID
    echo "Applications terminated."
    exit 0
}

# Set up trap to catch SIGINT (Ctrl+C)
trap stop_processes SIGINT

# Run backend
run_backend

# Wait for backend to start (adjust sleep time if needed)
sleep 5

# Run frontend
run_frontend

echo "Applications are running. Press Ctrl+C to stop."

# Wait indefinitely
while true; do
    sleep 1
done
