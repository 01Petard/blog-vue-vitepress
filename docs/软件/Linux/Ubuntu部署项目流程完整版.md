# 系统部署指南

## 系统

### 查看系统版本

```shell
sudo lsb_release -a
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
sudo passwd 当前用户名
新的密码（比如abc123!）
```

刷新配置

```shell
systemctl restart sshd
```

### 调整系统时间

```shell
sudo dpkg-reconfigure tzdata   # 选择 Asia/Shanghai
sudo timedatectl set-ntp on
```

## 配置镜像源

```shell
sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak
```

```shell
sudo vim /etc/apt/sources.list
```

**Ubuntu 20.04 (Focal Fossa)**

```shell
deb https://mirrors.aliyun.com/ubuntu/ focal main restricted universe multiverse
deb https://mirrors.aliyun.com/ubuntu/ focal-updates main restricted universe multiverse
deb https://mirrors.aliyun.com/ubuntu/ focal-backports main restricted universe multiverse
deb https://mirrors.aliyun.com/ubuntu/ focal-security main restricted universe multiverse
```

**Ubuntu 18.04 (Bionic Beaver)**

```shell
deb https://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse
deb https://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse
deb https://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse
deb https://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse
```

**Ubuntu 22.04.5 LTS（Jammy Jellyfish）**

```shell
deb https://mirrors.aliyun.com/ubuntu/ jammy main restricted universe multiverse
deb https://mirrors.aliyun.com/ubuntu/ jammy-updates main restricted universe multiverse
deb https://mirrors.aliyun.com/ubuntu/ jammy-backports main restricted universe multiverse
deb https://mirrors.aliyun.com/ubuntu/ jammy-security main restricted universe multiverse
```

```shell
sudo apt update
```

> 如果服务安装过程中没有出错，则不需要执行

```shell
sudo sed -i 's|http://mirrors.aliyun.com|https://mirrors.aliyun.com|g' /etc/apt/sources.list
```

```shell
sudo apt clean
sudo apt update
```

如果遇到报错了，就找到相应的包来源并删除或注释掉

## 安装网络管理工具

```shell
sudo apt install network-manager
```

```shell
nmcli --version
nmcli connection show  # 查看网络连接
nmcli device           # 列出设备
```

## 配置网络固定静态IP

```shell
# 以这个为例，固定ip为10.0.0.176
ubuntu@ubuntu:/etc/netplan$ ip addr show eno1
3: eno1: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    link/ether cc:82:7f:8f:65:56 brd ff:ff:ff:ff:ff:ff
    altname enp0s31f6
    inet 10.0.0.176/24 metric 100 brd 10.0.0.255 scope global dynamic eno1
       valid_lft 28317sec preferred_lft 28317sec
    inet6 fe80::ce82:7fff:fe8f:6556/64 scope link
       valid_lft forever preferred_lft forever

```

1. 禁用 cloud-init 网络配置（避免重启后重置）

```shell
sudo touch /etc/cloud/cloud.cfg.d/99-disable-network-config.cfg
```

2. 编辑 Netplan 配置文件

```shell
cd /etc/netplan
```

```shell
sudo vim /etc/netplan/50-cloud-init.yaml
```

```shell
network:
  ethernets:
    eno1:
      dhcp4: no
      dhcp6: no
      addresses:
        - 10.0.0.176/24    # 这个改成“内网ip”，“/24”代表子网掩码为255.255.255.0，没问题就不用改了
      gateway4: 10.0.0.1   # 这个改成“网关地址”
      nameservers:
        addresses:
          - 100.0.0.254    # 不用改
          - 8.8.8.8        # 不用改
    enp3s0:
      dhcp4: no
      dhcp6: no
  version: 2
```

或

```SHELL
network:
  ethernets:
    eno1:
      dhcp4: no
      dhcp6: no
      addresses:
        - 10.0.0.176/24    # 这个改成“内网ip”，“/24”代表子网掩码为255.255.255.0，没问题就不用改了
      routes:
        - to: default
          via: 10.0.0.1     # 这个改成“网关地址”
      nameservers:
        addresses:
          - 100.0.0.254      # 不用改
          - 8.8.8.8          # 不用改
    enp3s0:
      dhcp4: no
      dhcp6: no
  version: 2
```

3. 应用配置并验证

```shell
sudo chmod 600 /etc/netplan/50-cloud-init.yaml  # 消除警告
sudo netplan apply  # 应用配置
ip addr show eno1   # 检查IP是否固定为10.0.0.176
ping 10.0.0.1       # 测试网关连通性
ping www.baidu.com  # 测试外网连通性
```

