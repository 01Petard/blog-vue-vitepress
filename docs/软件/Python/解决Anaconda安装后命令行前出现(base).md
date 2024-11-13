---
title: 解决Anaconda安装后命令行前出现(base)
date: 2022-03-25 13:53:15
updated:
categories: 
- 学习
tags: 
- Anaconda
keywords:
- Anaconda
description: 解决Mac下Anaconda安装后的小麻烦
cover: https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202410212219583.png
top_img: https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202410212219245.png
---

### 方法一：

每次在命令行通过conda deactivate退出base环境回到系统自带的环境

### 方法二

1，通过将auto_activate_base参数设置为false实现：

```shell
conda config --set auto_activate_base false
```

2，那要进入的话通过conda activate base

3，如果反悔了还是希望base一直留着的话通过来恢复

```shell
conda config --set auto_activate_base true
```
