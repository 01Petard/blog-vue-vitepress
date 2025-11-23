import {defineConfig} from 'vitepress';
import markdownItTaskList from "markdown-it-task-lists";
import timeline from "vitepress-markdown-timeline";
import container from "markdown-it-container";
import attrs from "markdown-it-attrs";

export default defineConfig({
  base: "/",
  build: {
    outDir: 'docs'   //构建产物输出目录
  },
  lang: 'zh-cn',
  title: "代码港湾",
  description: "个人技术知识体系矩阵",
  head: [
    ["link", {rel: "icon", href: `/img/favicon.ico`}],  // 网站的图标（显示在浏览器的 tab 上）
  ],
  markdown: {
    lineNumbers: true, // 显示代码行号
    config: (md) => {
      md.use(markdownItTaskList)        // ✅ 任务列表
      md.use(timeline)                  // ✅ 时间轴
      md.use(container, "tip")          // ✅ 自定义容器（如提示框）
      md.use(attrs)                     // ✅ 让 Markdown 支持 HTML 属性
    },
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    },
  },
  ignoreDeadLinks: true, // 关闭死链接检查
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: 'https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202412172202944.png',
    // 开启本地搜索
    search: {
      provider: "local"
    },
    // 修改侧边栏导航的标题
    outline: {
      level: [1, 2, 3, 4],
      label: "目录导航"
    },
    // 文档页脚的文字
    docFooter: {
      prev: "上一页",
      next: "下一页"
    },
    returnToTopLabel: "回到顶部",
    sidebarMenuLabel: "菜单",
    darkModeSwitchLabel: "主题",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchTitle: "切换到深色模式",
    nav: [
      {text: '主页', link: '/index'},
      {
        text: '开发',
        items: [
          {text: '目录', link: '/开发/index'},
          {text: '后端', link: '/开发/后端/index'},
          {text: '前端', link: '/开发/前端/index'},
          {text: 'Guide', link: '/开发/My Java Guide/index'},
        ]
      },
      {
        text: '软件',
        items: [
          {text: '目录', link: '/软件/index'},
          {text: '命令册', link: '/软件/命令册/index'},
          {text: 'Linux', link: '/软件/Linux/index'},
          {text: 'MacOS', link: '/软件/MacOS/index'},
          {text: 'Windows', link: '/软件/Windows/index'},
          {text: 'Python', link: '/软件/Python/index'},
        ]
      },
      {text: '硬件', link: '/硬件/index'},
      {text: '杂谈', link: '/杂谈/index'},
      {text: '关于我', link: '/about'},
    ],
    sidebar: {
      '/开发/': [
        {
          text: '开发',
          items: [
            {text: "大量设备数据上报存储的简单方案设计", link: "/开发/大量设备数据上报存储的简单方案设计"},
            {text: "SSE的特点、场景与技术解析", link: "/开发/SSE的特点、场景与技术解析"},
            {text: "PostgreSQL vs MySQL", link: "/开发/PostgreSQL%20vs%20MySQL"},
            {text: "Intellij IDEA fileTemplates文件模板", link: "/开发/Intellij%20IDEA%20fileTemplates文件模板"},
            {text: "简单理解正向代理和反向代理", link: "/开发/简单理解正向代理和反向代理"},
            {text: 'Nginx配置文件说明', link: '/开发/Nginx配置文件说明'},
            {text: "Nginx的配置和使用命令", link: "/开发/Nginx的配置和使用命令"},
            {
              text: "后端",
              collapsed: false,
              items: [
                {text: "将Java项目打包为Docker镜像", link: "/开发/后端/将Java项目打包为Docker镜像"},
                {text: "配置PHP和Composer环境", link: "/开发/后端/配置PHP和Composer环境"},
                {text: "PHP框架与Java框架对比", link: "/开发/后端/PHP框架与Java框架对比"},
                {text: 'PHP和JAVA的语法对比', link: '/开发/后端/PHP和JAVA的语法对比'},
                {text: 'Spring注解——缓存、定时任务、异步任务', link: '/开发/后端/Spring注解——缓存、定时任务、异步任务'},
                {text: 'Function Call的实现与调用链分析', link: '/开发/后端/Function%20Call的实现与调用链分析'},
                {text: '常见后端框架性能对比（纯主观）', link: '/开发/后端/常见后端框架性能对比（纯主观）'},
                {text: '详解微信小程序的注册、登录和支付的实现', link: '/开发/后端/详解微信小程序的注册、登录和支付的实现'},
                {text: '低、中、高并发情况下的库存扣减处理方案', link: '/开发/后端/低、中、高并发情况下的库存扣减处理方案'},
                {text: 'LangChain4j大模型对话应用快速入门', link: '/开发/后端/LangChain4j大模型对话应用快速入门'},
                {text: "如何微调大模型并暴露接口给后端调用", link: "/开发/后端/如何微调大模型并暴露接口给后端调用"},
                {text: '使用ANSI编码控制终端日志颜色', link: '/开发/后端/使用ANSI编码控制终端日志颜色'},
                {text: '字符串校验中isBlank、isEmpty、isNull怎么用', link: '/开发/后端/字符串校验中isBlank、isEmpty、isNull怎么用'},
                {text: '商城系统经典问题分析', link: '/开发/后端/商城系统经典问题分析'},
                {text: 'JMeter快速上手指南', link: '/开发/后端/JMeter快速上手指南'},
                {text: '高并发系统发现Redis热点数据几种实现方式', link: '/开发/后端/高并发系统发现Redis热点数据几种实现方式'},
                {text: '常被忽视的“外键约束”和“唯一约束”', link: '/开发/后端/常被忽视的“外键约束”和“唯一约束”'},
                {text: 'JSR303数据校验指南', link: '/开发/后端/JSR303数据校验指南'},
                {text: 'MyBatis-Plus动态拼接简化SQL操作', link: '/开发/后端/MyBatis-Plus动态拼接简化SQL操作'},
                {text: 'record的使用说明', link: '/开发/后端/record的使用说明'},
                {text: '如何保证redis中的数据都是热点数据', link: '/开发/后端/如何保证redis中的数据都是热点数据'},
                {text: '类ChatGPT模型的请求与返回参数详解', link: '/开发/后端/类ChatGPT模型的请求与返回参数详解'},
                {text: '使用Arthas分析接口的响应速度', link: '/开发/后端/使用Arthas分析接口的响应速度'},
                {text: 'Go的前后端开发快速上手指南', link: '/开发/后端/Go的前后端开发快速上手指南'},
                {text: '一对多的数据交互方案设计', link: '/开发/后端/一对多的数据交互方案设计'},
                {text: '最佳实践-参数校验', link: '/开发/后端/最佳实践-参数校验'},
                {text: '最佳实践-日志记录', link: '/开发/后端/最佳实践-日志记录'},
                {text: '搭建K8S集群环境', link: '/开发/后端/搭建K8S集群环境'},
                {text: '抖音评论区设计', link: '/开发/后端/抖音评论区设计'},
                {text: 'MYDB操作手册', link: '/开发/后端/MYDB操作手册'},
                {text: '批量导出zip压缩包和Excel表格', link: '/开发/后端/批量导出zip压缩包和Excel表格'},
                {text: '阿里云OSS和内容安全Java实现参考代码', link: '/开发/后端/阿里云OSS和内容安全Java实现参考代码'},
                {text: 'SSO单点登录的实现原理', link: '/开发/后端/SSO单点登录的实现原理'},
                {text: 'ThreadLocal原理和使用', link: '/开发/后端/ThreadLocal原理和使用'},
                {text: '对Java中多态的理解', link: '/开发/后端/对Java中多态的理解'},
                {text: 'JDBC和JAVA类型对比', link: '/开发/后端/JDBC和JAVA类型对比'},
                {text: 'C++的STL库常见函数', link: '/开发/后端/C++的STL库常见函数'},
                {text: "Junit5断言的代码使用", link: "/开发/后端/Junit5断言的代码使用"},
                {text: "Kafka原理", link: "/开发/后端/Kafka原理"},
                {text: "kafka配置属性说明", link: "/开发/后端/kafka配置属性说明"},
                {text: "MongoDB和MySQL的常用语法对比", link: "/开发/后端/MongoDB和MySQL的常用语法对比"},
                {text: "MybatisPlus依赖和配置文件", link: "/开发/后端/MybatisPlus依赖和配置文件"},
                {text: "Mybatis注解开发使用举例", link: "/开发/后端/Mybatis注解开发使用举例"},
                {text: "MySql数据库命令", link: "/开发/后端/MySql数据库命令"},
                {text: "Netty与NIO的前世今生", link: "/开发/后端/Netty与NIO的前世今生"},
                {text: "Quarkus——云原生时代的Java框架", link: "/开发/后端/Quarkus云原生时代的Java框架"},
                {text: "RabbitMQ快速上手", link: "/开发/后端/RabbitMQ快速上手"},
                {text: "Redis在SpringBoot的配置", link: "/开发/后端/Redis在SpringBoot的配置"},
                {text: "Redis基本数据类型常用命令", link: "/开发/后端/Redis基本数据类型常用命令"},
                {text: "RocketMQ原理", link: "/开发/后端/RocketMQ原理"},
                {text: "SpringMVC注解和配置 + fastjson的简单使用", link: "/开发/后端/SpringMVC注解和配置+fastjson的简单使用"},
                {text: "thymeleaf的th-href带参数转跳", link: "/开发/后端/thymeleaf的th-href带参数转跳"},
                {text: "Tomcat启动关闭命令", link: "/开发/后端/Tomcat启动关闭命令"},
              ]
            },
            {
              text: "前端",
              collapsed: false,
              items: [
                {text: '学习Vue3有感', link: '/开发/前端/学习Vue3有感'},
                {text: 'ElementUI组件教程', link: '/开发/前端/ElementUI组件教程'},
                {text: 'Electron开发学习', link: '/开发/前端/electron'},
                {text: 'Vue的事件修饰符', link: '/开发/前端/Vue的事件修饰符'},
                {text: '几个免版权图片网站', link: '/开发/前端/几个免版权图片网站'},
                {text: 'CSS知识重点划注', link: '/开发/前端/CSS知识重点划注'},
                {text: 'HTML标签重点划注', link: '/开发/前端/HTML标签重点划注'},
              ]
            },
            {
              text: 'My Java Guide',
              collapsed: false,
              items: [
                {text: "My Java Guide - 计算机基础", link: "/开发/My Java Guide/My Java Guide - 计算机基础"},
                {text: "My Java Guide - Java基础", link: "/开发/My Java Guide/My Java Guide - Java基础"},
                {text: "My Java Guide - JVM", link: "/开发/My Java Guide/My Java Guide - JVM"},
                {text: "My Java Guide - 数据库", link: "/开发/My Java Guide/My Java Guide - 数据库"},
                {text: "My Java Guide - 缓存", link: "/开发/My Java Guide/My Java Guide - 缓存"},
                {text: "My Java Guide - Spring", link: "/开发/My Java Guide/My Java Guide - Spring"},
                {text: "My Java Guide - 分布式", link: "/开发/My Java Guide/My Java Guide - 分布式"},
                {text: "My Java Guide - 算法", link: "/开发/My Java Guide/My Java Guide - 算法"},
                {text: "My Java Guide - 项目", link: "/开发/My Java Guide/My Java Guide - 项目"},
              ]
            },
          ]
        }
      ],
      '/软件/': [
        {
          text: "软件",
          items: [
            {text: "软件项目全生命周期文档实施规范", link: "/软件/软件项目全生命周期文档实施规范"},
            {text: "自用常见系统环境配置文件", link: "/软件/自用常见系统环境配置文件"},
            {text: "缺陷管理工具的选择", link: "/软件/缺陷管理工具的选择"},
            {text: "容器化一键部署指南", link: "/软件/容器化一键部署指南"},
            {text: "数字孪生技术和预算调研", link: "/软件/数字孪生技术和预算调研"},
            {text: "局域网部署及使用Ollama模型", link: "/软件/局域网部署及使用Ollama模型"},
            {text: "基于YOLOv8模型的抽烟行为检测系统", link: "/软件/基于YOLOv8模型的抽烟行为检测系统"},
            {text: "JetBrains全家桶破解", link: "/软件/JetBrains全家桶破解"},
            {text: "关于bing国内重定向解决方案", link: "/软件/关于bing国内重定向解决方案"},
            {text: "哔哩哔哩成分鉴定器（个人魔改版）", link: "/软件/哔哩哔哩成分鉴定器（个人魔改版）"},
            {
              text: "命令册",
              collapsed: false,
              items: [
                {text: "Ollama常用命令", link: "/软件/命令册/Ollama常用命令"},
                {text: "命令行系统信息工具", link: "/软件/命令册/命令行系统信息工具"},
                {text: "Git的配置和使用命令", link: "/软件/命令册/Git的配置和使用命令"},
                {text: "Docker安装配置及使用命令", link: "/软件/命令册/Docker安装配置及使用命令"},
                {text: "nodejs相关命令", link: "/软件/命令册/nodejs相关命令"},
                {text: "ps和grep命令的用法", link: "/软件/命令册/ps和grep命令的用法"},
                {text: "zsh与bash的切换", link: "/软件/命令册/zsh与bash的切换"},
                {text: "安装oh-my-zsh主题", link: "/软件/命令册/安装oh-my-zsh主题"},
                {text: "安装oh-my-zsh", link: "/软件/命令册/安装oh-my-zsh"},
                {text: "curl命令的用法", link: "/软件/命令册/curl命令的用法"},
                {text: "Unix系统下的Shell命令", link: "/软件/命令册/Unix系统下的Shell命令"},
                {text: "Linux常用命令", link: "/软件/命令册/Linux常用命令"},
                {text: "Hexo常用命令", link: "/软件/命令册/Hexo常用命令"},
                {text: "ffmpeg使用命令", link: "/软件/命令册/ffmpeg使用命令"},
                {text: "markdown语法", link: "/软件/命令册/markdown语法"},
              ],
            },
            {
              text: "Linux",
              collapsed: false,
              items: [
                {text: "Ubuntu部署Jenkins并实现前后端的自动化构建与部署", link: "/软件/Linux/Ubuntu部署Jenkins并实现前后端的自动化构建与部署"},
                {text: "Ubuntu上固定无线的IP地址", link: "/软件/Linux/Ubuntu上固定无线的IP地址"},
                {text: "Ubuntu部署项目流程完整版", link: "/软件/Linux/Ubuntu部署项目流程完整版"},
                {text: "Atlassian家族软件部署安装指南", link: "/软件/Linux/Atlassian家族软件部署安装指南"},
                {text: "使用Caddy作为反向代理的坑", link: "/软件/Linux/使用Caddy作为反向代理的坑"},
                {text: "使用Docker安装OpenLDAP", link: "/软件/Linux/使用Docker安装OpenLDAP"},
                {text: "Caddy——实现全自动HTTPS加密", link: "/软件/Linux/Caddy——实现全自动HTTPS加密"},
                {text: "Jira和Confluence安装和配置记录", link: "/软件/Linux/Jira和Confluence安装和配置记录"},
                {text: "通过WebHook实现简易版CICD", link: "/软件/通过WebHook实现简易版CICD"},
                {text: "简易的GitLab CICD实现思路", link: "/软件/Linux/简易的GitLab CICD实现思路"},
                {text: "解决MySQL和Redis远程连接问题", link: "/软件/Linux/解决MySQL和Redis远程连接问题"},
                {text: "Ubuntu项目部署通用流程", link: "/软件/Linux/Ubuntu项目部署通用流程"},
                {text: "用Shell命令提取路径信息", link: "/软件/Linux/用Shell命令提取路径信息"},
                {text: "在服务器上部署hexo博客指南", link: "/软件/Linux/在服务器上部署hexo博客指南"},
              ]
            },
            {
              text: "MacOS",
              collapsed: false,
              items: [
                {
                  text: "一机双身份：Mac 同时配置 GitHub 和 GitLab 的 SSH 密钥与 Git 身份隔离指南",
                  link: "/软件/MacOS/一机双身份：Mac 同时配置 GitHub 和 GitLab 的 SSH 密钥与 Git 身份隔离指南"
                },
                {text: "Homebrew常用命令", link: "/软件/MacOS/Homebrew常用命令"},
                {text: "安装sdkman", link: "/软件/MacOS/安装sdkman"},
                {text: "Mac调整docker栏", link: "/软件/MacOS/Mac调整docker栏"},
                {text: "Mac查看固态使用情况", link: "/软件/MacOS/Mac查看固态使用情况"},
                {text: "Mac删除OBS的虚拟摄像头", link: "/软件/MacOS/Mac删除OBS的虚拟摄像头"},
                {text: "Mac上PD17虚拟机终端启动命令", link: "/软件/MacOS/Mac上PD17虚拟机终端启动命令"},
                {text: "option和shift特殊符号", link: "/软件/MacOS/option和shift特殊符号"},
                {text: "在ARM架构的Mac上运行exe程序", link: "/软件/MacOS/在ARM架构的Mac上运行exe程序"},
                {text: "切换jdk版本的方法（环境变量法）", link: "/软件/Linux/切换jdk版本的方法（环境变量法）"},
                {text: "切换jdk版本的方法（jenv法）", link: "/软件/Linux/切换jdk版本的方法（jenv法）"},
              ]
            },
            {
              text: "Windows",
              collapsed: false,
              items: [
                {text: "windows上重要的垃圾清理目录", link: "/软件/Windows/windows上重要的垃圾清理目录"},
                {text: "windows上用nginx", link: "/软件/Windows/windows上用nginx"},
                {text: "windows终端美化", link: "/软件/Windows/windows终端美化"},
                {text: "VMware固定虚拟机ip", link: "/软件/Windows/VMware固定虚拟机ip"},
                {text: "更改固态硬盘磁盘为GPT格式", link: "/软件/Windows/更改固态硬盘磁盘为GPT格式"},
                {text: "win批量删除特定格式开头的文件", link: "/软件/Windows/win批量删除特定格式开头的文件"},
                {text: "Windows上解决端口占用", link: "/软件/Windows/Windows上解决端口占用"},
                {text: "winWindows11安装卸载安卓软件", link: "/软件/Windows/winWindows11安装卸载安卓软件"},
              ]
            },
            {
              text: "Python",
              collapsed: false,
              items: [
                // {text: "My Python Guide", link: "/软件/Python/My Python Guide"},
                {text: "Python软件测试从入门到入坟", link: "/软件/Python/Python软件测试从入门到入坟"},
                {text: "uv使用指南", link: "/软件/Python/uv使用指南"},
                {text: "人工智能十大算法", link: "/软件/Python/人工智能十大算法"},
                {text: "conda创建虚拟环境，安装Pytorch", link: "/软件/Python/conda创建虚拟环境，安装Pytorch"},
                {text: "解决Anaconda安装后命令行前出现(base)", link: "/软件/Python/解决Anaconda安装后命令行前出现(base)"},
                {
                  text: "jupyter相关",
                  collapsed: false,
                  items: [
                    {text: "jupyter 常用操作和命令", link: "/软件/Python/jupyter常用操作和命令"},
                    {text: "jupyter 增加、删除内核", link: "/软件/Python/jupyter增加、删除内核"},
                    {text: "jupyter 快捷键", link: "/软件/Python/jupyter notebook快捷键"},
                    {text: "jupyter 更换主题", link: "/软件/Python/jupyter更换主题"},
                  ]
                },
                {text: "Pytorch下载配置，Anaconda创建虚拟环境", link: "/软件/Python/Pytorch下载配置，Anaconda创建虚拟环境"},
                {text: "torch常用命令", link: "/软件/Python/torch常用命令"},
                {text: "YOLOv5的使用", link: "/软件/Python/YOLOv5的使用"},
                {text: "图像处理模块封装函数", link: "/软件/Python/图像处理模块封装函数"},
              ]
            },
          ]
        }
      ],
      '/硬件/': [
        {
          text: "硬件",
          items: [
            {text: "x86工控机改造为NAS折腾系统记录", link: "/硬件/x86工控机改造为NAS折腾系统记录"},
            {text: "瑞莎E20C软路由折腾记录", link: "/硬件/瑞莎E20C软路由折腾记录"},
            {text: "路由器刷入OpenWrt系统搞机过程", link: "/硬件/路由器刷入OpenWrt系统搞机过程"},
            {text: "MRK3399KJ之折腾CasaOS", link: "/硬件/MRK3399KJ之折腾CasaOS"},
            {text: "MRK3399KJ开发板折腾记录", link: "/硬件/MRK3399KJ开发板折腾记录"},
            {text: "树莓派折腾记录", link: "/硬件/树莓派折腾记录"},
            {text: "树莓派安装系统及初始配置", link: "/硬件/树莓派安装系统及初始配置"},
          ]
        }
      ],
      '/杂谈/': [
        {
          text: "杂谈",
          items: [
            {text: "被AI气笑了——浅谈奖励模型对AI的影响", link: "/杂谈/被AI气笑了——浅谈奖励模型对AI的影响"},
            {text: "鬼灭之刃衍生呼吸法设定+脑补", link: "/杂谈/鬼灭之刃衍生呼吸法设定+脑补"},
            {text: "对于大模型绘制UML图的调研", link: "/杂谈/对于大模型绘制UML图的调研"},
            {text: "2024年常见Ollama大模型对比", link: "/杂谈/2024年常见Ollama大模型对比"},
            {text: "设计模式的荼毒体现在哪", link: "/杂谈/设计模式的荼毒体现在哪"},
            {text: "软件工程圣经《人月神话》到底讲了什么", link: "/杂谈/软件工程圣经《人月神话》到底讲了什么"},
            {text: "项目master心得体会——项目流程及注意事项", link: "/杂谈/项目master心得体会——项目流程及注意事项"},
            {text: "分享一下我Mac使用的软件", link: "/杂谈/分享一下我Mac使用的软件"},
            {text: "Stable Diffusion信息备忘录", link: "/杂谈/Stable Diffusion信息备忘录"},
            {text: "Stable Diffusion WebUI的部署和使用", link: "/杂谈/Stable Diffusion WebUI的部署和使用"},
            {text: "实验室服务器用户初始化入门流程指南", link: "/杂谈/实验室服务器用户初始化入门流程指南"},
            {text: "重装系统需下载软件清单", link: "/杂谈/重装系统需下载软件清单"},
            {text: "个人动漫、游戏生涯总结表", link: "/杂谈/个人动漫、游戏生涯总结表"},
            {text: "日语假名、罗马音大全", link: "/杂谈/日语假名、罗马音大全"},
            {text: "终于把Revit搞完了", link: "/杂谈/终于把Revit搞完了"},
            {text: "硬件苦手的入门折腾感想", link: "/杂谈/硬件苦手的入门折腾感想"},
            {text: "对刚刚读研的感慨", link: "/杂谈/对刚刚读研的感慨"},
            {text: "记录一次被移动业务人员恶心的经历", link: "/杂谈/记录一次被移动业务人员恶心的经历"},
            {text: "给三星T7加装散热片，改善Mac上的发热问题", link: "/杂谈/给三星T7加装散热片，改善Mac上的发热问题"},
            {text: "对个体生育的思考", link: "/杂谈/对个体生育的思考"},
            {text: "22年7月我觉得最棒的动画", link: "/杂谈/22年7月我觉得最棒的动画"},
            {text: "一种全新的博客图片显示方式", link: "/杂谈/一种全新的博客图片显示方式"},
            {text: "对BIM行业的二次开发的思考", link: "/杂谈/对BIM行业的二次开发的思考"},
            {text: "无职转生事件，动画区不会忘记的历史", link: "/杂谈/无职转生事件，动画区不会忘记的历史"},
            {
              text: "后日谈",
              collapsed: true,
              items: [
                {text: "2024年年度总结", link: "/杂谈/后日谈/2024年年度总结"},
                {text: "2024年秋招总结", link: "/杂谈/后日谈/2024年秋招总结"},
                {text: "2024年9月记录", link: "/杂谈/后日谈/2024年9月记录"},
                {text: "2024年暑期记录", link: "/杂谈/后日谈/2024年暑期记录"},
                {text: "2024年4月、5月记录", link: "/杂谈/后日谈/2024年4月、5月记录"},
                {text: "2024年3月记录", link: "/杂谈/后日谈/2024年3月记录"},
                {text: "2024年1月记录", link: "/杂谈/后日谈/2024年1月记录"},
                {text: "2023年12月记录", link: "/杂谈/后日谈/2023年12月记录"},
                {text: "2023年11月记录", link: "/杂谈/后日谈/2023年11月记录"},
                {text: "2023年10月记录", link: "/杂谈/后日谈/2023年10月记录"},
                {text: "2023年9月记录", link: "/杂谈/后日谈/2023年9月记录"},
                {text: "2023年暑假记录", link: "/杂谈/后日谈/2023年暑假记录"},
                {text: "2023年6月记录", link: "/杂谈/后日谈//2023年6月记录"},
                {text: "2023年4月、5月记录", link: "/杂谈/后日谈/2023年4月、5月记录"},
                {text: "2023年3月记录", link: "/杂谈/后日谈/2023年3月记录"},
                {text: "2023年2月记录", link: "/杂谈/后日谈/2023年2月记录"},
                {text: "2023年1月记录", link: "/杂谈/后日谈/2023年1月记录"},
                {text: "2022年12月记录", link: "/杂谈/后日谈/2022年12月记录"},
                {text: "2022年11月记录", link: "/杂谈/后日谈/2022年11月记录"},
              ]

            },
            {
              text: "隐晦说",
              collapsed: true,
              items: [
                {text: "鹰瞳Airdoc第三方对接文档总结", link: "/开发/鹰瞳Airdoc第三方对接文档总结"},
                {text: "开发信息备忘录_鹰瞳", link: "/开发/开发信息备忘录_鹰瞳"},
                {text: "开发信息备忘录_贝尔", link: "/开发/开发信息备忘录_贝尔"},
                {text: "自毁特洛伊", link: "/杂谈/自毁特洛伊"},
                {text: "16形人格测试+政治倾向测试", link: "/杂谈/16形人格测试+政治倾向测试"},
                {text: "品鉴p站AI区作画有感", link: "/杂谈/品鉴p站AI区作画有感"},
                {text: "品鉴雌堕作品有感", link: "/杂谈/品鉴雌堕作品有感"},
                {text: "品鉴牛奶社之作品炎孕后感想", link: "/杂谈/品鉴牛奶社之作品炎孕后感想"},
              ]

            },
          ]

        }
      ]
    },
    socialLinks: [
      {icon: 'github', link: 'https://github.com/01Petard'}
    ],
    //页脚
    footer: {
      message: '所有文章版权皆归博主所有，仅供学习参考。',
      copyright: 'Copyright © 2025-present 01Petard',
    },
  }
});
