---
title: My Java Guide - 缓存
date: 2024-10-15 00:23:00
updated: 2024-10-15 00:23:00
categories: 
- 学习
tags: 
- Java
- 缓存
keywords:
- Java
- 缓存
description: Java, all in one！
cover: https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202502121552630.png
top_img: https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202502121546411.png
---

> 友情链接：[缓存预热和大流量冲击的应对策略](#huancunyure)

# <div align="center">-----------------缓存总述-----------------</div>

缓存是一种用于提高数据访问速度和系统性能的技术。通过将频繁访问的数据存储在内存或其他快速访问介质中，缓存可以显著减少数据访问的延迟和减轻后端系统的负载。

# 常见的缓存类型

## 内存缓存

- **Redis**：一个高性能的键值存储系统，支持多种数据结构（如字符串、哈希、列表、集合等），广泛用于缓存和会话管理。
- **Memcached**：一个高性能的分布式内存对象缓存系统，主要用于加速动态Web应用程序。

## 文件缓存

- **本地文件系统**：将数据缓存到本地文件系统中，适用于静态内容的缓存。
- **分布式文件系统**：如 HDFS（Hadoop Distributed File System），用于大规模数据存储和缓存。

## 数据库缓存

- **查询缓存**：数据库系统内部的缓存机制，用于缓存查询结果，减少对磁盘的访问。
- **结果集缓存**：将查询结果缓存到内存中，减少对数据库的访问次数。

## 应用程序缓存

- **本地缓存**：应用程序内部的缓存，通常使用 HashMap 或其他数据结构实现。
- **分布式缓存**：使用分布式缓存系统（如 Redis、Memcached）在多个应用程序实例之间共享缓存数据。

# 更新策略

- **写穿策略**：每次写操作都同时更新缓存和后端数据源。
- **读穿策略**：每次读操作都先检查缓存，如果未命中则从后端数据源获取数据并更新缓存。
- **写回策略**：写操作只更新缓存，定期或在某些条件下将缓存中的数据同步到后端数据源。
- **刷新策略**：定期或在某些条件下清空缓存，强制从后端数据源重新加载数据。

# 失效策略

- **时间失效**：设置缓存数据的有效时间，超过时间后自动失效。
- **容量失效**：当缓存达到最大容量时，使用 LRU（最近最少使用）、LFU（最不经常使用）等算法移除一些数据。
- **显式失效**：应用程序显式地从缓存中移除数据，通常在数据更新时使用。

# 应用场景

1. **网页缓存**：缓存静态内容（如 HTML、CSS、JavaScript 文件），减少服务器负载，提高页面加载速度。
2. **数据库查询缓存**：缓存数据库查询结果，减少对数据库的访问次数，提高查询性能。
3. **API 响应缓存**：缓存 API 响应，减少后端服务的调用次数，提高 API 响应速度。
4. **会话缓存**：缓存用户会话信息，提高用户会话管理的性能。
5. **全文搜索缓存**：缓存搜索结果，提高搜索性能。

# 最佳实践

1. **合理设置缓存时间**：根据数据的更新频率和重要性，合理设置缓存的有效时间。
2. **使用缓存预热**：在系统启动或高峰期前，预先加载常用数据到缓存中。
3. **缓存降级**：在缓存失效或不可用时，提供合理的降级策略，确保系统仍能正常运行。
4. **监控和告警**：监控缓存系统的状态，设置告警机制，及时发现和处理问题。
5. **数据一致性管理**：使用合理的缓存更新和失效策略，确保缓存数据和后端数据源的一致性。

# 优点、缺点

1. **提高性能**：通过减少对后端系统的访问次数，提高数据访问速度和系统性能。
2. **减轻负载**：减少后端系统的负载，提高系统的可用性和稳定性。
3. **提高用户体验**：加快数据访问速度，提升用户的使用体验。
4. **节省资源**：减少对计算和网络资源的消耗，降低运营成本。
5. **数据一致性问题**：缓存数据和后端数据源之间的数据一致性难以保证，可能导致数据不一致的问题。
6. **复杂性增加**：引入缓存机制会增加系统的复杂性，需要管理和维护缓存系统。
7. **内存占用**：缓存数据占用内存，如果管理不当可能导致内存溢出等问题。
8. **缓存击穿**：大量请求同时访问同一个缓存数据，导致缓存失效后的瞬间大量请求涌入后端系统，造成后端系统压力过大。

# <div align="center">--------------多级缓存架构--------------</div>

**缓存是提升性能最直接的方法 多级缓存分为：客户端，应用层，服务层，数据层**

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202409291343412.png" alt="image-20240929134351240" style="zoom:80%;" />

# 客户端缓存

**客户端缓存**：主要对浏览器的静态资源进行缓存 通过在浏览器设置Expires，时间段内以文件形式把图片保存在本地，减少多次请求静态资源带来的带宽损耗（解决并发手段） 。

例如：百度的logo，可以给logo设置一个过期时间，第一次请求时缓存logo图片和过期时间，之后每次请求时都查看过期时间，如果还没过期就从磁盘读取。

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202409291346791.png" alt="image-20240929134627949" style="zoom: 55%;" />

# 应用层缓存

## CDN（重量级）

CDN内容分发网络是静态资源分发的主要技术手段，有效解决带宽集中占用以及数据分发问。

CDN是一项基础设施，一般由云服务厂商提供。

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202409291353093.png" alt="image-20240929134936325" style="zoom: 40%;" />

**CDN的核心技术**： 根据请求访问DNS节点， 自动转发到就近CDN节点，检查资源是否被缓存，若已缓存则返回资源否则回源数据节点提取，并缓存到就近CDN节点，再由就近CDN节点进行返回。

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202409291354963.png" style="zoom:40%;" />

**CDN的使用**（aliyun）：

响应头Expires和Cache-control的区别： 

1. 均为通知浏览器进行文件缓存
2. `Expires` 指在缓存的过期时间
3. `Cache-control` 指缓存的有效期

响应头的设置：`Expires` 设置时间，`Cache-Control` 设置时长。

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202409291359167.png" alt="image-20240929135902050" style="zoom:40%;" />

## Nginx（轻量级）

Nginx对Tomcat集群做软负载均衡，提供高可用性。有静态资源缓存和压缩功能（在本地缓存文件）

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202409291408454.png" alt="image-20240929140735084" style="zoom: 40%;" />

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202409291410414.png" alt="image-20240929140909820" style="zoom:50%;" />

# 服务层缓存

服务层缓存：进程内缓存和进程外缓存

- 进程内缓存：在应用程序的内存中，数据运行时载入程序开辟的缓存，存储在应用程序进程内部，访问速度非常快，因为它不需要通过网络或其他进程间通信机制来访问数据。
  - 开源实现：**HashMap、EhCache、Caffeine、Hibernate一二级缓存、Mybatis一二级缓存，SpringMVC页面缓存**
- 进程外缓存：独立于应用程序运行，存储在应用程序进程之外的缓存系统，具备更好的持久性、更高的并发性和更好的伸缩性。进程外缓存可以跨越多个服务器，提供分布式的服务，从而支持更大规模的应用程序。
  - 开源实现：**Redis、Memcached、Ignite、Hazelcast、Voldemort**

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202409291412233.png" alt="image-20240929141145143" style="zoom:50%;" />

# 数据层缓存

第一种情况，缓存的数据是稳定的。例如：邮政编码、地域区块、归档数据……

第二种情况，瞬时可能会产生极高并发的场景。例如：股市开盘、商品秒杀……

第三种情况，一定程度上允许数据不一致。例如：网站公告……

*一种数据同步方案：*

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202409291543934.png" alt="image-20240929154329762" style="zoom:40%;" />

# <div align="center">---------------进程外缓存---------------</div>

> 只适合单体项目，遇到分布式，一碰就碎！纯FW！

# SpringCache

Spring Cache 是 Spring 框架提供的一个抽象层，用于简化缓存的使用。它提供了一种声明式的方式，在方法调用时自动管理缓存。

特点：

- **声明式缓存**：通过注解（如 `@Cacheable`、`@CachePut`、`@CacheEvict`）来管理缓存，无需手动编写缓存逻辑。
- **多种缓存提供商支持**：支持多种缓存提供商，如 Redis、Caffeine、EhCache 等。
- **灵活的缓存策略**：可以通过配置文件或注解来定义缓存策略，如缓存键生成、缓存失效等。

# Caffeine

Caffeine 专注于本地缓存，继承了 Google Guava 缓存的优点，并进行了优化，提供了更好的性能和灵活性。

特点：

- **高性能**：使用高效的并发数据结构和算法，提供极高的吞吐量和低延迟。
- **自动内存管理**：支持自动清除未使用的缓存项，避免内存泄漏。
- **丰富的缓存策略**：支持多种缓存策略，如 LRU（最近最少使用）、LFU（最不经常使用）、TTL（生存时间）等。

# EhCache

EhCache 支持本地缓存和分布式缓存，广泛应用于各种企业级应用中，提供高性能的缓存解决方案。

特点：

- **本地缓存**：支持内存和磁盘存储，可以灵活配置缓存策略。
- **分布式缓存**：支持多种分布式缓存模式，如 RMI、JGroups、Terracotta 等。
- **丰富的配置选项**：提供详细的配置选项，如缓存大小、缓存过期时间、缓存策略等。
- **集成广泛**：可以与多种框架和工具集成，如 Spring、Hibernate、MyBatis 等。

# 对比

|   特性/功能    |          Caffeine           |             EhCache             |
| :------------: | :-------------------------: | :-----------------------------: |
|    **类型**    |          本地缓存           |      本地缓存 + 分布式缓存      |
| **缓存提供商** |          本地缓存           |      本地缓存 + 分布式缓存      |
|    **性能**    |           高性能            |             高性能              |
|  **配置方式**  |       代码 + 配置文件       |            配置文件             |
|  **缓存策略**  | 多种策略（LRU、LFU、TTL等） |   多种策略（LRU、LFU、TTL等）   |
|    **集成**    |     易于与 Spring 集成      | 广泛集成（Spring、Hibernate等） |
| **分布式支持** |      不支持分布式缓存       |     支持多种分布式缓存模式      |
|  **内存管理**  |        自动内存管理         |        手动配置内存管理         |

# 总结

- **Caffeine**：高性能的本地缓存库，适合对性能要求较高的场景，特别是单机应用。
- **EhCache**：支持本地缓存和分布式缓存，适合需要分布式缓存支持的企业级应用。

# <div align="center">---------------进程内缓存---------------</div>

# 缓存的使用场景

缓存：穿透、击穿、雪崩、双写一致、持久化、数据过期策略，数据淘汰策略
分布式锁：setnx、redisson
消息队列、延迟队列

# 常见数据类型的应用场景

- **String** 类型的应用场景：缓存对象、常规计数、分布式锁、共享 session 信息等。
- **List** 类型的应用场景：消息队列（但是有两个问题：1. 生产者需要自行实现全局唯一 ID；2. 不能以消费组形式消费数据）等。
- **Hash** 类型：缓存对象、购物车等。
- **Set** 类型：聚合计算（并集、交集、差集）场景，比如点赞、共同关注、抽奖活动等。
- **Zset** 类型：排序场景，比如排行榜、电话和姓名排序等。

*Redis 后续版本又支持四种数据类型，它们的应用场景如下：*

- BitMap（2.2 版新增）：二值状态统计的场景，比如签到、判断用户登陆状态、连续签到用户总数等；
- HyperLogLog（2.8 版新增）：海量数据基数统计的场景，比如百万级网页 UV 计数等；
- GEO（3.2 版新增）：存储地理位置信息的场景，比如滴滴叫车；
- Stream（5.0 版新增）：消息队列，相比于基于 List 类型实现的消息队列，有这两个特有的特性：自动生成全局唯一消息ID，支持以消费组形式消费数据。

# Redis 的I/O多路复用模型

简单来说有以下几个原因：

1. 完全基于内存的，C语言编写
2. 采用单线程，避免不必要的上下文切换可竞争条件
3. 使用多路I/O复用模型，非阻塞IO

> 例如：bgsave 和 bgrewriteaof  都是在**后台**执行操作，不影响主线程的正常使用，不会产生阻塞

详细的说有以下几个原因

- Redis 的大部分操作**都在内存中完成**，并且采用了高效的数据结构，因此 Redis 瓶颈可能是机器的内存或者网络带宽，而并非 CPU，既然 CPU 不是瓶颈，那么自然就采用单线程的解决方案了；
- Redis 采用单线程模型可以**避免了多线程之间的竞争**，省去了多线程切换带来的时间和性能上的开销，而且也不会导致死锁问题。
- Redis 采用了**I/O 多路复用机制**处理大量的客户端 Socket 请求，IO 多路复用机制是指一个线程处理多个 IO 流，就是我们经常听到的 select/epoll 机制。简单来说，在 Redis 只运行单线程的情况下，该机制允许内核中，同时存在多个监听 Socket 和已连接 Socket。内核会一直监听这些 Socket 上的连接请求或数据请求。一旦有请求到达，就会交给 Redis 线程处理，这就实现了一个 Redis 线程处理多个 IO 流的效果。

**I/O多路复用**是指利用单个线程来同时监听多个Socket ，并在某个Socket可读、可写时得到通知，从而避免无效的等待，充分利用CPU资源。目前的I/O多路复用都是采用的epoll模式实现，它会在通知用户进程Socket就绪的同时，把已就绪的Socket写入用户空间，不需要挨个遍历Socket来判断是否就绪，提升了性能。

**I/O多路复用模型**是Redis的网络模型，它结合事件的处理器来应对多个Socket请求，比如，提供了连接应答处理器、命令回复处理器，命令请求处理器；

在Redis6.0之后，为了提升更好的性能，在命令回复处理器使用了多线程来处理回复事件，在命令请求处理器中，将命令的转换使用了多线程，增加命令转换速度，在命令执行的时候，依然是单线程

# Redis 的两种数据持久化

- RDB（Redis Database Backup file：Redis数据备份文件）

  RDB：是一个二进制的快照文件，它是把Redis内存存储的数据写到磁盘上，当Redis实例宕机恢复数据的时候，方便从RDB的快照文件中恢复数据

  开启RDB：在redis.conf文件中找到，格式如下：

  ```yaml
  save 900 1     # 900秒内，如果至少有1个key被修改，则执行bgsave 
  save 300 10    # 原理同上
  save 60 10000  # 原理同上
  ```

  RDB执行原理：bgsave开始时会fork主进程得到子进程，子进程共享主进程的内存数据。完成fork后读取内存数据并写入 RDB 文件。

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202404072145797.png" alt="image-20240407214533706" style="zoom:50%;" />



- AOF（Append Only File：追加文件）

  AOF：Redis处理的每一个写命令都会记录在AOF文件，可以看做是命令日志文件

  开启AOF：

  ```yaml
  # 是否开启AOF功能，默认是no
  appendonly yes
  # AOF文件的名称
  appendfilename "appendonly.aof"
  ```

  修改AOF的记录频率：

  ```yaml
  # 表示每执行一次写命令，立即记录到AOF文件
  appendfsync always 
  # 写命令执行完先放入AOF缓冲区，然后表示每隔1秒将缓冲区数据写到AOF文件，是默认方案
  appendfsync everysec 
  # 写命令执行完先放入AOF缓冲区，由操作系统决定何时将缓冲区内容写回磁盘
  appendfsync no
  ```

  | **配置项** | **刷盘时机** | **优点**               | **缺点**                     |
  | ---------- | ------------ | ---------------------- | ---------------------------- |
  | always     | 同步刷盘     | 可靠性高，几乎不丢数据 | 性能影响大                   |
  | everysec   | 每秒刷盘     | 性能适中               | 最多丢失1秒数据              |
  | no         | 操作系统控制 | 性能最好               | 可靠性较差，可能丢失大量数据 |

  修改AOF的自动去重写阈值：

  ```yaml
  # 表示每执行一次写命令，立即记录到AOF文件
  appendfsync always 
  # 写命令执行完先放入AOF缓冲区，然后表示每隔1秒将缓冲区数据写到AOF文件，是默认方案
  appendfsync everysec 
  # 写命令执行完先放入AOF缓冲区，由操作系统决定何时将缓冲区内容写回磁盘
  appendfsync no
  ```

- RDB与AOF对比：

  | ** **          | **RDB**                                      | **AOF**                                                |
  | -------------- | -------------------------------------------- | ------------------------------------------------------ |
  | 持久化方式     | 定时对整个内存做快照                         | 记录每一次执行的命令                                   |
  | 数据完整性     | 不完整，两次备份之间会丢失                   | 相对完整，取决于刷盘策略                               |
  | 文件大小       | 会有压缩，文件体积小                         | 记录命令，文件体积很大                                 |
  | 宕机恢复速度   | 很快                                         | 慢                                                     |
  | 数据恢复优先级 | 低，因为数据完整性不如AOF                    | 高，因为数据完整性更高                                 |
  | 系统资源占用   | 高，大量CPU和内存消耗                        | 低，主要是磁盘IO资源但AOF重写时会占用大量CPU和内存资源 |
  | 使用场景       | 可以容忍数分钟的数据丢失，追求更快的启动速度 | 对数据安全性要求较高常见                               |

# Redis 的 Pipeline 功能是什么？ 

pipeline（管道）使得客户端可以一次性将要执行的多条命令封装成块一起发送给服务端

**优点**：

1. **减少网络往返次数**：
   - Pipeline 可以将多次网络往返减少为一次，显著提高了执行效率。
2. **提高吞吐量**：
   - 对于批量操作，使用 Pipeline 可以显著提高吞吐量，尤其是在高延迟网络环境中。
3. **简化代码逻辑**：
   - 对于批量操作，使用 Pipeline 可以简化客户端代码，避免频繁地打开和关闭连接。

# 缓存的常见问题

## 缓存穿透

**缓存穿透**：查询一个不存在的数据，mysql查询不到数据也不会直接写入缓存，就会导致每次请求都查数据库

**解决方案**：

- 缓存空数据，查询返回的数据为空，仍把这个空结果进行缓存（简单，但是消耗内存，且可能会发生不一致的问题）
- 布隆过滤器（内存占用较少，没有多余key，但是实现复杂，存在误判）

**布隆过滤器**原理：布隆过滤器是一个以（bit）位为单位的很长的数组，数组中每个单元只能存储二进制数0或1。当一个key来了之后经过3次hash计算，模于数组长度找到数据的下标然后把数组中原来的0改为1，这样一来，三个数组的位置就能标明一个key的存在。

**布隆过滤器在项目中的使用流程**：

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202408261457059.png" alt="image-20240826145725870" style="zoom: 40%;" />

如果数据被删除了怎么办？1). 定时异步重建布隆过滤器；2). 换用“计数型布隆过滤器”

