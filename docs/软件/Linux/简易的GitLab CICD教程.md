## 简易的GitLab CI/CD教程

为了实现跨服务器的GitLab CI/CD自动部署，按照以下步骤操作：

---

### 一、解决网络连通性问题

1. **确认网络互通**

   - 确保 `10.0.0.117` (GitLab) 和 `10.0.0.93` (应用服务器) 之间网络可达
   - 测试命令：`ping 10.0.0.93`（从GitLab服务器执行）

2. **开放SSH端口**

   - 确保应用服务器的`22`端口对GitLab Runner开放

   - 如有防火墙：

     ```bash
     sudo ufw allow from 10.0.0.117 to any port 22
     ```

---

### 二、配置应用服务器SSH免密登录

1. **创建专用部署账户**

   ```bash
   sudo useradd -m deploy
   sudo passwd deploy  # 设置密码（可选）
   ```

2. **生成SSH密钥对**

   - 在GitLab Runner所在服务器（或直接在GitLab CI环境中）执行：

     ```bash
     ssh-keygen -t ed25519 -f ~/.ssh/gitlab_deploy
     ```

3. **上传公钥到应用服务器**

   ```bash
   ssh-copy-id -i ~/.ssh/gitlab_deploy.pub deploy@10.0.0.93
   ```

4. **测试SSH连接**

   ```bash
   ssh -i ~/.ssh/gitlab_deploy deploy@10.0.0.93
   ```

---

### 三、配置GitLab CI/CD

1. **准备部署脚本**
   在项目根目录创建 `scripts/deploy.sh`：

   ```bash
   #!/bin/bash
   set -e
   
   # 进入项目目录
   cd /home/deploy/your-project-path
   
   # 拉取最新代码
   git checkout dev
   git pull origin dev
   
   # 执行构建部署命令（根据实际脚本调整）
   ./mvnw clean package
   systemctl restart your-app.service
   ```

2. **配置.gitlab-ci.yml**

   ```yaml
   stages:
     - deploy
   
   deploy_dev:
     stage: deploy
     only:
       - dev  # 只在dev分支有变更时触发
     script:
       - chmod 600 $SSH_PRIVATE_KEY
       - ssh -o StrictHostKeyChecking=no -i $SSH_PRIVATE_KEY deploy@10.0.0.93 "bash -s" < ./scripts/deploy.sh
   ```

3. **设置CI/CD环境变量**
   在GitLab仓库设置 ➔ CI/CD ➔ Variables：

   - `SSH_PRIVATE_KEY`：粘贴之前生成的私钥内容（`gitlab_deploy`）
   - `SSH_HOST`：`10.0.0.93`
   - `SSH_USER`：`deploy`

---

### 四、配置合并自动触发（可选）

1. **保护分支设置**

   - 进入仓库设置 ➔ Repository ➔ Protected Branches
   - 保护`dev`分支，要求合并请求(MR)通过CI

2. **合并请求流水线**
   在`.gitlab-ci.yml`添加：

   ```yaml
   workflow:
     rules:
       - if: $CI_MERGE_REQUEST_TARGET_BRANCH_NAME == "dev"
       - when: always
   ```

---

### 五、验证部署

1. **手动触发测试**

   ```bash
   git commit --allow-empty -m "Trigger CI/CD"
   git push origin dev
   ```

2. **查看流水线日志**

   - 进入GitLab ➔ CI/CD ➔ Pipelines
   - 检查作业日志是否显示成功部署

---

### 六、高级配置建议

1. **使用Ansible进行部署**（复杂场景）

   ```yaml
   deploy:
     script:
       - ansible-playbook -i inventories/production deploy.yml
   ```

2. **配置Webhook通知**

   - 在部署成功后发送通知到Slack/钉钉

3. **回滚机制**

   ```bash
   # deploy.sh中添加
   git reflog
   git reset --hard HEAD@{1}
   ```

---

遇到问题排查方向：

1. 检查SSH密钥权限是否为`600`
2. 查看应用服务器`/var/log/auth.log`确认SSH登录尝试
3. 在CI脚本中添加`set -x`显示详细执行信息
4. 确保部署账户有项目目录的写权限

通过以上配置，每次向dev分支推送变更或合并其他分支到dev时，GitLab CI/CD将自动完成部署到应用服务器的全过程。