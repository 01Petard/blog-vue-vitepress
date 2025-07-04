站在 Java 后端开发工程师的视角，结合高并发场景，分享几种**切实可落地**的方式来发现 Redis 热点数据。

------

## 1. 在应用侧打点：基于 Spring AOP 或拦截器埋点，统计 Key 访问次数

### 1.1 场景与思路

在高并发场景下，绝大部分对 Redis 的读写都发生在业务层（比如使用 Jedis/Lettuce 操作缓存）。如果我们在调用 Redis 之前/之后埋一个埋点：把每次读取/写入的 key 记录下来，并累加到某个统计结构里，就能实时掌握哪些 key 调用最频繁，进而判定“热点 key”。

### 1.2 具体实现步骤

1. **引入依赖**

   假设使用 Spring Boot + Jedis，pom.xml 中加：

   ```xml
   <dependency>
     <groupId>org.springframework.boot</groupId>
     <artifactId>spring-boot-starter-aop</artifactId>
   </dependency>
   <dependency>
     <groupId>redis.clients</groupId>
     <artifactId>jedis</artifactId>
     <version>3.7.0</version>
   </dependency>
   ```

2. **定义一个“Key 统计服务”**，把每次访问的 key 累加到 Redis 的一个有序集合（Sorted Set）里。示例：

   ```java
   @Service
   public class RedisHotKeyTracker {
       private static final String HOT_KEY_ZSET = "hotkey:counter";
       private final JedisPool jedisPool;
   
       public RedisHotKeyTracker(JedisPool jedisPool) {
           this.jedisPool = jedisPool;
       }
   
       /**
        * 增加 key 访问计数
        * @param key Redis 中被访问的 key（可以带前缀），我们用 ZINCRBY 来累加
        */
       public void incrementKey(String key) {
           try (Jedis jedis = jedisPool.getResource()) {
               // score 增量为 1，实时累加
               jedis.zincrby(HOT_KEY_ZSET, 1, key);
               // 为了避免过期过久，这里可以给整个 ZSET 默认一个 TTL（可选）
               jedis.expire(HOT_KEY_ZSET, 60 * 60 * 24); // 24 小时后过期
           }
       }
   
       /**
        * 返回 Top N 个热点 key
        */
       public List<String> getTopNHotKeys(int n) {
           try (Jedis jedis = jedisPool.getResource()) {
               // ZREVRANGE 返回分数最高的前 n 个元素
               return new ArrayList<>(jedis.zrevrange(HOT_KEY_ZSET, 0, n - 1));
           }
       }
   }
   ```

   - **思路解析**：
     - 我们把所有被访问的 key（包括读/写）都投票到 `hotkey:counter` 这个有序集合里，使用 zset 让每次访问的 key 的分数 +1。
     - 定时或按需调用 `getTopNHotKeys` 拿出 Top N，就能知道最近一段时间哪些 key 最热。
     - 注意：如果系统调用非常频繁，持续把所有 Key 写到一个 ZSET，也会带来压力。可以考虑：
       - 也可把**统计写到本地内存**（如 ConcurrentHashMap 或 Caffeine 缓存），定时（比如每分钟）批量写入 Redis，实现批量 “zIncrBy”。
       - 也可以为不同业务线/前缀开不同的 ZSET，减小单个 zset 的压力。

