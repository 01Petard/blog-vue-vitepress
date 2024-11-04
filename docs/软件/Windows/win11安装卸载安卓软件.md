---
title: win11安装卸载安卓软件
date: 2023-07-20 13:32:15
updated:
categories: 
- 软件
tags: 
- Windows
- Android
keywords:
- Windows
- Android
description: 在windows11上使用安卓软件
cover: https://img4.xitongzhijia.net/allimg/220916/141-2209160946201R.jpg
top_img: https://imgslim.geekpark.net/uploads/image/file/0f/88/0f887f8faebdef731f396fe20fa7a78a.jpg
---

### 前置操作

- 开启CPU虚拟化
- “区域”设置中将地区改为“美国”
- 微软商店下载“Windows Subsystem for Android with Amazon”
- 打开“Windows Subsystem for Android”的开发人员模式

### 常用命令

连接端口：

```shell
adb connect 127.0.0.1:58526
```

安装软件：

```shell
adb install 'G:\Software\Android实用软件\XXX.apk'
```

卸载软件：

```shell
按照windows卸载方式卸载即可
```

### 参考文章：

> [win11系统安装安卓应用教程 - 系统城装机大师 (pcxitongcheng.com)](http://www.pcxitongcheng.com/xtjc/win11/2023-06-22/37257.html)
>
> [Windows11安卓子系统怎么安装和卸载安卓APK (0451nkw.com)](http://www.0451nkw.com/jiaocheng/315869.html)

