---
title: Linux常用命令
date: 2023-04-06 18:05:15
updated:
categories: 
- 学习
tags: 
- Linux
keywords:
- Linux
description: 实验室服务器常用的Linux常用命令
cover: https://bloximages.newyork1.vip.townnews.com/redandblack.com/content/tncms/assets/v3/editorial/4/59/45940eb2-5403-11e9-a843-db0e4491cc90/5ca13d8453042.image.jpg
top_img: https://blog.desdelinux.net/wp-content/uploads/2021/10/Linux-Desktop-1.jpg
top: 990
---

# Linux初级命令

~~太低级的我也不想说了~~

### 复制

```shell
cp file file_copy
cp -a folder/ folder_copy/
```

### 移动/重命名

```shell
mv file /usr/local/file_rename
mv file1 file2 /usr/local
mv folder/ /usr/local/lib/folder_rename/
```

### 删除

```shell
rm file
rmdir folder/
rm -rf folder/
```

### *链接

#### 软链接

- 软链接：在Mac中被称为“替身”，在Windows被称为“快捷方式”，名称只要和源文件的“名称+后缀“不同就行
- 硬链接：MacOS和Linux独有，属于源文件的分身，源文件删除不影响硬链接，硬链接修改源文件也会跟着改
- 创建文件软链接（软链接即为文件的替身，删除源文件即删除了文件，替身将失效。软链接的名称可以随便取）（MacOS下必须写绝对路径，且不能在同目录下生成软链接）

```shell
ln -s file file_lnk
ln -s folder/ folder_lnk/
```

#### 硬链接

- 硬链接即为指针，硬链接的后缀必须和源文件一致

- MacOS下可以使用相对路径，且可以在目录下生成硬链接

```shell
ln Hello.py Hello_lnk.py
```



# Linux高级命令

### 获取指定目录下所有文件夹名

```shell
ls -l 文件夹路径 |awk '/^d/ {print $NF}'
```

### 杀死指定端口

```shell
kill -9 `lsof -t -i:端口号`
```



# zip解压缩命令

### 压缩/解压

`zip -r 压缩包包名.zip ./*`：将当前目录下的文件压缩成压缩包，*表示全部压缩，-r表示递归压缩子目录下所有文件

- -o：不提示，覆盖同名文件夹

- -d： 指定某个解压目录

`unzip -o -d /home/hzx 待解压.zip`：把压缩包解压到指定目录

### 添加/删除包中的文件

`zip -m 压缩包.zip ./待添加文件`：添加文件到压缩包中

`zip -d 压缩包.zip 待删除文件`：删除压缩包中文件

# tar解压缩命令

## 参数

- -c : 建立压缩文件
- -x ：解压压缩文件
- -t ：查看压缩文件内容
- -v ： 压缩过程中显示文件
- -f ：使用压缩名，注意一般放在参数最后，紧跟压缩名
- -z ：用gzip压缩，以tar.gz结尾，压缩速度快
- -j ：用bzip2压缩，以tar.bz2结尾，压缩率高

### 压缩

`tar -cvf xxx.tar /data` : 仅打包
`tar -zcvf xxx.tar /data` : 打包，gzip压缩
`tar -jcvf xxx.tar /data` : 打包，bzip2压缩

### 解压

`tar -xvf xxx.tar` : 解压
`tar -zxvf xxx.tar` : 解压gzip压缩文件
`tar -jxvf xxx.tar` : 解压bzip2压缩文件
`tar -zxvf xxx.tar.gz etc/passwd` :解压到指定目录

# 读取文件夹大小

```shell
sudo du -h --max-depth=1 home/
```

读取home文件下的大小

![image-20230609140738378](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/image-20230609140738378.png)

# 查看硬盘占用情况

## 查看硬盘使用情况

```shell
df -h .
```

![image-20230626190856450](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/image-20230626190856450.png)

## 查看目录下一级文件夹的大小

```shell
sudo du -h --max-depth=0 *
```

深度就是--max-depth，0不展示子文件夹

![image-20230626191226972](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/image-20230626191226972.png)

然后查看某个文件夹下各文件的大小

```shell
du -h -max-depth=1 /home/hzx
```

> 更多关于磁盘信息的命令：[linux查询磁盘使用情况_linux查看磁盘使用情况_沐已成风的博客-CSDN博客](https://blog.csdn.net/weixin_42854904/article/details/124944311)



# 清理显卡显存占用

```shell
sudo fuser -v /dev/nvidia* |awk '{for(i=1;i<=NF;i++)print "kill -9 " $i;}' | sudo sh
```



