---
title: 基于YOLOv8模型的抽烟行为检测系统
date: 2023-12-14 09:35:00
updated:
categories: 
- 学习
tags: 
- Python
- Pyside6
- YOLOv8
keywords:
- Python
- Pyside6
- YOLOv8
description: 基于Yolo特殊动作检测系统
cover: https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202410212307670.png
top_img: https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202410212307210.png
---

## 基于YOLOv8模型的抽烟行为检测系统（PyTorch+Pyside6+YOLOv8模型）

原创 BestSongC [BestSongC](javascript:void(0);) *2023-10-16 21:56* *发表于江苏*

> 摘要：基于YOLOv8模型的抽烟行为检测系统可用于日常生活中检测与定位抽烟行为，利用深度学习算法可实现图片、视频、摄像头等方式的目标检测，另外本系统还支持图片、视频等格式的结果可视化与结果导出。本系统采用YOLOv8目标检测算法训练数据集，使用Pysdie6库来搭建前端页面展示系统。另外本系统支持的功能还包括训练模型的导入、初始化；检测置信分与检测后处理IOU阈值的调节；图像的上传、检测、可视化结果展示与检测结果导出；视频的上传、检测、可视化结果展示与检测结果导出；摄像头的图像输入、检测与可视化结果展示；已检测目标个数与列表、位置信息；前向推理用时等功能。本博文提供了完整的Python代码与安装和使用教程，适合新入门的朋友参考，部分重要代码部分都有注释，完整代码资源文件请转至文末的下载链接。 

