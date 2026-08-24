# RAG与KAG：生成式 AI 知识增强生成中的比较与差异

> 在NLP和AI System快速发展的领域中，两种方法正日益受到关注：RAG（检索增强生成）和 KAG（知识增强生成）。
>
> 这两种方法通过整合外部知识源来**增强语言模型的能力** ，但在如何访问和使用知识方面有所不同。
>
> 我整理了它们最重要的要点，以便进行比较，并分析它们的架构、使用场景、优势等。

如果把大模型直接接到业务系统里，最先遇到的通常不是“模型不够聪明”，而是两个更现实的问题：

1. 模型不知道企业内部的数据；
2. 即使把资料喂给模型，它也未必能把跨文档、跨实体之间的关系推理清楚。

RAG 解决的是第一个问题：**让模型在回答之前先去查资料。**

KAG、GraphRAG 这一类方案试图进一步解决第二个问题：**不仅查资料，还要理解知识之间的关系，并在关系网络上做检索和推理。**

本文章不讨论学术定义上的细枝末节，重点放在工程视角：

- RAG、GraphRAG、KAG 到底有什么区别
- OpenSPG KAG、LightRAG、LlamaIndex + Neo4j 这些方案分别适合什么场景
- 项目的后端应该怎么落地

---

## 1. 先从最熟悉的 RAG 说起

RAG 是 Retrieval-Augmented Generation，也就是**检索增强生成**。

它的基本链路非常直接：

```text
用户问题
  ↓
检索知识库
  ↓
拿到相关文档片段
  ↓
把片段作为上下文交给 LLM
  ↓
生成答案
```

例如企业内部有几百份设备说明书、运维手册和技术文档。

用户问：

> A1001 设备温度传感器的量程是多少？

普通大模型不知道企业内部的设备型号，这时可以先在知识库里检索出 A1001 的说明书片段，再让模型基于检索结果回答。

这就是典型 RAG。

### RAG 的核心价值

RAG 主要解决三个问题：

- 给大模型补充私有知识；
- 让知识可以独立更新，而不是重新训练模型；
- 尽量让回答建立在真实资料上，而不是只依赖模型参数中的记忆。

所以如果需求只是：

- 企业文档问答；
- PDF 问答；
- FAQ；
- 产品手册查询；
- 知识库客服；

RAG 通常已经够用。

---

## 2. RAG 的问题

RAG 的问题不在“检索不到”，而在“关系推不出来”，普通 RAG 的基本单位通常是 Chunk，也就是文档切片。

比如系统里有三段资料：

```text
文档 A：
A1001 温度传感器安装在 2 号生产线。

文档 B：
2 号生产线负责人是张三。

文档 C：
张三今天值班。
```

如果用户问：

> A1001 所在生产线的负责人今天是否值班？

这时问题就开始变复杂了。

模型需要完成一条关系链：

```text
A1001
  ↓ 安装于
2 号生产线
  ↓ 负责人
张三
  ↓ 值班状态
今天值班
```

普通向量检索的问题是，它擅长找“语义相似的文本”，但不天然理解这条关系链。

它可能检索到 A，也可能检索到 B，但不一定能稳定地把 A、B、C 三段知识组合起来。

这就是为什么很多 RAG 系统在简单问答上表现不错，一到以下问题就容易不稳定：

- 多跳查询；
- 跨实体关系查询；
- 需要全局上下文的问题；
- 带明确领域规则的问题；
- 需要“先查 A，再根据 A 查 B”的问题。

于是就有了 GraphRAG 和 KAG。

---

## 3. GraphRAG：给 RAG 加一张“关系网”

GraphRAG 可以理解为：

> **在传统向量检索之外，再引入知识图谱。**

传统 RAG 更像这样：

```text
Question
  ↓
Vector Search
  ↓
Chunks
  ↓
LLM
```

GraphRAG 则多了一层实体和关系：

```text
Document
  ↓
Entity / Relation Extraction
  ↓
Knowledge Graph

同时：

Document
  ↓
Chunk
  ↓
Embedding
  ↓
Vector Store
```

查询时可以同时使用：

```text
Vector Retrieval
+
Graph Retrieval
```

向量库负责“哪些文本和问题相似”，图数据库负责“这些实体之间是什么关系”。

例如：

```text
(Device:A1001)-[:BELONGS_TO]->(ProductionLine:Line2)
(ProductionLine:Line2)-[:RESPONSIBLE_BY]->(Person:ZhangSan)
```

这时查询“A1001 的产线负责人是谁”，就不再完全依赖语义相似度，而是可以直接沿图关系查询。

---

## 4. KAG 比 GraphRAG 多出来的是什么

KAG 是 Knowledge Augmented Generation，也就是知识增强检索。

在本文语境里，主要讨论 OpenSPG KAG 这一类以**领域知识图谱 + Schema + 逻辑推理**为核心的方案。

如果说 GraphRAG 的重点是：

> 给 RAG 增加图检索。

那么 KAG 更进一步，强调的是：

> **让知识本身具有结构、类型、约束和规则，并基于这些知识进行推理。**

典型结构可以理解为：

```text
业务数据 / 文档
      ↓
领域 Schema
      ↓
Entity + Relation + Rule
      ↓
Knowledge Graph
      ↓
图检索 + 向量检索
      ↓
Logical Reasoning
      ↓
LLM
```

这里最关键的区别不是“有没有 Neo4j”，而是有没有一套明确的领域模型。

例如工业系统可以定义：

```text
Device
ProductionLine
Factory
Organization
Person
Metric
Alarm
WorkOrder
```

再定义关系：

```text
Device BELONGS_TO ProductionLine
ProductionLine BELONGS_TO Factory
ProductionLine RESPONSIBLE_BY Person
Device PRODUCES Metric
Alarm TRIGGERED_BY Device
```

甚至还可以继续加入领域规则。

这样系统处理的就不只是“文本之间的相似性”，而是一套结构化业务知识。

---

## 5. RAG、GraphRAG、KAG 的区别

不用把这几个概念想得太玄。

可以先用下面这张表理解：

| 方案     | 主要知识载体                          | 主要解决的问题         | 更适合什么                   |
| -------- | ------------------------------------- | ---------------------- | ---------------------------- |
| RAG      | 文档 Chunk + Vector                   | 从资料里找到相关内容   | 文档问答、FAQ、知识库        |
| GraphRAG | Vector + Knowledge Graph              | 在文本之外利用实体关系 | 多实体关系查询、全局知识分析 |
| KAG      | Domain Schema + KG + Rule + Retrieval | 领域知识推理           | 工业、政务、专业知识系统     |

再简单一点：

```text
RAG
= 查资料

GraphRAG
= 查资料 + 查关系

KAG
= 查资料 + 查关系 + 按领域知识模型推理
```

当然，现实中的框架不会严格按照这三层划线，很多能力是交叉的。

所以工程选型时，不要纠结名字，而应该看它到底提供了什么能力：

- 有没有 Knowledge Graph；
- 有没有 Schema；
- 图是自动抽取还是业务系统提供；
- 支不支持 Vector + Graph Hybrid Retrieval；
- 能不能做多跳推理；
- 能不能接入领域规则；
- API 是否方便集成；
- 数据和图谱是否容易维护。

> 参考：https://www.plainconcepts.com/rag-vs-kag/
