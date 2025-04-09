# 类ChatGPT模型的请求与返回参数详解

参考项目：https://github.com/01Petard/ai-rag-knowledge

本博客相关项目：https://github.com/01Petard/lesson

<hr>

先看一下这一类模型的请求参数和响应参数有哪些

# Json格式规范

> 关于Json的格式，可以使用Postman发送请求来查看

## 查看模型（Ollama）

请求路径：

```http
GET http://localhost:11434/api/tags
```

请求体：

```json
{
    "models": [
        {
            "name": "nomic-embed-text:latest",
            "model": "nomic-embed-text:latest",
            "modified_at": "2025-03-26T15:35:29.2858559+08:00",
            "size": 274302450,
            "digest": "0a109f422b47e3a30ba2b10eca18548e944e8a23073ee3f3e947efcf3c45e59f",
            "details": {
                "parent_model": "",
                "format": "gguf",
                "family": "nomic-bert",
                "families": [
                    "nomic-bert"
                ],
                "parameter_size": "137M",
                "quantization_level": "F16"
            }
        },
        {
            "name": "deepseek-r1:1.5b",
            "model": "deepseek-r1:1.5b",
            "modified_at": "2025-03-26T15:26:09.3020976+08:00",
            "size": 1117322599,
            "digest": "a42b25d8c10a841bd24724309898ae851466696a7d7f3a0a408b895538ccbc96",
            "details": {
                "parent_model": "",
                "format": "gguf",
                "family": "qwen2",
                "families": [
                    "qwen2"
                ],
                "parameter_size": "1.8B",
                "quantization_level": "Q4_K_M"
            }
        }
    ]
}
```

## 请求（Ollama）

请求路径：

```http
POST http://localhost:11434/api/chat
```

> 由于本地Ollama没有令牌校验，所以不需要设置请求头，就算需要的话也直接走系统或网关的身份校验

请求体：

```json
{
    "model": "deepseek-r1:1.5b",
    "messages": [
        {
            "role": "system",
            "content": "你是一个热心的智能助手，你的名字叫小团团，请你以小团团的身份回答用户的问题"
        },
        {
            "role": "user",
            "content": "写一首秋天的诗"
        }
    ],
    "stream": false,
    "temperature":0.5
}
```

**其他可选参数（根据具体 API 支持情况）**

- **`max_tokens`**：限制生成的最大 token 数量。
- **`top_p`**：控制采样策略，只保留累积概率达到 `top_p` 的候选词。
- **`n`**：生成的回复数量。
- **`stop`**：指定停止生成的字符串或标记。

## 响应（Ollama）

```json
{
    "model": "deepseek-r1:1.5b",
    "created_at": "2025-04-03T07:06:31.0633017Z",
    "message": {
        "role": "assistant",
        "content": "<think>\n好的，我现在需要帮用户写一首秋天的诗。首先，我得想想秋天的特点是什么。秋天通常会有浓绿的叶子、果实，还有凉爽的风。\n\n接下来，考虑诗的主题和情感基调。用户只要求写一首诗，所以风格可以偏向简洁优美或者有诗意。或许可以从自然景色入手，比如描述树叶、花朵，或者描绘某种动态景象。\n\n然后，构思诗句的内容。第一句可以讲一片红叶，用“一片红云”来表达颜色。第二句可以用风的动作，比如轻摇，来营造变化感。“轻摇一缕烟雾”这样既有动作又有视觉效果。\n\n接下来描写阳光和叶片的光合作用，“三载阳光照叶间”，表现出秋天的温暖。第三句可以写花儿在风中摇曳，带来一丝凉意，“花儿摇曳几度秋”，这样自然过渡。\n\n最后一句描绘果实成熟，比如“一粒果实挂树梢”，同时加入一些动态元素，让画面更生动。“风拂一粒果”，这样整体上连贯起来。\n\n现在检查一下诗的整体意境是否符合秋天的氛围。色彩、动态的描写都到位，情感表达也到位。然后，再调整用词是否准确，是否有更好的词汇可以替换。\n\n最后，确保诗句流畅，没有语法错误，并且押韵或节奏感良好，让整首诗读起来顺口，有画面感。\n</think>\n\n## 《秋风》\n\n一片红云\n轻摇一缕烟雾\n三载阳光照叶间\n花儿摇曳几度秋\n一粒果实挂树梢\n风拂一粒果"
    },
    "done_reason": "stop",  // 生成结束的原因,stop表示模型正常完成生成。
    "done": true,  // 是否已完成生成
    "total_duration": 3962355800,    // 整个请求处理的总耗时（单位：纳秒），1纳秒=10^-9秒
    "load_duration": 22984600,       // 加载模型的耗时（单位：纳秒）
    "prompt_eval_count": 31, // 解析提示（prompt）过程中处理的 token 数量
    "prompt_eval_duration": 4924300, // 解析提示（prompt）的耗时（单位：纳秒）
    "eval_count": 345,  // 生成回复过程中处理的 token 数量
    "eval_duration": 3932785600      // 生成回复的耗时（单位：纳秒）
}
```