3. **使用 Spring AOP 切面拦截 Jedis 调用，埋点**

   - 如果团队成员有人通过 JedisTemplate、JedisService 之类的统一类操作 Redis，可以直接在那些统一类上切面。
   - 如果直接使用 JedisPool 拿 Jedis，再调用 `get()` / `set()`，可以写一个“代理”或“包装”类来封装 Jedis 操作。下面用 AOP 举例：

   ```java
   @Aspect
   @Component
   public class RedisAccessAspect {
       private final RedisHotKeyTracker hotKeyTracker;
   
       public RedisAccessAspect(RedisHotKeyTracker hotKeyTracker) {
           this.hotKeyTracker = hotKeyTracker;
       }
   
       // 拦截 Jedis 常见命令执行，比如 get, set, hget, hset 等
       @Pointcut("execution(* redis.clients.jedis.Jedis.get(..)) || " +
                 "execution(* redis.clients.jedis.Jedis.set(..)) || " +
                 "execution(* redis.clients.jedis.Jedis.hget(..)) || " +
                 "execution(* redis.clients.jedis.Jedis.hset(..)) || " +
                 "execution(* redis.clients.jedis.Jedis.lpush(..)) || " +
                 "execution(* redis.clients.jedis.Jedis.rpush(..))")
       public void redisCommands() {}
   
       @AfterReturning("redisCommands() && args(key,..)")
       public void afterRedisCommand(JoinPoint jp, String key) {
           if (key != null) {
               hotKeyTracker.incrementKey(key);
           }
       }
   }
   ```

   - **解释**：
     - `@Pointcut` 用来拦截 `Jedis.get(String key)`、`Jedis.set(String key, String value)`、`Jedis.hget(String key, ..)`、`Jedis.hset(String key, ..)` 等方法。实际场景中，若用的是 JedisCluster、JedisSentinel、或 Lettuce，就要把切入点调整成对应类的方法签名。
     - `afterRedisCommand` 方法拿到 key，然后调用 `RedisHotKeyTracker.incrementKey(key)`，统计到全局的 ZSET 里。后续可以定时、或者在运维界面手动拉取 TopN。

4. **定时拉取 Top N Key 并报警/展示**

   - 可以再写一个定时任务，每隔 `T` 秒（比如 30s）跑一次 `getTopNHotKeys(20)`，如果 Top1 访问次数过高（阈值可配置），或出现异常 key（比如 key 过大），就触发报警。

   ```java
   @Component
   public class HotKeyMonitorScheduler {
       private final RedisHotKeyTracker hotKeyTracker;
       private final int threshold = 10000; // 假设阈值：30s 内访问次数超过 10000 次
   
       public HotKeyMonitorScheduler(RedisHotKeyTracker hotKeyTracker) {
           this.hotKeyTracker = hotKeyTracker;
       }
   
       @Scheduled(cron = "*/30 * * * * ?") // 每 30 秒执行一次
       public void checkHotKeys() {
           List<String> topKeys = hotKeyTracker.getTopNHotKeys(5);
           if (topKeys.isEmpty()) return;
   
           // 拿到 Top1 的分数（访问次数），需要用 zscore
           try (Jedis jedis = hotKeyTracker.jedisPool.getResource()) {
               String topKey = topKeys.get(0);
               Double score = jedis.zscore("hotkey:counter", topKey);
               if (score != null && score > threshold) {
                   // 报警逻辑：可以推送到日志、邮件、钉钉等
                   System.err.printf("🚨 热点Key发现：%s 在过去 30s 访问 %d 次，可能成为瓶颈%n", topKey, score.intValue());
               }
           }
       }
   }
   ```

   - **成果**：结合 AOP+ZSET+定时调度，就能在“应用层”准确地跟踪每个 key 的访问频次，实时发现热点 key。这种方案对运维最友好，也可以灵活扩展，比如将日志推到 ELK / Prometheus。

------

## 2. 使用 Redis 自身的 LFU （Least Frequently Used）统计能力

Redis 从 4.0 或 5.0 版本开始，就支持了 LFU（基于近似 LRU/Freq 值）的内置统计。它会给每个 key 维护一个访问频率的“估算值”（0~255 之间，当某个 key 被访问时，这个值会衰减/增长），我们可以通过 `OBJECT FREQ key` 拿到某个 key 的“热度”分数。

### 2.1 前置条件与配置

1. **Redis 要启用 LFU 策略**
    在 `redis.conf` 里：

   ```conf
   # maxmemory-policy 设置为 allkeys-lfu 或 volatile-lfu
   maxmemory-policy allkeys-lfu
   # LFU 初始化和增量策略
   # lfu-log-factor 控制访问次数增加时增量的阈值
   lfu-log-factor 10
   lfu-decay-time 1
   ```

   - `allkeys-lfu`：对所有 key 都启用 LFU 算法；如果只想对带过期时间的 key 启用，可设为 `volatile-lfu`。
   - `lfu-log-factor`、`lfu-decay-time`：控制访问频次的衰减和增长。可先沿用默认值，之后根据实际访问模式调优。

