#!/usr/bin/env bash

hugo && sh preprocess-img.sh && firebase deploy
