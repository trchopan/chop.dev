#!/usr/bin/env bash

set -euo pipefail

for directory in content/slides/*/; do
  bun run scripts/validate-slides.ts "$directory"
done

test -f public/index.html
test -f public/index.xml
test -f public/sitemap.xml
test -f public/robots.txt
bun run scripts/validate-links.ts
