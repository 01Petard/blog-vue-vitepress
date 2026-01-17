# 基建

## 基础设施

### Wi-Fi

```
SSID：airdoc_customer_first
Secert：CGLvSMe!
身份认证中心：1.1.1.3
域：huangzexiao
密码：Yt@123abc
```

```
SSID：airdoc_device
Secert：arm30Axy
```

### [公司邮箱](https://outlook.office.com/mail/)

```
huangzexiao0901@airdoc.com
Hzx,qazwsxedc123
```

**联系人邮箱**

张兵：zhangbing@airdoc.com

阮文凯：ruanwenkai@airdoc.com

### VPN

```
36.112.64.2:1290
```

```
huangzexiao
```

```
kjiolluy711
```

### Jira、Confluence

```
http://jira.airdoc.com/
或
http://10.1.3.78:8080/
```

```
http://confluence.airdoc.com/
或
http://10.1.3.78:8090/
```

```
用户名:huangzexiao
全名:黄泽校
```

## 研发

### 堡垒机

```shell
expect ~/conf/serverLogin.sh
```

```shell
cd /data/logs
```

### Jenkins

新的Jenkins，通过GitLab SSO登录

```
地址:https://codeflow.airdoc.com/
账号:huangzexiao
密码:Yt@123abc
```

旧的Jenkins（内网，需要关掉VPN）

```
地址:http://jenkins.airdoc.com/
账号:huangzexiao
密码:kjiolluy711
```

### [CloudQuery](http://10.1.3.46/query)

```
环境:生产
地址:http://10.1.3.46/query
库名:eye_ikang_production
权限:只读
```

```
账号:huangzexiao
密码:mnVYIrxXsh9UKLC5sicJ
```

### [DMS数据库](www.aliyun.com)

> 只能进行DQL操作

用户登录名称

```
huangzexiao@1793366333494089.onaliyun.com
```

登录密码

```
r3kGrS?1Q?2oEvlTbdyCYMSmQ#5(NpQd
```

### [DDL操作申请流程](http://confluence.airdoc.com/pages/viewpage.action?pageId=20972238)

**说明：**生产环境数据库账号仅开放 **DML（数据操作）权限**，所有 **DDL（结构变更）操作** 必须经过邮件审批，由运维执行。

**申请流程：**

1. **邮件审批**
   - **收件人：** 部门负责人（审批人）
   - **抄送：**
      李继新（[lijixin@airdoc.com](mailto:lijixin@airdoc.com)）
      李锡伟（[lixiwei1108@airdoc.com](mailto:lixiwei1108@airdoc.com)）
      张兵（[zhangbing@airdoc.com](mailto:zhangbing@airdoc.com)）
2. **审批通过后**
   - 由运维 **李锡伟（[lixiwei1108@airdoc.com](mailto:lixiwei1108@airdoc.com)）** 执行变更操作。

> **邮件内容模板：**
>
> - 项目名称：
> - 应用名称：
> - 数据库实例地址：
> - 数据库名称：
> - 执行的 SQL：
> - 期望执行时间（请避免与规定可执行时间冲突）：
> - 注意事项：
> - 更改原因：

### [OSS配置](https://www.alibabacloud.com/help/zh/oss/developer-reference/installing-the-ossbrowser-2-0)

