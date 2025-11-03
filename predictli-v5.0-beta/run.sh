#!/usr/bin/env bash
set -e
export NODE_ENV=${NODE_ENV:-development}
npm install
npm run dev