2. **Redis 客户端要用 Jedis/JedisCluster 3.x+ 或 Lettuce 5.x+，能直接发送 `OBJECT FREQ` 命令。**

### 2.2 Java 端周期性扫描与排序

由于 Redis 不提供“列出整个 key 空间并带上 FREQ 值”的单条命令，所以我们只能做“采样”或“扫描”来获取热点。在业务不特别非常庞大（key 数不超千万）的场景下，常见做法是定时扫描所有 key，并查询其 `OBJECT FREQ`，把结果排序后找出热度最高的几条。

下面以 Jedis 为例，给出完整示例：

```java
@Service
public class RedisLFUHotKeyScanner {
    private final JedisPool jedisPool;
    private static final int SCAN_COUNT = 500; // 每次 SCAN 500 条，避免一次全量扫描造成阻塞

    public RedisLFUHotKeyScanner(JedisPool jedisPool) {
        this.jedisPool = jedisPool;
    }

    /**
     * 执行一次全量扫描，获取 Top N 热点 key
     */
    public List<Map.Entry<String, Integer>> scanHotKeys(int topN) {
        Map<String, Integer> freqMap = new HashMap<>();
        try (Jedis jedis = jedisPool.getResource()) {
            String cursor = "0";
            do {
                // SCAN 迭代，match 可以根据业务前缀限制 “user:*” 之类
                ScanResult<String> scanResult = jedis.scan(cursor, new ScanParams().count(SCAN_COUNT));
                cursor = scanResult.getCursor();
                List<String> keys = scanResult.getResult();

                for (String key : keys) {
                    try {
                        // 获取 LFU 估算频次，返回 0~255 之间
                        Long freqLong = (Long) jedis.objectEncode("FREQ", key); 
                        // 注意：OBJECT FREQ 在 Jedis 3.x 中没有专门封装，可用 jedis.sendCommand 或 raw 命令
                        // 也可以改成 jedis.sendCommand("OBJECT", "FREQ", key) 并强转
                        int freq = freqLong.intValue();
                        freqMap.put(key, freq);
                    } catch (Exception e) {
                        // 有些 key 可能被删除或出错，可跳过
                    }
                }
            } while (!"0".equals(cursor));
        }

        // 对 freqMap 按 value 倒序排序，取 TopN
        return freqMap.entrySet()
                .stream()
                .sorted((e1, e2) -> Integer.compare(e2.getValue(), e1.getValue()))
                .limit(topN)
                .collect(Collectors.toList());
    }
}
```

### 2.3 注意事项

- **性能考虑**：如果 Redis 实例中 key 数量非常巨大（上亿），一次全量扫描也会对 Redis 造成较大压力。可以考虑：

  1. 只对某个命名空间（比如所有 `cache:user:*`）做 SCAN，减少扫描开销；
  2. 做“增量式”扫描，每次只 scan 某个分片（如果做了 Redis Cluster），或者缩短 SCAN COUNT，分多次执行；
  3. 样本化：并不是对所有 key 都做 LFU 读取。有些 system 性能要求极高的场景，可以只随机扫描 10% 的 key，统计 Top，然后把结果上报到运维平台。

- Java 示例中，用到了 `OBJECT FREQ` 命令，这在 Jedis 3.x 里需要手动调用底层命令；如果用的是 Lettuce，请直接：

  ```java
  RedisAsyncCommands<String, String> async = redisClient.connect().async();
  RedisFuture<Long> future = async.objectFreq(key);
  ```

- **时效性**：LFU 值有衰减时间，比如 `lfu-decay-time=1`，表示每秒有 1 次衰减评估。因而一个 key 的 FREQ 值并非“全历史”，而是近似“短期热度”。这在高并发场景下基本够用。

------

## 3. 启用 Redis Keyspace Notifications，在 Java 客户端监听并统计写入事件

### 3.1 场景与思路

