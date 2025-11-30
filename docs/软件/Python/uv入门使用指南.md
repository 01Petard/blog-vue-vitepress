> 这篇文章只是uv的入门指南，项目中的用法请看这篇[uv项目使用指南](./uv项目使用指南.md)

# uv入门使用指南

> `uv` 是近年来新兴的一款 **轻量级、高性能、现代化的 Python 包和虚拟环境管理工具**，它的目标是部分替代 `pip`、`virtualenv`、`pip-tools`、`poetry`、`pipenv` 这类工具，提升开发者的日常体验。
>
> 下面记录一下我 **从零开始** 学习 `uv`，在 Python 项目中进行包管理的体验。

视频：https://www.bilibili.com/video/BV1ajJ7zPEa5/

## 一、uv 是什么？

`uv` 是由 [Astral](https://astral.sh) 团队开发推出的超快 Python 包管理工具，支持环境隔离、依赖管理、锁文件生成，目标就是比 pip/conda 快几个数量级。uv采用用 **Rust 编写**，具有超高的性能。主要功能包括：

- 安装依赖（替代 `pip`）
- 管理虚拟环境（替代 `venv`、`virtualenv`）
- 支持 `pyproject.toml`（兼容 `poetry` 风格）
- 更快的包解析与安装（比 `pip`、`poetry` 更快）
- 支持缓存加速和并发下载

> **一句话总结：uv 是现代 Python 项目的全能包管理工具。**

**竞品比较**：

1. [pip](https://pip.pypa.io/en/stable/)：Python 的官方包管理器，功能全面，但性能较低，且需要开发者手动管理多个步骤。
2. [rye](https://github.com/astral-sh/rye)：全面且现代化的 Python 项目和包管理解决方案，整合了 python 版本管理、自动化依赖管理、python 包管理、自动化虚拟环境管理、项目初始化、python lint 等功能，适合中大型项目或团队使用。
3. [pip-tools](https://github.com/jazzband/pip-tools)：用于管理 Python 项目依赖的工具集，能帮助开发者生成、更新和锁定项目的依赖版本。
4. [pipx](https://github.com/pypa/pipx)：专门用于下载和管理 python 应用程序的工具，能下载并运行各种 Python 应用程序，且不会污染系统或项目的环境。
5. [poetry](https://python-poetry.org/)：主要用于管理 python 项目依赖、打包和发布的工具，旨在简化依赖管理，同时提供一个统一的工作流来创建和分发 Python 包。
6. [pyenv](https://github.com/pyenv/pyenv)：用于管理多个 Python 版本的工具。相较于 `uv`，`pyenv` 最大的不同是以源码编译的方式安装 python。

## 二、安装 uv

`uv` 本身就是一个二进制工具，不需要 Python 先装好，直接装：

**Mac/Linux:**

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

**Windows PowerShell:**

```powershell
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

装完之后验证：

```bash
uv --version
```

![image-20250810140240277](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202508101402508.png)

或使用 pipx 安装 uv：

```shell
pipx install uv
```

> ⚠️ `pipx` 是安装命令行工具的神器，相当于全局环境下的隔离安装，推荐学习和使用。

![image-20250611202655692](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202506112026764.png)

检查是否安装成功：

```shell
uv --version
```

![image-20250611202707532](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202506112027565.png)

好家伙，直接集成了Git

![image-20250611202932378](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202506112029417.png)

## 三、管理项目环境

### 查看可用python版本

```shell
uv python list
```

![image-20250611203425157](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202506112034196.png)

### 安装python

```shell
uv python install [python_version]
```

![image-20250611203433768](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202506112034797.png)

### 初始化新项目

新项目的目录下会生成 `pyproject.toml`、`.python-version` 文件。

```shell
uv init (项目名)
```

![image-20250611203518214](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202506112035253.png)

### 同步依赖

根据 `pyproject.toml` 安装或更新依赖

```shell
uv sync
```

![image-20250611204849517](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202506112048568.png)

### 安装依赖

相比于 `pip install`，`uv add` 提供了更高层次的自动化，能自动管理虚拟环境和更新 `pyproject.toml` 文件。

```shell
uv add [module]
```

![image-20250611203251672](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202506112032702.png)

### 查看依赖树

相比于 `pip list`提供了更详细的依赖关系信息，且能以树状结构展示。

```shell
uv tree
```

![image-20250611203723249](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202506112037282.png)

### 移除依赖

相比于 `pip uninstall`更智能，在卸载指定包后，还会检测并删除未使用的依赖项。

```shell
uv remove [module]
```

![image-20250611203939503](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202506112039541.png)

## 四、管理和运行项目

### 运行项目或脚本

可以在不显式激活虚拟环境的情况下，在项目的虚拟环境中执行任何命令或脚本。

```shell
uv run [.py]
```

![image-20250611204650497](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202506112046549.png)

### 安装/卸载命令行工具

安装后这些工具会被自动放进 `.venv/bin/`（或 Windows 下的 `Scripts/`），可直接用。

安装：

```shell
uv tool instal [...]
```

![image-20250611205101623](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202506112051651.png)

卸载：

```shell
uv tool uninstall [...]
```

![image-20250611205634844](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202506112056879.png)

### 创建临时虚拟环境

是 `uv tool run` 的简写，能调用 Python 包中的实用工具，并且不会影响当前项目环境，类似于 `pipx`。

```shell
uvx
```

![image-20250611205738330](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202506112057376.png)

### 运行临时脚本

```shell
uv init --script [.py]
```

![image-20250611210119114](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202506112101157.png)

修改文件，添加必需依赖

![image-20250611210136700](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202506112101723.png)

```shell
uv run [.py]
```

![image-20250611210153367](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202506112101421.png)

### 将项目的锁文件导出为其他格式

将项目的锁文件导出为其他格式，如 `requirements.txt`。

```shell
uv export
```

![image-20250611204343735](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202506112043775.png)

## 五、用uv来替代conda和pip

### 1. 创建 Python 环境（类似 `conda create`）

`uv` 也能拉取指定版本的 Python 并创建隔离环境：

```bash
# 创建一个新的虚拟环境（会自动安装 python 解释器）
uv venv --python 3.11 myenv
```

这会在当前目录生成 `myenv/`，自带干净的 Python。

激活环境：

```bash
# Linux/Mac
source myenv/bin/activate

# Windows
myenv\Scripts\activate
```

### 2. 全局 Python 版本管理（类似 conda 的全局 base）

如果你想用 `uv` 像 `conda` 那样全局切换 Python 版本，可以：

```bash
uv python install 3.12
uv python install 3.10

# 查看已安装版本
uv python list

# 设置默认版本
uv python pin 3.12
```

`uv` 会自己管理这些解释器，独立于系统 Python。

### 3. 安装依赖（比 pip 快很多）

在已激活的环境里：

```bash
uv pip install requests
```

或者直接用 `uv add`，还能帮你生成锁文件：

```bash
uv add requests
```

生成的 `uv.lock` 类似 `conda-lock`，跨平台可复现。

### 4. 管理依赖（类似 `conda env update`）

修改 `pyproject.toml` 或 `requirements.txt` 后，运行：

```bash
uv sync
```

会自动安装/更新所有依赖，且速度很快（比 pip + venv 快几十倍）。

### 5. 运行脚本时临时创建环境（免激活）

这是 `uv` 的杀手锏：

```bash
uv run python script.py
```

它会自动根据当前目录的依赖文件创建隔离环境并运行脚本，不污染全局。

### 6. 删除环境（类似 `conda remove --name myenv --all`）

```bash
rm -rf myenv
```

或者如果是 `uv` 管理的全局 python：

```bash
uv python uninstall 3.10
```
