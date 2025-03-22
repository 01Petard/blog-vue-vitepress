---
title: RocketMQ原理
date: 2024-07-10 12:47:00
updated: 2024-08-10 18:52:00
categories: 
- 学习
tags: 
- 消息队列
- RocketMQ
keywords:
- 消息队列
- RocketMQ
description: RocketMQ原理
cover: https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202410212158381.png
top_img: https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202410212157755.png
---

# 1. 什么是RocketMQ

rocketmq是阿里巴巴开源的一款基于高可用分布式集群的消息中间件，可为分布式系统提供异步、解耦和流量削峰的能力，同时也具备互联网应用所需的海量消息堆积、高吞吐、可靠重试等性能，是阿里巴巴双11使用的核心产品。

# 2. 应用场景

1.削峰填谷：诸如秒杀、抢红包、企业开门红等大型活动时皆会带来较高的流量脉冲，或因没做相应的保护而导致系统超负荷甚至崩溃，或因限制太过导致请求大量失败而影响用户体验，消息队列 RocketMQ 可提供削峰填谷的服务来解决该问题。

2.异步处理,应用解耦：交易系统作为淘宝/天猫主站最核心的系统，每笔交易订单数据的产生会引起几百个下游业务系统的关注，包括物流、购物车、积分、流计算分析等等，整体业务系统庞大而且复杂，消息队列 RocketMQ 可实现异步通信和应用解耦，确保主站业务的连续性。

3.顺序收发：细数日常中需要保证顺序的应用场景非常多，比如证券交易过程时间优先原则，交易系统中的订单创建、支付、退款等流程，航班中的旅客登机消息处理等等。与先进先出（First In First Out，缩写 FIFO）原理类似，消息队列 RocketMQ 提供的顺序消息即保证消息 FIFO。

4.分布式事务：交易系统、支付红包等场景需要确保数据的最终一致性，大量引入消息队列 RocketMQ 的分布式事务，既可以实现系统之间的解耦，又可以保证最终的数据一致性。

5.大数据分析：数据在“流动”中产生价值，传统数据分析大多是基于批量计算模型，而无法做到实时的数据分析，利用阿里云消息队列 RocketMQ 与流式计算引擎相结合，可以很方便的实现将业务数据进行实时分析

# 3. 对比rabbitMQ，kafka主要的优势

支持事务型消息
支持延迟消息
支持指定次数和时间间隔的失败消息重发
支持consumer端tag过滤，减少不必要的网络传输
支持重复消费（rabbitmq不支持，kafka支持）

# 4. RocketMQ中核心的概念

1.Topic：消息主题一级消息类型，生产者向其发送消息。

2.生产者：也称为消息发布者，负责生产并发送消息至 Topic。

3.消费者：也称为消息订阅者，负责从 Topic 接收并消费消息。

4.消息：生产者向 Topic 发送并最终传送给消费者的数据和（可选）属性的组合。

5.消息属性：生产者可以为消息定义的属性，包含 Message Key 和 Tag。

6.Group：一类生产者或消费者，这类生产者或消费者通常生产或消费同一类消息，且消息发布或订阅的逻辑一致。

# 5. Rocket的原理和架构图

