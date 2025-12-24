#!/bin/sh
set -e

echo "MySQL prest egotera itxoitten..."
while ! mysqladmin ping -h"$DB_HOST" -P"$DB_PORT" -u"$DB_USER" -p"$DB_PASSWORD" --silent; do
    sleep 2
done

echo "MySQL prest. Aplikazioa abiarazten..."
exec "$@"