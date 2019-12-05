ARG INSTALL_BCMATH=true
ARG INSTALL_EXIF=false
ARG INSTALL_GD=false
ARG INSTALL_IMAGICK=true
ARG INSTALL_MOSQUITTO=false
ARG INSTALL_PGSQL=true
ARG INSTALL_REDIS=false
ARG INSTALL_XDEBUG=false
ARG INSTALL_ZIP=true

# Backend Builder
FROM clevyr/prestissimo as php-builder

WORKDIR /app

COPY composer.json composer.lock ./
# COPY nova/ nova/
# COPY nova-components/ nova-components/

RUN set -x \
    && composer install \
        --ignore-platform-reqs \
        --no-autoloader \
        --no-interaction \
        --no-progress \
        --no-suggest

COPY . ./
RUN set -x \
    && export TELESCOPE_ENABLED=false \
    && composer dump-autoload \
        --classmap-authoritative \
        --no-interaction \
    && php artisan nova:publish \
    && php artisan vendor:publish --tag=public

# Frontend Builder
FROM node:lts-alpine as node-builder

WORKDIR /app

COPY artisan package.json package-lock.json webpack.mix.js ./

RUN set -x \
    && npm ci

COPY public/ public/
COPY resources/ resources/

ARG NODE_ENV=production
ARG ENV=local

RUN set -x \
    && if [ "$ENV" != "local" ]; then \
        node_modules/webpack/bin/webpack.js \
            --no-progress \
            --hide-modules \
            --config=node_modules/laravel-mix/setup/webpack.config.js; \
    fi

# Final Image
FROM clevyr/laravel-base-image-builder

WORKDIR /app
VOLUME /app

COPY --chown=root docker/app/rootfs /

RUN crontab /etc/cron.d/scheduler

COPY --from=php-builder --chown=82:82 /app .
COPY --from=node-builder --chown=82:82 /app/public public/

CMD ["s6-svscan", "/etc/s6/app"]
