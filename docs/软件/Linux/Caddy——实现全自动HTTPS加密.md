## 安装Caddy

去这个网站，点击`Docs`点击`install`，选择一个适合自己的服务器

快速链接：https://caddyserver.com/docs/install

我的服务器是CentOS 7，所以用如下命令：

```shell
yum install yum-plugin-copr
yum copr enable @caddy/caddy
yum install caddy
```

安装完后检查一下

```shell
caddy -v
```

![image-20250429232911217](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202504292329379.png)

检查caddy的状态

```shell
sudo service caddy status
```

![image-20250429233335765](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202504292333791.png)

发现寄了，原来是我的nginx还在`80`端口运行，赶紧关闭（😂）

再次运行，发现已经可以了

![image-20250429233301666](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202504292333688.png)

此时，直接访问`ip`，可以看到一个很可爱的界面

![image-20250429233530499](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202504292335527.png)

## 用Caddy部署项目

> 这里以我的博客引导页做演示

编辑caddy的配置文件

```shell
vim /etc/caddy/Caddyfile
```

修改`:80`改为我们的域名，比如我的域名是`codebox.icu`

```nginx
codebox.icu www.codebox.icu {
        # Set this path to your site's directory.
        root * /var/www/star-trail/dist  # 项目文件（index.html）所在目录

        # Enable the static file server.
        file_server

        # Another common task is to set up a reverse proxy:
        # reverse_proxy localhost:8080

        # Or serve a PHP site through php-fpm:
        # php_fastcgi localhost:9000
}
1.94.147.176:80 1.94.147.176:443{
        redir https://codebox.icu{uri}
}
```

为了实现通过`ip`访问页面可以添加第二段话，但其实这不是很推荐，因为在公网上不安全

最后，重启一下caddy就完成了

```shell
sudo systemctl reload caddy
```

## 域名解析

如果要实现域名访问，需要用DNS解析一下域名

为了使用`codebox.icu`和`www.codebox.icu`访问页面，需要去域名服务提供商那里进行解析，我采用阿里云的免费域名解析：https://dns.console.aliyun.com/

主机记录为`@`，可以实现主域名级别的访问；主机记录为`www`，可以实现`www`级的域名访问

![image-20250430000719149](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202504300007186.png)

## 深入：Caddy的原理

传统的HTTPS证书通常是需要收费的，特别是那些提供了较高验证级别的证书（如组织验证型OV或扩展验证型EV SSL证书）。然而，随着Let's Encrypt等免费证书颁发机构（CA）的出现，现在可以获得免费的域名验证型（DV）SSL证书。这些证书足以满足大多数网站对基本加密的需求。

Caddy可以帮我们免费获得并自动管理HTTPS证书的原因如下：

1. **集成Let's Encrypt**：Caddy服务器软件内置了对Let's Encrypt的支持。Let's Encrypt是一个提供免费DV SSL证书的非营利性证书颁发机构。它旨在通过自动化流程简化获取和更新证书的过程，以加速互联网从HTTP到HTTPS的过渡。
2. **自动化证书管理环境（ACME）协议**：Let's Encrypt使用ACME协议来自动化证书的申请、验证、续期和部署过程。Caddy能够与Let's Encrypt的ACME API进行通信，并自动执行这些步骤。这意味着我们不需要手动申请证书，也不需要担心证书过期的问题，因为Caddy会自动为你处理续期。
3. **无缝集成**：当配置Caddy时，我们已经指定域名和服务配置，Caddy会在后台自动获取并安装相应的SSL证书。如果证书即将到期，Caddy也会自动为其续期，无需人工干预。
4. **DNS验证支持**：为了证明我们对一个域名的所有权，Let's Encrypt通常要求某种形式的验证。Caddy可以通过多种方式帮助完成这个验证过程，包括简单的文件验证或者更复杂的DNS记录添加。对于泛域名证书（wildcard certificates），Caddy支持通过各种DNS服务提供商的API来自动设置所需的TXT记录。

因此，尽管传统上HTTPS证书是需要付费的，但借助于像Let's Encrypt这样的服务以及像Caddy这样集成了自动化证书管理功能的工具，现在可以很容易地为任何网站启用免费的HTTPS加密。这大大降低了网站运营者采用HTTPS的成本和技术门槛。