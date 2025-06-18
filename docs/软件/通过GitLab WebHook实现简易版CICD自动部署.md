> 从零开始通过 GitLab WebHook + Node.js 脚本实现简易版的 **CI/CD 自动部署系统**

# 通过 GitLab WebHook 实现简易版 CI/CD 自动部署

本方案基于 GitLab + Node.js，实现后端代码每次 push 自动拉取最新代码并部署，适用于中小型项目的轻量化自动化部署场景。

---

## 🧱 项目环境说明

| 项目             | 配置                                                  |
| ---------------- | ----------------------------------------------------- |
| GitLab 地址      | `http://10.0.0.177/informatization/backend/baer-mes`  |
| 部署服务器       | `10.0.0.93`                                           |
| 服务器环境       | 安装NVM、Node.js（建议22以上LTS版本）、Java （8）环境 |
| WebHook 通信方式 | GitLab ➜ 触发服务器的 Node 服务接口                   |
| 安全校验         | 通过 `X-Gitlab-Token` 校验 Secret                     |

---

## 🧩 整体流程概览

```plaintext
Git Push ➜ GitLab WebHook ➜ Node 接口 ➜ 校验密钥 ➜ 执行 shell 脚本 ➜ 自动部署
```

## 🛠️ Step 1：编写部署脚本

在服务器任意目录下（推荐 Git 仓库外），新建 `deploy.sh`：

```bash
#!/bin/bash

# 后端项目自动化部署脚本
# 应用名: baer-mes

# 定义颜色变量，用于日志输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

# 应用名称和 JAR 包路径
APP_NAME="baer-mes"
PROJECT_DIR="/var/www/${APP_NAME}"
JAR_NAME="${APP_NAME}-1.0.jar"
JAR_PATH="${PROJECT_DIR}/target/${JAR_NAME}"

echo -e "${YELLOW}===== 开始后端项目部署流程 =====${NC}"
echo -e "${YELLOW}项目目录: ${PROJECT_DIR}${NC}"
echo ""

# 步骤1: 拉取最新代码
echo -e "${YELLOW}--- 步骤1: 拉取最新代码 ---${NC}"
cd "$PROJECT_DIR"
if [ $? -ne 0 ]; then
    echo -e "${RED}错误: 无法切换到项目目录 ${PROJECT_DIR}${NC}"
    exit 1
fi

git pull
if [ $? -ne 0 ]; then
    echo -e "${RED}错误: git pull 执行失败，请检查网络或Git配置${NC}"
    exit 1
fi
echo -e "${GREEN}代码更新完成${NC}"
echo ""

# 步骤2: 使用 Maven 打包项目 (dev 环境)
echo -e "${YELLOW}--- 步骤2: 打包项目 (Maven -Pdev) ---${NC}"
mvn clean package -Pdev
if [ $? -ne 0 ]; then
    echo -e "${RED}错误: Maven 打包失败，请检查项目构建配置${NC}"
    exit 1
fi
echo -e "${GREEN}项目打包完成${NC}"
echo ""

# 步骤3: 停止正在运行的应用实例
echo -e "${YELLOW}--- 步骤3: 停止正在运行的实例 ---${NC}"
PID=$(ps -ef | grep java | grep ${APP_NAME} | grep -v grep | awk '{print $2}')
if [ -n "$PID" ]; then
    echo -e "${YELLOW}检测到运行中的实例，PID: $PID，尝试优雅终止...${NC}"
    kill -15 $PID
    sleep 10
else
    echo -e "${GREEN}没有正在运行的实例${NC}"
fi

# 步骤4: 强制清理残留进程（如有）
echo -e "${YELLOW}--- 步骤4: 清理残留进程 ---${NC}"
PID=$(ps -ef | grep java | grep ${APP_NAME} | grep -v grep | awk '{print $2}')
if [ -n "$PID" ]; then
    echo -e "${YELLOW}残留进程仍在运行，执行强制杀进程，PID: $PID${NC}"
    kill -9 $PID
    echo -e "${GREEN}残留进程已清理${NC}"
else
    echo -e "${GREEN}无残留进程${NC}"
fi
echo ""

# 步骤5: 启动新版本应用
echo -e "${YELLOW}--- 步骤5: 启动新版本应用 ---${NC}"
if [ ! -f "$JAR_PATH" ]; then
    echo -e "${RED}错误: 未找到Jar包: ${JAR_PATH}${NC}"
    exit 1
fi

echo "执行命令: nohup java -Xmx3g -Xms3g -XX:+UseG1GC -jar $JAR_PATH &"
nohup java -Xmx3g -Xms3g -XX:+UseG1GC -jar "$JAR_PATH" > /dev/null 2>&1 &
sleep 5

# 步骤6: 验证应用是否启动成功
echo -e "${YELLOW}--- 步骤6: 验证启动结果 ---${NC}"
PID=$(ps -ef | grep java | grep ${APP_NAME} | grep -v grep | awk '{print $2}')
if [ -n "$PID" ]; then
    echo -e "${GREEN}${APP_NAME} 启动成功，PID: $PID${NC}"
else
    echo -e "${RED}错误: ${APP_NAME} 启动失败，请检查日志文件${NC}"
    exit 1
fi

echo ""
echo -e "${YELLOW}===== 部署流程结束 =====${NC}"
```

