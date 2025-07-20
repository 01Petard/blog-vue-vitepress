---
title: zsh与bash的切换
date: 2022-03-04 20:41:15
updated:
categories: 
- 软件
tags: 
- zsh
- bash
keywords:
- zsh
- bash
description: zsh和bash的切换
cover: https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202410212220854.png
top_img: https://i.ytimg.com/vi/xzU4I5UO1Qg/maxresdefault.jpg
---

## 1、问题由来

网上冲浪解决问题时，听闻zsh很好用，于是稀里糊涂入坑了，于是记录一下使用zsh过程中遇到的坑和一些常用的命令

## 2、解决思路

安装oh my zsh（安装完成后自动进入zsh界面）

```shell
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

卸载oh my zsh

```shell
uninstall_oh_my_zsh
```

如果遇到**command not found**的错误，可以先执行这条命令

```shell
export PATH=/bin:/usr/bin:/usr/local/bin:"${PATH}"
```

切换成bash

```shell
chsh -s /bin/bash
```

切换成zsh

```shell
chsh -s /bin/zsh
```

下载主题

```shell
git clone git://github.com/jeremyFreeAgent/oh-my-zsh-powerline-theme 
```

执行目录下的脚本install.sh

```shell
sudo ./oh-my-zsh-powerline-theme/install.sh
```

安装字体，防止乱码

```shell
git clone https://github.com/powerline/fonts.git
```

执行install.sh安装字体

```shell
sudo ./fonts/install.sh
```

- 到此字体安装完成，之后在终端命令行工具的偏好设置设置:
- 找到“文本->>字体->>更改” ，"所有字体"中选中“ Meslo LG M for powerLine“ 字体

修改zsh主题

```shell
vim  ~/.zshrc
```

```shell
ZSH_THEME="robbyrussel"  修改此项为设置主题： ZSH_THEME="powerline" 
```

保存，重启**终端命令行**即可看到powerLine 主题

使用alias别名

```shell
alias pod_update='pod update --verbose --no-repo-update'
```

如果遇到brew命令失效，可以执行一下两行代码

```shell
echo 'eval $(/opt/homebrew/bin/brew shellenv)' >> /Users/hzx/.zprofile
eval $(/opt/homebrew/bin/brew shellenv)
```

```shell
echo 'eval $(/opt/homebrew/bin/brew shellenv)' >> /Users/hzx/.zprofile
eval $(/opt/homebrew/bin/brew shellenv)
```

解决brew命令和mvn命令不能用的问题

