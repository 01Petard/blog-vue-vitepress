---
title: Quarkus——云原生时代的Java框架
date: 2024-08-15 10:26:00
updated: 2024-08-15 10:26:00
categories: 
- 学习
tags: 
- Quarkus
- 云原生
keywords:
- Quarkus
- 云原生
description: Quarkus——云原生时代的Java框架
cover: https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202410212154303.png
top_img: https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202410212153128.png
---
# Quarkus: 云原生时代的Java框架

## 云原生简介

### 什么是云原生？

云原生体系结构和技术是一种方法，用于设计、构造和操作在云中构建并充分利用云计算模型的工作负载。
云原生技术有利于各组织在公有云、私有云和混合云等新型动态环境中，构建和运行可弹性扩展的应用。

### 云原生的代表技术

#### 微服务

云原生系统采用微服务，而微服务是一种用于构造新式应用程序的常用体系结构样式。
微服务构建为一组通过共享结构进行交互的分布式小型独立服务，共同具有以下特征：

- 各自都在较大的域上下文中实现特定业务功能。

- 各自都自主开发，可以独立部署。

- 各自都是独立的，封装其自己的数据存储技术、依赖项和编程平台。

- 各自都在自己的进程中运行，并使用 HTTP/HTTPS、gRPC、WebSocket 或 AMQP 等标准通信协议与其他微服务进行通信。

- 它们组合在一起形成应用程序。

  #### 容器

  容器是与系统其他部分隔离开的一系列进程
  容器提供进程级的隔离，可以将操作系统管理的资源划分到相互隔离的组中，在相互隔离的组之间解决资源使用存在冲突的问题
  容器是微服务的最佳载体，Docker是使用最广泛的一种容器技术。

  #### Kubernetes

  Kubernetes用于编排管理容器的生命周期，是整个云原生的基石，云原生的整个生态体系都是依靠Kubernetes建立起来的。
  Kubernetes作为云应用的部署标准，直接面向业务应用，大大提高了云应用的可移植性，解决云厂商锁定的问题，让云应用可以在跨云之间无缝迁移，甚至用来管理混合云，成为企业 IT 云平台的新标准。

#### 服务网格

服务网格(Service Mesh)，是指用以处理服务与服务之间通信的基础设施层。
服务网格 核心是业务逻辑与非业务逻辑解耦，实现开发只需关注业务逻辑的实现。将一大堆和业务逻辑无关的客户端 SDK（如服务发现，路由，负载均衡，限流降级等）从业务应用中剥离出来，放到单独的 Proxy（Sidecar） 进程中，之后下沉到基础设施中间件 Mesh（类似 TDDL 到 DRDS 的模式）。
服务网格的出现弥补了Kubernetes在微服务的连接、管理和监控方面的短板，为Kubernetes提供更好的应用和服务管理。
Istio是是目前最广为人知的一款服务网格架构。

### 云原生的优点

#### 快速迭代

利用云原生应用程序开发，使得交付团队可以使用重复的自动化和编排来快速迭代，让开发人员有更多的精力聚焦于业务开发上。

#### 自动部署

相比于传统方法需要投入大量的精力来构建开发环境，云原生架构具备自动化和组合功能，交付十分敏捷，而不再需要人工干预重复执行。

#### 独立高效

云原生将应用程序代码解耦成独立模块化单元，降低微服务的部属时间与互依性，提高应用的扩展性等。

## Java在云原生时代的挑战

### Java的优势

- 庞大的生态，丰富的插件，活跃的社区；
- 平台无关性，一次运行，处处运行；
- 垃圾回收机制，不用手动回收内存；

### Java的劣势

- 依赖JDK
- 启动慢
- 资源占用率高

## Quarkus

### 什么是Quarkus

Quarkus 是专为 OpenJDK HotSpot 和 GraalVM 定制的全栈 Kubernetes 原生 Java 应用程序框架。与如 Spring 之类的其他框架相比，它提供了较小的内存占用并缩短了启动时间。它允许结合命令式和非阻塞响应式编程。
![img](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202408151010877)

### Quarkus的特性

![img](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202408151010909)

### Quarkus与传统Java应用的启动步骤对比

- 传统应用的启动步骤
  ![img](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202408151010555)
- Quarkus应用的启动步骤
  ![img](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202408151010255)

### Quarkus功能介绍

![页面-2](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202408151010924.png)

### 将应用从SpringBoot 迁移到Quarkus

#### 依赖替换

- `io.quarkus:quarkus-spring-boot-properties`: 使用注释如`@ConfigurationProperties`时需要;
- `io.quarkus:quarkus-spring-di`：使用注释如`@Service`、`Configuration`时需要;
- `io.quarkus:quarkus-spring-web`：使用注释如`@RestController`、`GetMapping`时需要;

#### 类替换

![img](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202408151010225)

#### 注解替换

![img](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202408151010068)

#### 异常处理替换

- SpringBoot

  ```java
  import javax.ws.rs.WebApplicationException;
  import javax.ws.rs.core.Response;
  import javax.ws.rs.ext.ExceptionMapper;
  import javax.ws.rs.ext.Provider;
  @Provider
  public class UncaughtExceptionMapper implements ExceptionMapper<Exception> {
  //...
  @Override
  public Response toResponse(Exception ex) {
      if (ex instanceof WebApplicationException) {
          return ((WebApplicationException)ex).getResponse();
      }
      logger.error("Uncaught exception", ex);
      return Response.status(Response.Status.BAD_REQUEST).build();
  }
  }COPY
  ```

- Qurakus

  ```java
  @ControllerAdvice
  public class GlobalExceptionHandlers {
  //...
  @ExceptionHandler(Exception.class)
  public ResponseEntity<Void> handleException(Exception ex) {
      logger.error("Uncaught exception", ex);
      return ResponseEntity.badRequest().build();
  }
  }COPY
  ```

### 案例演示

#### SpringBoot工程

- 打包`mvn install`
  ![img](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202408151011711)
- 打包后产物
  <img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202408151011118" alt="img" style="zoom:60%;" />
- 启动运行`java -jar -Dserver.port=3050 target/wakatime-sync.jar
  ![img](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202408151011218)

#### Quarkus工程

- 打包 `mvn package -Dnative`
  ![img](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202408151011344)
- 打包后产物
  <img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202408151011052" alt="img" style="zoom:60%;" />
- 启动`./target/wakatime-sync-1.0-runner`
  ![img](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202408151012829)

### Quarkus的局限性和缺点

- 动态类加载
- 反射
- 动态代理
- JNI
- Java 安全管理器
- 编译原生镜像耗时且占用资源较多
- 生成的镜像没法做到**一处编译，处处运行**
- 虽然社区活跃，支持的插件已有100多个，但相比Spring生态来说还是远远不够，需要插件都需要自己开发

## 参考阅读

1. [GraalVM指南](https://www.graalvm.org/22.1/guides/)
2. [Quarkus指南](https://cn.quarkus.io/guides/)
3. [Quarkus插件社区](https://github.com/quarkiverse)
4. [Quarkus实战教程](https://quarkus.io/quarkus-workshops/super-heroes/)
5. [原生镜像兼容性和优化指南](https://www.graalvm.org/22.1/reference-manual/native-image/Limitations/)