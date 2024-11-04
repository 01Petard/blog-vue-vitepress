---
title: 阿里云OSS && 内容安全 Java实现参考代码
date: 2024-04-01 22:20:00
updated: 2024-04-01 22:20:00
categories: 
- 学习
tags: 
- 阿里云
- OSS
- 内容安全
keywords:
- 阿里云
- OSS
- 内容安全
description: 阿里云OSS && 内容安全 Java实现参考代码
cover: https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202410212051708.jpeg
top_img: https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202410212052354.jfif
---

## 内容安全

### 引入maven依赖

```xml
<dependency>
    <groupId>com.aliyun</groupId>
    <artifactId>aliyun-java-sdk-core</artifactId>
</dependency>

<dependency>
    <groupId>com.aliyun</groupId>
    <artifactId>aliyun-java-sdk-green</artifactId>
</dependency>

<!--内容安全-->
<dependency>
    <groupId>com.aliyun</groupId>
    <artifactId>green20220302</artifactId>
    <version>1.0.3</version>
</dependency>

<!--智能视觉（这是额外内容，如无必要无需引入）->
<dependency>
    <groupId>com.aliyun</groupId>
    <artifactId>imageaudit20191230</artifactId>
    <version>2.0.6</version>
</dependency>
```

### 创建方法类