如果“热点”更倾向于“写操作”过于频繁（比如某个 Hash、某个列表被刷爆），可以直接启用 Redis 的 Keyspace 通知，让 Redis 在每次写操作（`SET`、`HSET`、`LPUSH` 等）发生时，向一个 Pub/Sub 频道推送事件。Java 端订阅后，把收到的事件再做统计，就是热点写 Key 了。

### 3.2 Redis 侧配置

在 `redis.conf` 或运行时配置：

```conf
# 打开 Keyspace 通知，通知类型 K（key 事件）、E（过期事件）都可以。这里我们主要关心写操作，所以 Kx（key 写入事件）
notify-keyspace-events Kgx  # g: 泛型命令（包括写命令），x: 过期命令
# 如果只想监控写操作，可配置成 "K$" 等，具体类型见官方文档
```

- `g` 表示泛型命令（包括：`DEL`、`EXPIRE`、`RENAME`、`SET`、`HSET`、`LPUSH`、`INCRBY` 等）。
- `x` 表示过期事件，如果想要实现过期回收跟踪可加上。

### 3.3 Java 端订阅示例

下面示例使用 Jedis 来订阅 `__keyevent@0__:set` 等频道，并把写操作的 key 累加到 Redis 的另一个 ZSET 或本地 Map：

```java
public class RedisKeyspaceSubscriber {
    private final JedisPool jedisPool;
    private final ExecutorService executor = Executors.newSingleThreadExecutor();
    private final RedisHotKeyTracker hotKeyTracker; // 同上，用来累加写事件

    public RedisKeyspaceSubscriber(JedisPool jedisPool, RedisHotKeyTracker hotKeyTracker) {
        this.jedisPool = jedisPool;
        this.hotKeyTracker = hotKeyTracker;
        startSubscribe();
    }

    private void startSubscribe() {
        executor.submit(() -> {
            try (Jedis jedis = jedisPool.getResource()) {
                jedis.psubscribe(new JedisPubSub() {
                    @Override
                    public void onPMessage(String pattern, String channel, String message) {
                        // pattern: __keyevent@0__:*
                        // channel: __keyevent@0__:set
                        // message: 被操作的 key 名称
                        String key = message;
                        if (key != null && !key.isEmpty()) {
                            // 只对写操作做统计（set/hset/lpush/..），不用管过期、del 等
                            hotKeyTracker.incrementKey(key);
                        }
                    }
                }, "__keyevent@0__:*");
            }
        });
    }
}
```

- **说明**
  1. `jedis.psubscribe`：使用模式订阅，监听所有 key 事件。
  2. `onPMessage` 中，`message` 就是被操作的 key 名称；如果是写操作（`set/hset/lpush`），就调用 `hotKeyTracker.incrementKey(key)`。
  3. 可以进一步在 `onPMessage` 里判断 `channel`，只处理 `__keyevent@0__:set`、`__keyevent@0__:hset`、`__keyevent@0__:lpush` 等写入事件，忽略诸如 `expire`、`del`。
  4. 订阅方式在高并发场景下也是“消息量+网络 IO”并存，需要评估订阅客户端是否成为瓶颈。可以专门配一个轻量级的消费实例去跑订阅逻辑，不要跟业务请求端挤在一台机器。

------

## 4. 解析 Redis SlowLog：找出最热的高频命令（间接找热点 Key）

### 4.1 场景与思路

当某些“慢命令”（比如 `ZRANGE`、`HGETALL`）在高并发环境下被频繁调用，也会成为热点。虽然 SlowLog 主要是“耗时慢”的命令，但如果一个写操作或读操作既耗时又频率高，它就会频繁地出现在慢日志中。我们可以定期抓取 SlowLog 日志，根据命令出现次数，逆推出“哪些 Key”最热。

### 4.2 Redis 侧配置

```conf
# 在 redis.conf 里设置，单位 microseconds，记录大于 1000 微秒（1ms）的命令
slowlog-log-slower-than 1000
slowlog-max-len 1024
```

- 可以先在开发环境或压测环境跑一下，看看典型的慢操作耗时分布，决定 `slowlog-log-slower-than` 的阈值。
- `slowlog-max-len` 表示保留日志条数上限，避免内存暴涨。

### 4.3 Java 示例：定期抓取并分析 SlowLog

