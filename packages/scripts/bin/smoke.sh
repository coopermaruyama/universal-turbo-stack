#!/bin/bash

export SHELL=$(which bash)

BIN_DIR=$(dirname "$0")
SCRIPTS_DIR=$(dirname "$BIN_DIR")
ROOT_DIR=$(dirname "$SCRIPTS_DIR")
OS=$(uname)
IS_DARWIN=$([ "$OS" == "Darwin" ] && echo true  || echo false)
IS_LINUX=$([ "$OS" == "Linux" ] && echo true  || echo false)
PYTHON_PROJECT_DIR="$ROOT_DIR"
if [ -f "$ROOT_DIR/apps/travel-assistant-api/pyproject.toml" ]; then
  PYTHON_PROJECT_DIR="$ROOT_DIR/apps/travel-assistant-api"
fi

# -------- system ------------------------
if $IS_DARWIN && command -v brew >/dev/null; then
  which cargo-binstall >/dev/null || brew install cargo-binstall
elif $IS_LINUX; then
  which rustup >/dev/null || curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
  . $HOME/.cargo/env
  which cargo-binstall >/dev/null || \
    curl -L --proto '=https' --tlsv1.2 -sSf https://raw.githubusercontent.com/cargo-bins/cargo-binstall/main/install-from-binstall-release.sh | bash
  export PATH="$HOME/.cargo/bin:$PATH"
fi
# cargo binstall cargo-maelstrom -y
# cargo binstall maelstrom-go-test -y
# cargo binstall maelstrom-pytest -y
# cargo binstall maelstrom-run -y
# cargo binstall maelstrom-broker -y
# cargo binstall maelstrom-worker -y
# cargo binstall maelstrom-admin -y

# ------------ python ----------------------------
# go to the travel-assistant-api directory
cd "$PYTHON_PROJECT_DIR"
# skip prompt
export UV_VENV_CLEAR=1
# install python version
uv python install
# activate the virtual environment if not already active
if [ -z "$VIRTUAL_ENV" ]; then
  uv venv "$PYTHON_PROJECT_DIR/.venv"
  . "$PYTHON_PROJECT_DIR/.venv/bin/activate"
fi
# install dependencies
uv sync --active
# install dev dependencies
uv pip install -e .[dev]

# ------------ node ----------------------------
cd "$ROOT_DIR"

# check if we have the right node version
engine_line=$(cat package.json | grep '"node":')
has_jq=$(command -v jq)
if [ -n "$engine_line" ] && [ -n "$has_jq" ]; then
  required_version=$(jq -r '.engines.node' package.json | sed 's/[>=<^~ ]//g')
  current_version=$(node --version | sed 's/v//')
  # auto-install with nvm if available
  if command -v nvm >/dev/null 2>&1 && [ "$required_version" != "$current_version" ]; then
    nvm install "$required_version"
    nvm use "$required_version"
  fi
fi
# install pnpm, turbo
corepack enable
corepack prepare pnpm --activate
pnpm setup
# reload shell to get pnpm in PATH
if [[ $SHELL == *zsh ]]; then source $HOME/.zshrc; else source $HOME/.bashrc; fi
pnpm install -g turbo@latest
pnpm install
