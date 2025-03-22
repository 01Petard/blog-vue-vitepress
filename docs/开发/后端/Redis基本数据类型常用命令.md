---
title: Redis基本数据类型常用命令
date: 2022-03-15 21:58:15
updated:
categories: 
- 学习
tags: 
- Redis
keywords:
- Redis
description: 初识Redis
cover: https://www.w3cschool.cn/attachments/image/20170622/1498119653712274.png
top_img: https://s1.51cto.com/oss/202004/10/727f6a7cee2af212d5a6675238898dad.jpeg
---

## 简介

Redis是一个高性能的key-value数据库。Redis对数据的操作都是原子性的。

**优缺点**

优点：

1. **基于内存操作，内存读写速度快。**
2. Redis是**单线程**的，避免线程切换开销及多线程的竞争问题。单线程是指在处理网络请求（一个或多个redis客户端连接）的时候只有一个线程来处理，redis运行时不只有一个 线程，数据持久化或者向slave同步aof时会另起线程。
3. **支持多种数据类型**，包括String、Hash、List、Set、ZSet等。
4. 支持**持久化**。Redis支持**RDB和AOF**两种持久化机制，持久化功能有效地避免数据丢失问题。
5. redis采用**IO多路复用**技术。多路指的是多个socket连接，复用指的是复用一个线程。redis使用单线程俩轮询描述符，将数据库的开、关、读、写都转换成了时间。多路复用主要有三种技术：select、poll、epoll。epoll是最新的也是目前最好的多路复用技术。

缺点：对join或其他结构化查询的支持就比较差。

**io多路复用**

**应用场景**

1. 缓存热点数据，缓解数据库的压力
2. 利用Redis中原子性的自增操作，可以用于实现计算器的功能，比如统计用户点赞数、用户访问数等，这类操作如果用MySQL，频繁的读写会带来相当大的压力。
3. 简单消息队列，不要求高可靠地情况下，可以使用Redis自身的发布/订阅模式或者List来实现一个队列，实现异步操作。
4. 好友关系，利用集合的一些命令，比如求交集、并集、差集等。可以方便搞定一些共同好友、共同爱好之类的功能。
5. 限速器，比较典型的使用场景是限制某个用户访问某个API的频率，常用的有抢购，防止用户疯狂点击带来不必要的压力。

Redis支持五种数据类型：

- string（字符串）
- hash（哈希）
- list（列表）
- set（集合）
- zset（sorted set）

## String

String类型是二进制安全的，意思是 redis 的 string 可以包含任何数据。如数字，字符串，jpg图片或者序列化对象。

### 常用命令

| 命令     | 简述           | 使用             |
|:------ |:------------ |:-------------- |
| get    | 读取存储在给定键中的值  | get key        |
| set    | 设置存储在给定键中的值  | set key value  |
| del    | 删除存储在给定键中的值  | del key        |
| incr   | 将键存储的值加1     | incr key       |
| decr   | 将键存储的值减1     | decr key       |
| incrby | 将键存储的值加上指定整数 | incrby key num |
| decrby | 将键存储的值减去指定整数 | decrby key num |

- **赋值（set）和取值（get）**
  
  ```shell
  set name gmt
  get name
  ```

- **递增（incr）和递减（decr）**
  
  ```bash
  incr num // 若键值不是整数时，会提示错误
  incrby num 3 // 增加指定整数
  decr num // 递减数字
  incrbyfloat num 12.3 // 增加指定浮点数
  ```

- **其他**
  
  `key list*` 列出所有匹配的key
  
  `append name "123"`追加值
  
  `strlen name` 获取字符串长度
  
  `mset num 1 float 2` 同时设置多个值
  
  `mget name gender` 同时获取多个值
  
  `getbit name 0` 获取0索引处二进制位的值
  
  `flushdb` 删除当前数据库所有的key
  
  `flushall` 删除所有数据库中的key

- setnx和setex

`setnx key value`：当key不存在时，将key的值设为value。若给定的key已经存在，则SETNX不做任何操作。

`setex key seconds value`：比SET多了seconds参数，相当于`SET KEY value` + `EXPIRE KEY seconds`，而且SETEX是原子性操作。

- expire

```dart
expire key num // 设置key过期时间为num秒
ttl key // 查看键的剩余生存时间，-1为永不过期
```

expire时间单位是秒，pexpire时间单位是毫秒。

在键未过期前可以重新设置过期时间，过期之后键被销毁。

注意：

- 如果key不存在或者已过期，返回-2
- 如果key存在并且没有设置过期时间（永久有效），返回-1

### 实战场景

- **缓存**：经典使用场景，把常用信息，字符串，图片或者视频等信息放到redis中，redis作为缓存层，mysql作为持久化层，降低mysql的读写压力。
- **计数器**：redis是单线程模型，一个命令执行完才会执行下一个，同时数据可以一步落地到其他的数据源。
- **session**：常见方案spring session + redis 实现session共享。

