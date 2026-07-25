#!/usr/bin/env bash

set -euo pipefail

# Keep generated dependencies reproducible. The versions are pinned to the
# following upstream commits rather than downloading a moving branch.
REVEALJS_VERSION="5.2.1"
REVEALJS_COMMIT="25e52e26af09933a98afb24cfdd3574e9055034d"
REVEALJS_SHA256="32e0a766f0d4852fcada7582d9c058d92f931afbb80cbd5ab016008e4d21d40b"
BLOWFISH_VERSION="2.87.0"
BLOWFISH_COMMIT="2f12b8d0d9ee90a4fa5481a92c2032ba97f1f358"
BLOWFISH_SHA256="9604f9cb9efc0a3df14e8f79975c828b64629f7f4cade878866c1468602a9768"

REVEALJS_DEST="static/revealjs"
TEMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TEMP_DIR"' EXIT

curl --fail --silent --show-error --location --retry 3 \
  --connect-timeout 10 --max-time 120 \
  "https://github.com/hakimel/reveal.js/archive/${REVEALJS_COMMIT}.zip" \
  --output "$TEMP_DIR/revealjs.zip"
echo "${REVEALJS_SHA256}  ${TEMP_DIR}/revealjs.zip" | shasum -a 256 --check --status
unzip -q "$TEMP_DIR/revealjs.zip" -d "$TEMP_DIR/revealjs"

rm -rf "$REVEALJS_DEST"
mkdir -p "$REVEALJS_DEST"
cp -R "$TEMP_DIR/revealjs/reveal.js-${REVEALJS_COMMIT}/dist" "$REVEALJS_DEST/"
cp -R "$TEMP_DIR/revealjs/reveal.js-${REVEALJS_COMMIT}/plugin" "$REVEALJS_DEST/"

curl --fail --silent --show-error --location --retry 3 \
  --connect-timeout 10 --max-time 120 \
  "https://github.com/nunocoracao/blowfish/archive/${BLOWFISH_COMMIT}.zip" \
  --output "$TEMP_DIR/blowfish.zip"
echo "${BLOWFISH_SHA256}  ${TEMP_DIR}/blowfish.zip" | shasum -a 256 --check --status
unzip -q "$TEMP_DIR/blowfish.zip" -d "$TEMP_DIR/blowfish"

rm -rf themes/blowfish
mkdir -p themes
mv "$TEMP_DIR/blowfish/blowfish-${BLOWFISH_COMMIT}" themes/blowfish

printf 'Prepared reveal.js %s and Blowfish %s\n' "$REVEALJS_VERSION" "$BLOWFISH_VERSION"
