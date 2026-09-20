---
layout: home

hero:
  name: "A Station for Tech,\nA Harbor for Code,\nA Garden for Ideas."
#  name: "Where Tech Evolves,\nWhere Code Lives,\nWhere Ideas Bloom."
  text: 
  tagline: "个人技术知识体系矩阵\nPersonal Technical Knowledge System Matrix"
  image:
    src: /main-icons/01petard.jpg
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
      src: /main-icons/闪电.png
  - title: 简约不简单，高效传播智慧
    details: 功能直观，轻松创建专业的博客和文档。专注于内容创作，快速发布高质量的文章。
    icon:
      src: /main-icons/安全高效.png
  - title: 代码与文字的交响，编织未来
    details: 完美展示了前端工具链的最佳实践，从HMR到TS支持，每一个特性都是为了提升文档开发体验。
    icon:
      src: /main-icons/拥抱未来.png

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
  /* 取色板 */

  /* 主题色一：五彩 */
  /* 原始颜色 */
  --vp-color-purple: #bd34fe;
  --vp-color-blue: #47caff;
  --vp-color-cyan: #2dd4bf;
  --vp-color-gold: #facc15;
  --vp-color-red: #ff4d4d;

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

  /* 定义主标题渐变效果 */
  --vp-home-hero-name-background-1:
    linear-gradient(
      45deg,
      #7657FF 0%,
      #CC5BC1 5%,
      #F1698A 10%,
      #F6815C 15%,
      #FDA73C 20%,
      #BABD4A 25%,
      #6CC871 30%,
      #2DC6AB 35%,
      #2EA4D6 40%,
      #457BF8 45%,
      #7657FF 50%,
      #CC5BC1 55%,
      #F1698A 60%,
      #F6815C 65%,
      #FDA73C 70%,
      #BABD4A 75%,
      #6CC871 80%,
      #2DC6AB 85%,
      #2EA4D6 90%,
      #457BF8 95%,
      #7657FF 100%
    );
  
  --vp-home-hero-name-background-2:
    linear-gradient(
      45deg,
      #FFD38F 0%,
      #F6AA86 5%,
      #F07F92 10%,
      #DC5BAF 15%,
      #8F59DF 20%,
      #6875DF 25%,
      #4C94CF 30%,
      #32AAB9 35%,
      #56B482 40%,
      #94BC59 45%,
      #FFD38F 50%,
      #F6AA86 55%,
      #F07F92 60%,
      #DC5BAF 65%,
      #8F59DF 70%,
      #6875DF 75%,
      #4C94CF 80%,
      #32AAB9 85%,
      #56B482 90%,
      #94BC59 95%,
      #FFD38F 100%
    );

  --vp-home-hero-name-background-3:
    linear-gradient(
      45deg,
      #767CCF 0%,
      #876FD2 5%,
      #9865CF 10%,
      #AA60C8 15%,
      #BD5EBB 20%,
      #CE63AA 25%,
      #D46D91 30%,
      #CF7C70 35%,
      #B0874F 40%,
      #78914F 45%,
      #767CCF 50%,
      #876FD2 55%,
      #9865CF 60%,
      #AA60C8 65%,
      #BD5EBB 70%,
      #CE63AA 75%,
      #D46D91 80%,
      #CF7C70 85%,
      #B0874F 90%,
      #78914F 95%,
      #767CCF 100%
    );

  /* 定义渐变角度 */
  --vp-gradient-angle: 120deg;
  --vp-image-gradient-angle: -45deg;

  /* 定义头像背景的效果 */
  --vp-home-hero-image-background-image: 
    conic-gradient(
      from 20deg,
      var(--vp-color-blue-lite),
      var(--vp-color-purple-blue),
      var(--vp-color-pink),
      var(--vp-color-gold-red-1),
      var(--vp-color-blue-lite)
    );
  
  /* 定义头像模糊度 */
  --vp-home-hero-image-filter: blur(44px);
}

/* 文本效果：流体渐变 + 玻璃高光 + 灯箱背光 */
.VPHero .name {
  background: var(--vp-home-hero-name-background-2);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;

  /* 流动字体 */
  animation: hero-name-rainbow-flow 10s linear infinite;

  /* 边缘高光 */
  -webkit-text-stroke: 0.3px rgba(255, 255, 255, 0.22);

  /* 灯箱背光 */
  filter:
    drop-shadow(0 0 2px rgba(255, 255, 255, 0.18))
    drop-shadow(0 0 6px rgba(118, 87, 255, 0.22))
    drop-shadow(0 0 14px rgba(239, 93, 168, 0.14))
    drop-shadow(0 0 28px rgba(59, 130, 246, 0.10));
}

/* 头像效果：透明玻璃 + 后背霓虹呼吸灯 */
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

-- **放在开头说的话** --
</div>

# 欢迎来到我的博客！

感谢你做客光临，在这里你可以放松一下了。这个博客是基于 [VitePress](https://vitejs.cn/vitepress/) 构建的，旨在提供更高效的内容创作和管理体验。尽管我的 [旧博客](https://01petard.github.io/) 曾承载了许多宝贵的学习记录与分享，但为了追求更好的技术体验和构建速度，我决定将其迁移到了现在新的平台。

# 为什么选择迁移？

随着时间的推移，我希望能在博客上进行更高效的内容创作和管理。虽然 [Hexo](https://hexo.io/zh-cn/)（我之前的博客框架） 是一个非常优秀的静态博客框架，提供了快速生成页面和丰富的主题和插件支持，但在持续使用中，我遇到了以下一些问题：

1. 构建速度：随着博客文章的增多，Hexo 的构建速度变慢，尤其是在多次修改和发布时需要较长时间的编译，这影响了我的开发体验；
2. 灵活性：我希望使用更现代的前端技术栈，比如老牌的 [Vue](https://vuejs.org/)、[React](https://react.dev/)，或是新兴的 [Svelte](https://svelte.dev/)、[Astro](https://astro.build/)，以便更轻松地自定义博客功能，Hexo 在这方面的提升相对有限；
3. 开发体验：VitePress 使用 [Vite](https://vite.dev/) 作为开发引擎，提供了更快的热更新和流畅的开发体验，这样的效率正是我所追求的，而且我比较熟悉上手零门槛。

因此，我最终进行一场“大迁徙”（大概是在2024年底），最终我还是拥抱一个以更加现代化技术栈为基础的现代文档生成器，为将来的运营和建设打下良好的基础，还能提升整体性能和可扩展性。

# 访问我的其他站点

如果你喜欢我的“技术审美”（笑），或者希望了解更新、更丰富的内容，欢迎访问我的其他站点：

导航页：[热爱可抵岁月漫长](https://www.bugstack.top/)

新博客：[代码港湾](https://doc.bugstack.top/)

旧博客：[花火の红玉宫](https://01petard.github.io/)

---
<div class="tip custom-block" style="max-width:1152px;margin:20px auto">
本站以分享经验、知识还有我的个人爱好为为目的，搬运和分享以供学习和研究使用，版权归作者所有，如果无意之中侵犯了您的版权，请通过邮箱私信与我取得联系，我将在第一时间删除！另外， 本站内的文章仅供学习交流之用，不参与商业用途。如有抄袭还请自重！
</div>
