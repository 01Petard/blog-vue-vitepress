---
title: Mac查看固态使用情况
date: 2022-03-02 16:26:15
updated:
categories: 
- 软件
tags: 
- Mac
- 磁盘使用情况
keywords:
- Mac
- 磁盘
description: 一种查看Mac硬盘使用情况的简单方法
cover: https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/5d202f7e165106451.jpg_fo742.jpg
top_img: https://support.apple.com/library/content/dam/edam/applecare/images/zh_CN/macos/monterey/macos-monterery-about-this-mac-storage.png
---

检测工具安装:

```shell
brew install smartmontools
```

命令:

```shell
smartctl -a disk0
```

附上我使用了**2个月**的情况：

```shell
smartctl 7.3 2022-02-28 r5338 [Darwin 21.2.0 arm64] (local build)
Copyright (C) 2002-22, Bruce Allen, Christian Franke, www.smartmontools.org

=== START OF INFORMATION SECTION ===
Model Number:                       APPLE SSD AP0512R
Serial Number:                      0ba0181281e13c26
Firmware Version:                   386.60.2
PCI Vendor/Subsystem ID:            0x106b
IEEE OUI Identifier:                0x000000
Controller ID:                      0
NVMe Version:                       <1.2
Number of Namespaces:               3
Local Time is:                      Mon Mar  7 22:18:27 2022 CST
Firmware Updates (0x02):            1 Slot
Optional Admin Commands (0x0004):   Frmw_DL
Optional NVM Commands (0x0004):     DS_Mngmt
Maximum Data Transfer Size:         256 Pages

Supported Power States
St Op     Max   Active     Idle   RL RT WL WT  Ent_Lat  Ex_Lat
 0 +     0.00W       -        -    0  0  0  0        0       0

=== START OF SMART DATA SECTION ===
SMART overall-health self-assessment test result: PASSED

SMART/Health Information (NVMe Log 0x02)
Critical Warning:                   0x00
Temperature:                        25 Celsius
Available Spare:                    100%
Available Spare Threshold:          99%
Percentage Used:                    0%
Data Units Read:                    6,502,421 [3.32 TB]
Data Units Written:                 5,517,000 [2.82 TB]
Host Read Commands:                 99,276,810
Host Write Commands:                58,002,374
Controller Busy Time:               0
Power Cycles:                       144
Power On Hours:                     64
Unsafe Shutdowns:                   5
Media and Data Integrity Errors:    0
Error Information Log Entries:      0

Read 1 entries from Error Information Log failed: GetLogPage failed: system=0x38, sub=0x0, code=745
```

```
smartctl 7.3 2022-02-28 r5338[Darwin 21.2.0 arm64]（本地构建）

版权所有（C）2002-22，Bruce Allen，Christian Franke，www.smartmontools。组织



==信息部分的开始===

型号：苹果SSD AP0512R

序列号：0ba0181281e13c26

固件版本：386.60.2

PCI供应商/子系统ID:0x106b

IEEE OUI标识符：0x000000

控制器ID:0

NVMe版本：<1.2

名称空间数：3

当地时间：周一至三月7日22:18:27 2022 CST

固件更新（0x02）：1个插槽

可选管理命令（0x0004）：Frmw_DL

可选NVM命令（0x0004）：DS_Mngmt

最大数据传输大小：256页



支持的大国

St Op Max Active Idle RL RT WL WT Ent_Lat Ex_Lat

0+0.00W--0



==智能数据段的开始===

SMART整体健康自我评估测试结果：通过



智能/健康信息（NVMe日志0x02）

严重警告：0x00

温度：25摄氏度

可用备件：100%

可用备用阈值：99%

使用百分比：0%

数据单位读取：6502421[3.32 TB]

写入的数据单位：5517000[2.82 TB]

主机读取命令：99276810

主机写入命令：58002374

控制器繁忙时间：0

动力循环：144次

开机时间：64小时

不安全停机：5

媒体和数据完整性错误：0

错误信息日志项：0



从错误信息日志读取1个条目失败：GetLogPage失败：系统=0x38，子=0x0，代码=745
```