4. 重启验证（关键步骤）

```shell
sudo reboot now  # 重启系统
# 重启后登录，再次执行以下命令检查IP是否固定
ip addr show eno1
```

## 安装MySQL

### 安装MySQL

```shell
sudo apt install mysql-server -y
```

### 启动、设置自启

```shell
sudo systemctl start mysql
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

用`Navicat`测试能否连接

### 重启MySQL

```shell
systemctl restart mysql
```

### 查看MySQL状态

```shell
ps -ef | grep mysql-server
```

```shell
sudo systemctl status mysql
```

![image-20250226094636932](https://i.postimg.cc/BvXFPZFk/image-20250226094636932.png)

### 修改本地用户密码

本地用户作为项目SQL使用

**注意：这里的密码以后端配置文件中的为准！**

```shell
sudo mysql
```

```mysql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'm5Jwk.JR*Uxpbt^9f8jp';
```

```mysql
GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost';
```

```mysql
FLUSH PRIVILEGES;
```

### 验证本地用户能否登录

```shell
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

```mysql
CREATE USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'm5Jwk.JR*Uxpbt^9f8jp';
```

```mysql
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%';
```

```mysql
FLUSH PRIVILEGES;
```

## 安装PostgreSQL

### 添加官方仓库

```shell
# 添加官方仓库
echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" \
| sudo tee /etc/apt/sources.list.d/pgdg.list

# 导入仓库的 GPG key
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
sudo apt update
```

### 安装 PostgreSQL 15

```shell
# 安装 PostgreSQL 15
sudo apt install -y postgresql-15 postgresql-client-15
```

### 安装 PostgreSQL 14

```shell
sudo apt install -y postgresql-14 postgresql-client-14
```

### 安装 PostgreSQL 12

```shell
sudo apt install -y postgresql-12 postgresql-client-12
```

### 验证安装成功

```shell
psql --version
```

### 确认安装 + 启动状态

```shell
# 查看服务状态
sudo systemctl status postgresql

# 设置开机自启
sudo systemctl enable postgresql

# 启动 PostgreSQL
sudo systemctl start postgresql
```

### 设置默认用户名和密码

```shell
# 切换到 postgres 用户
sudo -i -u postgres
psql

# 修改 postgres 用户密码
ALTER USER postgres WITH PASSWORD 'abc123!';

# 创建用户
CREATE USER myuser WITH PASSWORD 'mypassword';

# 创建数据库
CREATE DATABASE jiradb OWNER postgres;

# 给权限
GRANT ALL PRIVILEGES ON DATABASE jiradb TO postgres;

\q
exit
```

### 配置远程连接

```shell
# 修改监听地址
sudo nano /etc/postgresql/15/main/postgresql.conf
找到这行：# listen_addresses = 'localhost'
改为：listen_addresses = '*'
保存退出。

# 修改 pg_hba.conf 添加远程连接权限
sudo nano /etc/postgresql/15/main/pg_hba.conf
在文件末尾添加：
# 允许所有 IP 使用密码连接
host    all             all             0.0.0.0/0               md5

# 重启服务生效配置
sudo systemctl restart postgresql
```

### 开启 UFW 防火墙 5432 端口（可选）

```shell
sudo ufw allow 5432/tcp
```

### Navicat 连接测试（可选）

- **主机**：Server IP
- **端口**：5432
- **用户名**：postgres
- **密码**：abc123!
- **数据库**：postgres（或你自己创建的）

## 安装Redis

安装Redis

```shell
sudo apt install redis-server -y
```

### 启动、设置自启

```shell
sudo systemctl start redis-server
sudo systemctl enable redis-server
```

### 配置远程访问、安全密码

```shell
sudo vim /etc/redis/redis.conf
```

远程访问：`biind 127.0.0.1 ::1` 改为 `bind 0.0.0.0 ::1`

添加密码：`requirepass UmZHKT39sM`

### 重启Redis服务

```shell
sudo systemctl restart redis-server
```

用`Another Redis DesktopManager`测试能否连接

### 查看Redis状态

```shell
ps -ef | grep redis-server
```

```shell
sudo systemctl status redis
```

