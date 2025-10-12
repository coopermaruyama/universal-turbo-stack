#!/bin/bash

# Exit on any error
set -e

# Function to handle graceful shutdown
cleanup() {
    echo "Received shutdown signal, stopping application..."
    kill -TERM "$child" 2>/dev/null || true
    wait "$child"
    exit 0
}

# Set up signal handlers for graceful shutdown
trap cleanup SIGTERM SIGINT

# Log startup
echo "Starting Next.js application..."

# Set default environment if not provided
export NODE_ENV=${NODE_ENV:-production}
export PORT=${PORT:-3000}

# Print environment info
echo "Environment: $NODE_ENV"
echo "Port: $PORT"

# Development mode
if [ "$NODE_ENV" = "development" ]; then
    echo "Starting in development mode..."
    pnpm run dev
fi

# Production mode

# SOPS: optionally require a KMS key in private deployments; in public template default to AGE
if [ -n "$SOPS_KMS_KEY" ]; then
    echo "Using SOPS with KMS key"
fi

# Run db migration
cd /app/packages/db
NODE_ENV=production npx -p @neondatabase/serverless -p drizzle-orm -p drizzle-kit drizzle-kit migrate
cd /app

# Start the Next.js application
echo "Starting in production mode..."
node /app/server.js -H 0.0.0.0
