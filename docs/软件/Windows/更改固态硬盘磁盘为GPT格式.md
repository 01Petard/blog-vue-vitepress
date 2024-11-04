---
title: 更改固态硬盘磁盘为GPT格式
date: 2022-07-30 22:00:15
updated:
categories: 
- 软件
tags: 
- 硬盘格式
- 装机
keywords:
- 装机
description: 解决装机时的麻烦
cover: https://pica.zhimg.com/v2-37670246d2a0e0e8667731ed91dea46b_1440w.jpg?source=172ae18b
top_img: https://picx.zhimg.com/v2-76671028cebf97688dc6a3732a491ba6_r.jpg?source=172ae18b
---

### 起因

在装机时发现磁盘是“MBR”格式的，装不了win10，而众所周知win10系统安装系统的快速启动功能要求的是UEFI+GPT格式的硬盘，所以记录一下

### 参考网址

> [磁盘有mbr分区安装不了系统怎么办 - 装机吧 (zhuangjiba.com)](http://www.zhuangjiba.com/jiaocheng/16597.html)

### 步骤：

1、按shift+f10调出命令提示符。

![image.png](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/cb1db42f8e360c2c81a8b7ec8d78b2d9.png)

2、输入diskpart后回车确定，进入分区工具。

![image.png](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/297e92fb08524bfabc96cd58a5561926.png)

3、输入list disk后回车确定，一般下面是安装系统的U盘,切勿把有数据的盘GPT格式,不然会清空数据。

![image.png](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/7889ea678a626fe408d51d018fe3160a.png)

4、输入select disk +磁盘编码即0，回车确定。

![image.png](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/8064cde1dfb421231afe2161962bdf8f.png)

5、输入clean，回车确定，将会清除硬盘上所有分区。

![image.png](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/b4b755ca4d611b14479445dc14b62e5c.png)

6、输入convert gpt，回车确定，即可将硬盘转换成GPT格式。再继续重装系统即可。

![image.png](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/1eb8bf05bcd271ddcfc27767bc6a027a.png)
