## 将Java项目打包为Docker镜像

> 参考项目：https://github.com/01Petard/demo_springboot4

### 打包项目

```shell
mvn clean package -DskipTests
```

### 创建`Dockerfile`

注意一下端口、jar包名称、启动参数

```
FROM dragonwell-registry.cn-hangzhou.cr.aliyuncs.com/dragonwell/dragonwell:17-centos

WORKDIR /app
EXPOSE 8088

COPY target/demo-1.0.0.jar app.jar
ENTRYPOINT ["sh","-c","java -server -Xmx500m -Xms500m -XX:MetaspaceSize=256m -XX:MaxMetaspaceSize=256m -XX:NewRatio=2 -XX:+UseG1GC -XX:InitiatingHeapOccupancyPercent=45 -XX:+ParallelRefProcEnabled -XX:+HeapDumpOnOutOfMemoryError -XX:+ExitOnOutOfMemoryError -XX:MaxGCPauseMillis=200 -jar /app/app.jar"]
```

> 参考：
>
> ```
> FROM dragonwell-registry.cn-hangzhou.cr.aliyuncs.com/dragonwell/dragonwell:17-centos
> EXPOSE 8733
> 
> ADD mpd-bes.jar mpd-bes.jar
> ENTRYPOINT ["sh","-c","java -server -Xmx700m -Xms700m -XX:MetaspaceSize=256m -XX:MaxMetaspaceSize=256m -XX:NewRatio=2 -XX:+UseG1GC -XX:InitiatingHeapOccupancyPercent=45 -XX:+ParallelRefProcEnabled -XX:+HeapDumpOnOutOfMemoryError -XX:+ExitOnOutOfMemoryError -XX:MaxGCPauseMillis=200 -Xlog:gc*:file=./logs/mpd-bes-gc.log:tags,time,uptime,level -jar /mpd-bes.jar"]
> ```

### 打包镜像

```sheel
docker build -t demo:1.0.0 .
```

此时镜像就已经被docker管理起来了，用`docker images`可以看到镜像

```
╭─[bogon] as hzx in ~/project/demo
╰──➤ docker images          
REPOSITORY                   TAG       IMAGE ID       CREATED          SIZE
demo                         1.0.0     fc63c4d1afc0   44 seconds ago   712MB
simple-site-monitor-runner   latest    e339cead5c29   5 months ago     231MB
simple-site-monitor-web      latest    dbc1d07e35a9   5 months ago     231MB
nacos/nacos-server           v2.5.1    c3adb66090a1   8 months ago     293MB
nginx                        1.25.3    bb258896226d   2 years ago      192MB
ankane/pgvector              latest    2ea1b7aaa843   2 years ago      472MB
redis                        7.2.0     69bb36a0f47b   2 years ago      157MB
redislabs/redisearch         latest    7bf3568a0c67   2 years ago      271MB
mysql                        8.0.32    21978c3803ca   2 years ago      544MB
```

测试镜像

```shell
╭─[bogon] as hzx in ~/project/demo
╰──➤ docker run -d --name demo -p 8088:8088 demo:1.0.0
016c1fc00096e4a3e73ccaf1b98cce61b5fd7b486490e4d8097a870e4c280a71
╭─[bogon] as hzx in ~/project/demo
╰──➤ docker ps                                        
CONTAINER ID   IMAGE        COMMAND                   CREATED          STATUS          PORTS                                         NAMES
016c1fc00096   demo:1.0.0   "sh -c 'java -server…"   24 seconds ago   Up 23 seconds   0.0.0.0:8088->8088/tcp, [::]:8088->8088/tcp   demo
```

可以看到，服务已经按镜像的方式顺利运行了，用接口测试一下

```http
http://localhost:8088/hello
```



