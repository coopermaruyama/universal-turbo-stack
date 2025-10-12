#!/usr/bin/env bash
set -euo pipefail

# install.sh: Activate flox environment and install dependencies

# Detect CI context
CI_MODE=${CI:-}

# Ensure corepack and pnpm baseline if not using flox
if ! command -v flox >/dev/null 2>&1; then
  echo "flox not found; attempting bootstrap (recommended in CI)"
  if [ -n "${CI_MODE}" ]; then
    curl -fsSL https://get.flox.dev | bash
    export PATH="$HOME/.flox/bin:$PATH"
  fi
fi

if command -v flox >/dev/null 2>&1; then
  echo "Activating flox environment..."
  # Use non-interactive activation for scripts
  # shellcheck disable=SC1091
  eval "$(flox activate --dump)"
else
  echo "Falling back to corepack/pnpm install (no flox)"
  corepack enable
  corepack prepare pnpm --activate
fi

# Install JS deps at root
pnpm install

# Optional: prepare turbo for monorepo operations
if ! command -v turbo >/dev/null 2>&1; then
  pnpm add -g turbo || true
fi

echo "✅ install.sh completed"