![image-20250226095310898](https://i.postimg.cc/CL9ppmN8/image-20250226095310898.png)

## 安装Java

```shell
sudo apt install openjdk-8-jdk -y
```

```shell
java -version
```

## 安装NodeJs（没用上）

为了避免网络问题，使用Gitee镜像安装NVM

```shell
git clone https://gitee.com/mirrors/nvm.git ~/.nvm && cd ~/.nvm && git checkout `git describe --abbrev=0 --tags`
```

```shell
~/.nvm/install.sh
```

```shell
source ~/.bashrc
```

如果对网络比较有信心，可以用Github的链接

```shell
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.39.7/install.sh | bash
```

```shell
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.39.7/install.sh | bash
```

安装完成

```shell
nvm -version
```

下载Nodejs

```shell
npm config set registry https://registry.npmmirror.com
```

```shell
nvm install 14.17.6
```

## 部署前端

### 下载Nginx

```
sudo apt install nginx -y
```

### 设置Nginx自启

```shell
sudo systemctl enable nginx
```

### 部署前后端项目

1. 拉取项目，用`build`命令打包
2. 将`dist/`目录放到`/var/www/`目录下
3. 修改`nginx`配置，重启`nginx`

```shell
sudo mv /tmp/data-agv-yanfeng-1.0.jar /var/www/data-agv-yanfeng-1.0.jar
```

```shell
sudo mv /tmp/dist /var/www/dist
```

### 修改Nginx配置文件

 ```shell
sudo touch /etc/nginx/sites-enabled/yanfeng
 ```

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
        proxy_pass http://127.0.0.1:8088;
        proxy_read_timeout 10s;
    }

    location /api/4251 {
        rewrite ^/api/[^/]+/(.*) /$1 break;
        proxy_pass http://127.0.0.1:8088;
        proxy_read_timeout 10s;
    }

    location /api/4251/42510101/tcs/core {
        rewrite ^/api/[^/]+/[^/]+/tcs/core/?(.*)$ /tcs/core/$1 break;
        proxy_pass http://10.118.156.85:7566;
        proxy_read_timeout 10s;
    }
    
    location /api/4251/42510104/tcs/core {
        rewrite ^/api/[^/]+/[^/]+/tcs/core/?(.*)$ /tcs/core/$1 break;
        proxy_pass http://10.118.156.85:7566;
        proxy_read_timeout 10s;
    }

    location /api/4251/42510101/websocket {
        proxy_pass http://10.118.156.85:7567;
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
    
    location /api/4251/42510104/websocket {
        proxy_pass http://10.118.156.85:7567;
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

### 重启Nginx

```shell
sudo systemctl restart nginx
```

### 查看Nginx状态

```shell
ps -ef | grep nginx
```

```shell
sudo systemctl status nginx
```

### 查看项目

```http
http://localhost:9000
```

```
admin
acbd@1234
```

## 部署后端

### 部署数据库

1. 将表结构导出

2. 将数据表部署到服务器上，运行以下sql脚本和alter语句，重置自增id

```mysql
SELECT CONCAT('TRUNCATE TABLE `', table_name, '`;') AS reset_sql
FROM information_schema.tables
WHERE table_schema = DATABASE() AND AUTO_INCREMENT IS NOT NULL;
```

```mysql
TRUNCATE TABLE ...;
....
```

3. 运行如下这段语句插入初始数据

4. **之后用Navicat打开数据库修改一下，结合实际情况修改 `工厂编号`、`工厂名称`、`工厂近经纬度`、`调度系统ip` 等信息**

```mysql
START TRANSACTION;

# 工厂和产线的配置
INSERT INTO `factory` (factory_name, factory_code, coordinate, urls, server_url) 
VALUES ('上海临港工厂', '2640（不确定后面问一下）', '121.828236,30.880834', 'http://不知道后面问一下:7566', '');

# 注意：map_id需要询问调度系统的人获取
INSERT INTO `product_line` (factory_code, factory_name, line_code, line_name, work_time, work_output, map_id, `offset`, threshold, websocket_map_url) 
VALUES ('2640（不确定后面问一下）', '上海临港工厂', '26400020（不确定后面问一下）', '生产线', 15, 300, 1, 0, 600, 'ws://不知道后面问一下:7567');

INSERT INTO `product_line_ext` (`code`, factory_code, line_code) 
VALUES ('26400020（不确定后面问一下）', '2640（不确定后面问一下）', '26400020（不确定后面问一下）');

# 用户和角色的配置
INSERT INTO `user` (username, nickname, user_type, `password`, initial, password_update_time, last_login_time, memo, operator_id) 
VALUES ('admin', '管理员账号', 1, '$2a$10$VpX7F/03wRcsdylcAZ.O4.QRJS8D9oJGovYpM3EgrLwxhJfQruYVy', 0, 0, 0, '此账号是管理员', 0);
INSERT INTO `role` (name, description, level, factory_code, operator_id) VALUES ('超级管理员', '所有权限', 'p0', '', 1);
INSERT INTO `role` (name, description, level, factory_code, operator_id) VALUES ('总部', '查看所有工厂数据', 'p1', '', 1);
INSERT INTO `role` (name, description, level, factory_code, operator_id) VALUES ('上海临港工厂', '查看工厂数据', 'p2', '2640（不确定后面问一下）', 1);
INSERT INTO `role` (name, description, level, factory_code, operator_id) VALUES ('上海临港工厂-只读', '查看工厂数据-只读', 'p3', '2640（不确定后面问一下）', 1);

# 配置管理员的user_id和role_id，将除了只读之外的权限给管理员
INSERT INTO `user_role` (user_id, role_id) VALUES (1, 1);
INSERT INTO `user_role` (user_id, role_id) VALUES (1, 2);
INSERT INTO `user_role` (user_id, role_id) VALUES (1, 3);

# 配置管理员的role_id，将对应的资源路径给管理员
INSERT INTO `resource` (path, role_id) VALUES ('2640（不确定后面问一下）', 1);
INSERT INTO `resource` (path, role_id) VALUES ('2640（不确定后面问一下）', 2);
INSERT INTO `resource` (path, role_id) VALUES ('2640（不确定后面问一下）', 3);

COMMIT;
```

### 启动后端服务

**打包**

```shell
mvn clean package -P prod
```

**上传到服务器**

```shell
sudo mkdir /var/www
```

```shell
scp -r D:\\Projects_sunnybaer\\data-agv-yanfeng\\target\\data-agv-yanfeng-1.0.jar ubuntu@10.0.0.163:/tmp
```

```shell
scp -r D:\\Projects_sunnybaer\\yanfeng-admin\\dist ubuntu@10.0.0.163:/tmp
```

```shell
sudo mv /tmp/data-agv-yanfeng-1.0.jar /var/www/data-agv-yanfeng-1.0.jar
```

```shell
sudo mv /tmp/dist /var/www/dist
```

**创建日志文件夹**（位于`data-agv-yanfeng-1.0.jar`文件同级目录）

```shell
sudo mkdir /var/www/logs
```

**启动或关闭服务**

前台启动

```shell
sudo java -jar /var/www/data-agv-yanfeng-1.0.jar
```

后台启动

```shell
nohup java -Xmx3g -Xms3g -XX:+UseG1GC -jar /var/www/data-agv-yanfeng-1.0.jar > /dev/null 2>&1 &
```

清理后台进程

```shell
ps -ef | grep java | grep data-agv-yanfeng | grep -v grep | awk '{print $2}' | xargs kill -15
```

**查看进程**

```shell
ps -ef | grep java | grep -v grep | grep data-agv-yanfeng
```

或

```shell
htop
```

### 配置项目开机自启

**查看是否存在（一般肯定是没有的，不信邪可以看看，一定是报错的）**

```shell
sudo cat /etc/systemd/system/data-agv-yanfeng.service
```

**创建服务文件**

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
ExecStart=/usr/bin/java -Xmx3g -Xms3g -XX:+UseG1GC -jar /var/www/data-agv-yanfeng-1.0.jar
Restart=on-failure
SuccessExitStatus=143

[Install]
WantedBy=multi-user.target
```

**重新加载 systemd 配置**，使新的服务配置生效

```shell
sudo systemctl daemon-reload
```

**启用服务**，使服务在系统启动时自动启动

```shell
sudo systemctl enable data-agv-yanfeng
```

**立即启动服务**，测试配置运行是否成功

```shell
sudo systemctl start data-agv-yanfeng
```

### 配置定时任务

> 用于每天凌晨执行命令生成表格

```shell
sudo crontab -e
```

第一次使用会让我们选择用什么文件编辑器，可以选`nano`或`vim`

编写如下脚本

```shell
sudo touch /var/www/123.log
```

```shell
0 1 * * * /usr/bin/curl -s http://{localhost:8088}/monitor/line/handle?date=$(date -d "yesterday" +\%Y\%m\%d)
0 2 * * * /usr/bin/curl -s http://{localhost:8088}/monitor/line/sync?date=$(date -d "yesterday" +\%Y\%m\%d)
0 1 * * * /usr/bin/curl -X POST {localhost:8088}/device/task/update-status
* * * * * echo 1 >> /var/www/123.log
```

```shell
sudo touch /var/www/logs/123.log
```

每过一分钟，会输出`1`，确认已在运行中

```shell
watch cat /var/www/123.log
```

确认无误后删掉`* * * * * echo 1 >> /var/www/123.log`

## 安装运维面板

### 脚本1

```shell
# 1.更新系统
sudo apt-get update

# 2.安装必要的工具
sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common

# 3.添加Docker的官方GPG密钥
sudo curl -fsSL https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/ubuntu/gpg | sudo apt-key add -

# 4.设置Docker存储库
sudo add-apt-repository "deb [arch=amd64] https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/ubuntu $(lsb_release -cs) stable"
sudo add-apt-repository "deb [arch=amd64] https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/ubuntu $（lsb_release -cs） 稳定"

# 5.更新APT包索引
sudo apt-get 

# 6.下载Docker CE和相关依赖
mkdir docker-ce-offline
cd docker-ce-offline
apt-get download docker-ce
apt-get download $(apt-cache depends docker-ce | grep Depends | sed "s/.*ends:\ //" | tr '\n' ' ')

# 7.安装
sudo dpkg -i *.deb

# 8.查看版本
docker --version

# 9.配置Docker服务启动并配置开机自启
sudo systemctl start docker
sudo systemctl enable docker

# 10.安装1Panel
sudo apt install curl wget -y
sudo curl -sSL https://resource.fit2cloud.com/1panel/package/quick_start.sh -o quick_start.sh && sudo bash quick_start.sh

# 11.查看1Panel服务状态
sudo systemctl restart 1panel
sudo systemctl status 1panel
```

### 脚本2

```shell
#!/bin/bash

# 检查是否为root用户
if [ "$(id -u)" != "0" ]; then
   echo "错误: 此脚本需要root权限运行" 1>&2
   exit 1
fi

# 启用错误检测
set -e

# 日志函数
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

# 1. 更新系统
log "开始更新系统..."
sudo apt-get update
log "系统更新完成"

# 2. 安装必要的工具
log "安装必要工具..."
sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common
log "必要工具安装完成"

# 3. 添加Docker的官方GPG密钥
log "添加Docker GPG密钥..."
sudo curl -fsSL https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
log "Docker GPG密钥添加完成"

# 4. 设置Docker存储库
log "设置Docker存储库..."
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
log "Docker存储库设置完成"

# 5. 更新APT包索引
log "更新软件包索引..."
sudo apt-get update
log "软件包索引更新完成"

# 6. 安装Docker CE
log "安装Docker CE..."
sudo apt-get install -y docker-ce docker-ce-cli containerd.io
log "Docker CE安装完成"

# 7. 配置Docker服务启动并配置开机自启
log "配置Docker服务..."
sudo systemctl start docker
sudo systemctl enable docker
log "Docker服务配置完成"

# 8. 验证Docker安装
log "验证Docker安装..."
docker --version
if [ $? -ne 0 ]; then
    log "错误: Docker安装失败"
    exit 1
fi
log "Docker安装验证通过"

# 9. 安装1Panel
log "开始安装1Panel..."
sudo curl -sSL https://resource.fit2cloud.com/1panel/package/quick_start.sh -o quick_start.sh
if [ $? -ne 0 ]; then
    log "错误: 下载1Panel安装脚本失败"
    exit 1
fi

sudo bash quick_start.sh
if [ $? -ne 0 ]; then
    log "错误: 1Panel安装脚本执行失败"
    exit 1
fi
log "1Panel安装脚本执行完成"

# 10. 查看1Panel服务状态
log "检查1Panel服务状态..."
sudo systemctl restart 1panel
sudo systemctl status 1panel --no-pager

# 11. 输出安装成功信息
log "====================================="
log "1Panel安装完成!"
log "请访问 http://服务器IP:9000 进行初始化配置"
log "默认用户名: admin"
log "默认密码: 1panel"
log "====================================="
```

### 脚本3

```shell
# 安装 Docker（先装）
# 更新基础组件
sudo apt update && sudo apt install -y apt-transport-https ca-certificates curl software-properties-common

# 添加 Docker GPG 密钥
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

# 添加 Docker 源（确保版本匹配）
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

# 安装 Docker Engine
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io

# 设置开机启动
sudo systemctl enable docker
sudo systemctl start docker

# 验证安装
docker --version


# 安装1panel
bash -c "$(curl -sSL https://resource.fit2cloud.com/1panel/package/v2/quick_start.sh)"
```



