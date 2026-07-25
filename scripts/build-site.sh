#!/usr/bin/env bash

set -euo pipefail

bash scripts/build-deps.sh
hugo --gc --cleanDestinationDir --minify --panicOnWarning --logLevel info
