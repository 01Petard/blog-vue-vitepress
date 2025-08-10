> **适用于Python大数据 / 开发**

# 目录结构

## **1. Python 基础语法与数据结构**

- 数据类型（int、float、bool、str、list、tuple、set、dict）
- 数据结构特点与时间复杂度
- 可变与不可变类型
- 深拷贝与浅拷贝
- Python 内存管理（引用计数、垃圾回收、分代回收）
- Python 中的 id、is、== 区别

## **2. 函数与面向对象**

- 函数参数传递（可变/不可变、*args/**kwargs）
- 闭包与作用域（LEGB 法则）
- 装饰器（带参数与不带参数）
- 迭代器与生成器（yield、send、惰性计算）
- 类与对象（实例属性、类属性、静态方法、类方法）
- MRO（方法解析顺序）、多继承
- `__new__` 与 `__init__` 区别

## **3. Python 高级特性**

- 列表推导式、生成器表达式
- 上下文管理器与 `with`
- 元类（MetaClass）
- 反射（getattr、setattr、hasattr）
- 魔术方法（`__str__`、`__repr__`、`__len__`、`__getitem__` 等）
- 单例模式的多种实现方式

## **4. 并发与异步**

- 线程、进程、协程的区别与适用场景
- GIL（全局解释器锁）机制
- 多线程（Thread）、多进程（multiprocessing）
- 协程（async/await、asyncio、aiohttp）
- 队列（queue、multiprocessing.Queue、PriorityQueue）
- 线程池与进程池（concurrent.futures）

## **5. Python 性能优化**

- 代码性能分析（timeit、cProfile）
- 内存优化（生成器、延迟加载、slots）
- 大数据处理优化（批量处理、分块读写）
- NumPy/Pandas 向量化优化

## **6. Python 常用库与生态**

- 数据分析：NumPy、Pandas
- 数据可视化：Matplotlib、Seaborn、Plotly
- 网络请求：requests、aiohttp
- 数据序列化：json、pickle、msgpack
- 正则表达式：re
- 数据压缩：gzip、bz2、lzma

## **7. 大数据生态 Python 应用**

- PySpark 基础（RDD、DataFrame、SparkSQL）
- Hadoop 生态（HDFS 读写）
- Kafka 消费与生产（confluent-kafka、pyspark.streaming）
- Flink Python API（PyFlink）
- Airflow 工作流调度
- 数据清洗与ETL 设计

## **8. Python 与数据库**

- SQL 基础与优化
- MySQL 与 PostgreSQL 连接（pymysql、psycopg2）
- ORM 框架（SQLAlchemy）
- NoSQL（Redis、MongoDB 操作）
- 数据批量导入导出（CSV、Parquet、ORC）

## **9. Python 工程化**

- 项目结构与模块化
- 虚拟环境（venv、conda、uv）
- 日志管理（logging）
- 配置管理（dotenv、pydantic）
- 单元测试（unittest、pytest）
- CI/CD 流程（Jenkins、GitLab CI）
- 包管理与发布（pip、poetry、setuptools）

## **10. 网络与分布式**

- Socket 编程（TCP/UDP）
- HTTP 协议与 requests 底层原理
- RPC 框架（gRPC、Thrift）
- 消息队列（RabbitMQ、Kafka）
- 分布式锁（Redis、Zookeeper）
- 分布式任务队列（Celery）

## **11. 算法与数据结构（Python 实现）**

- 排序与查找（快排、归并、二分）
- 哈希表、链表、栈、队列
- 树与图的遍历（DFS、BFS）
- 常见大数据面试算法题（TopK、滑动窗口、MapReduce 思想）

## **12. 系统与调优**

- Linux 常用命令
- Python 内存与 CPU 监控
- I/O 模型（阻塞/非阻塞、同步/异步）
- 大数据集群调优（Spark 参数、JVM 调优基础）
- 数据压缩与序列化性能对比



> 面试大数据岗，建议学习顺序是：
>
> 1. 先搞定 **基础** + **常用库**，确保 Python 能写得又快又稳。
> 2. 再啃 **大数据生态**，优先 Spark → Kafka → HDFS → Airflow，这四个是面试高频。
> 3. 最后看 **应用框架**，因为有些公司会要求你写 Python API 来对接前端或其他系统。

## **Python基础**

面试最爱“顺手”问的部分，用于验证 Python 基础功底。

- **语法与数据结构**：
   变量与作用域（LEGB）、可变/不可变类型、深浅拷贝、推导式、切片语法、内置函数（map、filter、zip、enumerate）。
- **面向对象**：
   类与对象的属性查找顺序（MRO）、`__init__` / `__new__` 区别、魔术方法重写（`__getitem__`、`__len__`、`__iter__`）。
- **函数高级特性**：
   装饰器（带参数与不带参数）、闭包、生成器、上下文管理器。
- **并发与异步**：
   线程/进程/协程区别，GIL 机制，`asyncio` 使用场景，线程池与进程池。
- **性能调优**：
   timeit、cProfile 分析性能瓶颈，NumPy/Pandas 向量化优化，内存优化（`__slots__`、生成器）。

------

## **常用库**

处理大数据时的“基本工具”，熟练度直接影响工作效率。

- **数据处理**：
   NumPy（矩阵运算、广播机制）、Pandas（DataFrame 操作、groupby、merge、apply、自定义聚合函数）。
- **数据可视化**：
   Matplotlib、Seaborn、Plotly（画图不是主要任务，但懂得能在面试加分）。
- **数据序列化与压缩**：
   json、pickle、msgpack、gzip、bz2（用于大文件传输与存储优化）。
- **网络与爬虫**：
   requests、aiohttp（异步 HTTP 请求）、re（正则匹配清洗数据）。
- **调度与自动化**：
   schedule、APScheduler（定时任务）、subprocess（调用外部命令）。

------

## **应用框架**

项目落地的骨架，能让 Python 代码接入企业生产环境。

- **Web 框架**：
   Flask（轻量，写 API 快）、FastAPI（异步支持 + Pydantic 校验）、Django（全家桶但偏重）。
- **任务调度**：
   Airflow（数据管道调度）、Luigi（批处理依赖管理）、Celery（分布式任务队列）。
- **数据接口**：
   gRPC（高性能 RPC 调用）、Thrift（跨语言 RPC）、GraphQL（复杂查询 API）。
- **ORM & 数据库连接**：
   SQLAlchemy（关系型数据库 ORM）、PyMySQL、psycopg2（PostgreSQL）、Motor（MongoDB 异步驱动）。
- **日志与监控**：
   logging、structlog、Prometheus + Grafana（业务监控可视化）。

------

## **大数据生态**

大数据岗位的面试核心，优势要在这块显出来。

- **分布式计算**：
   Spark（PySpark RDD、DataFrame、SparkSQL、UDF）、Flink（PyFlink 流处理 API）、MapReduce 思想。
- **分布式存储**：
   HDFS（文件上传/下载 API、NameNode 与 DataNode 原理）、Hive（Python 调用 HiveQL）、HBase（HappyBase 客户端）。
- **消息队列**：
   Kafka（Python 客户端 confluent-kafka 的生产与消费、位点提交）、RabbitMQ（pika 库）。
- **工作流与调度**：
   Airflow（DAG、Operator、Task 依赖管理）、Oozie（Hadoop 生态调度）。
- **数据格式**：
   Parquet、ORC、Avro（列式存储优劣势、与 CSV 对比）、fastparquet 与 pyarrow 的使用。
- **数据同步与采集**：
   Sqoop（RDBMS ↔ HDFS 数据同步）、Flume（日志采集）、Debezium（CDC 变更数据捕获）。









## 常见问题

### **1. Python 基础语法与数据结构**

#### 1.1 数据类型

**定义**：Python 的内置数据类型分为数字（int、float、bool）、字符串（str）、容器（list、tuple、set、dict）等。
 **原理**：所有数据类型都是对象（基于 `PyObject`），小整数池 `[-5,256]` 复用对象，字符串驻留机制减少内存消耗。
 **常见坑**：

- `a = 257; b = 257` 时，`a is b` 可能是 `False`（超出小整数池范围）。
- `list * n` 会复制引用，而不是深拷贝。
   **面试题**：`a = [[]] * 3; a[0].append(1)`，`a` 的值是什么？为什么？

------

#### 1.2 可变与不可变类型

**定义**：不可变类型（str、tuple、int）在修改时会创建新对象；可变类型（list、dict、set）在原地修改。
 **原理**：不可变类型的内存地址不会改变，方便哈希存储。
 **常见坑**：

- `tuple` 内部元素可变时，tuple 也不可哈希。
   **面试题**：为什么 `dict` 的 key 必须是不可变类型？

------

#### 1.3 深拷贝与浅拷贝

**定义**：浅拷贝只复制第一层引用，深拷贝递归复制全部对象。
 **原理**：`copy.copy` 调用对象的 `__reduce__`；`copy.deepcopy` 递归构造新对象。
 **常见坑**：

- 自定义类未实现 `__deepcopy__` 时，可能出现共享引用。
   **面试题**：在嵌套 list 里如何只修改深层数据而不影响原数据？

------

### **2. 函数与面向对象**

#### 2.1 函数参数传递

**定义**：Python 函数的参数传递是“传对象引用”，可变类型会被修改。
 **原理**：参数是指向对象的指针，而不是值的拷贝。
 **常见坑**：

- 默认参数陷阱：`def f(x=[])` 会复用同一个 list。
   **面试题**：如何避免默认参数陷阱？

------

#### 2.2 闭包与作用域（LEGB）

**定义**：闭包是函数内部引用外部作用域变量。
 **原理**：Python 在函数对象的 `__closure__` 里保存自由变量。
 **常见坑**：

- 循环中闭包引用的变量会延迟绑定。
   **面试题**：如何修复循环中的闭包延迟绑定问题？

------

#### 2.3 装饰器

**定义**：装饰器是一个函数，接收函数或类作为参数并返回修改后的版本。
 **原理**：语法糖 `@func` 等价于 `f = func(f)`。
 **常见坑**：

- 装饰器不使用 `functools.wraps` 会丢失原函数元数据。
   **面试题**：写一个带参数的计时装饰器。

------

### **3. Python 高级特性**

#### 3.1 迭代器与生成器

**定义**：迭代器实现了 `__iter__` 和 `__next__`；生成器是用 `yield` 生成迭代器。
 **原理**：生成器函数执行到 `yield` 暂停，并保存栈帧状态。
 **常见坑**：

- 生成器只能迭代一次。
   **面试题**：生成器如何实现惰性求值？

------

#### 3.2 魔术方法

**定义**：Python 内置的特殊方法，用于自定义类的行为。
 **原理**：解释器在执行运算符或内置函数时会调用对应魔术方法。
 **常见坑**：

- `__str__` 与 `__repr__` 的区别（人类可读 vs 开发者调试）。
   **面试题**：写一个支持 `obj[1:5]` 的类。

------

### **4. 并发与异步**

#### 4.1 GIL

**定义**：全局解释器锁，保证同一时间只有一个线程执行 Python 字节码。
 **原理**：CPython 在执行字节码时持有互斥锁，释放频率由 `sys.setswitchinterval` 控制。
 **常见坑**：

- CPU 密集型任务多线程反而更慢。
   **面试题**：如何绕过 GIL 限制提高 CPU 密集任务性能？

------

#### 4.2 协程

**定义**：用户态轻量线程，通过事件循环调度执行。
 **原理**：async/await 基于生成器的状态机实现，事件循环用 `epoll`/`select`。
 **常见坑**：

- 协程中调用阻塞 IO 会卡死事件循环。
   **面试题**：如何在 asyncio 中执行阻塞任务？

------

### **5. 大数据场景**

#### 5.1 PySpark

**定义**：Spark 的 Python API，用于分布式数据处理。
 **原理**：驱动程序用 Py4J 与 JVM SparkContext 通信。
 **常见坑**：

- Python UDF 比 JVM 内置函数慢很多。
   **面试题**：PySpark 中如何减少 Python ↔ JVM 数据传输开销？

------

#### 5.2 Kafka 消费与生产

**定义**：Kafka 是分布式消息队列，Python 常用 confluent-kafka。
 **原理**：Python 客户端调用 C 库 `librdkafka`，通过 TCP 与 broker 通信。
 **常见坑**：

- 消费位点不提交会重复消费。
   **面试题**：如何保证 Kafka 消费的 Exactly Once 语义？

------

#### 5.3 HDFS 操作

**定义**：分布式文件系统，支持海量数据存储。
 **原理**：NameNode 管理元数据，DataNode 存数据块。
 **常见坑**：

- 过多小文件会导致 NameNode 内存爆炸。
   **面试题**：如何在 Python 中高效批量写入 HDFS？

------

### **6. 工程化与调优**

#### 6.1 日志管理

**定义**：logging 模块支持分级日志、格式化、文件输出。
 **原理**：日志记录器通过 handler 将日志发送到不同输出目标。
 **常见坑**：

- logging.basicConfig 只能生效一次。
   **面试题**：如何为不同模块设置不同日志格式？

------

#### 6.2 单元测试

**定义**：自动化测试验证代码功能。
 **原理**：pytest 基于断言重写和插件系统。
 **常见坑**：

- mock 未恢复原函数可能影响其他测试。
   **面试题**：如何 mock 一个外部 API 请求？