## 缓存击穿

**缓存击穿**：key过期后，这个key有大量的并发请求过来，这些并发的请求可能会瞬间把DB压垮

**解决方案**：

- 互斥锁（强一致性，但是性能差）
- 逻辑过期（高可用性、性能优，但是有一致性问题）

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202404072123362.png" alt="image-20240407212348197" style="zoom: 50%;" />

## 缓存雪崩

**缓存雪崩**：在同一时段，大量的缓存key同时效，或者Redis服务宕机，导致大量请求到达数据库，带来巨大压力。

**解决方案**：

- 给不同的Key的TTL添加随机值
- 利用Redis集群提高服务的可用性（哨兵模式、集群模式）
- 给缓存业务添加降级限流策略（ngxin或spring cloud gateway）
- 给业务添加多级缓存（Guava或Caffeine）

## 大Key问题

> 什么是 大 key？

- String 类型的值大于 10 KB；
- Hash、List、Set、ZSet 类型的元素的个数超过 5000个；

> 大 key 带来的问题

- **客户端超时阻塞**。由于 Redis 执行命令是单线程处理，然后在操作大 key 时会比较耗时，那么就会阻塞 Redis，从客户端这一视角看，就是很久很久都没有响应。
- **引发网络阻塞**。每次获取大 key 产生的网络流量较大，如果一个 key 的大小是 1 MB，每秒访问量为 1000，那么每秒会产生 1000MB 的流量，这对于普通千兆网卡的服务器来说是灾难性的。
- **阻塞工作线程**。如果使用 del 删除大 key 时，会阻塞工作线程，这样就没办法处理后续的命令。
- **内存分布不均**。集群模型在 slot 分片均匀情况下，会出现数据和查询倾斜情况，部分有大 key 的 Redis 节点占用内存多，QPS 也会比较大。

