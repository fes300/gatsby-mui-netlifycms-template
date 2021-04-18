#!/bin/sh

export UID="$(id -u)";

echo starting boot...

docker-compose up $@ -d

echo installing deps...

docker exec __template__website__name yarn --cwd app install --frozen-lockfile

echo starting CMS proxy project...

docker exec __template__website__name yarn --cwd app startCMSProxy &

echo starting gatsby...

docker exec __template__website__name yarn --cwd app develop --port=8006