![file](https://blog.leke.cn/wp-content/uploads/2022/07/image-1657506435265.png)

结合部署结构图，描述集群工作流程：

1，启动Namesrv，Namesrv起来后监听端口，等待Broker、Producer、Consumer连上来，相当于一个路由控制中心。

2，Broker启动，跟所有的Namesrv保持长连接，定时发送心跳包。心跳包中包含当前Broker信息(IP+端口等)以及存储所有topic信息。注册成功后，namesrv集群中就有Topic跟Broker的映射关系。

3，收发消息前，先创建topic，创建topic时需要指定该topic要存储在哪些Broker上。也可以在发送消息时自动创建Topic。

4，Producer发送消息，启动时先跟Namesrv集群中的其中一台建立长连接，并从Namesrv中获取当前发送的Topic存在哪些Broker上，然后跟对应的Broker建长连接，直接向Broker发消息。

5，Consumer跟Producer类似。跟其中一台Namesrv建立长连接，获取当前订阅Topic存在哪些Broker，然后直接跟Broker建立连接通道，开始消费消息。

# 6.RocketMQ各组件的功能

#### 1.NameServer 注册中心

就是一个注册中心，存储当前集群所有Brokers信息、Topic跟Broker的对应关系。

1.NameServer用于存储Topic、Broker关系信息，功能简单，稳定性高。多个Namesrv之间相互没有通信，单台Namesrv宕机不影响其他Namesrv与集群；即使整个Namesrv集群宕机，已经正常工作的Producer，Consumer，Broker仍然能正常工作，但新起的Producer, Consumer，Broker就无法工作。

2.Namesrv压力不会太大，平时主要开销是在维持心跳和提供Topic-Broker的关系数据。但有一点需要注意，Broker向Namesr发心跳时，会带上当前自己所负责的所有Topic信息，如果Topic个数太多（万级别），会导致一次心跳中，就Topic的数据就几十M，网络情况差的话，网络传输失败，心跳失败，导致Namesrv误认为Broker心跳失败。

#### 2.Broker 消息服务器

集群最核心模块，主要负责Topic消息存储、管理和分发等功能。

1.高并发读写服务

消息顺序写，所有Topic数据同时只会写一个文件，一个文件满1G，再写新文件，真正的顺序写盘，使得发消息TPS大幅提高。

消息随机读，RocketMQ尽可能让读命中系统pagecache，因为操作系统访问pagecache时，即使只访问1K的消息，系统也会提前预读出更多的数据，在下次读时就可能命中pagecache，减少IO操作。

2.负载均衡与动态伸缩
负载均衡：Broker上存Topic信息，Topic由多个队列组成，队列会平均分散在多个Broker上，而Producer的发送机制保证消息尽量平均分布到所有队列中，最终效果就是所有消息都平均落在每个Broker上。

动态伸缩能力（非顺序消息）：扩大topic的队列数，或 增加broker的数量

3.高可用&高可靠

高可用：集群部署时一般都为主备，备机实时从主机同步消息，如果其中一个主机宕机，备机提供消费服务，但不提供写服务。

高可靠：所有发往broker的消息，有同步刷盘和异步刷盘机制；同步刷盘时，消息写入物理文件才会返回成功，异步刷盘时，在返回写成功状态时，消息可能只是被写入了内存的PAGECACHE，写操作的返回快，吞吐量大；当内存里的消息量积累到一定程度时，统一触发写磁盘操作。只有机器宕机，会产生少量消息丢失，broker挂掉可能会发生，但是机器宕机崩溃是很少发生的，除非突然断电

4.Broker与Namesrv的心跳机制

单个Broker跟所有Namesrv保持心跳请求，心跳间隔为30秒，心跳请求中包括当前Broker所有的Topic信息。Namesrv每隔10秒会反查Broker的心跳信息，如果某个Broker在2分钟之内都没有心跳，则认为该Broker下线，调整Topic跟Broker的对应关系。但此时Namesrv不会主动通知Producer、Consumer有Broker宕机。

#### 3. consumer 消费者

消费者启动时需要指定Namesrv地址，与其中一个Namesrv建立长连接。消费者每隔30秒从nameserver获取所有topic的最新队列情况，这意味着某个broker如果宕机，客户端最多要30秒才能感知。连接建立后，从namesrv中获取当前消费Topic所涉及的Broker，直连Broker。

Consumer跟Broker是长连接，会每隔30秒发心跳信息到Broker。Broker端每10秒检查一次当前存活的Consumer，若发现某个Consumer 2分钟内没有心跳，就断开与该Consumer的连接，并且向该消费组的其他实例发送通知，触发该消费者集群的负载均衡。

消费者端的负载均衡，就是集群消费模式下，同一个groupID的所有消费者实例平均消费该Topic的所有队列。

但是Consumer 数量要小于等于队列数量，如果Consumer 超过队列数量，那么多余的Consumer 将不能消费消息。

消费者的消费模式：集群消费，广播消费。

广播消费：每个消费者消费Topic下的所有队列。

集群消费：一个topic可以由同一个groupID下所有消费者分担消费。

#### 4. producer 生产者

Producer启动时，也需要指定Namesrv的地址，从Namesrv集群中选一台建立长连接。如果该Namesrv宕机，会自动连其他Namesrv。直到有可用的Namesrv为止。

生产者每30秒从Namesrv获取Topic跟Broker的映射关系，更新到本地内存中。再跟Topic涉及的所有Broker建立长连接，每隔30秒发一次心跳。在Broker端也会每10秒扫描一次当前注册的Producer，如果发现某个Producer超过2分钟都没有发心跳，则断开连接。

生产者端的负载均衡
生产者发送时，会自动轮询当前所有可发送的broker，一条消息发送成功，下次换另外一个broker发送，以达到消息平均落到所有的broker上。

这里需要注意一点：假如某个Broker宕机，意味生产者最长需要30秒才能感知到。在这期间会向宕机的Broker发送消息。当一条消息发送到某个Broker失败后，会往该broker自动再重发2次，假如还是发送失败，则抛出发送失败异常。业务捕获异常，重新发送即可。客户端里会自动轮询另外一个Broker重新发送，这个对于用户是透明的。

# 7.RocketMQ中Topic、Tag、GroupName的设计

#### Topic

Topic是生产者在发送消息和消费者在拉取消息的类别，Topic与生产者和消费者之间的关系非常松散。一个Topic可能N多个生产者向它发送消息；一个生产者可以发送不同类型Topic的消息。类似的，消费者组可以订阅一个或多个主题，只要该组的实例保持其订阅一致即可。

我们可以理解为第一级消息类型，类比于书的标题

#### Tag

标签，换句话的意思就是子主题，为用户提供了额外的灵活性。有了标签，来自同一业务模块的具有不同目的的消息可以具有相同的主题和不同的标签。标签有助于保持代码的清晰和连贯，同时标签也方便RocketMQ提供的查询功能。

我们可以理解为第二级消息类型，类比于书的目录，方便检索使用消息

groupName
代表具有相同角色的生产者组合或消费者组合，称为生产者组或消费者组。

在消费者组中，可以实现消息消费的负载均衡和消息容错目标。

另外，有了GroupName，在集群下，动态扩展容量很方便。只需要在新加的机器中，配置相同的GroupName。启动后，就立即能加入到所在的群组中，参与消息生产或消费。

#### 7.1集群中topic的创建

https://blog.csdn.net/lblblblblzdx/article/details/88234641

1.手动创建
手动选择 broker，以及创建队列的数量
2.自动创建

# 8. 部署方式

#### 1. 单Master模式

只有一个Master节点

优点：配置简单，方便部署

缺点：风险较大，一旦broker重启或者宕机，导致整个服务不可用

https://blog.csdn.net/weixin_42576761/article/details/82774332

#### 2. 多Master模式

一个集群存在多个Master，没有Slave

优点：配置简单，单个Master重启或者宕机对应用无影响。在磁盘配置为RAID10 时，即使机器宕机不可恢复情况下，由与 RAID10磁盘非常可靠，消息也不会丢（异步刷盘丢失少量消息，同步刷盘一条不丢）

缺点：单台机器宕机期间，这台机器上未被消费的消息在机器恢复之前不可订阅，消息实时性会受到受到影响

#### 3. 多Master多Slave模式(异步复制)

每个 Master 配置一个 Slave，有多对Master-Slave， HA，采用异步复制方式，主备有短暂消息延迟，毫秒级。

优点：磁盘损坏，消息丢失的非常少，且消息实时性不会受影响，因为Master 宕机后，消费者仍然可以从 Slave消费

缺点：Master 宕机，磁盘损坏情况，会丢失少量消息

#### 4. 多Master多Slave(同步双写)

每个 Master 配置一个 Slave，有多对Master-Slave， HA采用同步双写方式，主备都写成功，向应用返回成功

优点:数据与服务都无单点， Master宕机情况下，消息无延迟，服务可用性与数据可用性都非常高

缺点：性能比异步复制模式略低，大约低 10%左右。

# 9. rockmq的分布式事务

1.Producer向RocketMQ发送一条待确认的事务类型消息。并获取到transactionId。

2.Producer执行本地事务。

3.Producer 根据本地执行的结果对RocketMQ进行二次确认。本地执行成功，将待确认的消息变成可投递消息,本地执行失败，mq将half message消息丢弃。

4.由于某种原因，导致二次确认的没有发送到RocketMQ，RocketMQ提供回查机制，就是在一段时间后，待确认的消息没有被确认，RocketMQ就会主动向producer询问

5.producer查询本地事务执行的情况。

6.向RocketMQ发送确认消息。

# 10. RocketMQ持久化原理

#### 1.存储架构设计

![file](https://blog.leke.cn/wp-content/uploads/2022/07/image-1657506513913.png)

RocketMQ主要存储文件有三个，分别是：

CommitLog：消息存储文件，所有的消息存在这里；

ConsumeQueue：消费队列文件，消息在存储到CommitLog后，会将消息所在CommitLog偏移量、大小、tag的hashcode异步转发到消费队列存储，供消费者消费，其类似于数据库的索引文件，存储的是指向物理存储的地址，每个topic下的每个Message Queue都有一个对应的ConsumeQueue文件；

Index：索引文件，消息在存储到CommitLog后，会将消息key与消息所在CommitLog偏移量转发到索引文件存储，供消息查询。

我们可以看出消息的生产与消费进行了分离，Producer端发送消息最终写入的是CommitLog，Consumer端先从ConsumeQueue读取持久化消息的起始物理位置偏移量offset、大小size和消息Tag的HashCode值，再从CommitLog中进行读取待拉取消费消息的真正实体内容部分。

#### 2.RocketMQ中如何做到消息存储的高效性

高性能磁盘在顺序写入的时候，速度基本可以堪比内存的写入速度，但是磁盘随机写入的时候，性能瓶颈非常明显，速度会比较慢。

所以RocketMQ采用了全部消息都存入一个CommitLog文件中，并且对写操作加锁（putMessageLock），保证串行顺序写入消息，避免磁盘竟争导致IO WAIT增高，大大提高写入效率。

![file](https://blog.leke.cn/wp-content/uploads/2022/07/image-1657506555037.png)

生产者按顺序写入CommitLog，消费者通过顺序读取ConsumeQueue进行消费，这里有一个地方需要注意，虽然消费者是按照顺序读取ConsumeQueue，但是并不代表它就是按照顺序读取消息，因为根据ConsumeQueue中的起始物理位置偏移量offset读取消息真实内容，在并发量非常高的情况下，实际上是随机读取CommitLog，而随机读取文件带来的性能开销影响还是比较大的，所以在这里，RocketMQ利用了操作系统的pagecache机制，批量从磁盘读取，作为cache存在内存中，加速后速的读取速度。

#### 3.存储文件

RocketMQ在磁盘上持久化的目录：

![file](https://blog.leke.cn/wp-content/uploads/2022/07/image-1657506568519.png)

CommitLog文件夹中的内容：

![file](https://blog.leke.cn/wp-content/uploads/2022/07/image-1657506578093.png)

可以看到每个文件1G大小，以该文件中第一个偏移量为文件名，偏移量小于20位用0补齐。如图所示，第一个文件的初始偏移量为9663676416，第二个文件的初始偏移量为10737418240。

CommitLog文件内部存储逻辑是，每条消息的前4个字节存储该条消息的总长度（包含长度信息本身），随后便是消息内容。如图所示：

![file](https://blog.leke.cn/wp-content/uploads/2022/07/image-1657506597380.png)

消息的长度=消息长度信息（4字节）+ 消息内容长度。

实现消息查找的步骤：

1.消费者从消费队列中获取到某个消息的偏移量offset与长度size；

2.根据偏移量offset定位到消息所在的commitLog物理文件；

3.用偏移量与文件长度取模，得到消息在这个commitLog文件内部的偏移量；

4.从该偏移量取得size长度的内容返回即可。

ConsumeQueue文件：

不同主题下的消息都交错杂糅在同一个文件里，想要提高查询速度，必须要构建类似于搜索索引的文件，于是就有了消费队列ConsumeQueue文件。

从实际物理存储来说，每个ConsumeQueue文件对应每个Topic和QueuId。

# 11. RocketMQ的顺序消息

顺序消息（FIFO 消息）是 MQ 提供的一种严格按照顺序进行发布和消费的消息类型。RocketMQ可以严格的保证消息有序。但这个顺序，不是全局顺序，只是分区（queue）顺序，要全局顺序只能一个分区。

需要从发送到消费整个过程中保证有序：

1.发送消息是顺序的：producer发送消息需要同步

2.boker存储消息是顺序的

3.consumer消费是顺序的：需要保证一个queue只在一个线程内被消费。

#### 1.发顺序消息

因为broker存储消息有序的前提是producer发送消息是有序的，producer发送消息应该是依次发送的，所以要求发送消息的时候保证：

1.消息不能异步发送，同步发送的时候才能保证broker收到是有序的。

2.每次发送选择的是同一个MessageQueue。

#### 2.producer顺序发送

一个订单的流程 创建，支付，完成。订单号相同的消息需要先后写入同一个队列。

通过MessageQueueSelector来实现分区的选择，使相同订单号的消息写入同一队列
Producer发送消息的时候需要同步发送。producer发送消息之后不会立即返回，会等待broker的response。broker收到producer的请求之后虽然是启动线程处理的，但是在线程中将消息写入commitLog中以后会发送response给producer，producer在收到broker的response并且是处理成功之后才算是消息发送成功。

#### 3.consumer顺序消费

MessageListenerOrderly类,不再使用MessageListenerConcurrently类,这样就可以保证消费端只有一个线程去消费消息