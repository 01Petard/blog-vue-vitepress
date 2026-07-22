# macOS接入Headscale

> 适用场景：macOS 设备通过 Tailscale 客户端接入单位自建的 Headscale 私有网络。
>
> 示例控制服务器：`https://115.29.215.180`。实际使用时应以管理员提供的地址为准。

## 1. 原理说明

- **Tailscale**：安装在 Mac 上的组网客户端，底层使用 WireGuard 建立加密连接。
- **Headscale**：自建的 Tailscale 控制服务器，负责设备注册、密钥和网络策略管理。
- **CA 证书**：当 Headscale 使用私有 CA 签发 HTTPS 证书时，需要先让 macOS 信任该 CA。
- **Pre-auth key**：将设备注册到 Headscale 的临时凭证，具有敏感性，不能公开传播。

## 2. 安全注意事项

### 2.1 认证密钥不能泄露

`hskey-auth-...` 属于入网凭证。不要将它提交到 Git、粘贴到公开聊天、工单、文档或截图中。

如果密钥已经泄露，应让 Headscale 管理员立即撤销，并重新生成满足以下条件的密钥：

- 仅允许使用一次；
- 有效期尽可能短；
- 绑定正确的用户或设备标签；
- 通过可信的私密渠道发送。

本文统一使用占位符：

```text
<NEW_AUTH_KEY>
```

### 2.2 不要直接信任来源不明的 CA 证书

把 CA 加入 `System.keychain` 后，它会成为系统级信任根。持有对应 CA 私钥的人可能签发被本机信任的 HTTPS 证书。因此，导入前必须核对证书 SHA-256 指纹。

## 3. 准备证书

将管理员提供的证书保存为：

```text
~/Documents/headscale-ca.crt
```

确认文件存在：

```bash
ls -l "$HOME/Documents/headscale-ca.crt"
```

查看证书主体、签发者、有效期和 SHA-256 指纹：

```bash
openssl x509 \
  -in "$HOME/Documents/headscale-ca.crt" \
  -noout \
  -subject \
  -issuer \
  -dates \
  -fingerprint \
  -sha256
```

确认它确实是 CA 证书：

```bash
openssl x509 \
  -in "$HOME/Documents/headscale-ca.crt" \
  -noout \
  -text | grep -A 2 "Basic Constraints"
```

预期包含：

```text
CA:TRUE
```

将 SHA-256 指纹发给管理员，通过另一条可信渠道核对。指纹不一致、看不到 `CA:TRUE` 或证书已经过期时，停止操作。

## 4. 将 CA 证书加入 macOS 系统信任

原聊天消息中的 `\\n` 是换行转义残留，不能原样复制。正确命令如下：

```bash
sudo security add-trusted-cert \
  -d \
  -r trustRoot \
  -k /Library/Keychains/System.keychain \
  "$HOME/Documents/headscale-ca.crt"
```

输入 Mac 管理员密码。终端不会显示输入的密码字符，属于正常现象。

也可以通过“钥匙串访问”操作：

1. 打开“钥匙串访问”；
2. 选择“系统”钥匙串；
3. 将 `headscale-ca.crt` 拖入证书列表；
4. 双击证书，在“信任”中设置所需的信任策略。

## 5. 验证 Headscale HTTPS

```bash
curl -v "https://115.29.215.180/"
```

判断标准：

- 返回 `200`、`404` 或 Headscale 的普通 HTTP 响应，但没有 TLS 错误：HTTPS 信任基本正常；
- 出现 `certificate verify failed`：证书链或本机信任配置有问题；
- 出现 `no alternative certificate subject name`：服务端证书没有将该 IP 写入 SAN；
- 出现连接超时或拒绝：检查公网地址、443 端口、防火墙和 Headscale 服务状态。

如果证书名称与 IP 不匹配，必须由服务端管理员重新签发包含该 IP SAN 的证书。仅仅继续导入证书无法正确解决名称校验问题。

## 6. 安装 Tailscale 客户端

从官方页面下载并安装：

```text
https://tailscale.com/download
```

安装后检查 CLI：

```bash
tailscale version
```

