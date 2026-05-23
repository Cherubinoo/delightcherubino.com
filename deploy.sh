#!/bin/bash
# Deploy script for delightcherubino.com
set -e

PROJECT_DIR="/home/administrator/prod/delightcherubino"
BACKEND_DIR="$PROJECT_DIR/backend"
FRONTEND_DIR="$PROJECT_DIR/frontend"
VENV="$BACKEND_DIR/venv/bin"

echo "==> Pulling latest code..."
git -C "$PROJECT_DIR" pull origin main

echo "==> Installing backend dependencies..."
$VENV/pip install -r "$BACKEND_DIR/requirements.txt" --quiet

echo "==> Running migrations..."
$VENV/python "$BACKEND_DIR/manage.py" migrate --noinput

echo "==> Collecting static files..."
$VENV/python "$BACKEND_DIR/manage.py" collectstatic --noinput

echo "==> Installing frontend dependencies..."
npm install --prefix "$FRONTEND_DIR" --silent

echo "==> Building frontend..."
npm run build --prefix "$FRONTEND_DIR"

echo "==> Restarting gunicorn..."
sudo systemctl restart delightcherubino-gunicorn

echo "==> Deploy complete!"
