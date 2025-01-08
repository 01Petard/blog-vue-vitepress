# yt-dlp——强大的视频下载工具

> 项目Git地址：[yt-dlp/yt-dlp: A feature-rich command-line audio/video downloader](https://github.com/yt-dlp/yt-dlp)

提取这个地址的视频：`https://www.bilibili.com/BV1j6DYYpExQ`

`-o '~/%(title)s.%(ext)s'`表示将视频文件放到用户桌面，文件名是视频名称

```shell
yt-dlp --cookies cookies.txt -o '~/Desktop/%(title)s.%(ext)s' 'https://www.bilibili.com/BV1j6DYYpExQ'
```

# 使用git时，去除".idea"、“.vscode”文件夹中的文件

```shell
git rm --cached -r ..idea\
```

# EasyConnect

代理服务器：`https://sslvpn.zjut.edu.cn/`

用户名：`学号`

密码：`密码`

# 手动给视频超分辨率

1. 用`ffmpeg`截取帧

   ```shell
   ffmpeg -i .\tmp.mp4 -qscale:v 1 -qmin 1 -qmax 1 -vsync 0 .\tmp_in_1440\frame%08d.jpg
   ```

2. 用超分工具超分，我常用的是cugan和esrgan

   ```shell
   .\realesrgan-ncnn-vulkan.exe -i tmp_in_1080 -o tmp_out_1080 -n realesr-animevideov3 -s 2 -f jpg
   ```

3. 用`ffmpeg`合并帧

   ```shell
   ffmpeg -i .\tmp_out_1080\frame%08d.jpg -i .\1080.mp4 -map 0:v:0 -map 1:a:0 -c:a copy -c:v libx264 -r 24 -pix_fmt yuv420p output_w_audio.mp4
   ```

   
