---
title: YOLOv5的使用
date: 2022-08-11 16:21:15
updated:
categories: 
- 学习
tags: 
- YOLOv5
keywords:
- YOLOv5
description: 初始YOLOv5
cover: https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202410212213438.png
top_img: https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202410212214643.png
---

# 参考网站

> [ultralytics/yolov5: YOLOv5 🚀 in PyTorch > ONNX > CoreML > TFLite (github.com)](https://github.com/ultralytics/yolov5)

# 代码推断

```python
import torch
# Model
model = torch.hub.load('ultralytics/yolov5', 'yolov5s')  # or yolov5n - yolov5x6, custom
# Images
img = 'https://ultralytics.com/images/zidane.jpg'  # or file, Path, PIL, OpenCV, numpy, list
# Inference
results = model(img)
# Results
results.print()  # or .show(), .save(), .crop(), .pandas(), etc.
```

# 命令使用

```shell
python detect.py --source 0  # webcam
                          img.jpg  # image
                          vid.mp4  # video
                          path/  # directory
                          'path/*.jpg'  # glob
                          'https://youtu.be/Zgi9g1ksQHc'  # YouTube
                          'rtsp://example.com/media.mp4'  # RTSP, RTMP, HTTP stream
```

# 性能排行

![155040763-93c22a27-347c-4e3c-847a-8094621d3f4e.png (2400×1200) (user-images.githubusercontent.com)](https://user-images.githubusercontent.com/26833433/155040763-93c22a27-347c-4e3c-847a-8094621d3f4e.png)

**640 Figure**

![155040757-ce0934a3-06a6-43dc-a979-2edbbd69ea0e.png (2400×1200) (user-images.githubusercontent.com)](https://user-images.githubusercontent.com/26833433/155040757-ce0934a3-06a6-43dc-a979-2edbbd69ea0e.png)

# Pretrained Checkpoints

| Model                                                                                                                                          | size (pixels) | mAPval 0.5:0.95 | mAPval 0.5    | Speed CPU b1 (ms) | Speed V100 b1 (ms) | Speed V100 b32 (ms) | params (M) | FLOPs @640 (B) |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | --------------- | ------------- | ----------------- | ------------------ | ------------------- | ---------- | -------------- |
| [YOLOv5n](https://github.com/ultralytics/yolov5/releases/download/v6.2/yolov5n.pt)                                                             | 640           | 28.0            | 45.7          | **45**            | **6.3**            | **0.6**             | **1.9**    | **4.5**        |
| [YOLOv5s](https://github.com/ultralytics/yolov5/releases/download/v6.2/yolov5s.pt)                                                             | 640           | 37.4            | 56.8          | 98                | 6.4                | 0.9                 | 7.2        | 16.5           |
| [YOLOv5m](https://github.com/ultralytics/yolov5/releases/download/v6.2/yolov5m.pt)                                                             | 640           | 45.4            | 64.1          | 224               | 8.2                | 1.7                 | 21.2       | 49.0           |
| [YOLOv5l](https://github.com/ultralytics/yolov5/releases/download/v6.2/yolov5l.pt)                                                             | 640           | 49.0            | 67.3          | 430               | 10.1               | 2.7                 | 46.5       | 109.1          |
| [YOLOv5x](https://github.com/ultralytics/yolov5/releases/download/v6.2/yolov5x.pt)                                                             | 640           | 50.7            | 68.9          | 766               | 12.1               | 4.8                 | 86.7       | 205.7          |
|                                                                                                                                                |               |                 |               |                   |                    |                     |            |                |
| [YOLOv5n6](https://github.com/ultralytics/yolov5/releases/download/v6.2/yolov5n6.pt)                                                           | 1280          | 36.0            | 54.4          | 153               | 8.1                | 2.1                 | 3.2        | 4.6            |
| [YOLOv5s6](https://github.com/ultralytics/yolov5/releases/download/v6.2/yolov5s6.pt)                                                           | 1280          | 44.8            | 63.7          | 385               | 8.2                | 3.6                 | 12.6       | 16.8           |
| [YOLOv5m6](https://github.com/ultralytics/yolov5/releases/download/v6.2/yolov5m6.pt)                                                           | 1280          | 51.3            | 69.3          | 887               | 11.1               | 6.8                 | 35.7       | 50.0           |
| [YOLOv5l6](https://github.com/ultralytics/yolov5/releases/download/v6.2/yolov5l6.pt)                                                           | 1280          | 53.7            | 71.3          | 1784              | 15.8               | 10.5                | 76.8       | 111.4          |
| [YOLOv5x6](https://github.com/ultralytics/yolov5/releases/download/v6.2/yolov5x6.pt) + [TTA](https://github.com/ultralytics/yolov5/issues/303) | 1280 1536     | 55.0 **55.8**   | 72.7 **72.7** | 3136 -            | 26.2 -             | 19.4 -              | 140.7 -    | 209.8 -        |

# 训练

```shell
python train.py --data coco.yaml --cfg yolov5n.yaml --weights '' --batch-size 128
                                       yolov5s                                64
                                       yolov5m                                40
                                       yolov5l                                24
                                       yolov5x                                16
```

![90222759-949d8800-ddc1-11ea-9fa1-1c97eed2b963.png (2400×1200) (user-images.githubusercontent.com)](https://user-images.githubusercontent.com/26833433/90222759-949d8800-ddc1-11ea-9fa1-1c97eed2b963.png)
