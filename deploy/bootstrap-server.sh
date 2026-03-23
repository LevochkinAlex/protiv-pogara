#!/usr/bin/env bash
# Запуск на УДАЛЁННОМ сервере от root (sudo).
# Не трогает существующие сайты: добавляется только один server_name (inpb.pro).
#
# Перед запуском:
#   1) DNS: A (и при необходимости AAAA) для inpb.pro [и www] → IP этого сервера
#   2) Клон репозитория, например: sudo mkdir -p /srv && sudo chown $USER /srv
#      git clone … /srv/inpb && cd /srv/inpb
#   3) Файл окружения: cp .env.example .env.local && nano .env.local
#      обязательно NEXT_PUBLIC_APP_URL=https://inpb.pro
#   4) Сборка: bash deploy/build-standalone.sh
#
# Переменные окружения (опционально):
#   APP_ROOT     — корень репозитория (по умолчанию каталог на уровень выше deploy/)
#   APP_USER     — пользователь для systemd (по умолчанию владелец APP_ROOT)
#   LETSENCRYPT_EMAIL — email для Let's Encrypt (обязателен для неинтерактивного certbot)
#   INCLUDE_WWW=0 — не запрашивать сертификат для www.inpb.pro
#
set -euo pipefail

if [[ "${EUID:-0}" -ne 0 ]]; then
  echo "Запусти: sudo bash deploy/bootstrap-server.sh"
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
APP_ROOT="${APP_ROOT:-$REPO_ROOT}"

if [[ ! -f "${APP_ROOT}/.next/standalone/server.js" ]]; then
  echo "Нет ${APP_ROOT}/.next/standalone/server.js — сначала на сервере:"
  echo "  cd ${APP_ROOT} && bash deploy/build-standalone.sh"
  exit 1
fi

# GNU stat: -f — это «файловая система», не владелец; на Linux ls -ld надёжнее
APP_USER="${APP_USER:-$(ls -ld "${APP_ROOT}" | awk '{print $3}')}"
APP_GROUP="${APP_GROUP:-$(ls -ld "${APP_ROOT}" | awk '{print $4}')}"
NODE_BIN="${NODE_BIN:-}"
if [[ -z "${NODE_BIN}" ]]; then
  NODE_BIN="$(command -v node 2>/dev/null || true)"
fi
if [[ -z "${NODE_BIN}" ]] && id -u "${APP_USER}" &>/dev/null; then
  NODE_BIN="$(sudo -u "${APP_USER}" -H sh -c 'command -v node' 2>/dev/null || true)"
fi
if [[ -z "${NODE_BIN}" ]]; then
  echo "Не найден node. Установи Node 20+ или задай путь: NODE_BIN=/usr/bin/node sudo -E bash deploy/bootstrap-server.sh"
  exit 1
fi

DOMAIN="inpb.pro"
mkdir -p /var/www/certbot
chown -R www-data:www-data /var/www/certbot 2>/dev/null || true

install -m 644 "${SCRIPT_DIR}/nginx-inpb.pro.conf" /etc/nginx/sites-available/inpb.pro
ln -sf /etc/nginx/sites-available/inpb.pro /etc/nginx/sites-enabled/inpb.pro

nginx -t
systemctl reload nginx

UNIT="/etc/systemd/system/inpb-next.service"
sed -e "s|__APP_USER__|${APP_USER}|g" \
    -e "s|__APP_GROUP__|${APP_GROUP}|g" \
    -e "s|__APP_ROOT__|${APP_ROOT}|g" \
    -e "s|__NODE_BIN__|${NODE_BIN}|g" \
    "${SCRIPT_DIR}/inpb-next.service" > "${UNIT}"

systemctl daemon-reload
systemctl enable --now inpb-next.service

echo "--- Next.js: systemctl status inpb-next.service ---"
systemctl --no-pager status inpb-next.service || true

CERT_ARGS=(--nginx -d "${DOMAIN}" --non-interactive --agree-tos)
if [[ -n "${LETSENCRYPT_EMAIL:-}" ]]; then
  CERT_ARGS+=(-m "${LETSENCRYPT_EMAIL}")
else
  echo ""
  echo "LETSENCRYPT_EMAIL не задан. Выпусти сертификат вручную (один раз), не трогая другие сайты:"
  echo "  certbot --nginx -d ${DOMAIN} -d www.${DOMAIN} --agree-tos -m you@email.com --redirect"
  echo "Или: sudo LETSENCRYPT_EMAIL=you@email.com bash deploy/bootstrap-server.sh"
  echo "(nginx и сервис уже настроены; certbot можно догнать отдельно.)"
  exit 0
fi

if [[ "${INCLUDE_WWW:-1}" != "0" ]]; then
  CERT_ARGS+=(-d "www.${DOMAIN}")
fi

certbot "${CERT_ARGS[@]}" --redirect

nginx -t
systemctl reload nginx
echo "Готово: https://${DOMAIN} → прокси на 127.0.0.1:3232"
