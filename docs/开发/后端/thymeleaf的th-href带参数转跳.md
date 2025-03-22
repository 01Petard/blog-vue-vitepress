---
title: thymeleaf的th:href带参数转跳
date: 2022-03-08 23:35:15
updated:
categories: 
- 学习
tags: 
- SpringBoot
- thymelef
keywords:
- SpringBoot
- thymelef
description: th:href携带参数转跳的几种情况
cover: https://i.morioh.com/210619/24860a44.webp
top_img: https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/thylemef.png
---

**带一个参数**：

```html
<a th:href="@{/sign/details(signId=${t.signId})}" ></a>
```

**带两个参数：**

```html
<a th:href="@{/mobileSign/signDetails(id=${id},name=${name})}"></a>
```

**传统URL传递多参数使用?和&拼接**

```html
<a th:href="/teacherShowMember?id=123&name=小明"></a>
```