> *如何找到大 key ？*

***1、--bigkeys 查找大key***

可以通过 redis-cli --bigkeys 命令查找大 key：

```shell
redis-cli -h 127.0.0.1 -p 6379
--bigkeys
```

使用的时候注意事项：

- 最好选择在从节点上执行该命令。因为主节点上执行时，会阻塞主节点；
- 如果没有从节点，那么可以选择在 Redis 实例业务压力的低峰阶段进行扫描查询，以免影响到实例的正常运行；或者可以使用 -i 参数控制扫描间隔，避免长时间扫描降低 Redis 实例的性能。

该方式的不足之处：

- 这个方法只能返回每种类型中最大的那个 bigkey，无法得到大小排在前 N 位的 bigkey；
- 对于集合类型来说，这个方法只统计集合元素个数的多少，而不是实际占用的内存量。但是，一个集合中的元素个数多，并不一定占用的内存就多。因为，有可能每个元素占用的内存很小，这样的话，即使元素个数有很多，总内存开销也不大；

***2、使用 SCAN 命令查找大 key***

使用 SCAN 命令对数据库扫描，然后用 TYPE 命令获取返回的每一个 key 的类型。

对于 String 类型，可以直接使用 STRLEN 命令获取字符串的长度，也就是占用的内存空间字节数。

