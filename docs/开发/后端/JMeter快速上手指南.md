## ✅ 安装 JMeter

直接用 Homebrew 安装：

```bash
brew install jmeter
```

装好之后，运行启动图形化界面：

```bash
jmeter
```

------

## 🧪 创建一个HTTP 接口压测脚本

### 👣 1. 新建测试计划

- 打开 JMeter
- 左上角点击【测试计划】（Test Plan），右键 → 添加 → Threads（用户）→ 线程组（Thread Group）

### 👣 2. 配置线程组

- Number of Threads（用户数）：比如设为 10
- Ramp-Up Period（启动时间）：比如 5 秒（代表 10 个用户在 5 秒内全部启动）
- Loop Count（循环次数）：比如设 10（每个用户请求 10 次）

### 👣 3. 添加 HTTP 请求

- 右键线程组 → 添加 → Sampler → HTTP请求（HTTP Request）
- 配置如下：
  - **服务器名或IP**：比如 `localhost`
  - **端口号**：你的服务端口，如 8080
  - **方法**：GET / POST
  - **路径**：比如 `/api/user/info`

### 👣 4. 添加结果查看器（可选）

- 右键线程组 → 添加 → Listener → 查看结果树（View Results Tree）
- 也可以选 Summary Report 或 Aggregate Report 看性能统计数据

------

## 🧨 运行压测

点击菜单栏中的 **开始按钮（绿色小三角）**，JMeter 会开始执行压测任务。结果会实时显示在你添加的监听器中。

------

## 📊 查看结果数据

- **View Results Tree**：适合调试，能看到每一个请求的响应
- **Aggregate Report**：最常用的压测汇总视图
  - Throughput：吞吐量（每秒请求数）
  - Avg：平均响应时间
  - Error %：错误率
  - Min/Max：最小/最大响应时间

------

## 🧠 进阶玩法

- 支持参数化（CSV Data Set Config）
- 支持断言（Response Assertion）
- 支持提取参数（正则提取器、JSON提取器）
- 支持聚合图表、生成 HTML 报告
- 可以用命令行压测并集成到 CI/CD

------

## 📌 命令行模式压测

```bash
jmeter -n -t your_test_plan.jmx -l result.jtl -e -o report_dir
```

说明：

- `-n`：非GUI模式
- `-t`：测试脚本文件
- `-l`：结果文件
- `-e -o`：自动生成HTML报告