```java
package com.heima.wemedia;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.aliyun.green20220302.Client;
import com.aliyun.green20220302.models.*;
import com.aliyun.teaopenapi.models.Config;
import com.aliyun.teautil.models.RuntimeOptions;
 
import java.util.*;
import java.util.stream.Collectors;
 
public class AliAutoRoute {
    public static final String AUDIT_BY_REJECT = "reject";  //审核拒绝
    public static final String AUDIT_BY_PASS = "pass";  //审核通过
    private static final String AccessKeyId = "LTAI5tM72ks5rAhK65eby5goXXXXXXXXXX";  //审核通过
    private static final String AccessKeySecret = "nbHAq1DbaCysOQeAO3c24KXkuTIni0XXXXXXXXXX";  //审核通过
 
    public static Map<String,String> imgAutoRoute(String imgUrl){
        Config config = new Config();
        /**
         * 阿里云账号AccessKey拥有所有API的访问权限，建议您使用RAM用户进行API访问或日常运维。
         * 常见获取环境变量方式：
         * 方式一：
         *     获取RAM用户AccessKey ID：System.getenv("ALIBABA_CLOUD_ACCESS_KEY_ID");
         *     获取RAM用户AccessKey Secret：System.getenv("ALIBABA_CLOUD_ACCESS_KEY_SECRET");
         * 方式二：
         *     获取RAM用户AccessKey ID：System.getProperty("ALIBABA_CLOUD_ACCESS_KEY_ID");
         *     获取RAM用户AccessKey Secret：System.getProperty("ALIBABA_CLOUD_ACCESS_KEY_SECRET");
         */
        config.setAccessKeyId(AliAutoRoute.AccessKeyId);
        config.setAccessKeySecret(AliAutoRoute.AccessKeySecret);
        // 接入区域和地址请根据实际情况修改。
        config.setRegionId("cn-shanghai");
        config.setEndpoint("green-cip.cn-shanghai.aliyuncs.com");
        // 连接时超时时间，单位毫秒（ms）。
        config.setReadTimeout(6000);
        // 读取时超时时间，单位毫秒（ms）。
        config.setConnectTimeout(3000);
        // 设置http代理。
        // config.setHttpProxy("http://10.10.xx.xx:xxxx");
        // 设置https代理。
        //config.setHttpsProxy("https://10.10.xx.xx:xxxx");
        // 注意，此处实例化的client请尽可能重复使用，避免重复建立连接，提升检测性能。
        Client client = null;
        try {
            client = new Client(config);
        } catch (Exception e) {
            e.printStackTrace();
        }
 
        // 创建RuntimeObject实例并设置运行参数。
        RuntimeOptions runtime = new RuntimeOptions();
        runtime.readTimeout = 10000;
        runtime.connectTimeout = 10000;
 
        // 检测参数构造。
        Map<String, String> serviceParameters = new HashMap<>();
        //公网可访问的URL。
        serviceParameters.put("imageUrl",imgUrl);
        serviceParameters.put("dataId", UUID.randomUUID().toString());
 
        ImageModerationRequest request = new ImageModerationRequest();
        // 图片检测service: baselineCheck通用基线检测。
        request.setService("profilePhotoCheck");
        request.setServiceParameters(JSON.toJSONString(serviceParameters));
 
        try {
            ImageModerationResponse response = null;
            if (client != null) {
                response = client.imageModerationWithOptions(request, runtime);
            }
            // 自动路由。
            if (response != null) {
                // 服务端错误，区域切换到cn-beijing。
                if (500 == response.getStatusCode() || (response.getBody() != null && 500 == (response.getBody().getCode()))) {
                    // 接入区域和地址请根据实际情况修改。
                    config.setRegionId("cn-shanghai");
                    config.setEndpoint("green.cn-shanghai.aliyuncs.com");
//                    config.setRegionId("cn-beijing");
//                    config.setEndpoint("green-cip.cn-beijing.aliyuncs.com");
                    client = new Client(config);
                    response = client.imageModerationWithOptions(request, runtime);
                }
            }
            // 打印检测结果。
            if (response != null) {
                if (response.getStatusCode() == 200) {
                    ImageModerationResponseBody body = response.getBody();
                    System.out.println("requestId=" + body.getRequestId());
                    System.out.println("code=" + body.getCode());
                    System.out.println("msg=" + body.getMsg());
                    if (body.getCode() == 200) {
                        ImageModerationResponseBody.ImageModerationResponseBodyData data = body.getData();
                        System.out.println("dataId=" + data.getDataId());
                        List<ImageModerationResponseBody.ImageModerationResponseBodyDataResult> results = data.getResult();
                        for (ImageModerationResponseBody.ImageModerationResponseBodyDataResult result : results) {
                            System.out.println("label=" + result.getLabel());
                            System.out.println("confidence=" + result.getConfidence());
                            //TODO
                            return new AliAutoRoute().checkPhotoStatus(result.getLabel());
                        }
                    } else {
                        System.out.println("image moderation not success. code:" + body.getCode());
                        return null;
                    }
 
 
                } else {
                    System.out.println("response not success. status:" + response.getStatusCode());
                    return null;
                }
 
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
 
        return null;
 
    }
 
    public static Map<String,String> textAutoRoute(String text){
        Config config = new Config();
        /**
         * 阿里云账号AccessKey拥有所有API的访问权限，建议您使用RAM用户进行API访问或日常运维。
         * 常见获取环境变量方式：
         * 方式一：
         *     获取RAM用户AccessKey ID：System.getenv("ALIBABA_CLOUD_ACCESS_KEY_ID");
         *     获取RAM用户AccessKey Secret：System.getenv("ALIBABA_CLOUD_ACCESS_KEY_SECRET");
         * 方式二：
         *     获取RAM用户AccessKey ID：System.getProperty("ALIBABA_CLOUD_ACCESS_KEY_ID");
         *     获取RAM用户AccessKey Secret：System.getProperty("ALIBABA_CLOUD_ACCESS_KEY_SECRET");
         */
        config.setAccessKeyId(AliAutoRoute.AccessKeyId);
        config.setAccessKeySecret(AliAutoRoute.AccessKeySecret);
        //接入区域和地址请根据实际情况修改
        config.setRegionId("cn-shanghai");
        config.setEndpoint("green-cip.cn-shanghai.aliyuncs.com");
        //连接时超时时间，单位毫秒（ms）。
        config.setReadTimeout(6000);
        //读取时超时时间，单位毫秒（ms）。
        config.setConnectTimeout(3000);
        //设置http代理。
        //config.setHttpProxy("http://10.10.xx.xx:xxxx");
        //设置https代理。
        //config.setHttpsProxy("https://10.10.xx.xx:xxxx");
        // 注意，此处实例化的client请尽可能重复使用，避免重复建立连接，提升检测性能
        Client client = null;
        try {
            client = new Client(config);
        } catch (Exception e) {
            e.printStackTrace();
        }
 
        // 创建RuntimeObject实例并设置运行参数。
        RuntimeOptions runtime = new RuntimeOptions();
        runtime.readTimeout = 10000;
        runtime.connectTimeout = 10000;
 
        //检测参数构造
        JSONObject serviceParameters = new JSONObject();
        serviceParameters.put("content", text);
 
        if (serviceParameters.get("content") == null || serviceParameters.getString("content").trim().isEmpty()) {
            System.out.println("text moderation content is empty");
            return null;
        }
 
        TextModerationRequest textModerationRequest = new TextModerationRequest();
        /*
        文本检测服务 service code
        */
        textModerationRequest.setService("comment_detection");
        textModerationRequest.setServiceParameters(serviceParameters.toJSONString());
        try {
            // 调用方法获取检测结果。
            TextModerationResponse response = null;
            if (client != null) {
                response = client.textModerationWithOptions(textModerationRequest, runtime);
            }

            // 自动路由。
            if (response != null) {
                // 服务端错误，区域切换到cn-beijing。
                if (500 == response.getStatusCode() || (response.getBody() != null && 500 == (response.getBody().getCode()))) {
                    // 接入区域和地址请根据实际情况修改。
                    config.setRegionId("cn-beijing");
                    config.setEndpoint("green-cip.cn-beijing.aliyuncs.com");
                    client = new Client(config);
                    response = client.textModerationWithOptions(textModerationRequest, runtime);
                }
 
            }
            // 打印检测结果。
            if (response != null) {
                if (response.getStatusCode() == 200) {
                    TextModerationResponseBody result = response.getBody();
                    System.out.println(JSON.toJSONString(result));
                    Integer code = result.getCode();
                    if (code != null && code == 200) {
                        TextModerationResponseBody.TextModerationResponseBodyData data = result.getData();
                        System.out.println("labels = [" + data.getLabels() + "]");
                        System.out.println("reason = [" + data.getReason() + "]");
                        return new AliAutoRoute().checkTextStatus(data.getLabels());
                    } else {
                        System.out.println("text moderation not success. code:" + code);
                        return null;
                    }
                } else {
                    System.out.println("response not success. status:" + response.getStatusCode());
                    return null;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
 
 
    public Map<String,String> checkTextStatus(String labels){
        HashMap<String, String> map = new HashMap<>();
        if (labels == null || labels.isEmpty()){
            map.put("status",AliAutoRoute.AUDIT_BY_PASS);
            return map;
        }
        map.put("status",AliAutoRoute.AUDIT_BY_REJECT);
        StringBuilder content = new StringBuilder("审核拒绝原因：");
        List<String> collect = Arrays.stream(labels.split(",")).collect(Collectors.toList());
        if (!collect.isEmpty()){
            for (String s : collect) {
                switch (s) {
                    case "political_content":
                        System.out.println("涉政内容");
                        content.append("涉政内容");
                        break;
                    case "sexual_content":
                        System.out.println("色情内容");
                        content.append("色情内容");
                        break;
                    case "violence":
                        System.out.println("暴恐内容");
                        content.append("暴恐内容");
                        break;
                    case "contraband":
                        System.out.println("违禁内容");
                        content.append("违禁内容");
                        break;
                    case "ad":
                        System.out.println("广告引流内容");
                        content.append("广告引流内容");
                        break;
                    case "religion":
                        System.out.println("宗教内容");
                        content.append("宗教内容");
                        break;
                    case "profanity":
                        System.out.println("辱骂内容");
                        content.append("辱骂内容");
                        break;
                    case "negative_content":
                        System.out.println("不良内容");
                        content.append("不良内容");
                        break;
                    case "nonsense":
                        System.out.println("无意义内容");
                        content.append("无意义内容");
                        break;
                    default:
                        System.out.println("无效的输入");
                        content.append("无效的输入");
                }
            }
        }
        map.put("content", content.toString());
        return map;
    }
 
    //由于返回的检测内容标签过多此处不做处理直接判断结果
    public Map<String,String> checkPhotoStatus(String labels){
        HashMap<String, String> map = new HashMap<>();
        if (labels == null || labels.isEmpty() || labels.equals("nonLabel")){
            map.put("status",AliAutoRoute.AUDIT_BY_PASS);
            return map;
        }
        map.put("status",AliAutoRoute.AUDIT_BY_REJECT);
        return map;
    }
}
```

