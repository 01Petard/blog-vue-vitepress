---
title: MybatisPlus依赖和配置文件
date: 2022-03-07 22:01:15
updated:
categories: 
- 学习
tags: 
- MybatisPlus
- 依赖
- 配置文件
keywords:
- MybatisPlus
- 依赖
- 配置文件
description: MybatisPlus的依赖和配置文件
cover: https://img-blog.csdnimg.cn/img_convert/dcaab75e2a3a75cd7b336667739e4a86.png
top_img: https://www.chendan116.com/upload/2021/02/relationship-with-mybatis-d54d359809b54f1886d97258ebf0b4c8.png
---

### 依赖

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-jdbc</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.mybatis.spring.boot</groupId>
        <artifactId>mybatis-spring-boot-starter</artifactId>
        <version>2.2.2</version>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>




    <!--Mysql8.0-->
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <scope>runtime</scope>
    </dependency>
    <!--fastjson-->
    <dependency>
        <groupId>com.alibaba</groupId>
        <artifactId>fastjson</artifactId>
        <version>2.0.7</version>
    </dependency>
    <!--lombok-->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <scope>provided</scope>
    </dependency>
    <!--mybatis-plus-->
    <dependency>
        <groupId>com.baomidou</groupId>
        <artifactId>mybatis-plus-boot-starter</artifactId>
        <version>3.5.2</version>
    </dependency>
    <!--mybatis-plus模板引擎-->
    <dependency>
        <groupId>org.apache.velocity</groupId>
        <artifactId>velocity-engine-core</artifactId>
        <version>2.3</version>
    </dependency>
    <!--德鲁伊连接池-->
    <dependency>
        <groupId>com.alibaba</groupId>
        <artifactId>druid</artifactId>
        <version>1.2.11</version>
    </dependency>
    <!--log4j日志-->
    <dependency>
        <groupId>log4j</groupId>
        <artifactId>log4j</artifactId>
        <version>1.2.17</version>
    </dependency>
</dependencies>

```

### 配置文件

```yml
server:
  port: 9000
  address: 0.0.0.0
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/easyproject?useSSL=false&characterEncoding=utf-8&useUnicode=true&serverTimezone=Asia/Shanghai
    username: root
    password: 12345678
    type: com.alibaba.druid.pool.DruidDataSource
    dbcp2:
      initial-size: 5
      min-idle: 10
      max-conn-lifetime-millis: 20
      max-total: 50
      max-wait-millis: 60000
      timeBetweenEvictionRunsMillis: 60000
      minEvictableIdleTimeMillis: 300000
      validationQuery: SELECT 1 FROM DUAL
      testWhileIdle: true
      testOnBorrow: false
      testOnReturn: false
      poolPreparedStatements: true
      max-open-prepared-statements: 20

mybatis-plus:
  type-aliases-package: com.hzx.easysport.bean
  mapper-locations: classpath:mapper/*.xml
  global-config:
    db-config:
      # 配置逻辑删除
      logic-not-delete-value: 0
      logic-delete-value: 1
  configuration:
    # 配置日志
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
    #查询时为null字段不加入，比如QueryWrapper中的应用
    call-setters-on-nulls: true
    lazyLoadingEnabled: true
    aggressiveLazyLoading: false
```
