#!/usr/bin/env bash

echo "Running pre-build hooks..."


# usage: upfind_dir <filename> [start_dir]
upfind_dir() {
  local target="$1"
  local dir="${2:-$PWD}"

  if [[ -z "$target" ]]; then
    echo "usage: upfind_dir <filename> [start_dir]" >&2
    return 2
  fi

  dir="${dir%/}"

  while true; do
    if [[ -e "$dir/$target" ]]; then
      printf '%s\n' "$dir"
      return 0
    fi

    if [[ "$dir" == "/" || -z "$dir" ]]; then
      return 1
    fi

    dir="$(dirname "$dir")"
  done
}

root_dir=$(upfind_dir "pnpm-workspace.yaml" || echo "")
keys_file="$root_dir/.env.keys"

if [[ -f "$keys_file" ]]; then
  set -a
  if command -v sops >/dev/null 2>&1; then
    # Prefer sops if an encrypted env exists
    if [[ -f "$root_dir/.env.development.sops" ]]; then
      export TURBO_TOKEN=$(sops -d "$root_dir/.env.development.sops" | grep '^TURBO_TOKEN=' | cut -d'=' -f2-)
    fi
  fi
  # Fallback to plaintext .env if present
  if [[ -z "${TURBO_TOKEN:-}" && -f "$root_dir/.env.development" ]]; then
    # shellcheck disable=SC1090
    . "$root_dir/.env.development"
  fi
  export TURBO_TEAM=team_KXVaispsHwsXlmn4asRmt1iB
  set +a
fi


