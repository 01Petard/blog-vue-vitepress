# 总结Spring中的重要但不常用注解

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202508252131684.jpeg" alt="缓存注解" style="zoom:50%;" />

## 1. 缓存相关注解示例

**缓存相关注解**

- **`@Cacheable`**：标记方法的结果应该被缓存，当下次以相同参数调用该方法时，直接返回缓存的结果，而不再执行方法体，可用于提高数据查询效率，减少对数据库等资源的访问。
- **`@CacheEvict`**：用于触发缓存数据的清除操作，可以指定要清除的缓存名称和对应的键，在数据被删除等场景下，能及时清理缓存，保证缓存数据与实际数据一致。
- **`@CachePut`**：标记方法的结果会被放入缓存，但不会阻止方法本身的执行，常用于数据更新场景，既更新了实际数据，又同步更新了缓存。

```java
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    
    // 查询用户时缓存结果，缓存名称为"user"，键为用户ID
    @Cacheable(value = "user", key = "#id")
    public User getUserById(Long id) {
        // 实际查询数据库的逻辑
        return userRepository.findById(id);
    }
    
    // 更新用户时更新缓存
    @CachePut(value = "user", key = "#user.id")
    public User updateUser(User user) {
        // 实际更新数据库的逻辑
        return userRepository.save(user);
    }
    
    // 删除用户时清除缓存
    @CacheEvict(value = "user", key = "#id")
    public void deleteUser(Long id) {
        // 实际删除数据库记录的逻辑
        userRepository.deleteById(id);
    }
}
```

## 2. 定时任务注解示例

**定时任务注解**

- **`@Scheduled`**：标记方法应按计划定期执行，可通过参数（如 `fixedRate`）指定执行的频率等，用于实现定时任务，比如定时生成报表、定时清理数据等。

```java
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class ScheduledTask {
    
    // 每5秒执行一次
    @Scheduled(fixedRate = 5000)
    public void printCurrentTime() {
        System.out.println("当前时间：" + System.currentTimeMillis());
    }
    
    // 每天凌晨2点执行
    @Scheduled(cron = "0 0 2 * * ?")
    public void cleanExpiredData() {
        // 清理过期数据的逻辑
        System.out.println("清理过期数据完成");
    }
}

// 需要在配置类上开启定时任务支持
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableScheduling
public class SchedulingConfig {
}
```

## 3. 异步执行注解示例

**异步执行相关注解**

- **`@Async`**：标记方法在单独的线程中异步执行，不会阻塞调用线程，能提高系统的并发处理能力，常用于执行耗时的操作，如调用远程服务、进行复杂计算等。
- **`@EnableAsync`**：用于启用 Spring 的异步方法执行功能，需要配合 `@Async` 使用，一般在配置类上添加该注解，以开启异步执行的支持。

```java
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class AsyncService {
    
    // 异步执行文件导出
    @Async
    public void exportLargeFile() {
        // 耗时的文件导出逻辑
        System.out.println("开始导出大文件...");
        // 模拟耗时操作
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("大文件导出完成");
    }
}

// 需要在配置类上开启异步支持
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableAsync
public class AsyncConfig {
}
```

这些代码片段直观展示了各个注解的典型用法：缓存注解用于优化数据访问，定时任务注解用于规划任务执行时机，异步注解用于实现非阻塞的并发操作。使用时需注意，相关功能（如缓存、定时任务、异步）需要通过对应的`@EnableXXX`注解开启支持。