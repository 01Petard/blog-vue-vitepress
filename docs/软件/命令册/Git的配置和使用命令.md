---
title: Git的配置和使用命令
date: 2022-04-26 16:22:15
updated: 2025-02-12 15:40:00
categories: 
- 学习
tags: 
- Git
keywords:
- Git
description: Git的配置、使用，足够个人使用
cover: https://www.mrfangge.com/img/blog/git.jpg
top_img: https://www.mrfangge.com/img/blog/git.jpg
top: 999
---

> 前言：版本管理一直是很多人忽视的，自从我学习以来，我一直就认为版本管理是软件开发过程中的一个重要环节，它能够帮助开发人员对特定功能的集合或特定代码构建结果进行管理。通过有效的版本管理，可以确保编码阶段的顺利推进、保证产品功能和质量尽可能地符合预期，并帮助团队积极地应对需求变更，并及时应对版本问题，从而制定有针对性的版本优化。然而很多人往往视版本管理如草芥，认为代码只要能按预期进行改善就不需要这么"繁琐"的东西，这是事实上是一种“无售后保证”的思维——尽管产品已经结束开发阶段，进入维护阶段乃至消亡阶段，但是我们仍能通过版本管理工具获得完整的版本变更记录，从而得到有迹可循的开发历史，这不失为一种脚踏实地做开发的行为体现，而且也能杜绝一些开发团队中存在的”小毛病“，从心理上规范开发流程。因此，我们要正确对待版本管理，并好好利用现有的强大工具——Git，来学习这门技术！这也是我一直长期更新学习中遇到的Git问题并记录下来的原因。
>
> ——01Petard/伪音花火/Pseudnuos

# 零、Git相关八股

## Git 的原理和工作流程

Git 是一种分布式版本控制工具，用于跟踪项目文件的变更和管理项目的不同版本。它的工作流程主要围绕以下几步展开：

1. **初始化仓库**：使用 `git init` 命令在一个目录中创建一个新的 Git 仓库。
2. **添加文件到暂存区**：使用 `git add <文件名>` 或 `git add .` 命令将文件的修改添加到暂存区（staging area）。
3. **提交改动**：使用 `git commit -m "提交信息"` 命令将暂存区的改动提交到本地仓库（repository）。
4. **查看状态**：使用 `git status` 命令查看工作目录和暂存区的状态。
5. **查看历史记录**：使用 `git log` 命令查看提交历史。
6. **分支管理**：创建和切换分支使用 `git branch` 和 `git checkout` 命令，合并分支使用 `git merge` 命令。
7. **远程仓库操作**：通过 `git remote`、`git fetch`、`git pull` 和 `git push` 命令进行远程仓库的操作。

## Git 的三个基本工作区分别是什么？各有什么作用？

Git 的三个基本工作区分别是：工作目录（Working Directory）、暫存区（Stage/Index）和本地仓库（Repository）。

1）**工作目录（Working Directory）**：这是你当前在电脑上看到的文件系统，用于实际开发和修改文件。简单来说，就是你在项目中直接拓展、删除、编辑文件的地方。

2）**暂存区（Stage/Index）**：这是一个中间区域，当我们执行 `git add` 命令时，修改的文件会被添加到暂存区。这里记录了即将提交到本地仓库中的文件快照。

3）**本地仓库（Repository）**：这是你在本地计算机上存储的所有提交记录。通过执行 `git commit` 命令，可以将暂存区中的文件提交到本地仓库。它包含了项目的完整历史记录。

## Git 的版本控制模型

Git 的版本控制模型是分布式版本控制，这意味着每一个开发者的工作目录都是一个完整的、独立的代码库。Git 跟踪文件的变化，并通过提交来保存这些变化。主要的特点包括：

1. **分布式存储**：每个开发者拥有整个项目的完整历史记录。 
2. **提交快照**：每次提交保存一次项目的快照，而不是对比增量。 
3. **分支管理**：分支操作在 Git 中快速且简单，允许并行开发。

## 什么是 Git 的钩子 Hooks？包括哪些内容？ 

Git 的钩子（Hooks）是一些可以在 Git 仓库中特定事件触发时自动调用的脚本。通过这些钩子，可以对 Git 的行为进行定制，不仅可以验证提交信息，还可以实现代码质量检查等操作。

Git 支持两类钩子：**客户端钩子**和**服务器端钩子**。

**客户端钩子**：这些钩子在开发者的本地仓库中触发，通常用于提交操作和合并操作。

常见的客户端钩子包括：

- `pre-commit`：在提交之前触发。常用于代码风格检查、代码静态分析等。
- `prepare-commit-msg`：在创建提交信息之前触发。适用于自动生成提交说明。
- `commit-msg`：在提交信息输入之后触发。用于验证提交信息是否符合规范。
- `post-commit`：在提交完成之后触发。可以使用它来发送通知或者执行其他操作。

