---
title: Mac调整docker栏
date: 2022-07-30 22:39:15
updated:
categories: 
- 软件
tags: 
- Mac
- docker栏
keywords:
- Mac
- docker栏
description: 修改Mac的docker栏的动画效果
cover: https://pica.zhimg.com/v2-18cc4dff3c2eebfcebd7769288325eef_1440w.jpg?source=172ae18b
top_img: https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk1UcE6VDX7MJNKUTp7cYmd0RvRs_x1bip8uvzKFlANeeredFd
---



### 恢复docker默认状态

```shell
sudo defaults delete com.apple.dock; killall Dock
```

### 关闭动画

```shell
sudo defaults write com.apple.dock autohide-time-moidifier -int 0;killall Dock
```

### 恢复默认的滑动效果
```shell 
sudo defaults write com.apple.dock autohide-time-moidifier -int 0;killall Dock
```

### 关闭延迟
```shell
 sudo defaults write com.apple.Dock autohide-delay -float 0; killall Dock
```

### 还原指令
```shell
 sudo defaults delete com.apple.Dock autohide-delay; killall Dock
```