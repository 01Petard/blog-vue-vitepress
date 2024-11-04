---
title: windows终端美化
date: 2024-10-27 15:19:00
updated: 
categories: 
- 软件
tags: 
- windows
- 终端
- ohmyposh
keywords:
- windows
- 终端
- ohmyposh
description: Terminal + oh-my-posh
cover: https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202410271521094.png
top_img: https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202410271521546.png
---

> 俗话说，RGB就是战斗力，颜值就是生产力！所以，max和linux有iTerm + ohmyzsh，windows就有Terminal + ohmyposh
>
> 这次就来折腾一下，还是挺方便的。

## 1. 去微软商店下载 `Windows Terminal`

## 2. 安装Chocolatey

在[Chocolatey Software | Installing Chocolatey](https://chocolatey.org/install)网页下，复制安装脚本

<img src="https://picgo-img-repo.oss-cn-beijing.aliyuncs.com/img/135dba74fade69aaada79a0025f5312e.png" alt="img" style="zoom: 50%;" />

Chocolatey安装脚本

```shell
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

复制到终端中

即可自动安装`Chocolatey`

使用`choco -v`检查一下

## 3. 设置管理员权限启动

启用管理员模式，不然后面可能会权限不足，安装失败。

<img src="https://picgo-img-repo.oss-cn-beijing.aliyuncs.com/img/cebec2ec3649bda0fb0350cdf9c7b2e1.png" alt="img" style="zoom:67%;" />

## 4. 安装字体

推荐使用等宽连体带图标(终端显示的花样多一点)的字体

如果用默认字体，ohmyposh会乱码

我使用[Nerd Fonts](https://www.nerdfonts.com/)

安装使用`Chocolatey`即可

```shell
choco install nerd-fonts-hack
```

## 5. 编辑windows terminal 配置使用Nerd Fonts字体

这里很多人都会去下载一个powershell，其实没有必要，Windows自带的powershell的版本和功能已经可以满足要求。

<img src="https://picgo-img-repo.oss-cn-beijing.aliyuncs.com/img/e0547c1027f29d4dc2590790efab2f4c.png" alt="img" style="zoom:67%;" />

<img src="https://picgo-img-repo.oss-cn-beijing.aliyuncs.com/img/ebeaabf0f74eb37d41173f7f4bfbbc47.png" alt="img" style="zoom:67%;" />

当然也可以直接使用配置文件，`"defaults"`在`"profiles"`属性下

```
json"defaults": 
{
    "backgroundImage": null,
    "colorScheme": "Campbell",
    "cursorShape": "filledBox",
    "experimental.retroTerminalEffect": false,
    "font": 
    {
        "face": "CodeNewRoman Nerd Font Mono",
        "size": 14.0,
        "weight": "normal"
    },
    "opacity": 90,
    "padding": "0",
    "scrollbarState": "hidden",
    "useAcrylic": false
},
```

其余的配置文件内容

```
json"copyFormatting": "none",
"copyOnSelect": false,
"defaultProfile": "{61c54bbd-c2c6-5271-96e7-009a87ff44bf}",
"alwaysOnTop": false,
"alwaysShowTabs": true,
"autoHideWindow": false,
"disableAnimations": false,
"firstWindowPreference": "defaultProfile",
"focusFollowMouse": false,
"initialCols": 88,
"initialPosition": "750,350",
"initialRows": 24,
"launchMode": "focus",
```

大概在这个行数

<img src="https://picgo-img-repo.oss-cn-beijing.aliyuncs.com/img/075e892a965f8d16d6aae7516bf7a769.png" alt="img" style="zoom:67%;" />

添加快捷键

```
json"actions": 
[
    {
        "command": 
        {
            "action": "copy",
            "singleLine": false
        },
        "keys": "ctrl+c"
    },
    {
        "command": "paste",
        "keys": "ctrl+v"
    },
    {
        "command": 
        {
            "action": "splitPane",
            "split": "auto",
            "splitMode": "duplicate"
        },
        "keys": "alt+shift+d"
    },
    {
        "command": "find",
        "keys": "ctrl+shift+f"
    },
    {
        "command": "toggleFocusMode",
        "keys": "alt+z"
    }
],
```

这样可以使用`alt+z`打开标题栏

## 5. 允许终端运行本地脚本

输入这个命令即可

```shell
set-ExecutionPolicy RemoteSigned
```

这一步是确保后面终端自动使用ohmyposh启动

<img src="https://picgo-img-repo.oss-cn-beijing.aliyuncs.com/img/77680a9388ce0afedeffe5407637f452.png" alt="img" style="zoom:80%;" />

## 6. 安装oh-my-posh

1. 安装`oh-my-posh`

   ```shell
   choco install oh-my-posh
   ```

2. 创建`powershell`配置文件

   ```shell
   if (!(Test-Path -Path $PROFILE )) { New-Item -Type File -Path $PROFILE -Force }
   ```

3. 打开配置文件

   ```shell
   notepad $PROFILE
   ```

4. 写入指令，这里是让终端在启动时加载`oh-my-posh`配置文件，其中`~/.omp.theme.json`是配置文件的所在路径，windows的话就是在`C:\Users\Administrator`下创建`.omp.theme.json`文件并写入配置即可

   ```shell
   oh-my-posh init pwsh --config ~/.omp.theme.json | Invoke-Expression
   ```

5. 关闭启动时的banner，添加`-nologo`项即可

<img src="https://picgo-img-repo.oss-cn-beijing.aliyuncs.com/img/3714b3074d1258af263f5a066f6e03c5.png" alt="img" style="zoom:67%;" />

## 7. 安装自动补全插件

1. 先安装最新的`PowerShellGet`

   ```shell
   bashInstall-Module -Name PowerShellGet -Force
   Exit
   ```

2. 再安装`PSReadLine`

   ```shell
   Install-Module PSReadLine -AllowPrerelease -Force
   ```

3. 在`powsershell`输入

   ```shell
   notepad.exe $PROFILE
   ```

4. 在打开的界面输入下面内容

   ```shell
   bashSet-PSReadLineKeyHandler -Key Tab -Function MenuComplete #Tab键会出现自动补全菜单
   Set-PSReadlineKeyHandler -Key UpArrow -Function HistorySearchBackward
   Set-PSReadlineKeyHandler -Key DownArrow -Function HistorySearchForward
   # 上下方向键箭头，搜索历史中进行自动补全
   ```

5. 保存重启`powershell`即可

## 8. 安装oh-my-posh主题

1. 查看 `oh-my-posh` 提供的所有主题：

   ```shell
   Get-PoshThemes
   ```

2. 预览一个主题（将 `name.omp.json` 替换为你想要的主题名称）：

   ```shell
   oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH\your_theme.omp.json" | Invoke-Expression
   ```

3. 设置默认主题

   1. 编辑 PowerShell 配置文件

      ```shell
      notepad $PROFILE
      ```

   2. 将以下命令添加到文件中（将 `your_theme.omp.json` 替换为你选择的主题）：

      ```shell
      oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH\your_theme.omp.json" | Invoke-Expression
      ```

4. 自定义主题

   1. 查看主题的配置文件目录，我的是在 `C:\Program Files (x86)\oh-my-posh\themes`

      ```shell
      echo $env:POSH_THEMES_PATH
      ```

   2. 直接编辑 `your_theme.omp.json` 文件。也可以在文件中更改提示符的布局、颜色和显示信息等。配置项的说明可以在 [oh-my-posh]([oh-my-posh/themes at main · JanDeDobbeleer/oh-my-posh](https://github.com/JanDeDobbeleer/oh-my-posh/tree/main/themes)) 官方文档 中找到。

> 友情链接：
>
> [Themes | Oh My Posh](https://ohmyposh.dev/docs/themes#json)
>
> [oh-my-posh/themes at main · JanDeDobbeleer/oh-my-posh](https://github.com/JanDeDobbeleer/oh-my-posh/tree/main/themes)

## 9. 展示

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202410252354435.png" alt="image-20241025235417348" style="zoom:80%;" />