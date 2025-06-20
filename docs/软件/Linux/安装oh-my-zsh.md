---
title: 安装oh-my-zsh
date: 2022-11-08 20:44:15
updated:
categories: 
- 软件
tags: 
- Linux
- ohmyzsh
- 终端美化
- zsh
keywords:
- Linux
- ohmyzsh
- 终端美化
- zsh
description: 美化你的终端，Z门！
cover: https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202410212210367.png
top_img: https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202410212210587.png
---

> 前提：安装好**Git**

## 1、安装zsh并更改默认终端

安装软件包

```shell
yum -y install zsh git
```

更改默认终端

```shell
chsh -s /bin/zsh
```

## 2、配置oh-my-zsh

拉取oh-my-zsh

```shell
git clone https://gitee.com/mirrors/oh-my-zsh.git ~/.oh-my-zsh
```

默认配置

```shell
cp ~/.oh-my-zsh/templates/zshrc.zsh-template ~/.zshrc
```

## 3、安装高亮、自动补全插件

安装高亮插件：zsh-syntax-highlighting

```shell
git clone https://gitee.com/dawnwords/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

安装自动补全：zsh-autosuggestions

```shell
git clone https://gitee.com/lhaisu/zsh-autosuggestions.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

```

安装autojump目录跳转

```shell
git clone https://gitee.com/gentlecp/autojump.git
cd autojump
./install.py
```

## 4、插件配置

```shell
vim ~/.zshrc
```

```shell
plugins=(
	git
	sudo
	zsh-autosuggestions
	zsh-syntax-highlighting
	autojump
)
```

```shell
source ~/.zshrc
```

## 5、修改主题 

```shell
vim ~/.zshrc
```

个人比较喜欢这套

```shell
ZSH_THEME="maran"
```

> 更多可以[看这里](https://github.com/ohmyzsh/ohmyzsh/wiki/themes)，都是官方默认的，改一下配置就行了  

如果不想费时费力去选的话，直接让zsh把主题都打印出来吧

```shell
for theme in $(ls $ZSH/themes | sed 's/\.zsh-theme$//'); do
  echo "\n================== $theme =================="
  ZSH_THEME="$theme" zsh -i -c 'echo $PROMPT'
done
```

除了自带的主题外我个人还比较喜欢两个

分别是sobole和jovial

- sobole 

  ![74af970abbf731048fef10bb85c0b92b.png](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202506051846403.png)

- jovial

  ![48ada5d75ea2044b132b85bc106b2ae3.png](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202506051846481.png)

  ![screenshot](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202506051846405.png)

sobole安装地址：

> [sobolevn/dotfiles: dotfiles for the developer happiness: macos, zsh, brew, vscode, codespaces, python, node, elixir (github.com)](https://github.com/sobolevn/dotfiles)

jovial安装地址：

> [zthxxx/jovial: Jovial - A lovely zsh theme with responsive-design, it's pretty fast, keep simple but useful (github.com)](https://github.com/zthxxx/jovial)

dracula-theme安装地址

> [Dark theme for Zsh and 266+ apps — Dracula (draculatheme.com)](https://draculatheme.com/zsh)

```shell
source ~/.zshrc
```

## 6、其他

**zsh粘贴慢问题：一个字符一个字符粘贴。这是zsh的问题**

解决：修改zsh配置：`vim ~/.zshrc`，增加如下代码：

```shell
vim ~/.zshrc
```

```
pasteinit() {
  OLD_SELF_INSERT=${${(s.:.)widgets[self-insert]}[2,3]}
  zle -N self-insert url-quote-magic # I wonder if you'd need `.url-quote-magic`?
}

pastefinish() {
  zle -N self-insert $OLD_SELF_INSERT
}
zstyle :bracketed-paste-magic paste-init pasteinit
zstyle :bracketed-paste-magic paste-finish pastefinish
```

```shell
source ~/.zshrc
```

## LAST：效果展示

美化前：

![image-20231108204645514](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/image-20231108204645514.png)

美化后：

![image-20231108204754639](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/image-20231108204754639.png)
