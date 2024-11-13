---
title: 切换jdk版本的方法（jenv法）
date: 2022-03-04 20:01:15
updated:
categories: 
- 学习
tags: 
- Java
- jdk
keywords:
- Java
- 切换jdk版本
description: 利用jenv管理jdk版本
cover: https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/295a1f378135ca0be39d325ff5ab1af14af5d797.jpg
top_img: https://static.getiot.tech/java-logo.png
---

今天要跑个人博客项目，用mvn打包完，想在本地跑一下，结果我装了三个jdk版本，分别是8、11、17，于是想到了进行jdk的版本管理。但是我去网上搜索了一番，发现jenv教程很详细，但是我就是没法切换，后来捣鼓了4小时，终于发现原因了，竟然是**没重启！**，我真的日了🐶了。特此记录一下安装jenv的教训！

### **安装**

```shell
brew install jenv
```

```shell
echo 'export PATH="$HOME/.jenv/bin:$PATH"' >> ~/.zshrc
```

```shell
echo 'eval "$(jenv init -)"' >> ~/.zshrc
```

```shell
mkdir -p  ~/.jenv/versions
```

### 链接java版本

```shell
jenv add /Library/Java/JavaVirtualMachines/zulu-8.jdk/Contents/Home
```
```shell
jenv add /Library/Java/JavaVirtualMachines/zulu-11.jdk/Contents/Home
```
```shell
jenv add /Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home
```

因为我有三个jdk版本，都全部链接进去了，**以后也可以将别的环境的版本这样子进行管理，比如mysql、tomcat、maven**

### jenv的常用命令

查看安装的版本

```shell
jenv versions
```

查看在用的版本

```shell
jenv version
```

设置默认版本1.8

```shell
jenv global 1.8
```

设置当前版本为1.8

```shell
jenv local 1.8
```

强制maven使用jenv配置的java版本

```shell
jenv enable-plugin maven
```

重启Shell终端

```shell
exec $SHELL
```

### 最后，不要忘记重启！

这世上果然99%的问题都是可以重启解决的，淦！之前害我弄了好久，都要崩溃了！

