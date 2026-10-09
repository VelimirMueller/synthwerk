#!/usr/bin/env bash
# Checks every github.com/VelimirMueller/synthwerk* link in README.md with the GitHub API.
# Read-only: it calls `gh api` with GET only. Needs an authenticated `gh`.
# The repo `synthwerk` itself may return 404 until it is published (allowed, reported as SKIP).
# Exit 0: all links resolve. Exit 1: one or more links are broken (404).
# Exit 2: an API call failed for another reason (no auth, rate limit, network).
set -euo pipefail

cd "$(dirname "$0")/.."
file="${1:-README.md}"
owner="VelimirMueller"
allow_404="synthwerk"

links=$(grep -oE "https://github\.com/${owner}/synthwerk[A-Za-z0-9._-]*(/[^)\"'[:space:]>]*)?" "$file" | sort -u)
[ -n "$links" ] || { echo "no links found in $file"; exit 1; }

fail=0
while IFS= read -r url; do
  rest="${url#https://github.com/${owner}/}"
  rest="${rest%%#*}"
  rest="${rest%%\?*}"
  repo="${rest%%/*}"
  path=""
  ref=""
  case "$rest" in
    */blob/*|*/tree/*)
      tail="${rest#*/*/}"   # <ref>/<path>
      ref="${tail%%/*}"
      path="${tail#*/}"
      [ "$path" = "$tail" ] && path=""
      ;;
  esac

  if [ -n "$path" ]; then
    endpoint="repos/${owner}/${repo}/contents/${path}?ref=${ref}"
  else
    endpoint="repos/${owner}/${repo}"
  fi

  if err=$(gh api -X GET "$endpoint" --silent 2>&1); then
    echo "OK    $url"
  elif [[ "$err" != *"HTTP 404"* ]]; then
    echo "ERR   $url (${err%%$'\n'*})"
    [ "$fail" -eq 1 ] || fail=2
  elif [ "$repo" = "$allow_404" ] && [ -z "$path" ]; then
    echo "SKIP  $url (not published yet)"
  else
    echo "FAIL  $url"
    fail=1
  fi
done <<< "$links"

exit "$fail"
