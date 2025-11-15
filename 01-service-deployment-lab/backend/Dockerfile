FROM php:8.2-cli

RUN apt-get update && apt-get install -y \
libzip-dev zip unzip libpng-dev libjpeg-dev libfreetype6-dev libonig-dev libxml2-dev curl git libpq-dev\
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo pdo_mysql pdo_pgsql zip gd

WORKDIR /var/www/html

COPY . . 

EXPOSE 8000

CMD ["php", "-S", "0.0.0.0:8000", "-t", "public"]
