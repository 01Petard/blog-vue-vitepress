## 简介

用过Conda便携Python程序时，可以通过`conda env` 来管理Python的版本和环境，类似的，Java也有相关的工具，就是今天的SDKMain

通过SDKMan，可以轻松安装相关的Java版本，并设置当前环境和系统环境的Java版本，省去环境变量的切换

## 安装与卸载

官方： https://sdkman.io/install

### 安装

在类Unix系统（MacOS, Linux, WSL）上安装

1. 下载

```shell
curl -s "https://get.sdkman.io" | bash
```

2. 安装

```shell
source "$HOME/.sdkman/bin/sdkman-init.sh"
```

3. 验证安装

```shell
sdk version
```

![在这里插入图片描述](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411172357255.png)

### 卸载

1. 移除文件

```shell
tar zcvf ~/sdkman-backup_$(date +%F-%kh%M).tar.gz -C ~/ .sdkman
rm -rf ~/.sdkman
```

2. 删除配置，编辑 `.zshrc`
   ![在这里插入图片描述](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411172357473.png)

删除以上内容

```shell
source .zshrc
```

## 使用

### 查看其他工具：支持 Ant, Maven 等

```shell
sdk list
```

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411172357950.png" alt="在这里插入图片描述" style="zoom:80%;" />

### 查看Java版本

```shell
sdk list java
```

![在这里插入图片描述](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411172358848.png)

### 安装Java，加上相关的版本

```shell
sdk install java <version>
```

![在这里插入图片描述](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411172358217.png)

![在这里插入图片描述](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411172358292.png)

有的JDK下载不下来，比如Tencent的

### 设置Java版本(全局)

```shell
sdk default java <version>
```

![在这里插入图片描述](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411172359423.png)

### 只在当前窗口生效

```shell
sdk use java <version>
```

![在这里插入图片描述](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411172359450.png)

查看当前的版本

```shell
sdk current java
```

或者

```shell
java -version
```

### 卸载

```shell
sdk uninstall java <version>
```

默认环境无法卸载

![在这里插入图片描述](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411172359776.png)

更换环境后卸载

![在这里插入图片描述](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411172359228.png)

## jdk安装的位置

```shell
cd ~/.sdkman
cd condidates/
```

这里是sdk的位置

```shell
cd java
ls
```

![在这里插入图片描述](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411172359435.png)

## 与IDEA集成

打开项目 `mudule settings`
<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411172359738.png" alt="在这里插入图片描述" style="zoom:80%;" />

点击左侧SDK选项，在右侧的文件夹中查看不同的版本

![在这里插入图片描述](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411172359964.png)

随后又安装的JDK

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202411172359925.png" alt="在这里插入图片描述" style="zoom:80%;" />