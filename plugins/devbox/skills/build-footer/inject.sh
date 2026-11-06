#!/usr/bin/env bash
# Usage: inject.sh <file>...   Replace the footer placeholders in built files, using the git repo in the current directory.
set -euo pipefail
here="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
eval "$(bash "$here/commit-info.sh")"
for f in "$@"; do
  sed -i "s|__BUILD_TIME__|${BUILD_TIME}|g; s|__COMMIT_SHA__|${COMMIT_SHA}|g; s|__COMMIT_URL__|${COMMIT_URL}|g" "$f"
  echo "footer: ${f} -> ${COMMIT_URL}"
done
