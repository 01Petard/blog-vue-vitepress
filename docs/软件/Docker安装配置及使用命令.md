---
title: Docker安装配置及使用命令
date: 2023-07-25 22:06:15
updated: 2023-11-30 22:56:15
categories:
   - 学习
tags:
   - Docker
   - 虚拟机
   - Linux
keywords:
   - Docker
   - 虚拟机
   - Linux
description: 在Linux上使用Docker部署相关服务
cover: https://miro.medium.com/v2/resize:fit:1400/0*ddZLS-Gd9GFc71Lc
top_img: https://www.docker.com/wp-content/uploads/2023/06/meta-image-what-is-a-container.png
top: 998
---

# 自用的docker-compose文件

[docker-compose.yml](./docker-compose.yml)

## （Mac强烈推荐）安装orbstack

> orbstack是一个在MacOS上新起的Docker方案，它采用了与docker-linux不同的上下文，安装使用linux虚拟机非常方便

## 安装CentOS

- 安装VMware虚拟机，随便找个教程即可

- 下载CentOS7 64位界面，推荐无GUI的简洁版

  > [最小安装CentOS 7.6 Linux系统](https://blog.csdn.net/qq_43003203/article/details/126163768)

## 查看Linux防火墙

查看防火墙状态：`systemctl status firewalld`

开启防火墙：`systemctl start firewalld`

关闭防火墙：`systemctl stop firewalld`

开启防火墙：`service firewalld start`

开机禁止启动防火墙：`systemctl disable firewalld.service`

开机允许启动防火墙：`systemctl unmask firewalld.service`、`systemctl start firewalld.service`

设置某个服务开机自启动：`systemctl enable [...]`

## 查看Linux端口是否对外开放

1、查询已经对外开放的端口：`netstat -anp`

2、查看防火墙所有开放的端口：`firewall-cmd --zone=public --list-ports`

3、查询指定端口是否已经开放：`firewall-cmd --query-port=8848/tcp`

返回**yes/no**。此时也有可能返回**firewalld is not running**，此时需要**打开防火墙在开放端口**。

## 开放Linux某个端口

添加指定需要开放的端口：`firewall-cmd --add-port=8848/tcp --permanent`

重载入添加的端口，配置立即生效：`firewall-cmd --reload`

查询指定端口是否开启成功：`firewall-cmd --query-port=8848/tcp`

## 解决Windows端口占用

查看占用端口的`进程号`

```shell
netstat -ano | findstr '被占用的端口号'
```

根据`进程号`杀掉占用的进程

```shell
taskkill /F /PID '进程号'
```

## 安装Docker

1. 卸载系统之前的 docker

   ```shell
   sudo yum remove docker \
   docker-client \
   docker-client-latest \
   docker-common \
   docker-latest \
   docker-latest-logrotate \
   docker-logrotate \
   docker-engine
   ```

2. 安装 Docker-CE

   安装必须的依赖

   ```shell
   sudo yum install -y yum-utils \
   device-mapper-persistent-data \
   lvm2
   ```

   设置 docker repo 的 yum 位置

   ```shell
   sudo yum-config-manager \
   --add-repo \
   https://download.docker.com/linux/centos/docker-ce.repo
   ```

   安装 docker，以及 docker-cli

   ```shell
   sudo yum install docker-ce docker-ce-cli containerd.io
   ```

3. 启动Docker

   ```shell
   sudo systemctl start docker
   ```

4. 设置Docker开机自启

   ```shell
   sudo systemctl enable docker
   ```

5. 配置镜像加速（Ubuntu、CentOS）

   ```shell
   sudo mkdir -p /etc/docker
   sudo tee /etc/docker/daemon.json <<-'EOF'
   {
       "registry-mirrors": [
           "https://uf5mphyd.mirror.aliyuncs.com",
           "https://dockerproxy.com",
           "https://mirror.baidubce.com",
           "https://docker.m.daocloud.io",
           "https://docker.nju.edu.cn",
           "https://docker.mirrors.sjtug.sjtu.edu.cn"
       ]
   }
   EOF
   sudo systemctl daemon-reload
   sudo systemctl restart docker
   ```

   Docker终极配置

   ```shell
   {  
     "builder": {    
     "gc": {      
       "defaultKeepStorage": "20GB",      
       "enabled": true    
       }  
     },  
     "experimental": false,  
     "registry-mirrors": [    
       "https://docker.hpcloud.cloud",    
       "https://docker.m.daocloud.io",    
       "https://docker.unsee.tech",    
       "https://docker.1panel.live",    
       "http://mirrors.ustc.edu.cn",    
       "https://docker.chenby.cn",    
       "http://mirror.azure.cn",    
       "https://dockerpull.org",    
       "https://dockerhub.icu",    
       "https://hub.rat.dev"  
     ]
   }
   ```

6. Docker中文文档

   > [docker 中文文档]([docker 中文文档 | 简果网 (simapple.com)](https://www.simapple.com/docker-chinese-manual))
   >
   > [docker中文文档 （菜鸟笔记）](https://www.coonote.com/docker/docker-tutorial.html)

## Docker常用命令

### 镜像

拉取镜像

```shell
docker pull [image]:[version]
```

查看下载的镜像

```shell
docker images
```

查看镜像详细信息

```shell
docker inspect [IMAGE_ID]
```

本地加载镜像压缩包

```shell
docker load -i [saved_image].tar
```

保存镜像

```shell
docker save -o [saved_image].tar [image]:[version]
```

推送镜像

```shell
docker push
```

构建镜像

```shell
docker build
```

删除镜像

```shell
docker rmi [image]
```

### 容器

第一次运行容器时，运行以下命令构建容器

```shell
docker run \
-p [port_linux]:[port_container]  \
--name [container_name] \
-v [uri_linux]:[uri_container] \
-v [volume]:[uri_container] \
-d \
[image]:[version] \
...
```

启动容器

```shell
docker start [container]
```

重启容器

```shell
docker restart [container]
```

停止容器

```shell
docker stop [container]
```

强制停止容器

```shell
docker kill [container]
```

删除容器

```shell
docker rm (-f) [container]
```

暂停容器

```shell
docker pause [container]
```

恢复容器

```shell
docker unpause [container]
```

查看容器的详细信息

```shell
docker inspect [container]
```

查看docker中正在运行的容器

```shell
docker ps (-a)
```

查看容器的日志（跟随刷新）

```shell
docker logs [container] (-f)
```

### 容器内部

在容器中执行命令

```shell
docker exec [...]
```

进入容器文件系统

```shell
docker exec -it [container] /bin/bash
docker exec -it [container] bash
```

查看容器的端口映射

```shell
docker port [container]
```

![image-20230725224300588](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/image-20230725224300588.png)

> - `port/tcp` 表示容器内部的端口号和协议类型；
> - `0.0.0.0:port1->port2/tcp` 表示将主机的port1端口映射到容器内部的port2端口，`0.0.0.0`表示监听所有的网络接口，`:::`表示监听所有的IPv6网络接口。

设置容器的自动启动

```shell
sudo docker update [container] --restart=always
```

### 数据卷

创建数据卷

```shell
docker volume create [volume] 
```

查看所有数据卷

```shell
docker volume ls
```

查看数据卷的详细信息

```shell
docker volume inspect [volume] 
```

删除数据卷

```shell
docker volume rm [volume] 
```

删除未使用的数据卷

```shell
docker volume prune [volume] 
```

## 构建镜像

```shell
docker build -t [image]:[version] ./[uri_dockerfile]
```

uri_dockerfile目录下必须包含"DockerFile"和"Dockerfile中需要的文件"

## 部署微服务集群

在docker-compose.yml中配置好

```shell
docker-compose up -d
```

## 部署Portainer

> Portainer 是一款轻量级的应用，它提供了图形化界面，用于方便地管理Docker环境，包括单机环境和集群环境。

拉取Portainer镜像

英文版：

```shell
docker pull portainer/portainer-ce
```

汉化版

```shell
docker pull 6053537/portainer-ce
```

创建实例并启动

```shell
docker run -d --restart=always --name=portainer -p 9:9000 -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data 6053537/portainer-ce
```

Portainer的默认账号和密码是：admin/admin，第一次进入需要创建用户，同时会提示你修改密码

## 部署MySQL 5.7

下载mysql5.7镜像文件

```shell
docker pull mysql:5.7
```

创建实例并启动

（Mysql5.7）（存在问题，暂未解决）

```shell
docker run \
-p 3306:3306 \
--name mysql \
--restart=always \
-v /mydata/mysql/conf:/etc/mysql/conf.d \
-v /mydata/mysql/data:/var/lib/mysql \
-v /mydata/mysql/log:/var/log/mysql \
-e MYSQL_ROOT_PASSWORD=root \
-d mysql:5.7
```


> 参数说明：
> -p 3306:3306：将容器的 3306 端口映射到主机的 3306 端口
> -v /mydata/mysql/conf:/etc/mysql：将配置文件夹挂载到主机
> -v /mydata/mysql/log:/var/log/mysql：将日志文件夹挂载到主机
> -v /mydata/mysql/data:/var/lib/mysql/：将配置文件夹挂载到主机
> -e MYSQL_ROOT_PASSWORD=root：初始化 root 用户的密码

配置mysql

```shell
vi /mydata/mysql/conf/my.cnf
```

适合Mysql5.7

```shell
[mysqld]
skip-grant-tables
user=mysql
character-set-server=utf8
default_authentication_plugin=mysql_native_password
secure_file_priv=/var/lib/mysql
expire_logs_days=7
sql_mode=STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION
max_connections=1000

init_connect='SET collation_connection = utf8_unicode_ci' init_connect='SET NAMES utf8' character-set-server=utf8
collation-server=utf8_unicode_ci
skip-character-set-client-handshake
skip-name-resolve

[client]
default-character-set=utf8

[mysql]
default-character-set=utf8
```

进入容器的mysql命令行

```shell
docker exec -it mysql mysql -uroot -proot
```

设置远程访问

```shell
grant all privileges on *.* to 'root'@'%' identified by 'root' with grant option;
flush privileges;
```

## 部署MySQL 8

```shell
docker run \
-p 3306:3306 \
--privileged=true \
--name mysql8 \
--restart=always \
-v ~/mydata/mysql8/conf:/etc/mysql/conf.d \
-v ~/mydata/mysql8/data:/var/lib/mysql \
-v ~/mydata/mysql8/log:/var/log/mysql \
-e MYSQL_ROOT_PASSWORD=root \
-d mysql:latest
```


> 参数说明：
> -p 3306:3306：将容器的 3306 端口映射到主机的 3306 端口
> -v /mydata/mysql/conf:/etc/mysql：将配置文件夹挂载到主机
> -v /mydata/mysql/log:/var/log/mysql：将日志文件夹挂载到主机
> -v /mydata/mysql/data:/var/lib/mysql/：将配置文件夹挂载到主机
> -e MYSQL_ROOT_PASSWORD=root：初始化 root 用户的密码

配置mysql

```shell
vi /mydata/mysql/conf/my.cnf
```

适合Mysql8

```shell
[mysqld]
skip-grant-tables
user=mysql
character-set-server=utf8
default_authentication_plugin=mysql_native_password
secure_file_priv=/var/lib/mysql
expire_logs_days=7
sql_mode=STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION
max_connections=1000
 
[client]
default-character-set=utf8
 
[mysql]
default-character-set=utf8
```

进入容器的mysql命令行

```shell
docker exec -it mysql mysql -uroot -proot
```

设置远程访问

```shell
grant all privileges on *.* to 'root'@'%' identified by 'root' with grant option;
flush privileges;
```

## 部署MySQL（通用）

```shell
docker pull mysql
```

```shell
docker volume create data_mysql
```

```shell
docker run --name mysql \
-v data_mysql:/var/lib/mysql \
-p 3306:3306 \
-e MYSQL_ROOT_PASSWORD=root \
-d mysql
```

## 部署PGVector

> PGVector是一款基于PostgreSQL的扩展插件，虽然在连接作为数据库时与PostgreSQL、MySQL看起来一样，但它和PostgreSQL其实并不是同一个东西，在开发时所采用的ORM框架也不同，因此可以将其单独作为一种数据库列出来。

```
docker run -d \
  --name vector_db \
  -e POSTGRES_USER=root \
  -e POSTGRES_PASSWORD=kjiolluy711 \
  -e POSTGRES_DB=ai-rag-knowledge \
  -e PGPASSWORD=kjiolluy711 \
  -v $(pwd)/pgvector/sql/init.sql:/docker-entrypoint-initdb.d/init.sql \
  --log-opt max-size=10m \
  --log-opt max-file=3 \
  -p 15432:5432 \
  --health-cmd="pg_isready -U root -d ai-rag-knowledge" \
  --health-interval=2s \
  --health-timeout=20s \
  --health-retries=10 \
  registry.cn-hangzhou.aliyuncs.com/xfg-studio/pgvector:v0.5.0
```

## 部署Redis

下载最新的镜像

```shell
docker pull redis
```

创建实例并启动

```shell
mkdir -p /mydata/redis/conf
```

```shell
touch /mydata/redis/conf/redis.conf
```

```shell
docker run -p 6379:6379 --name redis --restart=always \
-v /mydata/redis/data:/data \
-v /mydata/redis/conf/redis.conf:/etc/redis/redis.conf \
-d redis redis-server /etc/redis/redis.conf
```

> 参数说明：
> `-p 6379:6379`：将容器的 6379 端口映射到Linux机的 6379 端口
> `-v /mydata/redis/data:/data`：将redis数据库挂载到主机
> `-v /mydata/redis/conf/redis.conf:/etc/redis/redis.conf`：将配置文件夹挂载到主机
> `-d redis redis-server /etc/redis/redis.conf`：使用redis-server命令将使用配置运行


```shell
mkdir -p /mydata/redis2/conf
touch /mydata/redis2/conf/redis.conf
docker run -p 6380:6379 --name redis2 -v /mydata/redis2/data:/data \
-v /mydata/redis2/conf/redis.conf:/etc/redis/redis.conf \
-d redis redis-server /etc/redis/redis.conf
```

> 参数说明：
> `-p 6380:6379`：将容器的 6379 端口映射到Linux机的 6380 端口

```shell
mkdir -p /mydata/redis3/conf
touch /mydata/redis3/conf/redis.conf
docker run -p 6381:6379 --name redis3 -v /mydata/redis3/data:/data \
-v /mydata/redis3/conf/redis.conf:/etc/redis/redis.conf \
-d redis redis-server /etc/redis/redis.conf
```

使用redis镜像执行redis-cli命令连接

```shell
docker exec -it redis redis-cli
```

或 进入部署的redis命令行

```
docker exec -it redis redis-cli
```

Redis配置文件需要修改的项

```shell
# 注释掉这部分，不限制redis只能本地访问
bind 127.0.0.1
# 关闭保护模式，不限制为本地访问
protected-mode no
# （必改）是否开启守护线程，守护线程可后台运行，除非kill进程。改为yes会使配置文件方式启动redis失败！！
daemonize no


# 是否压缩，建议开启，否则rdb文件会变得巨大
rdbcompression yes
# （可选）RDB文件名称
dbfilename mydump.rdb
# （可选）数据库个数
databases 16
# rdb文件保存的路径目录
dir ./

# （可选）开启AOF持久化
appendonly yes
# AOF文件比上次文件增长超过多少百分比则出发重写，默认100%
auto-aof-rewrite-percentage 100
# AOF文件体积最小多大以上才触发重写，默认：64mb
auto-aof-rewrite-min-size 64mb
```

Redis持久化的RDB和AOF对比

|                | RDB                                          | AOF                                                         |
| -------------- | -------------------------------------------- | ----------------------------------------------------------- |
| 持久化方式     | 定时对整个内存做快照                         | 记录每一次执行的命令                                        |
| 数据完整性     | 不完整，两次备份之间会丢失                   | 相对完整，取决于刷盘策略                                    |
| 文件大小       | 会有压缩，文件体积小                         | 记录命令，文件体积很大                                      |
| 宕机恢复速度   | 很快                                         | 慢                                                          |
| 数据恢复优先级 | 低，因为数据完整性不如AOF                    | 高，因为数据完整性更高                                      |
| 系统资源占用   | 高，大量CPU和内存消耗                        | 低，主要占用磁盘IO资源，且重写时会占用大量CPU资源和内存资源 |
| 使用场景       | 可以容忍数分钟的数据丢失，追求更快的启动速度 | 对数据安全性要求较高                                        |

### 配置Redis主从集群

**1、用Docker部署好三台Redis**

主机redis，ip地址：192.168.113.132:6379

从机redis2，ip地址：192.168.113.132:6380

从机redis3，ip地址：192.168.113.132:6381

![image-20230907171409814](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/image-20230907171409814.png)

**2 在从机上配置主机ip**

进入redis2容器内部，配置主机ip

```shell
docker exec -it redis2 bash
```

```shell
redis-cli
```

```shell
slaveof 192.168.113.132 6379
或
replicaof 192.168.113.132 6379
```

另一个从机重复以上步骤：

```shell
docker exec -it redis3 bash
```

```shell
redis-cli
```

````shell
slaveof 192.168.113.132 6379
或
replicaof 192.168.113.132 6379
````

**3、在主机上查看主从配置结果**


```shell
info replication
```

![image-20230907172256490](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/image-20230907172256490.png)

至此，Redis主从配置就好了！比单独部署更方便！

**4、 主从数据同步原理**

全量同步的流程：

- slave节点请求增量同步
- master节点判断replid，发现不一致，拒绝增量同步
- master将完整内存数据生成RDB，发送RDB到slave
- slave清空本地数据，加载master的RDB
- master将RDB期间的命令记录在repl_baklog，并持续将log中的命令发送给slave
- slave执行接收到的命令，保持与master之间的同步

增量同步的流程：

master节点和slave节点中维护了一个环形数组（前文提到的repl_baklog）和一个指针为offset。

slave来申请增量同步，带着replid和offset，然后master根据获取offset之后的数据，将其发送给slave，slave进行同步。

- 此时会出现一个问题，当slave下限太久时，master中存储的数据已经超过了这个repl_baklog的上线，因此就需要重新进行全量同步。

## 部署Redisearch

> Redis-search是一款可以存储向量化数据的内存型数据库，基于Redis而来

```shell
docker run -p 6379:6379 --name redis-vector --restart=unless-stopped \
-d redislabs/redisearch
```

## 部署nacos

### Windows下启动nacos

下载nacos安装包：https://github.com/alibaba/nacos/releases

解压，进入bin目录下创建一个.bat文件，以后启动就双击这个.bat文件

my_startup.bat：`目录路径\nacos\bin\startup.cmd -m standalone`

正常的启动命令是：`startup.cmd -m standalone`

### Linux下安装nacos（稍麻烦）

先远程连接服务器数据库，创建nacos数据库

```sql
CREATE database if NOT EXISTS `nacos_config` default character set utf8mb4 collate utf8mb4_unicode_ci;
use `nacos_config`;
 
/******************************************/
/*   数据库全名 = nacos_config   */
/*   表名称 = config_info   */
/******************************************/
CREATE TABLE `config_info` (
                              `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'id',
                              `data_id` varchar(255) NOT NULL COMMENT 'data_id',
                              `group_id` varchar(255) DEFAULT NULL,
                              `content` longtext NOT NULL COMMENT 'content',
                              `md5` varchar(32) DEFAULT NULL COMMENT 'md5',
                              `gmt_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
                              `gmt_modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
                              `src_user` text COMMENT 'source user',
                              `src_ip` varchar(20) DEFAULT NULL COMMENT 'source ip',
                              `app_name` varchar(128) DEFAULT NULL,
                              `tenant_id` varchar(128) DEFAULT '' COMMENT '租户字段',
                              `c_desc` varchar(256) DEFAULT NULL,
                              `c_use` varchar(64) DEFAULT NULL,
                              `effect` varchar(64) DEFAULT NULL,
                              `type` varchar(64) DEFAULT NULL,
                              `c_schema` text,
                              PRIMARY KEY (`id`),
                              UNIQUE KEY `uk_configinfo_datagrouptenant` (`data_id`,`group_id`,`tenant_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='config_info';

/******************************************/
/*   数据库全名 = nacos_config   */
/*   表名称 = config_info_aggr   */
/******************************************/
CREATE TABLE `config_info_aggr` (
                                   `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'id',
                                   `data_id` varchar(255) NOT NULL COMMENT 'data_id',
                                   `group_id` varchar(255) NOT NULL COMMENT 'group_id',
                                   `datum_id` varchar(255) NOT NULL COMMENT 'datum_id',
                                   `content` longtext NOT NULL COMMENT '内容',
                                   `gmt_modified` datetime NOT NULL COMMENT '修改时间',
                                   `app_name` varchar(128) DEFAULT NULL,
                                   `tenant_id` varchar(128) DEFAULT '' COMMENT '租户字段',
                                   PRIMARY KEY (`id`),
                                   UNIQUE KEY `uk_configinfoaggr_datagrouptenantdatum` (`data_id`,`group_id`,`tenant_id`,`datum_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='增加租户字段';


/******************************************/
/*   数据库全名 = nacos_config   */
/*   表名称 = config_info_beta   */
/******************************************/
CREATE TABLE `config_info_beta` (
                                   `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'id',
                                   `data_id` varchar(255) NOT NULL COMMENT 'data_id',
                                   `group_id` varchar(128) NOT NULL COMMENT 'group_id',
                                   `app_name` varchar(128) DEFAULT NULL COMMENT 'app_name',
                                   `content` longtext NOT NULL COMMENT 'content',
                                   `beta_ips` varchar(1024) DEFAULT NULL COMMENT 'betaIps',
                                   `md5` varchar(32) DEFAULT NULL COMMENT 'md5',
                                   `gmt_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
                                   `gmt_modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
                                   `src_user` text COMMENT 'source user',
                                   `src_ip` varchar(20) DEFAULT NULL COMMENT 'source ip',
                                   `tenant_id` varchar(128) DEFAULT '' COMMENT '租户字段',
                                   PRIMARY KEY (`id`),
                                   UNIQUE KEY `uk_configinfobeta_datagrouptenant` (`data_id`,`group_id`,`tenant_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='config_info_beta';

/******************************************/
/*   数据库全名 = nacos_config   */
/*   表名称 = config_info_tag   */
/******************************************/
CREATE TABLE `config_info_tag` (
                                  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'id',
                                  `data_id` varchar(255) NOT NULL COMMENT 'data_id',
                                  `group_id` varchar(128) NOT NULL COMMENT 'group_id',
                                  `tenant_id` varchar(128) DEFAULT '' COMMENT 'tenant_id',
                                  `tag_id` varchar(128) NOT NULL COMMENT 'tag_id',
                                  `app_name` varchar(128) DEFAULT NULL COMMENT 'app_name',
                                  `content` longtext NOT NULL COMMENT 'content',
                                  `md5` varchar(32) DEFAULT NULL COMMENT 'md5',
                                  `gmt_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
                                  `gmt_modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
                                  `src_user` text COMMENT 'source user',
                                  `src_ip` varchar(20) DEFAULT NULL COMMENT 'source ip',
                                  PRIMARY KEY (`id`),
                                  UNIQUE KEY `uk_configinfotag_datagrouptenanttag` (`data_id`,`group_id`,`tenant_id`,`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='config_info_tag';

/******************************************/
/*   数据库全名 = nacos_config   */
/*   表名称 = config_tags_relation   */
/******************************************/
CREATE TABLE `config_tags_relation` (
                                       `id` bigint(20) NOT NULL COMMENT 'id',
                                       `tag_name` varchar(128) NOT NULL COMMENT 'tag_name',
                                       `tag_type` varchar(64) DEFAULT NULL COMMENT 'tag_type',
                                       `data_id` varchar(255) NOT NULL COMMENT 'data_id',
                                       `group_id` varchar(128) NOT NULL COMMENT 'group_id',
                                       `tenant_id` varchar(128) DEFAULT '' COMMENT 'tenant_id',
                                       `nid` bigint(20) NOT NULL AUTO_INCREMENT,
                                       PRIMARY KEY (`nid`),
                                       UNIQUE KEY `uk_configtagrelation_configidtag` (`id`,`tag_name`,`tag_type`),
                                       KEY `idx_tenant_id` (`tenant_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='config_tag_relation';

/******************************************/
/*   数据库全名 = nacos_config   */
/*   表名称 = group_capacity   */
/******************************************/
CREATE TABLE `group_capacity` (
                                 `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键ID',
                                 `group_id` varchar(128) NOT NULL DEFAULT '' COMMENT 'Group ID，空字符表示整个集群',
                                 `quota` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '配额，0表示使用默认值',
                                 `usage` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '使用量',
                                 `max_size` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '单个配置大小上限，单位为字节，0表示使用默认值',
                                 `max_aggr_count` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '聚合子配置最大个数，，0表示使用默认值',
                                 `max_aggr_size` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '单个聚合数据的子配置大小上限，单位为字节，0表示使用默认值',
                                 `max_history_count` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '最大变更历史数量',
                                 `gmt_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
                                 `gmt_modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
                                 PRIMARY KEY (`id`),
                                 UNIQUE KEY `uk_group_id` (`group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='集群、各Group容量信息表';

/******************************************/
/*   数据库全名 = nacos_config   */
/*   表名称 = his_config_info   */
/******************************************/
CREATE TABLE `his_config_info` (
                                  `id` bigint(64) unsigned NOT NULL,
                                  `nid` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
                                  `data_id` varchar(255) NOT NULL,
                                  `group_id` varchar(128) NOT NULL,
                                  `app_name` varchar(128) DEFAULT NULL COMMENT 'app_name',
                                  `content` longtext NOT NULL,
                                  `md5` varchar(32) DEFAULT NULL,
                                  `gmt_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                  `gmt_modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                  `src_user` text,
                                  `src_ip` varchar(20) DEFAULT NULL,
                                  `op_type` char(10) DEFAULT NULL,
                                  `tenant_id` varchar(128) DEFAULT '' COMMENT '租户字段',
                                  PRIMARY KEY (`nid`),
                                  KEY `idx_gmt_create` (`gmt_create`),
                                  KEY `idx_gmt_modified` (`gmt_modified`),
                                  KEY `idx_did` (`data_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='多租户改造';


/******************************************/
/*   数据库全名 = nacos_config   */
/*   表名称 = tenant_capacity   */
/******************************************/
CREATE TABLE `tenant_capacity` (
                                  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键ID',
                                  `tenant_id` varchar(128) NOT NULL DEFAULT '' COMMENT 'Tenant ID',
                                  `quota` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '配额，0表示使用默认值',
                                  `usage` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '使用量',
                                  `max_size` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '单个配置大小上限，单位为字节，0表示使用默认值',
                                  `max_aggr_count` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '聚合子配置最大个数',
                                  `max_aggr_size` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '单个聚合数据的子配置大小上限，单位为字节，0表示使用默认值',
                                  `max_history_count` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '最大变更历史数量',
                                  `gmt_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
                                  `gmt_modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
                                  PRIMARY KEY (`id`),
                                  UNIQUE KEY `uk_tenant_id` (`tenant_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='租户容量信息表';


CREATE TABLE `tenant_info` (
                              `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'id',
                              `kp` varchar(128) NOT NULL COMMENT 'kp',
                              `tenant_id` varchar(128) default '' COMMENT 'tenant_id',
                              `tenant_name` varchar(128) default '' COMMENT 'tenant_name',
                              `tenant_desc` varchar(256) DEFAULT NULL COMMENT 'tenant_desc',
                              `create_source` varchar(32) DEFAULT NULL COMMENT 'create_source',
                              `gmt_create` bigint(20) NOT NULL COMMENT '创建时间',
                              `gmt_modified` bigint(20) NOT NULL COMMENT '修改时间',
                              PRIMARY KEY (`id`),
                              UNIQUE KEY `uk_tenant_info_kptenantid` (`kp`,`tenant_id`),
                              KEY `idx_tenant_id` (`tenant_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='tenant_info';

CREATE TABLE `users` (
                        `username` varchar(50) NOT NULL PRIMARY KEY,
                        `password` varchar(500) NOT NULL,
                        `enabled` boolean NOT NULL
);

CREATE TABLE `roles` (
                        `username` varchar(50) NOT NULL,
                        `role` varchar(50) NOT NULL,
                        UNIQUE INDEX `idx_user_role` (`username` ASC, `role` ASC) USING BTREE
);

CREATE TABLE `permissions` (
                              `role` varchar(50) NOT NULL,
                              `resource` varchar(255) NOT NULL,
                              `action` varchar(8) NOT NULL,
                              UNIQUE INDEX `uk_role_permission` (`role`,`resource`,`action`) USING BTREE
);

INSERT INTO users (username, password, enabled) VALUES ('nacos', '$2a$10$EuWPZHzz32dJN7jexM34MOeYirDdFAZm2kuWj7VEOJhhZkDrxfvUu', TRUE);

INSERT INTO roles (username, role) VALUES ('nacos', 'ROLE_ADMIN');
```

拉取对应的镜像文件

```shell
docker pull nacos/nacos-server
```

挂载目录

```shell
mkdir -p /mydata/nacos/data/
mkdir -p /mydata/nacos/logs/
mkdir -p /mydata/nacos/init.d/
```

修改nacos配置文件

```shell
vi /mydata/nacos/init.d/custom.properties
```

```
server.contextPath=/nacos
server.servlet.contextPath=/nacos
server.port=8848
 
spring.datasource.platform=mysql
db.num=1
db.url.0=jdbc:mysql://localhost:3306/nacos_config?characterEncoding=utf8&connectTimeout=1000&socketTimeout=3000&autoReconnect=true #这里需要修改端口
db.user=root #用户名
db.password=root #密码
 
nacos.cmdb.dumpTaskInterval=3600
nacos.cmdb.eventTaskInterval=10
nacos.cmdb.labelTaskInterval=300
nacos.cmdb.loadDataAtStart=false
management.metrics.export.elastic.enabled=false
management.metrics.export.influx.enabled=false
server.tomcat.accesslog.enabled=true
server.tomcat.accesslog.pattern=%h %l %u %t "%r" %s %b %D %{User-Agent}i
nacos.security.ignore.urls=/,/**/*.css,/**/*.js,/**/*.html,/**/*.map,/**/*.svg,/**/*.png,/**/*.ico,/console-fe/public/**,/v1/auth/login,/v1/console/health/**,/v1/cs/**,/v1/ns/**,/v1/cmdb/**,/actuator/**,/v1/console/server/**
nacos.naming.distro.taskDispatchThreadCount=1
nacos.naming.distro.taskDispatchPeriod=200
nacos.naming.distro.batchSyncKeyCount=1000
nacos.naming.distro.initDataRatio=0.9
nacos.naming.distro.syncRetryDelay=5000
nacos.naming.data.warmup=true
nacos.naming.expireInstance=true
```

启动nacos容器：

```shell
docker run \
--name nacos -d \
-p 8848:8848 \
--privileged=true \
--restart=always \
-e JVM_XMS=256m -e JVM_XMX=256m \
-e MODE=standalone \
-e PREFER_HOST_MODE=hostname \
-v /mydata/nacos/nacos/data:/home/nacos/data \
-v /mydata/nacos/logs:/home/nacos/logs \
-v /mydata/nacos/init.d/custom.properties:/home/nacos/init.d/custom.properties \
nacos/nacos-server
```

（排错用）进入nacos容器编辑配置文件

```
docker exec -it nacos bash
cd conf
ll
vim application.properties
```

此时nacos容器就安装成功了可以打开浏览器进行登录：

```shell
https://192.168.113.132:8848/nacos
```

```
账号：nacos
密码：nacos
```

最后设置nacos自启动：

```shell
docker update --restart=always nacos
```

## 部署RabbitMQ

拉取镜像

```shell
docker pull rabbitmq:3-management
```

或本地加载

```shell
docker load -i mq.tar
```

启动MQ

>  -e RABBITMQ_DEFAULT_USER=itcast \   后台管理界面的用户名、密码
>  -e RABBITMQ_DEFAULT_PASS=123321 \
>  -p 15672:15672 \    后台管理界面的端口
>  -p 5672:5672 \      消息通信的端口

```shell
docker run \
 -e RABBITMQ_DEFAULT_USER=admin \
 -e RABBITMQ_DEFAULT_PASS=a \
 --name mq \
 --hostname mq1 \
 -p 15672:15672 \
 -p 5672:5672 \
 -d \
 rabbitmq:3-management
```

## 部署elasticsearch

### es与mysql的概念名词对比

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/es%E4%B8%8Emysql%E5%AF%B9%E6%AF%94.jpg" alt="es与mysql对比" style="zoom: 33%;" />

### es的mapping属性解析

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/es%E7%9A%84mapping%E5%B1%9E%E6%80%A7%E8%A7%A3%E6%9E%90.jpg" alt="es的mapping属性解析" style="zoom:33%;" />

### 本地安装es

拉取/加载镜像

```shell
docker load -i es.tar
```

运行docker命令，部署单点es：

>     命令解释：
>
>     - `-e "cluster.name=es-docker-cluster"`：设置集群名称
>     - `-e "http.host=0.0.0.0"`：监听的地址，可以外网访问
>     - `-e "ES_JAVA_OPTS=-Xms512m -Xmx512m"`：内存大小
>     - `-e "discovery.type=single-node"`：非集群模式
>     - `-v es-data:/usr/share/elasticsearch/data`：挂载逻辑卷，绑定es的数据目录
>     - `-v es-logs:/usr/share/elasticsearch/logs`：挂载逻辑卷，绑定es的日志目录
>     - `-v es-plugins:/usr/share/elasticsearch/plugins`：挂载逻辑卷，绑定es的插件目录
>     - `--privileged`：授予逻辑卷访问权
>     - `--network es-net` ：加入一个名为es-net的网络中
>     - `-p 9200:9200`：暴露给http的端口
>     - `-p 9300:9300`：暴露给其他节点互联的端口

```sh
docker run -d \
	--name es \
    -e "ES_JAVA_OPTS=-Xms512m -Xmx512m" \
    -e "discovery.type=single-node" \
    -v es-data:/usr/share/elasticsearch/data \
    -v es-plugins:/usr/share/elasticsearch/plugins \
    -v es-logs:/usr/share/elasticsearch/logs \
    --privileged \
    --network es-net \
    -p 9200:9200 \
    -p 9300:9300 \
elasticsearch:7.12.1
```

在浏览器中输入：http://192.168.113.132:9200 即可看到elasticsearch的响应结果

### 在线安装es

拉取镜像

```shell
docker pull elasticsearch:7.4.0
```

创建容器

```shell
docker run -id --name elasticsearch -d \
    --restart=always \
    -p 9200:9200 -p 9300:9300 \
    -v /usr/share/elasticsearch/plugins:/usr/share/elasticsearch/plugins \
    -e "discovery.type=single-node" \
elasticsearch:7.4.0
```

配置IK分词器（与上文中的`usr/share/elasticsearch/plugins`保持一致）

```shell
#切换目录
cd /usr/share/elasticsearch/plugins

#新建目录
mkdir analysis-ik
cd analysis-ik

#root根目录中拷贝文件
mv elasticsearch-analysis-ik-7.4.0.zip /usr/share/elasticsearch/plugins/analysis-ik

#解压文件
cd /usr/share/elasticsearch/plugins/analysis-ik
unzip elasticsearch-analysis-ik-7.4.0.zip
```

### 安装IK分词器

#### 在线安装

```shell
# 进入容器内部
docker exec -it elasticsearch /bin/bash

# 在线下载并安装
./bin/elasticsearch-plugin  install https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v7.12.1/elasticsearch-analysis-ik-7.12.1.zip

#退出
exit
#重启容器
docker restart elasticsearch
```

#### 离线安装

查看elasticsearch的数据卷目录

```shell
docker volume inspect es-plugins
```

显示结果：

```json
[
   {
      "CreatedAt": "2022-05-06T10:06:34+08:00",
      "Driver": "local",
      "Labels": null,
      "Mountpoint": "/var/lib/docker/volumes/es-plugins/_data",
      "Name": "es-plugins",
      "Options": null,
      "Scope": "local"
   }
]
```

将ik文件夹上传到`/var/lib/docker/volumes/es-plugins/_data`目录下

重启容器

```shell
docker restart es
```

查看日志，发现加载ik插件，就说明安装成功了

```sh
docker logs -f es
```

#### 测试IK分词器

* `ik_smart`：最少切分
* `ik_max_word`：最细切分

```
GET /_analyze
{
  "analyzer": "ik_max_word",
  "text": "黑马程序员学习java太棒了"
}
```

#### 扩展词词典 && 停用词词典

前往`/var/lib/docker/volumes/es-plugins/_data/ik/config`目录下，编辑`IKAnalyzer.cfg.xml`文件，添加扩展词词典`ext.dic`和停用词词典`stop.dic`

> 注意当前文件的编码必须是 UTF-8 格式，严禁使用Windows记事本编辑

重启elasticsearch和kibana

```shell
docker restart elasticsearch
docker restart kibana
```

查看日志，发现日志中已经成功加载ext.dic和stop.dic配置文件

```sh
docker logs -f es
```

## 部署kibana（可视化管理es）

创建网络

需要让es和kibana容器互联，因此需要创建一个网络

```shell
docker network create es-net
```

拉取/加载镜像

```shell
docker load -i kibana.tar
```

部署kibana

> - `--network es-net` ：加入一个名为es-net的网络中，与elasticsearch在同一个网络中
> - `-e ELASTICSEARCH_HOSTS=http://es:9200"`：设置elasticsearch的地址，因为kibana已经与elasticsearch在一个网络，因此可以用容器名直接访问elasticsearch
> - `-p 5601:5601`：端口映射配置

```shell
docker run -d \
--name kibana \
-e ELASTICSEARCH_HOSTS=http://es:9200 \
--network=es-net \
-p 5601:5601  \
kibana:7.12.1
```

此时，在浏览器输入地址访问：http://192.168.113.132:5601，即可看到结果

## 部署nginx

### nginx命令

> 开启服务：`start nginx`
> 直接点击Nginx目录下的nginx.exe
>
> 快速停止服务：`nginx -s stop`
>
> 重启服务：`nginx -s reload`
>
> 有序停止服务：`nginx -s quit`
>
> 其他命令重启、关闭nginx：`ps -ef | grep nginx`
>
> 强制停止Nginx：`pkill -9 nginx`
>
> 从容停止Nginx：`kill -QUIT 主进程号`
>
> 快速停止Nginx：`kill -TERM 主进程号`
>
> 平滑重启nginx：`kill -HUP 主进程号`

### 拉取镜像

```
docker pull nginx
```

### 简单上手

```shell
docker run --restart=always --name=nginx -p 80:80 -d nginx
```

### 创建数据卷文件

```shell
mkdir /mydata/nginx/conf/
touch /mydata/nginx/conf/nginx.conf
```

```shell
mkdir /mydata/nginx/conf.d/
touch /mydata/nginx/conf.d/default.conf
```

```
mkdir /mydata/nginx/log/
```

```shell
mkdir /mydata/nginx/html/
```

```shell
mkdir /mydata/nginx/conf/leadnews/
```

### 创建容器

```shell
docker run \
  -p 80:80 \
  --name nginx \
  --restart=always \
  -v /mydata/nginx/conf/nginx.conf:/etc/nginx/nginx.conf \
  -v /mydata/nginx/conf/leadnews/:/etc/nginx/leadnews/ \
  -v /mydata/nginx/html:/usr/share/nginx/html \
  -v /mydata/nginx/logs:/var/log/nginx \
  -d nginx
```

**需要手写挂载的数据卷**

`/etc/nginx/nginx.conf`

```
user  nginx;
worker_processes  auto;

error_log  /var/log/nginx/error.log notice;
pid        /var/run/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    #gzip  on;

    include /etc/nginx/conf.d/*.conf;
}
```

`/etc/nginx/conf.d/default.conf`

```
server {
    listen       80;
    server_name  localhost;

    #access_log  /var/log/nginx/host.access.log  main;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }

    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

    # proxy the PHP scripts to Apache listening on 127.0.0.1:80
    #
    #location ~ \.php$ {
    #    proxy_pass   http://127.0.0.1;
    #}

    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    #location ~ \.php$ {
    #    root           html;
    #    fastcgi_pass   127.0.0.1:9000;
    #    fastcgi_index  index.php;
    #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
    #    include        fastcgi_params;
    #}

    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
    #
    #location ~ /\.ht {
    #    deny  all;
    #}
}
```

`自定义配置文件`

```
upstream  heima-app-gateway{
    server localhost:51601;
}

server {
	listen 8801;
	location / {
		root D:/Projects_Java/workspace_heima-leadnews/app-web/;
		index index.html;
	}
	
	location ~/app/(.*) {
		proxy_pass http://heima-app-gateway/$1;
		proxy_set_header HOST $host;  # 不改变源请求头的值
		proxy_pass_request_body on;  #开启获取请求体
		proxy_pass_request_headers on;  #开启获取请求头
		proxy_set_header X-Real-IP $remote_addr;   # 记录真实发出请求的客户端IP
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;  #记录代理信息
	}
}
```

## 部署minio

拉取镜像

```shell
docker pull minio/minio
```

创建容器（minio端口默认是9000，但是会和Portainer端口冲突，所以这里改成了9100）

> 现在需要增加额外一个端口号用于web管理 --console-address “:9090” ；API管理地址 --console-address “:9000”

```shell
docker run -d \
--name minio \
-p 9100:9000  \
-p 9001:9001  \
-d --restart=always \
-e "MINIO_ROOT_USER=minio" \
-e "MINIO_ROOT_PASSWORD=12345678" \
-v /mydata/minio/data:/data \
-v /mydata/minio/config:/root/.minio \
minio/minio server  /data --console-address ":9001"
```

web管理地址：`http://192.168.113.132:9001/`

API管理地址：`http://192.168.113.132:9100/`

## 安装1Panel管理工具

> 建议内存不低于4G安装此工具，如果内存2G会很卡

安装步骤参考文档：

`1Panel文档`：https://1panel.cn/docs/installation/online_installation/

我在虚拟机里安装了，非常简单，结果如下：

![1Panel安装完成](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/1Panel%E5%AE%89%E8%A3%85%E5%AE%8C%E6%88%90.jpg)

## 辣位大人的语音合成器

> [xijinping615/xi-jinping-tts Tags | Docker Hub](https://hub.docker.com/r/xijinping615/xi-jinping-tts)

拉取镜像

```shell
docker pull xijinping615/xi-jinping-tts
```

运行容器

```shell
docker run --rm -it -p 8501:8501 xijinping615/xi-jinping-tts
```

然后在浏览器中打开：`http://192.168.113.132:8501/`

## 部署zookeeper、kafka

拉取`zookeeper`镜像

```shell
docker pull zookeeper:3.4.14
```

创建`zookeeper`容器

```shell
docker run -d --name zookeeper -p 2181:2181 zookeeper:3.4.14
```

拉取`kafka`镜像

```shell
docker pull wurstmeister/kafka:2.12-2.3.1
```

创建`kafka`容器

```shell
docker run -d --name kafka \
--env KAFKA_ADVERTISED_HOST_NAME=192.168.179.129 \
--env KAFKA_ZOOKEEPER_CONNECT=192.168.179.129:2181 \
--env KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://192.168.179.129:9092 \
--env KAFKA_LISTENERS=PLAINTEXT://0.0.0.0:9092 \
--env KAFKA_HEAP_OPTS="-Xmx256M -Xms256M" \
--net=host wurstmeister/kafka:2.12-2.3.1
```

如果是云主机，需要把`--net=host`改成`-p 9092:9092`（个人未验证过）

## 部署MongoDB

拉取镜像

```shell
docker pull mongo
```

创建容器

```shell
docker run -di --name mongo-service --restart=always -p 27017:27017 -v ~/data/mongodata:/data mongo
```

yml配置

```yaml
server:
   port: 9998
spring:
   data:
      mongodb:
         host: 192.168.200.130
         port: 27017
         database: leadnews-history
```

## 部署OpenLDAP

镜像仓库：https://hub.docker.com/r/osixia/openldap/tags

下面👇这个命令可能有点老了，但还是记录一下吧，如果追求新鲜就pull最新版吧

参考视频：https://www.bilibili.com/video/BV1UK411c7we/

```shell
docker run -p 389:389 -p 636:636 \
  --name my-openldap-container \
  --env LDAP_TLS_VERIFY_CLIENT="never" \
  --env LDAP_ORGANISATION="Aishangwei" \
  --env LDAP_DOMAIN="xiodi.cn" \
  --env LDAP_ADMIN_PASSWORD="Xiodi.cn123" \
  -v /data/ldap/data:/var/lib/ldap \
  -v /data/ldap/conf:/etc/ldap/slapd.d \
  --detach osixia/openldap:1.3.0
```

下载[Apache Directory Studio](https://directory.apache.org/studio/download/)，什么系统就点哪个html页面去下载

这里具体讲下mac版的问题，可能会遇到如下错误：

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202506112136300.png" alt="img" style="zoom: 50%;" />

如果遇到这个问题，可以参考这篇[博客](https://blog.csdn.net/green1893/article/details/123045425)，具体做法就是安装x86版的jdk：

```shell
arch -x86_64 brew install oracle-jdk
```

安装末尾遇到了一些错误，但是并没有影响系统jdk版本，而且Apache Directory Studio也顺利启动了，于是就不追究了。

![image-20250611213732254](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202506112137327.png)

然后就是部署docker容器了，之后用Apache Directory Studio连接就行了

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202506112139897.png" alt="image-20250611213918869" style="zoom: 50%;" />

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202506112139106.png" alt="image-20250611213931043" style="zoom:50%;" />

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202506112139196.png" alt="image-20250611213902146" style="zoom:40%;" />
