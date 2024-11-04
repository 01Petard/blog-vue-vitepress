---
title: Kafka原理
date: 2024-08-15 10:28:00
updated: 2024-08-15 10:28:00
categories: 
- 学习
tags: 
- Kafka
keywords:
- Kafka
description: Kafka原理
cover: https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202410212144558.png
top_img: https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202410212145761.png
---
# 1.什么是kafka

kafka是用于构建实时数据管道和数据流的应用程序，是一个高性能分布式消息系统。具有实时横向扩展、高吞吐量、支持大量堆积、具有容错性和速度快等特点。

# 2.kafka的应用

![file](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202408150857130.png)

![file](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202408150857325.png)



# 3.kafka中的术语

 broker：kafka服务器，用于存储消息，一般是由多个broker组成kafka集群。
 topic：kafka给消息提供的分类方式。broker用来存储不同topic的消息数据。
 producer：往broker中某个topic里面生产数据。
 consumer：从broker中某个topic获取数据。

# 4.kafka中各部分的工作原理

## 1.Broker

Kafka 服务器，用于储存消息，一般是由多个broker组成kafka集群。

![file](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202408150857165.png)

## 2.topic与消息

kafka将所有消息组织成多个topic的形式存储，而每个topic又可以拆分成多个partition，每个partition又由一个一个消息组成。每个消息都被标识了一个递增序列号代表其进来的先后顺序，并按顺序存储在partition中。这样，消息就以一个个id的方式，组织起来。
![file](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202408150959434.png)
producer选择一个topic，生产消息，消息会通过分配策略append到某个partition末尾。
consumer选择一个topic，通过id指定从哪个位置开始消费消息。消费完成之后保留id，下次可以从这个位置开始继续消费，也可以从其他任意位置开始消费。

上面的id在kafka中称为offset(偏移量)，这种组织和处理策略提供了如下好处：
1.消费者可以根据需求，灵活指定offset消费。
2.保证了消息不变性，为并发消费提供了线程安全的保证。每个consumer都保留自己的offset，互相之间不干扰，不存在线程安全问题。
 3.消息访问的并行高效性。每个topic中的消息被组织成多个partition，partition均匀分配到集群server中。生产、消费消息的时候，会被路由到指定partition，减少竞争，增加了程序的并行能力。
 4.增加消息系统的可伸缩性。每个topic中保留的消息可能非常庞大，通过partition将消息切分成多个子消息，并通过负责均衡策略将partition分配到不同server。这样当机器负载满的时候，通过扩容可以将消息重新均匀分配。
 5.保证消息可靠性。消息消费完成之后不会删除，可以通过重置offset重新消费，保证了消息不会丢失。
 6.灵活的持久化策略。可以通过指定时间段（如最近一天）来保存消息，节省broker存储空间。
 7.备份高可用性。消息以partition为单位分配到多个server，并以partition为单位进行备份。备份策略为：1个leader和N个followers，leader接受读写请求，followers被动复制leader。leader和followers会在集群中打散，保证partition高可用。

## 3.partitions

每个Topics划分为一个或者多个Partition,并且Partition中的每条消息都被标记了一个sequential id ,也就是offset,并且存储的数据是可配置存储时间的 
![file](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202408150857528.png)

## 4.Producer

消息生产者，生产消息需要如下参数：
 1.topic：往哪个topic生产消息。
 2.partition：往哪个partition生产消息。
 3.key：根据该key将消息分区到不同partition。
 4.message：消息。
![file](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202408150959792.png)

## 5.Comsumer

传统消息系统有两种模式：1.队列 2.发布订阅
kafka通过consumer group将两种模式统一处理：每个consumer将自己标记consumer group名称，之后系统会将consumer group按名称分组，将消息复制并分发给所有分组，每个分组只有一个consumer能消费这条消息。
![file](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202408150854330.png)
![file](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202408150857699.png)
于是推理出两个极端情况：
当所有consumer的consumer group相同时，系统变成队列模式
当每个consumer的consumer group都不相同时，系统变成发布订阅

### 注意点

1、Consumer Groups 提供了topics和partitions的隔离。如上图Consumer Group A中的consumer-C2挂掉，consumer-C1会接收P1,P2，即一个consumer Group中有其他consumer挂掉后能够重新平衡
2、多consumer并发消费消息时，容易导致消息乱序，通过限制消费者为同步，可以保证消息有序，但是这大大降低了程序的并发性。
 kafka通过partition的概念，保证了partition内消息有序性，缓解了上面的问题。partition内消息会复制分发给所有分组，每个分组只有一个consumer能消费这条消息。这个语义保证了某个分组消费某个分区的消息，是同步而非并发的。如果一个topic只有一个partition，那么这个topic并发消费有序，否则只是单个partition有序。

### consumer存在两种消费模型

push：优势在于消息实时性高。劣势在于没有考虑consumer消费能力和饱和情况，容易导致producer压垮consumer。
 pull：优势在可以控制消费速度和消费数量，保证consumer不会出现饱和。劣势在于当没有数据，会出现空轮询，消耗cpu。

kafka采用pull，并采用可配置化参数保证当存在数据并且数据量达到一定量的时候，consumer端才进行pull操作，否则一直处于block状态。kakfa采用整数值consumer position来记录单个分区的消费状态，并且单个分区单个消息只能被consumer group内的一个consumer消费，维护简单开销小。消费完成，broker收到确认，position指向下次消费的offset。由于消息不会删除，在完成消费，position更新之后，consumer依然可以重置offset重新消费历史消息。

