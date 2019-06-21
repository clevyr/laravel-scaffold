#!/bin/bash

# Any errors encountered will kill this script instead of being ignored.
set -e

echo 'Caddy service starting up.'

echo ''

envsubst '\$URL \$TLS_OPTIONS \$APP_HOST \$APP_PORT \$APP_PATH \$BASIC_AUTH_OPTIONS' < Caddyfile.template > /etc/Caddyfile

/bin/parent caddy --conf /etc/Caddyfile --log stdout --agree="$ACME_AGREE"
