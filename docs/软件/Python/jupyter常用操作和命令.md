---
title: jupyter常用操作和命令
date: 2022-08-18 11:11:15
updated:
categories: 
- 学习
tags: 
- jupyter
- 快捷键
- 美化
keywords:
- jupyter
- 快捷键
- 美化
description: 关于jupyter的知识
cover: https://clwasblog-1301107071.cos.ap-shanghai.myqcloud.com/doc/jupyter-notebook.png
top_img: https://img-blog.csdnimg.cn/img_convert/18f2cc96eac73b8c79991758e9323bf3.png
---

## 增加、删除内核

### 安装轮子

```shell
pip install ipykernel -i https://pypi.tuna.tsinghua.edu.cn/simple
```

### 增加kernel

为了隔离python环境，使用了[虚拟环境](https://so.csdn.net/so/search?q=虚拟环境&spm=1001.2101.3001.7020)。如果想在jupyter中使用这个虚拟环境，则需要把这个环境添加到jupyter里

```shell
source venv/bin/activate # 进入虚拟环境
pip install ipykernel # 安装ipykernel
python -m ipykernel install --user --name=<kernel-name>
```

### 查看jupyter所有kernel

这步的操作形同于：`conda env list`
```shell
jupyter kernelspec list
```

### 删除某个kernel

```shell
jupyter kernelspec remove <kernel-name>
```

或

```shell
jupyter kernelspec uninstall <kernel-name>
```



> cover: https://www.nextplatform.com/wp-content/uploads/2021/02/Jupyter_main.png
> top_img: https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2g6gmpR19CGiHggS37HOXUu0X2Onr24whFbwI0pWFIthY2ry7NvkakcN6M7S5MCnrz9k&usqp=CAU

## 更换主题

### 安装主题轮子

```shell
pip install jupyterthemes
```

### 查看可选择的主题

```shell
jt -l
```

### 安装主题

```shell
jt -t 主题名 -T -N![](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/images)
```



> cover: https://clwasblog-1301107071.cos.ap-shanghai.myqcloud.com/doc/jupyter-notebook.png
> top_img: https://img-blog.csdnimg.cn/img_convert/18f2cc96eac73b8c79991758e9323bf3.png

## jupyter notebook快捷键

![534772F4-4AAF-404E-B6E3-809A6C23F0E4_1_201_ab](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/534772F4-4AAF-404E-B6E3-809A6C23F0E4_1_201_ab.jpeg)