### 使用范例

```java
    @Test
    public void testGreenScan(){
        //文字审查
        String content1 = "我是一个好人，冰毒，鸡巴，习近平，89，64，包子，台独，PS平台独占";
        System.out.println(AliAutoRoute.textAutoRoute(content1));   //审查不通过
        System.out.println("============================");
        String content2 = "我是一个好人，平台独占，独不占";
        System.out.println(AliAutoRoute.textAutoRoute(content2));   //审查通过
        System.out.println("============================");
        
        //图片审查
        String pathUrl1 = "http://192.168.113.132:9100/leadnews/1111.jpg";
        String pathUrl2 = "https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/1111.jpg";
        String pathUrl3 = "https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/2222.jpg";
        String pathUrl4 = "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F5723a630-077e-45c5-9e73-49ed809b3f43%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1694165323&t=149871d4e26b4b9a386e0e98bedc2929";
        System.out.println(AliAutoRoute.imgAutoRoute(pathUrl1));    //一张色情图片
        System.out.println("============================");
        System.out.println(AliAutoRoute.imgAutoRoute(pathUrl2));    //一张色情图片
        System.out.println("============================");
        System.out.println(AliAutoRoute.imgAutoRoute(pathUrl3));    //一张性感图片
        System.out.println("============================");
        System.out.println(AliAutoRoute.imgAutoRoute(pathUrl4));    //一张正常图片
    }
```

