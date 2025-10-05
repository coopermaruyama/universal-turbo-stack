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
  export TURBO_TOKEN=$(dotenvx get TURBO_TOKEN -f "$root_dir/.env.development" -f "$keys_file")
  export TURBO_TEAM=team_KXVaispsHwsXlmn4asRmt1iB
  set +a
fi


