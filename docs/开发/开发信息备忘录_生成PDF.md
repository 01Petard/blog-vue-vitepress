# 打印眼底报告完整报告

**鹰瞳医疗视网膜检查报告**

检查号：25838277

体检号：8991424304354

```shell
{
    "0": "/data/ikang/pdf_medical/25838277-8991424304354-251119104809-complete.pdf", 
    "command": "/opt/phantomjs /opt/print.js 'https://pe.airdoc.com/pc-v2/print-ytmedical/a2V5LWJqajY4ZDUzNzVjajQ4b3owdXI0Zy1qMTEzbGF0dDd0HJQ%2FlLD252wJGEObCHR0lRlddvWTUjJS9adzx6sPSJ59BHpe?language=zh_CN' '/data/ikang/pdf_medical' '25838277-8991424304354-251119104809-complete.pdf' 'Airdoc鹰瞳' '%E9%BB%84%E6%B3%BD%E6%A0%A1 8991424304354' '报告咨询: 400-100-3999' '0.8'", 
    "strlen": 1140937, 
    "file_exist": true
}
```

https://pe.airdoc.com/pc-v2/print-ytmedical/a2V5LWJqajY4ZDUzNzVjajQ4b3owdXI0Zy1qMTEzbGF0dDd0HJQ%2FlLD252wJGEObCHR0lRlddvWTUjJS9adzx6sPSJ59BHpe?language=zh_CN%27%20%27/data/ikang/pdf_medical%27%20%2725838277-8991424304354-251119104809-complete.pdf

**风险评估报告**

检查号：25838277

体检号：8991424304354

```shell
{
    "0": "/data/ikang/pdf_medical/25838277-8991424304354-251119104809-complete-health.pdf", 
    "command": "/opt/phantomjs /opt/print.js 'https://pe.airdoc.com/pc-v2/ytHeathyPdfPE?en_check_id=a2V5LWJqajY4ZDUzNzVjajQ4b3owdXI0Zy1qMTEzbGF0dDd0HJQ%2FlLD252wJGEObCHR0lRlddvWTUjJS9adzx6sPSJ59BHpe&language=zh_CN' '/data/ikang/pdf_medical' '25838277-8991424304354-251119104809-complete-health.pdf' 'Airdoc鹰瞳' '%E9%BB%84%E6%B3%BD%E6%A0%A1 8991424304354' '报告咨询: 400-100-3999' '0.88'", 
    "strlen": 1140937, 
    "strlen_health": 220946, 
    "file_exist": true, 
    "file_exist_health": true
}
```

https://pe.airdoc.com/pc-v2/ytHeathyPdfPE?en_check_id=a2V5LWJqajY4ZDUzNzVjajQ4b3owdXI0Zy1qMTEzbGF0dDd0HJQ%2FlLD252wJGEObCHR0lRlddvWTUjJS9adzx6sPSJ59BHpe&language=zh_CN

# 打印眼底报告完整报告

**鹰瞳医疗视网膜检查报告**

检查号：25838277

体检号：8991424304354

```shell
{
    "0": "/data/ikang/pdf_medical/25838277-8991424304354-251119104826-simple.pdf", 
    "command": "/opt/phantomjs /opt/print.js 'https://pe.airdoc.com/pc-v2/print-ytmedical/a2V5LWJqajY4ZDUzNzVjajQ4b3owdXI0Zy1qMTEzbGF0dDd0HJQ%2FlLD252wJGEObCHR0lRlddvWTUjJS9adzx6sPSJ59BHpe?simple=true&language=zh_CN' '/data/ikang/pdf_medical' '25838277-8991424304354-251119104826-simple.pdf' 'Airdoc鹰瞳' '%E9%BB%84%E6%B3%BD%E6%A0%A1 8991424304354' '报告咨询: 400-100-3999' '0.8'", 
    "strlen": 458176, 
    "file_exist": true
}
```

