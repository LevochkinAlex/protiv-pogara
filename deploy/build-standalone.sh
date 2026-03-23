#!/usr/bin/env bash
# Сборка и подготовка standalone для systemd (запуск на сервере от пользователя деплоя).
set -euo pipefail
cd "$(dirname "$0")/.."

npm ci --omit=dev
npm run build

STANDALONE=".next/standalone"
mkdir -p "${STANDALONE}/.next"
rm -rf "${STANDALONE}/.next/static" "${STANDALONE}/public"
cp -r .next/static "${STANDALONE}/.next/static"
cp -r public "${STANDALONE}/public"

echo "OK: standalone готов в ${STANDALONE}. Запуск: cd ${STANDALONE} && NODE_ENV=production PORT=3232 HOSTNAME=127.0.0.1 node server.js"
