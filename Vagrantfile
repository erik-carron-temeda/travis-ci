# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|

    config.vm.box = "scotch/box"
    config.vm.network "private_network", ip: "192.168.33.19"
    config.vm.hostname = "scotchbox"
    config.vm.synced_folder "./build", "/var/www/travis", :mount_options => ["dmode=777", "fmode=666"]

    config.vm.provision "shell", inline: <<-SHELL
      a2enmod proxy proxy_http rewrite ssl

      cat > /etc/apache2/sites-available/travis.local.conf <<-EOL
<VirtualHost *:80>
    ServerAdmin webmaster@localhost
    ServerName travis.local
    ServerAlias www.travis.local
    DocumentRoot /var/www/travis
    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
    SetEnv force-proxy-request-1.0 1
    SetEnv proxy-nokeepalive 1
    SSLProxyEngine on
    ProxyPass /api/ https://city.demo.temeda.com/api/
    ProxyPassReverse /api/ https://city.demo.temeda.com/api/
</VirtualHost>
EOL

      a2dissite scotchbox.local.conf
      a2dissite 000-default.conf
      a2ensite travis.local.conf
      service apache2 reload
      SHELL
end
