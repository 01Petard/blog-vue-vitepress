> 第一次在windows上用nginx，把我恶心到了，记录一下

启动
```shell
start .\nginx.exe
```

重启
```shell
.\nginx.exe -s reload
```

关闭
```shell
.\nginx.exe -s stop
```

其他的就是改配置，如下，一个server就是一个端口的转发

```nginx
    server {
        listen       9000; # 指定nginx进程端口
        server_name  localhost; # 配置nginx域名

        #charset koi8-r;
    
        location / {
            root   D:/Projects_sunnybaer/yanfeng-admin/dist; # 配置默认访问路径
            index  index.html index.htm; # 默认打开的文件名
        }


	location /api {
	        rewrite ^/api/(.*) /$1 break;
	        proxy_pass http://127.0.0.1:8088; # 指定 www.hao123.com/api.....的请求代理到 localhost:9999的域名
	        proxy_read_timeout 10s;
	        # proxy_set_header Host $host:$server_port; // 下面三行设置了请求头 ， 后发现没用 注释掉了
	        # proxy_set_header X-Real-IP $remote_addr;
	        # proxy_set_header x-forwarded-for $proxy_add_x_forwarded_for;
	    }
	
	    location /api/5B20 {
	        rewrite ^/api/[^/]+/(.*) /$1 break;
	        proxy_pass http://127.0.0.1:8088; 
	        proxy_read_timeout 10s;
	    }
		
		location /api/3810 {
	        rewrite ^/api/[^/]+/(.*) /$1 break;
	        proxy_pass http://127.0.0.1:8088; 
	        proxy_read_timeout 10s;
	    }
	
	    location /api/5B20/5B200101/tcs/core {
	        rewrite ^/api/[^/]+/[^/]+/tcs/core/?(.*)$ /tcs/core/$1 break;
	        proxy_pass http://127.0.0.1:7566; 
	        proxy_read_timeout 10s;
	    }
	
	    location /api/5B20/5B200101/websocket {
	        proxy_pass http://127.0.0.1:7567;
	        proxy_http_version 1.1;
	        proxy_set_header Upgrade $http_upgrade;
	        proxy_set_header Connection "upgrade";
	        proxy_set_header Host $host;
	        proxy_read_timeout 60s;
	        proxy_send_timeout 60s;
	
	        # 处理跨域预检请求的响应头
	        add_header Access-Control-Allow-Origin *;
	        add_header Access-Control-Allow-Methods "GET, POST, OPTIONS";
	        add_header Access-Control-Allow-Headers "Upgrade, Connection, Host";
	
	        # 可选：处理 OPTIONS 请求
	        if ($request_method = OPTIONS) {
	            add_header Access-Control-Allow-Origin *;
	            add_header Access-Control-Allow-Methods "GET, POST, OPTIONS";
	            add_header Access-Control-Allow-Headers "Upgrade, Connection, Host";
	            return 204; # 204 No Content 表示成功处理预检请求
	        }
	    }


        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
```

