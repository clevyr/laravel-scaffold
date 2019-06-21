# For npm install
FROM node:lts-alpine AS node-builder

WORKDIR /app

COPY . /app/

RUN npm ci \
    && npm run production

# For composer install
FROM composer:1.8 as php-builder

ARG ENVIRONMENT=development

WORKDIR /app

COPY --from=node-builder /app /app

RUN composer install --ignore-platform-reqs \
    && if [ "$ENVIRONMENT" = "production" ]; then php artisan view:cache; fi

# For data sharing
FROM busybox

WORKDIR /appstage

COPY --from=php-builder /app /appstage

RUN cp /appstage/startup.sh /

ENTRYPOINT [ "sh", "/startup.sh" ]
