---
title: 关于bing国内重定向解决方案
date: 2023-02-12 12:34:15
updated:
categories: 
- 软件
tags: 
- 必应bing
keywords:
- 必应bing
description: 仲裹初拼，毕输经拼
cover: https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/下载.png
top_img: https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202410212226188.png
---

去年因为chatGPT火了嘛，所以微软也乘机搞起了大规模语言生成模型，于是最近就有了这个东西，但是中国的用户去必应首页会被重定向到国内的网站的（也就是cn版），于是我就发一下如何解决这个问题吧：

1.在你的浏览器扩展商店里获取**header editor**插件。

![](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/20230215005613.png)

2.在插件里面导入这个脚本，并保存后再次访问即可解决问题

```html
https://gist.githubusercontent.com/yuhangch/9abc4220af46a1f4a7fc97393e2f040e/raw/89c889b0e7a80446c931823edd612630fd62d165/header-editor-config.json
```

