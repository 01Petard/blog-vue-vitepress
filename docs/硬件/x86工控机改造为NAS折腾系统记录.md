# x86工控机改造为NAS系统折腾记录

## 项目背景

在闲鱼上看到了一块的J1900 ITX板子，双千兆网口，自带大内存和固态，还送电源，只要200就能拿下！

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202412212158044.png" alt="image-20241221215854893" style="zoom:50%;" />

于是毫不犹豫买了，买来一开始是装了iStoreOS的，但是我想着x86这么好的扩展，肯定得玩NAS了，于是就打算装个飞牛OS，拿来当NAS，而且手头有好几块机械盘（乐）

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202412212155377.png" alt="image-20241221215503064" style="zoom:50%;" />

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202412212154026.png" alt="image-20241221215436715" style="zoom:33%;" />

## 技术路线

其实这种双网口的机器最好还是做成软路由，但是我已经选择小型机器当软路由了嘛。。。再加上x86板子这么好的扩展性，不接点外围设备可惜了，所以就打算搞成NAS！

NAS系统的安装跟Windows差不多，这里选择了广受好评的**飞牛OS**，这个系统基于debian，是滚动式更新的，社区比较活跃，也有对应的手机管理app。

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202412211805225.png" alt="image-20241221180511670" style="zoom: 40%;" />

## 安装过程

简略说下：

1. 准备一个容量至少16g的U盘，我用了一个USB 2.0的U盘

2. 去[飞牛官网](https://fnnas.com/)下载系统镜像

3. 用烧录软件将镜像写入引导U盘，我这里用了[balenaEtcher](https://etcher.balena.io/)，个人感觉比[rufus](https://github.com/pbatard/rufus)好用

4. 插入U盘，主板通电，主板连接显示器和键盘（鼠标可以不需要），进入bios，设置U盘作为UEFI引导

5. 根据[飞牛官网教程](https://help.fnnas.com/articles/fnosV1/start/install-os.md)逐步走，比较简单，小白都可以装好

   <img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202412212151243.jpg" alt="微信图片_20241221202643" style="zoom:40%;" />

   <img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202412212150296.jpg" alt="微信图片_20241221202640" style="zoom: 40%;" />

6. 根据ip和端口，就进入围网页管理页面了，系统安装完成！

   <img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202412211107465.png" alt="image-20241221110739612" style="zoom: 25%;" />

## 问题修复

**系统无法识别到机械硬盘**

当然，在装了系统就有问题，我用了`sata + ph 2.0/xh 2.5`来接入机械盘，如下图所示：

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202412212151496.png" alt="image-20241221215139382" style="zoom: 40%;" />

但是飞牛系统一直无法识别到机械盘，尽管机械盘已经有工作声了。我ssh切进debian系统，用`df -h`读取不到4T的机械盘，之后看了飞牛论坛的帖子，一度以为是硬盘格式问题，遂连接Windows将其修改为`ext4`格式，但依然无济于事。

> [外置硬盘插上未挂载无法识别文件系统 - BUG反馈 飞牛私有云论坛 fnOS](https://club.fnnas.com/forum.php?mod=viewthread&tid=8806&highlight=)
>
> <img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202412211208975.png" alt="image-20241221120825935" style="zoom: 67%;" />

最后捣鼓了好一会儿，发现是供电问题，3.5寸机械盘的工作电压是12V，此处的`ph 2.0`或`xh 2.54`这种针脚供电太弱，电压上不去，无法提供机械硬盘需要的工作电压。于是我就考虑了下面这种DC供电方案，如下图所示：

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202412212152231.png" alt="image-20241221215218144" style="zoom: 40%;" />

最后也是功夫不负有心人，成功读取了出来了，这样就可以愉快地存电影了（坏笑）！

这里浅浅地晒一下本人的珍藏容量（挺胸）：

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202412212205193.png" alt="PixPin_2024-12-21_18-06-13" style="zoom:35%;" />

## 改进方案

如果如果不想用独立电源的话，选择机械硬盘方案还是需要保证电源能提供多口DC输出，那如果就是嫌弃机械了怎么办呢？

其实还是可以的，我们可以选择**全闪**方案！

全闪方案用大容量的sata或msata盘，现在这类固态1T的价格大约是250~280，如果数据不多的话选择这种其实比机械方案省事多了

而机械方案的存储成本是1T大约50，所以就看具体考量吧！