## List

**Redis中的List其实就是链表（Redis使用双端链表实现List）**

### 常用命令

| 命令      | 简述                                            | 使用                                                          |
|:------- |:--------------------------------------------- |:----------------------------------------------------------- |
| rpush   | 将给定值推入到列表右端                                   | rpush list value                                            |
| lpush   | 将给定值推入到列表左端                                   | lpush list value                                            |
| rpop    | 从列表的右端弹出一个值，并返回被弹出的值                          | rpop list                                                   |
| lpop    | 从列表的左端弹出一个值，并返回被弹出的值                          | lpop list                                                   |
| lrange  | 获取列表在给定范围上的所有值                                | lrange list 0 -1                                            |
| lindex  | 通过索引获取列表中的元素，可以使用负数下标，-1表示最后一个，-2表示倒数第二个，以此类推 | lindex key index                                            |
| linsert | 从左到右寻找职位pivot的值，向列表插入value                    | linsert list after（before） pivot value 往pivot后面（前面）插入value； |
| ltrim   | 删除索引begin到end以外的所有元素                          | ltrim list begin end                                        |
| llen    | 获取列表元素个数                                      | llen list                                                   |
| lset    | 修改指定索引处的值                                     | lset list index value                                       |

### 常用技巧

- lpush + lpop = Stack（栈）
- lpush + rpop = Queue（队列）
- lpush + ltrim = Capped Collection（有限集合）
- lpush + brpop = Message Queue（消息队列）

### 实战场景

- **微博TimeLine**：有人发布微博，用lpush加入时间轴，显示新的消息列表
- **消息队列**

## Set

Redis 的 Set 是String类型的无序集合。集合成员是唯一的，这就意味着集合中不能出现重复的数据。

Redis 中集合是通过哈希表实现的，所以添加、删除、查找的时间复杂度都是O（1）

### 常用命令

| 命令          | 简述                                                                      | 使用                        |
|:----------- |:----------------------------------------------------------------------- |:------------------------- |
| sadd        | 向集合添加一个或多个成员                                                            | sadd set value1 value2... |
| scard       | 获取集合的成员数                                                                | scard set                 |
| smembers    | 返回集合中的所有成员                                                              | smembers set              |
| srem        | 删除集合中一个或多个成员                                                            | srem set value1,value2... |
| sismember   | 判断元素是否在集合中                                                              | sismember set value       |
| sdiff       | 差集运算                                                                    | sdiff setA setB ...       |
| sinter      | 交集运算                                                                    | sinter setA setB ...      |
| sunion      | 并集运算                                                                    | sunion setA setB ...      |
| srandmember | 随机获取集合里的一个元素，count大于0，则从集合随机获取count个不重复元素，count小于0，则随机获取的count个元素有些可能相同 | srandmember set count     |

### 实战场景

- **标签**：给用户添加标签，或者用户给消息添加标签，这样有同一标签或者类似标签的可以给推荐关注的事或这关注的人。
- **点赞，点踩，收藏**

## Hash

Redis hash 是一个string类型的field（字段）和value（值）的映射表，hash特别适合用户存储对象。

### 常用命令

| 命令      | 简述                   | 使用                                      |
|:------- |:-------------------- |:--------------------------------------- |
| hset    | 添加键值对                | hset myhash key1 value1 key2 value2 ... |
| hget    | 获取指定散列键的值            | hget myhash key1                        |
| hgetall | 获取散列中包含的所有键值对        | hgetall myhash                          |
| hdel    | 如果给定键存在于散列中，那么就移除这个键 | hdel myhash key1                        |

### 实战场景

- **缓存**：能直观，相比string更节省空间

## Zset

Redis 有序集合和集合一样也是string类型的元素的集合，且不允许重复的成员。不同的是每个元素都会关联一个double类型的分数。redis正是通过分数来为集合中的成员进行从小到大的排序。

有序集合的成员是唯一的，但是分数（score）可以重复。集合是通过哈希表实现的，所以添加，删除，查找的复杂度都是O(1)

### 常用命令

| 命令     | 简述                           | 使用                         |
|:------ |:---------------------------- |:-------------------------- |
| zadd   | 将一个带有给定分值的成员添加到有序集合里面        | zadd zset key              |
| zrange | 根据元素在有序集合中所处的位置，从有序集合中获取多个元素 | zrange zset 0 2 withscores |
| zrem   | 如果给定元素成员存在于有序集合中，那么就移除这个元素   | zrem zset member           |

### 实战场景

- **排行榜：**有序集合经典使用场景。例如小说视屏等网站需要对用户上传的小说视频做排行榜，榜单可以按照用户关注数、更新时间、字数等打分，做排行。
