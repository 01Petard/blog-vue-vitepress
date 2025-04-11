# `ps` `grep`命令分析

`ps aux | grep -E 'jira|confluence'` 是一个组合命令，它由两部分组成，通过管道符 `|` 连接，下面分别介绍每一部分的功能。

## `ps aux`

- `ps` 是一个用于报告当前系统进程状态的命令。
- `aux`是`ps`命令的选项组合：
  - `a`：显示所有用户的进程。
  - `u`：以用户为中心的格式输出进程信息，会显示出用户名、CPU 占用率、内存占用率、进程状态等详细信息。
  - `x`：显示没有控制终端的进程，也就是包括那些后台运行的进程。

执行 `ps aux` 后，会输出系统中所有用户的所有进程的详细信息，每一行代表一个进程，包含以下常见字段：

```plaintext
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  0.0  0.0  16864  2384 ?        Ss   Feb18   0:02 /sbin/init splash
```

- `USER`：进程的所有者。
- `PID`：进程的 ID 号。
- `%CPU`：进程占用 CPU 的百分比。
- `%MEM`：进程占用内存的百分比。
- `VSZ`：进程使用的虚拟内存大小（单位：KB）。
- `RSS`：进程使用的物理内存大小（单位：KB）。
- `TTY`：进程关联的终端设备，如果没有则显示 `?`。
- `STAT`：进程的状态，常见状态有 `S`（睡眠）、`R`（运行）、`Z`（僵尸进程）等。
- `START`：进程启动的时间。
- `TIME`：进程占用 CPU 的总时间。
- `COMMAND`：启动进程的命令。

## `grep -E 'jira|confluence'`

- `grep` 是一个用于在文本中搜索匹配特定模式的命令。
- `-E` 选项表示使用扩展正则表达式。
- `'jira|confluence'` 是一个扩展正则表达式，其中 `|` 是逻辑或的意思，表示匹配包含 `jira` 或者包含 `confluence` 的行。

`grep -E 'jira|confluence'` 会从标准输入（也就是管道符 `|` 前面 `ps aux` 的输出）中筛选出包含 `jira` 或 `confluence` 的行，最终输出的就是与 `jira` 或 `confluence` 相关的进程信息。

# 命令执行示例

```bash
sudo ps aux | grep -E 'jira|confluence'
```

使用 `sudo` 是为了以超级用户权限执行该命令，确保可以查看所有用户的进程信息。执行该命令后，会输出系统中所有与 `jira` 或 `confluence` 相关的进程的详细信息。

# 举一反三

## 搜索其他关键字

如果你想搜索与 `mysql` 或 `nginx` 相关的进程，可以将命令修改为：

```bash
sudo ps aux | grep -E 'mysql|nginx'
```

## 搜索单个关键字

如果你只需要搜索包含 `tomcat` 的进程，可以去掉正则表达式中的 `|` 和另一个关键字：

```bash
sudo ps aux | grep 'tomcat'
```

这里可以省略 `-E` 选项，因为不需要使用扩展正则表达式。

## 忽略大小写搜索

如果要搜索时忽略大小写，例如搜索包含 `java`（不区分大小写）的进程，可以使用 `-i` 选项：

```bash
sudo ps aux | grep -i 'java'
```

## 结合其他 `ps` 选项

`ps` 命令还有很多其他选项，例如 `-ef` 可以以标准格式输出进程信息，包含进程的父进程 ID 等：

```bash
sudo ps -ef | grep -E 'redis|mongodb'
```

##  过滤掉 `grep` 自身进程

在使用 `grep` 搜索进程时，`grep` 命令本身也会作为一个进程出现在结果中，如果你想过滤掉它，可以使用 `grep -v` 选项，`-v` 表示反向匹配，即排除包含指定模式的行：

```bash
sudo ps aux | grep -E 'jira|confluence' | grep -v grep
```

这样输出的结果中就不会包含 `grep` 命令自身的进程信息了。