---
layout: home

hero:
  name: "A Station for Tech,\nA Harbor for Code,\nA Space for Innov."
  text: 
  tagline: "个人技术知识体系矩阵\nPersonal Technical Knowledge System Matrix"
  image:
    src: /01petard.jpg
    alt: it's me
  actions:
    - theme: brand
      text: 💻 开发知识图谱
      link: /开发/后端/index
    - theme: brand
      text: 💿 OS 指令册
      link: /软件/index
    - theme: brand
      text: ⚙️ 硬件工坊
      link: /硬件/index
    - theme: brand
      text: 🧠 思绪花园
      link: /杂谈/index
    - theme: alt
      text: 👨‍💻 关于我
      link: /about
    - theme: sponsor
      text: 🚪 My GitHub
      link: https://github.com/01Petard
    - theme: sponsor
      text: ⛩  僕のビリビリ
      link: https://space.bilibili.com/12764212
    - theme: sponsor
      text: 📕 我的小红书
      link: https://www.xiaohongshu.com/user/profile/5f13ee3400000000010073c3
features:
  - title: 光速构建，无限知识
    details: 如闪电般的加载速度，快速访问到丰富的知识宝库。多端设备都能享受流畅的阅读体验。
    icon:
      src: /闪电.png
  - title: 简约不简单，高效传播智慧
    details: 功能直观，轻松创建专业的博客和文档。专注于内容创作，快速发布高质量的文章。
    icon:
      src: /安全高效.png
  - title: 代码与文字的交响，编织未来
    details: 完美展示了前端工具链的最佳实践，从HMR到TS支持，每一个特性都是为了提升文档开发体验。
    icon:
      src: /拥抱未来.png

---

<style>
@keyframes hero-name-rainbow-flow {
  0% {
    background-position: 0% 100%;
  }

  100% {
    background-position: 100% 0%;
  }
}

@keyframes hero-image-jellyfish-drift {
  0%,
  100% {
    border-radius: 40% 60% 55% 45% / 58% 42% 58% 42%;
    opacity: 0.62;
    transform: translate(-56%, -47%) scale(0.96, 1.06) rotate(-7deg);
  }

  33% {
    border-radius: 58% 42% 38% 62% / 44% 58% 42% 56%;
    opacity: 0.84;
    transform: translate(-47%, -55%) scale(1.12, 0.94) rotate(4deg);
  }

  66% {
    border-radius: 48% 52% 62% 38% / 38% 48% 52% 62%;
    opacity: 0.72;
    transform: translate(-44%, -46%) scale(0.94, 1.12) rotate(8deg);
  }
}

@keyframes hero-image-color-cycle {
  to {
    filter: var(--vp-home-hero-image-filter) hue-rotate(360deg);
  }
}

