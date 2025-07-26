#!/bin/bash

ORIGINAL_DIR=$(pwd)
cd ../../apps/nextjs
echo "$@"
dotenvx run --convention=nextjs  -fk ../../.env.keys -- pnpm --dir "$ORIGINAL_DIR" run "$@"
