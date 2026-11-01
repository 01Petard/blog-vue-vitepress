# sslx 使用手册：从安装到生产环境实践

项目地址：[glincker/sslx GitHub 仓库](https://github.com/glincker/sslx?utm_source=chatgpt.com)     官方文档：[README](https://github.com/glincker/sslx/blob/main/README.md?utm_source=chatgpt.com) · [GUIDE](https://github.com/glincker/sslx/blob/main/GUIDE.md?utm_source=chatgpt.com) · [FAQ](https://github.com/glincker/sslx/blob/main/FAQ.md?utm_source=chatgpt.com)

## 一、sslx 是什么？

sslx 是一个基于 Rust 开发的 SSL/TLS 证书管理与诊断命令行工具，可以理解为 OpenSSL 常用证书功能的简化替代品。

它使用 `rustls` 实现 TLS 功能，不依赖系统安装的 OpenSSL。

主要解决三个问题：

- 命令复杂： OpenSSL 需要记忆大量参数，sslx 将常用操作简化成直观的子命令。
- 排查困难： 自动展示证书有效期、证书链、加密套件、TLS 协议版本等信息。
- 自动化繁琐： 支持 JSON 输出和退出码，可以集成到 Shell 脚本、Cron、CI/CD 流程中。

它不是 OpenSSL 全功能替代品，也不是自动申请、续签和部署 HTTPS 证书的完整解决方案。

## 二、安装方式

macOS安装

```shell
brew install glincker/tap/sslx
```

也可以直接下载预编译二进制文件：

```shell
# macOS Apple Silicon
curl -fsSL \
  https://github.com/glincker/sslx/releases/latest/download/sslx-macos-aarch64 \
  -o sslx
chmod +x sslx
sudo mv sslx /usr/local/bin/
```

```shell
# Linux x86_64
curl -fsSL \
  https://github.com/glincker/sslx/releases/latest/download/sslx-linux-x86_64 \
  -o sslx
chmod +x sslx
sudo mv sslx /usr/local/bin/
```

安装完成后：

```shell
sslx --version
sslx --help
```

查看某个命令的完整参数：

```shell
sslx generate --help
```

## 三、核心命令速查

| 命令          | 功能               | 典型用途                 |
| ------------- | ------------------ | ------------------------ |
| `grade`       | TLS 安全评级       | 评估 HTTPS 配置          |
| `connect`     | TLS 连接诊断       | 检查握手、证书链         |
| `expiry`      | 证书过期检查       | 批量监控线上域名         |
| `inspect`     | 解析本地证书       | 查看 PEM、DER 信息       |
| `verify`      | 验证证书链         | 检查 CA 签发及信任链     |
| `generate`    | 生成自签名证书     | 本地 HTTPS 开发          |
| `csr`         | 生成证书签名请求   | 向 CA 申请证书           |
| `match`       | 校验证书与私钥匹配 | 避免部署错误密钥         |
| `convert`     | 证书格式转换       | PEM、DER、PKCS12 转换    |
| `extract`     | 提取 PKCS12 内容   | 拆分证书、证书链和私钥   |
| `decode`      | 自动识别并解码     | 解析证书、密钥、CSR、JWT |
| `completions` | 生成 Shell 补全    | 提高命令行使用效率       |

## 四、常用操作详解

### 1. 检查网站 TLS 安全等级：`grade`

```shell
sslx grade github.com
```

会检查以下维度：

| 检查项      | 作用                            |
| ----------- | ------------------------------- |
| Protocol    | TLS 协议版本，例如 TLS 1.2、1.3 |
| Cipher      | 协商的加密套件与强度            |
| Certificate | 证书是否有效、剩余有效期        |
| Key         | 公钥算法和密钥强度              |
| Hostname    | 证书 SAN 是否匹配目标域名       |
| Chain       | 证书链是否完整                  |
| ALPN        | 是否支持 HTTP/2 等协议协商      |

评级范围为 A+ 至 F。

```shell
# 提取评级结果
sslx grade example.com --json | jq -r '.grade'
```

适用场景：HTTPS 上线验收、反向代理 TLS 配置检查、证书更新后的安全巡检。

### 2. 检查 TLS 握手和证书链：`connect`

```shell
sslx connect example.com
```

默认连接 443 端口，也支持指定端口：

```shell
sslx connect example.com:8443
```

主要输出 TLS 版本、协商的加密套件、ALPN 协议，以及服务器返回的证书链。

还可以通过 JSON 获取证书剩余天数：

```shell
sslx connect example.com --json \
  | jq '.chain.certificates[0].days_remaining'
```

和 `grade` 的区别： `connect` 偏向连接与证书诊断，`grade` 偏向综合安全评分。

### 3. 批量检查证书过期时间：`expiry`

```shell
sslx expiry example.com github.com google.com
```

输出包含各域名的到期日期、剩余天数和状态。

官方文档指出：任一证书将在 7 天内过期时，返回退出码 1。

例如：

```shell
sslx expiry api.example.com admin.example.com

if [ $? -ne 0 ]; then
    echo "证书检查异常，需要排查"
fi
```

适用于部署巡检、CI/CD 和定时检查。需要区分的是，非零退出码还可能代表连接失败等错误，生产监控不应一律解释为证书即将过期。

### 4. 查看本地证书：`inspect`

```shell
sslx inspect cert.pem
```

支持 PEM、DER 格式，并能自动识别格式；包含多个证书的文件也可以解析。

可以查看证书主体（Subject）、签发者（Issuer）、序列号、有效期、SAN 域名、公钥信息和 SHA-256 指纹等。

```shell
# 查询所有 SAN
sslx inspect cert.pem --json \
  | jq '.certificates[0].sans'

# 查询是否过期
sslx inspect cert.pem --json \
  | jq '.certificates[0].is_expired'
```

从 v0.4.0 开始，`inspect` 和 `decode` 支持标准输入：

```shell
cat cert.pem | sslx inspect -
```

### 5. 校验证书链：`verify`

```shell
sslx verify cert.pem --ca ca-bundle.pem
```

检查证书是否由指定 CA 签发、证书是否过期，以及证书链是否完整和可信。

适用于私有 CA、内部服务证书、证书链故障排查。

### 6. 验证证书与私钥是否匹配：`match`

```shell
sslx match cert.pem key.pem
```

通过比较证书中的公钥与私钥对应的公钥，判断是否为一对。

例如部署 Nginx 前，先检查：

```shell
sslx match fullchain.pem privkey.pem
```

可提前发现证书与私钥不匹配的问题。

### 7. 生成自签名证书：`generate`

适用于本地 HTTPS 开发、测试环境和内部服务。

```shell
mkdir -p ./certs

sslx generate \
  --cn localhost \
  --san "localhost,127.0.0.1,192.168.1.100" \
  --days 365 \
  --key-type ec256 \
  --out ./certs
```

主要参数：

| 参数         | 含义               | 默认值      |
| ------------ | ------------------ | ----------- |
| `--cn`       | 证书通用名称       | `localhost` |
| `--san`      | DNS 或 IP 地址列表 | 无额外指定  |
| `--days`     | 证书有效天数       | `365`       |
| `--key-type` | 私钥类型           | `ec256`     |
| `--out`      | 文件输出目录       | 当前目录    |

支持的密钥算法：

- `ec256`：ECDSA P-256，默认。
- `ec384`：ECDSA P-384。
- `ed25519`：Ed25519。

生成结果：

```shell
certs/
├── cert.pem    # X.509 证书
└── key.pem     # 私钥
```

注意：生成的是自签名证书，不会自动被系统或浏览器信任，也不会自动安装到系统信任库。私钥文件应限制访问权限，例如 `chmod 600 certs/key.pem`。

### 8. 生成证书签名请求：`csr`

用于向证书颁发机构（CA）申请证书。

```shell
sslx csr \
  --cn example.com \
  --san "example.com,api.example.com" \
  --key-type ec256 \
  --out ./certs
```

生成 `csr.pem` 和 `key.pem`，将 CSR 提交给 CA 签发正式证书。

### 9. 证书格式转换与提取：`convert`、`extract`

```shell
# PEM → DER
sslx convert cert.pem --to der

# DER → PEM
sslx convert cert.der --to pem

# PKCS12 → PEM
sslx convert bundle.p12 --to pem --password "示例密码"

# 从 PKCS12 提取证书
sslx extract bundle.p12 \
  --password "示例密码" \
  --out ./certs
```

源码中，PKCS12 转 PEM 可以导出证书，但不导出私钥；`extract` 可以识别私钥的存在，却尚不能把 PKCS8 私钥实际提取为文件。PEM 转 PKCS12 的实现也尚未完成。

因此，涉及 `.p12`、`.pfx` 私钥导入导出时，暂时仍应使用 OpenSSL 等成熟工具。 

### 10. 自动识别证书或 JWT：`decode`

```shell
# 识别未知文件类型
sslx decode mystery.pem

# 解码 JWT
sslx decode "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMifQ.signature"

# 从标准输入解码（主分支 v0.4.0）
cat token.txt | sslx decode -
```

支持识别 PEM/DER 证书、私钥、公钥、CSR、JWT。

JWT 解码会展示 Header、Payload 和有效期（如果包含 `exp`），但不验证 JWT 签名。生产 Token 不建议直接作为命令参数，避免进入 Shell 历史记录。

## 五、通用参数与自动化

源码中还定义了这些参数：

```shell
# 输出 JSON
sslx grade example.com --json

# 禁用终端颜色
sslx inspect cert.pem --no-color

# 详细输出
sslx inspect cert.pem --verbose

# 自定义 TLS 超时时间
sslx connect example.com --timeout 5

# 指定 SNI 和 ALPN
sslx connect example.com:8443 \
  --sni example.com \
  --alpn h2,http/1.1

# 跳过服务器证书验证，仅用于排障
sslx connect example.com --insecure
```

其中 `--json`、`--verbose`、`--no-color` 为全局参数。

### 退出码

官方使用手册给出的退出码如下：

| 退出码 | 官方文档含义         |
| ------ | -------------------- |
| `0`    | 执行成功             |
| `1`    | 证书过期或接近过期   |
| `3`    | 证书链不可信或不完整 |
| `4`    | 连接失败             |
| `5`    | 文件格式错误         |
| `10`   | 参数或一般错误       |

不过，源码实际实现并不完全统一，例如部分连接错误通过通用错误处理返回 `10`。因此自动化场景建议先按非零状态统一处理失败，再结合 JSON 内容区分原因。

## 六、生产环境使用示例

假设需要对部署在 Nginx 上的应用进行 HTTPS 巡检：

```shell
#!/usr/bin/env bash
set -euo pipefail

HOSTS=(
  api.example.com
  admin.example.com
  www.example.com
)

# 1. 证书有效期检查
if sslx expiry "${HOSTS[@]}"; then
  echo "Certificate expiry check passed"
else
  echo "Certificate expiry check failed"
  exit 1
fi

# 2. TLS 配置评级
for host in "${HOSTS[@]}"; do
  sslx grade "$host" --json |
    jq '{host, grade, score, findings}'
done
```

可以把这段脚本接入 Jenkins Pipeline 或定时巡检任务。需要注意 `expiry` 本身只按 7 天阈值返回失败，而非 30 天；若需 30 天提前预警，应读取 JSON 中的 `days_remaining` 自行判断。

## 七、源码核对发现的重要限制

这部分是实际使用前最值得了解的。

| 能力                | 源码实际情况                                                 | 建议                                 |
| ------------------- | ------------------------------------------------------------ | ------------------------------------ |
| `grade` 安全评级    | 连接时跳过 CA 验证，证书链完整性检查主要依据链长度           | 用于快速诊断，不作为正式安全审计结论 |
| `verify` 证书验证   | 当前实现主要检查有效期及 Issuer/Subject 名称匹配，没有完成证书链的密码学签名验证 | 不可作为生产信任链验证依据           |
| `extract` 提取私钥  | 能检测 PKCS12 私钥，但暂时无法真正导出                       | 使用 OpenSSL                         |
| `convert` 转 PKCS12 | PEM → PKCS12 尚未实现                                        | 使用 OpenSSL                         |
| `decode` 解码 JWT   | 读取 Header/Payload，不验证签名                              | 不用于认证判断                       |
| 自签名证书          | 不配置系统信任                                               | 需要受信任的本地证书时用 mkcert      |

以上根据主分支源码核对，尤其是 `cert/chain.rs`、`commands/grade.rs` 和 `commands/convert.rs`，属于比 README 更准确的实现限制。

版本差异： 截至本次查看，GitHub Releases 显示最新发布版为 `v0.3.1`，但 `main` 分支的 `Cargo.toml` 已为 `0.4.0`。例如标准输入支持属于 0.4.0 的更新，不能默认认为现有发布版已经包含该特性。

## 八、与其他工具怎么选？

| 工具     | 定位                     | 适用场景                               |
| -------- | ------------------------ | -------------------------------------- |
| sslx     | 简洁的 TLS 证书诊断工具  | 查看证书、有效期检查、快速 TLS 评级    |
| OpenSSL  | 完整的密码学和证书工具集 | 正式证书链验证、私钥处理、复杂格式转换 |
| mkcert   | 本地可信 HTTPS 证书生成  | 本地 Web、Spring Boot HTTPS 开发       |
| step-cli | PKI 与 CA 管理           | 内部 CA、证书签发、企业 PKI            |

## 九、最终建议

对于常见的 Java 后端开发、Nginx 部署和服务器维护，优先掌握下面六条命令就足够了：

```shell
sslx grade example.com
sslx connect example.com
sslx expiry example.com api.example.com
sslx inspect cert.pem
sslx match cert.pem key.pem
sslx generate --cn localhost
```

sslx 最适合作为轻量级证书巡检和日常排障工具，而不是全面替代 OpenSSL 的证书安全工具。 它的命令设计很实用，但当前版本部分实现尚不完善，正式证书校验、PKCS12 私钥处理和生产安全审计仍应依赖成熟工具。