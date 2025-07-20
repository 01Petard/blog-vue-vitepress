---
title: curl命令的用法
date: 2024-10-22 17:58:00
updated:
categories: 
- 软件
tags: 
- curl
keywords:
- curl
description: 一个命令行工具
cover: https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202410221800461.png
top_img: https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202410221802081.png
---

`curl` 是一个非常强大的命令行工具，用于从服务器传输数据或向服务器传输数据。它支持许多协议（如 HTTP、HTTPS、FTP 等）。以下是使用 `curl` 发送不同类型的请求的基本方法。

在开发中，`curl`可以替代`postman`完成一些简单的前端模拟请求

## 发送请求

发送无状态的请求，参数类型指定的形式比较自由，url的双引号可加可不加，参数前缀指定也比较随意

```shell
curl www.baidu.com
```

```shell
curl "http://localhost:5050/test-redis"
```

```shell
curl -X GET "http://localhost:5050/test-redis"
```

```shell
curl --request GET --url "http://localhost:5050/test-redis"
```

携带token发送请求

```shell
curl "http://localhost:5050/api/profile" -H "Authorization: <token>"
```

```shell
curl --request GET --url "http://localhost:5050/api/profile" --header "Authorization: <token>"
```

模拟一个POST请求

1. 通过数据的方式

   ```shell
   curl -X POST -d "username=admin&password=123" "http://localhost:5050/api/login"
   ```

2. 通过表单的方式（一般用于PUT请求）

   ```shell
   curl -X POST "http://localhost:5050/api/login" -d "username=admin" -d "password=123"
   ```

3. 通过查询参数或路径参数的方式

   ```shell
   curl -X POST "http://localhost:5050/api/login?username=admin&password=123"
   ```

4. 通过 Json 的方式*（我没有测试成功，推测是Windows 命令行解释器的解析有问题）*

   ```shell
   curl -X POST "http://localhost:5050/api/login" -H "Content-Type: application/json" -d '{"username":"admin", "password":"123"}'
   ```

   ```shell
   curl --request POST --url 'http://localhost:5050/api/login' --header 'content-type: application/json' --data "{"username":"admin", "password":"123"}"
   ```

模拟一个DELETE请求

```shell
curl -X DELETE http://localhost:5050/api/logout?userId=666
```

```shell
curl --request DELETE --url http://localhost:5050/api/logout?userId=666
```

## 下载文件

通过 `-O` 参数可以保存下载的文件到当前目录，通过 `--connect-timeout` 参数来设置连接的超时时间（以秒为单位）

```shell
curl -O https://api.ee123.net/img/bingimg/dayimg.jpg --connect-timeout 5
```

```shell
curl -O http://example.com/file.zip --connect-timeout 5
```

![dayimg](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202410221737880.jpg)











