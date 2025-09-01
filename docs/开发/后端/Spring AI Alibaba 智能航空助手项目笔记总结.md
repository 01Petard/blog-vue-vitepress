
# 应用架构图

![img](https://cdn.nlark.com/yuque/0/2024/png/22309163/1729410225384-c1ec6bb3-bcd1-45e7-83d3-c505e7e0459d.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_62%2Ctext_5b6Q5bq26ICB5biI%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10%2Fformat%2Cwebp) 

该笔记围绕 “Spring AI Alibaba 智能航空助手项目” 展开，详细介绍了项目资源、架构、环境准备、前后端部署、核心功能实现、关键技术及难点解决方案，旨在为开发者提供完整的项目实战指南。


## 一、项目基础信息与资源

1. **核心定位**：基于 JAVA+AI 技术开发的智能机票助手，核心功能为机票退订、改订、预订，强调职责分明。
2. **资源获取**：
    - 项目代码：百度网盘链接（[https://pan.baidu.com/s/1Qu6x4p3rpZfHYQrJ26YG0w](https://pan.baidu.com/s/1Qu6x4p3rpZfHYQrJ26YG0w)，提取码：wswk）。
    - 技术交流：可加入知识星球 “徐庶答疑社区”（星主为徐庶老师），或通过微信搜 “程序员徐庶” 获取更多支持，提供一对一 JAVA+AI 技术解答。

## 二、项目架构

项目架构涵盖多模块，各模块协同实现智能航空助手功能，核心组成如下：

|模块层级|具体模块|功能说明|
|---|---|---|
|交互层|User Interface（前端界面）|提供用户与系统的交互入口，支持机票相关操作的可视化操作|
|核心 AI 层|Spring AI、System Prompt、ChatGLM Ali Version、ConversationMemory|负责 AI 对话逻辑、提示词预设、对话记忆管理，保障交互连贯性|
|数据处理层|Document Ingestion、Vector RAG Store、Document Transformer、Document Reader|处理文档数据，包括文档摄入、向量存储（用于 RAG）、文档转换与读取|
|功能实现层|Generative AI、Function Calling、Writer、Service APIs|实现 AI 生成、方法回调（如退订 / 改订功能触发）、数据写入及服务接口调用|
|业务服务层|Flight Booking Service、Booking DB|封装机票预订相关业务逻辑（退订、改订、查询），Booking DB 存储预订数据|

## 三、环境准备与配置

1. **基础环境要求**：
    - Java 17：后端开发与运行的基础环境。
    - Node.js 18+：前端项目（chatgpt-demo）的运行依赖。
2. **API Key 配置**：
    - 申请地址：通过阿里云 DashScope 平台申请（[https://help.aliyun.com/zh/dashscope/developer-reference/activate-dashscope-and-create-an-api-key](https://help.aliyun.com/zh/dashscope/developer-reference/activate-dashscope-and-create-an-api-key)）。
    - 配置方式：兼容 DashScope 环境变量配置，参考官方文档（[https://help.aliyun.com/zh/dashscope/developer-reference/api-key-settings](https://help.aliyun.com/zh/dashscope/developer-reference/api-key-settings)）。

## 四、前后端部署步骤

### （一）前端部署

1. 下载项目代码后，进入前端目录：`cd app/chatgpt-demo`。
2. 安装依赖：执行命令 `npm i`。
3. 启动项目：执行命令 `npm run dev`；前端环境安装细节可参考有道笔记（[https://note.youdao.com/s/AXcWXq3v](https://note.youdao.com/s/AXcWXq3v)）。

### （二）后端部署核心配置

1. **依赖与基础配置**：配置 ChatClient、创建 Controller，实现流式对话功能。
2. **长连接问题解决**：通过 “加入打印日志拦截器→加入 Advisor→使用 chatClientBuilder 的 defaultAdvisors () 方法注册 Advisor”，解决 SSE 长连接重复请求问题。

## 五、核心功能实现与关键技术

### （一）核心业务功能（基于 FlightBookingService）

该类封装了退订、改订逻辑（暂未操作数据库，重点在业务逻辑）：

  

- **退订业务规则**：超过 2 天无法退订，退订后订单状态改为 “取消”。
- **改订业务**：通过 ChangeBookingDatesRequest 实现，需先获取并确认预订信息。

### （二）关键技术与解决方案

#### 1. Function-Call（方法回调）：解决业务触发与信息提取

用于实现退订、改订、查询预订信息等功能的触发，核心步骤：

  

- 告知大模型 “回调哪个方法”：提供实现 Function 接口的 Bean（调用 apply 方法）。
- 定义 “什么对话触发回调”：配置 Function 作用（如指定处理退订场景）。
- 明确 “提取什么关键字”：通过 Function 的第一个泛型指定需提取的变量名（如预订号、客户姓名）。

#### 2. 对话记忆与信息获取：解决用户信息收集问题

- 规则：处理预订 / 取消预订前，需获取用户的 “预订号、客户姓名”；获取前先检查消息历史记录，避免重复询问。
- 实现：通过预设提示词强制大模型收集关键信息，再触发后续操作。

#### 3. 温度参数（Temperature）：解决大模型 “自主操作” 问题

- 问题：部分场景下大模型未等用户回复 “确认” 就直接执行退订，需降低模型随机性。
- 温度参数说明：控制模型输出的随机性，值越低越可控（示例：“天空是___”，0.2 时输出 “蓝色的”，1.0 时可能输出 “草莓味的”）。
- 行业建议与项目配置：客服场景建议 0.3-0.6，本项目降低温度使大模型更遵循提示词，避免 “自主操作”。

#### 4. RAG（检索增强生成）：外挂知识库提升回答准确性

通过向量数据库实现相似性检索，补充业务知识（如 Terms of Service），核心步骤：

  

- **向量数据库准备**：支持 Redis、ES 等，以 RedisStack 为例：
    - 安装：需禁用本地原有 Redis 避免端口冲突，访问[localhost:8001](https://localhost:8001/)管理（用户名 default，密码 123456）。
    - 依赖与配置：引入相关依赖，配置连接；若项目已用 Redis，需禁用 RedisVectorStoreAutoConfiguration 避免冲突。
- **文档嵌入（Embedding）**：VectorStore 对象结合阿里灵积 EmbeddingModel（可替换其他厂家模型），调用`vectorStore.add(splitDocuments)`将文档转为向量存入数据库。
- **文档查询**：调用`vectorStore.similaritySearch(query)`时，先将用户提问转为向量，与数据库向量计算余弦相似度获取相关文档。
- **生效配置**：添加`QuestionAnswerAdvisor(vectorStore, SearchRequest.defaults())`，使用户提问时先查询数据库，拼接相关文档后再让模型生成答案。

## 六、项目难点与解决思路

|难点|解决方法|
|---|---|
|获取当前航班信息（需用户提供姓名、航班号）|预设提示词，强制大模型在操作前检查历史记录，缺失则询问用户关键信息|
|大模型未等用户 “确认” 就执行退订|降低 Temperature 参数（按客服场景 0.3-0.6 配置），提升模型可控性|
|业务知识不足导致回答不准确|引入 RAG 技术，外挂知识库（如 Terms of Service），通过向量数据库补充信息|
|SSE 长连接重复请求|加入日志拦截器与 Advisor，通过 chatClientBuilder 注册 Advisor 解决|