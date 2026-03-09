# Nginx配置文件说明

```nginx
user root;                                 # 设置运行Nginx的用户为root
worker_processes auto;                     # 自动设置工作进程的数量，通常等于CPU核心数
error_log /usr/local/nginx/logs/error.log; # 错误日志路径
pid /usr/local/nginx/logs/nginx.pid;       # 存储Nginx主进程ID的文件路径
include /usr/share/nginx/modules/*.conf;   # 包含额外的模块配置文件
events {
    worker_connections 1024;               # 每个工作进程可以同时处理的最大连接数
}
http {
    
	# 定义访问日志格式，$remote_addr等是变量，代表客户端地址等信息
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';
    access_log /usr/local/nginx/logs/access.log main;  # 访问日志路径及使用的日志格式(main)，可以关掉
    sendfile on;                # 启用高效文件传输模式，用于提高大文件传输效率
    tcp_nopush on;              # 禁止TCP推送，减少网络延迟
    tcp_nodelay on;             # 禁用Nagle算法，减少数据包延迟
    keepalive_timeout 65;       # 连接保持超时时间，单位秒
    types_hash_max_size 2048;   # 设置类型哈希表的最大大小，优化MIME类型查找
    client_max_body_size 20M;   # 设置客户端请求体的最大值，超过此限制的请求将被拒绝，默认为1m
    
	# 轮询
    upstream server_group {
        server 101.31.7.24:8080; # node1
        server 101.31.7.25:8081; # node2
        server 101.31.7.26:8082; # node3
    }
	
	# 加权轮询
    upstream server_group {
        server 101.31.7.24:8080 weight=3; # node1
        server 101.31.7.25:8081 weight=5; # node2
        server 101.31.7.26:8082 weight=10; # node3
    }

	# IP哈希分配
    upstream server_group {
        ip_hash;
        server 101.31.7.24:8080; # node1
        server 101.31.7.25:8081; # node2
        server 101.31.7.26:8082; # node3
    }

	# 最少连接
    upstream server_group {
        least_conn;
        server 101.31.7.24:8080; # node1
        server 101.31.7.25:8081; # node2
        server 101.31.7.26:8082; # node3
    }

	server {

		gzip on;                  # 开启Gzip压缩，减少传输内容体积
        gzip_buffers 4 16k;       # 设置Gzip缓冲区大小
        gzip_comp_level 6;        # Gzip压缩级别，范围从1到9，数值越大压缩效果越好但越占用CPU资源
        gzip_min_length 100k;     # 设置允许压缩的最小字节数，小于该值的响应不会被压缩
        gzip_http_version 1.1;    # 设置支持的HTTP协议版本，默认是1.1
        gzip_vary on;             # 添加Vary: Accept-Encoding HTTP头，告知代理服务器识别是否启用Gzip压缩
        gzip_types text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript;  # 设置需要压缩的文件类型        

		listen 8888;              # 监听端口
        server_name 101.31.7.23;  # 服务器名称，支持多个域名或IP，空格分隔
        
    	location /api {
            # proxy_pass 端口后面加路径，该路径就会替换location中的路径，有/也会替换
            # 没加路径就只替换访问路径的ip和端口
            proxy_pass http://101.31.7.23:8180/;
        }
        location / {
            root /home/zcloud/applications/iomp-web; # 前端部署目录
            index index.html index.htm;
        }
        location /images/ {
            alias /home/zcloud/file/;
            autoindex off;
        }
    }
    }
}
```

## 配置项的含义

1. **user root;**

   - 设置 Nginx 进程的用户为 `root`。
2. **worker_processes auto;**
   - 自动设置工作进程的数量，通常设置为 CPU 核心数。
3. **error_log /usr/local/nginx/logs/error.log;**
   - 设置错误日志的路径。
4. **pid /usr/local/nginx/logs/nginx.pid;**
   - 设置 Nginx 进程的 PID 文件路径。
