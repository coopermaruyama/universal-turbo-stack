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

# Load environment variables
ENV_FILE="/app/.env.production"
ENV_SOPS_FILE="/app/.env.production.sops"

if [ -f "$ENV_SOPS_FILE" ] && command -v sops >/dev/null 2>&1; then
    echo "Decrypting env from $ENV_SOPS_FILE"
    tmp_env="$(mktemp)"
    trap 'rm -f "$tmp_env"' EXIT
    sops -d "$ENV_SOPS_FILE" > "$tmp_env"
    set -a
    # shellcheck disable=SC1090
    . "$tmp_env"
    set +a
elif [ -f "$ENV_FILE" ]; then
    echo "Loading env from $ENV_FILE"
    set -a
    # shellcheck disable=SC1090
    . "$ENV_FILE"
    set +a
else
    echo "No production env file found; proceeding with existing environment"
fi

# Run db migration
cd /app/packages/db
NODE_ENV=production npx -p @neondatabase/serverless -p drizzle-orm -p drizzle-kit drizzle-kit migrate
cd /app

# Start the Next.js application
echo "Starting in production mode..."
node /app/server.js -H 0.0.0.0
