---
title: 使用node与nvm部署hexo博客
date: 2024-03-30 21:51:00
updated: 2024-11-03 21:50:00
categories: 
- 学习
tags: 
- node
- npm
- nvm
keywords:
- node
- npm
- nvm
description: 从0开始部署hexo博客的node、nvm常用命令
cover: https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202410212202027.png
top_img: https://www.myfreax.com/content/images/size/w816/2019/07/nvm.webp
---

# nodejs环境安装相关

## 安装curl

```shell
sudo yum install curl
```

## 安装nvm

`nvm`是一个非常好用的node版本管理工具，避免了我们需要重复安装卸载不同版本的`node.js`的问题，提高了我们的工作效率。安装nvm还是比较推荐使用下载安装包的方式，更为直接，能够直接看到步骤，也更容易定位问题。

```shell
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

```shell
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" 
```

```shell
source ~/.bashrc
```

## 安装nodejs

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
npm info express
```

验证是否安装成功

```shell
node -v
npm -v
```

## 安装hexo

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

## 安装pm2

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
exec('hexo server -p 80',(error, stdout, stderr) => {
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

## 安装zip

```shell
yum install zip unzip
```

## 安装Git、配置Git

```shell
yum install git
```

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

## 单独安装docker（如有必要）

1. 卸载系统之前的 docker

   ```
   sudo yum remove docker \
   docker-client \
   docker-client-latest \
   docker-common \
   docker-latest \
   docker-latest-logrotate \
   docker-logrotate \
   docker-engine
   ```

2. 安装 Docker-CE

   安装必须的依赖

   ```
   sudo yum install -y yum-utils \
   device-mapper-persistent-data \
   lvm2
   ```

   设置 docker repo 的 yum 位置

   ```
   sudo yum-config-manager \
   --add-repo \
   https://download.docker.com/linux/centos/docker-ce.repo
   ```

   安装 docker，以及 docker-cli

   ```
   sudo yum install docker-ce docker-ce-cli containerd.io
   ```

3. 启动Docker

   ```
   sudo systemctl start docker
   ```

4. 设置Docker开机自启

   ```
   sudo systemctl enable docker
   ```

5. 配置镜像加速（Ubuntu、CentOS）

   ```
   sudo mkdir -p /etc/docker
   sudo tee /etc/docker/daemon.json <<-'EOF'
   {
     "registry-mirrors": ["https://uf5mphyd.mirror.aliyuncs.com"]
   }
   EOF
   sudo systemctl daemon-reload
   sudo systemctl restart docker
   ```

## 启动项目

```shell
npm install
```

```shell
hexo ...
```

# node常用命令

## 查看安装过的依赖模块

全局

```shell
npm list -g --depth 0
```

当前项目

```shell
npm list --depth 0
```

## 查看node版本列表

```bash
nvm list              # 显示已安装的版本(同 nvm list installed)
nvm list installed    # 显示已安装的版本
nvm list available    # 显示所有可以下载的版本
```

## 安装node

```bash
nvm install 12.22.0    # 安装12.22.0版本node
nvm install latest     # 安装最新版本node
```

注：当运行`nvm install`命令时，若出现权限问题，可以使用管理员身份运行

## 使用指定版本的node

```bash
nvm use 12.122.0       # 使用12.22.0版本node
```

**注：当我们要使用npm时，需要先指定node版本，即先运行`nvm use`命令，再使用`npm`命令**

## 卸载指定版本的node

```bash
nvm uninstall 16.16.0  # 卸载16.16.0版本node
```

#MacOS相关的配置

##  node版本管理工具n

```shell
sudo npm install n -g
```

## 查看当前有哪些node版本

```shell
sudo n
```

## 安装一个node版本

```shell
sudo n 16.13.0
```

## 查看当前项目安装过的依赖模块

```shell
npm list --depth 0
```

