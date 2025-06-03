要在同一台电脑上同时使用 **GitHub** 和 **公司 GitLab** 的 SSH 密钥，需要为 GitLab 生成一个新的密钥对并通过**条件式配置**实现不同仓库使用不同的身份信息，并配置 `~/.ssh/config` 文件来区分不同的 Git 服务。以下是详细步骤：

## 1. 使用 Git 条件式配置（自动切换身份）

编辑全局 Git 配置：

```shell
nano ~/.gitconfig
```

添加以下内容：

```shell
[includeIf "gitdir:~/company-projects/"]
    path = ~/.gitconfig-company
```

然后创建公司专用配置：

```shell
nano ~/.gitconfig-company
```

内容：

```xml
[user]
    name = 你的真实姓名（公司用）
    email = your_email@company.com
```

**效果**：

- 所有存放在 `~/company-projects/` 下的仓库会自动使用公司身份
- 其他仓库（如 GitHub）继续使用全局身份

------

## **2. 为 GitLab 生成新的 SSH 密钥**

```shell
# 生成新的密钥对（避免覆盖现有的 GitHub 密钥）
ssh-keygen -t ed25519 -C "your_email@company.com" -f ~/.ssh/id_ed25519_gitlab
```

- **`-f ~/.ssh/id_ed25519_gitlab`**：指定新密钥的文件名（避免和 GitHub 的 `id_ed25519` 冲突）。
- **`-C "your_email@company.com"`**：替换为你的公司邮箱（仅作标识，不影响功能）。

------

## **3. 将公钥添加到公司 GitLab**

1. 复制公钥内容：

   ```shell
   cat ~/.ssh/id_ed25519_gitlab.pub
   ```

2. 添加到 GitLab：

   - 登录公司 GitLab（`http://10.0.0.177/`）。
   - 进入 **Settings → SSH Keys**。
   - 粘贴 `~/.ssh/id_ed25519_gitlab.pub` 的内容。

------

## **4. 配置 `~/.ssh/config` 文件**

编辑 SSH 配置文件，指定不同的密钥用于不同的 Git 服务：

```shell
nano ~/.ssh/config
```

添加以下内容（如果文件不存在则新建）：

```xml
# GitHub 配置（使用默认密钥）
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519
    IdentitiesOnly yes

# 公司 GitLab 配置（使用新密钥）
Host gitlab.company.com  # 自定义别名（可任意取名，建议用公司域名）
    HostName 10.0.0.177   # GitLab 服务器 IP/域名
    User git
    IdentityFile ~/.ssh/id_ed25519_gitlab
    IdentitiesOnly yes
```

- **`Host gitlab.company.com`**：这是一个别名，你可以自定义（如 `gitlab.mycompany`）。
- **`HostName 10.0.0.177`**：公司 GitLab 的实际地址。
- **`IdentityFile`**：指定对应的私钥文件。

保存并退出（`Ctrl + X` → `Y` → `Enter`）。

------

## **5. 测试连接**

### **测试 GitHub 连接**

```shell
ssh -T git@github.com
```

应返回：

```
Hi 01Petard! You've successfully authenticated, but GitHub does not provide shell access.
```

### **测试公司 GitLab 连接**

```shell
ssh -T git@gitlab.company.com  # 使用你在 config 里定义的 Host 别名
```

如果 GitLab 服务器支持 SSH 测试，会返回欢迎信息（如 `Welcome to GitLab, @username!`）。

------

## **步骤 6：克隆/配置 Git 仓库**

### **GitHub 仓库**

```shell
git clone git@github.com:01Petard/beauty-video-info.git
```

（仍然使用默认的 `id_ed25519` 密钥）

### **公司 GitLab 仓库**

```shell
git clone git@gitlab.company.com:group/project.git
```

（SSH 会自动使用 `~/.ssh/id_ed25519_gitlab` 密钥）

------

## **⚡ 关键注意事项**

1. 确保密钥权限正确：

   ```shell
   chmod 600 ~/.ssh/id_ed25519*
   chmod 600 ~/.ssh/id_ed25519_gitlab*
   ```

2. **如果 GitLab 使用非标准 SSH 端口**：
    在 `~/.ssh/config` 中添加 `Port 2222`（替换为实际端口）。

3. **首次连接可能需要确认指纹**：
    输入 `yes` 确认 GitLab 服务器的 SSH 指纹。

------

## **💡 为什么需要 `~/.ssh/config`？**

- 默认情况下，SSH 会按顺序尝试所有密钥，可能导致认证失败。
- 通过 `config` 文件，可以**精确指定每个服务使用哪个密钥**，避免冲突。

------

## **🚀 最终验证**

```shell
# 查看当前加载的密钥
ssh-add -l

# 如果密钥未自动加载，手动添加
ssh-add ~/.ssh/id_ed25519          # GitHub 密钥
ssh-add ~/.ssh/id_ed25519_gitlab   # GitLab 密钥
```

现在自己的电脑就可以同时无缝访问 **GitHub** 和 **公司 GitLab** 了！