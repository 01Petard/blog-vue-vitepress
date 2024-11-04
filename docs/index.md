---
layout: home

hero:
  name: "代码港湾"
  text: awesome-front-end-world.
  tagline: 个人后端知识体系地图
  image:
    src: /01petard.jpg
    alt: 01petard
  actions:
    - theme: brand
      text: 开发
      link: /开发/index
    - theme: brand
      text: 前端
      link: /前端/index
    - theme: brand
      text: 软件
      link: /软件/index
    - theme: brand
      text: 硬件
      link: /硬件/index
    - theme: alt
      text: 关于我
      link: /about  
    - theme: alt
      text: View on GitHub
      link: https://github.com/01Petard
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #bd34fe 50%, #47caff 50%);
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
