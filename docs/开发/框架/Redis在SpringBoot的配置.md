---
title: Redis在SpringBoot的配置
date: 2022-04-02 13:25:15
updated:
categories: 
- 学习
tags: 
- Redis
- SpringBoot
keywords:
- Redis
- SpringBoot
description: 将Redis集成到SpringBoot上
cover: https://images.velog.io/images/jinmin2216/post/3d9a578e-53f4-4cf4-8807-7c91d61f35bf/%E1%84%89%E1%85%B3%E1%84%91%E1%85%B3%E1%84%85%E1%85%B5%E1%86%BC%20%E1%84%85%E1%85%A6%E1%84%83%E1%85%B5%E1%84%89%E1%85%B3.jpeg
top_img: https://miro.medium.com/max/1200/1*BJA4Po0UTCoBt1hVaEm6KA.png
---

### 1、添加依赖

```
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

### 2、配置文件

```
  redis:
    host: localhost # Redis服务器地址
    database: 0 # Redis数据库索引（默认为0）
    port: 6379 # Redis服务器连接端口
    password: # Redis服务器连接密码（默认为空）
    jedis:
      pool:
        max-active: 8 # 连接池最大连接数（使用负值表示没有限制）
        max-wait: -1ms # 连接池最大阻塞等待时间（使用负值表示没有限制）
        max-idle: 8 # 连接池中的最大空闲连接
        min-idle: 0 # 连接池中的最小空闲连接
    timeout: 3000ms # 连接超时时间（毫秒）

```

### 3、自定义key的配置

```
# 自定义redis key
redis:
  key:
    prefix:
      authCode: "portal:authCode:"
    expire:
      authCode: 120 # 验证码超期时间
```