赋予执行权限：

```bash
chmod +x deploy.sh
```

> 出于全栈考虑，这里提供前端的部署脚本，但以下WebHook配置只针对后端

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

------

## ⚙️ Step 2：搭建接收服务

安装依赖：

```bash
nvm use 22.14.0
npm init -y
pnpm install express
pnpm install iconv-lite
```

创建 `index.js`：

```javascript
const express = require('express');
const { exec, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');
const iconv = require('iconv-lite');

const app = express();
const port = 18097;
const SECRET_TOKEN = 'baer-2024-token';
const DEPLOY_SCRIPT_PATH = '/var/www/baer-mes/deploy.sh';
const LOCK_FILE = '/tmp/baer-mes-deploy.lock';
const LOG_FILE = path.join(os.tmpdir(), 'baer-mes-update.log');

// 配置日志写入
const log = (message) => {
  const timestamp = new Date().toISOString();
  const logLine = `[${timestamp}] ${message}\n`;
  console.log(logLine);
  fs.appendFileSync(LOG_FILE, logLine);
};

// 检查部署脚本是否存在且可执行
try {
  execSync(`test -x ${DEPLOY_SCRIPT_PATH}`);
} catch (error) {
  log(`错误: 部署脚本不存在或不可执行: ${DEPLOY_SCRIPT_PATH}`);
  process.exit(1);
}

app.use(express.json());

app.post('/webhook', (req, res) => {
  // 1. 安全验证
  const token = req.headers['x-gitlab-token'];
  if (token !== SECRET_TOKEN) {
    log('错误: 令牌验证失败');
    return res.status(403).send('Unauthorized');
  }

  // 2. 事件类型验证
  const event = req.headers['x-gitlab-event'];
  if (event !== 'Push Hook') {
    log(`忽略非推送事件: ${event}`);
    return res.status(200).send('Ignored non-push event');
  }

  // 3. 分支验证 (仅部署master分支)
  const ref = req.body.ref;
  if (ref !== 'refs/heads/master') {
    log(`忽略非master分支: ${ref}`);
    return res.status(200).send('Not master branch');
  }

  log('收到GitLab WebHook，开始部署后端服务');

  // 4. 并发部署控制
  if (fs.existsSync(LOCK_FILE)) {
    log('错误: 已有部署任务在执行中');
    return res.status(429).send('Deploy in progress');
  }

  // 创建锁文件
  fs.writeFileSync(LOCK_FILE, 'deploying');

  // 5. 执行部署脚本 (带超时控制)
  let deployTimeout;
  const deployProcess = exec(DEPLOY_SCRIPT_PATH, {
    encoding: 'buffer',       // 重点：输出用 buffer，防止乱码
    timeout: 300000,          // 5分钟超时
    maxBuffer: 1024 * 1024 * 50 // 50MB输出缓冲区
  }, (error, stdout, stderr) => {
    // 清理锁文件
    try {
      fs.unlinkSync(LOCK_FILE);
    } catch (err) {
      log(`清理锁文件失败: ${err.message}`);
    }

    // 把 buffer 按 GBK 解码成 UTF-8
    const outStr = iconv.decode(stdout, 'gbk');
    const errStr = iconv.decode(stderr, 'gbk');

    if (error) {
      log(`部署执行错误: ${error.message}`);
      log(`标准错误输出: ${errStr}`);
      return res.status(500).send(`Deploy failed: ${error.message}`);
    }

    log('部署成功');
    log(`部署输出: ${outStr}`);
    res.status(200).send('Deploy success');
  });

  // 处理超时
  deployTimeout = setTimeout(() => {
    deployProcess.kill('SIGKILL');
    fs.unlinkSync(LOCK_FILE);
    log('错误: 部署超时');
    res.status(504).send('Deploy timeout');
  }, 300000); // 5分钟超时

  // 处理进程异常退出
  deployProcess.on('exit', (code) => {
    clearTimeout(deployTimeout);
    if (code !== 0) {
      log(`部署进程异常退出，退出码: ${code}`);
    }
  });

  deployProcess.on('error', (err) => {
    clearTimeout(deployTimeout);
    log(`部署进程错误: ${err.message}`);
  });
});

app.listen(port, () => {
  log(`WebHook服务启动成功: http://localhost:${port}/webhook`);
  log(`部署脚本路径: ${DEPLOY_SCRIPT_PATH}`);
  log(`日志文件: ${LOG_FILE}`);
});

