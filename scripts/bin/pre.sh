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

root_dir=$(upfind_dir "pnpm-workspace.yaml" || echo "$PWD")
target_app="nextjs"
secrets_file="$root_dir/secrets/dev/$target_app.yaml"

sops exec-env "$secrets_file" -- "$@"


