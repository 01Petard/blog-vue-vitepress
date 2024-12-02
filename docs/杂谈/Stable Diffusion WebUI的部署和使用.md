---
title: Stable Diffusion WebUI的部署和使用
date: 2022-10-10 14:13:15
updated:
categories: 
- 软件
tags: 
- stable-diffusion-webui
- NovelAI
- 人工智能
- 深度学习
- 绘画
keywords:
- stable-diffusion-webui
- NovelAI
- 人工智能
- 深度学习
- 绘画
description: 关于使用AI作画的使用简介
cover: https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202410212212610.png
top_img: https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202410212212330.png
---

# 1、准备

前往github这个网址，下载stable-diffusion-webui，这是一个stable-diffusion的网页可视版，操作更方便

然后我们需要准备好novelai泄漏的文件，里面有我们需要的ckpt和vae.ckpt文件![image-20221010134944679](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/image-20221010134944679.png)

# 2、安装

根据github下面的说明文档进行安装，windows很方便，但是mac就很麻烦了（捂脸）

![image-20221010135319377](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/image-20221010135319377.png)

mac需要先用homebrew安装一个二进制解读文件，然后使用setup_mac.sh这个脚本拉取项目、模型和库文件，期间还需要去Hugging Face注册一个账号，生成一个token。总之就是步骤很繁琐，结果照着安装后还是出了一个bug，最后去issues里找答案，遇到了一位同样问题的老哥，大概是conda环境问题

![image-20221010135709629](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/image-20221010135709629.png)

参照这位老哥给出的回答，成功解决！

![image-20221010135748664](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/image-20221010135748664.png)

```shell
pip install --pre torch==1.13.0.dev20220922 torchvision -f https://download.pytorch.org/whl/nightly/cpu/torch_nightly.html --no-deps
```

但有些包还是需要自己下载，总是还是比较折腾的，我前前后后花了三个小时，下了好几回，差点奔溃了。。。

# 3、使用

## 3.1进入终端，切换环境

![image-20221010135937306](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/image-20221010135937306.png)

## 3.2 用脚本启动

![image-20221010140223979](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/image-20221010140223979.png)

在浏览器，我们进入页面就看到了

![image-20221010140329906](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/image-20221010140329906.png)

然后我们去setting里修改最下面的模型和网络，使用novelai泄漏的那几个模型之一。

## 3.3 txt2img

我们在Prompt和Negative prompt内输入关键词，一个是你希望的关键词，另一个是你不想看见的关键词

我根据b站上的专栏，整了一下

正面关键词:extremely detailed CG unity 8k wallpaper,black long hair,cute face,1 adlut girl,happy, skirt dress, flower pattern in dress,solo,green gown,art of light novel,in field

负面排除关键词:lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry

差不多这样吧，然后点generate

生成，因为没有CUDA，所以很慢很慢，steps越高越慢，一张图得四五分钟

![image-20221010141155712](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/image-20221010141155712.png)

出了点bug，不知道为啥黑了，之前都没遇到过。。。。但是效果很棒啊，比许多画师都nb！

![image-20221010143709230](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/image-20221010143709230.png)

## 3.4 img2img

img2img也是如此，需要输入关键词，但是还需要额外提供一张照片，我直接展示一下效果

![image-20221010143941374](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/image-20221010143941374.png)

![image-20221010144316871](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/image-20221010144316871.png)

# 4、总结

今年3月的时候AI作画还不是那么强，但是仅仅半年后，AI就已经和很多画师不相上下了，个人觉得目前AI作画还存在进步空间不是性能不强，而是书读得太少，如果有足够的数据给AI学习，那一定能取代很多画师，不过说到底也还是通过关键词检索同类型风格的画，如果真要会用、用好这技术，关键词一定是必不可少的，期待未来发展吧！