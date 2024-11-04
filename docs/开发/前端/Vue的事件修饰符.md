---
title: Vue的事件修饰符
date: 2022-03-11 18:51:15
updated:
categories: 
- 学习
tags: 
- Vue
- 事件修饰符
keywords:
- Vue
- 事件修饰符
description: Vue的几个常见事件修饰符
cover: https://positivethinking.tech/wp-content/uploads/2021/01/Logo-Vuejs.png
top_img: https://pic1.zhimg.com/v2-bfc9c0f0b8668f3ecf84ac5da71d9aea_720w.jpg?source=172ae18b
---

Vue的事件修饰符：

- prevent：阻止默认事件（常用）；
- stop：阻止事件冒泡（常用）；
- once：事件只触发一次（常用）；
- capture：使用事件的捕获模式；
- self：只有event.target是当前操作的元素时才触发事件；
- passive：事件的默认行为立即执行，无需等待事件回调执行完毕；
