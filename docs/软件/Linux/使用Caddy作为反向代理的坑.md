# 使用Caddy作为反向代理的坑

## Caddy的配置

```shell
# 主域名 + www，自动 HTTPS
codebox.icu, www.codebox.icu {
    root * /var/www/star-trail/dist
    file_server
}
# IP访问（比如调试用），不建议放线上
www.codebox.icu:8888 {
    root * /var/www/consultant/dist
    file_server browse
    handle_path /api/* {
       reverse_proxy localhost:8080
    }
}
# 80端口自动跳转到 HTTPS（建议）
http://1.94.147.176, https://1.94.147.176 {
    redir https://codebox.icu{uri}
}                                                  49,26         Bot
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

## 启动Caddy

------

### 🛠️ Step 1：给静态目录正确权限

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

### 🔍 Step 2：验证 `index.html` 存在并可读

```bash
ls -l /var/www/consultant/dist/index.html
```

应该看到类似：

```
-rw-r--r-- 1 caddy caddy 1024 Jul 5 20:00 index.html
```

------

### 🔁 Step 3：重启 Caddy

```bash
sudo systemctl restart caddy
```

然后访问：

```bash
http://1.94.147.176:8081
```

应该就能正常打开页面了🎉

------

## ❗如果想测试是否真的是权限问题，可以这么试：

临时用 root 手动跑：

```bash
sudo caddy run --config /etc/caddy/Caddyfile --adapter caddyfile
```

如果这样访问就没 403，说明百分百是 systemd 启动时用的 `caddy` 用户访问不到。

------

## 🧠 结论一句话：

> 403 不是你配置错，而是 Caddy 默认用的是低权限用户 `caddy`，你没给它目录访问权，它就只能给你一个 “别看了，没权限” 的 403。

搞定这个权限问题，页面就能正常通过 IP + 端口访问了 ✅
