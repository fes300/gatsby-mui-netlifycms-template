#!/bin/sh

export LC_CTYPE=C
export LANG=C

REPLACE_STRING="s/__template__website__name/$1/g"

find . -type d -name "node_modules" -prune -o \
  -type d -name ".cache" -prune -o \
  -type d -name ".git" -prune -o \
  -type d -name "public" -prune -o \
  -type d -name "static" -prune -o \
  -type d -name "scripts" -prune -o \
  -type f -print \
  | xargs sed -i '' $REPLACE_STRING
