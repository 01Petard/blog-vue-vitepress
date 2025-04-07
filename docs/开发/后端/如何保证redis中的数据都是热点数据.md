# 如何保证redis中的数据都是热点数据

> 又是一道经典的面试题……

## **问题本质：**

如何让Redis精准淘汰“冷数据”，长期保留“热数据”？

以下数据暴露核心矛盾：

- Redis内存成本太高
- 80%请求集中在20%数据居（二八法则）
- 热点数据动态变化 (如突发新闻、秒杀商品)

为了确保Redis中存储的数据均为热点数据，可以结合以下策略进行设计：

为了确保Redis中存储的数据均为热点数据，并实现精准淘汰“冷数据”，可以采用以下策略进行设计和优化：

## 1. 选择合适的内存淘汰策略
- **推荐策略**：
  - `allkeys-lru`（最近最少使用）：适合需要保留频繁访问数据的场景。
  - `allkeys-lfu`（最不经常使用）：适用于访问次数差异较大的场景，能够更好地识别出稳定的热点数据。

配置示例（在`redis.conf`中设置）：
```conf
maxmemory 20gb  # 根据实际需求调整
maxmemory-policy allkeys-lru  # 或者使用allkeys-lfu
```

## 2. 控制数据加载方式
- **惰性加载**：仅当请求到达时从持久化存储（如MySQL）加载数据到Redis。这样，只有被请求的数据才会被缓存，有助于形成热点数据。

  ```java
  public String getData(String key) {
      // 从 Redis 中获取数据
      String data = redis.get(key);
      
      // 如果 Redis 中没有命中（数据为空）
      if (data == null) {
          // 从 MySQL 数据库中查询数据
          data = mysql.query("SELECT * FROM table WHERE key = ?", key);
          
          // 将数据写入 Redis，并设置合理的过期时间（TTL）
          redis.setex(key, ttl, data);  // ttl 是过期时间，单位通常是秒
      }
      
      // 返回数据
      return data;
  }
  ```

- **过期时间（TTL）设置**：为每个缓存项设置合理的过期时间，以保证即使没有被访问的数据也能够在一定时间后自动清除，释放空间。

## 3. 监控与动态调整
- 使用Redis的`INFO`命令或监控工具（如Prometheus）来监控缓存命中率、淘汰键数量等指标。根据这些数据动态调整内存大小或淘汰策略。

  <img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202504062025839.png" style="zoom:60%;" />

- 在业务高峰期或低谷期灵活切换LRU/LFU策略或调整最大内存限制。

## 4. 其他优化手段
- **缓存预热**：在业务低峰期预先将可能成为热点的数据加载进Redis，以减少响应时间和数据库压力。

  ```java
  public void preheatCache() {
      // 获取昨日 Top 20 万热点数据
      List<String> hotItems = mysql.query("""
          SELECT item_id
          FROM access_log
          WHERE date = CURDATE() - INTERVAL 1 DAY
          GROUP BY item_id
          ORDER BY COUNT(*) DESC
          LIMIT 200000
      """);
  
      // 批量写入 Redis
      Pipeline pipeline = redis.pipeline();
      for (String itemId : hotItems) {
          String data = mysql.get(itemId);
          pipeline.setex(itemId, 86400, data);  // 缓存 24 小时
      }
      pipeline.sync();  // 执行管道操作
  }
  ```

- **分层缓存**：对于特别热门的数据，可以在应用层面增加一层本地缓存（如Caffeine），减少对Redis的压力。

  ```java
  import com.github.benmanes.caffeine.cache.Caffeine;
  import java.util.concurrent.TimeUnit;
  
  public class TwoLevelCache {
  
      // Caffeine本地缓存（第一级）
      private LoadingCache<String, Object> localCache = Caffeine.newBuilder()
              .maximumSize(1000)
              .expireAfterWrite(30, TimeUnit.SECONDS)
              .build(key -> {
                  // Redis查询（第二级）
                  Object val = redis.get(key);
                  if (val == null) {
                      val = mysql.get(key);
                      redis.setex(key, 3600, val); // 回填Redis
                  }
                  return val;
              });
  
      public Object getData(String key) {
          return localCache.get(key);
      }
  
      // 假设的Redis操作方法
      private Object redisGet(String key) {
          // 实现Redis获取数据的方法
          return null;
      }
  
      // 假设的MySQL操作方法
      private Object mysqlGet(String key) {
          // 实现MySQL获取数据的方法
          return null;
      }
  
      // 假设的Redis设置过期时间方法
      private void redisSetex(String key, int seconds, Object value) {
          // 实现Redis设置过期时间的方法
      }
  }
  ```

## 总结
- **核心配置**：`allkeys-lru` / `allkeys-lfu` + `maxmemory`。
- **辅助手段**：惰性加载、TTL过期、监控与预热。
- **效果**：Redis自动淘汰冷数据，高频访问的热点数据长期驻留缓存，命中率显著提升。