## 请求（DeepSeek）

请求路径：

```http
POST https://api.deepseek.com/v1/chat/completions
```

请求头：

```http
Authorization Bearer sk-3590a0531ce64285be4d35a4eb742225
```

请求体：

```json
{
    "model": "deepseek-chat",
    "messages": [
        {
            "role": "system",
            "content": "你是一个热心的智能助手，你的名字叫小团团，请你以小团团的身份回答用户的问题"
        },
        {
            "role": "user",
            "content": "写一首秋天的诗"
        }
    ],
    "stream": false,
    "temperature": 0.5
}
```

## 响应（DeepSeek）

```json
{
    "id": "268db87a-777f-40b0-94ee-e0fe5e52b6ab",
    "object": "chat.completion",
    "created": 1743671421,
    "model": "deepseek-chat",
    "choices": [
        {
            "index": 0,
            "message": {
                "role": "assistant",
                "content": "《秋日私语》  \n\n风儿轻摇银杏树，  \n金叶飘落小路铺。  \n松鼠藏起小松果，  \n准备暖暖过冬住。  \n\n稻田翻起金色浪，  \n农人笑颜映夕阳。  \n大雁排成\"人\"字行，  \n飞向南方寻暖乡。  \n\n快来踩踩落叶毯，  \n沙沙声响像琴键。  \n秋天是首温柔歌，  \n唱给大地慢慢听。  \n\n——小团团送给你的秋日小诗"
            },
            "logprobs": null,
            "finish_reason": "stop"
        }
    ],
    "usage": {
        "prompt_tokens": 27,
        "completion_tokens": 110,
        "total_tokens": 137,
        "prompt_tokens_details": {
            "cached_tokens": 0
        },
        "prompt_cache_hit_tokens": 0,
        "prompt_cache_miss_tokens": 27
    },
    "system_fingerprint": "fp_3d5141a69a_prod0225"
}
```

# Java类的定义

## 请求类（通用）

```java
@Data
public class ModelRequest {
    /**
     * 模型名称
     */
    private String model;
    /**
     * 发送给模型的prompt
     */
    private List<MessageBO> messages;

    @Data
    public static class MessageBO {
        private String role;
        private String content;
    }
    /**
     * 是否流式返回
     */
    private boolean stream;
    /**
     * 控制生成文本的随机性（0 表示确定性最高，1 表示更随机）
     */
    private double temperature;

}
```

## 响应类（Ollama）

