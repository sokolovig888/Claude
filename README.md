# n8n — локальная установка через Docker

## Требования

- [Docker](https://docs.docker.com/get-docker/) (уже установлен)
- Docker Compose (входит в Docker Desktop)

## Быстрый старт

1. **Настрой переменные окружения:**
   ```bash
   cp .env.example .env
   # Отредактируй .env и замени N8N_ENCRYPTION_KEY на случайную строку
   ```

2. **Запусти n8n:**
   ```bash
   docker compose up -d
   ```

3. **Открой в браузере:**
   ```
   http://localhost:5678
   ```

4. **При первом запуске** создай аккаунт владельца в веб-интерфейсе.

## Управление

| Команда | Описание |
|---------|----------|
| `docker compose up -d` | Запустить в фоне |
| `docker compose down` | Остановить |
| `docker compose logs -f n8n` | Смотреть логи |
| `docker compose pull && docker compose up -d` | Обновить до последней версии |

## Данные

Все данные (воркфлоу, credentials) хранятся в Docker volume `n8n_data`.
Для бэкапа: `docker run --rm -v n8n_data:/data -v $(pwd):/backup alpine tar czf /backup/n8n_backup.tar.gz /data`

## Доступ из интернета (вебхуки)

Если нужны вебхуки от внешних сервисов — используй [ngrok](https://ngrok.com/):
```bash
ngrok http 5678
# Затем обнови WEBHOOK_URL в .env на полученный ngrok-адрес и перезапусти
```
