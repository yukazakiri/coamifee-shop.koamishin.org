# Update Guide

- [Update VPS](#update-vps)
- [Update Docker](#update-docker)
- [Manual Update](#manual-update)
- [Update Channels](#update-channels)
- [Troubleshooting](#troubleshooting)

## Update VPS

If you've installed the Coffee Shop Management System on a Linux virtual machine, to update it to the latest version you just need to run the `update.sh` script inside the root of the project.

:::warning
Make sure you SSH to your VPS server via `coffeeshop` user. If you logged in via the `root` user then change it to `coffeeshop` (`su coffeeshop`)
:::

```sh
cd /home/coffeeshop/coffeeshop

bash scripts/update.sh
```

If the above command didn't update your Coffee Shop Management System to the latest version, you can try the following commands:

```sh
git stash
git clean -f
bash scripts/update.sh
```

### Post-Update Steps

After updating, run these commands to ensure everything is properly optimized:

```sh
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear
php artisan migrate
php artisan optimize
```

Restart the services to apply updates:

```sh
sudo supervisorctl restart worker:*
sudo service nginx restart
sudo service php8.4-fpm restart
```

## Update Docker

If you've installed the Coffee Shop Management System on a Docker container, you just need to pull the latest version and recreate the container.

Pull the latest version:

```sh
docker pull yukazaki/coamifee-shop:latest
```

And then recreate the container:

```sh
docker-compose down
docker-compose up -d
```

### Docker Compose Update

If you're using Docker Compose, simply run:

```sh
docker-compose pull
docker-compose up -d --force-recreate
```

### Data Persistence

Your data will be preserved during updates if you're using volumes. To ensure data safety:

```bash
# Backup before major updates
docker exec coamifee-shop php artisan coffee:backup

# Verify volumes are mounted correctly
docker volume inspect coamifee-storage
docker volume inspect coamifee-database
```

## Manual Update

If the automated scripts fail, you can perform a manual update:

### Step 1: Backup Your Data
```sh
php artisan coffee:backup
cp .env .env.backup
```

### Step 2: Update the Code
```sh
git fetch origin
git checkout 1.x
git pull origin 1.x
```

### Step 3: Update Dependencies
```sh
composer install --no-dev --optimize-autoloader
npm install --production
npm run build
```

### Step 4: Run Database Migrations
```sh
php artisan migrate --force
```

### Step 5: Clear and Cache
```sh
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan optimize
```

### Step 6: Restart Services
```sh
php artisan queue:restart
sudo supervisorctl restart worker:*
```

## Update Channels

The Coffee Shop Management System offers multiple update channels:

### Stable Channel (Recommended)
```sh
# Docker
docker pull yukazaki/coamifee-shop:latest

# VPS - pulls from 1.x branch
bash scripts/update.sh
```

### Beta Channel
For users who want to test upcoming features:

```sh
# Docker
docker pull yukazaki/coamifee-shop:beta

# VPS
bash scripts/update.sh --beta
```

### Alpha Channel
For developers testing cutting-edge features:

```sh
# Docker
docker pull yukazaki/coamifee-shop:alpha

# VPS
bash scripts/update.sh --alpha
```

### Version-Specific Updates
To update to a specific version:

```sh
# Docker
docker pull yukazaki/coamifee-shop:1.2.3

# VPS
bash scripts/update.sh --version=1.2.3
```

## Troubleshooting

### Common Issues

#### Migration Fails
```sh
# Check migration status
php artisan migrate:status

# Rollback and retry
php artisan migrate:rollback --step=1
php artisan migrate --force
```

#### Permission Issues
```sh
# Fix file permissions
sudo chown -R coffeeshop:coffeeshop /home/coffeeshop/coffeeshop
sudo chmod -R 755 /home/coffeeshop/coffeeshop/storage
sudo chmod -R 755 /home/coffeeshop/coffeeshop/bootstrap/cache
```

#### Cache Issues
```sh
# Clear all caches
php artisan optimize:clear
php artisan optimize
```

#### Queue Issues
```sh
# Check queue status
php artisan queue:failed-table

# Restart queue workers
php artisan queue:restart
sudo supervisorctl restart worker:*
```

#### Database Connection Issues
```sh
# Test database connection
php artisan tinker
> DB::connection()->getPdo();

# Check database configuration
php artisan config:show database
```

### Rollback Update

If you need to rollback to a previous version:

```sh
# Get the previous commit hash
git log --oneline -5

# Rollback to previous version
git reset --hard <previous-commit-hash>

# Restore database if needed
php artisan migrate:rollback --step=<number-of-migrations>

# Clear caches
php artisan optimize:clear
php artisan optimize
```

### Health Check After Update

After updating, verify everything is working:

```sh
# Check system status
php artisan coffee:status

# Verify database
php artisan tinker
> \App\Models\Product::count();
> \App\Models\Order::count();

# Test queue system
php artisan queue:monitor

# Check logs
tail -f storage/logs/laravel.log
```

## Update Notifications

To receive update notifications, configure your email settings and enable notifications:

```env
UPDATE_NOTIFICATIONS=true
NOTIFICATION_EMAIL=admin@yourcoffeeshop.com
```

## Scheduled Updates

For automated updates, you can add a cron job:

```sh
# Edit crontab
crontab -e

# Add weekly update check (every Sunday at 2 AM)
0 2 * * 0 cd /home/coffeeshop/coffeeshop && bash scripts/update.sh --auto
```

:::info
The `--auto` flag will only apply security patches and minor updates automatically. Major version updates require manual approval.
:::

## Update Changelog

View the changelog to see what's new in each version:

```sh
# View recent changes
git log --oneline --since="1 month ago"

# View detailed changes
git log --pretty=format:"%h - %an, %ar : %s" --since="1 month ago"

# View all changes between versions
git log 1.1.0..1.2.0 --oneline
```

Your Coffee Shop Management System is now up to date! Remember to always backup your data before performing updates, especially for major version changes.