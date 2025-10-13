#!/bin/bash


SCRIPT_DIR=$(realpath "$(dirname "$0")")
BIN_DIR=$(dirname "$SCRIPT_DIR")
ROOT_DIR=$(dirname "$BIN_DIR")

APPNAME=""
KEYNAME=""
APPDIR=""
valid_apps=("api" "nextjs")
valid_envs=("staging" "production")

if [ "$1" != "" ]; then
  if [[ ! " ${valid_apps[@]} " =~ " ${1} " ]]; then
    echo "Error: Invalid app name. Valid options are: ${valid_apps[*]}"
    exit 1
  fi
  if [ "$1" == "api" ]; then
    APPNAME=$([ "$2" == "production" ] && echo "travel-assistant-api" || echo "travel-assistant-api-staging")
    APPDIR="apps/travel-assistant-api"
  elif [ "$1" == "nextjs" ]; then
    APPNAME=$([ "$2" == "production" ] && echo "voy" || echo "voy-staging")
    APPDIR="apps/voy"
  fi
else
  echo "Error: No app name provided"
  exit 1
fi
if [ "$2" != "" ]; then
  if [[ ! " ${valid_envs[@]} " =~ " ${2} " ]]; then
    echo "Error: Invalid environment name. Valid options are: ${valid_envs[*]}"
    exit 1
  fi
  if [ "$2" == "staging" ]; then
    KEYNAME="DOTENV_PRIVATE_KEY_STAGING"
  elif [ "$2" == "production" ]; then
    KEYNAME="DOTENV_PRIVATE_KEY_PRODUCTION"
  fi
else
  echo "Error: No key name provided"
  exit 1
fi

echo "Deploying ${APPNAME} to ${KEYNAME}..."


fly deploy \
  -a "${APPNAME}" \
  -c "${APPDIR}/fly-${2}.toml" \
  --dockerfile "scripts/docker/${1}.Dockerfile" \
  --build-arg "$KEYNAME=$(printenv "$KEYNAME")"