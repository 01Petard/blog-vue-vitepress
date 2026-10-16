<div align="center">
  <img src="docs/public/favicon.ico" width="80" height="80" alt="代码港湾 标志">
  <h1>代码港湾</h1>
  <p><strong>把学过的、踩过的、想明白的，留下来。</strong></p>
  <p>基于 VitePress 的个人技术博客与知识库，用 Markdown 整理开发经验、工具用法和生活随笔。</p>
  <p>
    <img src="https://img.shields.io/badge/VitePress-1.6-646cff" alt="VitePress 1.6">
    <img src="https://img.shields.io/badge/Vue-3-42b883" alt="Vue 3">
    <img src="https://img.shields.io/badge/content-Markdown-222222" alt="Markdown 写作">
    <img src="https://img.shields.io/badge/deploy-GitHub_Pages-222222" alt="GitHub Pages">
  </p>
  <p>
    <a href="#这里记录什么">内容</a> ·
    <a href="#快速开始">快速开始</a> ·
    <a href="#写一篇新文章">写作</a> ·
    <a href="#部署与更新">部署</a>
  </p>
  <p><a href="https://doc.bugstack.top/">阅读博客</a> · <a href="https://01petard.github.io/blog-vue-vitepress/">永久地址</a> · <a href="https://01petard.github.io/blog-vue-vitepress/feed.xml">RSS 订阅</a></p>
</div>

## 这里记录什么

| 栏目 | 内容 |
| --- | --- |
| [开发](docs/开发/index.md) | Java 后端、前端、数据库、工程实践与 AI 应用笔记 |
| [软件](docs/软件/index.md) | 常用工具、命令与各操作系统的使用记录 |
| [硬件](docs/硬件/index.md) | 设备体验与折腾记录 |
| [杂谈](docs/杂谈/index.md) | 日常、思考与个人见闻 |

写作内容就是站点源码。新增 Markdown、提交、构建，文章便成为可检索、可订阅的静态页面。

## 阅读体验

- **本地全文搜索**：在站内查找文章，无需额外部署搜索服务。
- **自动侧边栏**：按目录递归生成，依据 Git 首次提交时间排序，新文章优先显示。
- **阅读增强**：提供阅读布局调整、目标标题高亮、代码行号和图片放大。
- **明暗主题**：支持主题切换，兼容时使用圆形过渡动画。
- **文章扩展**：任务列表、时间轴、自定义容器与 Markdown 属性。
- **评论与订阅**：Giscus 评论；构建时生成摘要 RSS 和 sitemap。

## 快速开始

使用 **Node.js 22、pnpm 11**，与现有 GitHub Actions 配置保持一致。

```sh
pnpm install --frozen-lockfile
pnpm dev
```

打开终端显示的开发地址，默认是 **http://localhost:5173**。

```sh
pnpm build    # 构建站点并生成 RSS
pnpm preview  # 预览生产构建
```

生产产物默认位于 **`docs/.vitepress/dist`**，现有 Pages 工作流也从该目录发布。

## 写一篇新文章

1. 在 `docs/开发`、`docs/软件`、`docs/硬件` 或 `docs/杂谈` 的对应目录中创建 `.md` 文件。
2. 填写标题、日期与摘要，使用 Markdown 编写正文。
3. 运行 `pnpm dev` 检查正文、图片与侧边栏，再用 `pnpm build` 检查生产结果。

```markdown
---
title: 一次问题排查的记录
date: 2026-10-16 20:00:00
description: 从现象、证据到解决方法。
tags:
  - 工程实践
---

# 一次问题排查的记录

从问题发生的场景开始写。
```

RSS 只收录同时具有有效 `title` 和 `date` 的页面；`draft: true` 或 `rss: false` 可将页面排除出订阅，**不会阻止文章发布到站点**。订阅仅输出摘要，不输出全文。无时区的日期按东八区解析。

侧边栏自动读取目录，无需为每篇文章手工加配置。栏目 `index.md` 不进入自动列表；尚未提交的文件使用本地文件时间作为排序依据。CI 保留完整 Git 历史，以便获得文章的首次提交时间。

## 换成自己的知识库

| 位置 | 需要调整的内容 |
| --- | --- |
| [config.mts](docs/.vitepress/config.mts) | 标题、描述、导航、Logo、搜索、页脚与 `base` |
| [rss.mts](docs/.vitepress/rss.mts) | 永久地址、当前域名、订阅标题与作者 |
| [theme](docs/.vitepress/theme) | 阅读布局、样式、图片放大与评论组件 |
| [GiscusComments.vue](docs/.vitepress/theme/components/GiscusComments.vue) | 自己的 Giscus 仓库与讨论分类配置 |
| [docs/public](docs/public) | 公共资源与自定义域名文件（如有） |
| [docs/index.md](docs/index.md) | 首页内容 |

`PERMANENT_SITE_URL` 用于 RSS 的文章链接与标识，`CURRENT_SITE_URL` 用于 sitemap。更换域名时应按实际部署调整，避免订阅仍然指向原作者站点。

当前 `base` 为 `/`，适用于自定义域名；如果使用没有自定义域名的 GitHub Pages 仓库子路径，应相应修改 `base` 并核对文章中的绝对资源地址。

## 部署与更新

### GitHub Pages

仓库已有 [部署工作流](.github/workflows/deploy.yml)：

1. 在仓库 **Settings → Pages** 中选择 **GitHub Actions**。
2. 推送到 `main`，或在 Actions 手动触发 **Deploy Pages**。
3. 工作流安装依赖、构建 VitePress，将产物经 Jekyll 步骤上传并发布。

工作流也在发起到 `main` 的 PR 时触发。复用时请检查自己的 Pages 权限、分支和域名设置。

### 其他静态托管

构建命令使用 `pnpm build`，发布目录为 `docs/.vitepress/dist`。运行阶段只需要静态文件服务，无业务数据库或 Node API 服务。

新增文章或更新主题后重新构建发布即可。RSS 在构建结束时生成，开发模式不能代替生产订阅检查。

## 常见问题

**为什么文章没进入 RSS？** 检查 frontmatter 的 `title`、`date`、`draft` 和 `rss`；目录首页也不会收录。规则见 [rss.mts](docs/.vitepress/rss.mts)。

**为什么新文章排序和本地不同？** 已提交文章使用 Git 首次提交时间，未提交文章使用文件时间；浅克隆也可能缺少完整历史。

**构建成功就代表所有链接正常吗？** 当前配置开启 `ignoreDeadLinks`，构建不会阻止死链接，发布前仍需检查新增文章和资源地址。

## 交流与内容使用

欢迎通过 [Issues](https://github.com/01Petard/blog-vue-vitepress/issues) 反馈错别字、失效链接和站点问题，或通过 [邮件](mailto:1520394133@qq.com) 联系。

站点文章版权归作者所有，引用或转载请标明来源并确认授权。`package.json` 声明 `ISC`，但仓库尚未提供独立 `LICENSE` 文件；不要将依赖包的许可或该字段直接视为全部文章、图片的转载授权。
