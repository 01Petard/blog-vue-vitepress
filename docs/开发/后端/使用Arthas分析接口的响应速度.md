一般是在服务器上运行`.jar`来启动java项目，所以本文章基于服务器已经启动Java项目的前提下进行，并配合Postman发送请求：

1. **（首次）下载 arthas-boot.jar**：
   
   ```shell
   curl -O https://arthas.aliyun.com/arthas-boot.jar
   ```
   
2. **启动 Arthas**：
   
   ```shell
   java -jar arthas-boot.jar
   ```
   
   **选择需要诊断的 Java 进程**：Arthas 会列出所有可监控的 Java 进程。按编号选择需要监控的进程。
   
   ![image-20250322181137263](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202503221815049.png)
   
4. **使用 trace 命令监控接口详细的耗时情况**：
   
   - `trace` 命令可以显示指定类和方法内部调用的详细路径，以及每个节点上的耗时情况。
   - 示例命令：`trace com.itsoku.lesson058.TestController test -n 5 --skipJDKMethod false`
   - 可以使用Intellij IDEA中的插件**arthas idea**在指定Controller类上生成对应的arthas命令
   
5. **访问接口，观察输出**：
   
   - 使用命令 `curl` 或请求工具如Postman访问接口，并观察 `trace` 命令的输出。
   
   - 输出示例：
   
     ![image-20250322181154288](https://cdn.jsdelivr.net/gh/01Petard/imageURL@main/img/202503221815033.png)
