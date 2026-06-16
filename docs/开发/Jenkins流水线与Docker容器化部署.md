# Jenkins流水线与Docker容器化部署

## 1. 核心结论

这类 Jenkinsfile 本质上是一套 CI/CD 自动化脚本，完成以下链路：

```text
GitLab 拉取代码
  -> Maven 编译打包
  -> Docker 构建镜像
  -> 推送到镜像仓库
  -> Jenkins 通过 SSH/Ansible 操作目标服务器
  -> 目标服务器拉取新镜像并重启容器
```

服务运行服务器不会主动感知新镜像。真正触发部署的是 Jenkins，Jenkins 通过 SSH 私钥和 Ansible 在远程服务器上执行 `docker pull`、`docker rm`、`docker run` 等命令。

## 2. 三类服务器职责

| 服务器 | 职责 | 关键能力 |
| --- | --- | --- |
| GitLab 服务器 | 保存源码、Jenkinsfile、Dockerfile、部署脚本 | 提供代码访问凭据 |
| Jenkins 服务器或 Agent | 拉代码、编译、构建镜像、推送镜像、触发部署 | JDK、Maven、Docker CLI、Jenkins Credentials、Ansible |
| 服务运行服务器 | 运行真实业务容器 | Docker Runtime、可访问镜像仓库、允许 Jenkins SSH 登录 |

关键点：

- Jenkins 是发布控制中心。
- GitLab 只负责代码托管，不负责部署。
- 服务运行服务器一般是被 Jenkins 远程控制，不是主动监听镜像仓库。

## 3. 生产与测试流水线差异

| 项目 | 生产环境 | 测试环境 |
| --- | --- | --- |
| 默认分支 | `main` | `test` |
| 镜像标签 | `prod_1.0.$BUILD_NUMBER` | `test_1.0.$BUILD_NUMBER` |
| Spring Profile | `prod` | `test` |
| 目标主机组 | `ansible prod -i deploy/hosts` | `ansible test -i deploy/hosts` |
| 部署配置 | 依赖宿主机、配置中心或环境变量 | 脚本内显式注入 DB、Redis 等配置 |
| SSH 凭据 | 生产凭据 | 测试凭据 |

两份 Jenkinsfile 结构基本一致，区别主要是分支、镜像标签、环境变量、部署目标和凭据隔离。

## 4. Jenkins 流水线阶段说明

### 4.1 Initialize

初始化构建环境，输出调试信息，确认 Maven、JDK 等工具链可用。

### 4.2 Pull Code from GitLab

Jenkins 使用 Git 凭据从 GitLab 拉取指定分支代码。

```text
Jenkins Credentials -> GitLab 私有仓库 -> Jenkins 工作目录
```

### 4.3 Build Docker Image and Push

典型命令逻辑：

```shell
mvn -B -DskipTests clean package
cp target/*.jar mpd-bes.jar
docker build -t registry/airdoc/mpd-bes:tag .
docker login registry
docker push registry/airdoc/mpd-bes:tag
```

前提条件：

- Jenkins Agent 已安装 JDK 17。
- Jenkins Agent 已安装 Maven。
- Jenkins Agent 已安装 Docker CLI。
- Jenkins Agent 能访问 Docker daemon。
- Jenkins Agent 能访问私有镜像仓库。

### 4.4 Deploy

部署阶段通过 `sshagent` 加载 Jenkins 中保存的 SSH 私钥，再由 Ansible 登录远程服务器执行命令。

典型逻辑：

```shell
ansible prod -i deploy/hosts -m shell -a "
  docker login registry &&
  docker pull registry/airdoc/mpd-bes:tag &&
  docker rm -f mpd-bes || true &&
  docker run -d --name mpd-bes --network host registry/airdoc/mpd-bes:tag
"
```

这里的关键不是 Jenkins 本机运行服务，而是 Jenkins 远程控制服务服务器。

### 4.5 Test

当前脚本里的 `Test` 阶段只是占位，建议替换为真实校验：

- 容器存活检查。
- `/actuator/health` 或 `/health` 健康检查。
- 核心 API 冒烟测试。
- 日志关键错误扫描。

### 4.6 Post Actions

构建成功或失败后执行收尾动作，可用于日志输出、消息通知、审计记录。

## 5. 为什么 Jenkins 可以完成打包和部署

Jenkins 能完成这件事，依赖四类能力：

| 能力 | 来源 | 用途 |
| --- | --- | --- |
| 代码访问能力 | GitLab 凭据 | 拉取源码 |
| 构建能力 | JDK、Maven、Docker | 编译、打包、构建镜像 |
| 镜像仓库访问能力 | Docker Registry 凭据 | 推送和拉取镜像 |
| 服务器远程控制能力 | SSH 私钥、Ansible | 在服务服务器执行部署命令 |

本质逻辑：