**服务器端钩子**：这些钩子在 Git 服务器上触发，通常在推送（push）操作时触发。

常见的服务器端钩子包括：

- `pre-receive`：在接收到推送数据但未更新仓库之前触发。适用于代码审核、CI/CD 流程等。
- `update`：在每个分支引用被更新之前触发。适用于针对特定分支的验证。
- `post-receive`：在仓库更新之后触发。常用于部署操作。

## git rebase 和 git merge 命令有什么区别？ 

`git rebase` 和 `git merge` 是 Git 用来整合来自不同分支的更改的两个命令，但它们的工作方式和最终结果是不同的。简单来说：

1. `git rebase` 会将**当前分支的所有提交**移到**指定基准分支的最顶端**，重写提交历史。 （把你老窝给一锅端咯！）
2. `git merge` 会创建一个新的合并提交来将两个分支的历史合并在一起，保留各自的提交历史。

## 什么是 Git 的 blame 命令？有什么作用？

用于逐行追踪文件的修改历史，显示每一行代码的最后一次修改是谁做的、在哪个提交（commit）中做的、以及修改的时间。这对于查找代码变更的责任者或者理解代码的历史变动是非常有用的。

直接执行 `git blame -L 10,20 <文件>`，你就可以看到10~20行代码的提交记录，包括提交哈希、作者、日期和变更的代码行。

# 一、安装和配置

## 1. 官网下载安装

> https://git-scm.com/downloads

## 2. 配置git信息

```shell
git config --global user.name "01Petard"
git config --global user.email "1520394133@qq.com"
git config --global init.defaultBranch main       # 设置默认分支名为main，而不是master

# 选择题用配置
git config --global gui.encoding utf-8            # gui界面的编码方式改为utf-8
git config --global i18n.commitencoding utf-8     # 将commit时信息转为urf-8，默认二进制
git config --global i18n.logoutputencoding utf-8  # 显示日志时的转为utf-8，默认二进制
git config --global core.quotepath false          # （推荐:false，不要转义）是否转义中文文件名或路径，默认转义
git config --global core.autocrlf input           # （推荐:input，开启）是否开启crlf自动换行（项目涉及windows时建议开启）
git config --global core.eol lf                   # （推荐:lf，开启）配合autocrlf一起食用
git config --global core.filemode true            # （推荐:true，忽略）是否忽略文件的权限改变
git config --global core.safecrlf true            # （推荐:true，检查）是否检查行结束符在提交或检出时被正确转换

git config --global pull.rebase true              # git pull时，不合并，而是将本地更改rebase在最新的远程提交之上，默认false为merge合并
```

查看配置信息

```shell
cat ~/.gitconfig
```

```shell
git config --list
```

## 3. 配置ssh key

**RSA 类型密钥**

```shell
ssh-keygen -t rsa -b 4096 -C "1520394133@qq.com"
```

**Ed25519 类型的密钥**

```shell
ssh-keygen -t ed25519 -b 4096 -C "1520394133@qq.com"
```

之后需要创建一个访问这个密钥的密码，如果不想每次提交都输密码就按回车，这个密钥之后要放在代码仓库里

![image-20220820145759035](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/image-20220820145759035.png)

可以使用命令来查看一下

```shell
cat ~/.ssh/id_rsa.pub
```

**重要的来了**：本地创建多个ssh key，如果想既连github的项目，也想连公司的gitlab的项目，可以照着下面这样做

> 建议参考：[一机双身份：Mac 同时配置 GitHub 和 GitLab 的 SSH 密钥与 Git 身份隔离指南](./MacOS/一机双身份：Mac 同时配置 GitHub 和 GitLab 的 SSH 密钥与 Git 身份隔离指南.md)

```shell
ssh-keygen -t ed25519 -b 4096 -C "1520394133@qq.com" -f ~/.ssh/id_rsa_github
```

```shell
ssh-keygen -t ed25519 -b 4096 -C "employee@company.com" -f ~/.ssh/id_rsa_gitlab
```

```shell
touch ~/.ssh/config
```

```
# GitHub Configuration
Host github
  HostName github.com
  User git
  IdentityFile ~/.ssh/github_rsa

# GitLab Configuration
Host gitlab
  HostName 10.0.0.177
  User git
  IdentityFile ~/.ssh/id_rsa
```

## 4. 将ssh key添加到仓库中

[点击Settings] -> [点击New SSH key] -> [添加key]

验证链接

```shell
ssh -T git@github.com
```

```shell
ssh -T git@gitee.com
```

输入创建ssh key时的密码，如果打印以下信息则表示成功！

