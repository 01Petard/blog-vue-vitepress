# 🌈 Java 日志彩色输出 + Logback 配置实战指南

## ✅ 什么是 ANSI 转义序列？

ANSI 转义序列（ANSI Escape Code）用于在终端中控制文本的样式，比如颜色、粗体、背景色等。以 `\u001B[` 开头，后接控制码，以 `m` 结尾。

### 🖍 常用颜色控制码

#### 前景色（文字颜色）

| 控制码 | 颜色       |
| ------ | ---------- |
| 30     | 黑色       |
| 31     | 红色       |
| 32     | 绿色       |
| 33     | 黄色       |
| 34     | 蓝色       |
| 35     | 洋红（紫） |
| 36     | 青色       |
| 37     | 白色       |

#### 背景色

| 控制码 | 颜色     |
| ------ | -------- |
| 40     | 黑色背景 |
| 41     | 红色背景 |
| 42     | 绿色背景 |
| 43     | 黄色背景 |
| 44     | 蓝色背景 |
| 45     | 洋红背景 |
| 46     | 青色背景 |
| 47     | 白色背景 |

#### 样式控制

| 控制码 | 效果         |
| ------ | ------------ |
| 1      | 加粗         |
| 3      | 斜体         |
| 4      | 下划线       |
| 9      | 删除线       |
| 7      | 前景背景反转 |

## 📌 示例代码

```java
// 黄色背景 + 黑色文字
LOGGER.info("\u001B[43;30m【配置初始化】Redis 配置加载完成\u001B[0m");

// 加粗绿色文字
LOGGER.info("\u001B[1;32m操作成功\u001B[0m");

// 红色背景 + 蓝色文字
LOGGER.info("\u001B[41;34m发生错误\u001B[0m");
```

## 🧠 高级用法

- **亮色支持**：前景色 `90~97`，背景色 `100~107`

- **256 色支持**：

    - 前景：`\u001B[38;5;<n>m`
    - 背景：`\u001B[48;5;<n>m`

- **真彩色（RGB）**：

  ```java
  \u001B[38;2;255;0;0m // 红色前景
  \u001B[48;2;0;0;255m // 蓝色背景
  ```

## ⚠ 注意事项

- ✅ 适用于控制台/终端调试日志，提升可读性
- ❌ 不推荐用于写入日志文件，会出现乱码
- Windows 旧终端可能不支持 ANSI，需要用新版 Windows Terminal

## ✅ 总结

> ANSI 转义序列让你用一行代码就能为日志加上颜色、样式和背景，是终端调试的视觉神器，但别用于生产日志文件中！

# 🔍 日志级别梳理

| 级别    | 含义                       | 使用场景                          |
| ------- | -------------------------- | --------------------------------- |
| `ERROR` | 致命错误，程序无法继续运行 | 异常未捕获、数据库连接失败等      |
| `WARN`  | 警告信息，潜在问题         | 参数异常但不影响流程、降级处理    |
| `INFO`  | 普通信息，关键业务流程     | 请求开始/结束、任务调度、服务启动 |
| `DEBUG` | 调试信息，用于开发排查     | 变量值、条件判断、执行路径        |
| `TRACE` | 最详细的日志，记录所有细节 | 方法入口/出口、参数对象详情       |

## 🧾 Logback 日志格式解析

```
[%green(%-40.40logger{40})]
```

用于控制台打印日志类名部分的样式和格式，详解如下：

| 表达式              | 含义                               |
| ------------------- | ---------------------------------- |
| `%logger`           | 日志记录器名称（类名）             |
| `{40}`              | 最多显示 40 字符，截断保留尾部     |
| `%-40.40logger{40}` | 左对齐 + 保留尾部，推荐用法        |
| `%green(...)`       | 颜色包装，绿色显示，仅在控制台生效 |

## ✏️ 示例输出

```log
[com.example.service.UserService      ] 用户登录成功
[com.example.task.JobExecutor        ] 任务执行失败
```

## 🧩 推荐 logback-spring.xml 配置片段

```xml
<property name="LOG_PATTERN_DEV" value="[%d{HH:mm:ss.SSS}] [%highlight(%-5level)] [%blue(%-22.22X{traceId})] [%cyan(%-16.16thread)] [%green(%-40.40logger{40})] %msg%n"/>
<logger name="com.your.package" level="DEBUG"/>

<appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
    <encoder>
        <pattern>${LOG_PATTERN_DEV}</pattern>
        <charset>UTF-8</charset>
    </encoder>
</appender>
```

## ✅ Java ANSI 日志工具类：AnsiColorUtils

```java
public class AnsiColorUtils {

    private static final String PREFIX = "\u001B[";
    private static final String SUFFIX = "m";
    private static final String RESET = "\u001B[0m";

    public static final String BLACK = "30";
    public static final String RED = "31";
    public static final String GREEN = "32";
    public static final String YELLOW = "33";
    public static final String BLUE = "34";
    public static final String MAGENTA = "35";
    public static final String CYAN = "36";
    public static final String WHITE = "37";

    public static final String BG_BLACK = "40";
    public static final String BG_RED = "41";
    public static final String BG_GREEN = "42";
    public static final String BG_YELLOW = "43";
    public static final String BG_BLUE = "44";
    public static final String BG_MAGENTA = "45";
    public static final String BG_CYAN = "46";
    public static final String BG_WHITE = "47";

    public static final String BOLD = "1";
    public static final String UNDERLINE = "4";
    public static final String REVERSE = "7";

    public static String format(String text, String... styles) {
        String styleCode = String.join(";", styles);
        return PREFIX + styleCode + SUFFIX + text + RESET;
    }

    public static String success(String msg) {
        return format(msg, GREEN);
    }

    public static String error(String msg) {
        return format(msg, RED, BOLD);
    }

    public static String warning(String msg) {
        return format(msg, YELLOW);
    }

    public static String init(String msg) {
        return format(msg, BG_GREEN, BLACK);
    }

    public static String info(String msg) {
        return format(msg, BG_CYAN, BLACK);
    }

    public static String highlight(String msg) {
        return format(msg, BG_YELLOW, BLACK);
    }
}
```

## ✅ 示例使用

```java
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class TestAnsiLog {

    public static void main(String[] args) {
        log.info(AnsiColorUtils.init("【初始化】系统配置加载完成"));
        log.info(AnsiColorUtils.info("【信息】系统初始化完成"));
        log.warn(AnsiColorUtils.warning("【警告】配置文件缺失，使用默认配置"));
        log.error(AnsiColorUtils.error("【错误】数据库连接失败"));
        log.debug(AnsiColorUtils.success("【成功】连接已建立"));
        log.info(AnsiColorUtils.highlight("【高亮】Redis 配置加载完成"));
    }
}
```

## 🎨 效果预览

> 终端中将显示彩色日志，不同颜色快速分辨不同类型输出。

![ANSI Color Log Example](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/image-20250704153402685.png)