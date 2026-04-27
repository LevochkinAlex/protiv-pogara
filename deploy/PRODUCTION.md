# Production (inpb.pro): деплой только с GitHub

Сервер **не** получает файлы с локального ПК. Источник кода — ветка `main` в репозитории [protiv-pogara](https://github.com/LevochkinAlex/protiv-pogara).

## Один раз на сервере

1. **Клон с GitHub** (HTTPS, публичный репо не требует токена на pull):

   ```bash
   sudo mkdir -p /srv
   sudo chown $USER /srv
   git clone https://github.com/LevochkinAlex/protiv-pogara.git /srv/inpb
   cd /srv/inpb
   ```

2. **Окружение** (секреты не в git): `cp deploy/env.production.example .env` и отредактируйте.

3. **Первичная настройка nginx + systemd** (один раз, от root):

   ```bash
   cd /srv/inpb && bash deploy/build-standalone.sh
   sudo bash deploy/bootstrap-server.sh
   ```

## Регулярный деплой (на сервере)

Только `git` + сборка + рестарт:

```bash
cd /srv/inpb && bash deploy/deploy-prod.sh
```

С локальной машины (если настроен SSH):

```bash
ssh root@SERVER 'cd /srv/inpb && bash deploy/deploy-prod.sh'
```

`deploy-prod.sh` делает: `git fetch` / `git pull --ff-only origin main` → `deploy/build-standalone.sh` → `systemctl restart inpb-next`.

## Автодеплой из GitHub Actions

1. **Deploy key (рекомендуется)**  
   - На сервере: `~/.ssh/authorized_keys` уже содержит ваш ключ, если ходите с локального ПК.  
   - Для CI создайте **отдельную пару** ключей *только* для GitHub:  
     `ssh-keygen -t ed25519 -f github-deploy-inpb -C github-actions`  
   - Публичный ключ: в `~/.ssh/authorized_keys` пользователя деплоя на сервере.  
   - Приватный: в репозитории **Settings → Secrets → `DEPLOY_SSH_KEY`**.

2. **Секреты**: `DEPLOY_HOST` (IP или hostname), `DEPLOY_USER` (например `root`).

3. Push в `main` запустит [`.github/workflows/deploy-inpb.yml`](../.github/workflows/deploy-inpb.yml).

## Синхронизация только `.env` с локалки (редко)

Скрипт `deploy/sync-env-to-server.sh` — только **SMTP-переменные** с вашего `.env.local` на сервер, не весь репозиторий. Код на прод по-прежнему только через `git pull` / Actions.

## Приватный репозиторий

На сервере настройте `git` на работу с GitHub: [deploy key](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/managing-deploy-keys#deploy-keys) для read-only `git pull` или `https` + token в credential helper (не в репозитории).