![image-20220820150350017](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/image-20220820150350017.png)

# 二、本地仓库操作

## 简单汇总

![IMG_9699](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/IMG_9699.jpg)

## 1. 创建仓库

### 1.1 创建一个Github仓库

![image-20220820151031468](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/image-20220820151031468.png)
![image-20220820151126921](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/image-20220820151126921.png)

### 1.2 创建一个本地仓库

```
git init
```

回到本地，新建一个测试文件夹，里面放点文件，写点东西

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/image-20220820141754957.png" alt="image-20220820141754957" style="zoom:67%;" />

### 1.3 创建一个忽略的文件列表

```shell
touch .gitignore
```

常见忽略文件，可以按需添加

```yaml
.DS_Store
node_modules/
/dist

# local env files
.env.local
.env.*.local

# Log files
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Editor directories and files
.idea
.vscode
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
.rar
```

使用touch和vim创建好.gitignore文件

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/image-20220820141851327.png" alt="image-20220820141851327" style="zoom: 67%;" />

## 2. 文件提交 

### 2.1 显示当前目录下的提交文件状态

```shell
git status
```

这是还没提交时的状态

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/image-20220820141648087.png" alt="image-20220820141648087" style="zoom:50%;" />

这是已经提交的状态

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/image-20220820142117819.png" alt="image-20220820142117819" style="zoom:50%;" />

### 2.2 添加工作区的文件到暂存区

```shell
git add [文件]
```

### 2.3 删除暂存区的文件

```shell
git rm --cached [文件]
```

### 2.4 创建提交

```shell
git commit -m "[提交信息]"
```

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/image-20220820142004725.png" alt="image-20220820142004725" style="zoom:50%;" />

### 2.5 删除提交

```shell
# 暂存区有文件时无法运行
git rebase -i HEAD~x
```

`x`：显示交互的HEAD引用记录条数

`git rebase -i` 命令参数解释：

- `pick`: 提交这个版本。
- `drop`: 删除这个版本。

除此之外还有参数，比如`reword`、`edit`、`squash、`、`fixup`、`exec`，但是都不常用，不做解释。

### 2.6 显示未推送的提交

```shell
git log origin/main..main
```

> 比较远程的origin/main和本地的main分支，下同

![image-20230905192357726](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/image-20230905192357726.png)

```shell
git log --graph origin/main..main
```

### 2.7 显示分支的提交历史

```shell
git log
```

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/image-20220820143035714.png" alt="image-20220820143035714" style="zoom:50%;" />

### 2.8 显示仓库的引用历史

```shell
git reflog
```

`git reflog` 命令用于显示当前仓库的引用日志。引用日志记录了所有对 HEAD 指针的更新操作，包括提交、分支切换、重置等。每次更新操作都会在引用日志中生成一条新记录。

使用 `git reflog` 命令可以帮助你查看当前仓库的历史操作记录，以便在出现问题时进行故障排除和恢复。例如，如果你不小心删除了一个分支，你可以使用 `git reflog` 命令查找该分支最后一次提交的 SHA 值，然后使用该 SHA 值重新创建分支。

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/image-20230529153942765.png" alt="image-20230529153942765" style="zoom: 67%;" />

![image-20230905195922002](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/image-20230905195922002.png)

## 3. 分支操作

### 3.1 查看分支

```shell
git branch
```

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/image-20220820142317696.png" alt="image-20220820142317696"  />

当前只有一个master分支，如果之前配置好了默认分支名为main，这里因该是main

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/image-20220820142236554.png" alt="image-20220820142236554"  />

**查看当前分支的详细信息**

```shell
git branch -v
```

### 3.2 重命名分支

```shell
git branch -m [分支原名] [分支新名]
```

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/image-20220820142335452.png" alt="image-20220820142335452"  />

我们回去再看，main分支名字已经改好了

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/image-20220820142401035.png" alt="image-20220820142401035"  />

### 3.3 创建分支、切换分支

创建分支

```shell
git branch [分支名]
```

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/image-20220820142427801.png" alt="image-20220820142427801"/>

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/image-20220820142449749.png" alt="image-20220820142449749"/>

切换分支

```shell
git checkout [分支名]
```

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/image-20220820142530391.png" alt="image-20220820142530391"/>

可以看到现在在issue1分支下了

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/image-20220820142547405.png" alt="image-20220820142547405"/>

创建并切换到分支

```shell
git checkout -b [分支名]
```

创建分支并切换到此分支下，也可以这么做，更快捷

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/image-20220820142653257.png" alt="image-20220820142653257"  />

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/image-20220820142712261.png" alt="image-20220820142712261"  />

### 3.4 删除分支

**安全删除**

```shell
git branch -d [分支名]
```