5. **include /usr/share/nginx/modules/*.conf;**
   - 包含 Nginx 模块的配置文件。
6. **events { ... }**
   - 配置事件处理模块。
   - `worker_connections 1024;` 设置每个工作进程的最大连接数。
7. **http { ... }**
   - 配置 HTTP 服务器的行为。
   - `log_format main ...;` 定义访问日志的格式。
   - `access_log /usr/local/nginx/logs/access.log main;` 设置访问日志的路径和格式。
8. **sendfile on;**
   - 启用 sendfile 功能，提高文件传输效率。
9. **tcp_nopush on;**
   - 禁止 TCP 推送，减少网络延迟。
10. **tcp_nodelay on;**
   - 禁用 Nagle 算法，减少数据包延迟。
11. **keepalive_timeout 65;**
    - 设置保持连接的超时时间，单位为秒。
12. **types_hash_max_size 2048;**
    - 设置 MIME 类型哈希表的最大大小。
13. **client_max_body_size 20M;**
    - 设置客户端请求体的最大大小。
14. **server { ... }**
    - 定义一个服务器块。
    - `listen 8888;` 监听 8888 端口。
    - `server_name 101.31.7.23;` 设置服务器名称。
15. **gzip on;**
    - 开启 Gzip 压缩。
16. **gzip_buffers 4 16k;**
    - 设置 Gzip 压缩所需的缓冲区大小。
17. **gzip_comp_level 6;**
    - 设置 Gzip 压缩级别。
18. **gzip_min_length 100k;**
    - 设置允许压缩的最小字节数。
19. **gzip_http_version 1.1;**
    - 设置支持的 HTTP 版本。
20. **gzip_types ...;**
    - 设置需要压缩的文件类型。
21. **gzip_vary on;**
    - 添加 `Vary: Accept-Encoding` HTTP 头。
22. **location /api { ... }**
- 定义一个位置块，用于处理 `/api` 路径下的请求。
  
- `proxy_pass http://101.31.7.23:8180/;` 将请求代理到指定的后端服务器。
23. **location / { ... }**

    - 定义一个位置块，用于处理根路径下的请求。

    - `root /home/zcloud/applications/iomp-web;` 设置前端部署目录。

    - `index index.html index.htm;` 设置默认索引文件。
24. **location /images/ { ... }**
   - 定义一个位置块，用于处理 `/images/` 路径下的请求。
   - `alias /home/zcloud/file/;` 设置别名目录。
   - `autoindex off;` 关闭自动索引功能。

- **alias**：将请求的 URI 替换为指定路径。例如，`/images/logo.png` 会被替换为 `/home/zcloud/file/logo.png`。
- **root**：将请求的 URI 直接附加到指定路径后面。例如，`/images/logo.png` 会被附加到 `/home/zcloud/applications/iomp-web/images/logo.png`。

## 常用命令

### 1. 重新加载配置文件
```sh
./nginx -s reload
```
- **用途**：在不中断服务的情况下，重新加载 Nginx 的配置文件。

### 2. 检查配置文件是否正确
```sh
./nginx -t
```
- **用途**：检查 Nginx 配置文件的语法是否正确，确保配置无误。

### 3. 启动 Nginx
```sh
./nginx
```
- **用途**：启动 Nginx 服务器。

### 4. 快速停止 Nginx
```sh
./nginx -s stop
```
- **用途**：快速停止 Nginx 服务器，立即关闭所有连接。

### 5. 完整有序地停止 Nginx
```sh
./nginx -s quit
```
- **用途**：完整有序地停止 Nginx 服务器，等待所有请求结束后再关闭服务器。

### 6. 查找 Nginx 配置文件
```sh
find / -name nginx.conf
```
- **用途**：在系统中查找名为 `nginx.conf` 的配置文件。

### 总结

- **重新加载配置文件**：`./nginx -s reload`
- **检查配置文件**：`./nginx -t`
- **启动 Nginx**：`./nginx`
- **快速停止 Nginx**：`./nginx -s stop`
- **有序停止 Nginx**：`./nginx -s quit`
- **查找配置文件**：`find / -name nginx.conf`

