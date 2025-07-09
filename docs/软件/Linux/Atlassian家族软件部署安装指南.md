> 所有文件下载目录：[Jira和Confluence安装包](https://drive.google.com/drive/folders/18yQ4lqRZv1gHR6-bCyJjgLJMW1Ogch_W?usp=sharing)

# Atlassian家族软件部署安装指南

## 数据库安装

> 关于数据库的选择，个人建议使用PostgreSQL，版本优先选择兼容性较好的12，其次再考虑15、14，部署方式看个人选择，可以本地部署，也可以Docker部署

### PostgreSQL

> **卸载旧版本PostgreSQL（以15为例）**
>
> 1. 停止服务
>
>    ```shell
>    sudo systemctl stop postgresql
>    ```
>
> 2. 卸载 PostgreSQL 相关包
>
>    ```shell
>    sudo apt-get --purge remove postgresql-15 postgresql-client-15 postgresql-common -y
>    sudo apt-get autoremove -y
>    ```
>
>    > 也可以直接查出所有 PostgreSQL 包并卸载：
>
>    ```shell
>    dpkg -l | grep postgres
>    ```
>
>    然后手动：
>
>    ```shell
>    sudo apt-get purge <包名>
>    ```
>
> 3. 删除残留配置和数据（可选，但推荐）
>
>    ⚠️ 这一步会删掉数据库数据，慎用！
>
>    ```shell
>    sudo rm -rf /etc/postgresql/
>    sudo rm -rf /var/lib/postgresql/
>    sudo rm -rf /var/log/postgresql/
>    sudo deluser postgres
>    sudo delgroup postgres
>    ```
>
> 4. 然后就可以安装其他版本的 PostgreSQL

**Docker部署**

选择postgre，因为jira对它的兼容性好

```shell
sudo docker pull postgres:12
```

```shell
sudo docker volume create jira-postgre-data
```

```shell
sudo docker run --name jira-postgres -d \
  -e POSTGRES_USER=jira \
  -e POSTGRES_PASSWORD=m5Jwk.JR*Uxpbt^9f8jp \
  -e POSTGRES_DB=jiradb \
  -p 15432:5432 \
  -v jira-postgre-data:/var/lib/postgresql/data \
  postgres:12
```

后续安装Confluence时需手动创建数据库

**本地部署**

添加官方仓库

```shell
# 添加官方仓库
echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" \
| sudo tee /etc/apt/sources.list.d/pgdg.list

# 导入仓库的 GPG key
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
sudo apt update
```

```shell
# 安装 PostgreSQL 15
sudo apt install -y postgresql-15 postgresql-client-15

# 安装 PostgreSQL 14
sudo apt install -y postgresql-14 postgresql-client-14

# 安装 PostgreSQL 12
sudo apt install -y postgresql-12 postgresql-client-12
```

```shell
# 验证安装成功
psql --version

# 查看服务状态
sudo systemctl status postgresql

# 设置开机自启
sudo systemctl enable postgresql

# 启动 PostgreSQL
sudo systemctl start postgresql
```

设置默认用户名和密码

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

配置远程连接

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

开启 UFW 防火墙 5432 端口（可选）

```shell
sudo ufw allow 5432/tcp
```

Navicat 连接测试（可选）

- **主机**：Server IP
- **端口**：5432
- **用户名**：postgres
- **密码**：abc123!
- **数据库**：postgres

### *MySQL（废弃）*

**为什么不选择MySQL？**

> [jira 您指定的数据库, 不为空, 请指定空数据库。如果您要升级现有的安装, 请按照_您指定的数据库, 不为空, 请指定空数据库。如果您要升级现有的安装, 请按照< a ta-CSDN博客](https://blog.csdn.net/a15304440327/article/details/122573989)
>
> 该文中，作者指出jira并不支持MySQL，因为MySQL对于utf-8的支持并不好，还需要额外的.jar插件支持，所以更推荐PostgreSQL

*（抑焰钉针，鉴定为MySQL就是一坨史）*

```shell
cp /var/www/atlassian_software/mysql-connector-java-8.0.30.jar /var/www/atlassian/jira/atlassian-jira/WEB-INF/lib
```

*部署jira需要mysql5.7*

```shell
sudo docker pull mysql:5.7
```

```shell
sudo docker volume create jira-mysql-data
```

```shell
sudo docker volume create jira-mysql-config
```

```shell
sudo docker run --name mysql57 \
-v jira-mysql-data:/var/lib/mysql \
-v /var/www/atlassian/jira-mysql-config:/etc/mysql/conf.d \
-p 13306:3306 \
-e MYSQL_ROOT_PASSWORD=abcd123! \
-d mysql:5.7
```

*创建数据库用户*

```sql
CREATE USER 'jira'@'%' IDENTIFIED BY 'm5Jwk.JR*Uxpbt^9f8jp';
```

```sql
GRANT ALL PRIVILEGES ON jira_db.* TO 'jira'@'%';
```

*修改mysql5.7配置*

```shell
sudo docker exec -it mysql57 bash
```

## 安装并破解 Jira 8.0.2

> ## 卸载旧版本Jira
>
> 1. 确认Jira的目录，一般有两个
>
>    默认安装路径一般是：
>
>    ```shell
>    /opt/atlassian/jira/
>    ```
>
>    或者你也可以这样找一下 Jira 目录：
>
>    ```shell
>    sudo find /opt -type d -name "jira"
>    ```
>
>    记住它的根目录，比如 `/opt/atlassian/jira`。
>
> 2. 关闭 Jira
>
>    ```shell
>    sudo sh /opt/atlassian/jira/bin/stop-jira.sh
>    ```
>
>    ```shell
>    sudo systemctl stop jira
>    sudo systemctl disable jira
>    ```
>
> 3. 删除 Jira 安装目录 和 Jira Home 目录
>
>    ```shell
>    sudo rm -rf /opt/atlassian/jira
>    ```
>
>    ```shell
>    sudo ls /var/atlassian/application-data/jira
>    sudo rm -rf /var/atlassian/application-data/jira
>    ```
>
> 4. 删除 systemd 启动服务
>
>    ```shell
>    sudo rm /etc/systemd/system/jira.service
>    sudo systemctl daemon-reload
>    ```
>
> 5. 清理 PostgreSQL 数据库（可选）
>
>    ```shell
>    sudo -u postgres psql
>    DROP DATABASE jiradb;
>    DROP USER jira;
>    \q
>    ```
>
> 6. 验证是否彻底清干净
>
>    ```shell
>    ps aux | grep jira
>    ```
>
>    ```shell
>    sudo netstat -tuln | grep 8080
>    ```

> 参考：[Jira8.0.2安装及破解 - 人生苦短，知足常乐！ - 博客园](https://www.cnblogs.com/niewd/p/15066594.html)

### 下载

此处提供多个版本的Jira安装包，但由于缺少破解文件，因此只下载第一个8.0.2版本：

```http
https://downloads.atlassian.com/software/jira/downloads/atlassian-jira-software-8.0.2-x64.bin
```

```http
https://downloads.atlassian.com/software/jira/downloads/atlassian-jira-software-8.22.0-x64.bin
```

```http
https://product-downloads.atlassian.com/software/jira/downloads/atlassian-jira-software-9.11.3-x64.bin
```

### 安装

**安装前建议切换为root用户，因为安装前Jira也提示了，如果不是root用户会有一些问题**

上传安装包到服务器并安装

```shell
chmod +x atlassian-jira-software-8.0.2-x64.bin
```

```shell
sudp ./atlassian-jira-software-8.0.2-x64.bin
```

**安装完了以后不要立即启动！**

> 安装目录：`/var/www/jira`
>
> jira数据目录：`/var/www/jira_data`
>
> 客户端端口：`8080`
>
> 控制台端口：`8005`
>
> jar包目录：`/var/www/jira/atlassian-jira/WEB-INF/lib`
>
> 命令所在目录：`/var/www/jira/bin`

### 破解

备份`atlassian-extra-3.2.jar`文件，当然，直接删了也没事

```shell
cd /var/www/jira/atlassian-jira/WEB-INF/lib
```

```shell
sudo mv ./atlassian-extras-3.2.jar ./atlassian-extras-3.2bak.jar
```

或

```shell
sudo rm -rf ./atlassian-extras-3.2.jar
```

上传破解的``atlassian-extra-3.2.jar``文件

```shell
scp -r ./atlassian-extras-3.2.jar jira@10.0.0.40:/tmp
```

```shell
sudo mv /tmp/atlassian-extras-3.2.jar /var/www/jira/atlassian-jira/WEB-INF/lib/atlassian-extras-3.2.jar
```

（数据库为MySQL需要做）复制破解文件和数据库驱动

```shell
mv /var/www/atlassian/jira/atlassian-jira/WEB-INF/lib/atlassian-extras-3.2.jar /var/www/atlassian/jira/atlassian-jira/WEB-INF/lib/atlassian-extras-3.2-bak.jar
```

```shell
cp /var/www/atlassian_software/atlassian-extras-3.2.jar /var/www/atlassian/jira/atlassian-jira/WEB-INF/lib
```

启动Jira并初始化

```shell
cd /var/www/jira/bin
```

```shell
sudo sh /var/www/jira/bin/start-jira.sh
```

选择语言、自定义配置、配置数据库，然后输入产品许可，照着下面走

前往这个页面：[Atlassian Store | 报价与订购表单 | 购买 Atlassian 产品](https://www.atlassian.com/purchase/my/license-evaluation)

选择“Jira”-> "Jira Software (Data Center)"， 输入“组织”、“服务器 ID”，得到一串密钥，将试用许可填入即可激活，此时系统依然为试用版，接下来重启后试用期就延长到33年了，破解完成。

### 配置邮箱提醒

需要填写企业邮箱的配置，这里以腾讯企业邮箱为例，服务提供商选“自定义“，主机名填”smtp.exmail.qq.com“，SMTP端口填”465“，然后点击测试，查看邮箱里有没有测试邮件

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/image-20250708133213186.png" alt="image-20250708133213186" style="zoom: 50%;" />

参考：

![参考](https://pic1.zhimg.com/v2-33b2c250eeb5619d1bef6087da7cfe3a_r.jpg)

## 安装并破解 Confluence 7.3.5

> [wiki的confluence 8.5.4安装部署及破j_confluence安装-CSDN博客](https://blog.csdn.net/weixin_44024436/article/details/135389431)

### 下载

```http
https://product-downloads.atlassian.com/software/confluence/downloads/atlassian-confluence-7.3.5-x64.bin
```

### 安装

```shell
chmod +x atlassian-confluence-7.3.5-x64.bin
```

```shell
atlassian-confluence-7.3.5-x64.bin
```

客户端端口：`18090`

控制台端口：`18000`

安装目录：`/var/www/atlassian/confluence`

主目录：`/var/www/atlassian/application-data/confluence`

jar包目录：`/var/www/atlassian/confluence/confluence/WEB-INF/lib/`

命令所在目录：`/var/www/atlassian/confluence/bin/`

### 破解

Confluence的破解较复杂，但是一劳永逸

1. 首先启动Confluence，来到安装页面需要注册码的地方，获得`服务器ID`

2. 将jar包目录`/var/www/atlassian/confluence/confluence/WEB-INF/lib/`下的`atlassian-extras-decoder-v2-3.4.1.jar`下载到本地

3. 将`atlassian-extras-decoder-v2-3.4.1.jar`改名为`atlassian-extras-2.4.jar`

4. 使用`java -jar confluence_keygen.jar`启动破解工具，选择`atlassian-extras-2.4.jar`，点击`patch`，获得一个新的`atlassian-extras-2.4.jar`

5. 将新的`atlassian-extras-2.4.jar`改名为`atlassian-extras-decoder-v2-3.4.1.jar`，上传回jar包目录`/var/www/atlassian/confluence/confluence/WEB-INF/lib/`

6. 在破解工具中输入`服务器ID`，点击`gen`，获得注册码（如下所示），激活成功

   ```
   AAABMA0ODAoPeJxtkFtrwjAUgN/zKwJ7rrTRTjYIrDZxSG+y1rHtLXbHGYipJGnR/fpFO1/G4Lyc2
   8d3zt3SSLyELSYRjuJHQh7De5zWDSYhiRED2xp5dLLTNO30TvWgW0Blf9iCqXYbC8bSIEKpAXEZY
   sIBvWwGIQmIr3faidaV4gB0/33ygVqPmfiaHIA608NthhdCKir1IK3cKniyLWiYaIX4IFR/pdOdU
   BZGQi5930JzPsKVnlZFwV/SVZIjD9IOtPCm/HSU5jxaTafzIPJW8Qi43ZCq3jowZfcJloao5iV9r
   za4SDKOC44TXCcMr5OSJRNUmS+hpR1lZPkqa7nIOW54UqAazABmxegiY1mQTR9mwTN5+wia+SxGv
   7a+m6/YLftfbt2bdi8s/HnlD8lciN4wLQIVAIMk82rSD13dWu2xne9ABtN5+S9IAhQTWnwTPYs1M
   sK1eWeQcKKrim9Eww==X02fb
   ```

## 后期运维

破解文件所在目录：`/var/www/jira/atlassian-jira/WEB-INF/lib`

Jira命令目录：`/var/www/jira/bin`

管理员用户名和密码：`jira` `abc123!`

### 运维命令

查看Jira和Confluence进程

```shell
sudo ps aux | grep -E 'jira|confluence'
```

Jira启动、关闭

```shell
sudo sh /var/www/jira/bin/start-jira.sh
```

```shell
sudo sh /var/www/jira/bin/stop-jira.sh
```

```shell
sudo /home/text/atlassian/jira/bin/start-jira.sh
```

```shell
sudo /home/text/atlassian/jira/bin/stop-jira.sh
```

Confluence启动、关闭

```shell
sudo /home/text/atlassian/confluence/bin/start-confluence.sh
```

```shell
sudo /home/text/atlassian/confluence/bin/stop-confluence.sh
```

Jira 服务文件：`/etc/systemd/system/jira.service`

```shell
[Unit]
Description=Atlassian Jira Service
After=network.target docker.service
Requires=docker.service

[Service]
Type=forking
User=text
Group=text
WorkingDirectory=/home/text/atlassian/jira/bin
ExecStart=/home/text/atlassian/jira/bin/start-jira.sh
ExecStop=/home/text/atlassian/jira/bin/stop-jira.sh
Restart=on-failure
RestartSec=30
LimitNOFILE=65536

[Install]
WantedBy=multi-user.target
```

Confluence 服务文件：`/etc/systemd/system/confluence.service`

```shell
[Unit]
Description=Atlassian Confluence Service
After=network.target jira.service
Requires=jira.service

[Service]
Type=forking
User=text
Group=text
WorkingDirectory=/home/text/atlassian/confluence/bin/
ExecStart=/home/text/atlassian/confluence/bin//start-confluence.sh
ExecStop=/home/text/atlassian/confluence/bin//stop-confluence.sh
Restart=on-failure
RestartSec=30
LimitNOFILE=65536

[Install]
WantedBy=multi-user.target
```

保存文件并关闭编辑器后，运行以下命令以重新加载systemd守护进程：

```shell
sudo systemctl daemon-reload
```

启用服务以在系统启动时自动启动：

```shell
sudo systemctl enable jira
```

```shell
sudo systemctl enable confluence
```

立即启动服务以测试配置：

```shell
sudo systemctl start jira
```

```shell
sudo systemctl start confluence
```

### 系统迁移

*迁移需要重装，不建议迁移！此处仅供学习*

**经测试发现无法顺利启动，可能存在其他配置未修改，由于网上缺少资料，故作罢！**

> [修改JIRA的默认存储目录（家目录）_jira 用户目录-CSDN博客](https://blog.csdn.net/qq_35002542/article/details/127070462)
>
> [生产Confluence修改家目录_confluence 的temp文件夹-CSDN博客](https://blog.csdn.net/qq_42534026/article/details/116599606)
>
> [Jira/Confluence的备份、恢复和迁移 - EasonV5 - 博客园](https://www.cnblogs.com/easonscx/p/11364480.html)
>
> [Jira-8.22迁移(通过目录方式)_jira迁移-CSDN博客](https://blog.csdn.net/2302_78105215/article/details/140777471)

```shell
cd /home/text/atlassian/jira/atlassian-jira/WEB-INF/classes/
```

修改`jira-application.properties`

```shell
cd /home/text/atlassian/confluence/confluence/WEB-INF/classes/
```

修改`confluence-init.properties`
