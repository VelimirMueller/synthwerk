#!/usr/bin/env bash
# Checks every github.com/VelimirMueller/synthwerk* link in the given Markdown files with the GitHub API.
# Usage: scripts/check-links.sh [FILE...]   (default: README.md)
# Read-only: it calls `gh api` with GET only. Needs an authenticated `gh`.
# The repo `synthwerk` itself may return 404 until it is published (allowed, reported as SKIP).
# A file without such links passes.
# Exit 0: all links resolve. Exit 1: one or more links are broken (404).
# Exit 2: an API call failed for another reason (no auth, rate limit, network).
set -euo pipefail

cd "$(dirname "$0")/.."
[ "$#" -gt 0 ] || set -- README.md
owner="VelimirMueller"
allow_404="synthwerk"

# grep exits 1 when no file has a match (not an error) and 2 when a file cannot be read.
rc=0
raw=$(grep -ohE "https://github\.com/${owner}/synthwerk[A-Za-z0-9._-]*(/[^)\"'[:space:]>]*)?" "$@") || rc=$?
[ "$rc" -le 1 ] || { echo "cannot read: $*" >&2; exit 2; }
links=$(printf '%s\n' "$raw" | sed '/^$/d' | sort -u)
if [ -z "$links" ]; then
  echo "no synthwerk links in: $*"
  exit 0
fi

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