https://pe.airdoc.com/pc-v2/print-ytmedical/a2V5LWJqajY4ZDUzNzVjajQ4b3owdXI0Zy1qMTEzbGF0dDd0HJQ%2FlLD252wJGEObCHR0lRlddvWTUjJS9adzx6sPSJ59BHpe?simple=true&language=zh_CN

**风险评估报告**

检查号：25838277

体检号：8991424304354

```shell
{
    "0": "/data/ikang/pdf_medical/25838277-8991424304354-251119104826-simple-health.pdf", 
    "command": "/opt/phantomjs /opt/print.js 'https://pe.airdoc.com/pc-v2/ytHeathyPdfPE?en_check_id=a2V5LWJqajY4ZDUzNzVjajQ4b3owdXI0Zy1qMTEzbGF0dDd0HJQ%2FlLD252wJGEObCHR0lRlddvWTUjJS9adzx6sPSJ59BHpe&simple=true&language=zh_CN' '/data/ikang/pdf_medical' '25838277-8991424304354-251119104826-simple-health.pdf' 'Airdoc鹰瞳' '%E9%BB%84%E6%B3%BD%E6%A0%A1 8991424304354' '报告咨询: 400-100-3999' '0.88'", 
    "strlen": 458176, 
    "strlen_health": 220946, 
    "file_exist": true, 
    "file_exist_health": true
}
```

https://pe.airdoc.com/pc-v2/ytHeathyPdfPE?en_check_id=a2V5LWJqajY4ZDUzNzVjajQ4b3owdXI0Zy1qMTEzbGF0dDd0HJQ%2FlLD252wJGEObCHR0lRlddvWTUjJS9adzx6sPSJ59BHpe&simple=true&language=zh_CN

# 钉钉推送阳性警示单

## 环境准备

获取`node`路径

```shell
npm config get prefix
```

检查是否有`puppeteer`

```shell
npm list puppeteer
```

下载`puppeteer`

```shell
npm install puppeteer
```

## json配置

> OSS链接：`oss://airdoc-ada/fundus/positive-case/`
>
> task配置：
>
> ```
> // 内蒙古瑞众
> 2 => 'dev/config_nmgrz_2.json',
> 3 => 'test/config_nmgrz_2.json',
> 4 => 'prod/config_nmgrz_2.json',
> // 宁夏电信
> 5 => 'dev/config_nxdx.json',
> 6 => 'test/config_nxdx.json',
> 7 => 'prod/config_nxdx.json'
> ```

