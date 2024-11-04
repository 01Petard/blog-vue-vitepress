---
title: VMware固定虚拟机ip
date: 2023-12-24 15:06:00
updated: 2024-09-21 22:47:00
categories: 
- 学习
tags:
- VMware
- 虚拟机
- Linux
- ip
keywords:
- VMware
- 虚拟机
- Linux
- ip
description: 在Vmware中固定虚拟机的ip地址
cover: https://i0.wp.com/www.techjunkie.com/wp-content/uploads/2020/03/How-to-Create-Virtual-Machine-From-a-Physical-Machine-in-VMWare.jpg?resize=400%2C202&ssl=1
top_img: https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202312241509647.pngq
---

> ## 起因
>
> 在学习微服务过程中，由于电脑数据要迁移，因此虚拟机的ip也发生了变化，但是新装的VMware总是会改变虚拟机的ip，因此出此文档记录如何在VMware中固定虚拟机的ip地址，这样可以免去修改微服务中的一些配置。

## 修改配置文件

```shell
vi /etc/sysconfig/network-scripts/ifcfg-ens33
```

修改里面的`BOOTPROTO`，把`DHCP`改为`static`

```
BOOTPROTO="static"
```

添加

```
IPADDR=192.168.179.129   # 想要固定的ip
NETMASK=255.255.255.0    # 子网掩码
GATEWAY=192.168.179.2    # 网关和VM虚拟机编辑中中设置的一样
DNS1=192.168.179.2       # DNS1和网关一样
```

## 重启网络

```shell
 systemctl restart network
```

这个过程中可能会报错，例如：

> Job for network.service failed...

此时可以将networkmanager服务停了：

```shell
systemctl stop NetworkManager
systemctl disable NetworkManager
```

重启网卡，就ok了

```shell
systemctl restart network
systemctl status network
```

查看所有已安装服务

 ```shell
 systemctl list-units --type=service
 ```

IP绑定成功，结束！

![image-20231215155034126 - 副本](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202312151727007.png)

