#!/usr/bin/env bash
set -euo pipefail

# Unified env runner using SOPS (AGE by default; optional KMS) or plain .env files
# Requires dotenv-cli for loading plaintext files when present

: "${ENV:=development}"
: "${NODE_ENV:=${ENV}}"

script_path="$(cd "$(dirname "$0")" && pwd -P)"
repo_root="$(cd "$script_path/../.." && pwd -P)"

info() { printf "%s\n" "$*" >&2; }

# Find env file candidates relative to CWD first, then repo root
env_base=".env.${ENV}"
sops_candidates=("$PWD/${env_base}.sops" "$repo_root/${env_base}.sops")
plain_candidates=("$PWD/${env_base}" "$repo_root/${env_base}")

have_sops=false
if command -v sops >/dev/null 2>&1; then
  have_sops=true
fi

run_with_dotenv() {
  local env_file="$1"
  shift
  if command -v dotenv >/dev/null 2>&1; then
    info "Using dotenv file: $env_file"
    exec dotenv -e "$env_file" -- "$@"
  else
    info "dotenv-cli not found; sourcing $env_file directly"
    set -a
    # shellcheck disable=SC1090
    . "$env_file"
    set +a
    exec "$@"
  fi
}

run_with_sops() {
  local sops_file="$1"
  shift
  info "Decrypting with SOPS: $sops_file"
  # Decrypt to a temp file to interop cleanly with dotenv-cli
  local tmp
  tmp="$(mktemp)"
  trap 'rm -f "$tmp"' EXIT
  sops -d "$sops_file" > "$tmp"
  run_with_dotenv "$tmp" "$@"
}

# Prefer SOPS files when available
if $have_sops; then
  for f in "${sops_candidates[@]}"; do
    if [ -f "$f" ]; then
      run_with_sops "$f" "$@"
    fi
  done
fi

# Fallback to plaintext .env files
for f in "${plain_candidates[@]}"; do
  if [ -f "$f" ]; then
    run_with_dotenv "$f" "$@"
  fi
done

info "No env file found for ENV=${ENV}. Running without extra env..."
exec "$@"
