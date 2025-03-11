### MySQL远程访问问题**

进入 MySQL 容器：

```shell
docker exec -it mysql mysql -u root -p123456
```

在 MySQL 终端中执行：

```sql
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '123456';
ALTER USER 'hzx'@'%' IDENTIFIED WITH mysql_native_password BY '123456';
FLUSH PRIVILEGES;
```

### **Redis远程访问问题**

修改 `redis.conf` 配置：

```shell
redis-cli -a yourpassword -h 127.0.0.1 -p 6379
```

```ini
bind 0.0.0.0
requirepass yourpassword
```

```shell
docker restart redis
```
