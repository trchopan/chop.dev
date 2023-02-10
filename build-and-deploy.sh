#!/usr/bin/env bash

rm -rf public && \
hugo --minify && \
deno run --allow-read --allow-run --allow-write preprocess-img.ts && \
firebase deploy

