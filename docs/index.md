---
layout: home

hero:
  name: "代码港湾"
  text: awesome-tech-world.
  tagline: 个人技术知识体系矩阵
  image:
    src: /01petard.jpg
    alt: it's me
  actions:
    - theme: brand
      text: 个人知识图谱
      link: /开发/index
    - theme: brand
      text: 软件使用心得
      link: /软件/index
    - theme: brand
      text: 硬件领域探索
      link: /硬件/index
    - theme: brand
      text: 终焉之后日谈
      link: /杂谈/index
    - theme: alt
      text: 关于我
      link: /about  
    - theme: alt
      text: 我的GitHub
      link: https://github.com/01Petard
    - theme: alt
      text: 我的Bilibili
      link: https://space.bilibili.com/12764212
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

<style>:root {
  --vp-home-hero-name-color: transparent;
	--vp-home-hero-name-background: -webkit-linear-gradient(
	  120deg,
	  #bd34fe, /* 紫色 */
	  #47caff, /* 蓝色 */
	  #2dd4bf, /* 青绿 */
	  #facc15, /* 金色 */
	  #ff4d4d, /* 红色 */
	  #bd34fe  /* 紫色 */
	);

  --vp-home-hero-image-background-image: linear-gradient(
		-45deg, 
		#bd34fe 50%, 
		#47caff 50%
	);
  --vp-home-hero-image-filter: blur(44px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
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

国内访问：[代码港湾](http://1.94.147.176/)

---
<div class="tip custom-block" style="max-width:1152px;margin:20px auto">
本站以分享经验、知识还有我的个人爱好为为目的，搬运和分享以供学习和研究使用，版权归作者所有，如果无意之中侵犯了您的版权，请通过邮箱私信与我取得联系，我将在第一时间删除！另外， 本站内的文章仅供学习交流之用，不参与商业用途。如有抄袭还请自重！
</div>