对于集合类型来说，有两种方法可以获得它占用的内存大小：

- 如果能够预先从业务层知道集合元素的平均大小，那么，可以使用下面的命令获取集合元素的个数，然后乘以集合元素的平均大小，这样就能获得集合占用的内存大小了。List 类型：`LLEN` 命令；Hash 类型：`HLEN` 命令；Set 类型：`SCARD` 命令；Sorted Set 类型：`ZCARD` 命令；
- 如果不能提前知道写入集合的元素大小，可以使用 `MEMORY USAGE` 命令（需要 Redis 4.0 及以上版本），查询一个键值对占用的内存空间。

***3、使用 RdbTools 工具查找大 key***

使用 RdbTools 第三方开源工具，可以用来解析 Redis 快照（RDB）文件，找到其中的大 key。

比如，下面这条命令，将大于 10 kb 的  key  输出到一个表格文件。

```shell
rdb dump.rdb -c memory --bytes 10240 -f redis.csv
```

# 数据一致性问题

## 先删除缓存，还是先修改数据库？

- **先修改数据库，再删除缓存**

  > 1. **原子性**：数据库操作通常是原子的，这意味着它可以作为一个单一的工作单元执行，要么完全成功，要么完全失败。因此，先修改数据库可以确保数据的一致性。
  > 2. **降低脏读的风险**：如果在修改数据库之前删除了缓存，那么在缓存被重新填充之前，其他请求可能会读取到旧的（或脏）数据。
  > 3. **简化逻辑**：通常，在修改数据库后，删除缓存是一个简单的操作，因为缓存中的条目可以通过其键来直接定位。

- **先删除缓存，再修改数据库，再删除一遍缓存**

  > 1. **降低延迟**：在某些场景中，先删除缓存可以减少缓存与数据库之间的数据不一致时间，因为一旦缓存被删除，后续请求将直接从数据库读取数据。
  > 2. **避免并发问题**（一致性）：在某些高并发的场景下，如果先修改数据库再删除缓存，可能会出现一个请求A修改数据库但还未删除缓存，此时另一个请求B读取到旧的缓存数据并基于旧数据进行了某些操作，然后请求A删除了缓存，此时如果请求B的数据操作依赖于最新的数据库数据，就可能出现问题。

## 数据一致性的组件、设计

**组件**：

- 使用**Canal**实现数据同步：不更改业务代码，部署一个Canal服务。Canal服务把自己伪装成MySQL的一个从节点，当MySQL数据更新以后，Canal会读取bin log数据，然后在通过Canal的客户端获取到数据，更新缓存即可。
- 采用**Redisson**实现读写锁，在读的时候添加**共享锁**，可以保证共享读操作，互斥读写操作。当更新数据的时候，添加**排他锁**，互斥读写和读操作，确保在写数据的避免读脏数据。

**设计**：

1. **同步双写**：实时性较好，实现简单，但是需要改造大量程序。

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202408261246461.png" alt="image-20240826124656414" style="zoom:40%;" />