```text
Jenkins 拥有代码仓库钥匙
Jenkins 拥有镜像仓库钥匙
Jenkins 拥有服务器 SSH 钥匙
所以 Jenkins 能串起完整发布链路
```

## 6. 本地镜像推送到 Docker Hub

### 6.1 构建镜像

```shell
docker build -t my-flask-app .
```

### 6.2 本地测试

```shell
docker run -d -p 5000:5000 --name test-app my-flask-app
curl http://localhost:5000
docker stop test-app
docker rm test-app
```

### 6.3 登录 Docker Hub

```shell
docker login
```

如果启用双因素认证，密码位置应填写 Docker Hub Personal Access Token。

### 6.4 打标签

Docker Hub 镜像名格式：

```text
<dockerhub-username>/<repo-name>:<tag>
```

示例：

```shell
docker tag my-flask-app alice/my-flask-app:v1
```

### 6.5 推送镜像

```shell
docker push alice/my-flask-app:v1
```

## 7. 服务器拉取并运行 Docker Hub 镜像

### 7.1 登录服务器

```shell
ssh user@your-server-ip
```

### 7.2 确认 Docker 可用

```shell
docker --version
```

Ubuntu 安装示例：

```shell
sudo apt update
sudo apt install docker.io -y
sudo usermod -aG docker $USER
```

重新登录后，用户组变更才会生效。

### 7.3 拉取镜像

```shell
docker pull alice/my-flask-app:v1
```

### 7.4 运行容器

```shell
docker run -d -p 5000:5000 --name my-web-app alice/my-flask-app:v1
```

### 7.5 验证服务

```shell
curl http://localhost:5000
```

如果从本地访问服务器：

```shell
curl http://your-server-ip:5000
```

需要确认服务器安全组和防火墙已开放对应端口。

## 8. 当前部署方式的主要问题

当前 `docker rm -f && docker run` 属于停机发布。

风险点：

| 问题 | 影响 |
| --- | --- |
| 强制删除旧容器 | 服务直接中断 |
| 新容器启动失败 | 线上无可用实例 |
| 缺少健康检查 | 容器启动不等于业务可用 |
| 无回滚机制 | 发布失败后恢复慢 |
| 单实例部署 | 没有流量切换空间 |

## 9. 不停机部署方案

### 9.1 单机推荐：Nginx + 双容器

适合单台云服务器或小规模项目。

流程：

```text
启动新容器
  -> 健康检查通过
  -> Nginx upstream 切换到新容器
  -> 停止旧容器
```

优点：

- 成本低。
- 不需要 Kubernetes。
- 适合当前普通 Docker 部署平滑升级。

缺点：

- 需要维护 Nginx 配置或切换脚本。
- 需要服务支持多端口并行运行。

### 9.2 蓝绿部署

准备两套环境：

- Blue：当前线上环境。
- Green：待发布环境。

发布流程：

```text
Green 部署新版本
  -> 验证 Green
  -> 负载均衡或 Nginx 切流到 Green
  -> Blue 保留为回滚环境
```

优点：

- 切换快。
- 回滚简单。

缺点：

- 资源成本更高。

### 9.3 Kubernetes 滚动更新

企业级标准方案。

关键配置：

```yaml
strategy:
  type: RollingUpdate
  rollingUpdate:
    maxUnavailable: 0
    maxSurge: 1
```

还必须配置：

- `readinessProbe`：判断新实例是否可以接流量。
- `livenessProbe`：判断实例是否需要重启。
- `resources`：限制 CPU 和内存。
- `rollback`：发布失败后回滚。

### 9.4 最低成本改造：先启新容器再切换

如果暂时不引入 Nginx 或 K8s，至少不要先删旧容器。

思路：

```shell
docker run -d --name mpd-bes-new -p 8734:8733 your-image

until curl -sf http://127.0.0.1:8734/health; do
  sleep 1
done

# 健康检查通过后再切流量或替换旧容器
docker stop mpd-bes
docker rm mpd-bes
docker rename mpd-bes-new mpd-bes
```

注意：如果没有反向代理或负载均衡，仅靠 `rename` 不能自动切换端口绑定。生产上更推荐 Nginx、Traefik、Docker Compose 或 K8s。

## 10. 推荐落地路径

| 阶段 | 目标 | 实施内容 |
| --- | --- | --- |
| 短期 | 降低发布失败风险 | 增加健康检查、失败回滚、保留旧镜像 |
| 中期 | 单机零停机 | Nginx + 双容器 + 自动切流脚本 |
| 长期 | 标准化发布 | Kubernetes Deployment + Service + Ingress |

短期 Jenkins Deploy 阶段至少补齐：

- `docker pull` 失败即终止。
- 新容器健康检查失败不删除旧容器。
- 保留最近 N 个镜像标签。
- 发布后执行核心 API 冒烟测试。
- 失败时通知企业微信、钉钉或邮件。