如果出现 `command not found: tailscale`，可能安装的是未暴露命令行工具的 macOS 版本。优先改用官方 Standalone `.pkg`，或联系管理员确认单位统一安装方式。

## 7. 注册并连接 Headscale

使用管理员重新生成的新密钥执行：

```bash
sudo tailscale up \
  --login-server="https://115.29.215.180" \
  --auth-key="<NEW_AUTH_KEY>" \
  --hostname="hzx-mac"
```

参数含义：

| 参数             | 作用                              |
| ---------------- | --------------------------------- |
| `--login-server` | 指定自建 Headscale 控制服务器     |
| `--auth-key`     | 使用 pre-auth key 非交互注册设备  |
| `--hostname`     | 设置设备在 Headscale 网络中的名称 |

设备名应保持唯一，建议使用“用户缩写 + 设备类型”，例如 `hzx-mac`。

## 8. 验证接入结果

查看设备和节点状态：

```bash
tailscale status
```

查看本机 Tailscale IPv4 地址：

```bash
tailscale ip -4
```

测试访问其他节点：

```bash
tailscale ping <目标设备名或Tailscale-IP>
```

正常接入应满足：

- `tailscale status` 中能看到本机 `hzx-mac`；
- 能看到网络策略允许访问的其他设备；
- `tailscale ping` 能连接目标节点；
- 管理员能在 Headscale 服务端看到 `hzx-mac` 在线。

## 9. 常见问题排查

### 9.1 `x509: certificate signed by unknown authority`

可能原因：

- CA 没有正确导入“系统”钥匙串；
- 导入了服务端叶子证书，而不是 CA 证书；
- Headscale 服务端返回的证书链不完整；
- 客户端进程尚未重新加载系统证书信任。

### 9.2 证书名称与 IP 不匹配

服务端证书的 SAN 必须包含：

```text
IP Address:115.29.215.180
```

更推荐给 Headscale 配置正式域名，例如：

```text
headscale.example.com
```

并使用公开受信任的 HTTPS 证书，从根本上取消客户端手工安装私有 CA 的步骤。

### 9.3 已经登录到其他 Tailscale 网络

先查看当前状态：

```bash
tailscale status
```

切换控制服务器可能影响原有 Tailscale 网络连接。确认不再需要当前连接后再退出：

```bash
sudo tailscale logout
```

然后重新执行 Headscale 注册命令。

## 10. 退出网络与证书回滚

### 10.1 退出 Headscale 网络

```bash
sudo tailscale logout
```

退出前确认不会中断正在使用的远程开发、数据库或服务器连接。

### 10.2 删除受信任的 CA 证书

先获取证书 SHA-1 指纹：

```bash
openssl x509 \
  -in "$HOME/Documents/headscale-ca.crt" \
  -noout \
  -fingerprint \
  -sha1
```

将输出中的冒号去掉，得到 `<SHA1_HASH>`，然后执行：

```bash
sudo security delete-certificate \
  -Z "<SHA1_HASH>" \
  /Library/Keychains/System.keychain
```

也可以在“钥匙串访问”→“系统”→“证书”中找到对应 CA，核对名称和指纹后手动删除。

## 11. 长期部署建议

生产或团队环境建议：

1. 使用正式域名代替裸公网 IP；
2. 使用公开受信任的 TLS 证书；
3. pre-auth key 设置为一次性、短有效期；
4. 按用户和设备标签设置最小权限 ACL；
5. 人员离职或设备丢失后及时删除节点并撤销密钥；
6. 定期检查 Headscale 节点、路由、密钥和异常登录记录；
7. 不在教程、脚本或 CI 日志中硬编码认证密钥。

## 12. 官方资料

- Tailscale 下载：<https://tailscale.com/download>
- Headscale 入门：<https://headscale.net/stable/usage/getting-started/>
- Headscale 注册方式：<https://juanfont.github.io/headscale/0.29.2/ref/registration/>
- Apple 导入证书：<https://support.apple.com/guide/keychain-access/add-certificates-to-a-keychain-kyca2431/mac>
- Apple 修改证书信任：<https://support.apple.com/guide/keychain-access/change-the-trust-settings-of-a-certificate-kyca11871/mac>

---

文档版本：1.0 
整理日期：2026-07-19









