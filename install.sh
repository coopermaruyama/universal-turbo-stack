#!/usr/bin/env bash
set -euo pipefail

# install.sh: Activate flox environment and install dependencies
# Idempotent setup - Most of the setup is done by flox, so this just installs
# flox



# Detect CI context
CI_MODE=${CI:-}

log() {
    echo "[installer] $*" >&2
}

shell="$(echo $0)"
kernel=$(uname -s | tr "[:upper:]" "[:lower:]")
case "${kernel}" in
mingw*)
    kernel=windows
    ;;
esac
case "$(uname -m)" in
x86_64)
    machine=amd64
    ;;
i686 | i386)
    machine=386
    ;;
armv7l)
    machine=arm
    ;;
aarch64 | arm64)
    machine=arm64
    ;;
*)
    die "Machine $(uname -m) not supported by the installer.\n" \
    "Go to https://direnv for alternate installation methods."
    ;;
esac
log "kernel=$kernel machine=$machine shell=$shell"


# List files in ./include
SCRIPT_DIR=$(realpath "$(dirname "$0")")

if ! command -v flox >/dev/null 2>&1; then
  echo "Installing flox (https://flox.dev)"
  if [ "$(uname -s)" = "Darwin" ]; then
    brew install flox
  elif [ -n "${CI_MODE}" ]; then
    curl -fsSL https://get.flox.dev | bash
    export PATH="$HOME/.flox/bin:$PATH"
  else
    echo "Please install flox manually: https://flox.dev"
    exit 1
  fi

else
  log "flox: OK"
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

# TODO: use flox to install direnv
# # Check if direnv hook is in the shell profile
# if ! grep -q 'direnv hook' "$HOME/.bashrc" && ! grep -q 'direnv hook' "$HOME/.zshrc"; then
#   log "Adding direnv hook to shell profile"
#   if [ -n "$ZSH_VERSION" ]; then
#     echo 'eval "$(direnv hook zsh)"' >> "$HOME/.zshrc"
#     log "Added to $HOME/.zshrc"
#   elif [ -n "$BASH_VERSION" ]; then
#     echo 'eval "$(direnv hook bash)"' >> "$HOME/.bashrc"
#     log "Added to $HOME/.bashrc"
#   else
#     log "Please add the direnv hook to your shell profile manually."
#     log 'For bash, add: eval "$(direnv hook bash)" to ~/.bashrc'
#     log 'For zsh, add: eval "$(direnv hook zsh)" to ~/.zshrc'
#   fi
# else
#   log "direnv hook: OK"
# fi


# DIRENV_STATUS=$(direnv status --json | jq '.state.loadedRC.allowed' 2>/dev/null)
# if [ "$DIRENV_STATUS" == "0" ]; then
#   log "direnv: OK"
#   direnv allow .
# else
#   log "Enabling direnv for this project"
# fi

# if [ -z "$FLOX_ENV" ]; then
#   flox activate
#   exit 0
# fi
