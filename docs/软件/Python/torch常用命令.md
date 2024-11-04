---
title: torch常用命令
date: 2023-06-12 15:27:15
updated:
categories: 
- 学习
tags: 
- torch
- 深度学习
keywords:
- torch
- 深度学习
description: 通过torch查看信息
cover: https://pytorch.org/tutorials/_static/img/thumbnails/cropped/profiler.png
top_img: https://imagingsolution.net/wordpress/wp-content/uploads/2022/03/pytorch_logo_icon.png
top: 200
---

# 1、服务器信息查询

## `CPU`查询

```shell
# 查看CPU信息
cat /proc/cpuinfo | grep "physical id" | uniq | wc -l #查看CPU个数
cat /proc/cpuinfo | grep "cpu cores" | uniq #查看CPU核数
cat /proc/cpuinfo | grep 'model name' |uniq #查看CPU型号
```

## `GPU`查询

```shell
# 查看GPU信息
sudo dpkg --list | grep nvidia-* # 查看驱动版本
lshw -c video #查看显卡型号
$ lspci | grep -i nvidia # 可以查询所有nvidia显卡
$ lspci -v -s [显卡编号] # 可以查看显卡具体属性
$ nvidia-smi # 可以查看显卡的显存利用率
$ cat /etc/issue # 查看Linux发布版本号
$ lsb_release -a # 查看Linux发布版本号
$ uname -sr # 查看内核版本号
$ uname -a # 查看内核版本号
```

`lspci`是一种实用程序，用于在系统中显示有关[pci总线](https://so.csdn.net/so/search?q=pci总线&spm=1001.2101.3001.7020)的信息以及连接到它们的设备。

## `CUDA`版本

```shell
nvidia-smi # 右上角CUDA Version，但可能不准确，推荐使用nvcc -V
nvcc -V # 建议以nvcc -V查询为主
```

![在这里插入图片描述](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/19b97250915d432f8af3cea56df6db2c.png)

## 实时查看`nvidia-smi`

```shell
nvidia-smi -l 1 # 以每秒刷新一次进行信息，结果为1s一次输出nvidia-smi，不流畅，建议使用吓一条命令
watch -n 1 nvidia-smi # 会在同一位置处1s更新窗口信息
```

# 2、显卡信息查看

```python
torch.cuda.is_available() # 查看是否有可用GPU
torch.cuda.device_count() # 查看GPU数量
torch.cuda.get_device_capability(device) # 查看指定GPU容量
torch.cuda.get_device_name(device) # 查看指定GPU名称
torch.cuda.empty_cache() # 清空程序占用的GPU资源
torch.cuda.manual_seed(seed) # 设置随机种子
torch.cuda.manual_seed_all(seed) # 设置随机种子
torch.cuda.get_device_properties(i) # i为第几张卡，显示该卡的详细信息
```

# 3、输出模型增肌信息

```python
s = f'MODEL 🚀 torch {torch.__version__} '
    n = torch.cuda.device_count()
    space = ' ' * (len(s)+1)
    for d in range(n):
        p = torch.cuda.get_device_properties(d)
        s += f"{'' if d == 0 else space}CUDA:{d} ({p.name}, {p.total_memory / 1024 ** 2}MB)\n"  # bytes to MB
    print(s)
```

![在这里插入图片描述](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/230468572b0048dcb2eb1de6f79a9823.png)

# 4、指定使用显卡

通过`os.environ["CUDA_VISIBLE_DEVICES"]`指定所要使用的显卡：

```python
import os
os.environ['CUDA_VISIBLE_DEVICES'] = "2,1,3,4"
print("torch.cuda.device_count() {}".format(torch.cuda.device_count()))
```

这种设置方式，`2`号卡就变成了主卡。`CUDA_VISIBLE_DEVICES `表示当前可以被python环境程序检测到的显卡。`os.environ["CUDA_VISIBLE_DEVICES"] = "2,1,3,4"`进行指定使用设备，这样会修改`pytorch`感受的设备编号，`pytorch`感知的编号还是从`device:0`开始。如上会把`2`号显卡改为`device:0`，`1`号显卡改为`device:1`。

如果有多个显卡，设置了`os.environ["CUDA_VISIBLE_DEVICES"]`后，其他没有设置的显卡将不会在本次代码中显示。`os.environ["CUDA_VISIBLE_DEVICES"]`需要设置在代码开头。

另外，使用终端也可以直接选择选择显卡，输入`CUDA_VISIBLE_DEVICES=0 python train.py`也可以

