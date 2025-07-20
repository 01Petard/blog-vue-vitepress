---
title: ffmpeg使用命令
date: 2022-11-14 18:05:15
updated: 
categories: 
- 软件
tags: 
- ffmpeg
- 视频处理
keywords:
- ffmpeg
- 视频处理
description: ffmpeg命令太多了，本人也是用的时候学一下。
cover: https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411030524339.png
top_img: https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411030525536.png
---

## 0、[ffmpeg](https://blog.csdn.net/HYEHYEHYE/article/details/122000352)安装教程

## 1、图片合成视频

```shell
ffmpeg -f image2 -i /home/ttwang/images/image%d.jpg -vcodec libx264 out.mp4
```

图片的命名格式为`image%d.jpg`形式，即：`image0.jpg`、`image1.jpg`、`image2.jpg`、 .......
`out.mp4`为输出视频文件名

`-vcodec`：指定编码格式

`-r`：指定每秒帧率

`framerate`：指定每秒的图片数量

## 2、提取每帧图片

```shell
ffmpeg -i video.mp4 -qscale:v 1 -qmin 1 -qmax 1 -vsync 0 video_frames/frame%08d.png
```

`video.mp4`是需要提取的视频

`video_frames`是存放提取帧的文件夹

### 2.5、图片处理

这步你可以对图片进行一些处理，比如用[RealESRGAN](https://github.com/xinntao/Real-ESRGAN)或[Real-CUGAN](https://github.com/bilibili/ailab)超分辨率，经过处理后可以用[第3步](#third)合成视频，实现视频超分辨率！

##  <a name="third">3、将图片合成视频</a>

```shell
ffmpeg -i video_frames/frame%08d.jpg -i onepiece_demo.mp4 -map 0:v:0 -map 1:a:0 -c:a copy -c:v libx264 -r 23.98 -pix_fmt yuv420p video_with_audio.mp4
```

## `ffmpeg中文文档`

ffmpeg官方文档没有中文，所以我找了篇质量较高的中文文档，作为备用参考

> [ffmpeg中文文档 - 简书](https://www.jianshu.com/p/da47b00c42ce)

> [ffmpeg中文文档 - CSDN博客](https://blog.csdn.net/xiayulengleng/article/details/125444466)

