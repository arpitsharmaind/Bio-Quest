FROM php:8.3-fpm-alpine

RUN apk add --no-cache \
    libpng-dev libzip-dev zip unzip git \
    && docker-php-ext-install pdo_mysql zip gd

WORKDIR /var/www/html

COPY . .

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install --no-dev --optimize-autoloader --no-interaction

RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

CMD ["php-fpm"]