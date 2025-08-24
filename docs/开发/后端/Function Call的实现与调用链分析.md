# Function Call 调用链分析

## 1. 背景

AI 本身不具备实时消息能力，例如问「现在北京的天气是什么」，模型并不知道，需要通过 **接口调用（Function Call）** 来让 AI 获取结果。

整体流程：

1. 用户输入问题
2. 模型识别需要调用的函数
3. 系统调用本地/远程方法获取结果
4. 返回结果交给 AI，AI 组织自然语言输出

------

## 2. 实现步骤

### 2.1 发送消息时指定 Function

```java
ChatResponse response = chatClient.call(new Prompt(
    List.of(userMessage),
    OpenAiChatOptions.builder()
        .withFunction("getWaitTime") // 指定函数
        .build()
));
```

------

### 2.2 定义函数 Bean

```java
@Bean
public Function<WaitTimeService.Request, WaitTimeService.Response> getWaitTime() {
    return new WaitTimeService();
}
```

------

### 2.3 在函数实现中处理参数

```java
@Override
public Response apply(Request request) {
    String name = request.name();
    String location = request.location();
    // 业务逻辑 ...
    return new Response(location + "有10个！");
}

public record Request(String name, String location) {}
public record Response(String weather) {}
```

AI 会将请求参数映射到 `Request`，执行逻辑后返回 `Response`，再交回给模型生成自然语言答案。

------

## 3. 执行流程

1. **调用 call 方法**
   - 内部会构造 `ChatCompletionRequest`
   - 其中包含 `tools` 参数（即 function 描述）

```java
ChatCompletionRequest request = createRequest(prompt, false);
```

参考：[OpenAI Chat API - tools](https://platform.openai.com/docs/api-reference/chat/create#chat-create-tools)

------

1. **执行远程请求**
   - 调用 `callWithFunctionSupport`
   - 两个关键步骤：
     1. `doChatCompletion(request)`
         请求 OpenAI 接口，返回需要调用的函数名和参数
     2. `handleFunctionCallOrReturn(...)`
         执行本地 Function Callback

------

1. **Function Callback 流程**
   - 从返回结果中解析出 arguments
   - 将 JSON 转换为对象，调用 `WaitTimeService.apply`
   - 返回结果再次交给模型
   - 模型最终生成自然语言回答

------

## 4. 整体调用链

1. `chatClient.call(Prompt)`
2. → `createRequest` 组装请求（含 function）
3. → `doChatCompletion` 调用远程接口，获取函数调用意图
4. → `handleFunctionCallOrReturn` 调用本地函数并获取结果
5. → 再次请求大模型生成最终响应

------

## 5. 关键点总结

- **withFunction**：声明需要暴露的函数名
- **Bean 定义 Function**：Spring 容器中注册函数
- **apply(Request)**：接收模型传入的参数并处理
- **Response 再交给模型**：最终由 AI 组织自然语言
