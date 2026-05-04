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

## Бот PR-CY (сканер inpb.pro)

**В репозитории:** `app/robots.ts` — для `PR-CY-BOT` и `PR-CY.RU` задано `Allow: /` (и общее правило `*` не запрещает публичные страницы, только `/api/`). Публичного `public/robots.txt` нет, отдаётся сгенерированный `/robots.txt`.

**Nginx** (`deploy/nginx-inpb.pro.conf`): нет фильтрации по IP или User-Agent; ботам ничего не мешает на уровне сервера.

**Cloudflare** (только вручную в панели; в git не хранится): если домен проксируется через Cloudflare, челлендж/WAF могут мешать сканеру. Создайте правило **разрешения** (имя, например, `Allow PR-CY`):

1. **Security** → **WAF** → **Custom rules** (в старом интерфейсе: **Security** → **WAF** → **Tools** / **Firewall rules** — смотрите актуальные пункты в вашей версии панели).
2. **Create rule** / **Создать правило**.
3. **Expression** (если есть редактор выражений), пример:

   ```txt
   (ip.src in {87.228.72.128/25}) or (http.user_agent contains "PR-CY")
   ```

   Если редактор другой — два условия через **OR**: источник IP в диапазоне **87.228.72.128/25** **или** HTTP User-Agent **contains** `PR-CY`.

4. **Action:** **Skip** → включите пропуск для **WAF** и при необходимости «всех остальных настроек безопасности» для этого запроса; либо действие **Allow** / **Bypass**, если такой вариант есть в вашей панели (цель — не отдавать боту капчу и не блокировать по IP).
5. Сохраните и убедитесь, что правило **выше** агрессивных правил «Block/Challenge all».

Проверка: после деплоя откройте `https://inpb.pro/robots.txt` и убедитесь, что есть блоки `User-agent: PR-CY-BOT` и `User-agent: PR-CY.RU` с `Allow: /`.