```java
@Service
public class RedisSlowLogAnalyzer {
    private final JedisPool jedisPool;

    public RedisSlowLogAnalyzer(JedisPool jedisPool) {
        this.jedisPool = jedisPool;
    }

    /**
     * 分析 SlowLog，返回出现最多次 topN 的命令 + Key 列表
     */
    public List<HotCommandStat> analyzeTopSlowCommands(int topN) {
        Map<String, Integer> cmdCount = new HashMap<>(); // key 格式：命令名|被调用的 Key
   
        try (Jedis jedis = jedisPool.getResource()) {
            List<Slowlog> slowlogs = jedis.slowlogGet(128); // 获取最近 128 条慢日志
            for (Slowlog entry : slowlogs) {
                List<String> args = entry.getArgs();
                if (args.isEmpty()) continue;
                String cmd = args.get(0).toUpperCase();
                String key = args.size() > 1 ? args.get(1) : "NOKEY";
                String hashKey = cmd + "|" + key;
                cmdCount.merge(hashKey, 1, Integer::sum);
            }
        }
   
        // 排序并取 Top N
        return cmdCount.entrySet()
                .stream()
                .sorted((e1, e2) -> Integer.compare(e2.getValue(), e1.getValue()))
                .limit(topN)
                .map(e -> {
                    String[] parts = e.getKey().split("\\|", 2);
                    return new HotCommandStat(parts[0], parts[1], e.getValue());
                })
                .collect(Collectors.toList());
    }
   
    public static class HotCommandStat {
        public String command;
        public String key;
        public int count;
   
        public HotCommandStat(String command, String key, int count) {
            this.command = command;
            this.key = key;
            this.count = count;
        }
   
        @Override
        public String toString() {
            return String.format("{cmd=%s, key=%s, hits=%d}", command, key, count);
        }
    }
}
```

- **说明**
  1. `jedis.slowlogGet(128)`：获取最近 128 条慢日志，根据 Redis 配置、访问量，可以调整这个数字。
  2. `Slowlog` 对象里 `getArgs()` 返回的是原始命令数组，第一个元素固定是命令名（如 `GET`、`SET`），第二个元素一般是 key。
  3. 统计后会得到一个形如：`{cmd=GET, key=user:1234, hits=37}`，说明这条 `GET user:1234` 在慢日志里出现了 37 次。
  4. 如果某个 key 在慢日志里常出现，或者出现了大量耗时命令，就说明它就是“热点”并且直接打在 Redis 上性能不佳，需要重点关注。

------

## 5. 结合 Prometheus + Micrometer + Grafana：端到端采集 Redis Metrics

### 5.1 场景与思路

如果目前项目已经在使用微服务监控体系（Prometheus + Grafana），可以在 Java 端对每次向 Redis 发起的请求，使用 Micrometer 的计数器（`Counter`）或分布式追踪（`MeterRegistry`）直接上报。同时，Redis 本身的 Exporter 也能上报命令执行频次、延迟分布、命中率等。结合 Grafana Dashboard，就能**可视化地**看到某个 key 被调用了多少次，或者某条命令的 QPS、P50、P99 延迟。

#### 5.1.1 Java 端埋点示例（Micrometer + Jedis）

1. **引入依赖（pom.xml）**：

   ```xml
   <dependency>
     <groupId>io.micrometer</groupId>
     <artifactId>micrometer-core</artifactId>
   </dependency>
   <dependency>
     <groupId>io.micrometer</groupId>
     <artifactId>micrometer-registry-prometheus</artifactId>
   </dependency>
   ```

