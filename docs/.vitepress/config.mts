// .vitepress/comfig.mts
import {defineConfig} from 'vitepress';
import markdownItTaskList from "markdown-it-task-lists";
import timeline from "vitepress-markdown-timeline";
import container from "markdown-it-container";
import attrs from "markdown-it-attrs";
import {generateSidebar} from './utils';

export default defineConfig({
  base: "/",
  build: {
    outDir: 'docs'   //构建产物输出目录
  },
  lang: 'zh-cn',
  title: "代码港湾",
  description: "个人技术知识体系矩阵",
  head: [
    ["link", {rel: "icon", href: `/favicon.ico`}],  // 网站的图标（显示在浏览器的 tab 上）
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
    // 参考：https://vitepress.dev/reference/default-theme-config
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
    // 顶部导航栏
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
    // 侧边栏
    sidebar: {
      // 动态读取各模块文档进行映射
      '/开发/': generateSidebar('开发'),
      '/软件/': generateSidebar('软件'),
      '/硬件/': generateSidebar('硬件'),
      '/杂谈/': generateSidebar('杂谈'),
    },
    // 头像超链接
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