/* 定义根样式 */
:root {
  /* 定义基础颜色 */

  /* 主题色二：AI智能 */
  --vp-color-yellow: #F0927B;
  --vp-color-orange-yellow: #E89484;
  --vp-color-orange: #EC8080;
  --vp-color-pink-orange: #ea6c7c;
  --vp-color-pink: #F5639B;
  --vp-color-pink-red: #E86BBE;
  --vp-color-purple-white: #DD6BE2;
  --vp-color-purple-grey: #B674F0;
  --vp-color-purple-lite: #9D78FC;
  --vp-color-purple-blue: #8E81FA;
  --vp-color-blue-white: #7597FC;
  --vp-color-blue-sky: #65A6FD;
  --vp-color-blue-lite: #58B1FF;

  /* 主题色一：五彩 */
  /* 原始颜色 */
  --vp-color-purple: #bd34fe;
  --vp-color-blue: #47caff;
  --vp-color-cyan: #2dd4bf;
  --vp-color-gold: #facc15;
  --vp-color-red: #ff4d4d;
  
  /* 紫色 → 蓝色 的中间色 */
  --vp-color-purple-blue-1: #a53bfe;
  --vp-color-purple-blue-2: #8c43fd;
  --vp-color-purple-blue-3: #744cfc;
  --vp-color-purple-blue-4: #5b55fb;
  --vp-color-purple-blue-5: #435eFA;
  
  /* 蓝色 → 青色 的中间色 */
  --vp-color-blue-cyan-1: #3a93f7;
  --vp-color-blue-cyan-2: #2eA0ee;
  --vp-color-blue-cyan-3: #28B1e5;
  --vp-color-blue-cyan-4: #22C2d8;
  --vp-color-blue-cyan-5: #1ed3cB;
  
  /* 青色 → 金色 的中间色 */
  --vp-color-cyan-gold-1: #50e8b9;
  --vp-color-cyan-gold-2: #8df2a3;
  --vp-color-cyan-gold-3: #c2ff8e;
  --vp-color-cyan-gold-4: #f5e869;
  --vp-color-cyan-gold-5: #facc15;
  
  /* 金色 → 红色 的中间色 */
  --vp-color-gold-red-1: #ff9a15;
  --vp-color-gold-red-2: #ff7f15;
  --vp-color-gold-red-3: #ff6915;
  --vp-color-gold-red-4: #ff5415;
  --vp-color-gold-red-5: #ff3f15;
  
  /* 红色 → 紫色 的中间色（环形闭合） */
  --vp-color-red-purple-1: #ff346e;
  --vp-color-red-purple-2: #e8348d;
  --vp-color-red-purple-3: #d134ac;
  --vp-color-red-purple-4: #ba34ca;
  --vp-color-red-purple-5: #a334e9;

  /* 定义渐变角度 */
  --vp-gradient-angle: 120deg;
  --vp-image-gradient-angle: -45deg;

  /* 定义主页标题五彩渐变 */
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background:
    linear-gradient(
      45deg,
      #7657ff 0%,
      #ef5da8 12.5%,
      #ffae35 25%,
      #20c6b7 37.5%,
      #3b82f6 47%,
      #7657ff 50%,
      #ef5da8 62.5%,
      #ffae35 75%,
      #20c6b7 87.5%,
      #3b82f6 97%,
      #7657ff 100%
    );

  /* 定义副标题渐变效果 */
  --vp-home-hero-text-background: 
    -webkit-linear-gradient(
      var(--vp-gradient-angle),

      /*!* 主题二：AI智能 *!*/
      /*var(--vp-color-pink-red),*/
      /*var(--vp-color-purple-white),*/
      /*var(--vp-color-purple-grey),*/
      /*var(--vp-color-purple-lite),*/
      /*var(--vp-color-purple-blue),*/
      /*var(--vp-color-blue-white),*/
      /*var(--vp-color-blue-sky),*/
      /*var(--vp-color-blue-lite)*/

      /* 主题一：五彩 */
      var(--vp-color-purple-blue-1),
      var(--vp-color-purple-blue-2),
      var(--vp-color-purple-blue-3),
      var(--vp-color-purple-blue-4),
      var(--vp-color-purple-blue-5),
      var(--vp-color-blue-cyan-1),
      var(--vp-color-blue-cyan-2),
      var(--vp-color-blue-cyan-3),
      var(--vp-color-blue-cyan-4),
      var(--vp-color-blue-cyan-5),
      var(--vp-color-cyan-gold-1),
      var(--vp-color-cyan-gold-2),
      var(--vp-color-cyan-gold-3),
      var(--vp-color-cyan-gold-4),
      var(--vp-color-cyan-gold-5),
      var(--vp-color-gold-red-1)
    );

  /* 定义背景图片效果 */
  --vp-home-hero-image-background-image: 
    conic-gradient(
      from 20deg,
      var(--vp-color-blue-lite),
      var(--vp-color-purple-blue),
      var(--vp-color-pink),
      var(--vp-color-gold-red-1),
      var(--vp-color-blue-lite)
    );
  
  /* 定义初始模糊度 */
  --vp-home-hero-image-filter: blur(44px);
}

