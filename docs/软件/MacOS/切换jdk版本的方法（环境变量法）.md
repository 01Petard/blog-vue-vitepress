---
title: 切换jdk版本的方法（环境变量法）
date: 2022-03-07 22:14:15
updated:
categories: 
- 学习
tags: 
- Java
- jdk
keywords:
- Java
- 切换jdk版本
description: 引入环境变量切换jdk版本
cover: https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/295a1f378135ca0be39d325ff5ab1af14af5d797.jpg
top_img: https://static.getiot.tech/java-logo.png
---

首先配置好java环境，这一步每个人可能会不一样

```
#配置java环境
export JAVA_HOME=/Library/Java/JavaVirtualMachines/zulu-8.jdk/Contents/Home
export CLASSPAHT=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
export PATH=$JAVA_HOME/bin:$PATH:
```

然后引入下面这样的格式，可以根据个人情况修改，我安装了8、11、17三个版本

```
# 设置 JDK 1.8
export JAVA_8_HOME=`/usr/libexec/java_home -v 1.8`
# 设置 JDK 11
export JAVA_11_HOME=`/usr/libexec/java_home -v 11` 
# 设置 JDK 17
export JAVA_17_HOME=`/usr/libexec/java_home -v 17` 

# 默认JDK 8
export JAVA_HOME=$JAVA_8_HOME 

# alias命令动态切换JDK版本
alias jdk8="export JAVA_HOME=$JAVA_8_HOME"
alias jdk11="export JAVA_HOME=$JAVA_11_HOME"
alias jdk17="export JAVA_HOME=$JAVA_17_HOME"
```

大功告成了，在终端输入jdk8、jdk11、jdk17即可快速切换jdk版本，真不戳！