# 使用Caddy作为反向代理的坑

## 下载caddy

在mac上比较简单

```shell
brew install caddy
```

在linux上就需要参考官网文档了，不同发行版还不一样

> https://caddyserver.com/docs/install

## Caddy的配置

在mac上用homebrew安装caddy时没有配置文件的，所以需要自己指定，而在linux上，以centos为例，配置文件的路径是`/etc/caddy/Caddyfile`

配置示例：（结合http和https）

```shell
http://localhost:380 {
    root * /Users/hzx/project_func/blog-star-trail/dist
    file_server
}

# 主域名 + www，自动 HTTPS
codebox.icu, www.codebox.icu {
    root * /var/www/star-trail/dist
    file_server
}
# 80端口自动跳转到 HTTPS
http://1.94.147.176, https://1.94.147.176 {
    redir https://codebox.icu{uri}
}

www.codebox.icu:8888 {
    root * /var/www/consultant/dist
    file_server browse
    handle_path /api/* {
       reverse_proxy localhost:8080
    }
}
www.codebox.icu:5173 {
    root * /var/www/heima-ai/dist
    file_server browse
   # handle_path /* {
   #    reverse_proxy localhost:5174
   # }
}
                                                 49,26         Bot
```

## Caddy配置对比Nginx配置

```nginx
# The Caddyfile is an easy way to configure your Caddy web server.
#
# Unless the file starts with a global options block, the first
# uncommented line is always the address of your site.
#
# To use your own domain name (with automatic HTTPS), first make
# sure your domain's A/AAAA DNS records are properly pointed to
# this machine's public IP, then replace ":80" below with your
# domain name.
#
# Refer to the Caddy docs for more information:
# https://caddyserver.com/docs/caddyfile

http://localhost:280 {
    # 静态文件服务
    root * /Users/hzx/project_func/blog-star-trail/dist
    file_server {
        index index.html
    }
    # 错误页面
    handle_errors {
        rewrite /Users/hzx/caddy/50x.html
        file_server
    }

}

http://localhost:380 {
    # 反向代理，将 /**/ 路径代理到 http://localhost:5174/
    root * /Users/hzx/project_func/blog-star-trail/dist
    file_server {
        index index.html
    }

    # 反向代理，将 /**/ 路径代理到 http://localhost:5174/
    @proxy {
        path_regexp all /.*/  # 匹配任意路径
    }
    reverse_proxy @proxy http://localhost:5174

    # 错误页面
    handle_errors {
        rewrite /Users/hzx/caddy/50x.html
        file_server
    }

}


# Caddyfile 对应转换自 Nginx 配置

# 静态前端和反向代理的主 server
http://localhost:480 {

    # 错误页面
    handle_errors {
        rewrite /Users/hzx/caddy/50x.html
        file_server
    }

    # upstream webservers {
    #   server localhost:8008;
    # }
    # Caddy 中 upstream 可以直接用 reverse_proxy 指定地址

    # location /api {
    #     proxy_set_header Host $host;
    #     proxy_set_header X-Real-IP $remote_addr;
    #     proxy_set_header X-Real-PORT $remote_port;
    #     proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    #     rewrite /api/(.*)  /$1 break;
    #     proxy_pass http://localhost:5174;
    # }
    # Caddy 等效可以写成：
    @api {
        path /api/*
    }
    reverse_proxy @api http://localhost:5174

    # WebSocket 配置
    # location /ws/ {
    #     proxy_pass   http://localhost:8008;
    #     proxy_http_version 1.1;
    #     proxy_read_timeout 3600s;
    #     proxy_set_header Upgrade $http_upgrade;
    #     proxy_set_header Connection "upgrade";
    #     proxy_set_header Host $host;
    #     proxy_set_header X-Real-IP $remote_addr;
    #     proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    #     proxy_set_header X-Forwarded-Proto $scheme;
    #     proxy_buffer_size 16k;
    #     proxy_buffers 4 32k;
    #     proxy_busy_buffers_size 64k;
    # }
    # Caddy 等效：
    @ws {
        path /ws/*
    }

    reverse_proxy @ws localhost:8008 {
        transport http {
            versions 1.1 2
        }
    }

    # 处理用户端发送的请求
    # location /user/ {
    #     proxy_pass   http://webservers/user/;
    # }
    # Caddy 等效： # 匹配 /user/* 路径
    @user {
        path /user/*
    }

    reverse_proxy @user localhost:8008
}
```

## 使用Caddy

查看状态
```shell
caddy status
```

前台启动
```shell
caddy run --config ~/caddy/Caddyfile
```

后台启动
```shell
caddy start --config ~/caddy/Caddyfile
```

重启
```shell
caddy reload --config ~/caddy/Caddyfile
```

停止
```shell
caddy stop
```
## 项目运维命令

下载jdk

```shell
sudo dnf install java-17-openjdk-devel -y
```

输入数字选择jdk版本

```shell
 alternatives --config java
```

中断进程

```shell
ps -ef | grep java | grep consultant | grep -v grep | awk '{print $2}'
```

后台启动

```shell
nohup java -Xmx256mb -Xms256mb -XX:+UseG1GC -jar /var/www/consultant/consultant-0.0.1-SNAPSHOT > /dev/null 2>&1 &
```

```java
nohup java -Xmx160m -Xms160m -XX:+UseG1GC -jar /var/www/consultant/consultant-0.0.1-SNAPSHOT.jar > /var/log/consultant.log 2>&1 &
```

## Caddy排错

```shell
systemctl status caddy -l
```

```shell
journalctl -xeu caddy
```

排查端口报错

```shell
sudo lsof -i:80
sudo lsof -i:443
sudo lsof -i:8081
```

```shell
ps -ef | grep 'xxxx'
```

```shell
kill -9 {pid}
```

## 解决启动Caddy时权限不足的问题

403 不是配置错，而是 Caddy 默认用的是低权限用户 `caddy`，没给它目录访问权，它就只能给你一个 “别看了，没权限” 的 403。搞定这个权限问题，页面就能正常通过 IP + 端口访问了 

------
### Step 1：给静态目录正确权限

假设你页面放在 `/var/www/consultant/dist`，那么执行：

```bash
sudo chown -R caddy:caddy /var/www/consultant
sudo chmod -R 755 /var/www/consultant
```

或者更宽松一点测试用：

```bash
sudo chmod -R o+rx /var/www/consultant
```

确保 caddy 用户可以：

- 进入 `/var/www/consultant` 和 `/dist` 目录（`x` 权限）
- 读取里面的文件（`r` 权限）

------
### Step 2：验证 `index.html` 存在并可读

```bash
ls -l /var/www/consultant/dist/index.html
```

应该看到类似：

```
-rw-r--r-- 1 caddy caddy 1024 Jul 5 20:00 index.html
```

------
### Step 3：重启 Caddy

```bash
sudo systemctl restart caddy
```

然后访问：

```bash
http://1.94.147.176:8081
```

应该就能正常打开页面了🎉

------
### 如果想测试是否真的是权限问题，可以这么试：

临时用 root 手动跑：

```bash
sudo caddy run --config /etc/caddy/Caddyfile --adapter caddyfile
```

如果这样访问就没 403，说明百分百是 systemd 启动时用的 `caddy` 用户访问不到。