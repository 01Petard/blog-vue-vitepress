# Ollama 常用命令

[Ollama官网](https://ollama.com/) · [模型库](https://ollama.com/library/) · [GitHub](https://github.com/ollama/ollama/)

Ollama 是一个轻量级本地大语言模型运行平台，支持命令行管理和 API 调用。

## 环境配置

| 环境变量 | 说明 | 示例值 |
|---------|------|--------|
| `OLLAMA_HOME` | Ollama 安装目录 | `D:\Ollama` |
| `OLLAMA_MODELS` | 模型下载目录（改这里可缓解 C 盘压力） | `D:\Ollama_models` |
| `OLLAMA_HOST` | 服务监听地址 | `0.0.0.0:11434` |

---

## 模型管理

### 拉取模型

```bash
ollama pull <model_name>
```

### 列出本地模型

```bash
ollama list
```

### 删除模型

```bash
ollama rm <model_name>
```

### 查看模型信息

```bash
ollama show <model_name> --modelfile    # 查看模型配置（Modelfile）
ollama show <model_name> --parameters   # 查看运行参数
```

### 自定义模型（Modelfile）

创建 `Modelfile` 文件：

```dockerfile
FROM llama3
PARAMETER temperature 0.7    # 随机性 0-1
PARAMETER num_ctx 4096       # 上下文窗口长度
SYSTEM """你是一个严谨的学术助手，回答需引用论文来源。"""
```

构建并运行：

```bash
ollama create my-model -f ./Modelfile
ollama run my-model
```

---

## 运行与对话

### 直接对话（一次性）

```bash
ollama run llama3 "用中文写一首关于秋天的诗"
```

### 交互模式

```bash
ollama run llama3
# 进入交互终端，输入内容即对话，/bye 或 Ctrl+D 退出
```

### 从文件输入

```bash
ollama run llama3 -f input.txt
```

### 设置系统提示词

```bash
ollama run llama3 --system "You are a medical assistant."
```

### 流式控制参数

| 参数 | 作用 |
|------|------|
| `--verbose` | 显示详细日志 |
| `--nowordwrap` | 禁用自动换行 |
| `--stream` | 启用流式输出 |

---

## 服务模式

### 启动 API 服务

```bash
ollama serve
```

默认监听 `http://127.0.0.1:11434`。

### 自定义端口与地址

```bash
ollama serve --port 8080 --host 0.0.0.0
```

### HTTP 调用示例

```bash
curl http://localhost:11434/api/generate -d '{
  "model": "llama3",
  "prompt": "你好",
  "stream": false
}'
```

更多 API 接口见 [Ollama API 文档](https://github.com/ollama/ollama/blob/main/docs/api.md)。

---

## 调试与帮助

```bash
ollama --version          # 查看版本
ollama help               # 查看帮助
ollama pull --help        # 查看子命令帮助
```

---

## 常用命令速查

| 操作 | 命令 |
|------|------|
| 下载模型 | `ollama pull <model>` |
| 列出模型 | `ollama list` |
| 删除模型 | `ollama rm <model>` |
| 运行模型 | `ollama run <model>` |
| 自定义模型 | `ollama create <name> -f Modelfile` |
| 启动服务 | `ollama serve` |
| 查看版本 | `ollama --version` |
