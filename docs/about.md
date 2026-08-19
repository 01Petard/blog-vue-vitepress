---
title: 关于我
date: 2022-08-02 16:08:07
type: "about"
---

[//]: # (方案一)
<style>
  /* 定义背景闪耀动画 */
  @keyframes shine {
    0% { background-position: 100% 50%; } /* 从右边开始 */
    100% { background-position: -100% 0%; } /* 到左边结束 */ /* 负值确保动画结束位置与起始位置视觉上一致 */
  }

  /* 闪耀背景效果，仅限该 div */
  .shiny-div {
      font-weight: bold; /* 加粗字体 */
      padding: 0 20px 0 20px; /* 增加内边距 */
      text-align: center; /* 居中对齐 */
      background-image: linear-gradient(
    			120deg,
          #a53bfe,
          #8c43fd,
          #744cfc,
          #5b55fb,
          #435efa,
          #3a93f7,
          #2ea0ee,
          #28b1e5,
          #22c2d8,
          #1ed3cb,
          #50e8b9,
          #8df2a3,
          #c2ff8e,
          #f5e869,
          #facc15,
          #ff9a15,
          #ff7f15,
          #ff6915,
          #ff5415,
          #ff3f15,
          #ff346e,
          #e8348d,
          #d134ac,
          #ba34ca,
          #a334e9,
          #a53bfe
    		);
      background-size: 300% 300%;
      -webkit-background-clip: text; /* 使用背景裁剪文字 */
      background-clip: text;
      color: transparent; /* 让文字透明显示背景 */
      animation: shine 20s infinite linear; /* 应用动画 */
      font-size: 1.2rem;
    }
    
  /* 单独设置中文部分的样式 */
  .shiny-div p:nth-child(2) {
    font-size: 1.5rem;
  }

</style>

<div class="shiny-div" v-if="false">
  <p>
    Wish you to become your own sun, no need to rely on whose light.
  </p>
  <p>
    —— 愿你成为自己的太阳，无需凭借谁的光芒。
  </p>
</div>

[//]: # (方案二)
<style>
    .rainbow-box {
      padding: 24px;
      text-align: center;
    }

    .rainbow-box p {
      /* 防止渐变背景铺满整行 */
      width: fit-content;
      margin: 12px auto;
      font-size: 1.2rem;
      font-weight: 700;
      line-height: 1.8;

      /* 彩虹渐变 */
      background: linear-gradient(
        115deg,
        #7657ff 0%,
        #ef5da8 26%,
        #ffae35 51%,
        #20c6b7 76%,
        #3b82f6 100%
      );

      /* 放大背景，为渐变移动预留空间 */
      background-size: 200% 200%;

      /* 将背景裁剪到文字形状 */
      background-clip: text;
      -webkit-background-clip: text;

      /* 隐藏原始文字颜色 */
      color: transparent;
      -webkit-text-fill-color: transparent;

      /* 彩虹流动动画 */
      animation: rainbow-flow 8s ease infinite;
    }

    @keyframes rainbow-flow {
      0%,
      100% {
        background-position: 0% 50%;
      }

      50% {
        background-position: 100% 50%;
      }
    }

    /* 用户关闭动画时停止流动 */
    @media (prefers-reduced-motion: reduce) {
      .rainbow-box p {
        animation: none;
      }
    }
</style>
<div class="rainbow-box" v-if="true">
    <p>
      Wish you to become your own sun, no need to rely on whose light.
      <br>—— 愿你成为自己的太阳，无需凭借谁的光芒。
    </p>
</div>

## 👲 基本信息

```yaml
👤 Name: 伪音花火 / 01Petard
🏠 Address: Ningbo, Zhejiang, China
📮 Email: 1520394133@qq.com
🐱 Github: https://github.com/01Petard
🛳 Blog(Legacy): https://01petard.github.io
🛳 Blog(Current): https://www.bugstack.top
😋️ Hobbies: Nijigen Doujinverse, Browsing and Gadgets
```

## ☁️ 文章词云

基于本站全部文章正文实时统计生成：

<WordCloud type="content" />

[//]: # (## 🔨 技术栈)

[//]: # ()
[//]: # (基于博客内容实时统计技术分布：)

[//]: # ()
[//]: # (<WordCloud type="tech" />)

## 💘 关于本站

采用 <a href="https://vitejs.cn/vitepress/">VitePress</a> 框架搭建。博客中的图片均由 <a href="https://github.com/Molunerfinn/PicGo">PicGo</a>
管理，并上传至我的Github图床。本博客文章采用 <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh">CC BY-NC-SA 4.0</a> 协议，转载请注明出处。

## 🙋 免责声明

本站以分享经验、知识还有我的个人爱好为为目的，所有文章所涉及使用的工具、资源均源自互联网，本人不对因浏览网站内容而产生的实际问题负责。
本网站仅进行搬运和分享以供学习和研究使用，版权归作者所有，如果无意之中侵犯了您的版权，请右下角私信与我取得联系，我将在第一时间删除！另外， 本站内的文章仅供学习交流之用，不参与商业用途。

**Last Update：2026-08-19**