2. **在 Jedis 操作时加埋点**：

   ```java
   @Service
   public class JedisMetricWrapper {
       private final JedisPool jedisPool;
       private final MeterRegistry meterRegistry;
       // Counter 名称示例：redis_get_requests_total{key="user:1234"}
       private final String COUNTER_NAME = "redis_key_requests_total";
   
       public JedisMetricWrapper(JedisPool jedisPool, MeterRegistry meterRegistry) {
           this.jedisPool = jedisPool;
           this.meterRegistry = meterRegistry;
       }
   
       public String get(String key) {
           // 拿到 Counter，标签里带上 key 前缀/名称（注意大规模 key 会卡 Prometheus）
           Counter counter = Counter.builder(COUNTER_NAME)
                   .description("Redis Key Request Count")
                   .tag("key", key)
                   .register(meterRegistry);
           counter.increment();
   
           try (Jedis jedis = jedisPool.getResource()) {
               return jedis.get(key);
           }
       }
   
       public void set(String key, String value) {
           Counter counter = Counter.builder(COUNTER_NAME)
                   .description("Redis Key Request Count")
                   .tag("key", key)
                   .register(meterRegistry);
           counter.increment();
   
           try (Jedis jedis = jedisPool.getResource()) {
               jedis.set(key, value);
           }
       }
       // 其它命令同理
   }
   ```

   - **注意**：

     - **千万不要**用原始 key 作为指标标签（label），因为 Prometheus 会针对每一个不同的 key 都生成一个 time series，一旦 key 数量多就会 OOM。

     - 更合理的做法是用**业务维度**作为标签，比如切分出第一层前缀：`user`, `order`, `product` 等，避免 label 爆炸。

     - 可以在获取 key 时先按照业务规则截断：

       ```java
       String biz = key.split(":")[0]; // 取业务前缀
       Counter counter = Counter.builder(COUNTER_NAME)
               .tag("biz", biz)
               .register(meterRegistry);
       ```

3. **部署 Prometheus + Grafana**

   - 在 Prometheus 的 `prometheus.yml` 里加上 Spring Boot 应用 `/actuator/prometheus` 的抓取配置。
   - 在 Grafana 上做一些 Dashboard：
     - 按 `biz` 标签统计各业务线对 Redis 的命令次数 TopN。
     - 按命令类型（GET/SET/HGET/HSET）统计 QPS 和 P50/P99 延迟。
     - 结合 Redis Exporter（开源项目 `oliver006/redis_exporter`），把 Redis 的内置指标（命令执行次数、命中率、内存使用、客户端数）集中展示。

#### 5.1.2 Redis Exporter

- 如果已经有 Prometheus，可以直接部署 `redis_exporter`。它会暴露：
  - `redis_commands_total{cmd="get"}`, `redis_commands_duration_seconds_bucket` 等指标。
  - `redis_keys`（当前 key 数量）、`redis_evicted_keys`、`redis_memory_used_bytes` 等。
- 在 Grafana 上可以导入现成的 “Redis Overview” Dashboard，一眼看出热点 key 的 QPSCluster（不过无法显示单个 key，只能按命令维度）。

### 5.2 优势与限制

- **优势**：
  - 可以做到“**全链路监控**”：从应用侧埋点，到中间件采集，再到 Redis Exporter，可以快速定位热点。
  - 数据可视化程度高，报警规则容易配置。
- **限制**：
  - 如果想知道“某个 key”到底是热点，就必须有办法把 key 维度纳入指标标签，容易导致标签爆炸。一般做法是只展示“业务前缀”下的访问情况。
  - 如果真要把每个 key 都拿出来统计，得先在应用侧做打点累积和批量上报，或者沿用第 **1** 节的方法，把统计做在 Redis 里。

------

## 6. 基于 Proxy/中间件：使用 Redis Proxy（如 Twemproxy）或基于 LUA 脚本的热点采集

### 6.1 Twemproxy + Redis Stats

1. **场景**：
   - 业务已经在 Redis Cluster 或 Sentinel 上面加了一层 Proxy（如 Twemproxy、codis），那么可以在 Proxy 层做流量采样。
   - Twemproxy 可以统计每个请求的命中率、QPS、LT（latency）。如果某个 key 在 Proxy 那层被 hit 特别多，就能排出日志，甚至可以扩展 Twemproxy 插件，把 key 写入到队列中做离线分析。
2. **局限**：
   - Twemproxy 不会默认把**具体的 key**上报到它的监控模块，它更多是关注命令类型、客户端 IP、延迟。要拿到“具体哪个 key 最热”，就需要自己 patch Twemproxy 源码，或者在 Proxy 周边做抓包/解析，这门槛比较高。
   - 不如直接在业务层做埋点灵活。

