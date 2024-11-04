---
title: win批量删除特定格式开头的文件
date: 2022-12-15 20:44:15
updated:
categories: 
- 软件
tags: 
- Windows
keywords:
- Windows
description: 一种批量删除.DS_Store和._文件的办法
cover: https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/62637770440134478jpg_fo742.jpg
top_img: https://miro.medium.com/max/920/1*dkE1TrK5K3jlSA0gY1-ggQ.png
---

博主将文件从MacOS拷贝到Windows时，经常会遇到有很多.DS_Store和.\_的文件，这些在MacOS里用来保存类型和创建者代码、修改日期、图标等信息的。

但是MacOS因为有一个孪生文件系统：数据分叉和资源分叉，所以不会显示，而Windows只有一个数据分支。所以Windows用户会看到这些文件，这些文件不仅看着烦，而且占屏幕空间，所以最好删了。

下面介绍一下方法，用Windows自带的**命令行**就行。

> 列出当前目录及所有子目录所有以._开头的文件

```shell
dir ._* /a/s
```

> 删除当前目录及所有子目录所有以._开头的文件

```shell
del ._* /a/s
```

**警告：不要直接用.\*删除，因为你可能误删一些重要文件，比如：.gitignore等文件**

大功告成！再也没有那些烦人的文件了，文件夹一下子变得清爽了很多。