/* 文本渐变效果 */
.VPHero .name {
  background: var(--vp-home-hero-name-background);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  /* 浏览器兼容性处理 */
  -webkit-text-fill-color: transparent;
  animation: hero-name-rainbow-flow 8s linear infinite;
}
.VPHero .text {
  background: var(--vp-home-hero-text-background);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  /* 浏览器兼容性处理 */
  -webkit-text-fill-color: transparent;
}

.VPHero .image-bg {
  opacity: 0.72;
  animation:
    hero-image-jellyfish-drift 10s ease-in-out infinite,
    hero-image-color-cycle 28s linear infinite;
  will-change: transform, border-radius, filter, opacity;
}

.VPHero .image-src {
  border-radius: 24px;
}

.VPHero .image-container::after {
  position: absolute;
  z-index: 3;
  top: 50%;
  left: 50%;
  width: 192px;
  height: 192px;
  border-radius: 24px;
  background:
    radial-gradient(
      ellipse at 24% 12%,
      rgb(255 255 255 / 48%),
      rgb(255 255 255 / 12%) 24%,
      transparent 48%
    ),
    linear-gradient(
      135deg,
      rgb(255 255 255 / 26%) 0%,
      rgb(255 255 255 / 4%) 36%,
      transparent 50%,
      rgb(0 0 0 / 13%) 100%
    );
  box-shadow:
    inset 0 0 0 1px rgb(255 255 255 / 30%),
    inset 0 -12px 26px rgb(0 0 0 / 10%);
  content: "";
  pointer-events: none;
  transform: translate(-50%, -50%);
}

/* 响应式调整 */
@media (min-width: 640px) {
  :root { --vp-home-hero-image-filter: blur(56px); }

  .VPHero .image-container::after {
    width: 256px;
    height: 256px;
  }
}

@media (min-width: 960px) {
  :root { --vp-home-hero-image-filter: blur(68px); }

  .VPHero .image-container::after {
    width: 320px;
    height: 320px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .VPHero .name,
  .VPHero .image-bg {
    animation: none;
  }
}

</style>

<div style="margin-top: 30px;"></div>

----
<div style="text-align:center;font-size: x-large">

\-- **放在开头说的话** --
</div>

# 欢迎来到我的博客！

感谢大家一直以来的支持和关注！这个博客是基于 [VitePress](https://vitejs.cn/vitepress/) 构建的，旨在提供更高效的内容创作和管理体验。尽管我的旧博客曾承载了许多宝贵的学习记录与分享，但为了追求更好的技术体验，我决定将其迁移至新的平台。

# 为什么选择迁移？

随着时间的推移，我希望能在博客上进行更高效的内容创作和管理。虽然 [Hexo](https://hexo.io/zh-cn/) 是一个非常优秀的静态博客框架，提供了快速生成页面和丰富的主题支持，但在持续使用中，我遇到了以下一些问题：

1. 构建速度：随着博客文章的增多，Hexo 的构建速度变慢，尤其是在多次修改和发布时，这影响了我的开发体验
2. 灵活性：我希望使用更现代的技术栈，如 Vue 3，以便更轻松地自定义博客功能，Hexo 在这方面的支持相对有限。
3. 开发体验：VitePress 使用 Vite 作为开发服务器，提供了更快的热更新和流畅的开发体验，这正是我所追求的。

因此，我选择将博客迁移到 VitePress，一个以 Vue 3 为基础的现代文档生成器，不仅能更高效地管理内容，还能提升整体性能和可扩展性。

# 访问我的旧博客

如果你喜欢我的技术分享，或者希望了解更新、更丰富的内容，欢迎访问我的新博客：

旧博客：[花火の红玉宫](https://01petard.github.io/)

国内访问：[代码港湾](https://www.bugstack.icu/)

---
<div class="tip custom-block" style="max-width:1152px;margin:20px auto">
本站以分享经验、知识还有我的个人爱好为为目的，搬运和分享以供学习和研究使用，版权归作者所有，如果无意之中侵犯了您的版权，请通过邮箱私信与我取得联系，我将在第一时间删除！另外， 本站内的文章仅供学习交流之用，不参与商业用途。如有抄袭还请自重！
</div>