### 运行结果

可以看到，在虚拟机中的图片是无法上传的

```
2023-12-09 17:56:47.162 [com.alibaba.nacos.naming.push.receiver] INFO  com.alibaba.nacos.client.naming - received push data: {"type":"dom","data":"{\"name\":\"DEFAULT_GROUP@@leadnews-wemedia\",\"clusters\":\"DEFAULT\",\"cacheMillis\":10000,\"hosts\":[],\"lastRefTime\":1702115807160,\"checksum\":\"\",\"allIPs\":false,\"reachProtectionThreshold\":false,\"valid\":true}","lastRefTime":141061428319847} from /192.168.124.5
{"code":200,"data":{"labels":"contraband,sexual_content,political_content,profanity","reason":"{\"riskTips\":\"违禁_违禁药品,违禁_违禁商品or赌博平台,涉政_现任正国级领导人,违禁_违法犯罪,色情_低俗,涉政_领导人,违禁_涉毒,辱骂_低俗,涉政_敏感人物_领导人,涉政_现任领导\",\"riskWords\":\"鸡巴,包子&近平,習近平,冰毒,鸡巴习,习近平包子,近平,习近平,习&近平,习近\"}"},"message":"OK","requestId":"35319859-4710-5B04-9B39-3C746BFF76EF"}
labels = [contraband,sexual_content,political_content,profanity]
reason = [{"riskTips":"违禁_违禁药品,违禁_违禁商品or赌博平台,涉政_现任正国级领导人,违禁_违法犯罪,色情_低俗,涉政_领导人,违禁_涉毒,辱骂_低俗,涉政_敏感人物_领导人,涉政_现任领导","riskWords":"鸡巴,包子&近平,習近平,冰毒,鸡巴习,习近平包子,近平,习近平,习&近平,习近"}]
违禁内容
色情内容
涉政内容
辱骂内容
{content=审核拒绝原因：违禁内容色情内容涉政内容辱骂内容, status=reject}
============================
{"code":200,"data":{"labels":"","reason":""},"message":"OK","requestId":"771F9202-7873-5F27-BC84-ED3D5C7FDEB7"}
labels = []
reason = []
{status=pass}
============================
requestId=1DABAD96-97D0-5363-B4BB-46C25D8B2D54
code=401
msg=parameter invalid(imageUrl)
image moderation not success. code:401
null
============================
requestId=2273B7B9-598A-5CF8-9DD5-405F9B01DBEA
code=200
msg=success
dataId=a4c02050-ace1-4c9e-8bd3-ceb0a62b9cdf
label=sexual_suggestiveContent
confidence=92.11
{status=reject}
============================
requestId=3C926AAB-41EE-59E2-B63F-26E056A2A047
code=200
msg=success
dataId=dc619bf9-b972-4b9e-b51c-5c9a0b57d2d4
label=sexual_suggestiveContent
confidence=54.63
{status=reject}
============================
requestId=8E3AD023-103D-5384-9FDA-8908605448B6
code=200
msg=success
dataId=a071d51a-0b35-4501-982d-c3cfff6e6536
label=nonLabel
confidence=null
{status=pass}
```

