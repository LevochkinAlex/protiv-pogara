#!/usr/bin/env bash
# Сборка и подготовка standalone для systemd (запуск на сервере от пользователя деплоя).
set -euo pipefail
cd "$(dirname "$0")/.."

# Полная установка: Tailwind/PostCSS в devDependencies, но нужны на этапе next build
npm ci
npm run build
npm prune --omit=dev

STANDALONE=".next/standalone"
mkdir -p "${STANDALONE}/.next"
rm -rf "${STANDALONE}/.next/static" "${STANDALONE}/public"
cp -r .next/static "${STANDALONE}/.next/static"
cp -r public "${STANDALONE}/public"

echo "OK: standalone готов в ${STANDALONE}. Запуск: cd ${STANDALONE} && NODE_ENV=production PORT=3232 HOSTNAME=127.0.0.1 node server.js"