![图片](https://mmbiz.qpic.cn/mmbiz_png/TtoFbnkI4OYibWoXak8vq3JROmFfrcw4GndLHxhcj7k1usiaIPo8jAmQYBpUzWsd8P4vumf4NsCt5B5sibOmb4TaQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

**基本介绍**

近年来，机器学习和深度学习取得了较大的发展，深度学习方法在检测精度和速度方面与传统方法相比表现出更良好的性能。YOLOv8 是 Ultralytics 公司继 YOLOv5 算法之后开发的下一代算法模型，目前支持图像分类、物体检测和实例分割任务。YOLOv8 是一个 SOTA模型，它建立在之前YOLO 系列模型的成功基础上，并引入了新的功能和改进，以进一步提升性能和灵活性。具体创新包括：一个新的骨干网络、一个新的 Ancher-Free 检测头和一个新的损失函数，可以在从 CPU 到 GPU 的各种硬件平台上运行。因此本博文利用YOLOv8目标检测算法实现一种抽烟行为检测模型，再使用Pyside6库搭建出界面系统，完成目标检测页面的开发。本博主之前发布过关于YOLOv5算法的相关模型与界面，需要的朋友可从我之前发布的博客查看。另外本博主计划将YOLOv5、YOLOv6、YOLOv7和YOLOv8一起联合发布，需要的朋友可以持续关注，欢迎朋友们关注收藏。

**环境搭建**

（1）打开项目目录，在搜索框内输入cmd打开终端

![图片](https://mmbiz.qpic.cn/mmbiz_png/TtoFbnkI4OYibWoXak8vq3JROmFfrcw4G6nQeauHF7scrAuufd0iarDEkOGy0r5CaeBsrX1rEE9TvYJuMkSdbPWQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

（2）新建一个虚拟环境（conda create -n yolo8 python=3.8）

![图片](https://mmbiz.qpic.cn/mmbiz_png/TtoFbnkI4OYibWoXak8vq3JROmFfrcw4GUSicb3k45piaibWRdiaQbxV9Ju1ED1w38SPxjNA3MuS1jECL7wagU1Nuag/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

（3）激活环境，安装ultralytics库（yolov8官方库），pip install ultralytics -i https://pypi.tuna.tsinghua.edu.cn/simple

![图片](https://mmbiz.qpic.cn/mmbiz_png/TtoFbnkI4OYibWoXak8vq3JROmFfrcw4GpPkLJ7N6icv9ZDDGjeASOXnUoUDdLbe4MXkHfSOgYSFGzEtA9btdvOw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

（4）注意到这种安装方式只会安装cpu版torch，如需安装gpu版torch，需在安装包之前先安装torch：pip install torch==2.0.1+cu118 torchvision==0.15.2+cu118 -f https://download.pytorch.org/whl/torch_stable.html；再，pip install ultralytics -i https://pypi.tuna.tsinghua.edu.cn/simple

![图片](https://mmbiz.qpic.cn/mmbiz_png/TtoFbnkI4OYibWoXak8vq3JROmFfrcw4G33liaN8ZqtViaoEe5C1bTzgXVp5YHiagzyxkdlCfxete2xraJBTtsnADw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

（5）安装图形化界面库pyside6：pip install pyside6 -i https://pypi.tuna.tsinghua.edu.cn/simple

**界面及功能展示**

下面给出本博文设计的软件界面，整体界面简洁大方，大体功能包括训练模型的导入、初始化；置信分与IOU阈值的调节、图像上传、检测、可视化结果展示、结果导出与结束检测；视频的上传、检测、可视化结果展示、结果导出与结束检测；已检测目标列表、位置信息；前向推理用时。初始界面如下图：

![图片](https://mmbiz.qpic.cn/mmbiz_png/TtoFbnkI4OYibWoXak8vq3JROmFfrcw4G0ax30ItlWRm1XwvXeab0TzW4g5vSpzXUKyKB2klecO36xyy8Ae9KdA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

**模型选择与初始化**

用户可以点击模型权重选择按钮上传训练好的模型权重，训练权重格式可为.pt、.onnx以及engine等，之后再点击模型权重初始化按钮可实现已选择模型初始化的配置。

![图片](https://mmbiz.qpic.cn/mmbiz_png/TtoFbnkI4OYibWoXak8vq3JROmFfrcw4Gs7ETUqS3zsccBNs8riad9rvs02oChTfpw3hHT6LOLg34rKbiafYlTcgQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

**置信分与IOU的改变**

在Confidence或IOU下方的输入框中改变值即可同步改变滑动条的进度，同时改变滑动条的进度值也可同步改变输入框的值；Confidence或IOU值的改变将同步到模型里的配置，将改变检测置信度阈值与IOU阈值。

**图像选择、检测与导出**

用户可以点击选择图像按钮上传单张图像进行检测与识别，上传成功后系统界面会同步显示输入图像。

![图片](https://mmbiz.qpic.cn/mmbiz_png/TtoFbnkI4OYibWoXak8vq3JROmFfrcw4G2trlibRSHodFPibPCl5oibmLFjcWZWe6qvslYry9ia8lQibzmMINMFWC65A/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

再点击图像检测按钮可完成输入图像的目标检测功能，之后系统会在用时一栏输出检测用时，在目标数量一栏输出已检测到的目标数量，在下拉框可选择已检测目标，对应于目标位置（即xmin、ymin、xmax以及ymax）标签值的改变。

![图片](https://mmbiz.qpic.cn/mmbiz_png/TtoFbnkI4OYibWoXak8vq3JROmFfrcw4GMlJ6VBw9IaiajC3SQvyNOUgE73JyRMU3JdYf0brbdGYZMhId2lJp0pQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

再点击检测结果展示按钮可在系统左下方显示输入图像检测的结果，系统将显示识别出图片中的目标的类别、位置和置信度信息。

![图片](https://mmbiz.qpic.cn/mmbiz_png/TtoFbnkI4OYibWoXak8vq3JROmFfrcw4GndLHxhcj7k1usiaIPo8jAmQYBpUzWsd8P4vumf4NsCt5B5sibOmb4TaQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

点击图像检测结果导出按钮即可导出检测后的图像，在保存栏里输入保存的图片名称及后缀即可实现检测结果图像的保存。

![图片](https://mmbiz.qpic.cn/mmbiz_png/TtoFbnkI4OYibWoXak8vq3JROmFfrcw4GJUd3k1PJqQc3aq1wePlc5HS1MAONuBnSK6nxXIBJqd2RNA2Sp2sAew/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

点击结束图像检测按钮即可完成系统界面的刷新，将所有输出信息清空，之后再点击选择图像或选择视频按钮来上传图像或视频，或者点击打开摄像头按钮来开启摄像头。

**视频选择、检测与导出**

用户点击选择视频按钮上传视频进行检测与识别，之后系统会将视频的第一帧输入到系统界面中显示。

![图片](https://mmbiz.qpic.cn/mmbiz_png/TtoFbnkI4OYibWoXak8vq3JROmFfrcw4G3S7FZJKm2SJmDx0AlSpAhnKlkFtj6K4l0KPSScbDhbv9MChyoyh3icg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

再点击视频检测按钮可完成输入视频的目标检测功能，之后系统会在用时一栏输出检测用时，在目标数量一栏输出已检测到的目标数量，在下拉框可选择已检测目标，对应于目标位置（即xmin、ymin、xmax以及ymax）标签值的改变。

![图片](https://mmbiz.qpic.cn/mmbiz_png/TtoFbnkI4OYibWoXak8vq3JROmFfrcw4GDOeynVmXCKBTnNY9ibJXR835dq9DtPLIiaCqRkuQ8MiaaKOw4qEN2ibrIQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

点击暂停视频检测按钮即可实现输入视频的暂停，此时按钮变为继续视频检测，输入视频帧与帧检测结果会保留在系统界面，可点击下拉目标框选择已检测目标的坐标位置信息，再点击继续视频检测按钮即可实现输入视频的检测。

点击视频检测结果导出按钮即可导出检测后的视频，在保存栏里输入保存的图片名称及后缀即可实现检测结果视频的保存。

![图片](https://mmbiz.qpic.cn/mmbiz_png/TtoFbnkI4OYibWoXak8vq3JROmFfrcw4GE4BdMldOhdrXD0iaz58SU54e2aEEqXIxPJbYZ8WyOOgDsfzxF1EX2zQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

点击结束视频检测按钮即可完成系统界面的刷新，将所有输出信息清空，之后再点击选择图像或选择视频按钮来上传图像或视频，或者点击打开摄像头按钮来开启摄像头。

**摄像头打开、检测与结束**

用户可以点击打开摄像头按钮来打开摄像头设备进行检测与识别，之后系统会将摄像头图像输入到系统界面中显示。

![图片](https://mmbiz.qpic.cn/mmbiz_png/TtoFbnkI4OYibWoXak8vq3JROmFfrcw4GzdFmnP5am1Dlf1aF3Xum7De0Y5Wiag8WgD04D3VxNfDdEY3aQM38SVA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

再点击摄像头检测按钮可完成输入摄像头的目标检测功能，之后系统会在用时一栏输出检测用时，在目标数量一栏输出已检测到的目标数量，在下拉框可选择已检测目标，对应于目标位置（即xmin、ymin、xmax以及ymax）标签值的改变。

![图片](https://mmbiz.qpic.cn/mmbiz_png/TtoFbnkI4OYibWoXak8vq3JROmFfrcw4G3hEur2icSkiaWCAktzZgJBicA9Mrxll2FJFGFopGOa4EQ0OznMsDHicq6g/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

点击结束视频检测按钮即可完成系统界面的刷新，将所有输出信息清空，之后再点击选择图像或选择视频按钮来上传图像或视频，或者点击打开摄像头按钮来开启摄像头

**算法原理介绍**

本系统采用了基于深度学习的单阶段目标检测算法YOLOv8，相较于之前的YOLO系列目标检测算法，YOLOv8目标检测算法具有如下的几点优势：（1）更友好的安装/运行方式；（2）速度更快、准确率更高；（3）新的backbone，将YOLOv5中的C3更换为C2F；（4）YOLO系列第一次尝试使用anchor-free；（5）新的损失函数。YOLOv8模型的整体结构如下图所示，原图见mmyolo的官方仓库。

![图片](https://mmbiz.qpic.cn/mmbiz_png/TtoFbnkI4OYibWoXak8vq3JROmFfrcw4GtcO6BjjWoUCcxskZzJthJuuOEND2qYZ6HoMX69yD78B7iaFCdJcHPZg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

YOLOv8与YOLOv5模型最明显的差异是使用C2F模块替换了原来的C3模块，两个模块的结构如下图所示，原图见mmyolo的官方仓库。

![图片](https://mmbiz.qpic.cn/mmbiz_png/TtoFbnkI4OYibWoXak8vq3JROmFfrcw4GvkGlIw7jSObickpsiaUD9SJaQUZ4QCXXJzQqfsBNFOzE2qtAiaacAYmYA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

另外Head 部分变化最大，从原先的耦合头变成了解耦头，并且从 YOLOv5 的 Anchor-Based 变成了 Anchor-Free。其结构对比如下图所示。

![图片](https://mmbiz.qpic.cn/mmbiz_png/TtoFbnkI4OYibWoXak8vq3JROmFfrcw4GxXSibJJP1QjbPnXp3bCEshNMgicmbicOXuL5wQpcmtBorSwCqk481RVXw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

**数据集介绍**

本系统使用的抽烟行为数据集手动标注了抽烟行为这一个类别，数据集总计3232张图片。该数据集中类别都有大量的旋转和不同的光照条件，有助于训练出更加鲁棒的检测模型。本文实验的抽烟行为检测识别数据集包含训练集2640张图片，验证集592张图片，选取部分数据部分样本数据集如下图所示。此外，为了增强模型的泛化能力和鲁棒性，我们还使用了数据增强技术，包括随机旋转、缩放、裁剪和颜色变换等，以扩充数据集并减少过拟合风险。

![图片](https://mmbiz.qpic.cn/mmbiz_png/TtoFbnkI4OYibWoXak8vq3JROmFfrcw4G2ERr6C9mdU7mTibeWyfiaGMl4nRIzibgufjq5ZyzpZ1ITZ5mgXP4y5ibIQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

**关键代码解析**

在训练阶段，我们使用了预训练模型作为初始模型进行训练，然后通过多次迭代优化网络参数，以达到更好的检测性能。在训练过程中，我们采用了学习率衰减和数据增强等技术，以增强模型的泛化能力和鲁棒性。一个简单的单卡模型训练命令如下。

![图片](https://mmbiz.qpic.cn/mmbiz_png/TtoFbnkI4OYibWoXak8vq3JROmFfrcw4Gx9LfYRf30cN6NDZHKYZOfBLqA6YqicqtPxLZjaDxdoibdhlKu96yhrYg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

在训练时也可指定更多的参数，大部分重要的参数如下所示：

![图片](https://mmbiz.qpic.cn/mmbiz_png/TtoFbnkI4OYibWoXak8vq3JROmFfrcw4GzNuLKcYgfD0vBd7FOg2jXCnVbqDJ8BU39j2GdicbkxkJqhrtyHfo8KQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

在测试阶段，我们使用了训练好的模型来对新的图片和视频进行检测。通过设置阈值，将置信度低于阈值的检测框过滤掉，最终得到检测结果。同时，我们还可以将检测结果保存为图片或视频格式，以便进行后续分析和应用。本系统基于YOLOv8算法，使用PyTorch实现。代码中用到的主要库包括PyTorch、NumPy、OpenCV、Pyside6等。

![图片](https://mmbiz.qpic.cn/mmbiz_png/TtoFbnkI4OYibWoXak8vq3JROmFfrcw4GZBr1gC5vV1mWc0Mp9ibK7XLWLKCAXcdx6kyLtpBbZ4uQKB7icaBjtA2Q/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

**Pyside6界面设计**

PySide是一个Python的图形化界面（GUI）库，由C++版的Qt开发而来，在用法上基本与C++版没有特别大的差异。相对于其他Python GUI库来说，PySide开发较快，功能更完善，而且文档支持更好。在本博文中，我们使用Pyside6库创建一个图形化界面，为用户提供简单易用的交互界面，实现用户选择图片、视频进行目标检测。

我们使用Qt Designer设计图形界面，然后使用Pyside6将设计好的UI文件转换为Python代码。图形界面中包含多个UI控件，例如：标签、按钮、文本框、多选框等。通过Pyside6中的信号槽机制，可以使得UI控件与程序逻辑代码相互连接。

**实验结果与分析**

在实验结果与分析部分，我们使用精度和召回率等指标来评估模型的性能，还通过损失曲线和PR曲线来分析训练过程。在训练阶段，我们使用了前面介绍的数据集进行训练，使用了YOLOv8算法对数据集训练，总计训练了100个epochs。在训练过程中，我们使用tensorboard记录了模型在训练集和验证集上的损失曲线。从下图可以看出，随着训练次数的增加，模型的训练损失和验证损失都逐渐降低，说明模型不断地学习到更加精准的特征。在训练结束后，我们使用模型在数据集的验证集上进行了评估，得到了以下结果。

![图片](https://mmbiz.qpic.cn/mmbiz_png/TtoFbnkI4OYibWoXak8vq3JROmFfrcw4GwicuQ8gGRp5bDXbn2dy8vcBLBpjIMRY2GiamHcBNacKNYkgdiaoOhibQgA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

下图展示了我们训练的YOLOv8模型在验证集上的PR曲线，从图中可以看出，模型取得了较高的召回率和精确率，整体表现良好。

![图片](https://mmbiz.qpic.cn/mmbiz_png/TtoFbnkI4OYibWoXak8vq3JROmFfrcw4GcVfoIoT6NjMyAbo6HAxKIql8Zia6EYnurhtnfRc6NZmpu52UjCkKe8g/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

下图展示了本博文在使用YOLOv8模型对数据集进行训练时候的Mosaic数据增强图像。

![图片](https://mmbiz.qpic.cn/mmbiz_png/TtoFbnkI4OYibWoXak8vq3JROmFfrcw4G8PataEeicgfmic5aSWicib7tibaqVqSu7MN5F5tDh03I1bAo4l3Vh7Aafyg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

综上，本博文训练得到的YOLOv8模型在数据集上表现良好，具有较高的检测精度和鲁棒性，可以在实际场景中应用。另外本博主对整个系统进行了详细测试，最终开发出一版流畅的高精度目标检测系统界面，就是本博文演示部分的展示，完整的UI界面、测试图片视频、代码文件等均已打包上传，感兴趣的朋友可以关注我私信获取。另外本博文的PDF与更多的目标检测识别系统请关注笔者的微信公众号 BestSongC。

**完整代码和数据集从以下链接获取： https://mbd.pub/o/bread/ZZWWmZxs**

**里面包含所有源码文件、UI界面、数据集以及训练好的模型，另外支持远程环境部署**

其他基于深度学习的目标检测系统如西红柿、猫狗、山羊、野生目标、烟头、二维码、头盔、交警、野生动物、野外烟雾、人体摔倒识别、红外行人、家禽猪、苹果、推土机、蜜蜂、打电话、鸽子、足球、奶牛、人脸口罩、安全背心、烟雾检测系统等有需要的朋友关注我，从博主其他视频中获取下载链接。

完整项目目录如下所示

![图片](https://mmbiz.qpic.cn/mmbiz_png/TtoFbnkI4OYibWoXak8vq3JROmFfrcw4GkibZvWia8yjfxnFataet1c1j186tXJzE8zwF8WklqzRwQOjrngryZhqA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)