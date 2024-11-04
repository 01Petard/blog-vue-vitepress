---
title: Windows上解决端口占用
date: 2022-08-20 16:30:00
updated:
categories:
- 软件
tags:
- Windows
- 端口占用
keywords:
- Windows
- 端口占用
description: 利用命令行解决Windows上的端口占用
cover: https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/897393-20180808081044172-1318415163.png
top_img: https://img-blog.csdnimg.cn/img_convert/59fd236da82b50799be27b20c64bf959.png

---
参考网址：

> [解决端口占用问题（port is already in use）_奔跑的大白啊的博客-CSDN博客_端口占用](https://blog.csdn.net/zt15732625878/article/details/80904437)

### 1、windows+R 组合键，调出命令行窗口

![这里写图片描述](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/70.jpeg)

### 2、查找占用端口对应的PID（进程号）

```shell
# 列出所有端口占用情况
netstat -ano
# 精确找到被占用的端口对应的PID
netstat -ano|findstr "port"
# 示例
netstat -ano|findstr "6644"
```

![这里写图片描述](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/70.png)

![这里写图片描述](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/70-20220820165351491.png)

### 3、查看是哪个进程或程序占用了端口

```shell
tasklist|findstr "PID"
# 示例
tasklist|findstr "4"
```

![这里写图片描述](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/70-20220820165359174.png)

### 4、通过命令结束进程

```shell
taskkill /f /t /im xx进程
# 示例
taskkill /f /t /im System
```

### 5、命令解析

| 命令         | 描述                                                       |
| ------------ | ---------------------------------------------------------- |
| netstat      | 显示协议统计信息和当前TCP/IP网络连接                       |
| netstat      | 查看当前哪些端口正在被使用                                 |
| findstr      | 查找字符串，类似Linux下的grep命令                          |
| tasklist     | 显示运行在本地或远程计算机上的所有任务的应用程序和服务列表 |
| taskkill     | 结束一个或多个任务或进程                                   |
| taskkill /f  | 指定强制终止的过程（我觉得是进程）                         |
| taskkill /t  | 指定那个终止与父进程一起的所有子进程，常被认为是“树终止”   |
| taskkill /im | imageName 指定将被终止的过程的图像名称                     |