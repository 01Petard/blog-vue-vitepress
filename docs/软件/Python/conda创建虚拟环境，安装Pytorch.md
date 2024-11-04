---
title: 使用conda创建虚拟环境，安装Pytorch
date: 2022-10-23 19:09:15
updated:
categories: 
- 学习
tags: 
- Python
- conda
- Pytorch
- 深度学习
keywords:
- Python
- conda
- Pytorch
- 深度学习
description: conda的常见使用方式
cover: https://miro.medium.com/max/1200/1*O5Jgl-KFuvUyujAZhXHYlQ.png
top_img: https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/conda_top_image.png
---

> 事先声明：并不需要一定Anaconda，Mac用户比较推荐Miniconda，这里只是介绍一款关于conda的软件，conda的操作都是一样的。截止本文章发布，Anaconda和Miniconda都适配M1 Mac，所以都可以安装。

## 一、使用Anaconda创建虚拟环境

### 1、创建环境

可以引入需要依赖的包，以下仅作演示

- numpy： python数值计算包
- matplotlib: 支持python画图
- pandas ： 数据软件包
- jupyter notebook: 集成开发环境，可直接本地起服务调试python代码

```shell
conda create -n 环境名 python=3.x numpy matplotlib pandas jupyter notebook
```

```
pip install torch==1.13.1+cu117 torchvision==0.14.1+cu117 torchaudio==0.13.1 --extra-index-url https://download.pytorch.org/whl/cu117
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

### 4、删除虚拟环境

```shell
conda remove -name 虚拟环境名称 --all
```

### 5、删除环境中的某个包

```shell
conda remove --name 虚拟环境名称 包名称
```

## 二、安装、配置Pytorch

### 1、下载Pytorch，按照电脑配置安装适合的版本

> [pytorch官网](https://pytorch.org/get-started/locally/)

比如我是Mac，就运行下面这句话

![](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/image-20220807105508024.png)

### 2*、如果安装慢，可以添加清华源和第三方源

    #添加镜像源
    conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main
    conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free
    conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/r
    conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/pro
    conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/msys2
    conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge/
    conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/msys2/ 
    conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/bioconda/ 
    conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/menpo/ 
    conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/pytorch/
    
    #显示检索路径
    conda config --set show_channel_urls yes
    
    #显示镜像通道
    conda config --show channels

**删除之前的镜像源，恢复默认状态**

  ```shell
  conda config --remove-key channels
  ```

**去掉-c pytorch，默认从清华源下载安装包**

```shell
conda install pytorch torchvision
```

### 3、验证Pytorch是否安装成功

![image-20220807110231063](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/image-20220807110231063.png)

如果能输出torch版本就算成功了！

### 4、pip和conda导出requirement.txt

pip批量导出包含环境中所有组件的requirements.txt文件

```shell
pip freeze > requirements.txt
```

conda批量导出包含环境中所有组件的requirements.txt文件

```shell
conda list -e > requirements.txt
```

### 5、pip和conda从requirement.txt安装

pip批量安装requirements.txt文件中包含的组件依赖

```shell
pip install -r requirements.txt
```

conda批量安装requirements.txt文件中包含的组件依赖

```shell
conda install --yes --file requirements.txt
```

### 6、克隆环境、重命名环境

```shell
conda create --name B --clone A
```

```shell
conda create --name B --clone A
conda remove --name A --all
```

### 7、删除环境

```shell
conda remove --name B --all
```

### 8、查看源

```shell
conda config --show-sources
```
