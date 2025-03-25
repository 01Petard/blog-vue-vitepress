# Ubuntu项目部署通用流程

## 系统

### 查看系统版本

```shell
sudo lsb_release -a
```

### 查看用户组信息

```shell
id
```

```shell
grep `whoami` /etc/group
```

### 更新源

```shell
sudo apt-get upgrade
```

### 同步时间

方法一：

```shell
sudo systemctl status systemd-timesyncd
```

```shell
sudo systemctl start systemd-timesyncd
```

```shell
sudo vim /etc/systemd/timesyncd.conf
```

找到`(Time)`部分，修改或添加`NTP=ntp.ubuntu.com`

```shell
sudo systemctl restart systemd-timesyncd
```

```shell
timedatectl status
```

方法二：

```shell
sudo timedatectl set-ntp true
```

```shell
sudo timedatectl set-ntp false
```

```shell
sudo systemctl restart systemd-timesyncd
```

### 配置SSH远程访问

```shell
sudo vim /etc/ssh/sshd_config
```

添加命令

```
#PermitRootLogin prohibit-password
PermitRootLogin yes
PasswordAuthentication yes
```

设置密码（可选）

```shell
sudo passwd abc123!
```

刷新配置

```shell
systemctl restart sshd
```

## 安装MySQL

### 安装MySQL

```shell
sudo apt install mysql-server 
```

### 启动、设置自启

```shell
sudo systemctl start mysql
```

```shell
sudo systemctl enable mysql
```

### 配置远程访问、中文乱码

允许远程连接

```shell
sudo vim /etc/mysql/mysql.conf.d/mysqld.cnf
```

修改、添加如下命令：

```
bind-address		= 0.0.0.0
mysqlx-bind-address	= 0.0.0.0
```

```
character_set_server=utf8
```

检查是否已修改

```shell
cat /etc/mysql/mysql.conf.d/mysqld.cnf
```

### 重启MySQL

```shell
systemctl restart mysql
```

### 查看MySQL状态

> 用`Navicat`测试能否连接

查看mysql服务状态

```shell
sudo systemctl status mysql
```

查看mysql服务是否启动

```shell
ps -ef | grep mysql-server
```