```java
@Data
public class OllamaResponse {
    /**
     * 模型名称
     */
    @JsonProperty("model")
    private String model;
    /**
     * 生成时间
     */
    @JsonProperty("created_at")
    private String createdAt;
    /**
     * 生成的回复信息
     */
    @JsonProperty("message")
    private ModelRequest.MessageBO message;

    /**
     * 生成结束的原因,stop表示模型正常完成生成。
     */
    @JsonProperty("done_reason")
    private String doneReason;
    /**
     * 是否已完成生成
     */
    @JsonProperty("done")
    private boolean done;
    /**
     * 整个请求处理的总耗时（单位：纳秒），1纳秒=10^-9秒
     */
    @JsonProperty("total_duration")
    private long totalDuration;
    /**
     * 加载模型的耗时（单位：纳秒）
     */
    @JsonProperty("load_duration")
    private long loadDuration;
    /**
     * 解析提示（prompt）过程中处理的 token 数量
     */
    @JsonProperty("prompt_eval_count")
    private int promptEvalCount;
    /**
     * 解析提示（prompt）的耗时（单位：纳秒）
     */
    @JsonProperty("prompt_eval_duration")
    private long promptEvalDuration;
    /**
     * 生成回复过程中处理的 token 数量
     */
    @JsonProperty("eval_count")
    private int evalCount;
    /**
     * 生成回复的耗时（单位：纳秒）
     */
    @JsonProperty("eval_duration")
    private long evalDuration;
}
```

## 响应类（DeepSeek）

```java
@Data
public class DeepSeekResponse {
    @JsonProperty("id")
    private String id;

    @JsonProperty("object")
    private String object;

    @JsonProperty("created")
    private Long created;

    @JsonProperty("model")
    private String model;

    @JsonProperty("choices")
    private List<Choice> choices;

    @JsonProperty("usage")
    private Usage usage;

    @JsonProperty("system_fingerprint")
    private String systemFingerprint;

    @Data
    public static class Choice {
        @JsonProperty("index")
        private Integer index;

        @JsonProperty("message")
        private MessageBO message;

        @JsonProperty("logprobs")
        private Object logprobs; // 根据实际需求可改为String或自定义类型

        @JsonProperty("finish_reason")
        private String finishReason; // 或定义枚举类型
    }

    @Data
    public static class MessageBO {
        @JsonProperty("role")
        private String role;

        @JsonProperty("content")
        private String content;
    }

    @Data
    public static class Usage {
        @JsonProperty("prompt_tokens")
        private Integer promptTokens;

        @JsonProperty("completion_tokens")
        private Integer completionTokens;

        @JsonProperty("total_tokens")
        private Integer totalTokens;

        @JsonProperty("prompt_tokens_details")
        private PromptTokensDetails promptTokensDetails;

        @JsonProperty("prompt_cache_hit_tokens")
        private Integer promptCacheHitTokens;

        @JsonProperty("prompt_cache_miss_tokens")
        private Integer promptCacheMissTokens;
    }

    @Data
    public static class PromptTokensDetails {
        @JsonProperty("cached_tokens")
        private Integer cachedTokens;
    }
}
```

# 测试调用

## 测试本地部署的方式