### 6.2 基于 LUA 脚本的自增计数

如果想在 Redis 一侧就同时“读/写 + 计数”，可以在 Redis 里写一个 LUA 脚本，脚本一方面执行业务命令（比如 `GET key`），另一方面在一个 Dedicated ZSET 里给这个 key +1。然后所有业务代码都改为“调用这个 LUA 脚本”。

以下示例演示对每次 `GET` 调用都自增计数，并返回真正的 value：

```lua
-- Lua 脚本：hot_get.lua
local key = KEYS[1]
local hotKeyZSet = "hotkey:counter"     -- 全局排序集合
local value = redis.call("GET", key)    -- 真正的 GET 操作
if value then
    -- 访问命中时，才记录
    redis.call("ZINCRBY", hotKeyZSet, 1, key)
    redis.call("EXPIRE", hotKeyZSet, 86400)  -- 24h 过期（可选）
end
return value
```

然后 Java 端这样调用：

```java
public class RedisLuaHotGet {

    private final JedisPool jedisPool;
    private final String hotGetScriptSha;

    public RedisLuaHotGet(JedisPool jedisPool) {
        this.jedisPool = jedisPool;

        // 加载脚本，返回 SHA1
        try (Jedis jedis = jedisPool.getResource()) {
            String script = "local key = KEYS[1] \n" +
                    "local hotKeyZSet = \"hotkey:counter\" \n" +
                    "local value = redis.call(\"GET\", key) \n" +
                    "if value then \n" +
                    "    redis.call(\"ZINCRBY\", hotKeyZSet, 1, key) \n" +
                    "    redis.call(\"EXPIRE\", hotKeyZSet, 86400) \n" +
                    "end \n" +
                    "return value";
            this.hotGetScriptSha = jedis.scriptLoad(script);
        }
    }

    /**
     * 用 Lua 脚本来做 GET + 计数
     */
    public String hotGet(String key) {
        try (Jedis jedis = jedisPool.getResource()) {
            Object res = jedis.evalsha(hotGetScriptSha, 1, key);
            return res != null ? res.toString() : null;
        }
    }

    /**
     * 同理可以写一个 hotSet、hotHGet、hotHSet 的脚本…… 
     */
}
```

- **优点**
  - 计数和业务逻辑在同一条 TX 执行，原子性强，不用担心“GET”和“ZINCRBY”之间出错漏。
  - 完全在 Redis 侧完成，业务层仅需调用一次脚本接口即可，无需单独 AOP/拦截器。
- **缺点**
  - 业务量超大时，脚本体积大、调用次数多也会让 Redis CPU 飙升。LUA 脚本不宜太长，且不要做过于复杂的逻辑。
  - 如果想对 `HGET key field` 这类命令拆分为 `HGET` + 计数，还要改写更多脚本。

------

## 7. 实践要点与对比

| 方法                              | 作用域                       | 实现难度 | 实时性                            | 对 Redis 影响                    | 对 Java 影响                        | 适合场景                                              |
| --------------------------------- | ---------------------------- | -------- | --------------------------------- | -------------------------------- | ----------------------------------- | ----------------------------------------------------- |
| 应用侧 AOP/拦截器 + ZSET 统计     | 业务层所有读写               | ★★☆☆☆    | 实时                              | 额外产生 `ZINCRBY` 请求          | AOP 埋点，维护成本低                | 需要精准业务 key 访问排行；运维可视化                 |
| Redis LFU + SCAN                  | 直接用 Redis 内部 LFU 近似值 | ★★★☆☆    | 近实时（DISC/DECAY）              | 全量或分片 SCAN 消耗             | 周期性扫描，CPU、网络消耗中等       | Redis key 总量不算特别大，想快速了解整体热点（近似）  |
| Keyspace Notification + ZSET 统计 | 监控写操作事件               | ★★★☆☆    | 实时                              | 产生 Pub/Sub 额外开销；ZINCRBY   | 订阅开销，需要单独线程              | 写入型热点（比如抢购、订单并发写）明显时              |
| SlowLog 频次解析                  | 辅助发现慢操作频繁的 key     | ★★☆☆☆    | 非实时（取决于 slowlogPoll 间隔） | 只读 slowlog，不影响正常操作     | 定时任务取慢日志，适度调用          | 排查“耗时稍长且频繁”命令；问题排查场景                |
| Prometheus + Micrometer 埋点      | 可视化端到端监控             | ★★★☆☆    | 实时 / 几秒级                     | 导致一定网络（Metrics Push）消耗 | 要避免 Label 爆炸，需按业务前缀统计 | 已有监控体系，想结合 APM 问题定位                     |
| Lua 脚本嵌入                      | 在 Redis 端原子计数          | ★★★★☆    | 实时                              | Redis 端 CPU 占用上升            | Java 端改脚本调用                   | 业务逻辑简单，想把统计合并到 Redis 端；对原子性要求高 |

