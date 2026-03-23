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

## Ошибка "Claude скоро вернется" (Service Unavailable)

Если при работе с Claude API или на сайте claude.ai появляется страница с сообщением **"Клод скоро вернется"** и кодом ошибки — это **временный сбой на стороне Anthropic**, не связанный с твоей установкой n8n.

### Что делать

1. **Проверь статус**: https://status.anthropic.com
2. **Подожди** 5–15 минут и повтори попытку
3. **Очисти кэш браузера** (Ctrl+Shift+Delete) и попробуй снова

### Обработка ошибок в n8n-воркфлоу

Чтобы воркфлоу не падали при временной недоступности Claude API:

- В HTTP Request / Claude ноде включи **"Retry on fail"** (3–5 попыток, интервал 5–10 сек)
- Добавь **Error Trigger** ноду для уведомлений при сбоях
- Используй **IF ноду** для проверки статуса ответа перед обработкой
