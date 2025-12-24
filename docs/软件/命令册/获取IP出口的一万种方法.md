除了 `https://checkip.amazonaws.com`，还有很多公开的、轻量级的服务可以用来通过 `curl` 快速获取你当前的**公网出口 IP 地址（IPv4）**。以下是一些常用且稳定的替代域名：

------

### ✅ 常用公网 IP 查询服务（支持 `curl`）

| 服务                      | 命令示例                            | 特点                                      |
| ------------------------- | ----------------------------------- | ----------------------------------------- |
| **ipinfo.io**             | `curl -4s https://ipinfo.io/ip`     | 返回纯文本 IP，简洁可靠                   |
| **icanhazip.com**         | `curl -4s https://icanhazip.com`    | 极简，无多余内容                          |
| **ifconfig.me**           | `curl -4s https://ifconfig.me/ip`   | 支持多种格式（`/ip`, `/host`, `/ua` 等）  |
| **ipecho.net**            | `curl -4s https://ipecho.net/plain` | 纯文本，仅 IPv4                           |
| **ident.me**              | `curl -4s https://ident.me`         | 支持 IPv4/IPv6 自动返回                   |
| **api.ipify.org**         | `curl -4s https://api.ipify.org`    | 专为 API 设计，稳定                       |
| **myip.ipip.net**（国内） | `curl -4s https://myip.ipip.net`    | 中文服务，响应快（含地理位置）            |
| **cip.cc**（国内）        | `curl -4s http://cip.cc`            | 返回 IP + 归属地（但内容较丰富，非纯 IP） |

------

### 🔧 使用建议

- 如果只需要 **纯 IP 字符串**（用于脚本处理），推荐：

  ```bash
  curl -4s https://icanhazip.com
  curl -4s https://api.ipify.org
  curl -4s https://ipinfo.io/ip
  ```

- 如果在 **国内网络环境**，`amazonaws.com` 可能偶尔慢或被干扰，可优先用国内服务：

  ```bash
  curl -4s https://myip.ipip.net | grep -oE '\b([0-9]{1,3}\.){3}[0-9]{1,3}\b'
  ```

- 测试 IPv6 去掉 `-4` 参数即可（如 `curl -s https://ident.me`）。

------

### ⚠️ 注意事项

- 所有这些服务都返回 **NAT 后的公网 IP**，不是内网 IP（如 `192.168.x.x`）。

- 部分服务可能有请求频率限制（但一般个人使用完全没问题）。

- 避免在生产脚本中只依赖单一服务，可加 fallback：

  ```bash
  my_ip=$(curl -4s --max-time 5 https://icanhazip.com 2>/dev/null || \
          curl -4s --max-time 5 https://api.ipify.org 2>/dev/null || \
          echo "unknown")
  echo $my_ip
  ```

------

### 🌐 补充：自建测试（如果有公网服务器）

也可以自己部署一个简单的 HTTP 服务返回 `$remote_addr`（Nginx）或 `X-Forwarded-For`，但对大多数用户来说没必要。