[开发](http://ada-res.airdoc.com/fundus/positive-case/dev/config_nmgrz.json)

```json
{
  "title": "开发dev",
  "org_ids": "40456,40540",
  "last_days": 9999,
  "next_days": 1,
  "url": "https://staging-admin.airdoc.com/admin/WarningTicketGroup",
  "node": "NODE_PATH=/Users/huangzexiao/project/node_modules /Users/huangzexiao/.nvm/versions/node/v22.14.0/bin/node",
  "webhook": "https://oapi.dingtalk.com/robot/send?access_token=7c9bd0b8efba201fce31e407dea2463d1a015ab1cbe89f75594ddf6222f95653"
}
```

[测试](http://ada-res.airdoc.com/fundus/positive-case/test/config_nmgrz.json)

```json
{
  "title": "测试test",
  "org_ids": "40456,40540",
  "last_days": 9999,
  "next_days": 1,
  "sn_list": "FD08DWCNW220390000S0,FD08DWCNW220390000S2,FG05DSCNW52129009102",
  "url": "https://staging-admin.airdoc.com/admin/WarningTicketGroup",
  "node": "/opt/node-v12.16.1/bin/node",
  "webhook": "https://oapi.dingtalk.com/robot/send?access_token=7c9bd0b8efba201fce31e407dea2463d1a015ab1cbe89f75594ddf6222f95653"
}
```

[生产](http://ada-res.airdoc.com/fundus/positive-case/prod/config_nmgrz.json)

```json
{
  "title": "瑞众人寿内蒙古分公司",
  "org_ids": "45112,47153,48247,48261",
  "last_days": 0,
  "next_days": 1,
  "sn_list": "FN12510A037AB0020PW8,FN12509A123AB0020P82,FN12509A098AA0020PP8,FN12510A027AA0020PW0,FN12509A089AA0020PP1,FN12510A034AA0020PWG,FN12509A139AA0020P8W,FN12509A072AA0020PHF,FN12509A135AA0020P8T,FN12509A055AB0020PH0,FN12509A106AA0020PPW,FN12510A045AA0020PWW,FN12509A013AB0020P54,FN12509A125AB0020P8U,FN12509A156AB0020PV2,FN12509A083AA0020PHE,FF12250A398AA00200WD,FF12250A121AA0020082,FF12317A046AA002028V,FF12307A142AA002011Z,FF12306A103AA002004M,FF12317A035AA0020280,FF12317A085AB00202VF,FF12324A185AA00203DU,FF12307A054AA00200Z8,FF12324A186AB00203D9,FF12307A376AB00201P2,FN12509A164AA0020PV8,FN12509A109AB0020PPK,FN12435A041AA0020GY5,FN12330A088AB0020UVK,FN12433A007AA0020GWW,FN12433A247AA0020GNL,FN12435A179AA0020H1A,FN12509A138AB0020P8F,FN12433A108AA0020GK6,FN12509A191AA0020PAU,FN12509A102AA0020PPT,FN12435A002AB0020G70,FN12435A147AB0020H0B,FN12509A117AA0020PP7,FN12432A037AA0020GC4,FN12325C152AB0020U10,FN12433A174AB0020GM6,FN12509A090AA0020PP2,FN12338A130AB0020URW,FN12509A054AA0020PGZ,FN12433A034AA0020GJA,FN12509A031AB0020PGP,FN12338A119AA0020URG,FN12509A149AB0020P8E,FN12509A207AA0020PA6,FN12409A030AB002053P,FN12432A017AA0020GCU,FN12432A051AA0020GF9,FN12435A194AB0020H1L,FN12432A027AB0020GCT,FN12432A009AB0020GD7,FN12433A150AB0020GR7,FN12325B035AB00203NY,FN12432A008AA0020GDE,FN12432A048AA0020GF2,FN12435A153AA0020H0J,FN12324B029AB00203CD",
  "url": "https://ikang-admin.airdoc.com/admin/WarningTicketGroup",
  "node": "/usr/bin/node",
  "webhook": "https://oapi.dingtalk.com/robot/send?access_token=f127bbdc9da41df26f10277c26a281703fea3d38fd6bb6c94ece5f03220546ef"
}
```

删除冗余文件：

```shell
rm -f /tmp/alarm_20250
```

## 手动推送

开发

```shell
NODE_PATH=/Users/huangzexiao/project/node_modules
```

```shell
php ~/project/eye-ak/public/script.php PushDingtalkPositiveAlarmMsg taskId 1
```

> 其中`GetPositiveCaseAlarmInfo`接口的配置是走的`dev`环境，但是`PushDingtalkPositiveAlarmMsg`中下载的pdf的配置是来自`test`环境的

测试

```shell
php /var/www/test-eye/public/script.php PushDingtalkPositiveAlarmMsg taskId 1
```

生产

```shell
php /var/www/eye/public/script.php PushDingtalkPositiveAlarmMsg taskId 1
```

## 定时任务脚本

开发

```shell
# v2.4
*/1 * * * *  /opt/homebrew/opt/php@7.4/bin/php ~/project/eye-ak/public/script.php PushDingtalkPositiveAlarmMsg taskId 1 >> /tmp/alarm_cron_test.log 2>&1
```

测试

```shell
crontab -e
```

```shell
# v2.4
*/1 * * * * flock -xn /tmp/PushDingtalkPositiveAlarmMsg.lock -c "/usr/bin/php /var/www/test-eye/public/script.php PushDingtalkPositiveAlarmMsg taskId 1" >> /tmp/alarm_cron_test.log 2>&1

00 18 * * * flock -xn /tmp/PushDingtalkPositiveAlarmMsg.lock -c "/usr/bin/php /var/www/test-eye/public/script.php PushDingtalkPositiveAlarmMsg taskId 1" >> /tmp/alarm_cron_daily.log 2>&1

# 内蒙古瑞众阳性警示单推送
00 18 * * * flock -xn /tmp/PushDingtalkPositiveAlarmMsg_taskId-3.lock -c "/usr/bin/php /var/www/eye/public/script.php PushDingtalkPositiveAlarmMsg taskId 3" >> /tmp/alarm_cron_daily_taskId-3.log 2>&1
# 宁夏电信阳性警示单推送
00 18 * * * flock -xn /tmp/PushDingtalkPositiveAlarmMsg_taskId-6.lock -c "/usr/bin/php /var/www/eye/public/script.php PushDingtalkPositiveAlarmMsg taskId 6" >> /tmp/alarm_cron_daily_taskId-6.log 2>&1
```

生产

```shell
crontab -e -l hailong
```

```shell
# v2.1
#*/1 * * * * flock -xn /tmp/PushDingtalkPositiveAlarmMsg.lock -c '/usr/bin/php /var/www/eye/public/script.php PushDingtalkPositiveAlarmMsg' >> /tmp/alarm_cron_test.log 2>&1
00 18 * * * flock -xn /tmp/PushDingtalkPositiveAlarmMsg.lock -c '/usr/bin/php /var/www/eye/public/script.php PushDingtalkPositiveAlarmMsg' >> /tmp/alarm_cron_daily.log 2>&1

# v2.4
*/1 * * * * flock -xn /tmp/PushDingtalkPositiveAlarmMsg.lock -c "/usr/bin/php /var/www/eye/public/script.php PushDingtalkPositiveAlarmMsg taskId 1" >> /tmp/alarm_cron_test.log 2>&1
00 18 * * * flock -xn /tmp/PushDingtalkPositiveAlarmMsg.lock -c "/usr/bin/php /var/www/eye/public/script.php PushDingtalkPositiveAlarmMsg taskId 1" >> /tmp/alarm_cron_daily.log 2>&1

# 内蒙古瑞众阳性警示单推送
#00 18 * * * flock -xn /tmp/PushDingtalkPositiveAlarmMsg_taskId-4.lock -c "/usr/bin/php /var/www/eye/public/script.php PushDingtalkPositiveAlarmMsg taskId 4" >> /tmp/alarm_cron_daily_taskId-4.log 2>&1

# 宁夏电信阳性警示单推送
00 18 * * * flock -xn /tmp/PushDingtalkPositiveAlarmMsg_taskId-7.lock -c "/usr/bin/php /var/www/eye/public/script.php PushDingtalkPositiveAlarmMsg taskId 7" >> /tmp/alarm_cron_daily_taskId-7.log 2>&1
```

## 下载pdf命令

根据`test`环境的配置，下载历史上所有的阳性警示单

> 可选taskId=2、3、5、6

```shell
node ~/project/eye-ak/misc/pdf_generator/print-v3.js \
  --url "https://staging-admin.airdoc.com/admin/WarningTicketGroup?taskId=2" \
  --path "/tmp/alarm_$(date +%Y%m%d)" \
  --fileName "alarm_$(date +%Y%m%d_%H%M%S).pdf" \
  --zoom 0.9
```

根据`prod`环境的配置，下载当天的阳性警示单

> 可选taskId=4、7

```shell
node ~/project/eye-ak/misc/pdf_generator/print-v3.js \
  --url "https://ikang-admin.airdoc.com/admin/WarningTicketGroup?taskId=4" \
  --path "/tmp/alarm_$(date +%Y%m%d)" \
  --fileName "alarm_$(date +%Y%m%d_%H%M%S).pdf" \
  --zoom 0.9
```

## 后续优化

`PushDingtalkPositiveAlarmMsg`默认读取的是`dev`中的配置，这不对

`GetPositiveCaseAlarmInfo`还是按域名读的，应该按env参数读

# 推送国内和海外警示单图片

本地打印测试：

```shell
node /Users/hzx/project/print-reactive-cookie-image.js \
  "https://staging-admin.airdoc.com/admin/WarningTicket?status=1&checkId=3431373&language=en" \
  "/tmp/alarm" \
  "alarm_test_333.png" \
  "" \
  "fantastic" \
  "783569961320c56167147ffc892bd0f7" \
```

本地打印线上：

```shell
node /Users/hzx/project/print-reactive-cookie-image.js \
  "https://ikang-admin.airdoc.com/admin/WarningTicket?checkId=22624037&status=1" \
  "/Users/hzx/Downloads" \
  "alarm_1.pdf" \
  "" \
  "fantastic" \
  "bb80072549c768d974d14e1ee31f5b42"
```

线上打印：

```shell
/opt/phantomjs /opt/print-alarm-report.js \
  'https://staging-admin.airdoc.com/admin/WarningTicket?status=1&checkId=3446836&language=en' \
  '/var/log/airlog/alarm_autopush_print/202511/07' \
  'alarm_3446836_251107214600.png' \
  '' \
  'fantastic' \
  'bb80072549c768d974d14e1ee31f5b42'
```

# 无cookie下载pdf

打印HRV报告

```shell
node ~/project/eye-ak/misc/pdf_generator/print-v3.js \
  --url "https://mpd.babyeye.com/hrvreport?language=zh_CN&reportId=1982955593823948802" \
  --path "/Users/hzx/Downloads/alarm_$(date +%Y%m%d)" \
  --fileName "alarm_$(date +%Y%m%d_%H%M%S).pdf" \
  --zoom 0.9
```

本地运行命令：

北师大版

```shell
node ~/project/print-realstyle-nocookie-pdf.js \
  --url 'https://test-neuro-ai.airdoc.com/hrvreport?language=zh-CN&reportId=1996474764382801921' \
  --path '/Users/hzx/Downloads' \
  --fileName '{$filename}' \
  --zoom '0.9'
```

V2版：

```shell
node ~/project/print-realstyle-nocookie-pdf.js \
  --url 'https://neuro-ai.airdoc.com/hrvreport?language=zh-CN&reportId=2004000887084683265' \
  --path '/Users/hzx/Downloads' \
  --fileName '{$filename}' \
  --zoom '0.9'
```

**Linux 机器上的运行情况**

1. **如果 Linux 机器已安装 Puppeteer 和 Chrome/Chromium：**

   - ✅ 脚本可以正常运行。
   - 脚本能自动检测常见的 Chrome/Chromium 安装路径。
   - 支持的典型路径包括：
     - `/usr/bin/google-chrome`
     - `/usr/bin/chromium-browser`
     - `/snap/bin/chromium`
     - 以及其他标准系统路径。

2. **Linux 环境准备步骤：**

   **安装 Google Chrome（适用于 Ubuntu/Debian）：**

   ```bash
   sudo apt-get update
   sudo apt-get install -y google-chrome-stable
   ```

   **或安装 Chromium：**

   ```bash
   sudo apt-get install -y chromium-browser
   ```

   **安装 Node.js 和 Puppeteer：**

   ```bash
   npm install puppeteer
   ```

3. **脚本特性：**

   - 🔄 **跨平台支持**：自动识别运行环境（Linux、macOS、Windows）。
   - 🔍 **智能浏览器路径探测**：按优先级尝试多个常见 Chrome/Chromium 安装位置。
   - 🎯 **自动降级机制**：若未找到系统中已安装的 Chrome，会回退使用 Puppeteer 自带的 Chromium。
   - 📝 **详细日志输出**：运行时会打印实际使用的浏览器可执行文件路径，便于调试。

4. **Linux 专用优化：**

   - 保留了 `--no-sandbox` 参数（在非 root 用户或容器环境中通常必需）。
   - 保留了 `--disable-dev-shm-usage` 参数（防止因 `/dev/shm` 内存不足导致崩溃，尤其在 Docker 中常见）。

# 带cookie下载pdf（原汁原味的网页）

```shell
# 默认PC版，缩放1.00
node ~/project/print-realstyle-cookie-pdf.js \
  "https://ikang-admin.airdoc.com/admin/WarningTicket?checkId=25710228&status=1" \
  "/tmp" \
  "25710228.pdf" \
  "bb80072549c768d974d14e1ee31f5b42" \
  "ikang-admin.airdoc.com"

# 指定PC版，缩放0.8
node ~/project/print-realstyle-cookie-pdf.js \
  "https://ikang-admin.airdoc.com/admin/WarningTicket?checkId=25710228&status=1" \
  "/tmp" \
  "25710228.pdf" \
  "bb80072549c768d974d14e1ee31f5b42" \
  "ikang-admin.airdoc.com" \
  "pc" \
  "0.7"

# 指定移动版，缩放1.00
node ~/project/print-realstyle-cookie-pdf.js \
  "https://ikang-admin.airdoc.com/admin/WarningTicket?checkId=25710228&status=1" \
  "/tmp" \
  "25710228.pdf" \
  "bb80072549c768d974d14e1ee31f5b42" \
  "ikang-admin.airdoc.com" \
  "mobile"
```

# 带cookie打印pdf

打印眼底警示单

```shell
node /Users/hzx/project/print-style-cookie-pdf.js \
  --url "https://ikang-admin.airdoc.com/admin/WarningTicket?checkId=25710228&status=1" \
  --fold "/Users/hzx/Downloads" \
  --file "25710228.pdf" \
  --cookie "bb80072549c768d974d14e1ee31f5b42" \
  --zoom "0.70"
```

打印抗压报告

```shell
node /Users/hzx/project/print-style-cookie-pdf.js \
  --url "https://neuro-ai.airdoc.com/hrvreport?language=zh-CN&reportId=2004000887084683265" \
  --fold "/Users/hzx/Downloads" \
  --file "123.pdf" \
  --cookie "bb80072549c768d974d14e1ee31f5b42" \
  --zoom "0.95"
```

```shell
node /Users/hzx/project/print-style-cookie-pdf.js \
  --url "https://neuro-ai.airdoc.com/hrvreport?language=zh-CN&reportId=2004000887084683265" \
  --fold "/Users/hzx/Downloads"
```

# 部署PDF生成Docker服务

### 停止并删除旧容器

```shell
docker stop print-service && docker rm print-service
```

### 构建 Docker 镜像

方案 1：使用 ARM64 平台

```shell
docker build --platform linux/arm64 -t print-service .
```

方案 2：使用 AMD64 平台

```
docker build --platform linux/amd64 -t print-service .
```

### 启动容器

```shell
docker run -d -p 3050:3050 --name print-service print-service
```

```shell
docker run -d -p 3050:3050 -v /tmp/report:/tmp/report --name print-service print-service
```

### 进入容器测试网络

```shell
docker exec -it print-service bash
```

测试网络连接

```shell
curl -I https://www.baidu.com
```

```shell
curl -I https://neuro-ai.airdoc.com
```

### 查看日志

```shell
docker logs -f print-service
```

# 部署HRV算法服务

### 运行容器

```shell
docker stop mpd_analyse && docker rm mpd_analyse
```

```shell
docker build -t mpd_analyse:2.1 .
```

```shell
docker run -d -p 127.0.0.1:8723:8723 --name mpd_analyse mpd_analyse:2.1
```

### 打包镜像

```shell
docker save -o mpd_analyse.tar mpd_analyse:2.1
```

### 加载镜像

```shell
docker load -i mpd_analyse.tar
```

### *使用 Docker Hub*

```shell
docker tag mpd_analyse:latest your-username/mpd_analyse:latest
```

```shell
docker push your-username/mpd_analyse:latest
```

### *使用私有仓库*

```shell
docker tag mpd_analyse:latest registry.example.com/mpd_analyse:latest
```

```shell
docker push registry.example.com/mpd_analyse:latest
```
