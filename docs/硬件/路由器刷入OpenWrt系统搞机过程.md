---
title: 路由器刷入OpenWrt系统搞机过程
date: 2024-11-02 22:01:00
updated:
categories: 
- 学习
tags: 
- Java
- 分布式
keywords:
- Java
- 分布式
description: 最先进的路由器系统——OpenWrt
cover: https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411022232229.png
top_img: https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411022232350.png
---



>  这次玩了波大的。结果还是很不错的！

# 搞机的心路历程

事情是这样的，我在闲鱼上刷着手机，没事看到了瑞莎E20C这个小软路由开发板，因为很mini，所以一下子对软路由产生了兴趣，遂去tb看了价格，2+0内存200左右，可以接受。

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411022107462.png" alt="image-20241102210716302" style="zoom:50%;" />





于是我又去b站看了下软路由，但是我发现玩**软路由**的前提是需要首先有一个**硬路由**。将软路由作为旁路由接入硬路由（什么绕口令），而且*好像只能由连接了软路由的机器才能享受软路由的功能*，于是我开始对软路由产生了技术怀疑，我觉得这东西上手门槛有点高啊，需要至少两个路由器。

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411022110806.png" alt="image-20241102211004626" style="zoom:46%;" />

以下便是我了解到的软路由的两种工作模式，我觉得方案一门槛太高，所以我思考了一下方案二，目前我在校，可以将当前的NX30 pro作为软路由，然后向学校的猫获得上网权限，这样的话所有接入这台路由器的设备都能享受到经过插件过滤的路由了。

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411022110196.png" alt="image-20241102211023998" style="zoom:50%;" />

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411022111345.png" alt="image-20241102211110126" style="zoom:44%;" />

想象很美好，于是说干就干，我去b站找了教程，基本就是按照恩山论坛大佬的帖子走的。

NX30 pro刷OpenWrt教程：[H3C NX30Pro路由器刷OpenWrt，便宜好用，超详细刷机教程分享](https://www.bilibili.com/video/BV1qV411M7FT/)

恩山攻略贴：[H3C NX30 PRO 闭源驱动Openwrt/GL.inet固件/刷回原厂方法-OPENWRT专版-恩山无线论坛](https://www.right.com.cn/forum/thread-8291820-1-1.html)

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411022123033.png" alt="image-20241102212314864" style="zoom:60%;" />

教程零门槛，就是telnet和ssh那些事，一个MobaXterm直接搞定。

## 原设备的mac地址备份

| IP地址         | MAC地址           | 备注          |
| -------------- | ----------------- | ------------- |
| 192.168.124.10 | A0:36:BC:28:61:96 | windows冰立方 |
| 192.168.124.27 | B8:27:EB:34:39:2B | 树莓派3B      |
| 192.168.124.32 | B8:27:EB:10:21:A9 | 树莓派2       |
| 192.168.124.27 | 5A:39:88:9E:9B:C8 | MRK3399KJ     |

#折腾过程

> 此处省略一万个草泥马~
>
> 将NX30 pro从原厂系统刷成OpenWrt的过程太艰辛了！唉，说多了都是泪~~

ok，装好了机子了，这台路由器被我插满了线，性能基本被榨干了吧

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411022125686.png" alt="image-20241102212555353" style="zoom: 33%;" />

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411022126894.png" alt="image-20241102212619496" style="zoom: 33%;" />

# 使用OpenClash

其实我想装OpenWrt，主要还是馋openclash的功能，我之前就一直被vpn所困扰，因为我想用一些软件或登录外网时，必须要开ssr软件或者在v2ray中切换规则或代理，因此如果路由器可以直接完成这一步的话，所以接入路由器的设备都能享受到路由转发的好处了，这个东西的好处对于我这样一个**网络苦手**来说是显而易见的，因此这次就主要在OpenWRT中折腾一下OpenClash。

我们进入OpenWRT，可以看到刷机非常成功，现在这台NX30 pro已经是OpenWRT的形状了（doge）。

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411022133020.png" alt="image-20241102213326946" style="zoom: 67%;" />

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411022147121.png" alt="image-20241102214731952" style="zoom: 40%;" />

## 配置内核

然后去“服务” -> “OpenClash” -> “全局设置” -> “版本更新”，我这里将Dev内核和Meta内核配置好了，Tun内核我搞了很久都没成功，包括但不限于默认的的检测更新、使用ssh手动拖拽文件更新，总之就是不行，想了想自己其实并不会用到Tun模式，就作罢。

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411022138856.png" alt="image-20241102213807800" style="zoom:80%;" />

## 添加机场订阅

然后去配置一下机场，点击“服务” -> “OpenClash” -> “配置文件订阅” -> “配置文件订阅” -> “添加”，添加机场的订阅链接就基本ok了。然后OpenClash会重启。

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411022141982.png" alt="image-20241102214123896" style="zoom:67%;" />

## 完善DNS设置

重启后OpenClash提醒开启了IPV6的服务。这里也要说明一下，听别人说很多问题都是IPV6造成的，所以我就去“网络” -> “DHCP/DNS”里改了一些DNS设置，比如”忽略空域名解析“、”禁止解析IPv6 DNS记录，只返回 IPv4 DNS 域名记录“等等。

## 选择节点

之后去OpenClash的控制面板看一下吧，它提供了两种面板：Yacd 控制面板、  Dashboard 控制面板，我比较喜欢Yacd。

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411022145550.png" alt="image-20241102214553505" style="zoom: 60%;" />

速率也是一目了然，去测个速吧，跑满了100M，符合预期。

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411022150767.png" alt="image-20241102215011673" style="zoom:40%;" />

# 开始享受~

折腾了一天，总算是搞好了，现在打开推特、油管、ChatGPT都不需要打开v2ray了，而且连接路由器的设备也不需要开小火箭了，直接想用什么就用什么，无敌！

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411022154030.png" alt="image-20241102215401645" style="zoom:25%;" />
