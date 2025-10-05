#!/usr/bin/env sh
set -e

# Lightweight entrypoint that sources optional .env.keys without failing
# when the file is missing (useful for container entrypoints).

# Probe to detect and avoid re-running this script
export __ENTRYPROBE=true

keyfile=".env.keys"
script_path="$(cd "$(dirname "$0")" && pwd -P)"
root_path="$(cd "$script_path/.." && pwd -P)"

# Candidate locations (in order). Keep this list conservative and explicit.
candidate_repo_root="$(cd "$script_path/../.." 2>/dev/null && pwd -P)"

matched_path=""

# Iterate over explicit candidate paths (quoted to avoid word-splitting issues)
for path in \
    "$PWD/$keyfile" \
    "$script_path/$keyfile" \
    "$root_path/$keyfile" \
    "$script_path/../$keyfile" \
    "$candidate_repo_root/$keyfile" \
    "/.env.keys"; do
    [ -z "$path" ] && continue
    if [ -r "$path" ]; then
        matched_path="$path"
        break
    fi
done

if [ -z "$matched_path" ] && [ -z "$(printenv | grep DOTENV_PRIVATE_KEY)" ]; then
    cat >&2 <<'WARN'
*************************************************************
*  WARNING: No .env.keys file found!                         *
*  The application may not function correctly without it.   *
*************************************************************
WARN
    echo "Run the helper script to sync keys from 1Password:" >&2
    echo "  ./scripts/bin/get-keys.sh" >&2
fi

# Ensure ENV / NODE_ENV defaults (do not overwrite if already set)
: "${ENV:=development}"
: "${NODE_ENV:=${ENV}}"


# If explicit DOTENV_PRIVATE_KEY_* variables are present, prefer them.
if [ -n "$DOTENV_PRIVATE_KEY_STAGING" ]; then
    echo "🚀 Running in staging mode using \$DOTENV_PRIVATE_KEY_STAGING..."
    export NODE_ENV=production
    exec dotenvx run --ignore=MISSING_ENV_FILE -f .env.staging -f .env -- "$@"
elif [ -n "$DOTENV_PRIVATE_KEY_PRODUCTION" ]; then
    echo "🚀 Running in production mode using \$DOTENV_PRIVATE_KEY_PRODUCTION..."
    exec dotenvx run --ignore=MISSING_ENV_FILE -f .env.production -f .env -- "$@"
elif [ -n "$DOTENV_PRIVATE_KEY_DEVELOPMENT" ]; then
    echo "🔐 Running in development mode using \$DOTENV_PRIVATE_KEY_DEVELOPMENT..."
    exec dotenvx run --convention=nextjs -- "$@"
fi

if [ "${ENV:-development}" = "development" ]; then
    echo "🔨 Running in development mode..."
    exec dotenvx run --convention=nextjs -fk $matched_path -- "$@"
else
    echo "🚀 Running in production mode..."
    exec dotenvx run --ignore=MISSING_ENV_FILE -f .env.production -f .env -fk $matched_path -- "$@"
fi
