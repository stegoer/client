#!/usr/bin/env sh

diff=$(git diff -- . ':(exclude)*go.sum')

if [ -n "$diff" ]; then
  echo "$diff"
  exit 1
fi