------

## 8. 总结与建议

1. **落地优先级推荐**
   - **首选：应用侧 AOP/拦截器 + ZSET 统计**
     - 最灵活，业务代码改动少，只要统一了 Jedis/Lettuce 封装，就能立刻累计数据。
     - 热点信息写到 Redis，自身可复用性高；运维拿到 Top N 后，可基于 key 名称进一步分析。
   - **次选：Redis LFU + SCAN**
     - 如果希望“零改造”或担心 AOP 带来的埋点复杂度，可先在 Redis 端启用 LFU，再配合 Java 定时 SCAN 来统计。
     - 这样无须侵入业务，但前提是 Redis key 总量要在可承受范围内。
   - **再选：Keyspace 通知 + ZSET**
     - 写热点特别严重的场景适用，比如抢单、扣库存、订单入库等写操作极端密集时；应用侧盗用 AOP 可能捕获不到底层的 pipeline 操作，这时候用 Keyspace 通知更保险。
   - **辅助选项：SlowLog + Prometheus 监控**
     - 作为“事后补充”手段，用来排查性能瓶颈或频繁的慢操作，不能替代前面几种实时发现的方法。
     - 如果已经在 Prometheus 里埋点了，也可以对业务前缀做按秒级别的计数，但要特别注意**Label 爆炸**的问题。
2. **关于高并发下的额外性能消耗**
   - 任何一种“统计方案”本质上都会增加额外的读写（或扫描）压力，要根据系统吞吐量来衡量：
     1. 如果 QPS 在 1w/s 左右，使用 AOP + ZSET 附加的每次 `ZINCRBY` 性能开销基本可接受。
     2. 如果 QPS 突破 10w/s，建议改成“本地累加 → 定时批量写入”的方式，或者抽样 10% 的请求做统计，降低压力。
     3. SCAN 方案在 key 数非常多时会拖慢 Redis，必要时要做分片、分时段扫描。
   - 监控侧的**报警阈值**需要结合实际环境逐步调优，不能盲目抄别人指标。
3. **选用策略要点**
   - 先搞清楚要解决的到底是哪种“热点”：
     - **读热点**（GET/HGET/LRANGE 等频繁访问）？
     - **写热点**（SET/HSET/LPUSH/INCRBY 等并发写入）？
     - **慢操作热点**（单次操作耗时过长 + 调用频次高）？
   - 如果是“读热点”：推荐 **第 1 节**（应用侧 AOP）和 **第 2 节**（LFU）结合。
   - 如果是“写热点”：推荐 **第 1 节**（AOP）或 **第 3 节**（Keyspace 通知）。
   - 如果想最大化减少业务代码改造，并行承受一些扫描开销，可直接启用 LFU → 周期性 SCAN。

------

### 结语

高并发系统里，Redis 热点 key 一旦形成，很容易成为性能瓶颈。我们往往要**先发现**再去**解决**（如加本地缓存、分库分表、限流降级等），否则盲目扩容或增加机器也只能“头痛医头，脚痛医脚”。上面介绍的几种**具体可落地**的方案，涵盖了从“零改造→完全改造”不同的取舍。我们可以从**应用侧埋点** → **LFU 扫描** → **Keyspace 通知** → **SlowLog 分析** → **监控体系打点**依次尝试，选择最适合自己业务的组合。
