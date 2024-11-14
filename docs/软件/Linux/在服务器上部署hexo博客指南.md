---
title: 在服务器上部署hexo博客指南
date: 2024-10-30 18:02:00
updated:
categories: 
- 软件
tags: 
- Linux
- 博客
- 部署
keywords:
- Linux
- 博客
- 部署
description: 从0开始部署hexo博客的常用命令
cover: https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202410311337887.webp
top_img: https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202410311337777.png
---

nodejs更多命令请看：[nodejs相关命令](../nodejs相关命令.md)

## 安装nodejs环境

在Windows和Macos上安装nodejs较方便，但是在Linux上就非常不方便，特此记录

去官网下载链接：[http://nodejs.cn/download](http://nodejs.cn/download/)

选择Linux二进制文件（x64）

![image-20240401230017772](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202404012300868.png)

或用wget命令下载指定版本的包

```shell
wget https://nodejs.org/dist/v14.15.4/node-v14.15.4-linux-x64.tar.xz
```

```shell
wget https://nodejs.org/dist/v16.13.0/node-v16.13.0-linux-x64.tar.xz
```

解压缩

```shell
tar -xvf node-v14.15.4-linux-x64.tar.xz
mkdir -p /usr/local/nodejs
（之后所有nodejs安装的文件，例如“hexo”都会保存在/usr/local/nodejs目录下）
mv node-v14.15.4-linux-x64/* /usr/local/nodejs/
```

```shell
tar -xvf node-v16.13.0-linux-x64.tar.xz
mkdir -p /usr/local/nodejs
（之后所有nodejs安装的文件，例如“hexo”都会保存在/usr/local/nodejs目录下）
mv node-v16.13.0-linux-x64/* /usr/local/nodejs/
```

创建软链接

```shell
# 建立node软链接
ln -s /usr/local/nodejs/bin/node /usr/local/bin
# 建立npm 软链接
ln -s /usr/local/nodejs/bin/npm /usr/local/bin
```

更换镜像源

```shell
# 设置镜像源加速
npm config set registry https://registry.npmmirror.com
# 查看设置信息
npm config list
# 验证配置是否加载成功
npm config get registry
```

验证是否安装成功

```shell
node -v
npm -v
```

## 安装hexo博客环境

安装hexo

```shell
npm install hexo-cli -g
```

创建软链接

```shell
（如果之前已经链接过hexo了，则删除/usr/local/bin目录下的hexo软链接，重新添加hexo软链接）
ln -s /usr/local/nodejs/bin/hexo /usr/local/bin
（这里的“/usr/local/nodejs/bin/hexo”就是nodejs安装的hexo命令文件目录）
```

查看是否生效

```shell
hexo -v
```

## 安装pm2自动化任务脚本

安装pm2

```
npm install pm2 -g
```

（如果命令没有找到，则需要软链接一下pm2）

 ```shell
ln -s /usr/local/nodejs/bin/pm2 /usr/local/bin
 ```

在博客根目录下创建文件`hexo_run.cjs`

```javascript
const { exec } = require('child_process')
exec('hexo server',(error, stdout, stderr) => {
    if(error){
        console.log('exec error: ${error}')
        return
    }
    console.log('stdout: ${stdout}');
    console.log('stderr: ${stderr}');
})
```

在博客目录下运行脚本

```shell
pm2 start hexo_run.cjs
```

![image-20240401225914113](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202404012259254.png)

关闭脚本

```shell
pm2 stop hexo_run.cjs
```

![image-20240401225935604](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202404012259639.png)

## 安装zip压缩包处理命令

```shell
yum install zip unzip
```

## 安装git版本控制

```shell
yum install git
```

## 配置git

```shell
git config --global user.name "01Petard"
git config --global user.email "1520394133@qq.com"
git config --global init.defaultBranch main       # 设置默认分支名为main，而不是master

# 选择题用配置
git config --global gui.encoding utf-8            # gui界面的编码方式改为utf-8
git config --global i18n.commitencoding utf-8     # 将commit时信息转为urf-8，默认二进制
git config --global i18n.logoutputencoding utf-8  # 显示日志时的转为utf-8，默认二进制
git config --global core.quotepath false          # （推荐：false，不要转义）是否转义中文文件名或路径，默认转义
git config --global core.autocrlf true            # （推荐：true，开启）是否开启crlf自动换行（项目涉及windows时建议开启）
git config --global core.filemode true            # （推荐：true，忽略）是否忽略文件的权限改变
git config --global core.safecrlf true            # （推荐：true，检查）是否检查行结束符在提交或检出时被正确转换

git config --global pull.rebase true              # git pull时，不合并，而是将本地更改rebase在最新的远程提交之上，默认false为merge合并
```

```shell
ssh-keygen -t rsa -C "1520394133@qq.com"
```

```shell
cat ~/.ssh/id_rsa.pub
```

## 使用脚本安装1panel 和 docker

用`pi.sh`安装

项目地址：[Pseudnuos/OrangePiShell_hzx](https://gitee.com/HuaLuoTianJi/OrangePiShell_hzx)

作者地址：[wukongdaily/OrangePiShell: 在Linux上快速部署一些好用的docker项目。起初只是为了香橙派制作。推荐使用1panel面板轻松管理docker。](https://github.com/wukongdaily/OrangePiShell)

## 启动项目

```shell
npm install
```

```shell
hexo ...
```





