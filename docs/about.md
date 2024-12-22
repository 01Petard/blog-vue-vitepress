---
title: 关于我
date: 2022-08-02 16:08:07
type: "about"
---


<style>
    /* 定义背景闪耀动画 */
    @keyframes shine {
      0% { background-position: 100% 50%; } /* 从右边开始 */
      100% { background-position: -100% 50%; } /* 到左边结束 */ /* 负值确保动画结束位置与起始位置视觉上一致 */
    }

    /* 闪耀背景效果，仅限该 div */
    .shiny-div {
      font-weight: bold; /* 加粗字体 */
      padding: 20px; /* 增加内边距 */
      text-align: center; /* 居中对齐 */
      /*background-image: linear-gradient(120deg, #dd206f, #ea8011, #1c7526, #2b77b5, #51259c);*/
      background-image: linear-gradient(
				120deg,
			  #bd34fe, /* 紫色 */
			  #47caff, /* 蓝色 */
			  #2dd4bf, /* 青绿 */
			  #facc15, /* 金色 */
			  #ff4d4d, /* 红色 */
			  #fa1593, /* 嫣色 */
			  #bd34fe, /* 紫色 */
			  #2dd4bf, /* 青绿 */
			  #47caff, /* 蓝色 */
			  #facc15, /* 金色 */
			  #ff4d4d, /* 红色 */
			  #fa1593 /* 嫣色 */
			);
      background-size: 300% 300%;
      -webkit-background-clip: text; /* 使用背景裁剪文字 */
      background-clip: text;
      color: transparent; /* 让文字透明显示背景 */
      animation: shine 30s infinite linear; /* 应用动画 */
      font-size: 1.2rem;
    }

    /* 单独设置中文部分的颜色 */
    .shiny-div p:nth-child(2) {
      /*color: #ff4d4d; !* 深红色 *!*/
      font-size: 1.5rem;
      font-weight: bold;
    }
  </style>

  <div class="shiny-div">
    <p>
      Wish you to become your own sun, no need to rely on who’s light.
    </p>
    <p>
      —— 愿你成为自己的太阳，无需凭借谁的光芒。
    </p>
  </div>

## 👲 基本信息

```yaml
👤 Name: 伪音花火 / 01Petard
🏠 Address: Zhejiang, Hangzhou
📮 Email: 1520394133@qq.com
🐱 Github: https://github.com/01Petard
💻 Blog: https://01petard.github.io/blog-vue-vitepress/
💻 Blog(Legacy): https://01petard.github.io/
❤️ Hobbies: Bangumis, Doujin, Surfing Online, Digital Devices
```

## 🔨 技术栈

- 后端学习的还挺多的，感觉自己可以自己行了👍（Java要死了，那我转Go？）
- 暴学前端，目前Vue3基本ok了，自我感觉良好（学多了感觉JavaScript也看顺眼了）
- 了解 a little of Python，懂点Flask框架，会运用简单的AI模型（对 Ollama 这玩意儿比较看好）
- 懂点开发板相关的硬件，对硬件开发了解不多，但是热衷于捣鼓“软路由”、“NAS”相关的东西
- ……

## 💘 关于本站

采用 <a href="https://vitejs.cn/vitepress/">VitePress</a> 框架搭建。博客中的图片均由 <a href="https://github.com/Molunerfinn/PicGo">PicGo</a> 管理，并上传至我的Github图床。本博客文章采用 <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh">CC BY-NC-SA 4.0</a> 协议，转载请注明出处。

## 🙋 免责声明

本站以分享经验、知识还有我的个人爱好为为目的，所有文章所涉及使用的工具、资源均源自互联网，本人不对因浏览网站内容而产生的实际问题负责。
本网站仅进行搬运和分享以供学习和研究使用，版权归作者所有，如果无意之中侵犯了您的版权，请右下角私信与我取得联系，我将在第一时间删除！另外， 本站内的文章仅供学习交流之用，不参与商业用途。

**Last Update：2024-11-13**

