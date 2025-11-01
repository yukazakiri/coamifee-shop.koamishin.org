# Securing Your Coffee Shop Management System

:::info
This guide is only for Coffee Shop Management System instances installed on a Virtual Private Server.
:::

- [Install SSL on Coffee Shop instance](#install-ssl-on-coffee-shop-instance)
- [Attach a domain](#attach-a-domain)
- [Get SSL](#get-ssl)
- [Coffee Shop System behind proxy](#coffee-shop-system-behind-proxy)
- [Update environment variables](#update-environment-variables)

## Install SSL on Coffee Shop instance

If you've installed the Coffee Shop Management System on a VPS, by default your instance will be accessible via your server's IP address which is not secure.

To secure it you need to attach a domain to it and get an SSL certificate for it.

### Attach a domain

Create an A record on your domain's DNS manager and point it to your VPS server's IP address.

:::warning
If you are using Cloudflare make sure you have the cloud proxy off at this stage!
:::

Open `/etc/nginx/sites-available/coffeeshop` with an editor on your terminal like `nano`:

```sh
sudo nano /etc/nginx/sites-available/coffeeshop
```

Edit it like the following and add your domain to it:

```nginx
server {
    ...
    server_name _ YOUR_DOMAIN_GOES_HERE;
    ...
}
```

Now run the following command to restart the webserver:

```sh
sudo service nginx restart
```

Make sure your webserver is not broken:

```sh
sudo service nginx status
```

It should have something like this:

```text
● nginx.service - A high performance web server and a reverse proxy server
     Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)
     Active: active (running) since Wed 2024-04-10 11:11:32 UTC; 3 days ago
       Docs: man:nginx(8)
   Main PID: 172473 (nginx)
...
```

Now open your domain to make sure it is ok and can be opened.

### Get SSL

Now you need to run the following command to generate the SSL

```sh
sudo certbot --force-renewal --nginx --noninteractive --agree-tos --cert-name YOUR_DOMAIN -m YOUR_EMAIL -d YOUR_DOMAIN --verbose
```

Make sure to replace the placeholders:

YOUR_DOMAIN: Your domain address like coffeeshop.example.com

YOUR_EMAIL: Your email address to be provided to letsencrypt

:::info
If you are using Cloudflare, now you can enable the cloud proxy if you want. Keep in mind that you might need to enable Full SSL encryption option on Cloudflare
:::

### Coffee Shop System behind proxy

You can put the Coffee Shop Management System behind a reverse proxy like Nginx. In order to do so, you will need to add the following configuration to your reverse proxy as well:

```nginx
proxy_buffer_size   128k;
proxy_buffers   4 256k;
proxy_busy_buffers_size   256k;
```

### Update environment variables

Now you need to add/update the following variables in the `.env` file if you are using VPS installation or docker's environment variables if you are using docker:

```sh
APP_URL=https://YOUR_DOMAIN
ASSET_URL=https://YOUR_DOMAIN
```

## Additional Security Considerations

### Firewall Configuration

It's recommended to configure your firewall to only allow necessary ports:

```sh
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw enable
```

### Regular Backups

Ensure your coffee shop data is backed up regularly:

```sh
# Backup database
php artisan coffee:backup

# Schedule automatic backups (add to crontab)
0 2 * * * cd /path/to/your/app && php artisan coffee:backup
```

### Security Updates

Keep your system updated with the latest security patches:

```sh
sudo apt update && sudo apt upgrade -y
```

### Monitor Access Logs

Regularly monitor your access logs for suspicious activity:

```sh
sudo tail -f /var/log/nginx/access.log
```

## Production Checklist

Before going live with your coffee shop system:

- [ ] SSL certificate installed and valid
- [ ] Domain properly configured and pointing to server
- [ ] Firewall configured with proper port rules
- [ ] Regular backups scheduled
- [ ] Admin password changed from default
- [ ] Email notifications configured
- [ ] Database backups tested
- [ ] SSL auto-renewal configured (certbot handles this automatically)
- [ ] System monitoring set up
- [ ] Access logs being monitored

Your Coffee Shop Management System is now secured and ready for production use!