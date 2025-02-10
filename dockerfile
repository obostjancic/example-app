# Use official PHP image with PHP 8.2 and Apache
FROM php:8.2-apache

# Set working directory
WORKDIR /var/www/html

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libsqlite3-dev \
    unzip \
    zip \
    nodejs \
    npm

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd pdo_sqlite

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Configure Apache
ENV APACHE_DOCUMENT_ROOT=/var/www/html/public
RUN sed -i "s|/var/www/html|${APACHE_DOCUMENT_ROOT}|g" /etc/apache2/sites-available/000-default.conf \
    && sed -i "s|/var/www/|${APACHE_DOCUMENT_ROOT}|g" /etc/apache2/apache2.conf

# Enable Apache modules
RUN a2enmod rewrite
RUN a2enmod headers

# Configure Apache directory and index
RUN sed -i '/<Directory \/var\/www\/>/,/<\/Directory>/ s/AllowOverride None/AllowOverride All/' /etc/apache2/apache2.conf \
    && sed -i 's/DirectoryIndex index.html/DirectoryIndex index.php index.html/' /etc/apache2/apache2.conf

# Copy application files
COPY . /var/www/html

# Ensure proper directory permissions
RUN mkdir -p /var/www/html/storage /var/www/html/bootstrap/cache /var/www/html/database \
    && touch /var/www/html/database/database.sqlite \
    && chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html \
    && chmod -R 775 /var/www/html/storage \
    && chmod -R 775 /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/database

# Install Composer dependencies
RUN composer install --no-interaction --no-plugins --no-scripts

# Install NPM dependencies and build frontend
RUN npm install
RUN npm run build

# Generate Laravel key
RUN php artisan key:generate

# Clear config cache
RUN php artisan config:clear

# Expose port 80
EXPOSE 80

# Start Apache
CMD ["apache2-foreground"]# Use official PHP image with PHP 8.2 and Apache
FROM php:8.2-apache

# Set working directory
WORKDIR /var/www/html

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libsqlite3-dev \
    unzip \
    zip \
    nodejs \
    npm

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd pdo_sqlite

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Configure Apache
ENV APACHE_DOCUMENT_ROOT=/var/www/html/public
RUN sed -i "s|/var/www/html|${APACHE_DOCUMENT_ROOT}|g" /etc/apache2/sites-available/000-default.conf \
    && sed -i "s|/var/www/|${APACHE_DOCUMENT_ROOT}|g" /etc/apache2/apache2.conf

# Enable Apache modules
RUN a2enmod rewrite
RUN a2enmod headers

# Configure Apache directory and index
RUN sed -i '/<Directory \/var\/www\/>/,/<\/Directory>/ s/AllowOverride None/AllowOverride All/' /etc/apache2/apache2.conf \
    && sed -i 's/DirectoryIndex index.html/DirectoryIndex index.php index.html/' /etc/apache2/apache2.conf

# Create a new Apache configuration file to ensure proper permissions
RUN echo '<Directory /var/www/html/public>' >> /etc/apache2/conf-available/laravel-public.conf \
    && echo '    Options Indexes FollowSymLinks' >> /etc/apache2/conf-available/laravel-public.conf \
    && echo '    AllowOverride All' >> /etc/apache2/conf-available/laravel-public.conf \
    && echo '    Require all granted' >> /etc/apache2/conf-available/laravel-public.conf \
    && echo '</Directory>' >> /etc/apache2/conf-available/laravel-public.conf \
    && a2enconf laravel-public

# Copy application files
COPY . /var/www/html

# Ensure proper directory permissions
RUN mkdir -p /var/www/html/storage /var/www/html/bootstrap/cache /var/www/html/database \
    && touch /var/www/html/database/database.sqlite \
    && chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html \
    && chmod -R 775 /var/www/html/storage \
    && chmod -R 775 /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/database \
    && chmod -R 755 /var/www/html/public \
    && chmod 644 /var/www/html/public/index.php

# Install Composer dependencies
RUN composer install --no-interaction --no-plugins --no-scripts

# Install NPM dependencies and build frontend
RUN npm install
RUN npm run build

RUN printenv | grep APP_KEY > .env
# Generate Laravel key
RUN php artisan key:generate

RUN rm .env

# Clear config cache
RUN php artisan config:clear

# Expose port 80
EXPOSE 80

# Start Apache
CMD ["apache2-foreground"]