## OSS存储

### 引入maven依赖

```xml
<dependency>
    <groupId>com.aliyun.oss</groupId>
    <artifactId>aliyun-sdk-oss</artifactId>
    <version>3.10.2</version>
</dependency>
```

### 创建方法类

```java
package com.sky.utils;

import com.aliyun.oss.ClientException;
import com.aliyun.oss.OSS;
import com.aliyun.oss.OSSClientBuilder;
import com.aliyun.oss.OSSException;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

import java.io.ByteArrayInputStream;

@Data
@AllArgsConstructor
@Slf4j
public class AliOssUtil {

    private String endpoint;
    private String accessKeyId;
    private String accessKeySecret;
    private String bucketName;

    /**
     * 文件上传
     *
     * @param bytes
     * @param objectName
     * @return
     */
    public String upload(byte[] bytes, String objectName) {

        // 创建OSSClient实例。
        OSS ossClient = new OSSClientBuilder().build(endpoint, accessKeyId, accessKeySecret);

        try {
            // 创建PutObject请求。
            ossClient.putObject(bucketName, objectName, new ByteArrayInputStream(bytes));
        } catch (OSSException oe) {
            System.out.println("Caught an OSSException, which means your request made it to OSS, "
                    + "but was rejected with an error response for some reason.");
            System.out.println("Error Message:" + oe.getErrorMessage());
            System.out.println("Error Code:" + oe.getErrorCode());
            System.out.println("Request ID:" + oe.getRequestId());
            System.out.println("Host ID:" + oe.getHostId());
        } catch (ClientException ce) {
            System.out.println("Caught an ClientException, which means the client encountered "
                    + "a serious internal problem while trying to communicate with OSS, "
                    + "such as not being able to access the network.");
            System.out.println("Error Message:" + ce.getMessage());
        } finally {
            if (ossClient != null) {
                ossClient.shutdown();
            }
        }

        //文件访问路径规则 https://BucketName.Endpoint/ObjectName
        StringBuilder stringBuilder = new StringBuilder("https://");
        stringBuilder
                .append(bucketName)
                .append(".")
                .append(endpoint)
                .append("/")
                .append(objectName);

        log.info("文件上传到:{}", stringBuilder.toString());

        return stringBuilder.toString();
    }
}
```

### 运行范例

```java
@Test
public void testOSS() throws IOException {
    AliOssUtil aliOssUtil = AliOssUtil.builder()
        .accessKeyId("LTAI5tM72ks5rAhK65eby5goXXXXXXXXXX")
        .accessKeySecret("nbHAq1DbaCysOQeAO3c24KXkuTIni0XXXXXXXXXX")
        .endpoint("oss-cn-hangzhou.aliyuncs.com")
        .bucketName("sky-itcast-hzx")
        .build();

    //        String pathUrl = "C:\\Users\\hzx\\Desktop\\tou.png";
    String pathUrl = "C:\\Users\\hzx\\Desktop\\1111.jpg";
    Path path = Paths.get(pathUrl);

    //原始文件名
    String originalFilename = path.getFileName().toString();
    //截取原始文件名的后缀
    String extension_name = originalFilename.substring(originalFilename.lastIndexOf("."));
    //用UUID构造新文件名称，并加上文件的后缀格式
    String object_name = UUID.randomUUID() + extension_name;
    //文件的请求路径
    String filePath = aliOssUtil.upload(Files.readAllBytes(path), object_name);
    System.out.println("filePath: " + filePath);;
}
```