![image-20250226094636932](https://i.postimg.cc/BvXFPZFk/image-20250226094636932.png)

## 配置MySQL用户

### 修改本地用户密码

本地用户作为项目SQL使用

```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'm5Jwk.JR*Uxpbt^9f8jp';
```

```sql
GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost';
```

```sql
FLUSH PRIVILEGES;
```

### 验证本地用户能否登录

```sql
mysql -u root -p
m5Jwk.JR*Uxpbt^9f8jp
```

### 创建远程用户

远程用户作为远程数据库连接使用

```shell
sudo mysqld_safe --skip-grant-tables &
```

```shell
sudo mysql
```

```sql
CREATE USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'm5Jwk.JR*Uxpbt^9f8jp';
```

```sql
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%';
```

```sql
FLUSH PRIVILEGES;
```

## 安装Redis

安装Redis

```shell
sudo apt install redis-server
```

### 启动、设置自启

```shell
sudo systemctl start redis-server
```

```shell
sudo systemctl enable redis-server
```

### 配置远程访问、安全密码

```shell
sudo vim /etc/redis/redis.conf
```

远程访问：`bind 127.0.0.1`改为 `bind 0.0.0.0`

添加密码：`requirepass UmZHKT39sM`

### 重启Redis服务

```shell
sudo systemctl restart redis-server
```

### 查看Redis状态

> 用`Another Redis DesktopManager`测试能否连接

查看Redis服务状态

```shell
sudo systemctl status redis
```

查看Redis服务进程

```shell
ps -ef | grep redis-server
```

![image-20250226095310898](https://i.postimg.cc/CL9ppmN8/image-20250226095310898.png)

## 安装Java

安装jdk8

```shell
sudo apt install openjdk-8-jdk
```

查看是否安装成功

```shell
java -version
```

## 安装Node（非必要）

### 下载nvm安装脚本

方法一：

```shell
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.39.7/install.sh | bash
```

方法二：

```shell
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.39.7/install.sh | bash
```

方法三：

> 下载不了就用这个文件 https://pan.baidu.com/s/1vVPqnTRPoZGgAPHoazyuhw?pwd=1111

方法四：

```shell
git clone https://gitee.com/mirrors/nvm.git ~/.nvm && cd ~/.nvm && git checkout `git describe --abbrev=0 --tags`
```

### 安装nvm

如果是方法一、二、三：

```shell
bash ~/nvm_install.sh
```

如果是方法四：

```shell
~/.nvm/install.sh
```

刷新系统环境

```shell
source ~/.bashrc
```

检查nvm是否安装成功

```shell
nvm -version
```

### 安装node

```
nvm install 14.17.6
```

配置镜像源

```
npm config set registry https://registry.npmmirror.com
```

> 查看已下载node版本
>
> ```
> nvm list
> ```
>
> 使用某个node版本
>
> ```
> nvm use 14.17.6
> ```
>

## 安装Nginx

### 下载nginx

```
sudo apt install nginx
```

### 设置nginx自启

```shell
sudo systemctl enable nginx
```

### 启动、停止、重启nginx

```shell
sudo systemctl start nginx
```

```shell
sudo systemctl stop nginx
```

```shell
sudo systemctl restart nginx
```

### 查看nginx状态

```shell
ps -ef | grep nginx
```

```shell
sudo systemctl status nginx
```

### 修改nginx配置文件

```shell
sudo vim /etc/nginx/sites-enabled/yanfeng
```

改完记得重启`nginx`

```nginx
server {
    listen 9000; # nginx端口
    server_name localhost; # nginx域名

    #charset koi8-r;

    location / {
        root  /var/www/dist/; # 配置默认访问路径
        index  index.html index.htm; # 默认打开的文件名
    }

    location /api {
        rewrite ^/api/(.*) /$1 break;
        proxy_pass http://127.0.0.1:8088; # 指定 www.hao123.com/api.....的请求代理到 localhost:9999的域名
        proxy_read_timeout 10s;
    }

    location /api/5B20 {
        rewrite ^/api/[^/]+/(.*) /$1 break;
        proxy_pass http://127.0.0.1:8088;
        proxy_read_timeout 10s;
    }

    location /api/5B20/5B200101/tcs/core {
        rewrite ^/api/[^/]+/[^/]+/tcs/core/?(.*)$ /tcs/core/$1 break;
        proxy_pass http://10.0.0.78:7566; # 切换为调度接口地址
        proxy_read_timeout 10s;
    }

    location /api/5B20/5B200101/websocket {
        proxy_pass http://10.0.0.78:7567; # 切换为调度接口地址
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_read_timeout 60s;
        proxy_send_timeout 60s;

        # 处理跨域预检请求的响应头
        add_header Access-Control-Allow-Origin *;
        add_header Access-Control-Allow-Methods "GET, POST, OPTIONS";
        add_header Access-Control-Allow-Headers "Upgrade, Connection, Host";

        # 可选：处理 OPTIONS 请求
        if ($request_method = OPTIONS) {
            add_header Access-Control-Allow-Origin *;
            add_header Access-Control-Allow-Methods "GET, POST, OPTIONS";
            add_header Access-Control-Allow-Headers "Upgrade, Connection, Host";
            return 204; # 204 No Content 表示成功处理预检请求
        }
    }

    error_page  500 502 503 504  /50x.html;
    location = /50x.html {
        root  html;
    }
}
```

### 用于简单页面的nginx配置

```nginx
# 监听 80 端口，指向 /var/www/star-trail/dist/
server {
    listen 80;
    server_name localhost;  # 可以替换为实际域名或保留 localhost

    location / {
        root /var/www/star-trail/dist/;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;  # 支持单页应用（SPA）路由
    }

    # 其他配置（如错误页面）可保留或自定义
    error_page 404 /404.html;
    location = /404.html {
        internal;
    }
}

# 监听 180 端口，指向 /var/www/blog/dist/
server {
    listen 180;
    server_name localhost;  # 可以替换为实际域名或保留 localhost

    location / {
        root /var/www/blog/dist/;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;  # 支持单页应用（SPA）路由
    }

    # 其他配置（如错误页面）可保留或自定义
    error_page 404 /404.html;
    location = /404.html {
        internal;
    }
}
```

## 部署项目

创建项目部署目录

```shell
mkdir /var/www
```

```shell
cd /var/www
```

### 部署数据库

将开发数据库中的数据表导出，选择需要保留的数据表，清空其余表

```sql
SELECT CONCAT('TRUNCATE TABLE ', table_name, ';')
FROM information_schema.tables
WHERE table_schema = 'yanfen_data'
  AND table_name NOT IN ('user', 'role', 'user_role', 'resource');
```

```sql
TRUNCATE TABLE agv_block_resume;
TRUNCATE TABLE agv_circle;
TRUNCATE TABLE agv_enter_out;
TRUNCATE TABLE agv_fault_resume;
TRUNCATE TABLE agv_fault_resume_ext;
TRUNCATE TABLE agv_info;
TRUNCATE TABLE agv_move;
TRUNCATE TABLE agv_on_offline;
TRUNCATE TABLE agv_qualified;
TRUNCATE TABLE custom_display;
TRUNCATE TABLE equipment;
TRUNCATE TABLE equipment_ledger;
TRUNCATE TABLE factory;
TRUNCATE TABLE job_details;
TRUNCATE TABLE product_line;
TRUNCATE TABLE product_line_ext;
TRUNCATE TABLE workstation;
```

### 前端打包、部署

1. 拉取项目，用`build`命令打包
2. 将`dist/`目录放到`/var/www/`目录下
3. 修改`nginx`配置，重启`ngxinx`

### 后端打包、部署

1. 创建新配置文件后，在`.pom`文件中添加新配置，用`mvn`按照新配置文件打包得到`.jar`文件

2. 将`.jar`文件上传到`/var/www/`目录下

编写如下脚本，放到`/var/www`目录下

```shell
sudo vim /var/www/start.sh
```

```shell
ps -ef | grep java | grep data-agv-yanfeng | grep -v grep | awk '{print $2}' | xargs kill -15
nohup java -Xmx3g -Xms3g -XX:+UseG1GC -jar /var/www/data-agv-yanfeng-1.0.jar > /dev/null 2>&1 &
```

创建日志文件夹（位于`.jar`文件同级目录）

```shell
sudo mkdir /var/www/logs
```

### 启动后端

```shell
sh ./start.sh
```

### 查看后端进程

```shell
ps -ef | grep java | grep data-agv-yanfeng | grep -v grep
```

### 项目地址查看

```http
http://<IP>:9000
```

```
admin
acbd@1234
```

### 修改项目

```shell
sudo cp -f /home/ubuntu/data-agv-yanfeng-1.0.jar ./data-agv-yanfeng-1.0.jar
```

### 设置项目开机自启

创建服务文件

```shell
sudo vim /etc/systemd/system/data-agv-yanfeng.service
```

```
[Unit]
Description=Data AGV Yanfeng Service

[Service]
User=ubuntu
Group=ubuntu
WorkingDirectory=/var/www
ExecStart=java -Xmx3g -Xms3g -XX:+UseG1GC -jar /var/wwwdata-agv-yanfeng-1.0.jar
Restart=no
SuccessExitStatus=143

[Install]
WantedBy=multi-user.target
```

重新加载 systemd 配置，使新的服务配置生效

```shell
sudo systemctl daemon-reload
```

启用服务以在系统启动时自动启动

```shell
sudo systemctl enable data-agv-yanfeng.service
```

立即启动服务以测试配置

```shell
sudo systemctl start data-agv-yanfeng
```