> [Ollama常用命令](../软件/命令册/Ollama常用命令.md)
>
> [局域网部署及使用Ollama模型](../软件/局域网部署及使用Ollama模型.md)

# 2024年常见Ollama大模型对比

最近对大模型很感兴趣，于是下载了许多热门的大模型：

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411291435178.png" alt="image-20241129143511099" style="zoom:50%;" />

我之前就听闻`llama`很出名，这是由meta推出的聊天模型，还有阿里的`qwen`（通义千问），以及很火的数学推理模型`mathstral`，和图文识别模型`llava`。那么模型准备好了，就开始对比吧

> 先说结论吧：[qwen2.5-coder](https://ollama.com/library/qwen2.5-coder)应该是截止2024年最适合程序员的本地大模型了！

# 常识题

这一轮表现差不多，基本都能答出来，但是总体上感觉`qwen:14b`的语言更简洁点。

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411291440600.png" alt="image-20241129144001551" style="zoom:50%;" />

# 逻辑思维题

这里答案应该是**钢**，只有`qwen:14b`和`qwen:7b`答对了

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411291443917.png" alt="image-20241129144354875" style="zoom:50%;" />

# 数学推理题

然后是数学推理题，大家答得都差不多

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411291446084.png" alt="image-20241129144624052" style="zoom:50%;" />

# 代码编写题

重点来了，对于程序员来说，最重要的是写代码的能力，这一项可以说`qwen`赢麻了，因为它本身就是为了code而准备的。

为了测试，我去leetcode找了几道题，涵盖简单-中等-困难。

## 题目

首先，我们看一下题目：
<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411291453786.png" alt="image-20241129145309718" style="zoom:50%;" />

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411291453286.png" alt="image-20241129145329259" style="zoom: 50%;" />

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411291454854.png" alt="image-20241129145402828" style="zoom:50%;" />

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411291454751.png" alt="image-20241129145421719" style="zoom:50%;" />

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411291454152.png" alt="image-20241129145441111" style="zoom:50%;" />

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411291455524.png" alt="image-20241129145500480" style="zoom:50%;" />

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411291455469.png" alt="image-20241129145519432" style="zoom:50%;" />

## llama

llama的表现不尽人意，首先在简单题就翻车了，第4题找中位数就不会了。。。

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411291456529.png" alt="image-20241129145648500" style="zoom: 33%;" />

第8题，代码都写错了，逆天，我后面都不想测了。。。

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411291506165.png" alt="image-20241129150619113" style="zoom:33%;" />

第9题，回文数也寄了，x不是int类型的吗？哪儿来的length()方法，int又不是包装的类型，逆天，llama，out！

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411291509862.png" alt="image-20241129150902826" style="zoom:33%;" />

## mastral

和`llama`一样，直接第4题就不会了。

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411291504599.png" alt="image-20241129150420554" style="zoom: 33%;" />

字符串转换整数 (atoi)，直接秒了，还不错。

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411291505768.png" alt="image-20241129150529717" style="zoom:33%;" />

回文数这道题也答出来了，但是复杂度有点高

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411291510644.png" alt="image-20241129151001599" style="zoom:33%;" />

正则表达式这道题mathstral和qwen直接秒了，看来这道题困难题还是简单了。。

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411291512340.png" alt="image-20241129151246300" style="zoom:25%;" />

然后是比较难的K链表翻转，两个人都没做出来，通过率只有1/6左右。。

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411291514117.png" alt="image-20241129151456081" style="zoom:25%;" />

接雨水这道题，mathstral秒了。

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411291519496.png" alt="image-20241129151932453" style="zoom:33%;" />

最后一道，N皇后排列问题，这里mathstral居然犯了语法的错误？！此时`row`已经定义过了，所以这个变量不能起这个名字，挺可惜的，遗憾输给了qwen。

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411291522103.png" alt="image-20241129152222041" style="zoom:33%;" />





## qwen

中位数轻松秒杀。

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411291503736.png" alt="image-20241129150321686" style="zoom:33%;" />

Qwen这道题也轻松秒杀。

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411291507881.png" alt="image-20241129150708829" style="zoom:33%;" />

回文数这道题，qwen答得比mathstral更好。

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411291510652.png" alt="image-20241129151024598" style="zoom:33%;" />

正则表达式结果与mathstral难分伯仲，具体就不对比了。

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411291512340.png" alt="image-20241129151246300" style="zoom:25%;" />

K链表翻转，和mathstral一样都做不出来。

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411291514117.png" alt="image-20241129151456081" style="zoom:25%;" />

差距来了，接雨水这道题，qwen也直接秒了！

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411291516626.png" alt="image-20241129151608581" style="zoom: 33%;" />

qwen这里依然猛，复杂度也挺好，胜负已分！

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411291523380.png" alt="image-20241129152356338" style="zoom:33%;" />

# 关于qwen参数量的选择

在运行中，我发现在12400+3070的机器上，运行14b的模型，吐词的速度会比较慢，而7b和3b的吐词速度比较快，而14b和7b相比差距并不大，所以这里我推荐使用7b大小左右的模型，否则的话就需要上更高的配置了。

[qwen2.5-coder:7b](https://ollama.com/library/qwen2.5-coder)

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411291525546.png" alt="Benchmarks" style="zoom:25%;" />

# 图文识别

此处额外测试一下`llava`的图文识别能力，发现它的上下文联系记忆太强了，后续竟然出现了大量幻觉了！

我就笑笑吧～～～

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411291527678.png" alt="image-20241129152757617" style="zoom:50%;" />