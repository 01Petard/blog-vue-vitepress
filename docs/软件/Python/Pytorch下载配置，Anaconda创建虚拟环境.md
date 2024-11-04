---
title: Pytorch下载配置，Anaconda创建虚拟环境
date: 2022-08-06 21:05:15
updated:
categories: 
- 软件
tags: 
- Pytorch
- Anaconda
keywords:
- Pytorch
- Anaconda
- 虚拟环境
description: 下载、配置Pytorch，并用Anaconda创建虚拟环境
cover: https://pic3.zhimg.com/v2-d90c131bec1b3358415a6b73b57561de_1440w.jpg?source=172ae18b
top_img: https://pic2.zhimg.com/v2-0cd1af42c8b073bcb0d0fbbc9dc292b3_720w.jpg?source=172ae18b
---



## 一、使用Anaconda创建虚拟环境

### 1、可以引入需要依赖的包，以下仅作演示

- numpy： python数值计算包
- matplotlib: 支持python画图
- pandas ： 数据软件包
- jupyter notebook: 集成开发环境，可直接本地起服务调试python代码

```shell
conda create -n 环境名 python=3.8 numpy matplotlib pandas jupyter notebook
```

### 2、进入虚拟环境

```shell
conda activate 环境名
```

可以看到命令行开头变了

![image-20220807105109020](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/image-20220807105109020.png)

### 3、退出虚拟环境

```shell
conda deactivate
```

![image-20220807105232709](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/image-20220807105232709.png)

## 二、安装、配置Pytorch

### 1、下载Pytorch，按照电脑配置安装适合的版本

> [pytorch官网](https://pytorch.org/get-started/locally/)

比如我是Mac，就运行下面这句话

![](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/image-20220807105508024.png)

### 2*、如果安装慢，可以添加清华源和第三方源

```shell
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/ 
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/ 
conda config --set show_channel_urls yes
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge/ 
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/msys2/ 
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/bioconda/ 
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/menpo/ 
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/pytorch/
```

**去掉-c pytorch，默认从清华源下载安装包**

```shell
conda install pytorch torchvision
```

### 3、验证Pytorch是否安装成功

![image-20220807110231063](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/image-20220807110231063.png)

如果能输出torch版本就算成功了！