# 5.可用性

在kafka中，正常情况下所有node处于同步中状态，当某个node处于非同步中状态，也就意味着整个系统出问题，需要做容错处理。

## 1.同步

同步中的状态：
该node与zookeeper能连通。
该node如果是follower，那么consumer position与leader不能差距太大（差额可配置）。

ISR: 某个分区内同步中的node组成一个集合，即该分区的ISR (即分区集群)。

## 2.容错机制

kafka通过两个手段容错:
1.数据备份：以partition为单位备份，副本数可设置。当副本数为N时，代表1个leader，N-1个followers，followers可以视为leader的consumer，拉取leader的消息，append到自己的系统中。
2.failover：
当leader处于非同步中时，系统从followers中选举新leader。
 当某个follower状态变为非同步中时，leader会将此follower剔除ISR，当此follower恢复并完成数据同步之后再次进入 ISR。

另外 kafka有个保障：当producer生产消息时，只有当消息被所有ISR确认时，才表示该消息提交成功。只有提交成功的消息，才能被consumer消费。
因此，当有N个副本时，N个副本都在ISR中，N-1个副本都出现异常时，系统依然能提供服务。
假设N副本全挂了，node恢复后会面临同步数据的过程，这期间ISR中没有node，会导致该分区服务不可用。kafka采用一种降级措施来处理：选举第一个恢复的node作为leader提供服务，以它的数据为基准，这个措施被称为脏leader选举.

# 6.一致性

有时高可用是体现在对一致性的牺牲上。如果希望达到强一致性，可以采取如下措施：
1.禁用脏leader选举，ISR没有node时，宁可不提供服务也不要未完全同步的node。
2.设置最小ISR数量min_isr，保证消息至少要被min_isr个node确认才能提交。

# 7.持久化

## 7.1概述

Kafka很大程度上依赖文件系统来存储和缓存消息。有一普遍的认识：磁盘很慢。这让人们怀疑使用磁盘作为持久化的性能。实际上，磁盘是快还是慢完全取决于我们是如何使用它。 
   就目前来说，一个 six 7200rpm SATA RAID-5磁盘线性（顺序）写入的性能能达到600MB/sec，而任意位置写（寻址再写）的性能只有100k/sec。并且现在的操作系统提供了预读取和后写入的技术。实际上，顺序的磁盘读写比任意的内存读写更快。

### 基于jvm内存有以下缺点：

1.对象的内存开销非常高，通常会让存储数据的大小加倍（或更多）
2.随着堆内数据的增加，GC的速度越来越慢，而且可能导致错误

### 基于操作系统的文件系统来设计有以下好处：

1.可以通过os的pagecache来有效利用主内存空间，由于数据紧凑，可以cache大量数据，并且没有gc的压力
2.即使服务重启，缓存中的数据也是热的（不需要预热）。而基于进程的缓存，需要程序进行预热，而且会消耗很长的时间。（10G大概需要10分钟）
3.大大简化了代码。因为在缓存和文件系统之间保持一致性的所有逻辑都在OS中。以上建议和设计使得代码实现起来十分简单，不需要尽力想办法去维护内存中的数据，数据会立即写入磁盘。

## 7.2 kafka数据持久化

1.线性的访问磁盘（即：按顺序的访问磁盘），很多时候比随机的内存访问快得多，而且有利于持久化；
2.传统使用的内存做为磁盘的缓存
3.Kafka直接将数据写入到日志文件中，以追加的形式写入

## 7.3日志数据持久化

写操作：通过将数据追加到文件中实现
读操作：读的时候从文件中读就好了

## 7.4 持久化的优势

读操作不会阻塞写操作和其他操作（因为读和写都是追加的形式，都是顺序的，不会乱，所以不会发生阻塞），数据大小不对性能产生影响；
没有容量限制（相对于内存来说）的硬盘空间建立消息系统；
线性访问磁盘，速度快，可以保存任意一段时间！

## 7.5持久化的具体实现

1.一个topic可以认为是一类消息，每个topic将被分成多个partition,每个partition在存储层面是append log文件。任何发布到此partition的消息都会被追加到log文件的尾部，每条消息在文件中的位置成为offset(偏移量)，partition是以文件的形式存储到文件体统中的。
2.Logs文件根据broker中的配置要求,保留一定时间后删除来释放磁盘空间(默认7天)。

## 7.6 kafka的索引

稀疏存储，每隔一定字节的数据建立一条索引（这样的目的是为了减少索引文件的大小）。
![file](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202408150959871.png)
1.现在对6.和8建立了索引，如果要查找7，则会先查找到8然后，再找到8后的一个索引6，然后两个索引之间做二分法，找到7的位置
2.每一个log文件中又分为多个segment

# 8.kafka分布式实现

![file](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202408150959325.png)
1.当生产者将消息发送到Kafka后，就会去立刻通知ZooKeeper，zookeeper中会watch到相关的动作，当watch到相关的数据变化后，会通知消费者去消费消息。
2.消费者是主动去Pull（拉)kafka中的消息，这样可以降低Broker的压力，因为Broker中的消息是无状态的，Broker也不知道哪个消息是可以消费的
3.当消费者消费了一条消息后，也必须要去通知ZooKeeper。zookeeper会记录下消费的数据，这样当系统出现问题后就可以还原，可以知道哪些消息已经被消费了
![file](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202408151000790.png)