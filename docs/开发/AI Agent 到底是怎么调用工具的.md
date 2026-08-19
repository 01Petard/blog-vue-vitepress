# AI Agent 工具调用全链路解析

> 参考：[10分钟讲清楚 Prompt, Agent, MCP 是什么](https://www.bilibili.com/video/BV15mMVzTEor)

## 核心思路

大模型可以理解用户的问题，也可以判断“下一步应该调用什么工具”，但它**不会直接执行方法函数、查询数据库或者访问外部系统**。

真正执行这些操作的是 Agent 所在的宿主程序。

如果再引入 MCP，那么整个过程可以简单理解为：

```text
LLM：决定要干什么
Agent：负责流程编排
Function Calling：描述要调用什么工具
MCP：负责连接外部工具
MCP Server：真正提供工具能力
```

例如用户问：

> 女朋友肚子疼怎么办？

模型认为需要查询外部资料，于是请求调用 `web_browse`。真正访问网页的不是模型，而是 Agent 通过 MCP Server 执行 `web_browse`。

## 一、链路中的角色

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202608161845465.jpeg" alt="AI Agent 工具调用链路" style="zoom:33%;" />

| 角色 | 作用 |
|---|---|
| 用户 | 提出自然语言问题 |
| **AI Agent** | 整个流程的编排者，负责调用模型、执行 Tool Call、处理 Tool Result |
| **LLM** | 理解问题、判断是否需要工具、生成工具调用参数、生成最终回答 |
| **MCP Client** | 连接 MCP Server，发现和调用 MCP Tool |
| **MCP Server** | 向外暴露工具、资源等能力 |
| **Tool** | 真正执行某项操作，例如查天气、访问网页、查询数据库 |

在图里的场景中，Agent 同时承担了 **MCP Client** 的角色。

MCP Server 会告诉 Client 自己有哪些工具，例如：

```json
{
  "name": "web_browse",
  "description": "访问网页",
  "inputSchema": {
    "url": "string"
  }
}
```

可以把它理解成一个 **Tool Schema / 工具契约**：

```text
工具叫什么
能干什么
需要哪些参数
参数是什么类型
```

---

## 二、完整调用流程

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202608161845003.jpeg" alt="AI Agent 工具调用流程" style="zoom:33%;" />

### 1. 用户向 Agent 提问

用户输入：

```text
女朋友肚子疼怎么办？
```

请求首先进入 Agent。

```text
User
  ↓
Agent
```

Agent 是整个链路的入口。

---

### 2. Agent 获取可用工具

Agent 中的 MCP Client 与 MCP Server 建立连接，并获取服务端提供的工具列表。

例如 MCP Server 提供：

```text
web_browse(url: string)
```

这一步可以理解为：

```text
Agent
  ↓
MCP Client
  ↓
MCP Server
  ↓
有哪些 Tool 可以使用？
```

MCP 把工具发现和调用方式标准化了。

Agent 不需要关心 `web_browse` 背后究竟是：

```text
HTTP API
Python
Node.js
Java
浏览器自动化
第三方 SaaS
```

只要双方遵守 MCP 定义的协议即可。

---

### 3. Agent 把 Prompt 和 Tool 定义交给模型

Agent 调用 LLM 时，不只是把用户的问题发送过去。

大致相当于同时告诉模型：

```text
用户问题：

女朋友肚子疼怎么办？

目前可使用的工具：

web_browse
描述：访问网页
参数：
    url: string
```

于是模型除了可以直接回答，还多了一种选择：

```text
需要外部信息
    ↓
调用 web_browse
```

---

### 4. LLM 生成 Tool Call

如果模型认为需要访问网页，它会返回一个结构化的工具调用请求。

例如：

```json
{
  "type": "call",
  "name": "web_browse",
  "args": {
    "url": "https://xyz.com"
  }
}
```

这里需要区分两个概念：

```text
Function Calling ≠ Function Execution
```

模型只是表达：

> 我要调用 `web_browse`，参数是 `url=...`

至于这个工具到底怎么执行，模型并不负责。

---

### 5. Agent 执行 Tool Call

Agent 收到模型返回的 Tool Call：

```json
{
  "name": "web_browse",
  "args": {
    "url": "https://xyz.com"
  }
}
```

然后根据工具来源决定如何执行。

如果它是 MCP Tool：

```text
Agent
  ↓
MCP Client
  ↓
MCP Protocol
  ↓
MCP Server
  ↓
web_browse(...)
```

MCP Server 执行真正的网页访问，然后返回结果，例如：

```html
<html>
    ...
</html>
```

---

### 6. Tool Result 返回给 LLM

工具执行结束后，Agent 会把结果继续加入模型上下文。

逻辑上类似：

```text
User:
女朋友肚子疼怎么办？

Assistant:
调用 web_browse

Tool:
<html>
    ...
</html>
```

然后 Agent 再调用一次 LLM。

此时模型看到的不只有用户的问题，还有刚刚查询出来的外部数据。

这部分通常称为：

```text
Tool Result
```

或者在一些 Agent 架构描述中称为：

```text
Observation
```

---

### 7. LLM 根据结果继续决策

拿到 Tool Result 后，模型有两种选择：

```text
          Tool Result
              ↓
             LLM
          ↙       ↘
继续调用 Tool     信息已经足够
     ↓               ↓
下一轮调用        Final Answer
```

因此一个 Agent 任务不一定只调用一次工具。

例如：

```text
用户：
帮我查一下杭州明天天气，
如果下雨就帮我看看附近有什么室内活动。
```

可能产生：

```text
查询天气
   ↓
得到下雨结果
   ↓
搜索室内活动
   ↓
生成最终回答
```

Agent 的关键能力之一，就是把这个过程循环执行。

---

### 8. 返回最终结果

当模型不再请求工具时，会生成最终回答：

```text
LLM
 ↓
Agent
 ↓
User
```

至此一次 Agent 调用结束。

---

## 三、易混淆的几个概念

### Function Calling

Function Calling 解决的是：

> **模型如何表达“我要调用某个工具”。**

例如：

```json
{
  "name": "getWeather",
  "arguments": {
    "city": "杭州"
  }
}
```

模型完成的是：

```text
自然语言理解
      ↓
判断需要什么能力
      ↓
生成结构化 Tool Call
```

它不会真的执行：

```java
getWeather("杭州");
```

执行操作仍然属于 Agent / 宿主程序。

---

### MCP

MCP 解决的是：

> **Agent 如何以统一的方式接入外部能力。**

没有 MCP 时，我们一样可以实现 Tool Calling。

例如自己定义：

```java
getWeather()

searchDatabase()

queryOrder()

sendEmail()

queryKafka()

searchOpenMetadata()

queryPrometheus()
```

然后在 Agent 中完成：

```text
Tool 注册
Tool Schema
参数解析
Tool 路由
远程调用
结果转换
连接管理
```

问题在于，不同 Agent、不同工具提供方很容易形成各自的一套实现。

MCP 把这部分抽象成统一的 Client / Server 模型：

```text
                    ┌─ GitHub MCP Server
                    │
Agent ─ MCP Client ─┼─ PostgreSQL MCP Server
                    │
                    ├─ Browser MCP Server
                    │
                    └─ Axiom MCP Server
```

对于 Agent 来说，只需要按照 MCP 的方式发现和调用这些能力。

---

### Agent

Agent 是整个流程的控制器。

典型流程是：

```text
接收用户请求
      ↓
准备 Prompt 和 Tools
      ↓
调用 LLM
      ↓
是否存在 Tool Call？
   ↙            ↘
  是             否
  ↓               ↓
执行 Tool       返回结果
  ↓
得到 Tool Result
  ↓
再次调用 LLM
  ↓
继续判断
```

所以一个最简单的 Agent，本质上就是：

```text
LLM + Tools + 循环控制
```

再往工程化方向发展，才会逐渐加入：

```text
Memory
Context
Planning
Workflow
Human in the Loop
Tracing
Retry
Timeout
Permission
Guardrail
```

### Function Calling 和 MCP 的区别

这两个概念经常被放在一起，但解决的问题并不相同。

**Function Calling**

解决：

```text
LLM 如何告诉宿主程序：

“我要调用 getWeather，
参数是 city=杭州。”
```

关注的是：

```text
LLM
 ↕
Agent
```

**MCP**

解决：

```text
Agent 如何知道有哪些外部工具，
以及如何调用这些工具。
```

关注的是：

```text
Agent
 ↕
MCP Server
```

放到一起就是：

```text
                 Function Calling
                       │
                       ↓
User → Agent → LLM
        ↑        │
        │        │ Tool Call
        │        ↓
        └── MCP Client
                │
                │ MCP
                ↓
           MCP Server
                │
                ↓
              Tool
```

因此，更准确地说：

> **Function Calling 是模型与宿主程序之间的结构化工具调用机制；MCP 是 Agent 与外部能力提供方之间的标准化连接协议。**

它们不是替代关系，而是可以组合使用。

甚至完全可以：

```text
有 Function Calling，没有 MCP
```

例如 Tool 就是本地 Java 方法。

也可以：

```text
Function Calling + MCP
```

让 Tool 来自远程 MCP Server。



---

## 四、项目架构

站在不同角色看：

| 视角         | 最关心的东西                          |
| ------------ | ------------------------------------- |
| 前端         | 对话、流式响应、Tool 状态、用户确认   |
| Agent / 后端 | 上下文、模型调用、Tool 编排、生命周期 |
| LLM          | 当前 Prompt、Tools、Tool Result       |
| MCP Client   | Tool 发现与调用                       |
| MCP Server   | 把真实业务能力封装成标准 Tool         |
| 业务系统     | 真正执行查询、写入、计算等操作        |

### 站在后端视角看

Spring AI、LangChain、LangGraph 等框架做的事情之一，就是把这些底层流程进一步工程化。

伪代码：

```java
public String chat(String prompt) {

    // 请求MCP Server，获取当前提供的工具清单
    List<ToolDefinition> tools = mcpClient.listTools();

    // 第一次调用模型，将工具清单提供给模型
    ModelResponse response = llm.chat(prompt, tools);

    // 模型如果要求调用工具，就不断执行
    while (response.hasToolCall()) {

        ToolCall call = response.getToolCall();

        ToolResult result = mcpClient.callTool(
            call.name(),
            call.arguments()
        );

        // 把 Tool 的结果重新交给模型决策
        response = llm.chat(result);
    }

  	// 模型决策完毕，输出最终的对话内容
    return response.getContent();
}
```

简而言之，最核心的就是下面这个循环，**不断地给替大模型执行工具类，提供调用结果，使其完成最终的任务**：

```java
// 获取大模型希望请求工具的意图
while (modelWantsToCallTool()) {
    // 执行工具类
    executeTool();
    // 将工具类执行的结果发送给大模型
    sendToolResultBackToModel();
}
```

当然，生产代码远比这复杂，还需要处理：

- 上下文历史
- Tool Schema
- 流式响应
- 并发 Tool Call
- 异常处理
- Timeout
- Retry
- 权限控制
- 调用审计
- Token 消耗
- Tracing
- 模型切换

### 站在前端视角看

#### 前端真正需要关心什么？

前端并不需要知道：

```text
MCP tools/list 怎么调用
Tool Schema 怎么解析
LLM 为什么选择这个 Tool
MCP Server 怎么执行
```

更需要关心的是：

1. **会话展示**

```text
User Message
Assistant Message
Tool Status
Tool Result
Error
```

2. **流式输出**。通常使用：

```text
SSE
WebSocket
Fetch Stream
```

实现类似 ChatGPT 的逐字输出。

3. **Tool 执行状态**。例如：

```text
🔍 正在搜索网页
✓ 搜索完成

🗄 正在查询数据库
✓ 查询到 32 条数据

📊 正在分析数据
✓ 分析完成
```

4. **Human in the Loop**。某些危险操作不能让 Agent 自己执行，例如：

```text
删除数据库记录
发送邮件
执行生产 SQL
创建订单
修改配置
```

后端可以给前端推送：

```json
{
  "type": "approval_required",
  "tool": "deleteOrder",
  "arguments": {
    "orderId": 10001
  }
}
```

前端展示：

```text
AI 准备删除订单 #10001

[取消] [确认执行]
```

用户确认后才继续执行 Tool。

#### 前端如何协助后端？

从前端角度看，本质上都只是 **Agent 执行状态的 UI 映射**。

1. 处理用户发送的信息，建立长连接会话。

用户发送消息，前端可能只是调用：

```http
POST /api/chat
```

```json
{
  "message": "杭州明天天气怎么样？"
}
```

此时需要建立一个 SSE / WebSocket 流。

2. 接收流式事件，让用户知道 Agent 现在在干什么，将后端实时推送过来的执行状态显示出来。

后端开始跑 Agent，后端内部可能发生如下的行为：

```text
调用 LLM
   ↓
LLM 请求 getWeather
   ↓
调用 MCP Server
   ↓
得到天气
   ↓
再次调用 LLM
   ↓
生成答案
```

接收流式内容并渲染，例如：

```text
event: thinking
data: 正在分析问题

event: tool_call
data: {"name":"getWeather","city":"杭州"}

event: tool_result
data: {"weather":"雨"}

event: message
data: 杭州明天预计有雨……

event: done
```

于是 ChatGPT 这一类产品里常见的：

```text
正在搜索网页……
正在读取文件……
正在执行代码……
```

---

## 五、业务链路

```text
用户
 ↓
前端
 ↓
后端
 ↓
----------------------
Agent
 ↓
LLM
 ↓
Function Calling
 ↓
Agent
 ↓
MCP Client
 ↓
MCP Server
 ↓
Tool / API / DB
 ↓
Tool Result
 ↓
LLM
 ↓
Agent
----------------------
 ↓
后端
 ↓
前端
 ↓
用户
```

再压缩一点：

```text
LLM        → 决定做什么
Agent      → 决定流程怎么跑
Function Calling → 描述调用什么工具
MCP        → 规定工具怎么连接
MCP Server → 提供真正的外部能力
Frontend   → 把整个过程呈现给用户
```

如下是一个最简实践技术栈案例：

```text
Vue
 ↓
Spring Boot / Spring AI Agent
 ↓
LLM
 ↓
Spring AI Tool Calling
 ↓
MCP Client
 ↓
MCP Server
 ↓
Java Service / DB / API / 第三方系统
```

回过头来再看各种所谓的 Agent Framework，本质上都是围绕这条链路继续增加**上下文管理、工作流、记忆、权限、人工确认、可观测性和容错机制**。