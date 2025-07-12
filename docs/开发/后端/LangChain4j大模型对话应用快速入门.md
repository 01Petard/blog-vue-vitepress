# LangChain4j大模型对话应用快速入门

这是一个基于 LangChain4j 框架的简单示例项目，展示如何快速构建一个与大模型进行对话的 Java 应用。

## 项目简介

本项目使用 LangChain4j 框架集成阿里云通义千问大模型，实现简单的对话功能。LangChain4j 是一个用于构建 LLM 驱动应用程序的 Java 框架，提供了简洁的 API 来与各种大模型进行交互。

## 技术栈

- Java
- Maven
- LangChain4j
- 阿里云通义千问

## 快速开始

### 1. 环境要求

- JDK 17
- Maven 3.8 或更高版本

### 2. 配置 API Key

将 API Key 替换为你自己的：

```java
.apiKey("Bearer sk-e47bfe79746d4fe48adeb2XXXXXXXX")
```

**获取 API Key 的步骤：**

1. 访问 [阿里云百炼平台](https://bailian.console.aliyun.com/?tab=api#/api/?type=model&url=https%3A%2F%2Fhelp.aliyun.com%2Fdocument_detail%2F2712576.html)
2. 注册并登录账号
3. 在控制台中创建 API Key
4. 将获取的 API Key 替换到代码中

### 3. 引入依赖

```xml
  <dependencies>
    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>3.8.1</version>
      <scope>test</scope>
    </dependency>
    <!--langchain4j依赖-->
    <dependency>
      <groupId>dev.langchain4j</groupId>
      <artifactId>langchain4j-open-ai</artifactId>
      <version>1.0.1</version>
    </dependency>
    <!--logback依赖-->
    <dependency>
      <groupId>ch.qos.logback</groupId>
      <artifactId>logback-classic</artifactId>
      <version>1.5.18</version>
    </dependency>
    <dependency>
      <groupId>dev.langchain4j</groupId>
      <artifactId>langchain4j-open-ai</artifactId>
      <version>1.1.0</version>
    </dependency>
  </dependencies>
```

## 代码说明

### 核心代码结构

```java
// 构建 OpenAiChatModel 对象
OpenAiChatModel model = OpenAiChatModel.builder()
    .baseUrl("https://dashscope.aliyuncs.com/compatible-mode/v1")  // 通义千问兼容接口
    .apiKey("Bearer your-api-key")                                 // API密钥
    .modelName("qwen-plus")                                        // 模型名称
    .logRequests(true)                                             // 记录请求日志
    .logResponses(true)                                            // 记录响应日志
    .build();

// 发送消息并获取回复
String result = model.chat("你的问题");
System.out.println(result);
```

### 主要配置参数

- `baseUrl`: 通义千问的兼容接口地址
- `apiKey`: 你的 API 密钥（需要加 "Bearer " 前缀）
- `modelName`: 使用的模型名称（如 qwen-plus、qwen-turbo 等）
- `logRequests/logResponses`: 是否记录请求和响应日志，便于调试

## 扩展功能

### 1. 支持流式对话

```java
model.streamingChat("你的问题")
    .onNext(System.out::print)
    .onComplete(System.out::println)
    .onError(Throwable::printStackTrace)
    .start();
```

### 2. 添加对话历史

```java
List<ChatMessage> messages = new ArrayList<>();
messages.add(UserMessage.from("你好"));
messages.add(AiMessage.from("你好！有什么可以帮助你的吗？"));
messages.add(UserMessage.from("介绍一下你自己"));

Response<AiMessage> response = model.chat(messages);
```

### 3. 自定义参数

```java
OpenAiChatModel model = OpenAiChatModel.builder()
    .baseUrl("https://dashscope.aliyuncs.com/compatible-mode/v1")
    .apiKey("Bearer your-api-key")
    .modelName("qwen-plus")
    .temperature(0.7)        // 控制回答的随机性
    .maxTokens(1000)         // 最大输出长度
    .topP(0.9)              // 核采样参数
    .build();
```