```java
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hzx.lesson.common.utils.HttpUtils;
import com.hzx.lesson.model.entity.DeepSeekResponse;
import com.hzx.lesson.model.entity.ModelRequest;
import com.hzx.lesson.model.entity.OllamaResponse;
import org.apache.commons.lang3.StringUtils;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.util.EntityUtils;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@SpringBootTest
class ChatTests {

    private ModelRequest createRequest(String modelName, String systemPrompt, String userPrompt) {
        ModelRequest request = new ModelRequest();
        request.setModel(modelName);
        request.setStream(false);
        request.setTemperature(0.5);

        List<ModelRequest.MessageBO> messages = new ArrayList<>();

        // 系统消息（始终放在首位）
        if (StringUtils.isNotBlank(systemPrompt)) {
            messages.add(createMessage("system", systemPrompt));
        }

        // 用户消息
        messages.add(createMessage("user", userPrompt));

        request.setMessages(messages);
        return request;
    }

    private ModelRequest.MessageBO createMessage(String role, String content) {
        ModelRequest.MessageBO message = new ModelRequest.MessageBO();
        message.setRole(role);
        message.setContent(content);
        return message;
    }

    // 具体请求方法
    private ModelRequest handleOllamaRequest() {
        return createRequest(
                "deepseek-r1:1.5b",
                "你是一个热心的智能助手，你的名字叫小团团，请你以小团团的身份回答用户的问题",
                "写一首秋天的诗"
        );
    }

    private ModelRequest handleDeepSeekRequest() {
        return createRequest(
                "deepseek-chat",
                "你是一个热心的智能助手，你的名字叫小团团，请你以小团团的身份回答用户的问题",
                "写一首秋天的诗"
        );
    }


    // 封装的公共方法（泛型）
    private <T> T parseResponse(HttpEntity entity, ObjectMapper objectMapper, Class<T> responseType) throws IOException {
        if (entity == null) {
            return null;
        }
        String responseBody = EntityUtils.toString(entity, StandardCharsets.UTF_8);
        return objectMapper.readValue(responseBody, responseType);
    }

    @Test
    void chat_ollama() throws Exception {

        // 1. 创建请求对象
        ModelRequest request = handleOllamaRequest();

        // 2. 序列化为JSON
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonBody = objectMapper.writeValueAsString(request);

        // 3. 发送POST请求
        Map<String, String> headers = new HashMap<>();
        headers.put("Content-Type", "application/json");

        HttpResponse response = HttpUtils.doPost(
                "http://localhost:11434",
                "/api/chat",
                headers,
                null,
                jsonBody
        );


        // 4. 解析响应
        OllamaResponse ollamaResponse = parseResponse(response.getEntity(), objectMapper, OllamaResponse.class);
        System.out.println("Ollama Response Status: " + response.getStatusLine());
        System.out.println("Ollama Response Body: " + ollamaResponse.toString());
    }


    private static final String DEEPSEEK_API_KEY = "sk-3590a0531ce64285be4d35a4eb742225";
    private static final String DEEPSEEK_HOST = "https://api.deepseek.com";
    private static final String DEEPSEEK_HOST_PATH = "/v1/chat/completions";

    @Test
    void chat_deepseek() throws Exception {
        // 1. 创建请求对象
        ModelRequest request = handleDeepSeekRequest();

        // 2. 序列化为JSON
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonBody = objectMapper.writeValueAsString(request);

        // 3. 发送POST请求
        Map<String, String> headers = new HashMap<>();
        headers.put("Accept", "application/json");
        headers.put("Content-Type", "application/json");
        headers.put("Authorization", "Bearer " + DEEPSEEK_API_KEY);

        HttpResponse response = HttpUtils.doPost(
                DEEPSEEK_HOST,
                DEEPSEEK_HOST_PATH,
                headers,
                null,
                jsonBody
        );

        // 4. 解析响应
        DeepSeekResponse deepSeekResponse = parseResponse(response.getEntity(), objectMapper, DeepSeekResponse.class);
        System.out.println("DeepSeek Response Status: " + response.getStatusLine());
        System.out.println("DeepSeek Response Body: " + deepSeekResponse.toString());

    }


}
```

## 网络请求工具类

> 其实我只用到了`doPost`这个方法

```java
public static HttpResponse doPost(String host, String path,
                                  Map<String, String> headers,
                                  Map<String, String> querys,
                                  String body)
    throws Exception {
    HttpClient httpClient = wrapClient(host);

    HttpPost request = new HttpPost(buildUrl(host, path, querys));
    for (Map.Entry<String, String> e : headers.entrySet()) {
        request.addHeader(e.getKey(), e.getValue());
    }

    if (StringUtils.isNotBlank(body)) {
        request.setEntity(new StringEntity(body, "utf-8"));
    }

    return httpClient.execute(request);
}
```

完整的工具类代码如下，需要自取：

https://github.com/01Petard/lesson/blob/main/src/main/java/com/hzx/lesson/common/utils/HttpUtils.java

# 用Spring AI的框架封装

TODO
