FROM composer:2 AS vendor
WORKDIR /app
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader --no-interaction --no-scripts

FROM php:8.4-fpm-alpine
RUN apk add --no-cache libpng-dev libzip-dev zip unzip \
    && docker-php-ext-install pdo_mysql zip gd

WORKDIR /var/www/html
COPY . .
COPY --from=vendor /app/vendor ./vendor

RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

CMD ["php-fpm"]