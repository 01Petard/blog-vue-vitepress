此文章收到了该教程的影响，在此先感谢前人的总结和实践

> [SpringBoot打包部署-Docker + Dockerfile +Jenkins +Maven + Git流水线工作](https://wwvh.lanzouu.com/iW4h9321reud)
# Ubuntu20.04.6部署Jenkins 2.516.1（推荐）

> 对于前后端项目的自动化构建，我给出了两种理解，一种是对于小型单体项目，另一种是大型的微服务项目。小型项目可以用一种简单的方式来维护，但是大型项目则必须通过K8S、Rancher等等工具来维护。
>
> 在Jenkins未面世前，我的理解是通过GitLab的WebHook触发一个部署在服务器上的接口，然后让接口调用被放置在服务器上放的小脚本，让这个脚本完成代码拉取、打包构建和服务部署，技术选型上可以这样实现：在服务端用node写一个express服务，然后用pm2来管理这个服务，这个express服务调用一个`update.sh`，服务器上提前部署好git账号、maven、java、node等等环境，然后这个脚本就实现代码拉取、应用构建，再用ps和nohup将原本的服务杀掉，上新的服务。这样一个闭环就好了。
>
> 但是这样就很好了吗？并不是，现在我们发现每次更新代码后，都需要去服务器上运行一下`sh update.sh`，很麻烦是吧，有的时候忘记拉取了，别人还以为我们没做。所以如何实现每次代码推送就完成服务部署就演变成了后来的`CICD`课题的任务，经历了多年的发展，现如今这已经成为了`DevOps`的一部分……

随着用户对于软件的交付提出更多的要求，开发疲于应对重复的集成和繁琐的小细节修改，于是自动化构建工具横空出世，简化了中间的步骤，接下来，我记录一下在Ubuntu20.04.6机器上部署基于JDK17的Jenkins 2.516.1的过程。

**首先需要强调，Jenkins一直在追随JDK的前沿版本，这对于万年只用JDK8的团队来说是灾难，那该怎么办呢？其实也没问题，下载一个JDK17或21，然后不将其设置为JAVA_HOME，专门给Jenkins用就行了。**

**需要注意的是，我部署的时候Jenkins 2.516.1已经提示JDK17快被淘汰了，因此最好直接上JDK21。**

**总结一下我们的需求：**

> ✅ 在 Ubuntu 上安装 Jenkins（兼容 JDK17 的高版本）
> ✅ 系统继续使用默认的 JDK8（不改环境变量）
> ✅ Jenkins 独立使用 JDK17 启动
> ✅ 不用 Docker，原生部署

**最终效果：系统 Java 版本是 JDK8，用 `java -version` 依旧输出 1.8， 但 Jenkins 启动时使用的是 JDK17，不冲突、不污染。**

## 软件安装、系统环境配置

### 卸载当前 Jenkins 版本

```shell
# 停止Jenkins服务（若已启动）
sudo systemctl stop jenkins

# 卸载Jenkins（保留配置文件，可选）
sudo apt purge jenkins  # 彻底卸载（删除配置）
# 或 sudo apt remove jenkins  # 仅卸载程序，保留配置

# 清理残留文件
sudo rm -rf /var/lib/jenkins /etc/jenkins /usr/share/jenkins
```

### 保留现有 JDK8，安装 JDK17（不修改默认）

查看Java目录（可选）

```shell
echo $JAVA_HOME
```

```shell
sudo apt update
```

```bash
sudo apt install openjdk-17-jdk -y
```

**确认 JDK17 安装成功：**

```bash
/usr/lib/jvm/java-17-openjdk-amd64/bin/java -version
```

**不要运行 `sudo update-alternatives --config java`，保持默认 JDK8 不变。**

### 下载 Jenkins 最新 LTS（JDK17+ 兼容）

Jenkins LTS 新版本默认支持 JDK17，推荐使用 `.war` 方式部署，最灵活。

```bash
wget https://get.jenkins.io/war-stable/latest/jenkins.war -O ~/jenkins.war
```

### 编写 Jenkins 启动脚本（指定用 JDK17）

新建启动脚本：`~/start-jenkins.sh`

修改启动Jenkins的JDK版本为17，同时修改Jenkins的端口为38080，防止占用8080端口

```bash
#!/bin/bash

# 设置 Jenkins 专用 JAVA 环境（JDK17）
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
export PATH=$JAVA_HOME/bin:$PATH

# 可选：打印当前 Java 版本（确认非 JDK8）
echo "Jenkins 用的 Java 版本："
java -version

# 启动 Jenkins
java -jar ~/jenkins.war --httpPort=38080
```

赋予执行权限：

```bash
chmod +x ~/start-jenkins.sh
```

> **修改默认端口（可选）**
>
> 如果 8080 端口需要保留给其他程序使用，可以修改 Jenkins 的默认端口：
>
> ```bash
> # 编辑配置文件
> sudo nano /etc/default/jenkins
> 
> # 设置JDK 8路径（使用你实际的路径）
> JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
> 
> # 设置端口（如38080）
> HTTP_PORT=38080
> ```
>
> **检查新端口是否被占用（可选）**
>
> ```shell
> # 检查38080端口是否被占用
> sudo lsof -i :38080
> # 或
> sudo netstat -tulpn | grep 38080
> ```

### 启动 Jenkins

```bash
./start-jenkins.sh
```

默认会监听 `http://localhost:38080`

首次安装时 Jenkins 会提示你用 `admin` 密码登录：

```bash
cat ~/.jenkins/secrets/initialAdminPassword
```

### 设置为系统服务（必做）

你可以让 Jenkins 以系统服务启动，并显式使用 JDK17。

创建服务配置：

```bash
sudo nano /etc/systemd/system/jenkins.service
```

内容如下：

```ini
[Unit]
Description=Jenkins Daemon
After=network.target

[Service]
Type=simple
User=text
WorkingDirectory=/home/text
ExecStart=/usr/lib/jvm/java-17-openjdk-amd64/bin/java -jar /home/text/jenkins.war --httpPort=38080
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

启用服务：

```bash
sudo systemctl daemon-reexec
sudo systemctl daemon-reload
sudo systemctl enable jenkins
sudo systemctl start jenkins
```

### 最终验证

| 命令                     | 输出               |
| ------------------------ | ------------------ |
| `java -version`          | 是 JDK8 ✔️          |
| `ps aux | grep jenkins`  | Jenkins进程信息✔️   |
| `http://localhost:38080` | 能进入开 Jenkins ✔️ |

### 附：如果要升级 Jenkins 到最新版？

```bash
# 替换 war 包即可，不影响配置
wget https://get.jenkins.io/war-stable/latest/jenkins.war -O ~/jenkins.war
```

## Jenkins服务配置

###  启动/重启

```shell
sudo systemctl start jenkins
```

```shell
sudo systemctl restart jenkins
```

### 关闭

```shell
sudo systemctl stop jenkins
```

### 配置插件镜像（推荐）

**创建 / 修改插件源配置文件**：

```shell
# 进入Jenkins插件目录
sudo mkdir -p /var/lib/jenkins/hudson.model.UpdateCenter.xml
sudo nano /var/lib/jenkins/hudson.model.UpdateCenter.xml
```

**替换为华为插件镜像源**：

```shell
<?xml version='1.1' encoding='UTF-8'?>
<sites>
  <site>
    <id>default</id>
    <url>https://mirrors.huaweicloud.com/jenkins/updates/update-center.json</url>
  </site>
</sites>
```

或者自己去`[Advanced settings - Plugins - Jenkins](http://10.0.0.93:38080/manage/pluginManager/advanced)`这样的目录下配置路径：

```
https://mirrors.huaweicloud.com/jenkins/updates/update-center.json
```

## 在Jenkins中配置流水线

> 不同公司的CICD设计各有千秋，因此我仅代表当前的思路进行配置。目的仅是简化测试服务器的运维负担。

### 配置GitLab凭据

### 配置JDK、Git、Maven（可选）

### 创建流水线

1. 下载GitLab插件
2. 配置触发器
3. 配置流水线

### 在GitLab中配置WebHook

1. 将Jenkins中的WebHook链接复制的GitLab中
2. 选择触发的事件
3. 保存并测试一下推送事件

###  赋予命令行权限

```shell
sudo visudo
```

具体就是jenkins的权限，以及启停项目进程的权限（主要是针对后端，前端或许可以不用？）

```
jenkins ALL=(ALL) NOPASSWD: ALL
text ALL=NOPASSWD: /bin/systemctl restart baer-mes.service, /bin/systemctl stop baer-mes.service, /bin/systemctl start baer-mes.service
```

## 创建项目所需文件

需要在项目根目录下创建文件`Jenkinsfile`和`update.sh`：

### 后端

后端会比前端麻烦，因为实测发现Jenkins会在流水线完成后，将子进程杀死，这会导致如果你用`nohup`、`setsid`等后台执行命令部署服务失败，而且很恶心的是你在Jenkins的Pipleline Overview上还看不到哪里有异常。最后，我经过查阅资料，发现可以用`systemctl`命令管理服务的方式来启动，因为`systemctl`是系统级的，所以不受影响。

#### 创建服务

```shell
sudo nano /etc/systemd/system/baer-mes.service
```

```shell
[Unit]
Description=baer-mes

[Service]
User=text
Group=text
WorkingDirectory=/var/www/baer-mes
ExecStart=java -Xmx1g -Xms1g -XX:+UseG1GC -jar /var/www/baer-mes/target/baer-mes-1.0.jar
Restart=no
SuccessExitStatus=143

[Install]
WantedBy=multi-user.target
```

```shell
sudo systemctl daemon-reload
```

> 可以测试一下：
>
> ```shell
> sudo systemctl restart baer-mes.service
> ```

#### Jenkinsfile

```javascript
// Git 凭证 ID
def git_auth = "5ff366a3-5726-445e-842e-1a9533e58ab9"
// Git 仓库地址
def git_url = "http://10.0.0.177/informatization/backend/baer-mes"

node {
    stage('拉取代码') {
        checkout([$class: 'GitSCM',
            branches: [[name: "*/dev"]],
            doGenerateSubmoduleConfigurations: false,
            extensions: [],
            submoduleCfg: [],
            userRemoteConfigs: [[credentialsId: "${git_auth}", url: "${git_url}"]]
        ])
    }

    stage('远程部署') {
        sh "sh /var/www/baer-mes/update.sh"
    }
}
```

#### update.sh

需要注意的是，如果你是手动部署，则可以将`systemctl restart ...`改为：

> ```shell
> ps -ef | grep java | grep baer-mes | grep -v grep | awk '{print $2}' | xargs kill -15
> ```

```shell
echo "执行: nohup java -Xmx1g -Xms1g -XX:+UseG1GC -jar ${JAR_PATH} > ${STARTUP_LOG} 2>&1 &"
nohup java -Xmx1g -Xms1g -XX:+UseG1GC -jar "${JAR_PATH}" > "${STARTUP_LOG}" 2>&1 &
或
echo "执行: setsid java -Xmx1g -Xms1g -XX:+UseG1GC -jar ${JAR_PATH} > ${STARTUP_LOG} 2>&1 &"
setsid java -Xmx1g -Xms1g -XX:+UseG1GC -jar "${JAR_PATH}" > "${STARTUP_LOG}" 2>&1 &
```

```shell
#!/bin/sh

# POSIX 兼容的自动部署脚本
# 兼容 sh、bash、zsh

# 应用配置
APP_NAME="baer-mes"
PROJECT_DIR="/var/www/${APP_NAME}"
JAR_NAME="${APP_NAME}-1.0.jar"
JAR_PATH="${PROJECT_DIR}/target/${JAR_NAME}"
APP_PORT=18099
LOG_DIR="${PROJECT_DIR}/logs"
STARTUP_LOG="${LOG_DIR}/startup.log"
HEALTH_CHECK_URL="http://localhost:${APP_PORT}/actuator/health"
MAX_WAIT_STOP=30
START_RETRY=10
RETRY_INTERVAL=3

# 彩色输出（兼容终端）
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m'

mkdir -p "${LOG_DIR}"
echo "${YELLOW}===== 开始部署 =====${NC}"
echo "项目目录: ${PROJECT_DIR}"
echo "日志路径: ${STARTUP_LOG}"
echo ""

# 步骤1：拉取代码
echo "${YELLOW}--- 步骤1: 拉取最新代码 ---${NC}"
cd "${PROJECT_DIR}" || {
  echo "${RED}错误：无法进入项目目录 ${PROJECT_DIR}${NC}"
  exit 1
}
git pull || {
  echo "${RED}错误：git pull 失败${NC}"
  exit 1
}
echo "${GREEN}代码更新成功${NC}"
echo ""

# 步骤2：构建项目
echo "${YELLOW}--- 步骤2: Maven 构建 (dev环境) ---${NC}"
mvn clean package -Pdev || {
  echo "${RED}错误：Maven 构建失败${NC}"
  exit 1
}
echo "${GREEN}构建完成${NC}"
echo ""

# 步骤3：关闭旧进程
echo "${YELLOW}--- 步骤3: 停止旧实例 ---${NC}"
PID=$(ps -ef | grep java | grep "${APP_NAME}" | grep -v grep | awk '{print $2}')
if [ -n "$PID" ]; then
  echo "检测到旧进程 PID: $PID，尝试优雅终止..."
  kill -15 "$PID"
  waited=0
  while kill -0 "$PID" 2>/dev/null; do
    if [ "$waited" -ge "$MAX_WAIT_STOP" ]; then
      echo "超时，强制终止..."
      kill -9 "$PID"
      break
    fi
    sleep 2
    waited=$((waited + 2))
    echo "等待旧进程退出: ${waited}s..."
  done
  echo "${GREEN}旧进程已停止${NC}"
else
  echo "${GREEN}无旧进程运行${NC}"
fi
echo ""

# 步骤4：启动新进程
echo "${YELLOW}--- 步骤4: 启动新应用 ---${NC}"
if [ ! -f "$JAR_PATH" ]; then
  echo "${RED}错误：找不到 JAR 包: ${JAR_PATH}${NC}"
  exit 1
fi
echo "执行: sudo systemctl restart baer-mes.service"
sudo systemctl restart baer-mes.service
echo "应用启动中，日志输出到: ${STARTUP_LOG}"
sleep 2
echo ""

# 步骤5：验证端口
echo "${YELLOW}--- 步骤5: 启动验证 ---${NC}"
success=0
i=1
while [ "$i" -le "$START_RETRY" ]; do
  if ss -tln 2>/dev/null | grep ":${APP_PORT} " >/dev/null; then
    PID=$(ps -ef | grep java | grep "${APP_NAME}" | grep -v grep | awk '{print $2}')
    echo "${GREEN}启动成功，端口 ${APP_PORT} 已监听，PID: ${PID}${NC}"
    success=1
    break
  fi
  echo "第 ${i} 次检测：端口 ${APP_PORT} 未就绪，等待 ${RETRY_INTERVAL}s..."
  sleep "$RETRY_INTERVAL"
  i=$((i + 1))
done

# 步骤6：健康检查（可选）
if [ "$success" -eq 0 ]; then
  echo "尝试通过健康接口验证..."
  i=1
  while [ "$i" -le "$START_RETRY" ]; do
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "${HEALTH_CHECK_URL}")
    if [ "$HTTP_CODE" -eq 200 ]; then
      PID=$(ps -ef | grep java | grep "${APP_NAME}" | grep -v grep | awk '{print $2}')
      echo "${GREEN}启动成功，健康接口返回正常，PID: ${PID}${NC}"
      success=1
      break
    fi
    sleep "$RETRY_INTERVAL"
    i=$((i + 1))
  done
fi

if [ "$success" -eq 0 ]; then
  echo "${RED}错误：应用未成功启动，请检查日志${NC}"
  exit 1
fi

echo ""
echo "${YELLOW}===== 部署完成 =====${NC}"
```

### 前端

前端就比较简单了，只要执行完nodejs的打包命令，把dist构建完毕 就行了。

#### Jenkinsfile

```javascript
// Git 凭证 ID
def git_auth = "a58a62e6-8bb4-4b1f-b6d7-86a7c4a3154d"
// Git 仓库地址
def git_url = "http://10.0.0.177/informatization/front/baer_workinghours"

node {
    stage('拉取代码') {
        checkout([$class: 'GitSCM',
            branches: [[name: "*/master"]],
            doGenerateSubmoduleConfigurations: false,
            extensions: [],
            submoduleCfg: [],
            userRemoteConfigs: [[credentialsId: "${git_auth}", url: "${git_url}"]]
        ])
    }

    stage('远程部署') {
        // 运行服务端已有的 update.sh 脚本
        sh "sh /var/www/baer_workinghours/update.sh"
    }
}

```

#### update.sh

```shell
#!/bin/bash

# 前端项目自动化构建脚本
# 适用于 /var/www/baer_workinghours/ 目录

# 定义颜色变量，用于日志输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

# 定义项目目录
PROJECT_DIR="/var/www/baer_workinghours"

echo -e "${YELLOW}===== 开始前端项目构建流程 =====${NC}"
echo -e "${YELLOW}项目目录: ${PROJECT_DIR}${NC}"
echo ""

# 步骤1: 切换到项目目录
echo -e "${YELLOW}--- 步骤1: 切换到项目目录 ---${NC}"
cd "$PROJECT_DIR"
if [ $? -ne 0 ]; then
    echo -e "${RED}错误: 无法切换到项目目录，请检查路径是否正确${NC}"
    exit 1
fi
echo -e "${GREEN}成功切换到项目目录${NC}"
echo ""

# 步骤2: 拉取最新代码
echo -e "${YELLOW}--- 步骤2: 拉取最新代码 ---${NC}"
echo "执行命令: git pull"
git pull
if [ $? -ne 0 ]; then
    echo -e "${RED}错误: git pull 执行失败，请检查Git配置和网络连接${NC}"
    exit 1
fi
echo -e "${GREEN}代码拉取完成${NC}"
echo ""

# 步骤3: 切换Node版本
echo -e "${YELLOW}--- 步骤3: 切换Node版本到22.12.0 ---${NC}"

# 确保 nvm 可用
export NVM_DIR="$HOME/.nvm"
if [ -s "$NVM_DIR/nvm.sh" ]; then
    . "$NVM_DIR/nvm.sh"
else
    echo -e "${RED}错误: 未找到 nvm.sh，请确认nvm是否正确安装在 $NVM_DIR${NC}"
    exit 1
fi

echo "执行命令: nvm use 22.12.0"
nvm use 22.12.0
if [ $? -ne 0 ]; then
    echo -e "${RED}错误: nvm use 执行失败，Node.js 22.12.0 可能未安装${NC}"
    exit 1
fi

NODE_VERSION=$(node -v)
echo -e "${GREEN}当前Node版本: ${NODE_VERSION}${NC}"
echo ""

# 步骤4: 安装依赖
echo -e "${YELLOW}--- 步骤4: 安装项目依赖 ---${NC}"
echo "执行命令: pnpm i"
pnpm i
if [ $? -ne 0 ]; then
    echo -e "${RED}错误: pnpm i 执行失败，请检查pnpm安装和依赖配置${NC}"
    exit 1
fi
echo -e "${GREEN}依赖安装完成${NC}"
echo ""

# 步骤5: 执行打包
echo -e "${YELLOW}--- 步骤5: 打包项目 (测试环境) ---${NC}"
echo "执行命令: pnpm run build:test"
pnpm run build:test
if [ $? -ne 0 ]; then
    echo -e "${RED}错误: 项目打包失败，请检查构建配置和代码错误${NC}"
    exit 1
fi

# 打包成功提示
BUILD_DIR="${PROJECT_DIR}/dist"
if [ -d "$BUILD_DIR" ]; then
    FILE_COUNT=$(find "$BUILD_DIR" -type f | wc -l)
    echo ""
    echo -e "${GREEN}===== 项目构建成功 =====${NC}"
    echo -e "${GREEN}打包文件已生成到: ${BUILD_DIR}${NC}"
    echo -e "${GREEN}打包文件数量: ${FILE_COUNT} 个${NC}"
    echo -e "${GREEN}请检查打包结果并部署${NC}"
else
    echo -e "${RED}警告: 未找到打包目录，可能打包过程存在隐性错误${NC}"
fi

echo ""
echo -e "${YELLOW}===== 构建流程结束 =====${NC}"
```

## 测试是否实现

向Gitlab推送代码，在Jenkins中查看流水线执行与应用变更情况。

# Docker部署Jenkins（难度高，已弃坑）

```shell
sudo docker run -d --name jenkins -p 38080:8080 -p 50000:50000 -v jenkins_home:/var/jenkins_home jenkins/jenkins:lts
```

编辑 `/etc/docker/daemon.json`，写入：

```shell
{
  "registry-mirrors": [
    "https://docker.1ms.run",
    "https://docker.1panel.live",
    "https://docker.ketches.cn"
  ],
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  },
  "dns": ["8.8.8.8", "114.114.114.114"]
}
```

保存后重启 Docker：

```shell
sudo systemctl restart docker
```

确认宿主机本身能访问该 URL

```shell
sudo docker exec -it jenkins bash
curl -I https://mirrors.huaweicloud.com/jenkins/updates/update-center.json
```

如果重启失败了，自己检查一下：

```shell
sudo journalctl -u docker.service -b --no-pager | tail -40
```

------

## 1. 首次访问 & 解锁 Jenkins

- 浏览器访问：`http://10.0.0.93:38080`
- 页面会提示输入**初始管理员密码**，位置在容器内：

```bash
/var/jenkins_home/secrets/initialAdminPassword
```

------

## 2. 如何进入 Jenkins 容器查看初始密码

用 Docker exec 进入容器：

```bash
docker exec -it jenkins bash
```

然后：

```bash
cat /var/jenkins_home/secrets/initialAdminPassword
```

拿到密码，浏览器输入完成解锁。

------

## 3. 解锁后流程

- 按向导安装推荐插件（或自定义选择）
- 创建第一个管理员用户（强烈建议自己新建账号）
- 完成配置，进入 Jenkins 主界面

------

## 4. 修改 Jenkins 配置

- 配置文件一般在容器里 `/var/jenkins_home`
- 一般不直接改文件，而是通过 UI 设置
- 但你也可以进入容器编辑配置：

```bash
docker exec -it jenkins bash
vi /var/jenkins_home/config.xml
```

改完后，重启 Jenkins：

```bash
docker restart jenkins
```

------

## 5. 数据备份 & 持久化

- 你启动容器时已经挂载了 `jenkins_home` 卷，数据会保存在宿主机的 Docker 卷里
- 你可以通过以下命令查宿主机卷路径：

```bash
docker volume inspect jenkins_home
```

- 定期备份这里的内容，避免数据丢失

------

## 6. 后续建议

- 配置国内插件更新源，避免插件慢或下载失败
- 配置系统安全，比如关闭匿名访问，配置代理等
- 关注 Jenkins 容器日志查看状态：

```bash
docker logs -f jenkins
```

用户名和密码（随你自己配）

```
baer
1111
```

期间遇到了一个问题，发现 Folders 这个插件没有下载成功，导致间接依赖的插件也运行不正常，于是我就手动去下载了一下：[Folders | Jenkins plugin](https://plugins.jenkins.io/cloudbees-folder/) -> [Folders | Jenkins plugin](https://plugins.jenkins.io/cloudbees-folder/releases/)，并将下载好的插件安装包`cloudbees-folder.hpi`上传到jenkins中，并手动重启，这样就一切正常了

```shell
journalctl -xe | grep jenkins
```

```shell
sudo journalctl -u jenkins.service -b --no-pager | tail -40
```

# Ubuntu20.04.6部署Jenkins 2.346.3（避雷）

### 卸载当前 Jenkins 版本

```shell
# 停止Jenkins服务（若已启动）
sudo systemctl stop jenkins

# 卸载Jenkins（保留配置文件，可选）
sudo apt purge jenkins  # 彻底卸载（删除配置）
# 或 sudo apt remove jenkins  # 仅卸载程序，保留配置

# 清理残留文件
sudo rm -rf /var/lib/jenkins /etc/jenkins /usr/share/jenkins
```

### 下载并安装 Jenkins 2.346.3（完全兼容 JDK 8）

```shell
# 1. 下载最新的Jenkins LTS版本（当前最新LTS版本为2.440.1，若有更新可替换版本号）
wget https://get.jenkins.io/debian-stable/jenkins_2.361.4_all.deb

# 2. 安装DEB包（可能会提示依赖缺失）
sudo dpkg -i jenkins_2.361.4_all.deb

# 3. 自动修复依赖问题
sudo apt -f install -y
```