**强制删除**

```shell
git branch -D [分支名]
```

**删除远程分支**

```shell
git push origin --delete [分支名]
```

## 4. 合并分支

### 4.1 合并两个分支的最新提交到新的分支

```shell
git checkout -b [分支名]
```

```shell
git merge [分支1] [分支2]
```

merge选定的分支，会合并两个分支的最新提交

### 4.2 合并两个分支的某个提交到新的分支

```shell
git checkout [分支名]
```

```shell
git cherry-pick <issue1-commit-sha>
git cherry-pick <issue2-commit-sha>
```

### 4.3 合并某个分支上的提交到选定的分支

```shell
git checkout [分支名]
```

```shell
git cherry-pick <issue-commit-sha>
```

## 5. 文件回滚

> 回滚十分重要，这也是版本管理的初衷——保证文件的可管理性。回滚在错误还原、情景复现等场景中十分重要，救我好几次了！
### 5.1 对比：git checkout和git reset

|           | git checkout                                     | git reset                    |
| --------- | ------------------------------------------------ | ---------------------------- |
| **作用**  | 恢复文件、切换分支（切换前暂存区不能有文件）     | 恢复文件                     |
| **影响1** | 只会更新工作区中的文件，不会影响暂存区和当前分支 | 会更新暂存区和工作区中的文件 |
| **影响2** | 不会影响未提交更改                               | 会丢弃所有未提交的更改       |

### 5.2 切换版本文件

```shell
git checkout HEAD/HEAD~n/<issue-commit-sha> [文件]/.
```

回滚某些文件到上一次的版本

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/image-20220820144900027.png" alt="image-20220820144900027"  />

回滚所有文件到上一次的版本

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/image-20220820145529019.png" alt="image-20220820145529019"  />

### 5.3 重置版本文件

```shell
git reset --hard/--soft/--mixed HEAD/HEAD~n/<issue-commit-sha> [文件]/.
```

- **`--hard`**：重置HEAD、暂存区、工作区，**丢弃所有未提交更改**。

  > 简单粗暴的版本回滚办法，尽管现有的工作量会白费，但是错误也不会产生了。

- **`--mixed`**：重置HEAD、暂存区。**不影响工作区**。

  > 和soft相比，mixed会更严格。如果你不想保留暂存区已经添加的文件，可以用mixed；如果你”心软“，就可以用soft，但是在整体提交的时候不要忘了解决冲突。
  >
  > 如果你重置版本的时候已经”心无挂念“了，谁爱提交就提交去吧，就可以用mixed。

- **`--soft`**：重置HEAD。**不影响暂存区、工作区**。

  > 会回滚到某个版本，但是之前所作的工作会保留下来。比如你在某分支下做了一些工作，然后当你切换到另一个分支时，希望可以将原来的工作成果继承过来，就可以使用这个命令。又比如你提交了几次，但是觉得目前的工作还没有完成，就可以使用这个方法”撤销提交“，回到某个版本并将之前的工作量保留下来。

版本重置成功！

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/image-20230529153853743.png" alt="image-20230529153853743" align="left"/>

# 三、远程仓库操作

## 1. 添加远程仓库地址

```shell
git remote add [仓库备注名] https://github.com/用户名/仓库名
```

git中可以设置多个远程仓库地址，这样你就可以将同样的改动推送到多个代码仓库了

![image-20231114204054430](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/image-20231114204054430.png)

添加了多个远程仓库后，就可以多次push，向多个代码仓库推送了

## 2. 删除远程仓库地址

```shell
git remote rm [仓库备注名]
```

## 3. 查看项目中已添加的远程仓库地址

```shell
git remote -v
```

![image-20231219134603651](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202312191346750.png)

## 4. 对比当前主分支和远程分支

```shell
git branch -vv
```

![image-20231219134734605](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202312191347664.png)

## 5. 拉取合并远程仓库的文件

```shell
git pull origin main
```

## 6. 将本地分支推送到远程主机的分支上

```shell
git push (--force) origin (--delete) main:main  # 远程主机名 本地分支名:远程分支名(相同可不写)
```

# 四、文件对比

## 1. 查看当前未提交的版本的改动

```shell
git diff (HEAD~0) (HEAD~1)
```

红色的是上一版本的，绿色是当前修改后的，减号表示删除的内容，加号表示新增的内容

![image-20230529153045566](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/image-20230529153045566.png)

## 2. 对比两个版本的区别

```shell
git diff <issue1-commit-sha> <issue2-commit-sha>
```

会分别展示两个版本的区别，但是写得很乱，我都看不懂。

而且这两个版本相隔太久，差别很大，在这里无法真正体现出区别。

![image-20230529154317054](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/image-20230529154317054.png)
