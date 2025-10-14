# shellcheck shell=sh
# Library of shared functions for scripts
SCRIPT_DIR=$(realpath "$(dirname "$0")")
DEBUG=${DEBUG:-0}
LOG_PREFIX=${LOG_PREFIX:-""}
# Colors
RED=197
KIWI=156
ORANGE=215
PINK=212
PURPLE=99
# Foreground
PRIMARY=7
BRIGHT=15
# FAINT=238
FAINT=103
DARK=238

echo "" > /tmp/debug.log

log() {
  if command -v gum >/dev/null 2>&1; then
    gum log --level="info" --time="1/2 15:04:05" --prefix="$LOG_PREFIX" -s "$@"
  else
    echo "$@"
  fi
}

debug() {
  if [ "${DEBUG:-0}" -eq 1 ]; then
    echo "$@" >> /tmp/debug.log
    # if command -v gum >/dev/null 2>&1; then
    #   gum log --level="debug" --time="1/2 15:04:05" --prefix="$LOG_PREFIX" -s "$@"
    # else
    #   echo "DEBUG: $@"
    # fi
  fi
}

cleanup() {
  echo "Ctrl+C detected. Cleaning up..."
  # Add any cleanup commands here
  exit 1
}

trap cleanup SIGINT


# ==========================================================================
# AWS Helper Functions
# ==========================================================================
get_access_token_include_expired() {
  local start_url="$1" region="$2"
  jq -r --arg url "$start_url" --arg region "$region" '
    select(.startUrl == $url and .region == $region and .accessToken and .expiresAt)
    | .accessToken
  ' $HOME/.aws/sso/cache/*.json 2>/dev/null | head -n1
}

get_access_token() {
  local start_url="$1" region="$2"
  jq -r --arg url "$start_url" --arg region "$region" '
    select(.startUrl == $url and .region == $region and .accessToken and .expiresAt)
    | select((.expiresAt | strptime("%Y-%m-%dT%H:%M:%SZ") | mktime) > now)
    | .accessToken
  ' $HOME/.aws/sso/cache/*.json 2>/dev/null | head -n1
}
