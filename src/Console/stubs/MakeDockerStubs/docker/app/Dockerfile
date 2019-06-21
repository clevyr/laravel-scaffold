FROM php:7.2-fpm-alpine

WORKDIR /app

# Install selected extensions and other stuff
RUN set -ex \
	&& apk --no-cache add \
        postgresql-libs \
        postgresql-dev \
	&& docker-php-ext-install pgsql pdo_pgsql bcmath \
	&& apk del \
        postgresql-dev

RUN ln -s "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"

# Copy composer binary from the public composer image
COPY --from=composer /usr/bin/composer /usr/bin/composer
