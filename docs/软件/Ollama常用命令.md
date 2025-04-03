Ollama 是一个轻量级的本地大语言模型平台，支持命令行操作。以下是一些常见的 Ollama 命令行使用方法及其功能简介：

[Ollama官网](https://ollama.com/)

[Ollama模型库](https://ollama.com/library/)

[Ollama的Github地址](https://github.com/ollama/ollama/)

## **1. 模型管理**

### 配置环境

**Ollama的文件目录**

`OLLAMA_HOME`：D:\Ollama

**Ollama的模型下载目录（有效缓解C盘压力）**

`OLLAMA_MODELS`：D:\Ollama_models

**Ollama的服务端口**

`OLLAMA_HOST`：0.0.0.0:11434

### **拉取模型**

```bash
ollama pull <model_name>
```

### **列出本地模型**

```bash
ollama list
```

### **删除模型**

```bash
ollama delete <model_name>
```

------

## **2. 模型交互**

### **与模型对话**

直接与本地模型交互，提供一个提示并得到响应：

```bash
ollama chat <model_name>
```

进入交互模式后，输入提示语以与模型对话。

### **一次性对话**

```bash
ollama prompt llama2 "What is the capital of France?"
```

### **指定上下文交互**

通过文件或之前的对话设置上下文：

```bash
ollama chat --context <file_path> <model_name>
```

示例：

```bash
ollama chat --context ./my_context.txt llama2
```

------

## **3. 服务模式**

### **启动服务**

将 Ollama 作为 HTTP API 运行：

```bash
ollama serve
```

默认会在 `http://127.0.0.1:11434` 上监听。

### **指定监听端口和地址**

```bash
ollama serve --port <port> --host <host>
```

示例：

```bash
ollama serve --port 8080 --host 0.0.0.0
```

### 指定运行的模型

```bash
ollama serve --model llama3.2
```

------

## **4. 配置相关**

### **查看配置**

列出当前的 Ollama 配置信息：

```bash
ollama config
```

### **设置配置**

修改或设置 Ollama 配置，例如切换运行模式：

```bash
ollama config set <key> <value>
```

示例：

```bash
ollama config set mode fast
```

### **重置配置**

重置 Ollama 配置为默认值：

```bash
ollama config reset
```

------

## **5. 调试和帮助**

### **检查版本**

```bash
ollama version
```

### **获取帮助**

```bash
ollama help
```

### **命令帮助**

```bash
ollama pull --help
```

------

## **6. 进阶操作**

### **流式输出**

在交互时启用流式输出：

```bash
ollama chat <model_name> --stream
```

### **设置自定义系统消息**

调整模型的系统级提示信息：

```bash
ollama chat llama2 --system "You are an assistant focused on medical topics."
```

### **从文件输入提示**

直接从文件中加载提示语：

```bash
ollama prompt llama2 --file input.txt
```

------

## **7. 示例命令汇总**

| 功能             | 命令示例                                              |
| ---------------- | ----------------------------------------------------- |
| 下载模型         | `ollama pull llama2`                                  |
| 查看本地模型列表 | `ollama list`                                         |
| 删除模型         | `ollama delete llama2`                                |
| 启动服务         | `ollama serve --port 8080 --host 0.0.0.0`             |
| 与模型交互       | `ollama chat llama2`                                  |
| 一次性对话       | `ollama prompt llama2 "Tell me a story about space."` |
| 查看配置         | `ollama config`                                       |
| 修改配置         | `ollama config set mode fast`                         |
| 检查版本         | `ollama version`                                      |

------

