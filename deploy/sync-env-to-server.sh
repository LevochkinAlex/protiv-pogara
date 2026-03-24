#!/usr/bin/env bash
# Выкладывает блок SMTP (и при необходимости весь .env) на production и перезапускает сервис.
# Использование:
#   DEPLOY_HOST=user@IP REMOTE_APP_ROOT=/srv/inpb bash deploy/sync-env-to-server.sh
#
# По умолчанию берёт SMTP_* из .env.local в корне репозитория (не коммитится).
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

if [[ -z "${DEPLOY_HOST:-}" ]]; then
  echo "Задайте хост: DEPLOY_HOST=user@ваш-сервер bash deploy/sync-env-to-server.sh"
  echo "Опционально: REMOTE_APP_ROOT=/srv/inpb (каталог репозитория на сервере)"
  exit 1
fi

REMOTE_APP_ROOT="${REMOTE_APP_ROOT:-/srv/inpb}"
LOCAL_ENV="${LOCAL_ENV:-$ROOT/.env.local}"
if [[ ! -f "$LOCAL_ENV" ]]; then
  echo "Нет файла $LOCAL_ENV"
  exit 1
fi

TMP="$(mktemp)"
trap 'rm -f "$TMP"' EXIT

# Минимальный набор для почты на сервере (остальное можно держать в том же .env на сервере)
{
  echo "# Синхронизировано deploy/sync-env-to-server.sh — $(date -Iseconds)"
  grep -E '^(SMTP_|MAIL_)' "$LOCAL_ENV" || true
} > "$TMP"

if ! grep -q '^SMTP_HOST=' "$TMP"; then
  echo "В $LOCAL_ENV нет SMTP_HOST — добавьте переменные Mail.ru (см. .env.example)"
  exit 1
fi

echo "→ Копирую SMTP-блок на $DEPLOY_HOST:$REMOTE_APP_ROOT/.env.smtp.new"
scp -q "$TMP" "${DEPLOY_HOST}:${REMOTE_APP_ROOT}/.env.smtp.new"

ssh -o BatchMode=yes "$DEPLOY_HOST" bash -s -- "$REMOTE_APP_ROOT" <<'REMOTE'
set -euo pipefail
ROOT="$1"
cd "$ROOT"
if [[ ! -f .env ]]; then
  touch .env
fi
# Удалить старые SMTP/MAIL строки и дописать новые
grep -v -E '^(SMTP_|MAIL_)' .env > .env.tmp || true
mv .env.tmp .env
cat .env.smtp.new >> .env
rm -f .env.smtp.new
chmod 600 .env
if systemctl is-active --quiet inpb-next 2>/dev/null; then
  if sudo -n systemctl restart inpb-next 2>/dev/null; then
    echo "→ inpb-next перезапущен"
  else
    echo "→ Нет passwordless sudo: на сервере выполните: sudo systemctl restart inpb-next"
  fi
else
  echo "→ Сервис inpb-next не активен — после настройки: sudo systemctl restart inpb-next"
fi
REMOTE

echo "Готово."
