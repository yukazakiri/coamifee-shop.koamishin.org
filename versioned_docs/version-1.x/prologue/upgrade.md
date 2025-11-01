# Upgrade Guide

:::warning
Before upgrading, first make a backup of `/home/coffeeshop/storage` folder and the `.env` file for VPS installations, and the volumes for Docker installations.
:::

- [Upgrading to 1.x from Previous Versions](#upgrading-to-1x-from-previous-versions)
- [Upgrade Docker Installation](#upgrade-docker-installation)
- [Upgrade VPS Installation](#upgrade-vps-installation)
  - [Automatic Upgrade](#automatic-upgrade)
  - [Manual Upgrade](#manual-upgrade)
  - [Upgrade failed?](#upgrade-failed)
- [Upgrade Local Installation](#upgrade-local-installation)

## Upgrading to 1.x from Previous Versions

This guide covers upgrading from any previous version to the current 1.x release of the Coffee Shop Management System.

## Upgrade Docker Installation

If you're using the latest tag, just follow the [Update](../getting-started/update#update-docker) steps.

If you're using an older tag, you need to change it to `1.x` or `latest` tag.

:::info
`1.x` tag is the latest code on the `1.x` branch, which might include new features but is stable.

`latest` tag is the latest stable release of the Coffee Shop Management System from the `1.x` branch, which is recommended for production use.

We recommend using the `latest`.
:::

:::warning
It is required to have the `APP_URL` environment variable set to your coffee shop URL, otherwise, some features like real-time order notifications won't work properly.
:::

## Upgrade VPS Installation

You can upgrade your Coffee Shop Management System instance from any previous version to 1.x in Automatic or Manual mode.

### Automatic Upgrade

Run the following command as `coffeeshop` user:

```sh
bash <(curl -Ls https://raw.githubusercontent.com/yukazaki/coamifee-shop/1.x/scripts/upgrade-to-1x.sh)
```

### Manual Upgrade

SSH to your VPS instance with user `coffeeshop` and continue with these steps:

Go to the root of the project:

```sh
cd /home/coffeeshop/coffeeshop
```

**Discard all possible changes to the code base:**

```sh
git stash
```

**Fix any possible ownership change to the code base:**

```sh
sudo chown -R coffeeshop:coffeeshop /home/coffeeshop/coffeeshop
```

**Install PHP 8.4:**

```sh
sudo add-apt-repository ppa:ondrej/php -y
sudo apt update
sudo apt install -y php8.4 php8.4-fpm php8.4-mbstring php8.4-mcrypt php8.4-gd php8.4-xml php8.4-curl php8.4-gettext php8.4-zip php8.4-bcmath php8.4-soap php8.4-redis php8.4-sqlite3 php8.4-intl
sudo sed -i "s/www-data/coffeeshop/g" /etc/php/8.4/fpm/pool.d/www.conf
sudo service php8.4-fpm enable
sudo service php8.4-fpm start
sudo apt install -y php8.4-ssh2
sudo service php8.4-fpm restart
sudo sed -i "s/memory_limit = .*/memory_limit = 1G/" /etc/php/8.4/fpm/php.ini
sudo sed -i "s/upload_max_filesize = .*/upload_max_filesize = 1G/" /etc/php/8.4/fpm/php.ini
sudo sed -i "s/post_max_size = .*/post_max_size = 1G/" /etc/php/8.4/fpm/php.ini
```

**Install Redis:**

The Coffee Shop Management System version 1.x uses Redis for caching, sessions, and queues. You need to install Redis server on your VPS.

```sh
sudo apt install redis-server -y
sudo service redis enable
sudo service redis start
```

**Install Node.js:**

Coffee Shop Management System v1 uses Livewire 3 and modern frontend build tools, which require Node.js to be installed.

```sh
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
```

**Adjust the Nginx configuration:**

Set php-fpm to use PHP 8.4 instead of older PHP versions by running the following command:

```sh
sudo sed -i "s/php8.2-fpm.sock/php8.4-fpm.sock/g" /etc/nginx/sites-available/coffeeshop
```

Add the following to `/etc/nginx/sites-available/coffeeshop` as well:

```nginx
    location ~ \.php$ {
        ...
        fastcgi_buffers 16 16k;
        fastcgi_buffer_size 32k;
        ...
    }
```

You can run this command instead:

```sh
sudo sed -i '/location ~ \\\.php\$ {/a \    fastcgi_buffers 16 16k;\n    fastcgi_buffer_size 32k;' /etc/nginx/sites-available/coffeeshop
```

:::warning
Make sure to confirm the change by opening the file `/etc/nginx/sites-available/coffeeshop`
:::

The Coffee Shop Management System v1 transfers more data in request headers due to real-time features, so you need to increase the `client_max_body_size`.

Open `/etc/nginx/sites-available/coffeeshop` and add `client_max_body_size 100M;` line inside the `server` block.

This increase is necessary to allow you to export and import larger coffee shop settings and product images.

```nginx
server {
    ...
    client_max_body_size 100M;
    ...
}
```

Then restart Nginx:

```sh
sudo service nginx restart
```

**Update supervisor configuration**

The Coffee Shop Management System now uses [Laravel Horizon](https://laravel.com/docs/12.x/horizon) for managing queues, so you need to update the supervisor configuration.

You need to update `/etc/supervisor/conf.d/worker.conf` file to use Horizon instead of the worker.

```sh
sudo sed -i 's/command=php \/home\/coffeeshop\/coffeeshop\/artisan queue:work --sleep=3 --backoff=0 --queue=default,orders,notifications --timeout=3600 --tries=1/command=php \/home\/coffeeshop\/coffeeshop\/artisan horizon/' /etc/supervisor/conf.d/worker.conf
```

Or do it manually by setting `command` to:

```sh
command=php /home/coffeeshop/coffeeshop/artisan horizon
```

Then restart supervisor:

```sh
sudo service supervisor restart
```

**Pull the latest changes:**

```sh
git fetch
```

**Switch to the `1.x` branch:**

```sh
git checkout 1.x
```

**Run the update script:**

```sh
bash scripts/update.sh
```

### Upgrade failed?

If the upgrade (automatic or manual) failed, follow these steps to fix it:

1. [Install a new Coffee Shop Management System instance](../getting-started/installation.mdx#install-on-vps)
2. Copy the `.env` file from the old instance backup to the new instance
3. Copy the `storage` folder from the old instance backup to the new instance
4. Copy the database file from `/database/database.sqlite` if using SQLite
5. Run `bash scripts/update.sh` on the new instance to apply the changes
6. Run `php artisan migrate` to update the database schema

## Upgrade Local Installation

If you're using Laravel Sail, you need to kill the current container and delete its images and then boot Sail up again.

[Read the installation documentation](../getting-started/installation.mdx#laravel-sail) for more information.

If you're using other tools like Laravel Valet, etc., you need to make sure you have PHP 8.4 installed and then switch to the `1.x` branch.

:::warning
Make sure you set the `REDIS_HOST=redis` environment variable in your `.env` file.
:::

## Post-Upgrade Steps

After completing the upgrade, perform these steps to ensure everything is working correctly:

1. **Clear all caches:**
   ```sh
   php artisan optimize:clear
   php artisan optimize
   ```

2. **Run database migrations:**
   ```sh
   php artisan migrate --force
   ```

3. **Seed any new data:**
   ```sh
   php artisan db:seed --class=CoffeeShopDataSeeder
   ```

4. **Test key features:**
   - Check if the admin panel loads correctly
   - Test product creation and management
   - Verify order processing works
   - Check real-time notifications

5. **Backup your upgraded system:**
   ```sh
   php artisan coffee:backup
   ```

## Troubleshooting Common Issues

### Database Issues
If you encounter database errors after upgrade:
```sh
php artisan migrate:status
php artisan migrate:rollback --step=1
php artisan migrate --force
```

### Queue Issues
If background jobs are not working:
```sh
php artisan queue:restart
sudo supervisorctl restart horizon
```

### Cache Issues
If you see outdated data:
```sh
php artisan config:clear
php artisan cache:clear
php artisan view:clear
```

### Permission Issues
Fix file permissions:
```sh
sudo chown -R coffeeshop:coffeeshop /home/coffeeshop/coffeeshop
sudo chmod -R 755 /home/coffeeshop/coffeeshop/storage
sudo chmod -R 755 /home/coffeeshop/coffeeshop/bootstrap/cache
```

Your Coffee Shop Management System is now upgraded to the latest 1.x version!