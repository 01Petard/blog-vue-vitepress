# Jira和Confluence安装和配置记录

项目用到的文件都放到了网盘里：https://drive.google.com/drive/folders/18yQ4lqRZv1gHR6-bCyJjgLJMW1Ogch_W?usp=drive_link

## 部署数据库

### PostgreSQL

选择postgre，因为jira对它的兼容性好

```shell
sudo docker pull postgres:15
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
  postgres:15
```

后续安装Confluence时需手动创建数据库

### MySQL（废弃）

**为什么不选择MySQL？**

> [jira 您指定的数据库, 不为空, 请指定空数据库。如果您要升级现有的安装, 请按照_您指定的数据库, 不为空, 请指定空数据库。如果您要升级现有的安装, 请按照< a ta-CSDN博客](https://blog.csdn.net/a15304440327/article/details/122573989)

*（鉴定为MySQL就是一坨）*

```shell
cp /var/www/atlassian_software/mysql-connector-java-8.0.30.jar /var/www/atlassian/jira/atlassian-jira/WEB-INF/lib
```

部署jira需要mysql5.7

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

创建数据库用户

```sql
CREATE USER 'jira'@'%' IDENTIFIED BY 'm5Jwk.JR*Uxpbt^9f8jp';
```

```sql
GRANT ALL PRIVILEGES ON jira_db.* TO 'jira'@'%';
```

修改mysql5.7配置

```shell
sudo docker exec -it mysql57 bash
```

## Jira8.0.2安装和配置记录

> [Jira8.0.2安装及破解 - 人生苦短，知足常乐！ - 博客园](https://www.cnblogs.com/niewd/p/15066594.html)

### 安装Jira

Jira安装包下载：

```http
https://downloads.atlassian.com/software/jira/downloads/atlassian-jira-software-8.0.2-x64.bin
```

```http
https://downloads.atlassian.com/software/jira/downloads/atlassian-jira-software-8.22.0-x64.bin
```

```http
https://product-downloads.atlassian.com/software/jira/downloads/atlassian-jira-software-9.11.3-x64.bin
```

安装Jira

```shell
chmod +x atlassian-jira-software-8.22.0-x64.bin
```

```shell
atlassian-jira-software-8.22.0-x64.bin
```

客户端端口：`18080`

控制台端口：`18005`

安装目录：`/var/www/atlassian/jira`

主目录：`/var/www/atlassian/application-data/jira`

jar包目录：`/var/www/atlassian/jira/lib/`

命令所在目录：`/var/www/atlassian/jira/bin/`

### 破解Jira

备份原文件，复制破解文件和数据库驱动

```shell
mv /var/www/atlassian/jira/atlassian-jira/WEB-INF/lib/atlassian-extras-3.2.jar /var/www/atlassian/jira/atlassian-jira/WEB-INF/lib/atlassian-extras-3.2-bak.jar
```

```shell
cp /var/www/atlassian_software/atlassian-extras-3.2.jar /var/www/atlassian/jira/atlassian-jira/WEB-INF/lib
```

在安装时选择“数据中心版”可以获得**新版试用许可**，将试用许可填入即可激活，以下为本次安装时试用的许可码，可激活至2033年

```
AAAB2A0ODAoPeNqVUl2PmkAUfedXkPSlfcDgsH7UhKTuMCoN4gfsbrbxZcArTEWYzoC7/vvyodWt1
qSP98Ccc8+555MfF+oIAhXpKjIGBhq0eyr2/HJGHQULoDnLUovmYFaIpiMNtRWHhZBK8A8cXLoDE
8+mU7LE9tBRfjJBW8fvZM2q1yZxfbKcL22PKG6xC0DMNk8ShDS1P1TknTNxuNAxNGQ0ZFxk6yLMW
9WgyWyTv1EBLRrmbA9mLgpQvCKQoWC8FqsRsqdJQc9zTVSyUwxpDqIBk0Z6QmVsTvEbHmG7+7ANh
2OXj2PnV4IWz4G/xGTBe2QYL93uaMQ7VrR9R1+Dl+3a7ePxophn6WO0MlfmyYltmY5tecTVHKT39
Yd+r3vPh5dTUW20oYksnYDYgygpHo2Xtma8OhNtYUw62g+j86ps4fBcplaZand1vaf3DaOtRAIgj
TPOQdzJfV6IMKYS/r7k5es6Gi6YPMVKXPOjjxtatzpgwfkc30u3qnd0q36ubqA2R/iyGqjnOylTy
ko0pWn4/2W4atXlopdNucPxj3acEkfKTEQ0ZbJpFZdQrNOskN+iHWVJK8x2Cs7SvBQjpZPk5g+1+
tWuNXq15J14jzo1fEvmNxJUUSIwLAIUHXzlT+VOpCQjWsr/R6S+CTCdzjMCFE4TfoGRSxwvKcPQ8
wMRdnpfpgdcX02me
```

## Confluence7.3.5安装和配置记录

> [wiki的confluence 8.5.4安装部署及破j_confluence安装-CSDN博客](https://blog.csdn.net/weixin_44024436/article/details/135389431)

Confluence安装包下载：

```http
https://product-downloads.atlassian.com/software/confluence/downloads/atlassian-confluence-7.3.5-x64.bin
```

### 安装Confluence

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

### 破解Confluence

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

## 运维命令

查看Jira和Confluence进程

```shell
sudo ps aux | grep -E 'jira|confluence'
```

Jira启动、关闭

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

## 系统迁移

*迁移需要重装，不建议迁移！*

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