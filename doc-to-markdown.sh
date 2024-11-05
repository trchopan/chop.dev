#!/bin/bash

deno run --allow-write --allow-net scripts/docs-to-markdown.ts content/posts "$1"
