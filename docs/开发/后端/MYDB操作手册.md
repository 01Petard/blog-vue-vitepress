---
title: MYDB使用指南
date: 2024-09-09 18:47:00
updated: 2024-09-09 18:47:00
categories: 
- 学习
tags: 
- 数据库
keywords:
- 数据库
description: 参考innoDB引擎，手写关系型数据库
cover: https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202410212141467.png
top_img: https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202410212141876.png
---

## 进入项目路径

```shell
E:\Projects_Java\Project_xfg\MYDB-master
```

## 编译

```shell
mvn compile
```

> ```shell
> E:\Projects_Java\Project_xfg\MYDB-master>mvn compile
> [INFO] Scanning for projects...
> [INFO] 
> [INFO] -------------------------< top.guoziyang:MyDB >-------------------------
> [INFO] Building MyDB 1.0-SNAPSHOT                                              
> [INFO]   from pom.xml                                                          
> [INFO] --------------------------------[ jar ]---------------------------------
> [INFO] 
> [INFO] --- maven-resources-plugin:2.6:resources (default-resources) @ MyDB ---
> [INFO] Using 'UTF-8' encoding to copy filtered resources.
> [INFO] skip non existing resourceDirectory E:\Projects_Java\Project_xfg\MYDB-master\src\main\resources
> [INFO]
> [INFO] --- maven-compiler-plugin:3.1:compile (default-compile) @ MyDB ---
> [INFO] Changes detected - recompiling the module!
> [INFO] Compiling 65 source files to E:\Projects_Java\Project_xfg\MYDB-master\target\classes
> [INFO] ------------------------------------------------------------------------
> [INFO] BUILD SUCCESS
> [INFO] ------------------------------------------------------------------------
> [INFO] Total time:  1.436 s
> [INFO] Finished at: 2024-09-08T12:46:45+08:00
> [INFO] ------------------------------------------------------------------------
> ```

## 创建数据库

```shell
自己创建一个文件夹，比如：
mkdir E:\Projects_Java\Project_xfg\tmp\mydb
```

```shell
mvn exec:java -Dexec.mainClass="top.guoziyang.mydb.backend.Launcher" -Dexec.args="-create E:\Projects_Java\Project_xfg\tmp\mydb"
```

> ```shell
> E:\Projects_Java\Project_xfg\MYDB-master>mvn exec:java -Dexec.mainClass="top.guoziyang.mydb.backend.Launcher" -Dexec.args="-create E:\Projects_Java\Project_xfg\tmp\mydb"
> [INFO] Scanning for projects...
> [INFO] 
> [INFO] -------------------------< top.guoziyang:MyDB >-------------------------
> [INFO] Building MyDB 1.0-SNAPSHOT
> [INFO]   from pom.xml
> [INFO] --------------------------------[ jar ]---------------------------------
> [INFO] 
> [INFO] --- exec-maven-plugin:3.4.1:java (default-cli) @ MyDB ---
> [INFO] ------------------------------------------------------------------------
> [INFO] BUILD SUCCESS
> [INFO] ------------------------------------------------------------------------
> [INFO] Total time:  0.342 s
> [INFO] Finished at: 2024-09-08T12:49:07+08:00
> [INFO] ------------------------------------------------------------------------
> ```

## 以默认参数启动数据库服务

```shell
mvn exec:java -Dexec.mainClass="top.guoziyang.mydb.backend.Launcher" -Dexec.args="-open E:\Projects_Java\Project_xfg\tmp\mydb"
```

> ```shell
> E:\Projects_Java\Project_xfg\MYDB-master>mvn exec:java -Dexec.mainClass="top.guoziyang.mydb.backend.Launcher" -Dexec.args="-open E:\Projects_Java\Project_xfg\tmp\mydb"
> [INFO] Scanning for projects...
> [INFO] 
> [INFO] -------------------------< top.guoziyang:MyDB >-------------------------
> [INFO] Building MyDB 1.0-SNAPSHOT
> [INFO]   from pom.xml
> [INFO] --------------------------------[ jar ]---------------------------------
> [INFO] 
> [INFO] --- exec-maven-plugin:3.4.1:java (default-cli) @ MyDB ---
> Server listen to port: 9999
> Establish connection: 127.0.0.1:52192
> Execute: create table test_table id int32, value int32 (index id)
> Execute: insert into test_table values 10 33
> Execute: select * from test_table
> Execute: begin
> Execute: insert into test_table values 20 34
> Execute: commit
> Execute: select * from test_table
> Execute: begin
> Execute: delete from test_table where id = 10
> Execute: abort
> Execute: select * from test_table
> Execute: delete from test_table where id = 10
> Execute: select * from test_table
> ```

## 新起一个终端，启动客户端连接数据库

```shell
mvn exec:java -Dexec.mainClass="top.guoziyang.mydb.client.Launcher"
```

> ```shell
> E:\Projects_Java\Project_xfg\MYDB-master>mvn exec:java -Dexec.mainClass="top.guoziyang.mydb.client.Launcher"
> [INFO] Scanning for projects...
> [INFO] 
> [INFO] -------------------------< top.guoziyang:MyDB >-------------------------
> [INFO] Building MyDB 1.0-SNAPSHOT                                              
> [INFO]   from pom.xml                                                          
> [INFO] --------------------------------[ jar ]---------------------------------
> [INFO] 
> [INFO] --- exec-maven-plugin:3.4.1:java (default-cli) @ MyDB ---
> :> 
> ```
> 

## 测试

```sql
## 建表
:> create table test_table id int32, value int32 (index id)
create test_table
## 插入
:> insert into test_table values 10 33
insert
## 查询
:> select * from test_table
[10, 33]

# 事务提交
:> begin
begin
:> insert into test_table values 20 34
insert
:> commit
commit
:> select * from test_table            
[10, 33]
[20, 34]

## 事务中断
:> begin
begin
:> delete from test_table where id = 10
delete 1
:> abort
abort
:> select * from test_table             
[10, 33]
[20, 34]

## 删除
:> delete from test_table where id = 10
delete 1
:> select * from test_table
[20, 34]

:> quit
```

