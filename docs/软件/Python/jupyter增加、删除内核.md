---
title: jupyter增加、删除内核
date: 2022-08-18 11:11:15
updated:
categories: 
- 学习
tags: 
- jupyter
- 快捷键
keywords:
- jupyter
- 快捷键
description: 适合win和mac的jupyter快捷键，学起来！
cover: https://clwasblog-1301107071.cos.ap-shanghai.myqcloud.com/doc/jupyter-notebook.png
top_img: https://img-blog.csdnimg.cn/img_convert/18f2cc96eac73b8c79991758e9323bf3.png
---

# 安装

```shell
pip install ipykernel -i https://pypi.tuna.tsinghua.edu.cn/simple
```

# 增加kernel

为了隔离python环境，使用了[虚拟环境](https://so.csdn.net/so/search?q=虚拟环境&spm=1001.2101.3001.7020)。如果想在jupyter中使用这个虚拟环境，则需要把这个环境添加到jupyter里

```shell
source venv/bin/activate # 进入虚拟环境
pip install ipykernel # 安装ipykernel
python -m ipykernel install --user --name=<kernel-name>
```

# 查看jupyter所有kernel

这步的操作形同于：`conda env list`
```shell
jupyter kernelspec list
```

# 删除某个kernel

```shell
jupyter kernelspec remove <kernel-name>
```

或

```shell
jupyter kernelspec uninstall <kernel-name>
```

