#!/bin/bash
set -e

OP_ACCOUNT="voytravel"
VAULT_NAME="voy-508-shared"
# Resolve absolute paths so links point to the correct file regardless of CWD
SCRIPT_DIR=$(realpath "$(dirname "$0")")
BIN_DIR=$(dirname "$SCRIPT_DIR")
ROOT_DIR=$(dirname "$BIN_DIR")
APPS=("apps/nextjs" "packages/db")


# Check if op cli is installed
if ! command -v op &> /dev/null; then
    echo "op cli could not be found"
    echo "To install with homebrew:"
    echo "  brew tap 1password/tap"
    echo "  brew install 1password-cli"
    echo "Make sure to enable CLI integration in 1Password desktop -> Settings -> Developer"
    echo "More info: https://developer.1password.com/docs/cli/get-started"
    exit 1
fi

if [ -z "$(op account list | grep $OP_ACCOUNT)" ]; then
    echo "CLI Exists, but account $OP_ACCOUNT could not be found"
    echo "To add the account, Open 1Password desktop -> Settings -> Developer -> Add Account"
    exit 1
fi

if [ -z "$(op vault list --account $OP_ACCOUNT | grep $VAULT_NAME)" ]; then
    echo "Vault $VAULT_NAME could not be found"
    echo "Make sure you have access to this vault"
    exit 1
fi

FILE_CONTENT=$(op read "op://$VAULT_NAME/.env.keys/.env.keys" --account "$OP_ACCOUNT")

if [ -z "$FILE_CONTENT" ]; then
    echo "File content could not be found"
    echo "Make sure you have access to an item named .env.keys in the vault $VAULT_NAME"
    exit 1
fi

# Write the keys at the repo root so symlinks can target it reliably
printf "%s" "$FILE_CONTENT" > "$ROOT_DIR/.env.keys"

for app in "${APPS[@]}"; do
    cd "$ROOT_DIR/$app" || exit 1
    echo "Linking $ROOT_DIR/.env.keys to $ROOT_DIR/$app/.env.keys"
    ln -sfn "../../.env.keys" ".env.keys"
done

echo "✅ Done"
