// .vitepress/config.js
const base = "/blog-vue-vitepress/";
export default {
  base,
  lang: 'zh-cn',
  title: "代码港湾",
  description: "个人技术知识体系矩阵",
  head: [
    // 网站的图标（显示在浏览器的 tab 上）
    ["link", {rel: "icon", href: `${base}favicon.png`}],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: 'assets/favicon.png',
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
          {text: '开发', link: '/开发/index'},
          {text: 'Guide', link: '/开发/My Java Guide/index'},
          {text: '框架', link: '/开发/框架/index'},
          {text: '前端', link: '/开发/前端/index'},
        ]
      },
      {
        text: '软件',
        items: [
          {text: '软件', link: '/软件/index'},
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
            {text: '搭建K8S集群环境', link: '/开发/搭建K8S集群环境'},
            {text: '抖音评论区设计', link: '/开发/抖音评论区设计'},
            {text: 'MYDB操作手册', link: '/开发/MYDB操作手册'},
            {text: '批量导出zip压缩包和Excel表格', link: '/开发/批量导出zip压缩包和Excel表格'},
            {text: '阿里云OSS和内容安全Java实现参考代码', link: '/开发/阿里云OSS和内容安全Java实现参考代码'},
            {text: 'SSO单点登录的实现原理', link: '/开发/SSO单点登录的实现原理'},
            {text: 'ThreadLocal原理和使用', link: '/开发/ThreadLocal原理和使用'},
            {text: '对Java中多态的理解', link: '/开发/对Java中多态的理解'},
            {text: 'JDBC和JAVA类型对比', link: '/开发/JDBC和JAVA类型对比'},
            {text: 'C++的STL库常见函数', link: '/开发/C++的STL库常见函数'},
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
            {
              text: "框架",
              collapsed: false,
              items: [
                {text: "Juint5断言的代码使用", link: "/开发/框架/Juint5断言的代码使用"},
                {text: "Kafka原理", link: "/开发/框架/Kafka原理"},
                {text: "kafka配置属性说明", link: "/开发/框架/kafka配置属性说明"},
                {text: "MongoDB和MySQL的常用语法对比", link: "/开发/框架/MongoDB和MySQL的常用语法对比"},
                {text: "MybatisPlus依赖和配置文件", link: "/开发/框架/MybatisPlus依赖和配置文件"},
                {text: "Mybatis注解开发使用举例", link: "/开发/框架/Mybatis注解开发使用举例"},
                {text: "MySql数据库命令", link: "/开发/框架/MySql数据库命令"},
                {text: "Netty与NIO的前世今生", link: "/开发/框架/Netty与NIO的前世今生"},
                {text: "Nginx的配置和使用命令", link: "/开发/框架/Nginx的配置和使用命令"},
                {text: "Quarkus——云原生时代的Java框架", link: "/开发/框架/Quarkus云原生时代的Java框架"},
                {text: "RabbitMQ快速上手", link: "/开发/框架/RabbitMQ快速上手"},
                {text: "Redis在SpringBoot的配置", link: "/开发/框架/Redis在SpringBoot的配置"},
                {text: "Redis基本数据类型常用命令", link: "/开发/框架/Redis基本数据类型常用命令"},
                {text: "RocketMQ原理", link: "/开发/框架/RocketMQ原理"},
                {text: "SpringMVC注解和配置 + fastjson的简单使用", link: "/开发/框架/SpringMVC注解和配置+fastjson的简单使用"},
                {text: "thymeleaf的th-href带参数转跳", link: "/开发/框架/thymeleaf的th-href带参数转跳"},
                {text: "Tomcat启动关闭命令", link: "/开发/框架/Tomcat启动关闭命令"},
              ]
            },
            {
              text: "前端",
              collapsed: false,
              items: [
                {text: 'ElementUI实战教程', link: '/开发/前端/ElementUI实战教程'},
                {text: 'Electron开发学习', link: '/开发/前端/electron'},
                {text: 'Vue的事件修饰符', link: '/开发/前端/Vue的事件修饰符'},
                {text: '几个免版权图片网站', link: '/开发/前端/几个免版权图片网站'},
                {text: 'CSS知识重点划注', link: '/开发/前端/CSS知识重点划注'},
                {text: 'HTML标签重点划注', link: '/开发/前端/HTML标签重点划注'},
              ]
            },
          ]
        }
      ],
      '/软件/': [
        {
          text: "软件",
          items: [
            {text: "Git的配置和使用命令", link: "/软件/Git的配置和使用命令"},
            {text: "Docker安装配置及使用命令", link: "/软件/Docker安装配置及使用命令"},
            {text: "nodejs相关命令", link: "/软件/nodejs相关命令"},
            {text: "curl命令的用法", link: "/软件/curl命令的用法"},
            {text: "Hexo常用命令", link: "/软件/Hexo常用命令"},
            {text: "基于YOLOv8模型的抽烟行为检测系统", link: "/软件/基于YOLOv8模型的抽烟行为检测系统"},
            {text: "ffmpeg使用命令", link: "/软件/ffmpeg使用命令"},
            {text: "JetBrains全家桶破解", link: "/软件/JetBrains全家桶破解"},
            {text: "关于bing国内重定向解决方案", link: "/软件/关于bing国内重定向解决方案"},
            {text: "哔哩哔哩成分鉴定器（个人魔改版）", link: "/软件/哔哩哔哩成分鉴定器（个人魔改版）"},
            {text: "markdown语法", link: "/软件/markdown语法"},
            {
              text: "Linux",
              collapsed: false,
              items: [
                {text: "命令行系统信息工具", link: "/软件/Linux/命令行系统信息工具"},
                {text: "在服务器上部署hexo博客指南", link: "/软件/Linux/在服务器上部署hexo博客指南"},
                {text: "Unix系统下的Shell命令", link: "/软件/Linux/Unix系统下的Shell命令"},
                {text: "Linux常用命令", link: "/软件/Linux/Linux常用命令"},
                {text: "CentOS7安装oh-my-zsh", link: "/软件/Linux/CentOS7安装oh-my-zsh"},
                {text: "zsh与bash的切换", link: "/软件/Linux/zsh与bash的切换"},
              ]
            },
            {
              text: "MacOS",
              collapsed: false,
              items: [
                {text: "Homebrew常用命令", link: "/软件/MacOS/Homebrew常用命令"},
                {text: "Mac安装oh-my-zsh主题", link: "/软件/MacOS/Mac安装oh-my-zsh主题"},
                {text: "zsh与bash的切换", link: "/软件/Linux/zsh与bash的切换"},
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
            {text: "项目master心得体会", link: "/杂谈/项目master心得体会"},
            {text: "分享一下我Mac使用的软件", link: "/杂谈/分享一下我Mac使用的软件"},
            {text: "Stable Diffusion信息备忘录", link: "/杂谈/Stable Diffusion信息备忘录"},
            {text: "stable-diffusion-webui结合NovelAI的模型生成动漫人物图片", link: "/杂谈/stable-diffusion-webui结合NovelAI的模型生成动漫人物图片"},
            {text: "实验室服务器-用户初始化入门流程指南", link: "/杂谈/实验室服务器-用户初始化入门流程指南"},
            {text: "重装系统需下载软件清单", link: "/杂谈/重装系统需下载软件清单"},
            {text: "个人动漫、游戏生涯总结表", link: "/杂谈/个人动漫、游戏生涯总结表"},
            {text: "日语假名、罗马音大全", link: "/杂谈/日语假名、罗马音大全"},
            {text: "AI作画杀疯了", link: "/杂谈/AI作画杀疯了"},
            {text: "终于把Revit搞完了", link: "/杂谈/终于把Revit搞完了"},
            {text: "硬件好难搞啊！", link: "/杂谈/硬件好难搞啊！"},
            {text: "读研实在太难了", link: "/杂谈/读研实在太难了"},
            {text: "开学被移动人员搞了", link: "/杂谈/开学被移动人员搞了"},
            {text: "给三星T7加装散热片，改善Mac上的发热问题", link: "/杂谈/给三星T7加装散热片，改善Mac上的发热问题"},
            {text: "又增加了奇怪的属性", link: "/杂谈/又增加了奇怪的属性"},
            {text: "还得是你啊牛奶社", link: "/杂谈/还得是你啊牛奶社"},
            {text: "小孩真头疼", link: "/杂谈/小孩真头疼"},
            {text: "22年7月我觉得最棒的动画捏！", link: "/杂谈/22年7月我觉得最棒的动画捏！"},
            {text: "一种全新的博客图片显示方式", link: "/杂谈/一种全新的博客图片显示方式"},
            {text: "听说你喜欢搞BIM", link: "/杂谈/听说你喜欢搞BIM"},
            {text: "无职转生事件，动画区不会忘记的历史", link: "/杂谈/无职转生事件，动画区不会忘记的历史"},
            {
              text: "后日谈",
              collapsed: true,
              items: [
                {text: "2024年9月记录", link: "/杂谈/后日谈/2024年9月记录"},
                {text: "2024年暑期记录", link: "/杂谈/后日谈/2024年暑期记录"},
                {text: "2024年4、5月记录", link: "/杂谈/后日谈/2024年4、5月记录"},
                {text: "2024年3月记录", link: "/杂谈/后日谈/2024年3月记录"},
                {text: "2024年1月记录", link: "/杂谈/后日谈/2024年1月记录"},
                {text: "2023年12月记录", link: "/杂谈/后日谈/2023年12月记录"},
                {text: "2023年11月记录", link: "/杂谈/后日谈/2023年11月记录"},
                {text: "2023年10月记录", link: "/杂谈/后日谈/2023年10月记录"},
                {text: "2023年9月记录", link: "/杂谈/后日谈/2023年9月记录"},
                {text: "2023年暑假记录", link: "/杂谈/后日谈/2023年暑假记录"},
                {text: "2023年6月记录", link: "/杂谈/后日谈//2023年6月记录"},
                {text: "2023年4、5月记录", link: "/杂谈/后日谈/2023年4、5月记录"},
                {text: "2023年3月记录", link: "/杂谈/后日谈/2023年3月记录"},
                {text: "2023年2月记录", link: "/杂谈/后日谈/2023年2月记录"},
                {text: "2023年1月记录", link: "/杂谈/后日谈/2023年1月记录"},
                {text: "2022年12月记录", link: "/杂谈/后日谈/2022年12月记录"},
                {text: "2022年11月记录", link: "/杂谈/后日谈/2022年11月记录"},
              ]

            },
          ]

        }
      ]
    },
    socialLinks: [
      {icon: 'github', link: 'https://github.com/01Petard'}
    ],
  }
};
