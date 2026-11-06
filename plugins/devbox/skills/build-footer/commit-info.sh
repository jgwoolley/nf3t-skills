#!/usr/bin/env bash
# Print BUILD_TIME, COMMIT_SHA and COMMIT_URL for the git repo in the current directory.
set -euo pipefail
sha="$(git rev-parse HEAD 2>/dev/null || echo unknown)"
url=""
remote="$(git remote get-url origin 2>/dev/null || true)"
if [[ -n $remote ]]; then
  # git@host:owner/repo.git, ssh://git@host/owner/repo.git, https://user:token@host/owner/repo.git -> https://host/owner/repo
  remote="${remote%.git}"
  remote="$(printf '%s' "$remote" | sed -E 's#^ssh://##; s#^https?://##; s#^[^@/]+@##; s#^([^:/]+):#\1/#')"
  host="${remote%%/*}"
  if [[ $host == *gitlab* ]]; then path="-/commit"; else path="commit"; fi
  [[ $sha == unknown ]] || url="https://${remote}/${path}/${sha}"
fi
printf 'BUILD_TIME=%s\nCOMMIT_SHA=%s\nCOMMIT_URL=%s\n' "$(date -u +%Y-%m-%dT%H:%M:%SZ)" "${sha:0:12}" "${url:-#}"
