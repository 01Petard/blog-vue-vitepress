---
title: Unix系统下的Shell命令
date: 2022-01-26 22:01:15
updated:
categories: 
- 学习
tags: 
- Unix
- Shell
keywords:
- Unix
- Shell
description: Mac和Linux下都能使用的命令
cover: https://www.w3cschool.cn/attachments/image/20170622/1498119961561899.png
top_img: https://atts.w3cschool.cn/attachments/cover/cover_shellbook.png?t=1542281091?imageView2/1/w/48/h/48
---

/     根目录

～   home目录（当前用户的目录）

进入目录

```shell
cd /usr/local
```

返回目录

```shell
cd ../
```

新建文件

```shell
touch 123.txt
或
touch abc
```

新建文件夹（“/”可加可不加）

```shell
mkdir file/
```

编辑文件

```shell
vim 123.txt
i为从头编辑
o为从尾编辑（推荐）
编辑完后按esc，结束编辑
按:w保存，按:q退出，一般按:wq，加!为强制
```

复制文件

```shell
cp abc1.txt abc2.txt
```

复制文件夹

```shell
cp -a file1/ file2/
```

移动文件到文件夹

```shell
mv 123.txt /usr/local
或者顺便重命名
mv 123.txt /usr/local/321.txt
```

移动多个文件到文件夹

```shell
mv 123.txt 1234.txt /usr/local
```

移动文件夹到别的文件夹

```shell
mv 666/ /usr/local/lib/
```

重命名文件/文件夹

```shell
mv 123.txt 321.txt
mv 666/ 777/
```

 删除文件

```shell
rm 123.txt
```

删除空文件夹

```shell
rmdir 666/
```

删除文件夹

```shell
rm -rf 666/
```

软链接：在Mac中被称为“替身”，在Windows被称为“快捷方式”，名称只要和源文件的“名称+后缀“不同就行
硬链接：MacOS和Linux独有，属于源文件的分身，源文件删除不影响硬链接，硬链接修改源文件也会跟着改
创建文件软链接（软链接即为文件的替身，删除源文件即删除了文件，替身将失效。软链接的名称可以随便取）（MacOS下必须写绝对路径，且不能在同目录下生成软链接）

```shell
创建同名的软链接1234.txt
ln -s /usr/local/666/123.txt /usr/local/
创建自定义名称的软链接123_lnk.abctxt(软链接只是源文件的替身，起什么名字都可以)
ln -s /usr/local/666/123.txt /usr/local/123_lnk.abctxt
```

创建文件夹软链接

```shell
ln -s 666/ 666_lnk/
```

创建文件硬链接（硬链接即为文件的指针，删除所有硬链接包括源文件才能彻底删除文件。硬链接的后缀如果与源文件不一致，则有可能无法正常打开查看）（MacOS下可以使用相对路径，且可以在目录下生成硬链接）

```shell
ln 123.txt 234.txt
```

获取指定目录下所有文件夹名

```shell
ls -l 文件夹路径 |awk '/^d/ {print $NF}'
```

更多linux指令⬇️

> https://www.cnblogs.com/effortfu/p/12270990.html