// 处理程序异常
process.on('uncaughtException', (err) => {
  log(`未捕获的异常: ${err.stack}`);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  log(`未处理的Promise拒绝: ${reason}`);
});
```

启动服务：

```bash
node server.js
```

或通过`pm2`来管理

```shell
pnpm install pm2
pm2 start index.js --name webhook-server
pm2 save
pm2 stop/remove/restart ……
```

## 🌐 Step 3：配置WebHook

1. 打开项目设置 ➜ `Settings > Webhooks`
2. 填写 URL：`http://10.0.0.93:18097/webhook`
3. Secret 令牌填写：`baer-2024-token`（与 Node 服务一致）
4. 触发事件选择：✔ 推送事件（Push Events）
5. 点击【测试】验证连接

> 成功将返回 `部署成功`，否则请查看 GitLab 返回错误及服务器日志排查。

## 🧪 Step 4：测试部署流程

在本地对代码仓库 push 任意提交：

```bash
git add .
git commit -m "测试自动部署"
git push
```

观察服务器终端、负载或其他指标，检查是否运行成功：

## 📒 常见问题排查

| 问题                  | 解决方式                                                   |
| --------------------- | ---------------------------------------------------------- |
| 返回 401 Unauthorized | 没配置或错误配置 Secret 令牌                               |
| 返回 403 secret error | GitLab Token 与 Node 服务配置不一致                        |
| 返回 500 deploy error | 脚本报错，查看控制台日志                                   |
| 脚本无执行权限        | 执行 `chmod +x deploy.sh`                                  |
| 找不到脚本            | 使用 `path.resolve(__dirname, './deploy.sh')` 拼接完整路径 |
| Git 命令失败          | 确保脚本执行用户具有权限，并已配置 SSH key（如有私仓）     |

## 🚀 总结

通过 GitLab 的 WebHook + 自定义 Node 服务 + Shell 脚本，目前已经轻松实现了一个简易的 CI/CD 系统，适用于：

- 小型团队/私有服务器
- 无需接入 GitLab Runner
- 灵活控制部署逻辑

后续可以升级为：

- 监听多分支 / 多项目
- 引入权限控制 / 日志系统
- 添加构建状态回传通知