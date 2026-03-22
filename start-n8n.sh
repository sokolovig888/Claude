#!/bin/bash
# Запуск n8n без Docker (через npm)
# Требует: Node.js 18+

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
N8N_DIR="/tmp/n8n-install"

if [ ! -d "$N8N_DIR/node_modules/.bin" ]; then
  echo "n8n не установлен. Устанавливаю..."
  mkdir -p "$N8N_DIR"
  cat > "$N8N_DIR/package.json" << 'PKGJSON'
{
  "name": "n8n-install",
  "version": "1.0.0",
  "overrides": {
    "xlsx": "0.18.5"
  }
}
PKGJSON
  cd "$N8N_DIR" && npm install n8n
fi

echo "Запускаю n8n на http://localhost:5678 ..."
cd "$N8N_DIR" && \
  N8N_ENCRYPTION_KEY="${N8N_ENCRYPTION_KEY:-localdevkey_change_me}" \
  GENERIC_TIMEZONE="${GENERIC_TIMEZONE:-Europe/Moscow}" \
  N8N_LISTEN_ADDRESS=0.0.0.0 \
  ./node_modules/.bin/n8n start
