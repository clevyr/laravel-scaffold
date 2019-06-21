#!/bin/bash
set -e

if [ "$AUTH" = "true" ]; then
    apk add --no-cache --no-progress --quiet --virtual .auth-deps openssl curl
    SHA1PASS="$(printf "$PASSWORD" | openssl sha1 -r | head -c 40 | awk '{ print toupper($0) }')"
    KANON="$(head -c 5 <<< "$SHA1PASS" | awk '{ print toupper($0) }')"
    HASHES="$(curl --silent --fail "https://api.pwnedpasswords.com/range/${KANON}")"
    while read -r line; do
        SUM="$(cut -d: -f1 <<< "$line")"
        if [ "$SHA1PASS" = "${KANON}${SUM}" ]; then
            echo "This password has been compromised before" >&2
            exit 2
        fi
    done <<< "$HASHES"
    echo "$USERNAME:$(openssl passwd -apr1 "$PASSWORD")" >> /etc/nginx/.htpasswd
    >&2 echo "Authentication is set"
    apk --no-progress --quiet del .auth-deps
fi

>&2 echo "Starting nginx"
nginx -g "daemon off;"
