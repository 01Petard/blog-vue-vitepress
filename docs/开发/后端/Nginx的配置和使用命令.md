---
title: Nginx的配置和使用命令
date: 2022-07-26 13:10:15
updated:
categories: 
- 学习
tags: 
- 服务器
- Nginx
keywords:
- 服务器
- Nginx
description: 安装和简单使用Nginx部署项目
cover: https://uzbox.com/wp-content/uploads/2022/04/e5b0bc8d2560c94ecf913d99525b6525.png
top_img: https://wtit.com/wp-content/uploads/2022/01/WTIT-header-NGINX.png
---

### 1、配置文件地址

```
/opt/homebrew/etc/nginx/nginx.conf
```

### 2、bin目录

```
/opt/homebrew/Cellar/nginx/1.23.1/bin
```

### 3、前端页面地址

```
/opt/homebrew/var/www
```

### 4、启动nginx

```shell
sudo nginx
```

### 5、关闭nginx

```shell
sudo nginx -s stop
```

### 6、解决跨域

```
    server {
        listen       8080;
        server_name  192.168.0.114; #前端主机地址，我前后端都部署在局域网同一电脑上

        location / {
            root   html/dist;
            index  index.html index.htm;
            proxy_pass 192.168.0.114; #后端主机地址
        }
```
