# Spring AI 中的 Advisor 到底是干什么的？

> 本文章内容基于SpringBoot 4.1.1 + Spring AI 2.0.1进行撰写。

最近在用 Spring AI 的 `ChatClient` 时，经常能看到这种写法：

```java
chatClient.prompt()
        .user(question)
        .advisors(...)
        .call();
```

这里的 `Advisor` 一开始很容易让人迷惑：它到底负责什么？

可以简单理解成：**Advisor 是挂在 ChatClient 调用链上的一层处理逻辑。**

它可以在请求发给模型之前处理请求，也可以在模型返回之后处理响应。

常见用途主要有下面几种。

## 1. 对话记忆

LLM API 本身没有会话状态。

比如：

```text
用户：我叫小黄
```

下一次请求：

```text
用户：我叫什么？
```

如果只把第二句话发给模型，它并不知道前面发生过什么。

`MessageChatMemoryAdvisor` 会读取历史消息，再把历史消息和当前问题一起交给模型：

```text
当前问题
   +
历史消息
   ↓
 Prompt
   ↓
 ChatModel
```

这样业务代码就不用每次自己处理：

```java
chatMemory.get(...)
```

然后再手动拼 Prompt。

---

## 2. RAG

RAG 也是 Advisor 很典型的使用场景。

例如：

```java
QuestionAnswerAdvisor
```

大致流程：

```text
用户问题
   ↓
Advisor
   ↓
VectorStore.similaritySearch()
   ↓
相关文档
   ↓
加入 Prompt
   ↓
ChatModel
```

业务代码可以直接写：

```java
chatClient.prompt()
        .user(question)
        .advisors(questionAnswerAdvisor)
        .call();
```

而不用每次都自己写：

```java
vectorStore.similaritySearch(...);

String context = ...;

systemPrompt += context;

chatClient.prompt()...
```

Spring AI 里常见的 RAG Advisor 包括：

```java
QuestionAnswerAdvisor
RetrievalAugmentationAdvisor
```

---

## 3. 日志

比如：

```java
SimpleLoggerAdvisor
```

可以统一记录请求和响应信息，例如：

```text
Prompt
模型参数
模型响应
```

这样就不用在每个 `chatClient.prompt()` 外面重复写日志代码。

---

## 4. 安全检查

Advisor 也不一定非得调用模型。

例如：

```java
SafeGuardAdvisor
```

可以在模型调用之前检查用户输入：

```text
用户问题
   ↓
安全检查
   ↓
不允许 ──→ 直接阻断

允许
   ↓
ChatModel
```

所以 Advisor 不只是“增强 Prompt”。

它也可以修改请求、阻止请求，甚至直接抛异常。

---

## 5. Tool Calling

Tool Calling 也可以通过 Advisor 接管。

例如：

```java
ToolCallingAdvisor
ToolSearchToolCallingAdvisor
```

假设用户问：

```text
现在杭州几点？
```

调用过程可能是：

```text
用户问题
   ↓
ToolCallingAdvisor
   ↓
模型决定调用 getCurrentTime
   ↓
执行工具
   ↓
ToolResult 加回对话
   ↓
再次调用模型
   ↓
最终回答
```

也就是说，工具调用过程中那套：

```text
模型 → Tool → 模型
```

的循环，可以交给 Advisor 处理。

## 总结

所以在 Spring AI 里，可以把 Advisor 看成 `ChatClient` 调用链上的扩展点。

像下面这些能力：

```text
对话记忆
RAG
日志
安全检查
Tool Calling
```

都可以通过 Advisor 插入到模型调用过程中。

如果类比 Spring Web，感觉上有点像：

```text
Interceptor / Filter
```

只是它处理的对象不是 HTTP 请求，而是 AI 请求、Prompt、上下文和模型响应。