编码字符：[哈基米](https://app.xiaobaozi.cn/)

私钥：Warma10032

```
https://webnote.cc/hzx
```

将`oss://airdoc-ada`改为`https://ada-res.airdoc.com`







# 抗压

## 抗压-注册

**MySQL**

```shell
mysql -h rm-2ze0ffazphxqu7czi.mysql.rds.aliyuncs.com -P 3306 -u re_mpd_rw -p
```

```shell
ChxdV@$JQHwR
```

```sql
USE medical_registration_hrv;
```

```sql
SELECT * FROM `mpd_assessment`  order by `create_time` limit 10;
```

**Redis（生产）**

```shell
r-2ze4t2lculmdidb769.redis.rds.aliyuncs.com
db:7
```

**Redis（测试）**

```shell
r-2zeg67b8ighzxwmrtxpd.redis.rds.aliyuncs.com
db：10
```

## 抗压-本地部署版

环境配置

```
DB_HOST=47.93.84.180;DB_NAME=mpd-bes-onprem;DB_PORT=3306;DB_PWD=mxU8SjqCFY2191r;DB_USER=root;REDIS_DB=6;REDIS_HOST=r-2zeg67b8ighzxwmrtxpd.redis.rds.aliyuncs.com;REDIS_PORT=6379;REDIS_PWD=owenSi#nowi
```

## 抗压-后台-开发配置

```
DB_HOST=47.93.84.180;DB_NAME=vt_test;DB_PORT=3306;DB_PWD=mxU8SjqCFY2191r;DB_USER=root;REDIS_DB=6;REDIS_HOST=r-2zeg67b8ighzxwmrtxpd.redis.rds.aliyuncs.com;REDIS_PORT=6379;REDIS_PWD=owenSi#nowi
```

## 抗压-前台-开发配置

```
DB_HOST=47.93.84.180;DB_NAME=vt_test;DB_PORT=3306;DB_PWD=mxU8SjqCFY2191r;DB_USER=root;REDIS_DB=5;REDIS_HOST=r-2zeg67b8ighzxwmrtxpd.redis.rds.aliyuncs.com;REDIS_PORT=6379;REDIS_PWD=owenSi#nowi
```

## 抗压-日志

登录server服务器

```shell
cd /data/logs/mpd-bes
```

**例如：查看一个学生是否做了筛查**

```shell
grep "airdoc:bnu-S957800-0-12" airdoc-vision-mpd.log
```

如果日志是很久前的，则需要遍历查看压缩日志

```shell
cd 2025-11-28
```

```shell
zgrep "airdoc:bnu-S957800-0-12" airdoc-vision-mpd.2025-11-28.*.log.gz
```

```shell
zgrep "2025-11-28 15:50" airdoc-vision-mpd.2025-11-28.*.log.gz
```

> grep参数
>
> - A 3：显示匹配行 **后面** 的 3 行
>
> - B 2：显示匹配行 **前面** 的 2 行
>
> - C 5：显示前后各 5 行
> - -i：忽略大小写
> - -w：按单词匹配
> - -a：文本搜索
> - -F：匹配

```shell
grep "[微信签名]参数" airdoc-vision-mpd.log
```

## 抗压-Nginx配置

当前架构

| Web 服务器               | Nginx 配置文件       | API 请求转发到       |
| ------------------------ | -------------------- | -------------------- |
| `prod-visiontrain-web01` | `172.17.210.1:8733`  | `172.17.210.1:8733`  |
| `prod-visiontrain-web02` | `172.17.202.45:8733` | `172.17.202.45:8733` |

测试服务器Nginx路径和配置：



新版

```shell
cd /usr/local/nginx/conf.d
```

```shell
cat /usr/local/nginx/conf.d/test-neuro-ai.airdoc.com.conf
```

```shell
cat /usr/local/nginx/conf.d/test-neuro-ai-admin.airdoc.com.conf
```

```shell
/usr/local/nginx/sbin/nginx -t
```

```shell
/usr/local/nginx/sbin/nginx -s reload
```



旧版

```shell
cat /usr/local/nginx/conf.d/test-mpd.babyeye.com.conf
```

```nginx
server {
        listen       80;
        server_name test-mpd.babyeye.com;

    root /home/workspace/shiqi/fe-mpd-app-h5/dist;
    index index.html index.htm;
    
    location ~ ^/(hrvinit|hrvtest|hrvreport|hrvfinished)(/.*)?$ {
       try_files $uri $uri/ /index.html;
    }

  location = / {
        if ($request_method = HEAD) {
            add_header Content-Length 0;
            return 200;
        }
      try_files $uri $uri/ /index.html;
    }

        location /api {
            proxy_set_header Host $proxy_host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header Cookie $http_cookie;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            client_max_body_size    10m;

            proxy_pass http://127.0.0.1:8733;
        }
}
```



生产服务器Nginx路径和配置：



新版

```shell
cd /etc/nginx/conf.d
```

```shell
cat /etc/nginx/conf.d/neuro-ai.airdoc.com.conf
```

```shell
cat /etc/nginx/conf.d/neuro-ai-admin.airdoc.com.conf
```

```shell
sudo nginx -t
```

```shell
sudo nginx -s reload
```

旧版

```shell
cat /etc/nginx/conf.d/mpd.babyeye.com.conf
```

```nginx
server {
        listen   80;
        server_name mpd.babyeye.com;
        
        root /data/www/mpd_app_h5/dist;
        index index.html index.htm;
       
        # 设置统一缓存策略（样式和脚本）
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|woff|woff2|ttf|eot|svg)$ {
           expires 30d;
           access_log off;
           add_header Cache-Control "public";
        }

        location ~ ^/(hrvinit|hrvtest|hrvreport|hrvfinished)(/.*)?$ {
            try_files $uri $uri/ /index.html;
        }

     location = / {
        if ($request_method = HEAD) {
            add_header Content-Length 0;
            return 200;
        }
        try_files $uri $uri/ /index.html;
      }

        location /api {
            proxy_set_header Host $proxy_host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header Cookie $http_cookie;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            client_max_body_size    10m;

            proxy_pass http://172.17.210.1:8733;
            #proxy_pass http://172.17.202.45:8733;
        }
}
```

## 抗压-前端h5页面

检测页面：https://test-mpd.babyeye.com/hrvtest

报告页面：https://test-mpd.babyeye.com/hrvreport?language=zh_CN&reportId=XXXXX

？？？：https://test-re-mpd.babyeye.com/re-mpd/

## 抗压-人脸图片OSS资源文件

> 将`oss://airdoc-ada`改为`https://ada-res.airdoc.com`

人脸图片：

```
oss://airdoc-ada/face-img/20250928/
```

```shell
https://ada-res.airdoc.com/face-img/20250928/0097f68e559f4eab819a67810d943248_1_280468115_0.80_false_112741.jpg
```

示例：**0097f68e559f4eab819a67810d943248_1_280468115_0.80_false_112741.jpg**

> 规则如下（见 DetectionController#uploadImage）:
>
> - 文件名格式: {assessmentNo}_{sequence}_{faceId}_{qualityScore}_{isNew}_{HHmmss}.{ext}
> - assessmentNo: 评估单号
> - sequence: 序号（整数）
> - faceId: 人脸ID
> - qualityScore: 质量分，保留两位小数
> - isNew: 是否为新图（true/false）
> - HHmmss: 上传时的时分秒
> - ext: 原文件扩展名的小写（从原文件名提取）

logo图片：

```
oss://airdoc-ada/resources/mit-dd/image/logo-airdoc-hrv_zh-CN_1.0.10.webp
```

```
oss://airdoc-ada/resources/mit-dd/image/logo-airdoc-hrv_en-US_1.0.10.webp
```

apk安装包：

```
oss://airdoc-ada/resources/mpd/apk/
```

## 抗压-中科RF云服务

MinIO库

```
http://nlb-fmwosu7nquujzzyh19.cn-beijing.nlb.aliyuncsslb.com:9000
ecg
SM9T3cTXv9FaiTRWCKXr
```

## 抗压-数据库

### 生产环境

**前台日志**

```shell
cd /data/logs/mpd-bes/
```

```shell
grep -aF "/api/internal/hrv_receive_report" -C 50 airdoc-vision-mpd.log
```

```shell
grep -anF "d78752cd-d33f-4305-beeb-86b1fbc46a9d" airdoc-vision-mpd.log
sed -n '9319,9345p' airdoc-vision-mpd.log
```

**后台日志**

```shell
cd /data/logs/resilience-admin/
```

```shell
grep -aF "/api/internal/hrv_receive_report" -C 50 airdoc-vision-mpd.log
```

```shell
grep -anF "d78752cd-d33f-4305-beeb-86b1fbc46a9d" airdoc-vision-mpd.log
sed -n '9319,9345p' airdoc-vision-mpd.log
```

**MySQL**

> 实例：`prod-visiontrain-service-app01`或`prod-visiontrain-service-app02`

```shell
mysql -h rm-2ze0ffazphxqu7czi.mysql.rds.aliyuncs.com -P 3306 -u mpd_bes_rw -p
```

```shell
T7m$sP9^Lq2!
```

---

```shell
SHOW DATABASES;
```

```shell
USE vt_prod;
```

---

```shell
SHOW TABLES;
```

```shell
DESC mpd_report;
```

```shell
SHOW CREATE TABLE mpd_report;
```

---

```sql
INSERT INTO sys_app_upgrade (version,numeric_version,device_mode,introduce,publish_date,app_url,app_size,digital_signature,is_last_stable,is_force,deleted_at,create_user,create_time,update_user,update_time)
VALUES
(
	'2.0.7',
	20000007,
	'mpd',
	'1. 修复已知bug\n1. Fix known bugs',
	'2025-12-24',
	'https://ada-res.airdoc.com/resources/mpd/apk/mpd_prod_v2.0.6.apk',
	NULL,'',
	0,
	0,
	NULL,NULL,NULL,NULL,NULL
);

delete from sys_app_upgrade where id = 39;

update sys_app_upgradeset is_last_stable = 1 where id = 33;
```

**Redis**

> 实例：`prod-visiontrain-web01`或`prod-visiontrain-web02`

```shell
redis-cli -h r-2ze4t2lculmdidb769.redis.rds.aliyuncs.com -p 6379 -a iwen#iFwovq
```

```shell
select 10
```

清除机构缓存

```shell
get MPD_ORG_INFO:42740
del MPD_ORG_INFO:42740
```

配置机构应用最新算法

```shell
keys MPD_HRV_SCORE_DISTRIBUTION*
get MPD_HRV_SCORE_DISTRIBUTION:47950
```

### 测试环境

> 实例：`test-visiontrain-all-app01`

```
数据库：
host：47.93.84.180
库名：vt_test
port：3306
用户：root
密码：mxU8SjqCFY2191r
```

```
Redis：
host：r-2zeg67b8ighzxwmrtxpd.redis.rds.aliyuncs.com
port：6379
密码：owenSi#nowi
db：5
```



# 盘古

## 盘古-脚本

### 盘古加签pdf

```shell
php public/script.php SignPdfUrl "https://img6.airdoc.com/ytmed_report/251031/25470159-137418-251031032108-complete-merge.pdf" 86400
```

## 盘古-数据库

### 生产环境

Redis：

```shell
redis-cli -h r-2ze0b169b21d9f64.redis.rds.aliyuncs.com -p 6379 -a redis4Airdoc2018
```

MySQL：

```shell
cat /var/www/eye/scripts/repush/ChangeSyncStatus.class.php
```

```shell
history | grep Change
```

```
核心是这句话：⬇️
php /var/www/eye/public/script.php Repush\\ChangeSyncStatus

或：⬇️
cd /var/www/eye
php public/script.php 'Repush\ChangeSyncStatus' 47541

!3300
```

将MySQL的用户名和密码粘贴下来：⬇️

```shell
mysql -h rm-2ze0n8f50f8lobix5.mysql.rds.aliyuncs.com -P 3306 -u pangu_master_cii -p
```

```shell
kB$B)14qDcxGgVXbY6(^%PdiS5inVCi=
```

```sql
USE eye_ikang_production;
```

改爱康客户的套餐

```sql
select package_type from patient where patient_id = 30958663;
update patient set package_type = 3 where patient_id = 30958663;

select package_type from check_info where check_id = 26585272;
update check_info set package_type = 3 where check_id = 26585272;
```

改微信推送的机构报告配置

```sql
-- 查一下问题
select config->"$.hrv_render_template",config->"$.hrv_report_push_type" from organizer where config->"$.hrv_render_template" = "V1" and config->"$.hrv_report_push_type" = "h5";

-- MySQL 5.6
UPDATE organizer
SET config = JSON_SET(config, '$.hrv_report_push_type', 'pdf')
WHERE JSON_EXTRACT(config, '$.hrv_render_template') = 'V1'
  AND JSON_EXTRACT(config, '$.hrv_report_push_type') = 'h5';

-- MySQL 8.0
UPDATE organizer
SET config = JSON_SET(config, '$.hrv_report_push_type', 'pdf')
WHERE config->"$.hrv_render_template" = 'V1'
  AND config->"$.hrv_report_push_type" = 'h5';

-- 复核
select config->"$.hrv_render_template",
       config->"$.hrv_report_push_type"
from organizer
where config->"$.hrv_render_template" = "V1";
```

**微信重推**

> 状态值说明：0 = 待推送、1 = 已推送、2 = 推送失败、3 = 待重新推送、4 = 已查看、5 = 方案D最终报告待推送

查询微信推送任务

```sql
SELECT id, check_id, open_id, status, type, created, updated 
FROM wechat_user_check 
WHERE type = 4
AND check_id IN (444588)
ORDER BY created DESC;
```

生产

```shell
/usr/bin/php /var/www/eye/public/script.php UpdateHrvWechatStatus "464346" 0

批量推：
/usr/bin/php /var/www/eye/public/script.php UpdateHrvWechatStatus "428490,428173,421260,420797" 0
```

测试

```shell
sudo php ~/project/eye-ak/public/script.php UpdateHrvWechatStatus "2139" 0
```

### 测试环境

```
_ophthalmology和_optometry：
host：rm-2ze5435349vn2taerno.mysql.rds.aliyuncs.com
port：3306
用户（读写）：ask_w
密码：Airdoc_ask
用户（只读）：ask_r
密码：Airdoc_ask_r
```

```
_eye和_feedback：
host：rm-2zedt4j7u183g922nmo.mysql.rds.aliyuncs.com
port：3306
用户：ask_w
密码：Airdoc_ask
```

## 盘古-账号

### [staging-admin](https://staging-admin.airdoc.com/)

```
13811885439
密码格式：20+月+日+年，例如：20090225
```

**http请求调用的日志目录：**

```shell
cd /var/log/airlog/staging-admin.airdoc.com/
```

**脚本调用的日志目录：**

```shell
cd /var/log/airlog/script/202512/22
```

### [staging](https://staging.airdoc.com/)

```
眼底高级账号：
13800999024
Airdoc123
```

抗压测试账号

```
18844120189
Airdoc123
```

### [ikang-admin](https://ikang-admin.airdoc.com/)

```
手机号+验证码
```

### [pe](https://pe.airdoc.com/)

```
山西中光健康管理有限公司-太原市5:
19900252589
Airdoc9025
```

```
意滋尔健康科技（昆山）有限公司-苏州市1:
19905120037
Airdoc9000
```

```
...
```

## 盘古-海外

```shell
php -r '
putenv("LC_ALL=en_US.UTF-8");
putenv("LANG=en_US.UTF-8");
putenv("LANGUAGE=en_US");
setlocale(LC_ALL, "en_US.UTF-8", "en_US", "en_US.utf8");
bindtextdomain("i18n", "/Users/hzx/project/eye-oversea/resource/language");
bind_textdomain_codeset("i18n", "UTF-8");
textdomain("i18n");
echo gettext("抗压能力监测报告"), PHP_EOL;
'
```

# 明眸

## 明眸-管理后台

```
账号、密码：15077416042、0774
```

MIT相机：设备管理页面：https://test-huantong-admin.airdoc.com/mitDevice/mitDeviceManage

## 明眸-代码仓库

### 堡垒机

测试环境

```
test-mpc-huantong-01.alibj.airdoc              172.17.55.75:22          ssh   dev   huantong-test,mpc,all
```

生产环境

```
prod-bisheng-server01.alibj.airdoc             172.17.170.151:22        ssh   dev   all,bisheng-prod
prod-bisheng-server02.alibj.airdoc             172.17.170.160:22        ssh   dev   mpc2,mpc2-test,bisheng-prod,all
```

### GitLab

https://gitlab.airdoc.com/mingmou/mpc01/vt-app-api

### Jenkins

https://codeflow.airdoc.com/view/YTDT/job/ytdt-test-admin-service-deploy/

https://codeflow.airdoc.com/view/YTDT/job/ytdt-prod-admin-service-deploy/

## 明眸-日志

### 日志

测试环境

> test-mingmou-huantong-01

```shell
cd /data/logs/digital-therapy/dt-portal-backend
```

```shell
tail -n 50 -f vt-app-portal.log
```

## 明眸-数据库

### 数据库

测试环境

```
数据库：
host：stagingrds.mysql.rds.aliyuncs.com
用户名：huantong_w
密码：AirdocTest!
```

```
Redis：
host：test-bms.redis.rds.aliyuncs.com
密码：Airdoc@123com
```

## 明眸-数据库

### 测试环境

MySQL

```
stagingrds.mysql.rds.aliyuncs.com  huantong_w  AirdocTest!
```

Redis

```
test-bms.redis.rds.aliyuncs.com Airdoc@123com
```

## 明眸-配置中心

### Apollo配置中心

Apollo：http://172.17.55.67:9070/config.html?#/appid=vt-app-api

用户名、密码：apollo、admin

# 其他开发命令

### Git上线

打上线版本 Tag

```bash
# 给当前main分支最新提交打 tag
git tag -a v1.0.0 -m "Release version 1.0.0"

# 推送 tag 到远程
git push origin v1.0.0
# 或者一次性推送所有 tag
git push origin --tags
```

- 这样就有一个 **稳定上线版本标记**。
- Tag 永远指向这个 commit，不会随分支变化。

上线部署

- 根据 tag 或主分支最新 commit 部署到线上环境。
- 如果有 CI/CD，可以直接用 `v1.0.0` 来部署。

如果线上发现问题（回滚）

方案 A：安全回滚（推荐）

```bash
# 切回主分支
git checkout main
git pull origin main

# 假设上线 merge commit hash 是 abc123
git revert -m 1 abc123

# 提交反向操作
git push origin main
```

> 不破坏历史，线上直接回滚到之前稳定状态。

方案 B：直接回到 tag（谨慎）

```bash
git checkout main
git reset --hard v1.0.0
git push origin main --force
```

⚠️ 注意：会改历史，其他人基于主分支开发会冲突，团队协作慎用。

后续修复（Hotfix）

```bash
# 基于 tag 创建 hotfix 分支
git checkout -b hotfix/fix_bug v1.0.0

# 修复 bug
git commit -am "fix: 修复线上 bug"

# 合并回主分支
git checkout main
git merge hotfix/fix_bug
git push origin main
```

### MySQL命令

一、库级操作

```sql
SHOW DATABASES;               -- 查看所有数据库
CREATE DATABASE demo;         -- 创建数据库
DROP DATABASE demo;           -- 删除数据库
USE demo;                     -- 切换数据库
SELECT DATABASE();            -- 查看当前所在数据库
```

二、表级操作

```sql
SHOW TABLES;                               -- 查看当前库下的所有表
DESCRIBE user;                             -- 查看表结构（字段、类型、主键）
SHOW CREATE TABLE user\G;                  -- 查看建表语句（\G 格式化显示）
ALTER TABLE user ADD COLUMN age INT;       -- 增加字段

ALTER TABLE `mpd_report` 
ADD COLUMN `openid` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '微信openid', 
ALGORITHM=INPLACE, LOCK=NONE;

ALTER TABLE user MODIFY COLUMN name VARCHAR(128);  -- 修改字段类型

ALTER TABLE `mpd_report` 
MODIFY COLUMN `open_id` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '微信openid' 
AFTER `faceId`;

ALTER TABLE `mpd_report`
CHANGE COLUMN `openid` `open_id` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '微信openid',
ALGORITHM=INPLACE, LOCK=NONE;

ALTER TABLE user DROP COLUMN age;          -- 删除字段
DROP TABLE user;                           -- 删除表
RENAME TABLE old_name TO new_name;         -- 修改表名
```

三、DQL、DML、DDL

```sql
SELECT * FROM user LIMIT 10;                      -- 查询前10条
SELECT name, age FROM user WHERE age > 20;        -- 条件查询
-- JSON查询
select
pipeline->>'$.status.third_push.state' AS third_push_status
-- JSON_UNQUOTE(JSON_EXTRACT(pipeline, '$.status.third_push.state')) AS third_push_status
-- CAST(pipeline->>'$.status.third_push.state' AS CHAR) AS third_push_status
 from hrv_check_info;
```

```sql
INSERT INTO user(name, age) VALUES('Zexiao', 25); -- 插入数据
UPDATE user SET age = 26 WHERE name = 'Zexiao';   -- 更新数据
DELETE FROM user WHERE name = 'Zexiao';           -- 删除数据
```

```sql
CREATE DATABASE demo;                             -- 创建数据库
CREATE TABLE user(id INT, name VARCHAR(50));      -- 建表
ALTER TABLE user ADD COLUMN age INT;              -- 修改表结构
DROP TABLE user;                                  -- 删除表
TRUNCATE TABLE user;                              -- 清空表数据
```

四、索引与主键操作

```sql
SHOW INDEX FROM user;                               -- 查看索引
CREATE INDEX idx_user_name ON user(name);           -- 创建普通索引
CREATE UNIQUE INDEX uniq_user_email ON user(email); -- 创建唯一索引
ALTER TABLE user ADD PRIMARY KEY (id);              -- 添加主键
ALTER TABLE user DROP PRIMARY KEY;                  -- 删除主键
DROP INDEX idx_user_name ON user;                   -- 删除索引
```

五、聚合与排序

```sql
SELECT COUNT(*) FROM user;                        -- 统计总数
SELECT age, COUNT(*) FROM user GROUP BY age;      -- 分组统计
SELECT * FROM user ORDER BY created_at DESC;      -- 按时间倒序排序
SELECT * FROM user LIMIT 20 OFFSET 40;            -- 分页查询（第3页）
```

六、权限与用户管理（需要管理员权限）

```sql
CREATE USER 'appuser'@'%' IDENTIFIED BY '123456';      -- 创建用户
GRANT SELECT, INSERT ON demo.* TO 'appuser'@'%';       -- 授权权限
REVOKE UPDATE ON demo.* FROM 'appuser'@'%';            -- 撤销权限
SHOW GRANTS FOR 'appuser'@'%';                         -- 查看权限
DROP USER 'appuser'@'%';                               -- 删除用户
FLUSH PRIVILEGES;                                      -- 刷新权限表
```

七、性能与状态查询

```sql
SHOW PROCESSLIST;                -- 查看当前执行的SQL
SHOW FULL PROCESSLIST;           -- 查看完整执行语句
SHOW VARIABLES LIKE 'max_connections';  -- 查看配置项
SHOW STATUS LIKE 'Threads%';     -- 查看线程相关状态
EXPLAIN SELECT * FROM user;      -- 查看SQL执行计划
SHOW ENGINE INNODB STATUS\G;     -- 查看InnoDB引擎状态（性能分析必备）
```

八、事务与锁

```sql
START TRANSACTION;              -- 开始事务
UPDATE user SET balance = balance - 100 WHERE id = 1;
COMMIT;                         -- 提交
ROLLBACK;                       -- 回滚

SHOW ENGINE INNODB STATUS\G;    -- 查看锁等待详情
SELECT * FROM information_schema.INNODB_LOCKS\G;  -- 当前锁
```

九、备份与恢复（命令行）

```bash
mysqldump -h 127.0.0.1 -u root -p demo > demo.sql      # 导出
mysql -h 127.0.0.1 -u root -p demo < demo.sql          # 导入
```

十、开发常用小技巧

- 查看字符集与排序规则：

  ```sql
  SHOW VARIABLES LIKE 'character_set%';
  SHOW VARIABLES LIKE 'collation%';
  ```

- 临时切换编码（防止中文乱码）：

  ```sql
  SET NAMES utf8mb4;
  ```

- 查看表数据大小：

  ```sql
  SELECT table_name,
         round(data_length/1024/1024,2) AS data_MB,
         round(index_length/1024/1024,2) AS index_MB
  FROM information_schema.tables
  WHERE table_schema = 'your_db'
  ORDER BY data_length DESC;
  ```

### Redis命令

一、连接与基础操作

```bash
redis-cli -h [host] -p [port] -a [password]  # 连接远程
auth your_password                            # 登录认证（如果没带 -a）
select 1                                      # 切换数据库（0～15）
ping                                          # 测试连接（返回 PONG）
dbsize                                        # 当前数据库 key 数量
flushdb                                       # 清空当前库（危险操作）
flushall                                      # 清空所有库（极危险）
```

二、键（key）操作

Redis 的所有数据都是通过 key 管理的。

```bash
keys *                 # 查看所有 key（生产环境慎用，数据多会阻塞）
scan 0 match user:*    # 安全遍历 key，推荐替代 keys
type mykey             # 查看 key 的类型
ttl mykey              # 查看 key 的剩余过期时间（秒）
expire mykey 60        # 设置 60 秒后过期
del mykey              # 删除 key
exists mykey           # 判断 key 是否存在
rename old new         # 重命名 key
```

三、字符串（String）

最常见的数据类型，用于计数、缓存、配置值等。

```bash
set name "ze_xiao"           # 设置字符串
get name                     # 取值
setex code 60 "1234"         # 设置值并指定 60 秒过期
incr count                   # 递增（常用于计数器）
decr count                   # 递减
append log "new entry"       # 追加字符串
mset a 1 b 2 c 3             # 批量设置
mget a b c                   # 批量取值
```

四、哈希（Hash）

相当于一个小型对象或 Map，适合存储用户信息、配置项。

```bash
hset user:1001 name "Zexiao" age 25
hget user:1001 name
hgetall user:1001
hdel user:1001 age
hexists user:1001 name
hkeys user:1001
hvals user:1001
hincrby user:1001 score 10
```

五、列表（List）

按插入顺序排序，类似队列（queue）或栈（stack）。

```bash
lpush tasks "task1" "task2"   # 从左侧插入
rpush tasks "task3"           # 从右侧插入
lpop tasks                    # 从左取出并删除
rpop tasks                    # 从右取出并删除
lrange tasks 0 -1             # 查看列表所有元素
llen tasks                    # 查看列表长度
```

六、集合（Set）

无序、唯一，用于标签、去重等。

```bash
sadd tags "java" "php" "vue"
smembers tags
sismember tags "php"          # 判断是否存在
srem tags "php"
scard tags                    # 集合元素数量
```

七、有序集合（Sorted Set）

带分数的集合，常用于排行榜、权重排序。

```bash
zadd rank 100 "alice" 200 "bob" 150 "charlie"
zrange rank 0 -1 withscores
zrevrange rank 0 -1 withscores
zscore rank "bob"
zincrby rank 10 "alice"       # 给 alice 加 10 分
zrem rank "charlie"
```

八、调试与监控

```bash
info                          # 查看 Redis 状态信息
info memory                   # 查看内存使用
monitor                       # 实时监听命令执行（慎用）
config get *                  # 查看配置
config set loglevel notice    # 动态修改配置
```

开发技巧补充

- **SCAN** 比 **KEYS** 更安全，生产环境一定用 SCAN。
- 临时测试可在命令后加 `--raw` 参数避免转义字符。
- 如果你在项目中用 `redisTemplate`（Spring Boot）或 `Predis`（PHP），多熟悉这些命令能帮你快速 debug。

### 查看日志

```shell
grep -n "检测码格式不正确" airdoc-vision-mpd.log | tail -n 1
```

> 129384:top.continew.starter.core.exception.BusinessException: 检测码格式不正确...

```shell
sed -n '129354,129414p' airdoc-vision-mpd.log
```

```shell
sed -n '68857,69057p' airdoc-vision-mpd-error.log
```

```shell
less +68927 airdoc-vision-mpd-error.log
```

自动化：

```shell
grep -n "检测码格式不正确" airdoc-vision-mpd.log | tail -n 1 | cut -d: -f1 | xargs -I{} bash -c "sed -n '{}-30,{}+30p' airdoc-vision-mpd-error.log"
```

### python环境配置

```
查看conda配置：conda config --show channels
查看pip配置：pip config list
临时使用官方源：pip install -i https://pypi.org/simple/ 包名
```



### 智能病例助理

https://test-mpd.babyeye.com/mrassistant

### 视琦-视觉训练

[https://www.babyeye.com](https://www.babyeye.com)

### 视琦-家庭训练

[https://test-t6.babyeye.com](https://test-t6.babyeye.com)

# 眼底对接

### 开发时在测试环境的记录

验证receive_base_info接口是否收到了患者信息

```shell
cd /var/log/airlog/staging-open.airdoc.com/202510/09
```

```shell
tail -n 50 -f receive_base_info.log
```

验证模拟推送接口是否可以收到推送

```shell
cd /var/log/airlog/staging-open.airdoc.com/202510/09
```

```shell
tail -n 50 -f hrv_pipeline_retry.log
```

```shell
cd /var/log/airlog/staging-admin.airdoc.com/202510/09
```

```shell
tail -n 50 -f third_report_push_test.log
```

### 对接文档

相机管理软件对接：https://doc.airdoc.com/third-party-docs/post/standard-api/

H5对接：https://doc.airdoc.com/third-party-docs/post/standard-api-clouds/

中间库对接：https://doc.airdoc.com/third-party-docs/post/middle-database/

第三方公众号对接：https://doc.airdoc.com/third-party-docs/post/weixin-third/

### 对接开放平台

https://pe.airdoc.com/pc-v2/open/auth

https://pe.airdoc.com/pc-v2/open/api

```
我的线上测试机构：
49401 泰康养老-1 18807330019 Airdoc8000

48538 焦作市第二人民医院-2 18800310730 Airdoc8007
```

### 机构配置

客服帮忙去配置一下“第三方接收报告推送的API”接口，以及第三方推送报告结构

### 云服务器外网访问申请

```
环境：生产
系统：盘古
服务器内网IP：172.17.170.105,172.17.170.106,172.17.170.165,172.17.1.146
目的类型：域名
域名：<客户的回调接口>（比如：https://www.aihyszs.com/airdoc/report）
协议类型：TCP
端口：443
应用：HTTPS
```

```
环境：生产
系统：盘古
服务器内网IP：172.17.170.105,172.17.170.106,172.17.170.165,172.17.1.146
目的类型：IP
域名：<客户的回调接口>（比如：121.41.100.5）
协议类型：TCP
端口：端口（比如：8080）
应用：HTTP
```

# 眼底售后

> <img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202509221056641.png" alt="image-20250922105621469" style="zoom:40%;" />
>
> 查日志：
>
> ```
> receive_base_info and message: 1295800
> ```

### 武汉长江航运总医院

对接方案：标准对接方案

```
客户于9月22日通知我们：9月21日有14个单子没有结果。我们排查发现是用户的信息没有传给盘古系统。后向客户告知了问题，要求重传患者信息，客户目前还没回应。
```

###盛京医院rac 

```
ssh airdoc@172.20.66.20
A1rd0c@yt

堡垒机用户：racops AIRDOC123
root用户：airdoc A1rd0c@yt
```

### 三诺

对接：标准化对接

报告通过接口回调推送

```
https://dpcc.xyeyy.com/api/service-api/sino-common/airDoc/acceptAirDocData
```

### 焦作二院

```
48537 焦作市第二人民医院-1 19900130065 Airdoc9000
48538 焦作市第二人民医院-2 18800310730 Airdoc8007
```

### 襄阳市中心医院眼底照相系统和售后

```
安辉：
我查了之前的记录：天瑞这边的接口是这样做的：
一、体检客户获取：在TX_JK这个架构下，建了两个视图：
1、airdoc_base_info_north，用于提供北院区，现在东津院区使用的用户列表（刚刚看过了，把东津院区的编号加进去了，因为北院区的设备搬到东津，所以这个接口名字可以不变）
2、airdoc_base_info_south，用于提供南院区的用户列表。
二、体检结果上传：
1、建了一个表：airdoc_check_result，用于回传结果数据。这个表自10月21日之后就没有再传入数据了
2、建了一个存储过程：SP_SISSI_AUTOCHECKSECTIONS，在这个里面查询airdoc_check_result结果表，写入科室小结并审核
3、在做检查的电脑上，做完的PDF会放在：D:\workData\BianQueAirdoc\data\file\pdf，通过天瑞的接口上传工具上传到PDF服务器。
==============
鹰瞳那边，是放了一个服务，定时获取客户列表，上传到他们的网站，在做检查时就可以查到信息了
在做完检查，有结果之后，把结果写回中间表，并把图像保存的指定的位置。
==============
但这个服务经常闪退，一直没有很好的解决稳定性。
==============
然后我又通过西西健康做了一个临时应急的工具，用于注册客户（从鹰瞳工程师陈海龙老师那儿要的WebAPI），以及监听网站的信息，将结果写回数据库。
==============
这是西西健康应邹的大致用法，上面那个客户没法使用，可能是新设的自费项目没有识别的原因：
```

<img src="https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202512011028785.png" alt="e9b942248d01b18ed4eae3e30de2a498" style="zoom:75%;" />

# 礼来银屑病 密钥轮换

对接方：礼来 Lilly

GitLab仓库：http://172.16.0.2/iKang/taltz-api

没有Jenkis，改密钥需要登上服务器手动改

### 生产环境

**生产服务器：**

```
NAME               IP:PORT           PROTO  USER  GROUP
AIRDOC-LILY-PROD1  42.159.92.20:22   ssh    dev   all,lily
```

**日志路径：**

```shell
/var/log/airlog/psoriasis.airdoc.com/202512/22
```

**项目路径：**

```shell
/var/www/psoriasis/config/production
```

密钥轮换，修改配置

```shell
cat config.inc.php
```

更换AES数据加密解密方式

```shell
sudo vim /var/www/psoriasis/package/ipatient/IPatientUtil.class.php
```

### 测试环境

**测试服务器：**

```shell
NAME                                  IP:PORT                 PROTO  USER  GROUP
test-cp-pangu-server01.alibj.airdoc   172.17.1.150:22         ssh    dev   all,BA,pangu,pangu-test
```

**日志路径：**

```shell
cd /var/log/airlog/test-taltz.airdoc.com/202512/26
```

**项目路径：**

```shell
cd /var/www/taltz/config
```

密钥轮换，修改配置

```shell
cat config.inc.php
```

更换AES数据加密解密方式

```shell
vim /var/www/taltz/package/ipatient/IPatientUtil.class.php
```

```shell
vim /var/www/taltz/modules/wechat/Decrypt.class.php
```

线上本地测试：

```shell
cd /var/www/taltz

php -S localhost:8081 -t public

curl http://localhost:8081/api/wechat/decrypt?parameter=4weGwWNJbmnBWDr2MSToM+YJ3gsf0b8BB0ipEgRRMiwl&patientType=6666666
```



## 负责

```
赵维康 
    盘古
    女娲
    金砖
    天眼
    互联网医院
    视训眼动一体机
    扁鹊

黄泽校 
   HRV 
   眼底对接 

阮文凯 
   RAC 

黄佳兴
   本地部署 
   AI主检
   AI超声

张刘峰
   眼知健 
   海外 

翁劲
   DTP 

维康 泽校 张刘峰 黄佳兴 翁劲（机动） 张兵（机动）
文凯 金强 负责全部前端
以上具体项目优先级和全部人员临时调配 统一有文凯负责
```

## 组织架构

> 公司是一家位于北京做眼部医疗器材，具备软硬件开发能力的公司，这是组织架构里的部门简称，简称都是以英文来表示的，请你思考理解一下这些英文简称都是啥意思
> FU：
>    CP：DATA、IT、DEV、SE、OPS
>    COU：Fiance
>     LC：Legal、IP
>     HR
>     CG：AUD
>
> TBC：
>     OBC：OMP、OCS、OSC
>     BD
>     BMC：BMN、BMS
>     PBM：BOU、MOC、TOS、SHS、CRA
>     KA：AK、XC、INSKA
>     CSC
>     SSC：RCS、SDC、MRS、OH、MQ
>     PR
>     CS：CSSE、CSNW、ASS
>     DTP
>     SDA
>     CRC：PDC、PMC、MMT、DAS（DAS我问过了，是Develop and Support的意思）

根据你提供的组织架构信息，结合医疗科技公司（尤其是眼部医疗设备、软硬件开发）的常见职能划分，我对这些英文部门简称进行了系统性解读。以下是对各层级部门及其子部门的合理推测和解释：

**FU**（Functional Unit / Functional Units）

**推测含义**：**职能单元 / 职能部门集合**
- 这是公司内部支持性职能部门的总称，通常不直接参与产品销售或客户交付，而是为整个组织提供后台支持。
- 包含：CP、COU、LC、HR、CG

**CP**（Corporate Platform / Central Platform）

**推测含义**：**企业平台部 / 中央平台部**
- 负责公司级的技术平台、数据与IT基础设施建设。
- 包含子部门：
  - **DATA**：数据部（Data Department）  
    → 负责数据治理、数据分析、BI、大数据平台等。
  - **IT**：信息技术部（Information Technology）  
    → 负责内部IT系统运维、网络安全、办公自动化等。
  - **DEV**：研发工程部（Development / Software Development）  
    → 软件开发团队，可能负责内部系统或部分产品软件模块。
  - **SE**：系统工程部（System Engineering）或 软件工程（Software Engineering）  
    → 更偏系统架构设计、集成、技术方案设计。
  - **OPS**：运营支持部（Operations Support）或 运维部（Operations）  
    → 可能指技术运维（DevOps）、系统稳定性保障等。

**COU**（Corporate Operations Unit）
**推测含义**：**企业运营部 / 财务运营单元**
- 负责公司财务及日常运营支持。
- **Fiance** 应为拼写错误，正确应为 **Finance**（财务部）

**LC**（Legal & Compliance）
**推测含义**：**法务与合规部**

- 包含：
  - **Legal**：法务部
  - **IP**：知识产权部（Intellectual Property）  
    → 对医疗设备公司尤其重要，涉及专利布局、技术保护。

**HR**（Human Resources）
**明确含义**：人力资源部

**CG**（Corporate Governance）
**推测含义**：**公司治理部**
- 包含：
  - **AUD**：审计部（Audit）  
    → 内审或合规审计，可能包括财务审计、流程审计等。

---

**TBC**（To Be Confirmed / 或更可能是：Therapy Business Cluster）
**推测含义**：**治疗业务集群 / 业务板块总称**
- “TBC” 字面是 “待确认”，但在组织架构中作为顶级部门名不太可能。更合理的解释是 **Therapy Business Cluster**（治疗业务集群），表示围绕某一治疗领域（如眼科）的业务整合。
- 也可能是 **Technology & Business Cluster**，但前者更符合医疗行业语境。

**OBC**（Ophthalmic Business Center / Ophthalmology Business Cluster）
**推测含义**：**眼科业务中心 / 眼科业务集群**
- 核心业务部门，聚焦眼科产品线。
- 包含：
  - **OMP**：Ophthalmic Medical Products（眼科医疗产品）  
    → 具体产品线或产品管理团队。
  - **OCS**：可能为 Ophthalmic Clinical Services（眼科临床服务）或 Ophthalmic Customer Service  
    → 支持临床试验或客户服务。
  - **OSC**：Ophthalmic Sales & Commercialization（眼科销售与商业化）  
    → 负责市场推广与销售执行。

**BD**（Business Development）
**明确含义**：**业务拓展部**
- 负责战略合作、新市场开拓、对外合作等。

**BMC**（Business Management Center）
**推测含义**：**业务管理中心**
- 统筹业务运营管理。
- 包含：
  - **BMN**：Business Management North（北方区）  
    → 地区划分，如华北、东北等。
  - **BMS**：Business Management South（南方区）  
    → 华南、华东等区域。

**PBM**（Product & Business Management）
**推测含义**：**产品与业务管理部**
- 负责产品全生命周期管理、市场策略、商业计划。
- 包含：
  - **BOU**：可能为 Business Operation Unit（业务运营单元）或 Brand Operation Unit（品牌运营）  
    → 支持具体产品线运营。
  - **MOC**：可能为 Market Operation Center（市场运营中心）  
    → 市场推广、活动执行。
  - **TOS**：可能为 Technology & Operation Support（技术与运营支持）  
    → 技术支持销售或产品落地。
  - **SHS**：可能为 Strategic Health Solutions（战略健康解决方案）或 Sales & Hospital Support（销售与医院支持）  
    → 面向医院客户的支持团队。
  - **CRA**：Clinical Research Associate（临床研究专员）团队 / 临床部  
    → 负责临床试验执行，对医疗设备公司至关重要。

**KA**（Key Accounts）
**推测含义**：**大客户部**
- 负责重点医院、连锁机构、政府采购等大客户关系。
- 包含：
  - **AK**：可能为 Account Key（重点客户组）或 Alliance Key（战略客户联盟）
  - **XC**：可能为 X-Customer（特定客户组代号）或 eXpansion Customer（拓展客户）
  - **INSKA**：Insurance Key Accounts（保险大客户）  
    → 若公司产品涉及医保支付或商业保险，需专门对接。

**CSC**（Customer Service Center）
**推测含义**：**客户服务中心**
- 提供售前售后支持、客户问题响应。

**SSC**（Shared Service Center）
**推测含义**：**共享服务中心**
- 集中处理跨部门的标准化服务。
- 包含：
  - **RCS**：可能为 Regional Customer Service（区域客户服务）
  - **SDC**：可能为 Service Delivery Center（服务交付中心）
  - **MRS**：可能为 Medical Response Service（医疗响应服务）或 Maintenance & Repair Service（维修服务）
  - **OH**：可能为 Occupational Health（职业健康）或 Operation Hub（运营枢纽）
  - **MQ**：可能为 Medical Quality（医疗质量）或 Maintenance Quality（维修质量）

**PR**（Public Relations）
**明确含义**：**公共关系部**
- 品牌宣传、媒体关系、政府沟通等。

**CS**（Customer Success / Customer Solutions）
**推测含义**：**客户成功部 / 客户解决方案部**
- 确保客户使用产品成功，提升满意度。
- 包含：
  - **CSSE**：Customer Success - Software & Engineering（软件与工程支持）
  - **CSNW**：Customer Success - Network（网络支持）
  - **ASS**：可能为 Application Support Specialist（应用支持专家）或 After-Sales Support（售后支持）

**DTP**（Direct-to-Patient / Digital Therapeutics Platform）
**推测含义**：
- **可能性1**：Direct-to-Patient（直达患者）  
  → 若公司有DTC（Direct-to-Consumer）模式，如家用眼科设备。
- **可能性2**：Digital Therapeutics Platform（数字治疗平台）  
  → 若涉及软件类医疗产品（SaMD），则为此类平台开发。

**SDA**（Software Development & Analytics / Strategic Data Analytics）
**推测含义**：
- **可能性1**：Software Development & Analytics → 软件开发与数据分析团队，强调软硬件结合。
- **可能性2**：Strategic Data Analytics → 战略级数据分析，支持决策。

**CRC**（Clinical & Research Center / Centralized Research & Coordination）
**推测含义**：**临床与研究中心 / 中央研究协调中心**
- 统筹临床研究相关工作。
- 包含：
  - **PDC**：可能为 Product Development Center（产品开发中心）或 Protocol Design & Coordination（方案设计与协调）
  - **PMC**：Project Management Center（项目管理中心）或 Product Management Committee
  - **MMT**：可能为 Medical & Marketing Team（医学与市场团队）或 Multi-disciplinary Team（多学科团队）
  - **DAS**：Develop and Support（开发与支持）✅（已确认）

总结：整体架构逻辑

| 层级   | 部门                                                   | 含义                                     |
| ------ | ------------------------------------------------------ | ---------------------------------------- |
| 顶层   | **FU**                                                 | 职能支持部门（后台）                     |
|        | **TBC**                                                | 业务运营部门（前台）                     |
| 功能线 | CP, COU, LC, HR, CG                                    | 技术平台、财务、法务、人力、治理         |
| 业务线 | OBC, BD, BMC, PBM, KA, CSC, SSC, PR, CS, DTP, SDA, CRC | 眼科产品、销售、市场、客户、临床、研发等 |

🌳 **公司组织架构树状表**

```
公司
├── FU（Functional Units） 职能单元（后台支持部门）
│   ├── CP（Corporate Platform）企业平台部
│   │   ├── DATA：数据部（Data Management & Analytics）
│   │   ├── IT：信息技术部（Information Technology）
│   │   ├── DEV：研发工程部（Software Development）
│   │   ├── SE：系统工程部（System Engineering）
│   │   └── OPS：运维支持部（Operations Support）
│   ├── COU（Corporate Operations Unit）企业运营部
│   │   └── Finance：财务部
│   ├── LC（Legal & Compliance）法务与合规部
│   │   ├── Legal：法务
│   │   └── IP：知识产权（Intellectual Property）
│   ├── HR：人力资源部（Human Resources）
│   └── CG（Corporate Governance）公司治理部
│       └── AUD：审计部（Audit）
│
└── TBC（Therapy Business Cluster）治疗业务集群（核心业务前线）
    ├── OBC（Ophthalmic Business Center）眼科业务中心
    │   ├── OMP：眼科医疗产品（Ophthalmic Medical Products）
    │   ├── OCS：眼科临床服务（Ophthalmic Clinical Services）
    │   └── OSC：眼科销售与商业化（Ophthalmic Sales & Commercialization）
    ├── BD：业务拓展部（Business Development）
    ├── BMC（Business Management Center）业务管理中心
    │   ├── BMN：北方区（Business Management - North）
    │   └── BMS：南方区（Business Management - South）
    ├── PBM（Product & Business Management）产品与业务管理部
    │   ├── BOU：业务运营单元（Business Operation Unit）
    │   ├── MOC：市场运营中心（Market Operation Center）
    │   ├── TOS：技术与运营支持（Technology & Operation Support）
    │   ├── SHS：销售与医院支持（Sales & Hospital Support）
    │   └── CRA：临床研究部（Clinical Research Associates）
    ├── KA（Key Accounts）大客户部
    │   ├── AK：重点客户组（Account Key）
    │   ├── XC：拓展客户组（eXpansion Customer）
    │   └── INSKA：保险大客户（Insurance Key Accounts）
    ├── CSC：客户服务中心（Customer Service Center）
    ├── SSC（Shared Service Center）共享服务中心
    │   ├── RCS：区域客户服务（Regional Customer Service）
    │   ├── SDC：服务交付中心（Service Delivery Center）
    │   ├── MRS：维修响应服务（Maintenance & Repair Service）
    │   ├── OH：运营枢纽（Operation Hub）或 职业健康（Occupational Health）
    │   └── MQ：维修质量（Maintenance Quality）
    ├── PR：公共关系部（Public Relations）
    ├── CS（Customer Success）客户成功部
    │   ├── CSSE：客户成功-软件工程（Customer Success - Software & Engineering）
    │   ├── CSNW：客户成功-网络/西北区（Customer Success - Network / North West）
    │   └── ASS：应用支持/售后支持（Application Support Specialist / After-Sales Support）
    ├── DTP：数字治疗平台（Digital Therapeutics Platform）或 直达患者（Direct-to-Patient）
    ├── SDA：软件开发与分析部（Software Development & Analytics）
    └── CRC（Clinical & Research Center）临床与研究中心
        ├── PDC：产品开发协调（Product Development Coordination）
        ├── PMC：项目管理中心（Project Management Center）
        ├── MMT：多学科团队（Multi-disciplinary Team）
        └── DAS：开发与支持（Develop and Support）✅（已确认）
```

🔍 **说明与建议**

1. **TBC 含义**：  
   “TBC” 通常意为 “To Be Confirmed”，但在组织架构中作为顶级部门名不合理。结合上下文，最可能是 **Therapy Business Cluster**（治疗业务集群），突出以眼科为核心的业务体系。
3. **命名一致性**：  
   建议未来统一命名规则，例如：
   - 区域：North / South / East / West
   - 职能：Support / Management / Operations / Center
   - 避免模糊缩写如 XC、AK，可改为更清晰的命名。
4. **医疗行业特性体现**：  
   - CRA、CRC、IP、Clinical 等部门的存在，符合医疗器械公司对临床试验、合规、专利保护的高要求。
   - DTP、SDA、CS 等体现软件+硬件+服务一体化趋势。