2. **基于MQ异步多写**：适合分布式场景，耦合低，延迟取决于MQ的消费速度。

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202408261248812.png" alt="image-20240826124848734" style="zoom:40%;" />

3. **定时任务**：效率最高，但是延迟最高。需要业务表中设计一个last-update字段。

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202408261250432.png" alt="image-20240826125021381" style="zoom:40%;" />

4. **闪电缓存**：实现最简单，不需要对缓存进行管理，但会加大数据库的压力。

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202410121238743.png" alt="image-20240826125357267" style="zoom:40%;" />

5. **binlog监听**：让Flink-CDC伪装成slave，通过监听数据库二进制日志（Binlog）来实现对缓存的同步更新。

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202408261246944.png" alt="image-20240826124629849" style="zoom:40%;" />

## 缓存和数据库一致性最佳实践

视频：[缓存和数据库一致性问题到底该如何解决](https://www.bilibili.com/video/BV1EyXQYJEF5?spm_id_from=333.1245.0.0)

答案很明显：**先更新数据库，再删除缓存**

这套方案如果要导致数据不一致，说实话有点难，需要满足如下条件：

1. 缓存中的数据刚好过期了
2. “修改数据库”比“读取数据库”快

首先缓存中的数据刚好过期了，这时有请求过来读取数据，满足这一点并不难。但是第二点酒很难满足了，因为“修改数据库”是要加锁的，它的耗时远比“读取数据库”长，所以这一点基本不太可能发生，也就是说在数据库修改完前，读的操作早就已经完成了，因此也就不存在数据不一致的问题了。

但是假如说真的发生了呢？即修改数据库的耗时真的更好比读取数据库快了呢？此时就发生数据不一致的问题了。

解决的办法就是延时双删，就是在删除缓存一段时间后再删除一次缓存，确保缓存中没有脏数据，这个时间依修改数据库和读取数据库的时差而决定，可以选择1s，实现的方式可以通过canal+mq的方式执行延时任务。

![image-20250531223640284](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202505312236358.png)

# 数据删除策略

- **惰性删除**，在设置该key过期时间后，我们不去管它，当需要该key时，我们在检查其是否过期，如果过期，我们就删掉它，反之返回该key。

- **定期删除**，就是说每隔一段时间，我们就对一些key进行检查，删除里面过期的key。

  定期清理的两种模式：

  - SLOW模式是定时任务，执行频率默认为10hz，每次不超过25ms，以通过修改配置文件redis.conf 的 **hz** 选项来调整这个次数。
  - FAST模式执行频率不固定，每次事件循环会尝试执行，但两次间隔不低于2ms，每次耗时不超过1ms。

# 数据淘汰策略

- noeviction(默认)： 不淘汰任何key，但是内存满时不允许写入新数据。
- volatile-ttl： 对设置了TTL的key，比较key的剩余TTL值，TTL越小越先被淘汰。
- allkeys-random：对全体key ，随机进行淘汰。
- volatile-random：对设置了TTL的key ，随机进行淘汰。
- **allkeys-lru**： 对全体key，基于LRU算法进行淘汰
- **volatile-lru**： 对设置了TTL的key，基于LRU算法进行淘汰
- allkeys-lfu： 对全体key，基于LFU算法进行淘汰
- volatile-lfu： 对设置了TTL的key，基于LFU算法进行淘汰

LRU(Least Recently Used)：最少最近使用，用当前时间减去最后一次访问时间，这个值越大则淘汰优先级越高。

LFU(Least Frequently Used)：最少频率使用。会统计每个key的访问频率，值越小淘汰优先级越高

**数据淘汰策略-使用建议：**

1. 优先使用 **allkeys-lru** 策略。充分利用 LRU 算法的优势，把最近最常访问的数据留在缓存中。如果业务有明显的冷热数据区分，建议使用。
2. 如果业务中数据访问频率差别不大，没有明显冷热数据区分，建议使用 **allkeys-random** ，随机选择淘汰。
3. 如果业务中有置顶的需求，可以使用 **volatile-lru** 策略，同时置顶数据不设置过期时间，这些数据就一直不被删除，会淘汰其他设置过期时间的数据。
4. 如果业务中有短时高频访问的数据，可以使用 **allkeys-lfu** 或 **volatile-lfu** 策略。

**保证热点数据**可以使用 **allkeys-lru** （挑选最近最少使用的数据淘汰）淘汰策略，那留下来的都是经常访问的热点数据

# 缓存更新策略

- Cache Aside（旁路缓存）策略；
- Read/Write Through（读穿 / 写穿）策略；
- Write Back（写回）策略
- Refresh (刷新) 策略：定期或在某些条件下清空缓存，强制从后端数据源重新加载数据。比如用户状态管理等。

实际开发中，最常用的策略是 **Cache Aside**。

## Cache Aside（旁路缓存）策略

Cache Aside（旁路缓存）策略是最常用的，应用程序直接与「数据库、缓存」交互，并负责对缓存的维护，该策略又可以细分为「读策略」和「写策略」。

<img src="https://cdn.xiaolincoding.com//mysql/other/6e3db3ba2f829ddc14237f5c7c00e7ce-20230309232338149.png" alt="img" style="zoom:75%;" />

## Read/Write Through（读穿 / 写穿）策略

Read/Write Through（读穿 / 写穿）策略原则是应用程序只和缓存交互，不再和数据库交互，而是由缓存和数据库交互，相当于更新数据库的操作由缓存自己代理了。

**1、Read Through 策略**

先查询缓存中数据是否存在，如果存在则直接返回，如果不存在，则由缓存组件负责从数据库查询数据，并将结果写入到缓存组件，最后缓存组件将数据返回给应用。

**2、Write Through 策略**

当有数据更新的时候，先查询要写入的数据在缓存中是否已经存在：

- 如果缓存中数据已经存在，则更新缓存中的数据，并且由缓存组件同步更新到数据库中，然后缓存组件告知应用程序更新完成。
- 如果缓存中数据不存在，直接更新数据库，然后返回；

下面是 Read Through/Write Through 策略的示意图：

<img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/redis/%E5%85%AB%E8%82%A1%E6%96%87/WriteThrough.jpg" alt="img" style="zoom: 50%;" />

Read Through/Write Through 策略的特点是由缓存节点而非应用程序来和数据库打交道，在我们开发过程中相比 Cache Aside 策略要少见一些，原因是我们经常使用的分布式缓存组件，无论是 Memcached 还是 Redis 都不提供写入数据库和自动加载数据库中的数据的功能。而我们在使用本地缓存的时候可以考虑使用这种策略。

## Write Back（写回）策略

Write Back（写回）策略在更新数据的时候，只更新缓存，同时将缓存数据设置为脏的，然后立马返回，并不会更新数据库。对于数据库的更新，会通过批量异步更新的方式进行。

实际上，Write Back（写回）策略也不能应用到我们常用的数据库和缓存的场景中，因为 Redis 并没有异步更新数据库的功能。

Write Back 是计算机体系结构中的设计，比如 CPU 的缓存、操作系统中文件系统的缓存都采用了 Write Back（写回）策略。

**Write Back 策略特别适合写多的场景**，因为发生写操作的时候， 只需要更新缓存，就立马返回了。比如，写文件的时候，实际上是写入到文件系统的缓存就返回了，并不会写磁盘。

**但是带来的问题是，数据不是强一致性的，而且会有数据丢失的风险**，因为缓存一般使用内存，而内存是非持久化的，所以一旦缓存机器掉电，就会造成原本缓存中的脏数据丢失。所以你会发现系统在掉电之后，之前写入的文件会有部分丢失，就是因为 Page Cache 还没有来得及刷盘造成的。

这里贴一张 CPU 缓存与内存使用 Write Back 策略的流程图：

<img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/redis/%E5%85%AB%E8%82%A1%E6%96%87/writeback.png" alt="img" style="zoom: 80%;" />

# <a name="huancunyure">缓存预热和大流量冲击的应对策略</a>{#huancunyure}

大家都知道二八定律，也就是帕累托原则，它告诉我们80%的效果往往来自20%的原因。在互联网应用中，这也意味着80%的
流量通常集中在20%的API上。对于刚启动或长时间未使用的应用系统来说，这种突然的大流量冲击可能会带来以下几个问题：

1. **缓存未命中**：刚开始时，缓存里啥都没有，所有请求都要去后端数据库找数据，这就增加了系统的响应时间。
2. **连接池耗尽**：短时间内大量请求可能导致连接池里的可用连接迅速用完，新的请求无法建立连接，从而引发错误。
3. **资源竞争**：多个请求同时争夺有限的系统资源，可能导致资源争用和死锁问题。

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411202147982.png" alt="image-20241120214726931" style="zoom: 60%;" />

## 1. 收集日志分析热点API与热点数据

要进行API预热，首先得知道哪些API是热点API，哪些数据是热点数据。这一步可以通过收集和分析系统日志来实现。常用的日志收集和分析工具有Prometheus和ELK（Elasticsearch, Logstash, Kibana）。

**Prometheus :**

1. **安装与配置**：在应用服务器上安装Prometheus，并配置监控目标，收集APl请求的响应时间、请求频率等指标。
2. **数据采集**：Prometheus会定期从应用服务器上抓取指标数据，并存储在本地数据库中。
3. **数据分析**：通过Prometheus的图形界面或查询语言PromQL，可以分析出哪些APl的请求频率最高，响应时间最长，从而确定热点API。

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411202149439.png" alt="image-20241120214917213" style="zoom:40%;" />

**ELK：**通过日志的方式实现数据的离线分析（日志分析**Prometheus**其实也可以做，因为上面已经拿到了请求的API了 ）

1. **安装与配置**：安装Elasticsearch、Logstash和Kibana，配置Logstash从应用服务器上收集日志文件。
2. **日志解析**：使用Logstash的过滤器解析日志文件，提取出APl请求的相关信息，如请求路径、响应时间等。
3. **数据分析**：将解析后的日志数据存储在Elasticsearch中，通过Kibana的可视化工具进行分析，找出热点APl和热点数据。

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411202154791.png" alt="image-20241120215448640" style="zoom:45%;" />

## 2. 将连接池的可用连接拉升到较高的水平线

除了缓存预热外，还需要将连接池的可用连接拉升到较高的水平线，以应对突发大流量。

**配置连接池参数：**

1. **初始连接数**：设置连接池的初始连接数，确保在应用启动时就有一定数量的连接可用。**最佳实践：初始连接数=最大连接数**
2. **最大连接数**：根据系统的最大负载能力，设置连接池的最大连接数。
3. **连接超时时间**：设置合理的连接超时时间，避免连接长时间占用导致资源浪费。

## 3. 初始化调度方式发送模拟API热点数据的访问请求

确定了热点API和热点数据后，下一步就是在应用启动后通过初始化调度方式发送模拟API热点数据的访问请求，达到本地缓存与Redis分布式缓存预热的目的。

**本地缓存预热：**

1. **缓存初始化**：在应用启动时，通过初始化代码将热点数据加载到本地缓存中。比如，可以使用GuavaCache或Caffeine等缓存库。
2. **缓存更新策略**：设置合理的缓存更新策略，如定时刷新或基于LRU（最近最少使用）算法自动淘汰旧数据。

**分布式缓存预热：**

1. **预热脚本**：编写预热脚本，通过HTTP客户端（如HttpClient或OkHttp）发送模拟请求，访问热点API。
2. **数据加载**：在模拟请求中，确保热点数据被加载到分布式缓存中。
3. **监控预热过程**：通过Prometheus或ELK监控预热过程中的各项指标，确保数据成功加载到缓存中。

## 4. API对外提供服务后的预热与限流

在API对外提供服务后，仍然需要通过WarmUp（预热）方式对API进行限流，做好进一步的接口预防工作。

**WarmUp策略：**

- 渐进式增加流量：在API对外提供服务的初期，通过限流策略逐渐增加流量，避免突然大量请求导致系统过载，AlibabaSentinel以内置此功能。

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411202210133.png" alt="image-20241120221055006" style="zoom:60%;" />

- 动态调整限流阈值：根据系统的实时负载情况，动态调整限流阈值。

## 5. 防止Redis被瞬时流量击垮的服务降级措施

为了防止Redis被瞬时流量击垮，还需要做好服务降级的措施，确保系统的稳定性和可靠性。

**服务降级策略：**

- **缓存穿透**：数据库被大量请求直接访问。可以使用布隆过滤器或缓存空对象的方式来防止缓存穿透。
- **缓存雪崩**：数据库被大量请求冲击。可以设置缓存的过期时间随机化，或者使用互备缓存机制。
- **降级方案**：当Redis服务停止响应时，尝试读取本地缓存。如果本地缓存中也没有数据，可以返回默认值或提示用户稍后再试。

**故障转移：**

- **集群模式**：使用集群模式，将数据分散到多个节点上，提高系统的扩展性和容错能力。

- **客户端负载均衡**：规避中心化设计

  <img alt="Redis去中心化设计" src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411202214975.png" style="zoom:50%;" />



# <div align="center">----------------分布式缓存----------------</div>

# 集群的意义

单节点Redis的并发能力是有上限的，要进一步提高Redis的并发能力，可以搭建主从集群，实现读写分离。

# 主从同步

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411141521341.png" alt="image.png" style="zoom:30%;" />

主从同步：一主多从，主节点负责写数据，从节点负责读数据，主节点写入数据之后，需要把数据同步到从节点中

## 全量同步

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411141521005.png" alt="image.png" style="zoom: 25%;" />

从节点**第一次**与主节点建立连接的时候会使用全量同步。

- 从节点携带自己的`replication id`和`offset值（偏移量）`
- 主节点判断与从节点之间是否是同一个`replication id`，如果不是就说明是第一次同步，主节点就会把自己的`replication id`和`offset`发送给从节点，同时主节点会执行`bgsave`，将生成的`rdb文件`发送给从节点同步。*如果在主节点的`rdb文件`生成期间进行主从同步，主节点会以命令的方式记录到**复制积压缓冲区（一个日志文件）**，主节点最后把这个日志文件发送给从节点，实现主从同步，后期再同步时都是依赖于这个日志文件。*
- 从节点收到`rdb文件`，把自己的数据清空，然后执行`rdb文件`，实现全量同步

## 增量同步

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411141522334.png" alt="img" style="zoom: 25%;" />

当从节点服务重启之后数据不一致，这时从节点会请求主节点同步数据，主节点判断不是第一次请求，就获取从节点的`offset值`，然后从日志中获取`offset值`之后的数据，发送给从节点进行数据同步。

# 哨兵模式

通过哨兵集群（通常是几个 Redis 实例）来监控多个 Redis 主从实例的运行状态，并在主实例发生故障时，自动完成故障转移。

**哨兵机制的主要功能包括：**

1. **监控（Monitoring）**：哨兵会定期检查主节点（Master）和从节点（Slave），以及其他哨兵的状态。每个哨兵节点会定时向所有的 Master、Slave 以及其他的 Sentinel 发送 PING 命令来检查它们的健康状况。此外，哨兵也可以监控任意给定的函数，并在条件满足时触发动作。

2. **故障转移（Failure Detection and Automatic Failover）**：当主节点失效时，哨兵能够自动将其中一个从节点升级为主节点，从而实现自动故障转移。这一过程涉及到哨兵之间的协商，确保只有一个哨兵进行实际的故障转移操作。哨兵之间使用 Raft 或类似的协议来达成一致，以防止脑裂（split-brain）情况的发生。

3. **通知（Notification）**：在故障转移之后，哨兵会通知客户端新的主节点的位置。此外，哨兵还可以通过订阅与发布（PUB/SUB）机制来发送其他通知信息。

4. **配置中心（Configuration Provider）**：哨兵充当了 Redis 集群的配置中心的角色。客户端可以通过哨兵获取当前集群的状态，包括主节点的位置等信息。

**哨兵机制的关键概念**

- **主观下线（Subjective Down）**：当一个哨兵认为一个主节点或从节点已经下线时，它会标记该节点为主观下线状态。
- **客观下线（Objective Down）**：当足够数量的哨兵（根据配置文件中的多数原则）同意一个节点已经下线时，该节点就会被标记为客观下线状态。此时，哨兵就可以开始故障转移的过程。

**哨兵的工作流程**

1. **哨兵检测**：每个哨兵节点独立地监控 Redis 主节点和从节点的健康状况。
2. **共识形成**：当多个哨兵确认主节点已经失效后，它们会通过共识算法（如 Raft）选出一个领导哨兵来进行故障转移。
3. **故障转移**：领导哨兵将从节点转换为主节点，并更新相关的从节点和客户端的配置信息。
4. **通知客户端**：哨兵通知客户端新的主节点的位置，使客户端可以继续正常工作。

**哨兵的选择策略**

1. 按硬件配置选择，配置越好，优先级越高
2. 按数据完整度选择，偏移量越大，优先级越高
3. 按默认的id选择，id越小，优先级越高

# 分片集群

**分片集群有什么作用？分片集群中数据是怎么存储和读取的？**

分片集群主要解决的是**海量数据存储**的问题，集群中有多个master，每个master保存不同数据，并且还可以给每个master设置多个slave节点，就可以继续增大集群的高并发能力。同时每个master之间通过ping监测彼此健康状态，类似于哨兵模式。客户端请求可以访问集群任意节点，最终都会被转发到正确节点、

Redis 集群引入了哈希槽的概念，有 16384 个哈希槽，集群中每个主节点绑定了一定范围的哈希槽范围， key通过 CRC16 校验后对 16384 取模来决定放置哪个槽，通过槽找到对应的节点进行存储。

# 脑裂

由于网络等原因可能会出现脑裂的情况，master节点与sentinel处于不同的网络分区，使得sentinel没有能够心跳感知到master，所以通过选举的方式提升了一个salve为master，这样就存在了两个master，就像大脑分裂了一样，这样会导致客户端还在old master那里写入数据，新节点无法同步数据，当网络恢复后，sentinel会将old master降为salve，这时再从新master同步数据，这会导致old master中的大量数据丢失。

**解决方案**：

1. 设置尽量少的salve节点个数，比如设置至少要有一个从节点才能同步数据
2. 设置主从同步的延迟超时时间，达不到要求就拒绝请求，就可以避免大量的数据丢失。

# 分布式锁

## 常见分布式锁

`互斥锁`、`排他锁`、`可重入锁`：锁的基本思想

`读写锁`：互斥锁的扩充

`同步锁`：本质就是互斥锁

`表锁`、`行锁`、`间隙锁`：数据库中的互斥锁

`共享锁`：数据库中的读写锁

`排他锁`：互斥锁的别名

`悲观锁`、`乐观锁`：一种抽象概念

`分布式锁`：分布式场景下的互斥锁

## 分布式锁有哪些应用场景？

有两种常见场景：

- 电商超卖

  <img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202404101314095.png" alt="image-20240410131415868" style="zoom: 30%;" />



- 假脱机打印问题

  <img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202404101315234.png" alt="image-20240410131506091" style="zoom: 30%;" />

## 分布式操作会发生什么问题？

**产生原因**：多个执行体操作同一份共享数据。

在并发场景中，在需要操作同一个共享数据时，如果当前的进程或线程对数据的操作还没有结束的话，另一个进程或线程也开始操作这个数据，这个时候就会发生无法预测的结果。解决这个问题的一种思路就是：我们可以控制执行体的时序，在当前的这个执行体对共享数据的操作完成前，不允许其他的执行体去操作这个共享数据。具体我们可以设置一个公共的标记，这个标记对每个执行体都可见，当这个标记不可见的时候，执行体可以重新设置这个标记，这个标记就是锁，对于解决**多线程**、**多进程**、**分布式服务**同时竞争共享资源所产生的一系列问题思想都是加锁。

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202404101325704.png" alt="image-20240410132556603" style="zoom:50%;" />

## 分布式锁的实现原理

1. 加锁：使用SETNX命令设置一个键值对，如果键不存在则设置成功并获得锁

   ```
   SET lock_key "lock_value" NX EX 30
   ```

2. 获取锁

   ```
   WATCH lock_key
   MULTI
   SET lock_key "lock_value" NX EX 30
   EXEC
   ```

3. 释放锁：删除该键值对

   ```
   EVAL "
   if redis.call('get', KEYS[1]) == ARGV[1] then
       return redis.call('del', KEYS[1])
   else
       return 0
   end
   " SHA 1 lock_key lock_value
   ```

> **实现细节**
>
> 1. **超时时间**：设置一个合理的超时时间很重要，过长会导致资源浪费，过短可能导致锁的丢失。
> 2. **重试机制**：如果获取锁失败，客户端应该实现一个重试机制，并且在重试之间加入适当的延时，以避免争用。
> 3. **公平性**：上述实现并没有保证锁的获取公平性。如果需要公平锁，可以考虑在获取锁时加入时间戳或其他机制。
> 4. 使用唯一标识符(如UUID)作为值，防止误删其他客户端的锁
> 5. *考虑Redis主从复制的延迟问题，使用Redlock算法*

## 分布式锁可能遇到的问题有哪些？

**锁超时**

1. 锁未能正确释放、锁长时间不被释放，合理设置锁的超时时间；
2. 锁频繁续期，合理设置锁的超时时间。

**锁重试**

1. 锁被争用，导致性能下降，可以适当延长重试间隔时间。
2. 锁因网络延迟等原因，无法及时获取或释放锁，可以在超时前多次尝试获取锁。

**锁验证**

1. 锁被争用，是不公平的，使用时间戳机制实现公平锁。
2. 锁被删除时验证锁的所有者，使用 Lua 脚本或UUID检查并删除锁。

## Redisson的看门狗机制

**作用**：避免死锁。

**实现原理**：当锁住的一个业务还没有执行完成的时候，Redisson每隔一段时间就检查当前业务是否还持有锁，如果持有就增加加锁的持有时间，当业务执行完成之后需要使用释放锁就可以了。

# 红锁

“红锁”（Redlock）是一种分布式锁算法，由Redis之父Salvatore Sanfilippo提出，**旨在解决在分布式环境中实现可靠锁的问题**。

传统的分布式锁实现方法可能在某些特定条件下（如网络分区、节点故障等）导致**锁的不可靠性**，而Redlock算法则试图通过一种更健壮的方式来解决这些问题。

## 红锁的应用场景

- **分布式系统**：在需要跨服务或跨进程去访问共享资源的场景中，Redlock算法可以提供一种**可靠的锁机制**。
- **高并发环境**：在高并发环境下，Redlock算法可以帮助**避免因锁竞争而导致的性能瓶颈**。

## 红锁的实现步骤

1. **多节点部署**：Redlock算法要求至少有奇数（不低于5）个节点独立的Redis节点。这些节点之间相互独立，不依赖于彼此。
2. **尝试获取锁**：客户端向每个节点申请锁，每个节点锁**使用相同的锁名称和相同的随机值（token）**。每个节点的锁设置一个小于锁的总有效期的超时时间。
3. **多数节点同意**：如果客户端能够在**超过半数**的节点上成功获取锁，则认为锁获取成功。
4. **计算实际等待时间，判断是否要放弃锁**：成功获取锁后，客户端计算在整个过程中花费的实际时间，包括网络延迟和锁请求的处理时间。如果这段时间超过了锁的有效期的一半，客户端应当放弃锁并重新尝试获取。
5. **设置锁的有效期**：为了确保锁的有效性，设置锁的有效期 = 最初设置的锁有效期 - 实际等待时间。锁的有效期是从客户端开始“尝试”获取锁时算起的。
6. **释放锁**：当不再需要锁时，客户端需要向所有节点发送释放锁的请求，确保锁被真正释放。

**优点**：

- **高可用性**：通过多节点部署和多数派决策，提高了锁的可用性和可靠性。
- **灵活性**：允许锁的有效期动态调整，以适应不同的网络条件和负载情况。

**缺点**：

- **复杂度**：相比简单的基于单个Redis实例的锁实现，Redlock算法更为复杂，需要管理多个节点之间的协调。
- **性能开销**：由于需要与多个节点交互，可能会引入额外的网络延迟和性能开销。

## 红锁在分布式锁方面的保证

Redlock算法通过**多节点部署**和**多数派决策机制**，显著提高了分布式锁的可靠性和高可用性。它**有效地防止了因单点故障或网络问题导致的多个线程同时获取同一把锁的情况**，从而确保了系统的稳定性和数据的一致性。

因为每个节点锁**都会使用使用相同的锁名称和相同的随机值（token）**，因此其他线程重复获取同一把锁是不可能成功的，从而就保证了分布式锁的可靠性。



