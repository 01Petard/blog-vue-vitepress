---
title: 在ARM架构的Mac上运行exe程序，以文字游戏为例
date: 2022-09-14 18:06:15
updated:
categories: 
- 软件
tags: 
- Mac
- ARM
- Windows
- CrossOver
- Wine
keywords:
- Mac
- ARM
- Windows
- CrossOver
- Wine
description: 一种可以在ARM架构Mac上运行exe程序的办法
cover: https://www.omgubuntu.co.uk/wp-content/uploads/2016/03/wine.jpg
top_img: https://i.ytimg.com/vi/nVxzCteaWnc/maxresdefault.jpg
---

记录一下，如何在arm架构芯片的Mac上打开exe后缀的windows程序

也是参考了这个视频

> https://www.bilibili.com/video/BV1mW4y1k7GF

# PS

这种方法是安装**Wine CrossOver**，但是Github上还有一种方法，就是安装**CrossOver**，它们俩都可以实现mac打开exe程序，相比之下，Wine CrossOver使用方便，即开即关，CrossOver有客户端界面，可以自己定制容器。

我下面介绍的方法是左边的，你也可以去MacWk安装右边的CrossOver，有兴趣可以自己研究一下。

> https://macwk.com/soft/crossover

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/image-20220914180954000.png" alt="image-20220914180954000" style="zoom: 50%;" />

# Wine CrossOver安装步骤

1、安装好homebrew，这个程序员都懂的，就不提了。
2、运行下面的代码，不太懂，应该是要创建一个wine的tap

```shell
brew tap gcenx/wine
```

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/image-20220914173839105.png" alt="image-20220914173839105"  />

3、安装wine-crossover，装完后可以右键exe程序使用wine运行了

```shell
brew install --cask --no-quarantine wine-crossover
```

下图是装完了的结果

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/image-20220914173901541.png" alt="image-20220914173901541" style="zoom: 50%;" />

# 调整

```shell
winecfg
```

会弹出一个古老的窗口（win2003？）窗口，如果没声音，可以调整一下音频。

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/image-20220914174005477.png" alt="image-20220914174005477" style="zoom: 50%;" />

# 完成

然后开一个游戏试试

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/image-20220914174158757.png" alt="image-20220914174158757" style="zoom: 50%;" />

很不幸，报错打不开（悲）

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/image-20220914174910056_1.png" alt="image-20220914174910056" style="zoom: 50%;" />

但是万华镜就打开了……说明还得看情况，暂时不清楚打不开的原因是什么（大悲）

另外，有些游戏的存档如果不是在根目录的话也会消失，但是万华镜的还在。。

所以还是得具体问题具体分析。

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/image-20220914175300224.png" alt="image-20220914175300224" style="zoom: 50%;" />

然后又试了很多，发现问题百出，有的文字显示不了、有的显示比例不对，总之还是不能完美地运行，但是起码有了一个比较好的开始了，有总比没有强吧。

