---
title: Mac删除OBS的虚拟摄像头
date: 2022-06-02 22:13:15
updated:
categories: 
- 软件
tags: 
- Mac
- OBS
- 虚拟摄像头
keywords:
- OBS
- 虚拟摄像头
description: 解决Mac下无法彻底删除OBS虚拟摄像头插件的问题
cover: https://cdn.akamai.steamstatic.com/steam/apps/1905180/capsule_616x353.jpg?t=1654173198
top_img: https://cdn.cloudflare.steamstatic.com/steam/apps/1905180/ss_f7aa6c7a804e0a06ea5a9742a9afc15f637d498e.1920x1080.jpg?t=1654173198

---

### 先容我吐槽一波！
我在“简中互联网”上找了好久，几乎都是教你怎么用的，而且用途都不正经。就没有教你怎么删的，windows几乎都是清一色注册表删除，但是Mac哪来的注册表？所以搞了一下午，都快给我气晕了。首先，下载老版本没有，因为老Mac版的OBS在“工具”里也没有关闭的按钮，这OBS的mac版真的纯纯的沙壁，自带一个没娘的插件，随意修改用户的电脑配置，我好好地写代码想调用一下摄像头，没想到居然被0还是1给搞了（opecv里调摄像头的参数）。这次就直接怒卸这狗避的。
### 吐槽完了，上方法：
参考帖子：
>https://obsproject.com/forum/threads/how-to-uninstall-obs-virtual-camera.146837/

国外老哥的方法就是输两行命令，不愿看的就直接复制下面两行就完事了。
```shell
sudo rm -rf /Library/CoreMediaIO/Plug-Ins/DAL/obs-mac-virtualcam.plugin
```

```shell
sudo rm -rf /Library/Application\ Support/obs-studio/plugins/obs-mac-virtualcam
```

### 解决！
![在这里插入图片描述](https://img-blog.csdnimg.cn/bc9eec8b4d404a518a2b977400f07daa.png)

可以看到Edge浏览器里已经找不到OBS Virtual Camera了，芜湖撒花🎉
