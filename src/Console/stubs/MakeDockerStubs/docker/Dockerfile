# Backend Builder
FROM clevyr/prestissimo as php-builder

WORKDIR /app

COPY composer.json composer.lock ./
COPY nova/ nova/
COPY nova-components/ nova-components/

RUN set -x \
    && composer install \
        --ignore-platform-reqs \
        --no-autoloader \
        --no-interaction \
        --no-progress \
        --no-suggest

COPY . ./
RUN set -x \
    && composer dump-autoload \
        --classmap-authoritative \
        --no-interaction

# Frontend Builder
FROM node:lts-alpine as node-builder

WORKDIR /app

COPY artisan package.json package-lock.json webpack.mix.js ./
COPY nova-components/ nova-components/

RUN set -x \
    && npm ci

COPY public/ public/
COPY resources/ resources/

ARG NODE_ENV=production

RUN set -x \
    && node_modules/webpack/bin/webpack.js \
        --no-progress \
        --hide-modules \
        --config=node_modules/laravel-mix/setup/webpack.config.js

# Packer
FROM alpine as packer

WORKDIR /app

COPY --from=php-builder --chown=82:82 /app ./
COPY --from=node-builder --chown=82:82 /app/public public/

RUN set -x \
    && tar -czf /app.tar.gz .

# Final Image
FROM php:7.3-fpm-alpine

WORKDIR /var/www/html
VOLUME /var/www/html

RUN set -ex \
    && apk add --virtual .build-deps \
        freetype-dev \
        libjpeg-turbo-dev \
        libpng-dev \
        libwebp-dev \
        postgresql-dev \
        $PHPIZE_DEPS \
    && apk add \
        fcgi \
        freetype \
        libjpeg-turbo \
        libpng \
        libwebp \
        postgresql-libs \
        s6 \
    && docker-php-ext-configure gd \
        --with-gd \
        --with-freetype-dir=/usr/include/ \
        --with-png-dir=/usr/include/ \
        --with-jpeg-dir=/usr/include/ \
        --with-webp-dir=/usr/include/ \
    && docker-php-ext-install -j$(nproc) gd pgsql pdo_pgsql \
    && apk del .build-deps \
    && rm -rf /tmp/* /var/cache/apk/* \
    && cd "$PHP_INI_DIR" \
    && sed -ri \
        -e 's/;(ping\.path)/\1/' \
        ../php-fpm.d/www.conf \
    && ln -s php.ini-production php.ini \
    && sed -ri \
        -e 's/^(expose_php).*$/\1 = Off/' \
        php.ini-production

COPY --from=packer /app.tar.gz /usr/src/app.tar.gz
COPY --chown=root docker/rootfs /

RUN set -x \
    && crontab /etc/cron.d/scheduler

CMD ["/entrypoint"]
