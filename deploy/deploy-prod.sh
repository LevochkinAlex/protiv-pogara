#!/usr/bin/env bash
# Деплой production на СЕРВЕРЕ: обновление кода из GitHub, сборка standalone, рестарт сервиса.
# Не копирует файлы с локального ПК — только git.
#
# Запуск на сервере (из корня репозитория):
#   bash deploy/deploy-prod.sh
# Или:
#   REPO_DIR=/srv/inpb BRANCH=main sudo -E bash deploy/deploy-prod.sh
#
# С локальной машины (один раз настроив SSH):
#   ssh root@89.23.102.48 'cd /srv/inpb && bash deploy/deploy-prod.sh'
#
# Переменные окружения:
#   REPO_DIR   — каталог клона (по умолчанию: каталог, где лежит deploy/)
#   BRANCH     — ветка (по умолчанию: main)
#   SKIP_BUILD — если 1, только pull + restart (без npm build)
#   NO_RESTART — если 1, не перезапускать systemd
#
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="${REPO_DIR:-$(cd "${SCRIPT_DIR}/.." && pwd)}"
BRANCH="${BRANCH:-main}"
SKIP_BUILD="${SKIP_BUILD:-0}"
NO_RESTART="${NO_RESTART:-0}"

cd "${REPO_DIR}"

if ! git rev-parse --is-inside-work-tree &>/dev/null; then
  echo "Ошибка: ${REPO_DIR} не git-репозиторий. Клонируйте с GitHub, например:"
  echo "  git clone https://github.com/LevochkinAlex/protiv-pogara.git /srv/inpb"
  exit 1
fi

# Убедиться, что origin указывает на GitHub (публичный pull по HTTPS)
echo "==> Репозиторий: ${REPO_DIR}"
echo "==> remotes: $(git remote -v | head -2)"
echo "==> Ветка: ${BRANCH}"

# Сохранить .env, если вдруг перезаписывали
if [[ -f .env ]]; then
  echo "==> .env на месте"
fi

echo "==> git fetch origin ${BRANCH}"
git fetch origin "${BRANCH}"
echo "==> git pull --ff-only (без копирования с локального ПК)"
git pull --ff-only origin "${BRANCH}"

if [[ "${SKIP_BUILD}" != "1" ]]; then
  echo "==> Сборка standalone"
  bash deploy/build-standalone.sh
else
  echo "==> SKIP_BUILD=1 — сборка пропущена"
fi

if [[ "${NO_RESTART}" != "1" ]]; then
  if systemctl is-enabled inpb-next &>/dev/null; then
    echo "==> systemctl restart inpb-next"
    if systemctl restart inpb-next 2>/dev/null; then
      systemctl is-active inpb-next || true
    else
      echo "Пробуем sudo..."
      sudo -n systemctl restart inpb-next 2>/dev/null || {
        echo "Нет прав на systemctl. Вручную: sudo systemctl restart inpb-next"
      }
    fi
  else
    echo "Сервис inpb-next не найден. Установка один раз: sudo bash deploy/bootstrap-server.sh (после первой сборки)"
  fi
else
  echo "==> NO_RESTART=1 — рестарт пропущен"
fi

echo "==> Готово."
